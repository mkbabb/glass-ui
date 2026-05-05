# W0 — Silent Failures

Lane β. Read-only audit. Each row is a class/atom referenced by one or
more consumers (or, for `code-badge`/`blue-shimmer`, surfaced by lane G as
new gaps) where the canonical substrate is either absent, renamed, or
intentionally retired. Every site in the listed consumer paths is
enumerated; resolution is one of (a) ship canonical utility in W2, (b)
name as W5 migration ledger entry, or (c) both.

Schema:

`class/atom | consumer references (file:line) | canonical substrate | decision`

Consumer search paths:
- `/Users/mkbabb/Programming/speedtest`
- `/Users/mkbabb/Programming/fourier-analysis/web`
- `/Users/mkbabb/Programming/words/frontend`
- `/Users/mkbabb/Programming/keyframes.js`
- `/Users/mkbabb/Programming/value.js`
- `/Users/mkbabb/Programming/bbnf-lang/playground`

## Rows

### S1 — `gold-shimmer` (text variant)

| Consumer | Site (file:line) | Notes |
|---|---|---|
| speedtest | `src/components/speedtest/Readout.vue:5` | `class="gold-shimmer char-stagger text-hero-complete font-bold"` — "Complete!" hero |
| keyframes.js | `demo/@/components/custom/animation-controls/controls/AnimationControlsControls.vue:69` | conditional `gold-shimmer` on easing label when detail-active |
| keyframes.js | `demo/@/components/custom/EasingSelect.vue:23` | conditional `gold-shimmer` |
| keyframes.js | `demo/@/components/custom/EasingSelect.vue:59` | conditional `gold-shimmer` |
| value.js | `demo/@/components/custom/dock/menus/ProfileSection.vue:75` | `class="...gold-shimmer"` on user pill |
| value.js | `demo/@/components/custom/dock/Dock.vue:284` | `<span class="gold-shimmer">Admin</span>` |
| bbnf-lang/playground | `src/lib/toneMaps.ts:42` | `if (color === "gold") return "gold-shimmer";` (consumed by `shimmerClass()` at 3 sites: `ExampleSelector.vue:60`, `ExampleSelector.vue:77`, `ControlsBar.vue:81`) |

| Canonical substrate | Status |
|---|---|
| `.gold-shimmer` exists at `src/styles/utilities.css:124–131` | live, working class |
| Synthesis (W2 plan) renames to `.text-shimmer-gold` for the wider shimmer family | rename only, no behaviour change |

**Decision**: **both**. The class works today, so consumers do not see a
silent failure right now. W2 ships `.text-shimmer-gold` as the canonical
member of a unified `.text-shimmer-{vivid,pastel,gold}` family;
`.gold-shimmer` is retired (clean break per `feedback_no_backwards_compat`).
W5 migration ledger names the rename for all six consumers (10 sites
total). Until W2 lands, no consumer is broken.

---

### S2 — `dashed-well`

| Consumer | Site (file:line) | Notes |
|---|---|---|
| value.js | `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:3` | `class="dashed-well"` |
| value.js | `demo/@/components/custom/mix/MixSourceSelector.vue:100` | `class="dashed-well"` |

(zero hits in the other five consumer trees)

| Canonical substrate | Status |
|---|---|
| no `.dashed-well` rule anywhere in `src/styles/` | silent failure today |
| Synthesis gap #29 plans `.well-dashed` utility in W2 | **rename inverted** — gap names it `well-dashed`, consumer wrote `dashed-well` |

**Decision**: **ship in W2** as `.well-dashed`; **W5 migration ledger** for
value.js (2 sites). The class never resolved, so the visual is broken
today; once W2 ships `.well-dashed`, value.js writes a one-line ledger
diff. Two-site consumer-only count clears the ≥2 bar (G invariant 3) only
if a second prospective site lands inside the library — no second site
identified, so this risks single-consumer territory; orchestrator should
confirm the ≥2 bar is met (e.g., a `<DropZone>` story in W4).

