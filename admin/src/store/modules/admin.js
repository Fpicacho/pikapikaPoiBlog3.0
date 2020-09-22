import admin from "../../api/admin";
const state = {
  userInfo: {
    nickname: "",
  },
};
const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
};
const actions = {
  // 登录
  async adminLogin(comtest,params) {
    return await admin.login(params);
  },
  // 验证令牌
  async adminAuth({commit},params) {
    const res =  await admin.auth(params);
    commit('SET_USER_INFO',res.data);
    return res;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
