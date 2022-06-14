import React from "react";
import "./optionstoolbar.css";
import { ArrowBack, ArrowForward, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { ToolbarButton } from "react-onsenui";
import { Button, IconButton } from "@mui/material";
import { Dehaze } from '@mui/icons-material'

export default function OptionsToolbar(props: any) {

    if (!props.activePrevious) {
        let previousBtn = document.getElementById('prevBtn');
        if (previousBtn) {
            previousBtn.style.background = 'lightgray';
        }
    } else {
        let previousBtn = document.getElementById('prevBtn');
        if (previousBtn) {
            previousBtn.style.background = 'rgba(19, 209, 60, 0.7)';
        }
    }

    if (!props.activeNext) {
        let nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.style.background = 'lightgray';
        }
    } else {
        let nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.style.background = 'rgba(19, 209, 60, 0.7)';
        }
    }

    return (
        <div className="options_topbar">
            <div className="options_topbarWrapper">
                <div className="options_topLeft">
                    <IconButton size="small" id='prevBtn' style={{ 'background': 'rgba(19, 209, 60, 0.7)' }} disabled={!props.activePrevious} onClick={props.previousOption} className='options_nave_icon' aria-label="delete">
                        <ArrowBack />
                    </IconButton>
                </div>
                <div className="options_topMiddle">
                    {props.optionName}
                </div>
                <div className="options_topRight">
                    <div className='right'>
                        <IconButton size="small" id='nextBtn' style={{ 'background': 'rgba(19, 209, 60, 0.7)' }} disabled={!props.activeNext} onClick={props.nextOption} className='options_nave_icon' aria-label="delete">
                            <ArrowForward />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}