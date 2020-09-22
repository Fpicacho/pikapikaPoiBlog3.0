import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import "./assets/style/admin.css";

Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.use(mavonEditor);

// 全局导航守卫
router.beforeEach(async (to, from, next) => {
  const admin_token = localStorage.getItem("admin_token");
  if (admin_token) {
    // 用户已经登录 认证 放行
    await store.dispatch("admin/adminAuth");
    next();
  } else {
    // 用户未登录
    if (to.meta.noAuth) {
      next();
    } else {
      Vue.prototype.$Message.error("权限未经授权");
      setTimeout(() => {
        next("/login");
      }, 1500);
    }
  }
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
