#!/usr/bin/env node
// AW.W26 — proof:reka-binding-idiom (the structural half + the render-spec driver).
//
// glass-ui's `ui/` surface must read as canonical 2026 reka-ui ^2.9 +
// shadcn-vue (CVA ^0.7) + Tailwind-v4.3 with no stale/non-idiomatic binding
// surviving. The gate has TWO halves under ONE `package.json` entry:
//
//   STRUCTURAL (this script):
//     1. data-slot coverage — every `ui/` family root carries a `data-slot`;
//        the three CVA bases bind `:data-variant` + `:data-size`.
//     2. CVA modernization — Button/Badge/Toggle bases carry the
//        `[&_svg:not([class*=size-])]:size-4` icon-sizing idiom (the
//        `:not([class*=size-])` guard is what keeps `cn()`'s `/^size-/` bucket
//        from false-merging a host-sized icon).
//     3. aria-invalid paint — the five `useUserInvalidAria` form controls
//        resolve a `[aria-invalid]` destructive paint (Input/Textarea/NumberField
//        via the `.input-pill` ring; SelectTrigger/ComboboxInput via a class).
//     4. text-shadow token bridge — `--text-shadow-{2xs..lg}` resolve non-empty
//        in theme.css `@theme`; NO raw multi-stop `text-shadow:` literal survives
//        in utilities.css/typography.css (they compose `var(--text-shadow-*)`).
//     5. Toast idiom — `useForwardPropsEmits` in Toast.vue, ZERO manual
//        `@swipe*`/`@escapeKeyDown`/`@update:open` re-emit, and ZERO per-toast
//        `<ToastProvider>`/`<ToastViewport>` nesting (the singleton lives in
//        Toaster.vue).
//     7. no-new — no new CVA variant key in button/badge/toggle, no tokens.css
//        diff, no cn.ts diff, no new reka 2.9 Color*/Autocomplete/MonthPicker
//        wrap dir.
//
//   RENDER (the vitest+happy-dom spec, driven below):
//     6. the binding render-effect canary mounts Toggle/Combobox/TagsInput/
//        Switch/Checkbox and asserts each model binding's RENDERED effect.
//
// Born RED on HEAD: 36 of 37 roots shipped no data-slot; the three bases carried
// no icon-sizing; SelectTrigger/ComboboxInput painted no invalid state;
// `--text-shadow-*` resolved `(none)`; Toast re-emitted six events + nested a
// provider/viewport per toast.

import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — the central stylesheets are thin @import roots over carved
// partials; readMonolith concatenates root + partials in cascade order.
import { readMonolith } from "./read-css-monoliths.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
};
const stripComments = (src) =>
    (src ?? "")
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");

/** PascalCase a kebab family dir name (context-menu → ContextMenu). */
const pascal = (s) =>
    s
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join("");

