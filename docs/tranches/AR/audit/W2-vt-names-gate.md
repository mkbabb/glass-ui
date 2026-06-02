# AR.W2 — the gate + bug-fix wave (3.1.1)

The binding-correctness floor: close the `view-transition-name`/`anchor-name`
silent-no-op class, fold the two booked cohort asks, and repair the release CI
so the patch publishes through a green pipeline. Cut as **3.1.1** — pure
correctness, fallback-preserving.

## The VT-name uniqueness class (inv-η)

- **GlassDock fix.** `GlassDock.vue` minted its `view-transition-name` from a
  module-level `let dockInstanceId = 0` counter (`:9` + `++dockInstanceId` at
  `:112`). The counter restarts at 0 for each copy of the module in the graph
  (a lazy/eager dist split, or two bundles sharing a page), so an eager dock and
  a lazy-chunked dock both minted `glass-dock-1` — a duplicate the browser
  rejects (one box captures, the other logs the error fourier's console-error
  e2e catches). Fixed to `const dockId = \`glass-dock-${useId()}\`` — Vue's
  app-scoped id, collision-free across module-graph copies, the established
  idiom at `DockLayerGroup.vue:69`. The line-173 comment (which falsely asserted
  page-uniqueness via the counter) now names the real `useId()` source.
- **`proof:vt-names` static gate.** A new fail-closed gate
  (`scripts/proof-vt-names.mjs`, wired into `proof:all` + both CI workflows)
  scans `src/` for every `view-transition-name`/`anchor-name` mint and asserts
  each derives from `useId()` (per-instance) OR is a documented page-singleton
  literal (`--gl-tab-active`/`--gl-toggle-active`, an explicit allowlist) — never
  a module-level numeric `let` counter feeding the mint. It comment-strips first
  (the AP.W4 false-witness discipline). At HEAD it scans 526 files, finds 4 mints
  (GlassDock + DockLayerGroup dynamic via `useId()`; BouncyToggle + UnderlineTabs
  static page-singletons), all PASS. This is the substrate closure — the dual of
  AQ's `color-mix` closure of the `hsl(var())` paint-failure class.
- **Unit guard.** `GlassDock.vt-names.test.ts` mounts two `<GlassDock>` in one
  app and asserts their `dockId`s (the source the name is a pure function of) are
  pairwise-distinct — the regression the counter caused.

## The two booked cohort asks (folded)

- **`glass-ui-a11y` (`aria-hidden-focus`).** `ConfiguratorLayer`'s collapsed
  region carried `aria-hidden="true"` but kept focusable slot children in the tab
  order — an axe serious violation (fourier H.W1 keystones). Added
  `:inert="!internalOpen"` to the region: `inert` removes the collapsed subtree
  from both the tab order and the AX tree, so the violation is structurally
  impossible. `aria-hidden` kept as the floor; the trigger (a sibling) stays
  interactive.
- **`glass-ui-P5-inner-rounding` — corrected.** The fourier ask asserted P5 was
  unsatisfied because b6d6cf4 "fixed only the outer container." That premise is
  stale — it was written against fourier's consumed glass-ui@2.x, before b6d6cf4
  shipped in 3.0.0. b6d6cf4 touched BOTH files (outer `Configurator` + inner
  `ConfiguratorLayer` section root). But adversarial verification found b6d6cf4
  itself was the wrong fix: per-section `rounded-panel` on a flush, transparent,
  `border-b`-only section is geometrically inert at best and **deforms** the
  divider (curls each hairline up 12px at both ends, leaving notches in the
  bottom corners) — the squared-divider symptom is not resolved, only changed.
  The correct "round at the root" gestalt: REMOVE the per-section radius and let
  the container's `rounded-panel overflow-hidden` clip own all outer rounding;
  flush inner seams stay straight. Applied (section root + trigger, both
  `rounded-panel` removed) with an anti-regression comment. **P5 is satisfied at
  the root, by the container clip.**

## CI #177 — the republish prerequisite (the real blocker)

The diagnosed #177 was two faults, not the node pin alone:

- **Lockfile drift (the true `npm ci` failure).** `package-lock.json` recorded
  `@mkbabb/keyframes.js` + `@mkbabb/value.js` as `file:` links to the dev
  siblings (`../keyframes.js` at 2.1.1) and was missing `@mkbabb/parse-that` — so
  on a clean runner (no sibling checkouts) `npm ci` failed
  (`lock file's @mkbabb/keyframes.js@2.1.1 does not satisfy @^2.2.0`). Surgically
  refilled: stripped the 4 `@mkbabb` link entries and re-resolved from the
  registry (keyframes 2.2.0, value 0.10.0, parse-that 0.8.2 — all published), no
  unrelated dev-toolchain drift. Validated `npm ci`-clean in an isolated dir; the
  dev symlinks are restored for local builds (the lockfile is registry-resolved
  for CI). This is the `cascade-gui` ask.
- **Node pin.** `ci.yml` + `release.yml` pinned `node-version: 20` against
  `engines: >=22`; bumped to 24 (Actions force node 24 from 2026-06-16 anyway).

## proof:consumers:static — a false-witness gate bug, fixed as a byproduct

Fixing `npm ci` unmasked a pre-existing failure in `proof:consumers:static` that
the broken install had hidden. Diagnosed + fixed (see commit `fix(proof)`):
`collectExports` matched an `export * from` directive **inside a comment**
(`src/index.ts:174`'s `// NOT \`export * from "./composables/motion/core"\``),
over-collecting the entire motion-core leaf set onto the asserted root surface —
the AP.W4 false-witness class recurring in the collector. That over-collection
coincidentally masked a stale contract (the full `ui/index.ts` includes the
vueuse-bearing `Input`/`Textarea`/`Combobox*`/`Carousel*` families the L.W1
curated root deliberately omits). Fix: comment-strip `collectExports`; allow the
deliberate AQ.W5 VT trio explicitly; subtract the 4 vueuse-bearing ui packages.
The gate now mirrors the built barrel exactly (0 unexpected / 0 missing,
cross-checked against the runtime export set) and retains detection.

## Gate matrix (local)

| Gate | Result |
|---|---|
| `typecheck` (vue-tsc) | PASS |
| `test` (vitest, 543) | PASS (incl. the pairwise-distinct guard) |
| `build` (vite + dts) | PASS |
| `proof:vt-names` | PASS (4 mints, 0 violation) |
| `proof:consumers:static` | PASS (0 unexpected / 0 missing) |
| `proof:package` / `proof:theme` / `proof:resolution` | PASS |
| `verify-export-types` / `profile:budget --enforce` | PASS |
| `proof:phantom-classes` | glass-ui src/+demo CLEAN (only fourier's documented-pending `cartoon-card` sites remain — absent on CI) |

## Cross-repo perimeter (USER-DOMAIN)

- **3.1.1 published.** Re-bumping consumers (muster/fourier/speedtest) to `^3.1.1`
  is each consumer's own arm (inv-16 — glass-ui writes only glass-ui).
- **`NPM_TOKEN` not seeded** → 3.1.1 published locally (authenticated). The
  CI-publish proof (tag → `release.yml`) awaits the user-domain `NPM_TOKEN` secret.
- The P5 correction reverses b6d6cf4's approach; the fourier lead reconciles the
  `glass-ui-P5-inner-rounding` + `glass-ui-a11y` ledger rows on their side.
