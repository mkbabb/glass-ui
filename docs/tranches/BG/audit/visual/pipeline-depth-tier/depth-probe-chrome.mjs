// BG.W-GLASS-DEPTH-TIER — non-authoring Chrome paint judge.
// For each route × mode: navigate ?capture, wait data-capture-ready, screenshot 2880×1800,
// and run the depth-tier computed-DOM probe (reads the REAL engine's resolution of the REAL
// stylesheet — the painted truth for a token-resolution wave) + route-level context checks.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/pipeline-depth-tier";
const ROUTES = [
    ["/display/buttons", "buttons"],
    ["/containers/popover", "popover"],
    ["/containers/dropdown-menu", "dropdown"],
];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };
const CDP = process.env.CDP_URL || "http://localhost:9477";

// The probe runs IN-PAGE. It reads the live cascade the shipped stylesheet produces.
function pageProbe() {
    const px = (s) => {
        const m = /([-\d.]+)px/.exec(s || "");
        return m ? parseFloat(m[1]) : null;
    };
    const blurPx = (bf) => {
        const m = /blur\(([-\d.]+)px\)/.exec(bf || "");
        return m ? parseFloat(m[1]) : null;
    };
    const satVal = (bf) => {
        const m = /saturate\(([-\d.]+)\)/.exec(bf || "");
        return m ? parseFloat(m[1]) : null;
    };
    // Mount a synthetic probe element carrying the given classes; read resolved props.
    function probe(classes, extraStyle) {
        const el = document.createElement("div");
        el.className = classes;
        if (extraStyle) el.setAttribute("style", extraStyle);
        el.style.position = "fixed";
        el.style.left = "-9999px";
        el.style.width = "120px";
        el.style.height = "80px";
        document.body.appendChild(el);
        const cs = getComputedStyle(el);
        const out = {
            classes,
            glassDepth: cs.getPropertyValue("--glass-depth").trim(),
            glassBlurFloating: cs.getPropertyValue("--glass-blur-floating").trim(),
            backdropFilter: (cs.backdropFilter || cs.webkitBackdropFilter || "").trim(),
        };
        out.blurPx = blurPx(out.backdropFilter);
        out.satVal = satVal(out.backdropFilter);
        el.remove();
        return out;
    }

    // ── Grade tokens on :root ──────────────────────────────────────────────
    const root = getComputedStyle(document.documentElement);
    const grades = {
        content: parseFloat(root.getPropertyValue("--glass-depth-content")),
        popover: parseFloat(root.getPropertyValue("--glass-depth-popover")),
        menu: parseFloat(root.getPropertyValue("--glass-depth-menu")),
    };

    // ── Tier map: bare tier classes resolve their grade scalar ─────────────
    const tierScalar = {
        overlay: probe("glass-overlay"),
        floating: probe("glass-floating"),
        card: probe("glass-card"),
        quiet: probe("glass-quiet"),
        wash: probe("glass-wash"),
        resting: probe("glass-resting"),
    };

    // ── Deep LERP monotonicity: a deep floating surface with each grade forced ──
    //   .glass-deep re-points --glass-blur-floating→var(--glass-blur-deep) which LERPs
    //   blur+saturate on --glass-depth. Force each grade, read resolved backdrop-filter blur.
    const deepAtGrade = {
        content: probe("glass-floating glass-deep", "--glass-depth: 0.35"),
        popover: probe("glass-floating glass-deep", "--glass-depth: 0.7"),
        menu: probe("glass-floating glass-deep", "--glass-depth: 1"),
        floor0: probe("glass-floating glass-deep", "--glass-depth: 0"),
    };

    // ── Real deep tier compositions (as CardTier/menu compose them) ────────
    const deepReal = {
        // content/button deep: glass-wash + glass-deep (btn) → content grade 0.35 → ~14px
        contentDeep: probe("glass-wash btn-glass glass-deep"),
        // popover/Card deep: glass-floating + glass-deep → popover grade 0.7 → ~15px
        popoverDeep: probe("glass-floating glass-deep"),
        // menu/modal deep: glass-overlay + glass-floating + glass-deep → the overlay grade
        //   (source-order: overlay rule then floating rule both set --glass-depth via :where)
        overlayDeep: probe("glass-overlay glass-floating glass-deep"),
        overlayOnlyDeep: probe("glass-overlay glass-deep"),
    };

    // ── FENCE 1: calm content default BYTE-UNCHANGED — non-deep tiers keep calm blur ──
    const calmFence = {
        floatingPlain: probe("glass-floating"), // non-deep → calm 13px
        overlayPlain: probe("glass-overlay"), // non-deep → calm overlay blur
        cardPlain: probe("glass-card"),
        washPlain: probe("glass-wash"),
    };

    // ── FENCE 2: btn-glass deep at content grade ───────────────────────────
    const btnDeep = probe("btn-glass glass-wash glass-deep");

    // ── Route-level context ────────────────────────────────────────────────
    const main = document.querySelector("main");
    const glCanvases = Array.from(document.querySelectorAll("canvas")).filter((c) => {
        try {
            return !!(c.getContext("webgl2") || c.getContext("webgl") || c.getContext("webgpu"));
        } catch {
            return false;
        }
    });
    // one-deep-refractive-per-route budget: count live .glass-deep / .glass-lens / .glass-refract
    const deepSurfaces = document.querySelectorAll(".glass-deep").length;
    const lensSurfaces = document.querySelectorAll(".glass-lens, .glass-refract").length;

    // Enumerate the actual glass surfaces present in the route DOM + their resolved depth.
    const liveGlass = [];
    for (const sel of [".glass-floating", ".glass-overlay", ".glass-card", ".glass-quiet", ".glass-wash", ".glass-resting", ".btn-glass", ".glass-deep"]) {
        const els = document.querySelectorAll(sel);
        if (els.length) {
            const first = els[0];
            const cs = getComputedStyle(first);
            liveGlass.push({
                sel,
                count: els.length,
                depth: cs.getPropertyValue("--glass-depth").trim(),
                blurPx: blurPx((cs.backdropFilter || cs.webkitBackdropFilter || "").trim()),
            });
        }
    }

    let glRenderer = "n/a";
    try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2") || c.getContext("webgl");
        if (gl) {
            const dbg = gl.getExtension("WEBGL_debug_renderer_info");
            glRenderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
        }
    } catch (e) {
        glRenderer = "err";
    }

    return {
        grades,
        tierScalar,
        deepAtGrade,
        deepReal,
        calmFence,
        btnDeep,
        route: {
            mainChildren: main ? main.children.length : null,
            glContextCount: glCanvases.length,
            deepSurfaces,
            lensSurfaces,
            liveGlass,
        },
        glRenderer,
    };
}

const browser = await chromium.connectOverCDP(CDP);
const results = {};
for (const mode of MODES) {
    for (const [route, slug] of ROUTES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const out = `${OUT}/depth-tier-chrome-${slug}-${mode}.png`;
        await page.goto(url, { waitUntil: "load", timeout: 30000 });
        let ready = false;
        try {
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            ready = true;
        } catch (e) {
            ready = false;
        }
        await page.waitForTimeout(1200);
        const probe = await page.evaluate(pageProbe);
        await page.screenshot({ path: out, fullPage: false });
        results[`${slug}-${mode}`] = { route, mode, out, ready, probe };
        console.error(`captured ${slug}-${mode} ready=${ready} gl=${probe.glRenderer}`);
        await ctx.close();
    }
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
