import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import routes from "../../../globals/routes";
import StoreLayout from "../layouts/storeLayout/storeLayout";
import StoresLayout from "../layouts/storeslayout/StoresLayout";
import Store from "../storepage/store";
import StoresList from "../storeslist/StoresList";
import * as actionsTypes from '../../../store/actions/actionsTypes';
import Item from "../itempage/Item";
interface IProps {
    loadConfig: () => void
}

interface IState {

}

class GoodEats_Client extends Component<IProps, IState>{


    componentDidMount(): void {
        this.props.loadConfig();
    }

    public render(): React.ReactNode {
        return (
            <Routes>
                {/* <Route path={routes.loginPageUrl} element={<LogIn />} /> */}
                <Route element={<StoresLayout />}>
                    <Route path={routes.storesPageUrl} element={<StoresList />} />
                </Route>
                <Route element={<StoreLayout />}>
                    <Route path={routes.storePageUrl} element={<Store />}></Route>
                </Route>
                <Route path={routes.item} element={<Item />}/>
            </Routes >
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        config: state.config
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadConfig: () => dispatch({ type: actionsTypes.LOADCONFIG })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GoodEats_Client);