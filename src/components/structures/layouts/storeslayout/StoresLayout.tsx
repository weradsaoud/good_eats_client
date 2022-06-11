import React, { useEffect, useState } from "react";
import {
    Splitter,
    SplitterSide,
    Page,
    SplitterContent,
    List,
    ListItem
} from "react-onsenui";
import logo from '../../../../../src/res/logo.png';
import { Login, Store } from '@mui/icons-material';
import { IconButton, LinearProgress } from '@mui/material';
import './storelayout.css';
import Toolbar from "../../../views/Toolbar/Toolbar";
import { Outlet, useNavigate } from 'react-router-dom';
import routes from "../../../../globals/routes";
import { connect } from "react-redux";

function StoresLayout(props: any) {

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    let navigate = useNavigate();

    

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
    const toolBarBtnHandler = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
        console.log('isSideMenuOpen: ', isSideMenuOpen);

    };
    const onOpenSideMenu = () => {
        setIsSideMenuOpen(true);
    };
    const onCloseSideMenu = () => {
        setIsSideMenuOpen(false);
    };
    const goToStores = () => {
        console.log('stores clicked');

        navigate(routes.storesPageUrl);
    };
    const handleLogIn = () => {

    };
    return (

        <Splitter>
            <SplitterSide
                side="left"
                width={250}
                onOpen={onOpenSideMenu}
                onClose={onCloseSideMenu}
                isOpen={isSideMenuOpen}
                collapse={true}
                swipeable={true} >
                <Page modifier="side_page">
                    <List
                        dataSource={['Stores', 'Login']}
                        renderHeader={renderHeader}
                        renderRow={(row, idx) => {
                            return (
                                <ListItem onClick={goToStores} key={idx} tappable={true} modifier='material'>
                                    <div className="left">

                                    </div>
                                    <div className="center">
                                        {(idx == 0) ? <IconButton className="side_button" aria-label="delete" size="small">
                                            <Store fontSize="inherit" />
                                        </IconButton> :
                                            <IconButton className="side_button" aria-label="delete" size="small">
                                                <Login fontSize="inherit" />
                                            </IconButton>}
                                        {row}
                                    </div>
                                </ListItem>
                            )
                        }}
                    //renderFooter={renderFooter}
                    />
                </Page>
            </SplitterSide>
            <SplitterContent>
                <Page modifier="content_page">
                    <Toolbar toggleSideMenu={toolBarBtnHandler}>
                    </Toolbar>
                    <Outlet />
                </Page>
            </SplitterContent>
        </Splitter>

    );
}

export default StoresLayout;