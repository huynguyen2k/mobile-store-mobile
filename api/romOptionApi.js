import axiosClient from './axiosClient'

const romOptionApi = {
	getAll() {
		const url = '/api/product-option/rom'
		return axiosClient.get(url)
	},
	get(id) {
		const url = `/api/product-option/rom/${id}`
		return axiosClient.get(url)
	},
	add(data) {
		const url = '/api/product-option/rom'
		return axiosClient.post(url, data)
	},
	update(data) {
		const url = `/api/product-option/rom/${data.id}`
		return axiosClient.put(url, data)
	},
	delete(id) {
		const url = `/api/product-option/rom/${id}`
		return axiosClient.delete(url)
	},
}

export default romOptionApi
