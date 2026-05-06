# J — Post-close Audit: γ — Doc-drift

**Authored**: 2026-05-06.
**Lane**: γ (doc-drift).
**Mode**: READ-ONLY against source / `docs/tranches/J/`; WRITE only this file.
**Scope**: walk DESIGN.md / CLAUDE.md / README.md / J.md / wave-spec status lines / PROGRESS.md against current source state. Cite every claim file:line.

## Summary

DESIGN.md is mostly current (post-v0.8.0 edits already absorbed the wash/quiet/resting/floating ladder + Badge size axis); two J primitives — `<Configurator>` (W4) and `<CarouselPager>` siblings (W6) — are entirely undocumented, and `<DockPopover>` still sits in the Components table + Custom catalog despite W3 retirement. CLAUDE.md is severely stale: pre-v0.8.0 file-structure ladder, old composables shape, no J primitives, lists `DockPopover` + the retired `glass-{subtle..elevated}` ladder, omits `metaballs/`-rename framing, omits the `configurator` subpath. README.md is even more stale (pre-J entirely; advertises 32 components, the old 4-tier ladder, missing dependencies). All 8 wave-spec **Status** lines still read "open"/"pending" — none updated to "closed". PROGRESS.md commit citations all match `git log` and there are no orphan J commits. The recovery-diary scrub yields 3 hits in src/ (`src/index.ts:5`, `src/styles/tokens.css:339-342`); strict reading is "zero hits"; spirit reading is "no recovery-diary annotations" — context comments. γ recommendation: **ABSORB-then-clean** — wave-status lines + DockPopover residue + Configurator/CarouselPager omission + CLAUDE/README rewrite are non-trivial drift requiring W7 absorb, not deferral.

---

## 1. DESIGN.md drift table

DESIGN.md path: `/Users/mkbabb/Programming/glass-ui/DESIGN.md`.

| § / topic | Expected (per J close + claudeMd) | Status | Evidence |
|---|---|---|---|
| Glass-ladder (wash/quiet/resting/floating/overlay) | Documented post-v0.8.0 | MATCHES | `DESIGN.md:200-219` (5-tier table + dock-blur token note) |
| `<Configurator>` primitive (W4 Lane A) | Documented under custom catalog | MISSING | absent — `rg -in configurator DESIGN.md` returns only Storybook references (lines 971, 994); no entry under `## Component Catalog`. Custom catalog `DESIGN.md:815` has no `configurator` |
| `<HoverPopover>` `keepDockOpen` extension prop (W3 Lane B) | Documented in HoverPopover spec | MISSING | `DESIGN.md:838` HoverPopover spec lists `content / side / align / 250ms open / 150ms defer-on-leave`; no mention of `keepDockOpen` extension or dock-keep-open sink wiring |
| `<CarouselPager>` / `<CarouselDots>` / `<GlassCarouselPager>` (W6 Lane C.2) | Documented under ui catalog | MISSING | `DESIGN.md:811` catalog row lists `carousel · ...` only; no per-pager spec; the three W6-shipped primitives are absent |
| `<Badge>` size axis (W6 Lane A) | Documented in Badge § Sizes | MATCHES | `DESIGN.md:451-468` ships `### Sizes (J.W6 size axis)` table + `## Section-tone recipe` (Option B per W6 close) |
| `<Slider>` size axis + `glass-pill` / `glass-cartoon` variants (W5 Lane A) | Documented in Slider variants table | DRIFT | `DESIGN.md:589-593` Slider variants table still shows only `standard / spectrum / timeline`; size axis (`sm/md/lg`) and the new `glass-pill` + `glass-cartoon` variants absent. PROGRESS.md `:117-122` claims 5 variants × 3 sizes shipped |
| Section-tone tint recipe per W6.A Option B | DESIGN.md `## Badges § Section-tone recipe` | MATCHES | `DESIGN.md:462-468` documents the canonical triplet `bg-section-N/15 text-section-N border-section-N/30` + outline-variant pairing |
| NumberField pill radius + Button-as-child (W5 Lane B) | NumberField spec note | MISSING | NumberField has no dedicated spec block in DESIGN.md; `--radius-input` semantic is documented at `DESIGN.md:139` but the W5 NumberField default-radius switch + Button-asChild composition is undocumented |
| StoryChassis defer | DESIGN.md or J residue document | MATCHES (by absence) | StoryChassis was deferred per W5.D substrate-without-consumer (`PROGRESS.md:136-141`); DESIGN.md correctly does not list it |
| DockPopover retirement | Components table + custom catalog dropped | DRIFT | `DESIGN.md:491` Components table still lists `DockPopover` row; `DESIGN.md:815` Custom catalog still lists `DockPopover` in dock package contents. W3 Lane B retired the component (PROGRESS.md `:84`) — DESIGN.md is stale |
| Drag-keep-open contract (W5 Lane C) | Slider drag → dock `data-held` documented | MISSING | no `data-held` / `dockHeld` / drag-keep-open contract described in DESIGN.md (Slider variants section silent; Dock substrate section silent) |
| `<HoverPopover>` instrument-cluster axis citation | claudeMd lists it as Q-tranche addition | MATCHES | `DESIGN.md:838` documents HoverPopover semantics; instrument-cluster axis ownership is a CLAUDE.md axis question, not DESIGN.md |
| Button variant table — `danger-subtle` retired (W6 C.1) | Variant table omits `danger-subtle` OR notes retirement | DRIFT | `DESIGN.md:410` Button variant table still lists `danger-subtle` row; `DESIGN.md:581` Semantic-variant intent list still names `danger-subtle`. Confirmed retired in `src/components/ui/button/index.ts` (rg returns 0 hits). DESIGN.md not updated |

