// scripts/lighthouse/protocol.mjs — the COMMITTED production-preview protocol
// (BB.W-LIGHTHOUSE). The re-runnable harness the `proof:lighthouse` gate drives:
//
//   1. build the demo SPA via the committed preview-build.config.mts
//   2. bring up `vite preview` on a FREE high port, gzip-on-the-wire confirmed,
//      SPA history-fallback verified
//   3. run Lighthouse over the four audited surfaces × two form-factors
//      (desktop no-throttle + LH-default mobile — the floor's bite)
//   4. return the per-surface score matrix + the load-lever diagnostics
//
// GPU / WebGL2 decision: Lighthouse runs headless Chrome, which under the
// default `--disable-gpu` has NO WebGL2 — `useWebGLCanvas` throws "WebGL2
// unavailable", which `best-practices` counts as an `errors-in-console` defect
// on the aurora/blob substrate pages (the AY-era BP-96 measurement artefact).
// The protocol runs GPU-backed via `--enable-unsafe-swiftshader` (a software
// GL2 rasteriser so the substrate pages paint + BP reads its real value). If
// that flag is unavailable / flaky on a runner, the protocol records the
// single WebGL2-console-error class as EXEMPT (the AY note's fallback) rather
// than looping on the headless config — the gate's POINT is perf/CLS/TBT, not
// BP on the WebGL pages.
//
// Lighthouse + chrome-launcher are NOT repo deps (confirmed ABSENT at HEAD);
// the protocol invokes `npx lighthouse` (download-on-demand, the Playwright-
// workspace pattern). A runner with no Chrome / no network skips-by-policy
// (the runner gate owns that decision — this module exposes `lighthouseAvailable`).

import { execFileSync, spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { createServer } from "node:net";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../../", import.meta.url)));
const PREVIEW_CONFIG = resolve(ROOT, "scripts/lighthouse/preview-build.config.mts");
const CONSUMER_CONFIG = resolve(ROOT, "scripts/lighthouse/consumer-app/vite.config.mts");
const DEMO_DIST = resolve(ROOT, ".cache/lighthouse/demo-dist");
const CONSUMER_DIST = resolve(ROOT, ".cache/lighthouse/consumer-dist");
const REPORTS_DIR = resolve(ROOT, ".cache/lighthouse/reports");

// ── The preview port ────────────────────────────────────────────────────────
// A DISTINCT high port — NOT :5173 / :5175 / :5199 / :5273 / :4178 / :4188 (the
// :5199 live-demo default is the gate-manifest-sound clause-4 reserved port, and
// the others are house live-gate ports). Resolved the GLASS_UI_*_URL ?? form so
// CI / a dev box can override. The host string IS the full preview origin.
export const PREVIEW_PORT = Number(process.env.GLASS_UI_LIGHTHOUSE_PORT ?? 5388);
export const PREVIEW_URL =
    process.env.GLASS_UI_LIGHTHOUSE_URL ?? `http://localhost:${PREVIEW_PORT}`;
// The consumer harness serves on a SECOND distinct port (so the demo preview +
// the consumer preview never collide if a run interleaves them).
export const CONSUMER_PORT = Number(process.env.GLASS_UI_LIGHTHOUSE_CONSUMER_PORT ?? 5389);

// ── The four audited surfaces (re-confirmed at HEAD against demo/router.ts —
// `/:category/:story`, `/` redirects to the first story) ─────────────────────
export const SURFACES = [
    { id: "home", route: "/foundations/intro", note: "front-door aurora HERO" },
    { id: "aurora", route: "/substrates/aurora", note: "heaviest WebGL substrate + config dock" },
    { id: "forms-inputs", route: "/forms/inputs", note: "clean primitives — shared-shell-cost canary" },
    { id: "dock-overview", route: "/dock/overview", note: "GlassDock walkthrough" },
    // BC surfaces (enrolled at BC.W-LIGHTHOUSE — a BC-painted surface omitted
    // from the score floor is a gap). The static display route is a strong
    // perf-floor candidate; the live-WGSL viz is a DISTINCT floor class (move 5
    // — Lighthouse measures its LOAD-window, not the 60fps steady-state, so it
    // scores lower than a static page AT THE SAME real-device smoothness; its
    // floor is pinned at the achieved live number via --rebaseline, NEVER forced
    // to the static `home` perfMin).
    { id: "display-buttons", route: "/display/buttons", note: "BC calm-CTA glass-button display surface (W-BUTTON-GLASS)" },
    { id: "dot-flow-field", route: "/substrates/dot-flow-field", note: "BC WebGPU-first curl-noise flow viz — the viz load-score class (move 5)", viz: true },
];

// ── The two form factors ──────────────────────────────────────────────────────
// Desktop: --preset=desktop (no throttle, 1350×940). Mobile: LH default
// (Moto-G-class 4× CPU + simulated slow-4G, 412×823) — THE floor's bite.
export const FORM_FACTORS = ["desktop", "mobile"];

/** Whether `npx lighthouse` can run here (a chrome binary + lighthouse reachable). */
export function lighthouseAvailable() {
    if (process.env.GLASS_UI_LIGHTHOUSE_SKIP === "1") return false;
    try {
        // `npx --no-install` so we never trigger a multi-minute download inside the
        // probe; the gate's runner decides whether to allow an install via env.
        const allowInstall = process.env.GLASS_UI_LIGHTHOUSE_INSTALL === "1";
        const args = allowInstall
            ? ["lighthouse", "--version"]
            : ["--no-install", "lighthouse", "--version"];
        execFileSync("npx", args, { cwd: ROOT, stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
}

/** Build the production demo SPA via the committed preview-build config. */
export function buildDemoSpa() {
    rmSync(DEMO_DIST, { recursive: true, force: true });
    execFileSync(
        "npx",
        ["vite", "build", "--config", PREVIEW_CONFIG],
        { cwd: ROOT, stdio: "inherit" },
    );
    if (!existsSync(resolve(DEMO_DIST, "index.html"))) {
        throw new Error(
            `demo SPA build produced no index.html at ${DEMO_DIST} — the preview-build config did not emit the SPA`,
        );
    }
    return DEMO_DIST;
}

/**
 * Build the minimal bare-consumer harness from the BUILT `dist/` (W4). Imports
 * the published `@mkbabb/glass-ui` bundle + `/styles` monolith as a real
 * consumer does — the published-artefact first-paint proof.
 */
export function buildConsumerApp() {
    if (!existsSync(resolve(ROOT, "dist/glass-ui.js")))
        throw new Error(
            "dist/ not built — the consumer harness imports the published bundle; run `npm run build` first",
        );
    rmSync(CONSUMER_DIST, { recursive: true, force: true });
    execFileSync(
        "npx",
        ["vite", "build", "--config", CONSUMER_CONFIG],
        { cwd: ROOT, stdio: "inherit" },
    );
    if (!existsSync(resolve(CONSUMER_DIST, "index.html")))
        throw new Error(
            `consumer harness build produced no index.html at ${CONSUMER_DIST}`,
        );
    return CONSUMER_DIST;
}

/** True if `port` is free to bind on localhost. */
function portFree(port) {
    return new Promise((res) => {
        const srv = createServer();
        srv.once("error", () => res(false));
        srv.once("listening", () => srv.close(() => res(true)));
        srv.listen(port, "127.0.0.1");
    });
}

/**
 * Bring up `vite preview` over a built SPA. Returns a handle with
 * `{ url, close() }`. gzip-on-the-wire + SPA history-fallback are asserted by
 * the caller (assertWireContract). `config` defaults to the demo SPA build
 * config; pass the consumer config + CONSUMER_PORT for the W4 harness.
 */
export async function startPreview({ port = PREVIEW_PORT, config = PREVIEW_CONFIG } = {}) {
    if (!(await portFree(port))) {
        throw new Error(
            `preview port ${port} is already bound — set GLASS_UI_LIGHTHOUSE_PORT to a free port`,
        );
    }
    // `vite preview` honours the build config's outDir; pass the same config so
    // it serves the production SPA build (with gzip + SPA fallback by default).
    const child = spawn(
        "npx",
        [
            "vite",
            "preview",
            "--config",
            config,
            "--port",
            String(port),
            "--strictPort",
        ],
        { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] },
    );
    const url = `http://localhost:${port}`;
    // Wait for the server to answer a 200 on the root (the SPA shell).
    await waitForServer(url, 20_000);
    return {
        url,
        close() {
            try {
                child.kill("SIGTERM");
            } catch {
                /* already gone */
            }
        },
    };
}

async function waitForServer(url, timeoutMs) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        try {
            const res = await fetch(url, { redirect: "follow" });
            if (res.ok || res.status === 200) return;
        } catch {
            /* not up yet */
        }
        await new Promise((r) => setTimeout(r, 250));
    }
    throw new Error(`preview server did not answer 200 at ${url} within ${timeoutMs}ms`);
}

/**
 * Assert the wire contract: gzip-on-the-wire (Content-Encoding) so transfer
 * sizes are production-representative, AND SPA history-fallback (a deep route →
 * 200, not 404). Returns the observed facts (recorded in the gate artefact).
 */
export async function assertWireContract(url) {
    // gzip: request the main JS/CSS asset path the SPA shell references. Easiest
    // representative is the index.html itself with Accept-Encoding: gzip.
    const rootRes = await fetch(url, {
        headers: { "Accept-Encoding": "gzip, br" },
    });
    const rootEncoding = rootRes.headers.get("content-encoding");
    // SPA history-fallback: a deep client route must serve the SPA shell (200),
    // never a 404 — vite preview's `--single`/historyApiFallback default.
    const deepRes = await fetch(`${url}/forms/inputs`, { redirect: "follow" });
    const fallbackOk = deepRes.status === 200;
    // gzip is asserted on a hashed asset (vite serves assets gzip-compressible).
    // index.html itself may be small enough that vite serves it uncompressed —
    // probe an asset reference instead for the binding gzip fact.
    const html = await rootRes.clone().text();
    const assetMatch = html.match(/\/assets\/[\w-]+\.(?:js|css)/);
    let assetEncoding = null;
    if (assetMatch) {
        const assetRes = await fetch(`${url}${assetMatch[0]}`, {
            headers: { "Accept-Encoding": "gzip, br" },
        });
        assetEncoding = assetRes.headers.get("content-encoding");
    }
    return {
        rootEncoding,
        assetEncoding,
        gzipOnWire:
            assetEncoding === "gzip" ||
            assetEncoding === "br" ||
            rootEncoding === "gzip" ||
            rootEncoding === "br",
        spaHistoryFallback: fallbackOk,
        probedAsset: assetMatch ? assetMatch[0] : null,
    };
}

/**
 * Run Lighthouse over ONE surface × ONE form-factor against the live preview.
 * Returns the parsed report JSON. GPU-backed via SwiftShader; the one
 * WebGL2-console-error class is exempted by the diagnostics arm, not here.
 */
export function runLighthouse({ url, route, formFactor, outPath }) {
    mkdirSync(REPORTS_DIR, { recursive: true });
    const chromeFlags = [
        "--headless=new",
        // GPU-backed software GL2 so the substrate pages paint (the BP-96 fix).
        "--enable-unsafe-swiftshader",
        "--no-sandbox",
        "--disable-dev-shm-usage",
    ].join(" ");
    const args = [
        "lighthouse",
        `${url}${route}`,
        "--output=json",
        `--output-path=${outPath}`,
        "--quiet",
        "--only-categories=performance,accessibility,best-practices",
        // The heavy aurora hero + first chunk can exceed LH's default 45s paint
        // window on a headless SwiftShader runner (the .1 NO_FCP observation). A
        // generous load ceiling gives the substrate pages room to reach FCP; the
        // orchestrator's headed live run does not need it but it is harmless there.
        "--max-wait-for-load=60000",
        `--chrome-flags=${chromeFlags}`,
    ];
    if (formFactor === "desktop") {
        args.push("--preset=desktop");
    }
    // mobile is the LH default (Moto-G 4× CPU + slow-4G) — no extra flag.
    //
    // spawnSync (NOT execFileSync): Lighthouse exits NON-ZERO on a non-fatal
    // runtime warning (a single audit `error` — e.g. a WebGL2 console error on a
    // substrate page) while STILL writing a complete, valid report JSON. A throw-
    // on-non-zero (execFileSync) would discard a perfectly good report. So we run
    // tolerant-of-exit-code and decide on the ARTEFACT: if the report file was
    // written + parses, use it; only a missing/unparseable report is a hard error.
    spawnSync("npx", args, { cwd: ROOT, stdio: "ignore", timeout: 180_000 });
    if (!existsSync(outPath))
        throw new Error(
            `Lighthouse produced no report at ${outPath} for ${route} (${formFactor}) — Chrome/launch failure`,
        );
    return JSON.parse(readFileSync(outPath, "utf8"));
}

/**
 * Reduce a parsed LH report to the score row the floor gates: the four scores
 * (perf/a11y/bp) + the three web vitals (LCP/CLS/TBT) + the load-lever
 * diagnostics (render-block ms, unused value.js KiB). All numbers; the gate
 * compares against the committed floor.
 */
export function extractScoreRow(report) {
    const cat = report.categories ?? {};
    const audits = report.audits ?? {};
    const pct = (s) => (s == null ? null : Math.round(s * 100));
    const num = (id) => audits[id]?.numericValue ?? null;

    // render-blocking-insight: the wasted ms on the demo's CSS (metricSavings.LCP
    // is the projected save; details.items[].wastedMs is the per-resource cost).
    const rb = audits["render-blocking-insight"];
    const rbItems = rb?.details?.items ?? [];
    const renderBlockMs = rbItems.reduce(
        (max, it) => Math.max(max, it.wastedMs ?? 0),
        0,
    );

    // unused-javascript: find value.js's wasted bytes by URL (the eager color
    // engine on substrate-free routes — the W-PAYLOAD-DEFER lever).
    const uj = audits["unused-javascript"];
    const ujItems = uj?.details?.items ?? [];
    const valueJsItem = ujItems.find((it) => /value(\.js)?[-.]/.test(it.url ?? ""));
    const unusedValueJsKiB = valueJsItem
        ? Math.round((valueJsItem.wastedBytes ?? 0) / 1024)
        : 0;

    // A gather/runtime error (a CHROME_INTERSTITIAL, a failed navigation) yields a
    // report with `runtimeError` set + null category scores. Surface it so the gate
    // names the gather failure (the GPU/throttle-honesty axis) rather than reporting
    // a confusing "perf null < floor" — the null scores still RED (fail-closed), but
    // the orchestrator gets the real cause. This is the protocol's GPU-backed/exempt
    // decision point (the AY BP-96 note): a substrate-page WebGL2 error is the one
    // class the protocol exempts; a true navigation failure is a real RED.
    const runtimeError = report.runtimeError
        ? `${report.runtimeError.code}: ${report.runtimeError.message}`
        : null;

    return {
        perf: pct(cat.performance?.score),
        a11y: pct(cat.accessibility?.score),
        bp: pct(cat["best-practices"]?.score),
        lcpMs: num("largest-contentful-paint"),
        fcpMs: num("first-contentful-paint"),
        cls: num("cumulative-layout-shift"),
        tbtMs: num("total-blocking-time"),
        renderBlockMs,
        unusedValueJsKiB,
        runtimeError,
    };
}

export {
    ROOT,
    DEMO_DIST,
    CONSUMER_DIST,
    REPORTS_DIR,
    PREVIEW_CONFIG,
    CONSUMER_CONFIG,
};
