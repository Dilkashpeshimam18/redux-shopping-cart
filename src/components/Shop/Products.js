import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          id={1}
          title='Test'
          price={6}
          description='This is a first product - amazing!'
        />
        <ProductItem
          id={2}
          title='Test2'
          price={8}
          description='This is a second product - amazing!'
        />
        <ProductItem
          id={3}
          title='Test3'
          price={7}
          description='This is a third product - amazing!'
        />
      </ul>
    </section>
  );
};

export default Products;
