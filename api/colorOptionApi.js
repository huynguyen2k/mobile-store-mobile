import axiosClient from './axiosClient'

const colorOptionApi = {
	getAll() {
		const url = '/api/product-option/color'
		return axiosClient.get(url)
	},
	get(id) {
		const url = `/api/product-option/color/${id}`
		return axiosClient.get(url)
	},
	add(data) {
		const url = '/api/product-option/color'
		return axiosClient.post(url, data)
	},
	update(data) {
		const url = `/api/product-option/color/${data.id}`
		return axiosClient.put(url, data)
	},
	delete(id) {
		const url = `/api/product-option/color/${id}`
		return axiosClient.delete(url)
	},
}

export default colorOptionApi
