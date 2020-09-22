import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/login",
    meta: {
      title: "登录",
      noAuth: true,
    },
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "index",
        component: () => import("@/views/index.vue"),
      },
      // 管理员
      {
        path: "admin",
        name: "admin",
        component: () => import("../views/admin/index.vue"),
      },
      //
      {
        path: "category",
        name: "category",
        component: () => import("../views/category/list.vue"),
      },
      {
        path: "/category/create",
        name: "category/create",
        component: () => import("../views/category/create.vue"),
      },
      {
        path: "/category/update/:id",
        name: "category/update",
        component: () => import("../views/category/update.vue"),
      },
      {
        path: "article",
        name: "article",
        component: () => import("../views/article/list.vue"),
      },
      {
        path: "article/create",
        name: "article/create",
        component: () => import("../views/article/create.vue"),
      },
      {
        path: "article/update/:id",
        name: "article/update",
        component: () => import("../views/article/update.vue"),
      },
      {
        path: "advertise",
        name: "advertise",
        component: () => import("../views/advertise/list.vue"),
      },
      {
        path: "advertise/create",
        name: "advertise/create",
        component: () => import("../views/advertise/create.vue"),
      },
      {
        path: "comments",
        name: "comments",
        component: () => import("../views/comments/list.vue"),
      },
      {
        path: "reply/:comment_id",
        name: "reply",
        component: () => import("../views/reply/list.vue"),
      },
      {
        path: "/advertise/update/:id",
        name: "/advertise/update",
        component: () => import("../views/advertise/update.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
export default router;
