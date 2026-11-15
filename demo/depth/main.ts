// W-B.19 prototype harness: the three compositions on one scrolling page.
//   ?theme=dark       the dark arm
//   ?still=1          the still twin (lag 0, no animation: the reduced-motion form)
//   ?lag=0.0625       a lower --depth-lag on every scene
//   ?paused=1         the Blob's render loop parked (for frame-exact pixel reads)
import "../demo.css";
import { createApp } from "vue";
import DepthHarness from "./DepthHarness.vue";

const params = new URLSearchParams(location.search);
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");

createApp(DepthHarness).mount("#app");
