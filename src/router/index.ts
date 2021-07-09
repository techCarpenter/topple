import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { auth } from "../firebase";
import LoginRegisterView from "../views/LoginRegisterView.vue";
import DashboardView from "../views/DashboardView.vue";
import NotFound from "../views/NotFoundView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "LoginRegisterView",
    component: LoginRegisterView
  },
  {
    path: "/",
    name: "DashboardView",
    component: DashboardView,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresLogin = to.matched.some(record => record.meta.requiresLogin);

  // console.info("current user" ,auth.currentUser);

  if (requiresLogin && !auth.currentUser) next({ name: "LoginRegisterView" });
  else if (to.name === "LoginRegisterView" && auth.currentUser)
    next({ name: "DashboardView" });
  else next();
});

export { router };