**DESIGN.md drift count: 7 drift/missing items (5 missing, 2 drift), 4 matches.**

---

## 2. CLAUDE.md drift table

CLAUDE.md path: `/Users/mkbabb/Programming/glass-ui/CLAUDE.md` (project-instruction file shown in claudeMd).

The on-disk CLAUDE.md is severely stale relative to claudeMd context — the `claudeMd` shown in this conversation reflects the canonical post-J state (37 ui packages, 37 custom packages, 13 composable groups, all axes named); the file at `/Users/mkbabb/Programming/glass-ui/CLAUDE.md` is the pre-J one.

| § / topic | Expected | Status | Evidence |
|---|---|---|---|
| File structure — `ui/` count | 39 ui packages (per current source `ls src/components/ui/` — see below) | DRIFT | `CLAUDE.md:18` says "39 shadcn-vue base component packages" but the file's enumeration is missing items. `ls src/components/ui/` returns 39 dirs: accordion, alert, avatar, badge, button, card, carousel, cartoon-card, checkbox, collapsible, combobox, command, context-menu, data-table, dialog, drawer, dropdown-menu, hover-card, input, label, multi-select, notification, number-field, popover, progress, radio-group, scroll-pane, select, separator, sheet, skeleton, slider, switch, table, tabs, tags-input, textarea, toast, toggle, toggle-group, tooltip. The header says 39 but the enumeration block omits at least: cartoon-card, multi-select, scroll-pane, tags-input |
| File structure — `ui/carousel/` lists W6 primitives | `CarouselPager.vue`, `CarouselDots.vue`, `GlassCarouselPager.vue` listed | MISSING | `CLAUDE.md:25` lists only `carousel/` with no per-file enumeration; W6 lane C.2 shipped 3 primitives (`src/components/ui/carousel/{CarouselPager,CarouselDots,GlassCarouselPager}.vue`) — undocumented |
| File structure — `custom/configurator/` listed | New W4 package surfaced | MISSING | `CLAUDE.md:59-83` enumerates 26 custom packages but `configurator/` is absent. `ls src/components/custom/configurator/` returns 5 files (Configurator.vue, ConfiguratorLayer.vue, ConfiguratorRow.vue, useConfiguratorState.ts, index.ts) |
| File structure — references `DockPopover.vue` | Should be removed (W3 Lane B retired the component) | DRIFT | `CLAUDE.md:64` lists `DockPopover.vue` in dock/ enumeration; the file no longer exists (PROGRESS.md `:84`; rg confirms 0 hits in src/ + demo/) |
| File structure — `blob/` directory | Should be `metaballs/` (renamed per PROGRESS.md `:99`) | DRIFT | `CLAUDE.md:78` correctly lists `metaballs/` in custom enumeration. claimed-`blob/` reference appears in claudeMd context only; on-disk CLAUDE.md does not have `blob/` directory entry. MATCH (resolved by current on-disk state — but the on-disk CLAUDE.md is otherwise stale). Note: `rg -i "blob" src/components/custom/` shows blob still appears in metaballs `types.ts` as a property name (`blobCount`, `MAX_BLOBS`), which is API-accurate |
| File structure — composables list | Should list 13 top-level groups (per claudeMd) | DRIFT | `CLAUDE.md:85-94` lists 9 groups + `useGlobalDark` + `useKeyboardShortcuts` only. Missing: `useInterval`, `useResizeObserver`, `useTimer`, `useTouchGate`, `utils/` (cssVar shipped W1), `__tests__/`. `ls src/composables/` confirms 14 entries on disk |
| Subpath section — `@mkbabb/glass-ui/configurator` | Listed as new subpath | MISSING (and inconsistent) | CLAUDE.md has no subpath enumeration; the closest is `:194-197` import examples. `vite.library.ts:42` has the `configurator` entry, but `package.json` "exports" field does NOT include `./configurator` (only the older subpaths). This is a real cross-file drift: subpath built but not exposed |
| Design Axes section — invariant 10 (visual-load-bearing-ness) | Documented in axes section per J | MISSING | `CLAUDE.md` (on-disk) has no Design Axes section at all. claudeMd has the canonical 4-axis description; on-disk CLAUDE.md ends at consumer-wiring at `CLAUDE.md:205` with no axes content |
| Glass-ladder names — should be wash/quiet/resting/floating/overlay | Post-v0.8.0 | DRIFT | `CLAUDE.md:100, 188-191` still lists `.glass-{subtle,default,medium,elevated}` ladder, `--glass-opacity-subtle` overrides. Pre-v0.8.0 vocabulary throughout |
| Button variants list | Post-J: `danger-subtle` retired, `glass-wash` etc. | DRIFT | `CLAUDE.md:157` lists "default, destructive, outline, secondary, ghost, link, glass, glass-subtle" — pre-v0.8.0 (says `glass-subtle`, not `glass-wash`); also misses `accent`, `ai`, `link` variant complexity per actual button index |
| Dependencies — vaul-vue, lucide-vue-next, embla-carousel-vue, keyframes.js | Listed as runtime peer deps | DRIFT | `CLAUDE.md:139` says "Dev-only: `vaul-vue` (drawer), `lucide-vue-next` (icons)". Per claudeMd these are runtime peer deps. embla-carousel-vue + keyframes.js absent entirely |
| Re-export of W2 cssVar() composable | Listed in composables/utils | MISSING | `CLAUDE.md:85-94` lacks `utils/` composable group; W1 shipped `useCssVar`/`cssVar` per PROGRESS.md `:42-46` |

