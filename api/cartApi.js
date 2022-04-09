import axiosClient from './axiosClient'

const cartApi = {
	getAll(userId) {
		const url = '/api/cart'
		return axiosClient.get(url, { params: { user_id: userId } })
	},
	add(data) {
		const url = '/api/cart'
		return axiosClient.post(url, data)
	},
	update(data) {
		const url = `/api/cart/${data.id}`
		return axiosClient.put(url, data)
	},
	delete(id) {
		const url = `/api/cart/${id}`
		return axiosClient.delete(url)
	},
}

export default cartApi
