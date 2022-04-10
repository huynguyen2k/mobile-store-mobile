function getPromotionPercent(originalPrice, salePrice) {
	originalPrice = Number(originalPrice)
	salePrice = Number(salePrice)

	return ((originalPrice - salePrice) / originalPrice) * 100
}

export default getPromotionPercent
