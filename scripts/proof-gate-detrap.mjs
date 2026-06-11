// AX.W63 — proof:gate-detrap, the gate-pattern DE-TRAP gate (pure FS string-scan
// — device-free SOURCE arm; the not-trapped PAINTED truth is proven by the π live
// arm the orchestrator runs, NEVER a text gate alone).
//
// THE DEFECT (pass-3 Q8 BLOCKER, USER-DEFECTS-2026-06-08-pass3.md:33):
//   `/compositions/gate-pattern` mounted a full-viewport non-dismissable modal ON
//   MOUNT (`open = ref(true)`) whose every dismissal channel was suppressed
//   (`:show-close="false"` + `@escape-key-down.prevent` + `@interact-outside.prevent`
//   + `@pointer-down-outside.prevent`) — so a visitor navigating to the route was
//   held hostage, escapable only by typing the magic key `"wolfpack"`. The demo
//   LITERALLY gated you from the page. And the manifest blurb leaked a tranche code
//   (`(AW.W18)`) the `.vue`-scoped proof:story-language never opens manifest.ts.
//
// THE DE-TRAP THIS GATE LOCKS (born-RED at HEAD 89edffc):
//   A. NO ON-MOUNT OPEN — gate-pattern.vue has NO `open = ref(true)` (the modal
//      does not open the instant the route mounts; the visitor reaches the page).
//   B. CONTAINED GLASS-CARD PREVIEW FRAME — the gate demonstration renders inside a
//      bounded `<Card>` / `.glass-card` preview frame (the W54 glass-first default,
//      the W56 squircle where befitting), NOT a raw top-layer-portal Dialog with no
//      containing card. A `max-w-*` glass card bounds the preview to a region.
//   C. ON-DEMAND TRIGGER + REACHABLE ESCAPE — an explicit on-page `<Button>` opens
//      the modal demo on demand (the visitor controls it), and the page chrome stays
//      reachable (the contained preview never auto-traps the viewport).
//   D. IDIOM PRESERVED (the demo still TEACHES) — `:show-close="false"` + the three
//      `@escape-key-down.prevent` / `@interact-outside.prevent` /
//      `@pointer-down-outside.prevent` are STILL present (inside the contained
//      preview). The de-trap is STRUCTURAL, not an idiom strip: a de-trap that
//      DELETED the suppression would no longer demonstrate the non-dismissable
//      pattern the story exists to teach.
//   E. BLURB LANGUAGE-CLEAN — the gate-pattern manifest row blurb carries NO
//      `\b[A-Z]{1,2}\.W\d` tranche code (the `(AW.W18)` leak is gone; W58's
//      `.ts`-scope amend stays GREEN over the re-stated blurb).
//
// BITE (the §HardGate RED witnesses): re-add `open = ref(true)` → A reds; drop the
// `<Card>`/`.glass-card` frame so the Dialog portals raw → B reds; remove the
// on-page trigger `<Button>` → C reds; strip a `@*.prevent` / `:show-close` → D reds
// (the over-correction guard — the demo must still teach the pattern); re-inject a
// tranche code into the gate-pattern blurb → E reds.

