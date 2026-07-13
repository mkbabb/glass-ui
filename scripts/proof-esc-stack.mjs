#!/usr/bin/env node
// BI.W-ESC-STACK — proof:esc-stack, the global-Escape overlay-stack + fullscreen
// focus-model gate (born-RED at HEAD, driven GREEN by the wave).
//
// THE HEADLINE: Escape "dismiss-topmost" made true for the house `registerShortcut`
// path, and the fullscreen ExpandableContainer given a real focus model. Two coupled
// repairs, one decidable contract:
//
//   1. THE ESCAPE STACK (top-open wins). An overlay registers its Escape handler
//      ONLY WHILE OPEN (register-on-open / unregister-on-close), and the dispatcher
//      resolves Escape LIFO — the most-recently-registered OPEN handler consumes and
//      returns, a second Escape pops the next. A collapsed container holds NO
//      handler. Every NON-Escape key keeps the forward first-match dispatch (a
//      multi-target accelerator is correct there; only the Escape stack semantic is
//      LIFO). This makes the house path MATCH the reka DismissableLayer stack
//      (Dialog/Sheet/Drawer/Popover dismiss-topmost) rather than shadow it.
//   2. THE FULLSCREEN FOCUS MODEL (A11Y-4). The `open` panel composes reka's
//      FocusScope (`trapped` + move-in on mount + restore on collapse), and the
//      inline host (the page-behind footprint) carries `inert` while fullscreen.
//      Escape (now stack-topmost while open) collapses it; focus restores to the
//      `#expand-trigger`.
//
// This is the device-free SOURCE half (E1-E3). The PAINTED truth — the two-container
// Escape stack (Escape closes #2 then #1, not #1-first), the trap/move-in/restore,
// the inert page-behind — is the binding π captured in tests-visual/esc-stack.spec.ts
// (LOCAL-only real-browser + real-WebKit, rides the B-close gestalt ceremony). A
// source-green/behaviourally-broken close (the reverse-walk wired but a collapsed
// container still eats Escape, OR FocusScope present but focus never enters/restores)
// is the exact failure class the gestalt bar kills; both halves must hold.
//
// THREE FALSIFIABLE WITNESSES (each born-RED at HEAD pre-wave):
//
//   E1 — EVERY HOUSE ESCAPE REGISTRATION IS GATED ON AN OPEN STATE. The sole
//        `src/components` Escape binder (ExpandableContainer) registers Escape inside
//        a `watch(open …)` (register-on-open), NOT `onMounted` (unconditional), and
//        NO other `src/components/**/*.vue` carries an `onMounted`-unconditional
//        `registerShortcut("Escape")`. RED at HEAD: ExpandableContainer registers in
//        `onMounted`. BITE: a synthetic `onMounted(() => registerShortcut("Escape",…))`
//        MUST flag.
//   E2 — dispatchShortcut RESOLVES ESCAPE LIFO; NON-ESCAPE UNCHANGED. `dispatchShortcut`
//        carries an Escape discriminator (`isEscapeEvent`) that gates a REVERSED walk
//        (`[…shortcuts].reverse()`) in the Escape-true branch ONLY, and keeps the
//        forward `for (const shortcut of …)` first-match for every other key. RED at
//        HEAD: the loop returns on the first forward match for Escape too. BITE: a
//        synthetic forward-only Escape dispatch (no `isEscapeEvent`, no `.reverse()`)
//        MUST flag.
//   E3 — THE FULLSCREEN PANEL COMPOSES FocusScope (trapped + move-in + restore) +
//        inert-BEHIND. ExpandableContainer imports `FocusScope`, wraps the
//        `data-part="overlay"` panel in `<FocusScope … trapped>` (default
//        mount-auto-focus move-in — NO mount-auto-focus override), binds `:inert` to
//        `open` on the inline host, and RESTORES focus on collapse (an
//        `@unmount-auto-focus` handler that focuses the captured trigger). RED at
//        HEAD: no FocusScope / no inert / no restore. BITE: a synthetic overlay
//        missing FocusScope MUST flag.
//
// House style mirrors proof-drag-morph.mjs / proof-surface-axis.mjs: ESM .mjs,
// comment-strip first (the false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, three inline self-test
// bites (a synthetic evasion each MUST flag — proven every run), process.exit(1) on
// any violation.

import { readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        KEYBOARD_TS: resolve(
            ROOT,
            "src/composables/keyboard/useKeyboardShortcuts.ts",
        ),
        EXPANDABLE_VUE: resolve(
            ROOT,
            "src/components/custom/expandable-container/ExpandableContainer.vue",
        ),
        COMPONENTS_DIR: resolve(ROOT, "src/components"),
        ARTIFACT: gateArtifactPath("GLASS_UI_ESC_STACK_ARTIFACT", "BI-esc-stack"),
    };
    return _cliPaths;
}

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

