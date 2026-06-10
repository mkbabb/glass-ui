export const meta = {
  name: 'ay-final-band',
  description: 'The final pre-close band (4 opus lanes): W-COHERE (the wall-killed lane, re-run on the CARVED tree) / THE ASSAY (the user 06-10 directive: encapsulation+composables+colocation VERIFY over the carved tree + the 4-point styling audit + the design-idiom localization — verify what Batch-4 landed, fix the gaps) / FIX-GLASSUI-DARK (the FD-R2 defects: auth-shell dark ink, the 404 lattice never-paints, the configurator dark mud, + the LIBRARY BUG: DropdownMenuSubContent not portaled + max-h clip) / FIX-SLIDES-DARK (the ONE measured dark disease: the khaki glass plate at 2.00-3.16:1). No git.',
  phases: [{ title: 'Final', detail: '4 lanes: cohere / assay / glassui-dark / slides-dark' }],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const SL = '/Users/mkbabb/Programming/slides'
const W = GU + '/docs/tranches/AY/waves'
const R2 = GU + '/docs/tranches/AY/audit/design-r2'

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'status', 'gatesGreen', 'typecheckGreen', 'capturedPngs', 'sharedFileDeltas', 'summary', 'blocker'],
  properties: {
    lane: { type: 'string' },
    status: { type: 'string', enum: ['DONE', 'DONE_WITH_MISSES', 'PARTIAL', 'BLOCKED'] },
    gatesGreen: { type: 'boolean' },
    typecheckGreen: { type: 'boolean' },
    capturedPngs: { type: 'array', items: { type: 'string' } },
    sharedFileDeltas: {
      type: 'object', additionalProperties: false,
      required: ['packageJsonScripts', 'gatesMjsRows', 'progressRow', 'visualAllowlistAdd'],
      properties: {
        packageJsonScripts: { type: 'array', items: { type: 'string' } },
        gatesMjsRows: { type: 'array', items: { type: 'string' } },
        progressRow: { type: 'string' },
        visualAllowlistAdd: { type: 'array', items: { type: 'string' } },
      },
    },
    summary: { type: 'string' },
    blocker: { type: ['string', 'null'] },
  },
}

const PRE = `You are a glass-ui BUILD agent at ${GU}, branch tranche/AY (the CARVED post-Batch-4 tree: proof:no-god-module PASSES, 30+ live-verified rows; typecheck green). Demo at http://localhost:5199 (restart if down: npm run dev -- --port 5199; NEVER :5173). IMPLEMENT idiomatically; CAPTURE own-surface DELTAs where pixels change (real dims, LITERAL filenames in the <WAVE>-DELTA.md); VERIFY (gates + the FULL typecheck npm run typecheck + adjacent fleets). NO git. Do NOT edit package.json/gates.mjs/PROGRESS/VISUAL-ALLOWLIST — report in sharedFileDeltas. Clean /tmp.`

function ag(lane, scope) {
  return () => agent(`${PRE}\n\n=== YOUR LANE: ${lane} ===\n${scope}\n\nExecute; return (lane="${lane}").`,
    { label: lane, phase: 'Final', schema: SCHEMA, model: 'opus' })
}

phase('Final')
const out = (await parallel([
  ag('W-COHERE', `Execute ${W}/AY.W-COHERE.md on the CARVED tree (the wall killed the prior attempt before it started — fresh run; re-grep EVERY cite, the carve moved everything): (E1) the blob mood/seed chroma into the warm-red band the constellation focal + FF comet speak (the deriveBlobPalette C clamp; the demo mood seed into register; RECONCILE with the W-BLOB-REBUILD restored bead — never regress it); (E2) the blob ambient contact shadow at ALL THREE sites incl. the !important PRM block (the tokenised --blob-shadow on the --shadow-color re-resolution; the Memphis stamp stays Card-only); (E3) the constellation opacityCeiling recession prop (default 1 byte-identical; threaded through StoryHero like aurora/FF); (E4) mint proof:substrate-cohesion (G-ACCENT / G-RECESSION + the prop BITES / G-SHADOW both modes); (E5) the four-substrate both-mode SET DELTA (the contact sheet — every substrate legible light AND dark; the FF/dock dependencies are MET). Born-RED→GREEN + zero per-substrate fleet regressions.`),
  ag('W-ASSAY', `THE USER'S 06-10 ASSAY DIRECTIVE (verbatim themes): encapsulation + composables/useX consistency + state management; >500 splits (VERIFY the carve held: run proof:no-god-module + spot-read the carved sub-module shapes for cohesion — flag any mechanical-not-cohesive split); colocation (components+composables+constants+skeletons in sub-dirs where befitting — VERIFY W-COLOCATE's work, fix gaps; KISS, no contrivance); deeply-nested/brittle SELECTORS (CSS + reactivity — sweep src/ for fragile descendant chains, :deep abuse, watch-on-watch); THE 4-POINT STYLING AUDIT: (1) non-idiomatic Tailwind, (2) monolithic/global patterns that should be colocated/component-scoped (VERIFY W-CSS1), (3) deprecated/archaic CSS, (4) fragile rules (magic numbers, brittle calc()/min()/max() chains, viewport-unit traps, z-index coupling, browser-specific breakage) — unless HIGHLY befitting (the fixed-canvas cqx deck math IS befitting; judge, don't flatten); the design-idiom LOCALIZATION (one localized area defining the idioms — tokens.css/utilities.css/theme.css — with proper colocation; design cohesion within the aesthetic). Any style change PERFECTLY ISOMORPHIC (π-verify computed styles before/after on changed surfaces). OUTPUT: the fixes applied (small, surgical, isomorphic) + ${GU}/docs/tranches/AY/audit/ASSAY-LEDGER.md (per finding: FIXED here / ROUTED to a wave / BEFITTING-KEPT with why). Full typecheck + the gate fleets green at close.`),
  ag('FIX-GLASSUI-DARK', `The FD-R2 glass-ui defect cohort (${R2}/FDR2-glassui-panes.md — read it): (1) DEFECT#1 auth-shell DARK: the muted body copy sinks into the light-locked coral panel (auth-shell.vue:71,75) — light-locked ink or the W55 light bucket, π-verify ≥4.5:1 dark; (2) DEFECT#2 the 404 egg's lattice NEVER PAINTS (demo/eggs/NotFound.vue:14 — root-cause: the same zero-paint class? the mount? fix + the card centering); (3) DEFECT#3 the configurator dark stage chroma-less mud (vs the light lavender bloom — the dark-arm stage tokens); (4) THE LIBRARY BUG (from the slides lane, fix at the ROOT): DropdownMenuSubContent.vue is NOT PORTALED + DropdownMenuContent carries max-h-[60vh] overflow-y-auto — every submenu paints clipped-invisible (ARIA expanded, pointer-unreachable). Portal the SubContent (the reka DropdownMenuPortal wrapper, matching how Content portals) so submenus escape the scroll container; verify the deck's pptx Light/Dark submenu becomes reachable (test on :5273 if up) AND the demo dropdown stories hold. (5) the suffusion rank-1: the icons-page color-pop thread (the 25%-mix chip recipe from empty-states onto foundations/icons with the one-color-event rule written in the story). Captures for each fix.`),
  ag('FIX-SLIDES-DARK', `THE SLIDES DARK DISEASE (${R2}/FDR2-slides-panes.md — read it; repo ${SL}, branch tranche/til-briefing-L; dev :5273, restart if down: npm run dev -- --host 127.0.0.1 --port 5273 --strictPort): ONE measured cause — the deck's glass-resting plate composites to a KHAKI rgb(114,109,102) over the dark field (S13 body 3.16:1 AA FAIL, home tile 2.00:1 SEVERE; the light arm passes 6.88:1; the bare dark field passes 11.57:1). The deck.css frost ladder's dark arm needs a REAL dark-glass recipe (a deep cool translucent plate — not the light frost mixed over dark, which muds to khaki): re-point the .slide--dark + :root.dark glass-bg/frost arms so the plates read as DARK glass (ink-deep translucency + the rim/crest carrying the silhouette), π-verify EVERY failing surface ≥4.5:1 (S13 both cards, S10 strip, S3/S12 cards, both home tiles) without regressing the light arm (6.88:1 floor held). Re-capture the dark sweep for the changed slides + the home tiles; build + conformance green. NO git.`),
  ag('W-CARRY-LIVE1-FINISH', `The wall-killed chain finisher: (1) ${W}/AY.W-CARRY.md — the deferral register EXECUTED as written (the manifest JSON + the completeness clause + the G-4/5/6 forks per docs/tranches/AY/audit/USER-DECISIONS-2026-06-10.md routing; the register-row-count = ledger-BOOK-count born-RED witness) — NO register file exists yet (grep docs/tranches/AY/audit/ for the register; the spec names its home). (2) ${W}/AY.W-LIVE1.md FINISH — the freshness arm PARTIALLY landed (the ledger gate runs a graced bare mode with 4 header-less NOTEs): land the remainder per the spec (the R1 IHDR dimension assert if absent — grep the gate for IHDR; the R6 GREEN-on-real-surface clause; the local-only live-gate CI decision recorded) AND backfill the 4 NOTEd freshness headers (W-DOCK1/W-CON1/W-BLOB2/W-DOCK2 DELTAs gain the capture-commit + surface-paths headers — re-capture ONLY if the spec demands fresh pixels, else the header backfill with the honest original-capture commit). (3) ${W}/AY.W-CONSUMER.md — the consumer-staleness ledger. (4) ${W}/AY.W-TRIAGE.md + ${W}/AY.W-NDA.md — the residual dispositions (doc waves). Full typecheck + the ledger green (the NOTEs cleared or honestly graced).`),
])).filter(Boolean)
log(`final band: ${out.length}/5`)
return out
