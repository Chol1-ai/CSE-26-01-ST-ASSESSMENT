import { createRouter, createWebHashHistory } from "vue-router";
import Register from "@/components/Register.vue";
import Home from "@/components/Home.vue";

const routes = [
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
