import { createSlice } from "@reduxjs/toolkit";


const initialCartState = {
    products: [],
    showCart: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        handleCart(state) {
            state.showCart = !state.showCart
        },
        addToCart(state, action) {
            state.products.push(action.payload)
        }
    }
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer