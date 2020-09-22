import category from "../../api/category";
const state = {};
const mutations = {}
const actions = {
  // 获取分类列表
  getCategoryList({state,commit},params){
    return category.list(params)
  },
  // 创建分类
  createCategory({state,commit},data){
    return category.create(data);
  },
  // 更新分类
  updateCategory({state,commit},data){
    return category.update(data);
  },
  // 获取分类详情
  getCategoryDetail({state,commit},params){
    return category.detail(params)
  },
  // 删除分类
  destroyCategory({state,commit},params){
    return category.destory(params);
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}