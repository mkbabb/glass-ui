# BI INBOUND MARKS — every inbound message marked, heard, analyzed (hic et ubique)

**Provenance.** The user order (2026-07-12): *"all inbound messages marked and heard, analyzed…
hic et ubique."* This ledger is that order made structural — one section per coordination file across
`docs/tranches/{BG,BH,BI}/coordination/`, every ask carrying a TERMINAL disposition. It supersedes
the mid-flight UNOWNED classifications of the raw sweep
(`scratchpad/bi-exec/INBOUND-SWEEP.md`): the two execution-time mints —
**`BI.W-BLOB-SEAMS`** (GAP-L5 owner) + **`BI.W-XR-PRODUCER-REPAIRS`** (PKT-1 · T-45 · P1-R3 + the
dist/build-correctness family) — plus the §Inbound-acceptance-constraint sections patched into
sixteen existing BI waves are the OWNERS OF RECORD; the mint commit is `1db3ff92` + the round-2
uncommitted patches (2026-07-12).

**Disposition grammar (terminal only — zero UNOWNED/TBD/book).**
- **DISCHARGED** — landed / answered on disk, evidence named.
- **OWNED** — a BI wave (`docs/tranches/BI/waves/BI.W-*.md`) or an `asks-and-consumes.md` roster row carries it.
- **ANSWERED-BY-EXISTING** — a shipped mechanism already satisfies it (named).
- **SUPERSEDED** — a later communiqué / decision carries it (successor named).
- **DECLINED-TERMINAL** — recorded decision (foreign-tree / below-bar / no-glass-action); re-trigger named.
- **CUT-FIXED** — issues at the 5.0.0 cut (roster-carried, gate-locked by `proof:crossrepo-asks:bi`).

Machine-locked by **`proof:inbound-marks`** (`local`+`ci`): I1 every inbox-class file has a section;
I2 zero row carries UNOWNED/TBD/book; I3 every OWNED wave-target resolves; I4 (the standing liveness
contract) — a NEW inbox-class coordination file landing WITHOUT a marks section REDs.

---

## docs/tranches/BG/coordination/ATLAS-M-INBOUND.md

