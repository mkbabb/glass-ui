# AT.W0b · Lens C2 — hardening the W6/W7 correctness fold + the AS-residual defects

**Lens C2.** The engineering-correctness counterpart to the SOTA wave (A1–A6) and
the dock wave (B1–B6). Where A* argue the blob substrate forward and B* harden the
dock, C2 turns the adversarial light on the ONE half of AT that is pure
correctness debt: the **W6 gate-fleet fold** (`AT.md:95-100`, §W6) and the **W7
slipped ships** (§W7). The brief: take the R-defects L1 surfaced
(`W0-L1-changes-adversarial.md`) + the L4 fold rows (`W0-L4`) and pin each gate's
**precise fail-closed spec**, the **exact contract** each gate enforces, and the
**W6/W7 wave order**. Build ON the plan; do not re-derive.

Every claim is `file:line`-grounded against glass-ui HEAD and the value.js
reference impl. SOTA where the lens needs it is web-corroborated (cited inline,
knowledge-vs-web flagged); the A5 lens already did the deep CSS-color/web pass, so
C2 leans on its findings rather than re-fetching.

Disposition: analysis only. NO src/ written, NO sibling written.

Severity legend (inherited from L1): **S1** publish/correctness-blocking · **S2**
ships quietly wrong on some path · **S3** hygiene/DRY/hardening · **S4** doc/record.

---

## 0. Executive summary — the seven load-bearing hardens

1. **The `proof:peer-optional` contract has a sharper, mechanical definition than
   the plan states.** AT.md §W6 says "every peer NOT reachable from the root barrel
   is marked optional." That is the RIGHT instinct but it under-specifies. The exact
   contract C2 pins: **a peer is `optional:true` IFF it is unreachable from the
   `dist/glass-ui.js` ROOT chunk's transitive `import` graph** — and the gate
   computes that reachability MECHANICALLY off the externalized literal scan
   (`@vueuse/core`, `@mkbabb/keyframes.js`, `@mkbabb/value.js` are all Rollup
   `external`, `vite.library.ts:121-126`, so each appears as a bare literal in
   exactly the chunks that reach it). This makes the gate a derived fact, not a
   maintained allowlist (§2). The non-standard `optionalPeerDependencies` field
   (`package.json`, confirmed) is read by NPM as NOTHING, so today value.js +
   keyframes + tw-animate-css are ALL required peers — CLAUDE.md:362's "optional"
   claim is false (R7-b).

2. **`proof:vueuse-free-root` is implementable statically with the walker the repo
   ALREADY ships** — `proof-consumers-static.mjs`'s `collectExports`/
   `resolveModulePath` comment-stripped transitive walk (`:59-119`). The gate is the
   same shape as the A5 inv-K-3 source-graph proof: from `src/index.ts`, walk the
   transitive `import`/`export … from` graph and assert it never reaches
   `@vueuse/core`. At HEAD it FAILS — `src/index.ts:104 export * from
   "./components/ui/data-table"` → `DataTable.vue:3 import { useElementSize } from
   "@vueuse/core"` (both confirmed). The gate is the inv-θ extension; the DataTable
   fix is the precondition (§3).

3. **The keyframes `[2.2.0, 3.0.0]` CI matrix is a TWO-AXIS install matrix, not a
   per-test matrix** — and the cheapest honest form is a `proof:package` axis, not a
   full `npm test` matrix. `^2.2.0 || ^3.0.0` resolves to 3.0.0 (HEAD-verified: the
   published set ends `…2.2.0, 3.0.0`, so `||` → highest = 3.0.0); local tests run
   2.2.0 (the devDep floor, confirmed `^2.2.0`). Neither end tests BOTH (R7-a). The
   fix is a matrix axis pinning each major, gated by `gates.mjs` parameterization (§4).

4. **R4 (multiplex) + R6 (anySignal-leak / `@container` drop) are three distinct
   quiet-wrong paths with three distinct fail-closed specs** — and two of them
   (R4-b SSR-singleton, R6-b `@container`) hinge on a SCOPE DECISION (does glass-ui
   claim SSR? what is the engine-support floor?) that must be RECORDED before a gate
   can fail closed (§5). The anySignal leak (R6-a) is the only one with a clean
   mechanical spec (a listener-count assertion under a no-`AbortSignal.any` shim).

5. **The dock binding-guard is the WRONG altitude — B6-1 already proved it.** The
   booked guard (`AT.md:168`) is a point demo-mount spec; the categorical fix is
   `vueCompilerOptions.checkUnknownProps` → `strictTemplates` (verified absent in
   `tsconfig*.json`). C2 CONCURS with B6 and folds the dock-guard slice into B6's
   `proof:strict-templates` rather than the point gate (§6). This is the single
   highest-leverage W6 move.

6. **The W6/W7 wave order is constrained by ONE real dependency:** the
   `peerDependenciesMeta` conversion (W6) must land BEFORE `proof:peer-optional` can
   compute a green baseline, and `proof:vueuse-free-root` must land WITH the
   DataTable fix (the gate is red until the fix). Everything else in W6 is
   file-disjoint and parallelizes. W7's slipped ships are independent of W6. The
   precise order is in §7.

7. **Two L1 defects are NOT yet folded into any AT wave** (§8): **R3-c** (the static
   class-scan misses dynamically-composed Tailwind classes — a true end-to-end
   coverage gap, not just the booked `components.css` version stamp) and **R1-a**
   (the dead `ValueJs` UMD global). Both are S3; R3-c is the more material (it is the
   same silent-no-op CLASS as the dock binding bug, but for CSS utilities). Flagged
   for W6/W7 fold.

---

## 1. The frame — what W6/W7 commit to, what L1/L4 verified

The AT plan's W6 (`AT.md:95-100, 150`) commits seven correctness folds:
`proof:vueuse-free-root` + DataTable; `peerDependenciesMeta` + `proof:peer-optional`
+ CLAUDE.md; keyframes `[2.2.0,3.0.0]` CI axis; `supportsPostTask` wire-or-drop;
the dock binding-guard; R4/R6 hardening; the `components.css` Tailwind-version
stamp. W7 (`AT.md:101-106, 151`) commits the slipped ships (out of C2's lens except
where a W7 item carries a correctness gate — the GlassDock overflow collapse and the
π precept, both B6/L1-seeded).

