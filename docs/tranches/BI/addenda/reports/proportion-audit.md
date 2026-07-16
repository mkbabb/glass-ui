# Aristotelian proportionality + affordance-economy audit

**Auditor:** Fable proportionality fork (BI-addenda). **Date:** 2026-07-16.
**Fences honored:** repo + demo server read-only; no writes in repo; no server restart.
**Measuring stick:** `docs/canon/aristotelian-proportion.md` (√φ ladder, `--card-pad` model),
`docs/canon/design-axes.md`, the type/radius token spine.

---

## 0. LIVE-PAINT STATUS — BLOCKED (unchanged from the earlier design fork)

The demo at `:5199` returns **200 on the HTML shell but the app never mounts**: `#app` has 0
children, body text length 0, 0 canvases. Root cause confirmed by probe:
`node_modules/.vite/deps/vue.js` and `vue-router.js` return **404** (the dep bundle was wiped by
the in-flight peer-dep churn — CVA/clsx drop + value→^4 / kf→^6 bumps); `/@vite/client` and
`/demo/main.ts` serve 200. A page reload (a GET, within fence) did **not** re-optimize — the served
module graph points at hashed dep URLs that no longer exist on disk; only a **dev-server restart**
re-optimizes, and that is fenced (their process). I did not touch it.

**Consequence for this audit:**
- **√φ-proportion axis** — judged from **source CSS** (higher fidelity than pixel-eyeballing for
  this axis; the ladder values ARE the source tokens). Verdicts below are sound.
- **animation-laws axis** and **technicolor-cartoon-punch axis** — **PENDING / π-OWED**. Both are
  runtime (motion weight, composited warm-hue). Cannot be judged without paint. Carried as an
  addenda π obligation, NOT graded here.
- **Substrate π discharge** (aurora/blob/constellation/fourier/liquid-grid painted vs dead) —
  **STILL BLOCKED**. Owed once the tree boots.
- No screenshots (blank page). The `proportion-shots/` dir holds only the blank capture.

This blocker is itself finding **DEF-1** — an un-bootable product surface, with nothing in CI that
would catch it (see the FAM-F `demo:boots` proposal).

---

## 1. The proportion spine — what the canon actually ships (all PASS)

The signature system is genuinely excellent and must **not** be re-litigated:

**`--card-pad` ladder** (`card/styles.css:4-8`) — the canonical model, exactly as the edict names:
```
--card-pad-inline : spacing*6                = 24px   (anchor)
--card-pad-block  : --card-pad-inline * 1.272 = 30.5px (√φ)
--card-pad-footer : --card-pad-block / 1.618  = 18.9px (φ)
--card-pad-title-gap : --card-pad-inline / 2.618 = 9.2px (φ²)
```
One anchor, every rung derived by a √φ/φ/φ² relation. This is the model universalized in prose.

**Type scale** (`typography/scale.css:120-152`) — a pure φ progression, exemplary:
subheading `1.272rem` (√φ) · heading `1.618rem` (φ) · title `2.058rem` (φ^3/2) ·
display-1…5 = φ²…φ⁴. Plus `--type-proportional-ratio: 0.786 (1/√φ)` already minted (the P019
kicker/headline pair primitive exists at the token layer).

**Radius ladder** (`theme/radius.css`) — a deliberate, documented rung set (xs/sm/md/xl/2xl/3xl/pill
+ semantic `--radius-card/field/control/strip/tab`), single-override discipline, squircle threshold
noted. Consistent.

**Verdict:** the √φ axis PASSES decisively at the **signature surfaces** (Card, type, radius,
and everything that consumes `--card-pad` / the `--type-*` ladder). The gap is universalization →
§2.

---

## 2. THE CENTRAL FINDING — two proportion registers coexist

The √φ ladder governs the signature surfaces; the **dense component interiors run a parallel,
conventional Tailwind rem step-scale** (0.25 / 0.375 / 0.5 / 0.75 / 1 / 1.25 / 1.5rem) that is NOT
anchored to any √φ ladder. It is internally coherent (a real 4px system), so it does not read as
*random* — but against the edict's "√φ proportion **in all things**," these surfaces are
**PENDING→FAIL on the √φ axis**: off-anchor, un-laddered.

### Measured (source-exact, spacing base = 4px)

