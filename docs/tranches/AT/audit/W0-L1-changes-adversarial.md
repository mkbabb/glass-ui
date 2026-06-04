# AT.W0 — L1 ADVERSARIAL audit of the AS arc + this session

Lens L1. Adversarial re-verification of every change in the AS.W2b gate-fix wave
(`8114bba`), the AS follow-up (`fef1b8e`, `5e2f055`), the W6 close + 3.2.0 cut
(`ba0a117`, `9031972`, `932d2ee`), and the W7 visual/design waves (`96858c8`,
`00bd5f9`). The brief: try to REFUTE each fix is sound, complete, idiomatic.
Every surviving weakness is flagged as an AT candidate with a severity and a
wave/gate proposal.

Severity legend: **S1** publish/correctness-blocking · **S2** real defect, ships
quietly wrong on some path · **S3** hygiene / hardening / DRY / overfit · **S4**
doc/record accuracy.

---

## R1 — externalize @mkbabb/value.js (`8114bba`, `vite.library.ts`)

The fix moves `@mkbabb/value.js` into `libraryExternal` (line 126) and adds the
UMD `libraryGlobals` entry `"@mkbabb/value.js": "ValueJs"` (line 137). Aurora's
`dist/aurora.js` drops 47.7 → 16.8 KiB gzip. The behaviour is correct — value.js
is a peer now (`package.json` `peerDependencies["@mkbabb/value.js"]: "^0.10.0"`),
and `src/components/custom/aurora/composables/color.ts:21` imports the named
OKLab/gamut helpers from the bare specifier.

### R1-a — the `ValueJs` UMD global name is DEAD WEIGHT, not load-bearing (S3)

`libraryGlobals` (vite.library.ts:134-138) only matters for a UMD/IIFE build —
it tells Rollup what global to read when an external is not import-resolvable.
glass-ui builds **ES-only**: `libraryFileName` (line 117) emits `.js` ES chunks,
the entries are all `export *` barrels, and `package.json` `exports` map every
subpath to an `import` condition with no `require`/UMD twin. No UMD format is
emitted anywhere in the build, so `libraryGlobals` is consulted by NOTHING. The
pre-existing `vue: "Vue"` + `keyframes: "Keyframes"` entries are equally inert;
R1 simply extended a dead map. Not WRONG (it can't misfire), but it is a
misleading "this is needed for ES externalization" signal — a future maintainer
reading R1 will assume the globals entry is what makes the externalization work,
when in truth `libraryExternal` alone does it.

→ **AT candidate (S3, hardening/hygiene wave):** either DROP `libraryGlobals`
entirely (ES-only build never reads it) with a one-line comment recording why, or
add an assertion in the build config that no UMD/IIFE format is configured so the
map's deadness is documented rather than latent. Gate: an inline build-config
comment is sufficient; no new proof gate warranted.

### R1-b — value.js double-install / version-skew across the cohort (S2)

value.js is now a REQUIRED peer (see R7-b below — `peerDependenciesMeta` is
`undefined`, so npm does not treat it as optional). A consumer that mounts ONLY
`Button` (no aurora) is now forced to install value.js or eat a peer-warning,
even though it will never reach `dist/aurora.js`. More sharply: in the
constellation, value.js IS a glass-ui consumer (its demo) AND glass-ui's value.js
peer — if value.js publishes 0.11.0 with a breaking color-core change, glass-ui's
`^0.10.0` peer ERESOLVEs the cohort exactly as the keyframes pin did pre-R7
(`8114bba` commit body documents that very failure for keyframes). The R1 fix
solved the bundle-size inversion but inherited the same brittle-pin class it just
fixed for keyframes — value.js's `^0.10.0` is a single-major pin on a 0.x package
where EVERY minor is a potential breaking change (semver 0.x convention).

→ **AT candidate (S2, hardening wave):** (1) audit whether value.js should be an
OPTIONAL peer (`peerDependenciesMeta["@mkbabb/value.js"].optional = true`) so the
Button-only consumer is not forced to install a WebGL color core it never
reaches — this is the same isolation logic that put aurora on its own subpath.
(2) Decide the 0.x pin policy: `^0.10.0` will not auto-satisfy 0.11.0; if value.js
is on a fast 0.x cadence, glass-ui needs either a wider `>=0.10.0 <1` range or a
documented lockstep-bump contract. Gate: extend `proof:package`'s peer-resolution
probe to assert value.js resolves against the cohort's published latest (it
currently only probes keyframes — see R7).

---

## R3 — components.css self-sufficiency (`8114bba`, `vite.style-assets.ts` +
## `scripts/proof-components-css.mjs`)

The emit ships glass-ui's component utilities into `dist/styles/components.css`
plus a minimal `:root{}` of Tailwind-owned base props the kept utilities
reference. The `proof:components-css` gate asserts the witness rule, zero
`@layer base`, and every bare `var(--X)` resolves. I confirmed the built base
block is genuinely minimal — 34 props, exactly `referenced ∩ themeOwned −
glassDefined` (verified against `dist/styles/components.css`). This is the
opposite of over-emit: it does NOT ship the whole Tailwind theme.

### R3-a — reading the INSTALLED `tailwindcss/theme.css` is version-coupled but
### SILENTLY so (S2)

`vite.style-assets.ts` resolves `themeOwned` from
`require_.resolve("tailwindcss/package.json")` → `theme.css` (the R3 second-half
emit). The values are read VERBATIM and baked into the shipped CSS:
`--spacing: 0.25rem`, `--text-base--line-height: calc(1.5 / 1)`, the
`--color-amber-*` oklch stops, etc. This couples the shipped artefact to the
EXACT Tailwind version installed at glass-ui BUILD time. Two failure modes:

1. **Drift on a Tailwind minor.** If Tailwind 4.2 retunes `--spacing` or adds a
   `--text-*` rung, glass-ui's shipped components.css carries the 4.0 values
   frozen, while the consumer's own Tailwind 4.2 utilities use the new values —
   a silent two-source-of-truth split for any utility glass-ui ships AND the
   consumer also generates. No gate catches this; `proof:components-css` only
   checks that refs RESOLVE, not that they MATCH the consumer's Tailwind.

2. **Theme-block format change.** The emit walks `@theme { … }` at-rules in
   `theme.css` (`postcss.parse(...).walkAtRules("theme", …)`). If a Tailwind
   minor restructures `theme.css` (splits it, renames the at-rule, moves defaults
   into a `@layer theme` instead), `themeOwned` comes back EMPTY, `baseProps` is
   `[]`, no `:root{}` is emitted — and `proof:components-css` then FAILS closed
   (every bare ref undefined). That is the GOOD failure (fail-closed). But the
   value-drift case (1) is the SILENT one.

The commit body's claim that "the package theme.css is the authoritative,
context-independent source" is true for the build but elides that it is
ALSO version-pinned and unguarded against consumer-Tailwind drift.

→ **AT candidate (S2, hardening wave):** add a `proof:components-css` assertion
(or a sibling gate) that records the Tailwind version the base block was emitted
against (a build-stamped comment or a `tailwindVersion` field in the gate
artifact) and fails if it diverges from `package.json`'s `tailwindcss` peer
floor — so a Tailwind bump that retunes a baked prop is a conscious re-emit, not
a silent fossil. Gate: extend `proof:components-css`.

### R3-b — RUNTIME_PROPS is a hand-maintained allowlist — soft rubber-stamp risk
### (S3)

The gate's `RUNTIME_PROPS` set (proof-components-css.mjs:73-83) lists 9
consumer/runtime-set props (`--reka-*`, `--dock-pos`, `--carousel-nav-*`,
`--stack-overlap-*`). The brief asks: is this a rubber-stamp escape hatch? My
verdict: NOT currently a rubber-stamp — it is small, every entry carries a prose
rationale (lines 63-71), and a NEW undefined bare ref fails closed until a
maintainer adds it. BUT the escape hatch is unguarded against ABUSE: nothing
asserts that an allowlisted prop is ACTUALLY set at runtime by the named
component. A maintainer under time pressure who hits the gate can "make it green"
by adding the offending prop to RUNTIME_PROPS with a plausible-sounding comment,
masking a genuine dropped-base regression. The gate trusts the maintainer's
discipline; it has no second-order check.

→ **AT candidate (S3, hardening wave):** for each RUNTIME_PROPS entry, the gate
could grep the dist component JS / SFC CSS for an actual `style.setProperty` or
inline-`--X` write of that prop, asserting it IS runtime-set somewhere — turning
the allowlist from "maintainer asserts" into "verified runtime-set OR explicit
consumer-prop". Lower priority; the current form is defensible. Gate: optional
`proof:components-css` enhancement.

### R3-c — the `classish` scan over-collects, but harmlessly — verify it does not
### MISS (S3)

