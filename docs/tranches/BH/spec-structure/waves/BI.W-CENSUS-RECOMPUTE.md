# BI.W-CENSUS-RECOMPUTE — the cut-HEAD census recompute (the foundations snapshot)

> **Wave id:** `BI.W-CENSUS-RECOMPUTE` · **band:** S0 (SCAFFOLD) · **class:** `H` (device-free) · **gate:**
> `proof:structure-census` (`["local","ci"]`) · **preconds:** `published(5.0.0)`.
>
> The FIRST wave. Establishes the snapshot every later BI wave reads. The recompute-at-cut mandate is binding
> (STRUCTURE-SPEC freshness note + R6-7): every count below is a snapshot, RE-COMPUTED at the ACTUAL cut HEAD,
> never a verification-HEAD figure.

## §0 — Verdict

The tree moved under the live BG engine and cut 5.0.0; BI runs on the POST-cut HEAD. This wave freezes the
authoritative census — the numbers the FLATTEN, the CSS colocation, the proportion pass, and the differential
close all key off — and asserts the post-cut PRECONDITIONS that make the later moves clean. It is device-free
bookkeeping with teeth: a drifted count REDs the gate.

## §1 — Scope (what this wave computes)

Emit `docs/tranches/BH/spec-structure/CENSUS-AT-CUT.md` (an authored artifact, NOT under `src/`) recording, at
the actual cut HEAD:

1. **Barrel census** — the mixed-barrel count (round-6: STABLE at 9 = 8 CVA + `composables/color/index.ts`). List
   each with its own-runtime export kind (CVA → `variants.ts`; color → `runtime.ts`).
2. **Viz DOMAIN membership** — the live `useGpuSubstrate` import edge ∪ {goo-filter rider} (round-6: STABLE at 9
   — aurora, concentric, constellation, dot-flow-field, dot-matrix, fourier-field, goo-blob, liquid-grid,
   goo-filter). `watercolor-dot` is tagged `mark`, NOT viz. `paper-grid` retired; `liquid-grid` superseded it —
   confirm the `PROCEDURAL-SUITE.md` SSOT reconcile (the 3-member drift) is LANDED or born-RED-booked.
3. **Family count** — `ls -d src/components/*/` (round-6: 92 dirs − 1 `ui/tabs`-fold = **91** top-level; `_shared`
   domain-map-EXEMPT → **90** barrel-bearing flat peers).
4. **Specifier counts** — the ~568 flatten-VARIANT specifiers (recompute) + the ~1218 invariant re-emits; the
   ~521 demo single-side drops; the 133 test recomputes; the 865 `components/(ui|custom)` literals / 229 scripts.
5. **`RATCHET_BASELINES`** — MUST be `{}` post-5.0.0-cut (the BG-owned breachers GlassDock 515 / DockLayerGroup
   524 / `useGlassBackdropLuminance` 554 are carved by their live BG waves AT the cut). If non-empty, HALT — the
   interleave assumption is violated (the plan assumes a ratchet-empty tree).
6. **The 46 pre-existing stale-ref danglers** — enumerate them (the differential-resolves floor subtracts these;
   BI.W-DIFFERENTIAL-CLOSE PRUNES them to make the floor absolute-clean).
7. **The over-500 breachers** — MUST be drained (`proof:no-god-module` GREEN). If any survive, they are BG-owned,
   NOT BI's to carve (no double-carve).

## §2 — Binding criteria (born-RED → GREEN)

- Born-RED: no `CENSUS-AT-CUT.md` exists / it is stale vs the live tree.
- GREEN: the artifact exists AND every recorded count matches a fresh on-disk recompute AND the two hard
  preconditions hold: `RATCHET_BASELINES == {}` AND `proof:no-god-module` GREEN (the post-cut clean-tree
  invariant).

## §3 — The gate: `proof:structure-census`

- **C1 — recompute soundness.** The gate re-derives each count on disk and asserts equality with the recorded
  artifact. A drifted count REDs. *Self-test:* a synthetic artifact with a wrong family count REDs; a matching
  one passes.
- **C2 — the post-cut preconditions.** `RATCHET_BASELINES == {}` AND `proof:no-god-module` returns GREEN.
  *Self-test:* a synthetic non-empty ratchet REDs.
- **C3 — viz membership by import edge, not prose.** The 9 viz members DERIVE from the live `useGpuSubstrate`
  edge ∪ {goo-filter}, NOT `PROCEDURAL-SUITE.md`. *Self-test:* a synthetic new substrate importer auto-enrolls; a
  prose-only roster entry does not.

## §4 — Fences

- Writes ONLY `docs/tranches/BH/spec-structure/CENSUS-AT-CUT.md` (an authored artifact). ZERO `src/` write.
- The census is a READ of the cut HEAD; it moves nothing.
- If `RATCHET_BASELINES != {}` the wave HALTS and reports — it does NOT carve (the BG-owned breachers are not
  BI's; no double-carve, STRUCTURE-SPEC §7 interleave).

## §5 — Cross-refs

R6-7 (the always-binding recompute mandate); STRUCTURE-SPEC Freshness note; §7 the BG/BH interleave.
