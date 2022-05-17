import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native'
import productApi from '../api/productApi'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import useFetchData from '../hooks/useFetchData'

export default function HomeScreen() {
	const [search, setSearch] = useState('')

	const getAllProduct = useCallback(() => {
		return productApi.getAll({
			product_name: search,
			sort: 'top-seller',
		})
	}, [search])

	const { data: productList, refetchData } = useFetchData(getAllProduct)

	useEffect(() => {
		refetchData()
	}, [search, refetchData])

	const handleSearch = value => {
		setSearch(value)
	}

	return (
		<>
			<Header onSearch={handleSearch} />

			<View style={{ height: Dimensions.get('window').height - 90 }}>
				<ProductList data={productList} />
			</View>
		</>
	)
}
