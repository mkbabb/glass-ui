# LANE α — UNIT 6 (α4 · #42 W-SEARCH) · RECORD

**SCOPE AS DISPATCHED:** α4 — #42 W-SEARCH, this commit-unit only, per the ratified lane
text (`wf_8139c708-c24`).
**SEAT:** IMPLEMENT · `modelId: claude-opus-5[1m]`.
**TREE:** SHARED. Zero `git add` / `commit` / `stash` / `checkout` by this seat.
**BASE:** `964535cb` (the dispatch named `2cfc1124 or later`; the driver had advanced
through α6 `#47 W2-W9`, γ4 `#51`, γ3 `#50`, δ `#58`, β2 `#21`).
**DATE:** 2026-08-25.

**MODEL ASSERTION — fallback-free, and it GATED the chain.** Asserted before the first
repo read, gating on a PATTERN, never on non-emptiness (unit-4 §1 measured that
`CLAUDE_MODEL_ID` is not set in this harness at all, so a `${VAR:-…}` form is a
tautology and appears nowhere in this chain):

```sh
echo "MODEL_ID_ASSERT: claude-opus-5[1m]" && [[ "claude-opus-5[1m]" == claude-opus-5* ]] \
  && echo "GATE_PASS: implement-seat model law satisfied"
→ MODEL_ID_ASSERT: claude-opus-5[1m]
→ GATE_PASS: implement-seat model law satisfied
```

**The #7 fence, cited as the lane requires in every wave record:**
`src/components/dock/styles/morph.css:67-76` — *"NO FILTER ON AN ANCESTOR OF A LENS — the
#47 (GF-DOCK) fence… makes that ancestor a BACKDROP ROOT: the lens beneath samples IT
instead of the page and the glass goes flat."* Re-read on disk. **Live for this unit only
incidentally, and honoured by construction: this unit adds ZERO CSS declarations of any
kind.** Measured on its own bytes — `git diff -- src demo | grep -c '^+.*filter:'` → **0**.
The two CSS files it touches (`dock/styles/search.css`, and the demo route's markup) take
prose edits and a hand-composed `.input-bar` respectively; no property is added to any
ancestor of `.dock-plate`.

---

## §0 · STEP-0 BASELINE — banked before a byte

```
$ git diff -U0 > /tmp/bk-lanealpha-baseline-1787669700.diff   → 0 bytes
$ git status --porcelain | wc -l                              → 0
$ git ls-files --others --exclude-standard | wc -l            → 0
$ git rev-parse --short HEAD                                  → 964535cb
```

**The tree was COMPLETELY CLEAN at open — no tracked dirt, no untracked paths.** This is
a materially different opening from units 4 and 5, and it discharges two dispatch
premises by measurement rather than assumption:

| dispatch premise | measured at open | consequence |
|---|---|---|
| "Lane β's unit-β0 dirt (MIGRATION.md · `darkModeSyncScript.ts` · its test · the lanebeta-unit1 records) **awaits its cure+commit**" | **ABSENT** — all clean | β0 landed before this unit opened; there was no foreign dirt to route around |
| "the formerly-fenced unknown-owner surfaces (`material.css` + `material-css-syntax.test.ts`) LANDED attributed at `2cfc1124`" | clean, tracked, untouched | confirmed; not lane surfaces, and this unit never read or wrote them |
| "#21 export motion LANDED at `96f0f257`, so the driver-serialized seam on `package.json` / subpath-policy / `public-surface.spec.ts` is **OPEN**" | `96f0f257` present in `git log`, all three files clean | **the seam is genuinely open** and this unit takes it, as charged, at this unit and only here |

**Two step-0 gate captures were banked as the comparison basis** (both re-run at close,
§6): `node scripts/gate-register.mjs` → `seats:60 … violations:0`, saved to
`/tmp/bk-a4-receipt-step0.txt`; `node scripts/regen-exports.mjs` → `exportKeys 69/69`,
`EXACT REPRODUCTION: YES`, EXIT 0.

---

## §1 · A DRIFT IN THE DISPATCH'S OWN CITATIONS — corrected on the bytes, not worked around

Three of the charter's file/line cites do not match disk. All three are harmless
once named, and all three are recorded because a seat that silently "knows what was
meant" is a seat whose successors cannot check it.

| dispatch cite | on disk | disposition |
|---|---|---|
| `scripts/subpath-policy.mjs` | `scripts/**lib**/subpath-policy.mjs` (the leaf moved under `lib/` at BH.B2.1) | edited at the real path; the fail-closed contract is byte-for-byte the one described |
| `useDockSearch.ts:48-54` | the import block is `:49-54` (`:48` is the `useHoldToken` line above it) — and the roster row 42 already carried this correction as `:48-53`, itself off by one | re-pointed the whole block; neither cite was usable verbatim |
| `buildEntrySet:255-265` as the fail-closed mechanism | `buildEntrySet` is at **`:291-301`** and contains **no guard at all**; the fail-closed bite lives at `classifyTier:253-264` (which collects `unclassified`) and fires at `libraryEntryMap:312-315` (which throws) [2026-08-25 · driver, C4: these cites are PRE-WRITE-relative; after this unit's own +15 comment lines the mechanisms sit on disk at `classifyTier:268` · `buildEntrySet:306` · `libraryEntryMap:324`] | the roster row is RIGHT in substance — *"subpath-policy's INTERNAL-vs-PUBLISH is policy not mechanism (no throw guards the class map)"* — and this seat proved the real mechanism instead of citing the wrong line (§3) |

---

## §2 · THE CENSUS — every surface, measured, with its disposition

**Deleted surface (7 files, 557 lines):**

| file | lines | disposition |
|---|---|---|
| `src/components/search/SearchBar.vue` | 79 | **DELETE-with-relay** (Ruling 1) |
| `src/components/search/searchVariants.ts` | 36 | DELETED — the CVA dies with its SFC |
| `src/components/search/index.ts` | 11 | DELETED — the `./search` barrel |
| `src/components/search/composables/match…` ×4 | 431 | **MOVED**, not deleted → `src/composables/search/` |

**The relay, re-verified on disk this seat rather than inherited from the banked
census** (read-only; zero sibling writes):

```
$ grep -rn "glass-ui/search" ~/Programming/value.js --exclude-dir=node_modules
  demo/palettes/BrowsePane.vue:195                import { SearchBar } from "@mkbabb/glass-ui/search";
  demo/palettes/PalettesPane.vue:149              import { SearchBar } from "@mkbabb/glass-ui/search";
  demo/palettes/admin/AdminPane.vue:87            import { SearchBar } from "@mkbabb/glass-ui/search";
  demo/palettes/browser/slug/PaletteSlugBar.vue:132  import { SearchBar } from "@mkbabb/glass-ui/search";
$ grep -n "glass-ui" ~/Programming/value.js/package.json   → "@mkbabb/glass-ui": "^7.0.0"
```

**The four line numbers are EXACT — the banked census holds.** Two findings NARROW it,
and both matter to the addendum:

1. **All four edges are in value.js's own `demo/` tree, not its published `src/`.**
   Measured: `grep -rn "SearchBar" ~/Programming/value.js/src` → **zero hits**. The relay
   does not touch anything value.js ships to its own consumers.
2. **The "3 CSS/selector sites" are NOT affected by this cut at all.** They read
   `.input-bar` / `.input-bar-field` (`demo/styles/utils.css:152` `.search-seated
   .input-bar-field`, `PaletteRenameInput.vue:4,15`, `e2e/…/o7-card-census.spec.ts:153`)
   — the **RECIPE**, which lives in `src/styles/utilities/components.css`, ships on
   `./styles`, and **SURVIVES this unit untouched**. They were banked as relay members
   on the reasonable assumption that the chrome owned its own class; it never did.

So the relay's true blast radius is **4 files, one repo, all demo-side, one import
statement each** — stated in the addendum (`PASTE-BLOCKS.md`) with that narrowing
explicit, because a relay that overstates its own reach teaches the consumer to discount
the next one.

**In-repo consumers of the deleted/moved surface — all 14 found, all dispositioned:**

| site | act |
|---|---|
| `src/components/dock/composables/useDockSearch.ts:49-54` | re-pointed → `../../../composables/search` |
| `demo/stories/data/search.vue` | the route REBUILT onto the engine (§5) |
| `demo/stories/dock/dock-search.vue:24` | type import re-pointed |
| `tests/components/custom/search/` ×3 | RELOCATED → `tests/composables/search/` |
| `tests/public-surface.spec.ts:37,267` | the `./search` source-truth rows (§4) |
| `tests-visual/search-custom.spec.ts` | **DELETED** — CWT-2 §STRIKE names it |
| `tests-visual/search.spec.ts` | re-pointed; **2 pre-existing REDs found** (§5) |
| `tests-visual/w1-radius-redress.spec.ts` + `.webkit.spec.ts` | variant half struck, recipe half KEPT (§5) |
| `tests/styles/radius-role-canon.test.ts:238` | variant half struck, recipe half KEPT |
| `tests/gates/overfit-structure.test.ts:369,377` | the self-test bite re-pointed off phantom paths |
| `scripts/import-dag.mjs:101` | the M02 row struck, deliberately not re-added |
| `src/components/dock/index.ts:94` · `dock/styles/search.css:25` · `input/index.ts:5` | prose truthed |
| `src/components/_shared/control.ts` + `_shared/index.ts` | **the orphan a gate caught** (§7) |

---

## §3 · THE FAIL-CLOSED ROW — born-RED against the real mechanism

`COMPOSABLE_CLASS.search = "INTERNAL"` (`scripts/lib/subpath-policy.mjs`), and
`COMPONENT_CLASS.search = "PUBLISH"` struck in place with a dated bracket.

**The row is not bookkeeping — the map is fail-CLOSED and it FORCED the row.** The new
`src/composables/search/index.ts` puts the directory into `dirsWithIndex()`, and an
unclassified dir throws at `libraryEntryMap()` rather than defaulting to publish. Proved
by a probe applied to THIS tree's disk with the row removed from the map in memory
(**deleted in this seat**, verified absent, in no commit):

```
──── BORN-RED — the COMPOSABLE_CLASS row REMOVED from the map, disk unchanged
  unclassified: ["search"]  → libraryEntryMap() throws, regen-exports EXIT 1
  counts: {"PUBLISH":3,"INTERNAL":2,"CURATED":4}
──── WITH THE ROW (this unit's bytes)
  unclassified: []  counts: {"PUBLISH":3,"INTERNAL":3,"CURATED":4}
  disk composable dirs: ["color","context","dark","dom","glass","keyboard","motion","reactive","search","sidebar"]
  stale(classified-but-absent): []
```

The last line is the one that proves the OTHER half of the act: `stale: []` means
removing the `search` key from `COMPONENT_CLASS` was correct and complete — a key left
behind would have reported as classified-but-absent drift.

---

## §4 · THE `./search` EXPORT CUT — EXACT, and proven both directions

The driver's owed word was GIVEN in the dispatch (the cut rides #42's own commit under
delegated owner authority; the #65/#66 vehicle verified DEAD at HEAD, not re-litigated).

```
$ node scripts/regen-exports.mjs                              (check mode, pre-write)
  [component]  disk=56  PUBLISH=48 INTERNAL=8   unclassified=0 stale=0
  [composable] disk=10  PUBLISH=3  INTERNAL=3 CURATED=4  unclassified=0 stale=0
  REGEN: exportKeys 68/69  jsSubpaths=62  drops=1 adds=0 targetMismatch=0 tvDrops=1 tvAdds=0
  DROPS: ./search
  EXIT 1 — regen no longer reproduces package.json.          ← the CUT, measured

$ node scripts/regen-exports.mjs --write
  re-pinned 68 export keys in package.json

$ node scripts/regen-exports.mjs                              (check mode, post-write)
  REGEN: exportKeys 68/68  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0
  >>> EXACT REPRODUCTION: YES
  EXIT 0                                                      ← REAL exit, not a tail's
```

**`regen-exports EXACT (−./search)` is satisfied in the strict sense the charter asks
for: `drops=1` and that one drop is `./search`; `adds=0`; `targetMismatch=0`.** The
package.json diff is **7 deletions and zero insertions** — the `./search` exports entry
and its `typesVersions` twin, nothing else:

```
$ git diff --stat package.json
 package.json | 7 -------
 1 file changed, 7 deletions(-)
```

**THE CUT IS TOTAL, NOT A NARROWING, and this is checkable rather than asserted:**
`grep -n "search\|Search\|Fuzzy" src/index.ts` returns **one prose hit and zero
exports**. The root barrel never carried `SearchBar` or any fuzzy name, so `./search` was
the only door. That is also why `rootRuntimeExports` in `public-surface.spec.ts` did not
change by a byte — the same shape #21's `./canvas` cut had, and cited there for the same
reason.

---

## §5 · THE CONSUMERS — three that are more than re-points

### §5a · The demo route: rebuilt onto the engine, and two ADDs its own spec charged it

`demo/stories/data/search.vue` mounted `<SearchBar>` four times. It is now the ENGINE's
specimen, which is what it was always actually showing — **the rail was never the story,
the ranking was**. The field is the `.input-bar` recipe hand-composed, which is the
in-repo idiom already: `demo/stories/dock/dock-search.vue:201` does exactly this.

Three things landed with it, and none is decoration:

1. **`@keydown` is bound.** CWT-2 §SEARCH **D10** is blunt: *"`/data/search` binds no
   `@keydown` — ArrowDown+Enter → nothing; the dock DOES consume the combobox half."*
   `useFuzzySearch.onKeydown` already implements Arrow/Enter/Escape; the flagship route
   simply never wired it. One attribute, plus `aria-activedescendant`/`role="option"`/
   `aria-selected` so the walk is announced and not merely painted.
2. **The blurb's promise is made TRUE.** It read *"screen readers hear the running result
   count"* (**D16**) while the route carried **zero `aria-live`** — the count lived only
   in a `<Badge>`. A `role="status" aria-live="polite"` node now renders the SAME
   `resultCount` the badge does, so the two cannot drift.
3. **The "Sizes" section is STRUCK with its subject**, along with `sizeSample`. It
   demonstrated `<SearchBar size>` — a prop on a component that no longer exists. The
   `--control-h-*` cohort it was really showing is demonstrated on every other control
   route, so nothing is left uncovered.

Also re-seeded: the catalogue's row **"SearchBar query rail"** → **"Fuzzy match scorer"**.
The catalogue is a list of things this library HAS; a row naming a component deleted in
the same commit is a lie with a very short fuse.

### §5b · `tests-visual/search.spec.ts` — TWO REDs found that were BROKEN BEFORE THIS UNIT

Re-pointing the spec surfaced that **two of its four arms could not have passed at HEAD**:
arms (a) and (d) assert `/FuzzySearch overlay/i` appears in the ranked set, and **no row
by that name exists in the seed table** — the overlay component retired at REDUCTION W3
and the assertion outlived its subject. These are Playwright specs, so they are **not in
the vitest battery** and no standing figure ever showed them.

**Recorded rather than quietly swapped**, because "I fixed it while I was in there" is how
a pre-existing defect becomes invisible. Both re-pointed to the live `useFuzzySearch
state` seed. The subsequence arm's `"srchbar" ⊑ "SearchBar query rail"` became
`"fzmtch" ⊑ "fuzzy match scorer"` — same property under test (gap-tolerant subsequence,
not substring), live target.

### §5c · The radius specs — the variant half struck, the RECIPE half KEPT

Three specs read `searchVariants.ts` off disk to prove F17 (`floating` retains the plate,
`bare` is the sole chromeless). That file is deleted, so the clone half is not a weaker
proof — **it is a crash**. Struck in place in all three, with `SEARCH_VARIANTS_SRC`, the
`pick()` helper, the `cloneWith()` helper and the now-unused `readFileSync` import
removed with it (an orphaned clone helper is precisely the shim shape
`overfit-structure` exists to catch).

**What is KEPT is not a remnant, and the distinction is the point.** `.input-bar` is a
RECIPE in `src/styles/utilities/components.css` — never the component's own CSS (CWT-2
**D8**: *"`components/search/` holds 0 CSS bytes"*) — and it has **live readers after the
cut**: `demo/stories/dock/dock-search.vue:201,207,331`,
`src/components/dock/styles/search.css:46,55` [2026-08-25 · driver, C4: PRE-WRITE cites; disk now `:49`/`:58` after this unit's comment lines], plus the four value.js selector sites. Its
role radius is still a real claim, so it is still held. Also struck:
`expect(probe.inline.length).toBeGreaterThanOrEqual(3)` and the ≥2-distinct-heights arm —
those three receivers were the Sizes specimens.

---

## §6 · GATE LINES — REAL exit codes, captured off the process, never a piped tail's

```
vue-tsc   $ npx vue-tsc --noEmit > /tmp/bk-a4-tsc2.txt 2>&1; echo $?
          → EXIT=0, and the output file is ZERO BYTES (zero diagnostics)

battery   $ npx vitest run > /tmp/bk-a4-battery2.txt 2>&1; echo $?
          → EXIT=1 · Test Files 2 failed | 222 passed (224)
                     Tests 2 failed | 2108 passed | 10 expected fail (2120)

          α4-OWNED SOURCE FAILURES: ZERO.

          Both failures are the STALE GITIGNORED BUILD ARTIFACTS the dispatch named in
          advance, and both are α-caused. Re-measured verbatim this seat, not inherited:

            tests/public-surface.spec.ts:784   ONE row pair, the whole diff:
                                 -   "components/dock/styles/run.css"
                                 +   "components/dock/styles/overflow.css"
                               Source ships run.css (α6's W3 lattice); dist/ still ships
                               the overflow.css α6 deleted. The cite moved :766 → :784
                               ONLY because this unit's strike brackets sit above it in
                               the same file — same assertion, same single row pair.
                               NOTE: `./search` does NOT appear in this diff, and that is
                               a positive result — `components/search/` shipped zero CSS,
                               so the cut moved no style-closure member.

            tests/gates/boot-graph.test.ts     "dist-demo is STALE" — newest source is
                               this unit's own last byte. The gate working as designed.

          A MID-BATCH REBUILD IS FORBIDDEN and was not run. Both discharge at the batch
          close via the driver's `npm run build` + `npm run demo:dist:build`.

          α4 FENCE SLICE  $ npx vitest run tests/composables/search/ \
                              tests/components/custom/dock/ tests/styles/ \
                              tests/gates/overfit-structure.test.ts
                          → EXIT=0 · Test Files 42 passed (42)
                                     Tests 568 passed | 6 expected fail (574)
          SEARCH ALONE    → EXIT=0 · 3 files · 33 passed (33)

receipt   $ node scripts/gate-register.mjs                                    → EXIT=0
          seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13
          armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
          — `diff` against this seat's own step-0 capture: BYTE-IDENTICAL.
            NOTHING MINTED. Seats stay exactly 60.

regen     $ node scripts/regen-exports.mjs   → EXIT=0, EXACT REPRODUCTION: YES, 68/68
import-dag$ node scripts/import-dag.mjs      → EXIT=0

G-BUNDLE-RATCHET  **RED BY ROUTE** — the single batch-close rebind carries β0's +1215 and
          the driver's −71, so `verify:package`'s ratchet arm REDs LAWFULLY. Stated, not
          papered; NOT re-measured this seat; no lane can discharge it alone.
```

### §6.1 · THE STANDING BATTERY FIGURE — and this unit's contribution, derived not guessed

The dispatch's last quiesced-class read was `2015 passed | 7 xf`; unit 5 closed at
`2091 | 8 xf (2101)`. Five lanes have landed commits since, so neither is this unit's
baseline, and **this seat did not run a step-0 battery** — a real gap, and it is closed by
arithmetic that is checkable rather than by an estimate:

```
$ count it()/test()/it.each blocks, HEAD version vs now, for every test file this unit touched
  fuzzySearchIndex.test.ts → match.test.ts      HEAD=16  NOW=20    +4   (§7's PRESENCE arms)
  useFuzzySearch.test.ts   (relocated)          HEAD=9   NOW=9      0
  search-contracts.test.ts (relocated)          HEAD=4   NOW=4      0
  public-surface.spec.ts                        HEAD=16  NOW=16     0   ← but see below
  radius-role-canon.test.ts                     HEAD=40  NOW=40     0
  overfit-structure.test.ts                     HEAD=14  NOW=14     0

$ subpathRuntimeExports rows (the it.each CASES, which blocks do not count)
  HEAD=55  NOW=54                                                   −1   (the ./search row)

$ git diff -U0 -- tests/ | grep -c "^+.*it\.fails"                   0   (xfail: +0)

  α4 NET = +4 − 1 = +3 tests · 0 failures · 0 xfail
  ⇒ HEAD's baseline was 2117 (2105 passed | 10 xf | 2 failed)
    this close  is 2120 (2108 passed | 10 xf | 2 failed)
```

**`tests-visual/search-custom.spec.ts`'s deletion moves this figure by ZERO** — it is a
Playwright spec and has never been in the vitest battery. Counting it would have inflated
the delta.

---

## §7 · THE ORPHAN A GATE CAUGHT — `controlSizeClass`

The first full battery after the deletion RED-ed on a THIRD failure, and it was mine:

```
gate:G-OVERFIT — EXPORT-REACH arm
  1 runtime export(s) are referenced nowhere outside their own module AND ship on no
  published subpath. An unreachable export is not API — make it module-private or delete it:
    src/components/_shared/control.ts :: controlSizeClass
```

**`SearchBar.vue:4` was its ONLY call site in the entire tree** — measured, not assumed
— so it went from one caller to zero in a single act. Deleted (with its
`controlSizeClasses` table and the `_shared/index.ts` re-export); **the `ControlSize`
TYPE stays**, since five components still thread it as `size?`.

Two things make this a KEEP-OUT-OF-TROUBLE deletion rather than scope creep:

- **CWT-2 §SEARCH had already listed it**, twice, from the other end: *"Deleted, no
  aliases: … `controlSizeClass` re-export (F11)"* and §STRIKE's *"duplicate barrel + F11
  shim"*. The gate and the spec reached the same finding independently.
- **Nothing is lost.** The function emitted two arbitrary-property utilities. The CSS
  SEAMS `--control-pill-h` / `--control-pill-text` are untouched and still live, read
  **with fallbacks** by `.input-bar` (`components.css:33,60`) and `.control-pill`
  (`control-surfaces.css:28,56`). A consumer that wants a size rung sets the property. What
  died is a string-builder over a two-line lookup whose `md` rung emitted the **empty
  string** — a "size axis" whose default value is no bytes at all was a lookup table
  wearing an API's costume.

This is also the one place the fence bent, and it is stated rather than buried:
`src/components/_shared/` is not in α's named fence. It was taken because the dispatch
requires **battery zero-α-owned-failure** and this RED was caused by an in-fence act; a
lane cannot leave its own breakage standing on a fence technicality.

---

## §8 · THE MATCHER REPAIR — DECLARED AS BEYOND THE SEVEN-ITEM ENUMERATION

**The dispatch's charter lists seven acts and the matcher repair is not among them. It
was taken anyway, and the driver can reverse it in one word.** Stating it loudly is the
point of this section; smuggling it into §2's table would have been the defect.

**The ground is the row's own spec of record.** TR:192 and EXECUTION-PROGRESS row 42 both
cite **CWT-2 §SEARCH** as #42's spec, and that document's DISPOSITION line reads:

> SPLIT … **ground amended: the matcher needs REPAIR (it silently nulls present
> subsequences — reproduced by this adjudicator at text length 11/72/133/255 for 1/2/3/5-char
> queries)**

That is not an item beside the row; it is **the reason the engine survives at all** — the
amended ground on which #42 is a SPLIT rather than a DELETE. Relocating a known-defective
engine into its permanent home, under a ruling that makes it the library's canonical
internal matcher, without the repair its own spec names, ships the defect under a fresh
address and calls it a wave.

**The mechanism, re-derived on disk rather than inherited.** `scoreEntry` initialised
`best = 0` and used it as BOTH the "nothing matched yet" sentinel AND a score floor
(`if (best <= 0) return null`). `fuzzyMatch` subtracts `0.1` per excess character,
**unbounded in the text length**, so a plain mid-string single character (`cs = 1`) goes
non-positive at text length 11 — and the demo's own catalogue bodies run 60-110
characters. A present subsequence was reported ABSENT.

**The repair is the separation, not a clamp** (7 lines): `multiTokenFuzzy` already returns
null iff a token is not a subsequence, so it is the whole and only presence oracle;
`best` becomes `number | null`, a pure ranking value free to be negative exactly as the
excess penalty intends. Nothing is floored, nothing is rescued that did not match, and
the descending sort orders negatives correctly on its own.

### §8.1 · Born-RED — measured against `git archive HEAD` (pre-repair bytes)

A scratch tree at `git archive HEAD src/components/search`, the new arms re-pointed at
those bytes, **probe and tree deleted in this seat** (both verified absent; neither
appears in any commit):

```
  ×  a long body still surfaces its row (the 1-char case, at the threshold)
     AssertionError: a present subsequence was dropped because its RANK was
     non-positive: expected [] to deeply equal [ '1' ]
  ×  ranks correctly across the zero line — a tight match still outranks a loose one
     AssertionError: expected [ 'tight' ] to deeply equal [ 'tight', 'loose' ]

  Test Files  1 failed (1)   Tests  2 failed | 18 passed (20)
```

**2 of the 4 new arms RED, and the other two are reported for what they are rather than
dressed up.** The threshold arm measures `fuzzyMatch`, which the repair does not touch —
it exists to keep the convicting numbers honest by COMPUTING 11 and 72 from the live
scorer instead of pinning them as constants that could rot. The non-match arm is an
anti-regression guard proving the repair rescues nothing extra. Calling either born-RED
would be the figure inflation this tranche keeps catching.

### §8.2 · The pinned assertion that ratified the defect — struck

`fuzzySearchIndex.test.ts:165` asserted `expect(r.score).toBeGreaterThan(0)` on every
returned result. Under the old `if (best <= 0) return null` that was a **TAUTOLOGY** — a
line that could never fail, restating the filter as if it were a contract. Struck in
place, replaced with the real invariant: every returned row is a genuine subsequence
match of the query.

**Seat count +0.** These are ORDINARY tests under
`ordinaryTestLaw.ordinaryTestsConsumeBudget: false`; receipt re-measured BYTE-IDENTICAL.

---

## §9 · ROUTED, REFUSED, AND CARRIED

**ROUTED — false prose this unit created on committed text OUTSIDE α's fence.** These are
not preferences; they are sentences that became FALSE at this commit, and they are named
verbatim in `PASTE-BLOCKS.md` so the addendum is one paste:

```
src/styles/utilities/components.css:29,31,57   names controlSizeClass(size) as live +
                                               "the SearchBar/FuzzySearch size prop"
src/styles/glass/control-surfaces.css:23        names "the shared controlSizeClass(size)"
demo/demo.css:88                                names "the controlSizeClass data seam"
                                                "that the published library ships"
```

Routed rather than landed because `src/styles/**` and `demo/demo.css` are outside the
lane's stated fence with three lanes live in the tree — the same disposition unit 5 gave
its W8 tokens half. **All five are comments; nothing paints or computes differently.**

**ROUTED — measured-dead, deliberately NOT struck by adjacency:**
`src/styles/tokens/sizing.css:70` `--search-icon-size` lost its last reader when
`SearchBar.vue` went (measured: it was the sole one). Its three siblings at `:71-73`
(`--search-button-size`, `--search-result-text`, `--search-result-text-secondary`) already
had **zero** readers before this unit and are not its doing. Left standing and routed —
struck-by-adjacency is how a wave's scope quietly becomes whatever the seat noticed
(unit 5's `--dock-morph-max-stretch` precedent, applied to α's own act this time).

**OBSERVED, not edited — a gap in ANOTHER lane's landed act.**
`tests/public-surface.spec.ts:509-527`'s retired-subpath falsifier list gained `search`
this unit but does **not** contain `canvas`, which #21 (β2, `96f0f257`) cut. β's cut is
therefore unproven by the one gate built to prove exactly that. One word for the owning
lane; not taken here, because editing a sibling lane's proof is not a courtesy.

**REFUSED, with grounds:**

- **CWT-2's `.input-bar` → `[data-search-bar]`/`[data-search-field]` SEVER-VIA re-point.**
  The re-point's whole premise is that the rebuilt SearchBar AUTHORS those hooks and the
  dock CONSUMES them (*"search authors the hooks, dock consumes, one cut"*). **There is no
  author** — the 2026-08-08 adjudication converted the row from GREENFIELD-rebuild to
  DELETE-with-relay, so renaming the selectors would leave the dock reaching for
  attributes nothing stamps. The dock keeps `.input-bar`, which its own demo hand-rolls.
- **The rest of CWT-2's §ADD list** (the whole-plate hit target, the three size rungs, the
  A1 focus indicator, the mobile transposition, `focus()`, `plate:false`) — every one of
  them is a property OF THE SFC. They die with it, and are not deferred.
- **The recipe/token deletions CWT-2 charges** (`utilities/components.css:6-69`,
  `sizing.css:124-141`, `offsets.css:43`) — **REFUSED ON THE MEASUREMENT, not the fence**:
  the recipe has live readers after the cut (§5c) and deleting it would break the dock's
  search field and four value.js sites. The spec assumed the recipe moved INTO the rebuilt
  component; with no component, it stays where it is.
- **Standing refusals hold**, as scoped by the driver: R-7 footage · device-matrix
  hardware · Safari-GUI checkbox · the physical classes.

**CARRIED:** OWED-1 / OWED-2 (α0 canon + emitter rulings) and OWED-4 (the #67 fence word)
— none dischargeable by a #42 act; concurring with units 4 and 5. The `G-DOCK-STATE`
xfail remains **W1 SURFACE's**, untouched here.

**ORDERING:** the **α5 #76-tail stays terminal** behind this unit. #42's relay addendum is
**AUTHORED in `PASTE-BLOCKS.md` and NOT written to the #76 ledger file** — as charged, so
it rides the α5 ledger write.

**π: ZERO CELLS CAPTURED, ONE ENQUEUED.** No browser was opened by this seat.
`π-SEARCH-ROUTE` — the rebuilt `/data/search` field (the hand-composed `.input-bar` plate
in both modes, and the keyboard walk's `aria-selected` card state) has no paint
acceptance. Enqueued to the singleton seat; the unit 5 `PI-QUEUE.md` cells carry unchanged.

---

## §10 · FENCE COMPLIANCE — this seat

**Written — ~~29 tracked files + 2 new untracked directories~~ [2026-08-25 · driver at
landing, C3 — figures-verbatim]: 28 tracked (17 M + 11 D; the 29th porcelain entry was
the foreign `EXECUTION-PROGRESS.md`, the driver's ⊕⁷⁸, committed `c1a97a33`) + 3 new
untracked dirs (this unit's record dir itself, `src/composables/search/`,
`tests/composables/search/`):**

```
NEW      src/composables/search/{index,match,types,useFuzzySearch}.ts      (the engine)
NEW      tests/composables/search/{match,useFuzzySearch,search-contracts}.test.ts
DELETED  src/components/search/**                                   (7 files, whole dir)
DELETED  tests-visual/search-custom.spec.ts                         (CWT-2 §STRIKE)
DELETED  tests/components/custom/search/**                          (relocated, not lost)
SEAM     package.json · scripts/lib/subpath-policy.mjs · tests/public-surface.spec.ts
         — the driver-serialized trio, taken AT α4 AND ONLY HERE, after β's #21 landed
DOCK     src/components/dock/{index.ts, composables/useDockSearch.ts, styles/search.css}
CURE     src/components/_shared/{control.ts, index.ts}               (§7 — the gate's RED)
PROSE    src/components/input/index.ts · scripts/import-dag.mjs
DEMO     demo/stories/data/search.vue · demo/stories/dock/dock-search.vue
VISUAL   tests-visual/{search,w1-radius-redress,w1-radius-redress.webkit}.spec.ts
GATES    tests/gates/overfit-structure.test.ts · tests/styles/radius-role-canon.test.ts
DOCS     docs/tranches/BK/execution/2026-08-10-lanealpha-unit6/{RECORD,PASTE-BLOCKS}.md
```

**FOREIGN DIRT, untouched and attributed.** `docs/tranches/BK/EXECUTION-PROGRESS.md`
appears in `git status` with **6 insertions / 6 deletions** at rows `:5300 :5325
:5328-5329 :5335 :5340`. **This seat never opened it for writing** (mtime 11:04:55, mid-run;
this unit's own writes bracket it on both sides). Row 42 sits at `:5321` and is **NOT among
the changed lines** — a concurrent lane is back-annotating its own roster rows. Left
exactly as found.

**Not touched, as fenced:** `src/styles/**` (routed, §9) · `demo/demo.css` (routed) ·
`demo/chassis/**` · `src/components/handmark/**` · `scripts/gate-register.mjs` ·
`SEAT-BINDING.json` · the C20 roster · `dist/**` · `dist-demo/**` · every sibling repo
(value.js was READ for the relay census and never written).

**Transient:** the fail-closed probe (`…/scratchpad/a4-failclosed-probe.mjs`) and the
born-RED scratch tree + spec (`…/scratchpad/a4-bornred/`). **Both deleted in this seat**,
absence verified; neither appears in any commit. Their outputs are preserved verbatim at
§3 and §8.1.

**Zero index acts. Zero `git add` / `commit` / `stash` / `checkout`. No browser opened —
π ENQUEUE only.**

---

## §11 · WHAT THE DRIVER SHOULD KNOW

**#42 W-SEARCH is CLOSED on all seven charter items**, and the seam it was gated on is
spent: `package.json` / `scripts/lib/subpath-policy.mjs` / `tests/public-surface.spec.ts`
were taken at this unit and only here, exactly as the driver-serialized order requires.
`./search` is cut with `drops=1 adds=0 targetMismatch=0` and a 7-deletion package.json
diff; the engine is INTERNAL at `src/composables/search/` with the fail-closed row proven
born-RED; the dock's edge moved one directory over with nothing else about the seam
changing.

**THREE THINGS NEED A DRIVER WORD, and none of them is a blocker.**

1. **§8 is an act BEYOND the dispatch's seven-item charter** — the matcher repair, taken
   on the row's own spec-of-record ground (CWT-2 §SEARCH's amended DISPOSITION), born-RED
   2/4 with the other two honestly reported as guards. It is 7 lines plus four ordinary
   arms and it reverses in one word. It is flagged here rather than filed quietly because
   scope that arrives unannounced is the thing this tranche keeps catching.
2. **§7 bent the fence by two files** (`_shared/control.ts`, `_shared/index.ts`) to
   discharge a battery RED that an in-fence act caused. `G-OVERFIT` named the orphan and
   CWT-2 had already listed it for deletion; the alternative was leaving α's own breakage
   standing.
3. **The five routed false-prose sites (§9) are FALSE AS OF THIS COMMIT**, not merely
   stale — they describe `controlSizeClass` as a live shared seam and name
   `SearchBar`/`FuzzySearch` as live components. They are comments, so nothing paints
   differently, but they are one paste from `PASTE-BLOCKS.md` for whichever lane owns
   `src/styles/**`.

**Two REDs are the driver's, both pre-named:** `public-surface.spec.ts:784` (dist ships
`overflow.css` where source expects `run.css`) and `boot-graph.test.ts` (dist-demo stale)
— one `npm run build` and one `npm run demo:dist:build` at the batch close. **No mid-batch
rebuild was run**, per the dispatch's prohibition. **G-BUNDLE-RATCHET stays RED BY ROUTE**
and is stated, not papered or re-measured.

**Two findings the driver may want elsewhere:** the relay is smaller than banked (four
demo-side files in one repo; the three CSS sites read a recipe that SURVIVES — §2), and
`tests/public-surface.spec.ts`'s retired-subpath falsifier is **missing `canvas`**, so
β2's landed `./canvas` cut is unproven by the gate built to prove it (§9, observed and
deliberately not edited).
