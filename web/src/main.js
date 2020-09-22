import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import qs from "qs";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import "lib-flexible/flexible.js";
import VueLazyload from "vue-lazyload";
// 引入 elementUI中的组件
import "../plugins/element";
Vue.use(mavonEditor);
Vue.use(VueLazyload);
Vue.prototype.axios = axios;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
router.beforeEach(async (to, from, next) => {
  const categoryIndex = localStorage.getItem("categoryIndex");
  if (categoryIndex) {
    store.commit("category/SET_CATEGROY_INDEX", parseInt(categoryIndex));
    next();
  } else {
    next();
  }
  const token = localStorage.getItem("token");
  if (token) {
    await store.dispatch("admin/adminAuth");
    next();
  } else {
    if (to.meta.requireAuth) {
      // next("/login");
      next();
    } else {
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
