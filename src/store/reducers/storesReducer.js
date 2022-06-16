import * as actionsTypes from '../actions/actionsTypes'

const initialState = {
    scrollY: 0,
    stores: [], //         [{
    //id: 1,
    //name: "store1",
    //description: 'it is store1, and it serves good food',
    //orderingTypes: ['Collection', 'Table ordering', 'Pickup'],
    //logo: "https://us.123rf.com/450wm/andyadi/andyadi1802/andyadi180200513/95572662-vector-logo-design-for-beauty-salon-dermatology-center-and-wellness-house-.jpg?ver=6",
    //cover: "https:// ...",
    //opened: true,
    //maxServeTime: 30
    //} ... ]
    gettingStores: true,
    response: {},
    storeCategories: [],
    gettingStoreCategories: true,
    selectedStore: {},
    selectedItem: {},
    options: [],
    gettingOptions: true
}

const storesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.SCROLL:
            return {
                ...state,
                scrollY: action.scrollY
            }
        case actionsTypes.SAVESTORESLOCALLY:
            return {
                ...state,
                stores: [...action.stores],
                gettingStores: false
            }


        case actionsTypes.UNMOUNTSTORESLISTS:
            return {
                ...state,
                gettingStores: true
            }
        case actionsTypes.GETSTOREERR:
            return {
                ...state,
                gettingStores: false,
                response: { ...action.response }
            }
        case actionsTypes.SAVESTORECATEGORIESLOCALLY:
            return {
                ...state,
                storeCategories: [...action.storeCategories],
                gettingStoreCategories: false
            }

        case actionsTypes.SETSELECTEDSTORE:
            return {
                ...state,
                selectedStore: { ...action.store }
            };

        case actionsTypes.SETSELECTEDITEM:
            return {
                ...state,
                selectedItem: { ...action.item }
            };
        case actionsTypes.SAVEOPTIONSLOCALLY:
            console.log('actionsTypes.SAVEOPTIONSLOCALLY: ', action.options);
            return {
                ...state,
                options: [...action.options],
                gettingOptions: false
            }

    }
    return state;
};

export default storesReducer;