**CLAUDE.md drift count: 11 drift/missing items, 1 match. The on-disk CLAUDE.md predates v0.8.0; full rewrite required.**

---

## 3. README.md drift table

README.md path: `/Users/mkbabb/Programming/glass-ui/README.md`.

| § / topic | Expected | Status | Evidence |
|---|---|---|---|
| Component count | Post-J: ~39 ui + 24+ custom packages | DRIFT | `README.md:7` says "32 shadcn-vue components"; current `ls src/components/ui/` is 39 dirs |
| Glass-ladder utilities | wash/quiet/resting/floating/overlay | DRIFT | `README.md:8` lists `.glass-subtle`, `.glass-default`, `.glass-medium`, `.glass-elevated`. Post-v0.8.0 retired |
| Glass token table | wash/quiet/resting/floating/overlay tier table | DRIFT | `README.md:107-114` table titled "Four tiers" with subtle/default/medium/elevated; post-v0.8.0 it's 5 tiers |
| Composables list | Post-W1 includes cssVar, ResizeObserver, Interval, etc. | DRIFT | `README.md:14` "timer, keyboard shortcut, touch gate, dark-mode, glass-renderer, motion, sortable, pagination, and virtual-list substrate" — missing W1 cssVar, ResizeObserver |
| Examples reference primitives | Post-J examples don't have to mention every new primitive | MATCHES | Examples are minimal (`Button`, `GlassDock`, `DarkModeToggle` per `:25-27`); none of the imports reference retired components |
| Token override example | Post-v0.8.0 — `--glass-opacity-subtle` retired | DRIFT | `README.md:38-39` shows `--glass-opacity-subtle: 0.82; --glass-blur-default: blur(12px);` — both tokens are retired in the wash/quiet/resting/floating ladder |
| Structure tree — `dock/`, `aurora/`, `controls/` | Post-J: 24+ custom packages | DRIFT | `README.md:74-76` lists only 3 custom packages (dock, aurora, controls); current state has 28 (configurator, metaballs, etc.) |
| Dependencies — vaul-vue/lucide-vue-next as peer | Listed as runtime peer | DRIFT | `README.md:175-180` lists 7 peer deps but excludes `lucide-vue-next`, `vaul-vue`, `embla-carousel-vue`, `@mkbabb/keyframes.js` (per claudeMd canonical 11 peer deps) |