C2's job is to convert each "fold X + add gate G" line into a **precise fail-closed
spec**: what G computes, what input it reads, what exact condition makes it RED, and
where it sits in `gates.mjs` (`local`/`ci`/`release` tags). A gate that does not
fail closed on its violation is theatre; the W7 silent-no-op (`scroll-on-overflow`
shipped dead) is the standing proof that "booked, not built" and "green but inert"
are the live failure mode.

HEAD verification of the W6 substrate (all confirmed this session):

| Claim | HEAD reality | cite |
|---|---|---|
| `optionalPeerDependencies` is non-standard; peers are all REQUIRED | CONFIRMED. `peerDependenciesMeta: undefined`; `optionalPeerDependencies: { "tw-animate-css": "^1.2.5" }` (the non-field). NPM reads it as nothing. | `package.json` (read this session) |
| DataTable leaks vueuse into the root barrel | CONFIRMED. `src/index.ts:104` `export * from "./components/ui/data-table"`; `DataTable.vue:3` `import { useElementSize } from "@vueuse/core"`. | both files |
| keyframes `||` peer tests only one end per context | CONFIRMED. devDep `^2.2.0`; published set ends `2.2.0, 3.0.0` so `^2.2.0 || ^3.0.0` → 3.0.0. | `package.json`; `npm view` |
| `supportsPostTask` has 0 internal call sites + duplicates inline detect | CONFIRMED. Only re-export sites (`utils/index.ts:9`, `platformSupport.ts:23`); `usePrioritizedTask.ts:38-44` `getSchedulerPostTask` duplicates the `typeof scheduler?.postTask` detect. | grep this session |
| `anySignal` legacy merge leaks `{once:true}` listeners | CONFIRMED. `usePrioritizedTask.ts:83` `addEventListener("abort", …, {once:true})` — removed only WHEN IT FIRES; the merged controller GC'd-without-abort path never removes them. | `usePrioritizedTask.ts:65-86` |
| `@container style()` drop relies on unverified engine behaviour | CONFIRMED. `ConfiguratorRow.vue:155-185` documents the no-`@supports`-wrapper reliance on invalid-at-rule drop; no test on the size-yes/style-no engine class. | `ConfiguratorRow.vue:155-185` |
| no `proof:vueuse-free-root` / `proof:peer-optional` gate exists | CONFIRMED. `gates.mjs:28-45` GATES manifest carries neither. | `gates.mjs` |

---

## 2. `proof:peer-optional` — the exact contract (R7-b, S2)

### 2.1 The contract, stated mechanically

The plan says "every peer NOT reachable from the root barrel is marked optional."
The precise, gate-computable form:

> **A peer P is `peerDependenciesMeta[P].optional === true` IFF the literal import
> specifier `P` does NOT appear in `dist/glass-ui.js` (the ROOT chunk) — i.e. P is
> reachable only via a SUBPATH chunk, never via the root barrel.**

This is mechanical because **all four heavy peers are Rollup `external`**
(`vite.library.ts:121-126`: `@vueuse/core`, `@mkbabb/keyframes.js`,
`@mkbabb/value.js`; tw-animate-css is CSS-only, never a JS import). An external is
emitted as a bare `import … from "P"` literal in EXACTLY the chunks that reach it —
the A5 lens proved this for value.js (it appears in `dist/aurora.js` and nowhere
else, `W0b-A5 §4.1`). So "reachable from the root barrel" reduces EXACTLY to "the
literal `P` appears in `dist/glass-ui.js`" — no transitive-bundling can hide a
reach behind an inlined symbol. The gate is a derived fact, not a hand-maintained
allowlist (this is the same soundness argument A5 made for the inv-K-3 grep).

### 2.2 The required → optional classification at HEAD

Computing the contract against HEAD's externalization:

| Peer | Reaches `dist/glass-ui.js` (root)? | Correct meta | Today |
|---|---|---|---|
| `vue` | YES (every component) | required (no meta) | required ✓ |
| `reka-ui` | YES | required | required ✓ |
| `class-variance-authority`, `clsx` | YES (cn + CVA) | required | required ✓ |
| `@lucide/vue` | YES (30+ SFCs) | required | required ✓ |
| `@vueuse/core` | **YES at HEAD via DataTable leak** (§3) — must become **NO** post-fix | **optional after §3 fix** | required (and leaking) |
| `embla-carousel-vue` | NO (carousel is `/carousel` + `/forms` subpath-only) | **optional** | required ✗ |
| `@mkbabb/keyframes.js` | NO (motion is `/motion` + `/motion-core`; root barrel is keyframes-free per `src/index.ts:170`) | **optional** | required ✗ |
| `@mkbabb/value.js` | NO (aurora is `/aurora` subpath-only; root is value.js-free) | **optional** | required ✗ |
| `tw-animate-css` | NO (CSS-only; never a JS import) — the `@import` is the binding requirement, not a peer install | **optional** | mis-declared via the non-field ✗ |
| `vaul-vue` | YES (Drawer is on the root barrel per CLAUDE.md §Drawer) | required | required ✓ |

So the W6 conversion is: DELETE `optionalPeerDependencies`; add
`peerDependenciesMeta` marking `@vueuse/core` (post-DataTable-fix),
`embla-carousel-vue`, `@mkbabb/keyframes.js`, `@mkbabb/value.js`, `tw-animate-css`
as `{ optional: true }`. The "lean Button-only consumer" claim (CLAUDE.md:362)
becomes TRUE: a Button consumer installs vue + reka-ui + cva + clsx + lucide, and
gets no peer-warning for the WebGL color core, the motion engine, the carousel
substrate, or tw-animate-css.

### 2.3 The fail-closed spec

