import fetch from "@/api/fetch";
export default {
  // 登录
  login(params) {
    return fetch.post("/admin/login", params);
  },
  // 认证
  auth(params) {
    return fetch.get("/admin/auth", params);
  }
};
