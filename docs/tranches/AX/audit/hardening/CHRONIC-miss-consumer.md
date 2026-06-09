# CHRONIC-miss-consumer — clean-break renames/prunes that MISS consumers

**Lane** ADVERSARIAL RED-TEAM (hand-challenge). **Target** CHRONIC MISS #2 — the
clean-break rename/prune that lands GREEN in glass-ui while leaving a consumer
(test-mirror, barrel, `api/index.ts`, `src/subpaths`, or a SIBLING repo) importing the
deleted symbol. **Verdict** **BROKEN** — a live, reproducible miss exists at HEAD AND the
systemic guard is structurally pointed away from the two trees where the class always
lands. **Severity** blocker (a published cut breaks the speedtest consumer's build).

The governing question the lane was handed: *"Is there a gate that catches an incomplete
sweep? What's the systemic guard?"* Answer: **the guard exists three times over (TS
typecheck, `proof:strict-templates`, the wave's own `proof:tabs-unified` deletion-proof)
and ALL THREE are scoped to `src/` + `demo/` — none reaches `tests/` or the siblings.**
The class is not under-tooled; it is under-SCOPED. Every gate built to catch it walks the
two trees the miss never lands in.

---

## 1. The live miss at HEAD (falsifiable, reproduced)

### 1a. The test-mirror miss — `BouncyToggle` (W53 deleted it; the test still imports it)

`tests/configurator-recursion.spec.ts`:
- **line 49**: `import { BouncyToggle } from "../src/components/custom/tabs";`
- **line 268**: `h(BouncyToggle, { options: derivedOptions, modelValue: derivedMode.value, ... })`

W53 (tabs-unify) DELETED `BouncyToggle` — the barrel
(`src/components/custom/tabs/index.ts`) now exports ONLY `SegmentedTabs`. Proven at
runtime in the vitest environment:

```
// probe (tests/zz-probe-bouncy.test.ts, transient):
import * as TabsBarrel from "../src/components/custom/tabs";
expect(TabsBarrel.BouncyToggle).toBeUndefined();   // PASSES — it is undefined
expect(TabsBarrel.SegmentedTabs).toBeDefined();     // PASSES
```

So `configurator-recursion.spec.ts` renders `h(undefined, {...})` for its "Mode" row.
**The test still passes 6/6** (`npx vitest run tests/configurator-recursion.spec.ts` →
`Test Files 1 passed (1), Tests 6 passed (6)`) because its assertion is a *recursion
counter* — it never asserts that the configurator row mounted a real component. This is
the canonical `feedback_glass_ui_binding_verification.md` silent-no-op class, now resident
in a TEST MIRROR: vue-tsc passes (tests/ is out of scope, §2a), vitest passes (the
binding is never exercised), and the wave's deletion gate passes (tests/ is out of its
sweep, §2c). Three gates, three misses, on ONE dead import.

### 1b. The SIBLING-consumer miss — speedtest imports 4 deleted symbols across 8 files

W53 deleted `BouncyTabs`, `BouncyToggle`, `UnderlineTabs`, `ResponsiveTabs` AND the entire
`@mkbabb/glass-ui/responsive-tabs` subpath (removed from `package.json` exports — grep
confirms `responsive-tabs` no longer appears). The speedtest sibling
(`../speedtest`, pinned `@mkbabb/glass-ui: ^3.7.0`) imports the deleted surface in **8
files**:

| File | Stale import |
|---|---|
| `src/components/dashboard/MetricSelector.vue:7` | `import { BouncyTabs } from "@mkbabb/glass-ui/tabs"` |
| `src/components/dashboard/ResultsFilters.vue:159` | `import { BouncyTabs } from "@mkbabb/glass-ui/tabs"` |
| `src/views/ChartsView.vue:132` | `import { UnderlineTabs } from "@mkbabb/glass-ui/tabs"` |
| `src/layouts/PublicDashboardLayout.vue:127` | `import { ResponsiveTabs } from "@mkbabb/glass-ui/responsive-tabs"` |
| `src/layouts/AdminDashboardLayout.vue:119` | `import { ResponsiveTabs } from "@mkbabb/glass-ui/responsive-tabs"` |
| `src/views/AdminDataView.vue:93` | `import { ResponsiveTabs } from "@mkbabb/glass-ui/responsive-tabs"` |
| `src/views/AdminSettingsView.vue` | (deleted-symbol ref) |
| `src/views/__tests__/AdminDataView.append.test.ts:125` | `UnderlineTabs:` test stub |

Two distinct failure modes once speedtest bumps past the W53 cut:
- `/responsive-tabs` import → **hard module-resolution failure** (the subpath is gone from
  `package.json` exports — the build throws, not no-ops). 3 layout/view files.
- `BouncyTabs`/`UnderlineTabs` from `/tabs` → **silent `undefined` → silent no-op render**
  (the subpath still resolves, but the named export is gone). The exact memory class.

**The W53 audit (`A-tabs-unify.md` §3) said "update ALL consumers" and tabulated a
consumer sweep — but that table was DEMO-ONLY.** It enumerated `demo/stories/navigation/
tabs.vue`, the aurora config layers, the barrel, and `api/index.ts`; it NEVER listed a
single speedtest file. The W53 audit JSON `filesChanged` (28 entries) touches ZERO
`tests/` files (only `scripts/__tests__/proof-vt-names.test.ts` for a comment) and ZERO
sibling files. The wave shipped marked `live-verified (DEVELOPED)` (PROGRESS.md:71) with
no born-RED cross-repo gate tracking the speedtest debt.

The MASTER-PLAN routes "consumer bumps (speedtest/slides/words/fourier)" to Batch 9 / W33
close — so the *intent* to fix exists — but there is no GATE holding the door: nothing
reddens to remind the close that 8 speedtest files are armed to break, and W34 (the
cross-repo consumer-adoption ledger) does NOT mention tabs/Bouncy/responsive-tabs at all
(grep over `AX.W34-*.md` returns empty). The debt is invisible to the gate fleet.

---

## 2. The systemic guard is real — and pointed at the wrong trees

### 2a. TypeScript would catch the dead import — but `tests/` is out of every tsconfig

The dead `BouncyToggle` import is a textbook `TS2305`. Proven by running vue-tsc with the
spec forced into scope (an `extends: ./tsconfig.json` + `include: [the spec]` probe):

```
tests/configurator-recursion.spec.ts(49,10): error TS2305:
  Module '"../src/components/custom/tabs"' has no exported member 'BouncyToggle'.
```

TypeScript catches it PERFECTLY. The reason `npm run typecheck` is green is purely scope:
- `tsconfig.json`     → `include: ["src/", "demo/"]`
- `tsconfig.src.json` → `include: ["src/"]`
- `tsconfig.build.json` → `include: ["src/"]`

**The `tests/` tree — which by the AV.W14 mandate MIRRORS `src/` and is wall-to-wall
imports against `src/` — is in NONE of the three typecheck scopes.** A test mirror can
import any deleted/renamed src symbol and `npm run typecheck` will never see it. This is
the single highest-leverage hole: the strongest dead-reference detector in the repo (the
type system) is structurally blind to the tree most likely to carry a stale reference
after a clean break, because the tree was carved out of `src/` (AV.W14) without being
folded into a typecheck scope.

### 2b. `proof:strict-templates` — the "silent-no-op keystone" — also only reaches src/demo