`proof:peer-optional` (NEW, `scripts/proof-peer-optional.mjs`, tagged
`{local, ci, release}`):

1. Read `package.json` `peerDependencies` + `peerDependenciesMeta`.
2. ASSERT `optionalPeerDependencies` is ABSENT (the non-standard field is a RED — its
   presence means a maintainer re-introduced the mis-declaration). **Fail-closed
   trigger #1.**
3. For each peer P that is a JS import (skip `tw-animate-css` — CSS-only, hard-coded
   as optional with a rationale comment): grep `dist/glass-ui.js` for the literal
   `"P"` / `'P'` import specifier (build is a gate prerequisite, already in the
   manifest at `gates.mjs:31`). `reachable = found`.
4. ASSERT `reachable === !(peerDependenciesMeta[P]?.optional)` — i.e. a
   root-reachable peer is NOT optional; a subpath-only peer IS optional. **Fail-closed
   trigger #2** on any mismatch, with the precise message
   (`"@mkbabb/keyframes.js" is subpath-only (not in dist/glass-ui.js) but is marked
   required — add peerDependenciesMeta optional:true`).
5. `tw-animate-css`: ASSERT it is in BOTH `peerDependencies` AND
   `peerDependenciesMeta[].optional` (the documented CSS-only optional case).
   **Fail-closed trigger #3.**

This makes the optionality a DERIVED truth checked against the actual built
artefact — the same artefact a consumer installs — not a claim. The CLAUDE.md:362
correction rides W6 (the doc now describes the real `peerDependenciesMeta` shape).

> **Edge the plan must record:** `vaul-vue` is on the root barrel (Drawer ships
> root per CLAUDE.md §Drawer modes), so it stays REQUIRED — the gate confirms it. If
> a future wave moves Drawer to a `/drawer` subpath (the plan explicitly says it
> doesn't warrant one, CLAUDE.md §Drawer), vaul-vue would flip to optional and the
> gate would FORCE the meta update. That's the gate working: optionality tracks
> reachability automatically.

---

## 3. `proof:vueuse-free-root` — static implementation (R7-b's sibling, L4 #3, S2→S1-gate)

### 3.1 The DataTable fix is the precondition; the gate is the value

L4 #3 is exactly right that "the gate gap is the real AT value (the leak is
build-split-mitigated)." The leak (`DataTable.vue:3`) is mitigated at the DIST level
because `@vueuse/core` is external — so `dist/glass-ui.js` carries a bare `import
"@vueuse/core"` literal that only fires if a consumer's bundler reaches DataTable.
But the SOURCE root barrel (`src/index.ts:104`) re-exports a vueuse-bearing symbol,
which violates Design-Axis-6 (the vueuse-FREE root barrel invariant, `src/index.ts:27`)
and breaks the SCC-trap closure for downstream Rollup `manualChunks` consumers.

**The fix (W6):** the cleanest is to swap `useElementSize` →
glass-ui's in-house `useResizeObserver` (`src/composables/dom/useResizeObserver.ts`,
already vueuse-free and on the root barrel per CLAUDE.md §composables/dom). That
keeps DataTable on the root barrel (no subpath migration, no consumer break) AND
removes the only vueuse reach. The alternative (make `data-table` subpath-only) is a
consumer break (`/data-table` subpath exists but the root re-export is the documented
surface) — the swap is the gestalt move, not the relocation.

### 3.2 The gate IS the existing walker, retargeted

`proof:vueuse-free-root` is NOT new machinery — it is `proof-consumers-static.mjs`'s
`collectExports`/`resolveModulePath`/`stripComments` walker (`:59-119`) pointed at a
DIFFERENT question. That walker already does comment-stripped transitive
`import`/`export … from` resolution over the repo's own source (it's how the
root-surface contract at `:121-179` is checked). The new gate:

```
// proof-vueuse-free-root.mjs (tag {local, ci, release})
// Walk the transitive import/export-from graph from src/index.ts (the root barrel).
// For each resolved source file, scan its IMPORT statements (not just exports — a
// re-exported component's *.vue <script> import is the leak vector). Assert NONE
// import "@vueuse/core" (or any "@vueuse/*").
const reached = walkImportGraph("src/index.ts");   // transitive, comment-stripped
const leaks = reached.filter(f => importsSpecifier(f, /^@vueuse\//));
assert(leaks.length === 0, `vueuse reachable from root barrel via: ${leaks}`);
```

Two implementation notes the spec must pin:
- **It must scan `.vue` `<script>` imports, not just `.ts` re-exports.** The
  existing `collectExports` walker follows `export * from` but the leak is in a
  `.vue` component's `<script setup>` `import { useElementSize } from "@vueuse/core"`
  — the walker needs an `import`-statement scan over the resolved component files, not
  only the export graph. This is a small extension of the existing
  `resolveModulePath` + a regex over `import … from "…"` (the same regex family
  already in `proof-consumers-static.mjs`).
- **The two-tier shape A5 recommended applies here too:** a SOURCE-graph gate (early,
  precise blame — "`DataTable.vue:3` imports @vueuse") PLUS a DIST floor
  (`dist/glass-ui.js` contains no `@vueuse/core` literal — runs on the real
  artefact). The source gate is the authoring-time fail-closed; the dist floor is the
  publish-the-truth backstop. Tag the source gate `{local, ci, release}` and the dist
  floor `{ci, release}` (it needs the build).

### 3.3 The fail-closed spec

- **Source gate RED** iff any file in the transitive import graph of `src/index.ts`
  imports `@vueuse/*`. At HEAD: RED (DataTable). After §3.1 fix: GREEN.
- **Dist floor RED** iff `dist/glass-ui.js` contains the literal `@vueuse/core`. At
  HEAD: RED. After fix: GREEN.
- **Regression guard:** the gate is now the inv-θ extension — the next time someone
  re-exports a vueuse-bearing symbol through the root barrel (the exact DataTable
  mistake), it is a RED gate at authoring time, not a silent SCC-trap reopening.

