import { KeyboardBackspace, ShoppingBasket } from "@mui/icons-material";
import { Badge, LinearProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import routes from "../../../globals/routes";
import './itemtoolbar.css';

function ItemToolbar(props: any) {

    let navigate = useNavigate();
    const backToStore = () => {
        navigate(routes.storePageUrl);
    };
    const goToBasket = () => {
        navigate(routes.basketPage);
    };

    return (
        <div id='item_topbar_id' className="item_topbar" /*style={{ "backgroundImage": `url(${cover})` }}*/>
            <img id="item_header_img_id" className="item_header_img" src={props.item.item_img} />
            <div className="item_topbarWrapper">
                <div className="item_topLeft">
                    <IconButton onClick={backToStore} className='nave_icon' aria-label="delete">
                        <KeyboardBackspace />
                    </IconButton>
                </div>
                <div className="item_topMiddle">

                </div>
                <div className="item_topRight">
                    <IconButton onClick={goToBasket} className='nave_icon' aria-label="delete">
                        <Badge badgeContent={props.basket.length} color='error'>
                            <ShoppingBasket color="action" />
                        </Badge>
                    </IconButton>
                </div>
            </div>
            {(props.gettingStoreCategories) ? <LinearProgress style={{ "zIndex": "-100" }} color="success" /> : null}
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        basket: state.stores.basket
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemToolbar);