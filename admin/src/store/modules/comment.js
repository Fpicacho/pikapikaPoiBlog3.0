import comment from "../../api/comments";
const state = {};
const mutations = {};
const actions = {
  // 获取评论列表
  getCommentsList({ state, commit }, params) {
    return comment.list(params);
  },
  // 删除评论
  destroyComments({ state, commit }, params) {
    return comment.destroy(params);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