import { existsSync, readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const GATE_SFC = resolve(ROOT, "demo/stories/compositions/gate-pattern.vue");
const MANIFEST = resolve(ROOT, "demo/stories/manifest.ts");

// A tranche/wave/defect code — the meta-language the consumer-facing blurb must
// not leak (same shape as proof:story-language's `tranche-code` pattern, incl. the
// §-suffixed forms via the bare `\b[A-Z]{1,2}\.W\d` prefix).
const TRANCHE_CODE = /\b[A-Z]{1,2}\.W\d/;

/**
 * Extract the gate-pattern manifest ROW's blurb string (the 4th arg of the
 * `s("compositions", "gate-pattern", "Gate Pattern", "<blurb>")` factory call).
 * Returns null if the row is not found. Pure given the source string.
 */
export function gatePatternBlurb(manifestSrc) {
    // Match the s(...) row for the gate-pattern id and capture the 4th-arg string.
    // The blurb is a double-quoted literal that may contain escaped backtick-wrapped
    // code spans; it runs to the closing quote before `)`.
    // The optional trailing comma: prettier formats the multi-line s(...) call
    // with one, and the blurb's identity is unchanged by it.
    const re =
        /s\(\s*"compositions"\s*,\s*"gate-pattern"\s*,\s*"[^"]*"\s*,\s*"((?:[^"\\]|\\.)*)"\s*,?\s*\)/;
    const m = manifestSrc.match(re);
    return m ? m[1] : null;
}

/** The pure detector over the injected SFC + manifest source strings. */
export function detect(sfcSrc, manifestSrc) {
    const violations = [];
    const facts = {};

    // ── A. NO ON-MOUNT OPEN ─────────────────────────────────────────────────
    // The headline: the modal must not open the instant the route mounts. A
    // `const open = ref(true)` (any whitespace) is the on-mount-open signature.
    const onMountOpen = /\bopen\s*=\s*ref\(\s*true\s*\)/.test(sfcSrc);
    facts.onMountOpen = onMountOpen;
    if (onMountOpen) {
        violations.push(
            "gate-pattern.vue opens the modal ON MOUNT (`open = ref(true)`) — the visitor is trapped on the route; start the preview closed/non-modal and open the demo on demand",
        );
    }

    // ── B. CONTAINED GLASS-CARD PREVIEW FRAME ───────────────────────────────
    // The gate demonstration renders inside a bounded glass-card frame (the W54
    // glass-first default). A `<Card` component host OR a `.glass-card` class is
    // the contained frame; the bare top-layer-portal Dialog with no containing
    // card is the RED at HEAD.
    const hasCard = /<Card\b/.test(sfcSrc);
    const hasGlassCardClass = /\bglass-card\b/.test(sfcSrc);
    facts.hasCardFrame = hasCard;
    facts.hasGlassCardClass = hasGlassCardClass;
    if (!hasCard && !hasGlassCardClass) {
        violations.push(
            "gate-pattern.vue has NO bounded glass-card preview frame (`<Card>` / `.glass-card`) — the demonstration must render INSIDE a contained glass card, not a raw top-layer Dialog over the whole viewport",
        );
    }

    // ── C. ON-DEMAND TRIGGER + REACHABLE PAGE ───────────────────────────────
    // An explicit on-page `<Button>` opens the modal demo on demand (the visitor
    // controls the preview). At least one Button must drive an `open = true` /
    // toggle handler (the demo trigger) so the preview is opened ON DEMAND, never
    // auto on mount. We assert (1) a Button exists and (2) a handler sets `open`
    // to true somewhere (the on-demand open path).
    const hasButton = /<Button\b/.test(sfcSrc);
    const opensOnDemand = /\bopen\.value\s*=\s*true\b/.test(sfcSrc);
    facts.hasButton = hasButton;
    facts.opensOnDemand = opensOnDemand;
    if (!hasButton) {
        violations.push(
            "gate-pattern.vue has NO on-page <Button> — the modal demo must be opened on demand by an explicit trigger, not auto on mount",
        );
    }
    if (!opensOnDemand) {
        violations.push(
            "gate-pattern.vue never sets `open.value = true` from a handler — the modal demo must open ON DEMAND (an explicit trigger path), so the visitor controls the preview",
        );
    }

    // ── D. IDIOM PRESERVED (the demo still TEACHES) ─────────────────────────
    // The de-trap is structural, not an idiom strip. The suppressed dismissal
    // channels — the very pattern the story demonstrates — stay present inside the
    // contained preview. (Guards the over-correction: a de-trap that DELETED the
    // suppression would no longer teach the non-dismissable-modal idiom.)
    const showCloseFalse = /:show-close="false"/.test(sfcSrc);
    const escapePrevent = /@escape-key-down\.prevent/.test(sfcSrc);
    const interactPrevent = /@interact-outside\.prevent/.test(sfcSrc);
    const pointerPrevent = /@pointer-down-outside\.prevent/.test(sfcSrc);
    facts.idiom = {
        showCloseFalse,
        escapePrevent,
        interactPrevent,
        pointerPrevent,
    };
    if (!showCloseFalse) {
        violations.push(
            "gate-pattern.vue dropped `:show-close=\"false\"` — the suppressed close-X is the idiom the demo teaches; keep it inside the contained preview",
        );
    }
    if (!escapePrevent) {
        violations.push(
            "gate-pattern.vue dropped `@escape-key-down.prevent` — the suppressed esc is the idiom the demo teaches; keep it inside the contained preview",
        );
    }
    if (!interactPrevent) {
        violations.push(
            "gate-pattern.vue dropped `@interact-outside.prevent` — the suppressed focus-loss is the idiom the demo teaches; keep it inside the contained preview",
        );
    }
    if (!pointerPrevent) {
        violations.push(
            "gate-pattern.vue dropped `@pointer-down-outside.prevent` — the suppressed scrim-click is the idiom the demo teaches; keep it inside the contained preview",
        );
    }

    // ── E. BLURB LANGUAGE-CLEAN ──────────────────────────────────────────────
    const blurb = gatePatternBlurb(manifestSrc);
    facts.blurbFound = blurb !== null;
    if (blurb === null) {
        violations.push(
            "could not locate the gate-pattern manifest row blurb — the s(\"compositions\", \"gate-pattern\", …) factory call (W18 owns the row; W63 cleans its blurb)",
        );
    } else {
        const codeMatch = blurb.match(TRANCHE_CODE);
        facts.blurbTrancheCode = codeMatch ? codeMatch[0] : null;
        if (codeMatch) {
            violations.push(
                `the gate-pattern manifest blurb leaks the tranche code "${codeMatch[0]}" — strip it (the consumer-facing story description carries no library dev-history code)`,
            );
        }
    }

    return { facts, violations };
}

function run() {
    const sfcSrc = existsSync(GATE_SFC) ? readFileSync(GATE_SFC, "utf8") : "";
    const manifestSrc = existsSync(MANIFEST) ? readFileSync(MANIFEST, "utf8") : "";

    if (!sfcSrc) {
        console.error(`FAIL — gate-pattern.vue not found at ${relative(ROOT, GATE_SFC)}`);
        process.exit(1);
    }

    const { facts, violations } = detect(sfcSrc, manifestSrc);
    const status = violations.length === 0 ? "pass" : "fail";

    const artifact = gateArtifactPath(
        "GLASS_UI_GATE_DETRAP_ARTIFACT",
        "AX-gate-detrap",
    );
    writeGateArtifact(artifact, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:gate-detrap",
        command: "npm run proof:gate-detrap",
        facts,
        violations,
    });

    console.log("proof:gate-detrap — the /compositions/gate-pattern de-trap (AX.W63 Q8 BLOCKER)");
    console.log(`  A no on-mount open       : ${facts.onMountOpen ? "RED (open=ref(true))" : "ok"}`);
    console.log(`  B contained glass-card   : ${facts.hasCardFrame || facts.hasGlassCardClass ? "ok" : "RED (no frame)"}`);
    console.log(`  C on-demand trigger      : ${facts.hasButton && facts.opensOnDemand ? "ok" : "RED (no on-demand open)"}`);
    console.log(`  D idiom preserved        : ${Object.values(facts.idiom).every(Boolean) ? "ok" : "RED (idiom stripped)"}`);
    console.log(`  E blurb language-clean   : ${facts.blurbTrancheCode ? `RED (${facts.blurbTrancheCode})` : "ok"}`);
    console.log("");

    if (status === "fail") {
        console.error("FAIL — gate-detrap violations:");
        for (const v of violations) console.error(`  ✗ ${v}`);
        process.exit(1);
    }
    console.log(
        "PASS — the gate-pattern demonstrates the non-dismissable idiom inside a contained glass-card preview; the visitor reaches the page.",
    );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
