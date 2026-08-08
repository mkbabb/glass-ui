# CURE-ORDER #72 W-RAIL-RENAME-THEN-BUILD — driver-ratified residue (2026-08-08)

Adjudicator (Fable, quartet seat, completed) ruled CURE-REQUIRED at HEAD `abd462e0`. The
driver ratifies the residue verbatim. What STANDS: the selection, the census (D1
115/103/13→0/0/0 verified by two detectors; D2 25 files→0), born-RED structure, the
hairline build (both orientation arms, one `--dock-hairline` colour, one stated paint
delta, live consumer at `demo/stories/dock/sections.vue`), receipt byte-identical
(violations:1 = #40's), vue-tsc 0, battery to the digit (12/1415/5; arm 7/7), #47's
precondition discharged in substance.

## Cures

- **C1 (survivors — the row's own target class):** strike `railLayer` in
  `demo/stories/dock/layers.vue` (decl `:20` + bindings `:175,:190,:191` → e.g.
  `plainLayer`); `useDragMorph.ts:181` comment `showRail:false` → `showSwitcher:false`;
  `demo/stories/data/search.vue:151-156` "Dock rail navigation"/"Vertical GlassDock rail
  row"/tag `"rail"` re-worded (this row's rejected meaning; no other row owns it).
- **C2 (gate hardening):** widen dock-name-canon case 4's regex
  (+`showRail|railPosition|DockRail|DOCK_RAIL|rail-(start|end)`) and harden D1/D2 against
  uppercase `RAIL`; verify the widened case RED on pre-C1 bytes (scratch-copy revert),
  then GREEN.
- **C3 (blind-rename comment misattributions):** fix the six comments assigning
  vertical-dock referents to "the switcher" — `density.css:17,21` · `shell.css:387` ·
  `touch-floor.css:92` · `icon-button.css:166`+mirror · `morph.css:254` — plus
  `touch-floor.css:66,96`'s negative references naming the switcher-glyph token inside
  vertical-dock rules.
- **C4 (specificity comment):** `layer-group.css:88-91` (and RECORD §4): the row arm
  `.glass-dock:not(.vertical):not(.layout-grid) .dock-hairline` is **(0,4,0)**; only the
  vertical arm is (0,3,0). "Same (0,3,0), source order wins" is false as shipped —
  correct the comment to the true mechanism.
- **C5 (dead sentence):** `dock-nav.css:85-88` — strike outright the
  `stack-rail.css`/`--dock-hairline` sentence (stack-rail.css exists only in stale
  `.claude/worktrees`; nothing in `demo/` paints `--dock-hairline`). Note in RECORD: the
  second hunk in #59's file exceeded the declared "ONE thing taken" and minted the
  false-comment class this row struck at `dark-arm.css:313`.
- **C6 (paint no-op):** standalone `<DockLayerGroup>` + anchor paints nothing (no
  `.dock-layer-group … .dock-hairline` arm; `DockSeparator.vue`'s docblock promises
  standalone render). Add the arm OR disclose the limitation in the docblock + RECORD §8
  — whichever the component contract truly means; no promise may outlive its paint.
- **C7 (record corrections, struck-in-place, dated):** §0:37-39 + §9:326 are FALSE
  (`dock/index.ts` carries this cut's `:7-8` hunk; `MIGRATION.md` + `CHANGELOG.md` carry
  this cut's blocks beside foreign LabeledSelect/GlassTimeline hunks — state that the
  DRIVER splits hunks in those three files at commit). §9's `42/+528/−944` does not
  reproduce — both challengers converge on **43/+529/−945** (both candidate 43rd files —
  `grasp.css:102` and `dockCrossfadeContext.readonly.test-d.ts` — carry row-72 edits);
  re-derive with a stated detector. MIGRATION's "added at 8.0" row lists
  `--dock-vertical-{padding,extend-length,accent-*}` as added when NONE is declared in
  `src/` (consumer handles per §8 finding 1) — correct. `sizing.css:477`'s
  `dock-controls.css` path is dead (the ::before lives at
  `dock/styles/controls/touch-floor.css`) — re-point.
- **C8 (paste blocks):** propagate C5/C7 into BOTH banked blocks before the driver
  appends ("only the mandatory G-RELAY … was taken" and "42 files (+528/−944)" are
  refuted). `<SHA>` stays literal; ⊕-index derived at commit time.

## Driver duties at commit (not the cure seat's)

Hunk-split `src/components/dock/index.ts`, `MIGRATION.md`, `CHANGELOG.md` (foreign
LabeledSelect/GlassTimeline hunks stay out — wait: LabeledSelect/GlassTimeline hunks are
#57/#46's LANDED content... if those hunks remain unstaged in the worktree they are
completion residue — the driver attributes each at commit); re-run the battery + receipt +
demo:dist:build before `git add`; completion-rider sweep.

## Residue carried (booked, not this cure's)

`--dock-vertical-{padding,extend-length}` declared nowhere → #47 (RECORD §8 finding 1);
π (hairline both orientations, light+dark, divider delta) → #10 with the sections.vue
testids; violations:1 resolves when #40 lands; dropdown-menu flake noted (12/1415 not
perfectly deterministic); #47 stays gated (#89 sever + #7 fence + ASK g11).