The emit's `classish` regex (vite.style-assets.ts first-half) scans every quoted
string in every `dist/*.js` for class-shaped tokens. Two adversarial risks:
(1) a class glass-ui emits CONDITIONALLY via `cn()` string concat (e.g.
`` `rounded-${tier}` ``) is a template literal — the static literal
`rounded-` fragment is not a complete class, so a dynamically-composed utility
would be MISSED by the safelist and silently no-op for a bare consumer, exactly
the regression class R3 set out to fix. (2) The witness rule proves
`rounded-panel` ships, but proves NOTHING about coverage of the long tail.

→ **AT candidate (S3, hardening wave):** audit glass-ui's component templates for
DYNAMICALLY-composed Tailwind classes (template-literal class fragments) that the
static `dist/*.js` string scan cannot see; either forbid them by convention or
add them to an explicit safelist seed. Gate: a coverage spec that mounts each
exported component and asserts its computed `border-radius` / spacing is non-zero
under a bare (`@source`-less) stylesheet — the true end-to-end check R3's witness
rule only gestures at.

---

## R4 — useTextHighlight multiplex (`fef1b8e`, `src/composables/dom/useTextHighlight.ts`)

The module-global `groups: Map<string, Set<Contributor>>` (line 64) unions every
live instance's ranges under one shared `Highlight`. The fix is well-built — lazy
contributor construction, `onScopeDispose` wired (line 200-202), SSR no-op via
`detectSupport()`. But several adversarial holes survive.

### R4-a — the multiplex assumes SAME PAINT per name; two surfaces with DIFFERENT
### intended emphasis under one name silently merge (S2)

The doc comment (lines 17-23) frames the multiplex as a FEATURE: two FuzzySearch
instances sharing `glass-search-mark` union cleanly. True — when both WANT the
same paint. But a name is a single `::highlight(<name>)` paint rule, so two
surfaces that share a name but intend DIFFERENT emphasis (one wants a yellow
search mark, one wants a red error underline) cannot be distinguished — the
multiplex unions their ranges under whichever single `::highlight` rule exists,
painting BOTH range sets identically. The old "last-write-wins" bug at least
made the collision LOUD (one surface visibly blanked); the multiplex makes a
genuine name-collision SILENT (both paint, wrongly, with the same style). The fix
traded a loud bug for a quiet one in the misuse case.

→ **AT candidate (S2, hardening wave):** the composable cannot detect intent, but
it CAN warn in dev when two contributors register under one name from
DIFFERENT call sites with no shared owner — or document the name-as-paint-identity
contract more sharply (a name is a GLOBAL paint channel; never reuse a name for
two semantically-distinct emphases). Gate: a dev-only `console.warn` on
cross-owner name reuse + a doc contract line; a spec asserting the warn fires.

### R4-b — the Map is process-global and never module-reset — SSR request bleed
### (S2)

`groups` (line 64) is a true module singleton. The SSR no-op path (`supported`
is false under SSR, so `set`/`clear`/`dispose` early-return) protects against
SSR WRITES. But on a Node SSR server that DOES polyfill `CSS.highlights`
(jsdom/happy-dom in a test or an SSR-with-DOM-shim setup), `detectSupport()`
returns true and `groups` accumulates contributors ACROSS REQUESTS — the module
singleton is shared by every request in the same process. Two concurrent SSR
renders of different pages both painting `glass-search-mark` would cross-
contaminate. The comment claims "SSR (no document/CSS) takes the same no-op path"
— correct for bare Node, but NOT for a DOM-shimmed SSR runtime, which is exactly
where a singleton-Map leak bites.

→ **AT candidate (S2, hardening wave):** confirm whether glass-ui claims SSR
support at all (CLAUDE.md does not list it as a target). If SSR is in scope, the
registry must be request-scoped (e.g. keyed off an injected app context) rather
than a module singleton. If SSR is explicitly out of scope, DOCUMENT that the
Custom Highlight composables are client-only and remove the half-claim "SSR no-op"
language that implies safety it does not fully provide. Gate: a precept line on
SSR scope + a happy-dom multi-instance spec proving the leak (or its absence).

### R4-c — `set(ranges)` slices the array but NOT the Range objects (S3)

`set` does `ranges.slice()` (line 150) — a shallow copy of the array, but the
`Range` objects are shared by reference. A consumer that mutates a `Range` it
handed in (re-`setStart`s it) after calling `set` mutates the live painted range.
Low-likelihood misuse, but the `slice()` gives a false impression of ownership
transfer.

→ **AT candidate (S3):** document that handed-in `Range`s must not be mutated
post-`set`, or deep-copy. Low priority. Gate: doc line.

---

## R6 — anySignal + the G1 @supports DROP (`fef1b8e`)

### R6-a — anySignal manual-merge leaks listeners on the long-lived-signal path (S2)

`anySignal` (usePrioritizedTask.ts:65-86) merges signals via a fresh
`AbortController`, adding an `abort` listener (`{ once: true }`) to each live
signal. The `{ once: true }` means the listener auto-removes WHEN IT FIRES. But
if the merged signal's consumer is torn down WITHOUT any input signal ever
aborting (the common case — the task completes normally, the controller is GC'd),
the `abort` listeners stay attached to the input signals until THOSE signals are
GC'd. When `controller.signal` is a long-lived `TaskController` signal (it lives
for the composable's whole lifetime) and `options.signal` is a long-lived app
signal, every `postTask` call adds a never-removed listener to BOTH — an
unbounded accumulation across the composable's lifetime. `AbortSignal.any` (the
native fast path) manages this internally with weak refs; the manual fallback
does NOT. The legacy branch the commit calls "load-bearing" is also leak-bearing.

Note the native path is taken on every modern engine, so this only bites the
legacy fallback (engines without `AbortSignal.any`) — narrow, but on exactly the
old/constrained engines where a listener leak hurts most.

→ **AT candidate (S2, hardening wave):** the manual merge should register a
cleanup that removes the `abort` listeners from the inputs once the merged signal
is no longer needed (or accept that the fallback is best-effort and bound the
leak by reusing one merged controller per `usePrioritizedTask` rather than per
`postTask` call). Gate: a spec under a no-`AbortSignal.any` shim asserting no
listener accumulation across N `postTask` calls.

### R6-b — dropping the `@supports(container-type: inline-size)` wrapper relies on
### invalid-at-rule drop — REAL but verify the degradation target (S2)

The G1 fix (ConfiguratorRow.vue + utilities.css) removes the `@supports`
wrapper, relying on `@container style(--density: …)` parsing as an invalid
at-rule (and being dropped) on engines without style-query support. The reasoning
is sound CSS — an unknown at-rule's block is dropped, the `[data-density]`
attribute base survives. BUT the commit's claim that the OLD `@supports
(container-type: inline-size)` wrapper was "wrong" deserves a second look: it was
PROBING THE WRONG FEATURE (size-query, not style-query) — agreed — but it was
also acting as a CONSERVATIVE guard that kept the whole block out of engines that
support size-query but NOT style-query (a real intermediate: Chrome shipped
`container-type: inline-size` in 111 but `@container style()` later). By dropping
the wrapper, the block is now LIVE on those intermediate engines, relying on
their graceful-drop of the style-query. The question the audit must settle: does
EVERY engine in that intermediate window (size-query-yes, style-query-no)
correctly DROP `@container style(--density: mobile)` as invalid, or do some PARSE
the `@container` at-rule (they support `@container` for size!) and then mis-handle
the unknown `style()` function inside it — potentially applying the block
unconditionally? `@container` is a KNOWN at-rule on those engines; only the
`style()` query function is unknown. An engine that treats an unknown query
function as "always-true" rather than "always-false" would apply the mobile/
compact/etc. rules ALL AT ONCE (last wins → spacious), silently widening the
paint surface — exactly the brief's worry.

The commit asserts "degrades gracefully" but cites no test on the
size-yes/style-no engine class. This is an UNVERIFIED degradation claim.

→ **AT candidate (S2, hardening wave):** verify the `@container style()` drop
behaviour on the intermediate-engine class (a real browser-matrix or a documented
spec citation that an unknown container query function evaluates false, not
true). If any target mis-applies, restore a CORRECT guard — `@supports
(container-type: inline-size) and (not (foo: bar))`-style probes do not exist for
style queries, but a feature-query on a style-query-only property could. Gate: a
Playwright matrix assertion or a cited spec line in the precept; until verified,
this is a widened-paint risk, not a clean fix.

---

## R7 — keyframes peer `^2.2.0 || ^3.0.0` + the test-matrix gap (`8114bba`, `5e2f055`)

### R7-a — CI tests ONLY 3.0.0; local tests ONLY 2.2.0; neither tests BOTH (S2)

Confirmed by inspection: `package.json` `devDependencies["@mkbabb/keyframes.js"]
= "^2.2.0"` (so LOCAL `npm test` runs against the installed 2.2.0).
`proof:package` on a clean CI runner installs the keyframes PEER RANGE
`^2.2.0 || ^3.0.0`, which npm resolves to the highest match = **3.0.0** (verified:
`npm view @mkbabb/keyframes.js@^2.2.0 || ^3.0.0 version` → 3.0.0 is latest). So:

- Local dev/test: keyframes **2.2.0** only.
- CI `proof:package` consumer install: keyframes **3.0.0** only.
- CI `npm test` (uses the devDep): keyframes **2.2.0** only.

The widened peer CLAIMS support for both majors, but no single context exercises
BOTH. The commit body says "Validated glass-ui against 3.0.0 — typecheck + 113
specs green," but that validation was a one-off manual run, not a standing matrix.
A future change that works under 2.2.0's light-engine API but breaks under 3.0.0
(or vice versa) ships green. The peer's `||` is a PROMISE the CI does not keep.

→ **AT candidate (S2, hardening wave):** add a CI matrix axis that runs the motion
specs against BOTH keyframes majors (a `keyframes: [2.2.0, 3.0.0]` job matrix, or
two `proof:package` runs pinning each major). The peer range is only honest if
both ends are gated. Gate: `ci.yml` matrix expansion + a `gates.mjs` filter that
parameterizes the keyframes version.

### R7-b — value.js + keyframes + tw-animate-css are REQUIRED peers via the
### `optionalPeerDependencies` non-standard field (S2)

`package.json` declares `optionalPeerDependencies: { "tw-animate-css": "^1.2.5" }`
AND lists `tw-animate-css` in `peerDependencies`. But `optionalPeerDependencies`
is **not a field npm recognizes** — npm marks a peer optional ONLY via
`peerDependenciesMeta: { x: { optional: true } }`, which is `undefined` here. So
npm treats tw-animate-css, value.js, AND keyframes all as REQUIRED peers. CLAUDE.md
line 362 explicitly claims tw-animate-css "ships as an optionalPeerDependency so
package tooling surfaces the hint without forcing a hard install on Button-only
consumers" — that claim is FALSE against npm's actual resolution. A Button-only
consumer DOES get a peer-warning for tw-animate-css (and now value.js, the WebGL
color core). The R1 externalization's whole isolation premise (Button-only
consumers stay lean) is undercut by required peers they never reach.

→ **AT candidate (S2, packaging-correctness wave):** convert
`optionalPeerDependencies` → the standard `peerDependenciesMeta[x].optional` for
tw-animate-css, and DECIDE whether value.js + keyframes should be optional too
(they are only reached via the aurora / motion subpaths, not the root barrel).
Add a `proof:package` assertion that every peer NOT reachable from the root
barrel is marked optional, so the "lean Button consumer" claim is enforced rather
than asserted. Gate: extend `proof:package` peer-optionality check; correct
CLAUDE.md line 362.

---

## proof:package sequenced-run fix (`9031972`) — `--ignore-scripts` safety

### proof-a — `--ignore-scripts` during pack is SAFE here, but the safety is
### implicit, not asserted (S3)

The fix packs with `--ignore-scripts` to keep `prepare`'s vite stdout out of the
`--json` capture. I verified the lifecycle is safe to skip: `package.json`
`prepare = "test -f dist/glass-ui.js -a -f dist/index.d.ts || npm run build"` —
purely a build-if-missing guard, idempotent, and the gate ALREADY builds a
complete dist (the `||` guard on `index.d.ts` above the pack). There is NO
`prepack` / `postpack` (verified `undefined`), so `--ignore-scripts` drops nothing
load-bearing. **The fix is sound.** The residual concern is that the safety
depends on `prepare` STAYING a no-op-when-built guard — if a future `prepare`
gains a load-bearing step (a dist-rewrite, a license stamp), `--ignore-scripts`
would silently skip it and pack a stale/incomplete tarball.

→ **AT candidate (S3, hygiene):** the gate's build-when-missing block and the
`--ignore-scripts` pack are now coupled by an unstated invariant ("`prepare` does
nothing the build above didn't already do"). Add a one-line gate comment pinning
that invariant, OR have the gate run `prepare`'s logic explicitly rather than
relying on it being a no-op. Lower priority; the current form is correct. Gate:
comment only.

### proof-b — the `slice(indexOf("["))` JSON parse is a fragile band-aid over a
### root cause (S3)

The "defensive parse from the first `[`" (proof-package.mjs:118-120) treats the
SYMPTOM (stdout contamination) after `--ignore-scripts` already removed the CAUSE.
With scripts off, the pack output IS pure JSON — so the slice is belt-and-braces.
But it is ALSO a latent correctness hazard: if any future legitimate JSON content
contained a `[` after leading noise, or if npm ever emits a JSON object `{…}`
instead of an array under `--json`, `slice(indexOf("["))` mis-parses. The two
fixes (ignore-scripts + slice) are redundant; keeping both invites the assumption
that the slice is doing real work.

→ **AT candidate (S3, hygiene):** now that `--ignore-scripts` guarantees clean
output, either DROP the slice (clean JSON, parse directly) or keep it ONLY with a
comment that it is redundant belt-and-braces. Gate: comment / simplification.

---

## W7 13-defect fixes (`96858c8`, `00bd5f9`) — demo-only vs library

### W7-a — the silent-no-op `scroll-on-overflow` catch proves the W7 process gap is
### STILL open (S2)

Wave 3's headline catch: Wave 2 wired the demo with a NONEXISTENT prop
`scroll-on-overflow` (GlassDock only has `overflow:"grow"|"scroll"`), so the
library-correct, unit-green dock fix NEVER engaged in the running demo. Wave 3
fixed the two call sites (`CategoryRail.vue`, `StoryPager.vue` → `overflow="scroll"`).
This is the binding-verification silent-no-op class from MEMORY
(`feedback_glass_ui_binding_verification.md`) — vue-tsc + units miss component-root
kebab-attr fall-through. The adversarial point: Wave 3 fixed the TWO known sites
but the punch-list itself (`00bd5f9` body) admits the GUARD that would have caught
it ("a guard test asserting the chrome docks CARRY dock-scroll-{x,y}") was only
BOOKED, not built. So the process hole that produced the bug is still open — the
next stale-binding regression will ship the same way.

→ **AT candidate (S2, hardening wave — HIGH priority per MEMORY):** build the
booked guard. A demo-mount spec (or Playwright assertion) that every chrome dock
which intends overflow ACTUALLY carries the `.dock-scroll-{x,y}` class at runtime
— turning the silent-no-op class into a fail-closed gate. This is the canonical
"only e2e catches it" case the MEMORY entry flags for version bumps. Gate: a
demo-mount/e2e spec wired into the test run.

### W7-b — `supportsPostTask` has ZERO call sites and DUPLICATES inline logic
### (S3, the W6-close L24 flag)

Confirmed: `supportsPostTask` (src/utils/platformSupport.ts:23) is re-exported
through the root barrel (`src/utils/index.ts:9`) but has **zero in-repo call
sites** (grep across `src/` + `demo/` excluding its own def/test = nothing —
contrast `supportsMoveBefore`, used in `demo/stories/foundations/native-top-layer.vue:31`,
and `supportsScrollTimeline`, used in `useScrollProgress.ts:28`). Worse, its
feature-detect (`typeof scheduler?.postTask === "function"`) is DUPLICATED verbatim
inside `usePrioritizedTask`'s `getSchedulerPostTask` (usePrioritizedTask.ts:38-44)
— the wrapper that SHOULD consume it. The W6-close ledger (line 24) explicitly
flagged this: "0 in-repo call sites by design (AT: wire into usePrioritizedTask
for DRY, or drop)." Per the overfitting invariant, a `src/` artefact needs ≥2
distinct consumer contexts OR public-export status OR demo-private. `supportsPostTask`
IS publicly exported, so it survives the strict bar — but it is the ODD predicate
out of the platformSupport trio (the other two have real consumers), and it
duplicates logic it should own. This is exactly the "exported-but-orphan-in-spirit"
shape overfitting audits exist to catch.

→ **AT candidate (S3, DRY/transposition wave — the W6-close handoff):** WIRE
`getSchedulerPostTask` to call `supportsPostTask` (DRY the duplicated detect), OR
DROP `supportsPostTask` from the public surface if the platformSupport trio is
meant to be consumer-facing-only and no consumer wants it. Decide deliberately
per the W6-close handoff. Gate: the overfitting audit at AT close + a DRY refactor.

### W7-c — the deriveAurora "≥2 distinct consumer" graduation is THIN (S3/S4)

The W6-close audit (line 30-31) graduates `deriveAurora` BOOKED→SHIPPED on the
witness "`/aurora` export + the W7 D10b Derive-from-color demo UI + spec." But the
overfitting invariant per MEMORY/precept is ≥2 DISTINCT consumer CONTEXTS — and
the D10b demo UI is ONE context (glass-ui's own demo), the spec is a test (not a
consumer). The cohort named value.js as the 2nd consumer (VAL-1), but value.js
has not yet ADOPTED `deriveAurora` (W6-postpublish-verify.md line 35 lists it as
"now-actionable," i.e. not-yet-done). So at HEAD, `deriveAurora` has exactly ONE
real consumer context + its own demo + its own spec. It is publicly EXPORTED, so
it passes the export-OR bar — but the "≥2 distinct consumer" graduation claim is
not yet TRUE; it is a forward-bet on value.js adopting. The record overstates the
witness.

→ **AT candidate (S4, record accuracy + S3 follow-up):** record `deriveAurora` as
SHIPPED-on-export (honest) rather than SHIPPED-on-≥2-consumers (not yet true), and
TRACK value.js's actual adoption as the AT ≥2-consumer confirmation. This is the
same pattern as the blob lift below — do not let a forward-bet read as a satisfied
invariant. Gate: AT overfitting-audit pass that distinguishes export-bar from
≥2-consumer-bar.

### W7-d — the W7 fixes are correctly split library-vs-demo; no demo-only fix
### masqueraded as a library fix (verified, no defect)

I checked the W7 commit ledgers against the actual diffs. The library fixes
(D2/D12 GlassDock overflow prop, D8 BouncyToggle scroll-into-view, D9
useSortable ghost radius, D10a aurora time-rate, D10b deriveAurora) all landed in
`src/`; the demo fixes (D1/D13/D3/D6/D5/D7/D11) landed in `demo/`. The one trap —
D2/D12's library fix that DIDN'T engage in the demo — was caught by Wave 3 (W7-a).
No OTHER library fix is demo-only-disguised. This is a clean split. (S-none.)

---

## Cross-cutting: the AT headline (goo-blob + watercolor-dot lift) — adversarial
## read of the stated premise

The brief's AT headline is to lift goo-blob + watercolor-dot from value.js's demo
into glass-ui subpaths with a REQUIRED injected color-resolver seam (inv-K-3 — no
value.js default baked in). Adversarial findings that BEAR on whether this is even
the right shape:

### head-a — glass-ui ALREADY has a divergent `blob` demo; the lift is a
### COLLISION, not a greenfield add (S2 for the plan)

`demo/stories/blob.vue` (glass-ui) is a **canvas-2D** metaball field — "The
renderer is self-contained (canvas 2D, token-driven colours) … the demo medium,
a sibling to aurora's WebGL stage, not a library primitive" (blob.vue header).
value.js's goo-blob (`value.js/demo/@/components/custom/goo-blob/`) is a **WebGL +
GLSL** metaball renderer (`useMetaballRenderer.ts` + `shaders/metaball.frag.glsl`).
These are TWO DIFFERENT implementations of the same idea. The AT lift cannot
naively "move value.js's GooBlob in" — it must RECONCILE with glass-ui's existing
canvas-2D blob.vue (supersede it? keep both? the WebGL one becomes the library
primitive and the canvas-2D demo retires?). The W6-postpublish record (line 60-69)
already flags the ≥2-distinct-consumer gap honestly — but it does NOT flag this
implementation collision, which is the harder architectural problem.

→ **AT candidate (S2, the headline DESIGN wave):** the goo-blob lift is a gestalt
reconciliation, not a move. The AT plan must decide: WebGL GooBlob becomes the
`/goo-blob` library primitive (per the gestalt-redesign-over-patch precept), the
canvas-2D `demo/stories/blob.vue` either retires or becomes the consumer demo of
the lifted primitive (giving the ≥2nd distinct consumer alongside value.js). The
injected color-resolver seam (inv-K-3) is the right instinct — value.js's GooBlob
couples to value.js color via `useBlobMood`; the lifted primitive must take a
color resolver as a REQUIRED prop/inject so glass-ui ships no value.js dependency
in the primitive itself. Gate: a design doc (`docs/tranches/AT/design/`) that
resolves the canvas-2D-vs-WebGL collision + a proof that the lifted primitive
imports NO `@mkbabb/value.js` (the inv-K-3 seam, asserted by a `proof:*` grep over
`dist/goo-blob.js`).

### head-b — the ≥2-distinct-consumer bar for the lift is STILL UNMET at HEAD (S2)

The W6-postpublish record (line 64-69) is honest that the "9 consumers" are all
call-sites inside value.js's ONE demo. The lift needs a confirmed 2nd DISTINCT
consumer. glass-ui's own demo (the reconciled blob.vue) is a candidate 2nd context
— but only if it actually consumes the LIFTED primitive (not the parallel
canvas-2D one). So head-a's reconciliation is a PRECONDITION for head-b's
invariant satisfaction: retiring canvas-2D blob.vue and re-pointing it at the
WebGL primitive is what MAKES the ≥2-consumer bar true.

→ **AT candidate (S2, headline wave gate):** the AT lift wave's HARD GATE is "the
lifted `/goo-blob` (and `/watercolor-dot`) primitive has ≥2 distinct consumer
contexts at close" — satisfied by (value.js demo adoption of the published
subpath) + (glass-ui's reconciled demo). If only the glass-ui demo consumes it at
close, the lift FAILS the binary-substrate invariant and must stay BOOKED. Gate:
overfitting audit at AT close, with the consumer count asserted.

---

## Summary table — AT candidates by severity

| ID | Severity | Title | Wave | Gate |
|---|---|---|---|---|
| R7-b | S2 | `optionalPeerDependencies` non-standard → value.js/keyframes/tw-animate are REQUIRED peers; CLAUDE.md L362 false | packaging-correctness | `proof:package` peer-optionality check + CLAUDE.md fix |
| R7-a | S2 | keyframes peer claims both majors; CI tests only 3.0.0, local only 2.2.0 | hardening | `ci.yml` keyframes matrix axis |
| R1-b | S2 | value.js double-install / 0.x pin brittleness on a forced peer | hardening | `proof:package` value.js resolution probe |
| R3-a | S2 | components.css base block is Tailwind-version-pinned, silent on drift | hardening | `proof:components-css` Tailwind-version stamp |
| R4-a | S2 | multiplex silently merges two DIFFERENT intended paints under one name | hardening | dev-warn + doc contract |
| R4-b | S2 | `groups` module-singleton bleeds across DOM-shimmed SSR requests | hardening | SSR-scope precept + happy-dom spec |
| R6-a | S2 | anySignal manual-merge leaks abort listeners on the legacy long-lived path | hardening | no-`AbortSignal.any` shim spec |
| R6-b | S2 | dropping `@supports` widens paint on size-yes/style-no engines (unverified degradation) | hardening | browser-matrix / cited-spec verification |
| W7-a | S2 | the dock silent-no-op guard was BOOKED, not built — process hole open | hardening (HIGH per MEMORY) | demo-mount/e2e dock-scroll guard spec |
| head-a | S2 | goo-blob lift COLLIDES with glass-ui's existing canvas-2D blob.vue | headline design | design doc + inv-K-3 no-value.js grep |
| head-b | S2 | ≥2-distinct-consumer bar for the lift unmet at HEAD | headline gate | AT-close overfitting consumer count |
| R1-a | S3 | `ValueJs` UMD global is dead weight in an ES-only build | hygiene | build-config comment |
| R3-b | S3 | RUNTIME_PROPS allowlist is maintainer-trust, no second-order check | hardening | grep-verify runtime-set |
| R3-c | S3 | static class scan misses dynamically-composed Tailwind classes | hardening | bare-stylesheet computed-style coverage spec |
| R4-c | S3 | `set()` array-slices but shares Range objects | hygiene | doc line |
| proof-a | S3 | `--ignore-scripts` safety depends on unstated `prepare`-is-noop invariant | hygiene | gate comment |
| proof-b | S3 | redundant `slice(indexOf("["))` band-aid over a fixed root cause | hygiene | drop or comment |
| W7-b | S3 | `supportsPostTask` 0 call sites + duplicates inline detect (W6-close L24) | DRY/transposition | wire-or-drop + overfitting audit |
| W7-c | S3/S4 | `deriveAurora` ≥2-consumer graduation thin (value.js not yet adopting) | record + follow-up | AT overfitting audit |

Clean (no defect): R3 over-emit (base block is genuinely minimal, 34 props),
proof:package `--ignore-scripts` correctness, W7 library-vs-demo split fidelity.
