import { KeyboardBackspace, ShoppingBasket } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import './itemtoolbar.css';

function ItemToolbar(props: any) {

    return (
        <div id='item_topbar_id' className="item_topbar" /*style={{ "backgroundImage": `url(${cover})` }}*/>
            <img id="item_header_img_id" className="item_header_img" src={props.item.item_img} />
            <div className="item_topbarWrapper">
                <div className="item_topLeft">
                    <IconButton onClick={props.toggleSideMenu} className='nave_icon' aria-label="delete">
                        <KeyboardBackspace />
                    </IconButton>
                </div>
                <div className="item_topMiddle">
                    
                </div>
                <div className="item_topRight">
                <IconButton onClick={props.toggleSideMenu} className='nave_icon' aria-label="delete">
                        <ShoppingBasket />
                    </IconButton>
                </div>
            </div>
            {(props.gettingStoreCategories) ? <LinearProgress style={{ "zIndex": "-100" }} color="success" /> : null}
        </div>
    );
}

export default ItemToolbar;