import fetch from "@/api/fetch";
export default {
  getLike(params) {
    return fetch.post("/like", params);
  }
};
