import React, { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from './store/slice/cartSlice';
import Notification from './components/UI/Notification';
import { sendRequestData } from './store/slice/cartSlice';
import { getRequestData } from './store/slice/cartSlice';
let isInitial = true
function App() {
  const showCart = useSelector(state => state.cart.showCart)
  const cart = useSelector(state => state.cart.products)
  const notification = useSelector(state => state.cart.notify)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(sendRequestData(cart))
    console.log(cart)

    dispatch(getRequestData(cart))

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
