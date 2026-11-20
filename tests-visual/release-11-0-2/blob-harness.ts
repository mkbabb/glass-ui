// One pressable Blob on the stock config in a 240px wrapper on a white page, as a hero
// blob sits.
// Imports are relative to `src/`, so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h } from "vue";

import Blob from "../../src/components/blob/Blob.vue";
import { BLOB_CONFIG_DEFAULTS } from "../../src/components/blob/types";

document.body.style.cssText = "margin:0;background:#fff";
createApp({
    setup: () => () =>
        h("div", { class: "blob-host", style: "position:absolute;left:200px;top:200px;width:240px;height:240px" }, [
            h(Blob, { color: "#e36a4b", config: BLOB_CONFIG_DEFAULTS, pressLabel: "Poke the blob" }),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
