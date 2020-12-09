import React from "react";
import {
    Container,
    CartAreaProducts,
    CartEmpty,
    PriceDecoration,
    PromotionalPrice,
    NormalPrice,
    CartAreaProductsTotal
} from './styles'
import { Card, Alert, Table } from 'antd';
import { toDolar } from "@utils/helpers"
import {
    CHECKOUT_TOTAL,
    CHECKOUT_TOTAL_PROMOS,
    CHECKOUT_TOTAL_PAYABLE
} from "@utils/constants"

const CheckoutTable = props => {

    const { cart } = props;

    let newTotals = {};

    let totals = {
        CHECKOUT_TOTAL: {
            key: 'CHECKOUT_TOTAL',
            title: CHECKOUT_TOTAL,
        },
        CHECKOUT_TOTAL_PROMOS: {
            key: 'CHECKOUT_TOTAL_PROMOS',
            title: CHECKOUT_TOTAL_PROMOS,
        },
        CHECKOUT_TOTAL_PAYABLE: {
            key: 'CHECKOUT_TOTAL_PAYABLE',
            title: CHECKOUT_TOTAL_PAYABLE,
        }
    }

    const totalColumns = [
        {
            title: 'totalName',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'value',
            key: 'key',
            dataIndex: 'key',
            render: key => {
                const reducer = (accumulator, element) => accumulator + element[key];
                var newValue = (Object.values(newTotals)).reduce(reducer, 0);

                return (
                    <span>{toDolar(newValue)}</span>
                )
            }
        },
    ];

    const columns = [
        {
            title: 'Item',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'prices',
            render: prices => (
                <span>
                    {
                        prices.promotionalPrice ?
                            <>
                                <PriceDecoration>{toDolar(prices.originalPrice)}</PriceDecoration>
                                <PromotionalPrice>{toDolar(prices.promotionalPrice)}</PromotionalPrice>
                            </>
                            :
                            <NormalPrice>
                                {toDolar(prices.originalPrice)}
                            </NormalPrice>
                    }
                </span>
            ),
        },
        {
            title: 'Quantity',
            key: 'qtys',
            dataIndex: 'qtys',
            render: qtys => (<span>{qtys.originalQty}</span>)
        },
        {
            title: 'Subtotal',
            key: 'subtotal',
            dataIndex: ['prices', 'qtys'],
            render: (text, record) => {
                const { prices, qtys, id } = record;
                let promotionalValue = 0, originalValue = 0;

                const subTotals = {
                    CHECKOUT_TOTAL_PROMOS: 0,
                    CHECKOUT_TOTAL: 0,
                    CHECKOUT_TOTAL_PAYABLE: 0
                };

                const withOutPromotionalValue = qtys.originalQty * prices.originalPrice;

                if (prices.promotionalPrice && qtys.qtyHalfPrice) {
                    if (qtys.qtyHalfPrice && prices.promotionalPrice) {
                        promotionalValue = qtys.qtyHalfPrice * prices.promotionalPrice;
                    }

                    if (qtys.qtyFullPrice && prices.originalPrice) {
                        originalValue = qtys.qtyFullPrice * prices.originalPrice;
                    }

                    subTotals.CHECKOUT_TOTAL_PROMOS += withOutPromotionalValue - (originalValue + promotionalValue);
                } else {
                    if (qtys.originalQty && prices.promotionalPrice) {
                        originalValue = qtys.originalQty * prices.promotionalPrice;
                        subTotals.CHECKOUT_TOTAL_PROMOS += withOutPromotionalValue - (originalValue);
                    } else {
                        originalValue = withOutPromotionalValue;
                    }
                }

                let subTotal = promotionalValue + originalValue;
                subTotals.CHECKOUT_TOTAL += withOutPromotionalValue;
                subTotals.CHECKOUT_TOTAL_PAYABLE += subTotal;
                newTotals[id] = subTotals;
                return (
                    <span>
                        {toDolar(subTotal)}
                    </span>
                )
            }
        }
    ];

    const data = Object.keys(cart).map((productId, index) => {
        let product = cart[productId];
        return {
            key: index,
            name: product.name,
            id: product.id,
            qtys: { originalQty: product.qty, qtyFullPrice: product.qtyFullPrice ?? 0, qtyHalfPrice: product.qtyHalfPrice ?? 0 },
            prices: { promotionalPrice: product.promotionalPrice ?? 0, originalPrice: product.originalPrice },

        }
    });

    return (
        <Container>
            <Card style={{ width: "100%" }}>
                <CartAreaProducts>
                    {Object.keys(cart).length ?
                        <>
                            <Table columns={columns} dataSource={data} size="small" />
                            <CartAreaProductsTotal>
                                <Table style={{ width: "400px", marginLeft: "auto" }} pagination={false} columns={totalColumns} showHeader={false} dataSource={Object.values(totals)} size="small" />
                            </CartAreaProductsTotal>
                        </>
                        : (
                            <CartEmpty>
                                <Alert message="OPS! Your cart is empty" type="warning" />
                            </CartEmpty>
                        )
                    }
                </CartAreaProducts>
            </Card>
        </Container>
    )
}

export default CheckoutTable
