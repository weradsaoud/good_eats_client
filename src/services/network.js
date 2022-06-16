import axios from 'axios';
import { getBaseUrl } from './globalFunctions';

/**
 * class for network client layer
 * @class Network
 */

class Network {
  network;
  constructor() {
    this.network = this.setupInterceptors();
  }

  /**
   * setup member axios
   *
   * @returns
   * @memberof Network
   */
  setupInterceptors() {
    const axiosInstance = axios.create({});
    axiosInstance.interceptors.request.use(
      (config) => {
        //const token = getUserToken();
        const baseUrl = getBaseUrl();
        config.baseURL = baseUrl;
        config.withCredentials = true;
        // if (token) {
        //   config.headers['Authorization'] = `Bearer ${token}`;
        // }
        config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        config.timeout = 10000;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    return axiosInstance;
  }


  /**
   * Get Mothod
   *
   * @param {*} endPoint
   * @param {*} [params={}]
   * @param {*} [headers={}]
   * @param {string} [responseType='json']
   * @returns
   * @memberof Network
   */
  async get(endPoint, { params, headers, responseType } = { params: null, headers: null, responseType: null }) {
    try {
      const response = await this.network({
        method: 'get',
        url: endPoint,
        params: params ?? {},
        headers: headers ?? {},
        responseType: responseType ?? 'json'
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Post Method
   *
   * @param {*} endPoint
   * @param {*} [payload={}]
   * @param {*} [headers={}]
   * @returns
   * @memberof Network
   */
  async post(endPoint, { params, headers }) {
    return this.network({
      method: 'post',
      url: endPoint,
      data: params ?? {},
      headers: headers ?? {}
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

const network = new Network();

export default network;
