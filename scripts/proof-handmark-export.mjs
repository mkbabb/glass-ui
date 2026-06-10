#!/usr/bin/env node
// D6.a — the ./handmark mint gate (proof:handmark-export).
//
// The keystone D6 move: mint `@mkbabb/glass-ui/handmark` (the SPEC §11 component)
// as a ROOT export over the `@mkbabb/pencil-boil@0.4.0` geometry. This gate proves
// the mint is WIRED END-TO-END and the component RENDERS the shipped register,
// six ways (mirrors proof-subpath-enumeration's static-wiring form + a real
// pipeline render probe):
//
//   (1) EXPORT-WIRED — `package.json` exports `./handmark` → an existing
//       `dist/handmark.js` + `dist/handmark.d.ts` (the subpath resolves; the type
//       flattens via flatten-subpath-types).
//   (2) SUBPATH-BARREL — `src/subpaths/handmark.ts` mirrors the component barrel
//       (the batch-resolve picks it up — proof-subpath-enumeration BATCH-EQUIV).
//   (3) PEERS-OPTIONAL — `@mkbabb/pencil-boil ^0.4.0` + `perfect-freehand ^1.2.3`
//       are peerDependencies, BOTH peerDependenciesMeta.optional (zero hard deps).
//   (4) VERSION — package.json version is 3.10.0 (3.9.0 was burned without it).
//   (5) RENDER-PROBE — transpile the pure L1–L3 pipeline offline and assert it
//       renders the SHIPPED register: PEN is free (no <filter>), CRAYON is the
//       stroke-crayon (a static seeded <filter> + 2 passes), CIRCLE rides
//       ellipsePoints (a closed ring) — the SPEC §12 acceptance, at the seam.
//   (6) DELTA-STABLE — the crayon filter is deterministic (same seed ⇒ identical),
//       and varies by seed (the Δ4 static-seeded contract).
//
// bite: change the crayon to ribbon:'hull' (the unproven pf body) or animate the
// filter → RENDER-PROBE reddens (the shipped register is the stroke-crayon).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath("GLASS_UI_HANDMARK_EXPORT_ARTIFACT", "D6-handmark-export");

// ── the offline pipeline render probe ───────────────────────────────────────
// Transpile the pure modules (brush/texture + a pencil-boil-free shape stub) so
// the gate runs in a bare node process with no bundler. We exercise the REAL
// brush.ts + texture.ts; the geometry stage is exercised against the live
// pencil-boil checkout (the file: dev-link) when present, else a math stub.

const HM = resolve(ROOT, "src/components/custom/handmark");

function transpile(file) {
    const src = readFileSync(file, "utf8");
    return ts.transpileModule(src, {
        compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2022,
            verbatimModuleSyntax: false,
        },
    }).outputText;
}

/** Load brush.ts + texture.ts as one offline ESM module (texture imports brush types only). */
async function loadInkPipeline() {
    const brushJs = transpile(resolve(HM, "brush.ts"));
    // texture.ts imports a TYPE from ./brush (erased by transpile) — drop the import line.
    const textureJs = transpile(resolve(HM, "texture.ts")).replace(
        /import\s+type[^;]*;?/g,
        "",
    );
    const bundle = brushJs + "\n" + textureJs;
    return import("data:text/javascript," + encodeURIComponent(bundle));
}

/** Load pencil-boil's ellipsePoints offline (the dev-linked 0.4.0 checkout). */
async function loadEllipse() {
    const pb = resolve(ROOT, "node_modules/@mkbabb/pencil-boil/src");
    if (!existsSync(resolve(pb, "path.ts"))) return null;
    const randomJs = transpile(resolve(pb, "random.ts"));
    const pathJs = transpile(resolve(pb, "path.ts")).replace(
        /import\s*\{[^}]*\}\s*from\s*['"]\.\/random['"];?/,
        "",
    );
    const mod = await import(
        "data:text/javascript," + encodeURIComponent(randomJs + "\n" + pathJs)
    );
    return mod.ellipsePoints ?? null;
}

