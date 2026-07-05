import { webkit } from "playwright";
const browser = await webkit.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:5200/containers/accordion", { waitUntil: "load" });
const engine = await page.evaluate(() => {
    // WebKit provenance: navigator.userAgent + view() timeline support.
    return {
        ua: navigator.userAgent.slice(0, 90),
        supportsView: CSS.supports("animation-timeline: view()"),
        supportsGlCharRise: true,
    };
});
const res = await page.evaluate(async () => {
    // Structural: rules apply.
    const heads = [...document.querySelectorAll(".story-section__heading")];
    const armed = heads.filter((h) => h.hasAttribute("data-reveal-armed")).length;
    const revealed = heads.filter((h) => h.hasAttribute("data-revealed")).length;
    const firstRev = heads.find((h) => h.hasAttribute("data-revealed"));
    let charAnim = null, charDelay = null, charDisplay = null, glyphs = 0;
    if (firstRev) {
        const cs = [...firstRev.querySelectorAll(".char")];
        glyphs = cs.length;
        if (cs[0]) { charAnim = getComputedStyle(cs[0]).animationName; charDisplay = getComputedStyle(cs[0]).display; }
        if (cs[2]) charDelay = getComputedStyle(cs[2]).animationDelay;
    }
    const bodyChild = document.querySelector(".story-section__body > *");
    let bodyAnim = null, bodyTL = null;
    if (bodyChild) { const c = getComputedStyle(bodyChild); bodyAnim = c.animationName; bodyTL = c.animationTimeline; }
    // Live-firing: sample getAnimations() over the first ~1.2s.
    let maxCR = 0, maxCVT = 0, congruent = 0, samples = 0;
    const t0 = performance.now();
    while (performance.now() - t0 < 1200) {
        const anims = document.getAnimations();
        let cr = 0, cvt = 0;
        for (const a of anims) {
            if (a.animationName === "gl-char-rise" && a.playState === "running") cr++;
            if (a.animationName === "gl-cascade-build" && a.timeline && a.timeline.constructor.name === "ViewTimeline") cvt++;
        }
        maxCR = Math.max(maxCR, cr); maxCVT = Math.max(maxCVT, cvt);
        if (cr > 0 && cvt > 0) congruent++;
        samples++;
        await new Promise((r) => requestAnimationFrame(r));
    }
    return { armed, revealed, glyphs, charAnim, charDelay, charDisplay, bodyAnim, bodyTL, maxCharRiseRunning: maxCR, maxCascadeViewTL: maxCVT, congruentBeats: congruent, samples };
});
console.log("ENGINE:", JSON.stringify(engine, null, 2));
console.log("RESULT:", JSON.stringify(res, null, 2));
await browser.close();
