import ProductItem from './ProductItem';
import classes from './Products.module.css';

const testProducts = [
	{
		id: 'f1',
		name: 'Avocado',
		price: 6,
		description: 'You want some avocado?',
	},
	{ id: 'f2', name: 'Banana', price: 4, description: 'Babababa baba nana' },
	{
		id: 'f3',
		name: 'Dragon fruit',
		price: 12,
		description: 'The most epic name for a fruit. ',
	},
];

const Products = (props) => {
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{testProducts.map((product) => {
					return (
						<ProductItem
							key={product.id}
							id={product.id}
							name={product.name}
							price={product.price}
							description={product.description}
						/>
					);
				})}
			</ul>
		</section>
	);
};

export default Products;
