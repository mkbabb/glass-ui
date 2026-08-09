# BK #89 W-OVERLAY — RECORD

**seat**: scout+implement · **modelId**: `claude-opus-5[1m]` · **date**: 2026-08-08
**HEAD at open**: `d37aa714` (the ask named `4917a042`; the tree had moved four ledger
entries past it — ⊕⁶⁴ `#86+#88` JOINT SEALED at `621b8547` — and the cursor was read at
its live state, not the remembered one).

## §0 · SELECTION + GROUNDS

**Row #89 W-OVERLAY**, Φ5, UNSTARTED.

Grounds, from the cursor's own most recent procession line (⊕⁶⁴, `EXECUTION-PROGRESS.md`
§THE PROCESSION): *"with **#86 + #88 + #74** landed, Φ5's remaining frontier is **#89**,
whose sever precedes **#47**'s first build. After #89, the five uncommitted foreign
lanes — #32 · #33 · #35 · #40 · #71 — each need their own commit seat."* The five named
lanes each require a commit seat of their own rather than an implement seat; #47 is
stated STILL GATED at ⊕⁵⁵ (on #89's sever, the #7 fence, ASK g11); #21 stays `#17`-hard
and #17 is Φ4-UNSTARTED; #25 keeps its rides-clause. The roster row (`:3647`) reads
`UNSTARTED (⊕² spec_state = sealed)`, no execution directory exists, and nothing marks it
IN-FLIGHT. Selection is forced.

**Spec of record**: `docs/tranches/BJ/addenda/2026-07-24-refinement/CURES.md` §2 (TR#89
names it THE SPEC OF RECORD; CWT-3 §7.2 + DAG §4.1 are priors only).

### The TR cell, verbatim

> | **89** | **W-OVERLAY** (popover · dropdown-menu→menu · tooltip + `_shared/overlay`) ⊕² | **`CURES.md` §2 — THE SPEC OF RECORD** ⊕²; CWT-3 §7.2 + DAG §4.1 the priors | **Φ5** ⊕² (K-9; the prior Φ6 cell was an internal contradiction against A.2 and is #61's correction) | **⊕² SEATED — the ONE unowned spec is DISCHARGED; VERDICT blocker 4 falls** (S-9). DISPOSITION: KEEP all three components · MOVE `dropdown-menu` → `components/menu/` (`./menu` mints, `./dropdown-menu` dies at C-10, no alias) · MINT `_shared/overlay/` as a relocation · FOLD three cascade origins into `styles/glass/overlay-plate.css`, `@layer components`. The register is **three roles on the existing `data-reveal` axis, nothing parallel minted**: hint (bezier, pad 8) · menu (**`present`** ⊕⁵ SE-2 — the C-5 name-grave; constants unchanged, pad 12) · panel (`panel`, pad 12) — one `:root --overlay-pad: 12px`, the ×1.272 φ multiplier dies register-wide. **The scrim is stated as law: an ink veil that can never be glass** — zero `backdrop-filter` at every intensity forever (a `fixed inset-0` backdrop root makes the plate above sample a filtered composite), subtractive/warm/chroma-preserving, no rung, `inert` while closed; and **RECEDE is ruled honestly** — the drawer's immersive blur leg is DELETED because the blur can live neither on the page wrapper nor on the scrim, so the recede reads through translate+scale+radius bloom plus the dim, the primary construction with the impossible leg struck rather than faked. The 38-entry runtime denylist becomes an **allow list** (a reka bump can no longer leak silently); the four independent keep-open latches become **one ref-count**; `modal` becomes the single a11y axis from which `role`/`aria-modal`/`inert` derive. **DAG edges, declared:** `W-OVERLAY ══ {#81 W-PICKER, #86 W-SURFACE-MATERIAL, #82 W-FIELD, #47 GF-DOCK sever}`, after #68's six tokens, jointly with #86's ~8-line `resolve.ts` relocation (the one hard precondition), and **the sever precedes GF-DOCK's first build commit**. **All four blocked terminals UNBLOCK at this bank.** Gates: **zero mints** — 20 assertions, every one an ARM of a seated §B.5 seat, with a landed-gate collision ledger (4 amend · 1 retire · 1 batched re-pin · 1 cited · zero new test files). LOC honest: **NET ≈ −80**, ≈290 lines cross a zone boundary, 4 files die, 3 cascade origins become 1, and +140 buys the seat four terminals were blocked on. Relay: four repos measured (atlas · speedtest · slides · bbnf-buddy), one MIGRATION table each, filed under #76 |

Roster cell (`EXECUTION-PROGRESS.md:3647`) additionally carries ⊕⁶⁴'s strike-in-place:
the `resolve.ts` half is **DISCHARGED** at `621b8547`; what remained was
`overlayContentAttrs()` composing `surfaceClass` and the six `'floating'` literals
folding into that one seam.

## §0.1 · STEP-0 BASELINE (4th-recurrence protocol, ⊕⁶⁰)

- baseline diff: `/tmp/bk-row-baseline-1786231370.diff` (6,624 lines)
- `git status --porcelain | wc -l` at open: **101**
- a faithful pre-cut tree was reconstructed from it (`git archive HEAD` + `git apply
  --unidiff-zero`) at `…/scratchpad/base89` and used for BOTH the born-RED proof and the
  failure attribution below. Its one stated limit: `git archive` carries no UNTRACKED
  files, so untracked WIP from other rows (notably `useLeadTrail.ts`) is absent from it —
  every attribution that depends on that is stated by hand instead.

## §1 · WHAT LANDED — the per-item ledger

| # | spec item | disposition | trace |
|---|---|---|---|
| 1 | `_shared/overlay/` MINT (relocation) | **DONE** | new `content.ts` · `participation.ts` · `placement.ts` · `isTeleportedTarget.ts` · `index.ts` (269 lines) |
| 2 | `overlayContentAttrs()` composes `surfaceClass()` — the ONE seam | **DONE** | `_shared/overlay/content.ts:48-64`; role→`data-reveal` table at `:26-30` |
| 3 | D-4 denylist → allow list | **ALREADY DISCHARGED** at #19 W-SHIM-PURGE | `_shared/floating.ts` was 15 lines of types at open; `popover.contract.test.ts:151` records the retirement |
| 4 | `resolveSurfaceClass.ts` dies | **ALREADY DISCHARGED** at `621b8547` (#86 joint) | `_shared/surface/resolve.ts` is the plain `surfaceClass()` |
| 5 | D-5 ten hand stamps / 3 stampless surfaces | **DONE** | one writer: `participation.ts:94-115`. The three stampless surfaces now take it: `TooltipContent.vue:47` · `DropdownMenuSubContent.vue` · `CommandList.vue:26`. `SelectContent`/`DropdownMenuContent`/`PopoverContent` re-pointed |
| 6 | D-6 four latches → one token | **DONE** | `useHoldToken()` at `participation.ts:47-70`; the four callers now compose it: `Popover.vue` (was a 13-line watch + `onScopeDispose`), `DockLayerGroup.vue`, `useDockSearch.ts`, `useDockHold.ts` |
| 7 | D-7 the dock sever | **DONE, 5 → 2** exactly as §5 predicts ("closes 3 of 5") | PopoverContent · Popover · SelectContent · DropdownMenuContent stop importing `dock/`. The 2 remaining are `_shared/overlay/participation.ts` (the context read) and `Slider.vue`'s `useDockHold` — both ROUTED by §9 to #42/#47 · #35 |
| 8 | `isTeleportedTarget` moves out of `dock/` | **DONE** | `dock/composables/isTeleportedTarget.ts` deleted; `dock/composables/index.ts` re-exports from `_shared/overlay/` (direction dock → _shared) |
| 9 | D-2 cascade trifurcation → ONE layered origin | **DONE** | `dropdown-menu/styles.css` (127 lines) DELETED with its `<style src>` at `DropdownMenu.vue:101`; the unlayered plate block at the tail of `_shared/menu/menu.css` DELETED; both folded into `styles/glass/overlay-plate.css` `@layer components` |
| 10 | D-3 two boundary authorities die | **DONE** | tooltip's bare `border` utility gone (`TooltipContent.vue`); the menu's `border: 1px solid var(--border)` not carried into the fold. The register declares NO `border` and NO `box-shadow` — the rung is the sole author |
| 11 | §3.1 the ONE register, three roles on `data-reveal` | **DONE** | `.glass-overlay-plate` + `[data-reveal="menu"|"overlay"|"tooltip"]` at `overlay-plate.css:56-97` |
| 12 | D-12 pad law — `--overlay-pad` 12, hint 8, ×1.272 dies | **DONE** | `--overlay-pad-hint: 8px` minted once at `offsets.css`; the three inline `[--overlay-pad-inline:…]` mints and both √φ block multipliers deleted from `PopoverContent`/`TooltipContent` |
| 13 | `--panel-padding` retires | **DONE** | last two readers gone (command took `--overlay-pad` at #81; the unlayered block died here); token deleted with its grounds at `offsets.css` |
| 14 | D-14 three radii → LAW 7 | **DONE** | hint takes `--radius-panel` via `--radius-ctx`; `--radius-tooltip` (→`--radius-lg`→`--radius`, the raw 0.625rem shadcn root) DELETED |
| 15 | D-13 bounds — `8rem` literal, `w-72`, `60vh` | **DONE** | `min-inline-size: var(--overlay-min-width)`; `inline-size: min(21rem, calc(100dvw - 2*var(--overlay-pad)))` (#59's cel measure consumed); the ceiling reads `--overlay-max-block` (`min(24rem,60dvh)`, banked at #81) |
| 16 | D-15 two class spellings on one element | **DONE** | `'dropdown-menu-content dropdown-menu__content'` → the single `.glass-overlay-plate`; same for the sub-content pair |
| 17 | D-16 `--z-hovercard` orphan | **DONE** | deleted at `scheme-motion.css` with its `bridges.css` bridge; whole-repo census 0 consumers |
| 18 | D-17 in-lane `data-material` / content `data-surface` | **DONE** | the `surface` prop + `:data-surface` deleted from Tooltip/Popover/DropdownMenu/Select content. Census first: only `[data-surface="veil"]` and `="opaque"` carry rules — the hardcoded `"glass"` these four emitted matched none |
| 19 | D-18 PopoverContent's triple tree | **DONE** | three subtrees → ONE content node; `PopoverContent.vue` 129 → 130 lines with the duplication gone |
| 20 | D-8 the `role`/`aria-modal` strip + `modal` axis | **DONE, with one honest narrowing** | `modal` prop on `<Popover>`, published through `popoverContext`, reaching `RekaPopoverRoot`; the `$attrs` destructure deleted. **NARROWED**: `role` on the click arm stays reka's `dialog` — `PopoverContent` writes it in its own template after `$attrs`, so nothing here can override it, and claiming otherwise would be a claim with no paint. The axis owns what it can enforce: reka's `modal` (the real trap) + `aria-modal`, which now appears exactly when the root enforces it. Reason written at the site |
| 21 | D-10 the hint announces what it does not paint | **DONE** | `TooltipContent.ariaLabel` DELETED, no alias. `tooltip.contract.test.ts:24,101` SURVIVES unchanged as §5.1 predicted (trigger-side) |
| 22 | `.popover-content { outline: none }` | **DONE** | replaced by a `:focus-visible` ring off `--focus-ring-shadow` at `utilities/base.css` |
| 23 | D-11 the exit — fade-led at 60% | **DONE** | a `60% { opacity: 0 }` stop in `@keyframes glass-reveal-out`. (The `0.15s` literal + the derived `-exit-duration` had already landed at #26 — `src/styles/tokens/motion-registers.css:146` reads `--spring-panel-exit-duration`) [⊕⁶⁵ CURE-89-6 2026-08-08 · full-pathed] |
| 24 | §3.1 popover re-points `menu` → `overlay` | **DONE** | via the seam's role table (`panel` → `data-reveal="overlay"`, the `--spring-panel` row #26 landed) |
| 25 | K-4 entry rows | **ALREADY DISCHARGED** at #26 (`d27ec5dc`) | `src/styles/tokens/motion-registers.css:69-88` [⊕⁶⁵ CURE-89-6 2026-08-08 · full-pathed]: overlay→`--spring-panel`, menu→`--spring-present`, tooltip→`--ease-out-expo` |
| 26 | a THIRD divider ink, found mid-cut | **CURED IN-CUT** | the fold surfaced `.dropdown-menu__separator` painting `color-mix(…var(--border) 70%…)` while Select and Command both already composed `.glass-menu-divider`. `DropdownMenuSeparator.vue` now composes it too; geometry byte-identical (`my-1 -mx-1` = the old `margin: .25rem -.25rem`) |

## §2 · REFUSED, WITH GROUNDS — each routed, none dropped

**R-1 · the `dropdown-menu` → `components/menu/` MOVE + the `dropdown` namespace →
C-10 (#65/#66).** The spec routes BOTH halves of the subpath act out of this row: §9's
ROUTED table reads *"the `./menu` mint + ONE public-surface re-pin | **C-10 → #65/#66**"*,
§3.4 *"`./dropdown-menu` dies in C-10's batched cut only"*, §3.6 *"rides C-10's ONE
batched export cut + ONE `public-surface.spec.ts` re-pin — no solo pin bump"*, §4 *"the
`dropdown` namespace (at C-10)"*, and the TR cell itself. Moving the directory while its
export byte belongs to another row ships exactly the half-state ⊕⁶⁴ forbids
(*"one cut, no half-state"*): `package.json`'s `./dropdown-menu` → `dist/dropdown-menu.js`
would dangle. **What this row did instead is make the rename a pure identifier
substitution**: every byte of material has left `components/dropdown-menu/` (the CSS file
is deleted, the plate is the register, the class spellings are collapsed to one), so C-10
renames names and nothing else. The four MIGRATION tables ride #76 per §9.

**R-2 · `_shared/overlay/OverlayScrim.vue` NOT minted.** §3.2 asks for the primitive with
"three consumers (#38 dialog · #39 sheet · #52 expandable)". On disk after #38/#39
landed, `DrawerOverlay.vue` no longer exists: **`dialog/ModalOverlay.vue` IS the one scrim
component, and it is already the scrim for BOTH dialog and sheet.** A second component
wrapping the one that exists is the growth-wearing-a-relocation-costume the spec's own
§8 forbids, and it would ship with ONE real consumer (G-OVERFIT). The LAW is what this
row owed and the law is already met in paint — see R-3.

**R-3 · K-6's third scrim root does not reproduce; the count is 1, not 3.** Reproduced on
disk this seat: `ModalOverlay.vue`'s `backdrop-filter` leg was deleted at #38 on a
measurement (RT-30F, DISCHARGED); `DrawerOverlay.vue` is gone; and
`expandable-container/styles.css:34`'s `backdrop-filter: var(--glass-blur-wash)` is
**on `[data-part="trigger"]` — a 40px BUTTON, not a scrim** (`ExpandableContainer.vue:12`'s
`.glass-overlay` is the expanded PLATE's rung, and plate-local frost is what the law
expressly permits). So K-6's "3 roots / 4 declarations" is superseded: **zero
`fixed inset-0` backdrop roots survive in `src/`.** No SCRIM-INK arm is bound, because a
gate asserting a law with no live violator and no owned file would be a promise, not a
detector; the finding is routed to #61 as doc-truth and to #52 for its own census.

**R-4 · D-9 the scrim's exit-window `inert` arm → RT-89-A (#38/#39).** The arm the spec
cites as the model (`DrawerOverlay.vue:48`) no longer exists — it was deleted with
DrawerOverlay in #39's cut. `ModalOverlay` cannot carry it as written: its `<slot/>` holds
`DialogContent`, so `inert` on the overlay would inert the content it frames. Re-deriving
the discipline needs the CONTENT's own `forceMount` state, which §0 places at #38/#39.

**R-5 · the tether (NOVELTIES row 37, K-8) → its own condition, unmet.** §3.4's binding
condition is verbatim: *"the first consumer composition names a genuinely springing host
— the drawer-anchored popover (#39's shell) or the morphing dock — **or the tether has no
paint and does not ship**."* Neither host exists at this HEAD (#47 GF-DOCK is gated,
unstarted). Not shipped, per the condition's own text. §9 assigns the host to #39/#47.

**R-6 · Toast / Dialog / Sheet keep their `surfaceClass("floating")` literals.** Of the six
R-A literals, the three that belong to the overlay REGISTER (tooltip · dropdown-menu ·
popover) now come through the seam. `Toast.vue:91`, `DialogContent.vue:174` and
`SheetContent.vue:105` are not overlay-register members — §0 places dialog/sheet out of
scope (#38/#39) and toast rides `enter-overlay` for parity only (#61's RT-38G names its
register mis-naming). Folding them would repaint two sealed rows' surfaces.

**R-7 · `field-surfaces.css`'s 217 portal lines (K-10)** — already relocated by #82's
landing (`7df2ec26`); `field-control.css`/`field-surfaces.css` carry no portal payload at
this HEAD. Nothing to move.

## §3 · GATES — arms only, zero mints, budget unchanged

Bound under the seated **`G-OVERFIT`** seat as its **OVERLAY-SEAM arm**, in the existing
`tests/gates/overfit-structure.test.ts` (§5.1's "zero new test files" honoured):

| arm | assertion | born-RED proof |
|---|---|---|
| PORTAL-ONE (writer) | the `data-glass-dock-portal` stamp is written from exactly ONE module | **RED** on the pre-cut tree (`base89`): 4 writers |
| PORTAL-ONE (reach) | each of the four portalled roots that can sit under a dock takes `useDockParticipation()` | **RED** pre-cut: 0 of 4 |
| ONE-LATCH | exactly one module calls the dock's `keepOpen` | **RED** pre-cut: 4 callers |
| self-test bite | each detector matches its own shape and rejects the near-miss | green by construction — that is its job |

Born-RED receipt, verbatim, run against the reconstructed pre-cut tree:

```
× PORTAL-ONE — the dock-portal stamp has exactly one writer 13ms
× PORTAL-ONE — every portalled overlay root actually takes the seam 1ms
× ONE-LATCH — exactly one keep-open token implementation 4ms
Tests  3 failed | 1 passed | 10 skipped (14)
```

[⊕⁶⁵ CURE-89-6 2026-08-08 · **THE FILTER, DISCLOSED.** That receipt is not a plain run and
the "10 skipped" is not the file's doing — `overfit-structure.test.ts` contains zero
`skip`/`todo`/`only` conditions, so a plain run cannot produce a skip. The command was

```
$ npx vitest run tests/gates/overfit-structure.test.ts -t "OVERLAY-SEAM"
```

run with this row's final test file placed over the reconstructed pre-cut `src/` — new
detectors, old source, which is the whole point of a born-RED proof. `-t` matches the
`describe` name, so the 4 tests of the OVERLAY-SEAM arm run and the file's other 10 are
name-filtered out: 4 + 10 = the file's 14. The same filter on the post-cut tree returns
`Tests  4 passed | 10 skipped (14)` — same denominator, same skip count, the three RED
gone green, which is the pair the born-RED claim actually rests on.]

### Landed-gate collisions (the §5.1 ledger, as executed)

| gate | §5.1 says | done |
|---|---|---|
| `popover.contract.test.ts:150` "filters retired props at runtime" | RETIRE | **already retired at #19**; the two remaining cases AMENDED for the `modal` axis + the portal unification |
| `dropdown-menu.contract.test.ts` (9 cases) | AMEND + re-home to `tests/components/menu/` | **no amendment needed** (22/22 green unchanged); the re-home rides C-10 with the directory, per R-1 |
| `dropdown-menu.public-contracts.test-d.ts:26` | AMEND | no amendment needed |
| `custom/dropdown-menu/DropdownMenuTrigger.action.test.ts` | AMEND + re-home | green unchanged; re-home rides C-10 |
| `dialog-show-close.test.ts:71` (`data-material === "overlay"`) | AMEND | **no longer exists** — the `[data-material]` grammar died whole at #86 (C-2) |
| `token-graph.test.ts:256` | #86's edit, cited | cited, untouched |
| `public-surface.spec.ts:17,398` | C-10 batched re-pin | untouched (no solo pin bump) |
| `tooltip.contract.test.ts:24,101` | SURVIVES | survives, green |

**Two collisions BEYOND the ledger, disclosed:**
- `tests/components/a11y/focus-visible.test.ts` read `src/components/dropdown-menu/styles.css`
  by path (ENOENT after the fold). **RE-POINTED** to `styles/glass/overlay-plate.css` — the
  selectors it asserts are unchanged, only the origin moved, which is why it re-points
  rather than relaxes. 8/8 green.
- `tests/styles/radius-role-canon.test.ts` (#23's landed 7-role spine) carried
  `--radius-tooltip` in three data rows. **AMENDED** (3 rows struck). §9 routes the
  `--radius-tooltip` chain to **#23**, which sealed at `a6d7db90` without executing it;
  taken here on the ⊕⁵⁷ C-8 handoff precedent because §3.1's role table ("the shadcn
  0.625rem chain dies") is this row's own design. Its `cn("rounded-tooltip", …)` parser
  case is a STRING test and correctly survives untouched.

### [⊕⁶⁵ CURE-89-3 2026-08-08] Reconciliation against the TR's "20 assertions"

The TR cell reads *"Gates: **zero mints** — 20 assertions, every one an ARM of a seated
§B.5 seat, with a landed-gate collision ledger (4 amend · 1 retire · 1 batched re-pin ·
1 cited · zero new test files)."* What landed is **4 `it()` / 7 `expect()`** in the
OVERLAY-SEAM arm (`overfit-structure.test.ts:422-501`) — **10 assertions at run time**,
because the reach detector's single `expect` runs once per each of its four portalled
roots — plus the collision amendments below. Counted honestly against the figure:

| | assertions | where |
|---|---|---|
| NEW, this row's arm | **10** (4 `it`, 7 written `expect`) | `overfit-structure.test.ts:442-500` |
| AMENDED, existing gates re-pointed at this row's design | **2** popover-contract cases (the `modal` axis + the portal unification) · **8** re-pointed in `focus-visible.test.ts` · **3** data rows struck in `radius-role-canon.test.ts` | §3's ledger + the two disclosed collisions |
| REFUSED with a falsifier | the SCRIM-INK arm | R-3 — no live violator, no owned file |
| ROUTED | the `tests/components/menu/` re-home + the `public-surface.spec.ts` re-pin | RT-89-B → C-10 (#65/#66) |

**The figure is DISCHARGED, and not by minting.** Three grounds. (1) The clause the "20"
sits inside is a **ceiling under `zero mints`**, and its four binding terms all hold: zero
new seats (`gate-register.mjs` byte-identical, §4), every assertion an arm of the seated
`G-OVERFIT`, the collision ledger executed row by row, zero new test files. (2) The figure
was projected against a spec census that partly evaporated before this row opened — six of
its twenty-six items were already discharged by #19/#23/#26/#81/#82/#86, and K-6's
three-scrim-root census does not reproduce at all (R-3), so a share of the projected
assertions had nothing left to assert against. (3) Writing filler `expect`s to reach a
round number is precisely the contrived-gate growth the gates-abrogation mandate exists to
stop; the mandate outranks a spec's projected count.

**Remainder, routed rather than dropped:** the one arm the figure counted that is not here
is SCRIM-INK, already routed at **RT-89-C** (→ #61 doc-truth · #52 its own census); the
gate assertions belonging to the `menu/` re-home ride **RT-89-B → C-10**. Nothing else in
the "20" is unaccounted for.

## §4 · VERIFY GATE — verbatim

[⊕⁶⁵ CURE-89-2/5 2026-08-08 · this block is the receipt AT THE ROW'S CLOSE and stands as
written. The post-cure re-verify — same battery, `dist-demo` rebuilt first — is banked at
**§8**, where the count moves 13 → **12** for a stated reason.]

```
$ npx vue-tsc --noEmit
(clean — no output)

$ npx vitest run tests/styles tests/components tests/gates      # run 1
 Test Files  7 failed | 154 passed (161)
      Tests  13 failed | 1532 passed | 5 expected fail (1550)

$ npx vitest run tests/styles tests/components tests/gates      # run 2 (consecutive)
 Test Files  7 failed | 154 passed (161)
      Tests  13 failed | 1532 passed | 5 expected fail (1550)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
```

**The register receipt is BYTE-IDENTICAL pre and post.** The pre-cut receipt, run against
the reconstructed baseline tree, is the same string character for character:

```
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
  VIOLATION active pager.tabs.panel-linkage: sourcePath missing — tests/components/pager-dots.contract.test.ts
```

The ask's target string names `violations:0`; the on-disk pre-state is `violations:1`, and
the single violation is **#40 W-PAGER's** (`pager.tabs.panel-linkage`, an in-flight lane
with deleted-and-recreated files). Byte-identity pre+post is the binding condition and it
holds. Seats **60**, bound **8**, unbound **50**, `rosterSha256` unmoved — arms only, zero
mints, as §5 requires.

### The 13 residual RED, every one attributed off this fence

| count | file | owner | attribution |
|---|---|---|---|
| 3 | `tests/gates/gate-register.test.ts` | standing | **identical 3 failures on the pre-cut tree** (receipt above) |
| 1 | `tests/styles/stacked-url-filter.test.ts` | **#40** | the test's own title: *"BORN-RED on PagerDots.vue:493, #40 W-PAGER owns the flip"*; identical pre-cut |
| 2 | `tests/gates/boot-graph.test.ts` | **#40** | `dist/` staleness; ⊕⁶⁴ routes it verbatim: *"`dist/` staleness → resolves at #40's landing"* |
| 5 | `tests/components/pager-dots/{contract,morph}.test.ts` | **#40** | mid-refactor WIP in the live tree (4 files deleted, 1 added, uncommitted). `rg` for `_shared/overlay\|dropdown-menu\|popover\|tooltip\|dockContext\|useHoldToken` over `src/components/pager-dots/` → **0 hits**: no contact with this cut |
| 1 | `tests/components/carousel/contract.test.ts` | **#40** | same lane, same WIP (3 files deleted, 3 added, uncommitted); same 0-hit census |
| 1 | `tests/gates/overfit-structure.test.ts` EXPORT-REACH | **#26** | `src/composables/motion/morph/useLeadTrail.ts :: LEAD_TRAIL_TAU_E_S` + `trailOffset`. The file is **UNTRACKED** (`git status` → `??`) — #26's colocation WIP, absent from `HEAD` and from the reconstructed baseline, which is why the baseline run greened this gate. Neither symbol appears in any file this fence touches |

Zero of the 13 sit in an import graph this row touches, and none is caused by a line this
row wrote. [⊕⁶⁵ CURE-89-6 2026-08-08 · ~~Zero of the 13 sit in a file this row wrote or in
an import graph it touches~~ **SOFTENED — the file half was overclaimed.** The #26
EXPORT-REACH failure sits in `tests/gates/overfit-structure.test.ts`, which this row
extended by 81 lines. It fails in the **EXPORT-REACH** `describe` at `:215` — a
pre-existing arm this row did not open, edit or re-point — over two symbols
(`LEAD_TRAIL_TAU_E_S`, `trailOffset`) exported from an UNTRACKED file that no line of this
fence imports. The row's own 81 lines are the OVERLAY-SEAM `describe` appended at the tail
(`:422-501`), which is green. Shared file, disjoint arms — the attribution stands, the
"file this row wrote" phrasing did not.]

## §5 · THE FENCE (derived, per ⊕⁶⁰)

Derived as (post-cut worktree) minus (the banked step-0 baseline), never a whole-file
stat wearing the row's name. Banked at `FENCE.diff` beside this record.

- **28 tracked files modified · +627 / −248** [⊕⁶⁵ CURE-89-1 2026-08-08 · MEASURED off the
  regenerated `FENCE.diff`; ~~27 tracked files modified · +532 / −248~~ was measured
  against a base tree whose `overfit-structure.test.ts` had been overwritten with this
  row's own final copy, so that file's delta read zero and it fell out of the fence]
- **3 files deleted** (160 lines): `_shared/floating.ts` · `dock/composables/isTeleportedTarget.ts` · `dropdown-menu/styles.css`
- **5 files created** (269 lines): `_shared/overlay/{index,content,participation,placement,isTeleportedTarget}.ts`
- files newly dirtied by this row: **27** (baseline dirty 79 → final 106) — the 28th
  modified file, `overfit-structure.test.ts`, was ALREADY dirty at baseline, so it is a
  fence member without being a newly-dirtied one

Four of the touched files (`offsets.css` · `focus-visible.test.ts` ·
`radius-role-canon.test.ts` · `overfit-structure.test.ts`) were ALREADY dirty at baseline
from other rows. [⊕⁶⁵ CURE-89-1 2026-08-08 · ~~this fence's hunks in them are additive and
are the ones counted above~~ **STRUCK as false when written**: `overfit-structure.test.ts`
was not counted above at all — it was absent from the artefact. All four are counted now,
and the regenerated fence takes its left side from a CLEAN reconstruction
(`git archive d37aa714` + `git apply --unidiff-zero` of the baseline, nothing overwritten),
so a baseline-overlap file contributes only this row's delta by construction rather than
by assertion. The four measure: `offsets.css` +15/−12 · `focus-visible.test.ts` +10/−5 ·
`radius-role-canon.test.ts` +0/−3 · `overfit-structure.test.ts` **+81/−0** — one contiguous
hunk at the file's tail, the OVERLAY-SEAM block, appended after a baseline delta of
+10/−8 that belongs to another row.]

**LOC honesty.** The SPEC's §8 (`CURES.md` §2 — not this record's §8) projected NET ≈ −80.
The realised net is **≈ +488** [⊕⁶⁵ CURE-89-1
2026-08-08 · re-measured off the regenerated artefact: ~~≈ +393~~. Derivation, not
adoption: +627 − 248 (28 modified) − 160 (3 deleted) + 269 (5 created) = **+488**. The
+95 the old figure was short is the +81 OVERLAY-SEAM block the fence had dropped plus the
+14 the CURE-89-2 and CURE-89-5 comment rewrites add]. The difference from that projection
is not a miss but a re-baselining: the two largest subtractions the spec counted (the 45-line
denylist and the 6-line `resolveSurfaceClass`) had already been banked by #19 and #86
before this row opened, so they cannot be spent twice. What this cut actually buys is
unchanged: 3 cascade origins → 1, three files die, ten stamps → one writer, four latches →
one token, and the seam four terminals were blocked on now exists.

## §6 · ROUTED

| id | item | owner |
|---|---|---|
| RT-89-A | the scrim's exit-window `inert` arm (D-9) — the cited model was deleted with `DrawerOverlay` | **#38 / #39** |
| RT-89-B | the `dropdown-menu` → `menu/` directory move + the `dropdown` namespace + the `./menu` subpath + the ONE `public-surface.spec.ts` re-pin + the `tests/components/menu/` re-home | **C-10 → #65/#66** |
| RT-89-C | K-6's scrim census superseded: 1 root, not 3 — `expandable-container:34` is a TRIGGER's plate-local frost, not a scrim | **#61** (doc-truth) · **#52** (its own census) |
| RT-89-D | the tether (NOVELTIES row 37) — no springing host at this HEAD, so no paint, so no ship, per its own condition | **#39 / #47** supply the host |
| RT-89-E | `_shared/overlay/participation.ts` + `Slider.vue` — the 2 remaining `dock/` importers after the 5→2 sever | **#42/#47 · #35** |
| RT-89-F | four consumer MIGRATION tables (atlas · speedtest · slides · bbnf-buddy), one marked addendum each — they fire at the C-10 rename, not at this cut | **#76** |
| RT-89-G | `useLeadTrail.ts` is UNTRACKED at HEAD and leaks 2 exports through G-OVERFIT | **#26** (commit seat) |
| RT-89-H | `--radius-tooltip`'s deletion was §9-routed to #23, which sealed without it; executed here on the C-8 precedent | **#61** (doc-truth on the routing) |
| π | the §6 battery (P1-P9) — routes `/containers/{popover,dropdown-menu,context-menu,hover-card,tooltip}`, port 5400, both engines, P0 mode-assertion; §6 states material π is inadmissible until #56's receiver row and re-runs after #22's F-rows (T-C) | **#10** |

## §7 · THE ONE THING TO CARRY FORWARD

A spec written before its neighbours land ages into a map of a country that moved. Six of
this row's twenty-six items were already discharged by #19, #23, #26, #81, #82 and #86 —
and two of its load-bearing censuses (K-6's three scrim roots, K-10's 217-line payload)
**do not reproduce on disk at all**. Every one of those was checked before a byte was
written, and the two that died are recorded with their falsifiers rather than executed on
faith. The cost of skipping that census would have been a `backdrop-filter` deletion on a
button and a relocation of a payload that had already moved.

## §8 · CURE ROUND (2026-08-08)

**seat**: cure · **modelId**: `claude-opus-5[1m]` · **charter**:
`CURE-ORDER-89.md` (driver-ratified, adjudicator Fable, quartet run `wf_a0cc82f4-d5b`).
All six cures executed. NO FUNCTIONAL CODE MOVED — the two `src/` cures are comment-only
and are proven so by a diff, not by assertion.

### CURE-89-1 · the fence, regenerated (material, artefact)

**Root cause, named.** The first artefact was `diff -u base89/<f> <f>`, and `base89` had
been built for the born-RED run — its `tests/gates/overfit-structure.test.ts` was
**overwritten with this row's own final test file** so the new detectors could be run
against old `src/`. That one file therefore measured a delta of zero against itself and
fell out of the fence entirely, taking +81 lines with it. The 4th-recurrence class is not
"the seat forgot a file"; it is "the left side of the subtraction was not the baseline".

**Fix.** A CLEAN baseline tree, rebuilt and never written into:

```
$ git archive d37aa714 | tar -x -C <scratch>/base89v2
$ (cd <scratch>/base89v2 && git apply --unidiff-zero /tmp/bk-row-baseline-1786231370.diff)
```

then `diff -u baseline/<path> final/<path>` over the union of (`git diff --name-only HEAD`)
and (the 79 paths in the baseline). Absorption is impossible by construction: the left side
already carries every baseline hunk, so a baseline-overlap file yields only this row's
delta. The regenerated artefact carries its own derivation and totals in a `#` preamble.

**Detectors** (run against the artefact, not against memory):

| detector | before | after |
|---|---|---|
| `grep -c '^--- baseline/' FENCE.diff` | 27 (headers were absolute scratch paths) | **28** |
| `+`/`−` recount over the artefact body | +532 / −248 | **+627 / −248** |
| `overfit-structure.test.ts` present in the fence | **NO** | **YES, +81 / −0** |
| net = (+ − −) − deleted + created | ≈ +393 | **+488** |

**The 28th file, measured three ways so it cannot be a copied figure**: `wc -l` 420
(baseline) → 501 (final) = +81; `diff -U0` = +81 / −0; `git diff --no-index --numstat -U0`
= `81  0`. The baseline's own delta in that file is +10 / −8, exactly as the order states.
The order's projected `+76` is **not adopted** — it came of subtracting two `--numstat`
runs whose hunks merge differently; the direct measurement is **+81**.

**Foreign-contamination check.** Every tracked path in the union was diffed, not just the
row's 28: nothing outside the 28 modified + 3 deleted differs from the clean baseline, so
no concurrent seat's work has leaked into this fence.

**Figures re-derived, with dated brackets on the old ones**: §5's file/line line (pre-cure
`:228`), its baseline-overlap sentence (pre-cure `:233-235`, which claimed the four
overlap files "are the ones counted above" while one of them was not counted at all), and
its LOC-honesty net (pre-cure `:237`).

### CURE-89-2 · the popover doc blocks, narrowed (material, `src/`, comment-only)

The two doc blocks promised an axis the paint does not deliver; `PopoverContent.vue:102-107`
is the truth and the comments now match it.

| site | before | after |
|---|---|---|
| `src/components/popover/Popover.vue` (pre-cure `:26-31`) | *"`false` (default): a non-modal panel. `role="group"` with a required accessible name … `true`: `role="dialog"` + `aria-modal`"* — i.e. the axis flips the ROLE | the axis owns modality and `aria-modal`; **THE ROLE IS NOT ON THIS AXIS** — the click arm keeps reka's `role="dialog"` modal or not, `role="group"` is the hover arm's alone |
| `src/components/popover/PopoverContent.vue` (pre-cure `:21-25`) | *"REQUIRED on a non-modal panel — `role="group"` with no name …"* | REQUIRED on the **HOVER** arm, the one arm that renders `role="group"`; the click arm is reka's `role="dialog"` either way and may name itself from a heading |

**Detector — zero behavior change, proven.** The row-final files were reconstructed
(`base89v2` + the first artefact's per-file hunks) and diffed against the cured files;
every changed line is inside a `/** … */` body:

```
Popover.vue        :: non-comment changed lines = 0
PopoverContent.vue :: non-comment changed lines = 0
```

### CURE-89-3 · the "20 assertions" reconciliation (record)

Added as a dated subsection at the end of §3. Delivered is **4 `it()` / 7 `expect()`**
(`overfit-structure.test.ts:422-501`), **10 assertions at run time** — the reach detector's
one `expect` runs once per each of its four portalled roots — plus the collision
amendments. **Detector**: `sed -n '422,501p' … | grep -c '\bit('` → `4`;
`grep -c 'expect('` → `7`. Grounded as DISCHARGED on the clause's four binding terms (zero
seats, arms of a seated seat, ledger executed, zero new test files), not by minting; the
one arm the figure counted that is absent is SCRIM-INK, already routed at RT-89-C.

### CURE-89-4 · the paste blocks, folded (record)

| block | before | after |
|---|---|---|
| B (roster cell) | carried ⊕⁶⁴'s bracket unqualified: **six** `'floating'` literals fold into the seam | dated strike in place: ~~six~~ **THREE** fold (tooltip · dropdown-menu · popover), **three REFUSED** at R-6 (`Toast.vue:91` · `DialogContent.vue:174` · `SheetContent.vue:105` are not register members) |
| A | "+532/−248 across 27 files … net ≈ +393" | "**+627/−248 across 28 files** … net **≈ +488**", with the measurement's provenance named |
| C | "~~NET ≈ −80~~ re-baselined to ≈ +393" | "~~NET ≈ −80~~ re-baselined to **≈ +488**" with the four component figures spelled out |

**Detector — PIPE-COUNT LAW**: `grep -c '|' PASTE-BLOCKS.md` → **0**, before and after, so
every block still pastes into a table cell intact. `⊕ⁿ` and `<SHA>` literals preserved
verbatim (⊕², ⊕⁶⁴ ×2, ⊕⁶⁵ ×3, `dc05df91`).

### CURE-89-5 · `overlay-plate.css:44`, scoped (material, `src/`, comment-only)

**Before**: *"ONE BOUNDARY AUTHORITY. Nothing here declares `border` or `box-shadow`"* —
false of the FILE. **After**: *"THE REGISTER — `.glass-overlay-plate` and its three roles
— declares no `border` and no `box-shadow`"*, Block A's form, with the two live
counter-examples named at the site so the claim cannot silently re-inflate:
`.dropdown-menu__trigger:focus-visible` paints the focus ring's `box-shadow` (pre-cure
`:123`) and #81's `[data-slot="select-content"]` block carries its own `--ink-edge` border
plus the cartoon under-stamp (pre-cure `:243-251`). Neither is a plate boundary.
**Detector**: `diff` row-final → cured shows **0** changed lines containing `;`, `{` or `}`.

### CURE-89-6 · record hygiene (record)

| item | before | after |
|---|---|---|
| §4's closing claim (pre-cure `:221`) | *"Zero of the 13 sit in a file this row wrote or in an import graph it touches"* | **SOFTENED**: zero sit in an import graph this row touches and none is caused by a line it wrote — but the #26 EXPORT-REACH failure DOES sit in `overfit-structure.test.ts`, a file this row extended by 81 lines, in the pre-existing EXPORT-REACH arm at `:215`, disjoint from the row's own tail block at `:422-501` |
| §3's born-RED receipt "10 skipped (14)" | presented as a plain run | **FILTER DISCLOSED**: `npx vitest run tests/gates/overfit-structure.test.ts -t "OVERLAY-SEAM"`, with the row's final test file over the pre-cut `src/` |
| §1's two `motion-registers.css` cites (pre-cure `:70`, `:72`) | bare filename | `src/styles/tokens/motion-registers.css:146` and `…:69-88` |

**Detector for the filter disclosure**: `grep -n 'skip\|todo\|\.only' tests/gates/overfit-structure.test.ts`
→ **no matches**, so the file cannot skip anything on its own; and the same `-t` filter on
the post-cut tree returns `Tests  4 passed | 10 skipped (14)` — same denominator, same skip
count, the three RED gone green.

### §8.1 · POST-CURE VERIFY — verbatim

```
$ npm run demo:dist:build
dist-demo/assets/Aurora-Cttdpcc_.js    208.05 kB │ gzip: 69.31 kB
✓ built in 1.54s

$ npx vue-tsc --noEmit
EXIT=0            (clean — no output)

$ npx vitest run tests/styles tests/components tests/gates      # run 1
 Test Files  7 failed | 154 passed (161)
      Tests  12 failed | 1533 passed | 5 expected fail (1550)

$ npx vitest run tests/styles tests/components tests/gates      # run 2 (consecutive)
 Test Files  7 failed | 154 passed (161)
      Tests  12 failed | 1533 passed | 5 expected fail (1550)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1

$ node scripts/regen-exports.mjs
  >>> EXACT REPRODUCTION: YES
EXIT 0 — fail-closed PASS + fidelity PASS + regen exact.
```

The register summary line is **byte-identical** to §4's and to the pre-cut receipt — arms
only, zero mints, `rosterSha256` unmoved, through the cure round as well.

### §8.2 · THE 12 RESIDUAL RED — twice-stable, each attributed

| n | test | owner | attribution |
|---|---|---|---|
| 3 | `tests/gates/gate-register.test.ts` (the seat/roster resolve + 2 BITEs) | standing | identical on the pre-cut tree (§4's receipt) |
| 4 | `tests/components/pager-dots/contract.test.ts` | **#40** | uncommitted pager WIP; 0 import contact with this cut (§4's census) |
| 1 | `tests/components/pager-dots/morph.test.ts` | **#40** | same lane |
| 1 | `tests/components/carousel/contract.test.ts` | **#40** | same lane |
| 1 | `tests/styles/stacked-url-filter.test.ts` | **#7** unit case, **#40** owns the flip | the test's own title says so |
| 1 | `tests/gates/overfit-structure.test.ts` EXPORT-REACH | **#26** | untracked `useLeadTrail.ts`; pre-existing arm, see CURE-89-6 |
| 1 | `tests/gates/boot-graph.test.ts` build arm | routed **#66** | the modulepreload ceiling |

**THIS ROW'S OWN RESIDUAL: ZERO.** Nothing in the 12 is attributable to #89.

**Why 13 → 12, stated rather than pocketed.** §4 recorded **two** `boot-graph` failures
and attributed both to `dist/` staleness. The cure round rebuilt `dist-demo` first, as the
charter directs, and one of the two greened on the spot — it *was* staleness. The survivor
is the ceiling arm, and its figure moved with the rebuild:

```
AssertionError: eager graph: 63 modulepreloads + 1 entry = 64 files / 477311 B:
expected 63 to be less than or equal to 60
```

so it reads **63-vs-60** at this tree, not the 61-vs-60 the order carried from the stale
build. Same failure, same routing (**#66**), a figure that is a function of the build and
must be re-read after any rebuild rather than quoted from a prior round.
