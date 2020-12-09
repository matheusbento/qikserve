import React from "react";
import {
    Container,
    Cart,
    CartArea,
    CartFooter,
    CartAreaClear,
    CartAreaContent
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { clearCart } from "@redux/Cart/cart.actions";
import CheckoutTable from '@components/CheckoutTable';


const Checkout = props => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.list);

    const clear = () => {
        dispatch(clearCart());
    }

    return (
        <Container>
            <Cart>
                <CartArea>
                    <CartAreaClear>
                        <Button onClick={clear} type="danger" shape="round" icon={<DeleteOutlined />} size="small" style={{ marginLeft: "auto" }}>
                            Clear cart
                        </Button>
                    </CartAreaClear>
                    <CartAreaContent>
                        <CheckoutTable cart={cart}></CheckoutTable>
                    </CartAreaContent>
                </CartArea>
            </Cart>
            <CartFooter>
                <Button href="/" type="primary" shape="round" icon={<LeftOutlined />} size="small">
                    Back to buy
                </Button>
            </CartFooter>
        </Container>
    )
}

export default Checkout
