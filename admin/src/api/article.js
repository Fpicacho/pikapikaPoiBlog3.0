import fetch from "./fetch";
export default {
  // 获取文章列表
  list(params) {
    return fetch.get("/article", params);
  },
  // 获取文章详情
  detail(params) {
    return fetch.get("/article/" + params.id, params);
  },
  // 更新文章
  update(data) {
    return fetch.put("/article/" + data.id, data);
  },
  // 删除文章
  destroy(params) {
    return fetch.delete("/article/" + params.id);
  },
  // 创建文章
  create(data) {
    return fetch.post("/article", data);
  }
};
