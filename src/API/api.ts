import endPoints from "./endPoints";
import network from "../services/network";

export const getStores = (params: object, headers: object) => {
    return network.get(endPoints.getStores)
};

export const getStoreGategories = (id: number) => {
    return network.get(endPoints.getStoreCtaegories, { params: { storeId: id } });
};