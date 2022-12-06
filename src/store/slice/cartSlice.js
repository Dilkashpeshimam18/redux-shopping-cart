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
            let existingProductIndex = state.products.findIndex(ele => ele.id == action.payload.id)
            let existingProduct = state.products[existingProductIndex]
            let updatedItem;
            let updatedItems
            if (existingProduct) {

                updatedItem = {
                    ...existingProduct,
                    quantity: existingProduct.quantity + action.payload.quantity,
                    total: existingProduct.total + action.payload.price
                }
                updatedItems = [...state.products]
                updatedItems[existingProductIndex] = updatedItem
                state.products = updatedItems

            } else {
                state.products.push(action.payload)

            }
        }
    }
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer