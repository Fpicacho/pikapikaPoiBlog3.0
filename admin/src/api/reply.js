import fetch from "./fetch";
export default {
  // 获取回复列表
  list(params) {
    return fetch.get("/reply", params);
  },
  // 删除回复
  destroy(params) {
    return fetch.delete("/reply/" + params.id);
  },
};
