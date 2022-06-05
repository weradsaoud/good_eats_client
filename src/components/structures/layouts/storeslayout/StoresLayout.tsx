import React from "react";
import { Outlet } from "react-router";
import {
    Splitter,
    SplitterSide,
    Page,
    SplitterContent,
    List,
    ListItem,
    Button,
    BackButton,
    Icon
} from "react-onsenui";
import logo from '../../../../../src/res/logo.png';

function StoresLayout() {

    const handleRightClose = () => { };
    const handleRightOpen = () => { };
    const renderHeader = () => {
        return (
            <div style={{ "textAlign": "center" }}>
                <img width={190} height={71} src={logo} style={{ "padding": "15px" }}></img>
            </div>
        );
    };
    const renderFooter = () => {
        return (
            <div style={{ "textAlign": "center" }}>
                <h3>Footer</h3>
            </div>
        );
    };
    return (

        <Splitter>
            <SplitterSide
                side="left"
                width={250}
                collapse={true}
                swipeable={true}>
                <Page>
                    <List
                        dataSource={['Stores', 'Login']}
                        renderHeader={renderHeader}
                        renderRow={(row, idx) => (
                            // <ListItem tappable={true} >
                            //     {row}
                            // </ListItem>
                            <ListItem tappable = {true} modifier= 'material'>
                                <div className="left">
                                    <Icon icon="md-face" className="list-item__icon"></Icon>
                                </div>
                                <div className="center">
                                    {row}
                                </div>
                            </ListItem>
                        )}
                        renderFooter={renderFooter}
                    />
                </Page>
            </SplitterSide>
            <SplitterContent>
                <Page> Page Content </Page>
            </SplitterContent>
        </Splitter>

    );
}

export default StoresLayout;