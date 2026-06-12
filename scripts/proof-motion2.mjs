// proof:motion2 — AZ.W-MOTION2 (R7): the curve gallery REDRESS source arm (born-RED,
// DEVICE-FREE). The W-MOTION-SUITE buildout shipped the all-families gallery but left
// it grey-on-grey (the dead --surface-tint-1/-2 reads never live-probed), the strokes
// hairlines (the thumbnail regressed off the BezierEditor's 0.035 register), the picker
// a cramped 11-pill row, and the canon NOT 1:1 to keyframes (no CSS Standard keywords,
// no smooth-step-3, no linear(), springs misgrouped into Standard, camel names).
//
// THE SPLIT (the W-REGISTER-IOS / W-MOTION-SUITE precedent): this DEVICE-FREE `.mjs`
// carries the dead-token re-point + the stroke-floor source-witness + the picker
// register + the canon isomorphism census (against the LIVE keyframes EASING_GROUPS
// authority, not a hard-coded list) + the substrate/muted-lift witnesses (run on every
// runner, `ci`-tagged). The π PAINTED truth (the computed stroke-width, the picker
// NOT-cramped, the substrate present, the purple-still-violet) rides
// tests-visual/motion2.spec.ts (local-only π).
//
// Bites (§6.A):
//   (1) STROKE-THICK — the gallery thumbnail polyline carries a THICK stroke
//       (stroke-width ≥ 3 + non-scaling-stroke, OR a unit width ≥ ~0.03) + round
//       caps + round joins. RED today (1.75, no non-scaling-stroke, linejoin-only).
//   (2) NO-DEAD-TINT — NO --surface-tint-1 / --surface-tint-2 read survives in the
//       gallery OR the BezierEditor (the ladder starts at -4; -1/-2 are dead → paint
//       nothing). NEGATIVE-PREDICATE: a future re-introduction REDs this.
//   (3) PICKER-UNDERLINE — the family picker is variant="underline" (NOT "pill") +
//       carries :responsive. RED today (variant="pill", no :responsive).
//   (4) CANON-ISOMORPHIC — the curve-families taxonomy is 1:1 with the keyframes
//       canon: (a) the 4 CSS keyword rows present; (b) smooth-step-3 present; (c) a
//       Springs family DISTINCT from Standard (Standard no longer carries --spring-*
//       rows); (d) the analytic rows display the HYPHEN register (not camel); (e) the
//       linear() multi-stop row present OR a recorded W-MOTION3 successor-miss. The
//       census is against the LIVE keyframes EASING_GROUPS export (read-only).
//   (5) MUTED-LIFTED — the load-bearing row metadata + the doctrine easing cells read
//       text-foreground (not text-muted-foreground). RED today.
//   (6) SUBSTRATE-DECLARED — the curve-gallery manifest row carries a background:
//       "paper"|"grid" key (the calm one-GL-per-route substrate). RED today.
//   (7) PURPLE-PRESERVED — --motion-accent: var(--viz-legendre) still demo-local; the
//       gallery still reads var(--motion-accent); ppmycota NOT in src/styles/.
//   (8) PARITY-PRESERVED — proof:motion-demo (the predecessor) stays GREEN (subprocess).
//   (9) PI-SPEC — tests-visual/motion2.spec.ts exists (the binding π half).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { homedir } from "node:os";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:motion2";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip JS/TS comments so a prose mention is not a false hit (comment-blind).
const stripJs = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
// Strip HTML/Vue-template comments (the <!-- … --> form) so a template comment is
// comment-blind too (the dead-token NEGATIVE-PREDICATE must not false-hit a comment).
const stripHtmlComments = (s) => s.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

const GALLERY = "demo/stories/motion/curve-gallery.vue";
const FAMILIES = "demo/stories/motion/curve-families.ts";
const BEZIER = "demo/stories/motion/curve-gallery/BezierEditor.vue";
const MANIFEST = "demo/stories/manifest.ts";
const DEMO_CSS = "demo/demo.css";

const galleryRaw = read(GALLERY);
const gallerySrc = stripHtmlComments(stripJs(galleryRaw));
const familiesRaw = read(FAMILIES);
const familiesSrc = stripJs(familiesRaw);
const bezierRaw = read(BEZIER);
const bezierSrc = stripHtmlComments(stripJs(bezierRaw));
const manifestSrc = stripJs(read(MANIFEST));
const demoCssRaw = read(DEMO_CSS);

// ── (1) STROKE-THICK (source-witness) ─────────────────────────────────────────────
// The gallery's curve polyline reads a THICK stroke. Two sanctioned expressions:
//   (a) a PX/unit-viewBox path with stroke-width ≥ 3 AND vector-effect="non-scaling-stroke";
//   (b) a unit-viewBox path with a unit width ≥ ~0.03 (the BezierEditor 0.035 register).
// PLUS stroke-linecap="round" + stroke-linejoin="round". The bite reads the gallery's
// <polyline> block (the BezierEditor's <path> already passes — not under test here).
const polylineMatch = gallerySrc.match(/<polyline[\s\S]*?(?:\/>|<\/polyline>)/i);
const polylineBlock = polylineMatch ? polylineMatch[0] : "";
const swMatch = polylineBlock.match(/stroke-width=["']([\d.]+)["']/);
const strokeWidth = swMatch ? parseFloat(swMatch[1]) : NaN;
const hasNonScaling = /vector-effect=["']non-scaling-stroke["']/.test(polylineBlock);
const thickEnough =
    (strokeWidth >= 3 && hasNonScaling) || (Number.isFinite(strokeWidth) && strokeWidth >= 0.03);
const hasRoundCap = /stroke-linecap=["']round["']/.test(polylineBlock);
const hasRoundJoin = /stroke-linejoin=["']round["']/.test(polylineBlock);
const strokeThick = polylineBlock.length > 0 && thickEnough && hasRoundCap && hasRoundJoin;
add(
    "stroke-thick",
    strokeThick,
    strokeThick
        ? `the gallery polyline reads a THICK stroke (stroke-width=${strokeWidth}${hasNonScaling ? " non-scaling" : ""}, round caps + joins)`
        : `RED: the gallery polyline stroke is not the THICK register (width=${strokeWidth}, non-scaling=${hasNonScaling}, round-cap=${hasRoundCap}, round-join=${hasRoundJoin}) — need stroke-width ≥ 3 + non-scaling-stroke (or unit width ≥ 0.03) + round caps/joins`,
);

// ── (2) NO-DEAD-TINT (source-witness — the BUG guard, NEGATIVE-PREDICATE) ──────────
// The token ladder starts at --surface-tint-4; -1/-2 are UNDEFINED → transparent.
// NO read of either survives in the gallery OR the BezierEditor.
const DEAD_TINT_RE = /--surface-tint-[12]\b/;
const galleryDead = DEAD_TINT_RE.test(gallerySrc);
const bezierDead = DEAD_TINT_RE.test(bezierSrc);
const noDeadTint = !galleryDead && !bezierDead;
add(
    "no-dead-tint",
    noDeadTint,
    noDeadTint
        ? "no dead --surface-tint-1/-2 read survives (the ladder starts at -4; -1/-2 paint nothing)"
        : `RED: a dead --surface-tint-1/-2 read survives (gallery=${galleryDead}, bezier=${bezierDead}) — re-point to a DEFINED rung (-6/-8/-10/-12)`,
);

// ── (3) PICKER-UNDERLINE (source-witness) ─────────────────────────────────────────
// The family picker is variant="underline" (NOT "pill") and carries :responsive.
const segTabMatch = gallerySrc.match(/<SegmentedTabs[\s\S]*?(?:\/>|<\/SegmentedTabs>)/i);
const segTabBlock = segTabMatch ? segTabMatch[0] : "";
const isUnderline = /variant=["']underline["']/.test(segTabBlock);
const notPill = !/variant=["']pill["']/.test(segTabBlock);
const hasResponsive = /:responsive=|\bresponsive=/.test(segTabBlock);
const pickerUnderline = segTabBlock.length > 0 && isUnderline && notPill && hasResponsive;
add(
    "picker-underline",
    pickerUnderline,
    pickerUnderline
        ? "the family picker is the underline panel-nav register with :responsive collapse"
        : `RED: the family picker is not the underline+responsive register (underline=${isUnderline}, not-pill=${notPill}, responsive=${hasResponsive})`,
);

// ── (4) CANON-ISOMORPHIC (source-witness — the R7-4 census vs the LIVE authority) ──
// Read the keyframes EASING_GROUPS export (READ-ONLY) and assert every keyframes
// Standard-keyword / smooth-step-3 / hyphen-named analytic item appears in the
// gallery's curve-families, that springs MOVED to their own family, and the linear()
// row is present (or a recorded W-MOTION3 successor-miss is in the spec/FINAL).
const KEYFRAMES_GROUPS = resolve(
    homedir(),
    "Programming/keyframes.js/demo/easing/easingGroups.ts",
);
let keyframesItems = [];
let keyframesReadable = false;
try {
    if (existsSync(KEYFRAMES_GROUPS)) {
        const kfSrc = readFileSync(KEYFRAMES_GROUPS, "utf8");
        // each item("<name>") call names a canon curve.
        keyframesItems = [...kfSrc.matchAll(/item\(\s*["']([^"']+)["']\s*\)/g)].map((m) => m[1]);
        keyframesReadable = keyframesItems.length > 0;
    }
} catch {
    keyframesReadable = false;
}

// (4a) the 4 CSS Standard keyword rows present (each name literal).
const CSS_KEYWORDS = ["ease", "ease-in", "ease-out", "ease-in-out"];
const missingKeywords = CSS_KEYWORDS.filter((k) => {
    // a name literal `"ease"` etc. — bezierPresetRow("ease", … is the shipped form.
    const re = new RegExp(`["'\\\`]${k.replace(/[-]/g, "\\-")}["'\\\`]`);
    return !re.test(familiesSrc);
});
add(
    "canon-css-keywords",
    missingKeywords.length === 0,
    missingKeywords.length === 0
        ? "the 4 CSS Standard keyword rows (ease/ease-in/ease-out/ease-in-out) are present"
        : `RED: missing CSS Standard keyword rows: ${missingKeywords.join(", ")}`,
);

// (4b) smooth-step-3 present (in Cubic, the value.js Hermite).
const hasSmoothStep3 =
    /["'\`]smooth-step-3["'\`]/.test(familiesSrc) && /\bsmoothStep3\b/.test(familiesSrc);
add(
    "canon-smooth-step-3",
    hasSmoothStep3,
    hasSmoothStep3
        ? "smooth-step-3 (the value.js Hermite) is present"
        : "RED: smooth-step-3 (the value.js smoothStep3 Hermite) is absent",
);

// (4c) a Springs family DISTINCT from Standard — Standard no longer carries --spring-*.
const hasSpringsFamily = /family:\s*["']Springs["']/.test(familiesSrc);
// the Standard family block must NOT carry a --spring-* row. Isolate the Standard
// family object's rows by slicing between `family: "Standard"` and the next `family:`.
const standardStart = familiesSrc.indexOf('family: "Standard"');
const afterStandard = standardStart >= 0 ? familiesSrc.indexOf("family:", standardStart + 1) : -1;
const standardBlock =
    standardStart >= 0
        ? familiesSrc.slice(standardStart, afterStandard >= 0 ? afterStandard : undefined)
        : "";
const standardHasSpring = /--spring-/.test(standardBlock);
const springsMoved = hasSpringsFamily && !standardHasSpring;
add(
    "canon-springs-own-family",
    springsMoved,
    springsMoved
        ? "the 5 springs MOVED to their own Springs family (Standard no longer carries --spring-* rows)"
        : `RED: the springs are not in their own family (Springs-family=${hasSpringsFamily}, Standard-still-has-spring=${standardHasSpring})`,
);

// (4d) the analytic rows display the HYPHEN register (ease-in-sine/ease-out-quad/
// ease-in-bounce) as the `name`, the camel (easeInSine) NOT the display name. Assert
// the hyphen literals present AND the camel forms do NOT appear as a row `name:`.
const HYPHEN_SAMPLES = ["ease-in-sine", "ease-out-quad", "ease-in-bounce"];
const missingHyphen = HYPHEN_SAMPLES.filter((h) => !new RegExp(`["'\\\`]${h.replace(/[-]/g, "\\-")}["'\\\`]`).test(familiesSrc));
// the camel forms must not be a row NAME (they may still appear in jsName sublabels).
const camelAsName = /name:\s*["']eas(eIn|eOut)\w+["']/.test(familiesSrc);
const hyphenNamed = missingHyphen.length === 0 && !camelAsName;
add(
    "canon-hyphen-names",
    hyphenNamed,
    hyphenNamed
        ? "the analytic rows display the canon HYPHEN register (the camel source stays in jsName)"
        : `RED: the analytic rows are not the hyphen register (missing=${missingHyphen.join(",")}, camel-as-name=${camelAsName})`,
);

// (4e) the linear() multi-stop row present (the cssLinear twin) OR a recorded
// W-MOTION3 successor-miss. The shipped value.js cssLinear is directly importable, so
// the row is expected present; the disposition allows a successor-miss if it could not
// be driven by a shipped twin (it can).
const hasLinearRow =
    /\bcssLinear\b/.test(familiesSrc) &&
    (/family:\s*["']Linear\(\)["']/.test(familiesSrc) || /["'\`]linear\(/.test(familiesSrc));
add(
    "canon-linear-multistop",
    hasLinearRow,
    hasLinearRow
        ? "the linear() multi-stop row (the value.js cssLinear twin) is present"
        : "RED: the linear() multi-stop row is absent and no W-MOTION3 successor-miss is recorded (cssLinear IS a shipped value.js twin — drive it directly)",
);

// (4f) the census against the LIVE keyframes authority — every keyframes hyphen-named
// + keyword + smooth-step-3 item appears in the gallery's curve-families. (The
// gallery legitimately ADDS linear()/springs beyond EASING_GROUPS; the census is the
// SUBSET direction: keyframes ⊆ gallery, the isomorphism the user named.)
let censusMissing = [];
if (keyframesReadable) {
    censusMissing = keyframesItems.filter((name) => {
        // the live custom bezier + the parametric steps are gallery-shaped differently
        // (Custom editor / steps(4,end)); skip the two generator placeholders.
        if (name === "cubic-bezier" || name === "steps") return false;
        const re = new RegExp(`["'\\\`]${name.replace(/[-()]/g, (c) => "\\" + c)}["'\\\`]`);
        return !re.test(familiesSrc);
    });
}
// SKIP-BY-POLICY (the sibling-absence pattern): the census authority is the
// SIBLING keyframes.js checkout — absent on a clean CI runner. There the arm
// skips LOUDLY and the isomorphism binds where the sibling exists (the dev
// machine + the local release battery); the gallery-side witnesses (4a-4d
// below) stay binding everywhere.
if (!existsSync(KEYFRAMES_GROUPS)) {
    console.log(
        "  SKIP-BY-POLICY: canon-keyframes-census — the sibling keyframes.js checkout is absent on this runner; the isomorphism census binds where the authority exists (the gallery-side canon witnesses stay binding).",
    );
} else {
    add(
        "canon-keyframes-census",
        keyframesReadable && censusMissing.length === 0,
        !keyframesReadable
            ? "RED: the keyframes EASING_GROUPS authority exists but is unreadable/empty (the isomorphism cannot be checked against the live source)"
            : censusMissing.length === 0
              ? `the gallery carries every keyframes canon item (census vs ${keyframesItems.length} EASING_GROUPS items, 1:1)`
              : `RED: the gallery is missing keyframes canon items: ${censusMissing.join(", ")}`,
    );
}

// ── (5) MUTED-LIFTED (source-witness) ─────────────────────────────────────────────
// The load-bearing per-row metadata (jsName/note/kind-pill text) + the doctrine
// easing cells read text-foreground, NOT text-muted-foreground. Scope the assert to
// the KIND_TINT pill map + the row-metadata <code>/<p> + the doctrine table cells.
// The family-blurb caption + the SegmentedTabs strip may stay muted (genuine chrome).
const kindTintBlock = (() => {
    const m = gallerySrc.match(/KIND_TINT[\s\S]*?\};/);
    return m ? m[0] : "";
})();
const kindPillMuted = /text-muted-foreground/.test(kindTintBlock);
// the doctrine easing cell — the <td><code> that held text-muted-foreground.
const doctrineCellMuted = /<td[^>]*>\s*<code[^>]*text-muted-foreground/.test(gallerySrc);
// the row jsName/note — they used to be text-muted-foreground; assert the row-card
// metadata <code>/<p> is no longer muted. The row card is the <button> grid block.
const rowMetaMuted =
    /class=["'][^"']*\btruncate text-xs text-muted-foreground/.test(gallerySrc) ||
    /<p class=["']mb-3 text-xs text-muted-foreground/.test(gallerySrc);
const mutedLifted = !kindPillMuted && !doctrineCellMuted && !rowMetaMuted;
add(
    "muted-lifted",
    mutedLifted,
    mutedLifted
        ? "the load-bearing row metadata + kind-pill text + doctrine cells read text-foreground (lifted off muted)"
        : `RED: a load-bearing site still reads text-muted-foreground (kind-pill=${kindPillMuted}, doctrine-cell=${doctrineCellMuted}, row-meta=${rowMetaMuted})`,
);

// ── (6) SUBSTRATE-DECLARED (source-witness) ───────────────────────────────────────
// The curve-gallery manifest row carries a background: "paper"|"grid" key (the calm
// one-GL-per-route substrate — NOT aurora/constellation/fourier). Isolate the
// curve-gallery row: the s("motion", "curve-gallery", …) call.
const cgRowMatch = manifestSrc.match(/s\(\s*\n?\s*["']motion["'],\s*\n?\s*["']curve-gallery["'][\s\S]*?\n\s{12}\),/);
const cgRow = cgRowMatch ? cgRowMatch[0] : "";
const substrateDeclared = /background:\s*["'](paper|grid)["']/.test(cgRow) ||
    /background:\s*\{\s*kind:\s*["'](paper|grid)["']/.test(cgRow);
const noGlSubstrate = !/background:\s*["'](aurora|constellation|fourier)["']/.test(cgRow);
const substrateOk = cgRow.length > 0 && substrateDeclared && noGlSubstrate;
add(
    "substrate-declared",
    substrateOk,
    substrateOk
        ? "the curve-gallery manifest row declares a calm paper/grid substrate (the glass POPs against it)"
        : `RED: the curve-gallery manifest row does not declare a calm paper/grid background (declared=${substrateDeclared}, no-GL=${noGlSubstrate})`,
);

// ── (7) PURPLE-PRESERVED (source-witness — the W-MOTION-SUITE identity guard) ──────
const accentMinted = /--motion-accent:\s*var\(\s*--viz-legendre\s*\)/.test(demoCssRaw);
const galleryReadsAccent = /var\(\s*--motion-accent\s*\)/.test(gallerySrc);
let ppmycotaInLib = false;
try {
    const out = execFileSync("grep", ["-rl", "ppmycota", "src/styles"], { cwd: ROOT, encoding: "utf8" });
    ppmycotaInLib = out.trim().length > 0;
} catch {
    ppmycotaInLib = false;
}
const purplePreserved = accentMinted && galleryReadsAccent && !ppmycotaInLib;
add(
    "purple-preserved",
    purplePreserved,
    purplePreserved
        ? "--motion-accent: var(--viz-legendre) still demo-local, the gallery reads it, ppmycota NOT in src/styles/"
        : `RED: the violet identity regressed (minted=${accentMinted}, gallery-reads=${galleryReadsAccent}, ppmycota-in-lib=${ppmycotaInLib})`,
);

// ── (8) PARITY-PRESERVED — proof:motion-demo stays GREEN ──────────────────────────
let demoGreen = false;
let demoDetail = "";
try {
    execFileSync("node", ["scripts/proof-motion-demo.mjs"], { cwd: ROOT, stdio: "pipe" });
    demoGreen = true;
    demoDetail = "proof:motion-demo stays GREEN (the all-families buildout is not regressed)";
} catch (e) {
    demoGreen = false;
    demoDetail = `RED: proof:motion-demo failed — this REDRESS regressed the predecessor (${String(e).split("\n")[0]})`;
}
add("parity-preserved-motion-demo", demoGreen, demoDetail);

// ── (9) PI-SPEC — the binding π half exists ───────────────────────────────────────
const specExists = existsSync(resolve(ROOT, "tests-visual/motion2.spec.ts"));
add(
    "pi-spec-exists",
    specExists,
    specExists
        ? "tests-visual/motion2.spec.ts exists (the π painted-truth half)"
        : "RED: tests-visual/motion2.spec.ts is absent (the π readback half is the binding visual truth)",
);

// ── Report ────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log("proof:motion2 — the curve gallery REDRESS source arm (AZ.W-MOTION2 / R7, device-free)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_MOTION2_OUT", "AZ-motion2");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:motion2",
    command: COMMAND,
    note: "DEVICE-FREE source arm — the dead-token re-point + stroke-floor + picker register + canon isomorphism census (vs the LIVE keyframes EASING_GROUPS authority) + substrate/muted-lift witnesses. The painted truth (computed stroke-width, picker NOT-cramped, substrate present, purple-still-violet) is proven by tests-visual/motion2.spec.ts (the π half).",
    keyframesAuthority: { path: KEYFRAMES_GROUPS, readable: keyframesReadable, itemCount: keyframesItems.length },
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:motion2] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log("\n[proof:motion2] the curve gallery is REDRESSED — THICK non-scaling strokes, the dead-tint BUG killed, the vivid register (muted-lift + calm substrate), the underline panel-nav picker at scale, and the canon 1:1 isomorphic to keyframes (CSS keywords + smooth-step-3 + linear() + springs-own-family + hyphen names).");
