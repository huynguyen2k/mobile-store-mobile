import React from 'react'
import { View, Dimensions } from 'react-native'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import useFetchData from '../hooks/useFetchData'
import productApi from '../api/productApi'
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'

export default function HomeScreen() {
	const { data: productList } = useFetchData(productApi.getAll)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header />

			<View style={{ height: Dimensions.get('window').height - 90 }}>
				<ProductList data={productList} />
			</View>
		</SafeAreaView>
	)
}
