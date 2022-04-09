import axiosClient from './axiosClient'

const couponsApi = {
	getAll(published) {
		const url = '/api/coupons'
		return axiosClient.get(url)
	},
	add(data) {
		const url = '/api/coupons'
		return axiosClient.post(url, data)
	},
	apply(data) {
		const url = '/api/coupons/apply'
		return axiosClient.post(url, data)
	},
	update(data) {
		const url = `/api/coupons/${data.id}`
		return axiosClient.put(url, data)
	},
	delete(id) {
		const url = `/api/coupons/${id}`
		return axiosClient.delete(url)
	},
}

export default couponsApi
