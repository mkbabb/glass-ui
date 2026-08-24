# LANE α — UNIT 4 (α5 resume) · RECORD

**SCOPE AS DISPATCHED:** the CURE+COMPLETION seat for unit-4 — finish the W1 atomic act
(adjudicated `CURE-REQUIRED`, run `wf_3baa8b1f-057`), then Acts 2 (#76-tail) and 3 (#22 cure-cut).
**SEAT:** implement · `modelId: claude-opus-5` (asserted at open from the on-disk seat transcript;
the assertion **gated** this chain — see §1).
**TREE:** SHARED. Zero `git add` / `commit` / `stash` / `checkout` by this seat. The driver commits.
**BASE:** `8323c9b7`. **DATE:** 2026-08-10.

**The #7 fence, cited as the lane requires it in every wave record:**
`src/components/dock/styles/morph.css:67-76` — *"NO FILTER ON AN ANCESTOR OF A LENS — the #47
(GF-DOCK) fence… makes that ancestor a BACKDROP ROOT: the lens beneath samples IT instead of the
page and the glass goes flat."* Re-read on disk this seat. Nothing here adds a filter to any lens
ancestor: the cure's whole source delta is one prop default.

**THE ONE-LINE VERDICT.** The half-state is closed — both α-owned seats are green on real exit
codes — and the cure found that the adjudicator's stated cause was a **symptom**: the Escape
handler was already correct, and the reason `.dock-layer--full` never went `inert` is that
**every unprop'd `<GlassDock>` in the library was silently force-pinned** by Vue's boolean-prop
casting. Acts 2 and 3 are **routed to α6 on ratified-ordering grounds, not on unit size** (§6).

---

## §1 · THE MODEL ASSERTION — the named defect, and this seat's replacement

**THE DEFECT (executor `agent-ae1ba756ff368c9a3`, row 5).** The prior executor's assertion was

```sh
test "${CLAUDE_MODEL_ID:-claude-opus-5[1m]}" != ""
```

which is **true for every model that has ever run**, on two independent counts: the `:-` fallback
substitutes the desired answer whenever the variable is unset, and `!= ""` then compares that
answer against emptiness rather than against the required pattern. Form failed; substance held by
luck (the executor *was* genuine `claude-opus-5`, confirmed by the adjudicator).

**THE AGGRAVATING FACT, measured this seat.** `CLAUDE_MODEL_ID` **is not set at all** in this
harness — `env | grep -i claude` lists nine `CLAUDE_*` variables and that is not among them, and a
bare `case "$CLAUDE_MODEL_ID"` at seat open printed `MODEL-ASSERT FAIL: []` and exited 42. So the
fallback was not a defensive nicety that happened to be unnecessary: it was **load-bearing and
guaranteed to fire**. Any `${CLAUDE_MODEL_ID:-…}` form in this repo's seats is a tautology by
construction, and any future seat that writes one is asserting nothing.

**THIS SEAT'S PREDICATE — fallback-free, sourced, and gating.** The model id is *derived* from the
seat's own on-disk transcript (the file that carries this dispatch's unique marker), never
defaulted; the chain is gated by `&&` and refuses with a non-zero exit otherwise:

```sh
MODEL_ID="$(python3 - <<'EOF'
… scan .../subagents/**/agent-*.jsonl for the file containing this dispatch's marker,
… emit that transcript's last `message.model`; emit NOTHING if no such file exists
EOF
)"
test -n "$MODEL_ID" && case "$MODEL_ID" in
  claude-opus-5*) echo "MODEL-ASSERT PASS  id=$MODEL_ID  (source: on-disk seat transcript, no fallback)";;
  *) echo "MODEL-ASSERT FAIL id=$MODEL_ID -> REFUSE"; exit 42;;
esac && echo "GATE OPEN — chain proceeds" && …
```

Observed: `MODEL-ASSERT PASS  id=claude-opus-5  (source: on-disk seat transcript, no fallback)`.
It fails closed three ways — absent transcript → empty → `test -n` fails; wrong model → `case`
falls through → exit 42; either way the `&&` chain never reaches the first repo act.

