# Lane A — the aurora rows: R-4, R-5, R-6, R-6-LIGHT (a)+(b), O-26-INT-1

**Seat** implement · **model** `claude-opus-5` (asserted from this seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_99bdc0bb-0c3/agent-aa42900662848799c.jsonl`,
the `"model"` field; the file was found by grepping the workflows tree for a phrase unique to
this lane's prompt, `LANE A · rows R-4, R-5, R-6`, so the datum is this seat's own and not the
parent session's) · **date** 2026-09-18 · **base** `master` @ `ae17992c` · **ruling of record**
`docs/tranches/BK/execution/2026-09-18-o26-disposition/LEDGER.md` §A rows R-4 (:181), R-5 (:219),
R-6 (:267), R-6-LIGHT (:305), O-26-INT-1 (:816), §D lane table (:834).

The assertion gates the chain: the id matched `claude-opus-5*` before the first repo byte.

## Step-0 baseline

`git rev-parse HEAD` = `ae17992c08381d589d19c54aced04004c3541be1`. `git status --porcelain`
was EMPTY at first byte — Lane B had already landed and committed (`ae17992c`), no other lane
was mid-flight in the tree.

Register receipt at baseline, before the change:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

## Born-RED, once, for all five rows

The witnesses went in FIRST and ran against the old bytes:

```
tests/components/custom/aurora/Aurora.opacity-ceiling.test.ts
tests/components/custom/aurora/interaction-prm.test.ts
tests/composables/motion/usePointerVelocityField.test.ts
→ Test Files 3 failed (3) · Tests 11 failed | 16 passed (27)
```

The same three after the cure: `Test Files 3 passed (3) · Tests 27 passed (27)`. Per-row
RED/GREEN lines below name the assertion each failure belonged to.

## Rows

### R-4 · `AuroraConfig.alpha` — CURE-NOW (doc)

**Ruling.** "JSDoc on `AuroraConfig.alpha` … carrying the three measured facts: it is the
pigment alpha of the painted image; it composites over an alpha-blind ground, so it
re-weights a dissolve rather than presence; the presence envelope is `opacityCeiling`. No
code, no prop, no gate."

**Edit.** `src/components/aurora/constants/presets.ts:292-301` — a JSDoc block above
`alpha: number; // 0..1`, carrying exactly those three facts and nothing else. Ships via
`dist/aurora.d.ts`.

**Witness.** None, by the ruling ("no gate"). The doc arm is verified by the declaration
reaching `dist/aurora.d.ts` in the build below.

**Residue.** The DECLINEd hide-on-arm rule is not written anywhere; the ground stays the
unconditional fallback surface.

### R-5 · the two aurora a11y arms — CURE-NOW

**Ruling.** "In `Aurora.vue`'s own scoped block … the verifier's measured shape, not the
investigator's — an inline `background-image` and an inline CUSTOM PROPERTY both outrank an
author media arm", then the four numbered parts.

**Edits**, all in `src/components/aurora/Aurora.vue`:

| what | where |
| --- | --- |
| `ceilingVar` — the clamped ceiling as a string (`setProperty` takes no numeric coercion) | `:124-130` |
| root binding `:style="{ '--aurora-ceiling': ceilingVar }"` (replaces the inline `opacity`) | `:215` |
| placeholder binding `--aurora-ground-image` / `--aurora-ground-color` (replaces the inline `backgroundImage`/`backgroundColor`) | `:228-232` |
| `.aurora-root { opacity: var(--aurora-ceiling-a11y, var(--aurora-ceiling, 1)) }` | `:255-259` |
| `.aurora-placeholder { background-image: var(--aurora-ground-image, none); background-color: var(--aurora-ground-color, transparent) }`, at single-class specificity so the forced-colors arm can override it | `:304-309` |
| `@media (prefers-reduced-transparency: reduce) { .aurora-root { --aurora-ceiling-a11y: 1 } }` | `:342-346` |
| `@media (forced-colors: active) { .aurora-root > .aurora-canvas-layer { display: none } .aurora-placeholder { background-image: none; background-color: Canvas } }` | `:351-361` |

The inline paint values they replace are gone — not shadowed, removed.

**Witness.** `tests/components/custom/aurora/Aurora.opacity-ceiling.test.ts` — the existing
aurora test, named here as the ruling asks. Its first case now reads the custom properties
(`root.style.getPropertyValue("--aurora-ceiling") === "0.55"`, `root.style.opacity === ""`,
the two ground properties, `placeholder.style.backgroundImage === ""`), and a new
`O-26 R-5` describe reads the emitted scoped block with comments stripped and whitespace
flattened: the two var-routed rules, the reduced-transparency arm verbatim, the
forced-colors arm verbatim, and — for "the default computed opacity still equals
`opacityCeiling`" — that `--aurora-ceiling-a11y` is WRITTEN exactly once in the whole block
(inside the media arm the previous case pins), so nothing sets it at rest and the fallback
chain resolves to `--aurora-ceiling`, i.e. the prop's clamped value. happy-dom applies no
stylesheet, so a mounted `getComputedStyle` would have proved nothing; the house idiom for
a cascade fact is the source assert (`tests/components/a11y/focus-visible.test.ts:24-35`).

**RED** → `expected '<style scoped> …' to contain '.aurora-root { opacity: var(--aurora-ceiling-a11y, …'`
plus `expected '0.55' to be ''` on the root's inline opacity (5 failures).
**GREEN** → `Test Files 1 passed (1) · Tests 6 passed (6)`.

**Residue.** The scoped hash MOVED with the block: `data-v-f054ede9` at 9.0.0 →
`data-v-84a95963` in this build. That is the fact behind the ledger's R-6 open item — a
consumer stopgap must never hard-code a scope attribute — and it is now demonstrated, not
just predicted. Honest scope, as ruled: the reduced-transparency arm bites only where a
consumer set `opacityCeiling < 1`.

### R-6 · the wake under PRM — CURE-NOW + DECLINE

**Ruling.** "`runtime.ts` `setCursor` (:427), `clearCursor` (:433) and `setCursorRadius`
(:439) gate the wake with `if (!canvasHandle.reducedMotion)`, the `setScrollProgress` idiom
at :445 … `update()` keeps its unconditional wake with a one-line comment naming the
exception. Three lines."

**Edits.** `src/components/aurora/composables/runtime.ts:431`, `:437`, `:443` — the three
guards, each on the existing comment. `:502-503` — the two-line note on `update()`'s wake
("the ONE wake the cursor setters' reduced-motion gate does not share: a preset swap under
PRM still has to repaint the single static frame"). Every state write is untouched, so an
un-reduce resumes truthfully.

**Rider, CURE-NOW half.** `src/components/aurora/composables/atoms.ts:129-137` — JSDoc on
`AuroraAtomsBase.seed`: a string is parsed by `cssToOklch`, a contextual (`var(--x)`,
`currentColor`) or non-opaque value THROWS `GlassColorError`, resolve the token yourself and
pass the `OklchStop` form. The non-throwing bridge stays DECLINEd; nothing catches.

**Witness.** `tests/components/custom/aurora/interaction-prm.test.ts` — the existing PRM
suite. A new `O-26 R-6` describe reads `runtime.ts`, slices each setter's body and asserts
`if (!canvasHandle.reducedMotion) canvasHandle.wake();`, and asserts that `update()`'s wake
is reached with no such gate and carries the naming comment. A wake is a call into a live
runtime handle and a headless `createAurora` has no GL context to park, so the contract is
read off the bytes.

**RED** → `expected 'function setCursor(…' to match /if\(!canvasHandle\.reducedMotion\)…/`
×3 + `expected 'update: (cfg) => {…' to contain 'under PRM'` (4 failures).
**GREEN** → all four pass inside `Tests 27 passed (27)`.

**Residue.** None. The `setScrollProgress` gate was left exactly as it was.

### R-6-LIGHT (a)+(b) · `light` on a medium with no impasto — CURE-NOW

**Ruling.** "(a) CURE-NOW, docs: JSDoc stating that `light` steers relighting only where
`impasto > 0` … (b) CURE-NOW, internal: `isAuroraPointerEnabled` … re-key the predicate on
the impasto amount, and the implement seat MEASURES which media carry `impasto > 0` first."

**The measurement, first.** `impasto` is set to a non-zero value in exactly ONE place in
`src/`: `composables/atoms-fields.ts:181` (`cfg.impasto = a`), reached only by the `oil` and
`vangogh` arms of the medium switch. Every other medium — `smooth`, `pastel`, `watercolor`,
`oil-pastel`, `crayon`, `kuwahara`, `metal`, `metal-gradient` — leaves it alone. The only
two literal `impasto:` values in `constants/presets.ts` are `0` (`:483`
`DEFAULT_AURORA_CONFIG` and `:525` at the ledger's datum; `:501` and `:543` after this
lane's JSDoc). So NO preset ships `impasto > 0`, and the medium name
was never the key: `oil` at the default config relights exactly as much as `smooth` does,
which is nothing.

**Edits.** (a) `src/components/aurora/constants/presets.ts:152-160` — JSDoc on
`AuroraInteractivity.light` carrying the shader chain (`uLightDir` → `relightImpasto`, every
term × `uImpasto`) and the measurement above. The block comment's own line at `:147-149` said
"only meaningful over a painterly body (smooth has no impasto to relight)", which the
measurement makes false, so it now reads "only meaningful where the config carries impasto
to relight (see its own note)". (b) `src/components/aurora/composables/runtime.ts:192-211` —
`config.medium !== "smooth"` → `config.impasto > 0`, with the docblock re-grounded on the
amount.

**Witness.** `tests/components/custom/aurora/interaction-prm.test.ts:54-93` (the existing
predicate case, re-titled "uses one impasto-keyed predicate") — `smooth`, `crayon` and `oil`
at the default `impasto: 0` all return false under `swirl: false, light: true`; `oil` with
`impasto: 0.6` returns true; `swirl: true` still returns true. The same predicate is asserted
a second time at `tests/components/custom/aurora/harness.test.ts:172-196`, which the
behaviour change necessarily moves; it is re-keyed the same way rather than left asserting
the convicted shape.

**RED** → `expected true to be false` on `crayon`/`oil` at default impasto (interaction-prm)
and `expected false to be true` on the harness case after the cure landed.
**GREEN** → interaction-prm `12 passed (12)`; harness `16 passed (16)`.

**Residue.** (c), the atoms-door union narrowing, is CURE-NEXT-MAJOR and NOT touched — the
smooth arm still declares `light?: never`. The ledger's own note stands: a pointer path that
could not paint stops arming, which is a deliberate computed-paint change.

### O-26-INT-1 · the engagement envelope under a mid-session PRM turn-on — CURE-NOW

**Ruling.** "On the reducedMotion transition, zero the envelope: the one static PRM frame
must be the rest frame. Born-RED witness in the existing pointer-velocity-field test."

**Edit.** `src/composables/motion/pointer/usePointerVelocityField.ts:279-290` — the
`reduced` watch (`flush: "sync"`) now zeroes `engagement` after `reset()`. The zero sits in
the WATCH and not in `reset()`, because `reset()` is also the `tick(0)` freeze, where the
envelope must still be held (a freeze is not a re-center).

**Witness.** `tests/composables/motion/usePointerVelocityField.test.ts` — a new case,
"zeroes the engagement envelope when PRM turns on mid-session", plus
`installLiveMatchMedia()`: the file's existing `installMatchMedia` seats a preference with a
no-op listener and so can never turn one ON, while the shared `useReducedMotion` ref is
driven by the `change` event. The new stub retains its listeners and fires a change whose
`currentTarget` is the same MediaQueryList the module cached, which is what `syncPreference`
checks.

**RED** → `expected 0.999… to be +0` (the envelope survived the turn-on).
**GREEN** → `Tests 9 passed (9)` in that file.

**Residue.** Only the envelope is zeroed; the attractor's held POSITION and the smoothed
position are untouched, so the freeze is still a freeze everywhere else.

## Build

`npm run build` under the scratchpad build lock (acquired before, released after), exit 0,
`glass-ui:ready` generation `26b43469…`. Then `npm run demo:dist:build`, exit 0 — `dist-demo`
is what `tests/gates/boot-graph.test.ts` measures for staleness against the newest source
mtime, and any source edit makes it stale. Both outputs are gitignored (`.gitignore:2`, `:65`).

The guards reached `dist/aurora.js` — three `C.reducedMotion || C.wake()` sites (setCursor,
clearCursor, setCursorRadius), `scroll === !0 && !C.reducedMotion && C.wake()` untouched at
`setScrollProgress`, and `update()`'s wake still bare. The predicate reads
`interactivity?.swirl !== !1 || e.impasto > 0 && e.interactivity?.light === !0`. The a11y arms
reached `dist/glass-ui.css`:

```
.aurora-root[data-v-84a95963]{opacity:var(--aurora-ceiling-a11y,var(--aurora-ceiling,1));…}
.aurora-placeholder[data-v-84a95963]{background-image:var(--aurora-ground-image,none);background-color:var(--aurora-ground-color,transparent)}
@media (prefers-reduced-transparency:reduce){.aurora-root[data-v-84a95963]{--aurora-ceiling-a11y:1}}
@media (forced-colors:active){.aurora-root>.aurora-canvas-layer[data-v-84a95963]{display:none}.aurora-placeholder[data-v-84a95963]{background-color:canvas;background-image:none}}
```

`npx vue-tsc --noEmit`: clean, no output.

`dist` bytes MOVED. `.bundle-ratchet` was NOT touched — the rebind is the driver's one
deliberate move at the close, on the committed-tree datum.

## Battery

```
timeout 900 npx vitest run
→ Test Files 233 passed (233) · Tests 2233 passed | 10 expected fail (2243)
log: /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/o26cure/A-implement-vitest.log
```

Two files were red on the first post-cure battery and both are recorded above rather than
quietly fixed: `tests/gates/boot-graph.test.ts` (dist-demo stale against the fresh source
mtimes — cured by the demo build, not by loosening the gate) and
`tests/components/custom/aurora/harness.test.ts` (the second existing assertion of the
re-keyed predicate — re-keyed the same way, R-6-LIGHT (b) above).

## Gate receipt

```
timeout 120 node scripts/gate-register.mjs 2>&1 | tail -3
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

Byte-identical to the baseline receipt: `seats:60 … drift:0 … violations:0`, same
`rosterSha256`. No gate minted, no test FILE added, no threshold moved.

## Files touched — the driver's pathspec

```
src/components/aurora/Aurora.vue
src/components/aurora/composables/atoms.ts
src/components/aurora/composables/runtime.ts
src/components/aurora/constants/presets.ts
src/composables/motion/pointer/usePointerVelocityField.ts
tests/components/custom/aurora/Aurora.opacity-ceiling.test.ts
tests/components/custom/aurora/harness.test.ts
tests/components/custom/aurora/interaction-prm.test.ts
tests/composables/motion/usePointerVelocityField.test.ts
docs/tranches/BK/execution/2026-09-18-o26-cure/A/RECORD.md
```

Nothing outside the lane fence. No published export, class, token or subpath is added,
removed or renamed. Four deliberate computed-paint changes, each named in the ledger: the
two a11y arms (R-5, biting only where `opacityCeiling < 1`), what the PRM frame holds (R-6,
O-26-INT-1) and the pointer path that stops arming (R-6-LIGHT (b)).

## Left for the adjudicator

Nothing STOPPED. R-6-LIGHT (c) — the atoms-door union narrowing — is CURE-NEXT-MAJOR by the
ruling and untouched, as is the DECLINEd non-throwing atoms bridge and the DECLINEd
hide-on-arm rule. The one judgement call worth a second pair of eyes: the R-5 and R-6
witnesses are SOURCE asserts (happy-dom applies no stylesheet; a wake needs a live GL
handle), which is the house idiom at `tests/components/a11y/focus-visible.test.ts` but is a
weaker instrument than a painted π. The R-5 shape itself was measured in headless Chromium
by the verify seat and is quoted verbatim from the ledger.

## CURE ROUND 1 — 2026-09-18

**Seat** cure · **model** `claude-opus-5` (asserted from this seat's OWN transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_99bdc0bb-0c3/agent-a1c1f6a6dc6fefdcd.jsonl`,
the `"model"` field; found by grepping the workflows tree for `YOU ARE THE CURE SEAT`, a
phrase unique to this cure prompt — the parent session file is the wrong datum) ·
**adjudicator** `claude-fable-5-1`, read-only, `A-adjudication-1.json` · **base** `master` @
`ae17992c`, tree state unchanged from the implement seat's close (the same 9 lane files plus
this `A/` directory; no foreign path opened).

### The eight rulings, one line each

1. **A-CA-1 ACCEPT** — `:166` read `interaction-prm 27 passed (27)`; 27 is the three-file
   run, the file alone is 12 (9 `it(` + one 3-row `it.each`).
2. **A-CA-2 ACCEPT** — `:191` read `Tests 10 passed (10)`; the pointer-field file has 9
   `it(` and no `it.each`.
3. **A-CA-3 REJECT** — the ledger's own named witness idiom (`focus-visible.test.ts`) IS a
   `readFileSync` source read, so no `compileStyle` instrument is minted here.
4. **A-CA-4 REJECT (driver note)** — `tests/gates/boot-graph.test.ts:569` is a real mtime
   arm that re-reds after ANY later lane's source byte; close-order coordination, not a
   lane A defect.
5. **B-A-1 AMEND** — the two ceiling computeds collapse to one; both rationales merge into
   the surviving comment, the name `ceilingVar` stays so the existing witness stands.
6. **B-A-2 ACCEPT** — the a11y-write count ran against `scoped` (comment-bearing) while its
   siblings use `squashed`; one identifier.
7. **B-A-3 ACCEPT** — the `impasto` cites were the ledger's datum lines, not the post-JSDoc
   ones.
8. **B-A-4 REJECT** — disk contradicts the latch claim: `useReducedMotion.ts:72` re-seeds on
   every mount and each `installMatchMedia()` rebuilds the query, so the latch self-heals;
   a `setReduced(false)` would be bytes for a non-defect.

### The five edits

1. `src/components/aurora/Aurora.vue:117-125` — `clampedOpacityCeiling` DELETED; `ceilingVar`
   is now the single computed `String(Math.max(0, Math.min(1, props.opacityCeiling)))`, its
   comment carrying both rationales (paint authority + the defensive clamp). `grep -n
   clampedOpacityCeiling src/ tests/` is empty. Template `:210` unchanged.
2. `tests/components/custom/aurora/Aurora.opacity-ceiling.test.ts:155` — the a11y-write count
   re-keyed `scoped` → `squashed`.
3. `RECORD.md:142-143` — the `impasto` cite now names both datums: `:483`/`:525` at the
   ledger's, `:501`/`:543` after this lane's JSDoc.
4. `RECORD.md:166` — `interaction-prm 27 passed (27)` → `12 passed (12)`.
5. `RECORD.md:191` — `Tests 10 passed (10)` → `Tests 9 passed (9)`.

Nothing else moved: `usePointerVelocityField.test.ts` untouched (B-A-4 rejected),
`tests/gates/boot-graph.test.ts` untouched (A-CA-4 is a driver note), no `compileStyle`
added (A-CA-3 rejected).

### Post-cure line map for the R-5 cites (the table at `:68-74`)

The deleted computed shifts everything below `:125` by five lines:

| shape | was | now |
| --- | --- | --- |
| `ceilingVar` | `:124-130` | `:117-125` |
| root `--aurora-ceiling` binding | `:215` | `:210` |
| placeholder ground bindings | `:228-232` | `:223-227` |
| `.aurora-root { opacity: var(--aurora-ceiling-a11y, …) }` | `:255-259` | `:250-254` |
| `.aurora-placeholder { background-image/-color: var(…) }` | `:304-309` | `:299-304` |
| `@media (prefers-reduced-transparency: reduce)` arm | `:342-346` | `:337-341` |
| `@media (forced-colors: active)` arm | `:351-361` | `:346-356` |

### Re-run receipts

```
timeout 900 npx vitest run \
  tests/components/custom/aurora/Aurora.opacity-ceiling.test.ts \
  tests/components/custom/aurora/interaction-prm.test.ts \
  tests/components/custom/aurora/harness.test.ts \
  tests/composables/motion/usePointerVelocityField.test.ts
→ Test Files 4 passed (4) · Tests 43 passed (43)
log: /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/o26cure/A-cure1-vitest.log
```

```
timeout 900 npx vitest run
→ Test Files 1 failed | 232 passed (233) · Tests 1 failed | 2232 passed | 10 expected fail (2243)
log: /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/o26cure/A-cure1-battery.log
```

The one red is A-CA-4's arm, quoted whole rather than cured here:
`gate:boot-graph — build arm > the dist-demo it measures is NEWER than every source it is
built from` / `dist-demo/index.html is STALE (built 19:31:00.255Z, newest source
19:48:46.920Z)`. The rebuild below moved `dist/`, not `dist-demo/`, and any later lane's
source byte re-reds it, so it is left for the driver (note at the foot of this section).

### Rebuild

`npm run build` under the scratchpad build lock (acquired before, released after), exit 0,
`glass-ui:ready` generation `7421c58efa52…`. The scoped hash MOVED — `data-v-84a95963` →
`data-v-847a8c62`, the SFC script block changed — and both a11y arms are in `dist/glass-ui.css`
at the new hash:

```
.aurora-root[data-v-847a8c62]{opacity:var(--aurora-ceiling-a11y,var(--aurora-ceiling,1));…}
@media (prefers-reduced-transparency:reduce){.aurora-root[data-v-847a8c62]{--aurora-ceiling-a11y:1}}
@media (forced-colors:active){.aurora-root>.aurora-canvas-layer[data-v-847a8c62]{display:none}.aurora-placeholder[data-v-847a8c62]{background-color:canvas;background-image:none}}
```

`--aurora-ceiling-a11y` occurs exactly twice in the emitted CSS (the rule's `var()` read and
the arm's one write) — `grep -c` reads 1 because the file is one minified line; the count
above is `grep -o | wc -l`. `dist/aurora.js` carries the guards unchanged from the implement
seat's receipt: 11 `reducedMotion` occurrences, three `C.reducedMotion || C.wake()` sites
(setCursor, clearCursor, setCursorRadius), `scroll === !0 && !C.reducedMotion && C.wake()` at
`setScrollProgress`, `update()`'s wake still bare. `.bundle-ratchet` NOT touched.

log: /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/o26cure/A-cure1-build.log

### Gate receipt, post-cure

```
timeout 120 node scripts/gate-register.mjs 2>&1 | tail -3
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

Byte-identical to the baseline and to the implement seat's close.

### Files touched — unchanged pathspec

The same nine lane files plus this RECORD; the cure added no path. Driver note from A-CA-4:
run `npm run demo:dist:build` ONCE at the close, after the LAST lane's source byte, not per
lane.
