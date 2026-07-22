// Establish the global cascade order before any component stylesheet is evaluated.
import "./demo.css";
import { createApp, nextTick, type App } from "vue";
import App_ from "./App.vue";
import { router } from "./router";
import { armGlassRefract } from "@glass/composables/glass";

// Arm the `.glass-lens` refraction latch once at bootstrap — sets
// `:root[data-glass-refract="on"]` iff the url()-filter raster path paints (Chromium yes,
// WebKit's `@supports`-lying accept-and-drop no). Idempotent + DOM-ready-deferred; with the
// latch OFF the lens degrades to its blur base. Explicit because `sideEffects: ['*.css']`
// prunes module-load side effects (kin to how a consumer installs dark-mode sync).
armGlassRefract();

declare global {
    interface Window {
        /** BG C18 capture harness — set true once the settled frame is ready to snapshot. */
        __captureReady?: boolean;
    }
}

const app = createApp(App_).use(router);

// Surface route-component failures in the console with the
// Vue lifecycle `info` string instead of silently white-screening the shell. The
// per-Aurora `onInitError` contract stays the localized handler; this is the shell-wide
// backstop.
app.config.errorHandler = (err, _instance, info) => {
    console.error("[demo] app error", info, err);
};

// ── BG C18 — the deterministic capture harness boot ────────────────────────────
//
// `?capture=<route>&mode=<light|dark>` boots the demo in a snapshot-friendly
// SETTLED-FRAME mode (real-paint-protocol §6): the entrance animations +
// compositing promotions are neutralized (the `html[data-capture]` capture
// stylesheet) so an OFF-SCREEN WKWebView snapshot captures the FULL route content
// into the base layer, an in-pixel engine badge is
// painted as the SOLE provenance source, and readiness is signalled via
// `window.__captureReady` + `<html data-capture-ready>` so the harness polls
// instead of guessing a fixed sleep. WebKit RENDERS correctly — this is a HARNESS
// path, ZERO src/component logic touched.
//
// The non-capture (normal demo) path is BYTE-UNTOUCHED — the capture branch is
// reached ONLY when the `capture` param is present.

// The GL warm-up before the readiness flag — enough frames for the aurora field
// to reach a stable composite. The harness polls `data-capture-ready`, so a
// longer warm-up just delays the flag; it never races the snapshot.
const GL_WARMUP_MS = 3500;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
// A paint settle that NEVER hangs. An OFF-SCREEN WKWebView (no attached window)
// throttles/suspends `requestAnimationFrame`, so a bare double-rAF would stall the
// boot forever and the `data-capture-ready` signal would never land. Race the rAF
// against a `setTimeout` fallback (setTimeout fires off-screen) so the settle
// resolves within the cap even when rAF is suspended.
const nextPaint = () =>
    new Promise<void>((resolve) => {
        let done = false;
        const finish = () => {
            if (!done) {
                done = true;
                resolve();
            }
        };
        requestAnimationFrame(() => requestAnimationFrame(finish));
        setTimeout(finish, 250);
    });

const captureParams = new URLSearchParams(window.location.search);
const captureRoute = captureParams.get("capture");

if (captureRoute) {
    void bootCaptureMode(app, captureRoute, captureParams);
} else {
    // Await the router; beforeResolve eagerly resolves
    // the first navigation's lazy chunk) BEFORE mount, so the first paint is the resolved
    // page, never an empty <RouterView> + the "Pick a story" flash.
    void router.isReady().then(() => app.mount("#app"));
}

/**
 * Boot the demo into the C18 settled-frame capture mode. The order is
 * load-bearing: the color scheme + `data-capture` flag are set BEFORE mount, so
 * animation recipes never play; the keyed component mounts at its settled frame.
 */
async function bootCaptureMode(
    appInstance: App,
    route: string,
    params: URLSearchParams,
): Promise<void> {
    const mode = params.get("mode") === "dark" ? "dark" : "light";
    const el = document.documentElement;

    // 1 · Set the color scheme + the capture flag BEFORE mount. `data-capture`
    //     activates the capture stylesheet from frame 0, so the entrance
    //     animations (and their layer-promoting transforms) never bind.
    try {
        localStorage.setItem("vueuse-color-scheme", mode);
    } catch {
        // localStorage may be unavailable (private mode, file URL) — the class +
        // colorScheme below are the binding signals; the seed is best-effort.
    }
    el.classList.toggle("dark", mode === "dark");
    el.style.colorScheme = mode;
    el.setAttribute("data-capture", "");
    el.setAttribute("data-capture-mode", mode);

    // 2 · Load the capture stylesheet (dynamic — never in the normal bundle; inert
    //     outside the `html[data-capture]` scope regardless).
    await import("./capture/capture.css");

    // 3 · Resolve the initial navigation, mount, then navigate to the capture
    //     target. Mounting after `isReady()` + pushing the target is the robust
    //     order (the `/` redirect resolves first, then we land the real route).
    //     Forward any EXTRA capture params (everything except `capture`/`mode`) onto
    //     the pushed route as query — history-mode push drops the OUTER search string,
    //     so a story cannot read window.location.search; it reads useRoute().query.
    //     The `&aurmedium=…` deterministic medium override flows
    //     through here; general, so a future per-story capture param needs no edit.)
    const extra = new URLSearchParams();
    for (const [k, v] of params) {
        if (k !== "capture" && k !== "mode") extra.set(k, v);
    }
    const extraStr = extra.toString();
    const target = extraStr
        ? `${route}${route.includes("?") ? "&" : "?"}${extraStr}`
        : route;
    await router.isReady();
    appInstance.mount("#app");
    if (router.currentRoute.value.fullPath !== target) {
        await router.push(target).catch((e) => {
            console.error("[capture] route push failed", target, e);
        });
    }

    // 4 · Let the route component + the GL field settle, paint the badge, signal
    //     ready. The page OWNS the warm-up; the harness polls `data-capture-ready`.
    await nextTick();
    await nextPaint();
    // GL warm-up — give the aurora/WebGL field several frames to paint a stable
    // image (the substrate's rAF loop keeps running; `animation: none` does not
    // touch the WebGL canvas, only CSS animation).
    await wait(GL_WARMUP_MS);
    await nextPaint();

    const { mountEngineBadge } = await import("./capture/engine-badge");
    const info = mountEngineBadge(mode);
    console.info(
        `[capture] ready · route=${route} mode=${mode} engine=${info.engine} gpu=${info.glRenderer}`,
    );

    await nextPaint();
    window.__captureReady = true;
    el.setAttribute("data-capture-ready", "");
}
