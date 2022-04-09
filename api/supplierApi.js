import axiosClient from './axiosClient'

const supplierApi = {
	getAll() {
		const url = '/api/supplier'
		return axiosClient.get(url)
	},
	add(data) {
		const url = '/api/supplier'
		return axiosClient.post(url, data)
	},
	update(data) {
		const url = `/api/supplier/${data.id}`
		return axiosClient.put(url, data)
	},
	delete(id) {
		const url = `/api/supplier/${id}`
		return axiosClient.delete(url)
	},
}

export default supplierApi
