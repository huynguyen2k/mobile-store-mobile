import { View, StyleSheet, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function HeaderAccount() {
	const navigation = useNavigation()

	const handleClick = () => {
		navigation.navigate('Login')
	}

	return (
		<Pressable onPress={handleClick}>
			<View style={styles.accountBtn}>
				<MaterialCommunityIcons
					name="account-box-outline"
					size={30}
					color="white"
				/>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	accountBtn: {
		padding: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
