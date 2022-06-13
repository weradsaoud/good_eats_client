import React, { useEffect, useState } from 'react'
import { Carousel, CarouselItem, Checkbox, List, ListItem, Toolbar, Page } from 'react-onsenui';
import { useLocation } from 'react-router';
import ItemToolbar from '../../views/itemtoolbar/itemToolbar';
import './item.css';
import OptionsToolbar from '../../views/optionstoolbar/OptionsToolbat'

function Item(props) {

    let [activeIndex, setActiveIndex] = useState(0);

    let location = useLocation();
    let item = location.state;

    const previousOption = () => { 
        setActiveIndex(0);
    };
    const nextOption = () => { 
        setActiveIndex(1);
    };

    return (
        <div className='itemPage_wrapper'>
            <ItemToolbar item={item} />
            <div className='item_content'>
                <div className='item_name_div'>
                    {item.item_name}
                </div>
                <div className='item_options'>
                    <OptionsToolbar previousOption={previousOption} nextOption={nextOption} />
                    <Carousel
                        onPostChange={() => console.log('onPostChange')}
                        onOverscroll={() => console.log('onOverscroll')}
                        onRefresh={() => console.log('onRefresh')}
                        swipeable={false}
                        overscrollable={true}
                        autoScroll={true}
                        fullscreen={true}
                        autoScrollRatio={0.2}
                        style={{ height: "100%" }}
                        activeIndex = {activeIndex}
                    >
                        <CarouselItem style={{ backgroundColor: 'gray' }}>
                            <div className='item-label'>GRAY</div>
                        </CarouselItem>
                        <CarouselItem style={{ backgroundColor: '#085078' }}>
                            <div className='item-label'>BLUE</div>
                        </CarouselItem>
                    </Carousel>


                    {/* <List modifier={'noborder'}
                        dataSource={[{ optionId: '1', name: 'option1', values: ['val1', 'val2', 'val3'] }, { optionId: '2', name: 'option2', values: ['val1', 'val2', 'val3'] }, { optionId: '3', name: 'option3', values: ['val1', 'val2', 'val3'] }]}
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

export default Item;