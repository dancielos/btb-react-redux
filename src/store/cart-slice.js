import { createSlice } from '@reduxjs/toolkit';

// const itemsInitialState = {
// 	id: '',
// 	name: '',
// 	price: 0,
// 	quantity: 0,
// };

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

			state.totalPrice += +action.payload.item.price;
			state.totalQuantity += 1;
			state.items = [...currentItems];
		},
		incrementItem(state, action) {
			const currentItems = [...state.items];

			const itemIndex = currentItems.findIndex(
				(item) => item.id === action.payload
			);

			currentItems[itemIndex].quantity += 1;

			state.totalPrice += +currentItems[itemIndex].price;
			state.totalQuantity += 1;
			state.items = [...currentItems];
		},
		decrementItem(state, action) {
			const currentItems = [...state.items];

			const itemIndex = currentItems.findIndex(
				(item) => item.id === action.payload
			);
			state.totalPrice -= +currentItems[itemIndex].price;
			state.totalQuantity -= 1;

			if (currentItems[itemIndex].quantity === 1)
				currentItems.splice(itemIndex, 1);
			else currentItems[itemIndex].quantity -= 1;

			state.items = [...currentItems];
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
