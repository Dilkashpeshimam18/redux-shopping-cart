import classes from './CartItem.module.css';
import { cartActions } from '../../store/slice/cartSlice';
import { useDispatch } from 'react-redux';
const CartItem = ({ title, description, id, price, total, quantity }) => {
  const dispatch = useDispatch()
  const handleIncrement = (id) => {
    dispatch(cartActions.increment(id))
  }
  const handleDecrement = (id) => {
    dispatch(cartActions.decrement(id))
  }
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => handleDecrement(id)}>-</button>
          <button onClick={() => handleIncrement(id)}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
