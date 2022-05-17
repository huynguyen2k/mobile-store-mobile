import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import NumberFormat from 'react-number-format'
import NumericInput from 'react-native-numeric-input'
import { Feather } from '@expo/vector-icons'
import { Button, Checkbox } from 'native-base'

export default function CartItemList(props) {
	const { data, selectedItems, onSelect, onUpdateQuantity, onDelete } = props

	return (
		<View>
			{data.map(item => (
				<View key={item.id} style={styles.cartItem}>
					<View style={styles.productContainer}>
						<Checkbox
							colorScheme="blue"
							value={item.id}
							isChecked={selectedItems.includes(item.id)}
							onChange={isChecked => onSelect(isChecked, item)}
							accessibilityLabel="Check Cart Item"
						/>

						<Image
							source={{
								uri: item.product_image.replace('localhost', '10.0.2.2'),
							}}
							style={styles.productImage}
						/>

						<View>
							<Text style={styles.productName}>{item.product_name}</Text>

							<Text style={styles.productOption}>
								({item.ram_name}/{item.rom_name}) - {item.color_name}
							</Text>

							<NumericInput
								rounded
								step={1}
								minValue={1}
								maxValue={5}
								valueType="integer"
								value={item.quantity}
								onChange={value => {
									onUpdateQuantity({
										id: item.id,
										quantity: value,
									})
								}}
								totalWidth={100}
								totalHeight={30}
								iconSize={25}
								iconStyle={{ color: 'black', fontSize: 20 }}
								containerStyle={{ marginVertical: 8 }}
							/>

							<NumberFormat
								thousandSeparator
								displayType="text"
								decimalSeparator="."
								value={item.sale_price}
								renderText={value => (
									<Text style={styles.price}>{`${value.replace(
										/,/g,
										'.'
									)} ₫`}</Text>
								)}
							/>
						</View>
					</View>

					<Button
						size="sm"
						variant="unstyled"
						onPress={() => onDelete(item.id)}
					>
						<Feather name="trash" size={20} color="black" />
					</Button>
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	cartItem: {
		marginBottom: 8,
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'white',
	},
	productContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	productImage: {
		width: 100,
		height: 100,
	},
	productName: {
		fontSize: 18,
		fontWeight: '400',
	},
	productOption: {
		fontSize: 16,
		fontWeight: '400',
	},
	price: {
		color: '#ff424e',
		fontSize: 18,
		fontWeight: '700',
	},
})
