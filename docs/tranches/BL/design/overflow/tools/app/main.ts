// The overflow study's stress page entry (/ovf.html). Copied into <tree>/demo/__ovf/
// by tools/build-tree.sh; it never touches the demo's own entry.
import "../demo.css";
import { createApp } from "vue";
import Stress from "./Stress.vue";

const app = createApp(Stress);
app.config.errorHandler = (err) => {
    console.error("[ovf] app error", err);
};
app.mount("#app");
