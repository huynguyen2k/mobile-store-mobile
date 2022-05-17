import React, { useEffect, useMemo, useState } from 'react'
import { Dimensions, View, Text, StyleSheet, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CartItemList from '../components/CartItemList'
import Header from '../components/Header'
import shopApi from '../api/shopApi'
import addressApi from '../api/addressApi'
import ghnApi from '../api/ghnApi'
import { deleteCartItem, updateCartItem } from '../app/reducers/cartSlice'
import { Toast, Box, Button } from 'native-base'
import NumberFormat from 'react-number-format'
import moment from 'moment'
import orderApi from '../api/orderApi'

const orderStatus = {
	order: {
		id: 1,
		name: 'Đặt hàng',
	},
	waiting: {
		id: 2,
		name: 'Chờ xác nhận',
	},
	processing: {
		id: 3,
		name: 'Đang xử lý',
	},
	delivering: {
		id: 4,
		name: 'Đang vận chuyển',
	},
	delivered: {
		id: 5,
		name: 'Đã giao hàng',
	},
	completed: {
		id: 6,
		name: 'Hoàn tất',
	},
	cancelled: {
		id: 7,
		name: 'Đã hủy',
	},
}

export default function CartScreen() {
	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)
	const cartItems = useSelector(state => state.cart.cartItems)

	const [coupon, setCoupon] = useState(null)
	const [deliveryCost, setDeliveryCost] = useState(0)
	const [selectedItems, setSelectedItems] = useState([])

	const [shopInfo, setShopInfo] = useState(null)
	const [addressList, setAddressList] = useState([])

	useEffect(() => {
		;(async () => {
			try {
				const response = await shopApi.get()
				setShopInfo(response.content)
			} catch (error) {
				console.log(error)
			}
		})()
	}, [])

	useEffect(() => {
		if (!user) return
		;(async () => {
			try {
				const response = await addressApi.getAll(user.id)
				setAddressList(response.content)
			} catch (error) {
				console.log(error)
			}
		})()
	}, [user])

	const customerAddress = useMemo(() => {
		const index = addressList.findIndex(e => e.is_default === 1)
		if (index >= 0) {
			return { ...addressList[index] }
		}
		return null
	}, [addressList])

	const order = useMemo(() => {
		const totalProduct = selectedItems.reduce((result, id) => {
			const index = cartItems.findIndex(e => e.id === id)
			if (index >= 0) {
				return result + cartItems[index].quantity
			}
			return result
		}, 0)

		const totalPrice = selectedItems.reduce((result, id) => {
			const index = cartItems.findIndex(e => e.id === id)
			if (index >= 0) {
				const item = cartItems[index]
				return result + item.quantity * item.sale_price
			}
			return result
		}, 0)

		let discountValue = 0
		if (coupon) {
			discountValue = coupon.discount_value
		}

		return {
			total_product: totalProduct,
			total_price: totalPrice,
			delivery_cost: deliveryCost,
			coupons_id: coupon ? coupon.id : null,
			discount: discountValue,
			final_price: totalPrice + deliveryCost - discountValue,
		}
	}, [cartItems, selectedItems, deliveryCost, coupon])

	useEffect(() => {
		if (!shopInfo || !customerAddress) return
		;(async () => {
			try {
				const service = await ghnApi.getService({
					shop_id: 2415850,
					from_district: shopInfo.district_id,
					to_district: customerAddress.district_id,
				})

				if (service.data.length === 0 || selectedItems.length === 0) {
					return setDeliveryCost(0)
				}

				const serviceId = service.data[0].service_id
				const productSize = {
					width: 0,
					height: 0,
					weight: 0,
					length: 0,
				}

				selectedItems.forEach(id => {
					const index = cartItems.findIndex(e => e.id === id)
					if (index >= 0) {
						productSize.width +=
							cartItems[index].width * cartItems[index].quantity
						productSize.height +=
							cartItems[index].height * cartItems[index].quantity
						productSize.weight +=
							cartItems[index].weight * cartItems[index].quantity
						productSize.length +=
							cartItems[index].length * cartItems[index].quantity
					}
				})

				const data = {
					service_id: serviceId,
					service_type_id: null,
					from_district_id: shopInfo.district_id,
					to_district_id: customerAddress.district_id,
					to_ward_code: customerAddress.ward_code,
					insurance_value: 10000,
					coupon: null,
					...productSize,
				}

				const response = await ghnApi.getFee(data)
				setDeliveryCost(response.data.total)
			} catch (error) {
				setDeliveryCost(0)
			}
		})()
	}, [shopInfo, customerAddress, cartItems, selectedItems])

	const handleSelect = (checked, data) => {
		if (checked) {
			const quantity = data.quantity
			const availableQuantity = data.total_quantity - data.sold_quantity

			if (availableQuantity === 0) {
				return Toast.show({
					placement: 'top-right',
					render: () => {
						return (
							<Box bg="blue.500" p="4" rounded="sm" mb={2} mr={4}>
								Xin lỗi sản phẩm này hiện đã hết hàng!
							</Box>
						)
					},
				})
			}

			if (quantity > availableQuantity) {
				return Toast.show({
					placement: 'top-right',
					render: () => {
						return (
							<Box bg="blue.500" p="4" rounded="sm" mb={2} mr={4}>
								Xin lỗi hiện sản phẩm này chỉ còn lại {availableQuantity} sản
								phẩm!
							</Box>
						)
					},
				})
			}

			return setSelectedItems(state => [...state, data.id])
		}
		setSelectedItems(state => state.filter(id => id !== data.id))
	}

	const handleDelete = async id => {
		try {
			const response = await dispatch(
				deleteCartItem({
					id: id,
					userId: user.id,
				})
			).unwrap()

			handleSelect(false, { id })
			Toast.show({
				placement: 'top-right',
				render: () => {
					return (
						<Box bg="success.500" p="4" rounded="sm" mb={2} mr={4}>
							{response.message}
						</Box>
					)
				},
			})
		} catch (error) {
			console.log(error)
		}
	}

	const handleUpdateQuantity = async data => {
		if (!user || !data) return

		try {
			await dispatch(
				updateCartItem({
					userId: user.id,
					data: {
						id: data.id,
						quantity: data.quantity,
					},
				})
			).unwrap()
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeleteSelectedItems = async () => {
		try {
			await Promise.all(
				selectedItems.map(async id => {
					return await dispatch(
						deleteCartItem({
							id: id,
							userId: user.id,
						})
					).unwrap()
				})
			)

			setSelectedItems([])
		} catch (error) {
			console.log(error)
		}
	}

	const handleOrderItem = async () => {
		if (!customerAddress) {
			return Toast.show({
				placement: 'top-right',
				render: () => {
					return (
						<Box bg="orange.500" p="4" rounded="sm" mb={2} mr={4}>
							Vui lòng chọn địa chỉ giao hàng trước khi đặt mua!
						</Box>
					)
				},
			})
		}

		if (selectedItems.length === 0) {
			return Toast.show({
				placement: 'top-right',
				render: () => {
					return (
						<Box bg="orange.500" p="4" rounded="sm" mb={2} mr={4}>
							Bạn phải chọn ít nhất 1 sản phẩm trong giỏ hàng để đặt mua!
						</Box>
					)
				},
			})
		}

		const data = {
			order: {
				total_price: order.final_price,
				delivery_cost: order.delivery_cost,
				coupons_id: order.coupons_id,
				discount_value: order.discount,
				status_id: orderStatus.waiting.id,
				shop_name: shopInfo.name,
				shop_phone: shopInfo.phone_number,
				shop_address: shopInfo.full_address,
				customer_id: user.id,
				customer_name: customerAddress.full_name,
				customer_phone: customerAddress.phone_number,
				customer_address: customerAddress.full_address,
				created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
			},

			orderDetail: selectedItems.map(id => {
				const index = cartItems.findIndex(e => e.id === id)
				if (index >= 0) {
					return {
						price: cartItems[index].sale_price,
						quantity: cartItems[index].quantity,
						product_option_id: cartItems[index].product_option_id,
					}
				}
				return null
			}),
		}

		try {
			const response = await orderApi.add(data)

			await handleDeleteSelectedItems()
			setCoupon(null)

			Toast.show({
				placement: 'top-right',
				render: () => {
					return (
						<Box bg="success.500" p="4" rounded="sm" mb={2} mr={4}>
							{response.message}
						</Box>
					)
				},
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Header />

			<ScrollView style={{ height: Dimensions.get('window').height - 90 }}>
				<CartItemList
					data={cartItems}
					selectedItems={selectedItems}
					onSelect={handleSelect}
					onUpdateQuantity={handleUpdateQuantity}
					onDelete={handleDelete}
				/>

				<View style={styles.customerAddress}>
					<Text style={styles.title}>Địa chỉ giao hàng</Text>
					<Text style={styles.fullName}>{customerAddress?.full_name}</Text>
					<Text style={styles.phoneNumber}>
						Số điện thoại: {customerAddress?.phone_number}
					</Text>
					<Text style={styles.fullAddress}>
						Địa chỉ: {customerAddress?.full_address}
					</Text>
				</View>

				<View style={styles.order}>
					<Text style={styles.title}>Đơn hàng</Text>
					<View style={styles.row}>
						<Text style={styles.label}>Tạm tính</Text>
						<NumberFormat
							thousandSeparator
							displayType="text"
							decimalSeparator="."
							value={order.total_price}
							renderText={value => (
								<Text style={styles.content}>{`${value.replace(
									/,/g,
									'.'
								)} ₫`}</Text>
							)}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>Phí vận chuyển</Text>
						<NumberFormat
							thousandSeparator
							displayType="text"
							decimalSeparator="."
							value={order.delivery_cost}
							renderText={value => (
								<Text style={styles.content}>{`${value.replace(
									/,/g,
									'.'
								)} ₫`}</Text>
							)}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>Giảm giá</Text>
						<NumberFormat
							thousandSeparator
							displayType="text"
							decimalSeparator="."
							value={order.discount}
							renderText={value => (
								<Text style={styles.content}>{`${value.replace(
									/,/g,
									'.'
								)} ₫`}</Text>
							)}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>Thành tiền</Text>
						<NumberFormat
							thousandSeparator
							displayType="text"
							decimalSeparator="."
							value={order.final_price}
							renderText={value => (
								<Text style={styles.finalPrice}>{`${value.replace(
									/,/g,
									'.'
								)} ₫`}</Text>
							)}
						/>
					</View>

					<Button
						marginTop={2}
						size="lg"
						colorScheme="red"
						onPress={handleOrderItem}
					>
						Đặt mua
					</Button>
				</View>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	customerAddress: {
		marginBottom: 8,
		padding: 16,
		backgroundColor: 'white',
	},
	title: {
		fontSize: 18,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	label: {
		fontSize: 16,
	},
	content: {
		fontSize: 16,
	},
	fullName: {
		fontSize: 16,
	},
	phoneNumber: {
		fontSize: 16,
	},
	fullAddress: {
		fontSize: 16,
	},
	order: {
		padding: 16,
		backgroundColor: 'white',
	},
	finalPrice: {
		color: '#ff424e',
		fontSize: 18,
		fontWeight: '700',
	},
})
