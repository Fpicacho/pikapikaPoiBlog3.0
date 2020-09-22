import axios from "axios";
import qs from "qs";
import admin from "./admin";
let fetch = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  timeout: 1000,
});
fetch.interceptors.request.use(
  (config) => {
    const admin_token = localStorage.getItem("admin_token");
    if (admin_token) {
      config.headers.common.Authorization = `Bearer ${admin_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default {
  get(url, params = {}) {
    return fetch({
      method: "get",
      url,
      params,
    });
  },
  post(url, params = {}) {
    return fetch({
      method: "post",
      url,
      data: qs.stringify(params),
    });
  },
  put(url, params = {}) {
    return fetch({
      method: "put",
      url,
      data: qs.stringify(params),
    });
  },
  delete(url, params = {}) {
    return fetch({
      method: "delete",
      url,
      params,
    });
  },
};