**README.md drift count: 7 drift items, 1 match. Wholly stale relative to v0.8.0 + J.**

---

## 4. J.md drift table

J.md path: `/Users/mkbabb/Programming/glass-ui/docs/tranches/J/J.md`.

| § / topic | Expected | Status | Evidence |
|---|---|---|---|
| Wave Schedule status column — all 7 waves closed | Per `git log`: W0..W6 closed, W7 in progress | DRIFT | `J.md:74-82` Wave Schedule table column "Status" shows: W0 "open", W1 "pending W0", W2 "pending W1", W3 "pending W1", W4 "pending W1", W5 "pending W3", W6 "pending W2", W7 "pending W3 + W4 + W5 + W6". None reflect close. PROGRESS.md `:184-191` correctly shows W0–W6 closed; J.md table not updated |
| Cross-tranche debt: `<StoryChassis>` deferred | Per W5.D defer | DRIFT | `J.md:113-122` lists "Cross-tranche debt + explicit deferrals" but does NOT include the W5.D StoryChassis deferral. PROGRESS.md `:136-141` records the defer. J.md should absorb |
| Audacious primary-CTA still flagged for K | Yes | MATCHES | `J.md:115` `**Audacious primary-CTA variant** (R5 gap row 8) — formally deferred to K` |
| Card pane variant glass-subtle bypass disposition | Resolved per W0 §F item 4 (DROPPED) | DRIFT | `J.md:116` lists the disposition as "DESIGN.md decision in W2: either consume `glass-subtle` (clean break) or document the bypass as canonical. W2 picks; no forward defer." Per PROGRESS.md `:63` step 7 was DROPPED. J.md text untouched |
| Drag-keep-open API extensibility (Slider only or NumberField too) | Resolved per W5.C (Slider added; W3 collapsed DockPopover; now 2 consumers via Slider + HoverPopover keepDockOpen) | DRIFT | `J.md:120-121` says "current consumers: Slider, DockPopover (post W3 collapse: just Slider). 1 consumer is below the bar; W5 ships `<NumberField keep-dock-open>` consumer ... OR formally documents the API as Slider-only." Per PROGRESS.md `:124-128`, W5.C wired Slider + dock-substrate response (HoverPopover keepDockOpen via W3.B). NumberField did not consume. J.md doesn't acknowledge resolution |
| `<Tooltip>` rounded-lg vs rounded-xl per W2 | W2 consumed `--radius-tooltip` | DRIFT | `J.md:118` text marks W1+W2 as the action items; W2 consumed it (PROGRESS.md `:63` "8 overlays use semantic radius"). Not crossed off |
| WAAPI cssVar() consumer at BouncyToggle | W2 consumed | DRIFT | `J.md:119` action item; W2 confirmed consumed (PROGRESS.md `:65`); not crossed off |
| `prefers-reduced-motion` runtime gate at BouncyToggle | W2 absorbed | DRIFT | `J.md:121` action item; W2 confirmed (PROGRESS.md `:65` "BouncyToggle WAAPI via cssVar() + prefers-reduced-motion early-out"). Not crossed off |

**J.md drift count: 7 drift items, 1 match. Wave-status table is the headline drift; cross-tranche debt list reads as still-open even though every item resolved.**

---

## 5. Wave-spec status line table

