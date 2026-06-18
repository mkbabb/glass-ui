# W-NDA-DECIDE — DELTA: the founding chronic `native-drawer-as-asChild`, DECIDED TERMINAL

**Wave**: BB.W-NDA-DECIDE (Batch 6)
**Verdict**: **RETIRE-with-rationale** (the §0 evidence foreclosed BUILD overwhelmingly)
**Pixels**: ZERO — this is a register-disposition flip + a `doc` reconcile + a born-RED→GREEN lock gate. There is NO `proof:ba-gestalt` requirement (BB invariant — the gestalt bar binds VISUAL waves; the RETIRE branch paints no pixels; the gate-green logs + the evidence table ARE the binding truth).

This wave is the TERMINAL decision the founding chronic of the entire disposition surface never made. The row `native-drawer-as-asChild` (AT W0-L4 ledger #8) is the disease the gate's own docstring names: "the native-drawer LATE-1: trigger met at AT, ignored" (`proof-disposition-live.mjs:8`) / "the native-drawer ≥2-consumer trigger was MET at AT and rode BOOK'd five tranches" (`DISPOSITION-REGISTER.json:3`). It rode BOOK'd AT→AU→AV→AW→AX→AY→AZ→BA — re-stamped un-MET every close, never DECIDED. BB §2's mandate is DECIDE each chronic (build / retire / meet), never re-book; this wave fires that decision.

## §0 EVIDENCE TABLE (re-greped at BB HEAD this authoring — each axis individually re-run)

| evidence axis | finding at HEAD | weight |
|---|---|---|
| the host SFC exists | **NO** — `ls src/components/custom/dialog-native/` → *no such dir*; `grep -rln "GlassDialogNative\|dialog-native" src/ demo/` → ∅. The host was deleted at AY's OWN W-PRUNE (`git log` → `077fe58f` "AY: band 2 REBUILDS + W-PRUNE …", the RETIRE-FULL) — the SAME tranche the AY.W-NDA prose claimed it "real and shipping". | **decisive** (nothing to extend) |
| present-consumer trigger (`min-consumers` n:2, grep `dialog-native\|GlassDialogNative`) | **UN-MET** — **0 of 8** present consumers match with EVERY sibling on disk: keyframes.js `0` · value.js `0` · fourier-analysis `0` · fourier-analysis/web `0` · words/frontend `0` · bbnf-lang/playground `0` · bbnf-buddy `0` · **speedtest `0`** (the AT-cited firm consumer). | **strong** (no ≥2, un-meetable — the grep targets a pruned base) |
| the authoritative present ask (speedtest BB ask-brief) | **NO native-drawer/sheet ask** — `grep -in "drawer\|sheet\|native-drawer\|GlassDialogNative\|asChild" …/glass-ui-BB-ask-brief.md` → ∅. The brief enumerates 5 P0 + 4 P1 + P2 primitives; none drawer/native-dialog. | **strong** (the one cited consumer asks zero) |
| muster (the AT-cited 2nd consumer) | **ABSENT** from the constellation set (`constellation.mjs` does not list it) AND would not match (`MobileInstrumentSheet` ≠ `dialog-native`). The AT prose-`≥2` was never machine-real. | the prose-`≥2` was prose |
| the AT-origin need (mobile bottom sheet + vaul re-snap) | **COVERED** — `<Drawer mode="live-behind">` (AN.W3) ships the peek/half/full detented bottom sheet (`Drawer.vue:15-23`); the vaul `activeSnapPoint` re-snap bug the origin pointed at is a documented UPSTREAM vaul-vue limitation (`docs/tranches/AN/audit/W3-drawer-detents.md`), not a glass-ui native host to build. | the substrate need is met without a native host |
| **→ THE DECISION** | **RETIRE-with-rationale** — no host, no ≥2, no ask, the need covered. | **terminal** |

## The AY.W-NDA "real and shipping" stale-claim correction (the §0 drift record)

AY.W-NDA (`docs/tranches/AY/waves/AY.W-NDA.md:70`) asserted the subject was "real and shipping" at `src/components/custom/dialog-native/GlassDialogNative.vue` + its barrel. **That is FALSE at HEAD** — AY's OWN W-PRUNE (`077fe58f`, "3 RETIRE-FULL … dialog-native") deleted `GlassDialogNative.vue` (98 lines) + `index.ts` (7 lines) in the SAME tranche the W-NDA prose was written in. The carry watched a host that did not exist (a "watch on a ghost"). This is the exact hazard AY.W-NDA §1-D2 itself flagged — now realized, and resolved by this retire. NO edit to the AY.W-NDA spec file (a closed tranche's spec is historical, greenfield-no-meta does not apply to a close record); the correction is FORWARD-recorded here.

## The chosen branch + rationale

