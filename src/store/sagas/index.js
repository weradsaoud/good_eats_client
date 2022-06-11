import { all } from 'redux-saga/effects';
import storesSagas from './storesSagas';

export default function* rootSaga() {
    yield all([
        storesSagas()
    ]);
}