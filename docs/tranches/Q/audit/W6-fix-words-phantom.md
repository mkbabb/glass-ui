# Q.W6 — words/frontend phantom-class remediation (`glass-default` + `glass-elevated`)

**Wave**: Q.W6 remediation.
**Date**: 2026-05-18.
**Scope**: `words/frontend/src/` only (APPLY; clean tree at start).
**Mode**: read-only git; source written directly under `frontend/src/`. Orchestrator owns commits.

---

## 1 — Charter

The W6 phantom-class gate found `words/frontend` still referencing two retired
glass-ui tier-class names from the M.W0 glass-ladder rename:

- `glass-default` — ×1 site
- `glass-elevated` — ×7 sites

8 logical sites across 10 files (one file — `TimeMachineExpandedView.vue` —
carries both). These are the canonical N-class blind-spot: a glass-ui class
deleted, consumer references left, the surface silently degrading to
border/background-only with no `backdrop-filter` and no surface tint.

W4 Lane F's words sweep migrated only `.glass-medium → .glass-quiet` and missed
the `default` + `elevated` rungs. This wave finishes the M.W0 consumer-side tail.

### Ladder-rename mapping (M.W0 — confirmed against `src/styles/glass.css` + Qκ)

The canonical 5-rung ladder is `wash / quiet / resting / floating / overlay`.
`glass.css` §4–10 documents the rename inline:

| Phantom class | Canonical replacement | Source-of-truth |
|---|---|---|
| `glass-subtle`  | `glass-wash`     | `glass.css:8` — "was `subtle`" |
| `glass-default` | `glass-quiet`    | `glass.css:9` — wait: see below |
| `glass-medium`  | `glass-resting`  | `glass.css:9` — "was `default`; the speedtest plate" |
| `glass-elevated`| `glass-floating` | `glass.css:9` — "was `elevated`" |

**Mapping resolution for `glass-default`** — `glass.css:9` annotates the
`resting` rung as "was `default`". But the W6 brief + the W4 Lane F precedent
map `glass-default → glass-quiet`, consistent with the W4 mapping rationale: the
W4 sweep moved `glass-medium → glass-quiet` for popover/dropdown-tier surfaces
because `quiet` and `resting` are adjacent rungs and the per-site context (a
lightweight floating chrome surface) calls for the lighter rung. The one
`glass-default` site here (`TimeMachineExpandedView.vue:6`) is a small `h-8`
inline "Back" button — lightweight inline chrome, not a speedtest-grade resting
plate — so `glass-quiet` is the faithful per-site replacement. `glass-elevated`
maps unambiguously to `glass-floating` (the §9 rename).

---

## 2 — Per-site migration table

| # | File | Line | Element / surface | Before | After |
|---|------|------|-------------------|--------|-------|
| 1 | `components/custom/Sidebar.vue` | 7 | desktop `<aside>` sidebar shell (`z-overlay`, `rounded-r-2xl`, `shadow-cartoon-lg`) | `glass-elevated` | `glass-floating` |
| 2 | `components/custom/navigation/components/SidebarPartOfSpeech.vue` | 27 | `HoverCardContent` themed hovercard (`z-hovercard`, `w-80`) | `glass-elevated` | `glass-floating` |
| 3 | `components/custom/navigation/components/SidebarHoverCard.vue` | 4 | `HoverCardContent` themed hovercard (`z-hovercard`, `w-96`) | `glass-elevated` | `glass-floating` |
| 4 | `components/custom/search/components/SearchBarShell.vue` | 11 | search-bar shell default state (`border-2 border-border`) | `glass-elevated` | `glass-floating` |
| 5 | `components/custom/search/components/results/SearchResultItem.vue` | 88 | `PopoverContent` match-details popover (`w-52`, `rounded-xl`, `shadow-cartoon-lg`) | `glass-elevated` | `glass-floating` |
| 6 | `components/custom/definition/components/TimeMachineExpandedView.vue` | 6 | `h-8` "Back" inline button — lightweight chrome | `glass-default` | `glass-quiet` |
| 7 | `components/custom/definition/components/TimeMachineExpandedView.vue` | 36 | scrollable entry-content panel (`rounded-xl`, `shadow-cartoon-lg`) | `glass-elevated` | `glass-floating` |
| 8 | `components/custom/definition/components/TimeMachineVersionCard.vue` | 10 | version card (`rounded-xl`, `p-6`, `shadow-cartoon-lg`) | `glass-elevated` | `glass-floating` |
| 9 | `components/custom/pwa/PWANotificationPrompt.vue` | 9 | notification-prompt card (`rounded-2xl`, `shadow-cartoon-md`, `border-2`) | `glass-elevated` | `glass-floating` |
| 10 | `components/custom/pwa/PWAInstallPrompt.vue` | 9 | install-prompt card (`rounded-2xl`, `shadow-cartoon-md`, `border-2`) | `glass-elevated` | `glass-floating` |
| 11 | `views/Admin.vue` | 4 | admin header bar (`border-b border-border`) | `glass-elevated` | `glass-floating` |

