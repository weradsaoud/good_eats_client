import { createStore, combineReducers } from 'redux';
//reducers

// saga middleware
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware } from 'redux';
//import rootsagas from index
import rootSaga from './sagas';

const rootReducer = combineReducers({
//state slices
});

const sagaMiddleware = createSagaMiddleware();
let middleware = [sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;