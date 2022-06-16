import React, { useEffect, useState } from 'react'
import { Carousel, CarouselItem, Checkbox, Radio, List, ListItem, Toolbar, Page, Button } from 'react-onsenui';
import { useLocation } from 'react-router';
import ItemToolbar from '../../views/itemtoolbar/itemToolbar';
import './item.css';
import OptionsToolbar from '../../views/optionstoolbar/OptionsToolbat';
import * as actionsTypes from '../../../store/actions/actionsTypes';
import { connect } from "react-redux";
import { LinearProgress } from '@mui/material';

function Item(props) {

    let options = [];//[{ optionId: '1', name: 'option1', values: ['val1', 'val2', 'val3'] }, { optionId: '2', name: 'option2', values: ['val1', 'val2', 'val3'] }, { optionId: '3', name: 'option3', values: ['val1', 'val2', 'val3'] }, { optionId: '4', name: 'option4', values: ['val1', 'val2', 'val3'] }, { optionId: '5', name: 'option5', values: ['val1', 'val2', 'val3'] }, { optionId: '6', name: 'option6', values: ['val1', 'val2', 'val3'] }];
    let extras = [{ extraId: '1', name: 'extra1', price: 10 }, { extraId: '2', name: 'extra2', price: 0.6 }, { extraId: '3', name: 'extra3', price: 0.5 }, { extraId: '4', name: 'extra4', price: 0.7 }]


    let [activeIndex, setActiveIndex] = useState(0);
    let [activeNext, setActiveNext] = useState(false);
    let [activePrevious, setActivePrevious] = useState(false);
    let [optionName, setOptionName] = useState('');
    let [optionId, setOptionId] = useState('');
    let [optionsValues, setOptionsValues] = useState([]);
    let [finishOptions, setFinishOptions] = useState(false);
    var optionsLength = props.options.length;

    let location = useLocation();
    let item;
    if (location.state) {
        item = location.state;
    } else {
        item = props.selectedItem;
    }

    useEffect(() => {
        //console.log('item_id from useEffect: ', item.item_id);
        props.getoptions(item.item_id);
        props.setSelectedItem(item);

        return () => {
            props.ItemWillUnmount();
        }
    }, []);

    useEffect(() => {
        if (props.options.length > 0) {
            setOptionId(props.options[0].optionId);
            setOptionsValues(
                props.options.map((o, idx) => {
                    return (
                        { optionId: o.optionId, name: o.name, value: '' }
                    );
                })
            );
        } else {

        }

    }, [props.options]);

    const previousOption = () => {
        if (activeIndex > 0) {
            let index = activeIndex - 1;
            setActiveIndex(index);
            setActiveNext(true);
            setOptionName(props.options[index].name);
            setOptionId(props.options[index].optionId);
            if (index == 0) {
                setActivePrevious(false);
            }
        }
    };
    const nextOption = () => {
        if (activeIndex < (optionsLength - 1)) {
            let index = activeIndex + 1;
            let currentOptionId = props.options[index].optionId;
            setActiveIndex(index);
            setActivePrevious(true);
            setOptionName(props.options[index].name);
            setOptionId(currentOptionId);
            let currentOptionVal = optionsValues.filter(ov => ov.optionId == currentOptionId)[0].value;
            if (currentOptionVal == '') {
                setActiveNext(false);
            }
            if (index == (optionsLength - 1)) {
                setActiveNext(false);
            }
        }
    };
    const renderValuesHeader = () => {
        return (
            <div></div>
        );
    };
    const prepareVariant = (optionsValuesCopy) => {
        let variant = {};
        optionsValuesCopy.forEach(ov => {
            variant[ov.name] = ov.value;
        });
        return JSON.stringify(variant);
    };
    const optionValueChecked = (e, val) => {
        if (!e.target.checked) {
            e.preventDefault();
        } else {
            let optionsValuesCopy = [];
            optionsValues.forEach((ov, idx) => {
                if (ov.optionId == optionId) {
                    optionsValuesCopy.push({ ...ov, value: val });
                } else {
                    optionsValuesCopy.push({ ...ov });
                }
            });
            console.log('optionsValuesCopy: ', optionsValuesCopy);
            setOptionsValues(optionsValuesCopy);
            console.log('optionsLength: ', optionsLength);
            console.log('activeIndex: ', activeIndex);
            if ((optionsLength > 0) && (activeIndex < (optionsLength - 1))) {
                setActiveNext(true);
            }
            if (activeIndex == (optionsLength - 1) || finishOptions) {
                setFinishOptions(true);
                let variant = prepareVariant(optionsValuesCopy);
                props.getVariantExtras(variant, item.item_id);
            }
        }
    };
    const extraSelected = (extra) => {
        console.log('exra: ', extra);
    };
    let Carousels = null;
    if (props.options.length > 0) {
        Carousels = props.options.map((o, idx) => {
            let caroselOptionVal = optionsValues.filter(ov => ov.optionId == o.optionId)[0];
            return (
                <CarouselItem key={idx} style={{ backgroundColor: 'gray' }}>
                    <List modifier={'noborder'}
                        dataSource={o.values}
                        renderHeader={renderValuesHeader}
                        renderRow={(val, idx) => {
                            return (
                                <ListItem key={idx} tappable modifier='' onClick={(e) => optionValueChecked(e, val)}>
                                    <div className='left'>
                                        <Checkbox
                                            onChange={(e) => optionValueChecked(val)}
                                            checked={caroselOptionVal ? (val == caroselOptionVal.value) : false}
                                            modifier='material' />
                                    </div>
                                    <div className='center'>
                                        <div className='option_value_div'>{val}</div>
                                    </div>
                                    <div className='right'></div>
                                </ListItem>
                            );
                        }}
                    />
                </CarouselItem >
            );
        });
    }

    return (
        <div className='itemPage_wrapper'>
            <ItemToolbar item={item} />
            {props.gettingOptions ? <div className='extras_loader_progress'>
                <LinearProgress color="success" />
            </div> :
                <div className='item_content'>
                    <div className='item_name_div'>
                        {item.item_name}
                    </div>
                    <div className='item_options_literal'>
                        Choose your options
                    </div>
                    <div className='options_extras_div'>
                        {(props.options.length > 0) ? <div className='item_options'>
                            <OptionsToolbar
                                optionName={(optionName == '') ? props.options[0].name : optionName}
                                activeNext={activeNext}
                                activePrevious={activePrevious}
                                previousOption={previousOption}
                                nextOption={nextOption} />
                            <Carousel
                                onPostChange={() => console.log('onPostChange')}
                                onOverscroll={() => console.log('onOverscroll')}
                                onRefresh={() => console.log('onRefresh')}
                                swipeable={false}
                                overscrollable={false}
                                autoScroll={false}
                                fullscreen={false}
                                autoScrollRatio={0.2}
                                style={{ height: "100%" }}
                                activeIndex={activeIndex}
                            >
                                {Carousels}
                            </Carousel>
                        </div> : null}
                        {(props.gettingVariantExtras || props.gettingItemExtras) ? <div className='extras_loader_progress'>
                            <LinearProgress color="success" />
                        </div> : (finishOptions || props.showExtras) ? <div className='item_extras'>
                            <div className='extras_literal'>
                                Choose your extras
                            </div>
                            <div className='item_extras_list'>
                                <List modifier={'noborder'}
                                    dataSource={props.extras}
                                    renderRow={(extra, idx) => {
                                        return (
                                            <ListItem tappable modifier='material'>
                                                <div className='left'>
                                                    <Checkbox
                                                        onChange={(e) => extraSelected(extra)}
                                                        modifier='material' />
                                                </div>
                                                <div className='center'>
                                                    <div className='extra_value_div'>{extra.name}</div>
                                                </div>
                                                <div className='right'>
                                                    <div className='extra_price_div'> {extra.price}</div>
                                                </div>
                                            </ListItem>
                                        );
                                    }} />
                            </div>
                            <div className='checkout_btn_div'>
                                <Button className='checkout_btn'>Checkout</Button>
                            </div>
                        </div> : null}
                    </div>
                </div>
            }

        </div>
    );
}



const mapStateToProps = (state) => {
    return {
        selectedStore: state.stores.selectedStore,
        selectedItem: state.stores.selectedItem,
        options: state.stores.options,
        gettingOptions: state.stores.gettingOptions,
        gettingVariantExtras: state.stores.gettingVariantExtras,
        gettingItemExtras: state.stores.gettingItemExtras,
        extras: state.stores.extras,
        showExtras: state.stores.showExtras
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedItem: (item) => dispatch({ type: actionsTypes.SETSELECTEDITEM, item: item }),
        getoptions: (item_id) => dispatch({ type: actionsTypes.GETITEMIOPTIONS, item_id: item_id }),
        getItemExtras: (item_id) => dispatch({ type: actionsTypes.GETITEMEXTRAS, item_id: item_id }),
        getVariantExtras: (variant, item_id) => dispatch({ type: actionsTypes.GETVARIANTEXTRAS, variant: variant, item_id: item_id }),
        ItemWillUnmount: () => dispatch({ type: actionsTypes.ITEMWILLUNMOUNT })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);