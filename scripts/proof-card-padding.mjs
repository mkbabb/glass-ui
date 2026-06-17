#!/usr/bin/env node
// BB.W-CARD-PAD — the GOLDEN sqrt-φ/φ card + overlay padding ladder gate
// (proof:card-padding).
//
// The born-RED→GREEN device-free SOURCE arm for the golden-proportion padding
// reform. At HEAD every Card section was a uniform `p-(--card-spacing)` = 24px on
// ALL sides (axis ratio 1:1, NO golden relationship) and the header→content gap was
// a 48px DOUBLE-pad artifact (header pb24 + content pt24) — the heading HUGGED the
// top because top pad == side pad. This wave lifts the BLOCK axis by sqrt-φ (1.272)
// over the preserved INLINE anchor so the heading clears the top by ~30.5px against
// a 24px side, steps the footer by φ (1.618), and tightens the intra-header gap by
// φ² (2.618). CLEAN BREAK: `--card-spacing` is GONE, no alias.
//
// Seven falsifiable clauses (each born-RED at HEAD pre-wave; C1-C4 GREEN after the
// Card-family edits, C5/C6 GREEN only after the orchestrator merges arm 2's overlay
// band), plus the binding π readback (tests-visual/card-padding.spec.ts — the painted
// truth: paddingTop/paddingLeft ≈ sqrt-φ, the title clears the top edge, the interior
// gap ≈ section-gap NOT 48px, both modes):
//
//   C1 — THE 5-TOKEN GOLDEN LADDER on Card.vue, the literal constants IN the calc.
//        Card.vue mints `--card-pad-inline` + `--card-pad-block` + `--card-pad-section-gap`
//        + `--card-pad-footer` + `--card-pad-title-gap`, with the LITERAL 1.272 / 1.618
//        / 2.618 constants APPEARING in the respective calc() chains (a flat
//        resolved-rem rebake — e.g. `--card-pad-block:1.908rem` — REDS; the constants
//        must be expressed, not pre-computed). The C7 self-test bite proves the rebake
//        reds.
//   C2 — ZERO --card-spacing survives in src/ (clean break). After block-comment strip,
//        no `--card-spacing` token reference remains anywhere under src/.
//   C3 — THE CARD FAMILY CONSUMES THE AXIS SPLIT. CardHeader/CardContent/CardFooter
//        each read DISTINCT inline-vs-block pad tokens (NOT a uniform `p-(--card-pad-*)`):
//        Header = px-inline + pt-block + pb-0; Content = px-inline + pt-section-gap +
//        pb-block; Footer = px-inline + pt-footer + pb-block. A uniform `p-(--card-pad-…)`
//        on any of the three REDS.
//   C4 — NO AD-HOC p-N on the enrolled demo cards. Every `<Card …>` / Card-family
//        element on /display/card carries no bare `p-N` Tailwind literal in its `class`
//        attr, EXCEPT the roster allowlist (the scroll-shrink Card-root `p-0`, the two
//        tight-pane scroll cards `p-4`) recorded in card-padding-roster.md.
//   C5 — THE OVERLAY BAND mints + applies the overlay ladder [arm 2 — born-RED until
//        merge]. Dialog/Sheet/Popover/HoverCard/Toast each mint `--overlay-pad-inline`
//        + `--overlay-pad-block` (block = inline × 1.272) and apply
//        `px-(--overlay-pad-inline) py-(--overlay-pad-block)`.
//   C5b — --panel-padding-roomy DELETED from the token tree (the dead orphan).
//   C6 — ≥2 CONSUMERS per new token (the visual-load-bearing bar). Each minted token
//        is read at ≥2 sites across the Card family + the demo + the overlay band.
//        [the overlay tokens reach 2 only after arm 2 merges — born-RED until merge.]
//   C7 — THE SELF-TEST BITE. A re-hardcode (flat-rem rebake), a re-introduced
//        --card-spacing, and a uniform-pad each RED their clause through the PURE
//        detector (the false-witness discipline).
//
// House style mirrors proof-eyebrow-union.mjs / proof-menu-glass.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on
// any violation.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

/** Strip block + line comments so a witness never matches commented prose. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

/** Recursively gather files with one of `exts` under `dir`. */
function gather(dir, exts, out = []) {
    let entries;
    try {
        entries = readdirSync(dir);
    } catch {
        return out;
    }
    for (const e of entries) {
        const abs = resolve(dir, e);
        let st;
        try {
            st = statSync(abs);
        } catch {
            continue;
        }
        if (st.isDirectory()) {
            if (e === "node_modules" || e === ".cache" || e === "dist") continue;
            gather(abs, exts, out);
        } else if (exts.some((x) => e.endsWith(x))) {
            out.push(abs);
        }
    }
    return out;
}

const NEW_CARD_TOKENS = [
    "--card-pad-inline",
    "--card-pad-block",
    "--card-pad-section-gap",
    "--card-pad-footer",
    "--card-pad-title-gap",
];
const OVERLAY_TOKENS = ["--overlay-pad-inline", "--overlay-pad-block"];

/**
 * Pure detector — given the source strings, return { facts, violations }.
 *
 * `sources` shape:
 *   cardVue, cardHeaderVue, cardContentVue, cardFooterVue : the Card family
 *   srcCardSpacingHits : string[] of "path: line" where --card-spacing survives in src/
 *   demoCardVue        : { raw } for demo/stories/display/card.vue
 *   roster             : the roster markdown (for the C4 allowlist record)
 *   overlay            : { dialog, sheet, popover, hoverCard, toast } content-SFC sources
 *   sizingCss, offsetsCss : the token-tree files (C5b)
 *   consumerCorpus     : string[] of all src/+demo source bodies (C6 census)
 */
export function detectCardPadding(sources) {
    const {
        cardVue,
        cardHeaderVue,
        cardContentVue,
        cardFooterVue,
        srcCardSpacingHits,
        demoCardVue,
        overlay,
        sizingCss,
        offsetsCss,
        consumerCorpus,
    } = sources;
    const facts = {};
    const violations = [];

    const card = stripComments(cardVue);
    const header = stripComments(cardHeaderVue);
    const content = stripComments(cardContentVue);
    const footer = stripComments(cardFooterVue);

    // ── C1 — the 5-token golden ladder + the literal constants IN the calc ─────
    facts.c1 = {};
    // each token is minted (declared with a value) on the Card root.
    facts.c1.allTokensMinted = NEW_CARD_TOKENS.every((t) =>
        new RegExp(`\\[${t.replace(/[-]/g, "\\-")}:`).test(card),
    );
    // The anchor reads --spacing(6); sm tightens to --spacing(4).
    facts.c1.anchorSpacing6 = /\[--card-pad-inline:--spacing\(6\)\]/.test(card);
    facts.c1.anchorSm4 =
        /data-\[size=sm\]:\[--card-pad-inline:--spacing\(4\)\]/.test(card);
    // The sqrt-φ / φ / φ² constants APPEAR inside the matching calc() chains —
    // expressed, never a flat resolved-rem rebake.
    facts.c1.blockSqrtPhiCalc =
        /\[--card-pad-block:calc\(var\(--card-pad-inline\)\s*\*\s*1\.272\)\]/.test(
            card,
        );
    facts.c1.sectionGapAliasesBlock =
        /\[--card-pad-section-gap:var\(--card-pad-block\)\]/.test(card);
    facts.c1.footerPhiCalc =
        /\[--card-pad-footer:calc\(var\(--card-pad-block\)\s*\/\s*1\.618\)\]/.test(
            card,
        );
    facts.c1.titleGapPhi2Calc =
        /\[--card-pad-title-gap:calc\(var\(--card-pad-inline\)\s*\/\s*2\.618\)\]/.test(
            card,
        );
    // NEGATIVE (the rebake bite): no card-pad token is assigned a bare flat rem
    // value (a pre-computed resolved-rem rebake of the golden ratio).
    facts.c1.noRebake = !NEW_CARD_TOKENS.some((t) =>
        new RegExp(`\\[${t.replace(/[-]/g, "\\-")}:\\d`).test(card),
    );
    facts.c1.ok =
        facts.c1.allTokensMinted &&
        facts.c1.anchorSpacing6 &&
        facts.c1.anchorSm4 &&
        facts.c1.blockSqrtPhiCalc &&
        facts.c1.sectionGapAliasesBlock &&
        facts.c1.footerPhiCalc &&
        facts.c1.titleGapPhi2Calc &&
        facts.c1.noRebake;
    if (!facts.c1.ok) {
        violations.push(
            "C1: Card.vue must mint the 5-token golden ladder with the LITERAL 1.272/1.618/2.618 constants IN the calc() chains (anchor --card-pad-inline=--spacing(6), sm=--spacing(4)); a flat resolved-rem rebake is forbidden",
        );
    }

    // ── C2 — zero --card-spacing survives in src/ (clean break) ────────────────
    facts.c2 = {};
    facts.c2.hits = srcCardSpacingHits;
    facts.c2.clean = srcCardSpacingHits.length === 0;
    if (!facts.c2.clean) {
        violations.push(
            `C2: --card-spacing still survives in src/ (clean break required, no alias): ${srcCardSpacingHits.join(
                ", ",
            )}`,
        );
    }

    // ── C3 — the Card family consumes the axis split (not uniform) ─────────────
    facts.c3 = {};
    // CardHeader: px-inline + pt-block + pb-0.
    facts.c3.headerSplit =
        /px-\(--card-pad-inline\)/.test(header) &&
        /pt-\(--card-pad-block\)/.test(header) &&
        /pb-0/.test(header);
    // CardContent: px-inline + pt-section-gap + pb-block.
    facts.c3.contentSplit =
        /px-\(--card-pad-inline\)/.test(content) &&
        /pt-\(--card-pad-section-gap\)/.test(content) &&
        /pb-\(--card-pad-block\)/.test(content);
    // CardFooter: px-inline + pt-footer + pb-block.
    facts.c3.footerSplit =
        /px-\(--card-pad-inline\)/.test(footer) &&
        /pt-\(--card-pad-footer\)/.test(footer) &&
        /pb-\(--card-pad-block\)/.test(footer);
    // NEGATIVE: no member applies a UNIFORM all-sides `p-(--card-pad-*)`.
    const uniform = (s) => /(?<![a-z])p-\(--card-pad-[a-z-]+\)/.test(s);
    facts.c3.noUniform =
        !uniform(header) && !uniform(content) && !uniform(footer);
    facts.c3.ok =
        facts.c3.headerSplit &&
        facts.c3.contentSplit &&
        facts.c3.footerSplit &&
        facts.c3.noUniform;
    if (!facts.c3.ok) {
        violations.push(
            "C3: CardHeader/CardContent/CardFooter must each consume the inline-vs-block AXIS SPLIT (Header px-inline+pt-block+pb-0; Content px-inline+pt-section-gap+pb-block; Footer px-inline+pt-footer+pb-block) — a uniform p-(--card-pad-*) on any member REDS",
        );
    }

    // ── C4 — no ad-hoc p-N on the enrolled demo cards (roster allowlist) ───────
    facts.c4 = {};
    const demo = demoCardVue.raw;
    // The roster allowlist — the exact line-shapes that may carry an ad-hoc pad:
    //   the scroll-shrink Card root `p-0`, the two tight-pane scroll cards `p-4`.
    const ALLOWLIST_PAD = [
        'class="card-scroll-host overflow-auto max-h-72 p-0"', // scroll-port host
        'class="overflow-auto max-h-80 p-4"', // raw scroll-pane #1
        'class="overflow-auto max-h-64 p-4"', // raw scroll-pane #2 (inner)
    ];
    // Match every `<Card …>` open tag (across newlines) and inspect its class attr.
    const cardTags = demo.match(/<Card\b[\s\S]*?>/g) ?? [];
    const adHoc = [];
    for (const tag of cardTags) {
        const clsMatch = tag.match(/class="([^"]*)"/);
        if (!clsMatch) continue;
        const cls = clsMatch[1];
        const tokens = cls.split(/\s+/);
        // a bare Tailwind pad literal: p-N / px-N / py-N / pt-N / pb-N / pl-N / pr-N
        // where N is a number (NOT a `p-(--token)` arbitrary-property form).
        const hasAdHoc = tokens.some((t) => /^p[xytblr]?-\d/.test(t));
        if (!hasAdHoc) continue;
        const allowed = ALLOWLIST_PAD.includes(clsMatch[0]);
        if (!allowed) adHoc.push(cls);
    }
    facts.c4.adHoc = adHoc;
    facts.c4.clean = adHoc.length === 0;
    if (!facts.c4.clean) {
        violations.push(
            `C4: ${adHoc.length} enrolled demo card(s) carry an ad-hoc p-N off the roster allowlist (${adHoc.join(
                " | ",
            )}) — re-point to the --card-pad-* ladder or record on card-padding-roster.md`,
        );
    }

    // ── C5 — the overlay band mints + applies the overlay ladder [arm 2] ───────
    facts.c5 = {};
    const overlayParts = [
        ["dialog", overlay.dialog],
        ["sheet", overlay.sheet],
        ["popover", overlay.popover],
        ["hoverCard", overlay.hoverCard],
        ["toast", overlay.toast],
    ];
    const c5Missing = [];
    for (const [name, src] of overlayParts) {
        const s = stripComments(src);
        const mintsInline = /--overlay-pad-inline:/.test(s);
        // block = inline × 1.272 — the constant expressed, not rebaked.
        const mintsBlock =
            /--overlay-pad-block:\s*calc\(var\(--overlay-pad-inline\)\s*\*\s*1\.272\)/.test(
                s,
            );
        const applies =
            /px-\(--overlay-pad-inline\)/.test(s) &&
            /py-\(--overlay-pad-block\)/.test(s);
        if (!(mintsInline && mintsBlock && applies)) c5Missing.push(name);
    }
    facts.c5.missing = c5Missing;
    facts.c5.ok = c5Missing.length === 0;
    if (!facts.c5.ok) {
        violations.push(
            `C5 [arm 2]: the overlay band must mint --overlay-pad-inline + --overlay-pad-block (block=inline×1.272) and apply px-(--overlay-pad-inline) py-(--overlay-pad-block) — missing on: ${c5Missing.join(
                ", ",
            )} (born-RED until the orchestrator merges arm 2)`,
        );
    }

    // ── C5b — --panel-padding-roomy DELETED from the token tree ────────────────
    facts.c5b = {};
    const sizing = stripComments(sizingCss);
    const offsets = stripComments(offsetsCss);
    facts.c5b.deleted =
        !/--panel-padding-roomy\s*:/.test(sizing) &&
        !/--panel-padding-roomy\s*:/.test(offsets);
    if (!facts.c5b.deleted) {
        violations.push(
            "C5b: the dead --panel-padding-roomy must be DELETED from the token tree (sizing.css / offsets.css)",
        );
    }

    // ── C6 — ≥2 referencing SITES per new token (visual-load-bearing bar) ──────
    facts.c6 = {};
    // A token is load-bearing when it is referenced at ≥2 DISTINCT sites — the
    // mint declaration site (Card.vue `[--token:…]`, or the overlay-band SFC
    // `--token:…`) PLUS at least one READ site (`p*-(--token)` / `gap-*-(--token)`
    // / `var(--token)`). A derived rung (section-gap/footer/title-gap) is read at
    // exactly ONE Card-family subcomponent, but it is MINTED on Card.vue — two
    // distinct sites, so it is load-bearing (declared AND consumed), NOT a dead
    // orphan (the orphan is declared-but-never-read, which the C5b prune class
    // kills). `consumerCorpus` carries { path, body } so the count is distinct
    // files, not total match occurrences.
    function siteCount(token) {
        const esc = token.replace(/[-]/g, "\\-");
        // any reference form (mint OR read): the bare `--token:` declaration, the
        // `(--token)` arbitrary-property utility, or `var(--token)`.
        const refRe = new RegExp(
            `${esc}\\s*:|\\(${esc}\\)|var\\(${esc}\\)`,
        );
        const sites = new Set();
        for (const { path, body } of consumerCorpus) {
            if (refRe.test(body)) sites.add(path);
        }
        return sites.size;
    }
    const counts = {};
    for (const t of [...NEW_CARD_TOKENS, ...OVERLAY_TOKENS]) {
        counts[t] = siteCount(t);
    }
    facts.c6.counts = counts;
    const under = Object.entries(counts).filter(([, n]) => n < 2);
    facts.c6.ok = under.length === 0;
    if (!facts.c6.ok) {
        violations.push(
            `C6: every new token needs ≥2 consumers (visual-load-bearing): ${under
                .map(([t, n]) => `${t}=${n}`)
                .join(", ")} (the overlay tokens reach 2 only after arm 2 merges — born-RED until merge)`,
        );
    }

    return { facts, violations };
}

// ── C7 self-test: the false-witness bite (re-hardcode / re-card-spacing /
//    uniform-pad each RED their clause through the PURE detector). ─────────────
function selfTest() {
    const goodCard = `
      '[--card-pad-inline:--spacing(6)] [--card-pad-block:calc(var(--card-pad-inline)*1.272)] [--card-pad-section-gap:var(--card-pad-block)] [--card-pad-footer:calc(var(--card-pad-block)/1.618)] [--card-pad-title-gap:calc(var(--card-pad-inline)/2.618)] data-[size=sm]:[--card-pad-inline:--spacing(4)]',`;
    const goodHeader = `flex flex-col gap-y-(--card-pad-title-gap) px-(--card-pad-inline) pt-(--card-pad-block) pb-0`;
    const goodContent = `px-(--card-pad-inline) pt-(--card-pad-section-gap) pb-(--card-pad-block)`;
    const goodFooter = `flex items-center px-(--card-pad-inline) pt-(--card-pad-footer) pb-(--card-pad-block)`;
    const goodDemo = {
        raw: `<Card tier="resting"><CardHeader/></Card>\n<Card tier="wash" class="overflow-auto max-h-80 p-4">x</Card>`,
    };
    const goodOverlay = {
        dialog: "",
        sheet: "",
        popover: "",
        hoverCard: "",
        toast: "",
    };
    // a corpus rich enough to satisfy C6: each card token is MINTED on Card.vue
    // (site 1) + READ at its subcomponent (site 2). overlay tokens get two
    // minting sites so they clear ≥2 in the self-test.
    const goodCorpus = [
        { path: "Card.vue", body: goodCard },
        { path: "CardHeader.vue", body: goodHeader },
        { path: "CardContent.vue", body: goodContent },
        { path: "CardFooter.vue", body: goodFooter },
        {
            path: "Dialog.vue",
            body: "--overlay-pad-inline: 24px; --overlay-pad-block: 30px; px-(--overlay-pad-inline) py-(--overlay-pad-block)",
        },
        {
            path: "Sheet.vue",
            body: "--overlay-pad-inline: 24px; --overlay-pad-block: 30px; px-(--overlay-pad-inline) py-(--overlay-pad-block)",
        },
    ];

    const base = {
        cardVue: goodCard,
        cardHeaderVue: goodHeader,
        cardContentVue: goodContent,
        cardFooterVue: goodFooter,
        srcCardSpacingHits: [],
        demoCardVue: goodDemo,
        overlay: goodOverlay,
        sizingCss: "",
        offsetsCss: "",
        consumerCorpus: goodCorpus,
    };

    const bites = [];

    // Bite A — the flat-rem REBAKE (block pre-computed to 1.908rem) reds C1.
    {
        const rebaked = base.cardVue.replace(
            "[--card-pad-block:calc(var(--card-pad-inline)*1.272)]",
            "[--card-pad-block:1.908rem]",
        );
        const { facts } = detectCardPadding({
            ...base,
            cardVue: rebaked,
            consumerCorpus: [
                { path: "Card.vue", body: rebaked },
                ...goodCorpus.slice(1),
            ],
        });
        bites.push({ name: "C1 rebake reds", reds: !facts.c1.ok });
    }

    // Bite B — a re-introduced --card-spacing in src/ reds C2.
    {
        const { facts } = detectCardPadding({
            ...base,
            srcCardSpacingHits: ["src/components/ui/card/Card.vue:99"],
        });
        bites.push({ name: "C2 re-card-spacing reds", reds: !facts.c2.clean });
    }

    // Bite C — a UNIFORM p-(--card-pad-block) on CardContent reds C3.
    {
        const { facts } = detectCardPadding({
            ...base,
            cardContentVue: "p-(--card-pad-block)",
        });
        bites.push({ name: "C3 uniform-pad reds", reds: !facts.c3.ok });
    }

    // Bite D — an ad-hoc p-6 on an enrolled (non-allowlisted) demo card reds C4.
    {
        const { facts } = detectCardPadding({
            ...base,
            demoCardVue: { raw: `<Card tier="quiet" class="p-6">x</Card>` },
        });
        bites.push({ name: "C4 ad-hoc-pad reds", reds: !facts.c4.clean });
    }

    return bites;
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_CARD_PADDING_ARTIFACT",
        "BB-card-padding",
    );

    const cardDir = resolve(ROOT, "src/components/ui/card");
    const cardVue = safeRead(resolve(cardDir, "Card.vue"));
    const cardHeaderVue = safeRead(resolve(cardDir, "CardHeader.vue"));
    const cardContentVue = safeRead(resolve(cardDir, "CardContent.vue"));
    const cardFooterVue = safeRead(resolve(cardDir, "CardFooter.vue"));

    // C2 — scan the WHOLE src/ tree for surviving --card-spacing (comment-stripped).
    const srcFiles = gather(resolve(ROOT, "src"), [".vue", ".ts", ".css"]);
    const srcCardSpacingHits = [];
    for (const f of srcFiles) {
        const stripped = stripComments(safeRead(f));
        if (/--card-spacing/.test(stripped)) {
            srcCardSpacingHits.push(f.slice(ROOT.length + 1));
        }
    }

    const demoCardVue = {
        raw: safeRead(resolve(ROOT, "demo/stories/display/card.vue")),
    };
    const roster = safeRead(
        resolve(ROOT, "docs/tranches/BB/audit/visual/card-padding-roster.md"),
    );

    const overlay = {
        dialog: safeRead(
            resolve(ROOT, "src/components/ui/dialog/DialogContent.vue"),
        ),
        // The sheet's padding lives in the sheetVariants CVA base (sheet/index.ts),
        // NOT SheetContent.vue (which composes the variant) — the overlay-pad mint
        // is on the cva base string, so the gate reads index.ts for the sheet arm.
        sheet: safeRead(resolve(ROOT, "src/components/ui/sheet/index.ts")),
        popover: safeRead(
            resolve(ROOT, "src/components/ui/popover/PopoverContent.vue"),
        ),
        hoverCard: safeRead(
            resolve(ROOT, "src/components/ui/hover-card/HoverCardContent.vue"),
        ),
        toast: safeRead(resolve(ROOT, "src/components/ui/toast/Toast.vue")),
    };

    const sizingCss = safeRead(resolve(ROOT, "src/styles/tokens/sizing.css"));
    const offsetsCss = safeRead(resolve(ROOT, "src/styles/tokens/offsets.css"));

    // C6 corpus — the Card family + the demo + the overlay band, carried as
    // { path, body } so the site-count is DISTINCT files (mint site + read sites),
    // not total match occurrences. Comment-stripped so a commented reference does
    // not inflate the count.
    const consumerCorpus = [
        ["src/components/ui/card/Card.vue", cardVue],
        ["src/components/ui/card/CardHeader.vue", cardHeaderVue],
        ["src/components/ui/card/CardContent.vue", cardContentVue],
        ["src/components/ui/card/CardFooter.vue", cardFooterVue],
        ["demo/stories/display/card.vue", demoCardVue.raw],
        ["src/components/ui/dialog/DialogContent.vue", overlay.dialog],
        ["src/components/ui/sheet/index.ts", overlay.sheet],
        ["src/components/ui/popover/PopoverContent.vue", overlay.popover],
        ["src/components/ui/hover-card/HoverCardContent.vue", overlay.hoverCard],
        ["src/components/ui/toast/Toast.vue", overlay.toast],
    ].map(([path, body]) => ({ path, body: stripComments(body) }));

    const { facts, violations } = detectCardPadding({
        cardVue,
        cardHeaderVue,
        cardContentVue,
        cardFooterVue,
        srcCardSpacingHits,
        demoCardVue,
        roster,
        overlay,
        sizingCss,
        offsetsCss,
        consumerCorpus,
    });

    // C7 — the self-test bites.
    const bites = selfTest();
    const biteFailures = bites.filter((b) => !b.reds);
    facts.c7 = { bites, allBite: biteFailures.length === 0 };
    if (!facts.c7.allBite) {
        violations.push(
            `C7: self-test bite(s) did not RED: ${biteFailures
                .map((b) => b.name)
                .join(", ")}`,
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:card-padding",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:card-padding — the GOLDEN sqrt-φ/φ card + overlay padding ladder (BB.W-CARD-PAD)",
    );
    console.log(`  C1 5-token golden ladder + literal constants: ${yn(facts.c1.ok)}`);
    console.log(`  C2 zero --card-spacing in src/              : ${yn(facts.c2.clean)}`);
    console.log(`  C3 Card family axis split (not uniform)     : ${yn(facts.c3.ok)}`);
    console.log(`  C4 no ad-hoc p-N on enrolled demo cards     : ${yn(facts.c4.clean)}`);
    console.log(
        `  C5 overlay band mints+applies [arm 2]       : ${yn(facts.c5.ok)}  (missing: ${facts.c5.missing.join(", ") || "none"})`,
    );
    console.log(`  C5b --panel-padding-roomy deleted           : ${yn(facts.c5b.deleted)}`);
    console.log(
        `  C6 ≥2 consumers per new token               : ${yn(facts.c6.ok)}  (${Object.entries(
            facts.c6.counts,
        )
            .map(([t, n]) => `${t.replace("--card-pad-", "cp-").replace("--overlay-pad-", "op-")}=${n}`)
            .join(" ")})`,
    );
    console.log(`  C7 self-test bites RED                      : ${yn(facts.c7.allBite)}`);

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
