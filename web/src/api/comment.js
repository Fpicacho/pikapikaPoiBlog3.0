import fetch from "./fetch";
export default {
  // 获取目标下的评论列表
  list(params) {
    return fetch.get("/comment/target/list", params);
  },
  create(params) {
    return fetch.post("/comment", params);
  }
};
