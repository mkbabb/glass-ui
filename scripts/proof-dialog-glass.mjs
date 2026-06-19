// proof:dialog-glass — BC.W-DIALOG-GLASS: the glass dialog reads as ACTUAL iOS-27
// liquid glass — partially transparent, warm-cream, catch-light rim, the calm-modal
// ink stays warm (not pure-black), the padding breathes, and ConfirmDialog re-bases
// off its hand-rolled opaque scaffold onto the house `<Dialog surface="glass">`.
//
// CARDINAL SPLIT — this is the SOURCE/MECHANISM arm (`["local","ci"]`). The captured-
// paint truth (the open dialog composites α ≤ 0.70 over a busy backdrop, the heading
// ink is warm not pure-black, the top rim is a catch-light not a dark bar, AA ≥ 4.5:1,
// the re-based ConfirmDialog composites a translucent glass material, both modes +
// WebKit) is tests-visual/dialog-glass.spec.ts (the π arm, orchestrator-driven), NEVER
// this source gate alone.
//
// Five falsifiable device-free SOURCE clauses (each born-RED on the pre-fix tree →
// GREEN at close), each with a self-test bite:
//
//   DG1 — the dialog plate opacity register `--glass-bg-dialog` exists, composed ≤ 0.70
//         via the SELF-RE-POINT recipe (the oklab-tint-wrapped `--glass-bg-dock`
//         precedent), NOT a raw rung override. Born-RED: no `--glass-bg-dialog` at HEAD.
//         Bite: a synthetic 0.80-opacity re-pin REDs (the opacity must be ≤ 0.70).
//   DG2 — the overlay-band `contrast-color()` ink flip is GATED in the @container
//         --glass-backdrop:light bright bucket, NOT the unconditional
//         :where(.glass-floating,.glass-overlay) rule (which blackened the calm modal).
//         Born-RED: the unconditional ink-flip block is present at HEAD. Bite: a
//         synthetic re-added unconditional overlay ink-flip REDs.
//   DG3 — DialogContent.vue re-points onto `--glass-bg-dialog` (re-declares
//         `--glass-bg-floating: var(--glass-bg-dialog)`) AND keeps the floating tier
//         (surfaceClass(..,'floating')) so the edge/rim/under-shadow LIFT survives.
//   DG4 — the overlay golden padding ladder is present (the overlay-pad tokens) AND the
//         close button reads the overlay-pad tokens (no corner-jam at `right-4 top-4`).
//   DG5 — ConfirmDialog.vue composes `<Dialog surface="glass">` and carries NO hand-
//         rolled opaque `bg-card text-card-foreground border` modal scaffold (the de-
//         shadcn A2 re-base). Born-RED: the opaque scaffold present at HEAD. Bite: a
//         synthetic re-added opaque `bg-card` scaffold REDs.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dialog-glass";

const safeRead = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

