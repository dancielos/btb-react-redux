import classes from './CartButton.module.css';
import { cartActions } from '../../store/cart-slice';
import { useDispatch } from 'react-redux';

const CartButton = (props) => {
	const dispatch = useDispatch();

	const handleCartButton = function () {
		dispatch(cartActions.toggle());
	};
	return (
		<button className={classes.button} onClick={handleCartButton}>
			<span>My Cart</span>
			<span className={classes.badge}>1</span>
		</button>
	);
};

export default CartButton;
