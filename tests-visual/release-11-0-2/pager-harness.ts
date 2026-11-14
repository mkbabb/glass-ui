// A PagerDots with the ring off, its dot token the library's rem one
// (`--pager-dot-size: var(--space-body)`). `?count=` sets the dots (seven by default) and
// `?size=` a host's `--pager-dot-size` on the component. `window.__go(i)` moves the
// active dot. Imports are relative to `src/`, so the file mounts unchanged on an older
// tree.
import "../../demo/demo.css";
import { createApp, h, ref } from "vue";

import PagerDots from "../../src/components/pager-dots/PagerDots.vue";

const q = new URLSearchParams(location.search);
const count = Number(q.get("count") ?? 7);
const size = q.get("size");
const w = window as unknown as { __go: (i: number) => void };
const active = ref(0);
w.__go = (i) => (active.value = i);

createApp({
    setup: () => () =>
        h("div", { style: "padding:120px" }, [
            h(PagerDots, {
                count,
                active: active.value,
                ring: false,
                "data-witness": "pager",
                style: size ? { "--pager-dot-size": size } : undefined,
                "onUpdate:active": (i: number) => (active.value = i),
            }),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
