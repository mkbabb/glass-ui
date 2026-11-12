import "./harness.css";
import { createApp } from "vue";
import App from "./App.vue";
const q = new URLSearchParams(location.search);
if (q.get("mode") === "dark") document.documentElement.classList.add("dark");
createApp(App).mount("#app");
