# W5 Lane A—value.js CR-1 + CR-4 + Path B consumer adoption

## §1 Scope

Per `docs/tranches/P/waves/W5.md` Lane A (A.2 + A.3 + A.4 + A.5) and the consumer audit at `docs/tranches/P/audit/P11-Lane-e-value-js.md`. Three concrete deliverables on the value.js side at the v1.8.2 glass-ui base (A.1 Path B co-export shipped at glass-ui commit `7c901b9`):

1. **A.2**—CR-1 surgical fixes (avatar typo + ActionButton dock string-key injects).
2. **A.3**—CR-4a HeaderRibbon local-fork retirement.
3. **A.4**—CR-4b useClipboard bulk import flip (Path B adoption) + local-fork deletion.
4. **A.5**—PD-3 disposition: fold to W6 formal-archive per W5.md A.5 fallback (no WIP-branch mutation at this lane).

Lane is consumer-side cross-repo write. The branch state at value.js was on `w.w2.1-value-js-prebuild` HEAD `c0cc349` at lane open—matches the P11/e baseline; the orchestrator constraint was to NOT change branches, which was honoured (read-only on the branch index).

## §2 A.2—CR-1 fixes (2 files; 7 effective lines)

### §2.1 `demo/@/components/ui/avatar/index.ts`—1-char typo fix

```diff
- export { Avatar, AvatarImage, AvatarFallback, avatarVariant, type AvatarVariants } from "@mkbabb/glass-ui";
+ export { Avatar, AvatarImage, AvatarFallback, avatarVariants, type AvatarVariants } from "@mkbabb/glass-ui";
```

Per P11/e §CR-1a: `avatarVariant` is non-existent upstream; the canonical name is `avatarVariants` (plural). Tree-shaking had been masking the bad import; the fix removes the LATENT BLOCKER class.

### §2.2 `demo/@/components/custom/color-picker/controls/ActionButton.vue`—dock typed-context migration

3 sites edited at lines 37 + 44–45 + 71–74:

```diff
- import { computed, inject, ref, type Component } from "vue";
+ import { computed, ref, type Component } from "vue";
  import { HoverCard, HoverCardContent, HoverCardTrigger } from "@components/ui/hover-card";
+ import { useOptionalDockContext } from "@mkbabb/glass-ui/dock";
- const dockKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
- const dockRelease = inject<(() => void) | null>("dockRelease", null);
+ const dock = useOptionalDockContext();
  ...
  if (v) {
-     dockKeepOpen?.();
+     dock?.keepOpen();
  } else {
-     dockRelease?.();
+     dock?.release();
  }
```

Per P11/e §CR-1b: the string-key injects no-op silently against the v1.4.0+ symbol-keyed `DOCK_CONTEXT_KEY`. The typed-context helper is the only correct surface and is reachable via `@mkbabb/glass-ui/dock` per W1 Lane B re-export. **This is the load-bearing CR-1 finding**—the avatar typo was cosmetic-latent; this was a live UX regression closing the dock idle-collapse-suppression contract.

## §3 A.3—CR-4a HeaderRibbon local-fork retirement

