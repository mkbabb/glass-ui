#!/usr/bin/env node
// AZ.W-DOCK-TAXONOMY — proof:dock-taxonomy, the born-RED de-overload gate (arm a).
//
// The dock taxonomy is disambiguated from first principles (R3-2): ONE GlassDock on
// ONE orientation axis. The `variant` discriminant (`"dock" | "rail" |
// "instrument-strip"`) is GONE — there is no second way to express "vertical" (that
// is `orientation="vertical"` alone), and the "rail" noun is de-overloaded.
//
// This is a PURE DEVICE-FREE static src-scan gate (deletion proofs + an allowlist
// diff over src/ + demo/ + the force-pin absence — no browser, no GPU). It runs on
// EVERY runner and carries `ci` (the AY W-LIVE1 runner-truth disposition: a static
// source-scan gate is NOT in JUSTIFIED_LOCAL_ONLY). The captured arms (HG2's
// vertical-collapse frame-series, HG1's deletion stat) live in the DELTA and close
// under proof:live-verified-ledger.
//
// FOUR clauses:
//   T1 — no `variant="rail"`/`"instrument-strip"` value survives as a LIVE attribute
//        or prop literal in src/ or demo/ (comment-stripped — a historical prose
//        mention in a doc-block must NOT count, the false-witness discipline). RED on
//        a synthetic re-add of `variant="rail"` to a demo dock.
//   T2 — the "rail"-noun ALLOWLIST is exact + CLOSED (NOT a fuzzy substring count):
//        arm (a) admits ONLY `{ .dock-layer-rail (the in-dock switcher CSS class),
//        DockRail (the W-RAIL-EXTEND beyond-dock facility — the freed noun) }`. A NEW
//        unlisted `*Rail*` DOCK CONSTRUCT (a component/class/type named `*Rail*` in the
//        dock band outside the allowlist — e.g. a renamed-to-evade `DockRailExtended`)
//        REDs. T2 is a CEILING/allowlist check satisfiable at zero facility mounts
//        (the ≥2-mount floor is W-RAIL-EXTEND's own gate).
//   T3 — no `orientation === "vertical"` force-pin on `alwaysExpanded` in
//        useDockShellProps.ts (the vertical-collapse machinery the old variant denied).
//   T4 — the arm-a surface exists: ONE `GlassDock` whose `DockProps` carries NO
//        `variant` field (the discriminated union is collapsed to one shape).
//
// Bite-check: hand-add `variant="rail"` to a demo dock → exit 1; revert → exit 0.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// ── The arm-a "rail"-noun ALLOWLIST (the §6 reservation, made literal) ──────────
// The closed set of LEGITIMATE "rail"-named dock constructs for arm (a). T2 REDs any
// `*Rail*`/`*rail*` dock construct OUTSIDE this set.
const RAIL_ALLOWLIST = [
    // W-RAIL-EXTEND (the sibling Batch-2 wave): the DockRail chrome-slot class.
    "dock-rail-slot",
    "dock-layer-rail", // the in-DockLayerGroup switcher tab strip (CSS class + its component home)
    "DockLayerRail", // the test/component name for the .dock-layer-rail surface
    "DockRail", // the W-RAIL-EXTEND beyond-dock facility — the freed noun, RESERVED here
    // AZ.W-RAIL3 — the chip descriptor type for the DockRail floating-carousel strip's
    // `items` prop. NOT a new "rail" CONSTRUCT — it is a member TYPE of the sanctioned
    // DockRail noun (the `DockRail`'s item shape), so it rides the same reservation.
    "DockRailItem",
];

// The retired `variant` discriminant values that must NOT survive as a LIVE binding.
const DEAD_VARIANT_RE =
    /\bvariant\s*[=:]\s*["']\s*(rail|instrument-strip)\s*["']/;

function stripComments(text, kind) {
    // Blank /* */ and // comments to spaces (keep newlines), and <!-- --> for vue.
    let out = text
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(m.length - p1.length));
    if (kind === "vue") {
        out = out.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));
        // Blank `<code>…</code>` DISPLAY TEXT — a doc example showing `variant="rail"`
        // in a code-span is prose, never a live attribute binding (the false-witness
        // discipline; a real binding sits in markup, not inside a <code> span).
        out = out.replace(/<code\b[^>]*>[\s\S]*?<\/code>/g, (m) =>
            m.replace(/[^\n]/g, " "),
        );
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
        SRC: resolve(ROOT, "src"),
        DEMO: resolve(ROOT, "demo"),
        SHELLPROPS: resolve(
            ROOT,
            "src/components/custom/dock/composables/useDockShellProps.ts",
        ),
        GLASSDOCK: resolve(ROOT, "src/components/custom/dock/GlassDock.vue"),
        DOCK_DIR: resolve(ROOT, "src/components/custom/dock"),
        ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_TAXONOMY_ARTIFACT", "AZ-dock-taxonomy"),
    };
    return _cliPaths;
}

