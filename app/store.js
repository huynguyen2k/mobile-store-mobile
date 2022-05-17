import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import cartReducer from './reducers/cartSlice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
	},
})

export default store
