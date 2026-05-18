# Qφ — value.js tranche/WIP reconciliation + pane-migration scoping

**Agent**: Qφ (phi) — value.js tranche/WIP reconciliation, Q audit-augmentation round-4.
**Date**: 2026-05-18.
**Scope**: `/Users/mkbabb/Programming/value.js/` — all branches, all tranche docs. Read-only inspection; no mutating git in either repo.
**Inheritance**: Qθ (`Qtheta-value-cosmetic-regressions.md`), Qμ (`Qmu-visual-runtime-reprobe.md`), Qξ (`Qxi-card-pane-variant-history.md`), Qα (`Qalpha-consumer-breakage-forensics.md`).

---

## Headline correction (read this first)

The charter — and Qθ before it — is built on a **stale premise**. The charter says:

> "value.js's WIP branch `w.w2.1-value-js-prebuild` already migrated its 11 `<Card variant="pane">` sites — but it migrated them to `tier="wash"`. So the WIP branch's 11-site migration may need to be REDONE."

Three facts overturn this:

1. **The WIP branch carries NO Card migration.** `w.w2.1-value-js-prebuild` is at commit `70e61e9` — and `70e61e9` is the **merge-base of master and the WIP branch**. The WIP branch is a strict ancestor of master (`git merge-base --is-ancestor w.w2.1-value-js-prebuild master` → true). Everything on the WIP branch is already in master, fully superseded. The WIP branch has not diverged at all — it is *behind* master by 21 commits.

2. **The 11-site Card migration is on master**, at commit `92fe64d` (`fix(tranche-a/w1): migrate 11 Card sites off the stale variant prop to tier`), authored 2026-05-18 as part of value.js's own **Tranche A, Wave 1**. It is committed, closed, audited, and live at HEAD.

3. **value.js ran its own tranches A and B** that explicitly own this work. Tranche A closed; Tranche B is in flight (W4 planned). The migration was not pre-staged WIP work waiting for a Q dispatch — it is a completed deliverable of a *peer* tranche, and value.js's coordination docs (`docs/tranches/A/coordination/Q.md`, `B/coordination/Q.md`) formally **withdrew glass-ui Q's writer grant in value.js** and asked Q to delete its value.js-writing lanes.

So the REDO question is real, but it is not "redo the WIP branch's work." It is: **value.js's already-landed master-side `tier="wash"` migration is PARTIAL-faithful per Qξ; does it need a re-migration to `<ScrollPane>`, and whose tranche owns that?** That is what this lane quantifies.

---

## Section 1 — value.js branch topology + tranche-doc summary

### 1.1 Branch topology

| Branch | HEAD | Relation to master |
|---|---|---|
| `master` (= `origin/master`, `origin/HEAD`) | `f9a47ca` | tip |
| `w.w2.1-value-js-prebuild` (local) | `70e61e9` | **ancestor of master** — 21 commits behind, 0 ahead |
| `origin/w.w2.1-value-js-prebuild` | `31ace76` | **ancestor of master** — 24 commits behind, 0 ahead |
| `modernize` / `pre-refactor` / `post-refactor` / `worktree-palette-deploy` | (stale) | not on the critical path |
| `origin/gh-pages` | (deploy artefact) | not source |

`git merge-base master w.w2.1-value-js-prebuild` returns `70e61e9` — the WIP branch's own HEAD. That is the definition of "ancestor." `git log master..w.w2.1-value-js-prebuild` is **empty**. There is no divergence to reconcile. The local WIP branch is even three commits *ahead* of `origin/w.w2.1-value-js-prebuild` (it carries `c0cc349`, `755b3cd`, `70e61e9`) — but those three are also already in master.

**Q-chron-1 is RESOLVED — and was resolved by value.js, not Q.** Qθ §1.3 + §recommendation flagged "the canonical-branch resolution (Q-chron-1) is the load-bearing dispatch decision." It is not load-bearing any more. value.js's Tranche A.W0 absorbed the WIP branch into master and proceeded. `A/coordination/Q.md §2` even records it explicitly: "value.js WIP-vs-master branch decision — Owner A, Writer A.W0 Lane A, recorded in `PROGRESS.md`." The decision was made: **master is canonical; the WIP branch is abandoned/superseded.** No Q action is needed and no Q action is possible (Q cannot write value.js).

