import axiosClient from './axiosClient'

const shopApi = {
	get(id) {
		const url = `/api/shop-info`
		return axiosClient.get(url)
	},
	update(data) {
		const url = `/api/shop-info/${data.id}`
		return axiosClient.put(url, data)
	},
}

export default shopApi
