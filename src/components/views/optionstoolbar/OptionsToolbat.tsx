import React from "react";
import "./optionstoolbar.css";
import {ArrowBack, ArrowForward, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { ToolbarButton } from "react-onsenui";
import { Button, IconButton } from "@mui/material";
import { Dehaze } from '@mui/icons-material'

export default function OptionsToolbar(props: any) {


    return (
        <div className="options_topbar">
            <div className="options_topbarWrapper">
                <div className="options_topLeft">
                    <IconButton onClick={props.previousOption} className='options_nave_icon' aria-label="delete">
                        <ArrowBack />
                    </IconButton>
                </div>
                <div className="options_topMiddle">

                </div>
                <div className="options_topRight">
                    <div className='right'>
                        <IconButton onClick={props.nextOption} className='options_nave_icon' aria-label="delete">
                            <ArrowForward />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}