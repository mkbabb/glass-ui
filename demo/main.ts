import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./demo.css";

const app = createApp(App).use(router);

// W-NAV-DOCK-FIX (defect 7) — await the router (the F2 beforeResolve eager-resolves the
// first navigation's lazy chunk) BEFORE mount, so the first paint is the resolved page,
// never an empty <RouterView> + the "Pick a story" flash.
void router.isReady().then(() => app.mount("#app"));
