# Tranche AR — FINAL

AR closed the binding-verification class for platform-binding surface and repaired the release CI the constellation was blocked on. It closes at **W2** — a clean SemVer-patch boundary (3.1.1) — with its remaining waves (W3-W6, the leverage fold) **re-homed to AS**, re-derived against HEAD. The thesis (binding correctness) is structurally complete; bolting a leverage arc onto a correctness tranche would have diluted both.

## What shipped (3.1.1)

- **inv-η — the VT/anchor-name uniqueness class is closed.** `GlassDock` mints `dockId` from `useId()` (the module-level `dockInstanceId` counter deleted; the stale page-uniqueness comment corrected); the diagnosed lazy/eager `glass-dock-1` collision is gone. `proof:vt-names` (`scripts/proof-vt-names.mjs`, wired into `proof:all` + both CI workflows) scans `src/` for every `view-transition-name`/`anchor-name` mint and fails closed on a module-counter source; a unit guard mounts two docks in one app and asserts pairwise-distinct ids. 526 files, 4 mints, 0 violation.
- **The two booked cohort asks folded.** `glass-ui-a11y` — `ConfiguratorLayer`'s collapsed body carries `:inert` (closes the `aria-hidden-focus` axe-serious violation). `glass-ui-P5-inner-rounding` — corrected: b6d6cf4's per-section `rounded-panel` on a flush, transparent, `border-b`-only section was geometrically inert and *deformed* the divider; the fix removes it and lets the container's `rounded-panel overflow-hidden` clip own all rounding (the canonical "round at the root").
- **CI #177 repaired — the real blocker was the lockfile, not the node pin.** `package-lock.json` recorded `@mkbabb/*` as `file:` links to dev siblings (keyframes 2.1.1, `parse-that` missing) so `npm ci` failed on a clean runner; surgically refilled from the registry (no unrelated drift). `ci.yml`/`release.yml` bumped node 20→24. **`ci.yml` is GREEN** (run 26849704298, all 11 gates on node 24 + the registry lockfile).
- **The unmasked `proof:*` CI-portability cascade fixed.** Fixing `npm ci` surfaced three gates that assumed the local sibling layout — `proof:package` (registry-fallback for the keyframes peer), `proof:resolution` (skip absent siblings, keep glass-ui required), and the latent `proof:consumers:static` false-witness (`collectExports` matched an `export *` inside a comment — the AP.W4 class recurring). Point-fixed; the *structural* closure (one portable gate substrate) is the AS headline.

## Gate matrix — green

`typecheck` · `test` (543) · `build` · `verify-export-types` · `profile:budget --enforce` · `proof:package` · `proof:theme` · `proof:resolution` · `proof:consumers:static` · `proof:phantom-classes` · `proof:vt-names` — all PASS on the CI runner (node 24, registry lockfile). 3.1.1 tagged at `ed2add9`, published to the registry.

## Re-homed to AS

AR's authored-but-unrun W3-W6 are the AS implementation set, re-derived against 3.1.1 HEAD (the A1-era roster had gone stale): G1 density container-style-queries (AS.W4), G2-rescoped scroll-state(scrollable) (AS.W4 — the overflow-fade listener, not the snapped/pager framing), G3 cross-document VT (downgraded — consumer-owned app-shell), G4 `scheduler.postTask` (AS.W3 — the strongest lever), the AS-GU bundle gated against HEAD (AS.W5 — `deriveAurora`'s OKLab math and `--glass-opacity-dock` already ship; do not re-mint). AS additionally opens the **gate-integrity class** (inv-θ) that AR.W2's execution revealed.

## Inverted-into-AS findings (the AR.W2 byproduct)

AR.W2's `npm ci` repair unmasked that the proof-gate fleet is itself unsound — five hardcoded constellation copies (drifted), three ad-hoc absent-sibling encodings, gate output mutating tracked artefacts, three divergent gate lists. These are not AR debt (AR shipped its headline); they are the AS thesis. The `proof:vt-names` gate AR shipped is sound for HEAD but over-claimed in prose ("structurally impossible") for a single-shape scan — AS.W2 hardens it to its claim.

## Cross-repo perimeter (USER-DOMAIN — discharged / carried)

- **3.1.1 published** (locally — `NPM_TOKEN` was unseeded at cut; now seeded across all three publishers, so AS.W6's 3.2.0 tag witnesses the repaired pipeline end-to-end).
- Consumer `^3.1.1` re-bumps + the fourier ledger reconciliation (the P5 reversal, the a11y/cascade-gui rows) are each consumer's own arm (inv-16).
- `docs/precepts` left untouched (USER-DOMAIN; the stale `63240e6`→`458c2d1` re-sync carries to AS's cross-repo perimeter).

## § Successor

AS — the gate-integrity class (inv-θ) + the re-derived modern-web leverage. AR is closed.
