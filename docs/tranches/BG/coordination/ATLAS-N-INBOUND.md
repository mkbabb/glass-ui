# ATLAS-N INBOUND — dispositions (2026-07-04)

**Source:** `sci-report/atlas/docs/tranches/N/coordination/ROOT-FAMILY.md` (the live N-loop
coordination surface, 2026-07-03) + the charter-named B7 consumer-migration roster rows.
Relayed by the program. Read READ-ONLY; every disposition below is a glass-ui-side fold, a
relay-back, or an already-landed confirmation. The atlas gates NOTHING on these (their
process law N2 — atlas hand-rolls nothing, publishes nothing, gates nothing on ROOT asks);
no publish pressure exists. Lineage: **EXTENDS** `ATLAS-M-INBOUND.md` (the M-arc roster-lock
snapshot) with the N-loop findings; the M vehicle `../../M/coordination/GLASS-BG-BH.md` is
the prior snapshot ROOT-FAMILY extends. Pin by commit; the human publish gate stands; the
linear 4-tag glass lineage (4.2→4.3→4.4→5.0) is the drain contract.

---

## §A — the B7 consumer-migration roster (the 5.0.0 rename rows)

The export-scan filter misses import-graph PROP usage, so two 5.0.0 breaks hit LIVE atlas
before they were rostered. Both are **already BUILT** on `tranche/BG` AND already on the
`BH.B6+B7-asks` covered-floor (`proof:crossrepo-asks:bh`, "GlassPanel `variant→tier` ×5 +
the density→size renames, widened in place per KF-2/KF-4"). Recorded here for the roster:

| # | rename | atlas live sites (their read) | glass-ui home — STATUS |
|---|--------|-------------------------------|------------------------|
| A1 | **GlassPanel `variant`→`tier`** (`SurfaceTier`) | `TaxonomyApparatus.vue:58` + HoverCard + GalleryMasthead + AuroraVeilStage (their BH.W-AXIS-GRAMMAR live-graph read) | **DONE** — `BH.W-AXIS-GRAMMAR` (F6.1): `GlassPanelVariant` DELETED, `variant`→`tier:SurfaceTier`, api + glass-panel barrel re-pointed, `/axes` types-only subpath GENERATED. Byte-identical paint. |
| A2 | **GlassDock `density`→`size`** | `Dock.vue:102` (their read) | **DONE** — `BH.W-SIZE-UNIFY` (F6.2): `DockDensity`→`DockSize`; `compact→sm`/`comfortable→md`/`spacious→lg`/`audacious→xl`; `.glass-dock[data-density]`→`[data-size]` CSS renamed in lockstep. Byte-identical paint. |
| A3 | **`.text-gilt`→`.gold-shimmer` / `.metal-gold`** (the dead-gold find) | `DashboardHero.vue:310` thesis one-shot (`:class="{ 'text-gilt': isThesis(i) && gold.shimmer.value }"`) → `.gold-shimmer`; `Glyph.vue:181` metal rim (`[\`metal-${props.metal}\`, "text-gilt"]`) → `.metal-gold` | **NEW — files onto the B7 roster + `BH.B4e-cut-authoring` MIGRATION.** The published `@mkbabb/glass-ui` cut ships ZERO `.text-gilt` rule; the live grammar is `.gold-shimmer` (base-misc.css, the one-pass gold text shimmer) + `.metal-gold` (metal.css, the text-clip metal). `.text-gilt` was the 3.10 class name; the rename never landed a MIGRATION row → atlas carries a dead class at two live sites. **ASK:** a `## 5.0.0` MIGRATION row `.text-gilt → .gold-shimmer` / `.metal-gold`. **ADJACENT (N.WC1):** the `/sci` gilt one-shot recede snaps one frame when the consumer drops `.text-gilt` (`useGoldOneShot.ts:57`); the consumer-side opacity cross-fade rides that re-point — a transitionable `.gold-shimmer` recede is a nice-to-have, never a blocker. |

---

## §B — dispositions (the standing N asks)

**B1 · `@settle` disposition CORRECTION — drains at the 4.3.0 Δ2 cut, not "owed on further
republish."** ROOT-FAMILY item 2 corrects the earlier GU-3-TRIAGE read (which scanned BG
waves, not the parked release branch): `release/4.3.0` (`28cf1cd1`) BUILDS the Δ2
`ExpandableContainer` single-instance reparent + `@settle` emit (E14). It is on the parked
4.3.0 branch, NOT the mid-BG tree — so it drains when 4.3.0 reconciles into the cut line, not
on a further republish. See §D (the merge note).

