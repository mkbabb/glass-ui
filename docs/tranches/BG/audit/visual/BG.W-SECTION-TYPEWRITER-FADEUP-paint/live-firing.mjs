import { chromium } from "playwright";

const browser = await chromium.connectOverCDP("http://localhost:9478");
const ctx = browser.contexts()[0] ?? (await browser.newContext());

// Catch gl-char-rise (heading, time-driven) + gl-cascade-build (body,
// ViewTimeline) firing CONGRUENTLY. On fresh mount the above-fold headings are
// revealed by the mount re-sweep → gl-char-rise fires ~360ms; the body children
// in the entry band drive their view() timeline at the same beat. Sample
// getAnimations() in a tight loop over the first ~600ms.
async function firingProbe(route, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript((m) => {
        try {
            localStorage.setItem("vueuse-color-scheme", m);
        } catch {}
    }, mode);
    // Instrument BEFORE the app mounts: start sampling getAnimations() ASAP.
    await page.goto(`http://localhost:5200${route}`, {
        waitUntil: "commit",
    });
    const res = await page.evaluate(async () => {
        const samples = [];
        let maxCharRise = 0;
        let maxCascadeVT = 0;
        let congruentBeats = 0;
        const t0 = performance.now();
        // Sample for up to 1500ms or until we see a congruent beat.
        while (performance.now() - t0 < 1500) {
            const anims = document.getAnimations();
            let cr = 0,
                cvt = 0,
                cvAny = 0;
            for (const a of anims) {
                if (a.animationName === "gl-char-rise" && a.playState === "running")
                    cr++;
                if (a.animationName === "gl-cascade-build") {
                    cvAny++;
                    if (a.timeline && a.timeline.constructor.name === "ViewTimeline")
                        cvt++;
                }
            }
            maxCharRise = Math.max(maxCharRise, cr);
            maxCascadeVT = Math.max(maxCascadeVT, cvt);
            if (cr > 0 && cvt > 0) congruentBeats++;
            samples.push({ t: Math.round(performance.now() - t0), cr, cvt, cvAny });
            await new Promise((r) => requestAnimationFrame(r));
        }
        return {
            maxCharRiseRunning: maxCharRise,
            maxCascadeBuildOnViewTimeline: maxCascadeVT,
            congruentBeats,
            firstCongruent:
                samples.find((s) => s.cr > 0 && s.cvt > 0) ?? null,
            samplesWithCharRise: samples.filter((s) => s.cr > 0).length,
            totalSamples: samples.length,
        };
    });
    await page.close();
    return res;
}

for (const [route, mode] of [
    ["/containers/accordion", "light"],
    ["/containers/accordion", "dark"],
    ["/containers/dialog", "light"],
]) {
    const r = await firingProbe(route, mode);
    console.log(`\n### ${route} [${mode}]`);
    console.log(JSON.stringify(r, null, 2));
}

await browser.close();
