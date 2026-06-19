#!/usr/bin/env node
// BC.W-SEARCH-CUSTOM — the SearchBar/FuzzySearch first-principles CUSTOMIZATION +
// glassify gate (proof:search-custom).
//
// The born-RED→GREEN device-free SOURCE arm for the search-surface reskin: the two
// custom/search SFCs gain the SAME three-layer customization surface every glass-ui
// control carries (size off the `--control-*` cohort, a {glass·veil·opaque} surface
// axis defaulting glass, a `variant` field-chrome CVA), the `!important`-fighting
// escape is DELETED onto the real CVA rung, the fork-forced px literals are
// token-backed, and the de-shadcn `custom/search` paint lands (the `bg-muted/50`
// result rows → `.glass-menu-row`, the `surface="opaque"` expand modal → glass).
//
// The PAINTED truth — a bare <SearchBar> reads a warm-cream glass pill, the expand
// modal reads GLASSY (a translucent floating plate, not the opaque slab), the result
// rows ride the glass-quiet hover-lift, the matched chars paint via
// ::highlight(glass-search-mark) — is the BINDING visual truth proven by the π live
// readback captured in docs/tranches/BC/audit/visual/W-SEARCH-CUSTOM-DELTA.md. This
// gate is the no-device CI half; a source-green/visually-broken gap is the close-
// class the BC gestalt bar exists to kill — both halves must hold for a clean close.
//
// Five falsifiable witnesses (each born-RED at HEAD pre-wave, driven GREEN by the
// wave):
//
//   SC1 — THE CUSTOMIZATION AXES ARE PRESENT. Both SFCs thread `size?: ControlSize`
//         (off the shared cohort, not a bare `text-sm`/`h-N`), `surface?: Surface`
//         (default glass), and a `variant` field-chrome CVA (`searchFieldVariants`);
//         `SearchVariants` is published on /api. RED at HEAD (SearchBar has only
//         modelValue/placeholder/icon/tag; FuzzySearch has no size/surface).
//   SC2 — THE `!important`-FIGHTING-CVA ESCAPE IS DELETED (the HOLD-4 fold). No
//         `!important` Tailwind utility (`!border-none`/`!bg-transparent`/`!p-0`/
//         `!rounded-none`/`!h-N`/`!w-N`/`!max-w-`/`!top-`) survives in FuzzySearch.vue;
//         the borderless field is a real `variant` CVA rung. RED at HEAD.
//   SC3 — NO FORK-FORCED PX LITERAL IN THE COMPOUND (the C3 close). No hardcoded
//         glyph/button/text px literal (`w-3.5 h-3.5`, `text-[0.6rem]`,
//         `text-[0.65rem]`, a bare `text-sm`/`text-base` on the field/result) survives
//         off the cohort — the magnitudes read `--search-icon-size`/`--search-button-
//         size`/`--search-result-text`. RED at HEAD.
//   SC4 — THE RESULT ROWS RIDE `.glass-menu-row`, THE MODAL IS GLASS (the de-shadcn
//         `custom/search` paint). No `bg-muted/N` selected-row register survives in
//         FuzzySearch.vue (the rows compose `.glass-menu-row`); the expand modal
//         `<DialogContent>` BINDS `:surface` (default glass), NOT `surface="opaque"`
//         hardcoded. RED at HEAD.
//   SC5 — DRY + THE FENCE: no new register, the matcher untouched, no double-
//         ownership. The size axis reads the `--control-*` cohort (no parallel
//         `--search-h-*` ladder); the surface axis imports the shared `Surface`
//         resolver (no second surface recipe); the result rows read `.glass-menu-row`
//         (no forked menu recipe); the SFCs do NOT import `useFuzzySearch`/
//         `fuzzySearchIndex` for a re-implementation (a READ of `fuzzyMatch` for the
//         highlight is allowed). RED if a parallel register is minted.
//
// House style mirrors proof-menu-glass.mjs / proof-no-shadcn-default.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on any
// violation. Each witness carries a SELF-TEST bite (a synthetic fixture proving the
// detector flags the disease + exempts the cure).

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const search = (p) => resolve(ROOT, "src/components/custom/search", p);
    _cliPaths = {
        ROOT,
        SEARCH_BAR: search("SearchBar.vue"),
        FUZZY_SEARCH: search("FuzzySearch.vue"),
        SEARCH_VARIANTS: search("searchVariants.ts"),
        SEARCH_INDEX: search("index.ts"),
        API_INDEX: resolve(ROOT, "src/api/index.ts"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_SEARCH_CUSTOM_ARTIFACT",
            "BC-search-custom",
        ),
    };
    return _cliPaths;
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Strip Vue SFC `<!-- … -->` HTML comments — a commented-out render / a clean-break
// prose note naming the literal it replaced must not satisfy or trip a witness.
function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

