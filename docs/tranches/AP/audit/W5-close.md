# AP.W5 — close ceremony (π re-probe + ι sweep + overfitting audit)

The AP close. The full glass-ui-internal gate matrix is green; the asset-level re-probe, the
integrity sweep, and the overfitting audit are clean. AP folds into the unpublished 3.0.0.

## π re-probe (asset + behavioural)

AP shipped NO cascade change (W2's reclaim premise was refuted — the cascade is byte-identical to
the pre-AP HEAD), so the visual canon (glass tiers, dock controls, tokens, the 4 motion primitives'
CSS) is trivially unregressed. The W3 surfaces re-probe clean at the asset level:

- **Aurora idle loop (T3).** `drawFrame` / the WebGL draw is BYTE-IDENTICAL (0 draw-line diffs in
  the runtime.ts diff). The suspend-source set is control-flow only; the rendered output is
  unchanged. `prefers-reduced-motion` still draws one static frame then parks (the gate in
  `needsAnimation`/`tick` is untouched; `reducedMotion` is not a suspend reason).
- **Dock R0G-6 floor.** The built `dist/styles/dock.css` carries the `.glass-dock[data-density]`
  coarse floor; fine-pointer rendering is byte-identical (the whole rule is inside
  `@media (pointer: coarse)`). The only `--dock-control-size` setters are the four density blocks +
  this block (all (0,2,0)); none higher, so it cannot be re-shadowed.
- **Motion leaves (R0G-7).** The relocated leaves are behaviourally identical (the `.ts` files did
  not move — only the barrels re-point); `vitest` 523/523 includes the motion-leaf + aurora specs.
- **DockLayerGroup.** Horizontal groups are byte-identical (the fix adds `.dock-layer-group.vertical`
  rules only).

The regression bar AP declared (the visual canon + the 4 motion primitives + `proof:theme`
byte-clean) holds: `proof:theme` PASS, `drawFrame` byte-identical, `vitest` 523/523.

## ι integrity sweep

- **Stash:** empty (`git stash list` → none).
- **Authorship:** every AP commit (11b0311 → bb4e79b) is orchestrator-authored (`Mike Babb`); no
  agent-attributed git mutation (agents were edit-only/read-only-git throughout; the orchestrator
  owns the index).
- **Secrets:** clean — no `npm_<token>` / `NPM_TOKEN=<value>` / crates-secret pattern in the AP
  diff; the only `[a-f0-9]{40}` matches are the AP commit SHAs in the `git log -p` headers (not
  secrets).
- **`--no-verify`:** never used in the arc.

## Overfitting audit

Every AP source change is a derivation, a correctness fix, the two deferred consumer items, or
hygiene — no invented substrate clears the gate:

| AP change | Class | ≥2-consumer / correctness? |
|---|---|---|
| `/motion-core` SCC carve (R0G-7) | consumer-contract (the under-folded AQ item) | a CARVE of existing leaves onto a subpath, driven by speedtest's measured 125 KB eager-pull — not a new primitive |
| Dock 44px coarse floor (R0G-6) | a11y correctness on an existing primitive | the WCAG target-size floor on a shipped control the consumer cannot fix idiomatically |
| Aurora suspend-source set (T3) | control-flow correctness (derivation) | a refcount over the existing loop; resume-while-suspended unreachable |
| DockLayerGroup vertical fix | correctness (confirmed bug) | a real defect in the existing multi-layer grid |
| proof comment-strip + D5 baseline split | gate honesty | the false-witness coda; no substrate |
| strays / keyframes pin / cherry-pick prose | hygiene | no substrate |

**AP invented NO primitive (J inv 10 / L inv 8).** The watched conditions stay gated: inline-edit is
3 DIVERGENT consumers (`<input>` numeric click vs `<input>` string dblclick vs `contenteditable`);
the dock panel-host is 1 consumer (bbnf-buddy `LeftToolsDock`). AP promoted neither. **inv ζ was
introduced then RETIRED at W2** — its byte-reclaim premise was refuted by measurement; an invariant
that cannot be honored without regressing its own metric is not an invariant. The retirement is the
honest outcome, not an overfit.

## Gate matrix (full glass-ui-internal — all green)

| Gate | Status |
|---|---|
| `typecheck` | PASS |
| `build` | PASS |
| `test` (vitest 523/523) | PASS |
| `verify-export-types` (incl `/motion-core`) | PASS |
| `proof:resolution` | PASS |
| `proof:theme` | PASS |
| `proof:package` | PASS |
| `proof:runtime` | PASS |
| `proof:consumers:static` (honest, post-comment-strip) | PASS |
| `profile:budget --enforce` | PASS |

**Cross-repo residuals (documented, not gating):** `proof:phantom-classes` is RED on the
fourier-analysis pending-handoff patch (consumer-domain — glass-ui `src/+demo/` is clean);
`proof:consumers:build` is a heavy cross-repo gate not run in this close (no behavior change to the
consumer build contract). Both are consumer-domain, absent from CI on the glass-ui runner.
