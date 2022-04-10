import { View, StyleSheet, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'

export default function HeaderCart() {
	return (
		<View style={styles.cartBtn}>
			<AntDesign name="shoppingcart" size={24} color="white" />
			<View style={styles.wrapText}>
				<Text style={styles.text}>5</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	cartBtn: {
		width: 60,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	},
	wrapText: {
		position: 'absolute',
		top: -14,
		right: 4,
		alignItems: 'center',
		justifyContent: 'center',
		width: 24,
		height: 24,
		borderRadius: 50,
		backgroundColor: 'red',
	},
	text: {
		color: 'white',
		fontSize: 14,
	},
})
