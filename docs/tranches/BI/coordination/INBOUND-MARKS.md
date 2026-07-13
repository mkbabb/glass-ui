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
| M7 | primitives REGISTER (machine-readable canon) | DISCHARGED — LANDED `docs/canon/primitives.json` (BH.B4-canon) |

## docs/tranches/BG/coordination/ATLAS-N-INBOUND.md

| ask-id | ask | disposition |
|---|---|---|
| A1 | GlassPanel `variant`→`tier` rename | DISCHARGED — DONE BH.W-AXIS-GRAMMAR; GlassPanel further RETIRED by BI.W-GLASS-DEDUP |
| A2 | GlassDock `density`→`size` rename | DISCHARGED — DONE BH.W-SIZE-UNIFY |
| A3 | `.text-gilt`→`.gold-shimmer`/`.metal-gold` MIGRATION row | OWNED — asks-and-consumes roster row 5 (`migrate-text-gilt-to-gold-shimmer`) |
| B1 | `@settle` disposition drains at 4.3.0 reconcile | SUPERSEDED — Decision-0 one 5.0.0 cut (4.3.0 reconcile at the cut, user-gated) |
| B2 | viz-subset MANIFEST (named view over register) | DISCHARGED — homed on BH.B4-canon register |
| B3 | consume-time re-verifies (atlas-side pass) | DECLINED-TERMINAL — atlas-side, no ROOT action (foreign-tree fence) |
| B4 | staleness note (GU-DOCK doc) | DECLINED-TERMINAL — informational, no glass action |
| C1 | dock scroll-progressbar per-item stepper API | OWNED — aggregate rim → BI.W-SCROLL-PROGRESS-RIM; per-item `[0,1]` stepper seam → BI.W-SCROLL-PROGRESS-RIM §Inbound (atlas C1/#185) |
| C2 | Card `as-child` directive-root single-root guarantee | OWNED — BI.W-AXES-GATES §Inbound (born-RED two-root bite) |
| C3 | compact 44px tap-floor (coarse pointer) | OWNED — BI.W-DOCK-SPINE (spine/overflow contract) |
| C4 | `./styles/theme` token-only CSS subpath | OWNED — BI.W-STRUCTURE-RESEQUENCE (the flatten export map; #21 outbound carries the table when stable) |
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
| 10 O-E9 | VIRT-CORE document-native `/virtual` (CV substrate + slim viewport) | OWNED — BI.W-VIRTUAL-TRUTH §Inbound (the KEEP/FOLD verdict cites it by name; terminal either way) |
| 11 WG-E | glass TOC/search abstraction on latex-paper | DECLINED-TERMINAL — `/sidebar` (useScrollTracker/useTreeIndex) + `/search` (useFuzzySearch) are the shipped primitives; the latex-paper abstraction is consumer composition; re-trigger: a named ≥2 cross-repo need |
| 12 WG-E | PRIMITIVES-REGISTER manifest | DISCHARGED — BH.B4-canon primitives.json |
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

---

## §Cross-check — every raw-sweep UNOWNED row is now terminal

The raw sweep (`INBOUND-SWEEP.md §UNOWNED`) listed 42 gap rows (40 unique). Each is now DISCHARGED /
OWNED / ANSWERED-BY-EXISTING / DECLINED-TERMINAL above — driven by the two execution-time mints
(`BI.W-BLOB-SEAMS`, `BI.W-XR-PRODUCER-REPAIRS`) + the sixteen §Inbound-acceptance-constraint patches
+ the four MARK-ONLY rulings (O-E11 · O-E3 · O-E6 · WG-E · C4 · M22 · M6 · L15 · PAPER-GRID-BREATHE).
No row reads UNOWNED. The standing liveness contract: a NEW inbox-class coordination file landing
without a marks section REDs `proof:inbound-marks` (I1/I4).
