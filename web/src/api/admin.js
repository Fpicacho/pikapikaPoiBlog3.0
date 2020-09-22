import fetch from "./fetch";
export default {
  login(params) {
    return fetch.post("/admin/login", params);
  },
  auth(params) {
    return fetch.get("/admin/auth", params);
  }
};
