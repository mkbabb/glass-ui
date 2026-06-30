# PT-6 — ADVERSARIAL CRITIQUE (corrected-approach proto, PASS 1)

**Issue:** Cut-time correctness checklist for the device-free-gate-blind omissions (corrected-approach spec)
**Critiquing:** `pass-1-proto-PT-6.md` (the CORRECTED-APPROACH rewrite — the CT-1..CT-6 cut-time-checklist spec; NOT the earlier "mid-tranche aggregate green-able" proto that `pass-1-crit-PT-6.md` already addresses)
**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD verified:** `6c1f5386` (matches the proto's stated HEAD) · siblings-intact exit 0
**Verdict:** PARTIALLY FEASIBLE — the checklist MECHANISM (CT-1..CT-6 + the two gate-hardenings) is right, and three legs (G3/G4/L15) are CONFIRMED-live-and-sound. But the two LEAD legs (C1/C2) are analyzed against **stale plan text the execution already overtook**, so the proto commits the exact friction-class it exists to kill. Convergence ≈ 45%.

All findings re-derived by re-running gates + reading shipped bytes + `git merge-base` against HEAD this pass.

---

## 0 · Ground-truth re-verified directly (every number re-run, not transcribed)

| Claim | Proto says | I found at HEAD `6c1f5386` | Verdict |
|---|---|---|---|
| value.js `latest` dist-tag | 1.1.1 | `npm view @mkbabb/value.js dist-tags` → `{ latest: '1.1.1' }` | ✓ |
| kf `latest` dist-tag | 5.1.0 (implied) | `{ latest: '5.1.0' }` | ✓ |
| installed value.js singleton | 1.2.0 transitive | `node_modules/@mkbabb/value.js` = **1.2.0**; kf deps value `^1.2.0` | ✓ |
| kf peer | `^5.0.0` @1078 | `^5.0.0` @ **1078** | ✓ |
| **value peer** | "BH plans `^1.2.0`; BG corrected `^1.1.1`" | **`^1.0.0` @ 1080** — *neither* | ✗ **stale** |
| value devDep | (→`^1.1.1` @1118) | `^1.0.0` @ **1118** | ✗ stale |
| no `dependencies` block | yes | `p.dependencies === undefined` | ✓ |
| `useDragMorph` ships `snap:` | @325 | `snap: targetsOf().map((t)=>t.center)` @ **325** | ✓ |
| peer-conformance blind to floor-vs-API | yes | gate GREEN at HEAD on `^5.0.0` admitting 5.1.0 | ✓ **core insight holds** |
| PINNED_LATEST.value offline | `1.2.0` ≠ dist-tag | `PINNED_LATEST.value = "1.2.0"` @41 | ✓ |
| glass-idiom-factor tags | `["local","ci","release"]` @1503 | confirmed @ **1503** | ✓ |
| glass-idiom-factor in ci.yml | absent | `grep -c` = **0** | ✓ |
| 3 AZ deltas stale | exact hashes | `W-DOCK1 25c60d27→2624ad1d`, `W-DOCK2 05361bf8→880e4ce6`, `W-CON1 c9338215→bfd034e8` — exact | ✓ |
| gate-manifest-sound tag/exit | `["local"]`, exit 1 | `["local"]` @1605; exit **1** | ✓ |
| BUDGETS 6 chunks | yes | glass-ui/styles/aurora/goo-blob/constellation/fourier-field | ✓ |
| siri/refract absent from BUDGETS | yes | confirmed | ✓ |
| W-GATE-FIELD-AURORA gate (G6 spike) | live, `^1.2.0` @ `:23,25,50,58`+`:346,348` | **no `proof-field-aurora*.mjs` exists** — WS7 PENDING | ✗ **non-existent target** |

---

## 1 · THE LOAD-BEARING MISS: C1/C2 analyze a tree the execution moved past

The proto's HEAD is `6c1f5386` — and it treats **BH.B1-W2** and **BH.B1-W3** as *future waves to amend*. Both are **already committed and ancestors of HEAD** (`git merge-base --is-ancestor` = YES for both):

```
ba23c086 BH B1 (BH.B1-W3-dragmorph-snap-excise): snap re-roll → kf 5.1.0 DragOptions.snap   [IN HEAD]
0d6b9f8a BH B1 (BH.B1-W2-value-destraddle): value ^0.13.0||^1.0.0 → ^1.0.0 single ^1.x       [IN HEAD]
```

### C1 is WORSE than stated AND already live (not a future bump)

1. **B1-W3 already excised the glass-ui-side retarget re-roll.** The proto's benign framing — "the snap no-op silently no-ops; the C¹ fling still works via `reset`+`decayRest`+`spring.target`" — is the **BB-era** code. At HEAD, `useDragMorph.ts:26` reads "glass-ui owns NO `decayRest` + nearest-center + `spring.target` re-roll," and `onPointerUpCapture` (`:340-348`) does nothing but flip a flag, relying **entirely** on the engine's native `snap`. On a consumer pinned at kf 5.0.0, `snap` does not exist → the release flings via decay and **never snaps to a detent at all**. That is a **broken core gesture** (the tab/dock pull lands wherever momentum coasts), not a degraded refinement. The proto's severity ("silent no-op of an additive refinement") is wrong against shipped code.

2. **The owner the proto names (BH.B1-W2) has already run** — and ran WITHOUT the kf peer bump. The friction-class the proto catalogues (an API binding shipped while its peer floor lags) has **already recurred and shipped into HEAD**. C1 is a LIVE repo defect right now, not a plan amendment. CT-1's owner MUST be re-homed onto a wave that has not yet run (a BG close-fix / BG.W-CUT), because B1 is closed. Re-targeting a closed wave is itself the disease.

### C2 is MOOT against HEAD — the `^1.2.0` it fixes was never executed; the `^1.1.1` it prefers is unsupported

1. **The executed peer is `^1.0.0`, not `^1.2.0`.** `proof:peer-conformance` runs GREEN at HEAD on `^1.0.0` (admits latest 1.1.1; kf's `^1.2.0 ⊆ ^1.0.0`; destraddled). There is no `^1.2.0` peer to fix — C2-fix-#1 is a no-op against the tree.

2. **The `^1.1.1` floor justification is unsupported.** The proto: "`wcagContrastRatio` first shipped in value.js 1.1.1 = the genuine minimum." `grep wcagContrastRatio src/ scripts/` → **zero hits.** glass-ui does not call it. No API in the tree demands a floor above `^1.0.0`; the executed `^1.0.0` is correct. Narrowing to `^1.1.1` would be a pointless over-pin — the *inverse* of the C1 disease.

3. **C2-fix-#3 targets a gate that does not exist.** No `proof-field-aurora*.mjs` on disk (W-GATE-FIELD-AURORA is PENDING WS7). `grep -rln '\^1\.2\.0' scripts/` finds the literal in **exactly one file**: `proof-peer-conformance.mjs` (PINNED constants). The "5 stale strings at named line numbers" are uncheckable — doc/future-spec, not a live artefact.

4. **The ONE real C2 residual — PINNED_LATEST offline blind spot — is INERT at HEAD.** `PINNED_LATEST.value = "1.2.0"` ≠ dist-tag `1.1.1` is true and a latent smell, but at the executed `^1.0.0` peer it can never false-green (both 1.1.1 and 1.2.0 admitted). It would only bite a re-introduced `^1.2.0`+ floor. The proto bundles this real-but-inert hygiene fix with the moot `^1.2.0` fix, making C2 read live when only this sub-point survives — as *pre-emptive* hygiene, not a current defect.

**Net on C1/C2:** The proto is built on `BH/PLAN.md:62` (`^1.2.0`) and `FINAL.md:509` (`^1.1.1`) — two stale plan/decision artefacts — **without reconciling against the executed `package.json` (`^1.0.0`) and the executed `useDragMorph.ts` (snap-excised).** This is *exactly* the friction-class PT-6 exists to kill ("dev/CI green while shipped state is wrong"), recurring inside the corrected-approach spec.

---

## 2 · The three SOUND legs (G3/G4/L15) — confirmed (all analyze PENDING waves)

WS2/WS5/WS6/WS8 verified PENDING in EXECUTION-PROGRESS.md, so these are genuinely forward-looking.

- **G3 (ci.yml re-emit): CONFIRMED.** `glass-idiom-factor` ci-tagged + absent from ci.yml. The build-map:451 over-claim ("emit adds category-card-warm") is real — `category-card-warm` is `["local"]`, so `--emit-ci` cannot add it. Double-emit ordering (CLOSEFIX R3 early, BH-B2.1-swap final) sound. NON-MUTATING NOTE: I did NOT re-run `--emit-ci` (the proto did and reverted); I confirmed via static grep + tag-read. A read-mostly critic should not mutate ci.yml even transiently — recommend the proto's evidence cite the static path, not a revert-after-mutate.

- **G4 (3 stale AZ hashes): CONFIRMED EXACT — strongest leg.** All three declared→current hashes match to the digit. Gate `["local"]`, exits 1, reds `--run full`. Banner-not-reshoot discharge (WS2 redesigns dock + WS5 rewrites constellation; gate AFTER WS2∧WS5 in W-CLOSE-SWEEP) correct; ordering edge real. Refinement: the proto cites `proof-gate-manifest-sound.mjs:488-509` for the discharge paths — I did not re-read those exact lines; flag for the W-CLOSE-SWEEP owner to confirm the banner-clause mechanism at execution.

- **L15 (budget net-lift): CONFIRMED.** BUDGETS walks 6; siri/refract absent; constellation+fourier present (REMOVE side). Un-walked-chunk hole real; critical-path-weight concern (WS8 GL off the root eager graph) correct. The proto's own residual (WS8 refract chunk name unconfirmed) I confirm: build-map row 13.2 names "5 GL refraction sites — hero CTA + dock plate," which may compose into existing chunks. The name-agnostic CT-6 assertion survives the uncertainty — keep it.

---

## 3 · Does the fix introduce a NEW friction-class of the same shape? YES — two ways

1. **Plan-vs-executed drift (cardinal recurrence).** A reader applying the proto's §3 amendment table verbatim would: set value peer `^1.1.1` (re-narrowing a green `^1.0.0`), re-target the closed B1-W2, and chase `^1.2.0` strings in a non-existent gate. The amendment generates *new* drift, not closure.

2. **CT-2's grep self-contradicts and would FALSE-RED.** CT-2 = `grep -rn '\^1\.2\.0' package.json scripts/` → "no value.js `^1.2.0` literal anywhere." But `proof-peer-conformance.mjs:46` carries `PINNED_KEYFRAMES_VALUE_DEP = "^1.2.0"` — which the proto itself says (correctly) to KEEP (it's kf's transitive dep). CT-2 as written would flag a literal the proto wants kept → a cut-time check that reds on a correct state. CT-2 must scope to the value.js *peer/dev keys*, not a blanket `^1.2.0` grep across scripts/.

---

## 4 · What the proto gets RIGHT (keep)

- The **central diagnosis** (these ride to the irreversible tag because local node_modules/dist resolve right while shipped ranges/artefacts are wrong) is correct for C1, G3, G4, L15.
- The **CT-1..CT-6 mechanism** is the right mitigation shape; folding CT-1/CT-3 into `proof:peer-conformance` and CT-6's un-walked-chunk assertion into `profile:budget` is the correct machine-enforce move.
- **C1's gate-blindness root cause** (peer-conformance checks `satisfies(latest, range)`, never `floor ≥ API-version`) is the real novel insight — CT-1's machine-enforcement is genuinely valuable; it's just mis-owned (B1 ran) and its severity understated (broken gesture).
- The **honest precondition** (§5 close: per-cause checks read individually, not a green `--run ship` aggregate) is exactly right and avoids the prior cut-time spec's over-claim.

---

## 5 · convergencePct rationale

**45.** The mechanism + three of five legs (G3/G4/L15) are amend-ready. But the two LEAD legs (C1/C2) require a full re-grounding against the EXECUTED tree before any amendment: C1's owner and severity are wrong (B1 already ran; broken-gesture not no-op), C2 is largely moot (`^1.0.0` shipped green; `wcagContrastRatio` unused; the G6-spike gate doesn't exist), the CT-2 grep self-contradicts, and the §3 amendment table as written would inject new drift. Not ready to amend the plan as-is.
