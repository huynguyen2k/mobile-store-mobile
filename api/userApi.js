import axiosClient from './axiosClient'

const userApi = {
	login(data) {
		const url = '/api/users/login'
		return axiosClient.post(url, data)
	},

	register(data) {
		const url = '/api/users/register'
		return axiosClient.post(url, data)
	},

	add(data) {
		const url = '/api/users'
		return axiosClient.post(url, data)
	},

	update(data) {
		const url = '/api/users/update'
		return axiosClient.put(url, data)
	},

	updatePassword(data) {
		const url = '/api/users/update-password'
		return axiosClient.put(url, data)
	},

	delete(id) {
		const url = `/api/users/${id}`
		return axiosClient.delete(url)
	},

	getAllRole() {
		const url = '/api/users/get-all-role'
		return axiosClient.get(url)
	},

	getAllStaff() {
		const url = '/api/users/get-all-staff'
		return axiosClient.get(url)
	},

	getAllCustomer() {
		const url = '/api/users/get-all-customer'
		return axiosClient.get(url)
	},
}

export default userApi
