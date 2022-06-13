import { jsx } from '@emotion/react';
import { ActionTypes } from '@mui/base';
import { AccessTime, ShoppingBasket, Info, Search } from '@mui/icons-material';
import { Avatar, Button, FormControl, Input, InputAdornment } from '@mui/material';
import React, { useEffect } from 'react'
import { List, ListItem } from 'react-onsenui';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import * as actionsTypes from '../../../store/actions/actionsTypes';
import './store.css';

function Store(props: any) {

    let location = useLocation();
    let store: any = location.state;


    useEffect(() => {
        if (props.scrollY > 150) {
            let cateList = document.getElementById('cate_list_id');
            let storeInfo = document.getElementById('store_info');
            if (cateList && storeInfo) {
                cateList.style.marginTop = "60px";
                storeInfo.style.height = 'calc(100vh - 70px)';
            }
        } else {
            let cateList = document.getElementById('cate_list_id');
            let storeInfo = document.getElementById('store_info');
            if (cateList && storeInfo) {
                cateList.style.marginTop = "5px";
                storeInfo.style.height = 'calc(100vh - 280px)';
            }
        }
    }, [props.scrollY]);

    useEffect(() => {
        props.getStoreGategories(store.id);
    }, []);

    let orderingTypes: string = '';
    if (store.orderingTypes && store.orderingTypes.length > 0) {
        store.orderingTypes.forEach((type: any, idx: number) => {
            if (idx == 0) {
                orderingTypes = type;
            } else {
                orderingTypes = orderingTypes + ' - ' + type;
            }
        });
    }

    const handleScroll = (e: any) => {
        let storeDiv = document.getElementById('store_info')
        props.handleScroll(storeDiv?.scrollTop);
    };

    const renderHeader = () => { return (<div className='cate_list_header'>Categories</div>); };
    const renderFooter = () => { return (<div> Footer </div>); };

    const renderItemsHeader = () => {
        return <div></div>;
    };

    let view: JSX.Element;
    if (props.gettingStoreCategories) {
        view = <div></div>;
    } else {
        view = (
            <div id='store_info' style={{ "height": "calc(100vh - 280px)", "overflow": "scroll" }} onScroll={handleScroll}>
                <div className='store_info_div'>
                    <div className='store_name_div'>
                        {store.name}
                    </div>
                    <div className='storePage_description_div'>
                        {store.description}
                    </div>
                    <div className='storePage_orderingtypes_div'>
                        {orderingTypes}
                    </div>
                </div>
                <div className='store_info_btns'>
                    <div className="store_firstBtn">
                        <Button disabled className='Btn' variant="contained" startIcon={<ShoppingBasket className='btn_icon' />}>
                            <span className='store_info_btn_span' style={{ 'marginLeft': 'auto', 'marginRight': 'auto' }}>{'~' + store.maxServeTime}</span>
                        </Button>
                    </div>
                    <div className="store_secondBtn">
                        <Button disabled className='Btn' variant="contained" startIcon={<AccessTime className='btn_icon' />}>
                            <span className='store_info_btn_span' style={{ 'marginLeft': 'auto', 'marginRight': 'auto' }}>{(store.opened) ? 'Opened' : 'Closed'}</span>
                        </Button>
                    </div>
                    <div className="store_thirdBtn">
                        <Button disabled className='Btn' variant="contained" startIcon={<Info className='btn_icon' />}>
                            <span className='store_info_btn_span' style={{ 'marginLeft': 'auto', 'marginRight': 'auto' }}>More info</span>
                        </Button>
                    </div>
                </div>
                <div className="items_categories_search_wrapper">
                    <FormControl variant="standard" className="items_categories_search_field">
                        <Input
                            id="input-with-icon-adornment"
                            placeholder="search for an item or category"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div id='cate_list_id' className='cate_list'>
                    <List modifier={'noborder'}
                        //dataSource={[{ id: "1", cateName: 'Row 1', description: "it is category 1" }, { id: "2", cateName: 'Row 2', description: "it is category 2" }, { id: "3", cateName: 'Row 3', description: "it is category 3" }, { id: "4", cateName: 'Row 4', description: "irt is category 4" }, { id: "5", cateName: 'Row 5', description: "it is category 5" }, { id: "6", cateName: 'Row 6', description: "it is category 6" }, { id: "7", cateName: 'Row 7', description: "it is category 7" }, { id: "8", cateName: 'Row 8', description: "it is category 8" }, { id: "9", cateName: 'Row 9', description: "it is category 9" }, { id: "10", cateName: 'Row 10', description: "it is category 10" }]}
                        dataSource = {props.storeCategories}
                        renderHeader={renderHeader}
                        renderRow={(cate: any, idx: number) => (
                            <ListItem expandable tappable modifier='nodivider' >
                                <div className="left">
                                    <div className='cate_item'>
                                        <div className='cate_item_header'>
                                            {cate.cate_name}
                                        </div>
                                        <div className='cate_item_description'>
                                            {cate.cate_description}
                                        </div>
                                    </div>
                                </div>
                                <div className="expandable-content">
                                    <List modifier={'noborder'}
                                        //dataSource={[{ id: "1", itemName: "item1", description: "it is item1, and it is very delicious, it is made from natural indrediants ", price: '45$', img: "https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/w_1280%2Cc_limit/the-ultimate-hamburger.jpg" }, { id: "2", itemName: "item2", description: "it is item2", price: '45$', img: "https://mms.businesswire.com/media/20200526005029/en/793342/5/NDW_mediaImage-01.jpg" }, { id: "3", itemName: "item3", description: "it is item3", price: '45$', img: "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900" }, { id: "4", itemName: "item4", description: "it is item4", price: '45$', img: "https://static.onecms.io/wp-content/uploads/sites/43/2022/06/01/414768-green-salad-Nichele-4x3-1.jpg" }]}
                                        dataSource = {cate.items}
                                        renderHeader={renderItemsHeader}
                                        renderRow={(item: any, idx: number) => (
                                            <ListItem tappable modifier='chevron'>
                                                <div className='left'>
                                                    <div className="listitem_store_logo_div">
                                                        <Avatar
                                                            alt={item.item_name}
                                                            src={item.item_img}
                                                            sx={{ width: 54, height: 54 }}
                                                            variant="rounded"
                                                        />
                                                    </div>
                                                </div>
                                                <div id='cate_item_center' className='center'>
                                                    <div className="cate_item_wrapper">
                                                        <div className="listitem_cate_props_div">
                                                            <div className="listitem_store_name_div">
                                                                <strong className="listitem_store_name">
                                                                    {item.item_name}
                                                                </strong>
                                                            </div>
                                                            <div className="listitem_store_description_div">
                                                                {item.item_description}
                                                            </div>
                                                        </div>
                                                        <div className='cate_item_price'>
                                                            <div className='item_price_from'>From</div>
                                                            <div className='item_price'>{item.item_price}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='rigth'></div>
                                            </ListItem>
                                        )}
                                    />
                                </div>
                            </ListItem>
                        )}
                        renderFooter={renderFooter}
                    />
                </div>

            </div>
        );
    }

    return view;
}


const mapStateToProps = (state: any) => {
    return {
        scrollY: state.stores.scrollY,
        storeCategories: state.stores.storeCategories,
        gettingStoreCategories: state.stores.gettingStoreCategories
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleScroll: (scrollY: number) => dispatch({ type: actionsTypes.SCROLL, scrollY: scrollY }),
        getStoreGategories: (id: number) => dispatch({ type: actionsTypes.GETSTOREGATEGORIES, storeId: id })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);