import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import LoginRegisterView from "../views/LoginRegisterView.vue";
import DashboardView from "../views/DashboardView.vue";
import AccountsView from "../views/AccountsView.vue";
import PaymentsView from "../views/PaymentView.vue";
import ChartView from "../views/ChartView.vue";
import ProfileView from "../views/ProfileView.vue";
import SettingsView from "../views/SettingsView.vue";
import NotFound from "../views/NotFoundView.vue";

const routes = [
  {
    path: "/",
    name: "LoginRegisterView",
    component: LoginRegisterView
  },
  {
    path: "/dashboard",
    name: "DashboardView",
    component: DashboardView,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: "/accounts",
    name: "AccountsView",
    component: AccountsView,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: "/payments",
    name: "PaymentsView",
    component: PaymentsView,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: "/chart",
    name: "ChartView",
    component: ChartView,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: ProfileView,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: "/settings",
    name: "SettingsView",
    component: SettingsView,
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

  if (requiresLogin && !loggedIn) next({ name: "LoginRegisterView" });
  else if (to.name === "LoginRegisterView" && loggedIn)
    next({ name: "DashboardView" });
  else next();
});

export default router;
