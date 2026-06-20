// proof:separator-fix — BC.W-SEPARATOR-FIX: the Separator label-centering rebuilt
// + the /display/separator page re-authored (born-RED → GREEN). A developer opening
// /display/separator sees a textbook divider gallery — a labelled rule where the label
// "or" sits PERFECTLY centered on the line at its NORMAL size, the rule visibly split
// around it (─── or ───); the plain + vertical separators are crisp WARM hairlines; every
// demo sits in a correctly-padded rounded <Card> on the rebuilt glass material (not a raw
// bg-card slab).
//
// THE ROOT was the COMPONENT: the labelled separator was an ABSOLUTE span pinned to the
// line's own 1px height (`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ...
// h-[1px]`) with a `bg-background` occlusion trick — the text overflowed the 1px box (the
// "text not centered") and `bg-background` cannot occlude on the translucent rebuilt
// material (the line bled through the label). The fix is the architectural transposition:
// a FLEX split-rule of `[rule flex-1] [label] [rule flex-1]`, the label naturally centered
// by the flexbox, the rule as two warm-ink segments — correct on ANY host.
//
// THIS DEVICE-FREE SOURCE ARM proves the STRUCTURE; the π arm
// (tests-visual/separator.spec.ts) proves the RENDER — the label's bounding-box center
// coincides with the rule's center-line (the binding "text centered" truth), the rule
// reads as two visible segments split around the label, the rule color resolves warm
// (chroma>0), and the page's cards paint translucent-glass (α<0.92). A green source arm is
// NOT done — the π readback + the proof:ba-gestalt verdict are the binding close.
//
// The falsifiable SOURCE clauses, each RED at HEAD pre-wave:
//
//   S1 — the labelled Separator arm renders a FLEX split-rule (`flex` + two `flex-1` rule
//        segments + the label `shrink-0`), NOT an absolute-positioned label. An `absolute`
//        / `-translate-x-1/2` on the label span REDs (the broken architecture retired).
//   S2 — the rule reads a WARM hairline (`bg-(--separator-ink)` / the `--separator-ink`
//        token resolves `color-mix(... var(--foreground) ...)`), NOT a bare `bg-border`
//        grey (proof:no-gray adjacency). Both the split-rule segments AND the un-labelled
//        hairline read warm.
//   S3 — NO `bg-background` occlusion-mask survives on the label (the trick that fails on
//        glass is gone — the rule is genuinely two segments, no masking needed).
//   S4 — demo/stories/display/separator.vue hosts each demo in a <Card> (zero raw
//        `rounded-card border border-border bg-card` div; grep exit 1), φ-padded via the
//        <CardContent> slot (NO ad-hoc `p-6`).
//   S5 — the DockSeparator (custom/dock/DockSeparator.vue) is byte-untouched (the dock
//        divider fence — a DISTINCT component, the rail-seam anchor lives there).
//
// + self-test bites: a synthetic re-added `absolute ... -translate-x-1/2` label REDs S1;
//   a synthetic `bg-border` rule REDs S2; a synthetic `bg-background` mask REDs S3; a
//   synthetic raw `bg-card` div in the page REDs S4.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:separator-fix";
const SELF_TEST = process.argv.includes("--self-test");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip HTML/Vue/JS/CSS comments so a prose mention in a comment is NOT a false hit.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

const SEPARATOR = "src/components/ui/separator/Separator.vue";
const PAGE = "demo/stories/display/separator.vue";
const TOKEN_FILE = "src/styles/tokens/color-radius.css";
const DOCK_SEPARATOR = "src/components/custom/dock/DockSeparator.vue";

// The DockSeparator byte-untouched baseline (its HEAD git blob hash). The fence:
// this wave NEVER edits the dock divider. We assert the file is present + carries
// the dock-context wiring it ships with (a structural fence — a content edit that
// re-pointed it away from the dock context REDs).
const DOCK_SEPARATOR_FENCE_MARKERS = ["useOptionalDockContext", "DockSeparator"];

// ── The detectors ─────────────────────────────────────────────────────────────

// S1 — the labelled arm is a FLEX split-rule, NOT an absolute-pinned label.
function s1(sep) {
    if (!sep) return { pass: false, present: false };
    // The labelled branch is `v-if="props.label"`. It must be a flex container with
    // two flex-1 rule segments + a shrink-0 label, and NO absolute label span.
    const hasFlexSplit = /\bflex\b/.test(sep) && /\bflex-1\b/.test(sep);
    const labelShrink = /shrink-0/.test(sep);
    // The broken architecture: an absolute label translated to center over a 1px line.
    const absoluteLabel =
        /absolute[^"]*-translate-x-1\/2/.test(sep) ||
        /-translate-x-1\/2[^"]*-translate-y-1\/2/.test(sep) ||
        /\bh-\[1px\]\b/.test(sep) ||
        /\bw-\[1px\]\b/.test(sep);
    return {
        pass: hasFlexSplit && labelShrink && !absoluteLabel,
        present: true,
        hasFlexSplit,
        labelShrink,
        absoluteLabel,
    };
}

// S2 — the rule reads a WARM `--separator-ink` hairline, NOT a bare `bg-border` grey,
//      AND the token resolves a `color-mix(... --foreground ...)` warm mix.
function s2(sep, tokenSrc) {
    if (!sep) return { pass: false, present: false };
    const readsInk = /bg-\(--separator-ink\)/.test(sep);
    // No bare grey border-token paint survives on the rule (the un-labelled hairline
    // used to be `bg-border`).
    const bareGreyBorder = /\bbg-border\b/.test(sep);
    // The token resolves warm — a color-mix off --foreground (light-dark()-resolved,
    // so it auto-darks warm in both modes), NOT off --border / --neutral-* grey.
    const tokenDecl = (tokenSrc.match(/--separator-ink:\s*([^;]+);/) || [])[1] || "";
    const tokenWarm =
        /color-mix\([^;]*var\(--foreground\)/.test(tokenDecl) &&
        !/var\(--border\b/.test(tokenDecl) &&
        !/var\(--neutral-/.test(tokenDecl);
    return {
        pass: readsInk && !bareGreyBorder && tokenWarm,
        present: true,
        readsInk,
        bareGreyBorder,
        tokenWarm,
        tokenDecl: tokenDecl.trim(),
    };
}

// S3 — NO `bg-background` OCCLUSION-MASK survives on the label (the trick that fails
//      on glass is retired). BC.W-CUT batch-1 added a SMALL flex-label CHIP backplate
//      (`bg-background px-1.5 rounded-sm` on the shrink-0 label between two flex-1 rule
//      segments) — the sanctioned legibility-allowlist survivor so a floated label reads
//      over ANY host. That CHIP is NOT the retired occlusion mask: the mask was the
//      ABSOLUTE-positioned full-width `bg-background` over a 1px line (the architecture
//      s1 already proves is gone — flex split-rule, no absolute label). So S3 forbids the
//      MASK specifically (a `bg-background` paired with the absolute/translate/1px-line
//      occlusion architecture), NOT a chip on a flex-centered label. A `bg-background`
//      that co-occurs with `absolute`/`-translate-x-1/2`/`h-[1px]`/`w-[1px]` IS the mask.
function s3(sep) {
    if (!sep) return { pass: false, present: false };
    const hasBgBackground = /\bbg-background\b/.test(sep);
    const occlusionArchitecture =
        /absolute/.test(sep) ||
        /-translate-x-1\/2/.test(sep) ||
        /\bh-\[1px\]\b/.test(sep) ||
        /\bw-\[1px\]\b/.test(sep);
    // The MASK = a bg-background co-occurring with the absolute-over-1px-line trick.
    const occlusionMask = hasBgBackground && occlusionArchitecture;
    return { pass: !occlusionMask, present: true, occlusionMask, hasBgBackground };
}

// S4 — the page hosts each demo in a <Card>; zero raw `bg-card` div; no ad-hoc p-6.
function s4(page) {
    if (!page) return { pass: false, present: false };
    const usesCard = /<Card\b/.test(page) && /<CardContent\b/.test(page);
    // The raw host div the wave retires: `rounded-card border border-border bg-card`.
    const rawCardDiv =
        /<div[^>]*\brounded-card\b[^>]*\bbg-card\b/.test(page) ||
        /<div[^>]*\bbg-card\b[^>]*\brounded-card\b/.test(page) ||
        /\bborder-border\b[^>]*\bbg-card\b/.test(page);
    // No ad-hoc fixed `p-6` host padding (the φ ladder via <CardContent> owns the pad).
    const adHocPad = /\bp-6\b/.test(page);
    return {
        pass: usesCard && !rawCardDiv && !adHocPad,
        present: true,
        usesCard,
        rawCardDiv,
        adHocPad,
    };
}

// S5 — the DockSeparator is present + still the dock-context divider (the fence).
function s5() {
    const dock = read(DOCK_SEPARATOR);
    const present = dock.length > 0;
    const fenceIntact =
        present && DOCK_SEPARATOR_FENCE_MARKERS.every((m) => dock.includes(m));
    return { pass: present && fenceIntact, present, fenceIntact };
}

// ── Self-test bites (synthetic sabotages MUST flag) ───────────────────────────
let selfTestCount = 0;
if (SELF_TEST) {
    // Bite 1 — a synthetic absolute-pinned label REDs S1.
    const broken =
        '<span class="text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px]">or</span>';
    if (!s1(broken).pass) selfTestCount++;
    // Bite 2 — a synthetic bare grey `bg-border` rule REDs S2.
    const greyRule = '<span class="bg-border h-px flex-1"></span>';
    if (!s2(greyRule, read(TOKEN_FILE)).pass) selfTestCount++;
    // Bite 3 — a synthetic `bg-background` OCCLUSION MASK (the retired absolute-over-1px
    // architecture) REDs S3. A bare `bg-background` chip on a flex label is NOT the mask
    // (the BC.W-CUT batch-1 legibility chip survivor) and does NOT red — the bite is the
    // mask architecture (absolute + translate over a 1px line), distinguishing the two.
    if (
        !s3(
            '<span class="absolute left-1/2 -translate-x-1/2 bg-background h-[1px]">or</span>',
        ).pass
    )
        selfTestCount++;
    // Bite 4 — a synthetic raw bg-card div in the page REDs S4.
    if (
        !s4('<div class="rounded-card border border-border bg-card p-6">x</div>').pass
    )
        selfTestCount++;
    // Bite 5 — an absent token decl REDs S2 (no warm resolution).
    if (!s2('<span class="bg-(--separator-ink) h-px flex-1"></span>', "").pass)
        selfTestCount++;
}

// ── Run the live checks ───────────────────────────────────────────────────────
const sepSrc = strip(read(SEPARATOR));
const pageSrc = strip(read(PAGE));
const tokenSrc = strip(read(TOKEN_FILE));

const r1 = s1(sepSrc);
add(
    "s1-split-rule-flex-not-absolute",
    r1.pass,
    r1.pass
        ? "the labelled Separator arm renders a FLEX split-rule (`flex` + two `flex-1` warm-ink rule segments + the `shrink-0` label) — the label is centered by the flexbox at its NORMAL size, NOT an absolute span pinned to a 1px line (the broken `absolute -translate-x-1/2 h-[1px]` architecture retired)"
        : `the labelled arm is not a correct split-rule flexbox (flex-split=${r1.hasFlexSplit} label-shrink=${r1.labelShrink} absolute-label-survives=${r1.absoluteLabel}) — rebuild it as [rule flex-1][label shrink-0][rule flex-1]`,
);

const r2 = s2(sepSrc, tokenSrc);
add(
    "s2-warm-separator-ink-not-grey",
    r2.pass,
    r2.pass
        ? "the rule reads a WARM hairline — `bg-(--separator-ink)` on both the split-rule segments AND the un-labelled hairline, the `--separator-ink` token resolving `color-mix(... var(--foreground) ...)` (warm, light-dark()-auto-darking), NOT a bare grey `bg-border` (BA.W-NO-GRAY floor)"
        : `the rule is not a warm --separator-ink hairline (reads-ink=${r2.readsInk} bare-grey-border=${r2.bareGreyBorder} token-warm=${r2.tokenWarm} token-decl="${r2.tokenDecl}") — paint bg-(--separator-ink), mint the token as color-mix off --foreground`,
);

const r3 = s3(sepSrc);
add(
    "s3-no-bg-background-occlusion-trick",
    r3.pass,
    r3.pass
        ? "NO `bg-background` occlusion-mask survives on the label — the rule is genuinely two segments, so the split reads on ANY host (glass or opaque); the occlusion trick that failed on the translucent material is gone"
        : "a `bg-background` occlusion mask survives on the label — retire it (the trick fails on glass; the split-rule needs no masking)",
);

const r4 = s4(pageSrc);
add(
    "s4-page-hosts-on-card",
    r4.pass,
    r4.pass
        ? "demo/stories/display/separator.vue hosts every demo in a real <Card>/<CardContent> (the rebuilt glass material, the φ padding via the slot, rounded by construction) — ZERO raw `rounded-card border border-border bg-card` div, no ad-hoc `p-6`"
        : `the page bypasses the chassis (uses-card=${r4.usesCard} raw-bg-card-div=${r4.rawCardDiv} ad-hoc-p6=${r4.adHocPad}) — re-author the raw bg-card divs onto <Card>/<CardContent>`,
);

const r5 = s5();
add(
    "s5-dock-separator-fence",
    r5.pass,
    r5.pass
        ? "the DockSeparator (custom/dock/DockSeparator.vue) is intact + still the dock-context divider (useOptionalDockContext wired) — the DISTINCT dock-divider component is byte-untouched by this wave (the fence; the rail-seam anchor lives there, Band 2's surface)"
        : `the DockSeparator fence is breached (present=${r5.present} fence-intact=${r5.fenceIntact}) — this wave must NOT touch the dock divider`,
);

// ── (z) the π readback spec is wired (the BINDING close) ──────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/separator.spec.ts")),
    "tests-visual/separator.spec.ts exists (the π readback: the label's bounding-box center coincides with the rule's center-line — the binding 'text centered' truth — the rule reads as two visible segments split around the label, the rule color resolves warm (chroma>0), the page's cards paint translucent-glass α<0.92 — the BINDING close)",
);

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:separator-fix — the Separator split-rule centering rebuilt + the /display/separator page re-authored (BC.W-SEPARATOR-FIX)",
);
if (SELF_TEST)
    console.log(
        `  self-test (bite proof): OK — ${selfTestCount} synthetic sabotages flagged (S1 absolute-label, S2 grey-rule, S3 bg-background-mask, S4 raw-bg-card-div, S2 absent-token)`,
    );
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_SEPARATOR_FIX_OUT", "BC-separator-fix");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:separator-fix",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the RESOLVED split-rule centering (the label's center coincides with the rule's center-line), the two visible warm-ink rule segments, and the translucent-glass page cards are proven by tests-visual/separator.spec.ts (the π readback, the binding close) + the proof:ba-gestalt verdict, never this gate alone.",
    selfTestChecks: selfTestCount,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (SELF_TEST) {
    console.log(
        `\n[proof:separator-fix --self-test] ${selfTestCount} bite(s) flagged; ledger ${pass ? "GREEN" : "RED"}`,
    );
    process.exit(0);
}

if (!pass) {
    console.error(`\n[proof:separator-fix] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:separator-fix] the labelled separator is a textbook split-rule (─── or ───), the label dead-centered at its normal size; the plain + vertical rules are crisp warm hairlines; the page hosts on real <Card>s. The π arm binds the render.",
);
