import * as actionsTypes from '../../store/actions/actionsTypes';

const initialState = {
    baseUrl: 'http://127.0.0.1:8000'
};

const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.LOADCONFIG:
            return { ...state };

        default:
            break;
    }
    return state;
};

export default configReducer;