# BK · Lane β · unit β0 — the `darkModeSyncScript` COMMIT SEAT

**modelId: `claude-opus-5[1m]`** (IMPLEMENT seat; the assertion gates the chain) · base HEAD
`074a3d0e4a22885b098be6986f404dee19e49279` · date **2026-08-10** · SHARED TREE, three other
lanes concurrent.

**This seat never staged, committed, stashed or checked out.** The driver commits.

---

## 0 · STEP-0 CENSUS, banked before a byte moved

Baseline diff: `/tmp/bk-lanebeta-baseline-1786380256.diff` (67 lines, `git diff -U0`).

| figure | at step 0 |
|---|---|
| HEAD | `074a3d0e4a22885b098be6986f404dee19e49279` |
| porcelain | **5** |
| tracked-modified | `demo/stories/foundations/typography.vue` · `demo/stories/substrates/aurora.vue` · `src/composables/dark/darkModeSyncScript.ts` · `src/styles/glass/material.css` |
| untracked (enumerated) | `tests/styles/material-css-syntax.test.ts` — the ONE untracked path |

Per-file baseline digests (`sha256` of each `diff --git` section of the banked `-U0` diff):

```
demo/stories/foundations/typography.vue      40bbfac434a33fdf…
demo/stories/substrates/aurora.vue           a29cc77082df8064…
src/composables/dark/darkModeSyncScript.ts   555ae85fbeeb609c…
src/styles/glass/material.css                5eeaf21cd508e5de…
```

The **36/1 parked diff** named by the lane is the `darkModeSyncScript.ts` entry: `+36 / −1`,
three optional fields on `DarkModeSyncScriptOptions` plus the three emitted arms.

[**CURE PASS · 2026-08-10** — the adjudicator returned **CURE-REQUIRED** (`wf_caf93087-62c`,
modelId `claude-fable-5`) with one gating cure and three low. All four landed at this seat.
**SEATS +0**, the §4 receipt re-run and byte-identical, and the only source-of-record files
touched are this unit's three.

**THE LANE TEXT'S `bound:13 / rosterSha256:15421032` IS NOT THE DATUM THIS SEAT MEASURED
AGAINST, AND THAT IS NOT DRIFT** (CURE-β0-2). That line was **⊕⁷²'s** receipt; it stood for
exactly one ⊕ and was **RETIRED at the #66 close** —
`docs/tranches/BK/EXECUTION-PROGRESS.md:4412`, *"THE OLD STANDING RECEIPT LINE IS RETIRED AT
THIS ⊕, AND CARRYING IT FORWARD IS A FALSE-FAIL"* — which rebound the standing comparison to
`… bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0`. §4's receipt is
byte-identical to **that** standing line. A later reader diffing §4 against the lane brief will
find two different `rosterSha256` figures; the retirement is why, and the lane text stays TRUE
as a dated statement about its own ⊕.

**THE NO-GLOBALS ARM'S DETECTOR WAS WRONG AND IS REPLACED** (CURE-β0-1, gating). The retired
detector counted new own keys of the `with(scope)` object — a surface a leak never reaches: a
non-strict unqualified assignment **skips** the scope object and lands on the *calling
function's* global, so `scope` stayed clean while the name leaked. Reproduced directly rather
than argued: `with(scope){q=new URLSearchParams(location.search)}` → `scope` leaked `[]` while
`globalThis.q` is a live `URLSearchParams`. The arm now runs the emitted string through
`node:vm` `runInNewContext(out, host)`, where the **seeded host IS the run's global object** —
the same surface an inline `<head>` script has — so an unqualified assignment is exactly a new
own key. The stand-in host is built once (`makeHost`) and driven two ways: `with(host)` for the
branch arms, `node:vm` for the leak arm.

**KILL-CHECK, in a scratch tree, never the repo tree** — `git archive HEAD` + this unit's two
files + a `node_modules` symlink, both overlaid files `diff`-identical to the working tree.
Dropping `var` from the queryArm emission (`src/composables/dark/darkModeSyncScript.ts:93`) —
Challenger A's m4, which the retired detector passed 18/18 — now **KILLS the arm**:

```
scratch CONTROL (pristine source)   Tests  18 passed (18)                  real exit 0
scratch m4 MUTANT (`var` dropped)   Tests  1 failed | 17 passed (18)       real exit 1
    × G-NO-FLASH · no-globals — the emitted body is ONE IIFE and leaks no name
      AssertionError: expected [ 'q' ] to deeply equal []
```

The arm also refuses to pass **vacuously**: with `defaultDark:false` and no stored value, only
the query arm can produce dark, so the run asserts the stamp and the write-back alongside the
leak set — a swallowed `catch(_){}` cannot fake a clean measurement.

**THE BORN-RED FIGURES MOVED WITH THE ARM, AND ARE RE-MEASURED RATHER THAN CARRIED** — ACT 3
below and `PASTE-BLOCKS.md` both restate them. CURE-β0-3 and CURE-β0-4 landed in `PI-QUEUE.md`:
the verbatim `grep` enumeration completed to all **ten** hits (the omitted one being
`scripts/verify-export-types.mjs:765`, a comment — conclusion *zero call sites* unchanged), and
`seven G-NO-FLASH arms` → `eight`.]

---

## 1 · WHAT THIS UNIT DID — four acts

### ACT 1 · The MIGRATION §row, naming BOTH ratify-or-cure decisions

`MIGRATION.md` gains **§8.1.0 — UNRELEASED**, above §8.0.0. The header carries its own
honesty detector (`node -p "require('./package.json').version"` → `8.0.0`) so nothing reads
as shipped: 8.0.0 is live on the registry and this addition cuts at the next minor, per the
lane's own routing (`public-API addition → cuts at next minor with consumer addendum via
#76's channel`).

The row carries the three-option table, the precedence sentence (**query > storage >
default**), the byte-identity clause (ACT 2), and the two decisions **RATIFIED, not left to
be discovered**:

1. **`normalize` runs AFTER `queryOverride`, so a `?dark` visit PERSISTS into that browser's
   storage.** Ratified, because the reverse order is worse in the module's own terms: the
   runtime composable re-reads storage, finds `"auto"`, and flips the page back one frame
   after the stamp — the flash again, one level down. The consequence is named rather than
   hidden: **capture profiles, never a shared user-facing origin**; a single `?dark` link
   permanently changes an end user's stored preference if both options are on.
2. **The query flags are PRESENCE flags, so `?dark=false` resolves DARK.** `q.has("dark")` is
   value-blind by construction. Ratified because a value grammar is a second, weaker way to
   say what `?light` already says. `?dark=0`, `?dark=light`, `?dark=false` and `?light&dark`
   all read dark, and the row tells a consumer to emit the flag or omit it — never to emit it
   with a value.

Both are held by named arms (ACT 3), so neither is prose only. **Neither decision was cured**
— and the grounds are stated above rather than implied, which is what "ratify-or-cure" asks
for.

### ACT 2 · The default emission's byte change — CURED, not merely noted

The lane ordered this seat to *"note the emitted-IIFE byte change re-pins any pinned string."*
Measured first, then noted, then **the note's subject was removed**, and this is the one
deviation from the lane's literal text — declared here with its grounds.

Both figures are **DERIVED from the function** (a `vite-node` probe over the real module on a
pristine `git archive HEAD` tree and on the working tree), never typed — the CURE-66-1 lesson:

| tree | `darkModeSyncScript()` | bytes | CSP hash |
|---|---|---|---|
| HEAD (8.0.0, shipped) | — | **300** | `sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=` |
| the PARKED diff | — | **302** | `sha256-Ww9UmE068him9LdkxjP90V0vytb88DNBMippYt5AHHk=` |
| after this cure | — | **300** | `sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=` |

**Why it mattered.** An inline `<head>` script is exactly what `script-src 'sha256-…'` pins.
A re-hashed default is **blocked at first paint** — no type error, no runtime error, no
console entry a consumer would attribute to a bump — and the page shows the flash this module
exists to remove. That is a masking failure of the sharpest kind: the FOUC eliminator failing
silently *into* FOUC.

**Why it was free.** The 2 bytes were a wrapping paren pair around the `"os"` fallback,
substituting into an `&&` chain of the same precedence and associativity. Inert to the
semantics, load-bearing to the hash. They are gone; the boolean arm is unaffected
(`(m===null||m==="auto")&&false` needs no parens either). The source comment states the
reason at the site so a later hand does not re-add them for tidiness.

**The note survives with its subject moved**, and is in the MIGRATION row: only an **opt-in**
arm moves the emitted bytes now, and a consumer opting in is editing its head script anyway.

### ACT 3 · The born-RED gate, bound under an EXISTING seat — SEATS +0

Eight arms in `tests/composables/dark/darkModeSyncScript.test.ts`, under

```
describe("G-NO-FLASH — the parse-time stamp: precedence, determinism, write-back")
```

**`G-NO-FLASH` is an already-seated MOTION name** (§B.5, `ROSTER.md:24`). These file as
close-battery rows under it, exactly as #29's 27 route-grammar arms did (`RECORD.md:456`,
*"Seats +0 … the 27 arms file as close-battery rows"*) and exactly as #66 did (*"two arms of
an already-seated describe, zero new test files, budget exactly 60"*). **No seat is minted, no
`SEAT-BINDING.json` row moves, and the register receipt is byte-identical** — §4.

> **Routed, not taken.** `SEAT-BINDING.json` still declares `G-NO-FLASH` `binding: "none"`.
> Promoting it to `seat-detector` would move `bound:13 → 14` / `unbound:45 → 44` and would
> re-pin `gate-register.test.ts:172-174`. That is **#65's act**, already routed as **RT-29A**
> and unspent; §B.5's own law is that *no seat is bound on the scan alone*. This unit does
> not spend another row's act. **RT-β0-A** re-states the same route with a second live-name
> file behind it.

The arms, and what each holds:

| arm | holds |
|---|---|
| `precedence is query > storage > default, in both directions` | `?dark` over stored `light` on a light platform; `?light` over stored `dark` on a dark platform; storage still beats the default with no query |
| `a boolean defaultDark is DETERMINISTIC — the platform is not asked` | emitted bytes carry **no `matchMedia`** under a boolean; absent storage on a dark platform still resolves light, and the converse |
| `normalize writes the RESOLVED mode back, so auto cannot mean two things` | the write is measured (a recording `setItem`), and the custom `storageKey` travels into the write, not only the read |
| `RATIFIED — normalize runs AFTER the query, so a forced visit PERSISTS` | decision 1, executable |
| `RATIFIED — the query flags are PRESENCE flags, so ?dark=false reads DARK` | decision 2, executable, over four value forms + the both-flags case |
| `the three seams are OPT-IN — the default emission reads no query and writes nothing` | no `URLSearchParams`, no `setItem` by default; a `?light` on a default build is ignored |
| `the DEFAULT emission is byte-identical — a CSP hash does not silently re-pin` | **300 B + the sha256** — ACT 2 made executable |
| `no-globals — the emitted body is ONE IIFE and leaks no name` | one IIFE by shape, and **the run's OWN GLOBAL gains no own key** — measured through `node:vm`, where a leak can actually land, and kill-checked against a `var`-dropped queryArm (§0) |

The harness was **hoisted to module scope and generalised** (`search`, `options`, recorded
`writes`) rather than duplicated: `makeHost` builds the stand-in host once and two runners drive
it — `runScript` through `with(host)` for the branch arms, `runInPageGlobal` through `node:vm`
for the leak arm (§0's cure; `with(host)` is documented in the file as **not** a leak detector,
so no later hand reads it as one). The ten pre-existing cases are otherwise untouched.

**BORN-RED, on a scratch tree materialised by `git archive HEAD`** (`src/composables/dark/
darkModeSyncScript.ts` diffed byte-identical to `git show HEAD:…` before the run):

```
Tests  6 failed | 12 passed (18)          real exit 1
```

**6 of the 8 arms are born-RED**; the ONE pristine-green arm is named rather than counted away
— `the three seams are OPT-IN` is a **regression arm over pre-existing behaviour** (HEAD already
emits one IIFE and already reads no query), which is the honest class for it. The eighth, the
CSP pin, is green here because HEAD's emission **is** the pinned 300 B; it REDs against the
parked bytes below, which is this unit's real pre-state.

[**CURE PASS · 2026-08-10** — this figure was `5 failed | 12 passed (17)` before CURE-β0-1 and
is **re-measured, not carried**: the cured `no-globals` arm asserts the query and normalize
seams actually execute, so it too is born-RED at HEAD (where the three options do not exist),
and `no-globals` leaves the pristine-green list. Re-run on a fresh `git archive HEAD` tree whose
`src/composables/dark/darkModeSyncScript.ts` was `diff`-verified `≡ git show HEAD:`.]

The eighth arm (the CSP byte-identity pin) is born-RED against **the parked diff**, which is
this unit's real pre-state — a second scratch tree carrying the parked bytes:

```
Tests  1 failed | 17 passed (18)          real exit 1
      → G-NO-FLASH · the DEFAULT emission is byte-identical …
```

That tree's emission was **re-derived on it, not typed**: `302` B /
`sha256-Ww9UmE068him9LdkxjP90V0vytb88DNBMippYt5AHHk=` — ACT 2's parked row, reproduced.

On the working tree, after the cure: **`18 passed (18)`, real exit 0.**

### ACT 4 · The π pair — ENQUEUED to the singleton browser seat, not captured

`docs/tranches/BK/execution/2026-08-10-lanebeta-unit1/PI-QUEUE.md`. **This seat opened no
browser and claims no paint.**

A finding the enqueue had to state before it could spec anything: **`darkModeSyncScript()` has
zero injection sites in this repo** (`grep -rn 'darkModeSyncScript' src demo scripts` → **ten
hits, all definition, barrel or prose** — including one comment in `styles/glass/control-bit.css`
and one in `scripts/verify-export-types.mjs:765`; **no `demo/` hit at all and zero call sites**,
enumerated in full in `PI-QUEUE.md` §0 per CURE-β0-3), and the
demo's capture path stamps the class itself off `?mode=dark` (`demo/main.ts:86-103`). A π run
against the demo would measure `demo/main.ts`, not this module. The pair therefore runs
against a **temp-path harness** — the module's own emitted string, injected the way its doc
comment says to inject it — so nothing is committed to be pruned later.

The two cells are **mode-asserted (P0)** and each runs under the **opposite** platform
preference and the **opposite** stored value, so only the query can produce the expected
stamp. The harness `<script>` body in the queue file is **402 bytes and byte-compared against
the function's own output** (`MATCH: True`), not transcribed.

---

## 2 · WHAT THIS UNIT REFUSED

1. **The `SEAT-BINDING.json` promotion** — #65's act, routed as RT-29A/RT-β0-A. §4.
2. **The `.bundle-ratchet` rebind** — measured, handed over, not spent. §3.
3. **Curing either ratified decision.** Both were examined on their merits and ratified with
   grounds; the row names them so a consumer meets them in the migration guide rather than in
   production.
4. **#17 / #21.** Out of this run's scope by the driver's own order; not started, not touched.

---

## 3 · THE RATCHET — measured on a β0-ONLY committed-shape tree, and NOT rebound

⊕⁷⁴'s **L-1** is this exact file's lesson: the datum was contaminated because a rehearsal
measured the WORKING tree. So this measurement was taken on a tree materialised by
`git archive HEAD` + **only β0's files**, with three concurrent lanes' bytes excluded by
construction:

```
npm run build                       exit 0
node scripts/verify-export-types.mjs
  → G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2634568 > 2633353     exit 1
```

**β0's whole contribution is +1,215 unpacked content bytes**, and it reconciles to the byte
against its two parts:

| artefact | HEAD (⊕⁷⁴'s committed figures) | β0 | Δ |
|---|---|---|---|
| `dist/composables/dark/darkModeSyncScript.d.ts` | 990 | **1,907** | +917 |
| `dist/dark-*.js` chunk | 2,244 | **2,542** | +298 |
| — | — | — | **+1,215 ≡ 2,634,568 − 2,633,353** |

The chunk cross-checks ACT 2: ⊕⁷⁴ measured the **parked** chunk at **2,544**; the cure's two
paren bytes are visible there exactly — 2,544 − 2 = **2,542**.

**NOT REBOUND, deliberately.** A ratchet rebind is owner-worded at the commit (⊕¹⁶), and this
is a **four-lane batch**: a rebind bound to β0's figure alone would be obsolete the moment
another lane's bytes land, and the close would rebind twice. The correct rebind is **one, at
batch close, over the whole committed set**, and it is a sum of named contributions rather
than an unexplained number. **β0's named contribution is `+1,215`.** Until that rebind,
`npm run verify:package` stands RED on `G-BUNDLE-RATCHET` — stated, not papered over, per the
4.0.0 close-lesson.

---

## 4 · VERIFY — real exit codes, never a piped tail's

| command | real exit | figure |
|---|---|---|
| `npx vue-tsc --noEmit` | **0** | clean |
| `npx vue-tsc --noEmit -p tsconfig.test.json` | **0** | clean (both `npm run typecheck` arms) |
| `npx vitest run tests/composables/dark/darkModeSyncScript.test.ts` | **0** | `18 passed (18)` |
| `npx vitest run tests/styles tests/components tests/gates tests/composables` | **1** | `1 failed \| 1769 passed \| 5 expected fail (1775)` — see the attribution below |
| `npx vitest run tests/public-surface.spec.ts` | **0** | **87 passed (87)** — unchanged; the interface widens, the surface does not |
| `node scripts/gate-register.mjs` | **0** | the receipt below |

**RECEIPT — BYTE-IDENTICAL to the standing line, and stated in full:**

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

**SEATS +0.** No figure moved, so no act is owed against one.

**THE STANDING BATTERY FIGURE HAS MOVED BY GROWTH, not by this unit.** The brief carries
`1538 passed | 5 xf`, which is #66's line at the 8.0.0 cut; rows landed since then added
cases, and the measured line at this HEAD is **`1769 passed | 5 expected fail`**. The `5
expected fail` — the load-bearing half — is unchanged.

**THE ONE FAILURE IS NOT β0's, and the attribution is measured rather than asserted.**

```
FAIL tests/gates/boot-graph.test.ts > gate:boot-graph — build arm
     > the dist-demo it measures is NEWER than every source it is built from
     dist-demo/index.html is STALE (built 2026-08-09T08:33:20.689Z,
                                    newest source 2026-08-10T16:57:10.655Z)
```

The gate walks **all of `src/` and `demo/`** and takes `max(mtime)` (`boot-graph.test.ts:545-553`).
It is therefore a **batch-level** gate that any lane's edit trips. The six newest source files
at measurement time are **all foreign**:

```
2026-08-10T16:58:06Z  src/components/configurator/ConfiguratorRow.vue
2026-08-10T16:57:56Z  src/components/expandable-container/styles.css
2026-08-10T16:57:33Z  src/components/expandable-container/ExpandableContainer.vue
2026-08-10T16:57:24Z  src/components/configurator/styles.css
2026-08-10T16:56:06Z  src/components/configurator/Configurator.vue
2026-08-10T16:54:43Z  demo/stories/foundations/typography.vue
-----
2026-08-10T16:52:05Z  src/composables/dark/darkModeSyncScript.ts   ← β0's newest, 7th
```

β0's newest touched source is not the maximum and removing it does not move the maximum. The
gate's own remedy is `npm run demo:dist:build`, which belongs to **batch close**, not to a
lane that owns neither `demo/` nor the build artefact.

---

## 5 · FENCE — re-hashed, not asserted

| surface | step-0 digest | now | verdict |
|---|---|---|---|
| `src/styles/glass/material.css` (UNKNOWN-OWNER, fenced OUT) | `5eeaf21cd508e5de…` | `5eeaf21cd508e5de…` | **UNTOUCHED** |
| `tests/styles/material-css-syntax.test.ts` (UNKNOWN-OWNER, fenced OUT) | untracked | untracked, unopened | **UNTOUCHED** |
| `demo/stories/substrates/aurora.vue` (foreign) | `a29cc77082df8064…` | `a29cc77082df8064…` | **UNTOUCHED** |
| `demo/stories/foundations/typography.vue` (foreign) | `40bbfac434a33fdf…` | moved at 16:54:43Z | **not β0's** — a concurrent lane; this seat never opened the file |

β0's own restricted diff (`src/composables/dark/darkModeSyncScript.ts` +
`tests/composables/dark/darkModeSyncScript.test.ts` + `MIGRATION.md`, `-U3`):
`dcaaf308e6b19392…`

Porcelain **5 → 18**. The growth is foreign lanes (configurator · expandable-container ·
VizStudio · two sibling unit directories · an atlas ack) plus **β0's four paths**:
`MIGRATION.md` · `src/composables/dark/darkModeSyncScript.ts` ·
`tests/composables/dark/darkModeSyncScript.test.ts` ·
`docs/tranches/BK/execution/2026-08-10-lanebeta-unit1/`. **The index was never staged.**

---

## 6 · ROUTED OUT OF THIS UNIT

- **RT-β0-A** — the `G-NO-FLASH` register bind (`bound:13 → 14`) → **#65**, joining the
  unspent **RT-29A**. Two live-name files now stand behind it
  (`tests/styles/route-motion.test.ts:213`, `tests/composables/dark/darkModeSyncScript.test.ts`).
- **RT-β0-B** — the `.bundle-ratchet` rebind, **+1,215 from β0**, → **batch close**, owner-worded.
- **RT-β0-C** — the π pair, `PI-QUEUE.md` → the **singleton browser seat**. OPEN.
- **RT-β0-D** — the consumer addendum for the three options → **#76's channel**, at the minor
  cut, per the lane's own routing.
- **RT-β0-E** — `boot-graph.test.ts:563`'s hint says *"npm test runs it first"*; `npm test` is
  `vitest run` and runs no build (`package.json`). A dead hint, not this unit's subject →
  unclaimed.
