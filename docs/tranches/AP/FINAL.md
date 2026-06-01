# Tranche AP — FINAL

AP is glass-ui's post-AO consolidation tranche. It opened on a two-fact thesis — repair the two
under-folded speedtest-AQ consumer items (R0G-6 + R0G-7), and derive the CSS cascade from a single
source for a ~7-12 KiB reclaim. **One fact held and one was refuted by measurement.** AP delivered
the consumer-contract completion + the control-flow derivation + the false-witness coda, and
honestly declined the cascade refactor that measurement proved byte-negative. AP folds into the
unpublished 3.0.0.

## The headline pivot — what AP actually is

The DELTA "cascade hand-mirrors itself, reclaim ~7-12 KiB" premise was **refuted by direct
measurement** (deterministic build): every form of the single-sourcing refactor is byte-NEGATIVE
(full var-indirection +1665 gzip, T1-surgical +356, §radius-dedup +100). gzipped CSS is
compression-saturated; the `@theme` bridge is idiomatic Tailwind v4 namespace-registration for
independently-consumed runtime tokens (not duplication — collapsing it needs a forbidden rename or
breaks the consumer-override surface); the §radius "duplication" is inert shadowed dead-weight. Per
"performance above all," AP ships the cascade exactly as-is and **retires inv ζ** (an invariant
predicated on a refuted premise). The real AP value is W3 (the zero-deferral consumer repair) + W4
(the coda). See `audit/W2-cascade-derivation.md`.

## Gate matrix

| Wave | Disposition | Gates |
|---|---|---|
| **W0** | DEV — 6-lane audit + path-forward | MET (the synthesis is the binding basis) |
| **W1** | DEV — 3-doc design slice | MET (T1 alpha-mechanism investigated; the stale channels-form + the over-scoped T1 corrected; R0G-6 bypass proven; T3/coda named) |
| **W2** | IMPL — cascade derivation | **PREMISE REFUTED** — every dedup byte-negative; cascade ships as-is; inv ζ retired; π trivially canon-equal; `proof:theme` PASS |
| **W3** | IMPL — consumer-contract + control-flow (the headline) | MET — R0G-7 `/motion-core` engine-free (0 keyframes/0 vueuse; `verify-export-types` green; inv 47); R0G-6 44px floor on the rendered box; T3 resume-while-suspended unreachable (`drawFrame` byte-identical); DockLayerGroup bug fixed |
| **W4** | IMPL — false-witness coda + hygiene | MET — `proof:consumers:static` honest (212→0 via `ignoredDirs` + comment-strip); D5 baseline split stable; strays/`​.gitignore`/keyframes-pin/cherry-pick-7; AQ handoff reconciled |
| **W5** | IMPL — close | MET — full gate matrix green; π/ι/overfitting clean; FINAL + the 3.0.0 fold |

**Full glass-ui-internal gate matrix (W5):** `typecheck` · `build` · `test` (vitest 523/523) ·
`verify-export-types` · `proof:resolution` · `proof:theme` · `proof:package` · `proof:runtime` ·
`proof:consumers:static` · `profile:budget --enforce` — **all PASS**. Cross-repo residuals
documented (`proof:phantom-classes` fourier pending-handoff; `proof:consumers:build` heavy
cross-repo) — both consumer-domain, absent from the glass-ui CI runner.

## What shipped (folded into 3.0.0)

- **R0G-7** — the `/motion-core` keyframes-free flat subpath. A cheap-leaf import (`useIntersectionPause`
  et al.) carries neither `@mkbabb/keyframes.js` (~125 KB) nor `@vueuse/core` on its eager graph;
  the keyframes-bearing surface stays on `/motion`; `installDarkModeSync` relocates to `/dark` (its
  vueuse home). No alias (inv 47); rename table in MIGRATION.md.
- **R0G-6** — the `DockIconButton` WCAG 44px coarse-pointer floor, via the `.glass-dock[data-density]`
  specificity fix that lifts `--dock-control-size` (read by both the button box and the dock
  width-math — no overflow). Fine-pointer byte-identical.
- **T3** — the aurora suspend-source set (control-flow derivation): `running` derives from a
  reason-keyed set; resume-while-still-suspended is structurally unreachable. `drawFrame` byte-identical.
- **DockLayerGroup** — the confirmed vertical-overflow bug fixed (axis-aware layer pane).
- **The false-witness coda** — `proof-consumers-static` no longer flags directives in consumer
  comments (string-aware strip) + the D5 drift baseline no longer self-erases (committed baseline +
  `--rebaseline`).
- **Hygiene** — strays deleted + `.gitignore`d; keyframes.js pin converged `^2.1.1`; the cherry-pick
  count reconciled to the empirical 7; the AQ handoff record updated to "the seven."

## Watched-conditions ledger (AP promoted nothing — J inv 10 / L inv 8)

| Condition | State | Why still watched |
|---|---|---|
| inline-edit primitive | 3 consumers, DIVERGENT | `<input>` numeric click vs `<input>` string dblclick vs `contenteditable` — they do not converge to one contract |
| dock panel-host | 1 consumer (bbnf-buddy `LeftToolsDock`) | under the 2-consumer gate; its vertical-overflow BUG was fixed (correctness ≠ promotion) |
| LabeledSlider readout | 2-divergent | watched per the prior ledger |
| shadcn parity (calendar/date-picker/pagination) | 0 consumers | speculative — rejected |

## Cross-repo perimeter (USER-DOMAIN — recorded, not executed)

AP is glass-ui-internal + the AQ-contract completion. The outward-facing leg stays the user's:

1. **Push the held commits to `origin`** (`git@github.com:mkbabb/glass-ui.git`) — the AP arc adds 10
   commits atop the ~99 already unpushed. npm carries only 2.1.0; the source tree is single-copy
   local until pushed.
2. **Tag `v3.0.0` + `npm publish`** — the single user-domain blocker that unblocks speedtest's AQ
   (the 5 AO R0G items + AP's R0G-6/R0G-7 all ride the one 3.0.0 cut). Outward-facing → confirm-first.
3. **Seed the `NPM_TOKEN` repo secret** — activates `release.yml`.
4. **Reconcile the `docs/precepts` submodule** — 3 dirty working-tree files (no gitlink drift);
   commit + push inside `mkbabb/precepts`, bump the gitlink, include in the push.

The 3.0.0 publish makes the user ONE release for the whole AO+AP consolidation. It also unblocks the
muster I.W5 gated `^3.0.0` adoption (muster's perimeter).

## Successor

No AP successor is opened. The named-forward watched conditions (inline-edit, dock panel-host) carry
to whichever future tranche sees a converging consumer. AP closes here.
