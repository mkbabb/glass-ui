# AX.W61 — Dock-unify-root: ONE GlassDock root for every dock (home-left persistent + nav + `<DockSeparator>` dividers), the glass-first selected-control re-point (the keyframes-dock model), and the Q1 collapsed-pill size fix

**Band** A · DOCK · **Severity** major · **dependsOn** AX.W45 (the three-region model — the `#persistent` slot + the `<DockSeparator>` primitive + the `--dock-scale` cascade W61 COMPOSES into the nav-pattern contract) + AX.W54 (the glass-first ROOT default — W54 confirms the default-register intent and DEFERS the dock-CONTROL re-point to the dock band, which is THIS wave) (· AX.W00 for the π-lane close machinery; AX.W56 for `--corner-shape-bigdock` consumed read-only)
· **Charter** `USER-DEFECTS-2026-06-08-pass3.md:18` (the DK/W45 RE-NOTED bump — *"Only SOME docks have persistent nav elements — ALL should leverage the SAME root component: home button on the LEFT, navs, dividing lines"*) + `:13` (the glass-first ROOT bump — *"GLASS FIRST for buttons + items EVERYWHERE, and in the dock (the keyframes dock is the model for selected elements)"*) + `:26` (Q1 — *"Dock: the SHRUNKEN (collapsed) item is not the proper SIZE in the demo (the collapsed pill mis-sized)"*)
· **Audit** `MASTER-PLAN.md:27` (Batch 3 — *"W45-TUNE (Q1 collapsed size, …) → W06 carve+showcase → dock-unify-root"*) + `:52` (the dock-unify-root NET-NEW W45 extension) + the W54 dock-control coordination clause (`AX.W54-glass-first-class.md:197-202` — *"the dock-control re-point executes in the dock band (W45/DK2 owns the dock-control surfaces … if a control is still solid)"*)

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact only — this doc writes no `src`. The implementer session
> drives the §Cadence from this spec. Per the AX cardinal precept (§0 / AX.W00): this wave does NOT close
> on a green headless gate; it closes on a LIVE chrome-devtools-mcp + frontend-design audit. Per the hardened
> agent git clause (K W0): agents NEVER stage/commit/stash — the orchestrator owns the index.

> *Gloss.* The **nav-pattern contract** is the consistent dock composition the user names: a HOME control in
> the leading slot (`#persistent`, home-left), the nav items, and `<DockSeparator>` dividers between groups —
> ONE GlassDock root, ONE recipe, every dock instance. The **glass-first selected-control** is the dock
> CONTROL's active/selected state reading as a glass-translucent tint over the dock's glass substrate (the
> keyframes-dock model the user references), NOT an opaque `--surface-tint` plate. The **collapsed pill** is
> the resting `.dock-layer--summary` state — the single-glyph pill the dock shrinks to; Q1 is that it is
> MIS-SIZED (it does not read as a tight, properly-proportioned pill).

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `89edffc` (3.8.0 + the AX integrated dock band) on **four** falsifiable witnesses,
each a source-true line-probe the new gate inverts. W45 SHIPPED the structural PRIMITIVES — the `#persistent`
slot (`GlassDock.vue:497-499`), the `<DockSeparator>` primitive + barrel export (`dock/index.ts`), and the
`--dock-scale` cascade — but the primitives are NOT yet a recorded, gated NAV-PATTERN CONTRACT, the collapsed
pill is mis-sized on the floor tokens W45 left undefined, and the dock-CONTROL selected state is still an
opaque overlay (the re-point W54 explicitly defers here). Source-confirmed at HEAD:

- **RED witness 1 (the headline — there is NO unified nav-pattern; docks compose DIVERGENTLY, parse-falsifiable).**
  The showcase dock `demo/stories/navigation/dock.vue` DOES use the W45 pattern (`#persistent` `<Home>` at
  `:88`, `<DockSeparator />` at `:92,:113,:145,:226`). BUT the demo NAV-SHELL docks do NOT: `BottomDock.vue`
  uses raw `<span class="demo-bottom-dock__sep">` hairlines (`:127,:177` — NOT `<DockSeparator>`), a
  `PanelLeft` menu trigger in the leading slot (`:97-103` — NOT a home-left `#persistent`), and NO `#persistent`
  region at all; `SidebarDock.vue` hand-rolls a `<RouterLink>` brand wordmark (`:67-85` — NOT a `#persistent`
  home control) and a raw `<div class="… bg-border/50">` divider (`:124-127` — NOT `<DockSeparator>`). So the
  three dock surfaces a consumer sees paint THREE different nav vocabularies — the same divider expressed three
  ways (`<DockSeparator>` / `<span class="demo-bottom-dock__sep">` / `<div class="bg-border/50">`), home
  expressed two ways (`#persistent` / hand-rolled wordmark) and absent in a third (BottomDock). There is NO
  recorded "every dock = ONE root + home-left + nav + dividers" contract and no gate that asserts it.
  **Falsifiable RED:** *grep the demo dock instances — at HEAD `BottomDock.vue` + `SidebarDock.vue` carry
  raw-class separators (`demo-bottom-dock__sep` / `bg-border/50`) and no `#persistent` home-left, divergent
  from `dock.vue`'s W45 pattern; no `proof:dock-unify` gate asserts a unified composition (RED). After the
  wave EVERY dock instance composes the ONE GlassDock root with a `#persistent` home/brand in the leading slot,
  `<DockSeparator>` dividers (zero raw-class separators), and the nav items, with `proof:dock-unify` asserting
  the contract across the demo dock census (GREEN).*

- **RED witness 2 (Q1 — the collapsed pill is MIS-SIZED: the collapsed-floor tokens are UNDEFINED so it falls
  to full-control values, parse-falsifiable).** The collapsed pill geometry has TWO floor tokens, NEITHER
  defined anywhere in `src/`: (a) `dock.css:717-723` `.glass-dock.collapsed .dock-layer--summary` sets
  `min-width: var(--dock-collapsed-summary-min-size, var(--dock-layer-height, 2.5rem))` — only `min-WIDTH`,
  no symmetric `min-block-size`/aspect lock, and `--dock-collapsed-summary-min-size` is UNDEFINED
  (`grep -rn "dock-collapsed-summary-min-size:" src/` = NONE), so it falls to the FULL control height
  (`--dock-layer-height`, 2.5rem at comfortable); (b) `dock.css:524-538` the padding morph reads
  `--dock-pad-collapsed: var(--dock-collapsed-padding, var(--dock-padding-block, 0.375rem))` — and
  `--dock-collapsed-padding` is UNDEFINED (`grep -rn "dock-collapsed-padding:" src/` = NONE), so the collapsed
  padding floor falls to the EXPANDED `--dock-padding-block` (0.375rem). Net: the collapsed pill is NOT a tight
  circular pill — it wraps a glyph constrained to a full-control min-width with expanded-grade padding, so it
  reads as an over-wide, loosely-padded box rather than the proportioned pill the user expects. **Falsifiable
  RED:** *grep `src/styles/` for `--dock-collapsed-summary-min-size:` + `--dock-collapsed-padding:` — at HEAD
  both are referenced-only (no definition; the collapsed pill inherits full-control width + expanded padding;
  RED). After the wave both are minted as proportioned collapsed-floor tokens (a tight pill that wraps the
  glyph + the collapsed padding floor), the summary pane carries a symmetric size contract (an
  aspect-/min-block-correct pill, not width-only), and the collapsed pill renders measurably tighter than the
  expanded dock at the same density (GREEN).*

- **RED witness 3 (the dock SELECTED/active control is an opaque-ish overlay, NOT glass — the keyframes-dock
  model is unmet, parse-falsifiable).** The dock-control active fill resolves
  `--dock-active-bg: var(--dock-control-active-bg)` (`tokens.css:1152`) → `--dock-control-active-bg:
  var(--surface-tint-12)` (`tokens.css:1125`). `--surface-tint-12` is a `color-mix(in srgb, var(--foreground)
  12%, transparent)` foreground-over-transparent overlay — a flat tint plate, NOT a glass-translucent variant
  that reads the dock's blurred glass substrate THROUGH it (the keyframes-dock "selected element reads as
  glass" model). The hover fill `--dock-control-hover-bg: color-mix(in srgb, var(--card) 55%, transparent)`
  (`tokens.css:1124`) is closer (a card-over-transparent mix) but the active step LADDERS UP onto the
  flat-tint family, so the selected control reads as an opaque-ish stamp over the glass, not a glass tier above
  it. W54 confirms the default-register intent and DEFERS the actual re-point to the dock band (W54:197-202);
  THIS wave executes it. **Falsifiable RED:** *resolve `--dock-active-bg` — at HEAD it ladders to
  `--surface-tint-12`, a foreground-over-transparent flat tint (NOT a glass-translucent variant reading the
  substrate; RED). After the wave the selected/active dock-control fill reads as glass-first — a glass-tier
  tint (the dock-glass `--glass-bg-*` family or a glass-correct active token) so the selected control reads as
  a glass surface a tier above the dock substrate, the keyframes-dock model (GREEN).*

- **RED witness 4 (the nav-pattern contract is NOT recorded canon — grep-falsifiable).** `grep -rn
  "nav-pattern\|home-left\|dock-unify\|unified dock" CLAUDE.md` returns ZERO. CLAUDE.md's dock section
  (`### Dock orientation and multi-layer`) documents the `orientation`/`DockLayerGroup`/`#persistent`
  mechanics but records NO "every dock composes ONE GlassDock root with a home-left persistent control + nav +
  `<DockSeparator>` dividers" PATTERN — so a consumer (or a future demo dock) has no recorded contract to
  follow, which is exactly how the three divergent demo vocabularies (witness 1) arose. **Falsifiable RED:**
  *`grep CLAUDE.md` for the nav-pattern contract — at HEAD there is none (RED). After the wave CLAUDE.md
  records the dock nav-pattern contract (the canonical composition: home-left `#persistent` + nav +
  `<DockSeparator>` dividers, ONE GlassDock root) + the collapsed-pill floor tokens + the glass-first
  selected-control register (GREEN).*

The wave is RED at HEAD on all four; the HardGate below drives each to GREEN.

**Live re-diagnosis ritual (AX.W00 wave-open obligation).** BEFORE any edit, re-confirm the four witnesses on
the live demo at `localhost:5173` (the §HardGate π checks): the BottomDock divider hairlines vs the
`dock.vue` `<DockSeparator>` read differently; the collapsed showcase dock pill reads over-wide/loosely-padded
(collapse `dock.vue`'s dock and eyeball the pill against the expanded dock at the same density); the
selected/active dock control reads as a flat stamp not a glass tier; CLAUDE.md records no nav-pattern. Capture
the BEFORE π render (the three divergent docks side-by-side; the mis-sized collapsed pill; the opaque selected
control) as the born-RED baseline in `audit/W61-dock-unify-root.json`. Do NOT proceed on the audit's word —
re-prove (the cardinal AX lesson).

**Status** — SPEC (this doc). DEV-only; writes no `src` from this session.

---

## Goal

EVERY dock — the demo showcase docks AND the demo nav-shell docks — composes the SAME GlassDock root with the
SAME nav pattern: a HOME (or brand) control in the leading `#persistent` slot (home-left), the nav items, and
`<DockSeparator>` dividers between groups — ONE recipe, zero raw-class separators, zero hand-rolled home
chrome. The dock's SELECTED/active control reads as GLASS-FIRST (a glass-translucent tier over the dock's
glass substrate, the keyframes-dock model), not an opaque overlay stamp. The Q1 collapsed pill is properly
SIZED — a tight, proportioned pill on minted collapsed-floor tokens (a glyph-snug min-size + a tighter
collapsed padding floor), measurably smaller than the expanded dock. The nav-pattern contract + the collapsed
tokens + the glass-first selected register are RECORDED in CLAUDE.md so the next dock follows it by construction
(no fourth divergent vocabulary). Every magnitude a `--dock-*` token, no buried literal, the W45 three-region
model + the W54 glass-first default + the W56 corner-shape axis KEPT and COMPOSED.

---

## Scope (the gestalt fix — one nav-pattern contract + the collapsed-floor mint + the glass-first re-point, no patches)

The pass-3 ask is ONE seam read at three altitudes: the dock primitives W45 shipped are NOT a recorded,
enforced PATTERN, so the docks a consumer actually sees diverge, the collapsed pill is mis-sized on the floor
tokens W45 left undefined, and the selected control is not yet glass-first. ONE cohesive contract-and-tune
restructure, not a patch fleet. Four folds, all token-/composition-routed:

1. **The nav-pattern contract — ONE GlassDock root, home-left `#persistent` + nav + `<DockSeparator>`
   dividers (the headline — pass-3:18).** Record the canonical dock composition as a CONTRACT (CLAUDE.md +
   the gate): every dock = a single `<GlassDock>` root with a HOME/brand control in the LEADING `#persistent`
   slot (home-left), the nav items, and `<DockSeparator>` between groups. Migrate the SHOWCASE/story docks
   (`demo/stories/navigation/rail.vue` + any in-bounds story dock) onto the pattern where they diverge, and
   AUTHOR the contract canon. The `<DockSeparator>` primitive + the `#persistent` slot already exist (W45) —
   this fold MAKES THEM THE LAW, retiring the raw-class/hand-rolled divergence. The demo NAV-SHELL adoption
   (`demo/layout/BottomDock.vue` + `SidebarDock.vue` + `dock-nav.css` — W40's FileBounds) is a CONVERGE fold
   routed to W40, NOT executed here (see §CONVERGE + DEDUP); W61 authors the CONTRACT + the gate that W40's
   shell rebuild must satisfy.

2. **Q1 — the collapsed-pill SIZE fix: mint the collapsed-floor tokens (pass-3:26).** Mint the two UNDEFINED
   collapsed-floor tokens so the collapsed pill is a tight proportioned pill, not a full-control box:
   `--dock-collapsed-summary-min-size` (a glyph-snug min-size — sized to the glyph + a small breathing ring,
   e.g. `calc(var(--dock-control-size) - <delta>)` or an explicit pill diameter, NOT the full
   `--dock-layer-height`) and `--dock-collapsed-padding` (a TIGHTER collapsed padding floor below the expanded
   `--dock-padding-block`, so the morph interpolates from a snug collapsed pad UP to the expanded pad rather
   than from the same value — making the collapse a visible tighten). Give the summary pane a SYMMETRIC size
   contract (a `min-block-size`/aspect lock so the collapsed pill is a proportioned pill, not width-only — a
   1px-min-width glyph in a wide box is the HEAD defect). The tokens ride `--dock-scale` (`calc(* var(
   --dock-scale))`) so the collapsed pill scales coherently on touch like the rest of the W45 cascade. The
   tokens are public library defaults (presets-in-consumers: a consumer retunes the collapsed pill via one
   token), NOT magic literals.

3. **Glass-first SELECTED/active dock control — the keyframes-dock re-point (pass-3:13; W54:197-202 deferred
   here).** Re-point the dock-control active fill OFF the flat `--surface-tint-12` overlay (`tokens.css:1125`
   `--dock-control-active-bg`) ONTO a glass-correct register so the selected control reads as a glass tier
   over the dock's glass substrate (the keyframes-dock model). KEEP the DK2 four-state family contract (one
   source per state across icon/tab/picker — `dock-controls.css:126,283,495`); this is a VALUE re-point on the
   existing `--dock-control-active-bg`/`--dock-active-bg` knob (the glass-translucent tint, e.g. a
   `--glass-bg-*` tier or a glass-correct active token a tier above the hover fill), NOT a re-author of the
   four-state machinery W45/DK2 owns. The hover fill (`--dock-control-hover-bg`, a `--card`-over-transparent
   mix) already reads translucent; this fold makes the ACTIVE step a glass tier ABOVE it (active ≠ hover
   preserved — the DK2 ladder-step contract). Coordinate with W54 (W54 confirms the default-register intent;
   this is the dock-band execution W54 names). Do NOT touch the specular-track default-off (that folds into
   W54 per `from-keyframes-IW6-dock-button-specular.md` — a DISTINCT concern; see DEDUP).

4. **Record the contract + the tokens in CLAUDE.md (pass-3:18; docs-as-part-of-the-change).** Append to the
   CLAUDE.md dock section: the nav-pattern contract (the canonical composition — home-left `#persistent` + nav
   + `<DockSeparator>` dividers, ONE GlassDock root), the collapsed-floor tokens
   (`--dock-collapsed-summary-min-size` + `--dock-collapsed-padding` + their `--dock-scale` thread), and the
   glass-first selected-control register (the active fill is a glass tier, not a flat overlay). Documentation
   is part of the change — it is WHY the divergence arose (no recorded pattern) and HOW it stops recurring.

All four folds are ONE nav-pattern + collapsed-floor + glass-first restructure on the dock band W45 settled —
gestalt, not four patches. The `#persistent` slot + `<DockSeparator>` are W45's primitives (composed, not
re-authored); the collapsed-floor tokens are new lines on the existing collapsed-pill rules; the active-fill
re-point is a value edit on the DK2 knob; the contract is recorded canon.

### SOTA note (the iOS dock-bar nav idiom this transposes)

The home-left + nav + dividers pattern is the macOS/iOS dock-bar idiom: a STABLE leading anchor (the Finder/
home tile), the app/nav tiles, and group dividers — a single coherent dock vocabulary the OS uses everywhere,
not three different bars. glass-ui's W45 already shipped the iOS Now-Playing persistent-rail mechanics; this
wave makes the COMPOSITION coherent (every dock the same bar). The collapsed pill is the iOS Dynamic-Island /
Now-Playing-mini idiom: a tight, glyph-snug pill the chrome shrinks to — NOT a loosely-padded box, which is
exactly the Q1 mis-size. The glass-first selected control is the iOS-26 Liquid Glass "selected tile reads as a
glass tier above the bar" register — the keyframes-dock model the user names: the selection lifts a glass
tier, it does not stamp an opaque plate.

### CONVERGE folds (consumer-grounded, NOT executed here)

- **The demo NAV-SHELL adoption (`demo/layout/BottomDock.vue` + `SidebarDock.vue` + `dock-nav.css`) routes to
  W40.** W40's FileBounds OWN those shell files (the demo-shell dock-nav rebuild on the AX dock + the W18
  tree). W61 authors the nav-pattern CONTRACT + the `proof:dock-unify` gate; W40's shell rebuild SATISFIES it
  (the SidebarDock/BottomDock gain a home-left `#persistent` + `<DockSeparator>` dividers + zero raw-class
  separators when W40 rebuilds them). W61 ADDS W40 to its Blocks-consumer list + adds the nav-pattern
  assertion to the contract the gate enforces; it writes NO `demo/layout/` source. The `proof:dock-unify`
  census-arm covers the showcase docks at HEAD and the shell docks AFTER W40 (the gate's dock-instance list is
  the contract W40 must clear).
- **External `--dock-*` consumers inherit the glass-first active + collapsed tokens token-first.** speedtest
  dock + bbnf-buddy ToolsLayer are `DockIconButton`/`--dock-active-*` hosts that inherit the glass-correct
  active fill + the collapsed-floor tokens from `dist/` — no consumer edit forced (token-first,
  consumer-overridable; a consumer with a bespoke `--dock-active-bg` override still wins). Recorded as a
  cross-repo NOTE routed to W34, not a sibling source edit here.