*(The transcript records the id as `claude-opus-5`; the system prompt states `claude-opus-5[1m]`.
The `[1m]` is the context-window variant suffix. Both satisfy `claude-opus-5*`; the datum used is
the on-disk one, because that is the one this seat did not author.)*

---

## §2 · CURE 1 — `dock-name-canon` rule 6

**The defect.** `tests/styles/dock-name-canon.test.ts` rule 6 still required the `.layout-grid`
qualifier that the W1 `layout`-prop strike had removed from `layer-group.css`, so the committed
gate contradicted the committed CSS.

**The acts** — three, all in the test file:

| # | site | act |
|---|---|---|
| 1 | `:177` | dropped `:not\(\.layout-grid\)` from the row-arm regex, so it matches the post-strike arm `:is(.glass-dock, .dock-layer-group):not(.vertical) .dock-hairline` (`layer-group.css:118`) |
| 2 | `:190-192` | **DELETED** the grid-arm assertion (`.glass-dock.layout-grid .dock-separator { … grid-column: 1 / -1 }`) — dead by construction, no `.layout-grid` root can exist post-W1, so it can never green |
| 3 | `:165-168` | truthed the title (*"in all three layouts"* → *"in both layouts"*) and the comment that still taught a grid dock, under a dated `[2026-08-12 · BK #47 W1 SURFACE]` strike bracket |

Act 3 is not decoration: leaving prose that asserts a third layout would re-teach exactly the
thing the strike removed, in the file a reader consults to learn the hairline contract.

**Gate line — real exit code, no pipe:**

```
$ npx vitest run tests/styles/dock-name-canon.test.ts
 Test Files  1 passed (1)
      Tests  7 passed (7)
SEAT1 EXIT=0
```

---

## §3 · CURE 2 — the Escape→collapse disclosure path

### §3a · The adjudicator's stated cause was a symptom — measured, not argued

The order read: *finish the Escape→collapse path in `GlassDock.vue` (~:206-226) so
`.dock-layer--full` gains `inert`.* **Read on disk, that handler is already complete and already
correct** — it calls `collapse()`, awaits a tick, and seats focus on the summary; and the `inert`
binding it feeds (`GlassDock.vue:438`) is likewise correct. Rather than "finish" code that was
finished, this seat instrumented a throwaway probe (mount → dump every layer's `inert` + the root
classes → delete the probe) and found the actual cause one level up:

```
PROBE props={}                    | root=… expanded pinned always-expanded | full.inert=undefined
PROBE props={"collapse":"closed"} | root=… collapsed                       | full.inert=""
PROBE props={"collapse":"open"}   | root=… expanded                        | full.inert=undefined
PROBE props={"collapse":false}    | root=… expanded pinned always-expanded | full.inert=undefined
```

**`props={}` was byte-identical to `props={collapse:false}`** — the force-pinned pole. Escape could
never collapse the dock because the dock was constitutionally incapable of collapsing.

### §3b · The root cause — Vue boolean-prop casting ate the documented default

`DockCollapse` is `false | "closed" | "open"`. Because the union admits `false`, the macro compiles
the prop to `type: [Boolean, String]`, and Vue's `resolvePropValue` casts an **absent** prop of a
Boolean-including type to `false`:

```js
if (opt[BooleanFlags.shouldCast]) { if (isAbsent && !hasDefault) value = false; … }
```

`GlassDock.vue`'s `withDefaults` declared only `backdropMode`, so `hasDefault` was false for
`collapse` and **every dock that omitted the prop mounted force-pinned**. The documented `"closed"`
default was real but unreachable: it lives at the composable's `?? "closed"` read site, and
`useDockShellProps` is *called with a plain object*, which never passes through prop resolution.
That is precisely why the four `useDockShellProps` unit tests — including one literally named
``defaults to `"closed"`{:.no-op}`` — stayed **green while the shipped component did the opposite**. A
composable-seat test cannot see this class of defect; only a mounted component can.

### §3c · The acts

