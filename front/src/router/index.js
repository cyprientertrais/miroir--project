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
      import("../views/About.vue"),
  },
  {
    path: "/parametrage",
    name: "Parametrage",
    component: () =>
      import("../views/Parametrage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue"),
  },
  {
    path: "/wifi",
    name: "Wifi",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/WifiChoice.vue"),
  },
  {
    path: "/deleteProfile",
    name: "DeleteProfile",
    component: () =>
      import("../views/DeleteProfile.vue"),
  },
  {
    path: "/reglage",
    name: "Reglage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ReglagePopUp.vue"),
  }, 
  {
    path: "/profiles",
    name: "ProfilesList",
    component: () =>
      import("../views/ProfilesList.vue"),
  }, 
  {
    path: "/editprofiles",
    name: "EditProfiles",
    component: () =>
      import("../views/EditProfiles.vue"),
  },
  {
    path: "/parametrage/addProfile",
    name: "AddProfile",
    component: () =>
      import("../components/AddProfile.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

/**
 * Bloc de redirection -> impossible d'accéder à la configuration si la personne n'est pas connecté 
 */
router.beforeEach((to, from, next) => {
  if (to.name == "Parametrage" && !sessionStorage.getItem("isAuthenticated")) {
    next({ name: "Login", query: { from: to.name } });
  } else next();
});

export default router;