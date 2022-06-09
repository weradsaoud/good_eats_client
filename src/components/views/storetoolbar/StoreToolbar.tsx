import React, { useEffect } from "react";
import "./storetoolbar.css";
import { NotificationsNone, Language, Settings, ArrowRightTwoTone } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { ToolbarButton } from "react-onsenui";
import { Avatar, Button, IconButton } from "@mui/material";
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

    let cover = 'https://api-thegoodtill-com-public.s3.eu-west-1.amazonaws.com/goodeats_assets/f1623326-39f2-4c60-b692-0768ce065e35/d408f87a-9e2f-489c-92e9-87b5f4a92c79/header';


    useEffect(() => {
        let store_topbar = document.getElementById('store_topbar_id');
        let store_logo = document.getElementById('store_logo_id');
        let store_topbar_height: number;
        let store_logo_top: number = 0;
        if (props.scrollY < 190) {
            store_topbar_height = 240 - props.scrollY;
            store_logo_top = 190 - props.scrollY;
            if (store_logo) {
                store_logo.style.display = 'block'
            }
        } else {
            store_topbar_height = 50;
            if (store_logo) {
                store_logo.style.display = 'none'
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
        <div id='store_topbar_id' className="store_topbar" style={{ "backgroundImage": `url(${cover})` }}>
            <div id = 'store_logo_id' className="store_logo">
                <Avatar
                    alt=""
                    src={'https://api-thegoodtill-com-public.s3.eu-west-1.amazonaws.com/goodeats_assets/f1623326-39f2-4c60-b692-0768ce065e35/d408f87a-9e2f-489c-92e9-87b5f4a92c79/logo'}
                    sx={{ width: 120, height: 120 }}
                />
            </div>
            <div className="store_topbarWrapper">
                <div className="store_topLeft">
                    <IconButton onClick={props.toggleSideMenu} className='nave_icon' aria-label="delete">
                        <Dehaze />
                    </IconButton>
                </div>
                <div className="store_topMiddle">
                </div>
                <div className="store_topRight">
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        scrollY: state.store.scrollY
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        resetScrollY: () => dispatch({ type: actionsTypes.SCROLL, scrollY: 0 })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreToolbar);