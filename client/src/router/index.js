import Vue from "vue";
import Router from "vue-router";
// @ts-ignore
import Login from "../views/Login.vue";
// @ts-ignore
import Home from "../views/Home.vue";
// @ts-ignore
import MyProducts from "../views/MyProducts";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/myProducts",
      name: "myProducts",
      component: MyProducts,
    },
    {
      path: "*",
      redirect: "/",
    },
    // {
    //   path: '/component(s)/:componentId',
    //   name: 'component',
    //   props: look into this
    //   component: Component (duh)
    // },
  ],
});
