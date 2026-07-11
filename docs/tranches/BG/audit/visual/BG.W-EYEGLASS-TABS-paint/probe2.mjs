// Probe 2 — precise proud geometry (indicator vs track vs non-eyeglass sibling),
// resting screenshot of the eyeglass section, + the full document.getAnimations() set
// right after a select (to design the WAAPI-seek driving harness).
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const ORIGIN = process.env.ORIGIN || "http://localhost:5200";
const OUT = new URL(".", import.meta.url).pathname;
const MODE = process.env.MODE || "light";

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 1200 });
await page.emulateMedia({ colorScheme: MODE });
await page.goto(`${ORIGIN}/navigation/tabs`, { waitUntil: "load", timeout: 30000 });
await page.evaluate((m) => {
    try { localStorage.setItem("vueuse-color-scheme", m); } catch {}
    document.documentElement.classList.toggle("dark", m === "dark");
    document.documentElement.style.colorScheme = m;
}, MODE);
await page.waitForTimeout(2500);

const geo = await page.evaluate(() => {
    const strips = Array.from(document.querySelectorAll(".segmented-tabs"));
    const egStrip = strips.find((s) => s.hasAttribute("data-eyeglass"));
    const plainStrip = strips.find((s) => !s.hasAttribute("data-eyeglass") && s.querySelector(".segmented-indicator--anchor"));
    function measure(s) {
        if (!s) return null;
        const ind = s.querySelector(".segmented-indicator");
        const track = s.querySelector(".glass-capsule-track") || s;
        const cs = getComputedStyle(s);
        const ir = ind.getBoundingClientRect();
        const tr = track.getBoundingClientRect();
        const sr = s.getBoundingClientRect();
        // padding of the strip → the inner content (track) block extent
        const padT = parseFloat(cs.paddingTop), padB = parseFloat(cs.paddingBottom);
        const contentH = sr.height - padT - padB;
        return {
            indH: +ir.height.toFixed(2), indW: +ir.width.toFixed(2), indTop: +ir.top.toFixed(2), indBot: +ir.bottom.toFixed(2),
            trackH: +tr.height.toFixed(2), trackTop: +tr.top.toFixed(2), trackBot: +tr.bottom.toFixed(2), trackW: +tr.width.toFixed(2),
            stripH: +sr.height.toFixed(2), padT, padB, contentH: +contentH.toFixed(2),
            trackClass: track === s ? "(strip itself)" : "glass-capsule-track",
            eyeglassProud: getComputedStyle(s).getPropertyValue("--eyeglass-proud").trim(),
            trim: getComputedStyle(s).getPropertyValue("--bouncy-track-trim").trim(),
        };
    }
    const eg = measure(egStrip), plain = measure(plainStrip);
    return {
        eg, plain,
        // proud spill: how far the eyeglass pill extends past the track top/bottom
        crownSpill: eg && eg.trackTop != null ? +(eg.trackTop - eg.indTop).toFixed(2) : null,
        baseSpill: eg && eg.trackBot != null ? +(eg.indBot - eg.trackBot).toFixed(2) : null,
        proudRatioVsTrack: eg ? +(eg.indH / eg.trackH).toFixed(3) : null,
        proudRatioVsPlainInd: (eg && plain) ? +(eg.indH / plain.indH).toFixed(3) : null,
    };
});
console.log("GEO:", JSON.stringify(geo, null, 2));

// Resting screenshot of the eyeglass section (scroll into view, crop)
await page.evaluate(() => {
    const s = Array.from(document.querySelectorAll(".segmented-tabs")).find((x) => x.hasAttribute("data-eyeglass"));
    s.scrollIntoView({ block: "center" });
});
await page.waitForTimeout(900);
const clipRect = await page.evaluate(() => {
    const s = Array.from(document.querySelectorAll(".segmented-tabs")).find((x) => x.hasAttribute("data-eyeglass"));
    const card = s.closest(".glass-card") || s.parentElement;
    const r = card.getBoundingClientRect();
    return { x: Math.max(0, r.left - 20), y: Math.max(0, r.top - 20), width: Math.min(1400, r.width + 40), height: r.height + 40 };
});
await page.screenshot({ path: `${OUT}chrome__eyeglass_rest_${MODE}.png`, clip: clipRect });
console.log("REST_SHOT:", `chrome__eyeglass_rest_${MODE}.png`, JSON.stringify(clipRect));

// Full animation set right after a select
const animSet = await page.evaluate(() => {
    const s = Array.from(document.querySelectorAll(".segmented-tabs")).find((x) => x.hasAttribute("data-eyeglass"));
    const tabs = Array.from(s.querySelectorAll(".segmented-tab"));
    const cur = tabs.findIndex((t) => t.getAttribute("aria-pressed") === "true");
    const target = 2; // Kanban (a 2-slot travel like reference T3)
    tabs[target].click();
    // Read ALL animations in the document filtered to the strip subtree
    const all = document.getAnimations().filter((a) => {
        const t = a.effect && a.effect.target;
        return t && s.contains(t);
    }).map((a) => ({
        target: a.effect.target.className,
        prop: a.transitionProperty || (a.animationName || null),
        playState: a.playState,
        duration: a.effect.getTiming().duration,
    }));
    return { from: cur, to: target, all };
});
console.log("ANIM_SET:", JSON.stringify(animSet, null, 2));

await page.close();
await browser.close().catch(() => {});
