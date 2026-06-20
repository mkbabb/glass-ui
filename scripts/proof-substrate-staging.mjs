#!/usr/bin/env node
// AY.W-SB-STAGE §6 — the substrate-staging gate (proof:substrate-staging).
//
// The storybook's headline promise is glass cards over live substrates,
// occasional and befitting. Today (FD-storybook §2) only the aurora intro reads:
// the StoryHero card spanned 100% of its container at the 0.8α `floating` tier
// over a same-hue page bg, so every substrate was seen ONLY through an opaque
// plate that annihilated line-work, and 0 pages used `blob`. W-SB-STAGE lands the
// read-through seam (a thinner rung + an exposed margin over a LIVE substrate) and
// REALIZES the FD §6 occasional-usage map.
//
// This gate is the SOURCE-WITNESS half (the read-through π readback rides
// tests-visual/ + the W-SB-STAGE DELTA — a live capture, not a headless probe):
//
//   G-MAP        — the FD §6 map rows carry their befitting `background`; the
//                  four substrate pages declare their OWN substrate + hero;
//                  empty-states declares blob; motion/springs declare
//                  constellation; carousel declares aurora. `StoryBackgroundKind`
//                  carries `blob`; `StoryHero.vue` has a `blob` branch + the
//                  read-through tier seam (a thinner rung over a live substrate).
//   G-RESTRAINT  — NO forms/* / feedback/* / containers/* manifest row declares a
//                  `background` (the restraint allowlist — staging is occasional
//                  by construction, not sprayed).
//
// House style mirrors proof-no-orphan-composable.mjs: a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1).
//
// Bite: drop the `blob` branch from StoryHero → G-MAP reds; declare a backdrop on
// a forms row → G-RESTRAINT reds; un-declare a substrate page's own backdrop →
// G-MAP reds.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath(
    "GLASS_UI_SUBSTRATE_STAGING_ARTIFACT",
    "AY-substrate-staging",
);

// The FD §6 self-demonstration map — each row MUST declare this background kind.
const REQUIRED_BACKDROPS = [
    { cat: "substrates", id: "aurora", kind: "aurora", hero: true },
    // W-BLOB-REBUILD supersession (the AY close design, manifest.ts comments):
    // a GooBlob is a CONTAINED creature, never a page-field — both blob rows
    // present over a calm paper wash; the contained-mascot mount is asserted by
    // the G-CONTAINED arm below. `background: "blob"` is the category error this
    // gate now BITES on (the inverted guard).
    { cat: "substrates", id: "blob", kind: "paper", hero: true },
    { cat: "substrates", id: "constellation", kind: "constellation", hero: true },
    // BC: the fourier-field route's OWN <FourierField> IS the single live GPU context
    // (one-GL-per-route), so the route declares a CALM `paper` BACKGROUND — a live
    // `fourier` background would be a SECOND GL context (the budget breach). This
    // mirrors the `blob` row above (its own contained mascot over a paper wash). The
    // manifest documents the decision (manifest.ts: "The route declares a CALM `paper`
    // background (NOT a live `fourier` field)"); the gate FOLLOWS it.
    { cat: "substrates", id: "fourier-field", kind: "paper", hero: true },
    { cat: "compositions", id: "empty-states", kind: "paper", hero: false },
    { cat: "foundations", id: "motion", kind: "constellation", hero: false },
    { cat: "motion", id: "springs", kind: "constellation", hero: false },
    { cat: "navigation", id: "carousel", kind: "aurora", hero: false },
];

// The restraint allowlist — these categories STAY quiet (declare NO background).
const QUIET_CATEGORIES = ["forms", "feedback", "containers"];

/**
 * Parse the manifest's `s(cat, id, title, blurb?, opts?)` rows into
 * { cat, id, hasBackground, backgroundKind, hasHero } records. The opts object is
 * the 5th arg; we read its `background:` (string-shorthand or `{ kind: ... }`) and
 * `hero:` flags by a scoped regex over the row's source span.
 */
export function parseManifestRows(src) {
    const rows = [];
    // COMMENT-STRIP first (the false-witness discipline): a manifest comment
    // QUOTING a background value (the W-BLOB-REBUILD rationale cites the prior
    // `background: "blob"`) must never read as the row's declaration.
    src = src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .split("\n")
        .map((l) => {
            const i = l.indexOf("//");
            return i === -1 ? l : l.slice(0, i);
        })
        .join("\n");
    // Match each s(...) call up to its closing ")," — rows are single logical
    // calls possibly spanning lines. We split on the `s("` row-starts.
    const RE = /s\(\s*"([a-z-]+)"\s*,\s*"([a-z0-9-]+)"\s*,([\s\S]*?)\)\s*,/g;
    let m;
    while ((m = RE.exec(src)) !== null) {
        const cat = m[1];
        const id = m[2];
        const tail = m[3]; // everything after the id, incl. title/blurb/opts
        // background: "kind"  OR  background: { kind: "kind" ... }
        let backgroundKind = null;
        const bgStr = tail.match(/background:\s*"([a-z-]+)"/);
        const bgObj = tail.match(/background:\s*\{[^}]*kind:\s*"([a-z-]+)"/);
        if (bgStr) backgroundKind = bgStr[1];
        else if (bgObj) backgroundKind = bgObj[1];
        const hasHero = /\bhero:\s*true/.test(tail);
        rows.push({
            cat,
            id,
            hasBackground: backgroundKind !== null,
            backgroundKind,
            hasHero,
        });
    }
    return rows;
}

