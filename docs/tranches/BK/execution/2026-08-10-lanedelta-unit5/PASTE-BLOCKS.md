# LANE δ — COMMIT-UNIT 5 · PASTE BLOCKS

Literal `⊕ⁿ` / `<SHA>` — the driver fills both at the landing.

---

## 1 · COMMIT MESSAGE

```
fix(fourier,demo/chassis): cure the three δ-owned π routes — the shader constant that was never declared, the dark plate that lifted instead of covering, and the ToC rung that fell short of AA

D1 · THE STAGE PAINTED NOTHING. `render.wgsl.ts` splices `OKLCH_MATRICES_WGSL`,
whose own contract at `color.wgsl.ts:52-53` says "PI must be in scope (the
consumer defines it first)" and whose `:105` spends it folding the OKLCh hue to
[0, 2pi). The module defined PI zero times, so every `CreateShaderModule` on it
failed with `unresolved value 'PI'`, the pipeline never built, `onFrame` at
`wgpu.ts:261` never ran, and the Fourier field painted an empty well in both
themes while the whole unit battery stayed green. Six of the eight δ2 π cells
were one root cause. Aurora (`aurora.wgsl.ts:49`) and the blob
(`metaball.wgsl.ts:53`) both carry the line; this is that idiom, not a patch.

The class is gated, not the instance. `wgsl-splice-contract.test.ts` scans `src/`
for every `createShaderModule` call site, reconciles the set against its own
registry in BOTH directions, assembles each module, and resolves every UPPER_SNAKE
module constant the text REFERENCES against the ones it DECLARES — comments
stripped, and struct-scope member names off BOTH sides: a member access (`fr.T`)
is not a reference, and a member DECLARATION is not a declaration either — real
WGSL rejects a module that spells PI only as `struct Foo { PI: f32 }`, and so now
does this arm. A sixth module spliced tomorrow REDs until it is registered, and
the census reads `code:` and `label:` out of the call independently, so property
ORDER cannot decide whether a site is seen at all. Born-RED
in a `git archive ebb58a0f` mirror run with cwd AT the mirror: 3 failed | 9 passed,
headline `expected [ 'PI' ] to deeply equal []` — a one-element set, so no second
unresolved global waits behind it. The first run also convicted the DETECTOR:
`struct HeadFrame { T: … }` made it report `T` unresolved, and both exclusions
landed as facts about WGSL with the finding stated in the file.
  [2026-08-28 · C1 cure: the first cut of that fix over-corrected — it counted a
  member as a DECLARATION, which greened `struct Foo { PI: f32 }` shadowing a
  missing PI. Struct scope is now stated correctly above and both windows are
  mutation-killed; RECORD §5.1 carries the three transcripts.]

D2 · ONE NAME WAS DOING TWO JOBS. `--story-paper-wash` served the full-viewport
paper FIELD (tint the page) and the collapsed chrome PLATE (occlude what slides
under it). Those coincide in light, where `--card` and the page are the same
near-white; in dark the token is `--foreground` — the near-white INK — at 7%, a
film that LIFTS what passes under instead of covering it. The audacious `Aa` cut
straight through the h1, and at 390 `Audacious peaks` printed solid over the
return leg. The plate now names its own `--story-chrome-plate-wash`, `:root` =
the paper wash (light byte-identical), `.dark` = `--card` at 80% — DERIVED, not
picked: the light arm's ghost-to-ground reads 1.864:1 from the banked capture, and
80% lands dark at 1.877:1 with the h1 still at 11.93:1. Editing the shared token
in place was REFUSED with its number: it would repaint every `paper` hero route's
dark page from rgb(11,10,9) to rgb(45,36,29) and collapse the L4-floor/L16-card
distinction `dark-arm.css:52,:85-87` declares.

D3 · THE ToC RUNG. The untracked `1.2/1.3 Subsection` rows read 4.04:1 in light —
`text-muted-foreground` on a `.glass-resting` pane resolves through
`ladder.css:207` to `--on-glass-muted`, whose `hsl(30 26% 35%)` computes to exactly
the ink the capture measured, rgb(112, 89, 66). That rung is calibrated against a
composited CREAM plate; this pane composites over the aurora, and the calibration
does not survive the move. `text-muted-foreground-strong` takes
`--on-glass-muted-strong` on the same rule and reads 5.45:1. The ladder already had
the rung; nothing is minted, dark rises rather than regresses, and the row stays
subordinate to its `text-foreground` parents.

THE FOUR RIDERS, each dispositioned. D1d CURED — under `navigator.gpu === undefined`
the substrate arms its WebGL2 net only to discover this field has none, and the
pill read "WebGL 2 · [FourierField] WebGPU is required …", declaring the refusal
and contradicting it in the same breath; `setupGL` is a declaration, not an arm, so
the field re-points any non-webgpu status at its one engine, at its OWN seam and
not in the shared substrate. D1a is D1's CONSEQUENCE, verified as far as source
carries (the clock advances only inside the frame the pipeline gates) and ENQUEUED
for the rest. D1b REFUSED-AND-RE-SCOPED: the slider already IS the real N domain
(`:max="maxHarmonics"` → `minted.terms.length`, and `mint.ts` rules "there is NO
ceiling"), so the ORDER was unsourced, not the control. D1c REFUSED-AND-RE-SCOPED:
`headTLive` is a deliberate 10 Hz sample, a per-frame DOM channel would be a second
surface for THE ONE CLOCK on a compositor-only substrate, the number is already
published twice, and all three ordered detectors are already gated deterministically
over an adversarial trace.

Receipt byte-identical (seats:60 … violations:0). +14 battery rows, all green.
Three re-capture cells ENQUEUED in PI-QUEUE.md; nothing is claimed as painted.

⊕ⁿ
```