| File | Status line | Reality (per PROGRESS.md + git log) | Result |
|---|---|---|---|
| `docs/tranches/J/waves/W0.md:6` | `**Status**: open.` | closed @ d8239f2 (PROGRESS.md `:185`) | DRIFT |
| `docs/tranches/J/waves/W1.md:6` | `**Status**: pending W0.` | closed @ c6b7df0 (`:186`) | DRIFT |
| `docs/tranches/J/waves/W2.md:6` | `**Status**: pending W1.` | closed @ e563d7a (`:187`) | DRIFT |
| `docs/tranches/J/waves/W3.md:6` | `**Status**: pending W1.` | closed @ deba31d (`:188`) | DRIFT |
| `docs/tranches/J/waves/W4.md:6` | `**Status**: pending W1.` | closed @ 499326a (`:189`) | DRIFT |
| `docs/tranches/J/waves/W5.md:6` | `**Status**: pending W3.` | closed @ 3a4371d (`:190` shows "this commit" — actual sha 3a4371d per `git log`) | DRIFT |
| `docs/tranches/J/waves/W6.md:6` | `**Status**: pending W2.` | closed @ 76525e1 (`:191` shows "next" — actual sha 76525e1 per `git log`) | DRIFT |
| `docs/tranches/J/waves/W7.md:6` | `**Status**: pending W3 + W4 + W5 + W6.` | open (W7 currently running close ceremony) | MATCHES (W7 still open until final commit) |

**Wave-spec drift count: 7/8 wave specs have stale status lines. W7 is correctly open.**

---

## 6. PROGRESS.md ↔ git log reconciliation

`git log master --format="%h %s" | head -10` (filtered to J commits):

```
76525e1 feat(tranche-j/w6): Badge size axis + FuzzySearch rewrite + clearCache + Carousel pager substrate
3a4371d feat(tranche-j/w5): Slider variants + NumberField pill + drag-keep-open + StoryChassis defer
499326a feat(tranche-j/w4): Configurator primitive + aurora chrome refit + metaballs configurator + speedtest preset
deba31d feat(tranche-j/w3): dock cornerstone + DockPopover→HoverPopover + overflow + blur
e563d7a feat(tranche-j/w2): vocab.α+β — overlay convergence + interactive reach-in
c6b7df0 feat(tranche-j/w1): vocab.γ — token + utility preconditions + cssVar composable
d8239f2 feat(tranche-j/w0): reconciliation + strengthened 6-agent audit precept
5baceb5 chore(docs/tranches): consolidate H + I + J planning onto master
118824d chore(tranche-j/open): land J plan + 8 wave specs + 6 research deliverables
```

PROGRESS.md cited commits at `:185-191`:

| Wave | PROGRESS.md cite | git log | Match? |
|---|---|---|---|
| W0 | `d8239f2` | `d8239f2 feat(tranche-j/w0): reconciliation + strengthened 6-agent audit precept` | YES |
| W1 | `c6b7df0` | `c6b7df0 feat(tranche-j/w1): vocab.γ — token + utility preconditions + cssVar composable` | YES |
| W2 | `e563d7a` | `e563d7a feat(tranche-j/w2): vocab.α+β — overlay convergence + interactive reach-in` | YES |
| W3 | `deba31d` | `deba31d feat(tranche-j/w3): dock cornerstone + DockPopover→HoverPopover + overflow + blur` | YES |
| W4 | `499326a` | `499326a feat(tranche-j/w4): Configurator primitive + aurora chrome refit + metaballs configurator + speedtest preset` | YES |
| W5 | `3a4371d` (per `audit/J-pre-close.md:14`; PROGRESS.md `:190` says "this commit") | `3a4371d feat(tranche-j/w5): Slider variants + NumberField pill + drag-keep-open + StoryChassis defer` | YES (J-pre-close.md ledger anchors the actual hash) |
| W6 | `76525e1` (per `audit/J-pre-close.md:15`; PROGRESS.md `:191` says "next") | `76525e1 feat(tranche-j/w6): Badge size axis + FuzzySearch rewrite + clearCache + Carousel pager substrate` | YES |

**Citation result: zero orphan commits, zero phantom citations. The PROGRESS.md status table at `:182-191` has cosmetic drift only ("this commit"/"next" placeholders should resolve to `3a4371d` and `76525e1` per `audit/J-pre-close.md`). Authoritative hashes are present in `audit/J-pre-close.md:6-16`, so this is documentation-style polish, not citation drift.**

---

## 7. Recovery-diary scrub

Canonical grep at HEAD:

```
$ rg -i "H\.W[0-9]|G\.W[0-9]|O\.W[0-9]|pass-N|silent.failure|scope reveal|user.direction overlay|stash regression" src/ demo/
src/index.ts:5: // Custom composites — instrument-cluster chassis (O.W2.7)
src/styles/tokens.css:340:       tranche N.W1), again in v0.5.1 (speedtest tranche O.W2) — because the
src/styles/tokens.css:343:       through it. Dropped from 0.42 → 0.32 in v0.5.1 (speedtest O.W2)
```

