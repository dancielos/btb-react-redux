import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {
	const isCartOpen = useSelector((state) => state.ui.isCartOpen);
	const cart = useSelector((state) => state.cart);

	useEffect(() => {
		fetch(
			'https://practice-redux-2f6cf-default-rtdb.firebaseio.com/cart.json',
			{ method: 'PUT', body: JSON.stringify(cart) }
		);
	}, [cart]);

	return (
		<Layout>
			{isCartOpen && <Cart />}
			<Products />
		</Layout>
	);
}

export default App;