This is strictly the same gate-shape as A5's `proof:blob-value-free` (source) +
`proof:no-value-default` (dist) — C2 confirms the two-tier pattern generalizes:
**every "X-free root/subpath" invariant gets a source-graph gate + a dist-literal
floor, both off the externalized-literal soundness argument.** That generalization is
itself a finding: AT is establishing a reusable gate idiom (source-graph + dist-floor
for externalized-peer reachability) that the constellation can reuse.

---

## 4. The keyframes `[2.2.0, 3.0.0]` CI matrix (R7-a, S2)

### 4.1 The honest minimum is a two-install matrix on the motion specs

The `||` peer claims both majors; no single context exercises both (§0.3). The
question is the CHEAPEST honest gate. Three options, increasing cost:

- **(a) Full `npm test` × {2.2.0, 3.0.0} matrix.** Correct but heavy — it re-runs all
  113 specs against both, most of which never touch keyframes.
- **(b) A motion-only spec subset × {2.2.0, 3.0.0}.** The keyframes reach is
  `src/composables/motion/{useAnimatedNumber,useNumericTransition,…}.ts` (confirmed:
  `import … from "@mkbabb/keyframes.js"`). A `vitest --project motion` run pinned to
  each major covers the actual surface. Cheaper, but needs a motion test project
  split.
- **(c) A `proof:package` axis × {2.2.0, 3.0.0}.** `proof:package` already builds a
  consumer tarball + installs the keyframes peer (`proof-package.mjs:132-138`
  resolves the peer to either the sibling `file:` link or the published range). Run
  it TWICE — once pinning `@mkbabb/keyframes.js@^2.2.0`, once `@^3.0.0` — and the
  consumer typecheck+import probe runs against each. This is the LEANEST honest gate:
  it tests that glass-ui's PUBLISHED surface resolves + typechecks + imports against
  both majors, which is exactly what the `||` peer PROMISES.

**Recommendation: (c) as the floor, (b) as the stretch.** (c) is the honest minimum
— it keeps the promise the `||` makes (the published surface works against both
ends). (b) adds runtime-behaviour coverage if a keyframes major changed a runtime API
the typecheck wouldn't catch; fold it only if the constellation needs it.

### 4.2 The fail-closed spec + gates.mjs parameterization

The matrix lives in `ci.yml` as a job-matrix axis, but the GATE-MANIFEST truth
(`gates.mjs`) must KNOW about it or `gates:verify-ci` (`gates.mjs:77-93`) will flag
the extra ci steps as drift. The clean shape:

```
// gates.mjs — parameterize the keyframes axis
{ id: "proof:package", cmd: "proof:package", tags: ["local","ci","release"],
  sibling: true, matrix: { KEYFRAMES_PEER: ["^2.2.0", "^3.0.0"] },
  note: "runs once per keyframes major in CI; local uses the devDep floor" },
```

- `proof-package.mjs` reads `process.env.KEYFRAMES_PEER` (default = the published
  range) and pins the consumer install to it (`:135-138` already has the pin seam).
- `ci.yml` runs `proof:package` twice with `KEYFRAMES_PEER` set to each major.
- `gates:verify-ci` is extended to accept the matrix expansion (a step appearing N
  times for N matrix values is not drift).

**Fail-closed:** the gate is RED if the consumer tarball fails to install, typecheck,
or import the probed subpaths under EITHER keyframes major. The `||` is now honest at
both ends — a change that compiles under 2.2.0's API but breaks under 3.0.0 (or vice
versa) is a RED CI job, not a green ship.

> **Coupling to R7-b:** once keyframes is marked `optional` (§2), the matrix must
> still install it explicitly for the motion-subpath probe (an optional peer isn't
> auto-installed). The `proof:package` consumer fixture imports a motion subpath, so
> it installs keyframes regardless of the optional flag — the matrix and the
> optionality compose cleanly. Record this so the W6 author doesn't assume `optional`
> removes the matrix obligation.

---

## 5. R4 multiplex + R6 anySignal-leak + `@container` (the quiet-wrong triad)

Three distinct defects, three distinct fail-closed specs. The plan lumps them as
"R4/R6 hardening" (`AT.md:169`); C2 splits them because each has a different gate
SHAPE and two of them gate on a SCOPE DECISION that must precede the gate.

### 5.1 R6-a — anySignal listener leak (S2; clean mechanical spec)

The defect (confirmed `usePrioritizedTask.ts:83`): on the legacy no-`AbortSignal.any`
path, each input signal gets an `addEventListener("abort", …, { once: true })`. The
`{ once: true }` removes the listener WHEN IT FIRES — but when the merged controller
is GC'd without any input ever aborting (the common case: the task completes
normally), the listeners stay attached to the (long-lived) input signals until THOSE
are GC'd. Per `postTask` call, on a long-lived `TaskController` signal, this is
unbounded accumulation.

**The fix (W6):** the manual merge registers a teardown — when the merged signal
settles OR the caller is done, remove the abort listeners from the inputs. Cleanest:
keep an `AbortController` per `usePrioritizedTask` instance (not per `postTask`
call), and on the instance's `onScopeDispose`, abort it (which removes all child
listeners). OR, in `anySignal`, return a `{ signal, dispose }` pair and have
`postTaskSafe`'s `finally` call `dispose` (removing the listeners). The latter is
local to the leak site; the former bounds it structurally.

**Fail-closed spec** (`anySignal-leak.test.ts`, runs in vitest+happy-dom):
1. Stub `AbortSignal.any` to `undefined` (force the legacy manual path).
2. Create a long-lived input signal; call the merge N=1000 times (simulating N
   `postTask` calls over the composable's lifetime), each completing normally.
3. ASSERT the input signal's listener count does NOT grow with N — instrument via a
   spy on `addEventListener`/`removeEventListener` and assert
   `addCount - removeCount` stays bounded (≤ a small constant, not O(N)).
4. **RED** iff the net listener count grows with N. At HEAD: RED (every call adds, none
   removes pre-fire). After fix: GREEN.

This is the cleanest of the triad — it's a pure mechanical assertion, no scope
decision, runnable in CI today. Tag `{local, ci}`.

### 5.2 R4-a — multiplex same-name-different-paint merge (S2; dev-warn + doc contract)

The defect (`useTextHighlight.ts:64` module-global `groups`): two surfaces sharing a
`::highlight(name)` but intending DIFFERENT emphasis silently union under the single
paint rule. The composable cannot detect intent — so the fix is a DEV-WARN +
hardened doc contract (the name IS a global paint channel), not a structural change.

**The fix (W6):** in dev (`import.meta.env.DEV`), when a SECOND contributor registers
under an existing name from a DIFFERENT call-site/owner with no shared provider,
`console.warn` once: `[useTextHighlight] "<name>" is shared across N call sites — a
highlight name is a single global ::highlight() paint rule; reusing it for distinct
emphases paints both identically`. Plus a sharpened doc line on the name-as-paint
contract.

**Fail-closed spec** (`text-highlight-multiplex.test.ts`):
1. Register two contributors under one name from two distinct owners; assert the dev
   warn FIRES once (spy on `console.warn`).
2. Register two under one name from the SAME owner (the legit FuzzySearch-shares-mark
   case); assert the warn does NOT fire.
3. **RED** iff the warn fires on the legit case or not on the collision case.

This gate is a BEHAVIOUR assertion on the dev-warn, not a leak count. The caveat: the
"different owner" heuristic needs a definition (a `WeakSet` of provider keys, or the
call-site captured via `Error().stack` in dev only). Pin the heuristic in the W6
slice; the gate asserts it. Tag `{local, ci}`.

### 5.3 R4-b — SSR singleton bleed (S2; SCOPE DECISION precedes the gate)

The defect: `groups` is a module singleton; on a DOM-shimmed SSR runtime
(happy-dom/jsdom where `detectSupport()` returns true), it accumulates across
requests. **This gate cannot be specified until the SCOPE QUESTION is answered:
does glass-ui claim SSR support?** CLAUDE.md does NOT list SSR as a target. Two
fail-closed paths:

- **If SSR is OUT of scope (the likely answer):** the fix is DOCUMENTARY — the Custom
  Highlight composables are client-only; REMOVE the half-claim "SSR no-op" language
  that implies safety it doesn't fully provide. The gate is a precept LINE +
  a `proof:*` assertion that the composable's module-eval has a client-only guard
  documented (no structural change). **RED** iff the misleading "SSR-safe" claim
  reappears.
- **If SSR is IN scope:** the registry must be request-scoped (injected app context,
  not a module singleton) — a structural change. The gate is a happy-dom multi-render
  spec asserting two "requests" do not cross-contaminate.

**C2 recommendation: record SSR as OUT of scope** (consistent with CLAUDE.md's
silence and the client-only nature of `CSS.highlights`). The fix is then the doc
correction + the client-only guard, and the gate is the precept-line assertion. This
is a W6 DECISION the plan must make explicitly before the gate can be written — flag
it as a W6 sub-decision, not a code task.

### 5.4 R6-b — `@container style()` drop on intermediate engines (S2; verify-or-restore)

The defect (`ConfiguratorRow.vue:155-185`, confirmed): the no-`@supports`-wrapper
density block relies on engines without style-query support DROPPING `@container
style(--density: …)` as an invalid at-rule. But `@container` is a KNOWN at-rule on
the size-query-yes/style-query-no engine class (Chrome 111–before-style-query) — the
worry is an engine parsing `@container` but mis-handling the unknown `style()`
function as "always-true," applying ALL density blocks at once (last wins →
comfortable/spacious), silently widening the paint.

**This gate is a VERIFICATION, not a code change** — unless the verification fails.
The CSS spec (knowledge, corroborated by the A5/SOTA pass on container queries): an
unknown `<style-feature>` in a `@container` style query evaluates the condition as
**false** (unknown features are false, not true — the `@supports`-family
"unknown → false" rule), so the block is correctly dropped. The C2 read: **the drop
is spec-correct; the risk is an engine BUG, not a spec ambiguity.** The honest gate is
a CITED-SPEC line (CSS Conditional Rules 5: unknown style features are false) in the
ConfiguratorRow comment, ELEVATED from the current prose to a spec citation, PLUS — if
glass-ui gains a Playwright/browser matrix (it does not today, DEC-AT-4 confirms
vitest+happy-dom only) — a matrix assertion on the intermediate engine.

**Fail-closed spec:**
- **Minimum (no browser matrix):** the gate is a precept/comment line citing the CSS
  Conditional Rules 5 "unknown style feature → false" clause; RED iff the citation is
  removed or the `@supports`-less reliance is reintroduced without it. This is a
  DOC-correctness gate (the same shape as the doc-consistency gate B6 proposes).
- **Stretch (if a browser matrix lands):** a Playwright assertion that a
  size-query-only engine renders the DEFAULT density (not comfortable/spacious) for a
  `--density: mobile` container.

C2 recommendation: ship the cited-spec line (the minimum) at W6; the browser-matrix
stretch is a NAMED-FORWARD to whenever glass-ui admits a Playwright harness (the same
gating DEC-AT-4 applies to the blob visual waves). The risk is real but the spec is on
glass-ui's side; the cite makes the reliance auditable rather than asserted.

### 5.5 supportsPostTask (R7-b sibling / W7-b, S3; wire-or-drop)

Confirmed: `supportsPostTask` (`platformSupport.ts:23`) is publicly exported but has 0
internal call sites and DUPLICATES the `typeof scheduler?.postTask` detect inside
`getSchedulerPostTask` (`usePrioritizedTask.ts:38-44`). **C2 recommendation: WIRE,
don't drop.** `getSchedulerPostTask` should call `supportsPostTask()` as its guard
(DRY the detect), making the public predicate the single source of truth for "is
postTask available." This is strictly better than dropping (the predicate is a
legit public platform-support primitive, sibling to `supportsMoveBefore` /
`supportsScrollTimeline` which DO have consumers) and it removes the duplication.

