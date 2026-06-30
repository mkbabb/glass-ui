# PT-4 — `--glass-key-*` single-source decision + WS8←WS9 DAG-edge correction (CORRECTED-APPROACH SPEC)

**Mode:** spec (corrected-approach) · **PASS 1** · Targets **§2.T4 (HIGH)** + **§2.T1 (MED)**
HEAD: `tranche/BG` @ `6c1f5386`-line · siblings-intact: exit 0 (before + after) · scope: READ-MOSTLY, wrote only under `docs/tranches/BG/audit/RESPEC-COHERENCE/`
Anchors re-verified directly on disk this pass (line numbers exact at HEAD).

> **FILING NOTE (for the orchestrator):** the prior committed content at this path was a mis-numbered C-SAFARI `uChromatic` spec — that topic is **PT-5** (§2.T2/§2.M4) per `pass-1-spec.md` §4. This file now holds the assigned **PT-4** (`--glass-key-*`, §2.T4/§2.T1). The prior content is recoverable from git history; the `uChromatic` work + its `crit-PT-4-pass1.md` should re-home onto the PT-5 slot.

---

## 0. Verdict + feasibility

**feasible = YES, the fix HOLDS.** It is a SPEC/DAG correction (zero new mechanism, zero feasibility unknown), bounded to five doc edits + one gate-clause promotion + one DAG-edge deletion. No `src/` change is owed by *this spec* beyond what WS8/WS9 already plan; PT-4's job is to make those waves execute the right thing.

**The pass-1-spec PT-4 framing is itself imprecise and must be corrected.** It calls `--glass-key-direction` an "azimuth" and poses a binary — *KEEP per-axis `--glass-key-{lit,shade}-{x,y}` vs DERIVE per-axis from one `--glass-key-direction` azimuth.* On disk that is a **false dichotomy**: the token is a cast-RATIO (not an azimuth), it feeds a DIFFERENT mechanism than the rim, and **neither family can cleanly derive from the other** because they encode different physical quantities. The correct decision is a third option the pass-1-spec did not enumerate: **KEEP BOTH as sibling expressions of one key, bound by a sign-coherence invariant — not by arithmetic derivation.** Detail below.

---

## 1. Ground truth (what is actually on disk — correcting the finding's imprecision)

Three independent representations of "the one upper-right key light" coexist, each a DIFFERENT numeric convention because each renders a different physical effect:

| # | Token(s) | Form | Physical effect | Conceptual angle | Readers (verified on disk) |
|---|---|---|---|---|---|
| **R** | `--glass-key-{lit,shade}-{x,y}` | per-axis ±px **sign** | which EDGE catches light vs grounds in shadow (rim/bevel) | 45° cel KEY (corner-diagonal) | `glass-fx.css:130-134` (`--glass-rim-top/-bottom`), `rim.css:91-93` (`--glass-material-rim`), `dark-arm.css:412-416` (dark rim) |
| **F** | `--glass-key-direction` (GU-1, **grep-absent at HEAD**) | scalar cast-**ratio** (`-0.375` = tan 20.56°) | how far the soft drop-shadow leans horizontally | 20.56° soft FILL (gentler than the cel key, **by design**) | `--glass-under-shadow-{quiet,default,vivid}` (`glass-fx.css:434-436`, via `calc(Npx*ratio)`), `dock/overflow.css:143`, the WS9 grain `feDistantLight` azimuth (derived `atan2`) |
| **G** | (none — hardcoded `135deg`) | CSS gradient degree | liquid-morph gradient sweep | a THIRD raw azimuth | `src/styles/glass/liquid-morph.css` (demo-bound; being rehomed WS3 3.11 / WS7 12.1 — §2.P1) |

