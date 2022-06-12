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
    }, [props.scrollY])

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


    return (
        <div id='store_info' style={{ "height": "calc(100vh - 280px)", "overflow": "scroll" }} onScroll={handleScroll}>
            <div className='store_info_div'>
                <div className='store_name_div'>
                    {store.name}
                </div>
                <div className='store_description_div'>
                    {store.description}
                </div>
                <div className='store_orderingtypes_div'>
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
                    dataSource={['Row 1', 'Row 2', 'Row 3', 'Row 4', 'Row 5', 'Row 6', 'Row 7', 'Row 8', 'Row 9', 'Row 10', 'Row 11', 'Row 12', 'Row 13', 'Row 14', 'Row 15']}
                    renderHeader={renderHeader}
                    renderRow={(row: any, idx: number) => (
                        <ListItem expandable tappable modifier='nodivider' >
                            <div className="left">
                                <div className='cate_item_header'>
                                    {row}
                                </div>
                            </div>
                            <div className="expandable-content">
                                <List modifier={'noborder'}
                                    dataSource={[{ id: "1", itemName: "item1", description: "it is item1", img: "https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/w_1280%2Cc_limit/the-ultimate-hamburger.jpg" }, { id: "2", itemName: "item2", description: "it is item2", img: "https://mms.businesswire.com/media/20200526005029/en/793342/5/NDW_mediaImage-01.jpg" }, { id: "3", itemName: "item3", description: "it is item3", img: "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900" }, { id: "4", itemName: "item4", description: "it is item4", img: "https://static.onecms.io/wp-content/uploads/sites/43/2022/06/01/414768-green-salad-Nichele-4x3-1.jpg" }]}
                                    renderHeader={renderItemsHeader}
                                    renderRow={(row: any, idx: number) => (
                                        <ListItem tappable modifier='chevron'>
                                            <div className='left'>
                                                <div className="listitem_store_logo_div">
                                                    <Avatar
                                                        alt={row.itemName}
                                                        src={row.img}
                                                        sx={{ width: 54, height: 54 }}
                                                        variant="rounded"
                                                    />
                                                </div>
                                            </div>
                                            <div id='cate_item_center' className='center'>
                                                <div className="cate_item_wrapper">
                                                    <div className="listitem_store_props_div">
                                                        <div className="listitem_store_name_div">
                                                            <strong className="listitem_store_name">
                                                                {row.itemName}
                                                            </strong>
                                                        </div>
                                                        <div className="listitem_store_description_div">
                                                            {row.description}
                                                        </div>
                                                    </div>
                                                    <div className='cate_item_price'>
                                                        
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


const mapStateToProps = (state: any) => {
    return {
        scrollY: state.stores.scrollY
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleScroll: (scrollY: number) => dispatch({ type: actionsTypes.SCROLL, scrollY: scrollY })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);