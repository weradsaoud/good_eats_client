import React, { useState } from "react";
import { Page, List, ListItem, SearchInput, PullHook, Icon } from "react-onsenui";
import { AccountCircle, Login, Store, Search, ShoppingBasket, AccessTime } from '@mui/icons-material';
import { Avatar, Button, FormControl, IconButton, Input, InputAdornment } from '@mui/material';
import './storeslist.css';
import { useNavigate } from "react-router";
import routes from "../../../globals/routes";

function StoresList() {

    let [pullHookState, setPullHookState] = useState('');
    let navigate = useNavigate();

    const stores = [
        {
            id: 1,
            name: "store1",
            description: 'it is store1, and it serves good food',
            orderingTypes: ['Collection', 'Table ordering', 'Pickup'],
            logo: "https://us.123rf.com/450wm/andyadi/andyadi1802/andyadi180200513/95572662-vector-logo-design-for-beauty-salon-dermatology-center-and-wellness-house-.jpg?ver=6",
            opened: true,
            maxServeTime: 30
        },
        {
            id: 2,
            name: "store",
            description: 'it is store2, and it serves good food',
            orderingTypes: ['Collection', 'Table ordering'],
            logo: "https://cdn.pixabay.com/photo/2017/03/19/20/19/ball-2157465__340.png",
            opened: false,
            maxServeTime: 20,
        },
        {
            id: 3,
            name: "store3",
            description: 'it is store3, and it serves good food',
            orderingTypes: ['Collection'],
            logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9nb3xlbnwwfHwwfHw%3D&w=1000&q=80",
            opened: true,
            maxServeTime: 10
        },
        {
            id: 4,
            name: "store4",
            description: 'it is store4, and it serves good food',
            orderingTypes: ['Collection', 'Pickup'],
            logo: "https://image.shutterstock.com/image-vector/abstract-initial-letter-c-o-260nw-1728284956.jpg",
            opened: false,
            maxServeTime: 40
        }
    ];

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

    const onChange = (pullState: string) => {

    };
    const onLoad = () => {

    };
    const storeClickHandler = () => {
        navigate(routes.storePageUrl);
    };

    return (
        <div className="stores_body_content_wrapper">
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

            <List
                dataSource={stores}
                //renderHeader={renderHeader}
                renderRow={
                    (row, idx) => {
                        let orderingTypes: string = '';
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
                            <ListItem onClick={storeClickHandler} key={idx} tappable={true} modifier='material'>
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
                                                alt="Remy Sharp"
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

export default StoresList;