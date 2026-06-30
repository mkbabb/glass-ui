# PT-5 — Adversarial critique (Pass 1): token-discipline gate

**Issue:** C3 / friction-class K (substitution-vs-inheritance, dead-knob) — new-token discipline + one catching gate (`proof:token-discipline`).
**Proto reviewed:** `pass-1-proto-PT-5.md` · **Mode:** HARDEN · **Date:** 2026-06-30 · **HEAD:** `4c761b64`
**Verdict:** FEASIBLE and directionally right — but the load-bearing CLOSURE arm (the "durable anti-recurrence" headline) has concrete scoping holes that, as written, leave the gate catching mostly the hand-enrolled subset. The approach survives; the gate spec does not yet. Convergence **68%**.

Every ground-truth claim in the proto verified TRUE against `src/` (registrations, shell.css element-recompose, the ui-scale/card-tier-alpha precedents, the value-only `--glass-key-direction`). The hardens below are all about CLOSURE completeness — does the single gate actually catch the class across all waves, or does it reintroduce the hand-authored-map drift it claims to kill.

---

## A. The closure does NOT scan where the class actually lives (the killer)

The proto's TD-CLOSE-A is the whole anti-vacuity spine: *"every `@property --…` block in `property-regs.css` resolves to a manifest row."* That scope is FALSE to the codebase:

- `property-regs.css` holds **31** `@property` blocks. The seed manifest (§4.1) names ~14. So TD-CLOSE-A is **born-RED-and-stuck on landing** on ~17 un-enrolled existing properties (`--tab-flood-t`, `--phase-tint-amount`, `--glass-accent{,-strength}`, `--pulse-aura-breath-scale`, `--glass-backdrop-luma`, `--seal-{draw,scale,glint,ink}`, `--scroll-t`, `--chrome-collapse-t`, `--cast-{travel,spread}`, `--cartoon-cast-{dx,dy}`, `--progress-crescendo`, …) unless the seed enumerates all 31.
- **`@property` is scattered across ≥10 files — 26 more blocks OUTSIDE `property-regs.css`** (`drawer.css`, `dock.css`, `scroll-choreography.css`, `motion/morph-field.css`, `glass/glass-chip.css`, `utilities/base.css`, `glass.css`, `dock/shape.css`, `dock/fission-bridge.css`). The CLAUDE.md "registrations live in property-regs.css §18" premise the closure rests on is **aspirational, not true at HEAD** (63 `@property` total, ~26 external).
- **The gate cannot see its own headline case.** `--dock-scale` AND `--dock-local-scale` — the exact R5-1 dead-knob exemplar the gate is built around — register as `@property` in **`dock.css:95-121`** (and the override scope is **`dock/overflow.css:224`**), NOT `property-regs.css`. A `property-regs.css`-only TD-CLOSE-A is structurally blind to the very tokens of recurrence #2/#3.
- **Evasion surface:** a future `--siri-island-t`-shape scalar minted in any non-`property-regs.css` file (the WS6 spec even says §18, but nothing forces it there) sails past the closure entirely — the "WS6/WS8 CANNOT mint and skip enrollment" guarantee is void.

**Fix:** TD-CLOSE-A must scan the WHOLE `src/styles` `@property` corpus (≥57 blocks, ≥10 files), and the seed manifest must enumerate the full existing set (31 in-file + 26 external) — OR add a companion "single-home" assert that reds any `@property` outside `property-regs.css` (which is itself born-RED today on 26 blocks, so it would demand a relocation wave first — likely out of scope for BG). Until this is settled the gate enrolls a curated subset and is a token-local gate wearing a universal costume.

## B. The dead-knob arm (the 4×-recurrent mode) is still a hand-list — it reintroduces the drift it kills

The proto's own headline: *"the enrollment-closure is the piece no token-local gate ever had … the next new-token wave is structurally unable to mint without classifying."* But the two arms that close the modes that actually bit are still hand-authored maps:

- **TD-A2 (dead-knob)** checks only the hand-listed `DERIVED_PEERS {derived, knob, scopeSelector}` triples (seeded with one row). A new derived peer on a new override-scope gets ZERO coverage — the exact deadline-pressure step that failed 4 times.
- **TD-CLOSE-C** universe is gated by a hand-authored `KNOWN_KNOB_INPUTS` list; `INERT_INPUT_ALLOWLIST` is hand-authored too. A new knob input not on the list makes its derived peers invisible to the closure. This is the "hand-authored map drift" class the proto names and claims to have killed — relocated, not eliminated.

Contrast `proof:visual-runner` (the cited precedent): its universe is the **disk glob of `*.spec.ts`** — fully enumerable, so `enrolled ∪ EXCLUDE == disk` is a genuine closure. TD-CLOSE-A *can* be that (all `@property` is disk-enumerable) once A is fixed; TD-A2/TD-CLOSE-C **cannot** without either (1) deriving `KNOWN_KNOB_INPUTS` from the manifest's Archetype-A names (not a parallel hand-list) and (2) computing TD-A2's override-scopes STRUCTURALLY — for each enrolled peer `D` with knobs `K`, scan every CSS rule declaring any `k∈K` and assert `D` is re-declared on that rule. That is a pure CSS scan (no hand-list) and would genuinely close the dead-knob mode. As written, the gate **LOCKS the 4 known cases + forces classification of new `@property`** (real value) but does **not** make a new dead-knob "structurally impossible" — the "5th recurrence is the last" headline over-claims.

