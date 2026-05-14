# N.W0 Lane A3 — paper-backdrop → `<Section>` landmark (library wire) — proof

## Disposition

Section gains a `backdrop?: "none" | "paper"` prop. Default `"none"` preserves the prior behavior verbatim (purely additive — no consumer migration required). When `backdrop="paper"`, the `<section>` becomes a `relative isolate` stacking context and `<PaperBackdrop>` is composed inline as an absolutely-positioned layer behind the header + description + content. Demonstrates `PaperBackdrop` as a generally-reusable substrate (not demo-only), satisfying the visual-load-bearing-ness invariant by adding a second canonical consumer (alongside `demo/layout/AppShell.vue`).

## File changes summary

```
 demo/stories/primitives/section.vue   | 20 ++++++++++++++++++++
 src/components/ui/section/Section.vue | 34 +++++++++++++++++++++++++++++++++-
 2 files changed, 53 insertions(+), 1 deletion(-)
```

- `src/components/ui/section/Section.vue` (primary):
  - Added `import { PaperBackdrop } from "../../custom/paper-backdrop";` at the top of `<script setup>`.
  - Added `backdrop?: "none" | "paper"` prop to the `Props` interface with full doc comment.
  - Default `backdrop: "none"` via `withDefaults` (additive — current call sites unchanged).
  - Section root gains `relative isolate` classes when `backdrop === 'paper'` (conditional via `cn()`).
  - `<PaperBackdrop class="!absolute inset-0" />` composed inline, gated by `v-if="props.backdrop === 'paper'"`.
  - Header comment extended with an N.W0 Lane A3 paragraph describing the wire + the positioning rationale.

- `demo/stories/primitives/section.vue` (story demo):
  - Added a new `<StorySection>` block at the bottom titled `backdrop="paper" · scoped paper-grain substrate` demonstrating the wire in a rounded-card container.

## Composition strategy (positioning + z-index rationale)

`PaperBackdrop` renders a single `<div class="paper-underpaint">`. The `@utility paper-underpaint` declared in `src/styles/paper.css` sets:

- `position: fixed; inset: 0; z-index: -1; pointer-events: none;` — designed for app-root, full-viewport fixed-position substrate (the canonical `<AppShell>` use site).
- `mix-blend-mode: multiply` (light) / `soft-light` (dark) for the grain blend.

To scope the backdrop to the `<Section>` rather than the viewport, the wire makes two precise overrides:

1. **`!absolute` Tailwind important prefix** — overrides the underpaint's `position: fixed` to `position: absolute`. This binds the backdrop to the nearest positioned ancestor, which is the `<section>` (made `position: relative` via the `relative` class when `backdrop="paper"`). The `!` is load-bearing because `paper-underpaint` is a `@utility` declaration at the same Tailwind v4 utilities layer; only `!important` reliably wins regardless of CSS source-order between user utilities and `@utility` declarations.
2. **`inset: 0` retained** — the underpaint already declares `inset: 0`, so the Tailwind `inset-0` class is harmless duplication that documents intent. The backdrop fills the entire section box.

The `isolation: isolate` class on the section root creates a new stacking context. This is critical: `paper-underpaint`'s own `z-index: -1` would otherwise paint the backdrop behind the root stacking context (i.e., behind the parent's `bg-card`, page background, etc.). With `isolation: isolate`, the `-1` is clamped to the section's local stacking context and the backdrop sits behind the section's content but in front of the section's own background.

The header + description + content stay at their default stacking order (non-positioned in-flow children). In the CSS painting algorithm, positioned descendants with `z-index: -1` paint in step 2 (negative-z); non-positioned in-flow descendants paint in step 3 — so the content correctly paints **above** the backdrop without needing any explicit `relative` class on the content elements themselves. The grain reads as substrate, not occluder.

`pointer-events: none` from the underpaint is inherited — interactions pass through to the section content, so the backdrop never traps clicks.

## Story demo

Extended the existing `demo/stories/primitives/section.vue` with a fifth `<StorySection>` block titled `backdrop="paper" · scoped paper-grain substrate`. The demo wraps a `<Section backdrop="paper" title="Paper-grain section" description="..." class="p-6">` inside a `rounded-card border border-border overflow-hidden` host container. This exercises:

- The default `tone="heading"` + `gap="regular"` (no axis-knob interaction).
- The `class` pass-through (`p-6` padding lands on the section root, not inside).
- The `overflow-hidden` rounded-card wrapper trims the backdrop to the host shape (paper grain doesn't bleed past the card border-radius).
- A blurb explicitly noting the default `backdrop="none"` (additive behavior).

The site was a natural fit: the only Section consumer outside the library itself (per `rg "from.*ui/section"` across `demo/`).

## Verification

| Check | Status | Notes |
|-------|--------|-------|
| `npm run typecheck` (HEAD baseline) | 26 errors | All 26 pre-existing in `demo/stories/data/timeline-continuous.vue` + `demo/stories/data/timeline-segmented.vue` (unrelated). |
| `npm run typecheck` (post-edit) | 26 errors | Same 26 pre-existing errors. **Zero new errors** introduced by this lane. |
| `NODE_OPTIONS="--max-old-space-size=8192" npm run build` | GREEN (✓ built in 33.72s) | Vite library build emitted `dist/` + per-subpath chunks; declaration files built in 32692ms. (Default heap OOM'd — used 8 GiB override per dispatch note.) |
| Section.vue API surface | UNCHANGED for existing call sites | `backdrop` defaults to `"none"` → renders identical DOM to pre-edit. All existing props (`title`/`description`/`tone`/`gap`/`titleClass`/`descriptionClass`/`class`) preserved verbatim. |

## Open questions for orchestrator

1. **N.W0 Lane A2 + A4 are both in `demo/stories/compositions/hero.vue` (shared file; coordinate per W0.md "shared with A2; coordinate")**. This lane (A3) does not touch hero.vue — no coordination needed here. Flagging for orchestrator awareness only.
2. **Bundle-budget impact**: the Section subpath chunk now imports PaperBackdrop. Pre-edit, Section had no dependency on PaperBackdrop. The orchestrator should run `npm run profile:budget` at W0 close to confirm the Section chunk delta is within budget (PaperBackdrop is a single small SFC with no heavy substrate, so delta should be minimal — likely < 1 KiB gzip).
3. **`backdrop` extensibility**: the prop is typed `"none" | "paper"` (binary). If future tranches add `"glass"` / `"metaballs"` / etc., the discriminant scales naturally. No action needed at N — flagging for future-shape awareness.
4. **Story-page placement**: the new demo block was appended to `demo/stories/primitives/section.vue` (existing primitive story). No new story file was created (per dispatch: "extend ONE existing demo story... if no story consumes Section yet, that's fine — skip story demo"). Confirm placement satisfies the N.W0 "1 canonical site each" wire-batch posture.

## Worktree diff verification output

```
$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-a4034a3ef8eaf92c0 diff --stat
 demo/stories/primitives/section.vue   | 20 ++++++++++++++++++++
 src/components/ui/section/Section.vue | 34 +++++++++++++++++++++++++++++++++-
 2 files changed, 53 insertions(+), 1 deletion(-)
```

Two files modified, both within the lane's declared bounds:
- `src/components/ui/section/Section.vue` — primary write (the wire).
- `demo/stories/primitives/section.vue` — optional story demo extension (per dispatch: "extend ONE existing demo story").

No staging, commits, stashes, checkouts, resets, restores, pushes, pulls, or fetches were performed. Worktree-relative paths used throughout. Read-only git invocations only (`git -C <worktree> diff --stat`).
