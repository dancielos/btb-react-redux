import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

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

export const sendCartData = function (cart) {
	return async (dispatch) => {
		try {
			dispatch(
				uiActions.showNotification({
					status: 'pending',
					title: 'Sending...',
					message: 'Sending cart data!',
				})
			);
			const response = await fetch(
				'https://practice-redux-2f6cf-default-rtdb.firebaseio.com/cart.json',
				{ method: 'PUT', body: JSON.stringify(cart) }
			);

			if (!response.ok) {
				throw new Error('Sending cart data failed.');
			}

			// const resData = await response.json();
			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Successfully sent cart data.',
				})
			);
		} catch (err) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Failed to send cart data. \n' + err,
				})
			);
		}
	};
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
