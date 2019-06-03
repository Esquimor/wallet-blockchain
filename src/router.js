import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Blockchain from "./views/Blockchain";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Profile from "./views/Profile";
import Register from "./views/Register";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/blockchain",
      name: "blockchain",
      component: Blockchain
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/register",
      name: "register",
      component: Register
    }
  ]
});
