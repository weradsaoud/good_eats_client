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
import { Login, Store } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import './storelayout.css';
import Toolbar from "../../../views/Toolbar/Toolbar";

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
    // const renderToolbar = () => {
    //     return (<Toolbar>
    //         <div className="left">
    //             <BackButton>
    //                 Back
    //             </BackButton>
    //         </div>
    //         <div className="center">
    //             Title
    //         </div>
    //         <div className="right">
    //             <ToolbarButton>
    //                 <Icon icon="md-menu" />
    //             </ToolbarButton>
    //         </div>
    //     </Toolbar>);
    // };
    return (

        <Splitter>
            <SplitterSide
                side="left"
                width={250}
                collapse={true}
                swipeable={true} >
                <Page modifier="side_page">
                    <List
                        dataSource={['Stores', 'Login']}
                        renderHeader={renderHeader}
                        renderRow={(row, idx) => (
                            <ListItem tappable={true} modifier='material'>
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
                <Page>

<Toolbar>

</Toolbar>
                    
                </Page>
            </SplitterContent>
        </Splitter>

    );
}

export default StoresLayout;