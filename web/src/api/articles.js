import fetch from "@/api/fetch";
export default {
  // 获取分类列表
  list(params) {
    return fetch.get("/article", params);
  },
  detail(params) {
    return fetch.get("/article/" + params.id);
  }
};