**SOURCE (1 act, the cure):** `src/components/dock/GlassDock.vue` — `collapse: "closed"` added to
`withDefaults`, with a dated `[2026-08-10 · BK #47 W1 CURE]` block recording the cast, why the
composable seat could not catch it, and why declaring the default defeats the cast on both branches
(`hasDefault` short-circuits the absent-branch; `"closed"` is neither `""` nor `"collapse"`, so the
cast-**true** branch cannot fire either). No masking, no fallback, no test weakening.

**FIXTURES (4 acts, strengthening):** the four Escape cases in `GlassDock.posture.test.ts` now state
`collapse: "open"` instead of `{}`. Escape→collapse requires a dock that is **expanded AND
collapsible**, which is exactly one pole of the member — and `{}` cannot express a precondition
under *any* correct default (`"closed"` mounts collapsed; there is nothing to dismiss). Under the
force-pinned reading three RED-ed, and the fourth — *"leaves the dock expanded"* — was
**FALSE-GREEN**: a pinned dock trivially stays expanded, proving nothing about the
dismissable-layer veto it names. Stating the precondition removes a false green as well as three
false reds; the assertions themselves are untouched.

**FALSIFIER (0 new tests):** the boolean-cast trap is now asserted at the *mounted* seat, folded
into the existing `keeps the six survivors observable on the root` test so the file's count stays
**19**: an unprop'd dock must wear `collapsed` and must **not** wear `always-expanded` / `pinned`.
Drop `collapse: "closed"` from `withDefaults` and it flips. This is the assertion whose absence let
the defect ship.

**Gate line — real exit code, no pipe:**

```
$ npx vitest run tests/components/custom/dock/GlassDock.posture.test.ts
 Test Files  1 passed (1)
      Tests  19 passed (19)
SEAT2 EXIT=0
```

### §3d · Blast radius — censused per tag, not assumed

Every `<GlassDock>` tag in `src/` + `demo/` was censused for a `collapse` binding — corrected
by the verify challenger 2026-08-24: **37** tag matches, of which **3** are inside comments
(`dock-search.vue:14`'s struck prose, `overview.tile.vue:3`'s narrative, and
`dark-mode-toggle.vue:4`'s prose mention this census misread as a tag), leaving **34** real
tags, **4** bare — ~~38 / 2 / 36 / six~~. The tests/ root was not censused by this seat; the
challenger enumerated six bare `mount(GlassDock)` seats there (backdrop-mode ×2,
scroll-overflow ×4), all green post-cure — assertions posture-independent, benign. The split is
clean, and a `#collapsed` slot is the discriminator:

| site | `#collapsed`? | disposition |
|---|---|---|
| `demo/stories/dock/overview.vue:465` (`dock-capture`) | yes | **left bare — the restored default is its intent.** Its own comment says it *"morphs RELIABLY (collapsed→expanded ~490px)"*; force-pinned, this items-lag capture harness was measuring a dock that could not morph |
| `demo/stories/dock/overview.vue:523` (`dock-tap-capture`) | yes | left bare — wants the collapsed gear-SUMMARY it describes |
| `demo/stories/dock/overview.vue:625` | yes | left bare — its `#collapsed` face mirrors the Play/Pause state |
| `demo/stories/dock/layers.vue:209` (`dock-nested-collapsible`) | yes | left bare — prose says *"Hover to expand"*; force-pinned, the story contradicted its own heading, its slot, and its testid |
| `demo/stories/dock/overview.tile.vue:13` | **no** | **RE-POINTED to `:collapse="false"`** — a REST vignette with no collapsed face would mount as an empty pill and the landing tile would show no controls. It read as expanded before only *by accident* of the cast |
| ~~`demo/stories/display/dark-mode-toggle.vue:4`~~ | — | **ROW FALSE — struck by the verify challenger 2026-08-24:** `:4` is a prose comment, not a tag; the file's one real tag at `:55` already reads `:collapse="false"` (α's own W1 SURFACE hunk, mtime 08-12 12:22). Nothing owed |

Four of the six bare sites were **already broken** by the cast and are fixed by the cure alone.

---

## §4 · CLOSE-OF-ACT GATE LINES — real exit codes

