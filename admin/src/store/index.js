import Vue from "vue";
import Vuex from "vuex";
// import * as types from "./mutation-types";
import admin from "./modules/admin";
import category from "./modules/category";
import article from "./modules/article";
import advertise from "./modules/advertise";
import comment from "./modules/comment";
import reply from "./modules/reply";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    main_loading: false
  },
  mutations: {
    // [types.SET_MAIN_LOADING](state, data) {
    //   state.main_loading = data;
    // }
  },
  actions: {
    // setMainLoading({ commit }, data) {
    //   commit(types.SET_MAIN_LOADING, data);
    // }
  },
  modules: {
    admin,
    category,
    article,
    advertise,
    comment,
    reply
  }
});
