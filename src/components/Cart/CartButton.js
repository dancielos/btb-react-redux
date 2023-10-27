import classes from './CartButton.module.css';
// import { cartActions } from '../../store/cart-slice';
import { uiActions } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
	const cartNumberOfItems = useSelector((state) => state.cart.totalQuantity);

	const dispatch = useDispatch();

	const handleCartButton = function () {
		dispatch(uiActions.toggle());
	};
	return (
		<button className={classes.button} onClick={handleCartButton}>
			<span>My Cart</span>
			<span className={classes.badge}>{cartNumberOfItems}</span>
		</button>
	);
};

export default CartButton;