- **W56 corner-shape is CONSUMED read-only.** The collapsed pill + the dock controls inherit
  `--corner-shape-bigdock`/`--corner-shape-pill` (W56's axis) — W61 does NOT author corner-shape; the
  collapsed-pill size fix is a GEOMETRY (min-size + padding) concern orthogonal to the corner SHAPE. W61
  reads the W56 axis, never edits it.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/tokens.css` | **MINT** the collapsed-floor tokens in the §10 dock block: `--dock-collapsed-summary-min-size` (a glyph-snug collapsed-pill min-size, `calc(* var(--dock-scale))`-threaded, BELOW `--dock-layer-height`) + `--dock-collapsed-padding` (a tighter collapsed padding floor, BELOW `--dock-padding-block`, `--dock-scale`-threaded); **RE-POINT** `--dock-control-active-bg` (`:1125`) OFF `--surface-tint-12` ONTO a glass-correct active register (a glass-translucent tier above `--dock-control-hover-bg` — the keyframes-dock selected-glass), KEEPING the dark arm + the `active ≠ hover` ladder-step. (NO edit to the DK2 four-state machinery — value re-point only.) |
| `src/styles/dock.css` | **ADD** the symmetric collapsed-pill size contract to `.glass-dock.collapsed .dock-layer--summary` (`:717-723`) — a `min-block-size`/aspect lock so the pill is proportioned, not width-only; the `min-width` now resolves the minted `--dock-collapsed-summary-min-size` (the fallback chain stays). The `--dock-pad-collapsed` morph (`:524-538`) now resolves the minted `--dock-collapsed-padding` floor (the rule is unchanged — the token it reads is now defined). NO other dock.css edit (the three-region layout + the density cascade are W45's settled model; W61 only mints the collapsed FLOOR the rules already reference). |
| `src/styles/dock-controls.css` | (IF the glass-first active re-point needs a rule-level companion beyond the token re-point) confirm the active-state rule (`:126`, `:283`, `:495`) reads `--dock-active-bg`/`--dock-control-active-bg` (it does — no edit expected; the re-point is token-only). Touch ONLY if a glass-tier active needs a backdrop-filter/edge companion the token cannot carry — RATIFY (see Open Questions). |
| `demo/stories/navigation/rail.vue` | **MIGRATE** onto the nav-pattern contract where it diverges — a home/brand control in the leading `#persistent` slot (home-left) + `<DockSeparator>` dividers between groups (retire any raw-class divider). (The `dock.vue` showcase already follows the pattern — verify, no edit unless a divergence is found.) |
| `CLAUDE.md` | **DOCS** — append the dock nav-pattern contract (the canonical composition: home-left `#persistent` + nav + `<DockSeparator>` dividers, ONE GlassDock root) + the collapsed-floor tokens (`--dock-collapsed-summary-min-size` + `--dock-collapsed-padding` + the `--dock-scale` thread) + the glass-first selected-control register (the active fill is a glass tier, not a flat `--surface-tint` overlay). |
| `scripts/proof-dock-unify.mjs` | **NEW** — the device-free SOURCE/STRUCTURE arm + the registration. Asserts: the collapsed-floor tokens (`--dock-collapsed-summary-min-size` + `--dock-collapsed-padding`) are MINTED + `--dock-scale`-threaded + BELOW the expanded values; the summary pane carries a symmetric size contract (not width-only); `--dock-control-active-bg` resolves a GLASS-correct register (NOT `--surface-tint-12`) AND `active ≠ hover`; the demo dock census composes the unified pattern (home-left `#persistent` + `<DockSeparator>`, ZERO raw-class separators in the in-bounds docks); CLAUDE.md records the nav-pattern contract + the collapsed tokens + the glass-first active register. |
| `package.json` | Register `proof:dock-unify` (+ the W00 meta-gate parity match). |
| `docs/tranches/AX/audit/W61-dock-unify-root.json` | **NEW** — the born-RED→GREEN audit artefact + the dock-instance census + the paired-π BEFORE/AFTER + DELTA reference. |
| `docs/tranches/AX/audit/W61-DELTA.md` | **NEW** — the paired-π BEFORE/AFTER + DELTA capture (the W00 protocol). |

**OUT of bounds:** the `#persistent` slot MECHANICS + the three-region template + the `--dock-scale` density
cascade (**W45 owns** — W61 COMPOSES the persistent slot into the nav-pattern + mints the collapsed FLOOR the
cascade references, it does NOT re-author the three-region model); the `<DockSeparator>` primitive
implementation + barrel export (**W45 owns** — W61 composes it, never re-authors it); the DK2 four-state
dock-control MACHINERY — the `--dock-control-{hover,active}-bg` family STRUCTURE + the `:hover`/`:active`
selectors (**W45/DK2 owns** — W61 RE-POINTS the active VALUE to glass, it does not re-author the family); the
glass-first ROOT default + the `--glass-level` scalar + the specular-track default-off (**W54 owns** — the
keyframes-IW6 specular-bloom is W54's, NOT W61's selected-control re-point); the `--corner-shape-*`/`--corner-k-*`
axis (**W56 owns** — consumed read-only); the `dock.css`→`src/styles/dock/` PARTITION carve (**W06 owns** —
W06 carves the settled model AFTER W61's token mints); the demo NAV-SHELL `demo/layout/BottomDock.vue` +
`SidebarDock.vue` + `AppShell.vue` + `dock-nav.css` (**W40 owns** — W61 authors the CONTRACT the shell
satisfies, it writes NO shell source); the `manifest.ts` IA dock CATEGORY (**W18 owns**); the dock STORY
CONTENT / morph-showcase / `dock/variants` axis-tour (**W06 owns**); the `--dock-morph-t` spring DRIVER (**W01**);
the `SpringProgress` orchestrator (**W02**); the `overflow="wrap"` recipe (**W04**); the `--spring-*` cohort
(**W05**); the speedtest/bbnf-buddy sibling source (**W34**).

---

## Disjointness (sibling waves it must NOT overlap)

W61 is a dock-band wave that mutates `tokens.css` (the collapsed-floor + active-fill rows) + `dock.css` (the
collapsed-pill symmetric-size rule) + `dock-controls.css` (read-only confirm) + `demo/stories/navigation/`
(the showcase migration) + CLAUDE.md — the files the dock band serializes on. The band's "cannot run
concurrently" contract applies; the dispatch order:

- **vs AX.W45 (three-region model) — HARD PREDECESSOR.** W45 owns the `#persistent` slot + the
  `<DockSeparator>` primitive + the `--dock-scale` cascade. W61 **dependsOn W45** — it COMPOSES the persistent
  slot into the nav-pattern contract, MINTS the collapsed-floor tokens the W45 collapsed-pill rules already
  REFERENCE (`--dock-collapsed-summary-min-size` + `--dock-collapsed-padding` are referenced-but-undefined at
  HEAD post-W45), and rides the W45 `--dock-scale` thread on the new tokens. Sequencing W61 before W45 would
  mint a collapsed floor for a collapsed-pill rule that does not yet exist. Both edit `dock.css` — W45 owns the
  three-region + density-cascade + the collapsed-pill rule STRUCTURE; W61 adds ONLY the symmetric-size
  companion + mints the floor tokens (line-disjoint additions on the collapsed-pill rule W45 settled).
  Sequential by dependsOn, not concurrent.
- **vs AX.W54 (glass-first ROOT) — HARD PREDECESSOR.** W54 owns the glass-first DEFAULT + the `--glass-level`
  scalar + the specular-track default-off. W54 EXPLICITLY DEFERS the dock-control re-point to the dock band
  (W54:197-202 — *"the dock-control re-point executes in the dock band if a control is still solid"*). W61 is
  that dock-band execution: it re-points the dock-control ACTIVE fill to glass-first. W61 **dependsOn W54** —
  the glass-first register intent is W54's; the dock-control execution is W61's. Both edit `tokens.css` — W54
  the `--glass-level` + the glass-default rows; W61 the `--dock-control-active-bg` re-point + the
  collapsed-floor rows. Disjoint cohorts (glass-level/default vs dock-active/collapsed). The specular-track
  default-off (the keyframes-IW6 19-track bloom) is W54's, NOT W61's — W61 touches NO specular intensity.
- **vs AX.W06 (dock.css → partials carve) — DOWNSTREAM.** W06 carves `dock.css` into `src/styles/dock/`
  partials VERBATIM and owns the dock STORY CONTENT. W61 must land BEFORE W06's carve so W06 carves the
  SETTLED collapsed-floor model (carving before this mint would shelve a collapsed-pill rule W61 completes).
  W06 then relocates the SETTLED collapsed-pill rule + the new tokens into the carved partials. W06 authors NO
  collapsed-floor mint + NO active-fill re-point + NO nav-pattern contract (a DISTINCT concern — the carve +
  the story content). **Sequence: W45 → W54 → W61 → W06.**
- **vs AX.W40 (demo nav-shell rebuild) — DOWNSTREAM CONSUMER.** W40 rebuilds `demo/layout/BottomDock.vue` +
  `SidebarDock.vue` + `dock-nav.css` on the AX dock + the W18 tree. W40 must NOT touch `src/styles/dock*.css`
  (W40:94). W61 authors the nav-pattern CONTRACT + the `proof:dock-unify` gate; W40's shell rebuild SATISFIES
  it (the shell docks gain a home-left `#persistent` + `<DockSeparator>` dividers when W40 rebuilds them). W61
  writes NO `demo/layout/` source; W40 consumes the contract. W61 adds W40 to its Blocks list. The
  `proof:dock-unify` census-arm covers the showcase docks at HEAD; the shell-dock rows are the contract W40
  clears (the gate's instance list is the law W40's rebuild satisfies). No file overlap (W61 = `src/styles/`
  tokens + `demo/stories/navigation/` + CLAUDE.md; W40 = `demo/layout/`).
- **vs AX.W18 (storybook IA) — DISJOINT.** W18 owns `manifest.ts` (the first-class `dock` category tree). W61
  touches NO `manifest.ts` row. W18 frames the category; W61 unifies the dock COMPOSITION inside the stories.
  No shared file.
- **vs AX.W56 (squircle corner-shape) — DISJOINT AXIS.** W56 owns `--corner-shape-*`/`--corner-k-*` (the
  corner SHAPE). W61 owns the collapsed-pill SIZE (min-size + padding geometry) — orthogonal: a pill can be
  mis-SIZED at any corner-shape, and the W56 shape applies to whatever size W61 sets. W61 consumes the W56
  axis read-only, never edits it.

### DEDUP (the explicit boundary vs the named waves)

- **vs W45 (three-region model + DockSeparator + --dock-scale) — EXTENDS, line-disjoint.** W45 shipped the
  PRIMITIVES (`#persistent` slot, `<DockSeparator>`, `--dock-scale`). W61 makes them a recorded, gated
  NAV-PATTERN CONTRACT + mints the collapsed-FLOOR tokens W45's collapsed-pill rules reference but never
  defined + re-points the active fill to glass. W45 ≠ W61: W45 = the structural CAPABILITY; W61 = the
  composition CONTRACT + the collapsed-size fix + the glass-first selected re-point ON the settled capability.
  The W45 collapsed-pill rules (`dock.css:717-723`, `:524-538`) REFERENCE `--dock-collapsed-summary-min-size`
  + `--dock-collapsed-padding` with `var(…, fallback)` — the tokens are intentionally left for the tune wave
  (THIS one); W61 mints them. **W45 ≠ this wave** (W45 is the predecessor capability; W61 is the
  contract+tune).
- **vs W54 (glass-first ROOT) — EXECUTES its deferred dock-control clause.** W54 owns the glass-first DEFAULT
  + the specular-track default-off. W54:197-202 EXPLICITLY DEFERS the dock-control active re-point to the dock
  band. W61 executes THAT clause (the active-fill glass re-point — the keyframes-dock selected model). The
  specular-track 19-track bloom (`from-keyframes-IW6-dock-button-specular.md`) is W54's, NOT W61's — W61
  touches NO `--glass-specular-intensity-*`. The split is sharp: **W54 = the glass-first DEFAULT register +
  the specular default-off; W61 = the dock-control SELECTED/active glass re-point W54 names.** **W54 ≠ this
  wave.**
- **vs W40 (demo nav-shell) — the CONTRACT vs the SHELL.** W40 rebuilds the `demo/layout/` shell docks. W61
  authors the nav-pattern CONTRACT the shell satisfies + the gate that enforces it. W40 consumes the contract
  (the shell docks gain home-left + `<DockSeparator>` on rebuild); W61 writes no shell source. **W40 ≠ this
  wave.**
- **vs W06 (carve + story content) — DISTINCT.** W06 carves `dock.css` into partials + authors the dock story
  content/morph-showcase/`dock/variants` tour. W61 mints the collapsed-floor tokens + re-points the active
  fill + records the nav-pattern contract — a tune/contract concern, NOT a carve or story-content concern. W06
  carves the SETTLED W61 model AFTER (W45 → W54 → W61 → W06). **W06 ≠ this wave.**

No planned wave owns the dock's nav-pattern-contract gap, the Q1 collapsed-pill size fix, or the glass-first
selected-control re-point. W45 left the collapsed-floor tokens undefined for the tune wave; W54 deferred the
dock-control re-point to the dock band; neither owns the unified nav-pattern contract. This is the NET-NEW
W45 extension the MASTER-PLAN (`:52`) + pass-3 (`:18,:13,:26`) named.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

Per AX.md §0 agent-ceiling (≤6 implement / ≤7 read-only-audit). W61's actual split (count 3):

- **Implement (≤1 agent — the surface is one cohesive contract+tune).** Mints the collapsed-floor tokens +
  the symmetric collapsed-pill size contract (`tokens.css`/`dock.css`), re-points the active fill to glass
  (`tokens.css` value re-point), migrates the in-bounds showcase docks onto the nav-pattern
  (`demo/stories/navigation/rail.vue`), and records the contract (CLAUDE.md). Lint + typecheck at every
  interval. The collapsed-floor mint, the active re-point, and the showcase migration are line-disjoint.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the four RED witnesses against the patched tree:
  asserts the collapsed-floor tokens are minted + `--dock-scale`-threaded + BELOW the expanded values; asserts
  the summary pane carries a symmetric size contract (not width-only); asserts `--dock-control-active-bg`
  resolves a glass register (NOT `--surface-tint-12`) AND `active ≠ hover`; asserts the demo dock census is
  unified (ZERO raw-class separators in-bounds; home-left `#persistent`); asserts CLAUDE.md records the
  contract. ADVERSARIAL twist: (a) tries to make `proof:dock-unify` PASS with a raw-class separator still in an
  in-bounds dock (confirms the gate REDs on a divergent dock); (b) sets `--dock-collapsed-summary-min-size` =
  `--dock-layer-height` and confirms the gate REDs (the collapsed pill must be SMALLER than the full control —
  the Q1 fix); (c) re-points `--dock-control-active-bg` back to `--surface-tint-12` and confirms the gate REDs
  (the glass-first assertion); (d) confirms the W45 collapsed-pill rule still resolves its fallback chain
  cleanly under the new tokens (no regression on the three-region/`--dock-scale` model). DRIVES the
  VISUAL-TRUTH live audit (the binding close — see HardGate).
- **Gate-author (≤1 agent).** Authors `proof-dock-unify.mjs` (born-RED on the collapsed-floor mint + the
  symmetric-size contract + the glass-first active register + the unified-census + the CLAUDE.md contract);
  confirms it FAILS at HEAD `89edffc` (the undefined collapsed-floor tokens, the width-only summary, the
  `--surface-tint-12` active, the divergent demo docks, the unrecorded contract) and PASSES on the patched
  tree. Registers `proof:dock-unify` in `package.json` + the W00 meta-gate parity. Gate-author is distinct
  from implementer (the gate must be able to FAIL the implementer's work — the AW false-GREEN class). The π
  live arm (the painted-pixels truth) rides the W00 readback, NOT a CPU text gate alone (the SOURCE arm proves
  the token/composition STRUCTURE; the π arm proves the RENDER — the collapsed pill is actually tighter, the
  selected control actually reads glass, the docks actually look the same).

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b —
mandatory):** The wave-agnostic authorization grant lives ONCE in AX.md §6.1 (the master template — devise an
in-FileBounds idiomatic gestalt fix; spawn a tangent triumvirate to work AROUND, never stall; escalate ONLY
when genuinely user-gated) with the 4-class halt-vs-work-around decision tree in AX.md §6.2 — by reference, not
restated here. This wave's §3a triumvirate AUTO-TRIGGERS (authored from its FileBounds + HardGate):

- **Out-of-FileBounds reveal → triumvirate (Class 2; NEVER absorb in-line).** Any need to touch the
  `#persistent` slot MECHANICS / the three-region template / the `--dock-scale` density cascade (W45), the
  `<DockSeparator>` primitive implementation (W45), the DK2 four-state MACHINERY (`--dock-control-{hover}-bg`
  STRUCTURE + the `:hover`/`:active` selectors — W45/DK2), the `--glass-level` scalar / the specular-track
  default-off (W54), the `--corner-shape-*` axis (W56), the `dock.css`→partials carve (W06), the demo
  NAV-SHELL `demo/layout/` files (W40), the `manifest.ts` IA dock category (W18), or the `--dock-morph-t`
  driver / `SpringProgress` orchestrator (W01/W02) — HALT + triumvirate (a dock-band boundary the FileBounds
  did not home).
- **Non-local hard-gate failure → triumvirate (Class 2).** If `proof:dock-unify` cannot simultaneously assert
  the collapsed-floor mint + the symmetric-size contract + the glass-first active register + the unified
  census + the CLAUDE.md contract — OR if a sibling dock gate (`proof:dock-region-model` W45, the DK2
  state-contract gate) REDs after the collapsed-floor mint or the active re-point (the new tokens desyncing a
  gate W45 owns) — escalate the gate design, do NOT relax a ceiling or split the gate to pass over a residual
  full-control collapsed pill / flat-tint active.
- **3rd diagnostic-loop iteration → triumvirate (Class 2).** If the collapsed pill does NOT read as a tight,
  proportioned pill (it is still over-wide or loosely-padded) after three token retunes, OR the selected
  control does NOT read as a glass tier over the dock substrate after three re-points, OR the three docks do
  NOT read as the SAME bar after three migration passes, dispatch research→plan→redress rather than tuning
  the collapsed-size constant / the active-tint alpha ad hoc.
- **§5.3 ratify reached un-ratified → HALT-and-ratify (Class 3).** The collapsed-pill min-size FORMULA
  (`calc(--dock-control-size - delta)` vs an explicit pill-diameter token vs an aspect lock), the
  glass-first active REGISTER (a `--glass-bg-*` tier token vs a glass-correct `color-mix` over the dock
  substrate vs a backdrop-filter companion in `dock-controls.css`), and the showcase-vs-shell migration SPLIT
  (W61 migrates `demo/stories/navigation/` only; the `demo/layout/` shell is W40's — confirm the line) are
  ratify-before-impl hinges — if any reaches impl un-ratified, take the recorded default (a glyph-snug
  `calc`-min-size + a tighter collapsed pad, both `--dock-scale`-threaded; a glass-translucent active token a
  tier above the hover fill, token-only no `dock-controls.css` rule; W61 owns the showcase migration + the
  contract, W40 owns the shell adoption) and run the live-audit verification step, do NOT self-ratify a
  divergent choice.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**`proof:dock-unify` — born-RED→GREEN. TWO arms (device-free + fail-closed π live).**

### Arm 1 — device-free SOURCE/STRUCTURE (the no-device CI arm)

A source-parse + token-resolution + composition gate (the precept-valid artefact forms per SPEC.md §Hard
Gates — source-structure for the CSS-cascade + the SFC composition contract; the PAINTED render is proven by
the π arm below, NEVER a text gate alone):

- **The collapsed-floor tokens are minted + proportioned (Q1).** Assert `--dock-collapsed-summary-min-size`
  AND `--dock-collapsed-padding` are DEFINED in `tokens.css` §10, each `calc(* var(--dock-scale))`-threaded,
  and each resolves BELOW its expanded counterpart (`--dock-collapsed-summary-min-size` < `--dock-layer-height`;
  `--dock-collapsed-padding` < `--dock-padding-block`) — the collapsed pill is TIGHTER than the full control.
  Assert the `.glass-dock.collapsed .dock-layer--summary` rule carries a SYMMETRIC size contract (a
  `min-block-size`/aspect lock, NOT `min-width` alone). **Born-RED at HEAD** (both tokens referenced-only/
  undefined → the collapsed pill inherits the full `--dock-layer-height` width + the expanded padding; the
  summary rule is `min-width`-only).
- **The glass-first SELECTED control register (the keyframes-dock model).** Assert `--dock-control-active-bg`
  (and the resolved `--dock-active-bg`) is a GLASS-correct register (a `--glass-bg-*`-family tier OR a
  glass-translucent token that reads the substrate) — NOT `--surface-tint-12` (a flat foreground-over-
  transparent overlay) — AND `active ≠ hover` (the DK2 ladder-step preserved). **Born-RED at HEAD**
  (`--dock-control-active-bg: var(--surface-tint-12)` at `tokens.css:1125`).
- **The unified nav-pattern census (the headline).** Parse the in-bounds demo dock instances — assert ZERO raw-
  class separators (`demo-bottom-dock__sep` / `bg-border/50` / bare `<div class="… bg-border …">`) survive in
  the docks W61 owns, that each composes a `<GlassDock>` root with a home/brand control in the LEADING
  `#persistent` slot (or the documented brand-home position), and that dividers are `<DockSeparator>`. (The
  shell-dock rows in the census are the contract W40 satisfies — the gate's instance list spans the showcase
  docks at HEAD + the shell docks AFTER W40; the gate asserts the law, W40's rebuild clears the shell rows.)
  **Born-RED at HEAD** (`BottomDock.vue` + `SidebarDock.vue` carry raw-class separators + no home-left
  `#persistent`).
- **The contract is recorded canon.** Assert CLAUDE.md records the dock nav-pattern contract (home-left
  `#persistent` + nav + `<DockSeparator>`, ONE GlassDock root) + the collapsed-floor tokens + the glass-first
  selected-control register. **Born-RED at HEAD** (`grep CLAUDE.md` for the nav-pattern/collapsed-floor/glass-
  selected-control records → NONE).

These are **source-structure** proofs (a CSS token definition / a cascade rule / an SFC composition / a
CLAUDE.md record is the artefact — the precept-valid form for token+composition structure). The RUNTIME
behaviour (the painted pixels) is proven by the π live arm, NOT a text gate.

### Arm 2 — fail-CLOSED π live/render (the device truth arm; the wave's binding close)

A live chrome-devtools-mcp + frontend-design render in the π workspace, FAIL-CLOSED (the gate REDs if the
render does not produce the asserted pixels — it never passes on a green source arm alone). Renders the docks
at ≥2 viewports (desktop + 375×667 mobile) in light AND dark over a rich background (the Aurora/constellation
backdrop so the glass reads):

- **The collapsed pill is properly SIZED — a tight pill (Q1, the headline).** Collapse a `<GlassDock>` (the
  showcase `dock.vue` dock): the collapsed pill renders as a TIGHT, proportioned pill snug around its glyph —
  a pixel-measured collapsed box measurably SMALLER (both axes) than the expanded dock at the same density,
  and NOT a loosely-padded over-wide box. `evaluate_script` reads the collapsed `.dock-layer--summary`
  bounding box vs the expanded dock box (a measured shrink delta). FAIL-CLOSED: if the collapsed pill is the
  full-control width / expanded-padding box (the HEAD mis-size) the gate REDs.
- **The SELECTED dock control reads as GLASS (the keyframes-dock model).** Select/activate a dock control over
  the rich backdrop: the selected control reads as a GLASS tier above the dock substrate (the backdrop is
  visible THROUGH the selected tint, with a glass edge) — NOT a flat opaque stamp. `evaluate_script` reads the
  resolved active `background` (a glass register, not `--surface-tint-12`) and the rendered tile shows the
  substrate through it. FAIL-CLOSED if the selected control reads as a flat opaque plate.
- **Every dock reads as the SAME bar (the unified nav-pattern).** Side-by-side the showcase dock + (after W40)
  the shell docks: the home-left anchor, the nav items, and the `<DockSeparator>` dividers read as ONE
  coherent vocabulary across all docks — same divider weight, same home position, same control register.
  FAIL-CLOSED if a dock paints a divergent divider / missing home / different control vocabulary.
- **The collapsed pill scales coherently on touch.** At the 375×667 coarse-pointer viewport the collapsed pill
  grows on `--dock-scale` in lockstep with the rest of the W45 cascade (the collapsed-floor tokens are
  `--dock-scale`-threaded) — a tight pill at ~1.5×, not a desktop-sized sliver. FAIL-CLOSED if the collapsed
  pill ignores `--dock-scale`.
- **No regression on the W45/W01 morph.** The collapse↔expand still settles on the ONE `--dock-morph-t` spring
  (the collapsed-floor mint changes the from/to geometry, NOT the spring — the W01 FLIP measures whatever
  natural size the new tokens produce). A `performance_start_trace` over the collapse confirms the morph still
  reads as one continuous spring.
- **Affordance / hierarchy / NO visual occlusion / no regression** per the AX cardinal gate, light AND dark.

**The wave does NOT close on the device-free arm alone** — the executed π live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, per the W00 protocol) is the binding close
criterion. The BEFORE capture pins the HEAD mis-sized collapsed pill + the flat opaque selected control + the
three divergent docks the unification must visibly beat (the cardinal AX lesson: a green source structure over
an unvalidated render is the failure W00 closes — the π arm is fail-closed so a green source arm alone cannot
mark this complete).

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the four RED witnesses against HEAD `89edffc` on
   the live demo: the BottomDock/SidebarDock raw-class separators + no home-left vs the `dock.vue`
   `<DockSeparator>`/`#persistent`; the mis-sized collapsed pill (collapse the showcase dock, measure it over-
   wide vs the expanded dock); the flat `--surface-tint-12` selected control; the unrecorded contract. Confirm
   W45 (the `#persistent`/`<DockSeparator>`/`--dock-scale` primitives) + W54 (the glass-first default) ARE
   landed (W61 composes/executes them). Capture the BEFORE π render as the born-RED baseline in
   `audit/W61-dock-unify-root.json`. Do NOT proceed on the audit's word — re-prove.
2. **Author the born-RED gate.** `proof:dock-unify` (the device-free source-structure arm + the fail-closed π
   live arm); register in `package.json` + the W00 meta-gate; confirm it FAILS at HEAD.
3. **Mint the collapsed-floor tokens + the symmetric size contract (Q1).** `tokens.css`:
   `--dock-collapsed-summary-min-size` + `--dock-collapsed-padding` (both `--dock-scale`-threaded, both below
   the expanded values); `dock.css`: the symmetric `min-block-size`/aspect lock on the summary pane. Lint +
   typecheck.
4. **Re-point the selected control to glass-first (the keyframes-dock model).** `tokens.css`:
   `--dock-control-active-bg` OFF `--surface-tint-12` ONTO a glass-correct register (a glass tier above the
   hover fill, `active ≠ hover` preserved); confirm the dark arm + the DK2 ladder. Lint + typecheck.
5. **Migrate the showcase docks onto the nav-pattern.** `demo/stories/navigation/rail.vue` (+ any in-bounds
   story dock that diverges): home/brand in the leading `#persistent` slot + `<DockSeparator>` dividers, zero
   raw-class separators. Lint + typecheck.
6. **Record the contract.** CLAUDE.md: the nav-pattern contract + the collapsed-floor tokens + the glass-first
   selected register. Add W40 to the Blocks-consumer list (the shell rebuild satisfies the contract).
7. **Gate GREEN + VISUAL-TRUTH.** Confirm the device-free arm passes; run the fail-closed π live audit (the
   tight collapsed pill measurably smaller than expanded; the glass selected control; the unified docks; the
   `--dock-scale` collapsed-pill scaling; no morph regression) at ≥2 viewports × light/dark; capture the
   paired-π BEFORE/AFTER + DELTA; write `audit/W61-dock-unify-root.json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W61-dock-unify-root.json` — the born-RED→GREEN ledger: the four RED witnesses
  (divergent docks, undefined collapsed-floor tokens, flat-tint selected control, unrecorded contract), the
  dock-instance census (showcase docks at HEAD + the shell-dock rows W40 satisfies), the per-fold disposition,
  the consumer census (the `--dock-active-*` + collapsed-floor public-token clear), and the post-wave GREEN
  structure + π-readback measurements (the collapsed-shrink delta; the glass-active backdrop read).
- `scripts/proof-dock-unify.mjs` — the device-free source-structure arm + the fail-closed π live arm.
- `docs/tranches/AX/audit/W61-DELTA.md` — the paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol):
  the mis-sized collapsed pill BEFORE vs the tight pill AFTER; the flat opaque selected control BEFORE vs the
  glass tier AFTER; the three divergent docks BEFORE vs the unified bar AFTER — at ≥2 viewports × light/dark.
- A cross-repo NOTE annex (NOT executed here): the speedtest dock + bbnf-buddy ToolsLayer inherit the
  glass-first active fill + the collapsed-floor tokens token-first; any bespoke override is a one-token set
  (routes to W34).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(dock): proof:dock-unify born-RED — collapsed-floor tokens, glass-first selected control, unified nav-pattern census, recorded contract (AX.W61)`
2. `fix(dock): Q1 collapsed-pill size — mint --dock-collapsed-summary-min-size + --dock-collapsed-padding (--dock-scale-threaded) + a symmetric summary-pane size contract (AX.W61)`
3. `feat(dock): glass-first selected control — re-point --dock-control-active-bg off --surface-tint-12 onto a glass tier (the keyframes-dock model; AX.W61, W54-deferred)`
4. `refactor(demo): unify the showcase docks onto the nav-pattern — home-left #persistent + <DockSeparator> dividers (AX.W61)`
5. `docs(dock): record the dock nav-pattern contract + the collapsed-floor tokens + the glass-first selected register in CLAUDE.md (AX.W61)`
6. `chore(AX.W61): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + consumer-token NOTE`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W45 (three-region model) — HARD.** W45 owns the `#persistent` slot + `<DockSeparator>` + `--dock-scale`
  cascade + the collapsed-pill rules that REFERENCE the (undefined) collapsed-floor tokens. W61 COMPOSES the
  persistent slot into the nav-pattern, MINTS the collapsed-floor tokens, and rides the `--dock-scale` thread.
  Must run AFTER W45.
- **AX.W54 (glass-first ROOT) — HARD.** W54 owns the glass-first default + DEFERS the dock-control re-point to
  the dock band (W54:197-202). W61 executes that clause (the active-fill glass re-point). Must run AFTER W54.
- **AX.W00 (π visual-runtime lane) — the close machinery.** The device-free + fail-closed π arms ride the W00
  lane; the tight-collapsed-pill + the glass-selected-control + the unified-docks π audit is the binding
  close. W61 cannot close on the source arm alone.
- **AX.W56 (squircle corner-shape) — read-only consume.** The collapsed pill + the dock controls inherit
  `--corner-shape-bigdock`/`-pill`; W61 reads the axis, never edits it.
- **Downstream:** **AX.W06** carves the SETTLED collapsed-floor + active-fill model into `src/styles/dock/`
  partials (W45 → W54 → W61 → W06). **AX.W40** rebuilds the demo NAV-SHELL docks onto the nav-pattern contract
  W61 authors (the shell-dock census rows the `proof:dock-unify` gate enforces). **AX.W34** receives the
  consumer-token NOTE (the glass-active + collapsed-floor tokens speedtest/bbnf-buddy inherit).

---

## DEDUP (why no OTHER planned wave owns this — the convergence finding proved it)

The pass-3 audit + the MASTER-PLAN proved at SOURCE that no existing wave owns the dock's nav-pattern-contract
gap, the Q1 collapsed-pill size fix, or the glass-first selected-control re-point. The exclusions, restated:

- **vs W45 (three-region capability) — PREDECESSOR, not owner of THIS scope.** W45 shipped the `#persistent`/
  `<DockSeparator>`/`--dock-scale` PRIMITIVES and left `--dock-collapsed-summary-min-size` +
  `--dock-collapsed-padding` referenced-but-undefined (the tune-wave handoff). W45 authors NO nav-pattern
  CONTRACT (it ships the primitives a contract composes), NO collapsed-floor mint, NO glass-first active
  re-point. **W45 ≠ this wave.**
- **vs W54 (glass-first ROOT) — DEFERS the dock-control clause HERE.** W54:197-202 explicitly defers the
  dock-control re-point to the dock band; W61 is that band. W54 owns the glass-first DEFAULT + the
  specular-track default-off (the keyframes-IW6 bloom), NOT the dock-control SELECTED-state re-point. **W54 ≠
  this wave.**
- **vs W06 (carve + story content) — DISTINCT.** W06 carves `dock.css` + authors the dock story content; it
  authors NO collapsed-floor mint, NO active re-point, NO nav-pattern contract. It carves the SETTLED W61
  model AFTER. **W06 ≠ this wave.**
- **vs W40 (demo nav-shell) — DISTINCT (CONSUMER).** W40 rebuilds the `demo/layout/` shell docks ON the
  contract W61 authors; it adds NO primitive capability + NO collapsed-floor mint + NO active re-point. The
  contract + the gate are UPSTREAM of W40 (W40 satisfies them). **W40 ≠ this wave.**
- **vs W18 (storybook IA) — DISTINCT.** W18 frames the `manifest.ts` dock CATEGORY; W61 unifies the dock
  COMPOSITION inside the stories. No shared file. **W18 ≠ this wave.**
- **vs W56 (squircle) — DISTINCT AXIS.** W56 owns the corner-SHAPE; W61 owns the collapsed-pill SIZE +
  composition + glass-active. Orthogonal. **W56 ≠ this wave.**

No planned wave owns the dock's nav-pattern-contract gap, the Q1 collapsed-pill size fix, or the glass-first
selected-control re-point. This is the NET-NEW W45 extension the MASTER-PLAN (`:52`) + pass-3 (`:18,:13,:26`)
named.
