# BA fleet — lane: precepts-conformance

**Auditor angle**: read `docs/precepts/` in full (TRANCHE-AND-WAVE-SPEC, tranche/SPEC,
tranche/WAVE_SPEC, design-idioms, cross-repo-dev-resolution, AGENT_DISPATCH_TEMPLATE) +
the CLAUDE.md invariants, and audit the AZ execution + the current `master` HEAD (v3.13.0,
e217c3d) against them. Where does HEAD violate a precept? Legacy code surviving? A workaround
that should be a root fix? Idiom drift? Plus the NO-legacy-code sweep.

**Discipline**: AUDIT-ONLY, no edits, no git. Chrome MCP extension was disconnected, so live
π was unavailable; this lane is source/document-anchored (the precept content + gate scripts +
tranche close docs are the evidence), which is the lane's native register. The R8 captures in
`audit/ground/R8-*.png` (19 present) are the user's own visual evidence.

---

## Headline verdict

The TREE is in strong NO-legacy-code conformance — the back-compat sweep found **zero** real
legacy shims (every "legacy"/"deprecated"/"back-compat" hit is either a conformance NOTE
asserting legacy was REMOVED, a legitimate browser-fallback guard, or an API-ergonomics alias).
The token conventions (`hsl(var())` double-wrap, `:global()` scoped drop, `light-dark()` inset
trap, no-test-in-src) all hold clean. The structural precepts (subpath surface, demo-private
discipline, ≥2-consumer bar on the new components) hold.

The CONFORMANCE failures are at the PROCESS / CLOSE layer, not the source layer:

1. **The chronic gate-green / user-rejected close pattern** (the keystone) — AZ closed
   `complete` asserting all 9 surfaces PASS, and the user re-opened the same surfaces (dock,
   aurora-config, goo, dark register) the NEXT DAY in R8. This is the 6th re-opening round
   (R3→R8) and the project's own cardinal lesson recurring.
2. **An un-discharged god-module carve carry** booked to a wave that did not discharge it,
   absent from FINAL's named-successor list.
3. **A dirty precept submodule** with the canonical `design-idioms.md` UNTRACKED in it.
4. **Orphan committed-evidence** (un-ignored visual pngs never committed → fresh-checkout gate
   risk).
5. **CLAUDE.md structural doc-drift** (wrong custom-dir count; 4 shipped feature-dirs omitted).

---

## Findings

### P-1 (S1) — The chronic gate-green / user-rejected close: AZ closed `complete` with the goal unmet

**Precept**: TRANCHE-AND-WAVE-SPEC §"Goal criterion + completion criterion (paired)" + tranche/SPEC
§Close — *"A tranche whose hard gates all pass but whose goal is unmet closes
`complete_with_misses` with the goal-miss explicit, not `complete`."* AZ.md invariant 8 (the
USER-EDICT COMPLETION BAR): *"the tranche is complete ONLY when every named surface holds a PASS
in the per-surface REFLECTION process … loops until perfection."*

**The violation**: AZ FINAL §4 (the reflection verdict matrix, `docs/tranches/AZ/FINAL.md:119-131`)
marks all 9 surfaces **PASS** (dock, blob, glass-registers, shell-ia, motion, aurora,
constellation, fourier, cross-repo). The tranche closed `complete`, cut v3.13.0. The USER then
re-audited the published 3.13.0 tree the SAME DAY (R8, 2026-06-11 23:06,
`docs/tranches/BA/audit/USER-AUDIT-2026-06-11-R8.md`) and found 19 defect clusters, of which at
least seven re-open an AZ-PASS surface:

| R8 read | AZ §4 verdict it contradicts |
|---|---|
| R8-1 "dock rail is totally mis-aligned" | dock **PASS** (W-DOCK-RAIL "pixel-verified ΔL 12.7/15.0; zero misses") |
| R8-4 aurora configurator occlusion | aurora **PASS** (19/19 gates) |
| R8-6 dock round buttons cut off | dock **PASS** |
| R8-7 "goo configurator almost entirely broken" | blob **PASS** (pass-2) |
| R8-9 "docks COMPLETELY lack sections" | dock-nav **PASS** |
| R8-3 gear dark-toggle doesn't work / wrong icon | shipped configurator control |
| R8-14 sectioned progress "totally broken" | shipped surface |

