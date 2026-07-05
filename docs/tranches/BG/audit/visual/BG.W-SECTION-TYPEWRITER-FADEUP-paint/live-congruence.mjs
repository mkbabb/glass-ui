import { chromium } from "playwright";

const browser = await chromium.connectOverCDP("http://localhost:9478");
const ctx = browser.contexts()[0] ?? (await browser.newContext());

async function probe(route, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    // LIVE (non-capture) — animations are NOT neutralized.
    await page.goto(`http://localhost:5200${route}`, {
        waitUntil: "networkidle",
    });
    // Seed theme + reload so the mode is applied on the live (non-capture) page.
    await page.evaluate((m) => {
        try {
            localStorage.setItem("vueuse-color-scheme", m);
        } catch {}
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
    await page.waitForTimeout(400);

    const result = await page.evaluate(async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const scroller = document.querySelector("main.demo-main-scroller");
        const out = { route: location.pathname, hasScroller: !!scroller };

        // --- T3/T4: provider wired + page singleton ---
        // main.children.length — the routed <article> single root under <main>.
        out.mainChildren = scroller ? scroller.children.length : -1;

        // Count StorySection headings + their armed/revealed state.
        const headings = [
            ...document.querySelectorAll(".story-section__heading"),
        ];
        out.headingCount = headings.length;
        out.armedCount = headings.filter((h) =>
            h.hasAttribute("data-reveal-armed"),
        ).length;

        // Bodies (.scroll-cascade) — the disjoint view() register.
        const bodies = [...document.querySelectorAll(".story-section__body")];
        out.bodyCount = bodies.length;

        // Scroll to TOP, then walk down revealing sections; sample congruence.
        if (scroller) scroller.scrollTop = 0;
        await sleep(250);

        // After the mount re-sweep + IO, above-fold headings should be revealed.
        out.revealedAfterTop = headings.filter((h) =>
            h.hasAttribute("data-revealed"),
        ).length;

        // --- Structural wiring (rule applies regardless of live-firing timing) ---
        // A revealed heading's glyph resolves gl-char-rise; stagger step = 30ms.
        const firstRevealed = headings.find((h) =>
            h.hasAttribute("data-revealed"),
        );
        if (firstRevealed) {
            const chars = [...firstRevealed.querySelectorAll(".char")];
            out.headingGlyphs = chars.length;
            if (chars.length) {
                const cs0 = getComputedStyle(chars[0]);
                out.charAnimName = cs0.animationName;
                out.charStaggerStep = getComputedStyle(
                    document.documentElement,
                ).getPropertyValue("--char-stagger-step").trim();
                // delay of glyph index 2 should ~= 2 * step
                if (chars[2]) {
                    out.charDelayIdx2 = getComputedStyle(chars[2]).animationDelay;
                }
                out.charDisplay = cs0.display;
            }
        }

        // FOUC-safe floor: an ARMED-but-not-revealed heading hides its glyphs
        // (opacity 0). Find one that's armed & not yet revealed (below fold).
        const armedNotRevealed = headings.find(
            (h) =>
                h.hasAttribute("data-reveal-armed") &&
                !h.hasAttribute("data-revealed"),
        );
        if (armedNotRevealed) {
            const c = armedNotRevealed.querySelector(".char");
            if (c) out.foucFloorOpacity = getComputedStyle(c).opacity;
        }

        // Body child structural: gl-cascade-build on a view() timeline.
        const bodyChild = bodies.map((b) => b.firstElementChild).find(Boolean);
        if (bodyChild) {
            const cs = getComputedStyle(bodyChild);
            out.bodyAnimName = cs.animationName;
            out.bodyAnimTimeline = cs.animationTimeline;
            out.bodyAnimRange = cs.animationRange || "(n/a)";
        }

        // --- LIVE CONGRUENCE: scroll a fresh below-fold heading into view and
        // sample getAnimations() to catch gl-char-rise (heading, time-driven) and
        // gl-cascade-build (body, ViewTimeline) firing at the same beat. ---
        out.congruence = null;
        const target = headings.find((h) => {
            const r = h.getBoundingClientRect();
            const sr = scroller.getBoundingClientRect();
            return r.top > sr.bottom; // strictly below the fold
        });
        if (target && scroller) {
            const secRoot = target.closest("section") || target.parentElement;
            // Position so the section is just crossing into the entry band.
            secRoot.scrollIntoView({ block: "end", behavior: "instant" });
            // Sample across a short window to catch the overlap.
            let charRise = 0,
                cascadeView = 0,
                cascadeViewTL = false;
            for (let i = 0; i < 12; i++) {
                const anims = document.getAnimations();
                for (const a of anims) {
                    const nm = a.animationName || (a.effect?.getKeyframes?.() && "");
                    const name =
                        a.animationName ??
                        (a.effect && a.effect.target
                            ? getComputedStyle(a.effect.target).animationName
                            : "");
                    const tlName = a.timeline
                        ? a.timeline.constructor.name
                        : "none";
                    // gl-char-rise is a CSSAnimation → animationName present.
                    if (a.animationName === "gl-char-rise") charRise++;
                    if (a.animationName === "gl-cascade-build") {
                        cascadeView++;
                        if (tlName === "ViewTimeline") cascadeViewTL = true;
                    }
                }
                if (charRise > 0 && cascadeView > 0) break;
                await new Promise((r) => requestAnimationFrame(r));
            }
            out.congruence = {
                charRiseActive: charRise,
                cascadeBuildActive: cascadeView,
                cascadeOnViewTimeline: cascadeViewTL,
            };
        }

        // glContextCount — one-GL-per-route budget (recessive bg).
        out.glContextCount = (() => {
            let n = 0;
            for (const c of document.querySelectorAll("canvas")) {
                const ctx =
                    c.getContext("webgl2") ||
                    c.getContext("webgl") ||
                    c.getContext("webgpu");
                if (ctx) n++;
            }
            return n;
        })();

        return out;
    });

    await page.close();
    return result;
}

const probes = [
    ["/containers/accordion", "light"], // heading + body — the congruence surface
    ["/containers/accordion", "dark"],
    ["/display/section", "light"], // named route — body-only register
    ["/motion/typewriter", "light"], // named route — typewriter component
];

for (const [route, mode] of probes) {
    const r = await probe(route, mode);
    console.log(`\n### ${route} [${mode}]`);
    console.log(JSON.stringify(r, null, 2));
}

await browser.close();
