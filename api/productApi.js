import axiosClient from './axiosClient'

const productApi = {
	get(id) {
		const url = `/api/product/${id}`
		return axiosClient.get(url)
	},

	getAll(params) {
		const url = '/api/product'
		return axiosClient.get(url, { params })
	},

	add(data) {
		const url = '/api/product'
		return axiosClient.post(url, data)
	},

	update(data) {
		const url = `/api/product/${data.id}`
		return axiosClient.put(url, data)
	},

	updateProductStatus(data) {
		const url = `/api/product/status/${data.id}`
		return axiosClient.put(url, data)
	},

	delete(id) {
		const url = `/api/product/${id}`
		return axiosClient.delete(url)
	},

	uploadImage(data) {
		const url = '/api/product/upload-image'
		return axiosClient.post(url, data)
	},

	deleteImage(data) {
		const url = '/api/product/delete-image'
		return axiosClient.post(url, data)
	},

	addProductOption(data) {
		const url = '/api/product/product-option'
		return axiosClient.post(url, data)
	},

	updateProductOption(data) {
		const { id, ...restData } = data
		const url = `/api/product/product-option/${id}`
		return axiosClient.put(url, restData)
	},

	deleteProductOption(id) {
		const url = `/api/product/product-option/${id}`
		return axiosClient.delete(url)
	},
}

export default productApi
