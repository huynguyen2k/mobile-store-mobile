import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, useTheme } from 'native-base'
import HeaderCart from '../HeaderCart'
import HeaderAccount from '../HeaderAccount'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCartItems } from '../../app/reducers/cartSlice'

export default function Header({ onSearch }) {
	const theme = useTheme()
	const [value, setValue] = useState('')

	const dispatch = useDispatch()

	const user = useSelector(state => state.auth.user)
	const cartItems = useSelector(state => state.cart.cartItems)

	const handleSearchSubmit = () => {
		onSearch(value)
	}

	useEffect(() => {
		if (!user) return
		;(async () => {
			try {
				await dispatch(getAllCartItems(user.id)).unwrap()
			} catch (error) {
				console.log(error)
			}
		})()
	}, [dispatch, user])

	return (
		<View
			style={[styles.header, { backgroundColor: theme.colors.blue['500'] }]}
		>
			<Input
				flex="1"
				placeholder="Nhập tên sản phẩm"
				value={value}
				onChangeText={newValue => setValue(newValue)}
				onSubmitEditing={handleSearchSubmit}
				fontSize={18}
				backgroundColor="white"
				borderWidth={0}
			/>

			<HeaderCart quantity={cartItems.length} />
			<HeaderAccount />
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		width: '100%',
		height: 70,
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
})
