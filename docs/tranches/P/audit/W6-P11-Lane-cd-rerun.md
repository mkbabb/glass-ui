# P.W6 P11/c + P11/d re-audit—bbnf-buddy + keyframes.js

**Date**: 2026-05-16
**Auditor**: P.W6 dispatched agent (read-only)
**Scope**: Verify P.W5 Lane D (bbnf-buddy) + P.W5 Lane C (keyframes.js) writes adopted cleanly.

---

## P11/c—bbnf-buddy

### §1 Scope

Verify the four edits landed in W5 Lane D:

1. CR-5 `:deep(.dock-icon-button)` active-state retire—replaced by `--dock-active-*` token-cohort override on `.tools-layer .dock-icon-button.is-tool-btn`.
2. `--dock-active-{bg,color,scale,border,shadow}` token override block present at the cohort selector.
3. `useLeaveTimer` composable retire—file deleted; zero code references.
4. `OffsetEditor.vue` inlined 13-LOC helper (replaces the composable at the single consumer site).

HEAD commit: `dafb99f feat(p.w5-d): glass-ui CR-5 :deep retire + useLeaveTimer inline`—matches expected.

### §2 W5 landing verification

#### CR-5 active-state :deep retire

```
$ rg ':deep\(\.dock-icon-button\.is-active|:deep\(\.dock-icon-button\.is-tool-btn' \
    src/editor/components/dock/tools/ToolsLayer.vue
(zero matches)
```

The four remaining `:deep(.dock-icon-button…)` selectors at L301, L314, L359, L364 are out-of-scope per dispatch:

| Line | Selector | Scope |
|------|----------|-------|
| L301 | `:deep(.dock-icon-button)` | geometry base—width/height/radius/transition (NOT active-state). |
| L314 | `:deep(.dock-icon-button .size-4)` | icon size override (dispatch explicitly allows this—size-4 stays). |
| L359 | `:deep(.dock-icon-button.is-disabled)` | disabled-state opacity + cursor (NOT active-state). |
| L364 | `:deep(.dock-icon-button.is-disabled:hover)` | disabled-state hover suppression (NOT active-state). |

The active-state cohort (the CR-5 target) has been moved to L334 `.tools-layer .dock-icon-button.is-tool-btn`—a flat selector, no `:deep()`.

#### --dock-active-* token override block

```
$ rg '\-\-dock-active' src/editor/components/dock/tools/ToolsLayer.vue
L326: docstring reference to `--dock-active-{bg,color,scale,border,shadow}` cohort
L335:     --dock-active-scale: 1.2;
L336:     --dock-active-color: var(--foreground);
L337:     --dock-active-bg: color-mix(in srgb, var(--primary) 6%, transparent);
L338:     --dock-active-border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
L339:     --dock-active-shadow: 0 0 0 2px color-mix(...), 0 4px 12px color-mix(...);
```

All 5 tokens present at the cohort selector. The docstring at L325-333 documents the CR-5 closure and points at `glass-ui dock.css L585-597` as the token-source surface.

#### useLeaveTimer retire

```
$ find src -name 'useLeaveTimer*'
(zero results—file deleted)

$ rg 'useLeaveTimer' src
src/editor/components/OffsetEditor/OffsetEditor.vue:71: * P.W5 Lane D (P11/c CR-5 cohort): `useLeaveTimer` composable
```

The lone match is the docstring comment at OffsetEditor.vue L71 explaining the retire-as-inline disposition. Dispatch permits comments; no code references remain.

#### OffsetEditor.vue inlined 13-LOC helper

L77-99 hosts the inlined helper:

- `highlightLeaveHandle: number | null` state (L77).
- `cancelHighlightLeave()` (L79-84).
- `onGroupEnter(segmentId)` (L86-89).
- `onGroupLeave()` (L91-97).
- `onBeforeUnmount(cancelHighlightLeave)` cleanup hook (L99).

Total: 23 LOC including signatures + braces—the dispatch's "13-LOC helper" figure refers to the executable body (the prior composable was 42 LOC including auto-cleanup wiring; the collapse is ~3× reduction).

Docstring L65-76 documents the hover→highlight handoff intent + the W5 disposition rationale (one-site, two-callsite over-abstraction).

### §3 Residuals

None. The remaining `:deep()` selectors are out-of-scope geometry / disabled-state and not CR-5 targets.

### §4 Verdict

**CLEAN.** All four W5 Lane D edits landed as specified. The CR-5 active-state escape is closed via token-cohort override; the `useLeaveTimer` composable is gone with proper documentation at the consumer site.

### §5 Status

P11/c CLEAN at `dafb99f`. No further action.

