import { createSlice } from '@reduxjs/toolkit';

const itemsInitialState = {
	id: '',
	name: '',
	price: 0,
	quantity: 0,
};

const initialState = {
	isCartOpen: false,
	items: [],
	totalQuantity: 0,
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		toggle(state) {
			state.isCartOpen = !state.isCartOpen;
		},
		addItem(state, action) {
			const currentItems = [...state.items];

			const itemIndex = currentItems.findIndex(
				(item) => item.id === action.payload.item.id
			);

			if (itemIndex !== -1) {
				//the item already exists
				currentItems[itemIndex].quantity += 1;
			} else {
				currentItems.push({ ...action.payload.item, quantity: 1 });
			}

			state.items = [...currentItems];
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
