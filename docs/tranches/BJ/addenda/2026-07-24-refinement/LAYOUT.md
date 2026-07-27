# THE TERMINAL LAYOUT SPEC — mobile + desktop, one chassis

**Provenance.** `wf_ab31a195-57f`, 8 seats, tri-fold (owner Ecoute 2026-07-25 #2): serialized live
census (24 routes × 8 viewports incl. 932×430 landscape + 2560 ultra-wide) + static mechanism census →
Fable ∥ Opus design arms → Fable adjudication → Fable taste bench + Opus build bench → Fable foreman.
Every bench finding adjudicated in the ledger below — no silent drops.

Owning ruling: EXEC-STATE §LAYOUT ECOUTE. Consumes PROPORTION.md as law. Implementation is an
execution-phase wave; nothing here has landed as source.

---

All disputed claims now verified on disk. Authoring the terminal spec.

**modelId: `claude-fable-5`** · FOREMAN · HEAD `bce78c3e` · zero bytes authored · every bench finding adjudicated below—no silent drops

# TERMINAL LAYOUT SPEC — glass-ui demo chassis

## ADJUDICATION LEDGER (both benches, every finding)

| finding | verdict | disposition |
|---|---|---|
| T-B1 + O-B1 cel/rail arithmetic, 768 coincidence | **ADOPT** | cel→21rem, orientation-keyed seat law, rail arm strict `>48rem`, scrollbar term in derivation—§1.1/§1.3 |
| T-B2 wrap-arm dead at blob/aurora | **ADOPT** | wrap-arm re-keys to *unnamed* nearest-container query—§1.5 |
| T-B3 re-key inversion (mobile arm latches in cel) | **ADOPT** | container-mobile-first arm inversion; verified status-dot:185/avatar:231 are mobile arms—§5 kill #13 |
| T-B4 + O-B10 steer-12 ungated; fan reserve is the rail's | **ADOPT** | kill #3 split: block half dies now, inline half conditioned on fan-open probe; steer-12 trio gated—§8 G2, §9 |
| T-B5 landscape arithmetic; env double-pay | **ADOPT** | honest table §4; rail-arm resets left gutter; env currently inert anyway (O-B7) |
| T-B6 + O-B3 `__body` field destructive | **ADOPT** | `__body` flow is **opt-in** `data-flow="grid"`; default flex-col stands (O's data-table screenshot is the falsifier banked) |
| T-B7 hard hu-60 manufactures contrivance | **ADOPT** | banded gate—§8 G5 |
| T-B8 minted thresholds; 96rem formula broken | **ADOPT** | derivations ledger §2; article-max restated as 2×seat-threshold constrained to the 4-up band; "0 minted" boast struck |
| T-B9 order/voids/measure floor | **ADOPT-PART + ROUTE** | row-major order kept (no `dense`); 40ch in-cel floor gated; owner before/after captures §9; pedagogy → W-STORY-* |
| T-B10 kill #7 wholesale contradicts R5 | **ADOPT** | per-site triage: viewport-KEYED variants die; deliberate arity re-expressed as explicit tracks under `@container`—§5 #7 |
| T-B11 story spacing never transposes | **ADOPT** | sweep re-maps story layout spacing to rungs; DOM-audit gate §8 G6; scope stated §5 |
| O-B2 field inert 29%, capped 45% | **ADOPT** | height-cure claim rescoped to measured reach; bare-div unwrap in sweep; singles governed by stage token + first-viewport gate |
| O-B4 SectionPreviewCard span-2; src variants; Tailwind half of fork | **ADOPT** | kill rows #6b/#14b; overlay class enumerated-exempt—§5 |
| O-B5 kill #10 named wrong mechanism | **ADOPT** | verified `@container style(--configurator-size)` contract at ConfiguratorRow.vue:205-222; cure = container sets the custom prop, matchMedia dies—§3 |
| O-B6 curve-gallery 546 no referent | **ADOPT** | verified no `546`, tracks are `18rem` panels; kill #16 struck as specified; 2560 verification owed §9 (unbanked both sides—display cap) |
| O-B7 `viewport-fit=cover` absent, env() inert | **ADOPT** | verified index.html:9; meta gains `viewport-fit=cover`; dock home-indicator re-audit → GF-DOCK |
| O-B8 inline `:style` gap wins | **ADOPT** | verified StoryPage.vue:72,99; kill #4 extends to the bindings + `--story-page-section-gap` chain |
| O-B9 `>` combinator vs `display:contents` | **ADOPT** | verified StoryBodyRenderer.vue:251-260; drop the child combinator—`grid-column` is inert on non-items, descendant selector is safe |
| O-B11 useBreakpoint re-deletion | **ADOPT-RE-RULE** | verified live external consumers + public-surface.spec:217 on disk; "0 call sites" rationale DEAD (the same rg blind spot as the mis-prune). Deletion proceeds on doctrine merit only, ROUTED to LIB-SEAM with consumer addenda—§11 |
| O-B12 one-sided LOC ledger | **ADOPT** | "≤−300" struck; both-sides estimate §6 |
| O-B13 ladder unreachable from portals | **ADOPT** | ladder declares on `:root` in `demo/chassis/layout.css` (demo-bundle-scoped)—§5 |
| O-F1 container fixed-trap (self-falsified) | **RECORD** | Chrome clear; Safari probe owed §9; `contain: inline-size` sliver hazard (shell.css:132-152 precedent) bounded—sections sit in definite tracks; StorySection never legal in shrink-to-fit parents (documented constraint) |
| O confirmations (11-block media census honest; R8/R9 hold; field works where corpus permits) | **RECORD** | retained as-is |

---

## 1 · THESIS

One fluid chassis: a `100dvh` shell grid with an orientation-aware nav seat, a capped article whose only legal widths are four derived measures, a self-packing cel field that turns surplus width into columns instead of line-length, and a single six-rung spacing ladder with exactly one mobile transposition. Mobile is not shrunken desktop—portrait trades the rail for the dock row and steps the ladder down one rung; ultra-wide grows *things*, never lines. One fork survives in the whole product (the configurator studio), and it is CSS that already exists, re-keyed from viewport to container. Everything else that forked—JS matchMedia, duplicated DOM trees, 100+ viewport variants, nine ad-hoc transposition factors—dies.

## 2 · §THE ONE LAYOUT

**Shell grid** (`demo/shell/AppShell.vue:222-272` + `dock-nav.css`):

```css
.demo-app-shell {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) auto;
    grid-template-areas: "rail main" "rail dock";
    block-size: 100dvh;
    overflow: clip;
}
```

`h-screen` (:223) and the `:239` wrapper die. The dock is an in-flow grid row—occlusion-impossible by construction; `dvh` closes the 100vh underflow (the structural shape of steer-12; the diagnosis itself is gated, §8 G2/§9).

**The seat law** (supersedes the width-only rail):

| condition | rail | dock |
|---|---|---|
| `(width > 48rem) and (orientation: landscape)` | ON | ON, unless `(height <= 30rem)` → hidden |
| portrait at any width, or width ≤ 48rem | OFF | ON (sole nav; narrow-short keeps it with `--demo-nav-bottom-inset` tightened one rung) |

Rationale: the rail seats along the **abundant axis**. Portrait's abundant axis is block—nav belongs in the dock row; tablet portrait (768–1024) gets its full width back for the cel field. Landscape phone gets the rail (88px = 9.4% of 932) and sheds the dock (68px = 18% of Safari's 378). Desktop keeps both (R9 stands). The strict `>` kills the exactly-768 coincidence (rail + mobile rungs, O-B1). `.demo-shell-category-menu` visibility re-keys to the same arm. The rail arm also resets the scroller's inline-start gutter to plain `var(--sp-5)`—the rail covers the unsafe edge; no env double-pay (T-B5).

**The article law**—two declarations, no bleed grid (R16 stands):

```css
.story-article { max-inline-size: var(--article-max); margin-inline: auto; }
.story-article :where(p) { max-inline-size: var(--measure-prose); text-wrap: pretty; }
```

Scroller gutter: `padding-inline: max(var(--sp-5), env(safe-area-inset-left, 0px)) max(var(--sp-5), env(safe-area-inset-right, 0px))`—live only once `index.html` gains `viewport-fit=cover` (O-B7; today env computes 0).

**The four measures, each with its stated law:**

| measure | value | derivation |
|---|---|---|
| `--measure-prose` | 66ch | Bringhurst's ideal line |
| `--measure-cel` | **21rem** (336px) | largest min that is ≥2-up at EVERY ≥768 census cell under the seat law: binding constraint 852×393 (rail on, main = 852−88−64 = 700; c ≤ (700−20)/2 = 340px). Accepted seam: 769–772px on classic-scrollbar machines is 1-up (4px band, no census cell). In-cel prose ≈ 42ch ≥ the 40ch floor |
| `--measure-wide` | φ·cel ≈ **34rem** | the aristotelian major for panel-bearing sections that pin their own field |
| `--article-max` | **96rem** | = 2 × the 48rem seat threshold (content stops growing at twice the width where nav earns a rail); constrained to the 4-up band [4c+3g, 5c+4g) = [87.75, 110) rem ✓—at cap, four cels stretch to 369px ≈ 46ch |
| `--dock-shell-max` | 64rem | unchanged (dock-nav.css:98) |

**The cel field** (`StoryPage.vue:70,98` stops being flex-col):

```css
.story-cels, .story-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(var(--measure-cel), 100%), 1fr));
    gap: var(--sp-5) var(--sp-4);
    align-items: start;
}
.story-article [data-span="full"] { grid-column: 1 / -1; }   /* descendant, not child — display:contents (O-B9) */
```

- Items are top-level sections including raw `<section>` slot children (slider.vue:49-107—the decisive worst-cell). `StorySection` gains `span?: "cel" | "full"` (default cel)—the only new chassis API. Row-major source order preserved; no `dense` (T-B9).
- **Measured reach, stated honestly (O-B2):** cures the 68/96 multi-item stories; 25/96 reach 4-up. The 28 single-item stories are mostly stage/composition pages where one full-width section is *correct*; their cure is the stage token + first-viewport gate, and the sweep unwraps the bare-`div` stories the field can't see through.
- `__body` becomes a field **only under opt-in** `data-flow="grid"` (T-B6/O-B3—the data-table side-by-side capture is the banked falsifier). Default stays flex-col.
- The inline `:style` gap bindings (StoryPage.vue:72,99) die or the field's gap never applies (O-B8).

**The height law:** shell `100dvh`; one stage token `--stage-block: min(62svh, 44rem)`—62svh is the golden major of the short viewport (1/φ = 61.8%); 44rem caps svh runaway on 4K portrait. Short arm `min(78svh, 44rem)` (keeps ≥86px chrome on a 393px-tall viewport). Replaces all 8 story-local `vh` envelopes. `DockStage.vue:182` exempt. First-viewport guarantee gated (§8 G5).

**The container contract:** `StorySection` root takes `container: cel / inline-size` (sliver hazard bounded—sections live in definite tracks; StorySection is never legal in a shrink-to-fit parent, per the shell.css:132-152 precedent). Story-local viewport media are illegal in `demo/stories/`; re-keys are **arm-inverted** (T-B3): base = narrow form, `@container (inline-size > X)` = wide form—correct in a cel, correct at full span. **The wrap-arm** re-keys unnamed to the nearest container (T-B2): `@container (inline-size >= 40rem) { … flex-wrap: wrap; overflow: visible; mask: none; }`—fires inside StorySection *and* inside the studio's fork container, reaching the blob mood rail (blob.vue #presets slot) and the aurora gallery. 40rem = measured two-row wrap width of the widest chip rail (~600px) + margin. `FadingScroll` survives for true 1-D content only.

## 3 · §THE FORK RUBRIC

A page-CLASS forks only if it passes **T1 affordance inversion · T2 order inversion · T3 irreducibility**, at cost ≤2 container-query blocks and ZERO new DOM nodes. JS matchMedia, `v-if` on width, duplicated subtrees: forbidden.

| page-class | n | verdict | mechanism |
|---|---|---|---|
| catalog + category landing | 13 | NO FORK | auto-fit cel field; `sm:/lg:` strings die incl. `SectionPreviewCard.vue:29` `sm:col-span-2` → `data-span` (O-B4—span-2 on a 1-track grid is the overflow hazard §1 names) |
| component story | ~77 | NO FORK | cel field + span; tables `span="full"` + FadingScroll (R6 stands) |
| configurator studio | 4 | **THE ONE FORK** | one `@container` block on the studio wrapper: wide = two-pane; narrow = stage `position: sticky; inset-block-start: 0` at `--stage-block`, controls scroll beneath. **Both halves re-key**: `configurator/styles.css:202,259,373` AND the Tailwind half—`Configurator.vue:159,229-232,329` + `EasingPicker.vue:327` (O-B4). Density: the container sets `--configurator-size`; the existing `@container style(--configurator-size)` contract (ConfiguratorRow.vue:205-222) consumes it; `containers/configurator.vue:145-161` matchMedia→prop dies (O-B5) |
| substrate canvas | 3+8 | NO FORK | full-span + stage token + wrap-arm |
| dock stage | 8 | NO FORK | already correct |
| family page | 5 | NO FORK—fork killed | `useTabResponsive` + `<Select>` arm dies (FamilyTabs.vue:64); strip stays mounted under FadingScroll |

Library seams (marked addenda → §11): segmented 640px, LabeledField 36rem, tabs retirement, useBreakpoint. Exempt-enumerated overlay class (the viewport IS their container): `dialog/placement.css:237`, Toaster.vue ×13, Dialog/Drawer header-footer ×4.

## 4 · §PATHOLOGICAL WIDTHS — honest arithmetic (desktop rungs, −17px classic-scrollbar where applicable)

| viewport | seat | main | field |
|---|---|---|---|
| 402×874 | dock | 362 | 1-up; overflow-0 preserved |
| 768×1024 (mobile arm, portrait→dock) | dock | 711 | **2-up** (684) — the B1 cell, cured |
| 810 / 834 portrait | dock | 729 / 753 | **2-up** (692) |
| 852×393 landscape | rail, dock hidden | 700 | **2-up** (692, 8px slack; iOS overlay scrollbars) |
| 932×430 | rail, dock hidden | 780 | 2-up; dock's 18% of the scarce axis reclaimed |
| 1024×1366 portrait | dock | 943 | 2-up |
| 1280×720 / 1440×900 | rail+dock | 1111 / 1271 | **3-up** (1048) |
| 2560×1200 | rail+dock | article capped 1536 | **exactly 4-up** (1404 ≤ 1536 < 1760); prose 66ch immovable; frame symmetric 40% ≤ 42 gate; wrap-arm reflows both hidden rails to 0 |

## 5 · §TRANSPOSITION — one mechanism

`demo/chassis/layout.css`, declared on **`:root`** (reaches teleported overlays—O-B13; demo-bundle-scoped, library untouched—R3 stands):

```css
:root { --sp-1:0.25rem; --sp-2:0.5rem; --sp-3:0.75rem; --sp-4:1.25rem; --sp-5:2rem; --sp-6:3.25rem; }
@media (width <= 768px) {
    :root { --sp-2:0.25rem; --sp-3:0.5rem; --sp-4:0.75rem; --sp-5:1.25rem; --sp-6:2rem; }
}
```

No other file may contain a width-conditional spacing. Bindings as adjudicated (gap map, PAD_CLASS re-map with props kept—R5 stands; hero pads; landing clamps). **Scope (T-B11): the law governs chassis AND story-level layout spacing**—the sweep re-maps static Tailwind spacing on field children to rung refs; component-internal ornament spacing stays with its library tokens. Hierarchy 8:5:3 desktop, 5:3:2 mobile. `--ui-scale` stays pointer-keyed (R8 stands).

## 6 · §KILL LIST (corrected)

| # | dies | site | replaced by |
|---|---|---|---|
| 1 | `h-screen` + wrapper | AppShell.vue:223,239 | shell grid, `100dvh` |
| 2 | 3 pad props + 30rem pad arm + 48rem pad half | dock-nav.css:34-38,105-129 | ladder + scroller gutter; the 48rem block survives ONLY as the seat swap, gaining the orientation term |
| 3a | `scroll-padding-block-start` | dock-nav.css:159 | nothing—dock in-flow (0/192) + dvh |
| 3b | `scroll-padding-inline-start` | dock-nav.css:160 | **CONDITIONED on the fan-open probe** (§9)—the :146-158 doc-record ties it to the rail fan, not the bottom dock (O-B10/T-B4); probe clean → dies with its comment; probe dirty → GF-DOCK owns the reserve |
| 4 | `--story-article-w` branch + BOTH inline `:style` bindings + `--story-page-section-gap` chain | StoryPage.vue:48-53,72,99; story-hero.css:5-6 | `.story-article` + field gap |
| 5 | `max-w-6xl` ×2 | CatalogLanding.vue:13, SectionLanding.vue:22 | article law |
| 6 | landing grid strings + `lg:gap-6` + **`sm:col-span-2`** | :32/:33; SectionPreviewCard.vue:29 (+ `p-4 lg:p-5`, max-block-size override) | auto-fit field + `data-span` |
| 7 | viewport-KEYED variants in demo (103), **per-site triage** (T-B10): field-replaceable → cel field; deliberate-arity → explicit tracks under `@container`; AUDIT.md is the row list, each row gets a verdict | demo/stories | container-received width |
| 8 | 5 chassis clamps + 4 CatalogLanding clamps | story-hero.css:6,53,73,124; CatalogLanding.vue:53,61,87,88 | rung refs |
| 9 | off-series PAD_CLASS/gap values | ShowcaseFrame.vue:23-30, StorySection.vue:31-35 | rung re-map, props kept |
| 10 | matchMedia(720px) + size-prop plumbing | containers/configurator.vue:145-161 | container-set `--configurator-size` via the existing style() contract |
| 11 | useTabResponsive consumption + Select arm | FamilyTabs.vue:64 + 5 pages | mounted strip + FadingScroll |
| 12 | ~~useBreakpoint "0 call sites"~~ **RE-RULED**: deletion on doctrine merit only (viewport composable vs container-first surface), ROUTED to LIB-SEAM with consumer addenda (value.js demo + the 3-import consumer, per dom/index.ts:35-46) + public-surface.spec:217 update; LOC corrected | src/composables/dom/ | container queries |
| 13 | story media ×2, **arm-inverted** re-key | status-dot.vue:185, avatar.vue:231 | base=narrow, `@container (> X)`=wide |
| 14 | `@media 1024px` ×3 **+ the Tailwind half** | configurator/styles.css:202,259,373; Configurator.vue:159,229-232,329; EasingPicker.vue:327 | the ONE FORK |
| 15 | 8 raw-vh envelopes | springs/blob/aurora/fourier/VizStudio/configurator/NotFound/ScrollChoreography | `--stage-block` |
| 16 | ~~546px child~~ **STRUCK** (no referent—O-B6); goo-canvas `max-inline-size:100%` kept; curve-gallery governed by the overflow gate at 2560 (verification owed, unbanked both sides) | blob.vue | gate-driven |
| 17 | sortable-list 2-up wrapper | sortable-list.vue:67 | absorbed |
| 18 | permanent FadingScroll--x on wide rails | blob mood rail, aurora gallery | unnamed wrap-arm |
| 19 | dock on short-wide viewports | seat law | rail carries nav |
| 20 | **NEW**: viewport meta without `viewport-fit=cover` | index.html:9 | cover + GF-DOCK home-indicator re-audit |

**Threshold ledger after:** demo width thresholds {48rem, 768px} + height {30rem} + orientation ×1; src overlay-exempt class enumerated + dialog 40rem. JS layout forks 0 · duplicated trees 0 · transposition factors 1.

**LOC (both sides, estimates—O-B12):** adds ≈90 (ladder 14 · shell 12 · article 6 · field 10 · measures 6 · seat/short arms 12 · wrap-arm 6 · stage 3 · span plumbing 12 · meta 1 · conversions ~10) + the sweep's replacement authoring on the 28 singles and triage rows (uncounted until the cut). Deletes: the 11-block media census, matchMedia, dual tree, 103 variants, 9 clamps, 8 envelopes, pad-prop machinery, inline bindings. Direction negative; **the exact figure is owed at implementation cut, not asserted here.**

## 7 · §FACILITIES LEDGER (Safari 26.4 ✓ / Chromium ✓ unless noted)

`100dvh` · `svh` · `@container` inline-size, named + **unnamed** + `style()` (existing contract) · `repeat(auto-fit, minmax(min(X,100%),1fr))` · range syntax incl. strict `>` · `orientation` media · logical properties · `clamp()` (type/ornament only) · `env(safe-area-*)` via `max()` (**live only after viewport-fit=cover**) · `scrollbar-gutter: stable` (overlay-scrollbar platforms compute 0—the −17px term is real on classic platforms) · `text-wrap: balance/pretty` · `position: sticky`. Deliberately absent: subgrid, `:has()`, named grid lines, size containers, masonry, anchor positioning, JS resize/matchMedia. Owed: real-Safari 26.4 matrix re-run (`scripts/safari-probe.mjs`); the fixed-in-container Safari probe (O-F1).

## 8 · §GATES — all born-RED, each with its biting mutation

| # | gate | born-RED evidence | mutation that bites |
|---|---|---|---|
| G1 | no-H-overflow: `scrollWidth ≤ clientWidth`, every route, **402 AND 2560**, both engines | goo-canvas protrusions; curve-gallery @2560 (claimed, verification owed) | restore `sm:col-span-2` → implicit column at 402 |
| G2 | dock-occlusion: real-Safari 402, dynamic toolbar, the steer-12 trio (Tabs vertical / Search size / TagsInput validation)—last interactive rect.bottom ≤ visualViewport.height at scroll end | steer-12 finding stands at HEAD | restore `h-screen` → 100vh underflow |
| G3 | gutter-waste ceiling: @2560 frame symmetric ≤ 42% AND computed article max == resolved `--article-max` (no accidental caps) | hero variant's 72rem → 55% frame | reintroduce `--story-page-max-inline` |
| G4 | cel-count matrix: slider+search field tracks ≥2 at {768, 810, 852×393, 932×430}, ==4 at 2560 | flex-col at HEAD → 1 track everywhere | cel back to 22rem → 810 goes 1-up |
| G5 | banded hu: ≥3-item stories hu ≥60 at ≤1440, ≥45 at 2560; ALL stories h1+specimen inside first `100svh` at ≥768; in-cel prose ≥40ch | slider @768 hu 41 | revert field to flex-col |
| G6 | transposition singleton: computed `--sp-4` = 12px @402 / 20px @1440; width-conditional spacing blocks in demo == 1; no static Tailwind spacing utility on direct field children | 9 ad-hoc factors at HEAD | add any second spacing media |
| G7 | seat matrix: rail/dock presence at 6 cells {402×874, 768×1024, 852×393, 932×430, 1024×1366, 1440×900} | rail shows at 810 today (48rem inclusive, no orientation term) | drop the orientation term |
| G8 | fork census: JS matchMedia in demo+src layout == 0; duplicated DOM trees == 0; viewport variants in demo/stories == 0 | configurator matchMedia + FamilyTabs dual tree live | revive the Select arm |

## 9 · §PAINT — π/DELTA obligations (route · viewport · property · BOTH engines: Chromium + safari-app)

| probe | route · viewport | property |
|---|---|---|
| steer-12 trio | tabs, search, tags-input · 402×~740, toolbar dynamic | G2 rects; safari-app mandatory |
| fan-open transient | any story · 1440 | rail fan expanded (hover/focus), content scrolled inline-start—occlusion area; **decides kill #3b** |
| wrap-arm | blob @1440, aurora gallery @2560 | hidden-scroll px == 0 |
| curve-gallery + goo canvas | @2560 (headless Chromium for the width; safari-app at max available) | G1—the unbanked cell |
| seat + columns | 852×393, 932×430, 768, 810 | G4/G7; safari-app for insets |
| home-indicator | any route · 402, after `viewport-fit=cover` | dock inset vs env(safe-area-inset-bottom)—new exposure |
| owner sign-off | slider + search · before/after @768 + @1440 | reading-order/void judgment (T-B9)—the owner's call, not a gate's |
| fixed-in-container | drawer story · 1440 safari-app only | O-F1 portability |
| data-table default | @2048 | `__body` remains flex-col without opt-in (regression guard on T-B6) |

## 10 · §REJECTED (cumulative—prior R1-R19 stand except as re-ruled)

R1-R19 carry forward, with: **R12/R13 re-ruled** (22rem falsified by both benches' rail arithmetic → 21rem with the stated constraint set; `--measure-wide` re-derived as φ·cel). **R15 narrowed** (block half only; inline half probe-conditioned). **R17 superseded again**: 96rem retained but on the 2×seat-threshold law + 4-up band constraint, not the broken 72+22+2 sum. Newly rejected: **literal ≤-keyed container re-keys** (falsifier: avatar's desktop arm unreachable in any cel—T-B3); **`__body` as default field** (falsifier: data-table filter/readout/table side-by-side, screenshot banked—O-B3); **"0 call sites" as a deletion rationale** (falsifier: dom/index.ts:35-46's on-disk MISSING_EXPORT history—O-B11); **width-only rail seat** (falsifier: 810<852 makes width unable to separate tablet-portrait from landscape-phone—T-B1/O-B1).

## 11 · §ROUTED

| what | owner |
|---|---|
| dock fan mechanics, kill #3b if probe dirty, home-indicator seat under cover, short-arm dock identity | **GF-DOCK** |
| pedagogic re-sequencing + copy of re-flowed stories | **W-STORY-*** |
| segmented 640px→container, LabeledField 36rem→container, useTabResponsive+Select retirement, useBreakpoint surface cut + consumer addenda (value.js + the 3-import consumer) + public-surface.spec:217 | **LIB-SEAM addenda batch** (consumer-updates ruling: marked addenda in the consumers' tranches) |
| `Tabs.responsive` removal absorption | **slides tranche** |
| library adoption of the spacing series (R3 stands—demo ladder never reaches consumers) | **its own BJ wave** |
| V-A95, chip-CSS | unrelated BJ carries, unchanged |

**Spec status: TERMINAL.** Both blocking bench findings (cel arithmetic, wrap-arm keying) are cured inside the existing architecture—no rejected organ resurrected; the doctrine is smaller than either parent and every constant now carries its derivation. Implementation authors zero bytes until the BJ execution wave picks this up with §9's probe battery as its step 0.