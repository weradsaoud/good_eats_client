import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import routes from "../../../globals/routes";
import StoresLayout from "../layouts/storeslayout/StoresLayout";
import StoresList from "../storeslist/StoresList";

interface IProps {

}

interface IState {

}

class GoodEats_Client extends Component<IProps, IState>{


    componentDidMount(): void {

    }

    public render(): React.ReactNode {
        return (
            <Routes>
                {/* <Route path={routes.loginPageUrl} element={<LogIn />} /> */}
                <Route element={<StoresLayout />}>
                    <Route path={routes.storesPageUrl} element={<StoresList />} />
                </Route>

            </Routes >
        );
    }
}

export default GoodEats_Client;