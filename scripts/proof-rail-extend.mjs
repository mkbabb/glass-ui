#!/usr/bin/env node
// AZ.W-RAIL-EXTEND — proof:rail-extend, the born-RED hairline-rail structural gate.
//
// The net-new `<DockRail>` facility: a hairline that runs BEYOND the dock edge with a
// leading/trailing end-icon switching the dock's layer context, rendered as a GlassDock
// `#rail` chrome slot so it survives collapse. This gate is the device-free STRUCTURAL
// half (R1-R4 + the ≥2-consumer census); the HG1/HG2 RUNTIME truths (the
// hairline-beyond-edge overrun visible, the end-icon swapping the rendered layer, the
// persistence-on-collapse) are the local-only π half captured to W-RAIL-EXTEND-DELTA.md
// and backstopped on CI by proof:live-verified-ledger.
//
// PURE DEVICE-FREE static src-scan (source + DOM-template scans, no browser, no GPU).
// Runs on EVERY runner → carries `tags: ["local","ci","release"]` (the AY W-LIVE1
// runner-truth disposition: a static source-scan gate is NOT in JUSTIFIED_LOCAL_ONLY).
//
// CLAUSES:
//   R1 — the facility composes `box-shadow: var(--border-hairline)` for the hairline
//        (the 0.5px catch-light + under-shadow token pair); it carries NO hard
//        `border: 1px solid` rule on the hairline. RED on a hand-edit to a hard rule.
//   R2 — the end-icon writes ONE of two SANCTIONED seams and NOT a third: (i) the
//        injected DockLayerGroup `active` model, OR (ii) a consumer-owned
//        `v-model:context` (a `defineModel("context")`). R2 REDs ONLY on a THIRD path —
//        an INTERNAL standalone `ref()`/`reactive()`/`useState` the facility OWNS that
//        shadows the layer/active state. The `defineModel` context fork is LEGITIMATE
//        (the consumer's ref), so R2 does NOT false-RED a DockLayerGroup-less dock.
//   R3 — `extent="beyond"` overruns the dock content box: the `--dock-rail-extend-length`
//        rule is present (the geometry knob) AND the hairline's painted length composes
//        it (the `min-inline-size`/`min-block-size` overrun).
//   R4 — the facility renders OUTSIDE the dock's CONTAINMENT box (R4-1): GlassDock
//        carries a `#rail` chrome slot rendered as a SIBLING of `.glass-dock` inside a
//        `.glass-dock-frame` (a `display:contents` shell that lifts to a
//        non-clipping positioning context when `data-has-rail`), and the
//        `.dock-hairline-slot` wrapper is `position: absolute`. A dock CHILD is
//        hard-clipped by `contain: paint` + `backdrop-filter` (+ overflow) regardless of
//        overflow — the cause of the R4-1 "black blob clipped at the dock edge".
//   R5 (consumers) — ≥2 LIVE `<DockRail>` mounts in demo/ (born-RED if <2).
//   R6 (shell witness) — the demo SHELL dock (SidebarDock.vue, the user's truth surface)
//        mounts a LIVE <DockRail> (the R4-1 re-open: a story-only census masked the
//        broken shell rail).
//
// Bite-check: swap the hairline `box-shadow: var(--border-hairline)` for
// `border: 1px solid` → R1 RED; add an internal `ref()` active shadow to DockRail.vue
// → R2 RED; delete the `--dock-rail-extend-length` rule → R3 RED; remove the
// `.glass-dock-frame` escape context → R4 RED; remove a demo mount → R5 RED; drop the
// rail from SidebarDock.vue → R6 RED.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripComments(text, kind) {
    let out = text
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(m.length - p1.length));
    if (kind === "vue") {
        out = out.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));
    }
    return out;
}

function walk(dir, exts, acc) {
    for (const name of readdirSync(dir)) {
        if (name === "node_modules" || name === "dist" || name.startsWith(".")) continue;
        const full = join(dir, name);
        const st = statSync(full);
        if (st.isDirectory()) walk(full, exts, acc);
        else if (exts.some((e) => name.endsWith(e))) acc.push(full);
    }
    return acc;
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        DOCK_RAIL: resolve(ROOT, "src/components/custom/dock/DockRail.vue"),
        RAIL_CSS: resolve(ROOT, "src/styles/dock/rail-extend.css"),
        GLASSDOCK: resolve(ROOT, "src/components/custom/dock/GlassDock.vue"),
        DEMO: resolve(ROOT, "demo"),
        ARTIFACT: gateArtifactPath("GLASS_UI_RAIL_EXTEND_ARTIFACT", "AZ-rail-extend"),
    };
    return _cliPaths;
}