**B2 · The viz-facing primitive-subset MANIFEST — homed at `BH.B4-canon`.** The extracted
atlas library's glass peer contract is the `/motion` + `/motion-core` composable subset plus
the narrow surface set (`/handmark` `/aurora` `/paper-backdrop` `/glass-panel`
`/expandable-container` `/animated-digit` `/fading-scroll` `/dark`). ROOT-FAMILY item 3 names
`BH.B4-canon`'s machine-readable register as the right vehicle; atlas **G-N11** references the
ROOT register (never a consumer copy). Folds onto the existing `BH.B4-canon` PRIMITIVES-REGISTER
clause (the GENERATED-from-manifest canonical-primitives register beside `structure.md`/
`dependencies.md`); the viz-subset is a NAMED view over that register. Co-ownership stands
(their consume-canon ↔ our registry artifact).

**B3 · Consume-time re-verifies (atlas-side, recorded).** CAP-SCROLLS + DOCK-INPLACE-MORPH
landed-state (their overflow=`scroll` drop rides an unlanded WS2 wave at their recon time),
and the `<Card surface/tier>` + `<Badge variant/size>` consume sites (≥ `GalleryView.vue:277`)
against the landed 5.0.0 grammar folds. No ROOT action — a consumer verify pass; recorded so
the seam owners (F6.1/F6.2 grammar + WS2 CAP-SCROLLS) know a consumer re-checks post-cut.

**B4 · Staleness note (atlas-side).** `GU-DOCK.md` still describes BG as "LOCKED but
UN-BUILT" — a tranche behind. N readers cross-check `git log`, not that doc. No ROOT action;
recorded to keep the coordination truth aligned to disk (BG is ~20 waves built at recon time,
frontier at `0.7 W-DOCK-BLUR-RETIRE-CARVE`).

---

## §C — the new build asks (charter-named)

**C1 · Dock scroll-progressbar — the API-CONTRACT cross-check.** ROOT-FAMILY's owner directive
(2026-07-03) asks for a dock-native scroll-progress affordance: **per-item progress on the
stepper rail plus the overall barometer**, API shaped so the CONSUMER feeds normalized `[0,1]`
scalars per nav item (the dock never reads the page; the host injects the scalars). The atlas
CONSUME seam is GLASS-PARKED (drains beside `GlassDock density→size` in the B7 roster); on
consume the hand-rolled atlas barometer FOLDS INTO the glass primitive (adopt-or-delete —
never two progress authorities); do NOT hand-roll the progressbar in atlas meanwhile.
**glass-ui status — PARTIAL/CROSS-CHECK OWED.** `BG.W-DOCK-SCROLL-PROGRESS` (cursor 16.1, DONE
2026-07-03, dual-engine PASS) landed the USER-07-03 re-spec: the page-scroll progress **IS the
dock's BORDER** — `<BorderProgress>` composed onto the SidebarDock frame (expanded = the border
fill sweeping the plate edge; collapsed = the full ring around the pill). That is the
overall-barometer axis in border form. The atlas ask's **per-item `[0,1]`-scalar stepper-rail
API** is a DISTINCT axis not obviously covered by the border sweep. **ASK:** confirm whether the
landed `<BorderProgress>`-on-dock contract accepts consumer-fed per-item `[0,1]` scalars, or
whether the per-item stepper-rail progress is a second affordance owed; reconcile the two
07-03 specs (the atlas owner directive vs. the USER-07-03 dock-border re-spec) before the
B7 consume drains.

**C2 · Card as-child directive-root WARN — root fix is glass-ui's.** Atlas hit a Vue
directive-root warning using `<Card>` as a directive host / as-child; atlas worked around it
consumer-side via the `:as` prop, but the root fix belongs to glass-ui's `Card` (a single-root
/ `as-child`-forwarding shape so a directive lands on one resolved root). **ASK:** fold the
Card root fix into the overlay/encapsulation family (the `10.2 W-SHEET-INSET-ROOT` PORTAL-ATTRS
neighborhood is the closest single-root idiom home) — atlas retires its `:as` workaround on
consume. Non-blocking (atlas degrades via `:as` meanwhile).

**C3 · Compact tap-floor (44px).** The compact dock controls miss the G-N9 44px chrome
target-size floor (their census: `.dock-trigger.dock-dropdown-trigger` measured **32×24**).
The token neighborhood already exists (`--dock-control-floor` / `--dock-touch-target` /
`--dock-control-size`, GU-3-dock-consume Q4). **ASK:** guarantee a 44px effective tap floor on
the compact/dense dock control rung (a `@media(pointer:coarse)` hit-slop is the idiom — the
44px is the chrome-control floor; data-marks get hit-slop, per the atlas N-SPEC §4.5 split, not
per-mark painting). Rides the WS2/WS3 dock re-paint; the token names survive per Q4.

