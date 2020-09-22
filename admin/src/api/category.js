import fetch from "./fetch";
export default {
  // 获取分类列表
  list(params) {
    return fetch.get("/category", params);
  },
  // 创建分类
  create(data) {
    return fetch.post("/category", data);
  },
  // 更新分类
  update(data) {
    return fetch.put("/category/" + data.id, data);
  },
  // 分类详情
  detail(params) {
    return fetch.get(`/category/${params.id}`, params);
  },
  //删除分类
  destory(params) {
    return fetch.delete("/category/" + params.id);
  }
};
