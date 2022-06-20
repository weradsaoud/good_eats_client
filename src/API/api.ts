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

export const getItemExtras = (item_id: number) => {
    return network.get(endPoints.getItemExtras, { params: { item_id: item_id } });
};

export const getVariantExtras = (variant: string, item_id: number) => {
    return network.get(endPoints.getVariantExtras, { params: { variant: variant, item_id: item_id } });
};

export const sendOrder = (order: any) => {
    return network.post(endPoints.order, { params: { order: { ...order } } });
}