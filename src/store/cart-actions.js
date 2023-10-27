import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

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
				{
					method: 'PUT',
					body: JSON.stringify({
						items: cart.items,
						totalPrice: cart.totalPrice,
						totalQuantity: cart.totalQuantity,
					}),
				}
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

export const fetchCartData = function () {
	return async (dispatch) => {
		try {
			const response = await fetch(
				'https://practice-redux-2f6cf-default-rtdb.firebaseio.com/cart.json'
			);

			if (!response.ok) throw new Error('Failed to fetch data.');

			const resData = await response.json();

			dispatch(
				cartActions.replaceCart({
					items: resData.items || [],
					totalQuantity: resData.totalQuantity || 0,
					totalPrice: resData.totalPrice || 0,
				})
			);
			//if it contains some items coz firebase doesn't store empty arrays
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: error.message || 'Failed to fetch data.',
				})
			);
		}
	};
};