Verified facts at HEAD:
- **R is declared at `glass-fx.css:114-117`**, in the `:root` block, **plain px values** (NO `@property` registration). Read DIRECTLY by the rim — it is the wired source, **NOT a dead-knob**.
- **`glass-fx.css:106-109` BANS the trig-angle representation** *for the rim specifically*: "expressed NOT as a `-58deg` angle with sign-inverted cos()/sin() trig (the glass-material sign trap — banned here), but as two PLAIN per-axis sign tokens."
- **F is GREP-ABSENT at HEAD** (`--glass-key-direction` does not yet exist; SPEC-pass4 §0 confirms "GREP-ABSENT"). GU-1 (`coordination/GU-1-glass-key-fill.md`) mints it as `-0.375`, a cast-ratio applied via `calc(Npx * var(--glass-key-direction))` — **no trig function, no degrees in CSS.**
- **WS8 §1 (`BG.W-GLASS-SUFFUSE-UNIVERSAL`, build-map:613-620)** touches `glass-fx.css` to mint `--glass-bevel-*` + edits `rim.css`. Its spec body reads the **R family**, NOT F. Its `*Precond:*` is "WS3-M3 contain clip host + WS3 saturate revert" — **lists NO GU-1 / no F dependency.**
- **The WS9 header (build-map:692) and FINAL.md:418 CLAIM "WS8 bevel reads it [`--glass-key-direction`]."** This is the **spurious read edge**: WS8 runs BEFORE WS9 (`WS8 → WS9`, build-map:10), F is minted in WS9 §0, and WS8 §1 does not actually read F. Executed literally → WS8 reads an undefined custom property OR an agent wires a backwards dependency.
- **WS12 A6 (`BG.W-GLASS-PAPER-CONGRUENCE`, build-map:805-807)** runs LAST, precond "WS8 bevel + WS9 GU-1 committed" — **ordering is CORRECT** (it reads after both land). But **SPEC-pass4 §0's A6 assertion over-reaches**: "ONE azimuth source is read by the glass rim AND the paper tooth AND the liquid-morph gradient AND the bevel." That is impossible to satisfy as single-azimuth-IDENTITY — R is a px-sign not an azimuth, and the cel KEY (45°) ≠ the soft FILL (20.56°) deliberately. A6 can only assert single-HEMISPHERE coherence.

