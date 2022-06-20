import React, { useEffect, useState } from "react";
import { Page, List, ListItem, Dialog } from "react-onsenui";
import { Search, ShoppingBasket, AccessTime } from '@mui/icons-material';
import { Avatar, Button, FormControl, Input, InputAdornment, LinearProgress } from '@mui/material';
import './storeslist.css';
import { useLocation, useNavigate } from "react-router";
import routes from "../../../globals/routes";
import { connect } from "react-redux";
import * as actionsTypes from '../../../store/actions/actionsTypes';
import ons from "onsenui";

function StoresList(props) {

    let [pullHookState, setPullHookState] = useState('');
    let navigate = useNavigate();

    useEffect(() => {

        props.getStores();
        return () => {
            props.unmountStoresLists();
        };
    }, []);

    const renderHeader = () => {
        return (
            <div className="stores_search_wrapper">
                {/* <SearchInput style={{ "width": "100%" }} modifier="material" /> */}
                <FormControl variant="standard" className="stores_list_search_field">
                    {/* <InputLabel htmlFor="input-with-icon-adornment">
                        With a start adornment
                    </InputLabel> */}
                    <Input
                        id="input-with-icon-adornment"
                        placeholder="search for stores"
                        startAdornment={
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
        );
    };

    const onChange = (pullState) => {

    };
    const onLoad = () => {

    };
    const storeClickHandler = (store) => {
        navigate(routes.storePageUrl, { state: store });
    };

    let view;

    if (props.gettingStores) {
        view = <LinearProgress color="success" />;
    } else {
        view = (
            <div className="stores_body_content_wrapper">
                <div className="stores_search_wrapper">
                    <FormControl variant="standard" className="stores_list_search_field">
                        <Input
                            id="input-with-icon-adornment"
                            placeholder="search for stores"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>

                <List
                    dataSource={props.stores}
                    //renderHeader={renderHeader}
                    renderRow={
                        (row, idx) => {
                            let orderingTypes = '';
                            if (row.orderingTypes && row.orderingTypes.length > 0) {
                                row.orderingTypes.forEach((type, idx) => {
                                    if (idx == 0) {
                                        orderingTypes = type;
                                    } else {
                                        orderingTypes = orderingTypes + ' - ' + type;
                                    }
                                });
                            }
                            return (
                                <ListItem onClick={() => storeClickHandler(row)} key={idx} tappable={true} modifier='material'>
                                    <div className="left">
                                    </div>
                                    <div className="center">
                                        {/* <div className="store_item"> */}
                                        <div className="store_item_wrapper">
                                            <div className="listitem_store_props_div">
                                                <div className="listitem_store_name_div">
                                                    <strong className="listitem_store_name">
                                                        {row.name}
                                                    </strong>
                                                </div>
                                                <div className="listitem_store_description_div">
                                                    {row.description}
                                                </div>
                                                <div className="listitem_store_orderingTypes_div">
                                                    {orderingTypes}
                                                </div>
                                            </div>
                                            <div className="listitem_store_logo_div">
                                                <Avatar
                                                    alt={row.name}
                                                    src={row.logo}
                                                    sx={{ width: 65, height: 65 }}
                                                />
                                            </div>
                                        </div>
                                        <div className="store_item_info">
                                            <div className="firstBtn">
                                                <Button disabled style={{ "width": "100%", "textTransform": "none", "background": "#ecfaf6", "padding": "5px 40px 5px 16px" }} variant="contained" startIcon={<ShoppingBasket />}>
                                                    <span style={{ 'marginLeft': 'auto', 'marginRight': 'auto' }}>{'~' + row.maxServeTime}</span>
                                                </Button>
                                            </div>
                                            <div className="secondBtn">
                                                <Button disabled style={{ "width": "100%", "textTransform": "none", "background": "#ecfaf6", "padding": "5px 40px 5px 16px" }} variant="contained" startIcon={<AccessTime />}>
                                                    <span style={{ 'marginLeft': 'auto', 'marginRight': 'auto' }}>{(row.opened) ? 'Opened' : 'Closed'}</span>
                                                </Button>
                                            </div>
                                        </div>
                                        {/* </div> */}
                                    </div>
                                </ListItem>
                            )
                        }
                    }
                //renderFooter={renderFooter}
                />
            </div>
        );

    }

    return view;
}

const mapStateToProps = (state) => {
    return {
        stores: state.stores.stores,
        gettingStores: state.stores.gettingStores
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStores: () => dispatch({ type: actionsTypes.GETSTORES }),
        unmountStoresLists: () => dispatch({ type: actionsTypes.UNMOUNTSTORESLISTS })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoresList);