# Q.W2 Lane C — bbnf-buddy `<Card variant="pane">` migration

## Charter

Per Q.W2 spec lines 37-45 (Lane C) + the round-4 Qπ "Migration target — FINAL"
adjudication (lines 8-18). bbnf-buddy had **6 SFCs** using `<Card variant="pane" flush>`.
Neither `variant` nor `flush` is a prop glass-ui's `Card` declares at HEAD — `Card`
exposes only `tier` / `shadow` / `grain` (confirmed against
`src/components/ui/card/Card.vue`: `tier` default `resting`, `shadow` default `true`,
`grain` default `true`). The two stale props fell through as inert attr-fallthrough,
so each pane silently rendered the `tier="resting"` + `shadow:true` + `grain:true`
fallback — a hard drop-shadow + paper-grain over flat editor chrome.

This lane migrates the 6 `pane` sites to the canonical Qπ-FINAL recipe
`<Card tier="wash" :grain="false">`, refined per-site to the value.js A.W1 spelling
`tier="wash" :shadow="false" :grain="false"` (all 6 are flat, nested editor panes
inside workspace chrome — none should lift). The 7th bbnf-buddy site
(`AnimationWorkspace.vue:157`, a `cartoon` site) is **not** in scope — it is
dependency-sequenced to W4 Lane G (needs the `surface` prop landing at W3).

### Per-site decision rules

- **`tier="wash"`** — all 6: the wash rung is the legacy `pane` tier identity
  (`--glass-bg-subtle` → renamed `--glass-bg-wash` at `eb9c44c`).
- **`:shadow="false"`** — all 6: every pane is a flat editor surface nested in
  workspace chrome; none is a free-floating lifted plate. Matches value.js A.W1.
- **`:grain="false"`** — all 6: the `.glass-wash::after` paper-grain conflicts
  with editor-pane repaint; legacy `pane` deliberately suppressed grain.
- **`class="p-0"`** — only the 3 sites that wrap content in `<CardContent>` (which
  owns padding via `class="p-3"`). The `flush` attr was always inert (Card has no
  intrinsic padding), so `p-0` is a documentary mapping of `flush`'s intent. The
  other 3 sites govern padding through their own scoped CSS class, so no `p-0`.
- **`class="overflow-auto"` / `tabindex="0"`** — added to **zero** sites: none of
  the 6 `<Card>` roots is itself a scroll region. `LayersPanel`'s Card is
  `overflow: hidden` (the inner `.pane-body` scrolls); `EditorPanel`'s Card
  delegates scroll to inner `<ScrollPane>` children; the other 4 are
  content-sized. No `<Card>` root needs keyboard-scroll, so the ScrollPane
  missing-`tabindex` a11y gap is not inherited.

## Per-site migration table

| # | File | Before | After | shadow | overflow / tabindex | padding |
|---|------|--------|-------|--------|---------------------|---------|
| 1 | `src/editor/components/BodyEditor.vue:37` | `<Card variant="pane" flush>` | `<Card tier="wash" :shadow="false" :grain="false" class="p-0">` | `false` — flat pane | none — content-sized, `<CardContent>` owns layout | `p-0` — `<CardContent class="p-3">` owns padding |
| 2 | `src/editor/components/BehaviorsEditor.vue:102` | `<Card variant="pane" flush>` | `<Card tier="wash" :shadow="false" :grain="false" class="p-0">` | `false` — flat pane | none — content-sized, `<CardContent>` owns layout | `p-0` — `<CardContent class="p-3">` owns padding |
| 3 | `src/editor/components/OffsetEditor/OffsetEditor.vue:165` | `<Card variant="pane" flush>` | `<Card tier="wash" :shadow="false" :grain="false" class="p-0">` | `false` — flat pane | none — content-sized, `<CardContent>` owns layout | `p-0` — `<CardContent class="p-3 space-y-2">` owns padding |
| 4 | `src/editor/components/SelectionInfo.vue:176` | `<Card variant="pane" flush class="selection-info" :class="...">` | `<Card tier="wash" :shadow="false" :grain="false" class="selection-info" :class="...">` | `false` — flat telemetry card | none — content-sized telemetry rows | no `p-0` — scoped `.selection-info` sets `padding: 0.625rem 0.875rem` |
| 5 | `src/editor/components/LayersPanel.vue:148` | `<Card variant="pane" flush class="layers-panel" :class="...">` | `<Card tier="wash" :shadow="false" :grain="false" class="layers-panel" :class="...">` | `false` — flat workspace panel | none — Card root is `overflow: hidden`; inner `.pane-body` is the scroll region | no `p-0` — scoped `.layers-panel` sets `padding: 0` |
| 6 | `src/editor/components/EditorPanel.vue:99` | `<Card variant="pane" flush class="editor-panel-card">` | `<Card tier="wash" :shadow="false" :grain="false" class="editor-panel-card">` | `false` — flat tabbed panel | none — Card root is a flex column; scroll delegated to inner `<ScrollPane>` children | no `p-0` — header + body children own their own padding |

### Untouched 7th site

| File | Line | Site | Disposition |
|------|------|------|-------------|
| `src/editor/components/animation/AnimationWorkspace.vue` | 157 | `:variant="props.inline ? 'default' : 'cartoon'"` | **NOT migrated** — dependency-sequenced to W4 Lane G. The `cartoon` register migrates to Card's `surface` prop, which does not exist until W3 Lane B. Left on the stale `variant=` API; bbnf-buddy build stays GREEN because the W2 Lane A posture is dev-WARN, not typecheck-hard-reject. |

## Verification

| Gate | Command | Result |
|------|---------|--------|
| Zero `pane` sites | `grep -rn '<Card[^>]*variant="pane"' src` | **ZERO** — PASS |
| Build | `npm run build` | **GREEN** — `✓ built in 5.21s` (the >500 kB chunk warning is pre-existing Monaco-bundle noise, not an error) |
| Typecheck | `npm run typecheck` (`vue-tsc --noEmit`) | **No new errors** — 1 pre-existing error in `src/composables/wasm/morph.ts` (WASM `SegmentId` vs `number` mismatch) is unrelated to Lane C and present on the pre-migration baseline (verified: baseline error count = 1, post-migration error count = 1, same file). The 6 migrated SFCs typecheck clean. |
| Diff scope | `git diff --stat` | 6 files, 10 insertions / 8 deletions — exactly the 6 `pane` SFCs, nothing else |

The fleet-wide `grep -rn '<Card[^>]*variant=' src` returns one remaining match — the
`AnimationWorkspace.vue:157` `cartoon` site (a multi-line `:variant=` bound
attribute). Per the W2 cross-wave note, fleet-zero is a **W4 gate**, not a W2 gate.

## Verdict

**PASS.** All 6 `<Card variant="pane" flush>` sites migrated to the Qπ-FINAL
canonical recipe `<Card tier="wash" :shadow="false" :grain="false">`, with the
`flush`-intent `p-0` applied to the 3 `<CardContent>`-bearing sites and omitted
where a scoped CSS class already governs padding. No `overflow-auto` / `tabindex`
added — no `<Card>` root is itself a scroll region, so the ScrollPane a11y gap is
not inherited. bbnf-buddy build is GREEN; typecheck introduces zero new errors.
The 7th `cartoon` site is correctly left untouched for W4 Lane G.