**The genuine defects (re-stated precisely):**
1. **§2.T4-a — split-brain key (dual source-of-truth), NOT a dead-knob.** R and F are SIBLING knobs for one conceptual light. A consumer who treats `--glass-key-direction` as "the key knob" and re-points it gets the under-shadow + grain to move but the rim/bevel to stay put — the "one light" coherence silently forks. (The finding's "dead-knob / re-pointing the azimuth won't move the rim" is technically true but mis-diagnoses it: F is NOT dead — it is live for its own carriers; the defect is the *forkable dual source*, mitigated only by a gate, not by single-sourcing.)
2. **§2.T4-b — the WS8←WS9 read edge is spurious + DAG-inverting.** WS8 must not be specified to read a WS9-minted token. WS8 bevel reads the EXISTING R family.
3. **§2.T4-c — WS12 A6's assertion is physically over-specified** (single-azimuth-identity vs single-hemisphere-coherence).
4. **§2.T1 — F rides the substitution-trap.** `--glass-under-shadow-*` is composed at `:root` reading F, so a DESCENDANT-scope F override does NOT re-compose the inherited under-shadow (the exact `--glass-bg-dock` / `--dock-scale` shape). No `@property` de-registration risk (R and F are both plain customs — the safe convention GU-1 already specifies), but the read-at-`:root` discipline is unstated in the GU-1/WS9 spec.

---

## 2. The decision (the corrected single-source model)

### 2.1 Why "pick one + derive the other" FAILS (both directions)

- **DERIVE R from F** (make the ratio THE source, compute the rim ±px signs from it). **Rejected:** R encodes an edge-SELECT SIGN at the 45° cel hemisphere; F encodes a soft-FILL cast MAGNITUDE at 20.56°. A future fill-magnitude retune (steeper soft cast, e.g. `-0.5`) must NOT change the rim (still ±1px edges, same hemisphere). Coupling them mis-binds two genuinely-different magnitudes — the EXACT mis-couple GU-1's own keystone comment fences ("two magnitudes for one light"). It would also force `calc(sign(...) * -1px)` derivation back into the rim box-shadow — flirting with the `glass-fx.css:106-109` ban.
- **DERIVE F from R** (make the px signs THE source, compute the ratio from them). **Rejected:** a ±1px sign carries only the HEMISPHERE (left vs right), not the 20.56° FILL-lean magnitude. You cannot recover `-0.375` from `±1px`. The cel KEY (45°) and the soft FILL (20.56°) are deliberately different angles for one light; R simply does not hold F's information.

**Conclusion: R and F are sibling CONVENTIONS of one light, not parent/child.** The single-source-of-truth must be enforced **semantically + by a sign-coherence invariant**, not by arithmetic derivation.

### 2.2 The decision (CANONICAL)

> **KEEP BOTH families. Neither derives from the other.** `--glass-key-{lit,shade}-{x,y}` (R) stays the canonical RIM + BEVEL edge-select source (the rim reads it directly — wired, not dead). `--glass-key-direction` (F) stays the canonical UNDER-SHADOW-FILL + GRAIN-azimuth cast-ratio (it is wired for those — live, not dead). They are two magnitudes for ONE upper-right key. The "one light" is enforced by a **mandatory hemisphere-sign-coherence invariant** (gate-locked): the SIGN of F, the SIGNS of `--glass-key-lit-{x,y}`, the WS9 grain `feDistantLight` azimuth, and (where it is a library carrier) the bevel edge-select all agree on the upper-right hemisphere; each carrier's MAGNITUDE may differ by design.

This eliminates the **dual source-of-TRUTH** (there is now ONE documented semantic spine + ONE invariant that catches a fork) while keeping the two genuinely-distinct rendering conventions. It is the only model consistent with GU-1's "two magnitudes for one light" framing AND the physical cel-45°/fill-20.56° split.

---

## 3. Exact wave amendments

### A — WS8 §1 `BG.W-GLASS-SUFFUSE-UNIVERSAL` (build-map:613-620): make bevel-reads-R explicit, NO F dependency

- Add to the spec body: **"the iOS-27 bevel's upper/lower edge reads the EXISTING `--glass-key-{lit,shade}-{x,y}` family (R) — bevel upper-edge ← `--glass-key-lit-y`, lower-edge ← `--glass-key-shade-y` — the SAME source the rim reads. The bevel does NOT read `--glass-key-direction` (F is the under-shadow/grain cast-ratio, a different convention; reaching for it here would be the banned cross-magnitude couple)."**
- `*Precond:*` UNCHANGED (no GU-1 added — WS8 has no F dependency). This is the load-bearing correction: it keeps WS8 build-INDEPENDENT of WS9.

### B — WS9 §0 GU-1 token (build-map:695-696) + `GU-1-glass-key-fill.md`: substitution-trap note + spine-comment

- The mint stays exactly as GU-1 specs (`--glass-key-direction: -0.375` in the `BD.W-GLASS-KEY-EDGE` keystone `:root`, right after `--glass-key-shade-x` at `glass-fx.css:~117`; derive the 3 under-shadow X at `:434-436`; re-point `dock/overflow.css:143` leading `0` → `calc(8px * var(--glass-key-direction))`). **Anchor correction:** the under-shadow tiers live at **`glass-fx.css:434-436`** (the GU-1 doc + SPEC-pass1/2 say `430-432` — a ~4-line drift; correct the GU-1 anchor to 434-436). `overflow.css:143` confirmed (`0 8px 32px -4px color-mix(...)`).
- **ADD the keystone-comment spine block** (one block, the single documented home): the `BD.W-GLASS-KEY-EDGE` `:root` now holds **TWO magnitudes for ONE light** — edge-SELECT px SIGN tokens `--glass-key-{lit,shade}-{x,y}` (R, the rim/bevel, 45° cel key) and the cast-RATIO `--glass-key-direction` (F, the under-shadow/grain, 20.56° soft fill). Neither derives from the other; both lean upper-right; the WS12 A6 gate locks the hemisphere agreement. (GU-1's §Framing already drafts the mis-couple fence — promote it into the source comment verbatim.)
- **ADD the substitution-trap note (§2.T1 discipline):** `--glass-under-shadow-*` is composed at `:root` reading F, so a DESCENDANT-scope `--glass-key-direction` override does NOT re-compose the inherited under-shadow on that scope — a per-scope key lean RE-DECLARES `--glass-under-shadow-*` on the scope (the documented `--glass-bg-dock` retune precedent). The `:root`-level default override works as expected. F is a plain custom (matching R's convention) — **no `@property` registration, no de-registration risk** (unlike §2.T3 TINT-UNIFY).

### C — WS9 header (build-map:692) + FINAL.md:418: STRIKE the spurious "WS8 bevel reads it" edge

- build-map:692, change "GRAIN-REAL's azimuth derives from it; **WS8 bevel + WS12 A6 spine both read it**." → "GRAIN-REAL's azimuth derives from it. **The bevel reads the EXISTING `--glass-key-{lit,shade}-{x,y}` family (R), NOT `--glass-key-direction`; only WS12 A6's congruence census reads F (after WS9 lands).**"
- FINAL.md:418, change "**WS9's `--glass-key-direction` token lands FIRST** (WS8 bevel + WS12 A6 spine both read it)." → "**WS9's `--glass-key-direction` token lands FIRST WITHIN WS9** (the GRAIN-REAL azimuth derives from it). It is NOT a WS8 precond — the WS8 bevel reads the existing `--glass-key-{lit,shade}-{x,y}` family; only WS12 A6's congruence census reads F, after WS9 commits."

### D — WS12 A6 `BG.W-GLASS-PAPER-CONGRUENCE` (build-map:805-807) + SPEC-pass4 §0: azimuth-IDENTITY → hemisphere-COHERENCE; scope to LIBRARY carriers

- Re-spec the A6 assertion from SPEC-pass4's "ONE azimuth source is read by the glass rim AND the paper tooth AND the liquid-morph gradient AND the bevel" to: **"ONE upper-right HEMISPHERE: the SIGNS of `--glass-key-lit-{x,y}` (R), the SIGN of `--glass-key-direction` (F), and the WS9 grain `feDistantLight` azimuth all agree on the upper-right key. Each carrier's MAGNITUDE may differ by design (cel KEY 45° / soft FILL 20.56°) — A6 asserts hemisphere coherence, NOT angle identity."**
- **Scope the A6 spine-read to LIBRARY carriers** (rim R + bevel R + under-shadow F + grain F). **EXEMPT `liquid-morph.css`'s `135deg` (the third raw azimuth):** it is demo-bound and being rehomed out of `src/` (WS3 3.11 / WS7 12.1 — §2.P1). A6 must not assert spine-membership on a file leaving the library; record the liquid-morph reconcile as a SEPARATE demo concern in the §2.P1 owner (re-point its gradients to lean upper-right OR exempt as demo-decoration), NOT an A6 library-spine clause. This prevents A6 over-reaching into a departing file.
- `*Precond:*` UNCHANGED ("WS8 bevel + WS9 GU-1 committed", runs LAST) — the ordering was correct; only the assertion semantics + carrier scope change.

### E — the keystone-comment ban re-affirmation (the §2.T4 banned-angle concern, scoped right)

The finding's "the azimuth re-introduces the banned angle representation" is **overstated** and must be recorded correctly so a future agent does not "fix" a non-violation:
- `glass-fx.css:106-109` bans **CSS trig (cos/sin/deg) in the RIM box-shadow.** `--glass-key-direction: -0.375` is a RATIO applied via `calc(px*ratio)` — **no trig, no degrees in CSS → it does NOT violate the ban.**
- The only degree value is the WS9 grain `feDistantLight azimuth` literal (`≈290.56`), which lives in an SVG data-URI (`feDistantLight` GENUINELY requires a degree azimuth — unavoidable) and is gate-locked to `atan2(token)` ±1° (SPEC-pass2 §A1). SVG-azimuth ≠ the banned CSS-box-shadow trig.
- **ADD a positive fence to the spine comment:** the ban stands — no rim/bevel key may be expressed as CSS trig/deg, and `--glass-key-direction` must STAY a `calc(px*ratio)` cast (never converted to a `rotate()`/trig in any box-shadow consumer). The mandatory SVG-azimuth derivation is the ONE sanctioned degree expression, and it lives outside CSS box-shadow.

---

## 4. The DAG-edge correction (the structural fix)

The DAG (build-map:10) is `… → WS8 → WS9 → … → WS12`. The corrected edges for the key spine:

| Edge | HEAD (claimed) | CORRECTED |
|---|---|---|
| WS8 bevel ← `--glass-key-direction` (F) | **present** (build-map:692, FINAL.md:418) | **DELETED** — WS8 bevel reads R (existing on disk); WS8 has NO GU-1/F precond; WS8 stays build-independent of WS9 |
| WS9 §0 (F mint) → WS9 §1 (GRAIN-REAL azimuth) | present, intra-WS9 | **KEPT** — "GU-1 lands FIRST within WS9", grain azimuth derives from F |
| WS9 §0 (F mint) → `--glass-under-shadow-*` + `overflow.css:143` | present | **KEPT** — F's live carriers |
| WS12 A6 ← {R, F, grain azimuth} | present, A6 runs LAST | **KEPT** (ordering correct) — assertion corrected to hemisphere-coherence (§3.D) |

Net: the ONLY change to the machine DAG is **deleting the spurious WS8←WS9 read edge.** The build engine re-derives the DAG from prose each boot (`bg-bh-execute.wf.js` encodes zero static edges — per §2.D1), so the correction lands by fixing the PROSE at build-map:692 + FINAL.md:418 (§3.C). After the fix, no wave reads a token minted by a strictly-later wave: WS8 reads R (on disk at HEAD), WS9 mints+reads F, WS12 reads both after they commit.

---

## 5. The verifying check

Two gate surfaces, both already planned — PT-4 promotes/corrects them:

1. **`proof:paper-grain` (WS9, `BG.W-PAPER-GRAIN-REAL`) — promote the hemisphere clause from "bonus" to MANDATORY.** SPEC-pass2 §A1 already drafts a "bonus hemisphere-coherence clause." Make it a REQUIRED clause:
   - `azimuth == atan2(-1, -(--glass-key-direction)) · 180/π mod 360 ≈ 290.56` (±1°) — the existing numeric lock (the data-URI cannot read `var()`, so this is the only guard against silent grain-vs-token drift).
   - **NEW required clause — hemisphere-sign coherence:** the SIGN of `--glass-key-lit-x` (negative → right edge), `--glass-key-lit-y` (positive → top edge), the F sign, and the grain azimuth all resolve to the upper-right hemisphere. Born-RED is automatic at HEAD (F grep-absent); GREEN when WS9 lands F with the agreeing sign.
   - Self-test bite: a synthetic `--glass-key-direction: +0.375` (forked hemisphere) REDs the clause.

2. **WS12 A6 `proof:coherence-census` — the spine-read census, corrected to hemisphere-coherence (§3.D).** Born-RED at HEAD on the fragmented hardcodes (R local + F absent + grain absent); GREEN when WS8 bevel reads R + WS9 F lands + the grain azimuth agrees. Asserts: ONE upper-right hemisphere across the LIBRARY carriers (R-rim, R-bevel, F-under-shadow, F-grain); MAGNITUDES may differ; `liquid-morph.css` 135deg EXEMPT (demo, departing).

**No new gate is owed** — both already exist in the plan; PT-4 corrects their semantics (hemisphere-coherence, not azimuth-identity) and promotes the hemisphere clause to mandatory. The substitution-trap (§3.B) is doc-only discipline (the under-shadow descendant-override is a documented retune path, not a violation; the family's dead-knob-detection bar is the live-π-under-scope check tracked under convergence-gap G-2 / §2.T1).

---

## 6. What this does NOT fix (residual / hand-offs)

- **The liquid-morph `135deg` third azimuth** is reconciled OUT of A6's library-spine scope into the §2.P1 demo-rehome owner — PT-4 flags it but does not own its re-point (it is leaving `src/`; the right home is the WS3 3.11 / WS7 12.1 rehome decision, which §2.P1 already routes).
- **The cross-repo atlas consume** (GU-1 ships on the 4.4.0-line, atlas consumes fallback-first) is unaffected — F is additive/value-only, the two tests touching these tokens match by NAME not literal value (`proof-black-bar.mjs`, `proof-drawer-abrogate.mjs`), so the mint breaks no existing gate (GU-1 §Safety confirmed).
- **The §2.T1 dead-knob discipline for the OTHER new `@property` tokens** (`--siri-island-t` WS6, `--glass-depth`/`--glass-btn-press-t` WS8) is NOT absorbed here — those are registered `@property` customs with a different (inherits:true, read-at-element) profile and are tracked under convergence-gap G-2 / the standalone dead-knob spec (`pass-1-proto-PT-5.md`'s dead-knob arm in the current filing). `--glass-key-direction` is the ONE family that is plain-custom (no `@property`) and is fully resolved by this spec.

---

## 7. The exact edits (file → change), for the develop pass

1. `docs/tranches/BG/execution/bg-build-map.md` — **WS8 §1 (613-620):** add the bevel-reads-R explicit clause (§3.A), confirm NO GU-1 precond. **WS9 header (692):** strike "WS8 bevel … both read it" → R-not-F (§3.C). **WS9 §0 (695-696):** correct the under-shadow anchor `430-432`→`434-436`; add the substitution-trap note + spine-comment mandate (§3.B). **WS12 §5 A6 (805-807):** azimuth-identity → hemisphere-coherence + library-carrier scope + liquid-morph exempt (§3.D).
2. `docs/tranches/BG/FINAL.md:418` — strike the spurious WS8-bevel-reads-F claim (§3.C).
3. `docs/tranches/BG/coordination/GU-1-glass-key-fill.md` — correct the under-shadow anchor to `glass-fx.css:434-436`; mark the spine-comment + substitution-trap note as part of the §0 mint (§3.B).
4. `docs/tranches/BG/converge/BG-WS9-paper-deep/SPEC-pass2.md` (§A1) + `SPEC-pass1-converged.md` (M3) — promote the hemisphere-coherence clause from "bonus" to a REQUIRED `proof:paper-grain` clause (§5.1).
5. `docs/tranches/BG/converge/BG-WS12-coherence-congruence/SPEC-pass4.md` (§0 A6) — re-spec A6 to hemisphere-coherence + library-carrier scope + liquid-morph exempt (§3.D / §5.2).
6. **(SOURCE, owned by WS9 §0 at build — not this spec):** `src/styles/tokens/glass-fx.css` mint `--glass-key-direction: -0.375` in the `BD.W-GLASS-KEY-EDGE` `:root` + the spine-comment + derive the 3 under-shadow X at `:434-436`; `src/styles/dock/overflow.css:143` re-point. R (`glass-fx.css:114-117`, rim.css, dark-arm.css) is UNTOUCHED.

**Fence honored:** all reads under `/Users/mkbabb/Programming/glass-ui`; this SPEC wrote ONLY under `docs/tranches/BG/audit/RESPEC-COHERENCE/`; `verify-siblings-intact --quiet` exit 0 before + after.

---

## 8. passConvergence (PT-4 local)

**~92%.** The decision (KEEP-BOTH-as-siblings, sign-coherence invariant) is feasible and on-disk-grounded; the five doc edits + the one DAG-edge deletion + the gate-clause promotion are all bounded and ordering-safe. The ~8% headroom: the WS12 A6 hemisphere-coherence clause's exact `sign()` expression should be pinned against the live F value when WS9 mints it (the `atan2`/sign convention is documented here but not yet machine-pinned), and the §2.P1 liquid-morph hand-off depends on which owner (3.11 vs 12.1) survives the §2.P1 double-owner reconcile.
