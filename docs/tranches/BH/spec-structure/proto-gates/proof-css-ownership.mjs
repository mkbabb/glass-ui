#!/usr/bin/env node
// PROTOTYPE (BH round-2 spec-structure G6, B5) — proof:css-ownership.
//
// STRUCTURE-SPEC §2.6 ruling (DOCUMENTED-OWNERSHIP, the zero-risk default): the
// physical CSS move breaks the publish bundle (cpSync(src/styles→dist/styles)
// wholesale + live ./X.css @imports resolve the .d.ts-only dist/components
// mirror → the CSS never ships). So component-owned CSS STAYS physically at its
// src/styles/ rung but declares its SINGLE owner via a header `OWNER: <component>`
// field. A no-single-owner recipe stays genuinely-global (the ≥2-consumer
// promotion rule on the OWNERSHIP axis).
//
// The gate:
//   C1 — every OWNED component-CSS declares `OWNER: <component>` in a header
//        comment, and the named owner RESOLVES to a real src/components/*/<name>/
//        dir (a single owner; a dangling owner REDs).
//   C2 — the GLOBAL cascade set (tokens/theme/typography/glass-ladder/utilities/
//        index/…) carries NO OWNER field (a genuinely-global recipe must not
//        claim a single owner).
//
// The OWNED set is DERIVED (no frozen hand-list): a src/styles/**/*.css is
// component-owned iff its basename matches a component dir name OR it carries an
// explicit `OWNER:` header. The GLOBAL set is the residue. Basename-match is a
// decidable LOWER BOUND — it under-catches aliased files (feedback-tone.css →
// the feedback family, cta-seat.css → dock, segmented-tabs.css → tabs), so those
// are named in ALIASED_OWNERS (the §2.6-enumerated component recipes that do not
// basename-match a dir).
//
// The pure evaluateCss() runs over an INJECTED descriptor so the self-test can
// feed synthetic files. Born-RED on HEAD (no OWNER: header exists anywhere yet).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, basename, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

function resolveRoot() {
    const arg = process.argv.find((a) => a.startsWith("--root="));
    if (arg) return resolve(arg.slice("--root=".length));
    return resolve(fileURLToPath(new URL("../../", import.meta.url)));
}
const ROOT = resolveRoot();
const SRC = resolve(ROOT, "src");
const STYLES = resolve(SRC, "styles");
const rel = (p) => relative(ROOT, p).split(sep).join("/");

// The §2.6-enumerated component recipes whose basename does NOT match a component
// dir (the aliased owners the pure basename-derivation under-catches).
const ALIASED_OWNERS = {
    "feedback-tone.css": "notification",     // the Alert/Notification/Toast tone family
    "dock/cta-seat.css": "dock",
    "dock/fission-island.css": "dock",
    "dock/morph-bridge.css": "dock",
    "card-scroll.css": "scroll-card",
    "segmented-tabs.css": "tabs",
    "viz-reveal.css": "aurora",
    "dock-controls.css": "dock",
};

/** The flat set of component dir names across ui/ + custom/. */
function componentDirNames() {
    const names = new Set();
    for (const tier of ["ui", "custom"]) {
        const base = resolve(SRC, "components", tier);
        if (!existsSync(base)) continue;
        for (const e of readdirSync(base, { withFileTypes: true }))
            if (e.isDirectory()) names.add(e.name);
    }
    return names;
}

/** Parse an `OWNER: <name>` header field from CSS source (first 40 lines). */
export function parseOwnerField(source) {
    const head = source.split("\n").slice(0, 40).join("\n");
    const m = head.match(/OWNER:\s*([a-z0-9-]+)/i);
    return m ? m[1] : null;
}

/**
 * The PURE per-CSS adjudicator over an INJECTED descriptor:
 *   { rel, isOwned, declaredOwner, ownerResolves }
 * isOwned = basename-match OR aliased OR has an OWNER field.
 * Returns the violation strings (empty when legal).
 */
