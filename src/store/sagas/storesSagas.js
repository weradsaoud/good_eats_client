import { takeEvery, all, put } from 'redux-saga/effects';
import * as actionsTypes from '../actions/actionsTypes';
import { getStores, getStoreGategories, getItemOptions } from '../../API/api';


function* onGetStores(action) {
    try {
        const response = yield getStores();
        if (response.status == 200) {
            yield put({ type: actionsTypes.SAVESTORESLOCALLY, stores: response.data });
        } else {
            //yield put({ type: actionsTypes.GETSTOREERR, response: response });
        }
    } catch (error) {

    }
}

function* onGetStoreGategories(action) {
    try {
        const response = yield getStoreGategories(action.storeId);
        if (response.status == 200) {
            console.log('getStoreGategories: ', response);
            yield put({ type: actionsTypes.SAVESTORECATEGORIESLOCALLY, storeCategories: response.data });
        }
    } catch (error) {

    }
}

function* onGetItemOptions(action) {
    try {
        console.log('item_id: ', action.item_id);
        const response = yield getItemOptions(action.item_id);
        console.log('response: ', response);
    } catch (error) {
        console.log('err: ', error);
    }
}

function* watchGetStores() {
    yield takeEvery(actionsTypes.GETSTORES, onGetStores);
}

function* watchGetStoreGategories() {
    yield takeEvery(actionsTypes.GETSTOREGATEGORIES, onGetStoreGategories)
}

function* watchGetItemOptions() {
    yield takeEvery(actionsTypes.GETITEMIOPTIONS, onGetItemOptions)
}

export default function* storesSagas() {
    yield all([
        watchGetStores(),
        watchGetStoreGategories(),
        watchGetItemOptions()
    ]);
}