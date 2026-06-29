import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./demo.css";

const app = createApp(App).use(router);

// BG.W-ROUTE-TRANSITION (M0) — a global error handler so a route-component throw (an
// Aurora init failure, a lazy-chunk evaluation error) surfaces in the console with the
// Vue lifecycle `info` string instead of silently white-screening the shell. The
// per-Aurora `onInitError` contract stays the localized handler; this is the shell-wide
// backstop.
app.config.errorHandler = (err, _instance, info) => {
    console.error("[demo] app error", info, err);
};

// W-NAV-DOCK-FIX (defect 7) — await the router (the F2 beforeResolve eager-resolves the
// first navigation's lazy chunk) BEFORE mount, so the first paint is the resolved page,
// never an empty <RouterView> + the "Pick a story" flash.
void router.isReady().then(() => app.mount("#app"));
