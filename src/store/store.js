import { createStore, combineReducers } from 'redux';
//reducers
import storeReducer from './reducers/storeReducer';
// saga middleware
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware } from 'redux';
//import rootsagas from index
import rootSaga from './sagas';

const rootReducer = combineReducers({
    //state slices
    store: storeReducer
});

const sagaMiddleware = createSagaMiddleware();
let middleware = [sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;