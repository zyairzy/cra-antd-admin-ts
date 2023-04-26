import axios from 'axios';
import { notification } from 'antd';

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, //url = base url + request url
  timeout: 15000,
  // withCredentials: true   // send cookies when cross-domain request
});

service.interceptors.request.use(
  config => {
    // do something before request is send
    const token = '';
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = 'Request error: ';
          break;
        case 401:
          error.message = 'Unauthorized, please log in with the correct username and password';
          break;
        case 403:
          error.message = 'Access denied: ';
          break;
        case 404:
          error.message = `Request resource error： `;
          return;
        case 408:
          error.message = 'Request timeout';
          break;
        case 500:
          error.message = 'Server inner error: ';
          break;
        case 501:
          error.message = 'Service unimplemented';
          break;
        case 502:
          error.message = 'Gateway error';
          break;
        case 503:
          error.message = 'Service unavailable';
          break;
        case 504:
          error.message = 'Gateway timeout';
          break;
        case 505:
          error.message = 'HTTP version unsupported';
          break;

        default:
      }
      if (error.response.data) {
        try {
          let errMsgObj;
          if (typeof error.response.data === 'string') {
            errMsgObj = JSON.parse(error.response.data);
          } else if (typeof error.response.data === 'object') {
            errMsgObj = error.response.data;
          }
          error.message = errMsgObj.message;
        } catch (err) {
          console.log(err);
        }
      }
    }
    console.log('err' + error); // for debug
    if (error.message) {
      notification.error({
        message: error.message,
      });
    }
    return Promise.reject(error);
  }
);

export default service;

export type Response<T = any> = {
  status: boolean;
  message: string;
  result: T;
};