const strip = (s) => stripHtmlComments(stripBlockComments(s ?? ""));

// ── The shared falsifiable patterns ──────────────────────────────────────────
// A bare `h-3.5`/`w-3.5` glyph literal (not part of `size-3.5`, `text-[…]`, or a
// token-read).
const FORK_GLYPH_LITERAL = /(?<![\w:/-])[hw]-3\.5(?![\w/-])/;
// An `!important`-prefixed Tailwind sizing/box utility (the CVA-fighting escape).
const BANG_UTILITY =
    /!(?:border|bg|p|m|rounded|max-w|top|translate|h|w)-[\w[\]./-]+/g;
// An arbitrary type literal in the search result/badge register (`text-[0.6rem]`,
// `text-[0.65rem]`).
const FORK_ARBITRARY_TYPE = /text-\[0\.6\d*rem\]/;
// The shadcn-neutral selected-row fill (the disease the `.glass-menu-row` cures).
const BG_MUTED_SELECTED = /bg-muted(?:\/\d+)?/;
// A hardcoded `surface="opaque"` on the expand modal (the slab — must become `:surface`).
const HARDCODED_OPAQUE = /<DialogContent[^>]*\bsurface\s*=\s*["']opaque["']/;
// A bound `:surface` on the modal (the glassify — default glass).
const BINDS_SURFACE = /<DialogContent[^>]*\s:surface\s*=/;
// A parallel search-local magnitude LADDER (the DRY violation — `--search-h-sm`
// etc., NOT the indirection rungs `--search-icon-size`/`-button-size`/`-result-text`
// which alias onto the cohort).
const PARALLEL_SIZE_LADDER = /--search-h-(?:xs|sm|md|lg)\b/;

/**
 * The W-SEARCH-CUSTOM detector. Pure: takes the comment-stripped sources, returns
 * `{ facts, violations }`. Each witness pushes a falsifiable violation string.
 */
export function detectSearchCustom(sources) {
    const searchBar = strip(sources.searchBar);
    const fuzzy = strip(sources.fuzzy);
    const variants = strip(sources.variants);
    const searchIndex = strip(sources.searchIndex);
    const apiIndex = strip(sources.apiIndex);

    const violations = [];

    // ── SC1 — the customization axes are present ──────────────────────────────
    // size: ControlSize (the shared union) on BOTH SFCs.
    const barHasSize = /\bsize\s*\?\s*:\s*ControlSize\b/.test(searchBar);
    const fuzzyHasSize = /\bsize\s*\?\s*:\s*ControlSize\b/.test(fuzzy);
    // surface: Surface (the shared axis) on BOTH SFCs.
    const barHasSurface = /\bsurface\s*\?\s*:\s*Surface\b/.test(searchBar);
    const fuzzyHasSurface = /\bsurface\s*\?\s*:\s*Surface\b/.test(fuzzy);
    // surface DEFAULTS to glass (the glass-first default).
    const barSurfaceGlassDefault = /surface\s*:\s*["']glass["']/.test(searchBar);
    const fuzzySurfaceGlassDefault = /surface\s*:\s*["']glass["']/.test(fuzzy);
    // the variant CVA exists + both SFCs thread it.
    const cvaExists = /export\s+const\s+searchFieldVariants\s*=\s*cva\(/.test(
        variants,
    );
    const cvaHasInlineBareFloating =
        /\binline\s*:/.test(variants) &&
        /\bbare\s*:/.test(variants) &&
        /\bfloating\s*:/.test(variants);
    const barThreadsVariant = /searchFieldVariants\s*\(/.test(searchBar);
    const fuzzyThreadsVariant = /searchFieldVariants\s*\(/.test(fuzzy);
    // SearchVariants is published on /api + co-exported from the search index.
    const indexExportsVariants = /SearchVariants\b/.test(searchIndex);
    const apiPublishesVariants =
        /SearchVariants\b/.test(apiIndex) &&
        /components\/custom\/search/.test(apiIndex);

    if (!barHasSize)
        violations.push(
            "SC1: SearchBar.vue does not thread `size?: ControlSize` (the shared control-size cohort axis is absent).",
        );
    if (!fuzzyHasSize)
        violations.push(
            "SC1: FuzzySearch.vue does not thread `size?: ControlSize`.",
        );
    if (!barHasSurface)
        violations.push(
            "SC1: SearchBar.vue does not thread `surface?: Surface` (the shared {glass·veil·opaque} axis is absent).",
        );
    if (!fuzzyHasSurface)
        violations.push(
            "SC1: FuzzySearch.vue does not thread `surface?: Surface`.",
        );
    if (!barSurfaceGlassDefault)
        violations.push(
            "SC1: SearchBar.vue's `surface` does not default to `glass` (the glass-first default).",
        );
    if (!fuzzySurfaceGlassDefault)
        violations.push(
            "SC1: FuzzySearch.vue's `surface` does not default to `glass`.",
        );
    if (!cvaExists)
        violations.push(
            "SC1: no `searchFieldVariants` CVA in searchVariants.ts (the field-chrome variant axis did not land).",
        );
    if (!cvaHasInlineBareFloating)
        violations.push(
            "SC1: the searchFieldVariants CVA lacks the `inline | bare | floating` field-chrome rungs.",
        );
    if (!barThreadsVariant)
        violations.push(
            "SC1: SearchBar.vue does not thread `searchFieldVariants(…)`.",
        );
    if (!fuzzyThreadsVariant)
        violations.push(
            "SC1: FuzzySearch.vue does not thread `searchFieldVariants(…)`.",
        );
    if (!indexExportsVariants)
        violations.push(
            "SC1: custom/search/index.ts does not co-export `SearchVariants` (the type source the SFCs cannot re-export).",
        );
    if (!apiPublishesVariants)
        violations.push(
            "SC1: `SearchVariants` is not published on /api from `components/custom/search` (the discovery surface).",
        );

    // ── SC2 — the `!important`-fighting-CVA escape is DELETED (the HOLD-4 fold) ─
    const fuzzyBangs = fuzzy.match(BANG_UTILITY) || [];
    const fuzzyHasBang = fuzzyBangs.length > 0;
    const barBangs = searchBar.match(BANG_UTILITY) || [];
    const barHasBang = barBangs.length > 0;
    if (fuzzyHasBang)
        violations.push(
            `SC2: FuzzySearch.vue still carries ${fuzzyBangs.length} \`!important\` Tailwind utility(ies) (${[
                ...new Set(fuzzyBangs),
            ]
                .slice(0, 6)
                .join(
                    ", ",
                )}) — the borderless field must be a real \`variant\` CVA rung, not an \`!important\` escape (the HOLD-4 fold).`,
        );
    if (barHasBang)
        violations.push(
            `SC2: SearchBar.vue carries ${barBangs.length} \`!important\` Tailwind utility(ies) — the reskin onto the house registers wins on its own specificity, no \`!\`.`,
        );

    // ── SC3 — no fork-forced px literal in the compound (the C3 close) ─────────
    const sfcsWithGlyph = [];
    if (FORK_GLYPH_LITERAL.test(searchBar)) sfcsWithGlyph.push("SearchBar.vue");
    if (FORK_GLYPH_LITERAL.test(fuzzy)) sfcsWithGlyph.push("FuzzySearch.vue");
    const sfcsWithArbType = [];
    if (FORK_ARBITRARY_TYPE.test(fuzzy)) sfcsWithArbType.push("FuzzySearch.vue");
    // The magnitudes read the named tokens (the cure — at least the icon + result
    // tokens are consumed, proving the substitution landed).
    const barReadsIconToken = /--search-icon-size/.test(searchBar);
    const fuzzyReadsIconToken = /--search-icon-size/.test(fuzzy);
    const fuzzyReadsResultToken = /--search-result-text/.test(fuzzy);
    if (sfcsWithGlyph.length > 0)
        violations.push(
            `SC3: ${sfcsWithGlyph.join(
                " + ",
            )} still carry a bare \`w-3.5 h-3.5\` glyph literal off the cohort — re-point onto \`size-(--search-icon-size)\`.`,
        );
    if (sfcsWithArbType.length > 0)
        violations.push(
            `SC3: ${sfcsWithArbType.join(
                " + ",
            )} still carry a \`text-[0.6Xrem]\` arbitrary type literal — re-point onto \`--search-result-text-secondary\`.`,
        );
    if (!barReadsIconToken)
        violations.push(
            "SC3: SearchBar.vue does not read `--search-icon-size` (the glyph magnitude is not token-backed).",
        );
    if (!fuzzyReadsIconToken)
        violations.push(
            "SC3: FuzzySearch.vue does not read `--search-icon-size`.",
        );
    if (!fuzzyReadsResultToken)
        violations.push(
            "SC3: FuzzySearch.vue does not read `--search-result-text` (the result label magnitude is not token-backed).",
        );

    // ── SC4 — the result rows ride `.glass-menu-row`, the modal is glass ───────
    const fuzzyHasBgMuted = BG_MUTED_SELECTED.test(fuzzy);
    const fuzzyRowsRideMenuRow = /glass-menu-row/.test(fuzzy);
    const modalHardcodedOpaque = HARDCODED_OPAQUE.test(fuzzy);
    const modalBindsSurface = BINDS_SURFACE.test(fuzzy);
    if (fuzzyHasBgMuted)
        violations.push(
            "SC4: FuzzySearch.vue still carries a `bg-muted/N` selected-row register (the shadcn-neutral fill) — the rows must ride `.glass-menu-row` (the de-shadcn `custom/search` paint).",
        );
    if (!fuzzyRowsRideMenuRow)
        violations.push(
            "SC4: FuzzySearch.vue result rows do not compose `.glass-menu-row` (the glass-quiet hover-lift register, BA.W-MENU-GLASS).",
        );
    if (modalHardcodedOpaque)
        violations.push(
            "SC4: the FuzzySearch expand modal still hardcodes `<DialogContent surface=\"opaque\">` (the slab) — bind `:surface` (default glass) for the glassy spotlight.",
        );
    if (!modalBindsSurface)
        violations.push(
            "SC4: the FuzzySearch expand modal `<DialogContent>` does not bind `:surface` (the glassify did not land on the modal).",
        );

    // ── SC5 — DRY + the fence: no new register, no double-ownership ────────────
    const minsParallelLadder =
        PARALLEL_SIZE_LADDER.test(variants) || PARALLEL_SIZE_LADDER.test(fuzzy);
    // The surface axis IMPORTS the shared resolver (no second recipe).
    const importsSharedSurface =
        /from\s+["'][^"']*_shared\/useSurfaceAxis["']/.test(searchBar) &&
        /from\s+["'][^"']*_shared\/useSurfaceAxis["']/.test(fuzzy);
    // The size axis reads the shared controlSizeClass (no fork).
    const readsSharedControlSize =
        /controlSizeClass\s*\(/.test(searchBar) &&
        /controlSizeClass\s*\(/.test(fuzzy);
    // The MATCHER fence: the SFCs do NOT import useFuzzySearch / a buildIndex /
    // searchIndex re-implementation. A READ of `fuzzyMatch` (for the highlight) is
    // the ONLY allowed matcher import.
    const fuzzyImportsScorer =
        /import\s*\{[^}]*\b(?:useFuzzySearch|buildIndex|searchIndex|scoreEntry)\b[^}]*\}\s*from\s*["'][^"']*(?:useFuzzySearch|fuzzySearchIndex)["']/.test(
            fuzzy,
        );
    if (minsParallelLadder)
        violations.push(
            "SC5: a parallel `--search-h-{xs,sm,md,lg}` magnitude ladder was minted — the size axis must read the shared `--control-*` cohort (the indirection rungs `--search-icon-size`/`-button-size`/`-result-text` alias onto the cohort, they are NOT a parallel ladder).",
        );
    if (!importsSharedSurface)
        violations.push(
            "SC5: a SFC does not import the shared `Surface` from `_shared/useSurfaceAxis` (a second surface recipe must not be forked).",
        );
    if (!readsSharedControlSize)
        violations.push(
            "SC5: a SFC does not thread the shared `controlSizeClass(…)` (the size rung must read the `--control-*` cohort, not a fork).",
        );
    if (fuzzyImportsScorer)
        violations.push(
            "SC5: FuzzySearch.vue imports the fuzzy SCORER (`useFuzzySearch`/`buildIndex`/`searchIndex`/`scoreEntry`) — the matcher is BC.W-FUZZY-HARDEN's byte-fence; only a READ of `fuzzyMatch` for the highlight is allowed.",
        );

    const facts = {
        sc1: {
            barHasSize,
            fuzzyHasSize,
            barHasSurface,
            fuzzyHasSurface,
            barSurfaceGlassDefault,
            fuzzySurfaceGlassDefault,
            cvaExists,
            cvaHasInlineBareFloating,
            barThreadsVariant,
            fuzzyThreadsVariant,
            indexExportsVariants,
            apiPublishesVariants,
        },
        sc2: { fuzzyBangCount: fuzzyBangs.length, barBangCount: barBangs.length },
        sc3: {
            sfcsWithGlyph,
            sfcsWithArbType,
            barReadsIconToken,
            fuzzyReadsIconToken,
            fuzzyReadsResultToken,
        },
        sc4: {
            fuzzyHasBgMuted,
            fuzzyRowsRideMenuRow,
            modalHardcodedOpaque,
            modalBindsSurface,
        },
        sc5: {
            minsParallelLadder,
            importsSharedSurface,
            readsSharedControlSize,
            fuzzyImportsScorer,
        },
    };

    return { facts, violations };
}

// ── Self-test bites (each clause: the detector flags the disease + exempts the
// cure). Run unconditionally so a regression in the detector itself reds. ──────
function selfTests() {
    const bites = [];

    // SC1 bite — a bare <SearchBar> with no axis reds; the threaded one passes.
    const sc1Red = detectSearchCustom({
        searchBar: `defineProps<{ modelValue?: string; placeholder?: string }>()`,
        fuzzy: "",
        variants: "",
        searchIndex: "",
        apiIndex: "",
    });
    const sc1Sees = sc1Red.violations.some((v) => v.startsWith("SC1"));
    bites.push([
        "SC1 flags a bare props surface (no size/surface/variant axis)",
        sc1Sees,
    ]);

    // SC2 bite — a planted `!border-none` / `!h-6` re-paste reds.
    const sc2Red = detectSearchCustom({
        searchBar: "",
        fuzzy: `<div class="!border-none !bg-transparent !p-0 !rounded-none"><Button class="!h-6 !w-6" /></div>`,
        variants: "",
        searchIndex: "",
        apiIndex: "",
    });
    const sc2Sees = sc2Red.violations.some((v) => v.startsWith("SC2"));
    // and a clean variant-CVA field is EXEMPT (no SC2 hit on a bare class).
    const sc2Clean = detectSearchCustom({
        searchBar: "",
        fuzzy: `<div class="input-bar" :class="searchFieldVariants({ variant })">`,
        variants: "",
        searchIndex: "",
        apiIndex: "",
    });
    const sc2Exempt = !sc2Clean.violations.some((v) => v.startsWith("SC2"));
    bites.push([
        "SC2 flags a planted `!border-none`/`!h-6` cluster AND exempts the clean CVA rung",
        sc2Sees && sc2Exempt,
    ]);

    // SC3 bite — a planted `w-3.5 h-3.5` icon literal reds; a token-read is exempt.
    const sc3Red = detectSearchCustom({
        searchBar: `<Search class="w-3.5 h-3.5" />`,
        fuzzy: `<Badge class="text-[0.6rem]" />`,
        variants: "",
        searchIndex: "",
        apiIndex: "",
    });
    const sc3SeesGlyph = sc3Red.violations.some(
        (v) => v.startsWith("SC3") && /glyph literal/.test(v),
    );
    const sc3SeesArb = sc3Red.violations.some(
        (v) => v.startsWith("SC3") && /arbitrary type/.test(v),
    );
    const sc3Clean = detectSearchCustom({
        searchBar: `<Search class="size-(--search-icon-size)" />`,
        fuzzy: `<Badge class="text-(length:--search-result-text)" />`,
        variants: "",
        searchIndex: "",
        apiIndex: "",
    });
    const sc3GlyphExempt = !sc3Clean.violations.some(
        (v) => v.startsWith("SC3") && /glyph literal/.test(v),
    );
    bites.push([
        "SC3 flags a planted `w-3.5 h-3.5`/`text-[0.6rem]` literal AND exempts a `size-(--search-icon-size)` read",
        sc3SeesGlyph && sc3SeesArb && sc3GlyphExempt,
    ]);

    // SC4 bite — a planted `bg-muted/50` row + a `surface="opaque"` modal reds.
    const sc4Red = detectSearchCustom({
        searchBar: "",
        fuzzy: `<button class="is-selected bg-muted/50" /><DialogContent surface="opaque" />`,
        variants: "",
        searchIndex: "",
        apiIndex: "",
    });
    const sc4SeesMuted = sc4Red.violations.some(
        (v) => v.startsWith("SC4") && /bg-muted/.test(v),
    );
    const sc4SeesOpaque = sc4Red.violations.some(
        (v) => v.startsWith("SC4") && /opaque/.test(v),
    );
    const sc4Clean = detectSearchCustom({
        searchBar: "",
        fuzzy: `<button class="glass-menu-row" /><DialogContent :surface="surface" />`,
        variants: "",
        searchIndex: "",
        apiIndex: "",
    });
    const sc4MutedExempt = !sc4Clean.violations.some(
        (v) => v.startsWith("SC4") && /bg-muted/.test(v),
    );
    bites.push([
        "SC4 flags a planted `bg-muted/50` row + `surface=\"opaque\"` modal AND exempts `.glass-menu-row` + `:surface`",
        sc4SeesMuted && sc4SeesOpaque && sc4MutedExempt,
    ]);

    // SC5 bite — a planted `--search-h-sm` parallel ladder reds; a `fuzzyMatch`
    // re-impl import (the scorer) reds.
    const sc5Red = detectSearchCustom({
        searchBar: "",
        fuzzy: `import { useFuzzySearch } from "./composables/useFuzzySearch"; --search-h-sm`,
        variants: `--search-h-sm: 2rem;`,
        searchIndex: "",
        apiIndex: "",
    });
    const sc5SeesLadder = sc5Red.violations.some(
        (v) => v.startsWith("SC5") && /parallel/.test(v),
    );
    const sc5SeesScorer = sc5Red.violations.some(
        (v) => v.startsWith("SC5") && /SCORER/.test(v),
    );
    bites.push([
        "SC5 flags a planted `--search-h-sm` parallel ladder AND a `useFuzzySearch` scorer import",
        sc5SeesLadder && sc5SeesScorer,
    ]);

    return bites;
}

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

function run() {
    const P = cliPaths();
    const { ROOT } = P;

    const { facts, violations } = detectSearchCustom({
        searchBar: safeRead(P.SEARCH_BAR),
        fuzzy: safeRead(P.FUZZY_SEARCH),
        variants: safeRead(P.SEARCH_VARIANTS),
        searchIndex: safeRead(P.SEARCH_INDEX),
        apiIndex: safeRead(P.API_INDEX),
    });

    const bites = selfTests();
    const biteFailures = bites.filter(([, ok]) => !ok);
    for (const [label, ok] of bites) {
        if (!ok) violations.push(`SELF-TEST broken: ${label}`);
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:search-custom",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:search-custom — the SearchBar/FuzzySearch CUSTOMIZATION + glassify (BC.W-SEARCH-CUSTOM)",
    );
    console.log(
        `  SC1 customization axes present : ${yn(
            facts.sc1.barHasSize &&
                facts.sc1.fuzzyHasSize &&
                facts.sc1.barHasSurface &&
                facts.sc1.fuzzyHasSurface &&
                facts.sc1.cvaExists &&
                facts.sc1.barThreadsVariant &&
                facts.sc1.fuzzyThreadsVariant &&
                facts.sc1.apiPublishesVariants,
        )}  (size:${yn(facts.sc1.barHasSize && facts.sc1.fuzzyHasSize)} surface:${yn(
            facts.sc1.barHasSurface && facts.sc1.fuzzyHasSurface,
        )} variant-CVA:${yn(facts.sc1.cvaExists)} /api:${yn(
            facts.sc1.apiPublishesVariants,
        )})`,
    );
    console.log(
        `  SC2 !important escape DELETED  : ${yn(
            facts.sc2.fuzzyBangCount === 0 && facts.sc2.barBangCount === 0,
        )}  (fuzzy-bangs:${facts.sc2.fuzzyBangCount} bar-bangs:${facts.sc2.barBangCount})`,
    );
    console.log(
        `  SC3 no fork-forced px literal  : ${yn(
            facts.sc3.sfcsWithGlyph.length === 0 &&
                facts.sc3.sfcsWithArbType.length === 0 &&
                facts.sc3.fuzzyReadsIconToken &&
                facts.sc3.fuzzyReadsResultToken,
        )}  (glyph-lits:${facts.sc3.sfcsWithGlyph.length} arb-type:${facts.sc3.sfcsWithArbType.length})`,
    );
    console.log(
        `  SC4 glass-menu-row + glass modal: ${yn(
            !facts.sc4.fuzzyHasBgMuted &&
                facts.sc4.fuzzyRowsRideMenuRow &&
                !facts.sc4.modalHardcodedOpaque &&
                facts.sc4.modalBindsSurface,
        )}  (no-bg-muted:${yn(!facts.sc4.fuzzyHasBgMuted)} menu-row:${yn(
            facts.sc4.fuzzyRowsRideMenuRow,
        )} :surface:${yn(facts.sc4.modalBindsSurface)})`,
    );
    console.log(
        `  SC5 DRY + matcher fence        : ${yn(
            !facts.sc5.minsParallelLadder &&
                facts.sc5.importsSharedSurface &&
                facts.sc5.readsSharedControlSize &&
                !facts.sc5.fuzzyImportsScorer,
        )}  (no-parallel-ladder:${yn(
            !facts.sc5.minsParallelLadder,
        )} matcher-fenced:${yn(!facts.sc5.fuzzyImportsScorer)})`,
    );
    console.log(
        `  self-tests                     : ${yn(biteFailures.length === 0)}  (${
            bites.length - biteFailures.length
        }/${bites.length} bites have teeth)`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
