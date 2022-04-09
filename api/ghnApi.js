import axiosClient from './axiosClient'

const ghnApi = {
	getProvince() {
		const url =
			'https://online-gateway.ghn.vn/shiip/public-api/master-data/province'
		return axiosClient.get(url, {
			headers: {
				token: process.env.REACT_APP_GHN_TOKEN,
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
					token: process.env.REACT_APP_GHN_TOKEN,
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
					token: process.env.REACT_APP_GHN_TOKEN,
				},
			}
		)
	},

	getService(data) {
		const url =
			'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services'
		return axiosClient.post(url, data, {
			headers: {
				token: process.env.REACT_APP_GHN_TOKEN,
			},
		})
	},

	getFee(data) {
		const url =
			'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee'
		return axiosClient.post(url, data, {
			headers: {
				token: process.env.REACT_APP_GHN_TOKEN,
				shop_id: process.env.REACT_APP_GHN_SHOP_ID,
			},
		})
	},
}

export default ghnApi
