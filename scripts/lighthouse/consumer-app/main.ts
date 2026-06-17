import { createApp } from "vue";
// The PUBLISHED `/styles` cascade — exactly what a real consumer imports. The
// consumer-app vite config aliases `@mkbabb/glass-ui/styles` to the built
// `dist/styles/index.css`, so this harness sees the published `/styles` monolith
// the way a real app's first paint does (the W-CSS-CRITICAL consumer-facing proof).
import "@mkbabb/glass-ui/styles";
import App from "./App.vue";

createApp(App).mount("#app");
