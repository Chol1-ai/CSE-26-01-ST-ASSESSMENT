import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Register from "../views/Register.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;