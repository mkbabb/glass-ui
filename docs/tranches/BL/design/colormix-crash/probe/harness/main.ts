import "./harness.css";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.config.errorHandler = (err, _i, info) => {
    (window as any).__errors = [...((window as any).__errors ?? []), `${info}: ${String(err)}`];
};
app.mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => ((window as any).__ready = true)));
