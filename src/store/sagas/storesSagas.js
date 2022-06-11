import { takeEvery, all, put } from 'redux-saga/effects';
import * as actionsTypes from '../actions/actionsTypes';
import { getStores } from '../../API/api';


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

function* watchGetStores() {
    yield takeEvery(actionsTypes.GETSTORES, onGetStores);
}

export default function* storesSagas() {
    yield all([
        watchGetStores()
    ]);
}