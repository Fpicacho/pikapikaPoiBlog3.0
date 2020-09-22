import admin from "../../api/admin";
const state = {
  userInfo: null
};
const mutations = {
  SET_USER_INFO(state, user) {
    state.userInfo = user;
  }
};
const actions = {
  async adminLogin({ commit, state }, params) {
    let res = await admin.login(params);
    return res;
  },
  async adminAuth({ commit, state }, params) {
    let res = await admin.auth(params);
    commit("SET_USER_INFO", res.data.nickname);
    return res;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
