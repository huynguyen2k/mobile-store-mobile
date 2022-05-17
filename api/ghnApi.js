import axiosClient from './axiosClient'

const ghnApi = {
	getProvince() {
		const url =
			'https://online-gateway.ghn.vn/shiip/public-api/master-data/province'
		return axiosClient.get(url, {
			headers: {
				token: '452f1b76-7096-11ec-bde8-6690e1946f41',
			},
		})
	},

	getDistrict(provinceId) {
		const url =
			'https://online-gateway.ghn.vn/shiip/public-api/master-data/district'
		return axiosClient.post(
			url,
			{
				province_id: provinceId,
			},
			{
				headers: {
					token: '452f1b76-7096-11ec-bde8-6690e1946f41',
				},
			}
		)
	},

	getWard(districtId) {
		const url =
			'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward'
		return axiosClient.post(
			url,
			{
				district_id: districtId,
			},
			{
				headers: {
					token: '452f1b76-7096-11ec-bde8-6690e1946f41',
				},
			}
		)
	},

	getService(data) {
		const url =
			'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services'
		return axiosClient.post(url, data, {
			headers: {
				token: '452f1b76-7096-11ec-bde8-6690e1946f41',
			},
		})
	},

	getFee(data) {
		const url =
			'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee'
		return axiosClient.post(url, data, {
			headers: {
				token: '452f1b76-7096-11ec-bde8-6690e1946f41',
				shop_id: 2415850,
			},
		})
	},
}

export default ghnApi
