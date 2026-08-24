# LANE α — UNIT 4 (α5 resume) · PASTE-BLOCKS

Literal blocks for the driver. `⊕ⁿ` and `<SHA>` are placeholders the driver fills at the batch
close; nothing here is pre-numbered.

---

## 1 · COMMIT MESSAGE

```
fix(dock): cure the collapse-prop default Vue's boolean casting was eating — the W1 atomic act, whole (BK #47 W1)

The half-state closes, and the cure is a shipped defect rather than the unfinished
handler it looked like. Escape never made the full face inert because the dock could
not collapse at all: `DockCollapse` is `false | "closed" | "open"`, so the macro
compiles the prop to type [Boolean, String], and Vue casts an ABSENT prop of a
Boolean-including type to `false` -- the force-pinned pole. GlassDock's withDefaults
declared only backdropMode, so every dock in the library that omitted `collapse`
mounted always-expanded. Measured, not argued: props={} rendered byte-identical to
props={collapse:false} (root `expanded pinned always-expanded`, full face never
inert), while collapse:"closed" and collapse:"open" rendered correctly.

The documented default was real but unreachable. It lives at useDockShellProps'
`?? "closed"` read site, and that composable is called with a plain object, which
never goes through prop resolution -- which is exactly why four unit tests, one of
them named `defaults to "closed"`, stayed green while the shipped component did the
opposite. A composable-seat test cannot see this class of defect; only a mounted one
can. The falsifier now rides the existing six-survivors test at the mounted seat, so
the posture file's count is unchanged at 19: an unprop'd dock must wear `collapsed`
and must not wear `always-expanded` or `pinned`.

Source delta is one line -- `collapse: "closed"` in withDefaults -- under a dated
bracket recording the cast and why declaring the default defeats it on both branches.
No masking, no fallback, no test weakened.

The four Escape cases now state `collapse: "open"` rather than `{}`. Escape->collapse
needs a dock that is expanded AND collapsible, and `{}` cannot express that under any
correct default. Authored as `{}` they read a force-pinned dock: three RED-ed, and the
fourth -- "leaves the dock expanded" -- was FALSE-GREEN, since a pinned dock trivially
stays expanded and proves nothing about the dismissable-layer veto it names. Stating
the precondition removes a false green as well as three false reds.

dock-name-canon rule 6 is cured to match the CSS the W1 strike already landed: the
`:not(.layout-grid)` fragment drops from the row-arm regex (layer-group.css:118 has no
such qualifier), the grid-arm assertion is DELETED as dead by construction (no
`.layout-grid` root can exist post-W1, so it can never green), and the title and
comment that still taught a third layout carry dated strike brackets.

Blast radius was censused per tag, not assumed: 36 real `<GlassDock>` tags, six bare.
A `#collapsed` slot is the discriminator. Four bare sites keep the restored default and
are FIXED by it -- including two capture harnesses that, force-pinned, were measuring a
dock that could not morph, and the layers story whose own prose says "Hover to expand".
One in-fence site with no collapsed face, the /dock landing tile, is re-pointed to
`:collapse="false"` so it does not mount as an empty pill.

Verified, real exit codes: vue-tsc 0; dock-name-canon 7 passed EXIT 0; GlassDock.posture
19 passed EXIT 0; gate-register seats:60 violations:0 rosterSha256:282d05cf,
BYTE-IDENTICAL and nothing minted. Battery 2011 passed | 3 failed | 7 expected fail
(2021) -- zero alpha-owned failures, total invariant at 2021 across both runs, which is
itself the proof this seat minted no test and struck none.

Two of the three standing REDs are foreign. boot-graph's dist-demo staleness is the
batch close's, as routed. router-field-ownership's two are live cross-lane dirt: a
concurrent hand deleted `export const shellFieldActive` from demo/router.ts in the
working tree (committed: 1 hit; working tree: 0) without re-pointing its consumer test.
That owes a fix before the batch commits. G-BUNDLE-RATCHET stays RED BY ROUTE with the
live direction a 25,763-byte SHRINK (2607590 < 2633353).

Acts 2 (#76-tail) and 3 (#22 cure-cut) are ROUTED TO alpha-6 with grounds, and the
grounds are ordering rather than unit size. #22 appears in none of the four ratified
lane texts; the batch plan states it is "outside this batch's row scope" and
EXECUTION-PROGRESS records it IN-FLIGHT at its cure elsewhere. The #76-tail is terminal
behind a rewrite (#47 W2-W9, unlanded) and a #42 ledger write (unlanded, gated on beta-2)
that its own lane text names as preconditions. The read-only census half is banked in
the record so alpha-6 opens with evidence.

Record: docs/tranches/BK/execution/2026-08-10-lanealpha-unit4/RECORD.md
```

---

## 2 · CURSOR LINE (⊕ⁿ)

```
⊕ⁿ  LANE α UNIT 4 (α5 resume) — THE W1 ATOMIC ACT IS WHOLE. Both α-owned seats green on
    real exit codes: dock-name-canon 7 passed EXIT 0 · GlassDock.posture 19 passed EXIT 0.
    THE CURE WAS NOT THE HANDLER. `onFullKeydown` was already correct; the dock could not
    collapse at all. `DockCollapse = false | "closed" | "open"` compiles to
    type [Boolean, String], and Vue casts an ABSENT Boolean-typed prop to `false` — the
    force-pinned pole — so EVERY <GlassDock> omitting `collapse` mounted always-expanded.
    Measured: props={} ≡ props={collapse:false}. The documented "closed" default was
    unreachable (it lives at useDockShellProps' `?? "closed"`, and that composable is
    called with a plain object, never through prop resolution) — which is why the unit
    test literally named `defaults to "closed"` stayed GREEN while the component did the
    opposite. CURE: one line, `collapse: "closed"` in withDefaults, dated bracket. The
    falsifier rides the existing six-survivors test at the MOUNTED seat — count stays 19,
    nothing minted. Rule 6: `:not(.layout-grid)` dropped from the row-arm regex, grid-arm
    assertion DELETED dead-by-construction, prose truthed under dated strikes. Fixtures:
    the 4 Escape cases state `collapse:"open"` — `{}` cannot express expanded-AND-
    collapsible, and one of the four was FALSE-GREEN under the pin. Blast radius censused
    per tag: 36 real tags, 6 bare, `#collapsed` slot the discriminator; 4 bare sites are
    FIXED by the restored default (incl. 2 capture harnesses that were measuring a dock
    that could not morph); 1 in-fence tile re-pointed to `:collapse="false"`.
    GATES: vue-tsc 0 · seats:60 … rosterSha256:282d05cf violations:0 BYTE-IDENTICAL ·
    battery 2011 passed | 3 failed | 7 xf (2021), TOTAL INVARIANT at 2021, ZERO α-owned
    failures (+4 this seat's cures, −2 foreign router dirt) · G-BUNDLE-RATCHET RED BY
    ROUTE, live direction a 25,763-byte SHRINK (2607590 < 2633353), not re-measured and
    said so. DRIVER OWES TWO: (1) demo/router.ts lost `export const shellFieldActive`
    under a concurrent hand — 2 REDs in router-field-ownership, committed:1 vs
    working-tree:0 — fix before the batch commits; (2) dark-mode-toggle.vue:4 (β2's) needs
    the same `:collapse="false"` re-point, censused not written. ACTS 2+3 ROUTED TO α6 ON
    ORDERING, NOT SIZE: #22 is in NO ratified lane text, the batch plan calls it "outside
    this batch's row scope", and EXECUTION-PROGRESS has it IN-FLIGHT elsewhere; the
    #76-tail is terminal behind #47 W2-W9 and #42's ledger write, both unlanded. Census
    half banked in the record (clampLabel already retired — 1 prose hit; TooltipContent
    mono UNSTARTED; BEAD confined to DotRing, not a dock surface).
```

---

## 3 · THE TWO ITEMS THAT NEED THE DRIVER, isolated

**(a) A concurrent lane broke the battery outside every fence.**

```
$ git show HEAD:demo/router.ts | grep -c shellFieldActive   → 1     (committed: exported)
$ grep -c shellFieldActive demo/router.ts                   → 0     (working tree: deleted)
$ git diff --stat -- demo/router.ts                         → 1 file changed, 11 deletions(-)
$ git diff -- demo/router.ts | grep '^-.*export'            → -export const shellFieldActive = computed(
```

`tests/demo/router-field-ownership.test.ts` fails 2/2 with `TypeError: Cannot read properties of
undefined (reading 'value')` (`:13:33`, `:29:33`). Whoever deleted the export owes its restoration
or the test's re-point. Lane α did not touch `demo/router.ts`.

**(b) One β2-candidate partial needs the collapse re-point α may not write.**

`demo/stories/display/dark-mode-toggle.vue:4` — a bare `<GlassDock>` with **no `#collapsed` face**.
With the cast cured it now mounts as an empty collapsed pill. It needs `:collapse="false"`, the same
one-liner applied in-fence to `overview.tile.vue`. Censused and named; **not written by this seat.**

---

## 4 · π CELLS — ENQUEUED to the singleton seat, NOT claimed

No browser opened. One cell is newly owed *because* this cure changed a real default's paint:

```
π-DEFAULT-POSTURE   an unprop'd <GlassDock> now mounts COLLAPSED (the documented "closed"),
                    where it previously painted force-pinned-expanded.
                    Owner-paint acceptance owed on the four bare in-fence sites:
                      /dock/overview — dock-capture · dock-tap-capture · DockBackgroundToggle tile
                      /dock/layers   — dock-nested-collapsible ("Hover to expand")
                    plus the re-pointed /dock landing tile (overview.tile.vue), which must still
                    read as a four-control dock at rest.
                    Chromium 149 @1440×900 · 393×852 dpr3 — light AND dark arms.
```

---

## 5 · FIGURES — moved lawfully, or unmoved and stated in full

```
battery   Challenger B (pre-cure)  2009 passed | 5 failed | 7 xf   (227 files)
          THIS SEAT (post-cure)    2011 passed | 3 failed | 7 xf   (227 files)
          detector: npx vitest run   (BATTERY EXIT=1)

          TOTAL INVARIANT AT 2021 across both runs — no test minted, none struck.
          +4 passed  THIS SEAT   dock-name-canon rule 6 (+1) · posture Escape trio (+3)
          −2 passed  FOREIGN     router-field-ownership, demo/router.ts export deleted in-tree
          zero α-owned failures remain; the 3 that stand are boot-graph (batch close) + those 2.

posture test count   19  →  19 ✓   (falsifier folded into an existing test, nothing minted)
dock-name-canon      7   →  7  ✓   (an assertion was deleted, never a test)

G-BUNDLE-RATCHET  RED BY ROUTE — floor rebinds at the single batch close, not a byte growth.
                  Live direction: 25,763-byte SHRINK (2,607,590 < 2,633,353, Challenger B's run).
                  NOT re-measured this seat, and disclosed rather than papered: the whole source
                  delta is one prop default plus comments.
```

Unmoved and stated in full:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2
unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

---

## 6 · FILES THIS SEAT WROTE (`<SHA>` covers exactly these)

```
src/components/dock/GlassDock.vue                        the one source cure + dated bracket
tests/styles/dock-name-canon.test.ts                     rule 6: regex · assertion · prose
tests/components/custom/dock/GlassDock.posture.test.ts   4 fixture preconditions + falsifier
demo/stories/dock/overview.tile.vue                      :collapse="false" + dated bracket
docs/tranches/BK/execution/2026-08-10-lanealpha-unit4/RECORD.md
docs/tranches/BK/execution/2026-08-10-lanealpha-unit4/PASTE-BLOCKS.md
```

A throwaway probe spec (`tests/…/dock/__scratch-inert.test.ts`) measured the §3a diagnosis and was
**deleted in the same seat** — verified absent, and it belongs in no commit.