---

### S3 — `stagger-children`

| Consumer | Site (file:line) | Notes |
|---|---|---|
| value.js | `demo/@/components/custom/color-picker/controls/ComponentSliders.vue:4` | `class="...stagger-children"` |
| value.js | `demo/@/components/custom/color-picker/controls/ComponentSliders.vue:147` | comment: "// Animation key — increments on color space change to re-trigger stagger-children entrance" |

(zero hits in the other five consumer trees; only one *active* class site)

| Canonical substrate | Status |
|---|---|
| no `.stagger-children` rule anywhere in `src/styles/` | silent failure today |
| canon ships `.char-stagger > .char` (typography.css:300–304) for per-character stagger; no element-stagger primitive | composition gap |
| `useStaggerReveal` composable exists (`src/composables/motion/`) | JS path covers the same intent |

**Decision**: **W5 migration only** — single-consumer surface, ≥2 bar not
met. Direct value.js to either replace with `useStaggerReveal` (composable
already public) or keep a private utility in its own preset. W5 ledger
names the migration; no W2 utility lands. (Aligned with G invariant 3 +
`feedback_overfitting_audit` ≥2 bar.)

---

### S4 — `rainbow-vivid` / `rainbow-pastel` (background classes)

| Consumer | Site (file:line) | Notes |
|---|---|---|
| keyframes.js | `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue:87` | `'rainbow-vivid text-white !border-transparent'` |
| keyframes.js | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:97` | `isPlaying ? 'rainbow-vivid' : 'rainbow-pastel'` |
| keyframes.js | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:130` | `isPlaying ? 'rainbow-vivid' : 'rainbow-pastel'` |

(zero hits in the other five consumer trees)

| Canonical substrate | Status |
|---|---|
| no `.rainbow-vivid` / `.rainbow-pastel` rule anywhere in `src/styles/` | silent failure today |
| `--rainbow-{red..violet}` and `--rainbow-pastel-{red..violet}` tokens exist (tokens.css:458–472), exposed via `@theme` (theme.css:134–140 — vivid only; pastel **NOT** exposed in @theme) | tokens half-exposed |
| Synthesis gap #9 plans `.bg-rainbow-vivid` / `.bg-rainbow-pastel` utilities in W2 + `--rainbow-pastel-*` `@theme` exposure | rename: `bg-` prefix added |

**Decision**: **ship in W2** as `.bg-rainbow-vivid` and `.bg-rainbow-pastel`
(plus `--rainbow-pastel-*` `@theme` exposure to enable
`bg-rainbow-pastel-{hue}` Tailwind utilities, per A axis 4.1). **W5
migration ledger** for keyframes.js (3 sites). Three sites in one consumer
clears single-consumer floor only if a second site lands in glass-ui's
own demo/W4 stories — synthesis gap #9 promises 3 demo sites, so ≥2 bar
holds with library-side stories.

---

### S5 — `active-scale` / `disabled-base`

| Consumer | Site (file:line) | Notes |
|---|---|---|
| words/frontend | `src/components/custom/pwa/PWAInstallPrompt.vue:59` | `active-scale focus-ring` |
| words/frontend | `src/components/custom/pwa/PWAInstallPrompt.vue:116` | `active-scale` |
| words/frontend | `src/components/custom/pwa/PWAInstallPrompt.vue:124` | `active-scale` |
| words/frontend | `src/components/custom/pwa/PWAInstallPrompt.vue:141` | `active-scale` |
| words/frontend | `src/components/custom/pwa/PWANotificationPrompt.vue:66` | `'hover-lift shadow-cartoon-sm active-scale'` (conditional) |
| words/frontend | `src/components/custom/pwa/PWANotificationPrompt.vue:75` | `active-scale` |
| words/frontend | `src/components/custom/sidebar/SidebarWordListItem.vue:8` | `'text-left active-scale focus-ring disabled-base'` |
| words/frontend | `src/utils/animations/constants.ts:153–155, 165` | `hoverLift: 'hover-lift active-scale'`, `hoverLiftMd`, `hoverLiftLg`, `activeScale: 'active-scale'` (4 string-template references that fan out to N consumer call sites — at minimum the four named slots) |
| speedtest | `docs/audits/runs/2026-05-02-glass-ui/a.md:14, 19` | doc-only references in speedtest's audit run; no live class sites |
| speedtest | `docs/audits/runs/2026-05-02-glass-ui/b.md:21` | doc-only reference |

