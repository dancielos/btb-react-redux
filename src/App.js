import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
	const isCartOpen = useSelector((state) => state.ui.isCartOpen);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);
	const dispatch = useDispatch();

	useEffect(() => {
		const sendCartData = async function () {
			if (isInitial) {
				isInitial = false;
				return;
			}
			try {
				dispatch(
					uiActions.showNotification({
						status: 'pending',
						title: 'Sending...',
						message: 'Sending cart cata!',
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
		sendCartData();
	}, [cart, dispatch]);

	return (
		<>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{isCartOpen && <Cart />}
				<Products />
			</Layout>
		</>
	);
}

export default App;
