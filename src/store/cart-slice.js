import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

// const itemsInitialState = {
// 	id: '',
// 	name: '',
// 	price: 0,
// 	quantity: 0,
// };

const initialState = {
	items: [],
	totalQuantity: 0,
	totalPrice: 0,
	changed: false,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			state.changed = true;

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
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.totalPrice = action.payload.totalPrice;
			state.items = action.payload.items;
			state.changed = false;
		},
		incrementItem(state, action) {
			state.changed = true;
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
			state.changed = true;
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
