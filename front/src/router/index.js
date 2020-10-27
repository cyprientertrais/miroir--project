import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/parametrage",
    name: "Parametrage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Parametrage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/reglage",
    name: "Reglage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ReglagePopUp.vue"),
  },
  {
    path: "/parametrage/addProfile",
    name: "AddProfile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/AddProfile.vue")
  },
  {
    path: "/parametrage/changeProfile",
    name: "ChangeProfile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/ChangeProfile.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name == "Parametrage" && !sessionStorage.getItem("isAuthenticated")) {
    next({ name: "Login", query: { from: to.name } });
  } else next();
});

export default router;