**C4 · Theme-only styles entry.** Atlas (N.WE2 drift-watch) wants a glass-ui **theme-only
styles entry** — an import that delivers the theme/token CSS WITHOUT the full JS bundle, so a
consumer can take the visual theme without dragging the component runtime. **ASK:** a
`./styles/theme` (or equivalent) subpath that publishes the token/theme CSS layer standalone.
Adjacent to `BH.B2-export-reshape`'s `/styles` posture + `BH.B4-canon`; sequence at glass-ui
convenience (fallback: atlas imports the full `/styles` meanwhile).

---

## §D — the 4.3.0 merge note (release-lineage; NOT fired here)

The program's standing lineage order (merge `release/4.3.0` into the cut line per the linear
4.2→4.3→4.4→5.0 drain) is **the repo's already-designed §0 reconcile** — recorded, NOT
executed in this coordination pass. Disk truth (2026-07-04):

- `release/4.3.0` (`28cf1cd1`, the K-I-ROOT-AUTHOR Δ1+Δ2+Δ3 set; Δ4 `#persistent-end`
  deferred on the shell.css ratchet) is **NOT an ancestor of `tranche/BG`** — both fork
  `998136bb` (the 4.2.0 ship). Δ1–Δ3 are NOT in the BG tree.
- A `release/4.3.0` → `tranche/BG` merge **conflicts** (`git merge-tree`: content conflict in
  `src/components/custom/dock/GlassDock.vue` — Δ3's `side` prop vs. BG's independent GlassDock
  evolution across 275 commits).
- The repo protocol (`publish-and-cut.md §0`, `EXECUTION-PLAN.md`, `ATLAS-M-INBOUND.md` item 1)
  fixes the reconcile as: merge `release/4.3.0` → **master** BEFORE its own 4.3.0 tag, then the
  BG/BH cut line descends from it — a **USER-GATED** operation at the publish hinge ("staged,
  not fired"; "4.3.0 stays PARKED pending an explicit publish 4.3.0"), run at the cut
  (WS10–12) with `--run full` siblings-absent, NOT a mid-tranche hand-merge into BG.

BG is at frontier `0.7`, dozens of waves from cut. A mid-tranche local merge into BG would
(a) target the wrong branch vs. the protocol, (b) pre-empt a user-gated publish decision, and
(c) require hand-resolving the GlassDock.vue conflict against 275 commits of landed BG work —
a workaround this repo's cut choreography forbids. **Disposition: the merge stays the parked,
user-gated §0 reconcile; not performed in this pass.** No branch touched.

---

## §E — RELAY-BACK (for the atlas / N session)

(a) **GlassPanel `variant→tier`** and **GlassDock `density→size`** are **BUILT** on
`tranche/BG` (F6.1 / F6.2, byte-identical paint) AND on the B7 covered-floor — the two
import-graph breaks are already rostered. (b) **`.text-gilt` is a DEAD class** in the published
cut — the live grammar is `.gold-shimmer` + `.metal-gold`; a `## 5.0.0` MIGRATION row is filed
(§A A3); re-point `DashboardHero:310`→`.gold-shimmer` and `Glyph:181`→`.metal-gold`, and the
one-shot recede cross-fade rides that re-point. (c) **`@settle` is on `release/4.3.0`** (`28cf1cd1`
Δ2), not the mid-BG tree — it drains at the 4.3.0 reconcile, not on a republish. (d) The **dock
scroll-progressbar** border form landed (`BG.W-DOCK-SCROLL-PROGRESS`); the **per-item `[0,1]`
stepper-rail API contract needs a cross-check** against the landed `<BorderProgress>`-on-dock
shape (§C C1) — name whether per-item progress is a second affordance. (e) The **primitives /
viz-subset register** is homed at `BH.B4-canon` (machine-readable, GENERATED); G-N11 references
the ROOT register. (f) The **Card as-child root fix**, the **compact 44px tap-floor**, and the
**theme-only styles entry** are filed as new asks (§C C2/C3/C4) — all non-blocking, atlas
degrades gracefully meanwhile. (g) The **4.3.0 merge** stays the parked, user-gated §0
reconcile onto master at the cut — not fired mid-BG (§D).
