import articles from "../../api/articles";
const state = {
  // count: 0
};
const mutations = {};
const actions = {
  // 获取文章
  async list({ commit }, params) {
    const res = await articles.list(params);
    return res;
  },
  // 获取文章详情
  async detail({ commit }, params) {
    const res = await articles.detail(params);
    return res;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
