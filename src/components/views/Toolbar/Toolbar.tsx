import React from "react";
import "./toolbar.css";
import { NotificationsNone, Language, Settings, ArrowRightTwoTone } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { ToolbarButton } from "react-onsenui";
import { Button, IconButton } from "@mui/material";
import { Dehaze } from '@mui/icons-material'

export default function Toolbar(props: any) {


    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <IconButton onClick={props.toggleSideMenu} aria-label="delete">
                        <Dehaze />
                    </IconButton>
                </div>
                <div className="topMiddle">
                    All Stores
                </div>
                <div className="topRight">
                </div>
            </div>
        </div>
    );
}