**Fail-closed spec:** a unit asserting `getSchedulerPostTask() !== null` ⟺
`supportsPostTask() === true` (they agree by construction once wired). The overfitting
audit at W8 confirms `supportsPostTask` now has an internal consumer (the wrapper) +
its public export — clearing the bar on the merits, not just the export-OR escape.

---

## 6. The dock binding-guard — C2 concurs with B6-1 (the altitude correction)

The plan books "the dock binding-verification guard" in W6 (`AT.md:168`,
`AT.W1`-silent — it's a W6 fold). L1 §W7-a proposed a demo-mount/e2e spec asserting
every chrome dock that intends overflow carries `.dock-scroll-{x,y}` at runtime.

**B6-1 already refuted the altitude and C2 CONCURS:** that guard is a POINT gate (it
covers the two known sites by enumeration). The categorical fix is
`vueCompilerOptions.checkUnknownProps` → `strictTemplates` (verified absent in
`tsconfig*.json`), which makes the next `scroll-on-overflow`-class typo a RED
typecheck on ANY component, library- AND consumer-side. C2 adds two engineering
notes B6 left implicit:

1. **The incremental enablement order matters for fail-closed-ness.** Flipping full
   `strictTemplates` on a 2415-module repo surfaces a backlog (intentional
   `$attrs` fall-through, third-party loose props). The fail-closed gate
   (`proof:strict-templates`) must gate on the NARROWEST knob first
   (`checkUnknownProps: true`), with a fixture `<GlassDock bogus-prop>` asserted RED
   — graduating to full `strictTemplates` only after the backlog is cleared. A gate
   that requires a green typecheck under `checkUnknownProps` is honest the moment the
   knob flips; a gate that waits for full `strictTemplates` may never land. **Ship the
   narrow knob's gate at W6; the full graduation is a follow.**

2. **`data-*` props are NOT caught by `strictTemplates`** (B6-9: `DockTabButton`'s
   `data-tier` read via `useAttrs()`). `data-tier` typos are valid HTML attrs, so the
   categorical typecheck gate has a known blind spot. C2's recommendation matches B6:
   a typed `tier?: "primary" | "secondary"` prop closes it — but it's a 1-context API
   change → BOOK unless W7's control-vocab wave wants it. The gate does NOT need to
   cover `data-*`; record the blind spot.

**The dock-guard slice in W6 = B6's `W6-dock-a` (`checkUnknownProps`/`strictTemplates`
+ `proof:strict-templates`), NOT the booked point spec.** C2's only addition is the
incremental-knob fail-closed ordering above. The point demo-mount spec is SUPERSEDED
(it catches a subset of what the typecheck gate catches categorically).

> **Disjointness note:** the dock state-machine spec (B6-10, `W6-dock-b`) and the
> VT-fork reconcile (B6-2/B6-3, `W6-dock-c`) are SEPARATE dock correctness slices —
> C2 does not re-derive them (B6 owns the dock lens) but flags that they share W6 with
> the C2 gates and are file-disjoint from them (dock files vs `package.json` /
> `scripts/` / `src/composables/`), so they parallelize.

---

## 7. The W6/W7 wave order (the precise DAG)

The plan says "W6 ∥ the blob waves (file-disjoint); W7 after W6" (`AT.md:139`). C2
pins the INTRA-W6 order, which has exactly two real dependencies; everything else
parallelizes.

**W6 intra-wave DAG:**

```
build (gates.mjs prerequisite, already green)
  │
  ├─ [A] DataTable fix (useElementSize → useResizeObserver)  ──┐
  │         │                                                   │
  │         └─→ proof:vueuse-free-root (source + dist)  ────────┤ (gate RED until A lands)
  │                                                             │
  ├─ [B] peerDependenciesMeta conversion (drop optionalPeerDependencies) ─┐
  │         │                                                              │
  │         └─→ proof:peer-optional  ──────────────────────────────────────┤ (gate needs B + build)
  │             └─ NB: @vueuse flips to optional ONLY after [A] (else RED)  │
  │                                                                         │
  ├─ [C] keyframes [2.2.0,3.0.0] CI matrix (proof:package axis + gates.mjs param) ── indep
  ├─ [D] anySignal leak fix + spec (R6-a)                              ── indep
  ├─ [E] useTextHighlight dev-warn + doc (R4-a) + SSR-scope decision (R4-b) ── indep
  ├─ [F] @container cited-spec line (R6-b)                             ── indep
  ├─ [G] supportsPostTask wire into getSchedulerPostTask (W7-b)        ── indep
  ├─ [H] components.css Tailwind-version stamp (R3-a)                  ── indep
  └─ [dock] B6 W6-dock-a/b/c (strictTemplates, state-machine spec, VT reconcile) ── indep, file-disjoint
```

The two ordering edges:
- **[A] before `proof:vueuse-free-root` green** — the gate is RED until the DataTable
  swap lands. Land the fix and the gate in the same commit (gate + the thing it
  guards), so the gate is born green.
- **[A] before [B]'s `@vueuse` optionality** — `proof:peer-optional` marks `@vueuse`
  optional ONLY because it's no-longer-root-reachable, which is true ONLY after [A].
  So the `peerDependenciesMeta` edit for `@vueuse` is downstream of the DataTable fix.
  keyframes/value/embla optionality has no such dependency (they're already
  subpath-only) — [B] can mark THOSE immediately.

Everything else (C, D, E, F, G, H, dock) is file-disjoint and order-free. The W6
critical path is **A → (vueuse gate + @vueuse meta)**; B/C/D/E/F/G/H/dock fan out.

**W7 is downstream of W6** for one reason only: the GlassDock overflow-collapse
(W7-dock-a, B6-4) relies on the `strictTemplates` gate (W6-dock-a) to enforce "no
silent kebab regression" after `wrap` is deleted (`B6 §2`). The Fraunces/π/ι slips
are W6-independent. So W7 order: dock-collapse AFTER W6-dock-a; the rest of W7 is
free.

---

## 8. L1 defects NOT yet folded into any AT wave (the gap-flag)

Cross-checking the L1 summary table (`W0-L1:524-547`) against the AT.md folded
ledger (`AT.md:161-173`) + the L4 disposition (`W0-L4 §4`), every R-defect is folded
EXCEPT:

### 8.1 R3-c — static class-scan misses dynamically-composed Tailwind classes (S3, NOT folded)

The plan folds the `components.css` Tailwind-VERSION stamp (R3-a, `AT.md:169`
"`components.css` Tailwind-version stamp") but NOT R3-c — the finding that the
`classish` scan over `dist/*.js` (`vite.style-assets.ts`) cannot see a
template-literal-composed class (e.g. `` `rounded-${tier}` ``), so a
dynamically-composed utility is MISSED by the safelist and silently no-ops for a bare
consumer. **This is the SAME silent-no-op CLASS as the dock binding bug (B6-1) and the
`scroll-on-overflow` ship — but for CSS utilities instead of props.** It is more
material than the version stamp: the version stamp catches DRIFT; R3-c catches a
COVERAGE HOLE that ships wrong today if any component composes a class dynamically.

→ **C2 recommendation: fold R3-c into W6 as a coverage audit + gate.** Audit
glass-ui's component templates for dynamically-composed Tailwind class fragments (a
grep for `` `…${…}…` `` patterns in class positions across `src/**/*.vue`); for each,
either forbid by convention (compose via `cn()` with full static class strings, the
house pattern) or add to an explicit safelist seed. **Fail-closed spec:** a
bare-stylesheet coverage spec (mount each exported component under a `@source`-less
stylesheet, assert its computed `border-radius`/spacing is non-zero) — the true
end-to-end check R3's witness rule only gestures at. This catches the class
categorically the way `strictTemplates` catches the prop class. Tag `{local, ci}`.

### 8.2 R1-a — the dead `ValueJs` UMD global (S3, NOT explicitly folded)

`libraryGlobals` (`vite.library.ts:136-137`) carries `"@mkbabb/value.js": "ValueJs"`
+ `"@mkbabb/keyframes.js": "Keyframes"` + `vue: "Vue"` — all INERT in an ES-only
build (no UMD/IIFE format is emitted). Not wrong (can't misfire), but a misleading
"this is what makes externalization work" signal. The AT.md ledger does not name it.

→ **C2 recommendation: fold into the W7 ι hygiene sweep** (the same sweep that fixes
the B6-6/B6-7 doc-rot). Either DROP `libraryGlobals` with a one-line comment (ES-only
never reads it) or add a build-config assertion that no UMD format is configured (so
the map's deadness is documented). **Fail-closed:** trivial — a comment or an
`assert(!hasUMDFormat)` in the config. Lowest priority of the unfolded set; bundle it
with the ι sweep, don't give it its own slice.

### 8.3 The S3/S4 hygiene tail — confirm folded

The remaining L1 S3/S4 (R3-b RUNTIME_PROPS rubber-stamp, R4-c Range-slice, proof-a/-b
`--ignore-scripts`/slice band-aids, W7-c deriveAurora thin-graduation, R1-b value.js
0.x pin) are all either folded (R1-b → the value.js peer-optionality in §2; W7-c →
the W8 overfitting audit) or are comment-only hygiene that rides the W7 ι sweep
(R3-b, R4-c, proof-a/-b). C2 confirms none is a missed S2 — the only unfolded items
of MATERIAL weight are R3-c (S3 but silent-no-op-class) and R1-a (S3 trivial).

---

## 9. AUGMENTED-AT proposals — wave/slice + hard gate

Build ON the AT.md W6/W7 commitments; these PIN the fail-closed spec and surface the
two unfolded defects. Deltas, not a re-plan.

| # | Proposal | Wave | Hard gate (fail-closed spec) |
|---|---|---|---|
| **C2-1** | **`proof:peer-optional` with the mechanical contract.** Peer P optional IFF its literal does NOT appear in `dist/glass-ui.js`. Drop `optionalPeerDependencies`; mark `@vueuse`(post-§3)/embla/keyframes/value/tw-animate optional. Correct CLAUDE.md:362. | W6 (after C2-2 for @vueuse) | gate RED iff (a) `optionalPeerDependencies` field present, OR (b) a root-reachable peer is marked optional / a subpath-only peer is marked required, OR (c) tw-animate-css not in BOTH peerDeps + meta-optional. Tag `{local,ci,release}`. |
| **C2-2** | **`proof:vueuse-free-root` (source + dist) + DataTable fix.** Swap `useElementSize`→`useResizeObserver` (keeps DataTable root, no break). Gate reuses `proof-consumers-static.mjs`'s walker, extended to scan `.vue <script>` imports. | W6 (the @vueuse precondition) | source gate RED iff any file in `src/index.ts`'s transitive import graph imports `@vueuse/*`; dist floor RED iff `dist/glass-ui.js` contains `@vueuse/core`. Both born GREEN with the fix. |
| **C2-3** | **keyframes `[2.2.0,3.0.0]` matrix as a `proof:package` axis.** Run the consumer-probe twice (`KEYFRAMES_PEER=^2.2.0`, `^3.0.0`); parameterize in `gates.mjs`; extend `gates:verify-ci` to accept the matrix. | W6 | RED iff the consumer tarball fails install/typecheck/import under EITHER major. The `||` is honest at both ends. |
| **C2-4** | **The quiet-wrong triad, split.** (a) R6-a anySignal teardown + listener-count spec; (b) R4-a multiplex dev-warn + spec + doc contract; (c) R4-b SSR-scope DECISION (recommend OUT-of-scope → doc correction + client-only guard); (d) R6-b `@container` cited-spec line (CSS Cond. Rules 5: unknown style-feature → false). | W6 | (a) RED iff net listener count grows O(N) under a no-`AbortSignal.any` shim; (b) RED iff dev-warn mis-fires on legit/collision; (c) RED iff "SSR-safe" claim reappears w/o request-scoping; (d) RED iff the spec citation is removed. |
| **C2-5** | **supportsPostTask WIRE (not drop).** `getSchedulerPostTask` calls `supportsPostTask()` (DRY the detect). | W6 | unit: `getSchedulerPostTask() !== null` ⟺ `supportsPostTask() === true`; W8 overfitting audit confirms an internal consumer now exists. |
| **C2-6** | **Concur with B6-1: the dock-guard is `checkUnknownProps`→`strictTemplates`, NOT the booked point spec.** Add the incremental-knob fail-closed ordering (narrow knob's gate ships at W6; full graduation follows). Record the `data-*` blind spot. | W6 (= B6 W6-dock-a) | `proof:strict-templates`: `typecheck` runs with `checkUnknownProps:true`; a fixture `<GlassDock bogus-prop>` is RED. (Supersedes the demo-mount point gate.) |
| **C2-7 [GAP]** | **Fold R3-c — the dynamic-class coverage hole.** Audit `src/**/*.vue` for template-literal-composed Tailwind classes; forbid (compose via `cn()` static strings) or safelist-seed. The SAME silent-no-op class as the dock prop bug, for CSS utilities. NOT in the AT.md ledger. | W6 | bare-stylesheet coverage spec: mount each exported component under a `@source`-less stylesheet; RED iff computed `border-radius`/spacing is zero (a missed dynamic class). |
| **C2-8 [GAP]** | **Fold R1-a — the dead `ValueJs` UMD global.** Drop `libraryGlobals` (ES-only never reads it) or assert no UMD format configured. NOT named in the ledger. | W7 (ι hygiene sweep, with B6-6/B6-7 doc-rot) | a build-config comment OR `assert(!hasUMDFormat)`; trivial. |
| **C2-9** | **The two-tier gate idiom is reusable — record it.** Source-graph + dist-literal-floor (off the externalized-peer soundness argument) is the canonical shape for every "X-free root/subpath" invariant (vueuse-free-root, blob-value-free, peer-optional). State it once in AT.FINAL so the constellation reuses it. | W8 (close) | AT.FINAL §gates documents the idiom; the three gates (C2-1/C2-2 + A5's inv-K-3) cite it as the shared pattern. |

---

## 10. The one-line headline

The W6 correctness fold is SOUND in intent but UNDER-SPECIFIED in three places C2
pins: `proof:peer-optional` is a MECHANICAL derivation (optional IFF the peer's
literal is absent from `dist/glass-ui.js`, sound because every heavy peer is a Rollup
external), `proof:vueuse-free-root` is the EXISTING `proof-consumers-static.mjs`
walker retargeted (source-graph + dist-floor, RED at HEAD via the DataTable leak),
and the keyframes matrix is cheapest as a two-install `proof:package` axis — while
the dock binding-guard is the WRONG altitude (B6-1's `strictTemplates` is the
categorical fix C2 concurs with). The intra-W6 DAG has exactly TWO ordering edges
(DataTable-fix → vueuse-gate + @vueuse-optionality); everything else parallelizes.
**Two L1 defects are unfolded: R3-c (the dynamic-class coverage hole — the same
silent-no-op class as the dock bug, for CSS) and R1-a (the dead UMD global)** — both
flagged here for W6/W7 fold.

---

### Appendix — primary citations (file:line, this repo unless noted)

- `package.json` — `peerDependenciesMeta: undefined`, `optionalPeerDependencies:
  {tw-animate-css}`, `peerDependencies` (12 peers), devDep `@mkbabb/keyframes.js
  ^2.2.0` (all read this session).
- `src/index.ts:27,104,170` (the vueuse-FREE root-barrel contract + the DataTable
  re-export leak + the keyframes-free assertion); `src/components/ui/data-table/
  DataTable.vue:3` (`useElementSize` from `@vueuse/core`).
- `vite.library.ts:121-126,136-137` (`libraryExternal` + the dead `libraryGlobals`).
- `scripts/gates.mjs:28-45,77-93` (the GATES manifest + `verifyCi`);
  `scripts/proof-consumers-static.mjs:59-119,121-179` (the comment-stripped transitive
  walker the new gates reuse); `scripts/proof-package.mjs:132-138` (the keyframes peer
  pin seam the matrix parameterizes).
- `src/composables/motion/usePrioritizedTask.ts:38-44,65-86,83` (the duplicated
  postTask detect + the anySignal `{once:true}` leak); `src/utils/platformSupport.ts:23`
  + `src/utils/index.ts:9` (`supportsPostTask` export, 0 internal callers).
- `src/composables/dom/useTextHighlight.ts:64,67,130,201` (the module-global `groups`
  multiplex + `detectSupport` + `onScopeDispose`).
- `src/components/custom/configurator/ConfiguratorRow.vue:155-185` (the `@container
  style()` no-`@supports`-wrapper drop reliance).
- `.github/workflows/ci.yml:24-91` (node 24, single-job gate list — the keyframes
  matrix axis target).
- Prior AT art: `AT.md §W6/W7 (95-106, 150-151, 161-173)`;
  `audit/W0-L1-changes-adversarial.md` (R1/R3/R4/R6/R7/W7 defects + the §524 table);
  `audit/W0-L4-deferred-chronic-ledger.md §1,§3 (#3,#4)`;
  `audit/W0b-A5-color-seam-sota.md §4 (the two-tier gate idiom)`;
  `audit/W0b-B6-dock-state-audit-adversarial.md §1,§7 (the strictTemplates altitude)`.
- SOTA (knowledge + web, corroborated this lens): the CSS Conditional Rules 5
  "unknown style feature evaluates false" clause (R6-b — knowledge, the spec is on
  glass-ui's side); NPM `peerDependenciesMeta[x].optional` is the ONLY recognized
  optional-peer field (`optionalPeerDependencies` is non-standard — knowledge,
  corroborated by the R7-b finding); Rollup `external` emits a bare import literal in
  exactly the reaching chunks (the mechanical soundness of the dist-grep — verified
  empirically by A5 §4.1 for value.js, generalized here to every external peer).
