#!/usr/bin/env node
// proof:scroll-trigger — BC.W-SCROLL-TRIGGER: useScrollTrigger, the ONE scroll reader
// (continuous 0..1 progress off the SAME rAF read + discrete onCross/onEnter/onLeave
// trigger-point events, direction + per-second velocity + the flip-delta debounce).
//
// Device-free SOURCE-scan gate (the comment-strip + pure-detector house pattern,
// mirroring proof-pointer-velocity.mjs / proof-drag-morph.mjs). Five falsifiable
// clauses, each born-RED at the pre-build HEAD (the reader + the factored core did not
// exist) and driven GREEN by the leaf + the factor + the barrels + the consumer-evidence
// doc + the @property reg. The BINDING painted truth (the chrome reading the reader)
// rides BC.W-SCROLL-CHROME's π; this gate is the device-free CI half + the headless math
// half is tests/composables/motion/useScrollTrigger.test.ts.
//
//   T1 — the reader EXISTS ONCE on /motion-core + engine-free. useScrollTrigger is
//        defined + re-exported from the engine-free /motion-core barrel
//        (composables/motion/core/index.ts); the leaf imports `vue` only (no
//        @mkbabb/keyframes.js, no @vueuse/core — the /motion-core leaf bar, the
//        usePointerVelocityField precedent). Born-RED (no such export at HEAD).
//   T2 — the rAF-coalesced reader is FACTORED ONCE (no fourth listener). createScrollReader
//        exists (scrollReader.ts); useScrollTracker COMPOSES it (its inline onScroll +
//        requestAnimationFrame plumbing is GONE); exactly ONE addEventListener("scroll")
//        + requestAnimationFrame-coalesce pair survives in the scroll-reader leaf set
//        (the reader + the useScrollProgress fallback's pre-existing one on the recorded
//        booked-consolidation allowlist). Born-RED if a second raw scroll listener + rAF
//        pair survives outside the allowlist.
//   T3 — DUAL-PATH single-writer. The continuous ramp is supportsScrollTimeline()-gated
//        (the JS progress writer attaches NOTHING on a native engine — the
//        useScrollProgress.ts:80 early-return precedent: a NATIVE_SCROLL_TIMELINE guard
//        reaching the progress write); the @property --scroll-t is registered (<number>,
//        inherits) for the native ramp. The discrete crossing events run the JS rAF tick
//        on EVERY engine (events can't ride a timeline). Born-RED if the progress write is
//        unconditional (bypassing the gate).
//   T4 — direction + velocity + flip-delta + PRM-discrete. flipDeltaPx defaults 8; a
//        direction flip commits only past it; velocity is Δpos/Δt per-second; under PRM the
//        ramp drops to a discrete snap WHILE onCross/onEnter/onLeave still fire (the
//        crossing-event path is NOT inside a PRM-no-preference gate). Born-RED if the
//        crossing events are gated off under PRM (the trigger-point-vanishes bug).
//   T5 — the ≥2-consumer record. docs/consumer-evidence/use-scroll-trigger.md names the
//        binary consumers (#1 the demo scroll-system story, #2 BC.W-SCROLL-CHROME) +
//        carries the no-overfitting re-audit/retire clause; the demo story exists AND has a
//        live useScrollTrigger() call site. Born-RED (no evidence doc / no story at HEAD).
//
// + a self-test bite per clause: a synthetic leaf that imports @mkbabb/keyframes.js (T1) /
//   forks a second raw scroll listener + rAF (T2) / writes progress unconditionally (T3) /
//   gates the crossing events behind a PRM-no-preference block (T4) MUST flag, proven every
//   run (the anti-evasion floor — a hollow detector that always greens is the close-class lie).

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const FILES = {
    reader: "src/composables/motion/useScrollTrigger.ts",
    core: "src/composables/motion/scrollReader.ts",
    coreBarrel: "src/composables/motion/core/index.ts",
    tracker: "src/composables/sidebar/useScrollTracker.ts",
    propertyRegs: "src/styles/tokens/property-regs.css",
    story: "demo/stories/motion/scroll-system.vue",
    evidence: "docs/consumer-evidence/use-scroll-trigger.md",
};

