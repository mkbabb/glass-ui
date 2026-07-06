// Blur-engage correctness verifier (BG.W-BACKDROP-BLUR-ENGAGE · BE1/BE2/BE3).
// LIVE demo (NO ?capture= — capture mode kills transitions/animations).
// Opens the drawer, then drives BOTH gesture scalars (--glass-drawer-t on the sheet,
// --stage-t on :root) across a series and reads the sheet's computed backdrop-filter
// blur radius. Proves the blur radius is a PURE FUNCTION of the live scalar (tracks
// the finger, not a fixed --duration-*), that no backdrop-filter transition tween
// exists, and that the closed state (t=0) reads 0 blur (NO-MASKING-FALLBACK floor).
import { chromium } from "playwright";

const CDP = process.env.CDP_URL || "http://localhost:9333";
const route = process.argv[2] || "/containers/drawer";
const mode = process.argv[3] || "light";

function blurRadiusOf(bf) {
    if (!bf || bf === "none") return 0;
    const m = bf.match(/blur\(([-\d.]+)px\)/);
    return m ? parseFloat(m[1]) : null;
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

// seed mode BEFORE load
await page.addInitScript((m) => {
    try { localStorage.setItem("vueuse-color-scheme", m); } catch {}
}, mode);
await page.goto(`http://localhost:5200${route}`, { waitUntil: "load", timeout: 30000 });
await page.evaluate((m) => {
    document.documentElement.classList.toggle("dark", m === "dark");
    document.documentElement.style.colorScheme = m;
}, mode);
await page.waitForTimeout(1200);

// Open the drawer (selector override via argv[4], else the "Open drawer" text)
const openSel = process.argv[4];
if (openSel) {
    await page.click(openSel);
} else {
    await page.getByRole("button", { name: /open drawer/i }).first().click();
}
await page.waitForTimeout(1400); // let the snap spring settle

const result = await page.evaluate(() => {
    const sheet = document.querySelector('.glass-drawer[data-glass-drawer-snap-points="true"]')
        || document.querySelector('.glass-drawer');
    if (!sheet) return { error: "no .glass-drawer sheet mounted" };
    const cs0 = getComputedStyle(sheet);
    const transitionProperty = cs0.transitionProperty;
    const transitionDuration = cs0.transitionDuration;
    const overlayRadius = cs0.getPropertyValue("--glass-blur-overlay-radius").trim();
    const knee = cs0.getPropertyValue("--glass-blur-engage-knee").trim();

    function readAt(t) {
        sheet.style.setProperty("--glass-drawer-t", String(t));
        document.documentElement.style.setProperty("--stage-t", String(t));
        // force style recalc
        void sheet.offsetWidth;
        const cs = getComputedStyle(sheet);
        return {
            t,
            engageT: cs.getPropertyValue("--glass-blur-engage-t").trim(),
            sheetFreeze: cs.getPropertyValue("--sheet-freeze").trim(),
            backdropFilter: (cs.backdropFilter || cs.webkitBackdropFilter),
        };
    }
    // rise + hold + solidify-decay sweep across the whole drag fraction
    const series = [0, 0.0875, 0.175, 0.2625, 0.35, 0.5, 0.7, 0.85, 0.925, 0.97, 1.0]
        .map(readAt);
    // restore to a mid-open detent
    sheet.style.setProperty("--glass-drawer-t", "0.5");
    document.documentElement.style.setProperty("--stage-t", "0.5");
    return { transitionProperty, transitionDuration, overlayRadius, knee, series };
});

if (result.error) { console.log(JSON.stringify({ route, mode, ...result })); process.exit(2); }

const R = parseFloat(result.overlayRadius) || 13;
const KNEE = parseFloat(result.knee) || 0.35;
function expectedBlur(t) {
    const rise = Math.min(Math.max(t / KNEE, 0), 1);
    const freeze = Math.min(Math.max((t - 0.85) / 0.15, 0), 1);
    return R * rise * (1 - freeze);
}
const rows = result.series.map((s) => {
    const actual = blurRadiusOf(s.backdropFilter);
    const exp = expectedBlur(s.t);
    const delta = actual == null ? null : Math.abs(actual - exp);
    return { t: s.t, engageT: s.engageT, freeze: s.sheetFreeze, actualBlur: actual, expBlur: +exp.toFixed(2), delta: delta == null ? null : +delta.toFixed(2) };
});
const tweenViolation = /backdrop-filter/.test(result.transitionProperty) &&
    !/0s/.test(result.transitionDuration) && result.transitionDuration !== "0s";
const maxDelta = Math.max(...rows.filter((r) => r.delta != null).map((r) => r.delta));
const closedBlur = rows.find((r) => r.t === 0).actualBlur;
const risesWithScalar = rows.find((r) => r.t === 0.175).actualBlur > rows.find((r) => r.t === 0).actualBlur + 2
    && rows.find((r) => r.t === 0.35).actualBlur > rows.find((r) => r.t === 0.175).actualBlur + 2;
const solidifies = rows.find((r) => r.t === 1.0).actualBlur < rows.find((r) => r.t === 0.85).actualBlur - 2;

console.log(JSON.stringify({
    route, mode,
    overlayRadius: R, knee: KNEE,
    transitionProperty: result.transitionProperty.slice(0, 80),
    transitionDuration: result.transitionDuration.slice(0, 60),
    tweenViolation, maxDelta, closedBlur, risesWithScalar, solidifies,
    rows,
}, null, 2));
await page.close();
await browser.close();
