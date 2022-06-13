import { takeEvery, all, put } from 'redux-saga/effects';
import * as actionsTypes from '../actions/actionsTypes';
import { getStores, getStoreGategories } from '../../API/api';


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

function* watchGetStores() {
    yield takeEvery(actionsTypes.GETSTORES, onGetStores);
}

function* watchGetStoreGategories() {
    yield takeEvery(actionsTypes.GETSTOREGATEGORIES, onGetStoreGategories)
}

export default function* storesSagas() {
    yield all([
        watchGetStores(),
        watchGetStoreGategories()
    ]);
}