#!/usr/bin/env node
// BG.W-ROUTE-ENTER-VISIBLE — proof:route-enter-visible, the route-entrance-VISIBLE-in-paint gate.
//
// 2.1's `gl-route-enter` beat was EATEN in paint (IOS27-MOTION-TRUTH §2.6): the
// dynamic-import stalls (~69+53ms) landed INSIDE the animation clock (the animation
// start-time is style-resolve, so the first composited frame arrived past snappy's
// half-clock) and the surviving 12px-rise tail was sub-perceptual — the new page
// arrived fully placed in ONE frame. This gate is the device-free SOURCE assert that
// the three §2.6 fixes are PRESENT so a future edit cannot silently re-eat the beat:
//
//   R1 (fix a) — the route chunk is pre-resolved BEFORE the swap on EVERY navigation.
//      `router.beforeResolve` awaits the lazy `component: () => import()` with NO
//      one-shot `firstResolved` gate (the W-NAV-DOCK-FIX first-nav-only guard is
//      SUPERSEDED — a one-shot leaves every subsequent swap stall-eaten). So the stall
//      precedes the beat, not inside its clock.
//   R2 (fix b) — the `.route-enter` rise is a PERCEPTIBLE 16–24px (was 0.75rem/12px,
//      sub-perceptual once the stall is off the beat), still on --spring-snappy +
//      `backwards` (the SPATIAL leg on the spring, the from-state held before the first
//      composited frame). The reduced-motion arm KEEPS the fade + DROPS the rise (P6).
//   R3 (fix c) — the StoryHeader eyebrow→subpath→title→blurb bands stagger 30–120ms,
//      each with a REAL translateY leg (the story-hero-cluster-rise keyframe), NOT a
//      bare opacity fade. EVERY band carrying `story-header-cluster--enter` has a
//      matching keyframe rule (the subpath chip's rule was the dead-class gap).
//
// Comments are STRIPPED before scanning (this file's own doc names 0.75rem/12px/
// firstResolved — a naive substring scan would flag the prose). + an always-on
// self-test bite: a synthetic pre-fix tree (12px rise / one-shot beforeResolve /
// missing subpath rule) MUST flag, a clean tree MUST pass.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// ── comment strip (HTML <!-- -->, CSS/JS /* */, and full-line // comments) ────
export function stripComments(src) {
    let s = src
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "");
    s = s
        .split("\n")
        .filter((line) => !line.trim().startsWith("//"))
        .join("\n");
    return s;
}

// ── px helpers — resolve a rem/px length literal to px (root = 16px) ──────────
function lengthToPx(raw) {
    const m = /([\d.]+)\s*(rem|px)/.exec(raw);
    if (!m) return null;
    const n = Number(m[1]);
    return m[2] === "rem" ? n * 16 : n;
}

// ── pure detector — exercised on real + synthetic inputs ─────────────────────
/**
 * @param {{ routerSrc: string, transitionsCssSrc: string, storyHeroCssSrc: string,
 *           storyHeaderSrc: string }} input
 * @returns {{clause: string, msg: string}[]}
 */