| surface | element | value | register | √φ verdict |
|---|---|---|---|---|
| Card | inline/block/footer/title-gap | 24 / 30.5 / 18.9 / 9.2px | **√φ ladder** | PASS |
| Card | `.card-footer` flex gap | `spacing*3` = 12px | off-ladder rung | **minor FAIL** — not a √φ step off the anchor |
| data-table | card padding | `0.75rem` = 12px | Tailwind | PENDING |
| data-table | cards gap / fields gap | 8px / 4px×12px | Tailwind | PENDING |
| data-table | `.data-table-state` padding-block | **`2.618rem`** = 41.9px | **φ² as a raw magic literal** | FAIL-expression — right value, hardcoded not derived |
| metric | label/value gap | `0.125rem 0.5rem` = 2px/8px | Tailwind | PENDING (type sizes PASS — use `--type-*`) |
| metric-cell | padding / gap | `clamp(12–16px)` / 6px | Tailwind | PENDING |
| metric-stack | gap | `0.75rem 1.25rem` = 12/20px | Tailwind (20/12≈1.667≈φ by luck, undeclared) | PENDING |
| menu/command/header-ribbon | padding | `--panel-padding` = `0.375rem` (6px) | **shared token, but flat** — one value, no ladder | PENDING |
| drawer | header padding-block | `0.75rem 0.5rem` | Tailwind | PENDING |

**Two structural sub-findings:**
- **DEF-2 (major, refinement):** the √φ ladder is **not universalized**. Card owns `--card-pad`;
  only `drawer/DrawerHeader.vue`+`DrawerFooter.vue` reuse it. Every other surface re-invents spacing
  in the Tailwind register. The edict's own light-census intent is "the `--card-pad` ladder is the
  model universalized" — that universalization did not happen. **Proposed refinement:** promote a
  shared `--pad-inline` / `--pad-block` (√φ) ladder primitive that dense surfaces consume (as Card
  does), so the relations are **derived, not copied**. This is a KISS reduction (fewer magic rems),
  not new chrome.
- **DEF-3 (minor):** √φ values appear as **hardcoded rem literals** (`data-table:19 2.618rem`;
  the `--configurator-section-size` "20.4px √φ" comment) — the correct ratio expressed brittlely
  instead of derived from an anchor. Fold into DEF-2's shared ladder.

---

## 3. Affordance economy

**Focus is systematized** (do not re-litigate): a coherent `.focus-ring` / `--focus-ring-color` /
`--focus-ring-shadow` system with `:focus-visible` accent rings (`glass/control-surfaces.css:32-134`,
`utilities/components.css:37`), referenced across 60 component files. The earlier "components with no
focus" read was a false positive — reka-ui wrappers delegate focus to their native/button triggers.

**Eyeglass tabs — DELIVERED, corroborated:** the loupe IS the pill default — `.glass-lens` is applied
to the pill indicator (`SegmentedTabs.vue:385`), pill is the default variant. Matches the parent's R2
refutation of the "eyeglass absent" claim. Only residue: no demo story literally *labeled* eyeglass
(cosmetic naming). **Not a defect.**

**Drawer is NOT over-chromed** (retracted as a REMOVE candidate): its border/backdrop count is a
sophisticated gesture-engage blur system (`--glass-blur-engage-t`, snap-rule), single-purpose and
rich, not gratuitous stacking.

### REMOVE roster (superfluous / duplicative / distracting)

Conservative — most removal judgments need paint; these are the source-defensible ones.

| id | surface | element | why | evidence | confidence |
|---|---|---|---|---|---|
| RM-1 | proportion tokens | hardcoded √φ rem literals | `2.618rem` etc. duplicate the ladder as magic numbers; a derived `--pad` ladder removes them | `data-table/styles.css:19`; `configurator` §comment | high (source) |
| RM-2 | metric family | `.metric` / `.metric-cell` / `.metric-row` split (3 dirs: metric, metric-cell, metric-stack, metric-badge) | four sibling metric dirs for one concept — the parent's consolidation-wave target (P117); duplicative surface | `src/components/metric*/` (4 dirs) | med — align w/ P117 |
| RM-3 | tabs | no distinct eyeglass demo story vs the lens-default | risk of implying a variant that doesn't exist; either add the story or drop the naming | `tabs/` (no eyeglass story) | low (cosmetic) |
| RM-4 | dividers vs rhythm | **π-OWED** — need paint to judge divider-over-spacing substitution | data-table/command/dropdown-menu use `1px solid --border` rules; can't confirm if they substitute for spacing rhythm without render | — | π-owed |

