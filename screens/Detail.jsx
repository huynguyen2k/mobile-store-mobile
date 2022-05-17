import React from 'react'
import { Dimensions, View } from 'react-native'
import Header from '../components/Header'
import ProductDetail from '../components/ProductDetail'
import useProductDetail from '../hooks/useProductDetail'

export default function DetailScreen({ route }) {
	const {
		params: { productId },
	} = route
	const { data } = useProductDetail(productId)

	return (
		<>
			<Header />

			<View style={{ height: Dimensions.get('window').height - 90 }}>
				<ProductDetail data={data} />
			</View>
		</>
	)
}