export function checkRouteEnterVisible({
    routerSrc,
    transitionsCssSrc,
    storyHeroCssSrc,
    storyHeaderSrc,
}) {
    const violations = [];

    // ── R1 — the chunk is pre-resolved before the swap on EVERY navigation ──
    const router = stripComments(routerSrc);
    // there must be a beforeResolve that awaits the lazy component loader …
    const hasBeforeResolve = /router\.beforeResolve\s*\(/.test(router);
    const awaitsLoader =
        /await\s+Promise\.all\s*\(\s*comps\.map/.test(router) ||
        /await\s+Promise\.all\s*\([^)]*\.map\s*\(\s*\(?c\)?\s*=>\s*c\(\)/.test(router);
    if (!hasBeforeResolve || !awaitsLoader) {
        violations.push({
            clause: "R1",
            msg: "router.beforeResolve does not await the lazy route chunk — the dynamic import lands INSIDE the .route-enter clock and eats the beat (fix a: pre-resolve the chunk before the swap)",
        });
    }
    // … and NOT gated behind a one-shot `firstResolved` (that warms only the first nav,
    // leaving every subsequent swap stall-eaten).
    if (/\bfirstResolved\b/.test(router) || /if\s*\(\s*firstResolved\s*\)/.test(router)) {
        violations.push({
            clause: "R1",
            msg: "the beforeResolve is gated behind a one-shot `firstResolved` — only the FIRST navigation is warmed; every subsequent route swap stays stall-eaten (fix a must be every-nav)",
        });
    }

    // ── R2 — the .route-enter rise is a perceptible 16–24px on the snappy spring ──
    const css = transitionsCssSrc;
    const kf = /@keyframes\s+gl-route-enter\s*\{[\s\S]*?\}\s*\}/.exec(css);
    if (!kf) {
        violations.push({
            clause: "R2",
            msg: "@keyframes gl-route-enter is missing from transitions.css — the .route-enter recipe references a non-existent animation",
        });
    } else {
        const fromM = /from\s*\{[\s\S]*?translateY\(([^)]+)\)/.exec(kf[0]);
        const px = fromM ? lengthToPx(fromM[1]) : null;
        if (px === null) {
            violations.push({
                clause: "R2",
                msg: "gl-route-enter `from` carries no translateY rise — the entrance is a bare opacity fade (fix b: a real SPATIAL rise leg)",
            });
        } else if (px < 16 || px > 24) {
            violations.push({
                clause: "R2",
                msg: `gl-route-enter rise is ${px}px — outside the perceptible 16–24px band the §2.6 fix names (12px was sub-perceptual once the stall is off the beat)`,
            });
        }
    }
    // the recipe rides --spring-snappy + `backwards` (the SPATIAL leg on the spring,
    // the from-state held before the first composited frame).
    const recipe = /\.route-enter\s*\{([^}]*)\}/.exec(css);
    const recipeBody = recipe ? recipe[1] : "";
    if (!/gl-route-enter/.test(recipeBody) || !/--spring-snappy\b/.test(recipeBody)) {
        violations.push({
            clause: "R2",
            msg: "the .route-enter recipe does not run gl-route-enter on --spring-snappy — the SPATIAL leg must ride the spring (P2/P4)",
        });
    }
    if (!/\bbackwards\b/.test(recipeBody)) {
        violations.push({
            clause: "R2",
            msg: "the .route-enter recipe drops the `backwards` fill — the from-state must hold before the first composited frame (no flash-of-final)",
        });
    }
    // the reduced-motion arm KEEPS the fade + DROPS the rise (P6).
    if (!/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)[\s\S]*?\.route-enter\s*\{[\s\S]*?gl-route-fade/.test(css)) {
        violations.push({
            clause: "R2",
            msg: "the reduced-motion arm does not re-point .route-enter onto gl-route-fade (fade-keeps/rise-drops) — the P6 vestibular floor",
        });
    }

    // ── R3 — the StoryHeader bands each carry a translateY-leg entrance rule ──
    // Every band that applies `story-header-cluster--enter` in the SFC must have a
    // matching cluster-rise rule in story-hero.css (the dead-class gap the wave closed).
    const sfc = storyHeaderSrc;
    const heroCss = storyHeroCssSrc;
    // the keyframe's `from` state carries a NON-ZERO translateY rise (a real SPATIAL
    // leg, not a bare fade — the `to { translateY(0) }` settle does not count).
    const clusterKf = /@keyframes\s+story-hero-cluster-rise\s*\{([\s\S]*?)\}\s*\}/.exec(heroCss);
    const clusterFrom = clusterKf
        ? /from\s*\{([\s\S]*?)\}/.exec(clusterKf[1])
        : null;
    // accepts a bare literal `translateY(1.5rem)` OR the var-with-fallback form
    // `translateY(var(--story-hero-rise, 1.5rem))` — the fallback distance is the rise.
    const clusterRiseM = clusterFrom
        ? /translateY\([^)]*?([\d.]+)\s*(rem|px)/.exec(clusterFrom[1])
        : null;
    if (!clusterRiseM || Number(clusterRiseM[1]) <= 0) {
        violations.push({
            clause: "R3",
            msg: "story-hero-cluster-rise `from` carries no non-zero translateY rise — the cluster entrance is a bare opacity fade (fix c: a real SPATIAL leg per band)",
        });
    }
    // the bands the SFC animates: eyebrow, subpath, blurb each apply
    // `story-header-cluster--enter`; the title rides its own .story-hero-title--enter.
    const bandClasses = [
        { name: "eyebrow", cls: "story-header-eyebrow" },
        { name: "subpath", cls: "story-header-subpath" },
        { name: "blurb", cls: "story-header-blurb" },
    ];
    for (const b of bandClasses) {
        // the SFC applies the class to this band alongside the --enter hook.
        const sfcApplies = new RegExp(`${b.cls}[\\s\\S]{0,80}?story-header-cluster--enter`).test(sfc) ||
            new RegExp(`story-header-cluster--enter[\\s\\S]{0,80}?${b.cls}`).test(sfc);
        if (!sfcApplies) continue; // band not present in the cluster — nothing owed
        // then story-hero.css MUST carry a matching cluster-rise rule for it.
        const ruleRe = new RegExp(
            `\\.${b.cls}\\.story-header-cluster--enter\\s*\\{[\\s\\S]*?story-hero-cluster-rise`,
        );
        if (!ruleRe.test(heroCss)) {
            violations.push({
                clause: "R3",
                msg: `the ${b.name} band (.${b.cls}) carries \`story-header-cluster--enter\` but story-hero.css has NO matching story-hero-cluster-rise rule — it appears STATIC while the other bands rise (dead class + broken cascade)`,
            });
        }
    }

    return violations;
}

