import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		value: 1,
	},
	reducers: {},
	extraReducers: {},
})

const { reducer } = counterSlice
export default reducer
