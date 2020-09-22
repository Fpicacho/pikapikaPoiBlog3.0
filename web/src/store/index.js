import Vue from "vue";
import Vuex from "vuex";
import article from "./modules/article";
import category from "./modules/category";
import advertise from "./modules/advertise";
import comment from "./modules/comment";
import reply from "./modules/reply";
import admin from "./modules/admin";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAbout: false
  },
  mutations: {
    aboutIs(state) {
      state.isAbout = !state.isAbout;
    }
  },
  actions: {},
  modules: {
    article,
    category,
    advertise,
    comment,
    reply,
    admin
  }
});
