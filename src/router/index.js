import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Accounts from "../views/AccountsView.vue";
import Dashboard from "../views/DashboardView.vue";
import LoginRegister from "../views/LoginRegisterView.vue";
import NotFound from "../views/NotFoundView.vue";

const routes = [
  {
    path: "/",
    name: "LoginRegister",
    component: LoginRegister
  },
  {
    path: "/accounts",
    name: "Accounts",
    component: Accounts,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
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
  const loggedIn = store.getters.getLoggedIn;
  const requiresLogin = to.matched.some(record => record.meta.requiresLogin);

  if (requiresLogin && !loggedIn) next({ name: "LoginRegister" });
  else next();
});

export default router;
