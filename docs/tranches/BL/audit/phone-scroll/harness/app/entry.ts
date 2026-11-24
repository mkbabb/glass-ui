// The phone-scroll page boot: /?ps=1&s=<surface>&n=<rows>. Copied into <tree>/demo/__phone/
// by build-tree.sh; the tree's demo/main.ts is wrapped so this runs only when ?ps= is set.
import "../demo.css";
import { createApp, nextTick } from "vue";
import Page from "./Page.vue";

declare global {
    interface Window {
        __psReady?: boolean;
        __psError?: string;
    }
}

export async function boot(): Promise<void> {
    const app = createApp(Page);
    app.config.errorHandler = (err, _i, info) => {
        console.error("[ps] app error", info, err);
        window.__psError = String(err);
    };
    app.mount("#app");
    await nextTick();
    await document.fonts?.ready;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    window.__psReady = true;
}
