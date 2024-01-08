import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style/global.css";
import "normalize.css/normalize.css";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(store).use(router).mount("#app");
