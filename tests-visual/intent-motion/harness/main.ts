import "./harness.css";
import { createApp } from "vue";
import App from "./App.vue";
import { installPress } from "@glass/composables/motion/presence";
const q = new URLSearchParams(location.search);
if (q.get("mode") === "dark") document.documentElement.classList.add("dark");
if (q.get("press") === "1") installPress();
createApp(App).mount("#app");