/**
 * The PURE detector (injected) — exported so a born-RED self-test can feed a synthetic
 * hard-rule / internal-ref / mis-placed-slot and assert exit 1.
 *
 * @param {object} fs { dockRailText, railCssText, glassDockText, demoFiles: [{path,text}] }
 */
export function detectRailExtend(fs) {
    const violations = [];
    const facts = {};

    const rail = stripComments(fs.dockRailText ?? "", "vue");
    const css = stripComments(fs.railCssText ?? "", "code");
    const gd = stripComments(fs.glassDockText ?? "", "vue");

    // ── R1 — the hairline composes `--border-hairline`, NO hard `1px solid` rule ──
    const composesHairlineToken = /box-shadow:\s*var\(--border-hairline\)/.test(css);
    // A hard rule on the hairline: a `border: <n>px solid` on a `.dock-hairline*`
    // selector. We scan the rail CSS for any `border:` with a `solid`/explicit-px on
    // the hairline pseudo/element (the facility's own surface).
    const hasHardHairlineBorder =
        /\.dock-hairline-extend(?:[^{]*)?\{[^}]*border:\s*[^;]*\bsolid\b/.test(css) ||
        /\.dock-hairline-extend(?:[^{]*)?::before\s*\{[^}]*border:\s*[^;]*\bsolid\b/.test(
            css,
        );
    facts.r1ComposesHairlineToken = composesHairlineToken;
    facts.r1HasHardHairlineBorder = hasHardHairlineBorder;
    if (!composesHairlineToken) {
        violations.push(
            "R1: the hairline does NOT compose `box-shadow: var(--border-hairline)` in rail-extend.css — the facility must read the 0.5px catch-light + under-shadow token pair (no new tokens, no hard rule)",
        );
    }
    if (hasHardHairlineBorder) {
        violations.push(
            "R1: a hard `border: …px solid` rule paints the `.dock-hairline-extend` hairline — it must be the `--border-hairline` whisper, NOT a hard rule",
        );
    }

    // ── R2 — the end-icon writes a sanctioned seam, NOT an internal ref-shadow ──
    // Sanctioned: a `defineModel("context")` (the consumer-owned v-model fork) OR an
    // injected DockLayerGroup `active` (useDockLayerGroupContext + a write). The THIRD
    // illegitimate path: an internal `ref(…)`/`reactive(…)` the facility OWNS that
    // names the active/context/layer state (a parallel active store).
    const hasContextModel =
        /defineModel\s*(?:<[^>]*>)?\s*\(\s*["']context["']/.test(rail);
    const injectsGroupActive = /useDockLayerGroupContext|DOCK_LAYER_GROUP_KEY/.test(
        rail,
    );
    // The illegitimate internal active-state store: a `ref(`/`reactive(` assigned to a
    // const whose name reads as active/context/layer state — the parallel shadow R2
    // forbids. `defineModel` is NOT a ref() call (it is the consumer's model), so it is
    // excluded by construction.
    const internalActiveShadow =
        /\bconst\s+\w*(?:active|context|layer|current)\w*\s*=\s*(?:ref|reactive|shallowRef)\s*\(/i.test(
            rail,
        );
    facts.r2HasContextModel = hasContextModel;
    facts.r2InjectsGroupActive = injectsGroupActive;
    facts.r2InternalActiveShadow = internalActiveShadow;
    if (!hasContextModel && !injectsGroupActive) {
        violations.push(
            "R2: DockRail binds NEITHER sanctioned seam — it must expose a consumer-owned `defineModel(\"context\")` OR inject the DockLayerGroup `active` model (one registry, not a parallel state path)",
        );
    }
    if (internalActiveShadow) {
        violations.push(
            "R2: DockRail owns an INTERNAL `ref()`/`reactive()` active/context/layer store — the THIRD illegitimate path that shadows the layer registry. Write the consumer-owned `v-model:context` or the injected group `active`, never an internal shadow",
        );
    }

    // ── R3 — the `extent="beyond"` overrun: the `--dock-rail-extend-length` rule ──
    const definesExtendToken = /--dock-rail-extend-length\s*:/.test(css);
    const overrunUsesToken =
        /min-(?:inline|block)-size:\s*var\(--dock-rail-extend-length\)/.test(css);
    const railDefaultsBeyond = /extent[^}]*?["']beyond["']/.test(rail);
    facts.r3DefinesExtendToken = definesExtendToken;
    facts.r3OverrunUsesToken = overrunUsesToken;
    facts.r3RailDefaultsBeyond = railDefaultsBeyond;
    if (!definesExtendToken) {
        violations.push(
            "R3: the `--dock-rail-extend-length` extent token is not defined in rail-extend.css — the beyond-edge overrun geometry knob is missing",
        );
    }
    if (!overrunUsesToken) {
        violations.push(
            "R3: the hairline's painted length does not compose `var(--dock-rail-extend-length)` (no `min-inline-size`/`min-block-size` overrun) — `extent=\"beyond\"` must overrun the dock content box",
        );
    }
    if (!railDefaultsBeyond) {
        violations.push(
            'R3: DockRail.vue does not default `extent` to "beyond" — the beyond-edge extent is the facility default',
        );
    }

    // ── R4 — the `#rail` chrome slot renders OUTSIDE the dock's CONTAINMENT box ──
    // R4-1 ARCHITECTURE: the `.glass-dock` root carries `contain: paint` +
    // `backdrop-filter` (+ a vertical always-expanded rail's `overflow-y: auto`) — all
    // three HARD-CLIP descendants to the dock box, so a `#rail` rendered as a dock CHILD
    // can NEVER paint past the edge (it was swallowed at the bottom — the "black blob").
    // The escape: GlassDock renders the `#rail` slot as a SIBLING of `.glass-dock` inside
    // a `.glass-dock-frame` (a `display:contents` shell that lifts to a NON-clipping
    // positioning context when `data-has-rail`). So R4 now asserts: GlassDock carries a
    // `name="rail"` slot guarded by `hasRail` (the `useSlots().rail` computed) + the
    // `.dock-hairline-slot` wrapper; the slot is a SIBLING of `.glass-dock` (NOT inside
    // it); the railshell escape-context exists; and the slot is `position: absolute`.
    const hasRailSlot =
        (/hasRail/.test(gd) || /\$slots\.rail/.test(gd)) && /name="rail"/.test(gd);
    const hasRailSlotWrapper = /class="dock-hairline-slot"/.test(gd);
    // The railshell escape context — the `.glass-dock-frame` wrapper that becomes a
    // non-clipping positioning context, so the abs slot anchors to the dock box yet
    // escapes the dock's containment.
    const hasRailshell =
        /class="glass-dock-frame"/.test(gd) &&
        /\.glass-dock-frame\[data-has-rail\]/.test(css);
    // Sibling-of-the-dock: the `dock-hairline-slot` markup appears AFTER the `dock-layers`
    // block (the last layer pane is `dock-layer--summary`), i.e. it is NOT interleaved
    // among the layer panes inside `.glass-dock`. With the railshell architecture the
    // slot is a sibling of `.glass-dock` itself (an even stronger escape), still after the
    // summary pane.
    const slotIdx = gd.indexOf("dock-hairline-slot");
    const lastLayerIdx = gd.lastIndexOf("dock-layer--summary");
    const slotIsSibling = slotIdx > -1 && lastLayerIdx > -1 && slotIdx > lastLayerIdx;
    const slotEscapesClip = /\.dock-hairline-slot\s*\{[^}]*position:\s*absolute/.test(css);
    facts.r4HasRailSlot = hasRailSlot;
    facts.r4HasRailSlotWrapper = hasRailSlotWrapper;
    facts.r4HasRailshell = hasRailshell;
    facts.r4SlotIsSibling = slotIsSibling;
    facts.r4SlotEscapesClip = slotEscapesClip;
    if (!hasRailSlot || !hasRailSlotWrapper) {
        violations.push(
            "R4: GlassDock.vue lacks the `#rail` chrome slot (`hasRail`/`$slots.rail` guard + `name=\"rail\"` + `.dock-hairline-slot` wrapper) — the persistence-on-collapse facility needs a slot rendered outside the dock containment box",
        );
    }
    if (!hasRailshell) {
        violations.push(
            "R4: the `.glass-dock-frame` escape context is absent (the wrapper + the `[data-has-rail]` non-clipping rule) — without it the rail is a dock child clipped by `contain: paint`/`backdrop-filter`/`overflow` (the R4-1 black-blob)",
        );
    }
    if (!slotIsSibling) {
        violations.push(
            "R4: the `.dock-hairline-slot` is NOT a sibling of the dock content (it sits inside the clip aperture) — it would vanish on collapse / clip at the edge; render it OUTSIDE `.glass-dock` in the railshell",
        );
    }
    if (!slotEscapesClip) {
        violations.push(
            "R4: `.dock-hairline-slot` does not escape via `position: absolute` in rail-extend.css — the chrome slot must anchor to the railshell, not be clipped by the dock's containment",
        );
    }

    // ── R5 — the ≥2 live consumer census ──
    const mounts = [];
    for (const f of fs.demoFiles) {
        const live = stripComments(f.text, f.path.endsWith(".vue") ? "vue" : "code");
        // A LIVE mount: a `<DockRail` element open tag in template markup.
        const count = (live.match(/<DockRail\b/g) ?? []).length;
        if (count > 0) mounts.push({ path: f.path, count });
    }
    const totalMounts = mounts.reduce((a, m) => a + m.count, 0);
    const consumerFiles = mounts.length;
    facts.r5ConsumerFiles = mounts.map((m) => m.path).sort();
    facts.r5TotalMounts = totalMounts;
    if (consumerFiles < 2) {
        violations.push(
            `R5 (consumers): only ${consumerFiles} LIVE <DockRail> consumer file(s) in demo/ (${facts.r5ConsumerFiles.join(", ") || "none"}) — the ≥2-consumer bar is binding on a primitive birth; a single-consumer primitive is substrate-without-consumer and is NOT born`,
        );
    }

    // ── R6 (shell witness) — the SHELL dock mounts the rail (R4-1) ──
    // The user audits the demo SHELL, not the story mounts. The W-RAIL-EXTEND row
    // RE-OPENED because the shell rail was broken (the black-blob clip) while a story
    // mount "passed". So R6 binds the rail to the SHELL surface: `demo/layout/SidebarDock.vue`
    // (the vertical category rail) MUST carry a LIVE `<DockRail>` mount. A story-only
    // census can no longer mask a broken shell rail.
    const SHELL_PATH = "demo/layout/SidebarDock.vue";
    const shellMounts = mounts.find((m) => m.path === SHELL_PATH);
    const shellWitness = !!shellMounts && shellMounts.count > 0;
    facts.r6ShellWitness = shellWitness;
    facts.r6ShellPath = SHELL_PATH;
    if (!shellWitness) {
        violations.push(
            `R6 (shell witness): the demo SHELL dock \`${SHELL_PATH}\` does NOT mount a live <DockRail> — the user audits the shell, not the story mounts; the rail must be present on the truth surface (the R4-1 re-open: a story-only census masked the broken shell rail)`,
        );
    }

    return { violations, facts };
}

function loadFs() {
    const P = cliPaths();
    const demoCode = existsSync(P.DEMO) ? walk(P.DEMO, [".vue"], []) : [];
    const read = (f) => ({ path: relative(P.ROOT, f), text: readFileSync(f, "utf8") });
    return {
        dockRailText: existsSync(P.DOCK_RAIL) ? readFileSync(P.DOCK_RAIL, "utf8") : "",
        railCssText: existsSync(P.RAIL_CSS) ? readFileSync(P.RAIL_CSS, "utf8") : "",
        glassDockText: existsSync(P.GLASSDOCK) ? readFileSync(P.GLASSDOCK, "utf8") : "",
        demoFiles: demoCode.map(read),
    };
}

function run() {
    const P = cliPaths();
    const fs = loadFs();
    const { violations, facts } = detectRailExtend(fs);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:rail-extend",
        facts,
        violations,
    });

    console.log(
        "proof:rail-extend — the hairline-rail-beyond-dock facility gate (AZ.W-RAIL-EXTEND)",
    );
    console.log(
        `  R1 hairline token, no hard rule : composes=${facts.r1ComposesHairlineToken} hardBorder=${facts.r1HasHardHairlineBorder} ${facts.r1ComposesHairlineToken && !facts.r1HasHardHairlineBorder ? "OK" : "RED"}`,
    );
    console.log(
        `  R2 sanctioned seam, no shadow   : contextModel=${facts.r2HasContextModel} injectsGroup=${facts.r2InjectsGroupActive} internalShadow=${facts.r2InternalActiveShadow} ${(facts.r2HasContextModel || facts.r2InjectsGroupActive) && !facts.r2InternalActiveShadow ? "OK" : "RED"}`,
    );
    console.log(
        `  R3 beyond-edge overrun          : token=${facts.r3DefinesExtendToken} overrun=${facts.r3OverrunUsesToken} default=${facts.r3RailDefaultsBeyond} ${facts.r3DefinesExtendToken && facts.r3OverrunUsesToken && facts.r3RailDefaultsBeyond ? "OK" : "RED"}`,
    );
    console.log(
        `  R4 slot escapes containment     : slot=${facts.r4HasRailSlot} railshell=${facts.r4HasRailshell} sibling=${facts.r4SlotIsSibling} escapes=${facts.r4SlotEscapesClip} ${facts.r4HasRailSlot && facts.r4HasRailshell && facts.r4SlotIsSibling && facts.r4SlotEscapesClip ? "OK" : "RED"}`,
    );
    console.log(
        `  R5 ≥2 live consumers            : files=[${facts.r5ConsumerFiles.join(", ")}] mounts=${facts.r5TotalMounts} ${facts.r5ConsumerFiles.length >= 2 ? "OK" : "RED"}`,
    );
    console.log(
        `  R6 shell-mount witness          : shell=${facts.r6ShellPath} mounted=${facts.r6ShellWitness} ${facts.r6ShellWitness ? "OK" : "RED"}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${relative(P.ROOT, P.ARTIFACT)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
