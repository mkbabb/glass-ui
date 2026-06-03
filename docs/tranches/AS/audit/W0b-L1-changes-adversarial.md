# AS.W0b L1 — adversarial audit of the AS.W3/W4/W5 cut + the parallel value.js-K cohort session

Lens 1, READ-ONLY on source + all git. Range `ed2add9..HEAD` (6 commits):
`d2d1d0b` (AS.W2 gate substrate), `8c0cced` (AS W3/W4/W5 impl — P9 + postTask +
container-queries + AS-GU), and the PARALLEL cohort session's two commits
`6d3e151` (inv-K-2 color.ts rewire + inv-K-4 development-condition) + `571f25f`
(cssToOklch divergence doc). Every claim is reproduced from a LIVE probe — the
build was run, the gates were run, components.css was byte-inspected, value.js's
package shape was read off disk. Not asserted.

**Verdict up front: the AS.W2 gate substrate is genuine and well-built — pure,
sibling-portable, singular, git-clean (verified). But HEAD is RED on its OWN
unified gate matrix.** The parallel cohort session committed two violations the
now-structural `local == ci == release` set catches, so a tagged release would
refuse and CI would fail:

1. **`proof:resolution` FAILS** — inv-K-4 re-added the `development` export
   condition (68 keys) that contract-v2 abrogates, and AS.W2's own gate fails
   closed on glass-ui's `self` package.json.
2. **`profile:budget` FAILS** — the inv-K-2 color.ts rewire bundles the whole
   `@mkbabb/value.js` (78 KB, 49% of the chunk) into `dist/aurora.js`,
   +187.6% over baseline, because value.js is a peerDep but NOT in
   `libraryExternal`.

Both gates are in the `ci` AND `release` filters (`node scripts/gates.mjs
--list release` → both present). The irony is exact: AS.W2 made the matrix
structural; the sibling session broke it through the seam.

The 558→564 test claim holds (564 pass), typecheck clean, P9 is deterministic
and real, the dock/VT/carousel folds are sound. Findings below, severity-ordered.

---

## F1 (HEADLINE — RELEASE-BLOCKING) — inv-K-2 bundles the whole value.js into aurora.js; budget RED, dedup inverted

`6d3e151` rewired `src/components/custom/aurora/composables/color.ts` to import
`srgbToOKLab`, `oklabToLinearSRGB`, `oklabToRgb255`, `rawOklabToOklch`,
`rawOklchToOklab`, `parseCSSColor`, `colorUnit2` from `@mkbabb/value.js` and
promoted value.js `devDep → peerDependency`. The commit message: *"Coefficient
families now defined exactly once across both repos."*

At the SOURCE level — true. At the SHIPPED BUNDLE level — the exact opposite.
`@mkbabb/value.js` was added as a peerDependency but **never added to
`vite.library.ts` `libraryExternal`** (line 121: `vue`, `reka-ui`,
`@vueuse/core`, `@mkbabb/keyframes.js`, … — no value.js). So Rollup INLINES it:

- `dist/aurora.js` carries a `//#region node_modules/@mkbabb/value.js/dist/value.js`
  region of **78,674 chars — 49% of the whole 159,621-char chunk** (measured).
- aurora.js gzip went **16,564 → 47,636 (+187.6%)** vs the committed D5 baseline.
- `npm run profile:budget` → **`[FAIL] dist/aurora.js — drift +187.6%`** (run live).

Why it bloats rather than tree-shakes: value.js exposes ONE export key (`.`),
no color-core subpath (read off `node_modules/@mkbabb/value.js/package.json`:
`exports: ['.']`). `cssToOklch` reaches `parseCSSColor`, which drags the
parser-combinator machinery (`…sepBy(Gt).trim().many()` is visible inlined in
aurora.js) — so the reachable closure is large, and because value.js is not
externalized Rollup bakes all of it in.

**This defeats inv-K-2's own purpose.** The point was to stop duplicating the
OKLab core. The shipped result: every aurora consumer now ships a 31 KB-gzip
duplicate of the ENTIRE value.js (parser included), not the 8 small helpers it
deleted. The dedup is true in source, false in the binary.

