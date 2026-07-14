# BorderProgress

## Artefact path

`src/components/custom/border-progress/` — the masked-conic BORDER ring (BB.W-BORDER-PROGRESS):
progress IS the element's border, a `@property`-animated (`--border-progress-fill <percentage>`)
conic-gradient mask-composited into the border band (radius-following, backdrop-intact — NO
border-image, NO floating bar), the brand spectrum walked OKLCH/shorter-hue, `coverage`
full-ring | bottom-edge | inline-end-edge, a phase-edge milestone emit, the 10-14px envelope
(default 12px, the W-BP-BOTTOM-LINEAR paint).

## Verdict

`retire-subpath — banked dormant, demo-only` — **BI.W-BORDER-PROGRESS-RETIRE (ruling 4).** The
`@mkbabb/glass-ui/border-progress` subpath is RETIRED at the 5.0.0 cut and its component is BANKED
dormant OFF the public surface: the mirror + `typesVersions` + `/api` re-export are gone, but
`src/components/custom/border-progress/` + its demo STAY (the demo imports the barrel relatively via
`@glass/…`, never the public subpath). It was minted a net-new subpath at 4.1.0 on a speedtest-adopt
justification that never landed — the "born ≥2 by construction" claim was FALSE: speedtest
hand-rolls its own progress bar, so the honest census reads **0 binary consumers**. Under the
≥2-binary-consumer + mechanism-distinctness law the subpath does not earn its keep — but the retire
is `retire-until-adoption`, NOT a delete, because the re-entry is a consume of the EXISTING mechanism
(the speedtest adopt), not a re-mint.

## Consumer proof (re-runnable)

**Internal consumers — 2 (demo-only, real).** The feedback/progress story demonstrates the ring
0→full + the coverage arms; the demo dock rim renders the bottom-edge band:

```bash
grep -rln 'components/custom/border-progress' demo/ src/ \
  | grep -v '/components/custom/border-progress/' | grep -v 'src/subpaths/' | grep -v 'src/api/'
#   → demo/stories/feedback/progress.vue
#   → demo/shell/SidebarDock.vue
```

Both are repo-internal `demo/` renders reached through the `@glass/components/custom/border-progress`
source alias — the demo-only INTERNAL surface, never the retired subpath. Demo renders never count
toward the ≥2-binary bar (the W-ORPHAN-BINARY-SPLIT `demo-only` category, binary=0 / demo=2).

**External / binary consumers — 0 at HEAD.** The registry+sibling probe (`npm view
@mkbabb/glass-ui` + the constellation import-graph census + a `grep -rln 'glass-ui/border-progress'
~/Programming/speedtest/src` sweep) reads ZERO importers of the retired subpath. speedtest hand-rolls
its own bar; it does NOT import the mechanism. The foreign-tree fence holds — this retire edits no
sibling tree.

## The named re-entry TRIGGER

The binding re-entry criterion is the speedtest `<BorderProgress>` adopt ASK (AW.W7): speedtest
deletes its hand-rolled progress bar and imports the mechanism on its `^4.x` bump — that consume
RE-PUBLISHES `/border-progress` in the same cut (the named cross-repo re-trigger, rostered in the
crossrepo-asks book). When that lands (a `grep -rln 'glass-ui/border-progress'
~/Programming/speedtest/src` hit), record the call-site here; the subpath clears the ≥2-consumer bar
and re-mints. Until then the component stays banked dormant.

## Successor + coupling notes

- **Dock scroll-progress affordance successor:** BI.W-SCROLL-PROGRESS-RIM's masked-band rim. The
  atlas dock-progress consume (ask #23) binds that successor's per-item `[0,1]` scalar contract, NOT
  the retiring component — a dock-progress need re-enters through the rim, never a re-open here.
- **value.js `mixColors` U-F30 coupling — NOT orphaned:** the spectrum-walk that reads raw OKLCH
  channels moves WITH SCROLL-PROGRESS-RIM to the shared `/color` leaf; border-progress re-points onto
  the moved leaf (still a consumer of `/color`, still 0 binary consumers of its OWN package, so this
  retire stands). A value.js convention change co-migrates the spectrum-walk in-window (the U-F77
  ordering).

## Re-audit proof

Satisfies the `proof:consumer-evidence-true` border-progress arm (BP1 the subpath source is retired —
mirror + `/api` re-export gone, component banked present; BP2 the false "born ≥2 by construction"
claim is struck, this honest demo-only record stands; BP3 completion-seal stays on the WATCHLIST). The subpath
un-publish is a derived regen (`subpath-policy` PUBLISH→INTERNAL → `regen-exports --write` drops the
`./border-progress` export key + `typesVersions`), machine-locked by `proof:subpath-classify`
(EXACT_REPRODUCTION) + `proof:subpath-enumeration` (BATCH-EQUIV). The component's own paint truth
stays `proof:border-progress` (the device-free source arm — the component is banked, its gate KEEPS)
+ `tests-visual/border-progress.spec.ts`.