---

## 2 · CURSOR LINE (⊕-ledger)

```
⊕ⁿ  <SHA>  δ unit-5 π-CURE — D1 the unresolved `PI` (six π cells, one line) + the
    class arm that resolves every assembled WGSL module · D2 the plate's own dark
    wash, alpha DERIVED to the light arm's 1.864:1 read · D3 the ToC's -strong rung
    (4.04 → 5.45) · D1d the pill's engine · D1a enqueued · D1b/D1c REFUSED with
    grounds and re-scoped. Receipt unmoved, +14 green rows, π ENQUEUED.
```

---

## 3 · VERIFY BLOCK — verbatim, real exit codes

```
$ npm run typecheck                       → exit 0
  vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.test.json   (both clean)

$ npm test                                → exit 1
  Test Files  1 failed | 224 passed (225)
  Tests  1 failed | 2137 passed | 10 expected fail (2148)
  the ONE failure is FOREIGN — tests/public-surface.spec.ts, a STALE dist/
  (mtime Aug 10 14:07, eighteen days pre-session) shipping
  components/dock/styles/overflow.css where src/ now has run.css. Dock is α's;
  this unit's diff carries zero dock lines; overflow.css does not exist at
  ebb58a0f; and this seat's only build wrote dist-demo/, never dist/.
  One of the two stale-dist REDs standing until the close build.

$ node scripts/gate-register.mjs          → exit 0
  seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13
  armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
  (byte-identical pre and post — seats +0, nothing minted)

$ npm run verify:package                  → exit 1
  Invalid package artifact:
  components/handmark/geometry.d.ts: bare declaration reference @mkbabb/pencil-boil
  requires direct dependency ownership of @mkbabb/pencil-boil
  FOREIGN (γ's surface, in the same stale dist/). The script throws on its first
  failure, so the run NEVER REACHES the ratchet arm. G-BUNDLE-RATCHET stands RED
  by route and is UNMEASURED this run; this seat's contribution to it is zero
  bytes of shipped bundle.

$ npm run demo:dist:build                 → exit 0
  ✓ built in 748ms
  emitted CSS verified by grep, not assumed:
  .text-muted-foreground-strong{color:var(--muted-foreground-strong)}
  .story-page-chrome:before{… linear-gradient(to bottom, var(--story-chrome-plate-wash) 0 62%, transparent) …}

$ npx vitest run tests/components/fourier-field/ tests/demo/page-chrome-shrink.test.ts
                                          → exit 0
  Test Files  3 passed (3) · Tests  58 passed (58)
  this seat's contribution: +14 rows (12 new file + 1 D1d + 1 D2)

BORN-RED, mirror at ebb58a0f, cwd AT the mirror:
  Test Files  1 failed (1) · Tests  3 failed | 9 passed (12)
  → expected [ 'PI' ] to deeply equal []
  → FOURIER_FIELD_RENDER_WGSL splices a PI chunk: expected false to be true
  → expected '\n// 0 chain · 1 trail · 2 head — a p…' to match /const PI: f32 = 3\.141592653589793;/
  the two cases added to existing files, falsified against `git show ebb58a0f:<path>`:
  D1d arm-1 false · D1d arm-2 false · pre-cut publishes RAW status true
  D2 arm-1 false · arm-2 false · arm-3 false · arm-4 true (a GUARD, not born-RED, and said so)
```

---

## 4 · FENCE BLOCK

```
 M src/components/fourier-field/shaders/render.wgsl.ts          +11
 M src/components/fourier-field/useFourierField.ts              +24 −1
 M demo/chassis/hero/story-hero.css                             +37 −2
 M demo/stories/navigation/toc-tracking.vue                     +17 −1
   [2026-08-28 · driver C2: figures corrected to git numstat — the seat's +25−1/+39−3/
   +18−1 rows did not match the bytes]
 M tests/components/fourier-field/FourierField.smoke.test.ts    +17
 M tests/demo/page-chrome-shrink.test.ts                        +25
?? tests/components/fourier-field/wgsl-splice-contract.test.ts
?? docs/tranches/BK/execution/2026-08-10-lanedelta-unit5/
       RECORD.md · PI-QUEUE.md · PASTE-BLOCKS.md · born-red-D1.log

fence extension, on the driver's own ruling: demo/stories/navigation/toc-tracking.vue
(D3 is DRIVER-RULED into this unit; inside Lane δ's standing demo/stories/** fence;
no other lane touches it).

NOT touched: every dock/search surface (α) · every handmark surface (γ) ·
src/composables/glass/webgpu/** (shared — D1d placed at the consumer edge to avoid it) ·
color.wgsl.ts (the chunk is right; its consumer was wrong) · src/styles/** ·
aurora/** · blob/** · dist/ · PI-CENSUS.md · the π band's banked artifacts ·
every other lane's record. No add/commit/stash/checkout.
```
