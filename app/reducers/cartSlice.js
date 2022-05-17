import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cartApi from '../../api/cartApi'

export const getAllCartItems = createAsyncThunk(
	'cart/getAllCartItems',
	async (payload, thunkAPI) => {
		try {
			const response = await cartApi.getAll(payload)
			return response.content
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const addCartItem = createAsyncThunk(
	'cart/addCartItem',
	async (payload, thunkAPI) => {
		try {
			const response = await cartApi.add(payload)
			await thunkAPI.dispatch(getAllCartItems(payload.user_id)).unwrap()

			return response
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const updateCartItem = createAsyncThunk(
	'cart/updateCartItem',
	async (payload, thunkAPI) => {
		try {
			const { userId, data } = payload
			const response = await cartApi.update(data)
			await thunkAPI.dispatch(getAllCartItems(userId)).unwrap()

			return response
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const deleteCartItem = createAsyncThunk(
	'cart/deleteCartItem',
	async (payload, thunkAPI) => {
		try {
			const { id, userId } = payload
			const response = await cartApi.delete(id)
			await thunkAPI.dispatch(getAllCartItems(userId)).unwrap()

			return response
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cartItems: [],
	},
	reducers: {
		resetCartItems(state, action) {
			state.cartItems = []
		},
	},
	extraReducers: {
		[getAllCartItems.fulfilled]: (state, action) => {
			state.cartItems = action.payload
		},
	},
})

const { reducer, actions } = cartSlice
export const { resetCartItems } = actions

export default reducer
