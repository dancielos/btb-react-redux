import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice.js';
import uiSlice from './ui-slice.js';

const store = configureStore({
	reducer: {
		cart: cartSlice,
		ui: uiSlice,
	},
});

export default store;
