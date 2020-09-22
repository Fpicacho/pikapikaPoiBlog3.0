import comment from "../../api/comment";
const state = {
  commentList: []
};
const mutations = {
  // 设置评论列表
  SET_COMMENT_LIST(state, list) {
    state.commentList = list;
  }
};
const actions = {
  async getCommentList({ state, commit }, params) {
    const res = await comment.list(params);
    return res;
  },
  async createComment({ commit }, params) {
    return await comment.create(params);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