Per P11/e §CR-4a + W5.md A.3. Pre-edit verification: `rg -ln '@components/custom/header-ribbon|custom/header-ribbon' demo/ src/` returned empty (zero in-repo consumers besides the fork's own `index.ts` re-export).

**Action**: full directory deletion.

- `demo/@/components/custom/header-ribbon/HeaderRibbon.vue`—155 LOC (deleted).
- `demo/@/components/custom/header-ribbon/index.ts`—1 LOC re-export (deleted).

**Total delta**: -156 LOC; zero consumer rewrites needed (no live import sites). A future value.js page that wants HeaderRibbon imports from `@mkbabb/glass-ui/header-ribbon` directly per the canonical subpath.

The orchestrator's "1 known import site" line in the dispatch turned out to refer to the fork's own `index.ts` self-reference; the P11/e audit had already confirmed zero external consumers.

## §4 A.4—CR-4b useClipboard bulk import flip + local-fork deletion

### §4.1 Import flip—17 sites across 17 files

All 14 static `import { copyToClipboard } from "@composables/useClipboard"` sites and 3 dynamic `await import("@composables/useClipboard")` sites flipped to consume the v1.8.2 bare co-export at `@mkbabb/glass-ui`.

**Static-import sites (14)**—flipped `from "@composables/useClipboard"` → `from "@mkbabb/glass-ui"`:

1. `demo/@/components/custom/dock/layers/SlugEditLayer.vue:6`
2. `demo/@/components/custom/palette-browser/PaletteCard.vue:210`
3. `demo/@/components/custom/palette-browser/PaletteDialog.vue:208`
4. `demo/@/components/custom/mix/MixResultDisplay.vue:5`
5. `demo/@/components/custom/color-picker/ColorPicker.vue:67`
6. `demo/@/components/custom/gradient/GradientCodeEditor.vue:6`
7. `demo/color-picker/App.vue:159`
8. `demo/@/components/custom/panes/GeneratePane.vue:8`
9. `demo/@/components/custom/palette-browser/composables/useSwatchActions.ts:5`
10. `demo/@/composables/palette/usePaletteActions.ts:3` (was `from "../useClipboard"`, also rewritten)
11. `demo/@/components/custom/palette-browser/PaletteSlugBar.vue:135`
12. `demo/@/components/custom/panes/BlobPane.vue:11`
13. `demo/@/components/custom/panes/AuroraPane.vue:11`
14. `demo/@/components/custom/color-picker/composables/useColorModel.ts:2`

**Dynamic-import sites (3)**—flipped `await import("@composables/useClipboard")` → `await import("@mkbabb/glass-ui")`:

15. `demo/@/components/custom/gradient/GradientVisualizer.vue:109`
16. `demo/@/components/custom/panes/MixPane.vue:49`
17. `demo/@/components/custom/generate/GenerateControls.vue:70`

**Note on the 19-vs-17 count**: P11/e + W5.md A.4 cited "19 sites" (and W5.md cited 20 callsite files including the definition). The exact static + dynamic import-statement count is 17 (14 static + 3 dynamic). The "19" figure in the audit appears to count transitively-injected callsites (e.g., `ColorInput.vue:139` receives `copyToClipboard` via context inject from `useColorModel`—no direct import) along with the definition file itself. All actual import statements pointing at the local fork have been flipped; zero remain.

Post-flip grep verification: `rg -n '@composables/useClipboard|composables/useClipboard\b|from\s+"[^"]*useClipboard"' demo/ src/` returned empty.

### §4.2 PaletteCard.vue dead-arg cleanup (P+1 opportunistic—minimal-risk)

`PaletteCard.vue:324` called `copyToClipboard(text, "Copied all colors")`—a 2-arg form. The local fork's signature was single-arg only; the second arg was being silently dropped at runtime. The glass-ui canonical signature is `copyToClipboard(text, options?: { resetMs?: number })`—passing a bare string would surface as a type error under strict typecheck. Single-line dead-arg removal:

```diff
- copyAll: () => copyToClipboard(props.palette.colors.map((c) => c.css).join(", "), "Copied all colors"),
+ copyAll: () => copyToClipboard(props.palette.colors.map((c) => c.css).join(", ")),
```

Functionally identical to pre-edit runtime; cleaner typing posture. Zero scope creep.

### §4.3 Local fork deletion

`demo/@/composables/useClipboard.ts`—28 LOC (deleted). Zero remaining references confirmed by the grep above.

### §4.4 Hand-rolled `copied + setTimeout` migration—SKIPPED

The opportunistic A.4 sub-task ("if ~10 hand-rolled `copied = ref(false) + setTimeout` patterns exist, migrate to `useClipboard()`") was deliberately skipped per orchestrator clause "Skip if it adds risk or scope creep." The bulk import-flip Path B was already the minimal-friction P-wave deliverable; the composable migration is documented at P11/e §CR-4b-3 as P+1 opportunistic.

## §5 A.5—PD-3 disposition: fold to W6 formal-archive

Per W5.md A.5 fallback and the orchestrator's explicit operational constraint "DO NOT touch the WIP branch—PD-3 is folded to W6 formal-archive per W5.md A.5 default":

- The `w.w2.1-value-js-prebuild` branch state at `c0cc349` was NOT mutated by this lane.
- No rebase / merge / reset / checkout / push commands run against value.js.
- No git mutations of any kind on either repo (read-only `git status` + `git log --oneline -5` + `git branch --show-current` are the only git invocations).
- The PD-3 LAND path (option (a) per P11/e §PD-3) requires user authorization which was not granted at W5 open; per W5.md A.5 the lane folds to W6 formal-archive at `docs/tranches/P/archive/value-js-wip-branch.md` with rationale "user-declined LAND; WIP branch permanently frozen at user discretion"—to be authored at W6.

The 4-modified-library-internal-files (`plugins/vite-source-export.ts`, `src/index.ts`, `src/parsing/units.ts`, `src/units/normalize.ts`) and 5 untracked parsing/units modules plus the 3 docs-submodule path drifts visible in `git status --short` are PRE-EXISTING per P11/e §State delta—NOT artefacts of this lane.

## §6 value.js gate verification

| Gate | Result | Duration | Output |
|---|---|---|---|
| `npm run build` (production library) | GREEN | 1.24s | 33 modules transformed; dts built in 891ms |
| `npm run gh-pages` (demo build) | GREEN | 3.15s | full demo bundle emitted; pre-existing chunk-size warning unrelated to this lane |
| `npm test -- --run` (vitest) | GREEN | 1.09s | 1409 tests passed across 26 test files |

No typecheck script exists in value.js's `package.json` (per P11/e §Build verification). Build leniency-class behaviour (tree-shaking absorbing bad imports) does not mask any of this lane's edits—every flipped site has a successful module resolution at `@mkbabb/glass-ui`, every dock-context callsite has correct type narrowing under the canonical helper, and the avatar typo fix is a strict-name correction.

## §7 Operational constraint compliance

| Constraint | Status | Evidence |
|---|---|---|
| NO mutating git in any repo | OK | Only `git status --short`, `git log --oneline -5`, `git branch --show-current` invoked. Zero add/commit/stash/checkout/reset/restore/rebase/merge/push/pull/fetch. |
| NO stash recurrence | OK | No `git stash` invocations whatsoever. |
| NO `npm run build` in glass-ui directory | OK | All `npm` invocations executed against `/Users/mkbabb/Programming/value.js` (consumer); glass-ui dist at HEAD `7c901b9` v1.8.2 was consumed read-only via the `file:../glass-ui` symlink. |
| Stay on value.js current branch (no checkout) | OK | `git branch --show-current` reports `w.w2.1-value-js-prebuild` at both lane open and lane close; no checkout invocations. (Note: the orchestrator spec line "Stay on master" mismatches actual repo state; the binding constraint reading is "do NOT change branches"—honoured.) |
| Hard-cap 40 min | OK | All edits + 3 gates complete inside the cap. |

## §8 Status: COMPLETED

- A.2—CR-1 surgical fixes—LANDED (2 files, 7 lines).
- A.3—CR-4a HeaderRibbon retirement—LANDED (-156 LOC, 0 consumer rewrites).
- A.4—CR-4b useClipboard bulk import flip + local-fork deletion—LANDED (17 import sites flipped + dead-arg cleanup + 28 LOC local fork deletion).
- A.5—PD-3 fold-to-W6-archive—DOCUMENTED (no WIP-branch touch at this lane; archive doc to land at W6).

Final value.js working-tree delta from this lane: 19 modified files + 3 deleted files (155+1+28 = 184 LOC net deletion; ~30 lines of imports flipped). All 3 gates GREEN. Cross-repo write authorization documented per AGENT.md cross-repo dispatch expanded scope.

Pre-existing drift on `w.w2.1-value-js-prebuild` (4 modified library-internal + 5 untracked parsing/units + 3 docs/.gitmodules paths) is OUT OF SCOPE for this lane; remains at P11/e baseline state for PD-3 W6-archive disposition.
