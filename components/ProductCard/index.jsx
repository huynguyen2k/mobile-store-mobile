import React from 'react'
import NumberFormat from 'react-number-format'
import { View, StyleSheet, Image, Text } from 'react-native'
import getPromotionPercent from '../../utils/getPromotionPercent'
import { Rating } from 'react-native-ratings'

export default function ProductCard({ item }) {
	return (
		<View style={styles.productCard}>
			<Image
				source={{
					uri: item.images[0].image.replace('localhost', '10.0.2.2'),
				}}
				style={styles.productImage}
			/>
			<View style={styles.productInfo}>
				<Text style={styles.productName}>{item.name}</Text>

				<View style={styles.ratingWrap}>
					<Rating
						readonly
						type="custom"
						ratingCount={5}
						startingValue={item.rating}
						imageSize={16}
						ratingColor="#fadb14"
						ratingBackgroundColor="#f0f0f0"
						style={{
							marginTop: 4,
							flexDirection: 'row',
							justifyContent: 'flex-start',
						}}
					/>

					<Text style={styles.soldQuantity}>đã bán {item.sold_quantity}</Text>
				</View>

				<View style={styles.priceWrap}>
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

					{item.sale_price < item.original_price && (
						<Text style={styles.promotionPercent}>
							{`-${getPromotionPercent(
								item.original_price,
								item.sale_price
							).toFixed(0)}%`}
						</Text>
					)}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	productCard: {
		flex: 1,
		backgroundColor: 'white',
		padding: 20,
		borderWidth: 0.5,
		borderColor: '#f4f4f4',
		borderStyle: 'solid',
	},
	productImage: {
		width: '100%',
		height: 180,
	},
	productInfo: {
		marginTop: 8,
	},
	productName: {
		fontSize: 18,
	},
	priceWrap: {
		marginTop: 4,
		flexDirection: 'row',
		alignItems: 'center',
	},
	ratingWrap: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	soldQuantity: {
		marginLeft: 8,
		color: '#787878',
		fontSize: 14,
		lineHeight: 14,
		fontWeight: '400',
	},
	price: {
		color: '#ff424e',
		fontSize: 18,
		fontWeight: '700',
	},
	promotionPercent: {
		marginLeft: 8,
		borderRadius: 2,
		borderColor: '#ff424e',
		borderWidth: 1,
		paddingVertical: 1,
		paddingHorizontal: 4,
		color: '#ff424e',
		backgroundColor: '#ff424f20',
	},
})
