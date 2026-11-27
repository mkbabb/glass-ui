// The witness page's boot: /?am=<mode>. Copied into <tree>/demo/__am/ by build-tree.sh; the
// tree's demo/main.ts is wrapped so this runs only when ?am= is set.
import "../demo.css";
import { createApp, nextTick } from "vue";
import Page from "./Page.vue";

declare global {
    interface Window {
        __amReady?: boolean;
        __amError?: string;
    }
}

export async function boot(): Promise<void> {
    const app = createApp(Page);
    app.config.errorHandler = (err, _i, info) => {
        console.error("[am] app error", info, err);
        window.__amError = String(err);
    };
    app.mount("#app");
    await nextTick();
    await document.fonts?.ready;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    window.__amReady = true;
}
