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
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import routes from "../../../../globals/routes";
import StoreToolbar from "../../../views/storetoolbar/StoreToolbar";
import { connect } from "react-redux";

function StoreLayout(props: any) {

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();
    let store: any;

    if (location.state) {
        store = location.state;
    } else {
        store = props.selectedStore;
    }


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
                        renderRow={(row, idx) => (
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
                        )}
                    //renderFooter={renderFooter}
                    />
                </Page>
            </SplitterSide>
            <SplitterContent>
                <Page modifier="content_page">
                    <StoreToolbar storeLogo={store.logo} storeCover={store.cover} storeName={store.name} toggleSideMenu={toolBarBtnHandler}>
                    </StoreToolbar>
                    <Outlet />
                </Page>
            </SplitterContent>
        </Splitter>

    );
}

const mapStateToProps = (state: any) => {
    return {
        selectedStore: state.stores.selectedStore
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreLayout);