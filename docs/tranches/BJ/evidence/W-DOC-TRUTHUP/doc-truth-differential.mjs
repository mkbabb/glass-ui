#!/usr/bin/env node
// BJ.W-DOC-TRUTHUP — the one-time RED→GREEN doc-truth differential.
//
// The band file's acceptance battery: ONE differential (per-target stale-string grep +
// source-of-truth cross-check), enumerated 1:1 with the SWEEP-NOW roster, run at the
// pre-sweep tree and again at the post-sweep tree. Family J contributes ZERO standing
// gates — this script is a one-time instrument, not a CI fence.
//
// A probe reports RED when the false statement is live on disk. Cross-check probes
// compare prose against its source of truth programmatically; they never assert a
// remembered literal (the dock row moved 0.30 -> 0.35 and the settle clock 0.19s ->
// 0.22s under IOS27-MICRO W-1 while this band was open — equality against
// SPRING_PRESETS self-corrects, a literal does not).
//
// Usage:  node doc-truth-differential.mjs [--json]

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../../..");

const read = (p) => (existsSync(resolve(ROOT, p)) ? readFileSync(resolve(ROOT, p), "utf8") : null);

/** Lines of `p` containing `needle` (string or RegExp), as `path:line: text`. */
const hits = (p, needle) => {
    const src = read(p);
    if (src === null) return [`MISSING FILE ${p}`];
    const test = needle instanceof RegExp ? (l) => needle.test(l) : (l) => l.includes(needle);
    return src
        .split("\n")
        .map((text, i) => ({ text, n: i + 1 }))
        .filter(({ text }) => test(text))
        .map(({ text, n }) => `${p}:${n}: ${text.trim()}`);
};

/** git grep -in across a pathspec, as `path:line: text`. */
const gitGrep = (pattern, pathspec) => {
    try {
        return execFileSync("git", ["grep", "-in", pattern, "--", pathspec], {
            cwd: ROOT,
            encoding: "utf8",
        })
            .trim()
            .split("\n")
            .filter(Boolean);
    } catch {
        return []; // git grep exits 1 on zero matches
    }
};

// ── Sources of truth, parsed at run time ────────────────────────────────────────

/** SPRING_PRESETS rows: [{ name, response, zeta }] parsed from the no-second-authority root. */
const springPresets = () => {
    const src = read("src/composables/motion/spring/springPresets.ts") ?? "";
    const rows = [];
    const re = /name:\s*"([^"]+)",\s*response:\s*([\d.]+),\s*dampingFraction:\s*([\d.]+)/g;
    let m;
    while ((m = re.exec(src))) rows.push({ name: m[1], response: +m[2], zeta: +m[3] });
    return rows;
};

const n2 = (x) => x.toFixed(2);

/** Constant `(response, dampingFraction)` from a literal `as const` object. */
const constPair = (p, name) => {
    const src = read(p) ?? "";
    const m = new RegExp(
        `${name}\\s*=\\s*\\{\\s*response:\\s*([\\d.]+),\\s*dampingFraction:\\s*([\\d.]+)`,
    ).exec(src);
    return m ? { response: +m[1], zeta: +m[2] } : null;
};

// ── Probes, 1:1 with the SWEEP-NOW roster ───────────────────────────────────────

const probes = [];
const probe = (id, klass, desc, run) => probes.push({ id, klass, desc, run });

// ── Class A — spring/motion constant mirrors ────────────────────────────────────

probe("T1", "A", "scheme-spring.css dock mirror row equals SPRING_PRESETS (no 0.68s/ζ=0.64)", () => {
    const stale = hits("src/styles/tokens/scheme-spring.css", "0.68s, ζ=0.64");
    const dock = springPresets().find((r) => r.name === "dock");
    const mirrored = hits(
        "src/styles/tokens/scheme-spring.css",
        new RegExp(`^\\s*dock:\\s*\\(${n2(dock.response)}s, ζ=${n2(dock.zeta)},`),
    ).filter((h) => !h.startsWith("MISSING"));
    return {
        red: stale.length > 0 || mirrored.length !== 1,
        detail: [
            ...stale.map((h) => `STALE ${h}`),
            mirrored.length === 1
                ? `OK mirror dock == springPresets (${n2(dock.response)}s, ζ=${n2(dock.zeta)})`
                : `MISSING mirror row for dock == (${n2(dock.response)}s, ζ=${n2(dock.zeta)})`,
        ],
    };
});

probe("T2", "A", "scheme-spring.css mirror covers EVERY SPRING_PRESETS row (transient included)", () => {
    const src = read("src/styles/tokens/scheme-spring.css") ?? "";
    const mirror = new Map();
    for (const line of src.split("\n")) {
        const m = /^\s*([a-z-]+):\s*\(([\d.]+)s, ζ=([\d.]+),/.exec(line);
        if (m) mirror.set(m[1], { response: +m[2], zeta: +m[3] });
    }
    const detail = [];
    let red = false;
    for (const row of springPresets()) {
        const got = mirror.get(row.name);
        if (!got) {
            red = true;
            detail.push(`ABSENT mirror row '${row.name}' (springPresets has it)`);
        } else if (n2(got.response) !== n2(row.response) || n2(got.zeta) !== n2(row.zeta)) {
            red = true;
            detail.push(
                `DRIFT '${row.name}' mirror (${n2(got.response)}, ${n2(got.zeta)}) != springPresets (${n2(row.response)}, ${n2(row.zeta)})`,
            );
        }
    }
    detail.unshift(`springPresets rows=${springPresets().length}; mirror rows=${mirror.size}`);
    return { red, detail };
});

probe("T9", "A", "tunable-anim.md kind-1 table equals SPRING_PRESETS in every row", () => {
    const src = read("docs/design/tunable-anim.md") ?? "";
    const detail = [];
    let red = false;
    const table = new Map();
    for (const line of src.split("\n")) {
        const m = /^\|\s*([a-z-]+)\s*\|\s*`--spring-[a-z-]+`\s*\|\s*([\d.]+),\s*([\d.]+)/.exec(line);
        if (m) table.set(m[1], { response: +m[2], zeta: +m[3] });
    }
    for (const [name, got] of table) {
        const truth = springPresets().find((r) => r.name === name);
        if (!truth) continue;
        if (n2(got.response) !== n2(truth.response) || n2(got.zeta) !== n2(truth.zeta)) {
            red = true;
            detail.push(
                `DRIFT '${name}' doc (${n2(got.response)}, ${n2(got.zeta)}) != springPresets (${n2(truth.response)}, ${n2(truth.zeta)})`,
            );
        }
    }
    // the retired wave-id token + the stale hand-written duration claim
    for (const stale of ["BD.W-ANIM-IOS27-TUNE", "--spring-dock-duration 0.66s"]) {
        const h = hits("docs/design/tunable-anim.md", stale);
        if (h.length) {
            red = true;
            detail.push(...h.map((x) => `STALE ${x}`));
        }
    }
    detail.unshift(`doc rows cross-checked=${table.size}`);
    return { red, detail };
});

probe("T5", "A", "tunable-anim.md reveal-blur states the per-register model, not a single 4px default", () => {
    const rows = hits("docs/design/tunable-anim.md", "--glass-reveal-blur").filter(
        (l) => !l.startsWith("MISSING"),
    );
    const single4px = rows.filter((l) => /\|\s*4px\s*\|/.test(l));
    return {
        red: single4px.length > 0,
        detail: single4px.length
            ? single4px.map((h) => `STALE single-4px-default ${h}`)
            : [`OK no single-4px default row (${rows.length} reveal-blur row(s) present)`],
    };
});

probe("T10", "A", "motion-system.md names ζ=0.80 for --spring-smooth (0.86 is useSpring's own default)", () => {
    const src = read("docs/canon/motion-system.md") ?? "";
    const smooth = springPresets().find((r) => r.name === "smooth");
    const bad = src
        .split("\n")
        .map((text, i) => ({ text, n: i + 1 }))
        .filter(({ text }) => /--spring-smooth/.test(text) && /ζ=0\.86/.test(text))
        .map(({ text, n }) => `docs/canon/motion-system.md:${n}: ${text.trim()}`);
    return {
        red: bad.length > 0,
        detail: bad.length
            ? bad.map((h) => `STALE ${h}`)
            : [`OK --spring-smooth ζ stated as ${n2(smooth.zeta)} (springPresets)`],
    };
});

probe("T11", "A", "motion-canon.md DRAWER_SNAP equals drawer/constants.ts; dead proof scripts uncited", () => {
    const truth = constPair("src/components/drawer/constants.ts", "DRAWER_SNAP");
    const src = read("docs/design/motion-canon.md") ?? "";
    const detail = [];
    let red = false;
    const line = src.split("\n").find((l) => l.includes("`DRAWER_SNAP`"));
    if (!truth) {
        red = true;
        detail.push("MISSING DRAWER_SNAP in drawer/constants.ts");
    } else if (!line || !line.includes(`(${truth.response}, ${truth.zeta})`)) {
        red = true;
        detail.push(`DRIFT doc DRAWER_SNAP row != constants (${truth.response}, ${truth.zeta}): ${line?.trim()}`);
    } else {
        detail.push(`OK DRAWER_SNAP == (${truth.response}, ${truth.zeta})`);
    }
    for (const dead of ["proof-no-layout-animation.mjs", "proof-animation-coherence.mjs"]) {
        const h = hits("docs/design/motion-canon.md", dead);
        if (h.length) {
            red = true;
            detail.push(...h.map((x) => `DEAD-GATE-CITED ${x}`));
        }
        if (existsSync(resolve(ROOT, "scripts", dead))) detail.push(`NOTE scripts/${dead} exists`);
    }
    return { red, detail };
});

probe("T11b", "A", "motion-canon.md DOCK_SPRING equals springPresets dock; wave-id token dropped", () => {
    const dock = springPresets().find((r) => r.name === "dock");
    const src = read("docs/design/motion-canon.md") ?? "";
    const line = src.split("\n").find((l) => l.includes("`DOCK_SPRING`"));
    const detail = [];
    let red = false;
    if (!line || !line.includes(`(${dock.response}, ${dock.zeta})`)) {
        red = true;
        detail.push(`DRIFT doc DOCK_SPRING row != springPresets (${dock.response}, ${dock.zeta}): ${line?.trim()}`);
    } else {
        detail.push(`OK DOCK_SPRING == springPresets dock (${dock.response}, ${dock.zeta})`);
    }
    const wave = hits("docs/design/motion-canon.md", "BD.W-ANIM-IOS27-TUNE");
    if (wave.length) {
        red = true;
        detail.push(...wave.map((x) => `STALE ${x}`));
    }
    return { red, detail };
});

// ── Class B — the dock comment web ──────────────────────────────────────────────

/** A plain stale-string probe: RED while any hit survives. */
const staleProbe = (id, klass, desc, targets) =>
    probe(id, klass, desc, () => {
        const found = targets.flatMap(([p, needle]) =>
            hits(p, needle).filter((l) => !l.startsWith("MISSING FILE")),
        );
        return {
            red: found.length > 0,
            detail: found.length ? found.map((h) => `STALE ${h}`) : ["OK 0 hits"],
        };
    });

probe("T12", "B", "shell.css carries ONE truthful containment block (no palimpsest)", () => {
    const src = read("src/components/dock/styles/shell.css") ?? "";
    // the comment wraps, so the mangled sentence spans lines — judge the normalized text
    const flat = src.replace(/\s+/g, " ");
    const detail = [];
    let red = false;
    if (/When retires `--dock-morph-t`/.test(flat)) {
        red = true;
        detail.push('MANGLED sentence live: "When retires `--dock-morph-t`," (subject lost)');
    }
    // the palimpsest: a RETAINED-paint claim standing over a declaration that has no paint
    const declaresPaint = /contain:\s*layout\s+style\s+paint\s*;/.test(src);
    const claimsRetained = /`paint` axis is RETAINED|[Pp]aint containment so the maximal-glass/.test(flat);
    if (!declaresPaint && claimsRetained) {
        red = true;
        detail.push(
            "PALIMPSEST: the comment argues the `paint` axis is RETAINED while the declaration is `contain: layout style` (NO paint)",
        );
    }
    if (!red) detail.push(`OK one truthful block (declaration carries paint: ${declaresPaint})`);
    return { red, detail };
});

probe("T13", "B", "useDockSearch armSearch JSDoc names expand()+keepOpen()", () => {
    // The reroute landed at :247-256 — armSearch composes `expand()` + `keepOpen()`. A
    // NEGATIVE reference (the implementation comment explaining why it is NOT the
    // environmental `onClickCollapsed()`) is truthful and stays; only a POSITIVE
    // attribution is the T13 defect.
    const impl = read("src/components/dock/composables/useDockSearch.ts") ?? "";
    const implLines = impl.split("\n");
    // a NEGATIVE reference may place its "NOT" on an adjacent line — judge a 2-line window
    const positive = implLines
        .map((text, i) => ({ text, n: i + 1 }))
        .filter(({ text }) => text.includes("onClickCollapsed"))
        .filter(({ n }) => !/\bNOT\b/.test(implLines.slice(Math.max(0, n - 3), n + 1).join(" ")))
        .map(({ text, n }) => `src/components/dock/composables/useDockSearch.ts:${n}: ${text.trim()}`);
    const body = impl.slice(
        impl.indexOf("function armSearch"),
        impl.indexOf("function disarmSearch"),
    );
    const composes =
        body.includes("dockState.expand()") && body.includes("dockState.keepOpen()");
    return {
        red: positive.length > 0 || !composes,
        detail: [
            ...positive.map((h) => `STALE positive onClickCollapsed attribution ${h}`),
            composes
                ? "OK armSearch body composes expand() + keepOpen()"
                : "MISSING expand()+keepOpen() composition in armSearch",
        ],
    };
});

probe("T14", "B", "useDockShellProps collapseDelay JSDoc equals the shipped default", () => {
    const src = read("src/components/dock/composables/useDockShellProps.ts") ?? "";
    const impl = /collapseDelay\s*\?\?\s*(\d+)/.exec(src);
    const detail = [];
    let red = false;
    if (!impl) {
        red = true;
        detail.push("MISSING `collapseDelay ?? <n>` implementation default");
    } else {
        const doc = src.split("\n").filter((l) => /default\s+\d+/.test(l) && /\*/.test(l));
        const wrong = doc.filter((l) => !l.includes(`default ${impl[1]}`));
        if (wrong.length) {
            red = true;
            detail.push(...wrong.map((l) => `DRIFT doc says "${l.trim()}" — impl default is ${impl[1]}`));
        } else {
            detail.push(`OK JSDoc default == impl (${impl[1]})`);
        }
    }
    return { red, detail };
});

probe("T15", "B", "the useLiquidFlex/motion consumer rosters name only real importers", () => {
    const detail = [];
    let red = false;
    // (a) the definition-absent consumer must be gone from both rosters
    for (const p of ["src/composables/motion/core/index.ts", "src/styles/tokens/scheme-motion.css"]) {
        const h = hits(p, "useDockOrientationMorph");
        if (h.length) {
            red = true;
            detail.push(...h.map((x) => `STALE definition-absent consumer ${x}`));
        }
    }
    // (b) the roster comment must name real importers only (the comment-mention-as-consumer class)
    const idx = "src/composables/motion/core/index.ts";
    const src = read(idx) ?? "";
    // the roster is a multi-line `//` comment block — join it through its terminating period
    const lines = src.split("\n");
    const start = lines.findIndex((l) => l.includes("≥2 consumers:"));
    let roster = null;
    if (start !== -1) {
        const block = [];
        for (let i = start; i < lines.length && lines[i].trim().startsWith("//"); i += 1) {
            block.push(lines[i]);
            if (lines[i].trim().endsWith(".")) break;
        }
        roster = block.join(" ");
    }
    const importers = new Set(
        gitGrep('import { useLiquidFlex }', "src/")
            .map((l) => l.split(":")[0])
            .map((p) => p.split("/").pop().replace(/\.(ts|vue)$/, "")),
    );
    if (!roster) {
        red = true;
        detail.push(`MISSING useLiquidFlex consumer roster comment in ${idx}`);
    } else {
        const named = [...roster.matchAll(/\b(use[A-Z]\w+|[A-Z]\w*Timeline)\b/g)].map((m) => m[1]);
        const phantom = named.filter((n) => n !== "useLiquidFlex" && !importers.has(n));
        if (phantom.length) {
            red = true;
            detail.push(`PHANTOM consumers named but never importing: ${phantom.join(", ")}`);
        }
        const unnamed = [...importers].filter((n) => !named.includes(n));
        if (unnamed.length) {
            red = true;
            detail.push(`UNNAMED real importers: ${unnamed.join(", ")}`);
        }
        if (!phantom.length && !unnamed.length)
            detail.push(`OK roster == importers on disk (${[...importers].sort().join(", ")})`);
    }
    return { red, detail };
});

staleProbe("T16", "B", "dock/styles/index.css @property comment states shipped truth only", [
    ["src/components/dock/styles/index.css", "sole driver"],
    ["src/components/dock/styles/index.css", "deletes the scalar zoo"],
]);

staleProbe("T18", "B", "overflow.css states the visible->auto coercion, not a clip", [
    ["src/components/dock/styles/overflow.css", "spec-forces the computed cross axis to a clip"],
]);

staleProbe("T19", "B", "dock/index.ts states the SearchBar keeps / FuzzySearch dies split", [
    ["src/components/dock/index.ts", "its 7 search composables retire"],
]);

// ── Class C — procedural / booked residue ───────────────────────────────────────

staleProbe("T4", "C", "uniformBridge states the real applyMedium routing, not a smooth degrade", [
    ["src/components/aurora/composables/uniformBridge.ts", "renders the smooth core for every painterly id"],
]);

staleProbe("T20", "C", "glass.css carries no owner-less booked BE follow", [
    ["src/styles/tokens/glass.css", "booked BE follow"],
]);

staleProbe("T21", "C", "the flow shader headers cite live consumers only (paper-grid is deleted)", [
    ["src/composables/glass/webgl/shaders/flow.wgsl.ts", "paper-grid"],
    ["src/composables/glass/webgl/shaders/flow.glsl.ts", "paper-grid"],
]);

probe("G-booked", "C", "0 UN-OWNED booking markers in src/ (stated allowlist + the W5-expiry pair)", () => {
    // The band file's stated allowlist, verbatim:
    //   GlassDock.vue     — OWNED (names the live docs/consumer-evidence/use-glass-backdrop-luminance.md)
    //   radius.css        — OWNED (standards-gated Baseline deferral; its own text disclaims masking-fallback)
    //   GlassTimeline.vue — the :139/:173 pair rides BAND-REDUCTION W5's six-variant redesign and
    //                       EXPIRES with it; the differential must not false-RED on it before W5 lands.
    const allow = [
        /^src\/components\/dock\/GlassDock\.vue:/,
        /^src\/styles\/theme\/radius\.css:/,
        /^src\/components\/timeline\/GlassTimeline\.vue:/,
    ];
    const all = gitGrep("booked", "src/");
    const unowned = all.filter((l) => !allow.some((re) => re.test(l)));
    const owned = all.filter((l) => allow.some((re) => re.test(l)));
    return {
        red: unowned.length > 0,
        detail: [
            `census: ${all.length} 'booked' hit(s) in src/ — ${owned.length} allowlisted, ${unowned.length} un-owned`,
            ...owned.map((h) => `ALLOWED ${h}`),
            ...unowned.map((h) => `UN-OWNED ${h}`),
        ],
    };
});

// ── Class D — canon / root docs ─────────────────────────────────────────────────

staleProbe("T22", "D", "glass-system.md names resolveSurfaceClass; GlassPanel/Sheet dropped", [
    ["docs/canon/glass-system.md", "useSurfaceAxis"],
]);

probe("T23", "D", "the peer tables carry the bare embla-carousel row (11 peers)", () => {
    const pkg = JSON.parse(read("package.json"));
    const peers = Object.keys(pkg.peerDependencies ?? {});
    const detail = [`package.json peers=${peers.length}`];
    let red = false;
    for (const p of ["docs/canon/dependencies.md", "docs/canon/deps-currency.md"]) {
        const src = read(p) ?? "";
        // a BARE peer row must not be satisfied by a longer sibling name: `embla-carousel`
        // is a substring of `embla-carousel-vue`, and the bare row is precisely what T23
        // says is missing. Require the name terminated by a non-name character.
        const missing = peers.filter(
            (name) =>
                !new RegExp(`${name.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&")}(?![\\w-])`).test(src),
        );
        if (missing.length) {
            red = true;
            detail.push(`${p}: MISSING peer row(s) ${missing.join(", ")}`);
        } else {
            detail.push(`${p}: OK all ${peers.length} peers present`);
        }
    }
    return { red, detail };
});

probe("T24", "D", "CONTRIBUTING.md describes the real flow (no changesets, no proof:all, no false CI claim)", () => {
    const detail = [];
    let red = false;
    for (const stale of ["proof:all", "npx changeset", "Version Packages", ".changeset/config.json"]) {
        const h = hits("CONTRIBUTING.md", stale);
        if (h.length) {
            red = true;
            detail.push(...h.map((x) => `STALE ${x}`));
        }
    }
    if (existsSync(resolve(ROOT, ".changeset"))) detail.push("NOTE .changeset/ exists on disk");
    // the CI claim must match the workflows: no workflow invokes profile:bundle / --enforce
    const wfDir = resolve(ROOT, ".github/workflows");
    const wf = existsSync(wfDir)
        ? readdirSync(wfDir).map((f) => readFileSync(resolve(wfDir, f), "utf8")).join("\n")
        : "";
    const ciRunsBundle = /profile:bundle|--enforce/.test(wf);
    const docClaimsCI = hits("CONTRIBUTING.md", /profile:bundle.*\(--enforce in CI\)/);
    if (!ciRunsBundle && docClaimsCI.length) {
        red = true;
        detail.push(...docClaimsCI.map((x) => `FALSE-CI-CLAIM ${x} (no workflow invokes profile:bundle/--enforce)`));
    } else {
        detail.push(`OK bundle-budget CI claim consistent (workflows invoke it: ${ciRunsBundle})`);
    }
    return { red, detail };
});

probe("T25", "D", "structure.md is not called GENERATED (no generator exists in scripts/)", () => {
    const generator = readdirSync(resolve(ROOT, "scripts")).filter((f) => /structure/i.test(f));
    const detail = [`scripts/ structure-generators found: ${generator.length}`];
    let red = false;
    for (const [p, needle] of [
        ["README.md", "never hand-maintained"],
        ["scripts/lib/canon-doc.mjs", "GENERATED"],
    ]) {
        const h = hits(p, needle).filter((l) => !l.startsWith("MISSING FILE"));
        if (h.length && generator.length === 0) {
            red = true;
            detail.push(...h.map((x) => `STALE ${x}`));
        }
    }
    if (!red) detail.push("OK no GENERATED/never-hand-maintained claim for structure.md");
    return { red, detail };
});

probe("T26", "D", "subpath-policy.mjs class-count comments equal the programmatic recount", () => {
    const src = read("scripts/lib/subpath-policy.mjs") ?? "";
    const detail = [];
    let red = false;
    // the comments' claimed counts, e.g. "PUBLISH (23)"
    // The counts are PER-GROUP, not file totals: each `// PUBLISH (N)` / `// INTERNAL (N)`
    // header owns the entries that follow it up to the next header. Count each group's
    // real members and compare to its own claim (RF-2's per-group recount).
    const lines = src.split("\n");
    let current = null;
    const groups = [];
    for (let i = 0; i < lines.length; i += 1) {
        const header = /^\s*\/\/\s*(PUBLISH|INTERNAL)\s*\((\d+)\)/.exec(lines[i]);
        if (header) {
            current = { klass: header[1], claimed: +header[2], line: i + 1, actual: 0 };
            groups.push(current);
            continue;
        }
        if (!current) continue;
        // a group ends at the next header or at a non-entry structural line
        const entries = [...lines[i].matchAll(/"?[\w-]+"?\s*:\s*"(PUBLISH|INTERNAL)"/g)];
        for (const e of entries) if (e[1] === current.klass) current.actual += 1;
    }
    if (groups.length === 0) {
        red = true;
        detail.push("MISSING per-group class-count comments");
    }
    for (const g of groups) {
        const ok = g.claimed === g.actual;
        if (!ok) red = true;
        detail.push(
            `${ok ? "OK" : "DRIFT"} subpath-policy.mjs:${g.line} ${g.klass} claims ${g.claimed}, counted ${g.actual}`,
        );
    }
    return { red, detail };
});

probe("T27", "D", "DESIGN.md makes no present-tense claim about deleted demo files", () => {
    const src = read("DESIGN.md") ?? "";
    const detail = [];
    let red = false;
    for (const p of [
        "demo/stories/compositions/dock-with-slider.vue",
        "primitives/configurator.vue",
    ]) {
        const onDisk = existsSync(resolve(ROOT, p)) || existsSync(resolve(ROOT, "demo", p));
        const lines = src
            .split("\n")
            .map((text, i) => ({ text, n: i + 1 }))
            .filter(({ text }) => text.includes(p));
        const presentTense = lines.filter(({ text }) => /\blives at\b|\bis a live consumer\b/.test(text));
        if (!onDisk && presentTense.length) {
            red = true;
            detail.push(...presentTense.map(({ text, n }) => `STALE DESIGN.md:${n}: ${text.trim()} (path ABSENT)`));
        }
    }
    if (!red) detail.push("OK no present-tense claims over absent demo paths");
    return { red, detail };
});

probe("T28", "D", "affordance-map.md style-home cells cite live paths only", () => {
    const src = read("docs/design/affordance-map.md") ?? "";
    const detail = [];
    let red = false;
    // (a) the retired path shapes
    for (const stale of ["dock-controls/", "toggle/index.ts"]) {
        const h = hits("docs/design/affordance-map.md", stale);
        if (h.length) {
            red = true;
            detail.push(...h.map((x) => `STALE ${x}`));
        }
    }
    // (b) every backticked src path cited in the table must exist somewhere in src/
    const cited = new Set([...src.matchAll(/`([a-zA-Z0-9_\-/]+\.(?:css|ts|vue))`/g)].map((m) => m[1]));
    const absent = [];
    for (const c of cited) {
        const found = execFileSync("bash", ["-c", `find src -path '*${c}' -print -quit`], {
            cwd: ROOT,
            encoding: "utf8",
        }).trim();
        if (!found) absent.push(c);
    }
    if (absent.length) detail.push(`NOTE cited names not resolvable as src paths (bare filenames ok): ${absent.join(", ")}`);
    // (c) the ToggleGroupItem row must name the file that actually applies tap-squish
    const row = src.split("\n").find((l) => l.includes("**ToggleGroupItem** (default variant)"));
    if (row) {
        const squishInStyles = hits("src/components/toggle-group/styles.css", "tap-squish").filter(
            (l) => !l.startsWith("MISSING"),
        );
        if (/styles\.css`?\s*\(`transition-control`/.test(row) && squishInStyles.length === 0) {
            red = true;
            detail.push(`FALSE style-home cell: ${row.trim()}`);
        } else {
            detail.push("OK ToggleGroupItem style-home cell names the applying file");
        }
    }
    return { red, detail };
});

probe("T29", "D", "useScrollScene cites the installed keyframes.js version", () => {
    const pkg = JSON.parse(read("package.json"));
    const installed =
        pkg.peerDependencies?.["@mkbabb/keyframes.js"] ??
        pkg.devDependencies?.["@mkbabb/keyframes.js"] ??
        "";
    const src = read("src/composables/motion/scroll/useScrollScene.ts") ?? "";
    const bad = src
        .split("\n")
        .map((text, i) => ({ text, n: i + 1 }))
        .filter(({ text }) => /keyframes\.js@?[\d^~.]*4\.3\.0/.test(text));
    return {
        red: bad.length > 0,
        detail: bad.length
            ? bad.map(({ text, n }) => `STALE useScrollScene.ts:${n}: ${text.trim()} (installed ${installed})`)
            : [`OK no stale 4.3.0 citation (installed ${installed})`],
    };
});

probe("T30", "D", "MIGRATION.md states value.js as an OPTIONAL peer (matching peerDependenciesMeta)", () => {
    const pkg = JSON.parse(read("package.json"));
    const optional = pkg.peerDependenciesMeta?.["@mkbabb/value.js"]?.optional === true;
    const src = read("MIGRATION.md") ?? "";
    const bad = src
        .split("\n")
        .map((text, i) => ({ text, n: i + 1 }))
        // the emphasis markers are optional — the false claim is the word "requires"
        .filter(({ text }) => /7\.0 package line \**requires\**/.test(text) && /value\.js/.test(text));
    return {
        red: optional && bad.length > 0,
        detail: bad.length
            ? bad.map(({ text, n }) => `STALE MIGRATION.md:${n}: ${text.trim()} (peerDependenciesMeta optional=${optional})`)
            : [`OK optionality stated consistently (peerDependenciesMeta optional=${optional})`],
    };
});

probe("T33", "D", "timeline/README §Exports matches timeline/index.ts", () => {
    const idx = read("src/components/timeline/index.ts") ?? "";
    const readme = read("src/components/timeline/README.md") ?? "";
    const exported = new Set([...idx.matchAll(/\b(GlassTimeline|ContinuousTimeline|ContinuousRail|ContinuousMarkers|ScrubberTimeline|SegmentedTimeline)\b/g)].map((m) => m[1]));
    const section = readme.split(/^##\s/m).find((s) => /^Exports/i.test(s)) ?? "";
    const claimed = new Set([...section.matchAll(/\b(GlassTimeline|ContinuousTimeline|ContinuousRail|ContinuousMarkers|ScrubberTimeline|SegmentedTimeline)\b/g)].map((m) => m[1]));
    const phantom = [...claimed].filter((c) => !exported.has(c));
    return {
        red: phantom.length > 0,
        detail: phantom.length
            ? [`PHANTOM exports documented: ${phantom.join(", ")} (index.ts exports: ${[...exported].join(", ") || "none"})`]
            : [`OK §Exports == index.ts (${[...exported].join(", ")})`],
    };
});

// ── Class E — tranche / coordination records ────────────────────────────────────

probe("T3", "E", "src/ carries zero BI.W- wave-id tokens (greenfield-no-meta)", () => {
    const found = gitGrep("BI\\.W-", "src/");
    return {
        red: found.length > 0,
        detail: found.length ? found.map((h) => `STALE ${h}`) : ["OK 0 BI.W- tokens in src/"],
    };
});

staleProbe("T7", "E", "asks-and-consumes row 15 reads capability-keep, not 'badge SHARED-KEEP'", [
    ["docs/tranches/BI/coordination/asks-and-consumes.md", "badge SHARED-KEEP"],
]);

probe("T8", "E", "no 'Tooltip preset' survives (TooltipProps carries no preset prop)", () => {
    const tooltip = read("src/components/ui/tooltip/Tooltip.vue") ?? read("src/components/tooltip/Tooltip.vue") ?? "";
    const hasPresetProp = /\bpreset\??\s*:/.test(tooltip);
    const found = [
        ...hits("docs/tranches/BI/coordination/asks-and-consumes.md", /Tooltip preset|Tooltip PRESET/),
        ...hits("docs/tranches/BI/waves/BI.W-SPEEDTEST-ONLY-PAIR.md", /Tooltip preset|preset="icon"/),
    ].filter((l) => !l.startsWith("MISSING FILE"));
    return {
        red: found.length > 0 && !hasPresetProp,
        detail: found.length
            ? found.map((h) => `STALE ${h} (TooltipProps has preset prop: ${hasPresetProp})`)
            : [`OK 0 'Tooltip preset' claims (TooltipProps has preset prop: ${hasPresetProp})`],
    };
});

staleProbe("T8b", "E", "BI.W-SPEEDTEST-ONLY-PAIR states the compose-the-family migration", [
    ["docs/tranches/BI/waves/BI.W-SPEEDTEST-ONLY-PAIR.md", 'preset="icon"'],
    ["docs/tranches/BI/waves/BI.W-SPEEDTEST-ONLY-PAIR.md", "the Tooltip preset"],
]);

probe("T35", "E", "the pin-guard section + row 6 are stamped SUPERSEDED-BY-Q060", () => {
    const src = read("docs/tranches/BI/coordination/asks-and-consumes.md") ?? "";
    const stamped = /SUPERSEDED-BY-Q060|SUPERSEDED BY Q060/.test(src);
    const staleStatus = hits(
        "docs/tranches/BI/coordination/asks-and-consumes.md",
        "file when BI.W-metric-move lands",
    ).filter((l) => !l.startsWith("MISSING"));
    return {
        red: !stamped || staleStatus.length > 0,
        detail: [
            stamped ? "OK SUPERSEDED-BY-Q060 stamp present" : "MISSING SUPERSEDED-BY-Q060 stamp",
            ...staleStatus.map((h) => `STALE ${h}`),
        ],
    };
});

// Class E house style (band file, OPEN-7): shipped/dated records are corrected by an
// APPENDED dated `[CORRECTION YYYY-MM-DD]` marker, never by rewriting history in place —
// so the superseded phrase legitimately survives beneath its correction. These probes
// therefore assert the marker EXISTS and addresses the claim; a bare stale-string grep
// would false-RED on the correction's own quotation of the phrase it corrects.
const correctionProbe = (id, klass, desc, file, staleNeedle, keywords) =>
    probe(id, klass, desc, () => {
        const src = read(file);
        if (src === null) return { red: true, detail: [`MISSING FILE ${file}`] };
        const stale = src.includes(staleNeedle);
        const markers = src
            .split("\n")
            .map((text, i) => ({ text, n: i + 1 }))
            .filter(({ text }) => /\[CORRECTION\s+\d{4}-\d{2}-\d{2}\]/.test(text));
        const addressing = markers.filter(({ text }, idx) => {
            // the marker itself or the two lines following it must carry a claim keyword
            const window = src.split("\n").slice(markers[idx].n - 1, markers[idx].n + 3).join(" ");
            return keywords.some((k) => new RegExp(k, "i").test(window));
        });
        const red = stale && addressing.length === 0;
        return {
            red,
            detail: red
                ? [`UNCORRECTED "${staleNeedle}" is live with no dated [CORRECTION] addressing it`]
                : stale
                  ? addressing.map(({ text, n }) => `OK corrected in place — ${file}:${n}: ${text.trim().slice(0, 110)}`)
                  : [`OK "${staleNeedle}" absent from ${file}`],
        };
    });

correctionProbe(
    "T36",
    "E",
    "BI.W-LADDER-DERIVE tail reconciled (not 'Awaiting challenge seat 2')",
    "docs/tranches/BI/waves/BI.W-LADDER-DERIVE.md",
    "Awaiting challenge seat 2",
    ["seat 2 ran", "two-consecutive-clean", "Nothing is awaited"],
);

correctionProbe(
    "T37",
    "E",
    "BI.W-GLASS-SUBTLETY records BLUR-MUTE as executed-then-removed",
    "docs/tranches/BI/waves/BI.W-GLASS-SUBTLETY.md",
    "nothing to retire",
    ["BLUR-MUTE WAS built", "executed-then-removed", "then removed"],
);

correctionProbe(
    "T38",
    "E",
    "BI.W-GRADED-BACKDROP reconciles with the attested progressive ramp",
    "docs/tranches/BI/waves/BI.W-GRADED-BACKDROP.md",
    "uniform-radius, never progressive falloff",
    ["withdrawn", "progressive", "supersedes"],
);

probe("T39", "E", "ASSEMBLY-CROSSWALK band count equals the disk count", () => {
    const bands = readdirSync(resolve(ROOT, "docs/tranches/BJ/waves")).filter((f) =>
        f.startsWith("BAND"),
    ).length;
    const words = { 8: "eight", 9: "nine", 10: "ten" };
    const src = read("docs/tranches/BJ/formation/ASSEMBLY-CROSSWALK.md") ?? "";
    const claim = /the (eight|nine|ten|\d+) band specs/.exec(src);
    const ok = claim && (claim[1] === words[bands] || claim[1] === String(bands));
    return {
        red: !ok,
        detail: [
            `disk BAND files=${bands}; crosswalk claims "${claim ? claim[1] : "(no claim found)"}"`,
        ],
    };
});

probe("T41", "E", "chronic-decided-draft line-drift set re-anchored; dead recorder path struck", () => {
    const src = read("docs/tranches/BJ/formation/round-2c/chronic-decided-draft.md") ?? "";
    const detail = [];
    let red = false;
    // the drifted anchors the RF-4 F8 row enumerates
    for (const stale of ["glass-deep.css`", ":448", ":184", ":325"]) {
        const lines = src
            .split("\n")
            .map((text, i) => ({ text, n: i + 1 }))
            .filter(({ text }) => text.includes(stale) && /aurora|useDockSearch|useDragMorph|glass-deep/.test(text));
        if (lines.length) {
            red = true;
            detail.push(...lines.map(({ text, n }) => `STALE-ANCHOR chronic-decided-draft.md:${n}: ${text.trim()}`));
        }
    }
    if (!red) detail.push("OK the RF-4 F8 drift set re-anchored");
    return { red, detail };
});

// ── Run ─────────────────────────────────────────────────────────────────────────

const results = probes.map((p) => {
    let out;
    try {
        out = p.run();
    } catch (e) {
        out = { red: true, detail: [`PROBE ERROR: ${e.message}`] };
    }
    return { ...p, ...out };
});

const red = results.filter((r) => r.red);

if (process.argv.includes("--json")) {
    console.log(JSON.stringify({ total: results.length, red: red.length, results }, null, 2));
} else {
    const head = execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: ROOT, encoding: "utf8" }).trim();
    const dirty = execFileSync("git", ["status", "--porcelain"], { cwd: ROOT, encoding: "utf8" }).trim();
    console.log(`BJ.W-DOC-TRUTHUP doc-truth differential`);
    console.log(`tree: HEAD ${head}${dirty ? " + uncommitted changes" : " (clean)"}`);
    console.log(`date: ${new Date().toISOString()}`);
    console.log("");
    for (const r of results) {
        console.log(`[${r.red ? "RED " : "GREEN"}] ${r.id} (class ${r.klass}) — ${r.desc}`);
        for (const d of r.detail) console.log(`         ${d}`);
    }
    console.log("");
    console.log(`── ${red.length} RED / ${results.length} probes ──`);
    if (red.length) console.log(`RED: ${red.map((r) => r.id).join(", ")}`);
}

process.exitCode = red.length ? 1 : 0;
