#!/usr/bin/env node
// BA.W-SHELL-HOLD — proof:shell-hold, the born-RED source witness on the
// railContext user-activation guard (FD-FS-4).
//
// THE DEFECT (fd-foundations FD-FS-4 — the lane could capture NO page without a
// `history.pushState` route-freeze). Both shell docks bind
// `<DockRail v-model:context="railContext">` to a writable-computed whose `get`
// falls back to `contextLayers.value[0]?.id` on a non-faceted route. Because the
// model is a two-way `defineModel`, the reactive system writes that resolved
// fallback BACK through the computed's `set` on the first reconcile — and the
// `set` UNCONDITIONALLY fires `router.push(...)`. So the shell auto-navigates to
// the active facet's first story within ~1s of EVERY load, with NO user input.
//
// THE GUARD (smallest diff — no DockRail API change). The `set` must distinguish a
// genuine user chip activation (a `select()` call that emits `@advance`,
// DockRail.vue:107-110) from the mount/normalization v-model echo (which does NOT
// emit `@advance`). A user-activation gate keys the `router.push` off that signal:
// either an `@advance`-fed latch ref, OR an equality short-circuit comparing the
// incoming `set` id against the `get`'s currently-resolved value (the echo always
// writes the value `get` already returned).
//
// PURE DEVICE-FREE static src-scan (no browser, no GPU). Runs on EVERY runner →
// carries tags: ["local","ci","release"]. The S1 CI half; the binding P1 live
// truth (the page HOLDS) rides tests-visual/shell-hold.spec.ts (local-only).
//
// CLAUSE (born-RED on the pre-fix tree):
//   S1 — the `railContext` `set` arm in SidebarDock.vue AND BottomDock.vue gates
//        its `router.push` behind a user-activation condition. It is NO LONGER an
//        unconditional `if (first && categoryId) { router.push(…) }` with no
//        user-intent guard. The assert is the POSITIVE: the `set` body references a
//        user-activation gate (an `@advance`-fed latch ref, or an equality
//        short-circuit against the resolved value) AND every `router.push` in the
//        `set` is reachable ONLY through it. It does NOT merely grep the literal
//        `userActivated` (a guard renamed/expressed differently must still pass),
//        and it FAILS if a `set` arm pushes on a path NOT reachable through the
//        guard (a smuggled second push). The witness asserts BOTH files (guarding
//        one leaves the other drifting — defect #2).
//
// Bite-check (the §HardGate RED witness): revert either shell dock's `set` to the
// unconditional `if (first && categoryId) { void router.push(...) }` (no latch, no
// equality short-circuit) → S1 RED for that file; add a SECOND `router.push` on a
// path outside the guard → S1 RED (smuggled push).

import { existsSync, readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
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

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SIDEBAR: resolve(ROOT, "demo/shell/SidebarDock.vue"),
        BOTTOM: resolve(ROOT, "demo/shell/BottomDock.vue"),
        // BG.W-SHELL-DOCK-DRY — the carved leaf holding the shared railContext guard.
        SHELL: resolve(ROOT, "demo/shell/useShellNavDock.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_SHELL_HOLD_ARTIFACT", "BA-shell-hold"),
    };
    return _cliPaths;
}

/**
 * Extract the BODY of the `railContext` computed's `set: (id) => { … }` arm from a
 * (comment-stripped) SFC source. Returns the brace-balanced inner text, or "" when
 * no `set:` arm is found. Handles the arrow-with-block form the shell docks use
 * (`set: (id) => { … }`) by brace-counting from the first `{` after `set:`.
 */
export function extractSetBody(srcStripped) {
    const m = /\bset\s*:\s*\([^)]*\)\s*=>\s*\{/.exec(srcStripped);
    if (!m) return "";
    let i = m.index + m[0].length; // just past the opening `{`
    let depth = 1;
    const start = i;
    for (; i < srcStripped.length && depth > 0; i++) {
        const c = srcStripped[i];
        if (c === "{") depth++;
        else if (c === "}") depth--;
    }
    return srcStripped.slice(start, i - 1);
}

/**
 * The PURE detector (injected) — exported so a born-RED self-test can feed a
 * synthetic reverted-unconditional / smuggled-second-push mutation and assert the
 * violation.
 *
 * The guard recognized (either smallest-diff mechanism is accepted):
 *   (a) an `@advance`-fed user-activation LATCH — a ref the `@advance` handler raises
 *       and the `set` early-returns unless it is set. Detected as: the SFC binds an
 *       `@advance`/`@update:context`-shaped handler that raises a boolean ref, AND
 *       the `set` body references that ref in a guard before any `router.push`.
 *   (b) an EQUALITY short-circuit — the `set` compares the incoming `id` against the
 *       resolved `get` value (`railContext.value` / the same `here ?? [0]` resolve)
 *       and returns/skips the push when equal (the echo always writes that value).
 *
 * The POSITIVE bar: every `router.push` inside the `set` body is preceded (earlier
 * in the body) by a user-activation gate that can early-return/short-circuit. A
 * `router.push` reachable with NO such gate before it → violation (the unconditional
 * push at HEAD, or a smuggled second push).
 *
 * @param {{ name: string, text: string }} file the SFC source (raw, un-stripped)
 */
