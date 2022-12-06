import classes from './CartButton.module.css';
import { cartActions } from '../../store/slice/cartSlice';
import { useDispatch } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch()

  const handleShowCart = () => {
    dispatch(cartActions.handleCart())
  }
  return (
    <button onClick={handleShowCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
