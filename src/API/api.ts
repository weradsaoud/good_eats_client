import endPoints from "./endPoints";
import network from "../services/network";

export const getStores = (params: object, headers: object) => {
    return network.get(endPoints.getStores)
};