The cohort did NOT rebase the bundle baseline (`git show 6d3e151 --stat | grep
baseline` → empty), so the gate correctly catches it. Rebasing would be the
WRONG fix — it would bless shipping a duplicated value.js in every aurora chunk.

**Idiomatic fix:** add `"@mkbabb/value.js"` to `libraryExternal` (it is a peer
dep — must never be bundled, exactly like `@mkbabb/keyframes.js`). That restores
the aurora budget AND realizes inv-K-2's dedup at the binary level (one shared
value.js, resolved by the consumer). No baseline rebase.

---

## F2 (HEADLINE — RELEASE-BLOCKING) — inv-K-4 reintroduces the contract-v2-forbidden `development` condition; proof:resolution RED on self

`6d3e151` added `"development": "./src/<x>.ts"` to all 68 object-form exports
(`grep -c '"development":' package.json` → 68). The stated intent (inv-K-4):
value.js's demo + glass-ui's own dev resolve glass-ui from source.

This collides head-on with contract-v2, which the CLAUDE.md states explicitly:
*"no `development` condition (the AG glass-ui-core wave abrogated it)"*, and
which AS.W2's hardened `proof:resolution` enforces fail-closed. Run live at HEAD:

```
[proof:resolution] FAIL — contract-v2 dev-resolution contract violations found:
  [publisher] glass-ui/package.json
    exports map carries a forbidden "development" condition key — contract-v2
    abrogates it; collapse the entry to the 3-key shape (types/import/default)
  [publisher] value.js/package.json   (the sibling did the same)
```

`proof:resolution` is in the `ci` + `release` filters, so CI and a tagged
release both fail here. The gate fails on the `self` (glass-ui) repo — not a
skippable sibling — so it is unconditional.

This is a genuine **sibling-session-committed invariant conflict**, not a
glass-ui-AS oversight: AS.W2 hardened the contract-v2 enforcement; the parallel
value.js-K session committed the exact violation that enforcement exists to
catch. The user noted "strip for publish," but that is a release-time band-aid
on a committed invariant — the in-repo state is contradictory: glass-ui's own
package.json violates glass-ui's own gate, and `proof:resolution` is part of the
gate matrix AS.W2 just made authoritative. The two commits cannot both be
correct as landed.

**Resolution is a precept call, not a code call:** either contract-v2 is binding
(then inv-K-4 must be reverted — no `development` keys; dev source-resolution
rides the `file:` symlink + dist `build:watch` as contract-v2 already specifies),
or contract-v2 is being amended (then `proof:resolution`'s forbidden-key check +
the CLAUDE.md abrogation text + `docs/precepts/cross-repo-dev-resolution.md`
invariant 30 must all change in lockstep). Shipping both as-is leaves the matrix
permanently RED. Note value.js is BOTH a peerDep and devDep (`^0.10.0` in each).

---

## F3 (P9, MEDIUM) — components.css references `var(--spacing)` 140× but glass-ui ships no `--spacing`; 98% budget; no gate

P9 (`8c0cced`) generates `dist/styles/components.css` (verified deterministic —
byte-identical across two builds; 57,325 bytes raw / 8,923 gzip, matching the
claim). The three headline classes resolve correctly against tokens glass-ui
DOES ship:
- `rounded-panel → border-radius:var(--radius-panel)` (theme.css:223 ✓)
- `text-muted-foreground → color:var(--color-muted-foreground)` (theme.css:73 ✓)
- `h-full → height:100%` ✓

**But 140 declarations reference `var(--spacing)`** — Tailwind v4's spacing base
(`.p-4{padding:calc(var(--spacing) * 4)}`, `.inset-0`, `.top-2`, `.gap-2`, …).
The P9 strip step deliberately drops the `:root,:host` `@theme` var block (where
Tailwind emitted `--spacing: 0.25rem`), so `--spacing` is defined NOWHERE in the
shipped `dist/styles` (`grep --spacing: across dist` → 0 definitions; `:root`
count in components.css → 0). The "bare consumer paints them" claim is therefore
PARTIAL: the layout/color tokens paint, but every spacing utility silently
computes against an undefined custom property unless the consumer's OWN Tailwind
supplies `--spacing` (which a Tailwind-v4 consumer does, in their `:root`). So:

