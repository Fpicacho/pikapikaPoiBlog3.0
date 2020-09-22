import fetch from "./fetch";
export default {
  // 获取广告
  list(params) {
    return fetch.get("/advertise", params);
  }
};
