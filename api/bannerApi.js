import axiosClient from './axiosClient'

const bannerApi = {
	getAll(published) {
		const url = `/api/banners${
			published === undefined ? '' : `?published=${published}`
		}`
		return axiosClient.get(url)
	},
	add(data) {
		const url = '/api/banners'
		return axiosClient.post(url, data)
	},
	update(data) {
		const { id, ...restData } = data
		const formData = new FormData()
		for (const key in restData) {
			formData.append(key, restData[key])
		}

		const url = `/api/banners/${id}`
		return axiosClient.put(url, formData)
	},
	delete(id) {
		const url = `/api/banners/${id}`
		return axiosClient.delete(url)
	},
}

export default bannerApi