| Canonical substrate | Status |
|---|---|
| `.active-scale` and `.disabled-base` removed in F.W4 (verified — zero `@utility active-scale` / `@utility disabled-base` / `.active-scale {` / `.disabled-base {` rules in `src/styles/*.css`) | retired atoms |
| canon ships `.interactive-item` (`utilities.css:34–57`) which composes hover bg + focus ring + `:active { transform: scale(0.98) }` + `:disabled { opacity / pointer-events }` | one-call canonical replacement |

**Decision**: **W5 migration only — do NOT re-add** (G invariant 11,
synthesis user-overlay #5). The atoms were intentionally removed; canonical
replacement is `.interactive-item` for the four-state contract or Tailwind
one-liners (`active:scale-95`, `disabled:opacity-50 disabled:pointer-events-none`)
for atomic uses. W5 ledger names the words/frontend migration (≥7 active
class sites + 4 string-template references). speedtest references are
doc-only and need no migration.

---

### S6 — `code-badge` (lane G addition)

| Consumer | Site (file:line) | Notes |
|---|---|---|
| bbnf-lang/playground | `src/components/landing/FeatureCards.vue:71` | `class="code-badge"` |
| bbnf-lang/playground | `src/components/landing/DemoCards.vue:96` | `class="code-badge"` |
| speedtest | `docs/audits/runs/2026-05-02-glass-ui/d.md:12` | doc-only — speedtest audit suggests `.code-badge` as a canonical utility for inline code/kbd glyphs (cited at `AppShell.vue:107`, `tabs.vue:107`, `dock.vue:233`, `carousel.vue:124` per the audit row, but those are pre-canonical sites) |

| Canonical substrate | Status |
|---|---|
| no `.code-badge` rule anywhere in `src/styles/` | silent failure today |
| canon ships `.kbd` (utilities.css:134–148) which is the closest sibling — `.kbd` is for keyboard keys, not inline code chips | gap |
| Synthesis pass-2 #26 names `.code-badge` for W2 ship | net-new |

**Decision**: **ship in W2** as `.code-badge`; **W5 migration ledger** for
bbnf-lang/playground (2 sites) + speedtest opportunistic adoption (4
prospective sites cited in speedtest's audit). Two consumer sites + four
prospective speedtest adoptions clears the ≥2 bar.

---

### S7 — `blue-shimmer` (lane G addition)

| Consumer | Site (file:line) | Notes |
|---|---|---|
| bbnf-lang/playground | `src/lib/toneMaps.ts:43` | `if (color === "blue") return "blue-shimmer";` |
| bbnf-lang/playground | `src/components/landing/DemoCards.vue:48` | `shimmerClass: "shimmer-blue"` (note: this is the locally-scoped `.shimmer-blue::before` rule defined at `DemoCards.vue:132`, not the same atom as `blue-shimmer`) |
| bbnf-lang/playground | `src/components/layout/ExampleSelector.vue:60, 77` | `shimmerClass(currentExample.name)` — fans out from the toneMap to 2 sites |
| bbnf-lang/playground | `src/components/layout/ControlsBar.vue:81` | `shimmerClass(currentExample.name)` |

(zero hits in the other five consumer trees; `shimmerClass()` returns
`"blue-shimmer"` at runtime when language === "CSS")

| Canonical substrate | Status |
|---|---|
| no `.blue-shimmer` rule anywhere in `src/styles/` | silent failure today |
| canon ships `.gold-shimmer` (utilities.css:124–131) but not a blue counterpart | half-family |
| `--shimmer-blue-{dark,mid,light}` claimed in DESIGN.md:752–755 but **not declared** in `tokens.css` (see W0-design-md-drift.md row 47) | doc/source mismatch |
| Synthesis pass-2 #26 names `.blue-shimmer` for W2 ship | net-new |
| Open question: does the planned W2 `.text-shimmer-{vivid,pastel}` family cover this? — the family is sweep-of-rainbow gradient, not a blue-tone shimmer; `.blue-shimmer` needs its own dark/mid/light gradient identical to the `.gold-shimmer` recipe but in blue | likely separate utility |

**Decision**: **ship in W2** as `.blue-shimmer` (with `--shimmer-blue-*`
tokens declared in W1) — symmetric to `.gold-shimmer`. W5 migration is
zero-touch since the consumer already references the class name. Three
runtime call sites (via `shimmerClass()`) clear ≥2; symmetry with
`.gold-shimmer` is the strongest argument. **`.text-shimmer-{vivid,pastel}`
does NOT cover this** — those are rainbow-sweep utilities, not single-hue
shimmers. Flag for orchestrator: rename `.gold-shimmer` → `.text-shimmer-gold`
in S1 should be paired with `.blue-shimmer` → `.text-shimmer-blue` for
family consistency.

---

## Summary

| Row | Atom | Consumers | Sites | Decision |
|---|---|---:|---:|---|
| S1 | `gold-shimmer` | 4 (speedtest, keyframes.js, value.js, bbnf-lang/playground) | 10 | both — ship rename in W2, ledger for 6 consumers |
| S2 | `dashed-well` | 1 (value.js) | 2 | ship in W2 as `.well-dashed`, ledger for value.js |
| S3 | `stagger-children` | 1 (value.js) | 1 + 1 comment | W5 migration only — below ≥2 bar |
| S4 | `rainbow-vivid` / `rainbow-pastel` | 1 (keyframes.js) | 3 | ship in W2 as `.bg-rainbow-{vivid,pastel}` + `@theme` exposure, ledger for keyframes.js |
| S5 | `active-scale` / `disabled-base` | 1 active (words/frontend); 1 doc-only (speedtest) | 7 active + 4 template references | W5 migration only — atoms removed in F.W4, do not re-add |
| S6 | `code-badge` | 2 (bbnf-lang/playground active; speedtest prospective) | 2 + 4 prospective | ship in W2 as `.code-badge`, ledger for bbnf-lang + speedtest |
| S7 | `blue-shimmer` | 1 (bbnf-lang/playground via `shimmerClass()`) | 3 runtime | ship in W2 as `.blue-shimmer` + `--shimmer-blue-*` tokens in W1 |

## Cross-row contradictions

- **S1 vs S7 family naming**: synthesis renames `.gold-shimmer` →
  `.text-shimmer-gold` (a unified `.text-shimmer-{gold,vivid,pastel}` family).
  S7 plans `.blue-shimmer` as a literal name. If the family is `text-shimmer-*`,
  the blue counterpart should be `.text-shimmer-blue`. Flagged for
  orchestrator before W1/W2 dispatch.
- **S2 (`dashed-well`) and S3 (`stagger-children`)** are both single-consumer
  (value.js). The synthesis ≥2 bar (G invariant 3) is met for S2 only via
  prospective library-side use; otherwise both are consumer-preset
  territory. Orchestrator should confirm the W4 story plan includes a
  `.well-dashed` use site, otherwise S2 collapses to W5 migration only.
- **S5 (`active-scale` / `disabled-base`) vs speedtest audit doc**:
  speedtest's `2026-05-02-glass-ui` audit cites `.disabled-base` as a
  *recommended* substrate; that audit predates F.W4's removal. Speedtest
  doc references are stale — no live class sites in speedtest src/, so no
  W5 ledger row needed for speedtest. Words/frontend is the only real
  migration target.
