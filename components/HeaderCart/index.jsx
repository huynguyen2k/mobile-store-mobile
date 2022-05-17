import { View, StyleSheet, Text, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function HeaderCart({ quantity }) {
	const navigation = useNavigation()

	const handleClick = () => {
		navigation.navigate('Cart')
	}

	return (
		<Pressable onPress={handleClick}>
			<View style={styles.cartBtn}>
				<AntDesign name="shoppingcart" size={24} color="white" />

				<View style={styles.wrapText}>
					<Text style={styles.text}>{quantity}</Text>
				</View>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	cartBtn: {
		padding: 8,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	},
	wrapText: {
		position: 'absolute',
		top: -4,
		right: -4,
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
