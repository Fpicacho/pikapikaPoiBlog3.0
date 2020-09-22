import category from "../../api/category";
const state = {
  categoryList: [],
  categoryIndex: 0
};
const mutations = {
  SET_CATEGROY_LIST(state, list) {
    state.categoryList = list;
  },
  SET_CATEGROY_INDEX(state, index) {
    state.categoryIndex = index;
  }
};
const actions = {
  async list({ state, commit }, params) {
    if (state.categoryList && state.categoryList.length > 0) {
      return state.categoryList;
    }
    let res = await category.list(params);
    let categoryList = res.data.data;
    categoryList.unshift({ name: "全部" });
    commit("SET_CATEGROY_LIST", categoryList);
    return res.data.data;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
