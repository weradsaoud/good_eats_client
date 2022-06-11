import { ActionTypes } from '@mui/base';
import { AccessTime, ShoppingBasket, Info, Search } from '@mui/icons-material';
import { Button, FormControl, Input, InputAdornment, LinearProgress } from '@mui/material';
import React from 'react'
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import * as actionsTypes from '../../../store/actions/actionsTypes';
import './store.css';

function Store(props: any) {

    let location = useLocation();
    let store: any = location.state;
    console.log('store: ', store);

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


    return (
        <div id='store_info' style={{ "height": "calc(100vh - 270px)", "overflow": "scroll" }} onScroll={handleScroll}>
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
                        placeholder="search for stores"
                        startAdornment={
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
            <div className='cate_list'>

            </div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
            <div>11</div>
            <div>12</div>
            <div>13</div>
            <div>14</div>
            <div>15</div>
            <div>16</div>
            <div>17</div>
            <div>18</div>
            <div>19</div>
            <div>20</div>
            <div>21</div>
            <div>22</div>
            <div>23</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            v
            <div>hi</div>

        </div>

    );
}


const mapStateToProps = (state: any) => {
    return {
        store: state.store
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleScroll: (scrollY: number) => dispatch({ type: actionsTypes.SCROLL, scrollY: scrollY })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);