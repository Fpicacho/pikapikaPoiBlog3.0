import reply from '../../api/reply'
const state = {};
const mutations = {};
const actions = {
  // 获取评论列表
  async getReplyListByCommentId({ commit }, params) {
    return reply.list(params);
  },
  async destroyReply({commit},params){
      return reply.destroy(params);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
