import axios from "axios";

export const API_BASE_URL = "";

export const instance = axios.create({
  baseURL: API_BASE_URL,
});

function responsefulfilledInterceptor(res) {
  if (200 <= res.status && res.status < 300) {
    return res.data;
  }
  return Promise.reject(res.data);
}

function responseRejectedInterceptor(error) {
  return error;
}

instance.interceptors.response.use(
  responsefulfilledInterceptor,
  responseRejectedInterceptor
);

export function get(...args) {
  return instance.get(...args);
}

export function post(...args) {
  return instance.post(...args);
}

export function put(...args) {
  return instance.put(...args);
}

export function patch(...args) {
  return instance.patch(...args);
}

export function del(...args) {
  return instance.delete(...args);
}
