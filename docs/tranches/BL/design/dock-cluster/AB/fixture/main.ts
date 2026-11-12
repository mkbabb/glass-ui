import "./h.css";
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
app.config.errorHandler = (err, _i, info) => { console.error("[ab] app error", info, err); (window as any).__errors = ((window as any).__errors || 0) + 1; };
app.mount("#app");
