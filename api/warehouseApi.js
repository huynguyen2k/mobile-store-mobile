import axiosClient from './axiosClient'

const receiptApi = {
	getAll() {
		const url = '/api/receipt'
		return axiosClient.get(url)
	},
	get(id) {
		const url = `/api/receipt/${id}`
		return axiosClient.get(url)
	},
	add(data) {
		const url = '/api/receipt'
		return axiosClient.post(url, data)
	},
}

export default receiptApi