// Strip TS/JS block + line comments (a commented-out registration must not satisfy
// or trip a witness — the false-witness discipline).
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Strip Vue SFC `<!-- … -->` HTML comments.
function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Extract the balanced-paren body of a call whose `(` sits at `parenIdx`.
function balancedBody(text, parenIdx) {
    let depth = 0;
    for (let i = parenIdx; i < text.length; i++) {
        const c = text[i];
        if (c === "(") depth++;
        else if (c === ")") {
            depth--;
            if (depth === 0) return text.slice(parenIdx + 1, i);
        }
    }
    return text.slice(parenIdx + 1);
}

// Every balanced-body of `name( … )` calls in `text`.
function callBodies(text, name) {
    const bodies = [];
    const re = new RegExp(`\\b${name}\\s*\\(`, "g");
    let m;
    while ((m = re.exec(text))) {
        const parenIdx = m.index + m[0].length - 1;
        bodies.push(balancedBody(text, parenIdx));
    }
    return bodies;
}

const ESCAPE_LIT = /["']Escape["']/;
function bodyRegistersEscape(body) {
    return /\bregisterShortcut\s*\(/.test(body) && ESCAPE_LIT.test(body);
}

// An `onMounted( … )` body that unconditionally registers Escape (the HEAD defect
// + the E1 evasion the bite forbids).
function hasOnMountedEscape(stripped) {
    return callBodies(stripped, "onMounted").some(bodyRegistersEscape);
}

// A `watch(open, …)` body that registers Escape (register-on-open — the fix).
function hasOpenWatchEscape(stripped) {
    return callBodies(stripped, "watch").some(
        (body) => /^\s*open\b/.test(body) && bodyRegistersEscape(body),
    );
}

// Recursively collect `*.vue` under a dir (the E1 completeness sweep).
function collectVueFiles(dir) {
    const out = [];
    let entries;
    try {
        entries = readdirSync(dir, { withFileTypes: true });
    } catch {
        return out;
    }
    for (const e of entries) {
        const full = join(dir, e.name);
        if (e.isDirectory()) out.push(...collectVueFiles(full));
        else if (e.isFile() && e.name.endsWith(".vue")) out.push(full);
    }
    return out;
}

/**
 * The W-ESC-STACK detector. Pure: takes the (already comment-stripped) sources +
 * the sweep offenders, returns `{ facts, violations }`. Each witness pushes a
 * falsifiable violation string.
 */
export function detectEscStack(sources) {
    const keyboard = stripBlockComments(sources.keyboardTs ?? "");
    const expandable = stripHtmlComments(
        stripBlockComments(sources.expandableVue ?? ""),
    );
    // sweepOffenders: [{ file, }] — src/components/**/*.vue with onMounted-Escape,
    // pre-stripped + evaluated by the caller (I/O stays out of the pure detector).
    const sweepOffenders = sources.sweepOffenders ?? [];

    const violations = [];

    // ── E1 — every house Escape registration is gated on an OPEN state ──────────
    const escRegistered = bodyRegistersEscape(expandable);
    const escInOnMounted = hasOnMountedEscape(expandable);
    const escInOpenWatch = hasOpenWatchEscape(expandable);
    if (!escRegistered) {
        violations.push(
            "E1: ExpandableContainer.vue no longer registers an Escape handler (the register-while-open contract has no subject).",
        );
    }
    if (escInOnMounted) {
        violations.push(
            "E1: ExpandableContainer.vue registers Escape inside `onMounted` (unconditional-on-mount) — a collapsed container swallows Escape from a later overlay. Register on OPEN (watch(open)).",
        );
    }
    if (escRegistered && !escInOpenWatch) {
        violations.push(
            "E1: ExpandableContainer.vue does not register Escape inside a `watch(open, …)` (register-on-open) — the handler must exist ONLY while open.",
        );
    }
    if (sweepOffenders.length > 0) {
        violations.push(
            `E1: ${sweepOffenders.length} src/components file(s) carry an onMounted-unconditional registerShortcut("Escape"): ${sweepOffenders
                .map((o) => o.file)
                .join(", ")}.`,
        );
    }

    // ── E2 — dispatchShortcut resolves Escape LIFO; non-Escape unchanged ─────────
    const hasEscapeDiscriminator = /\bisEscapeEvent\s*\(/.test(keyboard);
    const hasReverse = /\.reverse\s*\(\s*\)/.test(keyboard);
    // The reverse must be GATED on the Escape branch of a ternary keyed on the
    // discriminator (not an all-keys reverse that would break the non-Escape
    // forward first-match).
    const reverseGatedOnEscape =
        /isEscapeEvent\s*\([^)]*\)\s*\?[\s\S]{0,80}?\.reverse\s*\(\s*\)/.test(
            keyboard,
        );
    const keepsForwardWalk = /for\s*\(\s*const\s+\w+\s+of\s+/.test(keyboard);
    if (!hasEscapeDiscriminator || !hasReverse) {
        violations.push(
            "E2: useKeyboardShortcuts.ts `dispatchShortcut` has no Escape LIFO resolution (missing isEscapeEvent discriminator and/or the reversed walk) — Escape still returns on the first forward match.",
        );
    }
    if (hasReverse && !reverseGatedOnEscape) {
        violations.push(
            "E2: the reversed walk is not gated on the Escape branch (isEscapeEvent(e) ? […].reverse() : …) — a blanket reverse breaks the non-Escape forward first-match.",
        );
    }
    if (!keepsForwardWalk) {
        violations.push(
            "E2: the forward `for (const … of …)` first-match walk is gone — non-Escape keys lost their dispatch.",
        );
    }

    // ── E3 — the fullscreen panel composes FocusScope + inert-behind + restore ──
    const importsFocusScope =
        /\bimport\s*\{[^}]*\bFocusScope\b[^}]*\}\s*from\s*["'][^"']*focus-scope["']/.test(
            expandable,
        );
    // FocusScope wraps the fullscreen overlay panel (the data-part="overlay" node).
    const focusScopeWrapsOverlay = /<FocusScope[\s\S]*?data-part="overlay"/.test(
        expandable,
    );
    // `trapped` on the FocusScope open tag.
    const focusScopeTag = (expandable.match(/<FocusScope[\s\S]*?>/) ?? [""])[0];
    const focusScopeTrapped = /\btrapped\b/.test(focusScopeTag);
    // Move-in is the FocusScope DEFAULT (mount-auto-focus). An override that
    // preventDefaults mount-auto-focus would KILL move-in — forbid it.
    const overridesMountAutoFocus = /@mount-auto-focus\s*=/.test(expandable);
    // inert bound to `open` on the inline host (the page-behind footprint).
    const inertBehind = /:inert\s*=\s*["']\s*open\b/.test(expandable);
    // Restore: an unmount-auto-focus handler that restores focus to the captured
    // trigger (`.focus(` on the pre-inert restore target).
    const hasUnmountAutoFocus = /@unmount-auto-focus\s*=/.test(expandable);
    const hasFocusRestore =
        /restoreTarget/.test(expandable) && /\.focus\s*\?\.\s*\(|\.focus\s*\(/.test(expandable);

    if (!importsFocusScope) {
        violations.push(
            "E3: ExpandableContainer.vue does not import FocusScope from the house `ui/focus-scope` (the substrate-single focus-trap primitive).",
        );
    }
    if (!focusScopeWrapsOverlay) {
        violations.push(
            "E3: the fullscreen `data-part=\"overlay\"` panel is not wrapped in <FocusScope> — no focus trap.",
        );
    }
    if (focusScopeWrapsOverlay && !focusScopeTrapped) {
        violations.push(
            "E3: <FocusScope> is not `trapped` — Tab can leave the fullscreen panel.",
        );
    }
    if (overridesMountAutoFocus) {
        violations.push(
            "E3: an @mount-auto-focus override is present — it can suppress the FocusScope move-in (focus must enter the panel on open).",
        );
    }
    if (!inertBehind) {
        violations.push(
            "E3: the inline host has no `:inert=\"open\"` — the page-behind footprint stays keyboard/AT-reachable under the overlay.",
        );
    }
    if (!hasUnmountAutoFocus || !hasFocusRestore) {
        violations.push(
            "E3: no focus RESTORE on collapse (an @unmount-auto-focus handler that focuses the captured pre-inert trigger) — focus is lost when fullscreen exits.",
        );
    }

    const facts = {
        e1: { escRegistered, escInOnMounted, escInOpenWatch, sweepOffenders },
        e2: {
            hasEscapeDiscriminator,
            hasReverse,
            reverseGatedOnEscape,
            keepsForwardWalk,
        },
        e3: {
            importsFocusScope,
            focusScopeWrapsOverlay,
            focusScopeTrapped,
            overridesMountAutoFocus,
            inertBehind,
            hasUnmountAutoFocus,
            hasFocusRestore,
        },
    };

    return { facts, violations };
}

// ── Self-test bites (the RED-witness inverses, proven every run) ─────────────────
// Bite E1: a synthetic `onMounted(() => registerShortcut("Escape", …))` MUST flag.
function selfTestE1Bite() {
    const SYNTHETIC = [
        "<script setup>",
        "onMounted(() => {",
        '  registerShortcut("Escape", () => { open.value = false }, {})',
        "})",
        "</scr" + "ipt>",
    ].join("\n");
    const { facts } = detectEscStack({ expandableVue: SYNTHETIC });
    return facts.e1.escInOnMounted === true;
}

// Bite E2: a synthetic forward-only Escape dispatch (no discriminator, no reverse)
// MUST flag — hasEscapeDiscriminator=false AND hasReverse=false.
function selfTestE2Bite() {
    const SYNTHETIC = [
        "function dispatchShortcut(shortcuts, eventType, e) {",
        "  for (const shortcut of shortcuts) {",
        "    if (!matchesCombo(e, shortcut.combo)) continue;",
        "    shortcut.handler(e); return;",
        "  }",
        "}",
    ].join("\n");
    const { facts } = detectEscStack({ keyboardTs: SYNTHETIC });
    return (
        facts.e2.hasEscapeDiscriminator === false && facts.e2.hasReverse === false
    );
}

// Bite E3: a synthetic fullscreen overlay missing FocusScope MUST flag —
// focusScopeWrapsOverlay=false.
function selfTestE3Bite() {
    const SYNTHETIC = [
        '<Teleport to="body" :disabled="!open">',
        '  <div v-if="open" data-part="overlay" class="fixed inset-0">',
        '    <div data-part="panel"><slot :fullscreen="true" /></div>',
        "  </div>",
        "</Teleport>",
    ].join("\n");
    const { facts } = detectEscStack({ expandableVue: SYNTHETIC });
    return facts.e3.focusScopeWrapsOverlay === false;
}

function run() {
    const P = cliPaths();
    const { ROOT } = P;

    // The E1 completeness sweep — every src/components/**/*.vue, comment-stripped,
    // checked for an onMounted-unconditional Escape (I/O here, not in the detector).
    const sweepOffenders = [];
    for (const file of collectVueFiles(P.COMPONENTS_DIR)) {
        const stripped = stripHtmlComments(stripBlockComments(safeRead(file)));
        if (hasOnMountedEscape(stripped)) {
            sweepOffenders.push({ file: file.slice(ROOT.length + 1) });
        }
    }

    const { facts, violations } = detectEscStack({
        keyboardTs: safeRead(P.KEYBOARD_TS),
        expandableVue: safeRead(P.EXPANDABLE_VUE),
        sweepOffenders,
    });

    const e1BiteTeeth = selfTestE1Bite();
    const e2BiteTeeth = selfTestE2Bite();
    const e3BiteTeeth = selfTestE3Bite();
    if (!e1BiteTeeth) {
        violations.push(
            "SELF-TEST: the E1 onMounted-Escape bite did not flag the synthetic evasion — the gate's teeth are broken.",
        );
    }
    if (!e2BiteTeeth) {
        violations.push(
            "SELF-TEST: the E2 forward-only-dispatch bite did not flag the synthetic evasion — the gate's teeth are broken.",
        );
    }
    if (!e3BiteTeeth) {
        violations.push(
            "SELF-TEST: the E3 missing-FocusScope bite did not flag the synthetic evasion — the gate's teeth are broken.",
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:esc-stack",
        facts,
        violations,
        selfTest: { e1BiteTeeth, e2BiteTeeth, e3BiteTeeth },
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:esc-stack — the global-Escape overlay stack + fullscreen focus model (BI.W-ESC-STACK)",
    );
    console.log(
        `  E1 Escape register-on-open, no onMounted : ${yn(
            facts.e1.escRegistered &&
                !facts.e1.escInOnMounted &&
                facts.e1.escInOpenWatch &&
                facts.e1.sweepOffenders.length === 0,
        )}  (sweep-offenders:${facts.e1.sweepOffenders.length})`,
    );
    console.log(
        `  E2 dispatch Escape LIFO, fwd for others  : ${yn(
            facts.e2.hasEscapeDiscriminator &&
                facts.e2.hasReverse &&
                facts.e2.reverseGatedOnEscape &&
                facts.e2.keepsForwardWalk,
        )}`,
    );
    console.log(
        `  E3 FocusScope trapped + inert + restore  : ${yn(
            facts.e3.importsFocusScope &&
                facts.e3.focusScopeWrapsOverlay &&
                facts.e3.focusScopeTrapped &&
                !facts.e3.overridesMountAutoFocus &&
                facts.e3.inertBehind &&
                facts.e3.hasUnmountAutoFocus &&
                facts.e3.hasFocusRestore,
        )}`,
    );
    console.log(`  self-test E1 bite has teeth              : ${yn(e1BiteTeeth)}`);
    console.log(`  self-test E2 bite has teeth              : ${yn(e2BiteTeeth)}`);
    console.log(`  self-test E3 bite has teeth              : ${yn(e3BiteTeeth)}`);

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
