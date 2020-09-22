import fetch from "./fetch";
export default {
  create(params) {
    return fetch.post("/like", params);
  }
};