| ask-id | ask | disposition |
|---|---|---|
| M1 | early 4.3.0 cut → tag early | SUPERSEDED — Decision-0: ONE 5.0.0 cut (4.3.0 folds in; `atlas-outbound-2026-07-12-decision-0.md`) |
| M2 | Drawer/DialogPortal `$attrs` forwarding | DISCHARGED — BG 10.2 PORTAL-ATTRS on disk (Drawer/SheetContent forward `$attrs`) |
| M3 | Dock seam stability (`useDockState.expand`) | OWNED — BI.W-DOCK-SPINE (contract-note relay owed at spine close, Decision-0 #22) |
| M4 | GP8 tab pull-morph-squish | DISCHARGED — SHIPPED BB.W-DRAG-MORPH (`<SegmentedTabs :draggable>`) |
| M4-adj Δ6 | handmark 5 asks (amplitude / hull guard / aspect viewBox / crayon-wipe / per-line band) | DISCHARGED — LANDED via KS-HANDMARK/14.3 (PROMPT-RECAP §B) |
| M5 | Skeleton `variant="breath"` exists-confirm | DISCHARGED — exists at 4.2.0 (Skeleton.vue:26) |
| M6 | GU-1 under-key-fill (4.4.0 pair) | OWNED — `--glass-key-direction` → BI.W-SURFACE-EXTRACT (atlas GU-1/O-E2 §Inbound arm); hero-collapse joint → below (o-close #18) |
| M7 | primitives REGISTER (machine-readable canon) | SUPERSEDED-TERMINAL — Q033 retired the stale, unpacked derived register after its reader disappeared; consumers use the packed `package.json` exports and emitted declarations. Q060 records the Atlas correction. |

## docs/tranches/BG/coordination/ATLAS-N-INBOUND.md

| ask-id | ask | disposition |
|---|---|---|
| A1 | GlassPanel `variant`→`tier` rename | DISCHARGED — DONE BH.W-AXIS-GRAMMAR; GlassPanel further RETIRED by BI.W-GLASS-DEDUP |
| A2 | GlassDock `density`→`size` rename | DISCHARGED — DONE BH.W-SIZE-UNIFY |
| A3 | `.text-gilt`→`.gold-shimmer`/`.metal-gold` MIGRATION row | OWNED — asks-and-consumes roster row 5 (`migrate-text-gilt-to-gold-shimmer`) |
| B1 | `@settle` disposition drains at 4.3.0 reconcile | SUPERSEDED — Decision-0 one 5.0.0 cut (4.3.0 reconcile at the cut, user-gated) |
| B2 | viz-subset MANIFEST (named view over register) | SUPERSEDED-TERMINAL — the root derived register was retired by Q033; installed exports and declarations are the versioned consumer contract. |
| B3 | consume-time re-verifies (atlas-side pass) | DECLINED-TERMINAL — atlas-side, no ROOT action (foreign-tree fence) |
| B4 | staleness note (GU-DOCK doc) | DECLINED-TERMINAL — informational, no glass action |
| C1 | dock scroll-progressbar per-item stepper API | OWNED — aggregate rim → BI.W-SCROLL-PROGRESS-RIM; per-item `[0,1]` stepper seam → BI.W-SCROLL-PROGRESS-RIM §Inbound (atlas C1/#185) |
| C2 | Card `as-child` directive-root single-root guarantee | OWNED — BI.W-AXES-GATES §Inbound (born-RED two-root bite) |
| C3 | compact 44px tap-floor (coarse pointer) | OWNED — BI.W-DOCK-SPINE (spine/overflow contract) |
| C4 | `./styles/theme` token-only CSS subpath | DISCHARGED — LANDED for 7.0.0 as the Tailwind registration bridge `./styles/theme`; it does not duplicate a resolved base-token sheet. |
| D | 4.3.0 merge note (parked §0 reconcile) | SUPERSEDED — rides the 5.0.0 cut reconcile (Decision-0) |

## docs/tranches/BG/coordination/DNS-REPORTS-INBOUND.md

| ask-id | ask | disposition |
|---|---|---|
| Bug 1 | unscoped `.dock-layer` CSS leak → anchor under `:where(.glass-dock,…)` | DISCHARGED — fixed `00621130` (BG.W-DOCK-CONSUMER-FENCE); `proof:dock-consumer-fence` |
| Bug 2 | synthetic body `pointerdown` dismissal → delete synthetic dispatch | DISCHARGED — fixed `00621130`; deleted entirely (Decision-0 #22a confirms survives greenfield) |
| caveat | `.glass-dock` component-identity collision | DECLINED-TERMINAL — out of scope; the consumer renames its own bespoke dock (identity-class rename is a consumer decision) |

## docs/tranches/BG/coordination/DNS-REPORTS-FIX-NOTES.md

| ask-id | ask | disposition |
|---|---|---|
| FIX-1 | dock-layer selector-scope fix (verify) | DISCHARGED — the `:where(.glass-dock,…)` anchor landed `00621130`; `proof:dock-consumer-fence` locks it |
| FIX-2 | synthetic-dispatch delete (verify) | DISCHARGED — deleted `00621130`; `proof:dock-consumer-fence` + p-loop §1 D2 confirm |

## docs/tranches/BG/coordination/GU-1-glass-key-fill.md

| ask-id | ask | disposition |
|---|---|---|
| GU-1 | mint `--glass-key-direction` under-shadow key-light lean + derive 3 tiers | OWNED — BI.W-SURFACE-EXTRACT §Inbound (atlas GU-1/O-E2; the shipped `glass/ladder-undershadow.css` gains the direction token, atlas the named consumer) |

## docs/tranches/BG/coordination/GU-3-dock-consume.md

| ask-id | ask | disposition |
|---|---|---|
| ASK A | StatusDot custom `forced-colors` ON-signal opt-in | OWNED — BI.W-SLIDER-THUMB-NAME §Inbound (a `proof:a11y` framework arm + born-RED bite) |
| ASK B | `--ring`→`--focus-ring-color` rename fallout (pinned MIGRATION row, 12 atlas sites) | OWNED — asks-and-consumes roster row 3 (`migrate-ring-to-focus-ring-color`) |

## docs/tranches/BG/coordination/GU-3-TRIAGE.md

| ask-id | ask | disposition |
|---|---|---|
| Q1 | anchor consumer-bless (no side/placement prop owed) | DISCHARGED — CONFIRMED (build invariant) |
| Q2 | persistent-foot cap ⟹ scroll (no new bottom band) | DISCHARGED — CONFIRMED |
| Q3 | `.dock-layer--full` class survival through DECOMPOSE | OWNED — BI.W-DOCK-SPINE build invariant (must not rename; relay-confirm owed) |
| Q4 | token-name survival (`--dock-selected-accent`/`-control-floor`/`-touch-target`) | DISCHARGED — CONFIRMED |
| NOTE | `?fig=` glass-expand-reparent — no silent adoption | DISCHARGED — CONFIRMED out-of-scope |

## docs/tranches/BG/coordination/SPEEDTEST-AX-INBOUND.md

| ask-id | ask | disposition |
|---|---|---|
| 1 | SEAL-DISC + SEAL-DRAWSVG (`shape="disc"` + personalBest + draw) | DISCHARGED — LANDED (CompletionSeal.vue data-best/disc gesture) |
| 2 | DOCK-LABEL-RATIO cockpit 0.42→0.275 | OWNED — BI.W-DOCK-CONTROLS §Inbound (if the greenfield keeps `cockpit`, the label ratio adopts 0.275) |
| 3 | PAPER-GRID-BREATHE (opt-in breathe on static paper-grid) | DECLINED-TERMINAL — the `/paper-grid` VIZ is the breathing register (BC, curl-warped); the static utility stays static (proportion); pointer arm in the outbound |
| 4 | ONGLASS-FOREGROUND-RUNG completeness check | DISCHARGED — `--on-glass-muted`/`-strong` shipped (BB); no missing rung |
| 5 | LIQUIDFILL (`Progress variant="liquid"` + `.glass-liquid-fill`) | DISCHARGED — LANDED (ProgressLiquid.vue) |
| 6 | LIQUIDHOVER residual (`:pressable` Card auto-arm / tier-root delegation) | DISCHARGED — vSpecular/Card `:specular` shipped (accept); blanket tier-root delegation DECLINED-TERMINAL (one-signal discipline) |
| 7 | CARDTITLE-INK-CLIP generic gradient-ink seam | DECLINED-TERMINAL — consumer-class only; the library one-ink doctrine holds (existing register covers) |
| 8 | HERO-FACE-PRELOAD (preload-matching `@font-face src`) | OWNED — BI.W-STRUCTURE-RESEQUENCE fonts arm (`/styles/fonts`) |
| 9A | ToastClose accessible name default "Dismiss" | DISCHARGED — LANDED (ToastClose.vue:22 'Dismiss') |
| 9B | FocusScope sentinel (reka-upstream carveout) | DECLINED-TERMINAL — reka upstream, no glass action (permanent stamp) |
| 10 | AURORA-SCHEME-LUMA (`deriveAurora` scheme/lBand option) | OWNED — BI.W-AURORA-VIBRANCY §Inbound GAP-L2 (the atoms door serves both consumers; ONE door) |
| 11 | `.glass-refract` retire (MIGRATION row + roster) | DISCHARGED — inert at 4.2.0 (clean break 4.1.0); MIGRATION → BI.W-MIGRATION-TRUE-UP |
| 12a | speedtest → `/timeline` verify-only | OWNED — asks-and-consumes roster row 1 (`migrate-api-to-timeline`) |
| 12b | speedtest `--ring` fallback-degrading site | OWNED — asks-and-consumes roster row 3 (covered-floor; speedtest fallback counted) |
| 12c | `--glass-blur-dock` / goo-blob — no speedtest row | DECLINED-TERMINAL — explicit-absent, no speedtest consumption |
| 13 | value.js dist-tag retag 1.1.1→1.2.0 | DISCHARGED — DONE (registry 1.2.0) |
| 14 | §6 land signals (one-line relays) | DECLINED-TERMINAL — process/relay promise, no code ask |
| UF-K1 | metric-family (metric-cell/stack/badge) repatriate | OWNED — BI.W-METRICS-DEMO (STAY per XR-3) + asks-and-consumes roster row 10 |

## docs/tranches/BG/coordination/USER-0703-FIX-NOTES.md

| ask-id | ask | disposition |
|---|---|---|
| F2.4 | W-CORNER-ALIAS-KILL (white-corner-wedge + `proof:glass` corner-backplate arm) | DISCHARGED — LANDED BG.W-CORNER-ALIAS-KILL (route-enter fill, teleport, grid-bg opacity) |
| 16.1 | W-DOCK-SCROLL-PROGRESS (scroll progress IS the dock border) | DISCHARGED (BG landed) / SUPERSEDED (BI) — BorderProgress RETIRES → successor BI.W-SCROLL-PROGRESS-RIM (Decision-0 #23) |
| E-1 | no-masking-fallback edict (primary paints or fails loud) | OWNED — BI.W-AXES-GATES (`proof:no-masking-fallback` broad-sweep, GATE-3/4) |

## docs/tranches/BG/coordination/VALUEJS-BLOB-GENESIS-2026-07-05.md

| ask-id | ask | disposition |
|---|---|---|
| Q1–Q10 | blob engine contract (HERO headroom · satellites-at-rest · SDF hit-test · mobile envelope · frame pacing · single-surface · sequencing · scale-aware deform · uBackdrop refraction · atom stability) | OWNED — BI.W-BLOB-SEAMS §Dispositions scope-widen (round 2): each Q-row DECIDED-HERE terminal (shipped-evidence / build-here / DECLINE-recorded) in the per-row decision record; mercury-colony fission DISCHARGED-SHIPPED |

## docs/tranches/BG/coordination/VALUEJS-R-CASCADE-RESPONSE-2026-07-04.md

| ask-id | ask | disposition |
|---|---|---|
| item 1 | unplugin-vue-markdown ^29→^32 | DECLINED-TERMINAL — value.js-internal dep bump, LANDED value.js-side (not a glass ask) |
| item 2 | file:→^published re-pin | DECLINED-TERMINAL — DECLINED-BY-POLICY (value.js Q4 2026-07-03; file:-pin kept during co-dev) |
| item 3 | lockfile regen | DECLINED-TERMINAL — EXECUTED value.js-side (R.W7) |

## docs/tranches/BG/coordination/VALUEJS-R-D8-1-CASCADE-2026-07-02.md

| ask-id | ask | disposition |
|---|---|---|
| D8-1 | emit `components.css` `@import` as `layer(components)` (both sites) | DISCHARGED — cured `4b637036` (site 1) + `67dedcf1` (deferred.css:34, site 2) |

## docs/tranches/BG/coordination/VALUEJS-R-D8-1-ESCALATION-2026-07-03.md

| ask-id | ask | disposition |
|---|---|---|
| D8-1-esc | escalation of the `layer(components)` emission (both sites) | DISCHARGED — both sites layered (`4b637036` + `67dedcf1`); BG-REPLY confirms |

## docs/tranches/BG/coordination/VALUEJS-R-D8-1-REPLY-2026-07-03.md

| ask-id | ask | disposition |
|---|---|---|
| D8-1-reply | confirm the layered-import fix landed | DISCHARGED — confirmation of the cured emission (both sites layered) |

## docs/tranches/BG/coordination/VALUEJS-R-MASTER-LOCKFILE-2026-07-04.md

| ask-id | ask | disposition |
|---|---|---|
| master-lock | master lockfile out-of-sync → regen+push so `npm ci` works | DISCHARGED — cured `99009e2a` on origin/master; `tranche/BG` also pushed |

## docs/tranches/BG/coordination/VALUEJS-R-RELAY-2026-07-04.md

| ask-id | ask | disposition |
|---|---|---|
| GAP-1 | `uSatColor[]` per-satellite GL color-seam widen | DISCHARGED — landed BG `5df908ae` (F9.R1) |
| GAP-2 | goo-blob→blob rename (subpath+symbol) | OWNED — BI.W-BLOB-RENAME-LAND + asks-and-consumes roster row 7 |
| GAP-3 | 17-specifier MIGRATION table | OWNED — BI.W-STRUCTURE-RESEQUENCE / BI.W-MIGRATION-TRUE-UP (203-row MIGRATION at cut) |
| GAP-4 | blob producer perf (single-canvas + IO/hidden/PRM gated) | DISCHARGED — LANDED (createCanvasLifecycle + useGpuSubstrate single canvas) |
| GAP-5 | cut-ceremony carries (F-1/F-3/F-4) | DISCHARGED — recorded BH.B4e; MIGRATION discipline → BI.W-MIGRATION-TRUE-UP |
| item 6 | peer-floor `^2.0.0` + /easing 5-export contract | DISCHARGED — value peer rode to `^3.1.0`; /easing contract recorded |
| item 7 | D8-1 confirmation (verify layered import) | DISCHARGED — both sites layered |
| item 8 | EasingPicker SelectTrigger a11y name | DISCHARGED — folded W-DESHADCN accessible-name arm; `proof:no-shadcn-default` |
| item 9 | U6 dock-fission taste-notes | DECLINED-TERMINAL — consumer-side taste for D-DOCK; informational, no glass ask |

## docs/tranches/BG/coordination/VALUEJS-S-ASKS-2026-07-05.md

| ask-id | ask | disposition |
|---|---|---|
| L1 | WebKit aurora GLSL (3 compile defects + smoke gate) | DISCHARGED — fixed `d03579a1` + `proof:aurora-glsl-webkit` |
| L2 | AuroraAtoms lightness-scheme door (lBand/lightnessScheme/hueSpread/chroma-variance) | OWNED — BI.W-AURORA-VIBRANCY §Inbound GAP-L2 (dark L band [0.18,0.42] reachable) |
| L3 | WatercolorDot zombie rAF → rebuild on useRAFLoop | DISCHARGED — landed `b01d0556` (F9.R2) |
| L4 | backdrop-luma truth (never resolve luma 0 from unreadable canvas) | DISCHARGED — convergent NF.3 `d785cba2` |
| L5 | Blob first-principles co-rebuild (single-GPU / DPR / HERO / SDF hit-test) | OWNED — BI.W-BLOB-SEAMS (settled seam + HERO preset + WGSL drain + rows A–E); pointer-half at BI.W-FIELD-CORE |
| L6 | Slider tokens (`--slider-thumb-border-w`, spectrum hover recipe) | OWNED — BI.W-SLIDER-THUMB-NAME §Inbound (consumer-retunable tokens on the thumb owner) |
| L7 | EasingPicker v2 (container-query stage, autoplay door, `chrome`, curve-glyph, travel-dot rest) | DECLINED-TERMINAL — single-consumer feature growth (BI.W-SLIDER-THUMB-NAME §Inbound); travel-dot-rest + PRM-at-source land with the a11y arm; re-trigger: a second named consumer |
| L8 | `clampLabel` on DockSelectTrigger (5th booking) | OWNED — BI.W-DOCK-CONTROLS (`ax:dock-select-clamp-label` fold) |
| L9 | Skeleton `::after` shimmer-delay/tint seams | DECLINED-TERMINAL — the shipped compositor-only shimmer stands (BI.W-XR-PRODUCER-REPAIRS §Dispositions PKT-4/L9); re-open needs a new mechanism |
| L10 | Aliasing / corner clip / dither / WatercolorDot sRGB | DISCHARGED — mask corner clip rides F2.4 BG.W-CORNER-ALIAS-KILL (landed); dither/watercolor residual recorded |
| L11 | Dropdown-menu glass tokens (`--dropdown-menu-bg/border/shadow`) | OWNED — BI.W-MENU-TRIGGER §Inbound (one menu token surface, name follows the factor) |
| L12 | `/styles/fonts` 18th specifier → MIGRATION table | OWNED — BI.W-STRUCTURE-RESEQUENCE (P9-J3, roster row-filter) |
| L13 | Dock residuals + arrive-expanded (collapsed circle / dock-scroll-x / hover-token / mount-at-pill) | OWNED — D-DOCK greenfield (BI.W-DOCK-SPINE / BI.W-DOCK-OVERFLOW / BI.W-DOCK-CONTROLS) |
| L14 | ConfiguratorRow double-label API + crayon Slider variant | OWNED — double-label → BI.W-CONFIG-IN-SHEET §Inbound; crayon variant DECLINED-TERMINAL (presets-in-consumers; re-trigger ≥2) |
| L15 | Gold/admin shimmer ONE primitive (≥2-consumer-gated) | DECLINED-TERMINAL — HELD-below-bar by value.js's own relay; the metal family ships (BB.W-METAL-SHIMMER); re-trigger: ≥2 named consumers |
| L16 | `backdrop-filter` `-webkit-` prefix policy | OWNED — BI.W-XR-PRODUCER-REPAIRS X4 (ONE prefix policy chosen + recorded on the fresh dist) |
| L17 | GooBlob→Blob symbol+subpath rename (no alias) | OWNED — BI.W-BLOB-RENAME-LAND (ruling REVERSED to full rename) |
| L18 | Select chevron dead code (rotate-180 off dead attr) | DISCHARGED — fixed `d03579a1` |

## docs/tranches/BG/coordination/VALUEJS-S-ASKS-ADDENDUM-2026-07-05.md

| ask-id | ask | disposition |
|---|---|---|
| A1 | card field-floor dark arm (damp the amber-radial orphan) | DISCHARGED — F2.R1 `300a30fb` |
| A2 | muted-ink alpha rung contrast (floor both schemes) | DISCHARGED — F2.R1 `300a30fb` |
| A3 | L2 amplification (stronger C/H variance off seed) | OWNED — BI.W-AURORA-VIBRANCY §Inbound GAP-L2 (T-26 bracket grammar, both poles) |
| A4 / L19 | aurora pointer door (pointer input on the engine) | DISCHARGED (base) — consumed S.W6-7; the T-38 rider is the successor (below) |
| A5 / L20 | `/goo-blob/config` subpath (JS eager-budget blocker) | OWNED — BI.W-BLOB-SEAMS §Obligations (RP-2 coupling: `/blob/config` lands with the WGSL drain in ONE window) |
| A6 | dist drops unprefixed `backdrop-filter:none` (minifier collapse) | OWNED — BI.W-XR-PRODUCER-REPAIRS X4 (gate-asserted on the fresh dist) |
| A7 | aurora arm-gap replay (`inst.update()` after `arm()`) | OWNED — BI.W-AURORA-VIBRANCY §Inbound GAP-ARM (one honest `inst.update(getCfg())` after `arm()`) |

## docs/tranches/BG/coordination/VALUEJS-T-ASKS-2026-07-09.md

| ask-id | ask | disposition |
|---|---|---|
| P1 GAP-ARM | arm-replay honest update after arm | OWNED — BI.W-AURORA-VIBRANCY §Inbound GAP-ARM |
| P1 L2/A3 | variance-atoms door (lightnessScheme/lBand/hueSpread/chromaVariance) | OWNED — BI.W-AURORA-VIBRANCY §Inbound GAP-L2 |
| P1 pointer-door (F-10) | light lean / burst / medium-gated atoms | OWNED — BI.W-FIELD-CORE (names VALUEJS-T-38 / the RIDER) |
| P1 MOTION | tempo scalar / palette-ease / vividness atom (drift+breath co-vary; achromatic ride-down) | OWNED — vividness scaffold → BI.W-AURORA-VIBRANCY; palette-ease / entrance choreography → BI.W-E10-AURORA-ENTRANCE |
| P2 PKT-1 | dist duration clobber (alias `--default-transition-duration` at root) | OWNED — BI.W-XR-PRODUCER-REPAIRS (PKT-1, emission-side alias/omit) |
| P2 PKT-2 | spring clock hole (~0.3s-settle preset or bless snappy) | OWNED — ROUTED to BI.W-REGISTER-TABLE (B7) as an acceptance input (BI.W-XR-PRODUCER-REPAIRS §Dispositions) |
| P2 PKT-3 | compositor collapse/expand recipe | OWNED — BI.W-ENTER-EXIT-LANDING / BI.W-ACCORDION-PRESS family (already-B7 per BI.W-XR-PRODUCER-REPAIRS §Dispositions) |
| P2 PKT-4 (=L9) | skeleton shimmer `::after` seams | DECLINED-TERMINAL — the compositor-only shimmer stands (BI.W-XR-PRODUCER-REPAIRS §Dispositions); re-open needs a new mechanism |
| P3 | WELL rung + input-bar + chroma-guard + tiers-publish-L | DISCHARGED — BI.W-SURFACE-EXTRACT LANDED (the extracted grammar decided each rung: the `--input-bar-font` admit MINTED; tiers publish through `<Surface>` at `/surface`; `proof:surface-axis` W7 defs:1/warts:0 + W8 GREEN) |
| P3 A1/A2 | F2.R1 dark readability | DISCHARGED — `300a30fb` (verify-at-cut) |
| P4 (T-20) | tabs pilling anchor-arm (drop double-count, ε≤0.5px) | OWNED-BY-SUBSUMPTION — BI.W-TABS-FACTOR §Inbound (ε≤0.5px oracle; escalate-to-owner fires only if the rebuild misses ε) |
| P5 | letter-rail + ring contract + WatercolorDot solid-ring | OWNED — `--dock-ring` → BI.W-DOCK-CONTROLS; WatercolorDot solid-ring → BI.W-XR-PRODUCER-REPAIRS X6; letter-rail PRIMITIVE DECLINED-TERMINAL (the DockStack facet mode IS the rail register; re-trigger a letter-rail consumer) |
| P6 | blob L5 addendum (settled seam / HERO / single-WebGL2 / rows A–E / lightnessFloor) | OWNED — BI.W-BLOB-SEAMS (each arm terminal in the decision record) |
| P7 | component batch re-ask (L6/L7/L8/L11/L16 + EasingPicker v2 + description-lane + underline-variant) | OWNED — L8→BI.W-DOCK-CONTROLS · L6→BI.W-SLIDER-THUMB-NAME · L11→BI.W-MENU-TRIGGER · L16→BI.W-XR-PRODUCER-REPAIRS X4; L7/L14 feature halves DECLINED-TERMINAL (re-trigger ≥2) |
| P8 | A6 + CC-1 + rebuild discipline (`@property`-in-color-mix collapse) | OWNED — A6→BI.W-XR-PRODUCER-REPAIRS X4; CC-1→BI.W-XR-PRODUCER-REPAIRS X5 |
| P9 | 5.0.0-cut payload (J1–J4: Blob rename / `/blob/config` / `/styles/fonts` / `--ring` roster) | OWNED — J1→BI.W-BLOB-RENAME-LAND · J2→BI.W-BLOB-SEAMS (`/blob/config`) · J3→BI.W-STRUCTURE-RESEQUENCE · J4→asks-and-consumes roster row 3 |
| P10 | type stations (SelectTrigger size +1; display/heading weight tokenization) | OWNED — weight tokenization → BI.W-XR-PRODUCER-REPAIRS X7; SelectTrigger +1 station DECLINED-TERMINAL per ruling 16 (KEEP-AS-IS; token-indirect the sanctioned future form) |
| §KF | PRM-expand (springPlay PRM arm) | DECLINED-TERMINAL — routed to keyframes.js inbox; NOT a glass ask (dependency note) |

## docs/tranches/BG/coordination/VALUEJS-T-P1-RIDER-AURORA-POINTER-2026-07-11.md

| ask-id | ask | disposition |
|---|---|---|
| T-38 | aurora pointer honesty (OWNER-ORDERED: 3 honesty arms + amplitude atom) | OWNED — BI.W-FIELD-CORE (names VALUEJS-T-38 / RIDER) |
| §6.1 T-40 | `text-title` 700 hardcode → weight-tokenize | OWNED — BI.W-XR-PRODUCER-REPAIRS X7 (`--type-weight-title`; the bold-letterform root) |
| §6.2 T-45 | glass-ladder backdrop bleed (oversampled-pseudo AT the ladder) | OWNED — BI.W-XR-PRODUCER-REPAIRS (T-45, `calc(-2 * <rung blur>)` inset at the ladder root) |

---

## docs/tranches/BH/coordination/asks-and-consumes.md

| ask-id | ask | disposition |
|---|---|---|
| BH row 1-2 | `/api` → `/timeline` + `/aurora` re-home (speedtest / muster) | CUT-FIXED — carried FORWARD onto asks-and-consumes roster rows 1-2 (BH-gate-covered, `proof:crossrepo-asks:bh`) |
| BH row 3 | `--ring` → `--focus-ring-color` rename (atlas, 12 sites) | CUT-FIXED — asks-and-consumes roster row 3 |
| BH row 4 | `--glass-blur-dock` token-retire (bbnf-buddy override) | CUT-FIXED — asks-and-consumes roster row 4; MIGRATION.md retire ROW |
| BH row 5 | `.text-gilt` → `.gold-shimmer` MIGRATION (atlas) | CUT-FIXED — asks-and-consumes roster row 5 |
| BH fence | content-only foreign-tree fence (inv-26) | DISCHARGED — carried into BI roster §fence; `proof:crossrepo-asks:bi` X4 |

## docs/tranches/BH/coordination/atlas-inbox-2026-07-10-o-close.md

| ask-id | ask | disposition |
|---|---|---|
| 1 O-E1 | 4.3.0-RECONCILE merge+tag | SUPERSEDED — Decision-0 one 5.0.0 cut |
| 2 O-E10 | publish the built dock + the ONE `#persistent-end` slot | OWNED — publish → BI.W-DOCK-SPINE (D-DOCK greenfield); `#persistent-end` → BI.W-DOCK-CONTROLS §Inbound |
| 3 O-E11 | blur/saturate dial-back + backdrop-attenuation lever | OWNED (blur dial-back → BI.W-BLUR-MUTE); ANSWERED-BY-EXISTING (backdrop-attenuation: the `--glass-tint-strength` axis + bright-bucket darken IS the luminance-clamp lever) |
| 4 O-E8 | A11Y-GLASS StatusDot forced-colors + dialog-name wrapper | DISCHARGED (dialog-name → BG 10.2 PORTAL-ATTRS, landed); OWNED (StatusDot forced-colors → BI.W-SLIDER-THUMB-NAME §Inbound) |
| 5 O-E7 | RADIUS-BLOCK `--radius-block` + pill-iff-short law | OWNED — BI.W-RADIUS-GRAMMAR (concentric-radius + pill-iff-short-box, UF-A1/A2) |
| 6 O-E4/O-E5 | PAPER-GRAIN opacity band + dark-arm + renderMode-static + WebGPU idle-gate | OWNED — grain band → BI.W-GRAIN-WIRE §Inbound; renderMode-static + idle-gate → BI.W-FIELD-CORE §Inbound |
| 7 O-E3 | INKMARK hairline/rule brush + scope note | DECLINED-TERMINAL — compose `<HandMark shape="underline" grain:0>` weight-1 today; a new brush is feature growth at 1 consumer; re-trigger ≥2 |
| 8 O-E6 | SHIMMER gold-outline utility + `--gilt-stroke` | ANSWERED-BY-EXISTING — `.metal-gold-border` border-image swept rim + `--metal-*` knobs (BB.W-METAL-SHIMMER) |
| 9 O-E2 | GU-1 `--glass-key-direction` under-shadow key lean | OWNED — BI.W-SURFACE-EXTRACT §Inbound (atlas GU-1/O-E2) |
| 10 O-E9 | VIRT-CORE document-native `/virtual` (CV substrate + slim viewport) | DECLINED-TERMINAL — BI.W-VIRTUAL-TRUTH retired the `/virtual` PUBLISHED SUBPATH (fresh probe: 0 external binary consumers — words ships a byte-divergent fork — + 0 src/ production consumers, demo-only). O-E9 is a long-pole future ask that per atlas "needs nothing from this row" today; re-mints at a real ≥2 cross-repo binary consume (vft V4→V6.g, or a words re-adopt ask). |
| 11 WG-E | glass TOC/search abstraction on latex-paper | DECLINED-TERMINAL — `/sidebar` (useScrollTracker/useTreeIndex) + `/search` (useFuzzySearch) are the shipped primitives; the latex-paper abstraction is consumer composition; re-trigger: a named ≥2 cross-repo need |
| 12 WG-E | PRIMITIVES-REGISTER manifest | SUPERSEDED-TERMINAL — Q033 retired the stale, unpacked derived register; installed exports and emitted declarations are the versioned source of truth. Q060 carries the correction. |
| 13 | pencil-boil ^0.6.0 peer bump (corrected ^0.8.1) | OWNED — BI.W-XR-PRODUCER-REPAIRS X8 (verify handmark against ^0.8.1 + widen the optionalPeer floor) |
| 14 | standing pencil-boil asks (schedulerTick+fBm) | DECLINED-TERMINAL — pencil-boil-side (foreign-tree fence) |
| 15 | `#persistent-end` priority (M25) | OWNED — BI.W-DOCK-CONTROLS §Inbound (M25 priority-bumped) |
| 16 | `stage="blur"` Drawer tier (M22) | ANSWERED-BY-EXISTING — BI.W-DRAWER-PERF's blur-once fixed-radius + alpha-dim IS the backdrop-blur drawer register; the surface axis carries the tiers |
| 17 | DockAppendix per-viz provenance dock (M19) + PEEK detent | OWNED (conditional) — PEEK tri-state → BI.W-DOCK-SPINE (Decision-0 #22b, owed at spine close) |
| 18 | hero-collapse-into-dock joint (M6) | OWNED-BY-COMPOSITION — BI.W-SHRINK-HERO (the collapse recipe) + the shipped `useDockCtaReceive` (the dock receive seam) |
| 19 | typewriter clause (M18, atlas-side cursor fix) | DECLINED-TERMINAL — no glass action (foreign-tree fence) |
| 20 | cartoon/veil Card variants (M67, confirm shipped) | DECLINED-TERMINAL — confirm-only, shipped, no action |

## docs/tranches/BH/coordination/atlas-inbox-2026-07-10-o-dir4.md

| ask-id | ask | disposition |
|---|---|---|
| 7 DIR-4 items | dock machine · mobile register · backdrop-attenuation · TOC · BorderProgress-on-dock · pencil-boil · schedulerTick+fBm | SUPERSEDED — o-close §2 carries all 7 forward with deltas (do not action independently; each resolved at its o-close row above) |

## docs/tranches/BH/coordination/atlas-inbox-2026-07-12-p-loop.md

| ask-id | ask | disposition |
|---|---|---|
| §1 D2 | synthetic-dispatch root delete | DISCHARGED — deleted `00621130` (BG.W-DOCK-CONSUMER-FENCE); Decision-0 #22a confirms survives greenfield |
| §2 CD-13 | consume-wave fire-on-cut re-pin | DECLINED-TERMINAL — atlas-side (foreign-tree fence) |
| §3 | PEEK-as-third-detent (tri-state via useLayerTransition) | OWNED (conditional) — BI.W-DOCK-SPINE (Decision-0 #22b) |
| §4 | measured context (backdrop budget, Firefox scroll-driven) | DECLINED-TERMINAL — informational guidance, no hard ask |
| §5 | re-pin deltas (pencil-boil→^0.8.1, kf ^5.1→^5.2, value ^1.2→^3.1, `--ring` census) | DECLINED-TERMINAL — atlas-side corrections; the pencil-boil peer bump is OWNED at o-close #13 → BI.W-XR-PRODUCER-REPAIRS X8 |
| §6/§7 | reciprocal outbound + seventh atlas edit | DISCHARGED — Decision-0 outbound sent (`atlas-outbound-2026-07-12`); §7 atlas-side |

## docs/tranches/BH/coordination/atlas-inbox-2026-07-12-p-refine.md

| ask-id | ask | disposition |
|---|---|---|
| #21 | flatten export-map delta (old→new subpath table when stable) | OWNED — BI.W-STRUCTURE-RESEQUENCE; relay owed at its close (Decision-0 #21) |
| #22 | dock-greenfield contract note (synthetic-dispatch survival + PEEK + dismiss model) | OWNED — (a) DISCHARGED-confirmed; (b)(c) owed at BI.W-DOCK-SPINE close (Decision-0 #22) |
| #23 | BorderProgress successor primitive | DISCHARGED (ruled) — BI.W-BORDER-PROGRESS-RETIRE + successor BI.W-SCROLL-PROGRESS-RIM |
| #24 | `/deck` headless core stake | DISCHARGED — ALREADY SHIPS `/deck` (BC.W-DECK); tri-state `stateFor()` = small additive, not owed |
| #25 | `@property` registration posture (guard + finished-state defaults) | DISCHARGED (ruled) — Decision-0 #25 (identity initial-value, no `@supports`) |
| §5 | skins/atmosphere RM-9, easing double-down, event/hook RM-3 (flagged forthcoming) | DECLINED-TERMINAL — no ask yet (congruent with BI.W-AURORA-VIBRANCY) |
| §7/§8 | R1/R2 folds (#24 split, hallmark class, animated-digit odometer) | DECLINED-TERMINAL — zero net-new owed; animated-digit odometer owner-gated (nothing owed until dated) |

## docs/tranches/BH/coordination/valuejs-inbox-2026-07-12-u-formation.md

| ask-id | ask | disposition |
|---|---|---|
| §1 | mixColors convention coupling (spectrum-walk) | OWNED — BI.W-SCROLL-PROGRESS-RIM §Inbound (U-F30 watch) + BI.W-FACTOR-ASKS / asks-and-consumes §co-migration; co-land, no glass action until the value.js cut |
| §2a U-F4 | desktop-PRM dock-collapse (PRM must resolve EXPANDED geometry statically) | OWNED — BI.W-DOCK-SPINE §Inbound (SNAP-TO-END-STATE, not freeze-at-start; A-class, verified on REAL GPU) |
| §2b T-60 | reveal-bloom gray entrance (consumer door + palette-honest floor) | OWNED — BI.W-E10-AURORA-ENTRANCE §Inbound (the reveal-bloom consumer door + palette-honest floor; the door lands on BOTH runtimes) |
| §2b T-52 | dock inline-edge clip (mask=none at rest + inline safe-inset + `--dock-pill-h`) | OWNED — BI.W-DOCK-OVERFLOW §Inbound (mask honesty + inline safe-inset + `--dock-pill-h` EXPORTED BUILD) |
| §2b GAP-L2 | aurora atoms door (lBand/lightnessScheme/hueSpread/chromaVariance) | OWNED — BI.W-AURORA-VIBRANCY §Inbound GAP-L2 |
| §2b GAP-L5 | blob settled seam + HERO preset + single-WebGL2 + lightnessFloor | OWNED — BI.W-BLOB-SEAMS |
| §2b PKT-1 | dist duration clobber (alias at root) | OWNED — BI.W-XR-PRODUCER-REPAIRS (PKT-1) |
| §2b T-38 | aurora pointer (3 honesty arms + amplitude atom) | OWNED — BI.W-FIELD-CORE |
| §2b T-45 | glass-ladder bleed (oversampled-pseudo at ladder) | OWNED — BI.W-XR-PRODUCER-REPAIRS (T-45) |
| §2b P1-R3 | slider thumb UA-outline (pair `outline:none` with house ring) | OWNED — BI.W-XR-PRODUCER-REPAIRS (P1-R3) |
| §2b GAP-ARM | aurora arm-replay (update after arm) | OWNED — BI.W-AURORA-VIBRANCY §Inbound GAP-ARM |
| §3 | 5.0.0 adopt + value co-land (U-F2/F29/F77 peer floor / ordering) | DISCHARGED — value peer `^3.1.0` set; `parseCSSValue` unconsumed; co-land, no glass action |

---

## docs/tranches/BI/coordination/VALUEJS-T-COMMUNIQUE-2026-07-11.md

| ask-id | ask | disposition |
|---|---|---|
| §1.1 T-60 | reveal-bloom gray-entrance forensic | OWNED — BI.W-E10-AURORA-ENTRANCE §Inbound (the PRODUCER half + palette-honest floor) |
| §1.2 PKT-1 | duration clobber | OWNED — BI.W-XR-PRODUCER-REPAIRS (PKT-1) |
| §1.4/§2.4 T-49 | blob settled/fission wake-order | OWNED — BI.W-BLOB-SEAMS (settled seam; wake-order arm watched there) |
| §1.5 T-45 | glass-ladder edge-sampling bleed | OWNED — BI.W-XR-PRODUCER-REPAIRS (T-45) |
| §1.8 P1-R3 | spectrum-thumb UA-outline | OWNED — BI.W-XR-PRODUCER-REPAIRS (P1-R3) |
| §3.3 GAP-L2 | lightness-scheme bracket grammar (T-26) | OWNED — BI.W-AURORA-VIBRANCY §Inbound GAP-L2 |
| §4 | HERO preset window + `/blob/config` + single-WebGL2 (~−33 KiB) | OWNED — BI.W-BLOB-SEAMS (HERO preset + `/blob/config` + WGSL drain in ONE window) |
| §5 P3 A1/A2 | dark readability (F2.R1) | DISCHARGED — paint-closed `300a30fb` |
| §5 L1/L4/L18 | producer-cured | DISCHARGED — `d03579a1`, NF.3 `d785cba2` |
| §5 L19 | aurora pointer door base | DISCHARGED — CONSUMED S.W6-7; T-38 rider → BI.W-FIELD-CORE |
| §5 T-53 | dark-corner artifact | DECLINED-TERMINAL — NOT-YOURS, exonerated by bisection, cured demo-side |
| §5 T-49 | axis-3 fission register | DISCHARGED — SHIPPED (mercury-colony); settled/preset/A–E → BI.W-BLOB-SEAMS |
| §5 demo regex-autoplay | deletion | DECLINED-TERMINAL — pre-executed demo-side |
| §5 T-51 | title step-down | DECLINED-TERMINAL — NO ASK (consumed existing ladder tokens) |
| §5 T-56/T-57/T-59 | demo-owned | DECLINED-TERMINAL — DEMO-OWNED, no producer rows |
| §5 PRM-expand | keyframes PRM arm | DECLINED-TERMINAL — routed to keyframes.js (dependency note) |
| §5 join rows | T-60↔UF-E10 · T-52↔D-DOCK · P6/P1↔B5 · PKT-2/3/4↔B7 | OWNED — join pointers resolved at their own rows: BI.W-E10-AURORA-ENTRANCE · BI.W-DOCK-OVERFLOW · BI.W-BLOB-SEAMS · BI.W-REGISTER-TABLE / BI.W-ENTER-EXIT-LANDING |

## docs/tranches/BI/coordination/asks-and-consumes.md

| ask-id | ask | disposition |
|---|---|---|
| roster row 1 | speedtest `/api`→`/timeline` (`migrate-api-to-timeline`) | CUT-FIXED — 5.0.0; BH-gate-covered; `proof:crossrepo-asks:bi` X1 |
| roster row 2 | muster `/api`→`/aurora` (`migrate-api-to-aurora`) | CUT-FIXED — 5.0.0; BH-gate-covered |
| roster row 3 | atlas `--ring`→`--focus-ring-color` (`migrate-ring-to-focus-ring-color`) | CUT-FIXED — 5.0.0; MIGRATION.md rename ROW |
| roster row 4 | bbnf-buddy `--glass-blur-dock` retire (`bbnf-glass-blur-dock-retune-no-op`) | CUT-FIXED — 5.0.0; MIGRATION.md retire ROW |
| roster row 5 | atlas `.text-gilt`→`.gold-shimmer` (`migrate-text-gilt-to-gold-shimmer`) | CUT-FIXED — issues at 5.0.0; MIGRATION row (ATLAS-N) |
| roster row 6 | atlas + sci-report PIN-GUARD → `^5.0.0` + value `^3.1.0` LOCKSTEP | CUT-FIXED — HARD pre-publish blocker; `proof:crossrepo-asks:bi` X2 |
| roster row 7 | value.js goo-blob→blob 5-site (`value-blob-rename-5site`) | OWNED — BI.W-BLOB-RENAME-LAND (W5) |
| roster row 8 | glass-panel RETIRE (atlas ×3 · sci-report ×2) | OWNED — asks-and-consumes roster row 8 (BI-proposal-gated; the glass-panel retire lands via BI.W-GLASS-DEDUP, files at land) |
| roster row 9 | hover-popover FOLD → hover-card keep-open (atlas) | OWNED — asks-and-consumes roster row 9 (BI-proposal-gated, files when the fold-wave lands) |
| roster row 10 | metric-family move (speedtest · muster · sci-report) | OWNED — asks-and-consumes roster row 10 + BI.W-METRICS-DEMO (STAY per XR-3) |
| roster row 11 | viz-subpath migration (`/constellation` slides+atlas · `/fourier-field` slides) | OWNED — asks-and-consumes roster row 11 (BI-proposal-gated; the D-VIZ / B9-S5 owner files it) |
| §fence | content-only foreign-tree fence (inv-26) | DISCHARGED — recorded in the roster; `proof:crossrepo-asks:bi` X4 by construction |

## docs/tranches/BI/coordination/atlas-outbound-2026-07-12-decision-0.md

| ask-id | ask | disposition |
|---|---|---|
| Decision-0 | ONE 5.0.0 cut (4.3.0 folds in; publish AUTHORIZED, user-gated tag) | DISCHARGED — sent; supersedes M1/O-E1/B1/D early-cut asks |
| answer #21 | flatten export-map delta table | DISCHARGED (ruled) — OWNED by BI.W-STRUCTURE-RESEQUENCE; table relayed when stable |
| answer #22 | dock-greenfield contract note (synthetic-dispatch / PEEK / dismiss) | DISCHARGED (ruled) — (a) confirmed; (b)(c) owed at BI.W-DOCK-SPINE close |
| answer #23 | BorderProgress successor named | DISCHARGED (ruled) — BI.W-BORDER-PROGRESS-RETIRE → BI.W-SCROLL-PROGRESS-RIM |
| answer #24 | `/deck` headless core | DISCHARGED — already ships `/deck` (BC.W-DECK) |
| answer #25 | `@property` registration posture | DISCHARGED (ruled) — identity initial-value, no `@supports` |
| §6 rhythm | reciprocal outbound cadence | DISCHARGED — outbound is the reciprocal (atlas §6 answered) |

## docs/tranches/BI/coordination/W-DOCK-FOLD-asks.md

Our OWN outbound roster (the B3 dock fold's by-name asks; feeds `asks-and-consumes.md` row 12) —
inbox-classed by path, marked for wholeness:

| ask-id | ask | disposition |
|---|---|---|
| F1–F5 | the dock control/trigger rename roster (~24 sites / ~9 repos) | CUT-FIXED — issues at the 5.0.0 cut; the sibling edits on its `^5.0.0` bump (row 12 of the master roster) |
| R5-C-02 | atlas DockAppendix PEEK-as-third-detent rides the F4 crossfade fold | DECLINED-TERMINAL for 5.0.0 — atlas SELF-HOSTS the PEEK detent (their own communiqué disposition); the crossfade tri-state is a bounded extension consideration on asks-and-consumes roster row 12's F4 fold; re-open requires a fresh consumer-batch ask |

## docs/tranches/BI/coordination/valuejs-inbox-2026-07-13-bi-dist-breakage.md

| ask-id | ask | disposition |
|---|---|---|
| A1 | dangling `dist/styles/dock.css` `@import "./dock/morph-bridge.css"` at `da051943` | DISCHARGED — the aggregator was regenerated with the B3 residuals sweep; re-verified 2026-07-13 at the registrar cycle: dist CSS graph 109 imports / 0 unresolved, zero `morph-bridge` references in `src/styles/dock.css` (comment-only retire record) |
| A2 | zero `.d.ts` in the on-disk dist at `da051943` | DISCHARGED — the on-disk dist now carries 695 `.d.ts` (re-verified 2026-07-13); ANSWERED-BY-EXISTING for the cut: the SHIPPED dist is release.sh's fresh provenance build (`vue-tsc emit-types` + `flatten-subpath-types` are `build` halves; `proof:build` gates it) — the dev-tree dist is never the shipped artifact |
| (b) | L17 goo-blob→blob consume-swap landed value.js-side; `.goo-blob-*` DOM contract held | DISCHARGED — no producer action; the byte-stable internal-contract claim matches BI.W-BLOB-RENAME-LAND (render byte-identical, internals untouched) |
| (c) | value.js pins `file:../glass-ui` at `2e559f7a` until 5.0.0 or a coherent HEAD dist | ANSWERED-BY-EXISTING — the pin is the consumer's own coherent-ref discipline (no producer shim, no tree write); a coherent dist exists at HEAD as of 2026-07-13, and the 5.0.0 tag is the unpin trigger they named |
| (d) | the 5.0.0 cut ships a whole, coherent dist (regenerated aggregator + emitted types) | OWNED — BI.W-XR-PRODUCER-REPAIRS (the dist/build-correctness family: its gate asserts on the FRESH build, the G-CUR-1 discipline) + the close battery's release.sh provenance build (`proof:build`) |

## docs/tranches/BI/coordination/valuejs-inbox-2026-07-13-colands-preview.md

| ask-id | ask | disposition |
|---|---|---|
| §A/§B | the U.W-LIB `{from}2{to}` rename set previewed on the pinned sandbox (5 names at `2e559f7a`); apply the FULL live-count set at our cut ref (grep the OLD names before migrating) | OWNED — the value.js `4.0.0` co-land window (U-F77): the rename find-replace + peer-floor widen land TOGETHER when value.js `4.0.0` publishes; recorded on `asks-and-consumes.md` §co-migration; the grep-before-migrate reconcile note is adopted verbatim |
| §C | keyframes `parseCSSSubValue → parseCSSValues` (U-F29) surfaces through our dist's keyframes dependency | DECLINED-TERMINAL — keyframes' OWN migration (their `compile/parse-flatten.ts`), relayed through keyframes' channel; no glass-ui source touches it; visible here only as the dependency note |
| §D | verification record + `^3.1.0 → ^4.0.0` floor-widen when value.js 4.0.0 publishes | OWNED — asks-and-consumes §co-migration (peer + dev floors widen paired with the §B2 renames at the U-F77 window; nothing blocks the v5 tag) |

## docs/tranches/BI/coordination/valuejs-inbox-2026-07-13-u-w-lib-invariant.md

| ask-id | ask | disposition |
|---|---|---|
| §A U-F30 | composite Locus-P invariant landed — parser colors physical at the two parse loci; `mixColors`/`sampleColorRamp` UNCHANGED; spectrum-walk raw read PRESERVED byte-identical | DISCHARGED — no co-migration owed (the formation letter's §1 coupling RESOLVES to the preferred invariant-preserving branch and CLOSES); LIB-G6 re-greps our `spectrum-walk.ts` every value.js run — the standing census holds the verdict fresh |
| §A bonus | `cssToOklch` auto-adopt beneficiary (mix/relative strings store physical channels) | ANSWERED-BY-EXISTING — pure upside on the minor auto-adopt; no live call site feeds it a mix string today; no action |
| §B U-F29 | loud-fail `CSSParseError` + `parseCSSValues` rename | ANSWERED-BY-EXISTING — glass-ui consumes ZERO `parseCSSValue`; recorded for constellation coherence only |
| §B2/§C U-F34 | the 3-symbol conversion-import rename (`srgbToOKLab→srgb2oklab` · `rawOklchToOklab→rawOklch2oklab` · `rawOklabToOklch→rawOklab2oklch`, 4 files) + the `^4.0.0` peer widen at the co-land window; MAJOR classification ack | OWNED — asks-and-consumes §co-migration (the U-F77 owner-held co-land window: find-replace + floor widen land paired; the colands-preview 5-name live-count reconcile applies — grep the old names at our ref before migrating); nothing here blocks the 5.0.0 tag |

## docs/tranches/BI/coordination/valuejs-inbox-2026-07-13-u-w-visual.md

| ask-id | ask | disposition |
|---|---|---|
| §A | whole-header contraction: demo REFERENCE landed value.js-side; the P3 `ScrollCardHeader` producer door is the long-term home (absorb at 5.0.0+) | OWNED — asks-and-consumes §successor-relays (the ScrollCardHeader door row: the demo strip is the spec seed — padding + background band + title token-step as ONE keyed contraction + the T-42 legibility floor); not a 5.0.0 blocker by their own words |
| §B veil | name the `surface="veil"` material calibration levers (α per mode + clarity window) so the demo does not fork the primitive | OWNED — asks-and-consumes §successor-relays (the veil-lever row: the lever-naming rides the B6 veil story surface); their OA-3 GPU translucency read is value.js-side |
| §B WatercolorDot | the Generate swatch adopts the WatercolorDot FACE register (producer register is the referent) | ANSWERED-BY-EXISTING — the register + its 9 in-repo consumers ARE the referent (stable, published); the X6 solid-ring rider stays OWNED at BI.W-XR-PRODUCER-REPAIRS; the swatch adopt is value.js demo work |
| §B verb-cluster | ONE instrument for the Generate verb cluster — dock-set capsule vs dropdown-menu; the owner's word picks the pole | ANSWERED-BY-EXISTING — both pole primitives ship at 5.0.0 (`DockSection`/`DockStack`/`DockIconButton→DockControl` and `ui/dropdown-menu`); no glass-ui action until the owner's word picks; the pick is a value.js demo instrument choice |
| §B T-52 / GAP-L5+T-60 / PKT-1 | dock-layer mask honesty · blob settled+revealBloom · swap-window confounds | DISCHARGED — cited by name at their standing rows (T-52 → BI.W-DOCK-SPINE §Inbound; GAP-L5/T-60 → BI.W-BLOB-SEAMS; PKT-1 → BI.W-XR-PRODUCER-REPAIRS); no re-book per their own M1 no-second-book rule |

## docs/tranches/BH/coordination/atlas-inbox-2026-07-12-p-refine.md §9 (appended 2026-07-13)

| ask-id | ask | disposition |
|---|---|---|
| §9.1 | atlas PLAN-v3 CHECKED + owner-ratified; zero new asks, zero new primitives owed; the #21–#25 thread items carry unchanged (deck-core cession still 2nd-consumer-blocked · odometer widening still owner-gated · @property posture line still welcome · peer re-pin fire-on-cut) | ANSWERED-BY-EXISTING — the standing #21–#25 dispositions hold verbatim; no new row minted per their own no-second-book framing |
| §9.2 | ask-#24 ownership split ENCODED in atlas W-DECK-DETENT (glass owns the headless deck primitive; atlas owns deck MOTION, self-hosting the contract-identical core until our cut) | DISCHARGED — matches §7's ruling exactly; the split is now checked wave-text on their side, nothing owed here |
| §9.3 | consume-roster head's-up: atlas W-SOURCE-BROWSER consumes our shipped `./data-table` when it lands — flips a zero-consumed subpath to consumed | OWNED — asks-and-consumes roster row (`./data-table` carries an INBOUND-CONSUMER-PENDING flag: the repo-cleanup census + any subpath-prune wave must NOT rule it dead on zero-local-consumers; the atlas consume is the recorded 2nd-party consumer) |

## docs/tranches/BI/coordination/valuejs-inbox-2026-07-15-v-formation.md

| ask-id | ask | disposition |
|---|---|---|
| V-formation | BI-V-CUT producer bundle (P019 paired `1/√φ` type · P122 chassis proportions/explicit-absence · P047 fixed-footprint Blob paint seam + reproducible body measure · P051 face-only WatercolorDot · P092 one selected fill · P046 eight-zone aurora + pointer) | RECEIVED-RECONCILING — an ACTION-REQUIRED consumer letter; its not-yet-shipped rows (P122/P051/P019/P047/blob-measurement) are RED/nonterminal producer asks that reconcile against Q003's OPEN native paint verdicts, not source-shape claims. Terminal disposition follows the Q003 in-app paint batch (no source-green close). |

---

## §Cross-check — every raw-sweep UNOWNED row is now terminal

The raw sweep (`INBOUND-SWEEP.md §UNOWNED`) listed 42 gap rows (40 unique). Each is now DISCHARGED /
OWNED / ANSWERED-BY-EXISTING / DECLINED-TERMINAL above — driven by the two execution-time mints
(`BI.W-BLOB-SEAMS`, `BI.W-XR-PRODUCER-REPAIRS`) + the sixteen §Inbound-acceptance-constraint patches
+ the four MARK-ONLY rulings (O-E11 · O-E3 · O-E6 · WG-E · C4 · M22 · M6 · L15 · PAPER-GRID-BREATHE).
No row reads UNOWNED. The standing liveness contract: a NEW inbox-class coordination file landing
without a marks section REDs `proof:inbound-marks` (I1/I4).

## docs/tranches/BH/coordination/atlas-inbox-2026-07-16-totality-producer-packet.md (marked 2026-07-16)

| ask-id | ask | disposition |
|---|---|---|
| §1 | BLOCKING: manual dock interaction axis (`auto`/`manual`; internal hover/focus/idle/outside-click/touch writers suppressed at BOTH poles; explicit `expand()`/`collapse()` operative), then the immutable Glass 7 publish with the full evidence tuple | OWNED-ACCEPTED — minted as the dock-interaction wave (triumvirate + two-challenge, this session); RIDES THE 7.0.0 TAG (the tag is already Q003-held, so no post-tag API churn); `alwaysExpanded`'s fate is adjudicated inside the wave under the consumer-updates ruling (atlas consumes it today — any cut ships with a marked atlas consumer-update); the evidence tuple returns via the Q060 outbound at publish |
| §1b | progress-rim generalization: ONE progress-rim primitive over a [0,1] value with scroll-derived and plain-reactive backbones; radius-aware host tracing (P2, rides any tag) | OWNED-FORMED — triumvirate wave candidate queued behind the dock axis; rides 7.0.0 only if it lands without delaying the tag, else the first 7.x; the §4 rim radius default folds into it |
| §2 | mechanical confirm: is `Metric` the badge-shaped register, or compose `MetricCell`? | ANSWERED — see `glass-outbound-2026-07-16-producer-reply.md`: `Metric` (size `sm`, `inline`) for text value+label seats; `MetricCell` when an icon rides with it; pill CHROME composes `./badge` (which both consumers already import) |
| §3 | breaking-change ledgers for keyframes 5.3.5→6.0.0 and value 3.1.0→4.0.0 | ANSWERED — `keyframes.js/CHANGELOG.md` §6.0.0 (line 6) and `value.js/CHANGELOG.md` §[4.0.0] (line 3; §[3.1.0] + §[3.0.0] cover the rest of the crossing); both ride the published tarballs |
| §4 | rim radius default (9999px vs inherit→0) · dock placement prop (P3) · drawer focus-restore verify-at-bytes · withdrawn asks | OWNED/NO-ACTION — radius default folds into §1b's wave; placement axis is a P3 wave candidate researched alongside the dock axis (same file) but NOT tag-gating; drawer + withdrawn rows need nothing from us |
| §5 | keyframes/value: no asks | NO-ACTION |

## docs/tranches/BH/coordination/atlas-inbox-2026-07-16-p-addenda-augment.md (marked 2026-07-16)

| ask-id | ask | disposition |
|---|---|---|
| §A | consumer-census augmentation (28 subpaths / 93 imports across atlas+sci; 11 zero-consumption subpaths; consumer-side backdrop:none misuse note) | RECEIVED-DATA — banked as the consumer-earning recompute input; the `tabs` zero is their PA-4 consume gap, not a glass defect; backdrop:none recorded NOT-A-GLASS-DEFECT so no BI lane chases it |
| §B | GCF-01/02 + data-table + pencil-boil read fixed; re-verified at next immutable bytes | NO-ACTION — verification is theirs at publish |
| §C.1 | controlled dock posture: `alwaysExpanded` covers the expanded pole today; residual = consumer-controlled COLLAPSED pole (FSM quiet in both poles) | SAME WAVE as totality §1 — one axis, one wave |
| §C.2 | dock placement axis for the desktop rail (P3) | OWNED-QUEUED — see totality §4 row |
| §D | not-glass rows (rim 0×0, backdrop census, WG-E, GCF-03) | NO-ACTION — recorded so they never arrive as asks |
| §E | OF-13 owner ruling: gate scripts abrogated program-wide | ALIGNED — already standing law here (the gates-abrogation mandate); BI plans no gate-file ceremony |

## Session-relayed constellation status (2026-07-16 evening, via the owner)

SCI `7f413ace` + Atlas `ab75813` pushed — 16 lane commits durable on origin; the Atlas
breaking-change commits evidence THEIR 7.0.0 major (consuming Glass 7); fleet 17/19 with the
parsimony and matrix lanes as the tail. Consumers are registry-HELD on the Glass 7 publish.
Producer reply PLACED at `glass-outbound-2026-07-16-producer-reply.md`. The publish remains
gated by Q003 RED + the native sweeps + Q002 — the hold is honest, not idle.

## docs/tranches/BI/coordination/speedtest-inbox-2026-07-17-install-truth-ack.md (marked 2026-07-17)

*The speedtest AX Pass-9 ACK of `glass-outbound-2026-07-17-constellation-install-truth.md`.
Their explicit framing, recorded verbatim: SUPERSEDES NOTHING; NO glass action owed before our
7.0.0 tag; the full Pass-9 relay (design-language + root-defect batch) arrives LATER as ONE
packet (no-piecemeal law). Three items carried; producer-coordination seat dispositions below.*

| item | ask | disposition |
|---|---|---|
| §3 break table | their 4.0.1→6.0.0 consumer break census, returned as Q060 cross-check evidence | RECEIVED-DATA + RECONCILED — banked as Q060 cross-check input, reconciliation below; no re-book (their §5 no-piecemeal law) |
| §3 residue | `DockIconButton`/`DockTabButton` "left `/dock` at 6.0.0 with no Breaking row" | VERIFIED — verdict PARTIAL (real member-break, MIS-VERSIONED: it landed at 5.0.0, not 6.0.0); routed to the retro-truth sidecar as a 5.0.0 member-level addendum |
| §4 ScrollingText | is `/scrolling-text`'s 5.0.0 removal terminal, or is a successor intended? | ANSWERED (producer) — TERMINAL; the record names speedtest's own tree as the relocation home; conditional ≥2-repo re-entry only |

**§3 reconciliation (item 1 — Q060 cross-check).** Their table splits into three break classes
across the 4.0.1→6.0.0 crossing:
- **6 subpaths / 7 files** (`/context-menu`, `/scrolling-text`, `/hover-card`, `/sheet`,
  `/toggle-chip`, `/api`) — AGREEMENT, 100%. All six sit in OUR verified v4.2.0→v5.0.0 20-key
  drop; they predate 4.2.0, so a 4.0.1 pin still carries them. Every one is a **5.0.0** key
  removal — a 4.0.1→6.0.0 consumer accumulates the whole 5.0.0 drop. No row of this class is
  unexplained by our history.
- **2 `/dock` members** (`DockIconButton`, `DockTabButton`) — NOT explained by key history: the
  `/dock` KEY survives at 4.2.0/5.0.0/6.0.0. The one candidate MEMBER-level break → item 2.
- **6 prop-drift sites** (Button `size="icon"`→`iconOnly`; Toast `variant`→tone arm) — a THIRD
  class (prop-level API evolution), outside export-key/member-removal history by construction;
  not a defect in our key census.

**§3 residue verdict (item 2 — PARTIAL).** git-show archaeology on the `./dock` source barrel
(`src/components/dock/index.ts`, the source of `dist/dock.js`):
- v4.2.0 (and the v4.0.1 tree, at `src/components/custom/dock/index.ts`): `DockIconButton` +
  `DockTabButton` ARE exported members of `./dock`.
- v5.0.0: both DEFINITION-ABSENT — folded onto `DockControl` (`shape` axis); the barrel comment
  names the retire ("folds the retired `DockIconButton` + `DockTabButton`… clean break, no alias").
- v6.0.0: still absent (barrel byte-identical but for one added `DockBackdropMode` type).

⟹ the member removal is REAL but landed at **5.0.0, not 6.0.0**. CHANGELOG coverage: NO §5.0.0
Breaking row names the fold (the §5.0.0 rows are `./api`, `--ring`, `goo-blob`, `src/subpaths/`),
and — correctly — NO §6.0.0 row names them (§6.0.0's "Owner-internal members leave their family
barrels" list is a DIFFERENT cohort). So speedtest's "no 6.0.0 row" observation is TRUE but
mislocates the owed row: it is a **5.0.0** row, and CHANGELOG §5.0.0 is silent on it. MIGRATION
coverage: §`BI.W-DOCK-FOLD` DOES carry the per-symbol rows (`DockIconButton → DockControl`;
`DockTabButton → DockControl shape="tab"`) — the migration surface is present, not missing. Net:
PARTIAL — a real CHANGELOG-only completeness gap at 5.0.0 (member-level), MIGRATION guidance
already exists, the version was misattributed. Routed to the retro-truth sidecar as a 5.0.0
member-level addendum. **Member-level completeness is a DIFFERENT class than key-level; our
packet's "the 6.0.0 export-KEY delta is honest (one drop, `./stacked-icons`)" verdict was scoped
to KEYS and STANDS as scoped.**

**§4 ScrollingText answer (item 3 — TERMINAL).** The record (`MIGRATION.md` §"The
`/scrolling-text` subpath retire-relocation", `BI.W-SPEEDTEST-ONLY-PAIR`) rules the 5.0.0 removal
TERMINAL: `ScrollingText` is an overflow-detection marquee whose ONLY binary consumer at the cut
probe is speedtest (2 sites, 0 across the rest of the constellation); the ≥2-**repo** bar is
UNMET, so the law RELOCATES it to the sole consumer's tree rather than folding it onto a sibling
— "the honest home is speedtest's tree." MIGRATE: none. The sanctioned move is EXACTLY what
speedtest proposed: house a local copy (or its own overflow primitive) product-side and mark it
product-owned. NO library successor is intended. Re-entry is conditional and named: a real
≥2-repo cross-repo binary consume re-mints the published subpath (never a demo page, never one
repo). So — TERMINAL, product-ownership blessed by the record, with a standing ≥2-repo re-entry
trigger.

**Framing recorded.** Per their §1/§5: this ACK supersedes nothing; nothing here is owed before
our 7.0.0 tag; the full Pass-9 relay packet remains pending their audit-fleet + design-loop close.

## docs/tranches/BI/coordination/atlas-inbox-2026-07-17-adopt-confirmed-and-install-truth-ack.md (marked 2026-07-17)

*The atlas P·TOTALITY packet: confirms the `:interaction="manual"` adopt (our §Unblock condition
in `atlas-outbound-2026-07-16-dock-interaction-adopt.md`), ACKs the install-truth packet
(`glass-outbound-2026-07-17-constellation-install-truth.md`, b43b9f91-class), and raises ONE
ruling ask. Their framing: one packet per no-piecemeal; supersedes nothing; no dates asked; the
hold reads honest. Five items; producer-coordination dispositions below. The §3 ruling is answered
with the orchestrator's producer ruling recorded VERBATIM, and its outbound reply flagged
NEEDS-ORCHESTRATOR.*

| item | ask / claim | disposition |
|---|---|---|
| §1 adopt bind | `:interaction="manual"` bound at atlas `1fdce65`, rim re-seat `a3c84eb`, sci addendum `e91229e6`; inert-additive on our 6.0.0 dist (no `interaction` in dock.d.ts, vue-tsc green) | ACK-RECEIVED — closes our 2026-07-16 adopt §Unblock; the inert-additive reading matches our outbound's "additive adopt, byte-identical" claim. SHA note below. |
| §1 history-rewrite | force-with-lease rewrote 3 commits to strip attribution trailers; pre-rewrite SHAs `0e2ceb3`/`236b8b2`/`3b9bd670` → successors `1fdce65`/`a3c84eb`/`e91229e6` | NOTED + VERIFIED-CLEAN — `grep` of `docs/` for all six SHAs returns ZERO banked references; nothing we recorded dangles. These are atlas/sci-repo commits, NOT verifiable from glass-ui's tree (foreign-tree fence) — recorded as atlas-attested provenance, not independently confirmed. |
| §2 Q060 #21 ACK | banks our §3 delta table as their authoritative 6→7 surface; confirms `./controls`→`./dark-mode-toggle` (3 sites), metric-in-`./badge` (per 2026-07-16 §2 + Q051 Row-16), `motion-curves`→value `/easing` already their idiom; corrections safe (never planned to repoint labeled-field/command/expandable-container); sci-report ACK returns at the major | ACK-RECEIVED + ROUTED-TO-Q060 — the atlas ACK is now IN HAND (discharges one of Q060's two owed "ACK marks for atlas + sci-report"); the warned-off trio (labeled-field/command/expandable-container survive) confirmed safe. Q060 owed-outbound delta below. |
| §3 ruling ask | is the atlas UNPUBLISHED-branch kf6/value4 pre-stage (rides `--legacy-peer-deps`) out of law vs our install-truth "`--legacy-peer-deps` is NEVER / do not force-upgrade producers under glass@6" row? "Confirm or correct." | ANSWERED (producer ruling, recorded VERBATIM below) — their reading CONFIRMED with two binding conditions. The confirm-or-correct REPLY to atlas is an owed OUTBOUND → **NEEDS-ORCHESTRATOR**. |
| §4 census — DockIconButton | `grep -c DockIconButton …/dock.d.ts` → 0 at 6.0.0, no Breaking row found; zero atlas + sci code consumers; two stale doc-comments `<DockIconButton compact>` (useVizPlate.ts:314/:406) atlas's to truth | CORROBORATES c12be186 (member-fold real, absent from 6.0.0) — SECOND consumer confirmation after speedtest. Timing nuance reconciled below; the retro-truth SIDECAR append is drafted here → **NEEDS-ORCHESTRATOR** (sidecar is outside my writable set). Doc-comments atlas-tranche-owned, no glass action. |
| §4 census — ScrollingText / orphans | zero ScrollingText consumers in atlas + sci; holds no position (stays speedtest's); the two CHANGELOG orphans (`./styles/critical`/`./styles/deferred`) don't touch atlas (they consume the `./styles` aggregate) | RECEIVED-DATA — consistent with c12be186 (ScrollingText TERMINAL, the terminal-vs-successor question is speedtest's) and the install-truth §2 orphan finding. Zero-consumer census banked, no ask. |
| §5 | nothing else owed; full evidence tuple arrives via our Q060 outbound at tag | NOTED — matches our standing plan (Q060 delivers the publish tuple at the 7.0.0 tag). |

**§3 producer ruling (recorded VERBATIM, orchestrator, 2026-07-17).** Their reading is CONFIRMED —
the never-`--legacy-peer-deps` / "do not force-upgrade producers under glass@6" row binds
PUBLISHED / app-consumer graphs; an unpublished-branch pre-stage with honest gates is the same
P127 staging class our OWN branch practices (we carry 7.0.0 peers `kf ^6.0.0` + `value ^4.0.0`
unpublished on this branch). Two binding conditions attach: **(a)** nothing publishes or deploys
from the wedged graph until our 7.0.0 tag (atlas already states this in §3 — it is now BOUND);
**(b)** the wedge must remain VISIBLE in their tree — no blanket resolution-masking flag as the
durable install mechanism: if the stage currently rides `--legacy-peer-deps`, swap to explicit
`package.json` overrides/pins that DECLARE the intended future graph and are removed at the 7.0.0
adopt (zero consumer cost on an unpublished branch, per atlas's own note). Masking a PUBLISHED
broken graph and DECLARING a STAGED future graph are different acts; the first is forbidden, the
second is P127. — This SCOPES (does not contradict) the install-truth §1/§4 categorical language:
that "NEVER" governs resting/published graphs; the packet never contemplated an unpublished
producer-led staging branch, and this ruling fills that gap coherently. **NEEDS-ORCHESTRATOR:** the
confirm-or-correct reply to atlas is an owed producer outbound (fold into the Q060 outbound at tag,
or a dedicated confirm before it) — this seat records the ruling but does not author sibling-facing
reply files.

**§4 DockIconButton timing reconciliation + drafted sidecar row.** Atlas's "0 at 6.0.0, no Breaking
row" is TRUE-as-absence but versioned one major late: c12be186 established (via `./dock` barrel
archaeology) that the `DockIconButton`/`DockTabButton` fold onto `DockControl` landed at **5.0.0**,
definition-absent since; 6.0.0 is byte-identical but for one added type. So the owed CHANGELOG row
is a **5.0.0** member-level retro-truth row, and atlas is the SECOND consumer to flag the same real
gap (speedtest was first, c12be186). Drafted addendum row for the
`changelog-retro-truth-proposal.md` sidecar (append — NEEDS-ORCHESTRATOR, outside my writable set):
"§5.0.0 member-level: `DockIconButton` + `DockTabButton` left `./dock` at 5.0.0 (folded onto
`DockControl`; MIGRATION `BI.W-DOCK-FOLD` carries the per-symbol rows) with no §5.0.0 Breaking
row — corroborated by two independent consumer censuses (speedtest AX Pass-9; atlas P·TOTALITY,
`grep -c → 0` at 6.0.0, zero code consumers)." Member-level completeness stays a DIFFERENT class
than the export-KEY delta; the packet's "6.0.0 export-KEY delta is honest (one drop,
`./stacked-icons`)" verdict was scoped to KEYS and STANDS.

**Q060 owed-outbound delta (from this inbound).**
- atlas Q060 #21 ACK: **RECEIVED** — one of the two owed ACK marks (atlas) is discharged inbound;
  **sci-report ACK still PENDING at the major** (atlas relays it returns then; unchanged).
- NEW owed row: the §3 confirm-or-correct reply to atlas (the pre-stage ruling above) — fold into
  the Q060 outbound at tag.
- No change to the other Q060 rows (#22b/c dock-contract note, deck-helper removal note, C4
  `./styles/theme` deliver-or-decline, Q033 register correction, co-land marks, stale-consumer ask
  rows) — none touched by this inbound.

**Cross-check (c12be186 + install-truth).** No contradiction. Atlas CORROBORATES both prior
dispositions: DockIconButton absence at 6.0.0 (member-fold real, re-versioned to 5.0.0 per
c12be186) and ScrollingText terminal-is-speedtest's-question. The §3 ruling refines the
install-truth's categorical `--legacy-peer-deps` language to published graphs — a scope, not a
reversal. Flagged NEEDS-ORCHESTRATOR: (1) the §3 confirm outbound to atlas; (2) the §4 sidecar
row append.

## docs/tranches/BI/coordination/keyframes-inbox-2026-07-17-v-formation-batch.md (marked 2026-07-17)

*The keyframes.js Tranche V formation batch (V letter confirmed on our record 2026-07-17,
producer-reply §6). Their framing: nothing here blocks or interrupts BI/P/Q — mark at our next
bounded boundary; keyframes re-verifies every row against the PUBLISHED Glass 7 artifact at its
consume wave; nothing requested of the unpublished tree. Their evidence linkage is our worktree at
`e7da7b5c` — VERIFIED a real commit in our history and an ancestor of HEAD `c12be186` (audit-only,
never consumed as release bytes). Four root-defect asks + a positive signal + housekeeping;
dispositions below.*

| item | ask | disposition |
|---|---|---|
| G-1 dock first-tap activation swallow (desktop, 1280×800) | reported dock box vs `elementFromPoint` disagree at rest → first direct click times out; confirm whether DOCK-SPINE's `elementFromPoint` reachability assert covers single-click ACTIVATION at rest; if not, name the owner | PARTIAL-ANSWER + **NEEDS-ORCHESTRATOR** — the GEOMETRY facet is owned; the ACTIVATION-actuation oracle is a real gap. Detail below. |
| G-2 mobile toggle unreachable at rest (390×844) | `dock-layer--full` sits `pointer-events:none/opacity:0/visibility:hidden` with the button box off-screen; only the 40×40 summary face is interactive → first tap expands, second actuates; same family as G-1 | ROUTED-TO-DOCK-BAND + **NEEDS-ORCHESTRATOR** (with G-1) — same activation-facet gap; cited together below. |
| G-3 modelValue write-through (answer-only) | two kf demo files hold `:key` remount shims rationalized as "glass-ui 4.0.1 modelValue is EMIT-ONLY" (EasingSidebar, TimingFunctionPanel); does Glass 7's picker/select modelValue write through? | ANSWERED-FROM-SOURCE — YES, it writes through. `src/components/select/Select.vue` forwards `modelValue` to `RekaSelectRoot` (`v-bind="forwarded"`) AND emits `update:modelValue` → standard two-way `v-model`; `src/components/easing/EasingPicker.vue` uses `defineModel<EasingPickerValue>()` (two-way by construction). The `:key` remount shims can be deleted at their consume wave. Caveat: this is the 7.0.0-pending BRANCH source; re-verify at consume wave against published bytes, per their own discipline. |
| G-4 a11y internals pointer (no work requested) | is there a standing internal a11y gate covering Dialog/Popover/Slider/Select focus-trap + ARIA emission? pointer closes their assumption row | ANSWERED — YES: `proof:a11y` (BI-a11y.json, the BI.W-SLIDER-THUMB-NAME source-gate framework; axe π readback is the binding paint truth), plus `BE-dock-a11y`, `proof-pager-a11y`, `AW-input-invalid-aria`, `BE-aria-orientation`. The Dialog/Popover/Slider/Select focus-trap + ARIA emission are reka-ui-owned primitives (glass wraps them — confirmed in `src/components/{dialog,popover,slider,select}`), exercised through the composed axe π. Closes their assumption row; data point, no glass work requested. |
| §2 positive signal | 19 kf-consumed subpaths present in the exports map; HeaderRibbon `placement` clean + first-frame; zero black compositor slab + zero occlusion across route×viewport, both modes; demo bundle byte-neutral (+4,501 B / +0.067%); TooltipProvider blank-render was kf-owned (missing root provider — our reka pattern correct) | RECEIVED as CLOSE EVIDENCE — banked for Q003/close (external corroboration of no-occlusion/no-black-slab at `e7da7b5c`). TooltipProvider defect keyframes-owned, no glass change. `e7da7b5c` confirmed real + ancestor of HEAD. |
| §3 housekeeping acks | producer-reply §6 re-home DONE (HeaderRibbon mark now at `keyframes.js/docs/tranches/V/coordination/`); `mode="persistent"` drop + `defineExpose` deletion booked at V.W2; V plan folder `keyframes.js/docs/tranches/V/` | ACK-RECEIVED — the re-home DISCHARGES the producer-reply §6 ask (the one-line act we declined to do in the sibling tree). The V letter is confirmed (matches producer-reply §6 correction). No glass action owed. |

**G-1/G-2 detail (the activation-facet gap).** The GEOMETRY facet keyframes describes — the dock's
reported box vs `elementFromPoint` returning `MAIN.grid` at rest (desktop), and the
summary/full `pointer-events` layer-swap (mobile) — maps to DOCK-SPINE's **S4
reserved-footprint-passthrough** (the transparent reserved margin is `pointer-events:none`, so a
hit over the dock's REPORTED box resolves to the page beneath — exactly G-1's mechanism) and to the
`dis:dock-chronic` liveness probe ("a live `elementFromPoint` reachability assert on dock hover
plates"). BUT keyframes is CORRECT-ON-RECORD that no owner row covers the ACTIVATION facet: none of
DOCK-SPINE's §Acceptance oracles (S1 clip-by-construction, S2 one-plate-scalar, S3
transform-free-centering, S4 reserved-footprint-passthrough) nor its §π items (the "Hit-frame
no-oscillation" π is enter/leave FLICKER, not first-tap actuation) drives a SINGLE-CLICK activation
at rest and asserts it actuates on the first tap. So: the reachability assert as specified does NOT
cover first-tap activation. Owner recommendation: DOCK-SPINE is the natural home (it mints the
reserved-footprint + the state-sized hit frame + the L0/L1/L2 pointer-events gating; W-DOCK-CROSSFADE
owns the mobile summary↔full crossfade the G-2 layer-swap rides). **NEEDS-ORCHESTRATOR:** adding a
"single-click activation at rest actuates on first tap, desktop AND mobile viewport" oracle to
DOCK-SPINE §Acceptance/§π (or naming a sibling dock-band owner) is a wave-spec amendment, outside my
writable set — recommend folding it into DOCK-SPINE (or W-DOCK-CROSSFADE for the mobile arm) with a
live `elementFromPoint(toggleCenter)` + driven-pointerdown actuation assert at 1280×800 and 390×844.

**Q060 / relay note.** G-3 (write-through YES) and G-4 (a11y pointer) are answer-only and now
on-record here; the Q060 keyframes/value mark is FYI-only ("no action owed either direction"), so
the delivery vehicle for these two answers (fold into the Q060 kf FYI row, or a one-line relay) is
the orchestrator's routing choice — the answers themselves need no further adjudication.

**Cross-check (c12be186 + install-truth).** No contradiction. Nothing in this batch touches the
speedtest dispositions (dock-member residue at 5.0.0, ScrollingText TERMINAL) or the install-truth
packet — G-1/G-2 are dock-interaction reachability (dock band), not export-map/version claims. The
U→V re-home is CONFIRMED complete (producer-reply §6 asked for it; keyframes §3 reports it placed at
`V/coordination/`), consistent with our record. The one flagged item is the G-1/G-2 activation-facet
oracle → NEEDS-ORCHESTRATOR.

## docs/tranches/BI/coordination/keyframes-inbox-2026-07-17-v-execution-open.md (marked 2026-07-17)

*The keyframes.js Tranche V EXECUTION-OPEN notice (owner-ratified OD-V1; the user relayed
"keyframes is set to begin"). Their framing, recorded: ONE bounded notice; nothing blocks or
interrupts BI/P/Q; mark at convenience; nothing requested of the unpublished tree; plan of record
`keyframes.js/docs/tranches/V/`. A pure NOTICE, not an ask batch — no glass action owed. Four
blocks; producer-coordination dispositions below. This is a NEW inbox-class file, so this section
also satisfies the standing liveness contract (`proof:inbound-marks` I1/I4).*

| block | content | disposition |
|---|---|---|
| §pre-tag (W4–W6) | library structure settlement + gate make-real authoring + doc canon, all on the immutable K6 line; "K6 keeps zero glass edges throughout" | NO-ACTION — no-glass-surface, keyframes-tree work; informational. Their "zero glass edges on K6" is a keyframes-tree assertion, foreign-tree fence, recorded as attested not independently confirmed. |
| §at-tag consume (W2/W3) | the moment Glass 7.0.0 tags (the P127 wedge exit): W2 consumes the PUBLISHED artifact only — exact `7.0.0` demo devDep, registry-only lock, one-physical-core proof, the §3 Q060 delta table from the install-truth packet as the authoritative export-map check; then native 1280/390 close + Cloudflare deploy (W3); relay confirm+evidence here; the four T-era dock-crispness obligations + RG-1/RG-2 activation rows re-verified live on consume; findings return as ONE packet, never worktree edits | NOTED-ALIGNED — the wedge-exits-at-our-tag model matches `b43b9f91` (P127 intermediate state, `--legacy-peer-deps` forbidden, cure is 7.0.0). The Q060 §3 delta-table cite is CORRECT: `b43b9f91` delivered the complete #21 old→new table early to all consumers, so it is a valid authoritative export-map check. Consume-against-published-only + one-core proof match our install-truth discipline. Honest gates restated below (no dates owed; their notice demands none). The RG-1/RG-2 live re-verify is the external check on the still-open activation oracle (below) — no new owed. |
| §awaiting-your-marks | G-1/G-2 dock first-tap activation ownership, G-3 modelValue write-through, G-4 a11y internals pointer — "at your next boundary, no urgency" | SUPERSEDED — ALREADY MARKED at `da5910d5` (HEAD; this notice is a timing artifact, sent before keyframes saw our marks). G-3 ANSWERED-FROM-SOURCE (modelValue writes through: `Select.vue` forwards + emits `update:modelValue`, `EasingPicker.vue` uses `defineModel`; the `:key` shims deletable at consume, re-verify at published bytes). G-4 ANSWERED (`proof:a11y`/axe π + reka-owned focus-trap/ARIA). G-1/G-2 PARTIAL-ANSWER (geometry owned; single-click activation oracle a real gap → NEEDS-ORCHESTRATOR, carried from `da5910d5`). Relaying these answers back to keyframes is the orchestrator's routing choice per the `da5910d5` Q060/relay note. |
| §unpublished-tree / plan-of-record | nothing requested of the unpublished tree; plan of record `keyframes.js/docs/tranches/V/` | NO-ACTION — the U→V re-home is already CONFIRMED complete at `da5910d5` §3 (discharged producer-reply §6); the V-folder plan-of-record matches. |

**Honest 7.0.0 gates restated (no dates — their notice demands none).** Their execution correctly
frames everything as conditional on "the moment Glass 7.0.0 tags." The tag remains gated, per the
standing record (INBOUND-MARKS line 480; `b43b9f91`): **Q003** RED (the user-hand in-app paint arm)
+ **Q002** (the native 1280/390 sweeps) + **Q051** (the consolidated user-ask ruling batch,
committed awaiting the user, `3f7bffe2`). The hold is honest, not idle; no date is on record and
none is owed to keyframes. Their consume rides the PUBLISHED tag whenever it lands — no coupling to
their W4–W6 schedule, which runs glass-free on the K6 line.

**Consumer-update ledger (verify, per the watch).** WE owe keyframes NOTHING on the current record
beyond delivering the already-placed G-3/G-4 answers (routing choice, orchestrator; the Q060 kf
mark is FYI-only, "no action owed either direction"). KEYFRAMES owes us only their standing
consume-and-relay against the published 7.0.0 artifact (not owed now; gated on our tag). The
dock-knob adoption / kVisOf-class items are slides/atlas consumer-updates, NOT keyframes — N/A to
this inbox; no keyframes-owed consumer-update exists on the record. NO-COLLISION with the HELD
formations (BI.W-ENGAGE-AFFORD / BI.W-GLASS-SUBTLETY / BI.W-SLIDER-ENGAGE — internal engagement
waves, unregistered pending close) nor with the in-flight Q041 comment-scrub: this notice is a
keyframes consume-plan + already-discharged awaiting-marks, touching neither.

**NEEDS-ORCHESTRATOR (both carried, none newly minted by this notice).** (1) The DOCK-SPINE
single-click activation-at-rest oracle (G-1/G-2 activation facet) remains the one open wave-spec
amendment from `da5910d5`; keyframes' RG-1/RG-2 live re-verify at consume is the external check on
it, so landing the oracle before/at the 7.0.0 tag is the coherent sequencing (recommend fold into
DOCK-SPINE §Acceptance/§π, mobile arm into W-DOCK-CROSSFADE — a live `elementFromPoint(toggleCenter)`
+ driven-pointerdown actuation assert at 1280×800 and 390×844). (2) A one-line relay pointing
keyframes at `da5910d5` (their "awaiting marks" are already placed: G-3 writes through, G-4 answered,
G-1/G-2 partial) — routing choice, not a new obligation.

**Cross-check (`da5910d5` / `c12be186` / `b43b9f91`).** No contradiction. The Q060 §3 delta-table
cite matches `b43b9f91`; the awaiting-marks are the exact rows discharged at `da5910d5` (this notice
predates their sight of them); nothing here touches the speedtest dock-member-at-5.0.0 or
ScrollingText-TERMINAL dispositions (`c12be186`), the install-truth wedge/CHANGELOG findings
(`b43b9f91`), or the atlas pre-stage ruling (`da5910d5`). The single open thread — the DOCK-SPINE
first-tap activation oracle — is unchanged, not re-litigated.

## docs/tranches/BI/coordination/valuejs-inbox-2026-07-17-v-reformation.md (marked 2026-07-17)

*The value.js Tranche V′ re-formation notice (owner campaign 2026-07-16). Their framing, recorded
verbatim: a batched letter per the standing relay law, no interrupt intended, read at convenience;
it ACKs both our 2026-07-16 inbound marks (clipboard primitive + HeaderRibbon persistent-only), ACKs
the install-truth packet (`b43b9f91`), notes V's re-formation into V′, and carries ONE
explicitly-non-evidentiary sandbox observation. "No defect batch accompanies this letter — none
exists to send." A RECEIVED/ACK letter: it requests no reply, no ruling, no new glass work, and
names no date. Every glass-facing claim verified against the committed record only (HEAD
`f1e88fe2`; tags `v4.2.0`/`v5.0.0`/`v6.0.0`; packet `b43b9f91`) — the working tree is mid-scrub and
was never cited. Per-claim verdicts below.*

| claim | claim text | verdict |
|---|---|---|
| §1 clipboard | `writeClipboard(text): Promise<CopyResult>` replaces `copyToClipboard(text,{onCopyError})`; confirmation-UI sites adopt `useClipboard({resetMs})` | CONFIRMED — `src/composables/dom/useClipboard.ts`: `writeClipboard` (:39), `CopyResult` type (:22), `useClipboard({resetMs})` (:10/:62); exported at `src/composables/dom/index.ts:51`. `copyToClipboard` is a clean break — 0 references anywhere under `src/` at HEAD (no alias), consistent with the no-backwards-compat law they cite. |
| §1 HeaderRibbon | persistent-only; VNode inference dead; persistent/`#items` stays | CONFIRMED — `src/components/header-ribbon/types.ts` `HeaderRibbonProps` carries only `placement`/`ariaLabel`/`class` (NO `items` prop, NO VNode array — inference path is gone); `HeaderRibbon.vue:11` `defineSlots<{ items?(): unknown }>()` + the `<slot name="items"/>` band is the sole item surface; README/types describe the "persistent" command band. |
| §1b packet id | install-truth packet is `b43b9f91` | CONFIRMED — `b43b9f91` "the constellation install-truth packet - wedge verified, changelog defect owned, the 6->7 delta table delivered early". |
| §1b(a) 5.0.0 attribution | `confirm-dialog`/`toggle-chip` died at glass **5.0.0**, not 7.0.0 | CONFIRMED — both PRESENT in `v4.2.0:package.json` exports, ABSENT in `v5.0.0` (and `v6.0.0`, HEAD). Their corrected attribution is exact. |
| §1b(b) Q060 delta | full 6→7 delta = 11 removed / 3 added, 82→74 keys, incl. the six removals the earlier relay missed | CONFIRMED — computed set-diff `v6.0.0`→HEAD exports: **11 removed** (`color-swatch`, `controls`, `focus-scope`, `icon-chip`, `icon-tooltip`, `metric-badge`, `metric-cell`, `metric-stack`, `motion-curves`, `notification`, `spa-view`), **3 added** (`dark-mode-toggle`, `metric`, `styles/theme`), net −8, 82→74. The packet states the identical figures (`b43b9f91` line 116); the "six the earlier relay missed" = `color-swatch`/`focus-scope`/`icon-chip`/`motion-curves`/`notification`/`spa-view` (packet §row 4). |
| §1b(c) legacy-peer-deps | `--legacy-peer-deps` is NAMED FORBIDDEN in the install step | CONFIRMED — packet line 66 "`--legacy-peer-deps` is NEVER the answer… a masking fallback"; aligns with the standing no-masking-fallback law. |
| §1b §2 rule | the export-map diff (not CHANGELOG prose) is the authoritative migration surface | CONFIRMED — packet line 93 "the rule going forward: the EXPORT-MAP DIFF is the authoritative migration surface." |
| §2 W44 acceptance map | Glass 7 handoff accepted only with a 74-export / 68-typesVersions package map; dependency/peer map with Embla ownership; peers-only | CONFIRMED-AT-RECORD — HEAD `package.json`: 74 export keys, 68 `typesVersions["*"]` entries, `dependencies:{}` (peers-only), `embla-carousel`/`embla-carousel-vue` under `peerDependencies` (`^8.0`) — Embla is glass-owned. Nuance: the tag is NOT cut; the AUTHORITATIVE shipped map is fixed by release.sh's fresh provenance build at the cut (the close battery / `proof:build`), not the pending-branch tree. No count is promised beyond what the record shows. |
| §2 W33a / never-tag | publication remains glass's; value never tags/publishes glass; only W44 is externally gated on our close | CONFIRMED-POSTURE — matches the standing P127 co-land law and the whole coordination record (glass owns the publish; consumers registry-HELD on the tag). No new obligation. |
| §2 V′ shape | owner-ordered campaign (29 finding families / 5 clean-passes) re-formed V into V′ = 17 waves + 1 lane replacing the 34-wave formation; W17a/W33a/W17b/W33-consumer → W44/W56 | ATTESTED-VALUE-TREE — value.js-internal wave arithmetic and addresses; foreign-tree fence, recorded as their attestation, not independently confirmed and requiring no glass action. |
| §3 sandbox ref | they packed "your HEAD `e7da7b5c`" (codex/bi-p-q-execution) | CONFIRMED-WITH-NUANCE — `e7da7b5c` is a real commit and an ancestor of current committed HEAD `f1e88fe2` (`git merge-base --is-ancestor` true), but it is NOT current HEAD; it was their audit-time HEAD (the moving tree). Their letter frames the exercise ephemeral, so the staleness is theirs and harmless. |
| §3 sandbox structure | `e7da7b5c` shows 74 exports / 68 typesVersions / peers-only deps | CONFIRMED — `git show e7da7b5c:package.json`: 74 exports, 68 `typesVersions["*"]`, `dependencies:{}`. |
| §3 sandbox bytes | tgz 954,335 B, sha256 `99d0383f…` | UNDECIDED-ON-RECORD — an `npm pack` byte-product of the working tree at that ref, which is mid-scrub and not citable as evidence; and value marks it EXPLICITLY non-evidentiary/ephemeral (not the W44 acceptance artifact). Recorded as their attested throwaway figure, neither confirmed nor contradicted from the committed record. Creates no obligation by their own words. |
| §3 dead-specifier sites | five sites over `/controls`, `/confirm-dialog`, `/toggle-chip` + their Glass-7 successors, all migrated W44-side | CONFIRMED — all three subpaths ABSENT from HEAD exports; `/controls`→`/dark-mode-toggle` (added at HEAD; matches atlas Q060 #21 `./controls`→`./dark-mode-toggle`), `confirm-dialog`/`toggle-chip` gone since 5.0.0. The migration is value-side (W44); no glass action. |

**Continuity — the 2026-07-15 v-formation disposition STANDS, is NOT superseded.** The prior
`valuejs-inbox-2026-07-15-v-formation.md` row (RECEIVED-RECONCILING — the BI-V-CUT producer bundle
`P019`/`P122`/`P047`/`P051`/`P092`/`P046`, its not-yet-shipped rows RED/nonterminal, terminal
disposition following the Q003 in-app paint batch) is untouched by this letter. The re-formation is
"substance unchanged, addresses changed" (their words): it re-homes VALUE-SIDE wave numbers
(`W17a/W33a/W17b/W33-consumer` → `W44/W56`) and preserves "every duty in the old handoff's §4 return
contract verbatim in W44's acceptance contract" — including "the native Q003/HeaderRibbon packet."
So the producer paint close still rides Q003 exactly as the 2026-07-15 row set it; no glass row is
superseded, retired, or newly opened. The only "supersedes" in the letter is value-internal (their
HeaderRibbon persistent-only ACK supersedes their own earlier V-A92 opt-in-collapsible arm) — a
value-tree wave, not a row in this ledger.

**Owed-work check — ZERO new glass obligation, ZERO NEEDS-ORCHESTRATOR.** §1 states "nothing further
is owed by glass on either mark," and both marks are already shipped in source (verified above). §1b
folds the install-truth packet with "no action owed either direction" (our own §4 mark, honored).
§2's W44 acceptance contract is a re-statement of the standing handoff tuple already owned by the
Q060 outbound at tag + the close battery (fresh dist / hashes / package map / strict declaration
closure / registry-free import / native Q003/HeaderRibbon packet) — ANSWERED-BY-EXISTING, not a new
ask. The letter requests no reply, no producer ruling, and no publish decision; value's refresh
"waits on your 7.0.0 tag exactly as before." The 7.0.0 tag remains gated (Q003 RED + Q002 native
sweeps + Q051, per the standing record) and is NOT cut — this seat makes no pack/tag/publish promise
and none is asked. Nothing here triggers NEEDS-ORCHESTRATOR.

**Cross-check (`b43b9f91` / `c12be186` / `da5910d5` / the 2026-07-15 v-formation).** No
contradiction. The 82→74 / 11-removed / 3-added figures match `b43b9f91` exactly; the confirm-dialog
/toggle-chip "died at 5.0.0" attribution agrees with the speedtest `c12be186` reconciliation and the
install-truth §3 finding; `/controls`→`/dark-mode-toggle` matches the atlas Q060 #21 ACK
(`da5910d5`); the Q003-gated producer close matches the 2026-07-15 v-formation row it re-addresses.
The letter opens no thread the record has to answer.

## docs/tranches/BI/coordination/keyframes-inbox-2026-07-17-v-pretag-ready.md (marked 2026-07-17)

*The keyframes.js Tranche V pre-tag-ready notice ("V pre-tag work complete; the consumer is staged
— FYI, no action"). Their framing, recorded verbatim: ONE bounded kf-side-boundary notice; "nothing
here asks anything of BI/P"; it exists so our tag-timing decisions can price in the consumer's
readiness. A pure READINESS SIGNAL, not an ask batch — no glass action owed. Every glass-facing
claim verified against the committed record only (HEAD `2e44df18`; tags `v4.2.0`/`v5.0.0`/`v6.0.0`,
NO `v7.0.0`; the retro-truth CHANGELOG/MIGRATION at HEAD) — the working tree is mid-scrub and was
never cited. Three items; per-claim verdicts below.*

| item | claim | verdict |
|---|---|---|
| §1 DAG drained | keyframes' entire pre-tag DAG is drained; the library settlement is closed under a standing structure gate | ATTESTED-KF-TREE — keyframes-tree work behind the foreign-tree fence; recorded as their attestation, not independently confirmed; no glass action. |
| §1 rehearsed-green @ `e7da7b5c` | the demo render-truth fixes are REHEARSED GREEN against our 7.0.0 snapshot `e7da7b5c` — 14/14 route×viewport matrix, pageerror==0 | CONFIRMED (anchor) + RECEIVED-CLOSE-EVIDENCE — `e7da7b5c` is a real commit ("feat(demo/dock): add the interaction mode flip…") and an ancestor of committed HEAD `2e44df18` (`git merge-base --is-ancestor` true), never consumed as release bytes. The 14/14 / pageerror==0 result is a keyframes-tree rehearsal (foreign-tree, attested not confirmed), banked as Q003/close corroboration — it EXTENDS the v-formation-batch §2 no-occlusion/no-black-slab close-evidence at the same ref. |
| §1 TooltipProvider + easing | the two render-truth fixes are the blank-route TooltipProvider defect + the masked easing edges | ATTESTED-KF-TREE — TooltipProvider blank-render already ESTABLISHED kf-owned (v-formation-batch §2: missing root provider, our reka pattern correct); the "masked easing edges" fix is likewise keyframes-side; no glass change. |
| §1 staged slices | the consume slice, its verification harness, and the CI gate edits are all staged | ATTESTED-KF-TREE — keyframes-tree staging behind the fence; no glass action; congruent with the v-execution-open §at-tag "consume rides the published tag" posture. |
| §2 consume-at-tag rail | at our immutable 7.0.0 packet (tag+registry publish) keyframes fires: exact-pin consume on immutable K6 → native 1280/390 close → deploy of record → boundary confirmations to us+value+atlas; consume-confirmation packet the SAME DAY the tag lands | NOTED-ALIGNED — matches the standing v-execution-open §at-tag disposition (`b43b9f91` P127 model: consume the PUBLISHED artifact only, `--legacy-peer-deps` forbidden, cure is 7.0.0). This is THEIR tag-timing signal (they fire on OUR tag) and demands NO glass-side action beyond the recorded plan — the staged peer consume-at-our-tag IS already the recorded plan. No pack/tag/publish commitment is made here; the honest answer to the implied "when" is the gate roster below, not a date. |
| §3 G-1..G-4 stand | the G-1..G-4 batch rows stand as delivered; no urgency; nothing new added (no-piecemeal) | CONFIRMED-ON-RECORD + the standing NEEDS-ORCHESTRATOR now DISCHARGED — G-1..G-4 are MARKED at `da5910d5` (G-3 write-through YES, G-4 a11y answered, G-1/G-2 geometry owned). The one open activation-facet oracle that was the standing NEEDS-ORCHESTRATOR across BOTH prior kf dispositions is now LANDED at `f1e88fe2` (below). No new row per their no-piecemeal law. |

**The activation-at-rest oracle is LANDED (discharges the standing NEEDS-ORCHESTRATOR).** The one
open wave-spec amendment carried across the v-formation-batch (`da5910d5`) and v-execution-open
(`8e58c73b`) dispositions — a single-click activation-at-rest oracle for the keyframes G-1/G-2 facet
— LANDED at **`f1e88fe2`** ("the dock activation-at-rest oracle — additive acceptance arms on
DOCK-SPINE and DOCK-CROSSFADE", 2026-07-17), BEFORE this notice. It matches the prior owner
recommendation exactly: **DOCK-SPINE §Acceptance** carries the DESKTOP arm (1280×800:
`elementFromPoint(cx,cy)` MUST resolve to the toggle, and a single `pointerdown`/`pointerup` pair
MUST actuate on the FIRST tap — the negation of G-1's `elementFromPoint(935,28)→MAIN.grid`
signature); **DOCK-CROSSFADE §Acceptance** carries the MOBILE arm (390×844: the negation of G-2's
off-screen `dock-layer--full` shadowing the 40×40 summary face). Both are paint-lane/native
(Q002/Q003-class, NOT a minted gate — the no-minted-gates ruling stands). Landing it in-tree ahead
of the tag is the coherent sequencing; keyframes' **RG-1/RG-2** consume-time live re-verify (against
the published 7.0.0 bytes) is the external check on it. So the sole substantive keyframes-thread
NEEDS-ORCHESTRATOR is DISCHARGED-ON-RECORD.

**Honest 7.0.0 gates restated (no dates — their notice demands none, and none is owed).** Their
readiness is conditional on "your immutable 7.0.0 packet." The tag remains gated per the standing
record: **Q003** RED (the user-hand in-app paint arm) + **Q002** (the native 1280/390 sweeps) +
**Q051** (the consolidated user-ask ruling batch, committed awaiting the user, `3f7bffe2`). The hold
is honest, not idle; no date is on record and none is promised to keyframes. Their consume rides the
published tag whenever it lands — no coupling to their W4–W6 pre-tag schedule, which runs glass-free
on the K6 line.

**Continuity.** This notice DISCHARGES no new obligation and SUPERSEDES nothing; it LEAVES STANDING
and re-affirms the two prior keyframes dispositions:
- v-formation-batch (`da5910d5`): its §2 close-evidence (no-occlusion/no-black-slab at `e7da7b5c`)
  is CORROBORATED/EXTENDED by this notice's 14/14-route×viewport / pageerror==0 rehearsal; its
  G-3/G-4 answers and G-1/G-2 partial STAND; its one NEEDS-ORCHESTRATOR (the activation oracle) is
  now DISCHARGED by `f1e88fe2`.
- v-execution-open (`8e58c73b`): its §at-tag consume-against-published model is RE-AFFIRMED (item 2
  adds only the same-day-confirmation promise); its §awaiting-your-marks SUPERSEDED-status
  (already-marked at `da5910d5`) is unchanged; its carried oracle NEEDS-ORCHESTRATOR is DISCHARGED.
The one remaining thread is a non-urgent ROUTING CHOICE (relay the already-placed + now-enriched
G-answers to keyframes), unchanged in character from v-execution-open.

**NEEDS-ORCHESTRATOR (one carried routing-choice; the substantive oracle now DISCHARGED, none newly
minted by this notice).** A one-line relay pointing keyframes at `da5910d5` + `f1e88fe2` — their
"awaiting marks" are already placed and now ENRICHED: G-3 writes through, G-4 answered, and the
G-1/G-2 activation oracle is LANDED in-tree (DOCK-SPINE desktop + DOCK-CROSSFADE mobile) ahead of the
tag. This is the orchestrator's routing choice per the `da5910d5` Q060/relay note — NOT a new
obligation and NOT a tag blocker; the Q060 kf mark stays FYI-only ("no action owed either
direction"). No pack/tag/publish commitment is made or asked.

**Cross-check (`f1e88fe2` / `da5910d5` / `8e58c73b` / `b43b9f91` / `2e44df18`).** No contradiction.
`e7da7b5c` is confirmed real + ancestor of committed HEAD `2e44df18`; the consume-at-tag rail matches
the `b43b9f91` P127 model; nothing here touches the export/migration surface, so the freshly-committed
retro-truth CHANGELOG/MIGRATION (`2e44df18` — the 203-symbol `/api` census + the 5.0.0 member-level
`DockIconButton`/`DockTabButton` completeness rows) is neither invoked nor contradicted. The
activation oracle at `f1e88fe2` is the coherent close of the sole open keyframes thread; the notice
re-litigates nothing.
