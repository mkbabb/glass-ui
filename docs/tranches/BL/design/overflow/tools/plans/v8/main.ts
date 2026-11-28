import "../demo.css";
import { createApp } from "vue";
import Witness from "./Witness.vue";

const app = createApp(Witness);
app.config.errorHandler = (err) => {
    console.error("[sci] app error", err);
};
app.mount("#app");