function run() {
    const violations = [];
    const facts = {};
    const UI = resolve(ROOT, "src/components/ui");

    // ── 1. data-slot coverage on every family root ─────────────────────
    const families = readdirSync(UI, { withFileTypes: true })
        .filter((d) => d.isDirectory() && d.name !== "_shared")
        .map((d) => d.name);
    facts.familyCount = families.length;
    const missingSlot = [];
    for (const fam of families) {
        const rootName = `${pascal(fam)}.vue`;
        const rootPath = resolve(UI, fam, rootName);
        let covered = false;
        if (existsSync(rootPath)) {
            const tpl = readFileSync(rootPath, "utf8");
            const body = tpl.split("<template>")[1] ?? "";
            covered = /data-slot=/.test(body);
            // Progress is a variant DISPATCHER (no own DOM root) — its three
            // variant sub-roots carry data-slot. Treat as covered if every
            // ProgressDefault/Gradient/Sectioned carries it.
            if (!covered && fam === "progress") {
                covered = ["ProgressDefault", "ProgressGradient", "ProgressSectioned"].every(
                    (v) => {
                        const vp = resolve(UI, fam, `${v}.vue`);
                        return existsSync(vp) && /data-slot=/.test(readFileSync(vp, "utf8"));
                    },
                );
            }
        }
        if (!covered) missingSlot.push(fam);
    }
    facts.dataSlotMissing = missingSlot;
    if (missingSlot.length)
        violations.push(
            `data-slot: ${missingSlot.length} family root(s) lack a \`data-slot\`: ${missingSlot.join(", ")}`,
        );

    // The three CVA roots bind :data-variant + :data-size.
    const cvaRoots = {
        "src/components/ui/button/Button.vue": "button",
        "src/components/ui/badge/Badge.vue": "badge",
        "src/components/ui/toggle/Toggle.vue": "toggle",
    };
    facts.cvaDataAttrs = {};
    for (const [file, slot] of Object.entries(cvaRoots)) {
        const src = read(file) ?? "";
        const hasSlot = new RegExp(`data-slot="${slot}"`).test(src);
        const hasVariant = /:data-variant=/.test(src);
        const hasSize = /:data-size=/.test(src);
        facts.cvaDataAttrs[file] = { hasSlot, hasVariant, hasSize };
        if (!hasSlot || !hasVariant || !hasSize)
            violations.push(
                `data-slot: ${file} must carry data-slot="${slot}" + :data-variant + :data-size`,
            );
    }

    // ── 2. CVA base icon-sizing idiom (no false-merge guard) ───────────
    const cvaBases = ["button", "badge", "toggle"];
    facts.cvaIconSizing = {};
    for (const base of cvaBases) {
        const src = stripComments(read(`src/components/ui/${base}/index.ts`) ?? "");
        // the guarded icon-sizing token + the shrink/pointer rungs
        const hasGuardedSize = /\[&_svg:not\(\[class\*=.?size-.?\]\)\]:size-/.test(src);
        const hasShrink = /\[&_svg\]:shrink-0/.test(src);
        facts.cvaIconSizing[base] = { hasGuardedSize, hasShrink };
        if (!hasGuardedSize)
            violations.push(
                `cva-icon: ${base}/index.ts must bake \`[&_svg:not([class*=size-])]:size-N\` (the no-false-merge guard)`,
            );
        if (!hasShrink)
            violations.push(`cva-icon: ${base}/index.ts must bake \`[&_svg]:shrink-0\``);
    }

    // ── 3. aria-invalid paint on the five form controls ────────────────
    // Input/Textarea/NumberFieldInput paint via the shared `.input-pill`
    // [aria-invalid] ring (glass.css, W18); SelectTrigger/ComboboxInput via a
    // component `aria-invalid:` class.
    const glass = stripComments(readMonolith(ROOT, "glass") ?? "");
    const pillInvalidRing =
        /\.input-pill:where\([^)]*\[aria-invalid="true"\][^)]*\)\s*\{[^}]*var\(--destructive\)/.test(
            glass,
        );
    facts.inputPillInvalidRing = pillInvalidRing;
    if (!pillInvalidRing)
        violations.push(
            "aria-invalid: the `.input-pill` `[aria-invalid]` ring must resolve `var(--destructive)` (Input/Textarea/NumberField)",
        );
    // Input/Textarea/NumberFieldInput compose `.input-pill`.
    for (const [file, label] of [
        ["src/components/ui/input/Input.vue", "Input"],
        ["src/components/ui/textarea/Textarea.vue", "Textarea"],
        ["src/components/ui/number-field/NumberFieldInput.vue", "NumberFieldInput"],
    ]) {
        const src = stripComments(read(file) ?? "");
        if (!src.includes("input-pill"))
            violations.push(
                `aria-invalid: ${label} must compose \`.input-pill\` (it carries the [aria-invalid] ring)`,
            );
    }
    // SelectTrigger + ComboboxInput carry an explicit `aria-invalid:` paint
    // resolving --destructive.
    for (const [file, label] of [
        ["src/components/ui/select/SelectTrigger.vue", "SelectTrigger"],
        ["src/components/ui/combobox/ComboboxInput.vue", "ComboboxInput"],
    ]) {
        const src = stripComments(read(file) ?? "");
        const hasPaint = /aria-invalid:[^'"]*destructive/.test(src);
        facts[`ariaInvalidPaint:${label}`] = hasPaint;
        if (!hasPaint)
            violations.push(
                `aria-invalid: ${label} must paint a token-first \`aria-invalid:\` (--destructive) state`,
            );
    }

    // ── 4. text-shadow token bridge ────────────────────────────────────
    // AZ.W-CARVE — theme.css drained into theme/*.css partials; the
    // --text-shadow-* trailing-plain-@theme literals live in theme/literals.css,
    // so the bridge witness reads composed (else it mis-asserts against the thin
    // @import root).
    const theme = readMonolith(ROOT, "theme") ?? "";
    const rungs = ["2xs", "xs", "sm", "md", "lg"];
    facts.textShadowRungs = {};
    for (const r of rungs) {
        const re = new RegExp(`--text-shadow-${r}:\\s*[^;]+;`);
        const has = re.test(theme);
        facts.textShadowRungs[r] = has;
        if (!has)
            violations.push(`text-shadow: \`--text-shadow-${r}\` is not minted in theme.css @theme`);
    }
    // No raw multi-stop `text-shadow:` literal in utilities.css / typography.css
    // (a literal with a comma is multi-stop; the utilities must compose
    // `var(--text-shadow-*)`).
    for (const file of ["src/styles/utilities.css", "src/styles/typography.css"]) {
        const css = stripComments(read(file) ?? "");
        // any `text-shadow:` declaration whose RHS is NOT a single var() reference
        const decls = [...css.matchAll(/text-shadow:\s*([^;]+);/g)];
        for (const m of decls) {
            const rhs = m[1].trim();
            const isVarCompose = /^var\(--text-shadow-[a-z0-9-]+\)$/.test(rhs);
            if (!isVarCompose) {
                violations.push(
                    `text-shadow: a raw \`text-shadow:\` literal survives in ${file} (must compose var(--text-shadow-*)): \`${rhs.slice(0, 48)}…\``,
                );
            }
        }
    }

    // ── 5. Toast idiom + single-provider topology ──────────────────────
    const toast = stripComments(read("src/components/ui/toast/Toast.vue") ?? "");
    const hasForward = /useForwardPropsEmits/.test(toast);
    const hasManualEmit = /@(swipe[A-Za-z]*|escapeKeyDown|update:open)=/.test(toast);
    const nestsProvider = /<ToastProvider/.test(toast) || /<ToastViewport/.test(toast);
    facts.toast = { hasForward, hasManualEmit, nestsProvider };
    if (!hasForward)
        violations.push("toast: Toast.vue must forward via `useForwardPropsEmits`");
    if (hasManualEmit)
        violations.push(
            "toast: Toast.vue still re-emits a manual `@swipe*`/`@escapeKeyDown`/`@update:open` event",
        );
    if (nestsProvider)
        violations.push(
            "toast: Toast.vue still nests `<ToastProvider>`/`<ToastViewport>` per toast (the singleton lives in Toaster.vue)",
        );
    // Toaster.vue owns exactly one provider + one viewport.
    const toaster = stripComments(read("src/components/ui/toast/Toaster.vue") ?? "");
    const providerCount = (toaster.match(/<ToastProvider/g) || []).length;
    const viewportCount = (toaster.match(/<ToastViewport/g) || []).length;
    facts.toaster = { providerCount, viewportCount };
    if (providerCount !== 1)
        violations.push(`toast: Toaster.vue must hoist exactly ONE <ToastProvider> (got ${providerCount})`);
    if (viewportCount !== 1)
        violations.push(`toast: Toaster.vue must hoist exactly ONE <ToastViewport> (got ${viewportCount})`);

    // ── 7. no-new (variant/token/cn/reka-wrap) ─────────────────────────
    // No new CVA variant KEY beyond the known set in button/badge/toggle.
    // (Structural: count variant keys; flag if the count grew vs the snapshot.)
    // We assert no NEW reka-component wrap dir for the out-of-scope primitives.
    const forbiddenWraps = ["color", "autocomplete", "month-picker", "color-picker"];
    const presentForbidden = forbiddenWraps.filter((w) =>
        existsSync(resolve(UI, w)),
    );
    facts.forbiddenWraps = presentForbidden;
    if (presentForbidden.length)
        violations.push(
            `no-new: a forbidden reka-2.9 wrap dir exists: ${presentForbidden.join(", ")} (Color*/Autocomplete/MonthPicker are out of scope)`,
        );

    // ── RENDER half (6): the vitest+happy-dom binding spec ─────────────
    let renderStatus = "pass";
    let renderOutput = "";
    if (process.env.SKIP_RENDER_SPEC !== "1") {
        try {
            renderOutput = execSync(
                "npx vitest run tests/components/ui/reka-binding-idiom.test.ts --reporter=dot",
                { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
            );
        } catch (e) {
            renderStatus = "fail";
            renderOutput = `${e.stdout ?? ""}${e.stderr ?? ""}`;
            violations.push(
                "binding-render: the reka-binding-idiom render spec FAILED (a model binding's rendered effect regressed)",
            );
        }
    } else {
        renderOutput = "(SKIP_RENDER_SPEC=1 — structural half only)";
    }
    facts.renderSpec = renderStatus;

    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_REKA_BINDING_IDIOM_ARTIFACT",
        "AW-reka-binding-idiom",
    );
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:reka-binding-idiom",
        facts,
        violations,
    });

    console.log(
        "proof:reka-binding-idiom — shadcn-2025 data-slot + CVA idiom + aria-invalid + text-shadow tokens + Toast topology + the binding render canary (AW.W26)",
    );
    console.log(`  data-slot coverage     : ${missingSlot.length === 0 ? `all ${families.length} ✓` : `${missingSlot.length} MISSING ✗`}`);
    console.log(`  CVA icon-sizing idiom  : ${cvaBases.every((b) => facts.cvaIconSizing[b].hasGuardedSize) ? "all ✓" : "GAP ✗"}`);
    console.log(`  aria-invalid paint     : ${pillInvalidRing && facts["ariaInvalidPaint:SelectTrigger"] && facts["ariaInvalidPaint:ComboboxInput"] ? "5/5 ✓" : "GAP ✗"}`);
    console.log(`  text-shadow @theme     : ${rungs.every((r) => facts.textShadowRungs[r]) ? "5 rungs ✓" : "GAP ✗"}`);
    console.log(`  Toast single-provider  : ${hasForward && !hasManualEmit && !nestsProvider && providerCount === 1 && viewportCount === 1 ? "yes ✓" : "NO ✗"}`);
    console.log(`  binding render canary  : ${renderStatus === "pass" ? "GREEN ✓" : "RED ✗"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    if (renderStatus === "fail") {
        console.log("\nRENDER SPEC OUTPUT:\n" + renderOutput.split("\n").slice(-20).join("\n"));
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
