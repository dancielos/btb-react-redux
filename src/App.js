import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-actions';
import { fetchCartData } from './store/cart-actions';

let isInitial = true;

//TODO:
//things that are going wrong:
//1. addItem(does not sendCartData())

function App() {
	const isCartOpen = useSelector((state) => state.ui.isCartOpen);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	useEffect(() => {
		if (isInitial) {
			isInitial = false;
			return;
		}

		if (cart.changed) {
			dispatch(sendCartData(cart));
		}
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