This is the **6th consecutive re-opening round** — 8 USER-AUDIT files are banked
(AY's, then R3/R4/R5/R6/R7 inside AZ, then R8). The precept's own framing (AZ.md:12-14: "AY
closed with clean source machinery and a green release battery, but the R3 live audit re-opened
four bands the close had marked live-verified") describes the EXACT pattern repeating one tranche
later. The recorded cause (MEMORY: `feedback_live_verify_capture` + the AW halt's
"headless-green / visually-broken gap"): the π/reflection capture verifies the LOCAL mechanism the
fleet root-caused in isolation (a pixel ΔL, an `h1Overlap:false`), but cannot verify the GESTALT
the user reads ("totally mis-aligned" is a placement/relationship judgement, not a contrast delta).
The reflection matrix mistook "the mechanism I fixed measures correctly" for "the surface is right."

**Root cause**: design (the close-discipline + the π lane's mechanism-vs-gestalt blind spot).

**Remedy direction (seeds a BA process invariant)**: BA must NOT repeat the per-mechanism
PASS-matrix close. The reflection bar needs a GESTALT acceptance gate ABOVE the per-mechanism π
readback — a holistic per-surface "does this look right as a whole, in BOTH modes, at real
device scale" judgement captured as an annotated full-surface screenshot the USER (or a fresh
adversarial auditor blind to the fix) accepts, distinct from the pixel-measurement gate. Tie the
tranche `complete` vs `complete_with_misses` verdict to that gestalt gate, not to the mechanism
matrix. Until a surface passes the gestalt read, it closes `complete_with_misses` with the
named successor, never `complete`.

---

### P-2 (S2) — The god-module carve carry booked to a wave that did not discharge it; absent from FINAL §6

**Precept**: design-idioms §5 (the 500-line no-god-module carve, "BINDING … the next complex
stylesheet is built to the convention") + tranche/SPEC §Close (P-inv-28 zero-deferral: every item
LANDS / RETIRES / ARCHIVES; "deferred to next tranche" is not an acceptable close-state) +
§Close-Honesty ("every cross-tranche debt entry names the next-letter destination").

**The violation**: `scripts/proof-no-god-module.mjs:48-69` carries a non-empty `RATCHET_BASELINES`
with three grandfathered over-bound files:
- `styles/typography.css` @ 530 (bound 500)
- `components/custom/constellation/constellationField.ts` @ 586
- `components/custom/constellation/Constellation.vue` @ 577

The baseline comment (lines 62-65) states they were grown past the bound by AZ Batch-3/4
(W-SUFFUSE/W-HIERARCHY/W-CON-GEN) and that "the carve verdicts ride the REFLECT band's
triumvirate (a cohesion-aware split or a justified keep, per surface)." But:
- AZ W-CARVE FINAL (`FINAL.md:43`) claims the ratchet was **"DRAINED"** — true for the styles
  arm it carved, but these three rows REFILLED it and are still grandfathered at HEAD.
- W-REFLECT (`FINAL.md:49`) executed SURFACE reflections + the dock/motion/blob triumvirate —
  it did NOT execute the god-module carve verdict the `BOOK(AZ.W-REFLECT)` marker points at.
- AZ FINAL §6 "Named successors" (`FINAL.md:143-166`) lists W-MOTION3, embla-on-overflow,
  SHELL-IA-N1, the luma promotion, the W-DELTA0 re-captures, R5-9/R5-10 — but **does NOT list
  the typography/constellation carve verdict**. It is a deferral that exists only as a code
  comment, with a stale book pointing at a closed wave, and no FINAL named successor.

**Root cause**: `scripts/proof-no-god-module.mjs:62-69` (the BOOK marker + the missing FINAL entry).

**Remedy direction**: BA Batch-0 inherits the carve verdict as a hard gate (per the SPEC
DEGRADED-outcome rule: a deferred item needs a named restoration wave, not a code-comment book).
Either carve the three (cohesion-aware `@import` partial for typography; a composable/draw split
for the constellation pair) or record a justified KEEP with the §5 grandfather rationale stated
in FINAL prose, then drain the baseline map to `{}` (its declared close-state).

---

### P-3 (S2) — The precepts submodule is dirty; the canonical `design-idioms.md` is UNTRACKED in it

**Precept**: tranche/SPEC §Close (the `ι` integrity-sweep: "walks `git log
--since=<tranche-open-date> -- 'docs/precepts/'` for unexpected precept-submodule changes; any
unexpected change halts the close"). CLAUDE.md repeatedly cites `docs/precepts/design-idioms.md`
as the idiom home that `proof:colocation` + `proof:design-idiom-localization` reference.

**The violation**: `git submodule status docs/precepts` reports the submodule **dirty**
(`63240e67…-dirty`). Inside it:
```
 M cross-repo-dev-resolution.md      (uncommitted modification)
 M instructions/LESSONS-LEARNED.md   (uncommitted modification)
?? canonical-readme-shape.md         (UNTRACKED)
?? cross-repo-dev-iteration.md       (UNTRACKED — cited by the contract-v2 G.W5 amendment)
?? design-idioms.md                  (UNTRACKED — the canonical idiom-home precept)
```
`design-idioms.md` exists on disk and is read as canon, but it is **not committed to the
precepts submodule** — `git ls-files` inside the submodule does not list it. On a clean
recursive clone it would be ABSENT, and every CLAUDE.md cross-reference + the colocation gates
would point at a non-existent file. The precept canon is not actually versioned. The superrepo
gitignore-snapshot ` m docs/precepts` confirms the dirty pointer is exposed at HEAD.

**Root cause**: design (submodule hygiene at the AY/AZ close; the integrity-sweep `ι` lane did
not catch the uncommitted/untracked precept files, or ran without the submodule walk).

**Remedy direction**: BA Batch-0 commits the three untracked precept files + the two modified
ones inside the `docs/precepts` submodule, advances the submodule pointer in the superrepo, and
the `ι` close lane gains an explicit assertion that the precepts submodule is CLEAN
(`git -C docs/precepts status --porcelain` empty) at every tranche close — the prose-only
integrity walk has now missed it through two closes.

---

### P-4 (S3) — Orphan committed-evidence: un-ignored visual pngs never committed (fresh-checkout gate risk)

**Precept**: `.gitignore:11` un-ignores `docs/tranches/*/audit/visual/*.png` precisely so the
`proof:live-verified-ledger` gate can assert "these on-disk pngs exist on a fresh CI checkout"
(the gitignore comment states this verbatim). tranche/SPEC §Close-Honesty: "every gate marked
MET has an evidence path that resolves."

**The violation**: `docs/tranches/AX/audit/visual/W18-W40/*.png` (12 files: dock-rail.png,
dock-overview.png, shell-home-1440.png, substrates-blob.png, …) plus `W36/`, `W44/`, `W46/` dirs
are **un-ignored** (`git check-ignore` exits 1 = not ignored) yet **untracked** (`git ls-files`
returns empty for the dir). They were generated but never committed. Any
`proof:live-verified-ledger` row or PROGRESS entry citing them resolves on THIS working tree but
would 404 on a fresh clone / CI runner — the exact failure class the gitignore exception was
built to prevent. (AZ FINAL's "ORPHANS: 0" clause-7 claim is about SOURCE orphans, a different
axis; it is not falsified, but this evidence-orphan class sits beside it un-swept.)

**Root cause**: design (the AX close left generated visual evidence uncommitted; no gate asserts
"un-ignored png on disk ⇒ tracked").

**Remedy direction**: BA either commits the AX evidence pngs (if a ledger cites them) or deletes
them (if orphan scratch), and adds a one-line integrity assertion: every path matching the
un-ignored visual/reflect png globs that exists on disk must be `git ls-files`-tracked — closing
the on-disk-but-untracked evidence gap mechanically.

---

### P-5 (S3) — CLAUDE.md §Structure doc-drift: wrong custom-dir count, 4 shipped feature-dirs omitted

**Precept**: tranche/SPEC §Close-Honesty (docs match reality) + the project's living-doc
discipline (CLAUDE.md is the binding structural map agents read first).

**The violation**: CLAUDE.md §Structure declares "**36** custom package dirs" and enumerates a
list. Disk has **33** dirs, and the enumeration OMITS four shipped feature-dirs that exist at
HEAD with full barrels + READMEs + ≥2 consumers:
- `constellation/` (Constellation.vue + composables/ + 3 draw/field/interaction files; 16 consumer refs)
- `fourier-field/` (FourierField.vue + math/presets; 12 consumer refs)
- `glass-panel/` (5 consumer refs)
- `header-ribbon/` (5 consumer refs)

So the count is wrong in BOTH directions (claims 36, has 33, AND omits 4 real dirs — the true
enumerated-but-present set is even more out of sync). A fresh agent routing by CLAUDE.md
§Structure would not find these four families.

**Root cause**: `CLAUDE.md` §Structure (the `custom/` enumeration block).

**Remedy direction**: BA's doc-update wave re-syncs the §Structure custom/ enumeration + count to
disk (constellation, fourier-field, glass-panel, header-ribbon added; count corrected), and adds
a gate (`proof:claude-structure-sync` style) asserting the enumerated custom-dir list equals
`ls src/components/custom/` so the map cannot silently drift again.

---

### P-6 (S3) — `proof:colocation` covers only 4 of 6 complex feature-dirs (gate-coverage gap)

**Precept**: design-idioms §7 (the colocation convention's CSS half) + CLAUDE.md §Structure
("Enforced by `proof:colocation`"). The convention is binding for COMPLEX components (a
WebGL/Canvas surface, a multi-composable family).

**The observation** (lesser — the idiom is HONORED, only the GATE under-covers): the colocation
idiom itself holds — `aurora/` and `fourier-field/` both carry READMEs and aurora has a
`composables/` subdir. But `scripts/proof-colocation.mjs:40-45` `TARGET_DIRS` is exactly
`[goo-blob, dock, tabs, constellation]` — it omits `aurora/` (a multi-composable WebGL feature-dir
with `composables/` + `constants/shaders/`) and `fourier-field/`. So two genuinely-complex
feature-dirs escape the gate's colocation enforcement; a future regression in aurora's structure
(a composable drifting to the package root, a missing README) would not red the gate.

**Root cause**: `scripts/proof-colocation.mjs:40-45` (the under-scoped TARGET_DIRS).

**Remedy direction**: extend TARGET_DIRS to every `custom/` dir that has a `composables/` or
`shaders/` subdir (derive it, don't hand-list) so the colocation gate covers the full complex-dir
set, not a frozen 4.

---

## What is CLEAN (the conformance evidence, so BA does not re-litigate it)

- **NO-legacy-code sweep**: zero real back-compat shims / deprecated paths / dead flags in `src/`.
  Every "legacy"/"deprecated"/"alias" hit is a removal-NOTE (`motion.ts:44-45` "No back-compat
  alias … retires cleanly per precept 1+2"), a browser-fallback guard (`useClipboard` execCommand,
  `::-webkit-scrollbar`, the older `MediaQueryList` shape), or an API-ergonomics method alias
  (`useTimer`/`useInterval` `pause()`→`stop()`). The clean-break discipline (MEMORY
  no-backwards-compat) is followed.
- **`:global()` scoped drop** (design-idioms §8 / MEMORY): 0 occurrences in `src/`+`demo/`
  `<style scoped>`.
- **`hsl(var(--token))` double-wrap** (CLAUDE.md NEVER): 0 real violations (3 hits are
  warning-comments).
- **`light-dark()` inset-shadow trap** (MEMORY): 0 — `--shadow-cartoon-color` uses `light-dark()`
  for the COLOR token only, never a shadow box with an inset fragment.
- **no-test-in-src** (`proof:no-test-in-src`): 0 test files under `src/`.
- **demo-private discipline**: `useGlassBackdropLuminance` is OFF the public barrel + api/, with
  its booked 2nd-binary evidence doc present (`docs/consumer-evidence/use-glass-backdrop-luminance.md`).
- **≥2-consumer / visual-load-bearing bar**: the 4 new feature-dirs all clear it quantitatively
  (5-16 consumer refs each). Their R8 design-fidelity gaps (R8-10 fourier sparse demos) are
  under-built-not-unconsumed — a BA design item, not a substrate-without-consumer violation.
- **CSS no-god-module bound** (apart from the 3 grandfathered rows in P-2): the carved
  tokens/glass/utilities/dock partials are all < 500.

## Scope note

R8-18 ("Remove the disco effect everywhere" — `btn-audacious`/sparkle-sweep/disco-grain) is a
NEW directive from the 2026-06-11 audit that POST-dates the AZ close. The disco family's continued
presence in `src/styles/utilities/btn.css` etc. is therefore the PENDING BA work R8 seeds, NOT an
AZ conformance violation. The same applies to the other 18 R8 reads: they are the BA tranche's
input, correctly banked. The conformance failure is not that these defects exist — it is P-1, that
AZ closed `complete` asserting the same surfaces PASS one day prior.
