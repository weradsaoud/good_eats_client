import store from '../store/store';


export const getBaseUrl = () => store.getState().config?.baseUrl;
//export const getUserToken = () => store.getState().auth?.user?.token;