### MORE-AFFORDANCE roster (owed more suffusion / signal)

Mostly π-owed (hover/press/glass-depth are runtime). The confirmable-from-source ones:

| id | surface | gap | why | evidence | confidence |
|---|---|---|---|---|---|
| AF-1 | dense interiors | spacing rhythm reads flat/uniform | the Tailwind register gives even 4px steps → no √φ breath hierarchy between header/body/footer the way Card has | §2 tables | high (source) |
| AF-2 | metric small-UI | 2px label→value gap (`0.125rem`) | very tight; the √φ ladder would give the micro-gap a named relation to the reading gap | `metric/styles.css:11` | med |
| AF-3 | substrates | **π-OWED** — glass suffusion / vibrancy / dead-canvas honesty on aurora/blob/constellation/fourier/liquid-grid | the whole substrate π discharge is blocked | — | π-owed |
| AF-4 | interactive hover/press weight | **π-OWED** — animation-laws axis (anticipation/settle) across all controls | runtime | — | π-owed |

---

## 4. Per-surface 3-axis verdict ledger

√φ from source; animation-laws + technicolor = **PENDING (π-owed, tree un-bootable)**.

| surface | √φ-proportion | animation-laws | technicolor-punch |
|---|---|---|---|
| Card | **PASS** (`--card-pad` ladder; footer-gap minor nit) | PENDING (π) | PENDING (π) |
| Type / display | **PASS** (pure φ ladder) | n/a | PENDING (π) |
| Radius system | **PASS** (documented rung set) | n/a | n/a |
| Surface (plate) | PASS-inherited (radius/material tokens) | PENDING (π) | PENDING (π) |
| data-table | **FAIL** (Tailwind register + `2.618rem` magic literal) | PENDING (π) | PENDING (π) |
| metric family | **PENDING→FAIL** (type PASS, spacing Tailwind) | PENDING (π) | PENDING (π) |
| command / dropdown-menu | PENDING (flat `--panel-padding`, no ladder) | PENDING (π) | PENDING (π) |
| tabs | PASS (radius-tab rung); eyeglass default DELIVERED | PENDING (π) | PENDING (π) |
| drawer | PENDING (Tailwind header pads; rich engage system) | PENDING (π) | PENDING (π) |
| dialog | PENDING (CVA decoration ladder — needs paint) | PENDING (π) | PENDING (π) |
| dock (shell + story) | **BLOCKED** (needs paint — morph/settle) | BLOCKED (π) | BLOCKED (π) |
| substrates (5) | **BLOCKED** (paint) | BLOCKED (π) | BLOCKED (π) |

---

## 5. Defect table (ranked)

| id | severity | surface | mechanism | claim | evidence |
|----|----------|---------|-----------|-------|----------|
| DEF-1 | critical (blocker) | demo :5199 | dev-server-optimize-deps-broken | App un-bootable; live π impossible for the whole tree (incl. the codex agent's own native-review queue); nothing in CI boots the demo | `.vite/deps/vue.js`=404; `#app` 0 children; console 504→404 |
| DEF-2 | major (refinement) | all dense interiors | proportion-register-split | √φ ladder not universalized — Card owns `--card-pad`, everything else runs a parallel Tailwind rem scale; edict says √φ "in all things" | §2 measured tables; only drawer reuses `--card-pad` |
| DEF-3 | minor | data-table, configurator | magic-rem-literal | √φ values hardcoded as raw rem (`2.618rem`) instead of derived from an anchor | `data-table/styles.css:19` |
| DEF-4 | minor | Card | off-ladder-rung | `.card-footer` flex gap `spacing*3` (12px) is not a √φ step off the anchor | `card/styles.css:66` |
| DEF-5 | minor | metric family | duplicative-surface | four sibling metric dirs for one concept (aligns with the P117 consolidation wave) | `src/components/metric*/` |
| DEF-6 | π-owed | substrates + all controls | paint-unverified | animation-laws + technicolor-punch axes + substrate paint-honesty entirely un-judged (blocked) | §0 |

---

## 6. What already meets the bar (do NOT re-litigate)

- The `--card-pad` √φ ladder and the φ type/display scale — exemplary, canonical.
- The radius rung system — deliberate and documented.
- The `.focus-ring` focus-visible system — systematized across the component set.
- Eyeglass tabs — the loupe is the pill default (`.glass-lens`), UF-H1 delivered.
- Drawer's gesture-engage backdrop — a rich single-purpose system, not over-chrome.