/** Strip block + line comments so a PROSE mention never matches a live class/rule. */
function strip(src) {
    return src
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/**
 * Pure detector — given the source strings, return { facts, violations }.
 * The sources are passed in so the self-test can inject a fixture (the bites).
 */
export function detectDialogGlass(sources) {
    const { glassTokens, ladderCss, dialogContent, confirmDialog } = sources;
    const tok = strip(glassTokens);
    const lad = strip(ladderCss);
    const dlg = strip(dialogContent);
    const cfm = strip(confirmDialog);

    const facts = {};
    const violations = [];

    // ── DG1 — `--glass-bg-dialog` minted ≤ 0.70 via the self-re-point recipe ──────
    facts.dg1 = {};
    // the dialog opacity primitive exists AND is ≤ 0.70 (the see-through register).
    const opacityMatch = tok.match(/--glass-opacity-dialog:\s*([\d.]+)/);
    facts.dg1.opacity = opacityMatch ? Number(opacityMatch[1]) : null;
    facts.dg1.opacityPresent = facts.dg1.opacity !== null;
    facts.dg1.opacityTransparent =
        facts.dg1.opacity !== null && facts.dg1.opacity <= 0.7;
    // the composed bg token exists AND rides the SELF-RE-POINT oklab recipe (reads the
    // `--glass-opacity-dialog` primitive + the `--glass-tint-source`/-strength wrapper,
    // the `--glass-bg-dock` precedent — NOT a raw literal, NOT a bare `--glass-bg-
    // floating` raw override that won't re-compose).
    const bgBlock =
        tok.match(/--glass-bg-dialog:\s*color-mix\([\s\S]*?\)\s*;/)?.[0] ?? "";
    facts.dg1.bgPresent = bgBlock.length > 0;
    facts.dg1.bgSelfRePoint =
        /color-mix\(\s*in\s+oklab/.test(bgBlock) &&
        /--glass-opacity-dialog\b/.test(bgBlock) &&
        /--glass-tint-source/.test(bgBlock) &&
        /--glass-tint-strength/.test(bgBlock);

    if (!facts.dg1.opacityPresent) {
        violations.push(
            "DG1: `--glass-opacity-dialog` is not minted in tokens/glass.css — the dialog plate has no see-through opacity register",
        );
    } else if (!facts.dg1.opacityTransparent) {
        violations.push(
            `DG1: --glass-opacity-dialog (${facts.dg1.opacity}) must be <= 0.70 (the iOS-27 control-center see-through register) — a re-pin toward the 0.80 floating slab REDs ("NOT glassy at all")`,
        );
    }
    if (!facts.dg1.bgPresent) {
        violations.push(
            "DG1: `--glass-bg-dialog` is not composed in tokens/glass.css — the dialog plate cannot re-point onto a transparent register",
        );
    } else if (!facts.dg1.bgSelfRePoint) {
        violations.push(
            "DG1: `--glass-bg-dialog` must be composed the self-re-point way — `color-mix(in oklab, color-mix(in srgb, --card …--glass-opacity-dialog…), --glass-tint-source --glass-tint-strength)` (the --glass-bg-dock precedent, so the BC.W-ADAPTIVE-RECONCILE darken reaches the modal) — NOT a raw rung override",
        );
    }

    // ── DG2 — the overlay-band ink flip is GATED in the bright bucket ─────────────
    facts.dg2 = {};
    // the bright bucket (@container --glass-backdrop: light, inside @supports contrast-
    // color) lists the overlay band (.glass-floating / .glass-overlay) for the ink flip.
    const brightBucket =
        lad.match(
            /@container\s+style\(--glass-backdrop:\s*light\)\s*\{[\s\S]*?\bcontrast-color\(var\(--card\)\)[\s\S]*?\}\s*\}/,
        )?.[0] ?? "";
    facts.dg2.brightBucketCoversOverlay =
        /\.glass-floating\b/.test(brightBucket) &&
        /\.glass-overlay\b/.test(brightBucket) &&
        /--foreground:\s*contrast-color\(var\(--card\)\)/.test(brightBucket);
    // there is NO UNCONDITIONAL `:where(.glass-floating, .glass-overlay) { … contrast-
    // color(--card) … }` ink-flip block (the retired unconditional flip that blackened
    // the calm modal). We match a :where() selector targeting the overlay band that
    // ALSO carries a `--foreground: contrast-color(...)` declaration directly inside it.
    const overlayWhereBlocks = [
        ...lad.matchAll(
            /:where\(\s*\.glass-floating\s*,\s*\.glass-overlay\s*\)\s*\{([\s\S]*?)\}/g,
        ),
    ];
    const unconditionalInkFlip = overlayWhereBlocks.some((m) =>
        /--foreground:\s*contrast-color\(/.test(m[1]),
    );
    facts.dg2.noUnconditionalInkFlip = !unconditionalInkFlip;

    if (!facts.dg2.brightBucketCoversOverlay) {
        violations.push(
            "DG2: the @container --glass-backdrop:light bright bucket must carry the overlay band's `contrast-color()` ink flip (`.glass-floating, .glass-overlay` listed alongside the content tiers, with `--foreground: contrast-color(var(--card))`) — the gated flip is the single source",
        );
    }
    if (!facts.dg2.noUnconditionalInkFlip) {
        violations.push(
            "DG2: a `:where(.glass-floating, .glass-overlay)` rule still carries an UNCONDITIONAL `--foreground: contrast-color(...)` ink flip — it blackens the calm modal ink to pure-black on a light page. The ink flip belongs ONLY in the bright bucket (the calm modal keeps warm ink)",
        );
    }

    // ── DG3 — DialogContent.vue re-points onto `--glass-bg-dialog`, keeps floating ──
    facts.dg3 = {};
    // the re-declare of the composed floating bg onto the dialog token (the self-re-point
    // — an inline style or a CSS var write of `--glass-bg-floating: var(--glass-bg-dialog)`).
    facts.dg3.rePoints =
        /--glass-bg-floating['"`\s]*:\s*['"`\s]*var\(--glass-bg-dialog\)/.test(
            dlg,
        );
    // the floating tier LIFT is kept (surfaceClass(.., 'floating') so edge/rim/under-shadow survive).
    facts.dg3.keepsFloating = /surfaceClass\(\s*props\.surface\s*,\s*['"`]floating['"`]\s*\)/.test(
        dlg,
    );

    if (!facts.dg3.rePoints) {
        violations.push(
            "DG3: DialogContent.vue must re-declare `--glass-bg-floating: var(--glass-bg-dialog)` on the dialog scope (the self-re-point — so the base `.glass-floating` rule resolves the transparent dialog plate)",
        );
    }
    if (!facts.dg3.keepsFloating) {
        violations.push(
            "DG3: DialogContent.vue must keep `surfaceClass(props.surface, 'floating')` — the floating tier's edge/rim/under-shadow LIFT must survive the transparency drop (the modal floats off the scrim)",
        );
    }

    // ── DG4 — the overlay padding ladder + the close-button overlay-pad tokens ────
    facts.dg4 = {};
    // the overlay golden padding ladder tokens are present (the BB.W-CARD-PAD anchor).
    facts.dg4.padLadder =
        /--overlay-pad-inline/.test(dlg) &&
        /--overlay-pad-block/.test(dlg) &&
        /px-\(--overlay-pad-inline\)/.test(dlg) &&
        /py-\(--overlay-pad-block\)/.test(dlg);
    // the close button reads the overlay-pad tokens (no `right-4 top-4` corner-jam at the new pad).
    facts.dg4.closeReadsPad =
        /right-\(--overlay-pad-inline\)/.test(dlg) &&
        /top-\(--overlay-pad-block\)/.test(dlg);
    facts.dg4.noCornerJam = !/right-4\s+top-4/.test(dlg);

    if (!facts.dg4.padLadder) {
        violations.push(
            "DG4: DialogContent.vue must carry the overlay golden padding ladder (the `--overlay-pad-inline`/`--overlay-pad-block` tokens on `px-(--overlay-pad-inline) py-(--overlay-pad-block)`) — the heading must clear the top edge",
        );
    }
    if (!(facts.dg4.closeReadsPad && facts.dg4.noCornerJam)) {
        violations.push(
            "DG4: the close button must read the overlay-pad tokens (`right-(--overlay-pad-inline) top-(--overlay-pad-block)`), NOT the `right-4 top-4` corner-jam (16px collides with the 24px inline / ~30.5px block overlay pad)",
        );
    }

    // ── DG5 — ConfirmDialog re-bases onto <Dialog surface="glass">, no opaque scaffold ──
    facts.dg5 = {};
    // composes the house Dialog glass surface.
    facts.dg5.composesGlassDialog =
        /<DialogContent\b[\s\S]*?surface=['"`]glass['"`]/.test(cfm) ||
        /surface=['"`]glass['"`][\s\S]*?<DialogContent/.test(cfm) ||
        (/surface=['"`]glass['"`]/.test(cfm) && /<Dialog\b/.test(cfm));
    facts.dg5.importsHouseDialog =
        /import\s*\{[^}]*\bDialogContent\b[^}]*\}\s*from\s*['"`][^'"`]*ui\/dialog['"`]/.test(
            cfm,
        );
    // NO hand-rolled opaque modal scaffold (`bg-card text-card-foreground border` panel +
    // the `bg-overlay-scrim` backdrop the prior scaffold hand-rolled).
    facts.dg5.noOpaqueScaffold =
        !/(?<![\w-])bg-card(?![\w-/])/.test(cfm) &&
        !/(?<![\w-])text-card-foreground(?![\w-])/.test(cfm) &&
        !/(?<![\w-])bg-overlay-scrim(?![\w-])/.test(cfm);

    if (!facts.dg5.composesGlassDialog) {
        violations.push(
            'DG5: ConfirmDialog.vue must compose `<Dialog surface="glass">` (the house DialogContent on the glass surface) — the de-shadcn A2 material-first re-base',
        );
    }
    if (!facts.dg5.importsHouseDialog) {
        violations.push(
            "DG5: ConfirmDialog.vue must import DialogContent from the house ui/dialog (reka behavior + the house glass material own the modal)",
        );
    }
    if (!facts.dg5.noOpaqueScaffold) {
        violations.push(
            "DG5: ConfirmDialog.vue still hand-rolls the OPAQUE modal scaffold (`bg-card text-card-foreground border` / `bg-overlay-scrim`) — the clean break DELETES it (no opaque-confirm-dialog fork); the modal reads the SAME warm-cream translucent glass material",
        );
    }

    return { facts, violations };
}

function run() {
    const sources = {
        glassTokens: safeRead("src/styles/tokens/glass.css"),
        ladderCss: safeRead("src/styles/glass/ladder.css"),
        dialogContent: safeRead("src/components/ui/dialog/DialogContent.vue"),
        confirmDialog: safeRead(
            "src/components/custom/confirm-dialog/ConfirmDialog.vue",
        ),
    };

    const { facts, violations } = detectDialogGlass(sources);

    // ── SELF-TEST BITES — inject fixtures and assert the clauses RED on them ──────
    const selfTest = {};

    // DG1 bite: a synthetic 0.80-opacity re-pin REDs (the see-through bar has teeth).
    const dg1Bite = detectDialogGlass({
        ...sources,
        glassTokens: sources.glassTokens.replace(
            /--glass-opacity-dialog:\s*[\d.]+/,
            "--glass-opacity-dialog: 0.80",
        ),
    });
    selfTest.dg1OpacityBiteRed = dg1Bite.violations.some((v) =>
        v.startsWith("DG1:"),
    );

    // DG2 bite: a synthetic re-added unconditional overlay ink-flip REDs.
    const dg2Bite = detectDialogGlass({
        ...sources,
        ladderCss:
            sources.ladderCss +
            "\n/* synthetic */ :where(.glass-floating, .glass-overlay) { --foreground: contrast-color(var(--card)); }\n",
    });
    selfTest.dg2UnconditionalBiteRed = dg2Bite.violations.some((v) =>
        v.startsWith("DG2:"),
    );

    // DG5 bite: a synthetic re-added opaque `bg-card` scaffold REDs.
    const dg5Bite = detectDialogGlass({
        ...sources,
        confirmDialog:
            sources.confirmDialog +
            '\n<template><div class="bg-card text-card-foreground border"></div></template>\n',
    });
    selfTest.dg5OpaqueBiteRed = dg5Bite.violations.some((v) =>
        v.startsWith("DG5:"),
    );

    const biteFailures = [];
    if (!selfTest.dg1OpacityBiteRed)
        biteFailures.push(
            "SELF-TEST: the DG1 0.80-opacity re-pin bite did NOT red — the see-through bar has no teeth",
        );
    if (!selfTest.dg2UnconditionalBiteRed)
        biteFailures.push(
            "SELF-TEST: the DG2 unconditional-ink-flip bite did NOT red — the gated-flip bar has no teeth",
        );
    if (!selfTest.dg5OpaqueBiteRed)
        biteFailures.push(
            "SELF-TEST: the DG5 opaque-scaffold bite did NOT red — the material-first re-base bar has no teeth",
        );
    violations.push(...biteFailures);
    facts.selfTest = selfTest;

    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GATE_DIALOG_GLASS_OUT",
        "BC-dialog-glass",
    );
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dialog-glass",
        severity: "blocker",
        command: COMMAND,
        note: "SOURCE arm only — the captured-paint truth (α ≤ 0.70 over a busy backdrop, warm not pure-black heading ink, the catch-light rim, AA ≥ 4.5:1, the re-based ConfirmDialog glass material, both modes + WebKit) is tests-visual/dialog-glass.spec.ts (the π arm, orchestrator-driven), never this gate alone.",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:dialog-glass — the glass dialog reads as ACTUAL iOS-27 liquid glass (BC.W-DIALOG-GLASS)",
    );
    console.log(
        `  DG1 --glass-bg-dialog ≤0.70 self-re-point: ${yn(
            facts.dg1.opacityPresent &&
                facts.dg1.opacityTransparent &&
                facts.dg1.bgPresent &&
                facts.dg1.bgSelfRePoint,
        )}  (opacity=${facts.dg1.opacity})`,
    );
    console.log(
        `  DG2 overlay ink-flip GATED in bright bucket: ${yn(
            facts.dg2.brightBucketCoversOverlay &&
                facts.dg2.noUnconditionalInkFlip,
        )}`,
    );
    console.log(
        `  DG3 DialogContent re-points + keeps floating: ${yn(
            facts.dg3.rePoints && facts.dg3.keepsFloating,
        )}`,
    );
    console.log(
        `  DG4 overlay pad ladder + close reads pad   : ${yn(
            facts.dg4.padLadder &&
                facts.dg4.closeReadsPad &&
                facts.dg4.noCornerJam,
        )}`,
    );
    console.log(
        `  DG5 ConfirmDialog <Dialog surface=glass>   : ${yn(
            facts.dg5.composesGlassDialog &&
                facts.dg5.importsHouseDialog &&
                facts.dg5.noOpaqueScaffold,
        )}`,
    );
    console.log(
        `  self-test bites (DG1/DG2/DG5) red          : ${yn(
            selfTest.dg1OpacityBiteRed &&
                selfTest.dg2UnconditionalBiteRed &&
                selfTest.dg5OpaqueBiteRed,
        )}`,
    );

    if (violations.length > 0) {
        console.error("\nVIOLATIONS:");
        for (const v of violations) console.error(`  ✗ ${v}`);
        console.error(
            `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(
                ROOT.length + 1,
            )}`,
        );
        process.exit(1);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
