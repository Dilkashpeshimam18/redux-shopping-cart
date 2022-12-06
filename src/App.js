import React, { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from './store/slice/cartSlice';
import Notification from './components/UI/Notification';
let isInitial = true
function App() {
  const showCart = useSelector(state => state.cart.showCart)
  const cart = useSelector(state => state.cart.products)
  const notification = useSelector(state => state.cart.notify)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleSendData = async () => {
      dispatch(cartActions.showNotify({
        status: 'pending',
        title: 'Sending',
        message: 'Sending cart data'
      }))
      const response = await fetch('https://clone-e78d9-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      })

      if (!response.ok) {
        dispatch(cartActions.showNotify({
          status: 'error',
          title: 'Error',
          message: 'Failed'
        }))
      }
      const result = await response.json()
      dispatch(cartActions.showNotify({
        status: 'success',
        title: 'Success',
        message: 'Cart data sent successfully'
      }))
    }

    if (isInitial) {
      isInitial = false
      return;
    }
    handleSendData().catch(err => {
      dispatch(cartActions.showNotify({
        status: 'error',
        title: 'Error',
        message: 'Failed'
      }))
    })

  }, [cart, dispatch])
  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}

      <Layout>
        {showCart && <Cart />}

        <Products />
      </Layout>
    </>

  );
}

export default App;
