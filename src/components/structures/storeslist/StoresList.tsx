import React from "react";
import { Page, List, ListItem, SearchInput } from "react-onsenui";
import { AccountCircle, Login, Store, Search } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment } from '@mui/material';
import './storeslist.css';

function StoresList() {

    const stores = [
        {
            id: 1,
            name: "store1",
            description: 'it is store1, and it serves good food',
            orderingTypes: ['Collection', 'Table ordering', 'Pickup'],
            logo: "https://us.123rf.com/450wm/andyadi/andyadi1802/andyadi180200513/95572662-vector-logo-design-for-beauty-salon-dermatology-center-and-wellness-house-.jpg?ver=6"
        },
        {
            id: 2,
            name: "store",
            description: 'it is store2, and it serves good food',
            orderingTypes: ['Collection', 'Table ordering'],
            logo: "https://cdn.pixabay.com/photo/2017/03/19/20/19/ball-2157465__340.png"
        },
        {
            id: 3,
            name: "store3",
            description: 'it is store3, and it serves good food',
            orderingTypes: ['Collection'],
            logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9nb3xlbnwwfHwwfHw%3D&w=1000&q=80"
        },
        {
            id: 4,
            name: "store4",
            description: 'it is store4, and it serves good food',
            orderingTypes: ['Collection', 'Pickup'],
            logo: "https://image.shutterstock.com/image-vector/abstract-initial-letter-c-o-260nw-1728284956.jpg"
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
                renderRow={(row, idx) => (
                    <ListItem key={idx} tappable={true} modifier='material'>
                        <div className="left">
                        </div>
                        <div className="center store_item">
                            <div className="listitem_store_props_div">
                                <div className="listitem_store_name_div">
                                    <strong className="listitem_store_name">
                                        {row.name}
                                    </strong>
                                </div>
                                <div className="listitem_store_description_div">
                                    {row.description}
                                </div>
                            </div>

                        </div>
                    </ListItem>
                )}
            //renderFooter={renderFooter}
            />
        </div>
    );
}

export default StoresList;