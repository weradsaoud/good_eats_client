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
    gettingOptions: true,
    gettingVariantExtras: false,
    gettingItemExtras: false,
    extras: [],
    showExtras: false,
    variant_item_price: '',
    variant_id: '',
    basket: [],
    sendingOrder: false,
    orderSuccess: false,
    orderFailure: false,
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
        case actionsTypes.SETGETTINGVARIANTSTOTRUE:
            return {
                ...state,
                gettingVariantExtras: true
            }
        case actionsTypes.SAVEVARIANEXTRASTSLOCALLY:
            return {
                ...state,
                gettingVariantExtras: false,
                variant_item_price: action.data.variant_price,
                variant_id: action.data.variant_id,
                extras: [...action.data.extras]
            }
        case actionsTypes.SETGETTINGITEMEXTRASTRUE:
            console.log('SETGETTINGITEMEXTRASTRUE');
            return {
                ...state,
                gettingVariantExtras: false,
                gettingOptions: false,
                gettingItemExtras: true
            }
        case actionsTypes.SAVEITEMEXTRASLOCALLY:
            console.log('SAVEITEMEXTRASLOCALLY');
            return {
                ...state,
                gettingItemExtras: false,
                variant_item_price: action.data.item_price,
                extras: [...action.data.extras],
                showExtras: true,
            }
        case actionsTypes.ITEMWILLUNMOUNT:
            return {
                ...state,
                showExtras: false,
                selectedItem: {},
                options: [],
                gettingOptions: true,
                gettingVariantExtras: false,
                gettingItemExtras: false,
                extras: [],
                variant_item_price: '',
                variant_id: ''
            }
        case actionsTypes.SETVARIANTITEMPRICE:
            return {
                ...state,
                variant_item_price: action.variant_item_price
            }
        case actionsTypes.ADDTOBASKET:
            console.log('action basketItem: ', action.basketItem);
            let sameItems_add = state.basket.filter((basketItem, idx) => {
                console.log(`basket item ${idx}: `, basketItem);
                if (
                    (basketItem.item.item_id == action.basketItem.item.item_id)
                    &&
                    (basketItem.variantId == action.basketItem.variantId)) {
                    if (basketItem.extras.length == action.basketItem.extras.length) {
                        let equal = true;
                        basketItem.extras.forEach((extra, idx) => {
                            equal = equal && action.basketItem.extras.filter(e => (e.extraId == extra.extraId));
                        });
                        return equal;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
            if (sameItems_add && sameItems_add.length > 0) { //
                let sameItem = sameItems_add[0];
                sameItem.count++;
                let basketCopy_inc = [];
                state.basket.forEach(basketItem => {
                    let store = { ...basketItem.store };
                    let item = { ...basketItem.item };
                    let variant = { ...basketItem.variant };
                    let extrasCopy = [];
                    basketItem.extras.forEach((extra) => {
                        extrasCopy.push({ ...extra });
                    });
                    basketCopy_inc.push(
                        {
                            store: store,
                            item: item,
                            variant: variant,
                            variantId: basketItem.variantId,
                            extras: extrasCopy,
                            basketItemPrice: basketItem.basketItemPrice,
                            count: basketItem.count
                        }
                    );
                });
                return {
                    ...state,
                    basket: basketCopy_inc
                }
            } else {
                let basketCopy = [];
                state.basket.forEach(basketItem => {
                    let store = { ...basketItem.store };
                    let item = { ...basketItem.item };
                    let variant = { ...basketItem.variant };
                    let extrasCopy = [];
                    basketItem.extras.forEach((extra) => {
                        extrasCopy.push({ ...extra });
                    });
                    basketCopy.push(
                        {
                            store: store,
                            item: item,
                            variant: variant,
                            variantId: basketItem.variantId,
                            extras: extrasCopy,
                            basketItemPrice: basketItem.basketItemPrice,
                            count: basketItem.count
                        }
                    );
                });
                basketCopy.push({
                    store: action.basketItem.store,
                    item: action.basketItem.item,
                    variant: action.basketItem.variant,
                    variantId: action.basketItem.variantId,
                    extras: action.basketItem.extras,
                    basketItemPrice: action.basketItem.basketItemPrice,
                    count: 1
                });
                return {
                    ...state,
                    basket: basketCopy
                }
            }

        case actionsTypes.REMOVEFROMTOBASKET:
            let basketCopy_remove = [];
            state.basket.forEach(basketItem => {
                let store = { ...basketItem.store };
                let item = { ...basketItem.item };
                let variant = { ...basketItem.variant };
                let extrasCopy = [];
                basketItem.extras.forEach((extra) => {
                    extrasCopy.push({ ...extra });
                });
                basketCopy_remove.push(
                    {
                        store: store,
                        item: item,
                        variant: variant,
                        variantId: basketItem.variantId,
                        extras: extrasCopy,
                        basketItemPrice: basketItem.basketItemPrice,
                        count: basketItem.count
                    }
                );
            });
            let basket_ = basketCopy_remove.filter((basketItem) => {
                return basketItem.item.item_id != action.basketItem.item.item_id;
            });
            return {
                ...state,
                basket: basket_
            }
        case actionsTypes.INCREMENTCOUNT:
            let basketCopy_inc = [];
            state.basket.forEach(basketItem => {
                let store = { ...basketItem.store };
                let item = { ...basketItem.item };
                let variant = { ...basketItem.variant };
                let extrasCopy = [];
                basketItem.extras.forEach((extra) => {
                    extrasCopy.push({ ...extra });
                });
                let newCount;
                if (basketItem.item.item_id == action.basketItem.item.item_id) {
                    newCount = basketItem.count + 1;
                } else {
                    newCount = basketItem.count
                }
                basketCopy_inc.push(
                    {
                        store: store,
                        item: item,
                        variant: variant,
                        variantId: basketItem.variantId,
                        extras: extrasCopy,
                        basketItemPrice: basketItem.basketItemPrice,
                        count: newCount
                    }
                );
            });
            return {
                ...state,
                basket: basketCopy_inc
            }

        case actionsTypes.EMPTYBASKET:
            return {
                ...state,
                basket: []
            }
        case actionsTypes.ORDERSUCCESS:
            return {
                ...state,
                basket: [],
                orderSuccess: true,
                sendingOrder: false
            }
        case actionsTypes.ORDERFAILED:
            return {
                ...state,
                orderFailure: true,
                sendingOrder: false
            }
        case actionsTypes.LOGINWILLUNMOUNT:
            return {
                ...state,
                sendingOrder: false,
                orderSuccess: false,
                orderFailure: false,
            }
        case actionsTypes.SENDINGORDER:
            return {
                ...state,
                sendingOrder: true
            }
        case actionsTypes.BASKETWILLUNMOUNT:
            return {
                ...state,
                sendingOrder: false,
                orderSuccess: false,
                orderFailure: false,
            }
    }
    return state;
};

export default storesReducer;