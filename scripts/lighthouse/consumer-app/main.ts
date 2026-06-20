import { createApp } from "vue";
// BC.W-CSS-CRITICAL load-order proof — the consumer-owned split strategy. The
// critical subset (token cascade + glass ladder + typography + theme, the
// above-the-fold chrome) is imported SYNCHRONOUSLY so it render-blocks EARLY —
// the consumer-app vite config aliases `@mkbabb/glass-ui/styles/critical` to the
// built `dist/styles/critical.css`. The DEFERRED tail (component recipes + the
// folded SFC payload + the Tailwind utility surface) is loaded NON-blocking AFTER
// first paint, so the published split's first-paint reach is the binding wire
// (presets-in-consumers — the library ships the two partitioned files, the
// consumer picks the load order; the `./styles` union stays the one-import path).
import "@mkbabb/glass-ui/styles/critical";
// The deferred URL: Vite resolves the `?url` form to the emitted hashed asset so
// it loads as a real, separately-cacheable, non-render-blocking stylesheet.
import deferredHref from "@mkbabb/glass-ui/styles/deferred?url";
import App from "./App.vue";

// Inject the deferred tail NON-blocking (the `media="print"` → `onload` swap, the
// canonical non-render-blocking <link> recipe). The above-the-fold chrome paints
// from the critical subset; the deferred tail's late arrival shifts ZERO
// above-the-fold pixel (FOUC-safe by construction).
const deferred = document.createElement("link");
deferred.rel = "stylesheet";
deferred.href = deferredHref;
deferred.media = "print";
deferred.addEventListener("load", () => {
    deferred.media = "all";
});
document.head.appendChild(deferred);

createApp(App).mount("#app");