/**
 * The PURE detector (FS-injected) — exported so the born-RED self-test can feed a
 * synthetic `variant="rail"` re-add and assert exit 1.
 *
 * @param {object} fs  { srcFiles: [{path, text}], demoFiles: [...], shellPropsText,
 *                       glassDockText }
 */
export function detectTaxonomy(fs) {
    const violations = [];
    const facts = {};

    // ── T1 — no live `variant="rail"`/`"instrument-strip"` value (comment-stripped) ──
    const t1Hits = [];
    for (const f of [...fs.srcFiles, ...fs.demoFiles]) {
        const kind = f.path.endsWith(".vue") ? "vue" : "code";
        const live = stripComments(f.text, kind);
        if (DEAD_VARIANT_RE.test(live)) {
            t1Hits.push(f.path);
        }
    }
    facts.t1DeadVariantSites = t1Hits;
    if (t1Hits.length > 0) {
        violations.push(
            `T1: the retired \`variant="rail"|"instrument-strip"\` discriminant survives as a LIVE binding in ${t1Hits.length} file(s): ${t1Hits.join(", ")} — re-point to \`orientation="vertical"\` (the clean break, no alias)`,
        );
    }

    // ── T2 — the "rail"-noun ALLOWLIST is exact + closed ──
    // The overload was over CONSTRUCTS — a COMPONENT/surface NAMED "rail" (the prior
    // `GlassDock variant="rail"` nav DOCK, `.dock-layer-rail` switcher, `InstrumentRail`
    // cockpit). T2 scans the dock band for two construct shapes and REDs any OUTSIDE the
    // closed allowlist:
    //   (a) PascalCase COMPONENT/type identifiers containing "Rail" (e.g. `DockRail`,
    //       a renamed-to-evade `DockRailExtended`) — the surface-noun class.
    //   (b) CSS-CLASS selectors (`.foo-rail-…`) whose BASE class (the token up to the
    //       first BEM-style `-active`/`-bg`/`-hover`/etc. modifier) is unlisted.
    // EXCLUDED (not "constructs" in the overload sense, legitimate sub-parts of an
    // ALLOWED construct): `--dock-rail-*` CSS custom properties (tuning knobs on the
    // allowed vertical-dock / switcher surface), and lowerCamelCase API members
    // (`showRail`, `onRailFocusIn` — the DockLayerGroup switcher-rail props/handlers).
    // The timeline `ContinuousRail` is OUT of the dock band (different dir), not scanned.
    const allowSet = new Set(RAIL_ALLOWLIST.map((s) => s.toLowerCase()));
    // The base of a CSS class is the allowed token if the class STARTS WITH it.
    const allowBaseStarts = (cls) => {
        const c = cls.toLowerCase();
        return RAIL_ALLOWLIST.some((a) => {
            const al = a.toLowerCase();
            return c === al || c.startsWith(al + "-");
        });
    };
    const componentTokens = new Set();
    const cssClassTokens = new Set();
    for (const f of fs.dockBandFiles) {
        const live = stripComments(
            f.text,
            f.path.endsWith(".vue") ? "vue" : "code",
        );
        // (a) PascalCase component/type identifiers containing "Rail".
        for (const m of live.matchAll(/\b([A-Z][A-Za-z0-9]*Rail[A-Za-z0-9]*)\b/g)) {
            componentTokens.add(m[1]);
        }
        // (b) CSS class SELECTORS containing "rail" (a `.token` with a leading dot —
        //     a real class selector, NOT a `--custom-prop` and NOT a bare word).
        for (const m of live.matchAll(/\.([a-z][a-z0-9-]*rail[a-z0-9-]*)/g)) {
            cssClassTokens.add(m[1]);
        }
    }
    const unlistedComponents = [...componentTokens].filter(
        (t) => !allowSet.has(t.toLowerCase()),
    );
    const unlistedCss = [...cssClassTokens].filter((t) => !allowBaseStarts(t));
    const unlisted = [...unlistedComponents, ...unlistedCss];
    facts.railComponentTokens = [...componentTokens].sort();
    facts.railCssClassTokens = [...cssClassTokens].sort();
    facts.railAllowlist = RAIL_ALLOWLIST;
    facts.railUnlisted = unlisted.sort();
    if (unlisted.length > 0) {
        violations.push(
            `T2: ${unlisted.length} "rail"-named dock construct(s) OUTSIDE the closed arm-a allowlist {${RAIL_ALLOWLIST.join(", ")}}: ${unlisted.join(", ")} — a new \`*Rail*\` dock construct is a re-overload (the noun is de-overloaded by AZ.W-DOCK-TAXONOMY)`,
        );
    }

    // ── T3 — no `orientation === "vertical"` force-pin on alwaysExpanded ──
    const sp = stripComments(fs.shellPropsText, "code");
    // The retired pin: the alwaysExpanded computed OR'd `orientation.value ===
    // "vertical"` (or `props.orientation === "vertical"` in that block). Any
    // `=== "vertical"` inside an `alwaysExpanded` computed is the force-pin.
    const aeBlock = sp.match(
        /const\s+alwaysExpanded\s*=\s*computed\([\s\S]*?\);/,
    );
    const aeBody = aeBlock ? aeBlock[0] : "";
    const hasVerticalForcePin =
        /orientation\b[\s\S]*?===\s*["']vertical["']/.test(aeBody);
    facts.alwaysExpandedHasVerticalForcePin = hasVerticalForcePin;
    facts.alwaysExpandedFound = aeBlock !== null;
    if (!aeBlock) {
        violations.push(
            "T3: could not locate the `alwaysExpanded` computed in useDockShellProps.ts — the force-pin absence is unverifiable",
        );
    } else if (hasVerticalForcePin) {
        violations.push(
            'T3: the `orientation === "vertical"` force-pin reappeared on `alwaysExpanded` — a vertical dock must be collapsible by default (the collapse machinery applies on BOTH orientations)',
        );
    }

    // ── T4 — the arm-a single surface: DockProps carries NO `variant` field ──
    const noVariantField = !/\bvariant\??\s*:/.test(sp);
    const hasDockProps = /interface\s+DockProps\b/.test(sp);
    const noUnion =
        !/DockVariantProps\s*\|\s*DockRailProps|DockRailProps\s*\|\s*DockVariantProps/.test(
            sp,
        );
    facts.dockPropsNoVariantField = noVariantField;
    facts.dockPropsSingleInterface = hasDockProps;
    facts.dockPropsNoUnion = noUnion;
    if (!hasDockProps) {
        violations.push(
            "T4: no single `DockProps` interface in useDockShellProps.ts — the arm-a single-shape surface is missing",
        );
    }
    if (!noVariantField) {
        violations.push(
            "T4: `DockProps` still carries a `variant` field — the discriminant must be removed (the clean break)",
        );
    }
    if (!noUnion) {
        violations.push(
            "T4: the `DockVariantProps | DockRailProps` discriminated union survives — collapse it to ONE `DockProps` shape",
        );
    }
    // GlassDock.vue must NOT bind a `variant-${...}` class (the removed surface class).
    const gd = stripComments(fs.glassDockText, "vue");
    const hasVariantClass = /variant-\$\{/.test(gd) || /`variant-/.test(gd);
    facts.glassDockEmitsVariantClass = hasVariantClass;
    if (hasVariantClass) {
        violations.push(
            "T4: GlassDock.vue still emits a `variant-${variant}` class — the variant surface class is retired",
        );
    }

    return { violations, facts };
}

function loadFs() {
    const P = cliPaths();
    const srcCode = walk(P.SRC, [".ts", ".vue", ".css"], []);
    const demoCode = existsSync(P.DEMO)
        ? walk(P.DEMO, [".ts", ".vue", ".css"], [])
        : [];
    const dockBand = walk(P.DOCK_DIR, [".ts", ".vue"], []).concat(
        walk(resolve(P.SRC, "styles/dock"), [".css"], []),
    );
    const read = (f) => ({ path: relative(P.ROOT, f), text: readFileSync(f, "utf8") });
    return {
        srcFiles: srcCode.map(read),
        demoFiles: demoCode.map(read),
        dockBandFiles: dockBand.map(read),
        shellPropsText: readFileSync(P.SHELLPROPS, "utf8"),
        glassDockText: readFileSync(P.GLASSDOCK, "utf8"),
    };
}

function run() {
    const P = cliPaths();
    const fs = loadFs();
    const { violations, facts } = detectTaxonomy(fs);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-taxonomy",
        facts,
        violations,
    });

    console.log(
        "proof:dock-taxonomy — the dock taxonomy de-overload gate (AZ.W-DOCK-TAXONOMY, arm a)",
    );
    console.log(
        `  T1 dead-variant sites      : ${facts.t1DeadVariantSites.length} ${facts.t1DeadVariantSites.length === 0 ? "OK" : "RED"}`,
    );
    console.log(
        `  T2 rail-noun allowlist     : components=[${facts.railComponentTokens.join(", ")}] css=[${facts.railCssClassTokens.join(", ")}] unlisted=${facts.railUnlisted.length} ${facts.railUnlisted.length === 0 ? "OK" : "RED"}`,
    );
    console.log(
        `  T3 vertical force-pin gone : ${facts.alwaysExpandedFound ? (!facts.alwaysExpandedHasVerticalForcePin ? "OK" : "RED") : "NOT-FOUND"}`,
    );
    console.log(
        `  T4 single DockProps shape  : noVariant=${facts.dockPropsNoVariantField} noUnion=${facts.dockPropsNoUnion} noVariantClass=${!facts.glassDockEmitsVariantClass} ${facts.dockPropsNoVariantField && facts.dockPropsNoUnion && !facts.glassDockEmitsVariantClass ? "OK" : "RED"}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(P.ROOT, P.ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
