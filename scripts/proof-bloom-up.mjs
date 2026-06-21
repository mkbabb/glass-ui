#!/usr/bin/env node
// BE.W-BLOOM-UP — proof:bloom-up, the shared-element FLIP (source≠dest) + the 4th
// color channel on the destination field (born-RED at HEAD → GREEN at the wave).
//
// THE MOVE (the audit Tier-1 item 5; the f_009→f_010 betters-claim, exact). A SMALL
// source (an album card, the search pill) BLOOMS UP into a LARGE destination (the
// fullscreen surface, the Places sheet): the THREE compositor channels (scale/opacity/
// blur-decongest — the `useLiquidReveal` bloom) PLUS a 4TH COLOR channel that re-tints
// the DESTINATION FIELD to the source's dominant album hue — the bloom CARRIES the
// color into the surround. `useLiquidReveal` ships the 3-channel geometry bloom but
// touches NO color (the field-warming is the load-bearing iOS move it is paint-blind
// to). `useBloomUp` is its sibling for the source≠dest shared-element case + the 4th
// channel.
//
// THE CONFIRM-OR-BUILD verdict: BUILD (a thin composition). `useLiquidReveal` blooms a
// surface FROM a TRIGGER onto its OWN settled rect (source IS the surface's past), 3
// channels, no color. `useBloomUp` blooms a DESTINATION from a SEPARATE source element
// (source≠dest) AND adds the 4th color channel on the field — a genuine gap, built as a
// thin CONSUMING leaf composing the SAME kf `ElementMorph` + `springTimingFunction`
// substrate (no second engine, no new spring family).
//
// This is the device-free SOURCE arm (W1-W4). The PAINTED truth — the bloom frame-
// series, the field-hue warm across the SAME frames, the surface-carries-no-hue, the
// PRM single-paint — is the binding π `tests-visual/bloom-up.spec.ts` (the bloom-up
// roster row; LOCAL-ONLY/real-GPU, the webkit project enrolled per BE.W-SAFARI-CAPTURE)
// + the `proof:ba-gestalt` bloom verdict (the AY W-LIVE1 split — never this gate alone,
// the AZ source-green/visually-broken close-class the gestalt bar kills).
//
// FOUR FALSIFIABLE WITNESSES (each born-RED at HEAD — the leaf does not exist):
//
//   W1 — THE BLOOM LEAF COMPOSES THE KF SUBSTRATE + IS COMPOSITOR-ONLY ON THE SURFACE.
//        src/composables/motion/useBloomUp.ts imports ElementMorph + springTimingFunction
//        from @mkbabb/keyframes.js (NOT a hand-rolled rAF spring / a second physics core)
//        and writes ONLY transform/opacity/filter on the DESTINATION surface (destRef).
//        BITE: (a) the kf import present AND (b) NO width/height/top/left/right/bottom/
//        margin/padding/font-size write on a `.style.<prop>`/`setProperty("<prop>")` form
//        whose property is a LAYOUT (reflow-set) property — the compositor-only floor (a
//        layout-property write on the surface reds even with the kf import, the A'-3
//        lesson W-MOTION-CANON enforces). The --glass-ambient-* setProperty (the 4th
//        channel on the FIELD) is NOT a reflow-set property → not flagged.
//   W2 — THE 4TH COLOR CHANNEL EXISTS + IS ON THE DESTINATION FIELD, NOT THE SURFACE.
//        useBloomUp writes the registered @property --glass-ambient-hue + --glass-ambient-
//        strength (the AMBIENT-TINT field-retint cohort) onto a FIELD element (destRef's
//        ancestor — a resolveField/`data-glass-field`/parentElement reach, NOT the dest
//        surface), interpolated on the spring curve, reading the source's album hue
//        (fieldHue OR --glass-ambient-hue off the source). BITE: (a) the leaf references
//        --glass-ambient-hue AND --glass-ambient-strength (the 4th channel is present —
//        a geometry-only bloom reds); (b) the field write targets a RESOLVED FIELD
//        element, not `dest`/`surface` directly (the surface carries no injected hue —
//        the compositor-only-floor-on-the-surface de-risk); (c) the leaf reads the
//        source hue (fieldHue param OR getComputedStyle(--glass-ambient-hue) off the
//        source). Self-test: a geometry-only bloom (no ambient write) reds W2; a bloom
//        that writes --glass-ambient-* onto the BLOOMING surface (dest.style) reds W2.
//   W3 — SAFARI-SAFE + PRM-SNAP + OFF-ROOT.
//        (a) the decongest rides a regular `filter` (NOT backdrop-filter:url() — the
//        Safari floor); (b) the PRM branch SNAPS the surface (writes opacity, NO
//        morph.apply/requestAnimationFrame inside the branch — zero transform/blur
//        frames) AND lands the field hue (the strength snaps to its target instantly);
//        (c) the leaf is exported on the /motion barrel (keyframes-bearing) and NOT the
//        root barrel (the SCC-trap discipline — a root-barrel re-export reds).
//   W4 — THE 3 COMPOSITOR CHANNELS (byte-shape with useLiquidReveal).
//        transform (morph.apply) + opacity + filter blur are all present on the bloom
//        path. BITE: a bloom omitting any of the three channels reds.
//   W5 — NO MOUNT-FLASH: THE DEST IS SEATED-HIDDEN-ON-MOUNT (the prime seam).
//        A v-if-mounted dest paints ONCE at its full settled rect BEFORE bloom() seats
//        it — a sub-frame flash of the full-size sheet. useBloomUp SEATS the dest at its
//        collapsed/hidden state (opacity 0 + the source-FLIP transform) the MOMENT destRef
//        becomes available, before paint. BITE: (a) a `prime()` seam exists + is returned;
//        (b) the auto-prime is a `watch(dest, …)` running pre-paint (`flush: "pre"`); (c)
//        prime seats opacity "0" (shows NOTHING — the load-bearing leg). Self-test: a leaf
//        with NO prime/auto-prime seam reds W5 (born-RED on the flash).
//
//   + the inline self-test bite (a synthetic leaf that: hand-rolls the spring reds W1;
//     writes a layout property on the surface reds W1; omits the 4th channel reds W2;
//     writes the ambient hue on the blooming surface reds W2 — proven every run). The
//     barrel-omission + demo arms mirror proof:dockmorph-cta. EXTEND-vs-NEW: NEW gate;
//     proof:liquid-reveal + proof:no-layout-animation + proof:vueuse-free-root stay
//     GREEN by construction. The GL shader fence + ppmycota + the foreign-tree fence
//     (the kf re-exports are READ-ONLY references this seam ACTIVATES) hold.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function read(rel) {
    try {
        return readFileSync(join(ROOT, rel), "utf8");
    } catch {
        return null;
    }
}

// The house comment-strip detector (URL-safe `//` strip — the clause-7 idiom).
function stripComments(src) {
    if (src == null) return "";
    return src
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

// The reflow set the compositor-only floor forbids on the bloom (surface) path (the
// SHARED W-MOTION-CANON reflow vocabulary). `--glass-ambient-*` (the field's 4th
// channel) is NOT here — a custom-property write is not a layout property.
const REFLOW_PROPS = [
    "width",
    "height",
    "inline-size",
    "block-size",
    "top",
    "left",
    "right",
    "bottom",
    "margin",
    "padding",
    "font-size",
];

const LEAF = "src/composables/motion/useBloomUp.ts";
const MOTION_BARREL = "src/composables/motion/index.ts";
const ROOT_BARREL = "src/index.ts";

// ── The reusable clause checker (runs over a provided source so the self-test can feed
//    it a synthetic body) ───────────────────────────────────────────────────────────
function checkLeaf(rawLeaf, { fail }) {
    if (rawLeaf == null) {
        fail("W1", `${LEAF} does not exist (the shared-element bloom seam has no home)`);
        return;
    }
    const src = stripComments(rawLeaf);

    // ── W1 — the kf substrate + compositor-only on the surface ──────────────────────
    const importsMorph = /\bElementMorph\b/.test(src);
    const importsSpring = /\bspringTimingFunction\b/.test(src);
    const fromKf = /from\s+["']@mkbabb\/keyframes\.js["']/.test(src);
    if (!importsMorph)
        fail("W1", "useBloomUp does not reference the kf ElementMorph (the rect-delta morph core — the shared-element FLIP)");
    if (!importsSpring)
        fail("W1", "useBloomUp does not reference springTimingFunction (the spring curve is not the kf {fn,css} pair)");
    if (!fromKf)
        fail("W1", "useBloomUp does not import the kf substrate from @mkbabb/keyframes.js");
    // The anti-evasion: NO hand-rolled rAF spring integrator (the reuse is the wired
    // substrate, not a re-fork — mirrors proof:liquid-reveal / proof:dockmorph-cta).
    if (
        /requestAnimationFrame\s*\(\s*function|requestAnimationFrame\s*\(\s*\(/.test(src) &&
        /\bstiffness\b|\bvelocity\s*[+\-*]|\bdamping\b\s*\*/.test(src)
    )
        fail("W1", "useBloomUp hand-rolls a rAF spring integrator (the kf substrate is the single physics source — no re-fork, no second spring family)");
    // The compositor-only floor — NO layout-property write on the surface path. The
    // `--glass-ambient-*` setProperty (the FIELD's 4th channel) is a custom property,
    // never matched by the reflow-set forms below.
    for (const p of REFLOW_PROPS) {
        const setProp = new RegExp(`setProperty\\(\\s*["']${p}["']`);
        const styleKey = new RegExp(`\\.style\\.${p.replace(/-/g, "")}\\s*=`);
        if (setProp.test(src))
            fail("W1", `useBloomUp writes the layout property "${p}" via setProperty (compositor-only floor on the surface: transform/opacity/filter ONLY)`);
        if (styleKey.test(src))
            fail("W1", `useBloomUp writes the layout property "${p}" on .style (compositor-only floor on the surface)`);
    }

    // ── W2 — the 4th color channel, on the DESTINATION FIELD, reading the source hue ──
    const writesHue = /--glass-ambient-hue/.test(src);
    const writesStrength = /--glass-ambient-strength/.test(src);
    if (!writesHue)
        fail("W2", "useBloomUp does not write --glass-ambient-hue (the 4th color channel is ABSENT — a geometry-only bloom does NOT carry the album color into the surround; the f_009→f_010 field-warm is missing)");
    if (!writesStrength)
        fail("W2", "useBloomUp does not ramp --glass-ambient-strength (the 4th channel must interpolate the bounded bias on the registered @property — a bare snap is wrong)");
    // (b) the field write targets a RESOLVED FIELD element (an ancestor reach), not the
    // dest/surface directly. The leaf must carry a field-resolution seam (a
    // `data-glass-field` walk / a `field` option / a parentElement reach) AND the
    // ambient-* setProperty must be invoked on that field handle, NOT on `dest.value`/
    // the surface element. We detect the de-risk POSITIVELY: a resolveField-style reach
    // AND no `--glass-ambient-*` write sited on the dest surface.
    const hasFieldResolve =
        /data-glass-field/.test(src) ||
        /\bresolveField\b/.test(src) ||
        /options\.field/.test(src);
    if (!hasFieldResolve)
        fail("W2", "useBloomUp has no field-resolution seam (the 4th channel must write onto destRef's ANCESTOR FIELD — a data-glass-field walk / a `field` option / a resolveField reach — not the blooming surface; the compositor-only-floor-on-the-surface de-risk)");
    // The compositor-only-floor-on-the-surface BITE: the ambient-* write must NOT be
    // sited on the dest surface element. Flag a `--glass-ambient-*` setProperty whose
    // receiver is `el`/`dest`/`surface` directly bound to the destination (the surface
    // carries no injected hue).
    const ambientOnSurface =
        /\b(?:dest|surface)(?:\.value)?\.style\.setProperty\(\s*["']--glass-ambient-(?:hue|strength)["']/.test(src) ||
        /\bel\.style\.setProperty\(\s*["']--glass-ambient-(?:hue|strength)["']/.test(src);
    if (ambientOnSurface)
        fail("W2", "useBloomUp writes --glass-ambient-* onto the BLOOMING SURFACE (dest/el) — the 4th channel MUST ride the FIELD container, never the surface (the compositor-only floor on the surface is breached — a paint write injects a hue onto the bloomed pixels)");
    // (c) the leaf reads the source hue (the fieldHue param OR getComputedStyle of
    // --glass-ambient-hue off the source — the AMBIENT-TINT source).
    const readsHueSource =
        /\bfieldHue\b/.test(src) &&
        /getComputedStyle/.test(src) &&
        /getPropertyValue\(\s*["']--glass-ambient-hue["']/.test(src);
    if (!readsHueSource)
        fail("W2", "useBloomUp does not read the source's album hue (it must read the `fieldHue` option OR getComputedStyle(--glass-ambient-hue) off the SOURCE — the AMBIENT-TINT convergence; proof:single-color-core fence holds via the value.js leaf)");

    // ── W3 — Safari-safe + PRM-snap + off-root ──────────────────────────────────────
    // (a) the decongest is a regular filter, NOT backdrop-filter:url() (the Safari floor).
    if (/backdrop-filter\s*=|setProperty\(\s*["']backdrop-filter["']/.test(src))
        fail("W3", "useBloomUp writes backdrop-filter on the bloom path (the Safari floor: the decongest rides a regular `filter` on the surface's OWN pixels, never backdrop-filter — and never the resting plate blur is clobbered)");
    if (/url\(\s*["']?#/.test(src))
        fail("W3", "useBloomUp references a filter:url(#…) graph in JS (the Safari floor is the regular filter blur — no url() filter on the bloom path)");
    // (b) the PRM branch snaps the surface + lands the field hue, zero motion frames.
    const hasPrmCheck = /prefersReducedMotion\s*\(\s*\)/.test(src);
    if (!hasPrmCheck)
        fail("W3", "useBloomUp does not honor prefers-reduced-motion (the PRM snap is missing)");
    const prmIdx = src.search(/if\s*\([^)]*prefersReducedMotion\s*\(\s*\)[^)]*\)\s*{/);
    if (prmIdx >= 0) {
        const open = src.indexOf("{", prmIdx);
        let depth = 0;
        let end = open;
        for (let i = open; i < src.length; i++) {
            if (src[i] === "{") depth++;
            else if (src[i] === "}") {
                depth--;
                if (depth === 0) {
                    end = i;
                    break;
                }
            }
        }
        const prmBody = src.slice(open, end + 1);
        if (/\bmorph\.apply\b|\brequestAnimationFrame\b/.test(prmBody))
            fail("W3", "the PRM branch still drives the transform morph (morph.apply / requestAnimationFrame) — PRM must SNAP the surface to settled with zero transform/blur frames");
        if (!/opacity/.test(prmBody))
            fail("W3", "the PRM branch does not snap opacity (the surface must seat at its settled identity, opacity 1)");
        if (!/--glass-ambient-strength|writeFieldStrength|strengthTarget/.test(prmBody))
            fail("W3", "the PRM branch does not land the field hue (the 4th channel must snap to its target strength instantly — a color change is not a vestibular trigger, the field still warms)");
    } else if (hasPrmCheck) {
        fail("W3", "the prefersReducedMotion check is not the bloom-path guard branch (cannot verify the deterministic snap)");
    }

    // ── W4 — the 3 compositor channels (byte-shape with useLiquidReveal) ─────────────
    if (!/\bmorph\.apply\b/.test(src))
        fail("W4", "useBloomUp does not drive the transform channel (morph.apply — the SPATIAL bloom is absent)");
    if (!/\.style\.opacity\s*=/.test(src))
        fail("W4", "useBloomUp does not drive the opacity channel (the coupled fade is absent)");
    if (!/\.style\.filter\s*=\s*`?blur/.test(src) && !/filter\s*=\s*`blur/.test(src))
        fail("W4", "useBloomUp does not drive the filter blur-decongest channel (the iOS light-bending decongest is absent)");

    // ── W5 — no mount-flash: the dest is seated-hidden-on-mount (the prime seam) ──────
    // (a) a prime() seam exists.
    const hasPrime = /\bprime\b/.test(src);
    if (!hasPrime)
        fail("W5", "useBloomUp has no prime() seam (the dest must be seated-hidden the moment it mounts — a v-if-mounted dest flashes its full-size frame for ONE paint before bloom() seats it)");
    // (b) the auto-prime is a pre-paint watch on the dest ref (flush:"pre" runs in the
    //     SAME tick the element mounts, before the browser paints).
    const hasAutoPrimeWatch =
        /\bwatch\s*\(\s*dest\b/.test(src) && /flush\s*:\s*["']pre["']/.test(src);
    if (!hasAutoPrimeWatch)
        fail("W5", "useBloomUp has no pre-paint auto-prime (a `watch(dest, …, { flush: \"pre\" })` must seat the dest hidden BEFORE the browser paints — a post-flush prime is one frame too late, the flash survives)");
    // (c) prime seats opacity "0" — the load-bearing leg (the dest shows NOTHING).
    if (hasPrime && !/\.style\.opacity\s*=\s*["']0["']/.test(src))
        fail("W5", "the prime seam does not seat opacity \"0\" (showing NOTHING is the load-bearing no-flash leg — a transform-only prime still flashes the full-size opaque frame)");
}

function checkMotionBarrel(rawBarrel, { fail }) {
    const barrel = stripComments(rawBarrel ?? "");
    if (!/useBloomUp/.test(barrel))
        fail("W3", "the /motion barrel (composables/motion/index.ts) does not re-export useBloomUp (the keyframes-bearing leaf must ship on /motion, never the root)");
}

function checkRootBarrel(rawRoot, { fail }) {
    const rootSrc = stripComments(rawRoot ?? "");
    if (/useBloomUp/.test(rootSrc))
        fail("W3", "useBloomUp leaked onto the ROOT barrel (src/index.ts) — a keyframes-bearing leaf must NEVER ride the vueuse/engine-free root surface (the SCC-trap discipline; it ships on /motion only)");
}

// ── The real run ───────────────────────────────────────────────────────────────────
const fails = [];
const ctx = { fail: (clause, msg) => fails.push(`[${clause}] ${msg}`) };

checkLeaf(read(LEAF), ctx);
checkMotionBarrel(read(MOTION_BARREL), ctx);
checkRootBarrel(read(ROOT_BARREL), ctx);

// ── The self-test bite — synthetic violators MUST each flag the matching clause ─────
{
    // S1 — a leaf that hand-rolls the spring + writes a layout property on the surface
    //      MUST flag W1.
    const s1 = [];
    checkLeaf(
        `
        function prefersReducedMotion() { return false; }
        export function useBloomUp(source, dest, options) {
            function bloom() {
                const el = dest.value;
                el.style.width = "100px";
                el.style.setProperty("padding", "4px");
                requestAnimationFrame(function step(ts) {
                    const velocity = velocity * 0.9;
                });
            }
            return { bloom, reset() {}, blooming: false };
        }
        `,
        { fail: (clause, msg) => s1.push({ clause, msg }) },
    );
    if (!s1.some((f) => f.clause === "W1"))
        fails.push("[SELF-TEST] the synthetic layout-property/hand-rolled-spring leaf did NOT flag W1 (the compositor-only / no-re-fork detector is broken)");

    // S2 — a GEOMETRY-ONLY bloom (no 4th channel) MUST flag W2.
    const s2 = [];
    checkLeaf(
        `
        import { ElementMorph, springTimingFunction } from "@mkbabb/keyframes.js";
        import { springPreset } from "./springPresets";
        function prefersReducedMotion() { return false; }
        export function useBloomUp(source, dest, options) {
            const { response, dampingFraction } = springPreset("snappy");
            let morph = null;
            function bloom() {
                const el = dest.value;
                if (prefersReducedMotion()) { el.style.opacity = "1"; return; }
                morph.apply(el, 1);
                el.style.opacity = "1";
                el.style.filter = \`blur(0px)\`;
            }
            return { bloom, reset() {}, blooming: false };
        }
        `,
        { fail: (clause, msg) => s2.push({ clause, msg }) },
    );
    if (!s2.some((f) => f.clause === "W2"))
        fails.push("[SELF-TEST] the synthetic geometry-only bloom (no 4th channel) did NOT flag W2 (the field-warm detector is broken — the bloom would be paint-blind to the album color)");

    // S3 — a 4th channel painting the BLOOMING SURFACE (dest.style) MUST flag W2.
    const s3 = [];
    checkLeaf(
        `
        import { ElementMorph, springTimingFunction } from "@mkbabb/keyframes.js";
        import { springPreset } from "./springPresets";
        function prefersReducedMotion() { return false; }
        export function useBloomUp(source, dest, options) {
            const fieldHue = options.fieldHue;
            const { response } = springPreset("snappy");
            let morph = null;
            function readHue() { return getComputedStyle(source.value).getPropertyValue("--glass-ambient-hue"); }
            function bloom() {
                const el = dest.value;
                const field = options.field;  // resolved, but ignored below
                if (prefersReducedMotion()) {
                    el.style.opacity = "1";
                    el.style.setProperty("--glass-ambient-strength", "8%");
                    return;
                }
                morph.apply(el, 1);
                el.style.opacity = "1";
                el.style.filter = \`blur(0px)\`;
                el.style.setProperty("--glass-ambient-hue", readHue());
                el.style.setProperty("--glass-ambient-strength", "8%");
            }
            return { bloom, reset() {}, blooming: false };
        }
        `,
        { fail: (clause, msg) => s3.push({ clause, msg }) },
    );
    if (!s3.some((f) => f.clause === "W2"))
        fails.push("[SELF-TEST] the synthetic 4th-channel-on-the-blooming-surface bloom did NOT flag W2 (the compositor-only-floor-on-the-surface detector is broken — a hue paint injected onto the bloomed pixels)");

    // S4 — a root-barrel re-export MUST flag W3.
    const s4 = [];
    checkRootBarrel(`export * from "./composables/motion/useBloomUp";`, {
        fail: (clause, msg) => s4.push({ clause, msg }),
    });
    if (!s4.some((f) => f.clause === "W3"))
        fails.push("[SELF-TEST] the synthetic root-barrel re-export did NOT flag W3 (the SCC-trap off-root detector is broken)");

    // S5 — a still-animating PRM branch MUST flag W3.
    const s5 = [];
    checkLeaf(
        `
        import { ElementMorph, springTimingFunction } from "@mkbabb/keyframes.js";
        import { springPreset } from "./springPresets";
        function prefersReducedMotion() { return false; }
        export function useBloomUp(source, dest, options) {
            const fieldHue = options.fieldHue;
            const { response } = springPreset("snappy");
            const strengthTarget = 8;
            let morph = null;
            function readHue() { return getComputedStyle(source.value).getPropertyValue("--glass-ambient-hue"); }
            function resolveField() { return options.field || null; }
            function bloom() {
                const el = dest.value;
                const field = resolveField();
                field.style.setProperty("--glass-ambient-hue", readHue());
                if (prefersReducedMotion()) {
                    morph.apply(el, 0);
                    requestAnimationFrame(() => {});
                    el.style.opacity = "1";
                    field.style.setProperty("--glass-ambient-strength", strengthTarget + "%");
                    return;
                }
                morph.apply(el, 1);
                el.style.opacity = "1";
                el.style.filter = \`blur(0px)\`;
                field.style.setProperty("--glass-ambient-strength", "8%");
            }
            return { bloom, reset() {}, blooming: false };
        }
        `,
        { fail: (clause, msg) => s5.push({ clause, msg }) },
    );
    if (!s5.some((f) => f.clause === "W3"))
        fails.push("[SELF-TEST] the synthetic still-animating PRM branch did NOT flag W3 (the deterministic-snap detector is broken)");

    // S6 — a leaf with NO prime/auto-prime seam MUST flag W5 (born-RED on the flash).
    const s6 = [];
    checkLeaf(
        `
        import { ElementMorph, springTimingFunction } from "@mkbabb/keyframes.js";
        import { springPreset } from "./springPresets";
        function prefersReducedMotion() { return false; }
        export function useBloomUp(source, dest, options) {
            const fieldHue = options.fieldHue;
            const { response } = springPreset("snappy");
            let morph = null;
            function readHue() { return getComputedStyle(source.value).getPropertyValue("--glass-ambient-hue"); }
            function resolveField() { return options.field || null; }
            function bloom() {
                const el = dest.value;
                const field = resolveField();
                field.style.setProperty("--glass-ambient-hue", readHue());
                if (prefersReducedMotion()) {
                    el.style.opacity = "1";
                    field.style.setProperty("--glass-ambient-strength", "8%");
                    return;
                }
                morph.apply(el, 1);
                el.style.opacity = "1";
                el.style.filter = \`blur(0px)\`;
                field.style.setProperty("--glass-ambient-strength", "8%");
            }
            return { bloom, reset() {}, blooming: false };
        }
        `,
        { fail: (clause, msg) => s6.push({ clause, msg }) },
    );
    if (!s6.some((f) => f.clause === "W5"))
        fails.push("[SELF-TEST] the synthetic no-prime-seam leaf did NOT flag W5 (the seated-hidden-on-mount detector is broken — the 1-frame mount-flash survives)");
}

// ── Verdict ─────────────────────────────────────────────────────────────────────────
if (fails.length) {
    console.error("proof:bloom-up — FAIL");
    for (const f of fails) console.error("  " + f);
    process.exit(1);
}
console.log(
    "proof:bloom-up — PASS (W1 kf-substrate+compositor-only-surface · W2 4th-color-channel-on-the-field+reads-source-hue · W3 Safari-safe+PRM-snap+off-root · W4 3-compositor-channels · W5 no-mount-flash+seated-hidden-on-mount · self-test bites fired)",
);