// ── the always-on self-test bite (the detector cannot silently no-op) ────────
function selfTest() {
    const failures = [];

    const cleanRouter = `
router.beforeResolve(async (to) => {
    const comps = to.matched.map((r) => r.components?.default).filter((c) => typeof c === "function");
    await Promise.all(comps.map((c) => c().catch(() => undefined)));
    return true;
});`;
    const cleanTransitions = `
.route-enter { animation: gl-route-enter var(--spring-snappy-duration) var(--spring-snappy) backwards; }
@media (prefers-reduced-motion: reduce) {
  .route-enter { animation: gl-route-fade var(--duration-fast) var(--ease-out) backwards; }
}
@keyframes gl-route-enter { from { opacity: 0; transform: translateY(1.25rem); } to { opacity: 1; transform: none; } }
@keyframes gl-route-fade { from { opacity: 0; } to { opacity: 1; } }`;
    const cleanHeroCss = `
@keyframes story-hero-cluster-rise { from { opacity: 0; transform: translateY(1.5rem); } to { opacity: 1; transform: translateY(0); } }
.story-hero-cluster .story-header-eyebrow.story-header-cluster--enter { animation: story-hero-cluster-rise 0.36s ease-out both; animation-delay: 0ms; }
.story-hero-cluster .story-header-subpath.story-header-cluster--enter { animation: story-hero-cluster-rise 0.36s ease-out both; animation-delay: 30ms; }
.story-hero-cluster .story-header-blurb.story-header-cluster--enter { animation: story-hero-cluster-rise 0.36s ease-out both; animation-delay: 120ms; }`;
    const cleanHeader = `
<p class="text-admin-label story-header-eyebrow story-header-cluster--enter">{{ eyebrow }}</p>
<code class="fira-code story-header-subpath story-header-cluster--enter">{{ subpath }}</code>
<slot />
<p class="text-small story-header-blurb story-header-cluster--enter">{{ blurb }}</p>`;

    const base = {
        routerSrc: cleanRouter,
        transitionsCssSrc: cleanTransitions,
        storyHeroCssSrc: cleanHeroCss,
        storyHeaderSrc: cleanHeader,
    };

    // Bite A — a clean tree MUST be violation-free.
    const a = checkRouteEnterVisible(base);
    if (a.length !== 0) {
        failures.push(`bite A: a clean tree falsely flagged ${a.length}: ${a.map((v) => `${v.clause}:${v.msg}`).join(" | ")}`);
    }

    // Bite B (R1) — the one-shot firstResolved gate MUST flag.
    const b = checkRouteEnterVisible({
        ...base,
        routerSrc: `let firstResolved = false;
router.beforeResolve(async (to) => {
    if (firstResolved) return true;
    firstResolved = true;
    const comps = to.matched.map((r) => r.components?.default).filter((c) => typeof c === "function");
    await Promise.all(comps.map((c) => c().catch(() => undefined)));
    return true;
});`,
    });
    if (!b.some((v) => v.clause === "R1")) failures.push("bite B: a one-shot firstResolved beforeResolve did NOT flag R1");

    // Bite C (R2) — the sub-perceptual 12px rise MUST flag.
    const c = checkRouteEnterVisible({
        ...base,
        transitionsCssSrc: cleanTransitions.replace("translateY(1.25rem)", "translateY(0.75rem)"),
    });
    if (!c.some((v) => v.clause === "R2")) failures.push("bite C: a 12px (0.75rem) rise did NOT flag R2");

    // Bite D (R2) — dropping `backwards` MUST flag.
    const d = checkRouteEnterVisible({
        ...base,
        transitionsCssSrc: cleanTransitions.replace(" backwards; }", "; }"),
    });
    if (!d.some((v) => v.clause === "R2")) failures.push("bite D: a .route-enter recipe with no `backwards` fill did NOT flag R2");

    // Bite E (R3) — a subpath band with NO matching cluster-rise rule MUST flag.
    const e = checkRouteEnterVisible({
        ...base,
        storyHeroCssSrc: cleanHeroCss.replace(
            /\.story-hero-cluster \.story-header-subpath\.story-header-cluster--enter \{[^}]*\}/,
            "",
        ),
    });
    if (!e.some((v) => v.clause === "R3")) failures.push("bite E: a subpath band with no matching cluster-rise rule did NOT flag R3");

    // Bite F (R3) — a cluster-rise keyframe with no translateY leg MUST flag.
    const f = checkRouteEnterVisible({
        ...base,
        storyHeroCssSrc: cleanHeroCss.replace("transform: translateY(1.5rem)", "opacity: 0"),
    });
    if (!f.some((v) => v.clause === "R3")) failures.push("bite F: a cluster-rise keyframe with no translateY leg did NOT flag R3");

    // Bite G — the comment-strip is load-bearing: a doc line naming 0.75rem/firstResolved
    // must NOT false-flag a clean tree.
    const g = checkRouteEnterVisible({
        ...base,
        routerSrc: cleanRouter + "\n// the one-shot firstResolved guard + the 0.75rem rise are SUPERSEDED",
    });
    if (g.length !== 0) failures.push(`bite G: a clean tree with a deletion-record comment falsely flagged ${g.length} (comment strip broken)`);

    return failures;
}