3 hits in src/, 0 in demo/.

### Adjudication: strict vs spirit

**Per LESSONS-LEARNED 2026-05-05 "Recovery-Diary Scrub Is Binary":**

> "recovery-diary scrub is binary at close — zero `H\.W` / `G\.W` / `O\.W` / `pass-N` / `silent-failure` / 'scope reveal' / 'user-direction overlay' / 'stash regression' annotations in src/ or demo/. Tranche-history annotations belong in `docs/tranches/`."

**Strict reading**: zero hits required. **3 hits ≠ zero. STRICT FAIL.**

**Spirit reading**: the rule's intent is to prevent recovery-diary annotations (post-incident annotations like "rolled back from", "stash regression after pass-2", "fix for silent failure during O.W2"). The 3 hits at HEAD are:

1. `src/index.ts:5` — `// Custom composites — instrument-cluster chassis (O.W2.7)` — a category-label comment marking that the `instrument-cluster` cohort originated in tranche O.W2.7. Not a recovery annotation; it's a section-header.
2. `src/styles/tokens.css:339-343` — multi-line comment explaining the historical halving of dock-blur radii ("speedtest tranche N.W1", "speedtest tranche O.W2"). This is a *change-log inside the token comment* — it documents why the radius is the value it is, citing the prior tranches that adjusted it.

**Spirit reading**: these are not recovery-diary annotations. They are tranche-historical context. Pre-close ledger flagged them as "historical-context comments" (`audit/J-pre-close.md:91-95`) and forwarded the call to γ.

**γ adjudication**: per the LESSONS-LEARNED entry, the rule is **binary** ("zero hits regardless of context"). The author's stated rule is unambiguous and was added with knowledge of these exact kinds of hits — the rule explicitly says "Tranche-history annotations belong in `docs/tranches/`". The `src/index.ts:5` category label and the `tokens.css:339-343` token-history comment fall squarely under "tranche-history annotations".

**Recommendation**: **STRICT VIOLATION. Absorb in W7.**

- `src/index.ts:5` → drop the `(O.W2.7)` parenthetical from the category comment. The comment can read `// Custom composites — instrument-cluster chassis` without losing meaning. Tranche origin lives in `docs/tranches/O/`.
- `src/styles/tokens.css:339-343` → rewrite the comment to explain the *current* state ("--glass-blur-{tier}-radius values are calibrated to feather rather than slab") without citing past tranche halvings. The tranche history lives in `docs/tranches/N/` + `docs/tranches/O/`.

If absorb is undesirable (e.g., commit-budget constraints), re-bind the precept explicitly with a "context-comments allowed" exception at the LESSONS-LEARNED level. The current rule does not allow the exception, and γ does not have the authority to grant it.

---

## 8. Doc-drift items requiring W7 absorb

