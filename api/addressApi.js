import axiosClient from './axiosClient'

const addressApi = {
	getAll(userId) {
		const url = '/api/address'
		return axiosClient.get(url, { params: { user_id: userId } })
	},
	add(data) {
		const url = '/api/address'
		return axiosClient.post(url, data)
	},
	update(data) {
		const url = `/api/address/${data.id}`
		return axiosClient.put(url, data)
	},
	delete(id) {
		const url = `/api/address/${id}`
		return axiosClient.delete(url)
	},
}

export default addressApi
