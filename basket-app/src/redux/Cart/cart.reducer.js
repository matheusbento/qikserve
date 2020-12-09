import { ADD_TO_CART, CLEAR_CART } from './cart.types';
import {
    PRODUCT_PROMOTION_TYPE_BUY_X_GET_Y_FREE,
    PRODUCT_PROMOTION_TYPE_QTY_BASED_PRICE_OVERRIDE,
    PRODUCT_PROMOTION_TYPE_FLAT_PERCENT,
    PRODUCT_PROMOTION_TYPE_BUY_X_GET_Y_FREE_NAME
} from "@utils/constants"

const INITIAL_STATE = {
    list: [],
    totals: {}
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let newCart = {};

            const { product } = action;

            let productOnCart = state.list[product.id] ?? { qty: 0 };

            productOnCart = { qty: productOnCart.qty + 1, originalPrice: product.price, name: product.name, id: product.id }

            if (product.promotions.length) {
                let promotions = product.promotions;

                promotions.forEach(promotion => {
                    if (promotion.type === PRODUCT_PROMOTION_TYPE_BUY_X_GET_Y_FREE) {
                        let qtyFreeProduct = 0;

                        if (productOnCart.qty >= promotion.required_qty) {
                            qtyFreeProduct = Math.floor(productOnCart.qty / promotion.required_qty);

                            newCart[promotion.id] = {
                                id: promotion.id,
                                qty: qtyFreeProduct,
                                originalPrice: 0,
                                name: PRODUCT_PROMOTION_TYPE_BUY_X_GET_Y_FREE_NAME
                            };
                        }
                    } else if (promotion.type === PRODUCT_PROMOTION_TYPE_QTY_BASED_PRICE_OVERRIDE) {
                        if (productOnCart.qty >= promotion.required_qty) {
                            var quotient = Math.floor(productOnCart.qty / promotion.required_qty);
                            var remainder = productOnCart.qty % promotion.required_qty;
                            productOnCart = { ...productOnCart, promotionalPrice: promotion.price / promotion.required_qty, qtyFullPrice: remainder, qtyHalfPrice: quotient * promotion.required_qty }
                        }
                    } else if (promotion.type === PRODUCT_PROMOTION_TYPE_FLAT_PERCENT) {
                        productOnCart = { ...productOnCart, promotionalPrice: product.price - (product.price * (promotion.amount / 100)) }

                    }
                });
            }

            newCart[product.id] = productOnCart;

            return { ...state, list: { ...state.list, ...newCart } }

        case CLEAR_CART:
            return { ...state, list: { } }

        default: return state;
    }
};

export default reducer;