# BL — wave index

One row per wave. The source of record for scopes, loop gates and edges is `../PLAN.md` (§3, §4, §5); this index restates §3's rows for lookup and carries no edges. "Loop" names the design loop whose convergence gate the wave waits on. Split families hold only the part PLAN §3 names.

**The release column is the one record of which release carries a wave.** No wave header, band table or progress line states a release of its own; where one still does, this column wins. Its values:

- **10.1.5, 11.0.1, 11.1.0, 11.1.1, 11.2.0, 12.0.0, 13.0.0:** the release that carries the wave.
- **unplaced:** no release yet. PLAN §2 gave band 0 to 10.2.0 and every other band to 11.0.0. 10.2.0 was never cut, and 11.0.0 published as the u/b7 merge without the band waves, so every band wave not named to a release since then is unplaced.
- **"Ahead of it":** INBOUND rows booked to a wave that shipped, or are placed, in a release before the wave itself. The row ids are INBOUND's; the wave's own scope is still as the cell's first word says.

Three releases carry INBOUND rows and no wave. Their lists are their own files: 10.1.5 (the `release-10.1.5` worktree's `docs/release-10.1.5/`, scope frozen at O-207), 11.0.1 (`../driver/glass-11.0.1-scope.md`) and 11.1.1 (`../driver/glass-11.1.1-scope.md`). 11.1.0 carries INBOUND rows through its lanes (`docs/release-11.1.0/` in its worktree). 11.2.0 is W-I.8 with the u/dp intake (O-217, O-226). 12.0.0 is W-R.1, W-G.7 and W-J.1. 13.0.0 is the blob run: W-G.1, W-B.9, W-G.5 and W-G.5b, in that order on one branch cut from master after `v12.0.0` is merged (`W-G.1.md` §0.1, §0.2); 12.0.0 never waits on it.

| id | band | release | families | scope | loop |
|---|---|---|---|---|---|
| W-0.1 | 0 | unplaced | F-31 (split), F-24 (split) | O-62 light veil recut at the token; O-66 §1/O-66a Select and Input on one field surface; menu selected row off the veil-ink plate | D3 |
| W-0.2 | 0 | unplaced | F-71 (split: O-76) | per-item `--toggle-tint` for the pressed ToggleGroup item, mix values from D3 | D3 |
| W-0.3 | 0 | unplaced | F-29 (split: O-77 as amended by O-77a; O-89) | ConfiguratorLayer header: no ellipsis on either line; inline when it fits, stacked when not. The easing readout literal and the row's token name wrap (O-89) | — |
| W-0.4 | 0 | unplaced | F-22 (split: O-78, O-81 (4)) | menu content on `z-popover`; `data-reveal` namespaced; menu-contract focus wait | — |
| W-0.5 | 0 | unplaced | F-63 (split: O-79) | MIGRATION: the 7.0.0 paper line and the Button variant → emphasis + tone table | — |
| W-0.6 | 0 | unplaced | F-65 (split: O-81 (5)) | constellation `z` from its own stream; the 3.13.0 draw order pinned | — |
| W-0.8 | 0 | 11.2.0 for the carrier, through W-I.8. The rest is unplaced; two of its items remove published names, so they need a major | F-16 (the extent and morph, with O-83 and O-88), F-17, F-29 (split: O-84a) | the dock collapse unit from D2's converged spec: collapsed form, one continuous morph, every facility, scroll compact, rim, the cap's rest a length, the metric token, the demo witness suite | D2 |
| W-0.9 | 0 | unplaced | F-71 (split: O-74b) | the card title rung as a named scale token, `--type-card-title`, at its current size | — |
| W-0.10 | 0 | 11.1.0 for PopoverContent (O-178). TooltipContent's half is unplaced | F-71 (split: O-82) | one declared `reference` on PopoverContent and TooltipContent | — |
| W-0.11 | 0 | unplaced | F-31 (split: O-87 lighting tokens) | O-87's token-level refinement: lower blur radii, one-layer modal shadow, no dock glow; values from D3 | D3 |
| W-0.12 | 0 | unplaced | F-16 (split: L04-M33, a disease row) | the zero-width morph window decided and built on W-0.8's landed carrier: `.dock-layer--full`'s state rule takes the morph gate or is struck | — |
| W-0.13 | 0 | none: a deploy, not a release. First from master, then on each published tag (`W-0.13.md`) | — (O-192) | the demo site at glass.babb.dev: CF Pages `glass`, deploy on each published `v*` tag, infra precepts rewritten for glass | — |
| W-0.7 | 0 | unplaced | F-68 (split: 10.2.0 relay) | the 10.2.0 cut and the consumer relay | — |
| W-R.1 | R | 12.0.0. Its paint half of O-221 ships in 11.2.0; G2, G7, G8, K2 and O-225's paint ship in 11.1.1 | — (O-203, O-208, O-209, O-210, O-218, O-220, O-221, O-225) | restraint as 12.0.0: the gleam, the press indent, the enter blur and overshoot, `--focus-ring-shadow` and the dock grain deleted; one enter grammar; D5's engagement landing; weight; the budgets after their owed design pass; G4, G5, G6, G9, K1, G12; one height engine | D5 (closed) |
| W-A.1 | A | unplaced | F-05 | visual harness repair | — |
| W-A.2 | A | unplaced | F-01, F-02, F-03, F-06, F-09 | W-REGISTER-COLLAPSE: 40-60 invariants, bites on shipped detectors, #10 sink struck, latches retired | — |
| W-A.3 | A | unplaced | F-04 | W-VISUAL-CI: the wired set in CI, both engines | — |
| W-A.4 | A | unplaced | F-08 | the GPU-backed leg with a chroma floor | — |
| W-A.5 | A | unplaced | F-10 | W-PAYLOAD-INVARIANT | — |
| W-A.6 | A | unplaced | F-07 | W-SAFARI-BAND, step 0 the owner checkbox | — |
| W-B.1 | B | unplaced | F-11 | `verify-ledger.mjs` on the committed LEDGER's four terminals | — |
| W-B.2 | B | unplaced | F-71 (split: intake, reply) | W-MAIL-INTAKE and the reply letter | — |
| W-B.3 | B | unplaced | F-14 (split: carry, D-3) | W-RECAP-CARRY; the eight laws' text of record | — |
| W-B.4 | B | unplaced | F-15 | owner glances with captures (rim, cartoon under-stamp, aurora per category, header text, confirm, slider floor) | — |
| W-B.5 | B | unplaced | F-13 (split: C-4) | decide V-A95 | — |
| W-B.6 | B | unplaced. Ahead of it in 11.1.0: O-183, O-190, O-206 (HandMark) | F-13 (split: #51) | decide HandMark's colour windows and π-SCROLL | — |
| W-B.7 | B | unplaced | F-13 (split: #44) | decide the tags field | — |
| W-B.8 | B | unplaced | F-13 (split: #28) | decide DotRing's export and RT-28D | — |
| W-B.9 | B | 13.0.0, the blob run's second wave, with the four amendments of `W-G.1.md` §0.4 (owner question OQ-1 there) | F-13 (split: #45) | decide the constellation and move it onto WebGPU (built here); deletes the Canvas2D module with its last caller | — |
| W-B.10 | B | unplaced | F-13 (split: #46) | decide the Σwidth denominator and `useAnisotropicExtent` | — |
| W-B.11 | B | unplaced | F-13 (split: #78) | decide the design-canon re-author | — |
| W-B.12 | B | unplaced | F-13 (split: GAP-B2b) | decide the shadcn IDIOM-CLEARED column | — |
| W-B.13 | B | unplaced | F-13 (split: C-1, C-3) | Trusted Publisher, then the `NPM_TOKEN` deletion and the `release.yml` env edit | — |
| W-B.14 | B | unplaced | F-14 (split: R2-06-03) | decide the source-derived colour registers | — |
| W-B.15 | B | unplaced | F-14 (split: R3-01-16) | decide scroll glide | — |
| W-C.1 | C | unplaced | F-61 | one scratch root; no tooling in `docs/` | — |
| W-C.2 | C | unplaced | F-62 | W-DEMETA-II and the E-10 invariant | — |
| W-C.3 | C | unplaced | F-63 (remainder) | W-DOC-TRUTH invariants | — |
| W-C.4 | C | unplaced | F-64 | W-TOKEN-HYGIENE | — |
| W-C.5 | C | unplaced. Ahead of it: O-175 (1) in 10.1.5 (through O-182); O-175 (2) and (3) in 11.1.0 | F-65 (remainder) | W-DARK-ONE-ARM, generated tables, one colour leaf, one randomness source | — |
| W-D.1 | D | unplaced | F-55, F-56, F-57, F-58, F-59 | W-COLOCATION and the placement seal | D1 |
| W-D.2 | D | unplaced | F-60 | W-PERIPHERY | — |
| W-E.1 | E | unplaced | F-85 | W-SAFE-EDGE | — |
| W-E.2 | E | unplaced. Ahead of it in 11.1.0: O-184 (the rounded table) | F-21 | W-SURFACE-GEOMETRY and the containment row (the state fill is W-H.1's) | — |
| W-E.3 | E | unplaced. Ahead of it in 11.1.0: O-179 (the sheet shear) | F-32, F-74, F-65 (split: detent floor) | the Sheet: dock-reach inset, resolved detent ladder, anchored-edge bleed | — |
| W-E.4 | E | unplaced. Ahead of it in 11.1.0: O-178 (the popover reference) | F-22 (remainder) | the overlay layer contract: z, edge, dismissal, host, outside, block ceilings | — |
| W-E.5 | E | unplaced | F-41 | W-TOAST: store, queue, announce channel, placement | — |
| W-E.6 | E | unplaced. Ahead of it in 11.1.0: O-158 (the bare Badge) | F-26, F-27, F-28 (less X-G1's selected fill) | W-CHIP | — |
| W-E.7 | E | unplaced | F-29 (remainder) | W-DENSITY-DECIDE, then the sweep; one coarse type model | — |
| W-E.8 | E | unplaced | F-30a | the off-role 12 px rung re-seated; role invariant | — |
| W-E.9 | E | unplaced | F-33 | W-CEL-CONTAINER (the configurator envelope is W-E.14's) | — |
| W-E.10 | E | unplaced | F-34, F-25, F-20 | the demo remainder, OKLCH stills, the shell at the phone cell | — |
| W-E.11 | E | unplaced. Ahead of it in 11.1.0: O-173 G2 (fonts as files) | F-35 | the brand face: one path, preloaded, a display ruling | — |
| W-E.12 | E | unplaced | F-36 | the pager worm's length read | — |
| W-E.13 | E | unplaced | F-80 | W-PRINT | — |
| W-E.14 | E | unplaced | F-33 (split: C-13c) | the configurator envelope, decided and built (a disease row) | — |
| W-F.1 | F | unplaced. Ahead of it in 11.1.0: O-168 (2), O-180's three sites | F-44 | W-SPRING-ONE | — |
| W-F.2 | F | unplaced. Ahead of it in 11.1.0: O-181 | F-78 | W-INTERRUPT and the end-of-gesture helper | — |
| W-F.3 | F | unplaced | F-46 | offsets and releases from position | — |
| W-F.4 | F | unplaced. Ahead of it in 11.1.0: O-171 R-1, O-189 | F-76 | W-EXTENT-OWNED | — |
| W-F.5 | F | unplaced. Ahead of it in 11.1.0: O-173 G1 (the lateral card swap) | F-79 | W-DIRECTION | — |
| W-F.6 | F | unplaced | F-45 | compositor-only idle life | — |
| W-F.7 | F | unplaced | F-73 | W-THEME-SWAP | — |
| W-G.1 | G | 13.0.0, the blob run's first wave | F-47 | W-ONE-ENGINE: WebGL2 deleted (the stroke cascade is not ported), device limits, the backing store under a CSS scale, the CSS ground, the pixel floors on WebGPU, the run's probe folder and harness | — |
| W-G.2 | G | unplaced | F-49 | one device-loss subscription | — |
| W-G.3 | G | unplaced | F-50 (remainder) | W-LUMA-EVENTED and W-AURORA-CLOCK: no readback, no sourceless loop, a 30 Hz clock | — |
| W-G.4 | G | unplaced | F-48 (split: aurora) | W-AURORA-GREENFIELD | — |
| W-G.5 | G | 13.0.0, the blob run's third wave. Ahead of it in 11.1.0: O-204 (3) | F-48 (split: blob), F-50 (split: blob settle seam) | W-BLOB-GREENFIELD: the colony, one settle signal, no shader shadow, one neutral stamp (O-153, O-204 (1) and (2)) | — |
| W-G.5b | G | 13.0.0, the blob run's last wave | O-172 | blob interaction: the membrane modes, pointer (hover, grab, fling, touch), stir(); after W-G.5 | — |
| W-G.6 | G | unplaced | F-51 | the mount-path pass | — |
| W-G.7 | G | 12.0.0 | F-52 | the shader-free aurora derive subpath, one door per binding; CSS per subpath (`./styles/<entry>`), which is also O-208's G11 | — |
| W-H.1 | H | unplaced | F-23, F-24 (remainder), F-75, F-21 (split: #84a), F-28 (split: X-G1's selected fill) | W-INK-COMPOSITE: ink on the composite, state separation, state fills on the fill register (D3 FL-6), PRT recession, the live dock (and D3-B's luma publisher, if D3 converges there) | D3 |
| W-H.2 | H | unplaced | F-31 (remainder) | W-FROST-II: the frost detector, blur rungs at the element (the well is W-H.5's) | D3 |
| W-H.3 | H | unplaced | F-14 (split: R2-06-02) | W-GLASS-REGISTER-DECIDE on the converged ladder | — |
| W-H.4 | H | unplaced | F-53 | W-PERF: count gates, boot shell, the low-power register decide | — |
| W-H.5 | H | unplaced | F-31 (split: #25, #82 G-F2) | the transmissive well (a disease row) | D3 |
| W-H.6 | H | unplaced | F-13 (split: L06-08, T-45) | the backdrop's edge sample, decided BUILD and built (a disease row) | D3 |
| W-I.1 | I | unplaced. Ahead of it in 11.1.0: O-169 (border progress), O-188 (the gliding mark). Its carrier is W-I.8's | F-16 (split: corner, edge witness), F-18, F-71 (split: badge seat) | the rest of the dock on W-0.8's carrier: plate and cut cap, run and paint, edges, the state attribute, the crash-free edge, O-85's fold, W-0.8's cap length kept or struck | D2 |
| W-I.2 | I | unplaced | F-19 | one marker-based member query; toolbar name | — |
| W-I.3 | I | unplaced | F-77 | W-HOVER-GUARD, CSS and script | — |
| W-I.4 | I | unplaced | F-14 (split: R2-06-01) | W-DOCK-COMPOSE-DECIDE inside D2 | D2 |
| W-I.5 | I | unplaced | F-16 (split: #48) | the retired facilities, Q-9 (a disease row) | D2 |
| W-I.6 | I | unplaced | F-54 (split: #67, #90) | the dock hallmarks, OWED-3, the R-7 captures (disease rows) | D2 |
| W-I.7 | I | unplaced | F-21 (split: C-8) | the dock run's box: border-box, the seat transition, the ring reserve (a disease row) | D2 |
| W-I.8 | I | 11.2.0 | — (O-195, O-200, O-202, O-222, O-224, O-171 R-2, O-129 rows 3 and 4, O-180 (3), the carrier half of O-88) | the 11.2.0 dock: the bare `#beside` seat, the width glide with the timed fade, D2's carrier on master's dock; no DockCluster | D2 (closed) |
| W-J.1 | J | 12.0.0 | F-30b | the selectable multi-line tile | D4 |
| W-J.2 | J | 12.0.0, inside W-R.1 §2.3 | F-54 (remainder: the engaged rung) | the engagement register, component-wide: D5 is closed (`../design/engagement/LANDING.md`) and its landing is built in W-R.1 | D5 (closed) |
| W-K.1 | K | unplaced | F-81 | W-ROOT-RELATIVE | — |
| W-K.2 | K | unplaced | F-37 | W-COMMAND | — |
| W-K.3 | K | unplaced | F-38 | W-FOCUS-LIFECYCLE | — |
| W-K.4 | K | unplaced | F-39 | one ring register with its forced-colours arm | — |
| W-K.5 | K | unplaced | F-40 (remainder) | one current-row channel (C-9 is W-K.11's) | — |
| W-K.6 | K | unplaced | F-42 | the a11y sweep and one keystroke predicate | — |
| W-K.7 | K | unplaced | F-43 | W-ARRIVAL | — |
| W-K.8 | K | unplaced | F-82 | W-FORM-PARTICIPATION | — |
| W-K.9 | K | unplaced | F-83 | W-FINDABLE | — |
| W-K.10 | K | unplaced | F-84 | W-TEXT-ONCE | — |
| W-K.11 | K | unplaced | F-40 (split: C-9) | options take their focus model from the listbox; Card's own role and tabindex (a disease row) | — |
| W-L.1 | L | unplaced | F-71 (split: API-ask cures) | each API ask cured, answered or declined (O-65 P-1/P-2, CardHeader actions, spectrum fill hook, theme menu row, #76's moving anchor, O-74 §5/§7/§13, O-86) | — |
| W-L.2 | L | unplaced | F-70 | the type surface, runtime witnesses, the strictTemplates fixture | — |
| W-L.3 | L | unplaced | F-67 | W-PEER-TRUTH: the consumer matrix and SSR hydration | — |
| W-L.4 | L | unplaced | F-69 | W-DRAG-MORPH-SETTLE, upstreaming scaena's fork fix | — |
| W-L.5 | L | unplaced | F-72 | the value.js 4.1.0 lock bump and its born-RED | — |
| W-L.6 | L | unplaced | F-66 | the P-6 census: wire or delete | — |
| W-L.7 | L | unplaced | F-68 (remainder) | W-LANDING: 11.0.0 packets and relay | — |
| W-L.8 | L | unplaced | F-12 | the 11.0.0 cut, the close checklist, FINAL.md | — |

Counts: 106 rows (band 0: 13, R: 1, A: 6, B: 15, C: 5, D: 2, E: 14, F: 7, G: 8, H: 6, I: 8, J: 2, K: 11, L: 8). PLAN §5's walk counted 102; W-0.13, W-R.1, W-G.5b and W-I.8 were added after it. 18 rows name a loop (D1 1, D2 7, D3 7, D4 1, D5 2); D2 and D5 are closed as design loops (`../design/dock/LANDING.md`, `../design/engagement/LANDING.md`). Every family F-01..F-85 (F-30 as F-30a and F-30b) is in at least one row; the families in more than one row are the splits PLAN §3 states: F-13, F-14, F-16, F-21, F-22, F-24, F-28, F-29, F-31, F-33, F-40, F-48, F-50, F-54, F-63, F-65, F-68, F-71.
