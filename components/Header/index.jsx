import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, useTheme } from 'native-base'
import HeaderCart from '../HeaderCart'

export default function Header() {
	const theme = useTheme()
	const [value, setValue] = useState('')

	const handleSearchSubmit = () => {
		console.log(value)
	}

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

			<HeaderCart />
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
