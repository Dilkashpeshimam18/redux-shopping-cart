import { createSlice } from "@reduxjs/toolkit";


const initialCartState = {
    products: [],
    showCart: false,
    totalCart: 0,
    notify: null
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
        },
        increment(state, action) {
            let existingProductIndex = state.products.findIndex(ele => ele.id == action.payload)
            let existingProduct = state.products[existingProductIndex]
            let updatedItem;
            let updatedItems
            if (existingProduct) {

                updatedItem = {
                    ...existingProduct,
                    quantity: existingProduct.quantity + 1,
                    total: existingProduct.total + existingProduct.price
                }
            }
            updatedItems = [...state.products]
            updatedItems[existingProductIndex] = updatedItem
            state.products = updatedItems
        },
        decrement(state, action) {
            let existingProductIndex = state.products.findIndex(ele => ele.id == action.payload)
            let existingProduct = state.products[existingProductIndex]
            let updatedItem;
            let updatedItems
            if (existingProduct.quantity >= 2) {

                updatedItem = {
                    ...existingProduct,

                    quantity: existingProduct.quantity - 1,
                    total: existingProduct.total - existingProduct.price
                }
                updatedItems = [...state.products]
                updatedItems[existingProductIndex] = updatedItem
                state.products = updatedItems

            } else {
                let filterProduct = state.products.filter((item) => {
                    return item.id != action.payload
                })
                state.products = filterProduct
            }


        },
        showNotify(state, action) {
            state.notify = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer