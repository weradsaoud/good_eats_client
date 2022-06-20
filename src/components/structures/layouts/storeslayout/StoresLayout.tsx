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
import { Login, Logout, Store } from '@mui/icons-material';
import { IconButton, LinearProgress } from '@mui/material';
import './storelayout.css';
import Toolbar from "../../../views/Toolbar/Toolbar";
import { Outlet, useNavigate } from 'react-router-dom';
import routes from "../../../../globals/routes";
import { connect } from "react-redux";
import { auth } from "../../../../globals/firebase";
import ons from "onsenui";

function StoresLayout(props: any) {

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
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


    };
    const onOpenSideMenu = () => {
        setIsSideMenuOpen(true);
    };
    const onCloseSideMenu = () => {
        setIsSideMenuOpen(false);
    };
    const goToStores = () => {
        navigate(routes.storesPageUrl);
    };
    const handleLog = () => {
        if (auth.currentUser) {
            try {
                auth.signOut();
                ons.notification.toast('You Signed out.', { timeout: 1000, animation: 'fall', animationOptions: { duration: 0.2, delay: 0.4, timing: 'ease-in' } });
            } catch (error) {
                ons.notification.toast('Signout failed. Please, try again.', { timeout: 1000, animation: 'fall', animationOptions: { duration: 0.2, delay: 0.4, timing: 'ease-in' } });
            }
        } else {
            navigate(routes.loginPageUrl, { state: routes.storesPageUrl });
        }
        setIsSideMenuOpen(false);
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
                            let label = '';
                            let logIcon;
                            if (idx == 0) {
                                label = row;
                            } else {
                                if (auth.currentUser) {
                                    label = 'Logout';
                                    logIcon = <Logout fontSize="inherit" />;
                                } else {
                                    label = row;
                                    logIcon = <Login fontSize="inherit" />;
                                }
                            }
                            return (
                                <ListItem onClick={(idx == 0) ? goToStores : handleLog} key={idx} tappable={true} modifier='material'>
                                    <div className="left">

                                    </div>
                                    <div className="center">
                                        {(idx == 0) ? <IconButton className="side_button" aria-label="delete" size="small">
                                            <Store fontSize="inherit" />
                                        </IconButton> :
                                            <IconButton className="side_button" aria-label="delete" size="small">
                                                {logIcon}
                                            </IconButton>}
                                        {label}
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