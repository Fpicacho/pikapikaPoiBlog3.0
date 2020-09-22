import advertise from '../../api/advertise'
const state = {}
const mutations = {}
const actions = {
  // 获取广告列表
  getAdvertiseList({ state, commit }, params) {
    return advertise.list(params);
  },
  // 删除广告
  destroyAdvertise({ state, commit }, params) {
    return advertise.destroy(params);
  },
  // 获取广告详情
  getAdvertiseDetail({state,commit},params){
    return advertise.detail(params);
  },
  // 更新广告
  updateAdvertise({stats,commit},params){
    return advertise.update(params);
  },
  // 创建广告
  createAdvertise({ state, commit }, data) {
    return advertise.create(data);
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}