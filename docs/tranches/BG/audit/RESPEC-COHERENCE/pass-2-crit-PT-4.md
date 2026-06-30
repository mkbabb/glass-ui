# crit-PT-4-pass1 (glass-key) — ADVERSARIAL HARDENING of `pass-1-proto-PT-4.md`

**Mode:** adversarial critique · PASS 1 · target = `pass-1-proto-PT-4.md` (`--glass-key-*` single-source + WS8←WS9 DAG-edge correction)
HEAD: `tranche/BG` · siblings-intact exit 0 before + after · wrote ONLY under `docs/tranches/BG/audit/RESPEC-COHERENCE/`
Charge: does the fix resolve the coherence issue across ALL waves it touches (not just WS9)? Does it introduce a NEW friction-class repeat of the same shape it fixes?

> **FILING-COLLISION (orchestrator action — confirmed, COMPOUNDED):** the path `crit-PT-4-pass1.md` ALREADY holds a C-SAFARI/`uChromatic` crit (the PT-5 topic — exactly the mis-file the PT-4 author flagged for the proto). I did NOT overwrite it (the uChromatic crit is in the working tree, not just git history; overwriting would have destroyed it). This PT-4 (`--glass-key-*`) crit lands at `crit-PT-4-pass1-glass-key.md`. The orchestrator must re-home BOTH mis-filed `uChromatic` artifacts (`crit-PT-4-pass1.md` + the prior proto content) onto the PT-5 slot, then rename this file to the canonical `crit-PT-4-pass1.md`.

---

## Verdict: the spec is ~55% ready. The diagnosis spine is sound; but the spec read SUPERSEDED passes, and three of its amendments are factually wrong on disk and would REGRESS the authoritative converged spec.

PT-4's **R/F sibling-conventions diagnosis is correct and well-grounded.** But the spec read **SPEC-pass4** (WS12) and **SPEC-pass2 / SPEC-pass1-converged** (WS9) and never opened the authoritative **SPEC-pass4-converged §0E-1** (WS12), which has ALREADY corrected A6 — more thoroughly, with a grep PT-4 didn't run, and with a DIFFERENT invariant PT-4's proposal would WEAKEN. Three amendments (§3.D liquid-morph, §3.D/§5.2 A6-invariant, §3.A bevel-reads-R) are wrong against HEAD.

---

## CONFIRMED-SOUND (verified on disk; KEEP)

| PT-4 claim | Verification | Verdict |
|---|---|---|
| R at `glass-fx.css:114-117`, plain px, no `@property`, read directly by rim | confirmed (114-117; rim.css:91-93; dark-arm.css:412-416) | SOUND |
| under-shadow tiers at **434-436** (GU-1 doc + SPEC-pass1/2 say 430-432 — drift) | confirmed: tiers 434-436, spine 437; GU-1 doc says 430-432 + `--glass-key-shade-x @ :112` (actually :116) | SOUND — anchor correction is real (off by ~2-4 lines) |
| F grep-ABSENT at HEAD; mints `-0.375` cast-ratio via `calc(px*ratio)` | confirmed: 0 hits in src/scripts; GU-1 mints `-0.375` | SOUND |
| F is plain-custom, NO `@property` → no de-registration risk | confirmed: no `glass-key` in property-regs.css | SOUND |
| banned-angle claim OVERSTATED — `:106-109` bans CSS trig in the RIM box-shadow; `calc(px*ratio)` ≠ trig | confirmed: comment bans `-58deg`/cos/sin trig; F is a ratio | SOUND — important positive fence |
| WS8 §1 Precond lists NO GU-1/F; WS8 §1 body never references F | confirmed: Precond = "WS3-M3 contain + WS3 saturate revert" | SOUND |
| spurious "WS8 bevel reads it" lives at build-map:692-693 + FINAL.md:418 (PROSE, not the WS8 spec body) | confirmed at both lines | SOUND — striking the prose is correct + bounded |
| dock/overflow.css:143 = `0 8px 32px -4px color-mix(...)`, leading X=0 | confirmed | SOUND |
| substitution-trap: under-shadow composed at `:root` reads F → descendant override doesn't re-compose | structurally correct (`--glass-bg-dock` shape) | SOUND doc-only discipline |