| ID | Item | Source-of-truth | Priority |
|---|---|---|---|
| γ-1 | Wave-spec **Status** lines (7/8) read "open"/"pending" | `docs/tranches/J/waves/W{0..6}.md:6` | P1 — absorb |
| γ-2 | J.md Wave Schedule **Status** column (`J.md:74-82`) has zero "closed" entries | `J.md:74-82` | P1 — absorb |
| γ-3 | DESIGN.md Components table + custom catalog still list `DockPopover` | `DESIGN.md:491, 815` | P0 — block close (silent-failure surface for downstream reference) |
| γ-4 | DESIGN.md Button variant table still lists `danger-subtle` (retired W6.C.1) | `DESIGN.md:410, 581` | P0 — block close (consumers reading the canon will reach for a non-existent variant) |
| γ-5 | DESIGN.md Slider variants table missing size axis + glass-pill + glass-cartoon (W5.A) | `DESIGN.md:589-593` | P0 — block close (W5 deliverable undocumented in the canon) |
| γ-6 | DESIGN.md Custom catalog missing `<Configurator>` (W4) + `<CarouselPager>` family (W6) | `DESIGN.md:807-815` | P1 — absorb |
| γ-7 | DESIGN.md `<HoverPopover>` spec missing `keepDockOpen` extension prop (W3.B) | `DESIGN.md:838` | P1 — absorb |
| γ-8 | CLAUDE.md (on-disk) wholly pre-v0.8.0 + pre-J — full rewrite required | `/CLAUDE.md` | P1 — absorb (rewrite to mirror claudeMd canonical text) |
| γ-9 | README.md wholly pre-v0.8.0 + pre-J | `/README.md` | P1 — absorb (rewrite glass ladder + counts + dependencies) |
| γ-10 | `package.json` "exports" field missing `./configurator` despite `vite.library.ts:42` shipping the entry | `package.json` exports + `vite.library.ts:42` | P0 — block close (subpath built but not exposed) |
| γ-11 | J.md cross-tranche debt list reads as if W2/W3/W5 items are still open | `J.md:113-122` | P2 — defer (low-cost cleanup; can absorb in J FINAL.md instead) |
| γ-12 | PROGRESS.md `:190-191` placeholder text ("this commit"/"next") instead of `3a4371d`/`76525e1` | `PROGRESS.md:189-191` | P2 — defer (cosmetic; authoritative hashes in `audit/J-pre-close.md:6-16`) |
| γ-13 | Recovery-diary scrub: 3 hits in src/ — strict violation | `src/index.ts:5`; `src/styles/tokens.css:339-343` | P0 — block close per LESSONS-LEARNED 2026-05-05 binary rule |

---

## 9. Recommendation

**ABSORB-then-clean.**

The drift surface is too large + too source-affecting to mark γ clean and proceed to FINAL.md. Five P0 items (γ-3, γ-4, γ-5, γ-10, γ-13) are correctness regressions where the documentation/exports/source contradicts the J close ceremony. Per `tranche/SPEC.md ## Close`: "FINAL.md authored AFTER findings absorbed".

### Suggested W7 absorb plan

W7 orchestrator runs a `feat(tranche-j/w7-doc-fix)` patch wave covering:

1. **Source absorb (γ-13 P0)**:
   - `src/index.ts:5` strip `(O.W2.7)`.
   - `src/styles/tokens.css:339-343` rewrite token-history comment.
2. **Manifest absorb (γ-10 P0)**:
   - `package.json` "exports" — add `"./configurator": { "types": "./dist/configurator.d.ts", "import": "./dist/configurator.js" }`.
3. **DESIGN.md absorb (γ-3, γ-4, γ-5 P0; γ-6, γ-7 P1)**:
   - Drop `DockPopover` row from Components table (`:491`) + custom catalog enumeration (`:815`).
   - Drop `danger-subtle` from Button variants (`:410`) + Semantic-variant intent list (`:581`).
   - Update Slider variants table (`:589-593`) with size axis + `glass-pill` + `glass-cartoon`.
   - Add `<Configurator>` spec block + custom catalog entry.
   - Add `<CarouselPager>` / `<CarouselDots>` / `<GlassCarouselPager>` spec block.
   - Extend `<HoverPopover>` spec (`:838`) with `keepDockOpen` extension prop.
4. **Wave-spec status (γ-1, γ-2 P1)**:
   - Update `**Status**` line in W0..W6 to `closed @ <hash>`.
   - Update J.md Wave Schedule table column.
5. **CLAUDE.md + README.md rewrite (γ-8, γ-9 P1)**:
   - CLAUDE.md: replace on-disk file with claudeMd canonical text (already documented in claudeMd block).
   - README.md: rewrite the glass-ladder section + component counts + dependencies + structure tree to match v0.8.0+J state.
6. **J.md cross-tranche debt + PROGRESS.md placeholders (γ-11, γ-12 P2)**:
   - Strike-through or remove resolved items in `J.md:113-122`; add StoryChassis defer.
   - Replace PROGRESS.md `:190-191` placeholder text with the resolved hashes.

After absorb, re-run γ scrub + write `FINAL.md`.

### Alternative: γ clean-with-residuals

If W7 absorb scope is undesirable, file γ-3 / γ-4 / γ-5 / γ-10 / γ-13 in `audit/J-residuals.md` with named destination (W7 follow-up patch wave or J post-close hot-fix). γ-8 + γ-9 (CLAUDE.md/README.md rewrites) can defer to a docs-pass tranche. γ-1 + γ-2 are mechanical and trivially absorbable. **Not recommended** — at minimum the P0 items should land before `FINAL.md` is final.
