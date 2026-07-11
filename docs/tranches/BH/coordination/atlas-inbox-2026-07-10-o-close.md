# ATLAS → glass-ui inbox — 2026-07-10 (O-arc close, supersedes o-dir4)

> Authored by the atlas O-arc close-out lane on the owner's standing directive to keep the
> glass-ui inbox current at every tranche boundary. Consumer-side asks only — zero glass source
> touched, zero glass docs edited. This packet **supersedes**
> `atlas-inbox-2026-07-10-o-dir4.md` in full — read this one, not that one (see §5).

## 0. Context

The O-arc REFORMATION tranche **CLOSED** this batch (EX-71 non-author close walk,
`atlas/docs/tranches/O/exec/CLOSE-REPORT.md`). The production deploy is **live**: HEAD `09973ae2`
built fresh and shipped via `wrangler pages deploy` → `https://c8f06927.atlas-dg2.pages.dev` →
`atlas.friday.institute` / `usf.friday.institute`; the build-stamp probe on the live site reads
`09973ae2` == HEAD (deploy-parity struck by construction). `RED-LEDGER.md` closed at 27 owner-bar
rows — the TERMINAL tally: **14 struck, 7 kept-RED, 6 owner-held/gated** (the walk's interim 12/8/7
plus the post-walk B.9 wire strike and B.7 deploy-parity strike) — zero dispositionless.

Atlas is pinned at **`@mkbabb/glass-ui` `>=4.2.0`** (peer, both `atlas/package.json` and
`app/package.json` — note this is an OPEN range, not the bounded-caret `^4.3.0` the atlas radius
canon assumes it will move to at the O-B10-adjacent hygiene pass; flagged here, not a glass ask)
and **`@mkbabb/pencil-boil` `^0.4.1`**; the app shell pins `@mkbabb/atlas`
`github:mkbabb/atlas#v1.0.32` (a private git-tag dependency, not npm-public — Q59-private stands,
unchanged). Every atlas-side glass consume queues behind **the single 5.0.0 cut** (ROUND §5.8 — no
intermediate 4.3.0/4.4.0 atlas-consume gates; those are UPSTREAM glass authoring stages only). At
close, the tranche carries a double-digit set of atlas waves and RED-LEDGER rows sitting behind
that one cut — the concrete inventory is §1/§3 below. This packet is their demand signal: it tells
the glass-ui agent exactly what to ship, in priority order, and exactly what each shipment
unfences atlas-side.

Law N2 stands: atlas gates nothing on these asks and degrades gracefully meanwhile. No publish
pressure — this is a complete, ranked want-list for whenever the 5.0.0 session runs.

## 1. The ask list (priority-ordered)

### P0 — the hinge: nothing below moves without this

**1. O-E1 — the 4.3.0-RECONCILE.** Merge the parked `release/4.3.0` (K-I-ROOT-AUTHOR dock
Δ1+Δ2+Δ3 + the `@settle` emit) onto master, hand-resolving the `GlassDock.vue` conflict (Δ3
`side` vs BG's 275+ dock commits), tag. This is BUILT, not tagged — a publish-hinge decision only
the owner makes. Every other ask in this packet DEPS this. → Unfences: the entire 4.4.0-line
authoring stage + the 5.0.0 cut it builds on.
Evidence: `atlas/docs/tranches/O/draft/WAVES-C-D-E.md:2319-2344`;
`atlas/docs/tranches/O/audit/glassui-map.md:396-403` (§6 item 1).

### P1 — the owner-directed dock cut (the "awful animations" verdict's cure of record)

**2. O-E10 — the joint 5.0.0 cut: dock morph machine + `#persistent-end` + grammar + gilt +
styles-theme.** Most of this is already BUILT/booked in BG/BH (the dock morph — glyph-rigid,
pane-overlap, drawer-paint, shell-dock-dry, legibility-recal, decompose; the 44px floor;
`BorderProgress`-on-dock; the `variant`→`tier` / `density`→`size` / `--ring`→`--focus-ring-color`
renames; the `.text-gilt` drop; `./styles/theme`) — **the ask is the publish**, not new authoring.
The ONE genuinely-missing upstream primitive is `#persistent-end` (block-END persistent slot; glass
ships only `#persistent` top today) so the atlas dock foot survives collapse. Author the MIGRATION
guide (the `overflow="scroll"` retirement + the grammar rename map) so the atlas consume is
mechanical. → Unfences: **O-B8b** (the atlas structural dock delete-and-consume) → **O-D2** (the
phone-dock owner-bar: barometer, `#persistent-end`, nav-landmark, blur dial-back, dark-toggle
zone) → **O-C6**'s grammar re-points. The owner's "the dock animations… are awful" verdict targets
the CURRENT 4.2.0-era atlas dock; this cut is the cure of record.
Evidence: `WAVES-C-D-E.md:2553-2592` (O-E10 full spec); `WAVES-C-D-E.md:543-670` (O-D1/O-D2/O-B8b
atlas-side consume chain); `audit/glassui-map.md:50-74` (§1 do-not-re-ask ledger — pin the landing
commit, never hand-roll).

**3. O-E11 — dock blur/saturate dial-back tokens, PLUS the NEW backdrop-attenuation ask.**
`--glass-blur`/`--glass-saturate` on the reconciled 4.4.0 master, independently bisectable
(shippable off the 5.0.0 morph cut). **Extend it**: a surface-tint-strength / backdrop-luminance-
clamp lever beside those two tokens, so high-chroma content behind a glass panel (a map) can never
telegraph a hard seam through it — the owner's literal "blue seam" complaint
(`atlas/docs/tranches/O/evidence/owner-2026-07-09/dir4-dock-toc-blue-seam.png`: the expanded dock
over the /ecf district map painted a hard half-brown/half-blue vertical seam through the backdrop-
filter). Atlas ALREADY shipped its own interim for this (dock opacity 0.74→0.90, v1.0.24,
`7d1be80`, see §2 item 3) — it retires cleanly onto this token when it ships. → Unfences: O-D2's
blur dial-back consume; retires the atlas interim opacity bump.
Evidence: `WAVES-C-D-E.md:2593-2617`; `RED-LEDGER.md` R-007 (CD-07); owner-directive
`owner-directives/2026-07-09-dir4-atmosphere-masthead-dock.md:47-71` (ARM 4 + packet item 3).

### P2 — the 4.4.0-line feature set (blocks named atlas canon waves)

**4. O-E8 — A11Y-GLASS: StatusDot forced-colors + the reka dialog-name teleport wrapper.** reka-ui
teleport drops portal `aria-label`/`aria-labelledby` before it reaches the DOM node; ReadoutSheet
(shared chrome, all 8 routes) is at risk of reaching screen readers unnamed. Ship the wrapper that
forwards names + `data-testid` to the teleported content node, plus the StatusDot `custom`
forced-colors `signal` opt-in. → Unfences: **O-D2** (retires the atlas `Dock.vue:973-979` `:deep`
StatusDot patch) + **O-D3** (the dialog-name wrapper adoption on ReadoutSheet/
`SpeedtestReadoutSheet`/Filters). Note the acceptance split: O-E8 discharges the glass primitives
only — the atlas-side outcome (SR-name ≠ empty on every route) is NOT satisfied until O-D2/O-D3
consume it.
Evidence: `WAVES-C-D-E.md:2498-2528`; a11y PLAT-4 (dialog-name), render-B (reka teleport console
warn, cross-route).

**5. O-E7 — RADIUS-BLOCK: the `--radius-block` rung + the pill-scope law.** Mint a semantic
`--radius-block` token (resolving `--radius-2xl`/16px) for surfaces >88px, plus a one-line doc rule
("pill for controls/badges/dock ≤48px; blocks resolve `--radius-block`"). → Unfences: **O-C6**
(the atlas radius re-canon gate: 0 blocks >88px resolving pill), **O-D11**, **O-D17**. **A T3 owner
ruling is owed first**: if the owner's "radius-control→PILL is a systemic root error" targets the
small-ATOM stadium (Checkbox/Tabs ≤48px), it contradicts BG's deliberate `BC.W-CONTROL-SMOOTH`
design choice and needs a ruling; if it targets the >88px BLOCK leak (the atlas `--cp-radius`
override, not the glass token), this arm resolves it with no glass-side conflict — recommend the
latter reading. See §3 for the felt-level honest note on this row.
Evidence: `WAVES-C-D-E.md:2472-2496`; `audit/glassui-map.md:417-431` (§7 T3); RED-LEDGER B.4#3
`radius-tier`.

**6. O-E4 + O-E5 — PAPER-GRAIN + RENDER-MODE.** Raise `--glass-grain-opacity` into the
perceptibility band (0.08–0.12 L / 0.14–0.20 D, stddev 1.5–6/255) + a dark-arm token, AND expose
`renderMode` as a first-class CSS-static selectable (not only an auto-degrade) with a mandatory
visibility/idle-gate belt on the Aurora/Constellation WebGPU path (none exists today — it burns a
core in a hidden tab). → Unfences: **O-C8** (the atlas grain/render-mode gate) + a11y PLAT-7 (the
PRM idle-gate rides RENDER-MODE). See §3 for the felt-level honest note and the idle-burn numbers
this couples to.
Evidence: `WAVES-C-D-E.md:2391-2436`; RED-LEDGER B.4#4 `k0-paper-grain`; RED-LEDGER `n0-idle-burn`
(§3 below).

**7. O-E3 — INKMARK: the hairline/rule brush.** A new 1px-constant `hairline`/`rule` HandMark
brush preset (`ribbon:'stroke'`, `thinning:0`, `fill:none`) + a scope note restricting the
`marker`/`highlighter` hull to inline text annotation only. The current defect is a `marker`-hull
rule rendering as a filled tapered polygon (~4px) where a rule must measure ≤1px-class hairline.
→ Unfences: **O-C5** (the atlas rule-mark polarity flip).
Evidence: `WAVES-C-D-E.md:2368-2389`; RED-LEDGER B.4#2 `mark-census`.

**8. O-E6 — SHIMMER: the gold-outline shimmer utility.** An outline/border-image sweep variant of
the existing `metal-shimmer-sweep` (glass owns the TEXT/clip shimmer today, not a bordered-element
outline), plus the minted `--gilt-stroke` (goldenrod hue 85–90, chroma ≤0.14, lifted dark arm —
this is where the dead `.text-gilt` gold gets revived-or-retired, migrated at O-E10). Two readings
both ship in the one utility: hover sweep AND a one-shot boundary sweep on draw-in (map outline
completion), never looping at idle. → Unfences: the WG-A `HoverShimmer` motion preset (O-A8) and
the map waves O-D5/O-D8/O-D23b/O-D27/O-D26 that adopt it.
Evidence: `WAVES-C-D-E.md:2438-2470`.

**9. O-E2 — GU-1: `--glass-key-direction`.** Mint the under-shadow key-light lean
(`--glass-key-direction:-0.375`) + derive X on the 3 under-shadow tiers. → Unfences: the vft V1.1
warm-umber Aurora route-override (**O-D27**) — NOTE its `PaperBackdrop field` half is OBSOLETED by
BG's `W-FIELD-AURORA` retirement of the `.paper-field` plane; V1.1 re-homes onto an Aurora
route-override, not a PaperBackdrop field prop (T2, `audit/glassui-map.md:421-425`) — only the
GU-1 half remains a live ask.
Evidence: `WAVES-C-D-E.md:2346-2366`.

**10. O-E9 — VIRT-CORE: the SOTA document-native `./virtual` core.** The long-pole cut (CV
substrate + slim viewport core + the F-7 sticky recipe) that drains latex-paper 0.3.0 → vft V4 →
V6.g. This blocks the paper/vft long pole ONLY — atlas's own Track-1 perf work (`/sci`
8,329→~2,100) runs unfenced on the published 4.2.0 today and needs nothing from this row.
Evidence: `WAVES-C-D-E.md:2530-2551`.

### P3 — the load-bearing TOC/search primitive (status changed this batch — read §2 item 4 first)

**11. The WG-E glass TOC/search abstraction (R-008/R-059, NO numbered wave yet — the E-cluster
owns).** The abstracted glass TOC/search primitive, hosted on the latex-paper surface (CD-28,
0.3.0), that the atlas `DockTOC` was designed to consume. **This is now the ONLY path to the
owner's latex-paper TOC** — the atlas interim list was retired from the served UI this batch (DIR-4
ARM 3, see §2 item 4). Recorded OWNER-HELD in `COVERAGE.md` pending a numbered WG-E wave.
Evidence: `draft/WAVES-A-F.md:1328-1387` (the O-A23 wave carrying R-008/R-059/DockTOC);
`owner-directives/2026-07-09-dir4-atmosphere-masthead-dock.md:38-45,72-75`; RED-LEDGER B.12.

**12. The WG-E·PRIMITIVES-REGISTER manifest.** The viz-subset MANIFEST over the BH.B4-canon
generated primitives register — one of the five rows in `audit/glassui-map.md` §3's own 5.0.0-cut
table (DOCK-CONSUME / GRAMMAR / GILT / STYLES-THEME / PRIMITIVES-REGISTER) that no other ask above
carries. Atlas consumes it for the G-N11 signature (owner-held, non-blocking) — publish or confirm
the register alongside the 5.0.0 cut so the manifest exists when G-N11 is signed. Lower urgency
than every ask above; named so the inventory is complete, not to re-rank the list.
Evidence: `atlas/docs/tranches/O/audit/glassui-map.md` §3.

### P4 — cross-repo (pencil-boil, named here because glass 4.2.0 peers it)

**13. The pencil-boil `^0.6.0` peer bump.** Glass 4.2.0 currently peers `@mkbabb/pencil-boil
^0.4.1`; the already-published 0.6.0 self-halting scheduler is the root cure for the atlas idle-rAF
heartbeat (RED-LEDGER B.11). Lifting the glass peer floor to `^0.6.0` on the 5.0.0 cut retires the
atlas IO-parking interim. **Fresh EX-68 numbers now attached — see §3.**

**14. The standing pencil-boil asks — schedulerTick + fBm** (the V-arc coordination packet items,
unchanged from the prior inbox).

## 2. Carried DIR-4 items — status deltas

The prior packet (`atlas-inbox-2026-07-10-o-dir4.md`) asked 7 items. Carrying each forward with
what changed since:

1. **The 5.0.0 dock machine (O-E10).** UNCHANGED ask, still queued. Atlas-side prep landed
   (`O-B8a` — the chrome/dock/masthead decomposition, byte-faithful, `EX-20`) but the actual glass
   consume (`O-B8b`, the structural CSS-collapse delete) remains fully fenced, untouched. Folded
   into ask §1 item 2 above.
2. **The mobile dock register (standing).** UNCHANGED ask, still queued, still inside the O-E10
   cut's dock machine (collapse-into-crest → ruled section-sheet, never a bottom/horizontal fork).
3. **Backdrop-attenuation tokens (extends O-E11).** UNCHANGED ask — **but the atlas-side interim
   this row promised has now SHIPPED**: dock opacity 0.74→0.90 landed at v1.0.24 (`7d1be80`,
   EX-56), the "blue-seam scene reads uniform" per the DIR-4 verifier. The glass token still
   retires the interim when it ships (folded into ask §1 item 3).
4. **The TOC/search primitive (R-008/R-059).** MAJOR STATUS CHANGE. The prior packet flagged this
   "now LOAD-BEARING" because the atlas interim TOC list was called "entirely worthless" by the
   owner (2026-07-09 verbatim). **This batch, DIR-4 ARM 3 formally RETIRED the interim from the
   served UI**: the TOC view-mode toggle is removed from the dock entirely (the `DockTOC` code and
   `useDockViewMode` stay behind the existing owner-held seam, off by default, never surfaced).
   There is no atlas fallback left to fall back to — the glass primitive is now the SOLE path to
   this feature existing at all, not merely the preferred one. Folded into ask §1 item 11.