---

## P11/d—keyframes.js

### §1 Scope

Verify the three edits landed in W5 Lane C:

1. HeaderRibbon retire—local copy at `demo/@/components/custom/header-ribbon/` deleted; consumer imports the canonical glass-ui subpath instead.
2. EditorShell.vue imports `HeaderRibbon` from `@mkbabb/glass-ui/header-ribbon`.
3. scale-on-hover migration—zero `hover:scale-105` Tailwind utility remnants across demo + src.
4. Fira Code CDN drop—8 HTML files (`amiga`, `app`, `cube`, `playground`, `simple`, `square`, `balls`, `boxes`) drop the Google Fonts CDN reference for Fira Code.

HEAD commit: `2183f32 feat(p.w5-c): glass-ui CR-3 cross-walk—HeaderRibbon adoption + scale-on-hover migration + Fira Code CDN drop`—matches expected.

### §2 W5 landing verification

#### HeaderRibbon local-copy retire

```
$ find demo/@/components/custom/header-ribbon
bfs: error: ... No such file or directory.
```

Directory deleted. The sibling `demo/@/components/custom/` tree is intact (Animated.vue, animation-controls/, asset-manager/, dock/, editor-shell/, …)—only the `header-ribbon/` subdir is gone.

#### EditorShell.vue subpath import

```
$ rg 'HeaderRibbon' demo/@/components/custom/editor-shell/EditorShell.vue
L10:  <HeaderRibbon ref="headerRibbonRef" position="right">
L24:  </HeaderRibbon>
L70:  import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon";
L106: const headerRibbonRef = ref<InstanceType<typeof HeaderRibbon> | null>(null);
```

L70 import matches the dispatch spec (line number + subpath both verified). The template binding at L10 + reactive ref at L106 use the canonical surface. Note: the dispatch said "EditorShell.vue:70"—the actual file path is `demo/@/components/custom/editor-shell/EditorShell.vue` (the file is nested one level deeper than the dispatch's shorthand).

#### scale-on-hover migration

```
$ rg 'hover:scale-105' demo src
(zero matches)
```

Broader sweep for `scale-on-hover` (the migration target utility class) finds 12 active call sites across SharePopover, EditorShell, EditorHeader, KeyframeTimeline, KeyframeCard, KeyframesEditor (2×), TimingFunctionPanel, cube/App, app/App, app/scenes/CubeScene—all on the `scale-on-hover` utility, none on the bare `hover:scale-105` Tailwind shorthand.

#### Fira Code CDN drops (8 HTML files)

```
$ rg 'fonts\.googleapis\.com|fonts\.gstatic\.com' demo/{amiga,app,cube,playground,simple,square,balls,boxes}/index.html
```

| File | fonts.googleapis.com refs | Fira Code? |
|------|---------------------------|------------|
| amiga/index.html | 4 (Instrument+Serif only) | no |
| app/index.html | 4 (Instrument+Serif only) | no |
| cube/index.html | 4 (Instrument+Serif only) | no |
| playground/index.html | 4 (Instrument+Serif only) | no |
| simple/index.html | 4 (Instrument+Serif only) | no |
| square/index.html | 4 (Instrument+Serif only) | no |
| balls/index.html | 0 | no |
| boxes/index.html | 0 | no |

Zero `Fira+Code` Google Fonts CDN references across the 8 files. The `Instrument+Serif` references are unrelated (display serif for distinct demo chrome) and out-of-scope.

Six of the 8 files (`amiga`, `app`, `cube`, `playground`, `simple`, `square`) ship the inline comment `<!-- Fira Code arrives self-hosted via @mkbabb/glass-ui/styles cascade. -->` documenting the migration. The remaining two (`balls`, `boxes`) retain a `font-family: "Fira Code", monospace;` declaration in inline `<style>`—this is the consumer-side font-stack reference (post-CDN-drop, the font now arrives via the glass-ui styles cascade); not a Google Fonts CDN reference.

### §3 Residuals

None. All three W5 Lane C edits landed.

### §4 Verdict

**CLEAN.** HeaderRibbon retire complete; scale-on-hover migration sweeps zero remnants; Fira Code CDN drops confirmed across all 8 HTML files.

### §5 Status

P11/d CLEAN at `2183f32`. No further action.

---

## Combined verdict

| Consumer | HEAD | W5 lane | Verdict |
|----------|------|---------|---------|
| bbnf-buddy | `dafb99f` | Lane D | CLEAN |
| keyframes.js | `2183f32` | Lane C | CLEAN |

Both W5 cross-repo writes adopted cleanly. P.W6 P11/c + P11/d lanes pass without residuals.
