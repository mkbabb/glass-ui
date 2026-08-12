# LANE α — UNIT 3 (α3) · PASTE-BLOCKS

Literal blocks for the driver. `⊕ⁿ` and `<SHA>` are placeholders the driver fills at the batch
close; nothing here is pre-numbered.

---

## 1 · COMMIT MESSAGE

```
fix(dock): strike four dead-by-construction dock surfaces — the @container consumers with no producer, and the drag rules with no emitter (BK #47 W1)

#47's W1-W9 build did not land, and the reason is a figure rather than a judgement:
the W1 prop cut alone (14 -> 6) mints 60 type errors, 36 of them across 13 files
OUTSIDE Lane alpha's fence, and GF-DOCK section 9 ROUTED already assigns those files
to a marked consumer addendum. Reproduced born-RED on a git-archive copy of HEAD:
control vue-tsc 0 errors -> probe 45 errors / 14 files (33 in demo/**), and the test
project 2 -> 17 (3 in tests/**/GlassDock.interaction-manual.test.ts). tsconfig.json
includes demo/, so the verify gate's own `vue-tsc 0` cannot be met by an in-fence-only
W1. The full measurement, the second collision (W2's remaining subject is dirty under
a concurrent lane's hand, 108 dock lines removed in flight from
src/styles/tokens/sizing.css), and the two ways the driver can unblock it are banked
in the unit record.

What DID land is bounded by one rule: only what cannot change a rendered pixel, since
per-wave paint acceptance needs the singleton browser seat and this seat owns none.
Four acts clear that bar by detector.

The two `@container dock` queries (density.css:432,437) are deleted. A named container
query matches only against an ancestor carrying container-name AND a container-type,
and neither has ever existed: 0 container-type declarations in src/components/dock/**,
and the `containerName` prop that shell.css:141-162 named as the producer is absent
from DockProps, which has held the same 14 members for the life of the file. Delete
beats authoring the producer on the tree's own evidence -- container-type:inline-size
carries contain:inline-size, which shell.css:136-147 records as the exact cause of the
3.3.0 sliver regression. Detector, RED at HEAD via git-archive and GREEN here: 2
consumers / 0 producers -> 0 consumers / 0 producers.

The two `.dock-items-draggable` rules (controls.css:53,56) go with them, and they were
deader still: grep across src/ demo/ tests/ finds that class exactly twice, and both
hits ARE these selectors -- zero emitters anywhere -- while the useDockItemDrag the
comment named as the live writer of .glass-drag-lift is prose and nothing else. A
mechanism written in the present tense, gated on a class nothing sets, driven by a
composable never on disk. GF-DOCK R-E rules the merits independently: all dock drag is
struck, commit is tap/click/keyboard. The switcher's own .glass-drag-lift
(DockLayerGroup.vue:270) is live and untouched.

Two prose strikes carry dated brackets rather than silent deletion. shell.css's
`containerName` opt-in is struck as NEVER-TRUE, not newly-retired -- it was the sole
documentation of a prop that does not exist. GlassDock.vue's attrs contract described
`.glass-dock-frame` as live structural chrome; dock.css:206 retired that frame, and
grep finds two mentions, both prose, zero rules, zero rendered elements.
inheritAttrs:false is now justified by what it does.

Verified, real exit codes: vue-tsc 0 on BOTH arms; gate-register seats:60 violations:0
UNMOVED and nothing minted (the four DOCK gates are ordinary tests -- C20's
ordinaryTestLaw.ordinaryTestsConsumeBudget is false, and C20 carries zero dock seats);
postcss parses all three edited stylesheets. The battery line is byte-identical before
and after this seat's acts -- 1 failed | 2005 passed | 6 expected fail (2012) -- and
its one failure, boot-graph's stale dist-demo, was RED at step-0 with the only two
newer sources being src/styles/tokens/sizing.css and aurora's useAurora.ts, zero dock
files. It is not cured here: the cure would bake three concurrent lanes' in-flight
source into a committed build artifact. Like G-BUNDLE-RATCHET it is RED by route, and
no lane can discharge it alone.

The handed battery figure (1538 passed | 5 xf) has lawfully moved to 2005 | 6; three
lanes have added tests since it was banked.

Record: docs/tranches/BK/execution/2026-08-10-lanealpha-unit3/RECORD.md
```

---

## 2 · CURSOR LINE (⊕ⁿ)

```
⊕ⁿ  LANE α UNIT 3 (α3) — #47 W1-W9 REFUSED ON FENCE (measured, not argued); four
    dead-by-construction dock surfaces struck instead. The W1 prop cut alone mints 60
    type errors, 36 on 13 files outside the fence, and GF-DOCK §9 ROUTED already gave
    those files to a marked consumer addendum. Born-RED reproduced on a git-archive
    copy: vue-tsc 0 → 45/14 (33 in demo/**) and 2 → 17 (3 in dock tests). Second,
    independent collision: W2's remaining subject (src/styles/tokens/sizing.css) is
    dirty under a concurrent lane, 108 dock lines removed in flight. LANDED: the two
    @container dock queries with 0 producers (density.css:432,437) · the two
    .dock-items-draggable rules with 0 emitters (controls.css:53,56 — GF-DOCK R-E) ·
    two dated prose strikes (shell.css's never-true containerName opt-in;
    GlassDock.vue's retired .glass-dock-frame). vue-tsc 0 BOTH arms · seats:60
    violations:0 UNMOVED, nothing minted · battery byte-identical pre/post
    (1 failed | 2005 passed | 6 xf), its one RED foreign at step-0 and RED BY ROUTE.
    DRIVER OWES ONE WORD (either unblocks all of #47): (1) α owns #47's consumer cure
    — demo/** + dock tests/** — in one commit with the src cut; or (2) the consumer
    addendum is scheduled as a named commit-unit landing in the SAME batch. Until
    then W1 cannot be committed by anyone without leaving vue-tsc RED.
```

---

## 3 · THE DRIVER DECISION, isolated

The one blocking question, stated so it can be answered in a line:

> **#47's src cut and its consumer cure are two commits by GF-DOCK §9's own routing, but
> `vue-tsc` cannot be 0 with only one of them landed. Which lands them together?**
>
> **(1)** Lane α writes `demo/**` + `tests/components/custom/dock/**` in the same commit as the
> `src/components/dock/**` cut — GF-DOCK §9's demo routing set aside for this row; or
> **(2)** the marked consumer addendum becomes a named commit-unit sequenced into the SAME batch
> as α's src cut, so neither is RED alone.

Blast radius the decision governs, measured this seat — 13 files:

```
demo/stories/dock/{overview,layers,controls,vertical,sections,overflow,dock-search,cta-receive}.vue
demo/stories/feedback/progress.vue
demo/stories/display/dark-mode-toggle.vue
demo/shell/{BottomDock,SidebarDock}.vue
tests/components/custom/dock/GlassDock.interaction-manual.test.ts
```

Plus the tests GF-DOCK §9 already routes to the close battery as listed REDs:
`GlassDock.scroll-overflow.test.ts` · `GlassDock.touch-gate.test.ts`.

---

## 4 · π CELLS — ENQUEUED to the singleton seat, NOT claimed

None captured; this seat opened no browser. Per GF-DOCK §6, for whenever #47's build lands:

```
π-RUN     offsets mod P (the P/2 form), leading peek, seat box vs token, capacity
π-CUT     cap radius @3 offsets + 40px pixel scan + forced-choice read + rAF histogram
          (live vs inert). Safari needs ≥500ms settle between scroll write and style
          read + screenshot corroboration — a synchronous read already nearly banked a
          false REFUTE of the whole mechanism.
π-REACH   both axes; the rail cell at 1440×420 (the height that reproduces)
π-CROSS   wheel AND drag, never sh===ch
π-MORPH   rAF box trace, collapsed layout occupancy
π-SWAP    frame-gap histogram, no dock-owned frame >33ms
π-SEAT    channel deltas light AND dark — THE DARK ARM HAS NEVER BEEN PHOTOMETERED
π-STATIC  backdrop-filter none in BOTH engines

Viewports: Chromium 149 @1440×900 · 768 · 393×852 dpr3
           real Safari 26.4 via scripts/safari-probe.mjs (pkill -f safaridriver first)
           @1440×848 · 430×848 — never Playwright-WebKit under a Safari label
Owed cells: /dock/layers + /dock/overflow @430×848 Safari
```

---

## 5 · FIGURES THAT LAWFULLY MOVED (state with detector, never reconcile silently)

```
battery   handed "1538 passed | 5 xf"  →  MEASURED 1 failed | 2005 passed | 6 expected fail (2012)
          detector: npx vitest run   (BATTERY_EXIT=1)
          had already moved at α2 to 1967 passed | 5 expected fail (1975)

dock files   roster 45 / lane text 43  →  MEASURED 44
             detector: find src/components/dock -type f | wc -l
dock lines   roster 8,046              →  MEASURED 8,182
             detector: find src/components/dock -type f -exec wc -l {} + | tail -1
partials     19                        →  19 ✓
DockProps    14                        →  14 ✓
```

Unmoved and stated in full:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2
unbound:45 drift:0 rosterSha256:282d05cf violations:0
```