```
vue-tsc          $ npx vue-tsc --noEmit                → VUE-TSC EXIT=0   (zero diagnostics)

dock seat 1      $ npx vitest run tests/styles/dock-name-canon.test.ts
                   Test Files 1 passed (1) · Tests 7 passed (7)          → EXIT 0
dock seat 2      $ npx vitest run tests/components/custom/dock/GlassDock.posture.test.ts
                   Test Files 1 passed (1) · Tests 19 passed (19)        → EXIT 0

battery          $ npx vitest run
                   Test Files 2 failed | 225 passed (227)
                   Tests 3 failed | 2011 passed | 7 expected fail (2021) → BATTERY EXIT=1

receipt          $ node scripts/gate-register.mjs                        → RECEIPT EXIT=0
                   seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11
                   bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
                   — BYTE-IDENTICAL to the handed receipt. Nothing minted.
```

**The battery figure, RESTATED with the acts that moved it.** Challenger B measured
`2009 passed | 7 xf` at 227 files pre-cure. This seat measures `2011 passed | 3 failed | 7 xf`.
The **total is invariant at 2021** across both runs, which is itself the proof that this seat
minted no test and struck none (rule 6's deleted *assertion* was never a test, and the four added
falsifier assertions ride an existing one):

```
  +4 passed   THIS SEAT'S CURES     dock-name-canon rule 6 (+1) · posture Escape trio (+3)
  −2 passed   FOREIGN, not this seat  tests/demo/router-field-ownership.test.ts (2)
  ─────────
  +2 passed net;  failures 5 → 3
```

**ZERO α-owned failures remain.** The three that stand are both foreign to this lane:

1. `tests/gates/boot-graph.test.ts` — dist-demo staleness. **NOT-α, batch-close, driver's**, exactly
   as the verdict routes it: *"built 2026-08-12T16:15:32Z, newest source 2026-08-24T15:19:02Z — run
   `npm run demo:dist:build`"*. Unchanged by this seat; curing it would bake four lanes' in-flight
   source into a committed artifact.
2. `tests/demo/router-field-ownership.test.ts` ×2 — **NEW foreign breakage, and the driver needs it
   before the batch commits.** See §5.

