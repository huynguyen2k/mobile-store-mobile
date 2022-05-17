import {
	View,
	StyleSheet,
	Dimensions,
	ScrollView,
	Image,
	Text,
} from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import RenderHtml from 'react-native-render-html'
import { Rating } from 'react-native-ratings'
import NumberFormat from 'react-number-format'
import getPromotionPercent from '../../utils/getPromotionPercent'
import { Box, Button, Stack, Toast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from '../../app/reducers/cartSlice'
import moment from 'moment'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default function ProductDetail({ data }) {
	const navigation = useNavigation()

	const dispatch = useDispatch()

	const user = useSelector(state => state.auth.user)
	const loggedIn = useSelector(state => state.auth.loggedIn)
	const cartItems = useSelector(state => state.cart.cartItems)

	const [quantity, setQuantity] = useState(1)
	const [selectedOption, setSelectedOption] = useState(null)

	useEffect(() => {
		if (!data) return

		const optionList = data.product_options
		if (Array.isArray(optionList) && optionList.length > 0) {
			setSelectedOption(optionList[0])
		}
	}, [data])

	const ramOptionList = useMemo(() => {
		if (!data || !Array.isArray(data.product_options)) return []

		return data.product_options
			.filter(
				(option, index, arr) =>
					arr.findIndex(item => item.ram_id === option.ram_id) === index
			)
			.map(({ ram_id, ram_name }) => ({
				ram_id,
				ram_name,
			}))
	}, [data])

	const renderRamOptionList = () => {
		return ramOptionList.map(option => {
			const isSelected = option.ram_id === selectedOption?.ram_id

			return (
				<Button
					key={option.ram_id}
					size="lg"
					variant={isSelected ? 'solid' : 'outline'}
					colorScheme="blue"
					onPress={() => {
						const newOption = data.product_options.find(
							item => item.ram_id === option.ram_id
						)
						if (newOption) {
							setSelectedOption({ ...newOption })
						}
					}}
				>
					{option.ram_name}
				</Button>
			)
		})
	}

	const romOptionList = useMemo(() => {
		if (
			!data ||
			!Array.isArray(data.product_options) ||
			selectedOption === null
		)
			return []

		return data.product_options
			.filter(option => option.ram_id === selectedOption.ram_id)
			.filter(
				(option, index, arr) =>
					arr.findIndex(item => item.rom_id === option.rom_id) === index
			)
			.map(({ rom_id, rom_name }) => ({
				rom_id,
				rom_name,
			}))
	}, [data, selectedOption])

	const renderRomOptionList = () => {
		return romOptionList.map(option => {
			const isSelected = option.rom_id === selectedOption?.rom_id

			return (
				<Button
					key={option.rom_id}
					size="lg"
					variant={isSelected ? 'solid' : 'outline'}
					colorScheme="blue"
					onPress={() => {
						const newOption = data.product_options.find(
							item =>
								item.ram_id === selectedOption.ram_id &&
								item.rom_id === option.rom_id
						)
						if (newOption) {
							setSelectedOption({ ...newOption })
						}
					}}
				>
					{option.rom_name}
				</Button>
			)
		})
	}

	const colorOptionList = useMemo(() => {
		if (
			!data ||
			!Array.isArray(data.product_options) ||
			selectedOption === null
		)
			return []

		return data.product_options
			.filter(
				option =>
					option.ram_id === selectedOption.ram_id &&
					option.rom_id === selectedOption.rom_id
			)
			.map(({ color_id, color_name }) => ({
				color_id,
				color_name,
			}))
	}, [data, selectedOption])

	const renderColorOptionList = () => {
		return colorOptionList.map(option => {
			const isSelected = option.color_id === selectedOption?.color_id

			return (
				<Button
					key={option.color_id}
					size="lg"
					variant={isSelected ? 'solid' : 'outline'}
					colorScheme="blue"
					onPress={() => {
						const newOption = data.product_options.find(
							item =>
								item.ram_id === selectedOption.ram_id &&
								item.rom_id === selectedOption.rom_id &&
								item.color_id === option.color_id
						)
						if (newOption) {
							setSelectedOption({ ...newOption })
						}
					}}
				>
					{option.color_name}
				</Button>
			)
		})
	}

	const handleBuyProduct = async () => {
		if (!user) {
			navigation.navigate('Login')
			return
		}

		const availableQuantity =
			selectedOption.quantity - selectedOption.sold_quantity
		if (availableQuantity === 0) {
			return Toast.show({
				placement: 'top-right',
				render: () => {
					return (
						<Box bg="orange.500" p="4" rounded="sm" mb={2} mr={4}>
							Xin lỗi sản phẩm này hiện đã hết hàng!
						</Box>
					)
				},
			})
		}

		let quantityInCart = 0
		const index = cartItems.findIndex(
			e => e.product_option_id === selectedOption.id
		)

		if (index >= 0) {
			quantityInCart = cartItems[index].quantity
		}
		const totalQuantity = quantity + quantityInCart

		if (totalQuantity > 5) {
			return Toast.show({
				placement: 'top-right',
				render: () => {
					return (
						<Box bg="orange.500" p="4" rounded="sm" mb={2} mr={4}>
							Xin lỗi số lượng tối đa có thể mua của sản phẩm này là 5!
						</Box>
					)
				},
			})
		}

		if (totalQuantity > availableQuantity) {
			return Toast.show({
				placement: 'top-right',
				render: () => {
					return (
						<Box bg="orange.500" p="4" rounded="sm" mb={2} mr={4}>
							Xin lỗi hiện chỉ còn {availableQuantity} sản phẩm!
						</Box>
					)
				},
			})
		}

		const data = {
			product_option_id: selectedOption.id,
			quantity: quantity,
			user_id: user.id,
			created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
		}

		try {
			const response = await dispatch(addCartItem(data)).unwrap()
			return Toast.show({
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

	if (!data) return null
	return (
		<ScrollView style={styles.container}>
			<View style={styles.slider}>
				<ScrollView
					horizontal
					pagingEnabled
					style={styles.slider}
					showsHorizontalScrollIndicator={false}
				>
					{data.images.slice(1).map(x => (
						<Image
							key={x.id}
							resizeMode="cover"
							source={{
								uri: x.image.replace('localhost', '10.0.2.2'),
							}}
							style={styles.slider}
						/>
					))}
				</ScrollView>
			</View>

			<View style={styles.productContainer}>
				<Text style={styles.brandName}>Thương hiệu: {data.brand_name}</Text>
				<Text style={styles.productName}>{data.name}</Text>

				<Rating
					readonly
					type="custom"
					ratingCount={5}
					startingValue={data.rating}
					imageSize={24}
					ratingColor="#fadb14"
					ratingBackgroundColor="#f0f0f0"
					style={{
						flexDirection: 'row',
						justifyContent: 'flex-start',
					}}
				/>

				<View style={styles.priceContainer}>
					<NumberFormat
						thousandSeparator
						displayType="text"
						decimalSeparator="."
						value={selectedOption?.sale_price}
						renderText={value => (
							<Text style={styles.salePrice}>{`${value.replace(
								/,/g,
								'.'
							)} ₫`}</Text>
						)}
					/>

					{selectedOption?.sale_price < selectedOption?.original_price && (
						<>
							<NumberFormat
								thousandSeparator
								displayType="text"
								decimalSeparator="."
								value={selectedOption?.original_price}
								renderText={value => (
									<Text style={styles.originalPrice}>{`${value.replace(
										/,/g,
										'.'
									)} ₫`}</Text>
								)}
							/>

							<Text style={styles.promotionPercent}>
								{`-${getPromotionPercent(
									selectedOption?.original_price,
									selectedOption?.sale_price
								).toFixed(0)}%`}
							</Text>
						</>
					)}
				</View>

				<View>
					<Text style={{ marginTop: 16, fontSize: 18, fontWeight: '400' }}>
						Cấu hình sản phẩm
					</Text>

					<Stack direction="row" mt="2" space={3}>
						{renderRamOptionList()}
					</Stack>

					<Stack direction="row" mt="2" space={3}>
						{renderRomOptionList()}
					</Stack>

					<Stack direction="row" mt="2" space={3}>
						{renderColorOptionList()}
					</Stack>
				</View>

				<View style={{ marginTop: 16 }}>
					<Button
						size="lg"
						variant="solid"
						colorScheme="red"
						padding={3}
						onPress={handleBuyProduct}
					>
						Chọn mua
					</Button>
				</View>
			</View>

			<View style={styles.specification}>
				<Text style={styles.title}>THÔNG SỐ KỸ THUẬT</Text>
				<RenderHtml
					contentWidth={WIDTH}
					source={{
						html: data.specifications,
					}}
				/>
			</View>

			<View style={styles.description}>
				<Text style={styles.title}>MÔ TẢ SẢN PHẨM</Text>
				<RenderHtml
					contentWidth={WIDTH}
					source={{
						html: data.description.replace(/localhost/g, '10.0.2.2'),
					}}
				/>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	slider: {
		width: WIDTH,
		height: HEIGHT * 0.5,
	},
	productContainer: {
		padding: 16,
	},
	brandName: {
		marginBottom: 4,
		fontSize: 18,
		fontWeight: '400',
	},
	productName: {
		marginBottom: 4,
		fontSize: 26,
		fontWeight: '400',
	},
	priceContainer: {
		marginTop: 16,
		padding: 16,
		flexDirection: 'row',
		alignItems: 'flex-end',
		backgroundColor: '#ff424e',
		borderRadius: 4,
	},
	salePrice: {
		fontSize: 24,
		color: 'white',
	},
	originalPrice: {
		marginLeft: 16,
		fontSize: 16,
		color: 'white',
		textDecorationLine: 'line-through',
	},
	promotionPercent: {
		marginLeft: 16,
		borderRadius: 2,
		borderColor: 'white',
		borderWidth: 1,
		paddingVertical: 1,
		paddingHorizontal: 4,
		color: 'white',
	},
	title: {
		fontSize: 20,
		fontWeight: '500',
	},
	description: {
		padding: 8,
	},
	specification: {
		padding: 8,
	},
})
