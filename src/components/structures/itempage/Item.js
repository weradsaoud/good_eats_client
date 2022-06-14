import React, { useEffect, useState } from 'react'
import { Carousel, CarouselItem, Checkbox, Radio, List, ListItem, Toolbar, Page } from 'react-onsenui';
import { useLocation } from 'react-router';
import ItemToolbar from '../../views/itemtoolbar/itemToolbar';
import './item.css';
import OptionsToolbar from '../../views/optionstoolbar/OptionsToolbat';
import * as actionsTypes from '../../../store/actions/actionsTypes';
import { connect } from "react-redux";

function Item(props) {

    let options = [{ optionId: '1', name: 'option1', values: ['val1', 'val2', 'val3'] }, { optionId: '2', name: 'option2', values: ['val1', 'val2', 'val3'] }, { optionId: '3', name: 'option3', values: ['val1', 'val2', 'val3'] }, { optionId: '4', name: 'option4', values: ['val1', 'val2', 'val3'] }, { optionId: '5', name: 'option5', values: ['val1', 'val2', 'val3'] }, { optionId: '6', name: 'option6', values: ['val1', 'val2', 'val3'] }];


    let [activeIndex, setActiveIndex] = useState(0);
    let [activeNext, setActiveNext] = useState(false);
    let [activePrevious, setActivePrevious] = useState(false);
    let [optionName, setOptionName] = useState('');
    let [optionId, setOptionId] = useState('');
    let [optionsValues, setOptionsValues] = useState(
        options.map((o, idx) => {
            return (
                { optionId: o.optionId, value: '' }
            );
        })
    );

    let optionsLength = options.length;

    let location = useLocation();
    let item;
    if (location.state) {
        item = location.state;
        console.log('if item: ', item);
    } else {
        item = props.selectedItem;
        console.log('else item: ', item);
    }
    console.log('item: ', item);

    useEffect(() => {
        // if (optionsLength > 0) {
        //     setActiveNext(true);
        // }
        setOptionName(options[0].name);
        setOptionId(options[0].optionId);
        props.setSelectedItem(item);
    }, []);

    const previousOption = () => {
        if (activeIndex > 0) {
            let index = activeIndex - 1;
            setActiveIndex(index);
            setActiveNext(true);
            setOptionName(options[index].name);
            setOptionId(options[index].optionId);
            if (index == 0) {
                setActivePrevious(false);
            }
        }
    };
    const nextOption = () => {
        if (activeIndex < (optionsLength - 1)) {
            let index = activeIndex + 1;
            let currentOptionId = options[index].optionId;
            setActiveIndex(index);
            setActivePrevious(true);
            setOptionName(options[index].name);
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
    const optionValueChecked = (val) => {
        let optionsValuesCopy = [];
        optionsValues.forEach((ov, idx) => {
            if (ov.optionId == optionId) {
                optionsValuesCopy.push({ ...ov, value: val });
            } else {
                optionsValuesCopy.push({ ...ov });
            }
        });
        setOptionsValues(optionsValuesCopy);
        if ((optionsLength > 0) && (activeIndex < (optionsLength - 1))) {
            setActiveNext(true);
        }
    };
    let Carousels = options.map((o, idx) => {
        let caroselOptionVal = optionsValues.filter(ov => ov.optionId == o.optionId)[0];
        return (
            <CarouselItem key={idx} style={{ backgroundColor: 'gray' }}>
                <List modifier={'noborder'}
                    dataSource={o.values}
                    renderHeader={renderValuesHeader}
                    renderRow={(val, idx) => {
                        return (
                            <ListItem key={idx} tappable modifier=''>
                                <div className='left'>
                                    <Checkbox
                                        onChange={(e) => optionValueChecked(val)}
                                        checked={val == caroselOptionVal.value}
                                        modifier='material' />
                                </div>
                                <div className='center'>{val}</div>
                                <div className='right'></div>
                            </ListItem>
                        );
                    }}
                />
            </CarouselItem >
        );
    });
    return (
        <div className='itemPage_wrapper'>
            <ItemToolbar item={item} />
            <div className='item_content'>
                <div className='item_name_div'>
                    {item.item_name}
                </div>
                <div className='item_options_literal'>
                    Choose your options
                </div>
                <div className='item_options'>
                    <OptionsToolbar
                        optionName={optionName}
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


                    {/* <List modifier={'noborder'}
                        dataSource={}
                        renderHeader={renderOptionsHeader}
                        renderRow={(option, idx) => {
                            return (
                                <ListItem expandable tappable modifier='nodivider'>
                                    <div className='left'>
                                        <div className='option_name_div'>
                                            {option.name}
                                        </div>
                                    </div>
                                    <div className='expandable-content'>
                                        <List modifier={'noborder'}
                                            dataSource={option.values}
                                            renderHeader={renderValuesHeader}
                                            renderRow={(val, idx) => {
                                                return (
                                                    <ListItem tappable modifier=''>
                                                        <div className='left'>
                                                            <Checkbox
                                                                onChange={() => optionValueChecked(val)}
                                                                modifier='material' />
                                                        </div>
                                                        <div className='center'>{val}</div>
                                                        <div className='right'></div>
                                                    </ListItem>
                                                );
                                            }}
                                        />
                                    </div>
                                </ListItem>
                            );
                        }} /> */}
                </div>
            </div>
        </div>
    );
}



const mapStateToProps = (state) => {
    return {
        selectedItem: state.stores.selectedItem
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedItem: (item) => dispatch({ type: actionsTypes.SETSELECTEDITEM, item: item })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);