**G-BUNDLE-RATCHET — RED BY ROUTE, direction stated, not papered.** It is red because the ratchet's
floor is rebound at the single batch close, not because bytes grew: the live direction is a
**25,763-byte SHRINK** (2,607,590 < 2,633,353, Challenger B's run). Not re-measured this seat, and
that is disclosed rather than papered — this seat's entire source delta is one prop default plus
comments, which cannot move the direction. No lane can discharge it alone.

---

## §5 · FOREIGN BREAKAGE FOUND — a cross-lane hazard the driver must clear before committing

`tests/demo/router-field-ownership.test.ts` fails 2/2 with
`TypeError: Cannot read properties of undefined (reading 'value')` at `:13:33` and `:29:33`.
**It is not this seat's, and it is not stale — it is live, uncommitted, cross-lane dirt:**

```
$ git show HEAD:demo/router.ts | grep -c shellFieldActive   → 1     (committed: exported)
$ grep -c shellFieldActive demo/router.ts                   → 0     (working tree: gone)
$ git diff --stat -- demo/router.ts                         → 1 file changed, 11 deletions(-)
$ git diff -- demo/router.ts | grep '^-.*export'            → -export const shellFieldActive = computed(
```

Some concurrent lane deleted `export const shellFieldActive` from `demo/router.ts` in the working
tree without re-pointing its consumer test. `demo/router.ts` is outside Lane α's fence and this seat
did not touch it. Whoever owns that deletion owes either the export's restoration or the test's
re-point **before the batch commits**, or the tree lands a red battery under a green claim.

~~Second, held for β2 (`demo/stories/display/dark-mode-toggle.vue:4`, foreign to α)…~~ —
**PHANTOM HAZARD, struck by the verify challenger 2026-08-24**: `:4` is prose, not a tag; the
file's one real `<GlassDock>` at `:55` already carries `:collapse="false"` inside α's own
`[2026-08-12 · BK #47 W1 SURFACE]` hunk (β's record independently attributes the file to α's
W1, untouched by β). Nothing is held for β2; nothing is owed.

---

## §6 · ACTS 2 AND 3 — ROUTED TO α6, WITH GROUNDS

The dispatch permitted routing *"if unit size GENUINELY forbids finishing both"*, and required the
routing note to exist. **The note exists, and the grounds are stronger than size: both acts are
blocked by the ratified ordering the dispatch itself names as the authority.** Unit size was not
reached and is not the reason.

### ACT 3 (#22 cure-cut) — OUT OF THE BATCH'S ROW SCOPE, per the ratified text

The dispatch said *"the #22 cure-cut per the ratified lane text."* Read at
`wf_8139c708-c24`, **`#22` does not appear in Lane α's text, nor in β's, γ's, or δ's** — all four
lanes are `has#22=False`. Its only occurrences are in the serialized browser band and the batch
refusals, where the ratified plan states the opposite of the order:

> *"#22 remains CURE-CUT un-landed … (**#22 itself is outside this batch's row scope**)"*
> *"#32 TABS π RE-RUN — the T-C trigger reads 'after #22's F-1/F-3/F-4' … the rows queue at the seat
> and fire the moment #22 lands"*

and `EXECUTION-PROGRESS.md:1663,1781` records **"#22 is IN-FLIGHT at its cure"** — i.e. it is
already under another hand. Executing it here would be an out-of-fence act on a row this batch
excluded, against a surface a sibling is mid-cure on, while other lanes' π cells are keyed to its
landing. **Refused on scope; not deferred for convenience.**

### ACT 2 (#76-tail) — PRECONDITIONS UNMET ON TWO INDEPENDENT COUNTS

Lane α's own text makes α5 **terminal**:

> *"(α5) #76 remaining payload as lane tail (clampLabel · dock first-tap · LabeledField ·
> TooltipContent mono · /deck seventh-carry · BEAD census · consumer-evidence truth-up per ⊕⁷⁵'s
> not-claimed list) — **terminal so the dock/tooltip bytes land post-rewrite**; **#42's relay
> addendum rides the same ledger write**."*

Both stated preconditions are unmet on disk:

1. **The rewrite has not happened.** α5 follows α3 = #47 **W1–W9**. Unit 3 refused W2–W9 on fence
   (measured, banked in its record) and landed only dead-by-construction acts; unit 4 is finishing
   **W1's** prop cut. Landing the #76 dock/tooltip bytes now would put them *before* the rewrite
   they are ordered to follow — the reversal class the lane text warns about by name for α4
   (*"do NOT repeat the ⊕⁵⁵ reversal-class error"*).
2. **#42 has not landed, so the ledger write it rides cannot exist.** The DAG edge is
   `#42 on #47` (`EXECUTION-PROGRESS.md:1663,1780`) and the adjudicator's own CARRIED line reads
   *"α4 (#42) stays gated on β2"*. There is no #42 relay addendum to ride the same write.

Proceeding would produce a *second* half-state of exactly the kind this seat was convened to close.

### BANKED FOR α6 — the read-only half, done now so α6 opens with evidence

A census writes no bytes to the ordered surfaces and does not depend on the rewrite, so the
cheap-to-stale part is banked here rather than re-derived later:

```
clampLabel        ALREADY RETIRED. One live mention in src/+demo/ (excluding tranche archives):
                  src/components/dock/DockTrigger.vue:27 — "the retired `clampLabel` prop's".
                  Zero bindings, zero prop declarations. α6's item is a PROSE truth-up, not a cut.
LabeledField      src/components/labeled-field/{LabeledInput,LabeledSlider,LabeledSwitch}.vue
                  + index.ts + README.md; consumers include Slider.vue,
                  ConfiguratorRow.vue, tokens/dark-arm.css. Family intact, nothing struck.
TooltipContent    src/components/tooltip/{Tooltip,TooltipContent,TooltipProvider,TooltipTrigger}.vue
                  — zero `mono` hits in the partial today; the mono carry is UNSTARTED.
BEAD              src/components/_shared/feedback/DotRing.vue:30,40 (BEAD_SEATS, 7 seats)
                  + dot-ring.css:51,185. Confined to the DotRing primitive — NOT a dock surface,
                  which is why it can be censused independently of the dock rewrite.
dock first-tap    lives in useDockClickIntegrity.ts + useDockTouchGate.ts — BOTH in the #47 rewrite's
                  path, so this item is genuinely order-bound and cannot be banked ahead.
/deck 7th-carry   consumer-side (slides); no glass-ui surface to census at this HEAD.
```