5. **`BorderProgress` on the dock frame (standing).** UNCHANGED ask. The glass-side primitive is
   landed (`BG.W-DOCK-SCROLL-PROGRESS`, dual-engine PASS) — the ask is specifically the DOCK-FRAME
   consume contract riding the 5.0.0 cut (folded into ask §1 item 2's O-D2 barometer wiring).
6. **The pencil-boil `^0.6.0` peer bump.** UNCHANGED ask, **fresh measurement attached** — see §3.
   The idle-rAF root is now narrowed to a single route with an exact number, not a platform-wide
   heartbeat.
7. **The standing pencil-boil asks (schedulerTick + fBm).** UNCHANGED, carried verbatim as ask §1
   item 14.

## 3. Fresh measurements (this batch, not in the prior packet)

**The idle-burn EX-68 all-route re-measure (settle=10s).** 7/8 full-motion routes + 8/8
reduced-motion routes now read CLEAN — the original ~2016/~2768 ms burns the prior packet's "idle-
rAF heartbeat" language described are cured atlas-side (O-A4/F2/F3/F4, the IO-parking interim).
**The SOLE remaining residual, platform-wide, is `/sci`: 243 ms RunTask + 48 compositor frames**,
forensically traced to the SAME `@mkbabb/pencil-boil` `schedulerTick` root RED-LEDGER B.11 names
(the vendor frame-player set reschedules rAF while the global player set is non-empty, skipping
`!active` players without stopping the loop — NOT any atlas CSS motion). This is not a fresh
defect — it is the narrowed, precisely-quantified tail of the same standing pencil-boil ask (§1
item 13). Evidence: `atlas/docs/tranches/O/exec/RED-LEDGER.md` lines 65, 135, 272-274 (the
`n0-idle-burn` and B.11 rows); `exec/evidence/O-F18/impl/idle-probe.json`.

**The felt-level-fix honest note.** The O-close walk flagged, honestly, that two of the three
WG-E-fenced RED-LEDGER rows may already be FELT-cured by owner-directed atlas work this tranche,
even though their formal glass-gated token census still fails:

- **`radius-tier` (B.4#3, ask §1 item 5)** — likely cured by O-DIR-2/v1.0.19's `--radius-plate`
  unification (the interim alignment of plate-frame + overlay-chip corner registers onto the
  existing plate radius token, no new ladder). The FORMAL gate (the full owner `2/6/8/12/16/24`
  ladder + control-group register) stays unlanded and still needs `--radius-block`.
- **`k0-paper-grain` (B.4#4, ask §1 item 6)** — likely cured by O-DIR-4 ARM 2/v1.0.24's grain/
  aurora retune (grain dialed 0.038/0.045→0.025/0.03, aurora ceilings lifted ×3, lead-ratified
  BELOW the drafted ≥0.08 floor because page-wide full-bleed reads louder than the per-plate-
  overlay floor it was minted for — the owner's live eye was the bar, not the census number).

**This is a caveat, not a rescope**: the close-walk lane explicitly did NOT re-screenshot to
confirm either felt-cure — both rows stay formally RED as specified, and both formal glass
primitives (O-E7 RADIUS-BLOCK, O-E4/O-E5 PAPER-GRAIN/RENDER-MODE) are still genuinely wanted for
the token-census gate to pass on its own terms, independent of whether the owner's eye is
currently satisfied. Ship them; the census gate needs the real tokens regardless of how the felt
complaint currently reads. Evidence: `RED-LEDGER.md` lines 82-84, 264-265;
`owner-directives/2026-07-09-radius-directive.md` (O-DIR-2 full text).

## 4. What atlas does NOT need (avoid scope creep)

- **The DockTOC interim list is RETIRED, do not rebuild it as-was.** The owner called it "entirely
  worthless" and it is now fully removed from the served UI. Do not ship a glass primitive that
  merely reproduces the retired atlas list's shape (a stepper-duplicate toggle) — build the
  abstracted TOC/search primitive the R-008/R-059 spec actually calls for, on the latex-paper host.
- **No typewriter ask.** `TypewriterText`/`useTypewriter` is already installed at 4.2.0, unfenced,
  and already consumed (`TypewriterTitle.vue` wraps it for the DIR-5 story-wave titles, `O-A26`).
  Nothing new is wanted here.
- **No new dock-collapse API beyond what BG/BH already built.** Per `audit/glassui-map.md`'s own
  §1 "do-not-re-ask ledger": the dock morph engine, the 44px floor, the barometer, the
  `variant`→`tier`/`density`→`size` renames, the `.text-gilt` drop, `./styles/theme`, `--ring`
  rename, and Card single-root are ALL already landed in the working tree — the ask is publish +
  consume, never re-authoring. See §1 items 1-2 for the one genuine gap (`#persistent-end`).
  Cross-reference the roster at
  `/Users/mkbabb/Programming/glass-ui/docs/tranches/BH/coordination/asks-and-consumes.md` (not
  edited by this packet) for glass's own outbound break list to its consumer constellation — that
  document is the mirror-image relay and is unaffected by anything in this inbox.
- **No radius ask on the small-ATOM stadium.** If the owner's radius complaint is re-litigated,
  confirm it targets the >88px BLOCK leak (ask §1 item 5), not the ≤48px control pill — the latter
  is BG's deliberate `BC.W-CONTROL-SMOOTH` design and re-opening it needs an explicit owner
  ruling, not a default glass change.
- **No PaperBackdrop `field` prop revival.** BG retired it (`W-FIELD-AURORA`); V1.1's warm-umber
  need re-homes onto an Aurora route-override, not a request to bring the field prop back.

## 5. Contact contract

This packet **supersedes `atlas-inbox-2026-07-10-o-dir4.md`** in full — that file's 7 items are
carried forward here with status deltas (§2); do not action it independently, action this one.
The atlas side commits to re-pinning `@mkbabb/glass-ui` and `@mkbabb/pencil-boil` and unfencing
every RED-LEDGER/wave row named in §1 within one batch of the 5.0.0 cut landing, in the priority
order given. No intermediate 4.3.0/4.4.0 atlas-consume gates are expected or wanted (ROUND §5.8) —
a single coordinated re-pin against the 5.0.0 tag is the whole atlas-side event. Law N2 stands
throughout: none of this blocks atlas, and none of it should be rushed on atlas's account.

## 6. P-arc addendum — the owner's live-audit marks mapped onto this packet (2026-07-10 evening)

The owner walked the O-close surfaces live and delivered ~74 marks; the P-arc E3 audit lane
mapped the six glass-adjacent ones (`atlas/docs/tranches/P/feedback/MARKS.md` M6/M18/M19/M22/
M25/M67) onto this packet. One relay of the owner's own word first: **"Glass-ui 5.0.0 is
forthwith"** (edict E14, verbatim) — atlas reads the cut as in flight (the CHANGELOG's 5.0.0
section is authored; BH.B4e/B7 doc-tail commits visible at `f7e9b6ca`) and is poised on §5's
one-batch re-pin commitment. Of the six marks: one sharpens an existing ask, two are new asks,
one is a new joint, and two need zero glass work (corrections to this packet's own §4 text).

### P1 — sharpens ask §1 item 2 (O-E10)

**15. `#persistent-end` priority confirmation (M25).** The owner's "contextual filter dock" mark
(currently-applied filters + view-type + the filter button, contextually reflowed, surviving dock
collapse) lands entirely on the already-named `#persistent-end` gap — no additional primitive.
Atlas's `DockFoot.vue` already names the exact workaround it is running without this slot. Bump
this the moment `#persistent-end` is authored; the atlas-side consume (filter-algebra summary +
StatusDot selection chip) is ready to re-host same-batch.
Evidence: `glass-ui/src/components/custom/dock/GlassDock.vue:396-418` (only `#persistent` exists);
`atlas/src/platform/chrome/dock/components/DockFoot.vue:12-16`.

### P2 — new asks

**16. A `stage="blur"` (or equivalent light) Drawer tier (extends O-E11, M22).** The `live-behind`
mode's `stage:"none"` default (chosen so the viz stays interactive behind the filter panel) forgoes
the scale/dim/immersive "iOS27" recede cue entirely, so the (already-spring-physics-driven) drawer
visually reads as a plain open/close. Ask a tier between `none` and `dim` — backdrop blur/lens
refraction only, no page recede, no dim — so `live-behind` consumers keep interactivity AND the
iOS27 material read. Bundle with the existing backdrop-attenuation ask (§1 item 3) — same token
family.
Evidence: `glass-ui/src/components/ui/drawer/Drawer.vue` (`stage` enum docstring);
`glass-ui/src/components/ui/drawer/composables/useDrawerSnap.ts:1-16`;
`atlas/src/filter/ui/FilterPanel.vue:242-246` (the `mode="live-behind"` consume).

**17. `DockAppendix` — a per-viz collapsed provenance/methodology dock (M19).** Compose `GlassDock`
(collapsed-by-default, intersection-armed expand — reuse the ONE-shot `useIntersectionObserver`
arm pattern `@mkbabb/atlas/src/editorial/TypewriterTitle.vue` already proves) with the existing
`Tabs`/`TabsList`/`TabsTrigger`/`TabsContent` primitives for tab content (data provenance / how
it's computed / sources). Distinct from the tracked `dock-nav-tabs`/`dock-gallery` ledger rows
(`DIRECTIVE-LEDGER.md` WS2-14/WS2-15) — those are page/category NAV tabs; this is per-instrument
CONTENT tabs. One primitive answers M16/M19/M20/M27 (the recurring "codify data provenance as one
component set" cluster) together, not as four separate asks.
Evidence: `glass-ui/src/components/custom/dock/GlassDock.vue`;
`glass-ui/src/components/ui/tabs/*.vue`; `glass-ui/docs/tranches/BG/DIRECTIVE-LEDGER.md:103-104`.

**18. The hero-collapse-into-dock joint (M6).** Not a request to build atlas's story-hero (that is
atlas-side, per M9's "standard atlas library components for our stories" framing) — the ask is
narrowly the RECEIVING joint: a documented recipe or `GlassDock` intersection-driven "absorb"
trigger so a page-level hero can scroll-collapse INTO the standing dock's `#persistent` region
without atlas hand-rolling the height/opacity handoff math. `demo/chassis/hero/StoryHero.vue`'s
`story-hero-shrink` keyframe is glass-ui's OWN unpublished demo chassis and does not hand off
anywhere — no existing artifact does this today.
Evidence: `glass-ui/demo/chassis/hero/StoryHero.vue`; `glass-ui/docs/tranches/BG/DIRECTIVE-LEDGER.md:90`
(WS2-01, the adjacent-but-distinct in-place dock morph); `glass-ui/src/components/custom/dock/GlassDock.vue:416-418`.

### P-info — corrections, no glass-ui action

**19. §4's "No typewriter ask" needs one clause added (M18).** The claim "nothing new is wanted
here" stays TRUE (no new glass primitive — `cursorVisible`/`cursorBlink` already give the
type-in/persist/no-cursor read, demoed live at `demo/stories/motion/typewriter.vue:153`) but the
mark's root cause is an atlas consume defect: `@mkbabb/atlas/src/editorial/TypewriterTitle.vue:73-78`
never passes `cursor-visible="false"`, so the DIR-5 story titles blink a cursor after typing
completes. Atlas-side one-line fix, zero glass involvement — flagged here only so §4 doesn't read
as "investigated, nothing found" when the defect is real and just not glass's.
Evidence: `glass-ui/src/components/custom/typewriter/TypewriterText.vue:56,84,115`;
`atlas/src/editorial/TypewriterTitle.vue:73-78`.

**20. Cartoon/veil Card variants already ship (M67) — confirm, do not ask.** `Card.vue`'s
`surface: "glass" | "cartoon" | "veil"` axis is the already-supported replacement for the retired
standalone `<CartoonCard>`. The VFT paper's bespoke "paper" card border is an atlas/reports-side
authoring gap, not a glass gap.
Evidence: `glass-ui/src/components/ui/card/Card.vue:54-67,399-412,443`.
