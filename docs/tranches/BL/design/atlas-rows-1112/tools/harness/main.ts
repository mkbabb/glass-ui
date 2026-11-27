import "./harness.css";
import { createApp } from "vue";
import App from "./App.vue";

if (new URLSearchParams(location.search).get("cell")?.startsWith("dlg"))
    document.documentElement.setAttribute("data-classic-bar", "");

const w = window as unknown as { __errors: string[]; __ready: boolean };
w.__errors = [];
const app = createApp(App);
app.config.errorHandler = (err, _i, info) => {
    w.__errors.push(`${info}: ${String(err)}`);
};
app.mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
