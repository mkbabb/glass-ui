import { createApp } from "vue";
// BG.W-CSS-MINIFY (F8.4) — the BC.W-CSS-CRITICAL critical/deferred split RETIRED:
// after the publish-time minify the ~13KB saving on the ~35KB-gz cascade was not
// worth the split's wave + gate + manifest + two exports. The bare-consumer
// first-paint harness imports the one byte-complete `./styles` union (the
// minified cascade), the single-import path the library now ships.
import "@mkbabb/glass-ui/styles";
import App from "./App.vue";

createApp(App).mount("#app");
