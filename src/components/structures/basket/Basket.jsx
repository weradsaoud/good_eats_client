import { Add, Delete, Mail } from "@mui/icons-material";
import { Avatar, Badge, IconButton } from "@mui/material";
import React from "react";
import { Button, List, ListItem } from "react-onsenui";
import { connect } from "react-redux";
import BasketToolbar from "../../views/baskettoolbar/BasketToolbar";
import './basket.css'
import * as actionsTypes from '../../../store/actions/actionsTypes';
import { useNavigate } from "react-router";
import routes from "../../../globals/routes";

function Basket(props) {

    let navigate = useNavigate();

    const renderHeader = () => {
        return (
            <div className="basket_list_header">
                Basket
            </div>
        )
    };
    const renderOptionsHeader = () => {
        return (
            <div className="basket_item_options_literal">
                Options
            </div>
        );
    };

    const renderExtrasHeader = () => {
        return (
            <div className="basket_item_options_literal">
                Extras
            </div>
        );
    };

    const deleteBasketItem = (e, basketItem) => {
        e.preventDefault();
        e.stopPropagation();
        props.deleteBasketItem(basketItem);
    };

    const incrementCount = (e, basketItem) => {
        e.preventDefault();
        e.stopPropagation();
        props.incrementCount(basketItem);
        console.log('basket: ', props.basket);

    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        props.basket.forEach((basketItem, idx) => {
            if (basketItem.basketItemPrice == '') {

            } else {
                totalPrice = totalPrice + parseFloat(basketItem.basketItemPrice) * basketItem.count;
            }
        });
        return totalPrice;
    }

    const checkout = () => {
        navigate(routes.loginPageUrl);
    };

    return (
        <div className="basket_content">
            <BasketToolbar />
            <div className="order_content">
                <div className="your_oreder_literal">
                    Your order
                </div>
                <div className="basket_items_list">
                    <List modifier={'noborder'}
                        dataSource={props.basket}
                        renderHeader={renderHeader}
                        renderRow={
                            (basketItem, idx) => {

                                let variantKeys = Object.keys(basketItem.variant);
                                let options = variantKeys.map((k, idx) => {
                                    let option = {};
                                    option[k] = basketItem.variant[k];
                                    return option;
                                });

                                let basketItemPrice = parseFloat(basketItem.basketItemPrice) * basketItem.count;

                                return (
                                    <ListItem key={idx} expandable tappable modifier='nodivider'>
                                        <div className="left">
                                            <div className="listitem_store_logo_div">
                                                <Avatar
                                                    alt={basketItem.item.item_name}
                                                    src={basketItem.item.item_img}
                                                    sx={{ width: 54, height: 54 }}
                                                    variant='circular'
                                                />
                                            </div>
                                        </div>
                                        <div className="center">
                                            <div className="basket_item_center">
                                                <div className="basket_item_info_controls">
                                                    <div className="basket_item_name">
                                                        {basketItem.item.item_name}
                                                    </div>
                                                    <div className="basket_controls" style={{ 'zIndex': '1000000' }}>
                                                        <IconButton onClick={(e) => deleteBasketItem(e, basketItem)} size="small" color='error' style={{ 'zIndex': '1000000' }}>
                                                            <Delete fontSize="small" style={{ 'color': '#ff2650' }} />
                                                        </IconButton>
                                                        <div className="basket_item_count">
                                                            <Badge badgeContent={basketItem.count} color="primary" />
                                                        </div>
                                                        <IconButton onClick={(e) => incrementCount(e, basketItem)} size="small" color='success' style={{ 'zIndex': '1000' }}>
                                                            <Add fontSize="small" style={{ 'color': 'rgb(10, 131, 5)' }} />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                                <div className="basket_item_price">
                                                    {basketItemPrice}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="expandable-content">
                                            <div className="basket_item_options_extras">
                                                <div className="basket_item_options">

                                                    <div className="basket_item_options_list">
                                                        <List
                                                            dataSource={options}
                                                            renderHeader={renderOptionsHeader}
                                                            renderRow={(option, idx) => {
                                                                let optionName = Object.keys(option)[0];
                                                                let optionValue = option[optionName];
                                                                return (
                                                                    <ListItem key={idx} modifier='material'>
                                                                        <div className="left">
                                                                            <div className="basket_item_option_name">
                                                                                {optionName}
                                                                            </div>
                                                                        </div>
                                                                        <div className="center">
                                                                            <div className="basket_item_option_value">
                                                                                {optionValue}
                                                                            </div>
                                                                        </div>
                                                                    </ListItem>
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="basket_item_extras">

                                                    <div className="basket_item_extras_list">
                                                        <List
                                                            dataSource={basketItem.extras}
                                                            renderHeader={renderExtrasHeader}
                                                            renderRow={(extra, idx) => {
                                                                return (
                                                                    <ListItem key={idx} modifier='material'>
                                                                        <div className="left" style={{ width: '100%' }}>
                                                                            <div className="basket_item_extra_name">
                                                                                {extra.name}
                                                                            </div>
                                                                            <div className="basket_item_extra_price">
                                                                                {extra.price}
                                                                            </div>
                                                                        </div>
                                                                        <div className="center">

                                                                        </div>
                                                                        <div className="right">

                                                                        </div>
                                                                    </ListItem>
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ListItem>
                                )
                            }
                        }
                    //renderFooter={renderFooter}
                    />
                </div>
                {(props.basket.length > 0) ? <div className="basket_checkout_btn_div">
                    <Button onClick={checkout} className="basket_checkout_btn">
                        <span className="checkout_btn_content">Checkout</span>
                        <span className="checkout_btn_price">{calculateTotalPrice()}</span>
                    </Button>
                </div> : null}
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        basket: state.stores.basket,
        totalPrice: state.stores.totalPrice
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBasketItem: (basketItem) => dispatch({ type: actionsTypes.REMOVEFROMTOBASKET, basketItem: basketItem }),
        incrementCount: (basketItem) => dispatch({ type: actionsTypes.INCREMENTCOUNT, basketItem: basketItem })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);