## C. §4.1 vs §4.4 internal contradiction (the gate can't be GREEN at landing)

- §4.1 lists `--siri-island-t`(A) and `--glass-key-direction`(C) as **seed rows**.
- §4.4 says these are **added by their later waves** with in-diff RED→GREEN flips, and the born-RED anchor is the pre-G4 tree.

Both cannot hold: seed rows for tokens that do not exist until WS6/WS9 make the gate RED at landing (the witness — the `@property`/value — isn't there). Resolve explicitly: the gate lands enrolling ONLY already-live tokens (the full existing `@property` corpus + the live Archetype-C peers); the BG-new tokens are added by their own waves, and TD-CLOSE-A (tree-wide, per A) is precisely what FORCES that in-diff enrollment. Drop the BG-new tokens from the §4.1 seed list.

## D. The gate doesn't cover its own ledger's recurrence #1

The §0 ledger lists **AX.W55 `--glass-backdrop` self-declare (style-query never self-matches)** as Class-K recurrence #1. The gate carries no arm for the `@container style()` self-match mode — that is a container-query semantics trap, not a calc-dead-knob or pre-substituted-composite. So the "single home the class never had" gate leaves recurrence #1 uncovered. Either scope the claim ("covers the calc dead-knob + pre-substituted-composite modes; the `@container`-self-match mode stays prose-only as today") or add a self-match arm. As written the ledger over-claims membership OR the gate under-covers — pick one.

## E. Minor / record-only (not blockers)

- **`--glass-key-direction` is mis-archetyped.** It is a raw CONSTANT knob input (`-0.375`, reads no token), NOT a "pre-substituted DERIVED peer." TD-C1's `pure-var-chain` witness on its own value is vacuous (`-0.375` has no `var()` to defer). The meaningful discipline (stay `calc(Npx * var(--glass-key-direction))`, never a `:root` px literal) lives on the `--glass-under-shadow-*` consumers — already enrolled C in §4.1, so the witness belongs there. Add a "raw input" archetype or move the witness onto the peers; the constant gets only the `inherits-decision-recorded` (TD-C2) flag.
- **The "lands AT-OR-AFTER G4 so `--dock-surface-blur` exists" rationale is factually wrong.** `--dock-surface-blur` already exists at HEAD (`shell.css:29`, reads `--glass-blur-resting`), independent of G4 — which retires the DIFFERENT `--glass-blur-dock` tier token (`glass.css:166`, `dark-arm.css:286`). After-G4 ordering may still be wanted (to reflect the post-G4 dock-blur consolidation + the now-stale `shell.css:26` "`--glass-blur-dock` tier identity stays defined" comment G4 must fix), but the stated reason is inaccurate; re-justify or drop.
- **"Band-0.5" is a spec coinage.** The tranche has Bands 0–4 (FINAL.md:145-168); there is no 0.5. Harmless as a sub-slot label but name it as a coinage and confirm the DAG edge (G4 → new gate → WS6/WS8/WS9) — which is a clean linear prefix, but inserts the gate as a hard dependency for all three token bands (the proto discloses this; fine).
- **"30/30 gates carry self-test" is loose** — 171/360 proof scripts carry it (~47%). The self-test pattern is well-precedented (not a feasibility issue); just don't state it as universal.

---

## Does the fix resolve C3 across all waves it touches?

**Partially.** The per-wave discipline-record amendments (§3 table) are sound and ground-true: only `--siri-island-t` owes a fresh registration; the other four owe record-the-fence + enroll-to-lock, exactly as verified. The gate's LOCK value (the 4 known cases + new-`@property` classification) is real and feasible. But the CLOSURE — the reason a gate beats N witnesses — is scoped to the wrong file, blind to its own exemplar, and rebuilds two hand-authored maps. Fix A+B+C and the gate becomes the durable enforcer the proto promises; ship as-is and it is the 5th token-local catcher with a universal label.

## Does it introduce a NEW friction-class repeat?

**Yes, partially** — `DERIVED_PEERS`, `KNOWN_KNOB_INPUTS`, `INERT_INPUT_ALLOWLIST` are the same hand-authored-map-drift shape the class is about. Fixable by deriving the knob list from the manifest and computing override-scopes structurally (B).

## Feasibility

Unchanged: TRUE. All disciplines are live+proven; the gate is a sub-second device-free src-scan in the `proof:ui-scale`/`proof:card-tier-alpha` mould; widening A from one-file to tree-wide and making B structural are MORE CSS-scan of the same kind, not a new mechanism or device dep. No critical-path blocker beyond the disclosed Band-0/0.5 sequencing.
