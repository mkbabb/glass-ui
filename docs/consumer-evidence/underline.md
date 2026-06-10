# GlassUnderline

## Artefact path

`src/components/custom/underline/` (the published subpath `@mkbabb/glass-ui/underline`).

## Verdict

`keep-current` — **user-directed wave (AY.W-UNDERLINE), booked with a named consumer roadmap.**
`GlassUnderline` is the sci-report `HandUnderline` transposition: a filter-free, draw-on pen
underline (load clock with an imperative `play()` + an `:active` overlay, a native scroll
clock via `view()`, and a static register), with a `--gu-*` bold-register override and a color
preset. The wave was explicitly user-directed, with slides (×2) and sci-report (×4) named as the
intended consumers. The publication wiring (`package.json` `exports` + `typesVersions`) was the
ONLY missing piece — an orchestrator integration miss — now repaired.

## Half-published → published (the W-PRUNE integration fix)

At the prune audit HEAD the component was HALF-PUBLISHED: the `/underline` chunk emitted to
`dist/underline.js` (vite globs `src/subpaths/*.ts`), the 5 api-seat types existed
(`GlassUnderline*` in `src/api/index.ts`), and the demo story mounted it — but `./underline` was
absent from `package.json` `exports` AND `typesVersions`, so consumers could not reach it. The
lane's `package.json` export delta was never applied. W-PRUNE applied it:

- `package.json` `exports["./underline"]` → the contract-v2 `{ types, import }` shape, matching
  every sibling subpath.
- `package.json` `typesVersions["*"]["underline"]` → `["dist/underline.d.ts"]`.

`npm run verify-export-types` + `npm run build` confirm `dist/underline.js` + `dist/underline.d.ts`
publish cleanly.

## Consumer proof (re-runnable)

**External consumers — 0 (the wave's consumers land post-publish).** The roadmap:

```bash
# slides — re-points its s1-draw / cta-draw hand-underline to @mkbabb/glass-ui/underline
#          post-3.10.0 (once the export ships):
grep -rln 'GlassUnderline|glass-ui/underline' ~/Programming/slides/src   # → NONE yet
# sci-report — adopts in its own tranche (the HandUnderline source this transposes):
grep -rln 'GlassUnderline|glass-ui/underline' ~/Programming/sci-report/src   # → NONE yet
```

slides today ships its OWN local hand-underline (`s1-draw` / `cta-draw`); the named adoption is the
re-point to the published library surface once 3.10.0 lands. sci-report owns the `HandUnderline`
this component transposes and adopts on its own tranche cadence.

**Internal consumers — 1 demo (the showcase story).** The ONLY `<GlassUnderline>` mounts in the
repo are the story that demonstrates the three clocks + the override:

```bash
grep -rn '<GlassUnderline' demo/   # → demo/stories/motion/underline.vue (load / active / scroll /
#                                       static / bold-register / tinted)
```

## The named ≥2-consumer TRIGGER

The export is now LIVE; the binding close-criterion is the FIRST real adoption: slides re-points
its `s1-draw` / `cta-draw` underline to `@mkbabb/glass-ui/underline` after 3.10.0 publishes, and
sci-report adopts in its tranche. When the second real consumer ships, update this doc to record
the call-sites; the component then clears the ≥2-consumer bar on its own and the evidence-doc
escape is no longer load-bearing.

## Re-audit proof

This document satisfies the overfitting-audit / `proof:component-orphan` `keep-current` verdict for
`GlassUnderline` while the external-consumer greps stay empty AND the demo mount stays present. The
gate accepts `underline` on THIS evidence doc (a user-directed wave with a named consumer roadmap),
NOT a false `keep`. If the demo mount is removed with no external consumer arriving, the verdict
returns to `library-orphan` (formally retire the subpath + export).

## Cross-references

- `src/components/custom/underline/README.md` (the masthead-invariant pen render + the DEC-7
  geometry escape tuple).
- `demo/stories/motion/underline.vue` (the showcase story — all three clocks + the override).