**ROUTED TO α6:** Act 2 in full (after #47 W2–W9 and #42 land, per the lane's own ordering), Act 3
not at all — it returns to the driver as out-of-scope for this batch and in-flight elsewhere.

---

## §7 · FENCE COMPLIANCE

**Written (6 files, all in fence):**

```
src/components/dock/GlassDock.vue                              the one source cure + dated bracket
tests/styles/dock-name-canon.test.ts                           rule 6 (regex · assertion · prose)
tests/components/custom/dock/GlassDock.posture.test.ts         4 fixture preconditions + falsifier
demo/stories/dock/overview.tile.vue                            :collapse="false" + dated bracket
docs/tranches/BK/execution/2026-08-10-lanealpha-unit4/RECORD.md        this file
docs/tranches/BK/execution/2026-08-10-lanealpha-unit4/PASTE-BLOCKS.md
```

**Not touched, as fenced:** `blob.vue` · `gl-excise.test` · `DESIGN-NOW` · `lanegamma-unit3` (γ2's)
· `import-dag.mjs` · `BottomDock.vue` / `SidebarDock.vue` / `dark-mode-toggle.vue` / `progress.vue`
(β2 candidates — **censused only**, §3d/§5) · `EXECUTION-PROGRESS.md` (committed at `47aad936`) ·
`demo/router.ts` (foreign; §5). No index acts. No browser opened — π **ENQUEUE only**. Zero
`git add`/`commit`/`stash`/`checkout`.

**Transient:** one throwaway probe spec (`tests/components/custom/dock/__scratch-inert.test.ts`)
was created to measure §3a and **deleted in the same seat**; verified absent
(`ls … | grep -c scratch` → `0`). It appears in no commit.

---

## §8 · π CELLS — ENQUEUED, NOT CLAIMED

No browser opened this seat; no capture claimed. One cell is newly **owed by this cure**, and it is
the honest consequence of §3b — the default's paint changed for real:

```
π-DEFAULT-POSTURE   an unprop'd <GlassDock> now mounts COLLAPSED (documented "closed"), where it
                    previously painted force-pinned-expanded. Owner-paint acceptance owed on the
                    four bare in-fence sites that keep the default:
                      /dock/overview  — dock-capture · dock-tap-capture · the DockBackgroundToggle tile
                      /dock/layers    — dock-nested-collapsible ("Hover to expand")
                    plus the re-pointed /dock landing tile (overview.tile.vue) which must still read
                    as a four-control dock at rest.
                    Chromium 149 @1440×900 · 393×852 dpr3; light AND dark arms.
```

---

## §9 · WHAT THE DRIVER SHOULD KNOW IN ONE PARAGRAPH

The W1 atomic act is whole: both α-owned seats green on real exit codes, `vue-tsc` 0, receipt
byte-identical at `rosterSha256:282d05cf violations:0`, battery carrying zero α-owned failures. The
cure turned out to be a genuine shipped defect rather than an unfinished handler — **every
`<GlassDock>` that omitted `collapse` was force-pinned by Vue's boolean casting**, which silently
disabled two capture harnesses and one story that advertises the collapse it could not perform.
Two things need the driver rather than a lane: `demo/router.ts` has lost its `shellFieldActive`
export under a concurrent hand and is failing 2 tests (§5), and `dark-mode-toggle.vue` needs the
same one-line re-point β2 owns (§3d). Acts 2 and 3 are routed to α6 with grounds (§6): #22 is
outside this batch's row scope by the ratified plan's own words and in-flight elsewhere, and the
#76-tail is terminal behind a rewrite and a #42 ledger write that have not landed.
