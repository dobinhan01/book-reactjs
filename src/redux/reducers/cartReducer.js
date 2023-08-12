import {
    ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_TO_CART, CHANGE_PRODUCT_TO_CART
} from '../actions/cartAction'

const INITIAL_STATE = {
    products: [],
    quantity: 0,
    total: 0
};

const cartReducer = (state = INITIAL_STATE, action) => {
    let carts = [];
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            const handleAddProduct = (product) => {
                const arr = state.products;
                const cloneProducts = state.products?.map((item) => item.title);
                const ind = cloneProducts.indexOf(product.title);
                if (ind === -1) {
                    carts = [...arr, product];
                    return carts;
                } else {
                    arr[ind].quantity += product.quantity;
                    if (arr[ind].quantity === 0) arr[ind].quantity = 1;
                    carts = [...arr];
                    return carts;
                }
            }
            return {
                ...state,
                products: handleAddProduct(action.product),
                quantity: carts.length,
                total: carts.reduce((sum, item) => sum + item.quantity * item.price, 0)
            }
        case REMOVE_PRODUCT_TO_CART:
            const handleRemove = (product) => {
                carts = state.products.filter(item => item.id !== product.id);
                return carts
            }
            return {
                ...state,
                products: handleRemove(action.product),
                quantity: carts.length,
                total: carts.reduce((sum, item) => sum + item.quantity * item.price, 0)
            }
        case CHANGE_PRODUCT_TO_CART:
            const handleChange = (product) => {
                const arr = state.products;
                const cloneProducts = state.products?.map((item) => item.title);
                const ind = cloneProducts.indexOf(product.title);
                arr[ind].quantity = product.quantity;
                carts = [...arr];
                return carts
            }
            return {
                ...state,
                products: handleChange(action.product),
                quantity: carts.length,
                total: carts.reduce((sum, item) => sum + item.quantity * item.price, 0)
            }

        default: return state;
    }
}

export default cartReducer;