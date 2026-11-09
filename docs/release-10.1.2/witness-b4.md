# 10.1.2 witness b4 (witness-and-verify seat after critique-b4)

Model: claude-opus-5-5. Branch `release/10.1.2`, worktree
`.claude/worktrees/release-10.1.2`, over the cure `cf634d203` (critique-b4 D-1). The
pre-cure tip `abd829944` was probed from a `git archive` copy in the scratchpad, with this
seat's spec and harness overlaid. Every run went through `guarded`, every WebKit run
through `guarded --exclusive webkit`, on ports 5301 to 5303.

## 1 · Review of `cf634d203`

- **Every arm carries `.dock-trigger`.** `DockTrigger.vue`'s `triggerClass` is
  `cn("dock-trigger", for==="select" && "dock-select-trigger", for!=="select" &&
  "dock-dropdown-trigger", props.class)`, bound on the reka trigger of all three arms
  (`SelectTrigger`, `DropdownMenuTrigger`, `PopoverTrigger`), which merge it onto the
  `SeatHost` `<button>` through `as-child`. The paint cells below read the class's effect
  on each arm, so this is measured, not only read.
- **Nothing else in `src` keys trigger paint on `:disabled`.** After the cure, the only
  `:disabled` selectors in the dock styles are `.dock-icon-button:disabled` and
  `.dock-tab-button:disabled` (`styles/index.css:300-301`, `controls/icon-button.css:139`),
  each beside its `[aria-disabled="true"]` arm. The trigger hover and press rules are
  `.dock-trigger:hover:not([aria-disabled="true"])` and
  `.dock-trigger:active:not([aria-disabled="true"])`, at the same (0,3,0) specificity as the
  rules they replace. So the order against the open-state rule (0,2,0) is unchanged.
- **Native `disabled` on a trigger is unreachable.** `SeatHost` strips `disabled` from its
  attrs and writes `aria-disabled="true"`, so dropping the
  `.dock-select-trigger:disabled` and `.dock-dropdown-trigger:disabled` arms loses nothing a
  `DockTrigger` can render.
- **Consumer custom seats are out of scope for glass paint.** `SeatHost` is a private
  functional component inside `DockTrigger.vue`. It is not exported, and a consumer seat
  cannot pass through it. A consumer's own `data-glass-dock-seat` element owns its paint.
  Glass dims it only if it opts into a glass class with an `aria-disabled` arm:
  `.dock-icon-button`, `.dock-tab-button` or `.dock-trigger`. MIGRATION 10.1.2 now says a
  consumer rule that dims or suppresses a dock trigger on `:disabled` must key on
  `[aria-disabled="true"]` instead.
- **Note, not a defect.** The base, `:focus`, `:focus-visible` and open-state rules in
  `controls/triggers.css`, and the ring group in `styles/index.css`, still list the
  `.dock-select-trigger` and `.dock-dropdown-trigger` classes beside `.dock-trigger`. The
  hover, press and disabled rules now name only `.dock-trigger`. Every element glass renders
  carries all of these classes, so paint is unaffected. A hand-written element carrying only
  a legacy class would get the base and the ring but no hover, press or disabled paint. That
  is not a 10.1.2 contract, and folding those lists is outside this one-change release.

## 2 · The paint witness

`tests-visual/release-10-1-2.spec.ts`, "D-1 · a disabled DockTrigger paints disabled and
takes no hover or press fill". It uses the scene `disabled-paint` in
`tests-visual/release-10-1-2/harness.ts`: a disabled select, dropdown and popover
`DockTrigger`, each disabled by its own `disabled`, then an enabled popover trigger.

The cell runs at 1440 and 390, in light and dark. The scheme is pinned per cell with
`test.use({ colorScheme })`, and the cell asserts `html.dark` matches it. The enabled
trigger must take a hover fill, which proves the pointer reaches the run. Then each disabled
arm is checked, after its running transitions finish:

- It has `aria-disabled="true"`.
- `--opacity-disabled` resolves below 1, and `opacity` equals it.
- `cursor` is `not-allowed`.
- Under hover, the fill and opacity stay at rest.
- Under press (`mouse.down`), the fill and `scale` stay at rest.

| Tree | Chromium (1440/390 x light/dark) | WebKit 2287 (the same) |
|---|---|---|
| `abd829944` (pre-cure) | 4 of 4 RED: `select opacity` expected 0.5, received 1 | 4 of 4 RED: the same |
| `abd829944` + the `index.css` hunk only | 4 of 4 RED: `select hover fill` `rgba(0,0,0,0)` became `color(srgb 0.204 0.148 0.083 / 0.14)` light, `/ 0.18` dark | not run |
| the above + the hover rule only | 4 of 4 RED: `select press fill` became `oklab(0.258 … / 0.2002)` light, `oklab(0.393 … / 0.2374)` dark | not run |
| `cf634d203` + witness (tip) | 4 of 4 GREEN | 4 of 4 GREEN |

The two partial-cure rows show that each of the three assertions (the disabled group, the
hover rule and the press rule) fails on its own when its hunk is missing.

## 3 · Re-runs at the tip (`cf634d203` + this witness)

| Check | Result |
|---|---|
| `npm run typecheck` | clean |
| `npm run build` | clean, rc 0 (`dist/` ready, 63 public declaration entries) |
| `npx vitest run --maxWorkers=2` | 245 files: 2374 passed, 1 failed, 10 expected-fail, 1 skipped. The one failure is `gate:boot-graph`, "dist-demo is STALE": `dist-demo` was built 2026-10-21, and the cure touched `src` on 2026-10-27. After `npm run demo:dist:build`, `tests/gates/boot-graph.test.ts` is 14 of 14, so the suite is 2375 passed, as critique-b4 recorded. |
| `release-10-1-2.spec.ts` + `release-10-1-1.spec.ts`, Chromium, light config | 77 of 77 (48 + 4 new + 25) |
| the same, WebKit 2287, dark config | 77 of 77 (48 + 4 new + 25) |

The four D-1 cells pin both schemes themselves, so each engine run covers the paint in
light and in dark.

## 4 · The CHANGELOG line, in paint

CHANGELOG 10.1.2 says a disabled trigger is a present-but-disabled stop "like a disabled
`DockControl`". In paint, that is true at the tip in both engines, both widths and both
schemes:

- `opacity` 0.5 (`--opacity-disabled`) and `cursor: not-allowed`, as
  `.dock-icon-button[aria-disabled="true"]` has;
- no hover or press fill and no press scale.

The bullet now says so, and states the selector it keys on. The witness list names the four
paint cells with their RED on `abd829944`. The engine count is 77 of 77 per engine.
MIGRATION 10.1.2 gains the matching sentence.

## Not done here

- The bundle ratchet is not rebound. The release-close seat does that on the committed tree.
- Nothing was tagged, pushed or published.
- The CHANGELOG date (2026-10-21) is left for release-close, as critique-b4 noted.
