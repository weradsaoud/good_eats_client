import { takeEvery, all, put } from 'redux-saga/effects';
import * as actionsTypes from '../actions/actionsTypes';
import { getStores, getStoreGategories, getItemOptions,getItemExtras, getVariantExtras } from '../../API/api';


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
            yield put({ type: actionsTypes.SAVESTORECATEGORIESLOCALLY, storeCategories: response.data });
        }
    } catch (error) {

    }
}

function* onGetItemOptions(action) {
    try {
        const response = yield getItemOptions(action.item_id);
        if(response.status == 200){
            if(response.data.length > 0){
                yield put({type: actionsTypes.SAVEOPTIONSLOCALLY, options: response.data});
            }else{
                yield put({type: actionsTypes.GETITEMEXTRAS, item_id: action.item_id});
            }
        }
    } catch (error) {
        console.log('err: ', error);
    }
}

function* onGetVariantExtras(action){
    try {
        yield put({type: actionsTypes.SETGETTINGVARIANTSTOTRUE})
        const response = yield getVariantExtras(action.variant, action.item_id);
        console.log('response: ', response);
        if(response.status == 200){
            yield put({type: actionsTypes.SAVEVARIANEXTRASTSLOCALLY, data: response.data});
        }
    } catch (error) {
        console.log('ERR in onGetVariantExtras: ', error);
    }
}

function* onGetItemExtras(action){
    try {
        yield put({type: actionsTypes.SETGETTINGITEMEXTRASTRUE})
        const response = yield getItemExtras(action.item_id);   
        if(response.status == 200){
            yield put({type: actionsTypes.SAVEITEMEXTRASLOCALLY, data: response.data});
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

function* watchGetItemOptions() {
    yield takeEvery(actionsTypes.GETITEMIOPTIONS, onGetItemOptions)
}

function* watchGetVariantExtras(){
    yield takeEvery(actionsTypes.GETVARIANTEXTRAS, onGetVariantExtras);
}

function* watchGetItemExtras(){
    yield takeEvery(actionsTypes.GETITEMEXTRAS, onGetItemExtras);
}

export default function* storesSagas() {
    yield all([
        watchGetStores(),
        watchGetStoreGategories(),
        watchGetItemOptions(),
        watchGetVariantExtras(),
        watchGetItemExtras()
    ]);
}