// The recorded booked-consolidation allowlist (T2): files that legitimately keep their
// OWN pre-existing scroll-listener + rAF pair this wave (DRY without a same-wave fold of
// a working leaf — the spec's "DRY without contrivance" / booked-with-rationale clause).
// The no-fourth-listener fence is about a surface RE-ADDING a raw scroll listener for a
// trigger-point read; these pre-date this wave with their OWN distinct scroll semantics,
// each booked to fold onto createScrollReader IFF a consumer makes it pay (never forced).
const SCROLL_RAF_ALLOWLIST = [
    // The ONE shared core (the factored leaf — the single rAF-coalesced scroll listener).
    "src/composables/motion/scrollReader.ts",
    // The continuous-progress dual-path leaf (useScrollProgress.ts:80 early-return). Owns
    // its own dual-path; the consolidation onto the shared reader is the recorded booked
    // successor IFF a third progress consumer makes it pay (the spec's BOOKED-not-forced).
    "src/composables/motion/useScrollProgress.ts",
    // The edge-fade scroll-state fallback (BA.W-FADING-SCROLL) — a LEGIBILITY-cue mask
    // writer (not a trigger-point read); its own coalesce, distinct concern.
    "src/components/custom/fading-scroll/composables/useFadingScroll.ts",
    // The progressive batch-render count trigger (the sidebar lazy-load — a data-render
    // count bump, DISTINCT from a position trigger; CLAUDE.md sidebar note). Pre-existing.
    "src/composables/sidebar/useLazyLoader.ts",
    // The virtualized-section-windowing leaf (BC.W-VIRTUAL-WINDOW) — a DOM-measure render
    // window driver with a session height cache, its own scroll/recalc rAFs. Pre-existing.
    "src/composables/virtual/useVirtualSectionWindow.ts",
    // The DAMPED sidebar-follow ANIMATION (a momentum-like rAF follow, NOT a coalesce
    // model — a different rAF shape than the trigger-point read). Pre-existing.
    "src/composables/sidebar/useSidebarFollow.ts",
];

function read(rel) {
    return readFileSync(resolve(ROOT, rel), "utf8");
}

// Strip JS line- + block-comments so a detector matches REAL source, not a docstring
// example (the house comment-strip pattern). URL-safe `://` preserved by only stripping
// `//` not preceded by `:`.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

const violations = [];
const facts = {};

if (!existsSync(resolve(ROOT, FILES.reader))) {
    violations.push(`T1: ${FILES.reader} does not exist (the reader is absent)`);
    finish();
}
if (!existsSync(resolve(ROOT, FILES.core))) {
    violations.push(`T2: ${FILES.core} does not exist (the factored rAF core is absent)`);
    finish();
}

const reader = stripComments(read(FILES.reader));
const core = stripComments(read(FILES.core));
const coreBarrel = stripComments(read(FILES.coreBarrel));
const tracker = stripComments(read(FILES.tracker));

// ── T1 — exists ONCE on /motion-core + engine-free ────────────────────────────
const defined = /export function useScrollTrigger\b/.test(reader);
if (!defined)
    violations.push("T1: useScrollTrigger is not defined (export function absent)");

const publishedCore = /export \* from "\.\.\/useScrollTrigger"/.test(coreBarrel);
if (!publishedCore)
    violations.push(
        "T1: useScrollTrigger is not re-exported from the /motion-core barrel (composables/motion/core/index.ts)",
    );

