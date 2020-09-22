import axios from "axios";
import qs from "qs";
import Vue from "vue";
import router from "@/router";
axios.defaults.baseURL = "http://localhost:5000/api/v1";


axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // 获取令牌 loading开启
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    const { response = {} } = error;
    if (response.status === 401) {
      Vue.prototype.$message.error(
        `${response.status}${response.statusText} 请检查token是否有效`
      );
      router.push("/login");
    } else if (response.status === 404) {
      Vue.prototype.$message.error(response.data.msg);
    } else if (response.status === 500) {
      Vue.prototype.$message.error("请告知后端工作人员 出错了");
    }
    // return Promise.reject(error);
    return new Promise(() => {});
  }
);

export default {
  get(url, params = {}) {
    return axios({
      method: "get",
      url,
      params,
      paramsSerializer: query => qs.stringify(query)
    });
  },
  post(url, params) {
    return axios({
      method: "post",
      url,
      data: qs.stringify(params)
    });
  },
  put(url, params = {}) {
    return axios({
      method: "put",
      url,
      data: qs.stringify(params)
    });
  },
  delete(url, params = {}) {
    return axios({
      method: "delete",
      url,
      params
    });
  }
};
