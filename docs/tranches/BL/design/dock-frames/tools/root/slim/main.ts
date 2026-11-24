// The O-420 witness page: /slim/?c=<fourier-dock|dock|group-dock|tip-dock>[&scheme=dark].
import "../demo/demo.css";
import "./anim.css";
import { createApp, defineAsyncComponent, h, nextTick, type Component } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";

declare global {
    interface Window {
        __animReady?: boolean;
        __animError?: string;
    }
}
const PAGES: Record<string, () => Promise<unknown>> = {
    "fourier-dock": () => import("./mounts/fourier-dock.vue"),
    dock: () => import("./mounts/dock.vue"),
    "group-dock": () => import("./mounts/group-dock.vue"),
    "tip-dock": () => import("./mounts/tip-dock.vue"),
};
const params = new URLSearchParams(window.location.search);
const name = params.get("c") ?? "dock";
const dark = params.get("scheme") === "dark";
document.documentElement.classList.toggle("dark", dark);
document.documentElement.style.colorScheme = dark ? "dark" : "light";
const loader = PAGES[name];
if (!loader) {
    window.__animError = `unknown page ${name}`;
    window.__animReady = true;
} else {
    const Page = defineAsyncComponent(loader as () => Promise<Component>);
    const router = createRouter({ history: createMemoryHistory(), routes: [{ path: "/:p(.*)*", component: { render: () => null } }] });
    const app = createApp({ render: () => h("main", { class: "anim-root", "data-c": name }, [h(Page)]) });
    app.use(router);
    app.config.errorHandler = (err) => {
        window.__animError = String(err);
    };
    void router.push("/").then(async () => {
        app.mount("#app");
        await nextTick();
        const t0 = performance.now();
        while (!document.querySelector(".glass-dock") && performance.now() - t0 < 8000) await new Promise((r) => setTimeout(r, 30));
        await document.fonts?.ready;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        window.__animReady = true;
    });
}
