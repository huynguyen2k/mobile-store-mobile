import axiosClient from './axiosClient'

const orderApi = {
	getAll(customerId) {
		const url = '/api/order'
		return axiosClient.get(url, { params: { customerId } })
	},
	getAllOrderStatus() {
		const url = '/api/order/order-status'
		return axiosClient.get(url)
	},
	get(id) {
		const url = `/api/order/${id}`
		return axiosClient.get(url)
	},
	add(data) {
		const url = '/api/order'
		return axiosClient.post(url, data)
	},
	update(data) {
		const url = `/api/order/${data.id}`
		return axiosClient.put(url, data)
	},
}

export default orderApi
