#!/usr/bin/env node
// AU.W4 — the font-axes gate (proof:font-axes).
//
// `typography.css` drives the display register with custom variation axes
// (`--font-display-variation-settings: "WONK" 1, "SOFT" 0`), but at HEAD the
// `--font-stack-display: "Fraunces"` token had NO shipped `@font-face` — so those
// axes were SILENTLY INERT (a slip that no gate caught: an unsupported axis is a
// no-op, not an error). AU.W4 ships the Fraunces face; this gate asserts the slip
// can never recur:
//
//   every variation AXIS that typography.css REFERENCES is CARRIED by the shipped
//   `@font-face` for the display family — verified by parsing the woff2's `fvar`
//   table (the binary truth), NOT a narration that "Fraunces is self-hosted".
//
// inv ε / bite-check: removing the Fraunces `@font-face` (or shipping a wght-only
// instance that drops SOFT/WONK) reddens it — an inert axis is a FAILURE.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { brotliDecompressSync } from "node:zlib";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const KNOWN = ["cmap","head","hhea","hmtx","maxp","name","OS/2","post","cvt ","fpgm","glyf","loca","prep","CFF ","VORG","EBDT","EBLC","gasp","hdmx","kern","LTSH","PCLT","VDMX","vhea","vmtx","BASE","GDEF","GPOS","GSUB","EBSC","JSTF","MATH","CBDT","CBLC","COLR","CPAL","SVG ","sbix","acnt","avar","bdat","bloc","bsln","cvar","fdsc","feat","fmtx","fvar","gvar","hsty","just","lcar","mort","morx","opbd","prop","trak","Zapf","Silf","Glat","Gloc","Feat","Sill"];

// Parse a woff2's variation-axis tags from its fvar table (brotli-decompress the
// font-data block then read the axis 4cc tags). Returns a Set, or null if not woff2.
function woff2Axes(path) {
    const buf = readFileSync(path);
    if (buf.toString("ascii", 0, 4) !== "wOF2") return null;
    const numTables = buf.readUInt16BE(12);
    let o = 48;
    const u128 = () => { let r = 0; for (let i = 0; i < 5; i++) { const b = buf[o++]; r = r * 128 + (b & 0x7f); if (!(b & 0x80)) return r; } throw new Error("u128"); };
    let hasFvar = false;
    for (let i = 0; i < numTables; i++) {
        const flags = buf[o++]; const idx = flags & 0x3f; const tv = (flags >> 6) & 0x3;
        const tag = idx === 0x3f ? buf.toString("ascii", o, (o += 4)) : KNOWN[idx];
        if (tag === "fvar") hasFvar = true;
        u128();
        if (((tag === "glyf" || tag === "loca") && tv === 0) || (tag === "hmtx" && tv === 1)) u128();
    }
    if (!hasFvar) return new Set();
    let decomp; try { decomp = brotliDecompressSync(buf.subarray(o)); } catch { return new Set(); }
    const axes = new Set();
    for (const ax of ["wght", "opsz", "SOFT", "WONK", "ital", "slnt", "GRAD", "YTAS"]) {
        if (decomp.includes(Buffer.from(ax, "ascii"))) axes.add(ax);
    }
    return axes;
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        TOKENS: resolve(ROOT, "src/styles/tokens.css"),
        TYPOGRAPHY: resolve(ROOT, "src/styles/typography.css"),
        FONTS: resolve(ROOT, "src/styles/fonts.css"),
        FONTS_DIR: resolve(ROOT, "src/fonts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_FONT_AXES_ARTIFACT", "AU-font-axes"),
    };
    return _cliPaths;
}

// The first quoted family name in `--font-stack-display`.
function displayFamily(tokens) {
    const m = tokens.match(/--font-stack-display\s*:\s*["']([^"']+)["']/);
    return m ? m[1] : null;
}

// Every quoted axis tag inside any `font-variation-settings` / `*-variation-settings`
// declaration (e.g. `"WONK" 1, "SOFT" 0` → WONK, SOFT). wght/ital/slnt set via
// font-weight/font-style are NOT counted (they're not custom-axis references).
function referencedAxes(typography) {
    const axes = new Set();
    for (const m of typography.matchAll(/variation-settings\s*:\s*([^;]+);/g)) {
        for (const a of m[1].matchAll(/["']([A-Za-z]{4})["']/g)) axes.add(a[1]);
    }
    return axes;
}

// The woff2 src path for the @font-face whose font-family matches `family`.
function faceWoff2(fonts, family, FONTS_DIR) {
    for (const block of fonts.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
        const body = block[1];
        const fam = body.match(/font-family\s*:\s*["']([^"']+)["']/);
        if (!fam || fam[1] !== family) continue;
        const src = body.match(/src\s*:\s*url\(\s*["']([^"']+\.woff2)["']/);
        if (!src) continue;
        // `@mkbabb/glass-ui/fonts/<rel>` → src/fonts/<rel>
        const rel = src[1].replace(/^@mkbabb\/glass-ui\/fonts\//, "");
        return resolve(FONTS_DIR, rel);
    }
    return null;
}

function run() {
    const P = cliPaths();
    const violations = [];
    const facts = {};

    const family = displayFamily(readFileSync(P.TOKENS, "utf8"));
    facts.displayFamily = family;
    const referenced = referencedAxes(readFileSync(P.TYPOGRAPHY, "utf8"));
    facts.referenced = [...referenced];

    if (referenced.size === 0) {
        // nothing references a custom axis — the gate is vacuously green, but flag
        // it (the whole point is that the referenced axes paint).
        facts.note = "no custom variation-axis references in typography.css";
    } else if (!family) {
        violations.push("--font-stack-display declares no quoted family — cannot resolve the display face");
    } else {
        const woff2 = faceWoff2(readFileSync(P.FONTS, "utf8"), family, P.FONTS_DIR);
        facts.face = woff2 ? woff2.slice(P.ROOT.length + 1) : null;
        if (!woff2) {
            violations.push(`no @font-face for the display family "${family}" — the referenced axes [${[...referenced].join(", ")}] have NO carrying face (they paint inert)`);
        } else {
            let declared;
            try { declared = woff2Axes(woff2); } catch (e) { declared = null; }
            facts.declared = declared ? [...declared] : null;
            if (!declared) {
                violations.push(`could not parse the fvar of ${facts.face}`);
            } else {
                for (const ax of referenced) {
                    if (!declared.has(ax)) {
                        violations.push(`axis "${ax}" is referenced in typography.css but NOT carried by the shipped ${family} face (${facts.face}) — it paints inert`);
                    }
                }
            }
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:font-axes", facts, violations });

    console.log("proof:font-axes — every referenced variation axis is carried by a shipped face (AU.W4)");
    console.log(`  display family : ${facts.displayFamily}`);
    console.log(`  referenced     : [${facts.referenced.join(", ")}]`);
    console.log(`  face           : ${facts.face ?? "(none)"}`);
    console.log(`  declared (fvar): [${(facts.declared ?? []).join(", ")}]`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