The branch name `w.w2.1-value-js-prebuild` does NOT denote a value.js tranche "W". It is a glass-ui-side constellation branch name — the `w` is a glass-ui tranche/wave label (the prebuild constellation that staged the `dist/gh-pages` outDir, the demoConditions, and the freshness-gate retiral across the four consumers). value.js's own tranches are lettered **A** and **B**, not W. There is no value.js tranche "W2.1."

### 1.2 value.js tranche docs

value.js has `docs/tranches/{A,B,C}/`:

| Tranche | State | Card/pane content |
|---|---|---|
| **A** | CLOSED (W0–W4 + W5 audit). `f9a47ca` is "open Tranche B — close A". | **A.W1 IS the Card migration.** `waves/W1.md` Lane A1 ("wash-pane Card migration, 10 sites") + Lane A2 ("ColorPicker resting-plate Card, 1 site"). Audit evidence in `audit/W1-card-wash-panes.md` + `audit/W1-card-colorpicker.md` + `audit/HARDEN-3-design-waves.md`. |
| **B** | IN FLIGHT. HEAD on master is the B-open commit. B.W0–B.W3 closed; **B.W4 planned, B.W5 planned.** | B does **not** re-touch the Card sites. `B/coordination/Q.md §3` row "`Card` props fail-explicit" is marked "A.W1 consumed Q.W2 Lane A's anticipated Card change — unchanged." B.W3 migrates `PaletteDialog.vue` to `<UnderlineTabs>` (a *Tabs* migration, unrelated to Card/pane). No B wave plans a `pane` → `<ScrollPane>` re-migration. |
| **C** | NASCENT — `C.md` + `PROGRESS.md` + a CRUD-constellation coordination doc only. No waves. Untracked on master (`?? docs/tranches/C/`). Not yet a live tranche. No Card content. |

**Critical**: value.js's A.W1 did NOT blindly copy Qα's round-1 advice. `audit/HARDEN-3` found the 11 sites are *not homogeneous* and split the migration into two lanes — 10 wash panes vs 1 resting plate (`ColorPicker.vue`). And A.W1 Lane A1 item 1 explicitly **caught the `:grain="false"` omission** in glass-ui Q.W2 Lane B's proposed `tier="wash" :shadow="false"`: "`audit/HARDEN-3` notes the `:grain="false"` that glass-ui Q.W2 Lane B's proposed `tier="wash" :shadow="false"` omits — without it the panes inherit a grain texture they should not carry." value.js's migration is *more* faithful than Qα's plan — but still not `<ScrollPane>`.

---

## Section 2 — WIP branch `w.w2.1-value-js-prebuild` complete carry-manifest

Because the WIP branch is an ancestor of master, "what the WIP branch carries vs master" is the wrong question — master carries a strict superset. The right question, for the historical record Qθ asked for, is: **what did the three WIP-only-named commits (`c0cc349`, `755b3cd`, `70e61e9`) introduce** — all of which are now in master.

| # | Commit | Carry | Status at master HEAD |
|---|---|---|---|
| 1 | `c0cc349` | `chore(demo): adopt glass-ui v1.0 subpath surface + retire local barrels` (constellation M.W1 Lane B) | In master. Demo consumes `@mkbabb/glass-ui/*` subpaths; local `ui/` barrels retired. |
| 2 | `755b3cd` | `feat(p.w5-a): glass-ui CR-1 + CR-4 + Path B adoption (demo-side)` | In master. |
| 3 | `70e61e9` | `refactor(freshness): add "development" condition + relativize @src/* imports + retire freshness-gate (AD.W4.T1+T3)` — deletes `scripts/freshness-gate.mjs` (116 LOC), relativizes `@src/*` imports in 6 src files, adds the `development` package.json export condition. Net −116 LOC. | In master. This is the value.js side of the cross-repo freshness-retirement batch (glass-ui `949474a` → keyframes.js `8d824ee` → value.js `70e61e9` → speedtest). |