The KEEP-BOTH-as-siblings decision is the RIGHT model and survives. **The DAG-edge deletion (strike WS8←WS9 at build-map:692-693 + FINAL.md:418) is correct, bounded, and the single highest-value fix in the spec.** The "F is NOT a `@property` token, so it does NOT share the G-2 dead-knob profile" carve-out (§6 residual #3) is also a genuine improvement — it correctly un-groups F from the G-2 `@property` cohort that mis-bundled it.

---

## FAIL-1 (CRITICAL) — the liquid-morph `135deg` "third azimuth" DOES NOT EXIST. §3.D EXEMPT + §6 hand-off are built on a phantom.

PT-4 §1 (table row G), §3.D, §6 residual #1, §8 headroom #2 all treat `liquid-morph.css:190/463/734`'s `135deg` as a real third key-light azimuth needing EXEMPT + a §2.P1 rehome hand-off. **On disk those three `135deg` are `.liquid-pill-album` FAKE ALBUM-ART thumbnail gradients** — `linear-gradient(135deg, var(--section-color-8), var(--section-color-7) 55%, …)` (brand-ramp fills inside `.liquid-pill-album { border-radius … }`), ZERO relation to the key light. Verified by `sed -n '188,192p'`.

The authoritative **SPEC-pass4-converged §0E-1** already grep-DEMOTED it:
> *"`liquid-morph.css:190/463/734` carry NO `135deg` key cue (the cited lines are `.liquid-*-album` fake album-art thumbnails, not key-light registers). REMOVED from `KEY_REGISTERS`, recorded NOT-A-KEY-CUE."*

Consequence: PT-4 exempts something never enrolled; its §6 "liquid-morph hand-off depends on which §2.P1 owner survives" is MOOT for A6; its §8 headroom about the rehome is a non-issue. The entire liquid-morph thread re-imports a stale-spec error (SPEC-pass4 §0D-1) that §0E-1 already killed.

---

## FAIL-2 (CRITICAL) — PT-4's A6 invariant (hemisphere-SIGN coherence) is WEAKER than and CONTRADICTS the authoritative converged invariant (shared-SOURCING). It re-opens the fork it claims to close.

PT-4 §3.D/§5.2 re-specs A6 to **hemisphere-sign coherence** ("SIGNS of R, SIGN of F, grain azimuth all agree; MAGNITUDES may differ"). But **SPEC-pass4-converged §0E-1** already SCOPED A6 — explicitly — to **shared-SOURCING, NOT sign agreement**:
> *"FAMILY-MEMBERSHIP verifies SHARED-SOURCING (every register calc-derives from ONE canonical `--glass-key-*` azimuth), NOT directional AGREEMENT — a companion can hold a contradictory literal angle and still green if it READS the spine."*

PT-4's is the inferior form:
- §0E-1 (shared-sourcing): a hardcoded literal with the right SIGN but reading NO spine token FAILS (it didn't read the source). Catches the fork.
- PT-4 (hemisphere-sign): that same un-sourced literal PASSES (sign agrees). **PT-4 RE-OPENS the fork.**

This is the friction-class REPEAT the charge asks about: PT-4 is fixing "split-brain dual-source bound by a gate" — and its proposed gate invariant is precisely the weaker form that lets the split-brain back in. The fix should ADOPT §0E-1's source-derivation arm, not replace it with a weaker sign check.

Compounding errors in §3.D: the edit-target (`SPEC-pass4 §0`) is SUPERSEDED by SPEC-pass4-converged; and build-map:805-806 does NOT carry the over-reach — it already reads "owns the WS8(bevel)+WS9(GU-1 tooth) `--glass-key-*` SPINE that A6 reads" (a shared-source framing aligned with §0E-1). PT-4 would edit a correct line + a stale spec while leaving the authoritative §0E-1 untouched.

---

## FAIL-3 (HIGH) — §3.A "bevel upper-edge ← --glass-key-lit-y, lower-edge ← --glass-key-shade-y" is a FABRICATED wiring that FIGHTS the WS8 build.

PT-4 §3.A would amend WS8 §1 to assert the bevel reads R per-axis. The authoritative **WS8 SPEC-pass4-converged** specifies the opposite:
- `--glass-bevel-active`/`--glass-bevel-upper` are NET-NEW bright-bloom catch-light tokens (`hsl(40 30% 99%)` warm-cream), NOT R readers (§122-124).
- M7 reconcile (§128) explicitly **re-points `--glass-rim-bottom`'s BOTTOM stop UNDER the bevel** via a rim-private token — WS8 is DE-coupling the bottom edge from `--glass-key-shade-y` (the iOS-26→iOS-27 GAP fix: "the bottom edge gets `--glass-key-shade-y: -1px` dark shade — the OLD iOS-26 model, now the GAP," §118).

So §3.A would (a) invent a wiring WS8 never states, and (b) re-couple the bottom bevel edge to `--glass-key-shade-y` exactly where WS8 is breaking that coupling. A real coherence hazard INTRODUCED by the "fix." Keep only the NEGATIVE clause PT-4 has right ("the bevel does NOT read F"); DROP the positive "bevel reads R per-axis." The bevel is a bright-bloom register hemisphere-coherent by construction (bright upper + bright lower), not a literal R reader.

---

## CROSS-WAVE COMPLETENESS (the charge: ALL waves it touches)

- **WS3 GLASS-TINT-UNIFY (3.5) also edits glass-fx.css** (build-map:181, `--glass-tint-bias-*`/`--glass-fill-tint`) and runs BEFORE WS8/WS9 (`WS1→WS3→…→WS8→WS9→…→WS12`). PT-4 never mentions it. Regions are disjoint (tint-bias block vs the `BD.W-GLASS-KEY-EDGE` keystone), so the F mint is safe — but PT-4 should RECORD the disjoint-region fact (THREE waves touch glass-fx.css: WS3 tint-bias, WS8 bevel, WS9 key; only WS9's keystone region is the key spine), so a build agent doesn't reorder/collide the keystone. MINOR completeness gap.
- **The grain azimuth==token numeric lock (WS9 M3) already exists** as MUSTFIX in SPEC-pass1-converged. PT-4 §5.1's "promote bonus hemisphere clause → mandatory" adds a SECOND, partly-redundant guard. With §0E-1's shared-sourcing covering the under-shadow F (reads the spine) and M3 covering the grain azimuth, an independent hemisphere-SIGN clause has thin marginal value. KEEP M3's azimuth==token lock; DROP the redundant sign-clause OR fold it as advisory-only.
- **A7 concentricity** (the other new WS12 census arm) — correctly out of PT-4 scope.

---

## What PT-4 must become (the corrected corrected-approach)

1. **KEEP** the R/F sibling decision, the DAG-edge deletion (build-map:692-693 + FINAL.md:418), the anchor corrections (434-436; `:112`→`:116`), the substitution-trap note, the banned-angle-overstated fence, and the F-is-not-`@property` carve-out. These are the spec's real value.
2. **DROP the entire liquid-morph thread** (§1 row G, §3.D EXEMPT, §6 #1, §8 #2). Replace with one line: "liquid-morph 135deg = `.liquid-pill-album` brand-gradient, NOT a key cue — already DEMOTED in SPEC-pass4-converged §0E-1; no A6 action."
3. **REPLACE the A6 invariant** with §0E-1's shared-SOURCING (each register calc-derives from one canonical `--glass-key-*` spine), NOT hemisphere-sign. Re-target SPEC-pass4 → SPEC-pass4-converged (note it is ALREADY correct there; PT-4's job shrinks to "confirm §0E-1 is the frontier; do not re-litigate"). Strike the build-map:805-807 edit (the line is already shared-source-framed).
4. **DROP §3.A's positive "bevel reads R per-axis."** Keep only "bevel does NOT read F." Add the WS8 reality (bright-bloom register; M7 re-points the bottom stop UNDER the bevel, decoupling from `--glass-key-shade-y`).
5. **ADD the WS3-also-touches-glass-fx disjoint-region note.**
6. **RECONCILE the stale-spec hazard:** state PT-4 advances against SPEC-pass4-CONVERGED (WS12) + SPEC-pass1-converged (WS9), so a develop agent does not apply PT-4's edits to the superseded pass and re-introduce §0E-1-deleted errors.

---

## passConvergence (crit, honest): ~55%

Diagnosis spine sound; DAG-edge deletion + anchor corrections ship-ready. Three amendments (§3.A bevel-reads-R, §3.D liquid-morph exempt, §3.D/§5.2 hemisphere-sign A6) are factually wrong on disk and would REGRESS the authoritative SPEC-pass4-converged §0E-1. Root cause: reading superseded passes. PT-4 cannot amend the plan as written — it would mis-direct the develop agent.

**siblings-intact exit 0 before + after; wrote ONLY under RESPEC-COHERENCE/.**
