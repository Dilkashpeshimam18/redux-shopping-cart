import classes from './CartButton.module.css';
import { cartActions } from '../../store/slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch()
  let quantity = useSelector(state => state.cart.totalCart)
  const allProducts = useSelector(state => state.cart.products)
  quantity = allProducts.reduce((curr, item) => {
    return curr + item.quantity
  }, 0)
  const handleShowCart = () => {
    dispatch(cartActions.handleCart())
  }
  return (
    <button onClick={handleShowCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
