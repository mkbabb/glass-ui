# W-SCROLL-FADE-RETIRE — the static `.scroll-fade-*` utilities + `--mask-fade-width` token drained (BB.W-SCROLL-FADE-RETIRE)

**No π re-shoot.** This is a STRUCTURAL / DEAD-CODE wave — it changes ZERO paint by construction
(the deleted rules had no consumer, so nothing un-styles; the deleted token is dead-together). The
binding truth is the DEFINITION-ABSENT + token-absent + dist-absent assert (`proof:fading-scroll` W6a-d)
+ the live primitive untouched (`tests-visual/fading-scroll.spec.ts` stays GREEN). The dead-code-removal
is its own no-visual-change proof. The clean break (no alias) executes the retirement W-FADING-SCROLL
scope-7 DEFERRED to a "Batch-2-close orchestrator commit" that BA never ran.

## What was deleted (clean break, no alias)

- **The 4 utility rules** (`src/styles/utilities/base.css`, the `/* ── Scroll fade masks ── */` block):
  `.scroll-fade-mask` / `.scroll-fade-top` / `.scroll-fade-bottom` / `.scroll-fade-y` — each a
  `mask-image: linear-gradient(…, var(--mask-fade-width), …)` inside `@layer components`. The
  `<FadingScroll>` `@layer components` block + the `@supports (animation-timeline: scroll())` recipe
  that FOLLOW are the live primitive — UNTOUCHED. The `base.css` header-comment manifest dropped the
  "scroll-fade masks" item; the `.card-scroll-host` disambiguation comment re-pointed from the deleted
  `.scroll-fade-*` to the live `.fading-scroll`.
- **The orphan token** `--mask-fade-width: 1rem` (`src/styles/tokens/offsets-sizing.css`) — consumed
  ONLY by the 4 dead rules (dead-together). The `:14-24` retire-coordinated comment block was rewritten
  to drop the deferral prose, keeping the live `--fade-scroll-width` doc + a one-line past-tense retire
  note.

## The dead-together confirmation (pre-deletion RE-GROUND, §0)

```
grep -rn 'var(--mask-fade-width)' src
  → ONLY base.css:327/331/335/339 (the 4 dead rules) — no live consumer
grep -rn 'scroll-fade-(mask|top|bottom|y)' src demo  (class position)
  → ONLY the base.css definitions + prose comments in Configurator.vue (describing what it migrated OFF)
```

Every functional consumer (C1 blob, C4 aurora dock, C5 SegmentedTabs, C6 PresetPickerRow, C2/C3
Configurator) already renders `<FadingScroll>`/`useFadingScroll` at HEAD — the migration happened at BA.

## born-RED → GREEN (`proof:fading-scroll`)

**Born-RED at HEAD (pre-deletion):** the OLD W6 (`w6-retirement-consumer-clean`) passed 9/9 ONLY via
the `base.css`/`offsets-sizing.css` exclusions + the `C2_C3_ALLOWLIST` — the gate was BLIND to the
surviving definitions + the token by design (the deferral's escape hatch). The 4 rules + the token
shipped in `dist`.

**GREEN at close (W6 upgraded to DEFINITION-ABSENT + token-absent + dist-absent + regression):**

| witness | HEAD (pre-deletion) | close (post-deletion) |
|---|---|---|
| `w6a-utility-definitions-absent` (source) | RED — 4 rules at `base.css` | GREEN — surviving definitions: none |
| `w6b-mask-fade-width-token-absent` (source) | RED — `--mask-fade-width: 1rem` at `:26` | GREEN — `tokenStillDeclared=false` |
| `w6c-dist-absent` (built dist, W-EMISSION mirror) | RED — dist ships both | GREEN once the orchestrator's `npm run build` re-emits `/styles` (skipped when `dist/` absent) |
| `w6d-no-consumer-reappears` (regression guard) | vacuously green (no live consumer) | GREEN — survivors: none (allowlist removed; Configurator prose-comments stripped) |

The `dist` clause `w6c` is RED ONLY against the STALE pre-deletion build artefact (built before the
source deletion) — exactly the producer-side "delete-source-but-ship-dirty-dist" floor the W-EMISSION
precedent installs. It flips GREEN the instant the orchestrator runs `npm run build` in the unified
battery. This is the binding "still shipping" guard, not a logic defect.

```
-- source base.css scroll-fade rule count   : 0   (was 4)
-- source offsets --mask-fade-width: count   : 0   (was 1)
-- STALE dist base.css scroll-fade rule count: 4   (born-RED w6c; flips to 0 on re-build)
-- STALE dist offsets --mask-fade-width count : 1   (born-RED w6c; flips to 0 on re-build)
-- var(--mask-fade-width) consumers in src   : 0   (dead-together confirmed)
```

The gate self-test bite (anti-evasion): re-adding `.scroll-fade-mask { mask-image: … }` REDs w6a;
re-declaring `--mask-fade-width: 1rem` REDs w6b; a stale `dist` carrying either REDs w6c; the
"drain by aliasing" evasion (renaming `--mask-fade-width` to a survivor alias) fails w6b's no-alias
clause (the token name is gone, not re-pointed).

## The four false-retire docs corrected (the green-wash fix)

- **MIGRATION.md** — the was/now table STAYS (an external consumer still on a pre-4.1.0 `.scroll-fade-*`
  class needs the map); the "retire in a coordinated orchestrator commit once every consumer migrates"
  line flipped to past tense + BB.W-SCROLL-FADE-RETIRE attribution.
- **docs/audits/style-audit.md** — `--mask-fade-width` + `.scroll-fade-{y,top,bottom,mask}` annotated
  RETIRED (re-pointed to `--fade-scroll-width` / `.fading-scroll`).
- **docs/tranches/BA/audit/visual/W-FADING-SCROLL-DELTA.md + BA/FINAL.md** — one-line BB forward-notes
  appended at the existing claim sites (the BA over-claim of a LANDED clean break recorded, NOT erased).
- **CLAUDE.md** (`:101, 463, 465`) — orchestrator-owned; the retirement-attribution re-anchor emitted as
  a sharedFileRequest (the "the retired `--mask-fade-width`" claim was FALSE-PRESENT at BA, TRUE at BB).

## Out-of-bounds note (recorded, not touched)

`src/styles/tokens/offsets-sizing.css` `J.W3.C` dock-overflow-caps comment (`~:21-27`) names the deleted
`.scroll-fade-{x,y}` mask-fade as the live dock-overflow mechanism — now stale prose. It is OUTSIDE this
wave's named bound (`:14-24` + the `:26` token only; W-DEAD-SWEEP / the dock waves own dock-token prose).
Recorded for the orchestrator / a dock-wave re-point. `src/components/custom/fading-scroll/README.md:86`
("supersedes the retired `--mask-fade-width`") is prose-only + accurate-at-BB — out of bounds, no edit.
