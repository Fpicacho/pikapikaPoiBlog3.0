import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "home",
    component: () => import("../views/Index.vue"),
    children: [
      { path: "/home", component: () => import("../views/article/list") },
      {
        path: "/article/detail",
        name: "article-detail",
        meta: {
          requireAuth: true
        },
        component: () => import("../views/article/detail")
      },
      {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue")
      },
      {
        path: "/website",
        name: "Website",
        component: () => import("../views/Website.vue")
      },
      {
        path: "/painting",
        name: "Painting",
        component: () => import("../views/Painting.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login-list",
    component: () => import("../views/Login")
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/404")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