export function detectGuardOnFile(file) {
    const stripped = stripComments(file.text ?? "", "vue");
    const facts = { name: file.name };
    const violations = [];

    const setBody = extractSetBody(stripped);
    facts.hasSetArm = setBody.length > 0;
    if (!setBody) {
        violations.push(
            `${file.name}: no railContext \`set: (id) => { … }\` arm found — the writable-computed set is the guard site`,
        );
        return { violations, facts };
    }

    // The push site(s) inside the set body.
    const pushes = [...setBody.matchAll(/router\.push\s*\(/g)];
    facts.pushCount = pushes.length;
    if (pushes.length === 0) {
        // A set with no push at all cannot self-navigate — vacuously held, but the
        // shell docks DO navigate on a real click, so 0 pushes means the navigation
        // was dropped (a regression, not a guard). Flag it.
        violations.push(
            `${file.name}: the railContext set arm has NO router.push — a genuine chip click must still navigate (the guard suppresses ONLY the echo, never the real navigation)`,
        );
        return { violations, facts };
    }

    // The user-activation gate signatures.
    //  (a) latch: a boolean ref the @advance handler raises, referenced in the set.
    //      We detect the SFC-level wiring (@advance/@update:context handler raising a
    //      ref) AND a guard reference to a *non-router*, non-resolve identifier read
    //      as a boolean condition before the push.
    const advanceHandler =
        /@advance\s*=/.test(stripped) || /@update:context\s*=/.test(stripped);
    // A latch ref declared at SFC scope (ref<boolean>/ref(false)/shallowRef(false)).
    const latchRefDecl =
        /\b(?:const|let)\s+(\w*(?:activated|userNav|userAct|byUser|fromUser|intent|guard)\w*)\s*=\s*(?:ref|shallowRef)\s*\(/i.exec(
            stripped,
        );
    facts.advanceHandler = advanceHandler;
    facts.latchRefName = latchRefDecl ? latchRefDecl[1] : null;

    //  (b) equality short-circuit: the set compares id against the resolved current
    //      value and returns/skips when equal. Detected as an `if (id === …) return`
    //      / `if (id !== …)` guard, or a `=== railContext.value`/`=== get(...)`
    //      comparison in the set body, gating the push.
    const equalityGuard =
        /\bif\s*\([^)]*\bid\b[^)]*[!=]==[^)]*\)/.test(setBody) ||
        /[!=]==\s*railContext\.value/.test(setBody) ||
        /\bid\b\s*[!=]==/.test(setBody);
    facts.equalityGuard = equalityGuard;

    // Is the FIRST push preceded by a guard that can early-return / short-circuit?
    // We split the set body at the first push and scan the head for: an early
    // `return` reachable on the no-activation path (latch-gated or equality-gated),
    // OR the push being WRAPPED in a condition referencing the latch ref.
    const firstPushIdx = setBody.indexOf("router.push");
    const head = setBody.slice(0, firstPushIdx);

    const latchName = latchRefDecl ? latchRefDecl[1] : null;
    // Latch consumed in the set head: a guard reading the latch ref (an early return
    // when unset, or wrapping the push in the latch condition). `.value` deref OK.
    const latchConsumed =
        !!latchName &&
        new RegExp(`\\b${latchName}\\b(?:\\.value)?`).test(setBody) &&
        advanceHandler;
    // The latch must gate the push: either an early-return in the head guarded by the
    // latch, or the push enclosed in an `if (latch…)`. We accept either: the latch
    // name appearing in the head (a leading guard) OR in an enclosing condition.
    const latchGatesPush =
        latchConsumed &&
        (new RegExp(`\\b${latchName}\\b(?:\\.value)?`).test(head) ||
            new RegExp(
                `if\\s*\\([^)]*\\b${latchName}\\b[\\s\\S]*?router\\.push`,
            ).test(setBody));

    // Equality short-circuit in the head (an early `return` when id === resolved).
    const equalityGatesPush =
        equalityGuard && /\breturn\b/.test(head) && /[!=]==/.test(head);

    const guarded = latchGatesPush || equalityGatesPush;
    facts.latchGatesPush = latchGatesPush;
    facts.equalityGatesPush = equalityGatesPush;
    facts.guarded = guarded;

    if (!guarded) {
        violations.push(
            `${file.name}: the railContext set fires router.push with NO user-activation guard — it is the unconditional v-model-echo push (FD-FS-4). Gate the push behind an @advance latch or an equality short-circuit against the resolved value.`,
        );
    }

    // Anti-evasion: a `router.push` reachable on a path NOT behind the guard (a
    // smuggled push). The guard is POSITIONAL — an early `return` short-circuit gates
    // the ENTIRE tail after it (a push AFTER the guard is genuinely covered), so the
    // true smuggle is a push BEFORE the guard's gate position. We locate the guard
    // gate (the equality early-return's `return`, or the latch reference) and flag any
    // push that precedes it (or, when no gate position resolves, any push at all).
    let guardGateIdx = -1;
    if (equalityGatesPush) {
        // The first early `return` that follows an equality comparison — the gate.
        const retM = /[!=]==[\s\S]*?\breturn\b/.exec(setBody);
        guardGateIdx = retM ? retM.index + retM[0].length : -1;
    } else if (latchGatesPush && latchName) {
        // The first latch reference — the gate (an early-return or wrapping if).
        const latchM = new RegExp(`\\b${latchName}\\b(?:\\.value)?`).exec(setBody);
        guardGateIdx = latchM ? latchM.index + latchM[0].length : -1;
    }
    let smuggled = false;
    for (const p of pushes) {
        // `p.index` is the offset of this push within setBody.
        if (guardGateIdx < 0 || p.index < guardGateIdx) {
            smuggled = true;
        }
    }
    // If the set is otherwise GUARDED, only a push BEFORE the gate is a smuggle.
    // When unguarded, the missing-guard violation already fired above; do not also
    // double-count it as a smuggle.
    if (!guarded) smuggled = false;
    facts.smuggledPush = smuggled;
    if (smuggled) {
        violations.push(
            `${file.name}: a router.push in the set is reachable BEFORE the user-activation guard's short-circuit (a smuggled push that bypasses the guard)`,
        );
    }

    return { violations, facts };
}