**§A — RETIRE.** The §B BUILD branch was retained in the spec only as the contingency the §0 evidence is expected to foreclose — IF the §0 pass discovered a genuine ≥2-consumer native-drawer need at HEAD (a sibling landing two `dialog-native` imports, or speedtest's brief naming a concrete native-drawer ask), the wave would BUILD the host instead. The §0 pass found neither: 0 present matches, no host, no ask. A BUILD that lands without a real 2nd consumer is FORBIDDEN (it would mint the exact "substrate-without-consumer" L inv-8 forbids). The evidence is decisive toward RETIRE; the decision FOLLOWS the evidence.

The row was FLIPPED IN PLACE in `DISPOSITION-REGISTER.json` — `disposition: "book" → "retired"`, the `pendingResolvedBy: "BB.W-NDA-DECIDE"` REPLACED with a terminal `retiredBy: "BB.W-NDA-DECIDE"` + a non-empty `rationale` (the full evidence record) + a non-empty `successor` (`<Drawer mode="live-behind">` + `glass-dialog-native-pilot` #34). `resolved: false` (a retired row is not resolved-by-build — it is retired; the booked-set excludes `retired` regardless). NO row deleted (the no-delete fence — the manifest bookId keeps its register row, completeness stays green). The register `doc` string gained a one-clause reconcile that the founding chronic is now DECIDED-TERMINAL.

## Born-RED → GREEN gate logs

**`proof:nda-decided` (the NEW terminal-lock gate, this wave's hard gate)**

BORN-RED (before the flip, at HEAD — the row still `book` + unfired `pendingResolvedBy`):
```
  disposition           : book
  pendingResolvedBy     : BB.W-NDA-DECIDE
  rationale present     : no
  lock violations       : 2
  LOCK-VIOLATION   disposition is "book" — NOT terminal; the founding chronic re-books …
  LOCK-VIOLATION   pendingResolvedBy:"BB.W-NDA-DECIDE" survives — the pending decision is unfired …
  exit 1
```
GREEN (at close, after the flip):
```
  disposition           : retired
  retiredBy/resolvedBy  : BB.W-NDA-DECIDE
  pendingResolvedBy     : (discharged)
  rationale present     : yes
  successor present     : yes
  self-test (bite proof): OK — synthetic disease-state + phantom-dest rows flagged
  lock violations       : 0
  exit 0
```
The self-test bite runs every invocation: a synthetic copy of the row mutated back to the disease state (`book` + blank rationale + surviving `pendingResolvedBy`) MUST be flagged, AND a synthetic `retiredBy` naming a phantom wave-spec (`BB.W-DOES-NOT-EXIST`) MUST be flagged — both confirmed load-bearing.

**`proof:disposition-live` (the existing harness — stays GREEN, no gate-script edit)**
```
  register book/arch/ret: 31           (was 31 — the row FLIPPED in place, never deleted)
  uncovered (ledger→reg): 0            (W3 — the no-delete fence held; the bookId keeps its row)
  rows with a decided dest: 2          (was 3 — the pendingResolvedBy DISCHARGED; retiredBy is the terminal record)
  phantom destinations    : 0          (W-DISPOSITION-RESTAMP decided-destination clause GREEN)
  live violations       : 0            (W1 — the retired row is OFF the booked-set {book,archived})
  self-test (bite proof): OK           (W4 — synthetic met-trigger + phantom-dest rows still flagged)
  exit 0
```
Disposition counts after the flip: `{book:28, archived:2, retired:1, resolved:0}` (was `{book:29, archived:2}` — the one founding row moved book→retired).

**The two harness parity gates (`gate-script-parity` / `gate-manifest-sound`)** flag two ORCHESTRATOR-owned items, both resolved at commit/registration time, neither a wave regression:
- `gate-script-parity`: "orphan proof script: scripts/proof-nda-decided.mjs has NO proof:* package.json registration" — the canonical author-gate / orchestrator-registers handoff (the returned `packageJsonScriptLine` + `gatesMjsRow` close it).
- `gate-manifest-sound`: `[CLEAN-TREE]` flags the WHOLE in-flight worktree dirty (incl. every sibling wave's files — aurora.frag.ts, metaball.wgsl.ts, …); the orchestrator commit resolves it.

## Founding-chronic genealogy terminus

```
AT ledger #8 (W0-L4 deferred chronic ledger:112)   the prose-≥2 (muster + speedtest), never machine-checked
  → AS.W6 BOOK                                       the "strongest BOOK→WAVE candidate after the headline"
  → AT→AU→AV→AW→AX→AY→AZ→BA carry                     re-stamped un-MET every close, NEVER decided
       └─ AY 077fe58f (W-PRUNE)                       the host GlassDialogNative.vue DELETED — the watch became a watch on a ghost
       └─ AX.W62                                      minted the register + proof:disposition-live to CATCH this class
       └─ AY.W-NDA                                    formalized the row as a WATCH (a book with a live min-consumers trigger)
       └─ BB.W-DISPOSITION-RESTAMP (Batch 0)          re-stamped pendingResolvedBy:"BB.W-NDA-DECIDE", kept the WATCH armed
  → BB.W-NDA-DECIDE (Batch 6) — TERMINAL DECIDE       §0 evidence → RETIRE-with-rationale; book→retired; the WATCH is OFF
```
A `retired` row carries no `min-consumers` watch, so the founding chronic is **structurally impossible to re-book** — the five-tranche silent ride ENDS at the BB cut. A future native-drawer need re-enters through `glass-dialog-native-pilot` (#34)'s own trigger (a NEW genuine ≥2), never through a re-opened `native-drawer-as-asChild` book.

## Named successors

- **W-CLOSE (Batch 7)** — reads the terminal `native-drawer-as-asChild` disposition as the founding-chronic citation's gate-true artefact (the close's "zero chronic-defer carry" clause); the row contributes ZERO to the chronic-carry count.
- **`<Drawer mode="live-behind">` + `glass-dialog-native-pilot` (#34)** — the named living `successor` destinations the retire records (the shipped bottom-sheet home + the demo-gated native-`<dialog>` re-promotion path). A retirement WITH a successor, never a silent drop.
- **No re-book.** The terminus.