export function evaluateCss(d) {
    const out = [];
    if (d.isOwned) {
        // C1 — an owned recipe MUST declare an OWNER that resolves.
        if (!d.declaredOwner) {
            out.push(`${d.rel} — component-owned CSS with NO \`OWNER: <component>\` header (declare its single owner; §2.6 documented-ownership)`);
        } else if (!d.ownerResolves) {
            out.push(`${d.rel} — declares OWNER "${d.declaredOwner}" which resolves to NO src/components/*/${d.declaredOwner}/ dir (a dangling owner)`);
        }
    } else {
        // C2 — a genuinely-global recipe must NOT claim a single owner.
        if (d.declaredOwner) {
            out.push(`${d.rel} — a global cascade file declares OWNER "${d.declaredOwner}" but is a no-single-owner recipe (a global recipe stays owner-less)`);
        }
    }
    return out;
}

function collectCss(dir, acc) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, e.name);
        if (e.isDirectory()) collectCss(full, acc);
        else if (e.name.endsWith(".css")) acc.push(full);
    }
    return acc;
}

function scan() {
    const names = componentDirNames();
    const owners = new Set([...names]);
    const files = collectCss(STYLES, []);
    return files.map((f) => {
        const relPath = rel(f);
        const styleRel = relPath.replace(/^src\/styles\//, "");
        const base = basename(f).replace(/\.css$/, "");
        const aliased = ALIASED_OWNERS[styleRel];
        const src = readFileSync(f, "utf8");
        const declaredOwner = parseOwnerField(src);
        const isOwned = owners.has(base) || Boolean(aliased) || Boolean(declaredOwner);
        const resolvedOwner = declaredOwner ?? (owners.has(base) ? base : aliased) ?? null;
        const ownerResolves = resolvedOwner ? owners.has(resolvedOwner) : false;
        return { rel: relPath, isOwned, declaredOwner, resolvedOwner, ownerResolves };
    });
}

function selfTest() {
    const fails = [];
    const check = (d, shouldFlag, name) => {
        const v = evaluateCss(d);
        if (shouldFlag && v.length === 0) fails.push(`[SELF-TEST] expected FLAG but passed: ${name}`);
        if (!shouldFlag && v.length !== 0) fails.push(`[SELF-TEST] expected PASS but flagged (${v[0]}): ${name}`);
    };
    // C1 — an owned recipe with no OWNER header REDs (the HEAD state).
    check({ rel: "src/styles/border-progress.css", isOwned: true, declaredOwner: null, ownerResolves: false }, true, "owned CSS lacks OWNER header");
    // C1-fence — an owned recipe WITH a resolving OWNER PASSES.
    check({ rel: "src/styles/border-progress.css", isOwned: true, declaredOwner: "border-progress", ownerResolves: true }, false, "owned CSS with resolving OWNER");
    // C1-dangle — an OWNER that resolves to no component dir REDs.
    check({ rel: "src/styles/border-progress.css", isOwned: true, declaredOwner: "bogus", ownerResolves: false }, true, "OWNER resolves to no component dir");
    // C2 — a global cascade file PASSES with no owner.
    check({ rel: "src/styles/tokens.css", isOwned: false, declaredOwner: null, ownerResolves: false }, false, "global cascade file, owner-less");
    // C2-fence — a global file that CLAIMS a single owner REDs.
    check({ rel: "src/styles/tokens.css", isOwned: false, declaredOwner: "dock", ownerResolves: true }, true, "global file claims a single owner");
    return fails;
}

function run() {
    const rows = scan();
    const violations = [];
    for (const r of rows) violations.push(...evaluateCss(r));
    const selfFails = selfTest();
    violations.push(...selfFails);

    const owned = rows.filter((r) => r.isOwned);
    const missingHeader = owned.filter((r) => !r.declaredOwner);
    console.log("PROTO proof:css-ownership — G6 documented-ownership (§2.6)");
    console.log(`  scanned ${rows.length} CSS files (${owned.length} component-owned, ${rows.length - owned.length} global)`);
    console.log(`  owned files MISSING an OWNER header (born-RED on HEAD): ${missingHeader.length}`);
    for (const r of missingHeader) console.log(`    ✗ ${r.rel}  (derived owner: ${r.resolvedOwner ?? "?"})`);
    console.log(`  self-test bites: ${selfFails.length === 0 ? "5/5 handled ✓" : selfFails.length + " FAILED"}`);
    const status = violations.length === 0 ? "PASS" : "FAIL";
    console.log(`\n  status: ${status} (born-RED expected until OWNER: headers land)`);
    process.exit(violations.length === 0 ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
