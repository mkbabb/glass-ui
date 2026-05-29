# AO.W5 — Close ceremony — audit

The close sweep for tranche AO: π re-probe, ι integrity sweep, overfitting audit, and the first changeset-driven version bump.

## π re-probe — visual canon + 4 motion primitives + W3 consumer surfaces

glass-ui ships no e2e/Playwright harness; the canonical π for these changes is asset-level verification, which is more reliable than an ad-hoc demo screenshot for the actual risks (it directly checks specificity, scoping, and byte-identity rather than the demo's default state, which would not exercise the dock focus/disabled states or the mobile chassis breakpoint).

- **`proof:theme` byte-clean** — every cascade rung ships, including the new `--surface-public-data-panel` token (exit 0). The consolidation dropped no rung.
- **Dock focus-ring specificity — a real π catch.** The W4 consolidation hoisted the dock focus-visible/disabled paint into a `:where()` group, which zeros class specificity (0,2,0 → 0,1,0) and would let a per-control `:hover` box-shadow override the keyboard focus ring. Caught by inspecting the hoist diff; fixed by restoring a full-specificity comma group (one rule body — dedup kept — at the original 0,2,0). Cost ~67 gzip (74928 → 74995, still 90.9% of the ceiling).
- **Aurora (R0G-1)** — `drawFrame()` is byte-identical; the change is loop-scheduling only. The canonical hero (`DEFAULT_AURORA_CONFIG` carries non-zero drift) animates exactly as before when visible; only the genuine at-rest + tab-hidden cases park.
- **InstrumentChassis (R0G-2)** — the reserve is scoped to the `@media (max-width: 720px)` block and is additive (`min-height` + a `minmax(0,1fr)` meter row); desktop is untouched; the only chassis transition is the paint-only `--phase-tint`.
- **Drawer** — the `drawer.css` double-`hsl()` fix is a correction: the prior `hsl(var(--background))` on an already-`hsl()` token rendered an invalid color; the drawer now paints its intended background.
- **Toaster (R0G-4)** — the default `position` composes to a class string byte-identical to the prior hardcoded literal (proven via the real `cn()`).
- **4 motion primitives** — the `useSpringOrchestrator` deletion was a pure rename-away; the underlying `useNumericTransition` family is untouched; the full suite (521) passes.

## ι integrity sweep (AO window)

| Check | Result |
|---|---|
| `git stash list` empty | CLEAN (also `npm run audit:stash` → "clean (zero stash entries)") |
| No agent-attributed git mutation | CLEAN — every AO commit authored by the orchestrator; agents were edit-only / read-only-git |
| Secrets-clean | CLEAN — no token VALUE committed; the only `NPM_TOKEN` strings are documentation references to the secret NAME (the user-domain perimeter prose) |
| `grep -r 'useSpringOrchestrator' src/` = 0 | CLEAN |

## Overfitting audit

Every AO change is correctness, deletion, or a gate-cleared promotion — no unjustified substrate:

- **Correctness/deletion** — the budget-gate truth (inv α), the dist-share footgun (inv β), the heap-prefix drop, the §Build resync, the alias DELETE, the cascade consolidation (dedup, not addition), the per-subpath enforcement, the root-surface-contract resync, the prepare-guard hardening, the dock specificity fix, the drawer.css fix, the Aurora loop, the chassis reserve.
- **The one new exported substrate — `useIdleReady`** — carries its ≥2-consumer justification (5 speedtest sites; J inv 10 / L inv 8). Sibling of the shipped `useViewportReady`.
- **Additive API/tokens** — `Toaster` `position` (additive prop, default unchanged), `ToasterPosition` type, `--surface-public-data-panel` (consumer-route-justified), the chassis reserve canonical tokens (token-first completion of an existing primitive).

No primitive was invented without a consumer; the 2 AN ARCHIVED items + the inline-edit convergence stay correctly gated (watched conditions in FINAL).

## First changeset-driven version bump

Authored `.changeset/ao-self-measurement-truth.md` (a `major` changeset enumerating the alias break + the 5 consumer items). Ran `npx @changesets/cli version` → version **2.1.0 → 3.0.0**, `CHANGELOG.md` generated from the changeset body, the changeset file consumed. The first end-to-end changeset-driven version stage, exercised locally. The tag + `changeset publish` / `npm publish` + `git push` leg is user-domain (needs the `NPM_TOKEN` secret + push authority; release.yml fires on the pushed `v3.0.0` tag).

## Gate table

| # | Gate | Status |
|---|---|---|
| 1 | π re-probe — canon + 4 motion primitives + W3 surfaces unregressed | MET (asset-level; caught + fixed the dock specificity regression) |
| 2 | ι sweep — stash-clean, no agent mutation, secrets-clean, alias grep 0 | MET |
| 3 | Overfitting audit — correctness/deletion/gate-cleared only | MET |
| 4 | Full gate matrix green locally | MET for glass-ui-internal (see FINAL §Gate matrix); 2 cross-repo residuals documented |
| 5 | `AO/FINAL.md` authored | MET |
| 6 | First changeset authored + `changeset version` staged 3.0.0 + CHANGELOG; dist rebuilt | MET |
