import { createSlice } from "@reduxjs/toolkit";

const loadedData = []

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
        },

    }
})


export const sendRequestData = (cart) => {
    return async (dispatch) => {
        dispatch(cartActions.showNotify({
            status: 'pending',
            title: 'Sending',
            message: 'Sending cart data'
        }))
        const sendRequest = async () => {
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

        }
        try {
            await sendRequest()

            dispatch(cartActions.showNotify({
                status: 'success',
                title: 'Success',
                message: 'Cart data sent successfully'
            }))

        } catch (err) {
            console.log(err)
            dispatch(cartActions.showNotify({
                status: 'error',
                title: 'Error',
                message: 'Failed'
            }))
        }

    }
}

export const getRequestData = (cart) => {
    return async (dispatch, state) => {
        dispatch(cartActions.showNotify({
            status: 'pending',
            title: 'Retrieving',
            message: 'Retrieving cart data'
        }))



        const getRequest = async () => {
            const response = await fetch('https://clone-e78d9-default-rtdb.firebaseio.com/cart.json')
            console.log(response)

            if (!response.ok) {
                dispatch(cartActions.showNotify({
                    status: 'error',
                    title: 'Error',
                    message: 'Failed retireving cart data'
                }))
            }

            const result = await response.json()
            console.log(result)

            for (let key in result) {
                loadedData.push({
                    id: result[key].id,
                    title: result[key].title,
                    description: result[key].description,
                    price: result[key].price,
                    quantity: result[key].quantity,
                    total: result[key].total

                })
            }

            state.products = loadedData

        }

        try {
            await getRequest()

            dispatch(cartActions.showNotify({
                status: 'success',
                title: 'Success',
                message: 'Cart data retrived successfully'
            }))

        } catch (err) {
            console.log(err)
            dispatch(cartActions.showNotify({
                status: 'error',
                title: 'Error',
                message: 'Failed retireving cart data'
            }))
        }
    }
}
export const cartActions = cartSlice.actions
export default cartSlice.reducer