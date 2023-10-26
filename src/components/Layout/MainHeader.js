import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
	// const isCartOpen = useSelector((state) => state.cart.isCartOpen);

	return (
		<header className={classes.header}>
			<h1>ReduxCart</h1>
			<nav>
				<ul>
					<li>
						<CartButton />
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainHeader;
