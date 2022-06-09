import * as actionsTypes from '../actions/actionsTypes'

const initialState = {
    scrollY: 0
}

const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.SCROLL:
            console.log('from reducer: ', action.scrollY);
            return {
                ...state,
                scrollY: action.scrollY
}
    }
    return state;
};

export default storeReducer;