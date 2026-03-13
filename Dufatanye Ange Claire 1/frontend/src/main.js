import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";  // <-- import your router

import "bootstrap/dist/css/bootstrap.min.css"; // optional

createApp(App)
  .use(router)   // <-- register the router
  .mount("#app");