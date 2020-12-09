import React, { useState, useEffect } from "react";
import {
    Container,
    Warning,
    ProductsContent,
    ProductsArea,
    ProductsBasket,
    CartContentIcon,
    CartContent,
    CartContentValue
} from './styles'
import Product from "@components/Product"
import api from "@services/Api"
import { Button, Alert, Row, Col} from 'antd';
import { RightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux'

const Products = props => {
    const [products, setProducts] = useState([]);

    const calcTotal = ({ cart }) => {
        let total = 0;

        const { list } = cart;

        const cartKeys = Object.keys(list);
        if (cartKeys.length) {
            cartKeys.forEach(key => {
                total += list[key].qty;
            });
        }
        return total;
    }

    const total = useSelector(calcTotal);

    useEffect(() => {
        async function fetchData() {
            await api.get("/products").then(res => {
                setProducts(res.data);
            });
        }
        fetchData();
    }, []);

    return (
        <Container>
                <CartContent>
                    <Button href="/checkout" type="link" size="small">
                        <CartContentValue>
                            {total}
                        </CartContentValue>
                        <CartContentIcon>
                            <ShoppingCartOutlined />
                        </CartContentIcon>
                    </Button>
                </CartContent>

                {products.length ?
                    <ProductsContent>
                        <ProductsArea>
                            <Row>
                                {products.map((product, index) => (
                                    <Col span={6}>
                                        <Product key={index} product={product} style={{ width: "25%" }} />
                                    </Col>
                                ))}
                            </Row>
                        </ProductsArea>
                        <ProductsBasket>
                            <Button href="/checkout" style={{ marginLeft: "auto" }} type="primary" shape="round" icon={<RightOutlined />} size="small">
                                Go to Cart
                            </Button>
                        </ProductsBasket>
                    </ProductsContent>
                    :
                    <Warning>
                        <Alert message="OPS! We don't have any product to sale!" type="warning" />
                    </Warning>
                }
        </Container >
    )
}

export default Products