**Qθ's claimed WIP carry-items — corrected:**

Qθ §1.3 + §recommendation asserted the WIP branch carries: `vite.config.ts` `demoConditions`, `outDir: dist/gh-pages`, the keyframes alias retiral, AND the 11-site Card `tier="wash"` migration. **This is wrong on the topology and wrong on the Card item:**

- The `vite.config.ts` `demoConditions` + `outDir: dist/gh-pages` + alias work is NOT in the three WIP-only commits. It landed on master at value.js Tranche **A.W0** — commit `c20f609` (`fix(tranche-a/w0): un-break the demo boot — retire keyframes alias, migrate Aurora, guard GooBlob, dedupe vue`). `A/coordination/Q.md §2` confirms: "vite.config.ts alias retire / mode-scoped `resolve.conditions` / gh-pages outDir — Owner A, Writer A.W0."
- The 11-site Card migration is NOT on the WIP branch at all. It is master commit `92fe64d`, Tranche A.W1.

So **the WIP branch carries exactly the 3 pre-A constellation commits above — and all 3 are already in master.** The carry-item count is **3, all superseded**. There is nothing on the WIP branch that master lacks. The WIP branch can be deleted with zero loss.

**Master's value.js-un-break + Card work — the actual carry-manifest (Tranche A):**

| Commit | Wave | What |
|---|---|---|
| `bc7ad2c` | A.W0 | register `docs/precepts` submodule + tranche A plan substrate |
| `c20f609` | A.W0 | un-break demo boot — retire keyframes alias, migrate Aurora off retired `useAuroraBlobs`, guard GooBlob, dedupe vue. **This is the boot crash fix (A-key-2).** |
| `92fe64d` | A.W1 | **migrate 11 Card sites** off `variant="pane"` to `tier` |
| `efc7d25` | A.W1 | resolve 3 undefined utility classes + ColorInput radius |
| `3b72007`–`3f39026` | A.W2–W4 | token routing, z-tier adoption, φ type-scale, Dock/App.vue decomposition |
| `f9a47ca` | B-open | close A, open B |

---

## Section 3 — The 11-site Card migration: exact target per site + faithfulness

Source: `git show 92fe64d` + `grep` against master HEAD (re-verified live — no uncommitted changes to any pane/ColorPicker file).

### 3.1 Per-site target (live at master HEAD)

| # | Site | WIP-charter claimed | **Actual master HEAD** |
|---|---|---|---|
| 1 | `panes/AboutPane.vue` | `tier="wash"` | `tier="wash" :shadow="false" :grain="false"` |
| 2 | `panes/AdminPane.vue` | `tier="wash"` | `tier="wash" :shadow="false" :grain="false"` |
| 3 | `panes/AuroraPane.vue` | `tier="wash"` | `tier="wash" :shadow="false" :grain="false"` |
| 4 | `panes/BlobPane.vue` | `tier="wash"` | `tier="wash" :shadow="false" :grain="false"` |
| 5 | `panes/BrowsePane.vue` | `tier="wash"` | `tier="wash" :shadow="false" :grain="false"` |
| 6 | `panes/ExtractPane.vue` | `tier="wash"` | `tier="wash" :shadow="false" :grain="false"` |
| 7 | `panes/GeneratePane.vue` | `tier="wash"` | `tier="wash" :shadow="false" :grain="false"` |
| 8 | `panes/GradientPane.vue` | `tier="wash"` | `tier="wash" :shadow="false" :grain="false"` |
| 9 | `panes/MixPane.vue` | `tier="wash"` | `tier="wash" :shadow="false" :grain="false"` |
| 10 | `panes/PalettesPane.vue` | `tier="wash"` | `tier="wash" :shadow="false" :grain="false"` |
| 11 | `color-picker/ColorPicker.vue` | `tier="wash"` | **`tier="resting"`** (shadow + grain kept — deliberate, per A.W1 Lane A2) |

Two corrections to the charter's framing:

- The 10 panes are `tier="wash" :shadow="false" :grain="false"` — **not bare `tier="wash"`**. The `:grain="false"` was added deliberately (A.W1 caught the omission in Qα/Q.W2's plan). This is the *more* faithful of the two `tier="wash"` spellings Qξ §4.1 graded.
- Site 11 (`ColorPicker.vue`) is `tier="resting"`, NOT `tier="wash"`. A.W1 Lane A2 + `audit/HARDEN-3` ruled `ColorPicker.vue` is the protagonist plate, not a scroll pane — batching it as `wash` "would flatten it into the background." So site 11 was *never* a `pane`-substrate site in intent; it is a genuine elevated card. **It is not a re-migration candidate.** Qξ's `<ScrollPane>` verdict applies to the 10 wash panes only.

Note also: there is an **11th `tier="wash"` site that did NOT come from the `variant="pane"` cohort** — `panes/ConfigSliderPane.vue` (added at A.W4 commit `3f39026`, `tier="wash"`, no prior `variant="pane"`). So the live count is 10 ex-`pane` wash panes + 1 new wash pane (ConfigSliderPane) + 1 resting plate (ColorPicker) = 12 `tier=` Card sites, of which **10 are the ex-`variant="pane"` cohort**.

### 3.2 Faithfulness vs the `<ScrollPane>` canonical target (per Qξ §4)

Qξ §4 is the binding adjudication: legacy `pane` was lifted to the sibling primitive `<ScrollPane>` at glass-ui `e017d53`, and **`<ScrollPane>` — not any `tier="wash"` spelling — is the canonical successor** (Qξ Path D). Grading value.js's live `tier="wash" :shadow="false" :grain="false"`:

| Axis | legacy `pane` | value.js's `tier="wash" :shadow="false" :grain="false"` | `<ScrollPane>` | Verdict |
|---|---|---|---|---|
| background token | `--glass-bg-subtle`(→`wash`) | wash ✓ | wash ✓ | **faithful** |
| backdrop blur | `--glass-blur-subtle`(→`wash`) | wash ✓ | wash ✓ | **faithful** |
| border token | `--glass-border-subtle`(→`wash`) | wash ✓ | wash ✓ | **faithful** |
| paper grain | none (deliberate) | `:grain="false"` → none ✓ | none ✓ | **faithful** (value.js got this right; Qα's plan did not) |
| shadow | shadow-on (legacy had a shadow) | `:shadow="false"` → off | `:shadow` toggle, default on | **divergent** — but the panes pass `min-h-0 h-full overflow-y-auto`; they are scroll viewports, shadow-off is the *intended* register. Qξ §4.1 grants this is the right call for non-`flush` scroll panes in practice. |
| `overflow-auto` baked in | no (consumer remembered it) | no — every site hand-writes `overflow-y-auto overflow-x-hidden` in `class` | **yes, baked** | **MISSING bake** — value.js re-specifies overflow at all 10 sites |
| `scrollbar-hidden` baked in | no | no — not present at any site | **yes, baked** | **MISSING bake** — value.js panes show native scrollbars |
| radius | `rounded-xl` | sites use `pane-scroll-fade` + ad-hoc; `rounded-card` default | `rounded-panel` token | **divergent** (minor; same px at `:root`) |
| polymorphic root | no | no | yes (`Primitive`) | **MISSING** (not exercised by value.js) |

**Faithfulness verdict: value.js's migration is faithful on the 4 visual axes (bg, blur, border, grain) and makes a defensible shadow call — it is the *best possible* `tier="wash"` spelling, strictly better than Qα round-1's `tier="wash" :shadow="false"`. But it is PARTIAL against `<ScrollPane>` on three behavioural bakes: `overflow-auto`, `scrollbar-hidden`, and `rounded-panel`.** The `overflow` and `scrollbar` gaps are papered over because every value.js pane hand-writes `overflow-y-auto overflow-x-hidden` and carries a `pane-scroll-fade` utility — i.e. value.js re-implemented, per-site, the contract `<ScrollPane>` bakes in once. This is exactly the "two-paths-for-one-render" substrate debt Qξ §5 (Path A grading) condemns.

---

## Section 4 — REDO quantification

### 4.1 Is it a fresh migration, a re-migration, or nothing?

It is a **re-migration**: `<Card tier="wash" :shadow="false" :grain="false">` → `<ScrollPane>` for the **10 wash-pane sites only** (ColorPicker stays `tier="resting"` — out of scope). And it is **fully salvageable** — the WIP-charter's worst case ("full redo") does not apply.

Why salvageable:

1. **The hard part is already done.** The semantic decision — which sites are `pane`-substrate and which are not — was the load-bearing call, and `audit/HARDEN-3` + A.W1 already made it correctly (10 wash panes, ColorPicker is a resting plate). A `<ScrollPane>` re-migration inherits that 10-vs-1 split unchanged.
2. **The remaining work is mechanical**, per site: (a) swap the import — `import { Card } from "@mkbabb/glass-ui"` → `import { ScrollPane } from "@mkbabb/glass-ui/scroll-pane"`; (b) swap the element `<Card>`/`</Card>` → `<ScrollPane>`/`</ScrollPane>`; (c) drop the three now-redundant props `tier="wash" :shadow="false" :grain="false"` (ScrollPane bakes wash + grain-off; `:shadow="false"` stays as a ScrollPane prop if shadow-off is wanted); (d) **optionally** strip the now-redundant `overflow-y-auto overflow-x-hidden` from the `class` string, since ScrollPane bakes `overflow-auto` — this is a cleanup, not a correctness requirement.
3. **No structural rewrite.** `<Card>` and `<ScrollPane>` have the same single-default-slot shape; children (`<PaneHeader>`, content divs) are untouched. No prop on the children changes.

### 4.2 The W2 delta (precise)

| Item | Count | Effort |
|---|---|---|
| Sites to re-migrate (`Card tier="wash"` → `<ScrollPane>`) | **10** (the ex-`variant="pane"` panes) | mechanical |
| Sites explicitly EXCLUDED | 1 — `ColorPicker.vue` (`tier="resting"`, intentional elevated plate) | none |
| Sites needing a judgement call | 1 — `ConfigSliderPane.vue` is `tier="wash"` and *is* a scroll/config pane; if the re-migration is "all pane-substrate hosts → `<ScrollPane>`", ConfigSliderPane should join → **11 sites**, not 10 | small — same mechanical swap |
| Import-line edits | 10–11 (one per site) | mechanical |
| Element-tag edits | 20–22 (open + close per site) | mechanical |
| Prop deletions | 30–33 (`tier`/`shadow`/`grain` ×10–11; `:shadow="false"` may be retained) | mechanical |
| Optional `class` cleanup (strip redundant overflow utilities) | 10–11 | optional, low-value |
| Re-probe | Playwright ×3 viewports × light/dark — value.js A.W1 already has this harness (`audit/W1-playwright/`) | re-run, no new harness |

**Delta estimate: ~1–2 hours of mechanical edits + a Playwright re-probe.** It is NOT a fresh 11-site migration and it is NOT a full redo. It is a salvageable 10-site (11 if ConfigSliderPane is folded in) element-and-import swap. The semantic work — already banked by value.js A.W1 — is the expensive part, and it carries over intact.

### 4.3 Whose tranche owns the re-migration — the open question

This is the genuinely unresolved item. **Neither value.js nor glass-ui currently has a wave that plans the `<ScrollPane>` re-migration:**

- value.js Tranche A is **closed** — A.W1 shipped `tier="wash"` and that wave will not re-open.
- value.js Tranche B (in flight) does **not** plan it — B.W3 is a `<UnderlineTabs>` (Tabs) migration; B.W4 is library-gap audit + WIP disposition + typecheck; no B wave touches the Card/pane sites. `B/coordination/Q.md §3` marks the Card row "unchanged."
- glass-ui Q has Q.W2 Lane B ("value.js Card migration") on its books — but `A/coordination/Q.md §1` formally **requested Q delete that lane** because it duplicates A.W1, and `B/coordination/Q.md §4` records "no response from Q's orchestrator has been recorded." If Q's Q.W2 Lane B still exists, it is the dual-writer hazard value.js flagged — and it specifies the *wrong* target (`tier="wash"`, per Qξ).

So the `<ScrollPane>` re-migration is **un-owned**. It is a candidate for: (a) a value.js Tranche B late wave or Tranche C; or (b) a glass-ui Q value.js-reader recommendation handed to value.js's orchestrator. It is NOT something Q can write directly — value.js withdrew Q's writer grant.

---

## Section 5 — Picker 0×0 (Mμ-5 / Q-cos-6)

### 5.1 Branch status of the fix

Qμ Mμ-5 found value.js's home view renders the **left/Picker pane collapsed to 0×0** while the right/About pane renders fine — the user-visible "totally broken" blocker. Branch disposition:

- **The WIP branch does NOT fix it.** The WIP branch (`70e61e9`) predates value.js Tranche A entirely — it has none of the A.W0–W4 layout work.
- **master does NOT demonstrably fix it either.** Qμ probed value.js at glass-ui HEAD `d244dd5`; value.js master at that time already carried the full Tranche A (including A.W4's App.vue decomposition, commit `3f39026`). Mμ-5 was found *on master*, post-A. So master — the canonical branch — still exhibits the 0×0 picker, OR did at the time of the Qμ probe.
- The picker pane lives in `demo/color-picker/App.vue` — `.pane-wrapper.hidden.lg:flex` wraps a `<PaneSlot>` that mounts `<ColorPicker>`. The wrapper inflates to ~6767px tall while the inner `.pane-shell` collapses to 0×0 (Qμ §Mμ-5). A.W4's App.vue decomposition (`3f39026`) restructured this wrapper into `<PaneSlot>` components — and the bug is in that flex/box-model cascade.

**Verdict: the picker 0×0 is unaddressed on BOTH branches.** No branch renders the picker correctly. master is "less wrong" only in that it has every other A-tranche fix; the specific Mμ-5 layout-cascade defect is live at master HEAD.

### 5.2 Ownership

Mμ-5 is a value.js consumer-layout defect (`App.vue` `.pane-wrapper`/`.pane-shell` flex box-model), per Qμ §190.3 — "needs collaborative root-cause between value.js's `pane-shell` flex layout + glass-ui Card primitive's tier cascade. Out of scope for glass-ui-only fix; recommend value.js audit lane." It is **not** a Card-tier regression (Qμ §60, §159 explicitly cleared the Card surface). The `tier="wash"` → `<ScrollPane>` re-migration (Section 4) will NOT fix Mμ-5 — they are independent defects, though both touch the pane substrate. Mμ-5 is currently un-owned by any value.js wave; it belongs in a value.js Tranche B late wave or C.

---

## Section 6 — Q ⇄ value.js collision matrix

Per Q wave that writes (or is charter-claimed to write) value.js:

| Q wave / lane | Intended value.js write | value.js owner | Collision verdict |
|---|---|---|---|
| **Q.W1 Lane C** — "value.js un-break" (alias retire, `resolve.conditions`, `gh-pages` outDir, WIP-vs-master, package.json alias audit) | `vite.config.ts`, `package.json` | **value.js A.W0** — already shipped (`c20f609`, `bc7ad2c`); WIP-vs-master decided (master canonical) | **COLLISION — value.js already did all 5 items.** `A/coordination/Q.md §1` formally requests Q DELETE Q.W1 Lane C. Q.W1's value.js work must become a *reader-check* against `audit/W0-*`, not a write. If Q.W1 Lane C still writes value.js, it is a dual-write on closed work. |
| **Q.W2 Lane B** — "value.js Card migration, 11 SFCs", hard-coded `tier="wash" :shadow="false"` | 11 pane/Card SFCs | **value.js A.W1** — already shipped (`92fe64d`); split 10 wash + 1 resting; added `:grain="false"` Q.W2 omitted | **COLLISION — value.js already did it, and did it better.** `A/coordination/Q.md §1` requests Q DELETE Q.W2 Lane B. Worse: Q.W2 Lane B specifies `tier="wash"` which Qξ has since ruled PARTIAL — so Q.W2 Lane B is both a dual-write AND specifies a now-superseded target. Must be deleted. |
| **Q.W2 Lane A** — glass-ui `Card` props fail-explicit (invariant 31) | glass-ui only (`src/components/ui/card/`) | glass-ui Q | **CLEAR** — glass-ui's own repo. value.js A.W1 *consumes* it as a reader. No collision. Keep. |
| **Q.W4 cluster-C2 phantom-class** (charter item) | value.js phantom/undefined utility classes | **value.js A.W1 Lane B** — already resolved 3 undefined classes (`font-mono-code`, `text-2xs`, `text-pane-description`) + ColorInput radius (`efc7d25`) | **COLLISION (likely) / COORDINATE** — if Q.W4's cluster-C2 targets the same `font-mono-code`/`text-2xs`/`text-pane-description` class set, it is already fixed on master. Q must re-grep value.js HEAD before scheduling; if the classes resolve, the lane is empty. If Q.W4 found a *different* phantom-class set, COORDINATE — but value.js B owns value.js writes, so Q files it as a gap, value.js B fixes it. |
| **`<ScrollPane>` re-migration** (Section 4 — the genuine open item) | 10–11 value.js pane SFCs | **un-owned** — no value.js A/B/C wave, no Q wave | **CLEAR but UNSCHEDULED** — no collision because nobody owns it. Needs assignment: value.js B late wave / C, OR a Q reader-recommendation to value.js. Q cannot write it (writer grant withdrawn). |

**Collision count: 3 COLLISIONS** (Q.W1 Lane C, Q.W2 Lane B, Q.W4 cluster-C2-probable) + **1 CLEAR-keep** (Q.W2 Lane A) + **1 CLEAR-unscheduled** (the ScrollPane re-migration). Every Q lane that *writes* value.js collides with already-shipped value.js Tranche A work. value.js's coordination docs requested the deletions; Q has not recorded a response. **This is the load-bearing finding: Q's value.js-writing lanes are stale and must be retired from Q's plan.**

---

## Section 7 — Recommendation

The canonical-branch question is already resolved by value.js, so the recommendation is not "merge WIP / cherry-pick / rewrite." It is a plan-hygiene + re-migration-assignment recommendation.

### 7.1 The WIP branch — DELETE, no merge

`w.w2.1-value-js-prebuild` is a strict ancestor of master. It carries nothing master lacks. **Do not merge it, do not cherry-pick from it.** It can be deleted (`origin/w.w2.1-value-js-prebuild` too) at value.js's convenience — zero loss. Any Q dispatch doc still treating it as a divergent WIP branch with un-pushed work is wrong and must be corrected. Q-chron-1 ("WIP-vs-master split") is **CLOSED** — `A/coordination/Q.md §2` records master as canonical.

### 7.2 Retire Q's value.js-writing lanes (do this first)

Per `A/coordination/Q.md §1` and `B/coordination/Q.md §4` — value.js withdrew Q's writer grant in value.js and asked Q to delete:
- **Q.W1 Lane C** — value.js A.W0 shipped all 5 items. Convert any Q.W1 value.js gate row to a reader-check against value.js `audit/W0-*`.
- **Q.W2 Lane B** — value.js A.W1 shipped the 11-site migration. Delete the lane. (It also specifies the wrong target; see 7.3.)
- Re-scope **Q.W4 cluster-C2** — re-grep value.js HEAD; the 3 undefined classes A.W1 Lane B fixed are resolved. If a different phantom-class set remains, file it as a gap for value.js B, do not write it.

Keep Q.W2 Lane A (glass-ui `Card` fail-explicit) — that is glass-ui's own repo and is correct Q-writer surface.

### 7.3 The `<ScrollPane>` re-migration — the one genuine open item

value.js A.W1's `tier="wash" :shadow="false" :grain="false"` migration is faithful on 4 visual axes and the *best* `tier="wash"` spelling — but per Qξ it is PARTIAL against the canonical `<ScrollPane>` successor on three behavioural bakes (`overflow-auto`, `scrollbar-hidden`, `rounded-panel`). The corrective re-migration is:

- **Scope**: 10 ex-`variant="pane"` panes → `<ScrollPane>`; fold in `ConfigSliderPane.vue` (→ 11) if the rule is "all pane-substrate scroll hosts." `ColorPicker.vue` stays `tier="resting"` — EXCLUDED.
- **Effort**: mechanical (import swap + element swap + prop deletion); ~1–2h + a Playwright re-probe on value.js's existing A.W1 harness. **Salvageable, not a full redo** — the expensive semantic 10-vs-1 split is already banked.
- **Owner**: value.js — Q cannot write it. Recommend value.js schedule it as a Tranche B late wave (B.W5 is still planned) or Tranche C wave. Q's role is to hand value.js's orchestrator the Qξ §6 Path-D verdict + this Section 4 delta as a filed gap, exactly as `B/coordination/Q.md §3` files glass-ui gaps for value.js.
- **Prerequisite**: confirm Qπ's adjudication (the charter names Qπ as the sibling agent finalising the `pane` successor question). Qξ §6 already concludes Path D (`<ScrollPane>`) unambiguously; if Qπ concurs, the re-migration target is locked.

### 7.4 The picker 0×0 (Mμ-5) — un-owned, must be assigned

Mμ-5 is live at master HEAD on both branches — the user-visible "totally broken" blocker. It is a value.js `App.vue` `.pane-wrapper`/`.pane-shell` flex box-model defect, independent of the Card/pane substrate, and is currently un-owned by any value.js wave. Recommend value.js Tranche B add a wave (or C) for it. Q cannot fix it; Q files it as a gap with the Qμ §Mμ-5 evidence.

### 7.5 Net

Three items the canonical-branch resolution must account for, ranked:

1. **Q plan hygiene (do first, glass-ui-side)** — delete Q.W1 Lane C + Q.W2 Lane B, re-scope Q.W4 cluster-C2. These are stale dual-writes on value.js Tranche A's already-shipped, closed work. No code, just plan edits.
2. **`<ScrollPane>` re-migration (value.js-side, salvageable)** — 10–11 mechanical site swaps, ~1–2h, owned by value.js B/C, filed by Q as a gap with the Qξ Path-D verdict.
3. **Picker 0×0 Mμ-5 (value.js-side, un-owned)** — the actual user-visible blocker; a value.js layout-cascade fix, owned by value.js B/C, filed by Q with Qμ evidence.

The WIP branch is a non-issue — delete it. The only real "redo" is item 2, and it is a salvageable mechanical swap, not a redo of lost work — value.js's A.W1 semantic decisions carry over intact.

---

## Appendix — evidence index

| Claim | Source |
|---|---|
| WIP branch is ancestor of master | `git merge-base --is-ancestor w.w2.1-value-js-prebuild master` → true; `git log master..w.w2.1-value-js-prebuild` empty |
| 11-site migration is master commit `92fe64d`, A.W1 | `git show --stat 92fe64d`; `docs/tranches/A/waves/W1.md` |
| 10 panes → `tier="wash" :shadow="false" :grain="false"`, ColorPicker → `tier="resting"` | `git show 92fe64d -- '*.vue'`; live `grep tier= demo/@/components/custom/panes/` at HEAD |
| value.js withdrew Q's value.js writer grant; asked Q delete W1.C + W2.B | `docs/tranches/A/coordination/Q.md §0-1`; `docs/tranches/B/coordination/Q.md §4` |
| A.W1 caught the `:grain="false"` omission in Q.W2 Lane B's plan | `docs/tranches/A/waves/W1.md` Lane A1 item 1; `audit/W1-card-wash-panes.md` |
| `<ScrollPane>` is the canonical `pane` successor; `tier="wash"` is PARTIAL | `Qxi-card-pane-variant-history.md` §4, §6 (Path D) |
| Picker 0×0 (Mμ-5) live at master HEAD, both branches | `Qmu-visual-runtime-reprobe.md` §Mμ-5, §142, §190.3 |
| Qθ's WIP-carry claim (demoConditions/outDir/Card on WIP) | `Qtheta-value-cosmetic-regressions.md` §1.3, §recommendation — **corrected by this lane** |
