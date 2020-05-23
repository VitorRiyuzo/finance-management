import Vue from "vue";
import Router from "vue-router";

import Login from "@/views/Login";
import Register from "@/views/Register";
import Stocks from "@/views/Stocks";
Vue.use(Router);

const routes = [
  {
    name: "login",
    path: "/",
    component: Login,
  },
  {
    name: "register",
    path: "/register",
    component: Register,
  },
  {
    name: "stocks",
    path: "/stocks",
    component: Stocks,
  },
];

const router = new Router({ routes });

export default router;
