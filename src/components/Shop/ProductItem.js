import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart-slice';

const ProductItem = (props) => {
	const { id, name, price, description } = props;

	const cart = useSelector((state) => state.cart);
	console.log(cart);

	const dispatch = useDispatch();

	const handleAddToCart = function (item) {
		dispatch(cartActions.addItem({ item }));
	};

	return (
		<li className={classes.item}>
			<Card>
				<header>
					<h3>{name}</h3>
					<div className={classes.price}>${price.toFixed(2)}</div>
				</header>
				<p>{description}</p>
				<div className={classes.actions}>
					<button onClick={() => handleAddToCart({ id, name, price })}>
						Add to Cart
					</button>
				</div>
			</Card>
		</li>
	);
};

export default ProductItem;
