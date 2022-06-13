import React, { useEffect } from "react";
import "./storetoolbar.css";
import { NotificationsNone, Language, Settings, ArrowRightTwoTone } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { ToolbarButton } from "react-onsenui";
import { Avatar, Button, IconButton, LinearProgress } from "@mui/material";
import { Dehaze } from '@mui/icons-material'
import { connect } from "react-redux";
import * as actionsTypes from '../../../store/actions/actionsTypes';


function getStyle(el: any, styleProp: any) {
    var value, defaultView = (el.ownerDocument || document).defaultView;
    // W3C standard way:
    if (defaultView && defaultView.getComputedStyle) {
        // sanitize property name to css notation
        // (hypen separated words eg. font-Size)
        styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
        return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    } else if (el.currentStyle) { // IE
        // sanitize property name to camelCase
        styleProp = styleProp.replace(/\-(\w)/g, function (str: string, letter: string) {
            return letter.toUpperCase();
        });
        value = el.currentStyle[styleProp];
        // convert other units to pixels on IE
        if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
            return (function (value) {
                var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                el.runtimeStyle.left = el.currentStyle.left;
                el.style.left = value || 0;
                value = el.style.pixelLeft + "px";
                el.style.left = oldLeft;
                el.runtimeStyle.left = oldRsLeft;
                return value;
            })(value);
        }
        return value;
    }
}

function StoreToolbar(props: any) {

    let cover = props.storeCover;
    let logo = props.storeLogo;


    useEffect(() => {
        let store_topbar = document.getElementById('store_topbar_id');
        let store_logo = document.getElementById('store_logo_id');
        let store_cover = document.getElementById('store_header_img_id');
        let storeName = document.getElementById('stor_topbar_name');
        let store_topbar_height: number;
        let store_logo_top: number = 0;
        if (props.scrollY < 150) {
            store_topbar_height = 200 - props.scrollY;
            store_logo_top = 140 - props.scrollY;
            if (store_logo) {
                store_logo.style.display = 'block'
            }
            if (storeName && store_cover && store_topbar) {
                store_cover.style.visibility = 'visible';
                store_topbar.style.backgroundColor = '#ecfaf6';
                store_topbar.style.marginBottom = '70px';
                storeName.style.visibility = 'hidden';
            }
        } else {
            store_topbar_height = 50;
            if (store_logo) {
                store_logo.style.display = 'none';
            }
            if (storeName && store_cover && store_topbar) {
                store_cover.style.visibility = 'hidden';
                store_topbar.style.backgroundColor = '#ecfaf6';
                store_topbar.style.marginBottom = '10px';
                storeName.style.visibility = 'visible';
            }
        }
        let newHeight = store_topbar_height.toString() + 'px';
        let newTop = store_logo_top.toString() + 'px';
        if (store_topbar && store_logo) {
            store_topbar.style.height = newHeight;
            store_logo.style.top = newTop;
        } else {

        }
    }, [props.scrollY]);


    useEffect(() => {
        return (
            () => {
                props.resetScrollY();
            }
        );
    }, []);

    return (
        <div id='store_topbar_id' className="store_topbar" /*style={{ "backgroundImage": `url(${cover})` }}*/>
            <img id="store_header_img_id" className="store_header_img" src={cover} />
            <div id='store_logo_id' className="store_logo">
                <Avatar
                    alt=""
                    src={logo}
                    sx={{ width: 120, height: 120 }}
                    style={{ border: '5px solid white' }}
                />
            </div>
            <div className="store_topbarWrapper">
                <div className="store_topLeft">
                    <IconButton onClick={props.toggleSideMenu} className='nave_icon' aria-label="delete">
                        <Dehaze />
                    </IconButton>
                </div>
                <div className="store_topMiddle">
                    <p id='stor_topbar_name'>{props.storeName}</p>
                </div>
                <div className="store_topRight">
                </div>
            </div>
            {(props.gettingStoreCategories) ? <LinearProgress style={{ "zIndex": "-100" }} color="success" /> : null}
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        scrollY: state.stores.scrollY,
        gettingStoreCategories: state.stores.gettingStoreCategories
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        resetScrollY: () => dispatch({ type: actionsTypes.SCROLL, scrollY: 0 })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreToolbar);