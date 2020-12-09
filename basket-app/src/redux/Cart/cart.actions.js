import { ADD_TO_CART, CLEAR_CART } from './cart.types';

export const addToCart = (productInfo) => {
    return {
        type: ADD_TO_CART,
        product: productInfo
    };
}

export const clearCart = (productInfo) => {
    return {
        type: CLEAR_CART
    };
}