const importsVueuse = /from\s*["']@vueuse\/core["']/.test(reader);
const importsKeyframes = /from\s*["']@mkbabb\/keyframes\.js["']/.test(reader);
if (importsVueuse)
    violations.push(
        "T1: useScrollTrigger imports @vueuse/core (the /motion-core leaf bar — vue-only, the usePointerVelocityField precedent)",
    );
if (importsKeyframes)
    violations.push(
        "T1: useScrollTrigger imports @mkbabb/keyframes.js (the /motion-core leaf bar — vue-only, NOT the keyframes-bearing /motion barrel)",
    );
facts.t1 = { defined, publishedCore, importsVueuse, importsKeyframes };

// ── T2 — the rAF-coalesced reader is FACTORED ONCE (no fourth listener) ───────
const coreDefined = /export function createScrollReader\b/.test(core);
if (!coreDefined)
    violations.push("T2: createScrollReader is not defined in the factored core leaf");

// The reader COMPOSES the core (it does not own its own scroll listener).
const readerComposesCore =
    /createScrollReader\s*\(/.test(reader) &&
    /from\s*["']\.\/scrollReader["']/.test(reader);
if (!readerComposesCore)
    violations.push(
        "T2: useScrollTrigger does not compose createScrollReader (it must be a view over the shared core, not a second listener)",
    );

// useScrollTracker RE-POINTS onto the core: its inline onScroll + requestAnimationFrame
// plumbing is GONE, and it composes createScrollReader.
const trackerComposesCore =
    /createScrollReader\s*\(/.test(tracker) &&
    /from\s*["']\.\.\/motion\/scrollReader["']/.test(tracker);
if (!trackerComposesCore)
    violations.push(
        "T2: useScrollTracker does not compose createScrollReader (the ToC tracker must re-point onto the shared core)",
    );
// The tracker no longer owns a raw addEventListener("scroll") + requestAnimationFrame pair.
const trackerHasScrollListener = /addEventListener\(\s*["']scroll["']/.test(tracker);
const trackerHasRaf = /\brequestAnimationFrame\s*\(/.test(tracker);
if (trackerHasScrollListener)
    violations.push(
        "T2: useScrollTracker still owns a raw addEventListener('scroll') (the listener plumbing must be GONE — re-pointed onto createScrollReader)",
    );
if (trackerHasRaf)
    violations.push(
        "T2: useScrollTracker still owns a requestAnimationFrame coalesce (the rAF plumbing must be GONE — the core owns it)",
    );

// The no-fourth-listener census: exactly the allowlisted files own a
// scroll-listener + rAF pair. Any OTHER src/composables file with the pair REDs.
const offendingPair = scrollRafPairsOutsideAllowlist();
if (offendingPair.length)
    violations.push(
        `T2: a raw addEventListener('scroll')+requestAnimationFrame pair survives outside the booked-consolidation allowlist: ${offendingPair.join(", ")} (the no-fourth-listener fence — compose createScrollReader)`,
    );
facts.t2 = {
    coreDefined,
    readerComposesCore,
    trackerComposesCore,
    trackerHasScrollListener,
    trackerHasRaf,
    offendingPair,
    allowlist: SCROLL_RAF_ALLOWLIST,
};

// ── T3 — DUAL-PATH single-writer ──────────────────────────────────────────────
// The continuous progress write is supportsScrollTimeline()-gated: a
// NATIVE_SCROLL_TIMELINE guard reaches the progress.value write (the JS ramp attaches
// nothing on a native engine — the useScrollProgress.ts:80 early-return precedent).
const importsSupportsTimeline = /supportsScrollTimeline/.test(reader);
const nativeGated = /NATIVE_SCROLL_TIMELINE/.test(reader);
// The progress write must be guarded by the native-timeline gate (no unconditional write).
// We assert every `progress.value =` write sits inside a `!NATIVE_SCROLL_TIMELINE` arm.
const progressWrites = (reader.match(/progress\.value\s*=/g) || []).length;
const gatedProgressWrites = (
    reader.match(/!NATIVE_SCROLL_TIMELINE[\s\S]{0,260}?progress\.value\s*=/g) || []
).length;
const progressGated =
    progressWrites > 0 && gatedProgressWrites >= progressWrites;
if (!importsSupportsTimeline || !nativeGated)
    violations.push(
        "T3: useScrollTrigger does not read supportsScrollTimeline()/NATIVE_SCROLL_TIMELINE (the dual-path gate is absent)",
    );
if (!progressGated)
    violations.push(
        `T3: the continuous progress write is not native-timeline-gated (${gatedProgressWrites}/${progressWrites} writes inside a !NATIVE_SCROLL_TIMELINE arm — an unconditional JS ramp write bypasses the dual-path single-writer)`,
    );
// The @property --scroll-t is registered (<number>, inherits) for the native ramp.
const propertyRegs = read(FILES.propertyRegs);
const scrollTReg =
    /@property\s+--scroll-t\s*\{[\s\S]*?syntax:\s*["']<number>["'][\s\S]*?inherits:\s*true/.test(
        propertyRegs,
    );
if (!scrollTReg)
    violations.push(
        "T3: @property --scroll-t is not registered (<number>, inherits: true) in tokens/property-regs.css (the native-ramp custom — the BC.W-SCROLL-CHROME shrink/opacity reads it)",
    );
facts.t3 = {
    importsSupportsTimeline,
    nativeGated,
    progressWrites,
    gatedProgressWrites,
    progressGated,
    scrollTReg,
};

// ── T4 — direction + velocity + flip-delta + PRM-discrete ─────────────────────
// flipDeltaPx defaults 8.
const flipDeltaDefault8 = /flipDeltaPx\s*=\s*8\b/.test(reader);
if (!flipDeltaDefault8)
    violations.push(
        "T4: flipDeltaPx does not default to 8 (the anti-thrash, mirroring the dock HOVER_INTENT_MS hysteresis)",
    );
// A direction flip commits only past flipDeltaPx (a `>= flipDeltaPx` gate reaching the
// direction write).
const directionDebounced =
    /flipDeltaPx/.test(reader) &&
    />=\s*flipDeltaPx/.test(reader) &&
    /direction\.value\s*=/.test(reader);
if (!directionDebounced)
    violations.push(
        "T4: the direction flip is not debounced past flipDeltaPx (a `>= flipDeltaPx` gate reaching the direction write — a 1px jitter must not toggle direction)",
    );
// Velocity is per-second (Δpos / Δt, a `/ dt`-style division feeding velocity.value).
const velocityPerSecond =
    /velocity\.value\s*=/.test(reader) &&
    /\/\s*dt|\/\s*1000/.test(reader);
if (!velocityPerSecond)
    violations.push(
        "T4: velocity is not derived per-second (Δpos/Δt — a framerate-independent division feeding velocity.value, the usePointerVelocityField precedent)",
    );
// PRM-discrete: the crossing events (onCross/onEnter/onLeave calls) are NOT inside a
// PRM-no-preference gate (the trigger-point-survives-PRM model). We assert there is NO
// `prefers-reduced-motion: no-preference` arm wrapping the onCross/onEnter/onLeave calls.
const crossingCallsPresent =
    /onCross\?\.\(/.test(reader) &&
    /onEnter\?\.\(/.test(reader) &&
    /onLeave\?\.\(/.test(reader);
if (!crossingCallsPresent)
    violations.push(
        "T4: the crossing events (onCross/onEnter/onLeave) are not all emitted by the reader",
    );
// The reader must NOT gate the crossing calls behind a PRM `no-preference` block (the
// trigger-point-vanishes bug). A `reduced` read inside the crossing loop that EARLY-
// RETURNS the crossing reds; we assert no `if (reduced) return`/`if (reduced) continue`
// dominates the crossing emit. Heuristic: the crossing emit must not be preceded by a
// `reduced` early-out in the same evaluate body before the trigger loop. We check the
// reader does not skip the crossing under reduce: there is no `reduced` token between a
// `for (` trigger loop opener and the onCross emit guard, AND no `no-preference` literal.
const prmNoPreference = /no-preference/.test(reader);
if (prmNoPreference)
    violations.push(
        "T4: the reader references a `no-preference` PRM gate (the JS crossing events must fire on EVERY engine — a no-preference arm would vanish the trigger-point under reduce, the useFadingScroll discrete-survives model)",
    );
facts.t4 = {
    flipDeltaDefault8,
    directionDebounced,
    velocityPerSecond,
    crossingCallsPresent,
    prmNoPreference,
};

// ── T5 — the ≥2-consumer record ───────────────────────────────────────────────
const evidenceExists = existsSync(resolve(ROOT, FILES.evidence));
let evidenceHasReaudit = false;
let evidenceNamesChrome = false;
if (evidenceExists) {
    const ev = read(FILES.evidence);
    evidenceHasReaudit = /re-audit/i.test(ev) && /retire/i.test(ev);
    evidenceNamesChrome =
        /BC\.W-SCROLL-CHROME/.test(ev) && /scroll-system/.test(ev);
}
if (!evidenceExists)
    violations.push(
        "T5: docs/consumer-evidence/use-scroll-trigger.md does not exist (the ≥2-consumer record is absent)",
    );
if (evidenceExists && !evidenceHasReaudit)
    violations.push(
        "T5: the consumer-evidence doc lacks the no-overfitting re-audit/retire clause",
    );
if (evidenceExists && !evidenceNamesChrome)
    violations.push(
        "T5: the consumer-evidence doc does not name the two binary consumers (the demo scroll-system story + BC.W-SCROLL-CHROME)",
    );
// The demo story exists AND has a live useScrollTrigger() call site (the LIVE exerciser).
const storyExists = existsSync(resolve(ROOT, FILES.story));
let storyConsumes = false;
if (storyExists) {
    const story = stripComments(read(FILES.story));
    storyConsumes = /useScrollTrigger\s*\(/.test(story);
}
if (!storyExists)
    violations.push(`T5: ${FILES.story} does not exist (the demo exerciser is absent)`);
if (storyExists && !storyConsumes)
    violations.push(
        "T5: the demo scroll-system story does not call useScrollTrigger() (the live exerciser is a stub)",
    );
facts.t5 = {
    evidenceExists,
    evidenceHasReaudit,
    evidenceNamesChrome,
    storyExists,
    storyConsumes,
};

// ── Self-test bites (anti-evasion — each MUST flag, proven every run) ──────────
const bites = [];
{
    // Bite 1 (T1): a synthetic leaf importing @mkbabb/keyframes.js MUST flag.
    const fake = `import { SpringProgress } from "@mkbabb/keyframes.js"`;
    const flagged = /from\s*["']@mkbabb\/keyframes\.js["']/.test(stripComments(fake));
    bites.push({ id: "T1-keyframes-import", flagged });
    if (!flagged)
        violations.push("SELF-TEST T1 bite did not flag a synthetic keyframes import");
}
{
    // Bite 2 (T2): a synthetic file forking its own scroll listener + rAF MUST flag.
    const fake = `el.addEventListener("scroll", () => requestAnimationFrame(tick))`;
    const stripped = stripComments(fake);
    const flagged =
        /addEventListener\(\s*["']scroll["']/.test(stripped) &&
        /\brequestAnimationFrame\s*\(/.test(stripped);
    bites.push({ id: "T2-fourth-listener", flagged });
    if (!flagged)
        violations.push("SELF-TEST T2 bite did not flag a synthetic fourth scroll listener");
}
{
    // Bite 3 (T3): a synthetic unconditional progress write (no NATIVE gate) MUST flag.
    const fake = `function tick(){ progress.value = pos / extent }`;
    const stripped = stripComments(fake);
    const writes = (stripped.match(/progress\.value\s*=/g) || []).length;
    const gated = (
        stripped.match(/!NATIVE_SCROLL_TIMELINE[\s\S]{0,260}?progress\.value\s*=/g) || []
    ).length;
    const flagged = writes > 0 && gated < writes;
    bites.push({ id: "T3-unconditional-progress", flagged });
    if (!flagged)
        violations.push("SELF-TEST T3 bite did not flag an unconditional progress write");
}
{
    // Bite 4 (T4): a synthetic PRM no-preference gate around the crossing MUST flag.
    const fake = `@media (prefers-reduced-motion: no-preference) { onCross(id, dir, pos) }`;
    const flagged = /no-preference/.test(fake);
    bites.push({ id: "T4-prm-gate-on-crossing", flagged });
    if (!flagged)
        violations.push("SELF-TEST T4 bite did not flag a PRM no-preference gate on the crossing");
}
facts.selfTestBites = bites;

finish();

function finish() {
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_SCROLL_TRIGGER_ARTIFACT",
        "scroll-trigger",
    );
    writeGateArtifact(ARTIFACT, {
        gate: "proof:scroll-trigger",
        status,
        generatedAt: snapshotStamp(),
        facts,
        violations,
    });

    console.log(
        "proof:scroll-trigger — the ONE scroll reader (BC.W-SCROLL-TRIGGER)",
    );
    console.log(`  reader: ${FILES.reader}`);
    console.log(`  core:   ${FILES.core}`);
    if (facts.t1)
        console.log(
            `  T1 exists/published/engine-free: defined=${facts.t1.defined} core=${facts.t1.publishedCore} vueuse=${facts.t1.importsVueuse} keyframes=${facts.t1.importsKeyframes}`,
        );
    if (facts.t2)
        console.log(
            `  T2 factored-once (no fourth listener): coreDefined=${facts.t2.coreDefined} readerComposes=${facts.t2.readerComposesCore} trackerComposes=${facts.t2.trackerComposesCore} trackerOwnsListener=${facts.t2.trackerHasScrollListener} trackerOwnsRaf=${facts.t2.trackerHasRaf} offending=[${facts.t2.offendingPair.join(", ") || "NONE"}]`,
        );
    if (facts.t3)
        console.log(
            `  T3 dual-path: nativeGated=${facts.t3.nativeGated} progressGated=${facts.t3.gatedProgressWrites}/${facts.t3.progressWrites} scrollTReg=${facts.t3.scrollTReg}`,
        );
    if (facts.t4)
        console.log(
            `  T4 dir/vel/flip/PRM: flip8=${facts.t4.flipDeltaDefault8} dirDebounced=${facts.t4.directionDebounced} velPerSec=${facts.t4.velocityPerSecond} crossings=${facts.t4.crossingCallsPresent} noPrmGate=${!facts.t4.prmNoPreference}`,
        );
    if (facts.t5)
        console.log(
            `  T5 ≥2-consumer record: evidence=${facts.t5.evidenceExists} reaudit=${facts.t5.evidenceHasReaudit} namesChrome=${facts.t5.evidenceNamesChrome} storyConsumes=${facts.t5.storyConsumes}`,
        );
    console.log(
        `  self-test bites all flagged: ${(facts.selfTestBites ?? []).every((b) => b.flagged)}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

// The no-fourth-listener census (T2): scan src/composables for any file that owns BOTH a
// raw addEventListener("scroll") AND a requestAnimationFrame coalesce. Returns the
// offending paths NOT on the booked-consolidation allowlist. Uses ripgrep over the
// composables tree (the scroll-reader leaf set).
function scrollRafPairsOutsideAllowlist() {
    let files = [];
    try {
        const out = execSync(
            `rg -l --no-messages 'addEventListener\\(\\s*["'\\'']scroll["'\\'']' src/composables`,
            { cwd: ROOT, encoding: "utf8" },
        );
        files = out.split("\n").map((s) => s.trim()).filter(Boolean);
    } catch {
        // rg exits 1 on no match — no scroll listeners at all (vacuously clean).
        return [];
    }
    const offending = [];
    for (const rel of files) {
        if (SCROLL_RAF_ALLOWLIST.includes(rel)) continue;
        let src;
        try {
            src = stripComments(readFileSync(resolve(ROOT, rel), "utf8"));
        } catch {
            continue;
        }
        if (
            /addEventListener\(\s*["']scroll["']/.test(src) &&
            /\brequestAnimationFrame\s*\(/.test(src)
        ) {
            offending.push(rel);
        }
    }
    return offending;
}
