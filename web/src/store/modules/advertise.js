import advertise from "../../api/advertise";
const state = {
  advertiseList: []
};
const mutations = {
  SET_ADVERTISE_LIST(state, list) {
    state.advertiseList = list;
  }
};
const actions = {
  // 获取广告
  async list({ state, commit }, params) {
    if (state.advertiseList && state.advertiseList.length > 0) {
      return state.advertiseList;
    }
    const res = await advertise.list(params);
    commit("SET_ADVERTISE_LIST", res.data.data);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
