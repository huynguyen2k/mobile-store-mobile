import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import ProductCard from '../ProductCard'

const numColumns = 2

export default function ProductList({ data }) {
	const formatData = () => {
		const result = [...data]

		const totalRows = Math.floor(result.length / numColumns)
		let totalLastRow = result.length - totalRows * numColumns

		while (totalLastRow !== 0 && totalLastRow !== numColumns) {
			result.push({ key: 'blank', empty: true })
			totalLastRow++
		}

		return result
	}

	const renderItem = ({ item, index }) => {
		if (item.empty) {
			return <View style={[styles.item, styles.hidden]} />
		}

		return (
			<View style={styles.item}>
				<ProductCard item={item} />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={formatData()}
				renderItem={renderItem}
				numColumns={numColumns}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		flex: 1,
	},
	hidden: {
		backgroundColor: 'transparent',
	},
})
