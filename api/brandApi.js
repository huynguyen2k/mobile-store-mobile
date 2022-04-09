import axiosClient from './axiosClient'

const brandApi = {
	getAll(published) {
		const url = '/api/brands'
		return axiosClient.get(url, { params: { published } })
	},
	get(id) {
		const url = `/api/brands/${id}`
		return axiosClient.get(url)
	},
	add(data) {
		const url = '/api/brands'
		return axiosClient.post(url, data)
	},
	update(data) {
		const url = `/api/brands/${data.id}`
		return axiosClient.put(url, data)
	},
	delete(id) {
		const url = `/api/brands/${id}`
		return axiosClient.delete(url)
	},
}

export default brandApi