export function detectShellHold(fs) {
    const violations = [];
    const facts = {};
    // BG.W-SHELL-DOCK-DRY — the railContext `set` guard was factored into the shared
    // `useShellNavDock` composable. FOLLOW the carve: when a shell dock has NO inline
    // `set` arm but consumes `useShellNavDock`, the guard SITE is the composable — the
    // guard lives ONCE, both docks inherit it. The legacy in-SFC `set` path stays checked
    // directly (any future in-dock consumer). This mirrors the "asserts follow the
    // composition into the carved leaf" precedent.
    const guardFor = (name, text) => {
        const sfcStripped = stripComments(text ?? "", "vue");
        const sfcHasSetArm = extractSetBody(sfcStripped).length > 0;
        const consumesShell = /useShellNavDock\b/.test(sfcStripped);
        if (!sfcHasSetArm && consumesShell && typeof fs.shellText === "string") {
            const res = detectGuardOnFile({
                name: `${name} → useShellNavDock.ts`,
                text: fs.shellText,
            });
            res.facts.guardSite = "useShellNavDock.ts";
            res.facts.consumesShell = true;
            return res;
        }
        return detectGuardOnFile({ name, text });
    };
    const sidebar = guardFor("SidebarDock.vue", fs.sidebarText);
    const bottom = guardFor("BottomDock.vue", fs.bottomText);
    facts.sidebar = sidebar.facts;
    facts.bottom = bottom.facts;
    violations.push(...sidebar.violations, ...bottom.violations);
    return { violations, facts };
}

function loadFs() {
    const P = cliPaths();
    const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
    return {
        sidebarText: read(P.SIDEBAR),
        bottomText: read(P.BOTTOM),
        shellText: read(P.SHELL),
    };
}

function run() {
    const P = cliPaths();
    const fs = loadFs();
    const { violations, facts } = detectShellHold(fs);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:shell-hold",
        facts,
        violations,
    });

    console.log(
        "proof:shell-hold — the railContext user-activation guard (the page HOLDS) gate (BA.W-SHELL-HOLD / FD-FS-4)",
    );
    console.log(
        `  S1 SidebarDock set guarded : setArm=${facts.sidebar.hasSetArm} pushes=${facts.sidebar.pushCount} guarded=${facts.sidebar.guarded} smuggled=${facts.sidebar.smuggledPush} ${facts.sidebar.guarded && !facts.sidebar.smuggledPush ? "OK" : "RED"}`,
    );
    console.log(
        `  S1 BottomDock set guarded  : setArm=${facts.bottom.hasSetArm} pushes=${facts.bottom.pushCount} guarded=${facts.bottom.guarded} smuggled=${facts.bottom.smuggledPush} ${facts.bottom.guarded && !facts.bottom.smuggledPush ? "OK" : "RED"}`,
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
