import { KeyboardBackspace, ShoppingBasket } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import routes from "../../../globals/routes";
import '../baskettoolbar/baskettoolbar.css';

function SigninToolbar(props: any) {

    let navigate = useNavigate();

    let location = useLocation();
    let from: string = location.state as string;

    const goBack = () => {
        navigate(from);
    };

    let StoreName = (props.basket.length > 0) ? props.basket[0].store.name : 'Basket is empty'

    return (
        <div className="basket_topbar">
            <div className="basket_topbarWrapper">
                <div className="basket_topLeft">
                    <IconButton size="small" id='prevBtn' className='basket_nave_icon' onClick={goBack} aria-label="delete">
                        <KeyboardBackspace />
                    </IconButton>
                </div>
                <div className="basket_topMiddle">
                    Login
                </div>
                <div className="basket_topRight">
                    <div className='right'>
                        {/* <IconButton onClick={props.toggleSideMenu} className='basket_nave_icon' aria-label="delete">
                            <Badge badgeContent={props.basket.length} color='error'>
                                <ShoppingBasket color="action" />
                            </Badge>
                        </IconButton> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        basket: state.stores.basket,
        selectedStore: state.stores.selectedStore
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninToolbar);