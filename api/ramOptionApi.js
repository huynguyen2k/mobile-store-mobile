import axiosClient from './axiosClient'

const ramOptionApi = {
	getAll() {
		const url = '/api/product-option/ram'
		return axiosClient.get(url)
	},
	get(id) {
		const url = `/api/product-option/ram/${id}`
		return axiosClient.get(url)
	},
	add(data) {
		const url = '/api/product-option/ram'
		return axiosClient.post(url, data)
	},
	update(data) {
		const url = `/api/product-option/ram/${data.id}`
		return axiosClient.put(url, data)
	},
	delete(id) {
		const url = `/api/product-option/ram/${id}`
		return axiosClient.delete(url)
	},
}

export default ramOptionApi