export async function detect() {
    const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));
    const violations = [];
    const facts = {};

    // (1) EXPORT-WIRED
    const ex = pkg.exports?.["./handmark"];
    facts.exportEntry = ex ?? null;
    if (!ex || typeof ex !== "object") {
        violations.push("EXPORT-WIRED: package.json exports has no `./handmark` object entry");
    } else {
        const js = ex.import?.replace(/^\.\//, "");
        const dts = ex.types?.replace(/^\.\//, "");
        facts.distJs = js;
        facts.distDts = dts;
        if (!js || !existsSync(resolve(ROOT, js)))
            violations.push(`EXPORT-WIRED: import target missing on disk (${js}) — run npm run build`);
        if (!dts || !existsSync(resolve(ROOT, dts)))
            violations.push(`EXPORT-WIRED: types target missing on disk (${dts}) — run npm run build`);
    }

    // (2) SUBPATH-BARREL
    const barrel = resolve(ROOT, "src/subpaths/handmark.ts");
    facts.subpathBarrel = existsSync(barrel);
    if (!facts.subpathBarrel)
        violations.push("SUBPATH-BARREL: src/subpaths/handmark.ts is absent (the batch-resolve has nothing to pick up)");
    else {
        const body = readFileSync(barrel, "utf8");
        if (!/from\s+["']\.\.\/components\/custom\/handmark["']/.test(body))
            violations.push("SUBPATH-BARREL: handmark.ts does not re-export the component barrel");
    }

    // (3) PEERS-OPTIONAL
    const peers = pkg.peerDependencies ?? {};
    const meta = pkg.peerDependenciesMeta ?? {};
    for (const [dep, range] of [
        ["@mkbabb/pencil-boil", "^0.4.0"],
        ["perfect-freehand", "^1.2.3"],
    ]) {
        const present = peers[dep] === range;
        const optional = meta[dep]?.optional === true;
        facts[`peer_${dep}`] = { range: peers[dep] ?? null, optional };
        if (!present)
            violations.push(`PEERS-OPTIONAL: ${dep} peerDependency is not "${range}" (got ${peers[dep] ?? "absent"})`);
        if (!optional)
            violations.push(`PEERS-OPTIONAL: ${dep} is not peerDependenciesMeta.optional:true`);
    }

    // (4) VERSION
    facts.version = pkg.version;
    if (pkg.version !== "3.10.0")
        violations.push(`VERSION: package.json version is ${pkg.version}, expected 3.10.0`);

    // (5) RENDER-PROBE + (6) DELTA-STABLE
    try {
        const { BRUSHES, resolveBrush, grainFilter, hasGrain } = await loadInkPipeline();

        // PEN is free — grain:0 ⇒ NO filter.
        const pen = resolveBrush("pen");
        const penFilter = grainFilter("hm-pen", pen, 1);
        facts.penIsFree = penFilter === "" && !hasGrain(pen);
        if (!facts.penIsFree)
            violations.push("RENDER-PROBE: PEN is not free — grain:0 must emit NO <filter>");

        // CRAYON is the stroke-crayon — ribbon:'stroke', 2 passes, a real static filter.
        const crayon = BRUSHES.crayon;
        const crayonFilter = grainFilter("hm-cr", crayon, 6);
        facts.crayonStroke = crayon.ribbon === "stroke";
        facts.crayonPasses = crayon.passes;
        facts.crayonHasFilter = crayonFilter.includes("<filter") && crayonFilter.includes("feTurbulence");
        facts.crayonStaticFilter =
            !crayonFilter.includes("<animate") && !crayonFilter.includes("dur=");
        if (crayon.ribbon !== "stroke")
            violations.push("RENDER-PROBE: the SHIPPED crayon must be ribbon:'stroke' (the proven stroke-crayon, NOT the unproven pf hull)");
        if (crayon.passes !== 2)
            violations.push(`RENDER-PROBE: the shipped crayon must lay 2 offset passes (got ${crayon.passes})`);
        if (!facts.crayonHasFilter)
            violations.push("RENDER-PROBE: the crayon must emit the 5-stage feTurbulence grain filter");
        if (!facts.crayonStaticFilter)
            violations.push("DELTA-STABLE: the crayon filter must be STATIC (no <animate>/dur — the Δ4 gate)");

        // DELTA-STABLE — deterministic + seed-varying.
        const a = grainFilter("hm-fixed", crayon, 6);
        const b = grainFilter("hm-fixed", crayon, 6);
        const c = grainFilter("hm-fixed", crayon, 42);
        facts.filterDeterministic = a === b;
        facts.filterSeedVaries = a !== c;
        if (a !== b)
            violations.push("DELTA-STABLE: same (brush, seed) must yield a byte-identical filter (SPEC §7)");
        if (a === c)
            violations.push("DELTA-STABLE: changing only seed must change the filter (the procedural variant)");

        // CIRCLE rides ellipsePoints — a closed ring with the hand-circle overshoot.
        const ellipsePoints = await loadEllipse();
        if (ellipsePoints) {
            const ring = ellipsePoints(50, 20, 18, 12, { seed: 3, roughness: 1.5 });
            const first = ring[0];
            const last = ring[ring.length - 1];
            const gap = Math.hypot(last[0] - first[0], last[1] - first[1]);
            facts.circleRingPoints = ring.length;
            facts.circleOvershoot = gap > 0.01; // crosses its own start (hand-circled)
            if (!(ring.length >= 13 && gap > 0.01))
                violations.push("RENDER-PROBE: ellipsePoints must return a closed ring with a hand-circle overshoot");
        } else {
            facts.circleRingPoints = "pencil-boil checkout absent (dev-link) — circle probe skipped";
        }
    } catch (e) {
        violations.push(`RENDER-PROBE: the pure pipeline failed to load/run — ${e.message}`);
    }

    return { facts, violations };
}

async function run() {
    const { facts, violations } = await detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:handmark-export",
        facts,
        violations,
    });

    console.log("proof:handmark-export — the ./handmark mint gate (D6.a)");
    console.log(`  EXPORT-WIRED  : ${facts.distJs} + ${facts.distDts}`);
    console.log(`  SUBPATH-BARREL: ${facts.subpathBarrel ? "YES" : "NO"}`);
    const pbOpt = facts["peer_@mkbabb/pencil-boil"]?.optional ? "opt" : "req";
    const pfOpt = facts["peer_perfect-freehand"]?.optional ? "opt" : "req";
    console.log(`  PEERS-OPTIONAL: pencil-boil(${pbOpt}) · perfect-freehand(${pfOpt})`);
    console.log(`  VERSION       : ${facts.version}`);
    console.log(
        `  RENDER-PROBE  : pen-free=${facts.penIsFree ? "✓" : "✗"} · crayon stroke/${facts.crayonPasses}-pass/filter=${facts.crayonStroke && facts.crayonHasFilter ? "✓" : "✗"} · circle-ring=${facts.circleOvershoot ? "✓" : facts.circleRingPoints}`,
    );
    console.log(
        `  DELTA-STABLE  : determ=${facts.filterDeterministic ? "✓" : "✗"} · seed-varies=${facts.filterSeedVaries ? "✓" : "✗"} · static=${facts.crayonStaticFilter ? "✓" : "✗"}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
