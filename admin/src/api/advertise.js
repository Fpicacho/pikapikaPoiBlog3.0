import fetch from "./fetch";
export default {
  // 获取广告列表
  list(params) {
    return fetch.get("/advertise", params);
  },
  // 删除广告
  destroy(params) {
    return fetch.delete("/advertise/" + params.id);
  },
  // 创建广告
  create(data) {
    return fetch.post("/advertise", data);
  },
  // 获取广告详情
  detail(params) {
    return fetch.get("/advertise/" + params.id);
  },
  // 更新广告
  update(params) {
    return fetch.put("/advertise/" + params.id, params);
  }
};
