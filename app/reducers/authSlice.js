import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from '../../api/userApi'

export const login = createAsyncThunk(
	'auth/login',
	async (payload, thunkAPI) => {
		try {
			const response = await userApi.login(payload)
			const { user, accessToken } = response.content

			return user
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		loggedIn: false,
	},
	reducers: {},
	extraReducers: {
		[login.fulfilled]: (state, action) => {
			state.user = action.payload
			state.loggedIn = true
		},
	},
})

const { reducer } = authSlice

export default reducer