function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_ROUTE_ENTER_VISIBLE_ARTIFACT",
        "BG-route-enter-visible",
    );
    const violations = [];

    const routerSrc = readFileSync(resolve(ROOT, "demo/router.ts"), "utf8");
    const transitionsCssSrc = readFileSync(resolve(ROOT, "src/styles/transitions.css"), "utf8");
    const storyHeroCssSrc = readFileSync(resolve(ROOT, "demo/chassis/hero/story-hero.css"), "utf8");
    const storyHeaderSrc = readFileSync(resolve(ROOT, "demo/chassis/hero/StoryHeader.vue"), "utf8");

    violations.push(...checkRouteEnterVisible({ routerSrc, transitionsCssSrc, storyHeroCssSrc, storyHeaderSrc }));

    const biteFailures = selfTest();
    for (const f of biteFailures) violations.push({ clause: "SELF-TEST", msg: f });

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:route-enter-visible",
        facts: {
            chunkPreResolvedEveryNav: !violations.some((v) => v.clause === "R1"),
            perceptibleRiseOnSnappy: !violations.some((v) => v.clause === "R2"),
            clusterStaggerReadingOrder: !violations.some((v) => v.clause === "R3"),
            selfTestBites: biteFailures.length === 0 ? "7/7 GREEN" : biteFailures,
        },
        violations,
    });

    console.log("proof:route-enter-visible — the route entrance is VISIBLE in paint (BG.W-ROUTE-ENTER-VISIBLE)");
    console.log(`  chunk pre-resolved every nav (R1): ${!violations.some((v) => v.clause === "R1")}`);
    console.log(`  perceptible rise on snappy   (R2): ${!violations.some((v) => v.clause === "R2")}`);
    console.log(`  cluster stagger reading order(R3): ${!violations.some((v) => v.clause === "R3")}`);
    console.log(`  self-test bites                  : ${biteFailures.length === 0 ? "7/7 GREEN" : `${biteFailures.length} FAILED`}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ [${v.clause}] ${v.msg}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
