import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartActions } from '../../store/cart-slice';

const CartItem = (props) => {
	const { id, name, quantity, price } = props;

	const total = quantity * price;

	const dispatch = useDispatch();

	const handleIncrementItem = function (id) {
		dispatch(cartActions.incrementItem(id));
	};
	const handleDecrementItem = function (id) {
		dispatch(cartActions.decrementItem(id));
	};

	return (
		<li className={classes.item}>
			<header>
				<h3>{name}</h3>
				<div className={classes.price}>
					${total.toFixed(2)}{' '}
					<span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
				</div>
			</header>
			<div className={classes.details}>
				<div className={classes.quantity}>
					x <span>{quantity}</span>
				</div>
				<div className={classes.actions}>
					<button onClick={() => handleDecrementItem(id)}>-</button>
					<button onClick={() => handleIncrementItem(id)}>+</button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
