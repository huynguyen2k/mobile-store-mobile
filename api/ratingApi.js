import axiosClient from './axiosClient'

const ratingApi = {
	getAll(params) {
		const url = '/api/rating'
		return axiosClient.get(url, { params })
	},
	add(data) {
		const url = '/api/rating'
		return axiosClient.post(url, data)
	},
	uploadImage(data) {
		const url = '/api/rating/upload-image'
		return axiosClient.post(url, data)
	},
	deleteImage(data) {
		const url = '/api/rating/delete-image'
		return axiosClient.post(url, data)
	},
	delete(id) {
		const url = `/api/rating/${id}`
		return axiosClient.delete(url)
	},
}

export default ratingApi
