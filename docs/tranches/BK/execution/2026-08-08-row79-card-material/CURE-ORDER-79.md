# CURE-ORDER #79 W-CARD-MATERIAL — driver-ratified residue (2026-08-08)

Adjudicator (Fable, quartet seat wf_b4e09545-822, completed) ruled CURE-REQUIRED. The
driver ratifies the residue verbatim. What STANDS: the selection (#79 the correct next
canonical unstarted Φ5 row — sole dep #68 SEALED ⊕³⁶, no ASK/owner gate, files absent
from the six uncommitted lanes), the code core (§4 STRIKE/ADD ledger, token values, C-2
specificity (0,3,0)-over-(0,2,0) in-layer, C-3 verified on disk; the state fill alive on
plain glass cards), and the verify gate reproduced exactly on the adjudicator's own run
(vue-tsc 0; vitest 11 failed | 1417 passed | 5 xfail (1433), the identical 11 foreign
failures from #40/#7's uncommitted lanes; receipt byte-identical seats:60 bound:8
unbound:50 drift:1 violations:1; zero seats minted; diffstat 16 files +319/−429).

## Cures

- **CURE-1 (functional, HIGH):** re-home the feather off the plate — the
  `.card-scroll-host` mask must never ride the element that paints the plate/cast.
  Restructure so an inner wrapper (inside `<Card>`, containing CardHeader+CardContent) is
  the scroll host wearing the class; update `demo/stories/display/card.vue:143`
  accordingly; state the constraint in `CardHeader.vue`'s doc line. (The alternative —
  recording plate dissolution + cast clipping as an accepted divergence — is REFUSED by
  the driver: the no-masking-fallback and liquid-glass laws cut against it.)
- **CURE-2 (functional, HIGH):** `src/components/card/CardHeader.vue` `onCross` — compute
  the next condensed value first and arm glide ONLY on an actual flip
  (`if (next !== condensed.value) { glide.value = true; condensed.value = next; }`);
  clear glide in `syncInitialState` when scrollRoot re-resolves. Add a contract case: a
  condense crossing without room arms no glide.
- **CURE-3 (public surface, HIGH):** book the 8.0.0 card cut in `MIGRATION.md` +
  `CHANGELOG.md` per the 48368ad2 precedent — census rows for
  CardTier/CardVariant/CardMetal (removed 8.0.0; successors: tier survives via
  SurfaceProps' tier / `selected` replaces the variant trio / `metal-*-border` utilities
  survive class-borne) and CardAction (removed 8.0.0); replace the `:534` example import
  with a surviving symbol.
- **CURE-4 (C-4 completeness):** either author the descendant-focus elevation half on
  `.card` (the `:has(:focus-visible)` rung lift, HEAD's
  `src/styles/glass/surfaces.css:52-55` predecessor) or record the refusal with grounds
  in RECORD §5 and route the half explicitly in §8 — the record's own C-4 cell assigns it
  to this lane; silence is the one option TR forbids.
- **CURE-5 (cascade):** restore `.paper-grid` (`src/styles/paper.css:164-179` + its PRT
  arm) to `@layer components`, or record the unlayered escalation as a deliberate
  divergence naming the state-fill background-image collision and its route; verify the
  selectable+paper-grid combination either way.
- **CURE-6 (demo token):** `demo/stories/compositions/auth-shell.vue:118` — write the
  intended padding directly (a resolvable token or literal), not a
  `var(--card-pad, ...)` that can never resolve on a non-card node; book the
  30.528px→12px sub-lg delta if 12 is intended.
- **CURE-7 (test bind):** pin the condense threshold in
  `tests/components/card/Card.test.ts` — after arming room, a scroll to 19 must NOT
  condense and a scroll past 20 must; the release half is already bracketed.
- **CURE-8 (record accuracy, batch — the uncommitted RECORD.md + parent paste blocks):**
  (a) restate the S1 figure with its detector verbatim — occurrences 32→10 (`grep -oE`),
  lines 25→3 (`grep -cE`); (b) fix §5.4's self-contradictory sentence — non-resting
  shadowed cards KEEP the substitution and thus lose the stack until #86; (c) add the
  settings.vue data-material shadow delta (`--shadow-sm`→`--shadow-card` ×4) — and
  auth-shell if CURE-6 changes paint — to §7's π-owed list; (d) correct "8/8 §4 ADD" to
  6/7 executed + 1 refused-with-grounds wherever it appears; (e) correct the aria-live
  claim at `scroll.css:130-133` and RECORD A7 (removals are not announced; only
  re-expansion is) or arm a mechanism that actually announces; (f) add
  `src/styles/glass/deep.css:19` (CardTier prose) and `demo/chassis/code/Code.vue:65`
  (`--card-pad-title-gap-scale` prose) to §8's #61 W-DOC-TRUTH route; (g) correct §0
  grounds: #67 = skipped because it cannot be executed IN FULL absent owner R-7 footage
  (TR:217's marks block no other arm), #34 = gated "after #33" (not IN-FLIGHT), add #54
  to the walked table (gated before/with ASK'd #50/#53).

## Driver duties at commit (not the cure seat's)

Scoped add of the lane's files; MIGRATION/CHANGELOG now carry only this lane's new hunks
(#72/#57/#46 landed) but VERIFY no foreign hunk rides at stage time; re-run the battery +
receipt + demo:dist:build before `git add`; completion-rider sweep; ⊕-index derived at
commit time from the cursor tail.

## Residue carried (booked, not this cure's)

π P1-P9 owed to #10 at the serialized browser seat with the −1-node `/display/card`
baseline; P6 blocked on #3 W-CAPTURE-MOTION by the spec itself; the register
violation/drift belong to #40's uncommitted lane (⊕⁵¹/⊕⁵³/⊕⁵⁵ precedent); after cures
the full verify gate re-runs and the register receipt must stay byte-identical.