`scripts/proof-strict-templates.mjs` is explicitly THE silent-no-op closer (header: *"The
silent-no-op CLOSER… closing, library-wide, the class that seeded the AS.W7 dock bug"*).
But its three clauses are all `src`/`demo`-scoped:
- clause (a) checks `checkUnknownProps:true` in the SAME 3 tsconfigs (all src/demo-only);
- clause (b) runs a bogus-prop fixture under `scripts/fixtures/`;
- clause (c) walks `SRC` only for `@ts-expect-error` suppressions (`walk(SRC)`,
  line 104).

And note its CLASS gap: `checkUnknownProps` catches a bogus *prop on a component*; it does
NOT catch a dead *named import* (TS2305). Even if `tests/` were added to its fixture
config, the keystone gate targets a different silent-no-op species than 1a. The keystone
was built for AS.W7 (`scroll-on-overflow` dead-attr) and is precisely tuned to that
species — it does not cover the dead-named-import species at all.

### 2c. The wave's OWN deletion gate (`proof:tabs-unified` clause 10) — scoped to src+demo

This is the sharpest finding. W53 did the right thing in spirit: it AUTHORED a bespoke
deletion-proof gate. `scripts/proof-tabs-unified.mjs` clause 10 greps for
`BouncyTabs|BouncyToggle|UnderlineTabs|ResponsiveTabs` as live code references (import /
export / `<Tag>`). But line 52:

```js
const SWEEP_ROOTS = ["src", "demo"];
```

It walks the SAME two dirs the typecheck and the keystone already cover — and skips
`tests/` and the siblings. Running it at HEAD:

```
proof:tabs-unified …
  Bouncy* deleted   : true
  code survivors    : 0
  status: PASS
```

GREEN — while `tests/configurator-recursion.spec.ts:49` imports `BouncyToggle` and 8
speedtest files import the deleted family. **The gate built specifically to prove the W53
deletion is complete reports 0 survivors because it does not look in the two trees where
the survivors live.** This is the chronic in microcosm: the wave builds a deletion gate,
scopes it to the convenient dirs, and the gate's green is a false assurance.

---

## 3. The slip-history — how many times this class has recurred

The "clean break misses a consumer" class is the single most-recurrent chronic in the
project memory and the AX corpora. Documented instances, oldest→newest:

1. **AP+I post-verify** (`feedback_glass_ui_binding_verification.md`) — THREE stale
   reka bindings shipped in muster: `:pressed`/`@update:pressed` on ToggleChip,
   `v-model:search-term` on Command, `tag=` on MetricStack. Caught only at e2e; vue-tsc +
   units passed. The memory's founding instance.
2. **AS.W7** (same memory, 2026-06-04) — `scroll-on-overflow` invented kebab prop on
   GlassDock fell through to `$attrs`; dock-overflow fix was vue-tsc-clean + unit-green +
   INERT. Caught only by the Wave-3 live check.
3. **AW.W3 keepDockOpen** (`research/dock-facilities-corpus.json:335`) — the slider hold
   shipped BROKEN 3.4.0→3.6.0 because it "closed" on a fail-OPEN `proof:dock-layering-
   polish` SKIP (no Playwright harness). Stale reka `onPointerdown` shadow; vue-tsc+units
   miss it.
4. **AX.W04 `:wrap`/`:fit-content`** (`audit/converge-digest.md:113`) — the wave scope
   note claimed "ZERO consumer at HEAD" for the wrap surface; bbnf-playground/
   ControlsBar.vue:33 was a LIVE consumer. False zero-consumer claim → clean-break rename
   armed to break a consumer.
5. **W13 `strokeMode:"crayon"` removal** (`research/final-hardening-corpus.json:352,355` +
   3 more corpora) — the clean-break union-member removal silently no-ops any demo/
   consumer preset still on `strokeMode:"crayon"`; the spec ASSERTED the risk but routed
   no concrete grep/probe into the cadence. Flagged FOUR times across corpora and STILL
   has no consumer-sweep clause in the gate.
6. **W53 (this finding)** — the test-mirror `BouncyToggle` (§1a) + the 8 speedtest files
   (§1b). The wave built a deletion gate and scoped it to `src+demo`.

The CH-aurora hardening doc (`audit/hardening/CH-aurora.md:181-182`) names this exact pair
of chronics ("binding-verification" + "clean-break renames that miss test-mirrors/barrels/
sibling-consumers") as a recognized recurrent class — confirming the project already KNOWS
this is chronic and has not yet shipped the systemic guard. **Six documented recurrences,
one named-but-unbuilt systemic fix.** Each was caught reactively (e2e, a later live pass,
a harden lane) rather than by a gate at the wave that caused it.

---

## 4. The chronic deferrals (what keeps getting missed, with slip-history)

- **`tests/` out of every typecheck scope** — DEFERRED since AV.W14 carved `tests/` out of
  `src/`. The carve added `proof:no-test-in-src` (enforcing tests are NOT under src/) but
  did NOT add a `tsconfig.test.json` / `tests/` include — so the mirror tree became a
  type-unchecked island. Every clean break since AV.W14 has been able to orphan a test
  import invisibly. ~slipped across AV→AW→AX (3 tranches).
- **No cross-repo "stale-consumer-import" gate** — `proof:consumers-static` WALKS the
  siblings, but its contract is glass-ui ROOT-SURFACE drift (surface-creep: what the barrel
  exports + namespace-import drift), NOT "does a consumer import a symbol glass-ui has
  DELETED." There is no reverse clause. So a sibling can be armed to break and the fleet
  is green. The intent to bump consumers lives in MASTER-PLAN Batch 9 but is GATE-LESS.
- **Wave-local deletion gates re-scope to `src+demo` by default** — `proof:tabs-unified`
  (W53) is the third gate in a row (after typecheck + strict-templates) to inherit the
  `["src","demo"]` sweep. The pattern is copy-forward: each new gate copies the prior
  walk-root and the hole propagates. No SHARED constant pins the canonical "deletion-sweep
  must include tests/ + the sibling consumer set."
- **The "ZERO consumers at HEAD" claim is unverified** — W04's false zero (§3.4) and W53's
  demo-only consumer table (§1b) are the same defect: a wave ASSERTS a consumer set
  without a machine-checked grep, and the assertion is wrong. No gate forces the
  consumer-grep that would falsify the claim.

---

## 5. The gestalt HARDENING ACTIONS (to PERFECT this — planning only)

The fix is NOT more gates; it is RE-SCOPING the three guards that already exist onto the
two trees the class lands in, plus one reverse cross-repo clause. Four actions, ordered by
leverage:

1. **Fold `tests/` into typecheck (highest leverage, smallest change).** Add a
   `tsconfig.test.json` (`extends: ./tsconfig.json`, `include: ["tests/", "src/"]`,
   `types: ["vitest/globals"]`) and run it in the `typecheck` npm script (and CI). This
   single change makes EVERY future clean-break orphaned test import a RED `TS2305` at the
   wave that caused it — it would have caught §1a `BouncyToggle` at W53. Born-RED witness:
   it reds NOW on `tests/configurator-recursion.spec.ts:49` until that import is fixed to
   `SegmentedTabs` (and the `h(BouncyToggle,…)` row re-pointed). This is the systemic guard
   the project has named-but-not-built.

2. **Mint `proof:consumer-staleness` (the reverse cross-repo clause).** A gate that, for
   each present sibling in the constellation set (`speedtest`/`slides`/`words`/`fourier`),
   greps every `import … from "@mkbabb/glass-ui[/<subpath>]"` and asserts each NAMED import
   resolves against glass-ui's CURRENT public surface (the `package.json` exports keys +
   each subpath's actual export set). A consumer importing a deleted symbol OR a retired
   subpath (`/responsive-tabs`) reds. Born-RED NOW on the 8 speedtest files. Absent
   siblings → graceful `skipSibling` (reuse the `proof:consumers-static` policy). This
   converts the MASTER-PLAN-Batch-9 INTENT into a fail-closed forcing function: the
   consumer bump cannot be "forgotten" because the gate is red until it lands.

3. **Re-scope every deletion-proof gate onto a SHARED sweep-root constant that includes
   `tests/`.** Pull `SWEEP_ROOTS` out of `proof-tabs-unified.mjs` into a shared
   `constellation.mjs`/`gates` constant `DELETION_SWEEP_ROOTS = ["src", "demo", "tests"]`,
   and have every future "no-Identifier-survives" gate import it. This stops the
   copy-forward `["src","demo"]` hole from propagating into the next clean-break wave's
   gate. Amend `proof:tabs-unified` to consume it (it then reds on §1a immediately).

4. **A `consumer-set-is-grepped` clause for any wave with a prune/rename.** Add to the
   wave cadence template (the AGENT_DISPATCH_TEMPLATE) a mandatory pre-close sub-step: for
   any deleted/renamed exported symbol, grep `src + demo + tests + the present siblings`
   and EITHER re-point in-wave OR route the consumer-edit to a named wave WITH a born-RED
   cross-repo gate (action 2). This is the cadence-level codification of the W13-crayon
   lesson (which was flagged 4× as "the spec asserts the risk but routes no probe"). It
   makes the "ZERO consumers at HEAD" claim un-assertable without a machine grep — killing
   the W04/W53 false-consumer-set defect at the source.

**Prototype to run (verify action 1 + 2 land the catch):** add the `tsconfig.test.json`,
run `vue-tsc -p tsconfig.test.json` → confirm it reds on `configurator-recursion.spec.ts:49`;
then write the `proof:consumer-staleness` grep against `../speedtest/src` → confirm it
enumerates the 8 stale files. Both are dead-import detectors that pass GREEN today only
because no tool looks where the imports are.

---

## Sources (this audit)

- `tests/configurator-recursion.spec.ts:49,268` (the live dead import; reproduced
  undefined + 6/6-green via a transient vitest probe)
- vue-tsc TS2305 proof: `vue-tsc -p (extends tsconfig.json + include the spec)` →
  `tests/configurator-recursion.spec.ts(49,10): error TS2305: … has no exported member 'BouncyToggle'`
- `tsconfig.json` / `tsconfig.src.json` / `tsconfig.build.json` (all `include` src-only;
  no tests/)
- `scripts/proof-strict-templates.mjs:36-39,104` (SRC-only walk; checkUnknownProps ≠
  dead-import class)
- `scripts/proof-tabs-unified.mjs:52` (`SWEEP_ROOTS = ["src","demo"]`) + clause 10
  deletion-proof; gate run → `code survivors: 0, status: PASS`
- `src/components/custom/tabs/index.ts` (barrel exports only SegmentedTabs)
- `docs/tranches/AX/audit/W53-tabs-unified.json` (filesChanged — 0 tests/, 0 sibling)
- `docs/tranches/AX/audit/convergence2/A-tabs-unify.md` §3 (demo-only consumer table)
- `../speedtest/src/{components/dashboard/MetricSelector,ResultsFilters}.vue`,
  `{layouts/PublicDashboardLayout,AdminDashboardLayout}.vue`,
  `{views/ChartsView,AdminDataView,AdminSettingsView}.vue`,
  `views/__tests__/AdminDataView.append.test.ts` (8 stale-import files);
  `../speedtest/package.json:88` (`@mkbabb/glass-ui: ^3.7.0`)
- `package.json` exports (no `responsive-tabs`; `./tabs` present)
- `scripts/proof-consumers-static.mjs:21-39,130` (sibling walk = surface-creep, not
  reverse-staleness)
- Slip-history: `feedback_glass_ui_binding_verification.md`;
  `research/dock-facilities-corpus.json:335`; `audit/converge-digest.md:113`;
  `research/final-hardening-corpus.json:352,355,385`; `audit/hardening/CH-aurora.md:181-182`
- `docs/tranches/AX/audit/inventory/MASTER-PLAN.md` (Batch 9 consumer bumps);
  `AX.W34-*.md` (no tabs/Bouncy tracking — grep empty)
