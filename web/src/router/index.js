import { createRouter, createWebHashHistory } from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/news",
    name: "news",
    component: () => import("@/views/news/index.vue"),
  },
  {
    path: "/news/:id",
    name: "详情页面",
    component: () => import("@/views/news/components/newsDetail/index.vue"),
  },
  {
    path: "/product",
    name: "product",
    component: () => import("@/views/product/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
//路由守卫
router.beforeEach((to, from, next) => {
  Nprogress.start();
  next();
});
router.afterEach((to, from, next) => {
  Nprogress.done();
});

export default router;
