import endPoints from "./endPoints";
import network from "../services/network";

export const getStores = (params: object, headers: object) => {
    return network.get(endPoints.getStores)
};

export const getStoreGategories = (id: number) => {
    return network.get(endPoints.getStoreCtaegories, { params: { storeId: id } });
};

export const getItemOptions = (item_id: number) => {
    return network.get(endPoints.getItemOptions, { params: { item_id: item_id } });
};