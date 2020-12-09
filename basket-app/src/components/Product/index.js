import React from "react";
import {
    Container,
    ProductArea,
    ProductDescription,
    ProductDescriptionName,
    ProductDescriptionPrice,
    ProductDescriptionPriceIcon,
    ProductDescriptionPriceValue,
    ProductDescriptionButton
} from './styles'
import api from "@services/Api"
import { Card, Button, notification } from 'antd';
import { DollarCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'
import { addToCart } from "@redux/Cart/cart.actions";
import { NOTIFICATION_TYPE_SUCCESS } from "@utils/constants"
import { toDolar } from "@utils/helpers"

const Product = props => {
    const dispatch = useDispatch();

    async function add(product) {
        let productInfo = await api.get(`/products/${product.id}`).then(res => {
            return res.data;
        });

        dispatch(addToCart(productInfo));

        notification[NOTIFICATION_TYPE_SUCCESS]({
            message: 'Product added',
            description:
                `${product.name} was added on your basket`,
        });
    }

    const gridStyle = {
        width: '100%',
        textAlign: 'center',
        marginTop: 16,
        backgroundColor: "#fff"
    };

    return (
        <Container>
            <Card.Grid style={gridStyle} >
                <ProductArea>
                    <ProductDescription>
                        <ProductDescriptionName>{props.product.name}</ProductDescriptionName>
                        <ProductDescriptionPrice>
                            <ProductDescriptionPriceIcon>
                                <DollarCircleOutlined />
                            </ProductDescriptionPriceIcon>
                            <ProductDescriptionPriceValue>
                                {toDolar(props.product.price)}
                            </ProductDescriptionPriceValue>
                        </ProductDescriptionPrice>
                    </ProductDescription>
                    <ProductDescriptionButton>
                        <Button style={{ width: "100%" }} type="primary" shape="round" icon={<PlusOutlined />} size="small" onClick={() => add(props.product)}>
                            Add
                        </Button>
                    </ProductDescriptionButton>
                </ProductArea>
            </Card.Grid>
        </Container>
    )
}

export default Product