/**
 * The pure detector. Inputs: the parsed manifest rows, the StoryBackgroundKind
 * union source, and the StoryHero.vue source. Returns { facts, violations }.
 */
export function detectStaging(input) {
    const { rows, kindUnionSrc, storyHeroSrc } = input;
    const violations = [];

    const rowByKey = new Map(rows.map((r) => [`${r.cat}/${r.id}`, r]));

    // G-MAP — each required backdrop row declares its kind (+ hero where owed).
    for (const req of REQUIRED_BACKDROPS) {
        const key = `${req.cat}/${req.id}`;
        const row = rowByKey.get(key);
        if (!row) {
            violations.push(`G-MAP: manifest row ${key} not found (renamed/removed?)`);
            continue;
        }
        if (row.backgroundKind !== req.kind) {
            violations.push(
                `G-MAP: ${key} must declare background "${req.kind}" (the FD §6 self-demonstration map) — found ${row.backgroundKind ?? "none"}`,
            );
        }
        if (req.hero && !row.hasHero) {
            violations.push(
                `G-MAP: ${key} must declare hero:true (a substrate page is its own front-door demonstration)`,
            );
        }
    }

    // G-NO-BLOB-FIELD (the INVERTED guard — W-BLOB-REBUILD supersession): a
    // GooBlob is a contained creature, never a page-field. The StoryBackgroundKind
    // union must NOT carry "blob" and StoryHero must NOT grow a blob branch —
    // re-introducing either re-lands the category error the rebuild root-caused
    // (the full-page blob was THE "broken blob" defect).
    const unionHasBlob = /"blob"/.test(kindUnionSrc);
    if (unionHasBlob) {
        violations.push(
            `G-NO-BLOB-FIELD: StoryBackgroundKind union carries "blob" — a GooBlob is a contained creature, never a page-field (W-BLOB-REBUILD)`,
        );
    }
    const heroHasBlobBranch = /kind\s*===\s*'blob'|kind === "blob"/.test(
        storyHeroSrc,
    );
    if (heroHasBlobBranch) {
        violations.push(
            `G-NO-BLOB-FIELD: StoryHero.vue carries a blob background branch — the page-field blob is the category error W-BLOB-REBUILD deleted`,
        );
    }
    // G-CONTAINED — the empty-states page mounts its OWN contained GooBlob
    // mascot (the shipped seam that replaced the background row).
    if (input.emptyStatesSrc != null && !/GooBlob/.test(input.emptyStatesSrc)) {
        violations.push(
            `G-CONTAINED: compositions/empty-states must mount the contained <GooBlob> mascot (the W-BLOB-REBUILD seam that replaced background:"blob")`,
        );
    }

    // G-MAP — the read-through tier seam exists (a thinner rung over a live
    // substrate, not a fixed floating/resting). The `liveBackdrop` computed +
    // `cardTier` selecting wash/quiet is the seam.
    const hasReadThrough =
        /liveBackdrop/.test(storyHeroSrc) && /cardTier/.test(storyHeroSrc);
    if (!hasReadThrough) {
        violations.push(
            `G-MAP: StoryHero.vue must carry the read-through tier seam (a liveBackdrop computed + a cardTier selecting a thinner rung over a live substrate)`,
        );
    }

    // G-RESTRAINT — the quiet categories declare NO background.
    const quietViolators = rows.filter(
        (r) => QUIET_CATEGORIES.includes(r.cat) && r.hasBackground,
    );
    for (const v of quietViolators) {
        violations.push(
            `G-RESTRAINT: ${v.cat}/${v.id} declares a background "${v.backgroundKind}" — the ${v.cat} category STAYS quiet (the restraint allowlist; over-staging is the inverse defect)`,
        );
    }

    const declaredBackdrops = rows.filter((r) => r.hasBackground);
    return {
        facts: {
            rowCount: rows.length,
            declaredBackdropCount: declaredBackdrops.length,
            declaredBackdrops: declaredBackdrops.map(
                (r) => `${r.cat}/${r.id}:${r.backgroundKind}`,
            ),
            unionHasBlob,
            heroHasBlobBranch,
            hasReadThrough,
            quietViolatorCount: quietViolators.length,
        },
        violations,
    };
}

function run() {
    const manifestSrc = readFileSync(
        resolve(ROOT, "demo/stories/manifest.ts"),
        "utf8",
    );
    const kindUnionSrc = readFileSync(
        resolve(ROOT, "demo/stories/aurora-hero.ts"),
        "utf8",
    );
    const storyHeroSrc = readFileSync(
        resolve(ROOT, "demo/stories/StoryHero.vue"),
        "utf8",
    );
    const emptyStatesSrc = readFileSync(
        resolve(ROOT, "demo/stories/compositions/empty-states.vue"),
        "utf8",
    );

    const rows = parseManifestRows(manifestSrc);
    const { facts, violations } = detectStaging({
        rows,
        kindUnionSrc,
        storyHeroSrc,
        emptyStatesSrc,
    });
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:substrate-staging",
        facts,
        violations,
    });

    console.log(
        "proof:substrate-staging — the FD §6 occasional-usage map + the read-through seam (AY.W-SB-STAGE)",
    );
    console.log(`  manifest rows         : ${facts.rowCount}`);
    console.log(`  declared backdrops    : ${facts.declaredBackdropCount}`);
    console.log(`  StoryBackgroundKind blob : ${facts.unionHasBlob}`);
    console.log(`  StoryHero blob branch : ${facts.heroHasBlobBranch}`);
    console.log(`  read-through seam     : ${facts.hasReadThrough}`);
    console.log(`  quiet-category violators : ${facts.quietViolatorCount}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