- Tailwind-v4 consumer (the common case): spacing utilities resolve via the
  consumer's own `--spacing` — works, but by luck of the consumer's stack, not
  by glass-ui being self-contained.
- Non-Tailwind / `@theme static` consumer: 140 spacing declarations silently
  no-op — the same failure class P9 set out to kill, just narrower.

Two clean fixes: (a) keep the single `--spacing` declaration from the compile
output (it is glass-ui's own theme context — shipping its own spacing base is
consistent with shipping its own radius/color bases), or (b) document the
`--spacing` dependency explicitly. (a) is gestalt — it makes the headline claim
fully true.

**Budget headroom is razor-thin.** `dist/styles/index.css` measured 98.5% raw /
98.0% gzip of the P9-rebased ceiling (413,656/420,000; 98,010/100,000). The
commit calls this "modest headroom"; 2% is not modest — one more component class
tips it. And there is **no gate** verifying components.css resolves: the "AN.W2
probe is INVERTED" claim is a manual verification with no committed test;
`proof-theme-style.mjs` probes only the custom `@theme` utilities (`rounded-card`,
`z-dock`, …), never a `--spacing`-dependent class nor components.css itself. P9
ships build-time-generated CSS into the published bundle with zero regression
guard on its correctness.

(Minor: commit says "615 utility rules"; the file has 690 rule blocks / 474
distinct class selectors — a counting-method discrepancy, not load-bearing.)

---

## F4 (P4, MEDIUM) — useTextHighlight registry-name collision regresses the multi-instance FuzzySearch case

`useTextHighlight` (`8c0cced`) keys a `Highlight` in the process-global
`CSS.highlights` registry by `name`. `FuzzySearch.vue` hardcodes
`useTextHighlight("glass-search-mark")` — a FIXED name. Two FuzzySearch
instances on one page (a global command palette + an inline filter — entirely
plausible) collide:

- Each instance's `set()` calls `CSS.highlights.set("glass-search-mark",
  ownHighlight)` with its OWN object — the second overwrites the first's
  registry entry; the first's ranges stop painting.
- On unmount, `dispose()` calls `CSS.highlights.delete("glass-search-mark")`
  unconditionally — killing the OTHER still-mounted instance's paint.

The `<mark>` splitter this replaced had NO cross-instance coupling (each
component owned its own DOM marks). So P4 is a regression in the multi-instance
case. The docstring acknowledges the shared-name hazard ("pick a name unique to
the surface") but the consumer it ships, FuzzySearch, violates that advice with
a constant name. No multi-instance test exists (`useTextHighlight.test.ts`
covers single-instance set/replace/clear only). **Fix:** derive the registry
name per-instance (`useId()`-suffixed) so each FuzzySearch owns a distinct
`Highlight` + `::highlight()` is matched by a per-instance attribute, OR
ref-count the registry entry so `dispose` only deletes the last user.

Positive: P4's XSS posture is BETTER — the full label is now text-interpolated
(`{{ resultLabel(r) }}`), so the malicious-markup test is more robust than the
old `<mark>`-splitting path. The retire is right; the naming is the defect.

---

## F5 (P9 / G1, LOW) — feature-detection mismatches (right effect, wrong probe)

Two `@supports` guards detect a DIFFERENT feature than the one they gate. Both
still preserve paint (the fallback path covers the gap), so these are precision
debts, not breakage:

- **G1** (`ConfiguratorRow.vue`, `metric-pill`): `@supports (container-type:
  inline-size)` gates `@container style(--density: X)`. But `container-type:
  inline-size` is SIZE-query support; `@container style()` for custom properties
  has a later, separate support timeline. An engine with size-container support
  but no style-query support enters the `@supports` block and the `style()`
  rules silently never match — saved only because `[data-density]` still
  applies. The probe should detect style-query support, not size-query support.

- **P9** scope: same class of `@supports`-detects-the-neighbour reasoning. The
  G2 carousel probe (`supportsScrollStateQuery`) is the COUNTEREXAMPLE done
  right — it uses the negative-probe idiom (`supports(real) && !supports(garbage)`)
  to filter jsdom's always-true shim, consistent with `supportsCssTimeline`.

---

## F6 (AS.W2 meta-teeth, LOW) — the hardened proof:vt-names has no committed self-test

`d2d1d0b` rewrote `proof-vt-names.mjs` to catch 4 previously-silent mint forms
(camelCase IDL, setProperty, setAttribute style-string, template inline) and a
per-mint dataflow tracer (`traceMintSource` / `moduleLevelNumericLets` /
`moduleLevelBindings`). The commit claims *"Proven on 6 fixtures."* Those
fixtures were ephemeral — **no fixture corpus or gate-self-test is committed**
(`find … vt-name` → only the script, the `.cache` artefact, and the unrelated
`GlassDock.vt-names.test.ts` component test). So the gate's substantial
regex/dataflow logic has zero regression guard: a future edit that breaks
`traceMintSource` or a detection regex passes unnoticed, and the gate that makes
inv-η "structurally impossible" is itself unguarded. The gate PASSES on HEAD
(verified) — the debt is the missing canary. Commit the 6 fixtures as a vitest
spec that runs the gate against known-bad/known-good corpora.

(The AS.W0 over-claim this hardening closes was real and is now genuinely shut —
the 6 detection forms are present and the per-mint trace replaces the file-level
`useId` boolean. The hardening is good; only its OWN test is missing.)

---

## F7 (G4, LOW) — usePrioritizedTask controller-signal vs explicit-signal contract is contradictory

`usePrioritizedTask` returns a `postTask` that sets `signal: options.signal ??
controller?.signal`. So a task scheduled WITH an explicit `options.signal` does
NOT receive the controller's signal — meaning the controller's `abort()` will
NOT cancel it. The docstring claims both "an explicit `options.signal` still
applies" AND "its own `abort()` cancels every task it scheduled" — these
conflict for the explicit-signal case. Low severity (the common path passes no
explicit signal), but the "cancels EVERY task" guarantee is false. Either merge
both signals (an `AbortSignal.any([controller.signal, options.signal])`) or
narrow the docstring.

---

## What is sound (verified, not waved through)

- **AS.W2 gate-output purity** — VERIFIED. Running profile:budget + the proofs
  wrote to gitignored `.cache/gates/` (`git check-ignore` ✓); the F/K audit
  JSONs that the initial `git status` showed dirty are now CLEAN. The
  churn-on-every-run class is genuinely closed.
- **constellation.mjs / gates.mjs** — the 5 hardcoded copies collapse to one
  membership table + one `resolveSibling` policy; the refactored proofs
  (resolution, phantom, package, consumers-static, theme-style) are faithful
  migrations onto it; `gates:verify-ci` PASSES (ci.yml matches the 13-gate
  manifest); `proof:lockfile` PASSES (value.js peer landed registry-resolved).
  No new monorepo-layout assumption — absence routes through `skipSibling`.
- **P8 VT `.ready.catch(() => {})`** — correct, minimal fix for the
  unhandled-rejection pageerror leak on rapid re-trigger.
- **P6 dock** — `--dock-fg-on-aurora` defaults to `--foreground` (byte-identical);
  the standalone 44px floor uses logical `min-block-size`/`min-inline-size`
  inside `@media (pointer: coarse)`, correctly scoped, `--compact` opts out;
  class names consistent (`.dock-icon-button` / `--compact`); `as`/`asChild`
  emits `type` only on a button host.
- **P1 asideSide** — grid-column placement + border-side swap only; DOM/tab
  order preserved (no a11y regression); arbitrary-value grid utilities land in
  components.css.
- **P9 dynamic-class capture** — the conditional `lg:col-start-2` etc. that a
  consumer's dist scan could never reach DO land in components.css; this is real
  P9 value.
- **color-equivalence test** — 6/6 green, but author-acknowledged
  "near-tautological" (re-imports the same value.js fns it asserts against; does
  NOT compare to the deleted canvas path, so it cannot prove the rewire
  preserved prior shipped behavior — the cssToOklch divergence in `571f25f`
  confirms behavior DID change: throws on invalid, drops alpha, no gamut clamp).
