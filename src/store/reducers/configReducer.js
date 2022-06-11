import * as actionsTypes from '../../store/actions/actionsTypes';

const initialState = {
    baseUrl: 'http://192.168.1.103:8000'
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