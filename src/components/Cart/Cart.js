import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const allProducts = useSelector(state => state.cart.products)
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {allProducts?.map((product, index) => {
          return <CartItem
            key={index}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            total={product.total}
            quantity={product.quantity}

          />
        })}

      </ul>
    </Card>
  );
};

export default Cart;
