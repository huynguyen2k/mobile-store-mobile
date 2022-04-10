function formatNumber(number) {
	return new Intl.NumberFormat('de-DE').format(number)
}

export default formatNumber