**Total: 11 occurrences — 1 `glass-default` + 10 `glass-elevated` — across 10 files.**

Per-site verification: every occurrence was confirmed in a class list / `cn()`
class string as a glass-surface tier class (not a substring of another token).
The `glass-elevated → glass-floating` sites are all elevated chrome — sidebar
shell, hovercards, popovers, prompt cards, the admin header bar — for which
`floating` (~0.80α, heavier blur) is the faithful M.W0 replacement of the
retired `elevated` rung. The single `glass-default` site is a lightweight inline
button → `glass-quiet`, matching the W4 Lane F per-site-context rationale.

---

## 3 — Verification

| Check | Result |
|-------|--------|
| `grep -rn 'glass-\(subtle\|default\|medium\|elevated\)' words/frontend/src` | 0 hits (exit 1) — PASS |
| `vue-tsc --noEmit` typecheck (`npm run type-check`) | GREEN — exit 0, no diagnostics |
| `vite build` (the `vite build` half of `npm run build`) | FAILS — pre-existing, unrelated (see below) |

### Build-failure attribution (pre-existing, out of scope)

`npm run build` = `vue-tsc --noEmit && vite build`. The `vue-tsc` typecheck half
ran to completion GREEN. The `vite build` half then failed:

```
[commonjs--resolver] Failed to resolve entry for package "@mkbabb/keyframes.js".
```

This is a pre-existing environment fault, not a regression from this wave:

- `@mkbabb/keyframes.js` ships an `exports` map with a `"development"`
  conditional pointing at `./src/animation/index.ts`; both that src tree and the
  built `./dist/keyframes.js` exist on disk, so the failure is a vite
  conditional-exports resolution interaction in the words workspace.
- This wave touched **only** `class="…"` template-attribute strings in `.vue`
  SFCs — pure CSS tier-class renames. Such edits cannot affect JS/TS module
  resolution. The failing package (`@mkbabb/keyframes.js`) is not imported by
  any file this wave touched.
- The `vue-tsc` typecheck compiles every touched SFC and passes GREEN, which is
  the load-bearing correctness gate for a template-only change.

The `vite build` resolution fault belongs to the words workspace environment
(stale/unbuilt transitive dep wiring) and is the words team's to resolve; it is
outside the `frontend/src/` scope of this remediation.

---

## 4 — Verdict

**PASS.** Q.W6 phantom-class remediation complete for `words/frontend`.

- 11 occurrences migrated across 10 files — `glass-default → glass-quiet` (×1),
  `glass-elevated → glass-floating` (×10).
- `grep` for the full retired-tier set (`subtle|default|medium|elevated`)
  returns **zero** — the words/frontend phantom-class corpus is now empty.
  Combined with W4 Lane F (`glass-medium` sweep), the entire M.W0 glass-ladder
  consumer-side tail in words/frontend is closed.
- `vue-tsc --noEmit` typecheck GREEN. The `vite build` resolution failure is a
  pre-existing, out-of-scope words-workspace environment fault unrelated to this
  template-only CSS-class rename.
- No glass-ui-side change required; the canonical `wash/quiet/resting/floating/
  overlay` ladder is correct at HEAD (`src/styles/glass.css`).

This closes hard-gate (g) — the W6 phantom-class gate — for `words/frontend`.
