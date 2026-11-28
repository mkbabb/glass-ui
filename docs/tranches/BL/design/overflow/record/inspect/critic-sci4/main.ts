import "../demo.css";
import { createApp } from "vue";
import Sci4 from "./Sci4.vue";

const app = createApp(Sci4);
app.config.errorHandler = (err) => {
    console.error("[sci4] app error", err);
};
app.mount("#app");
