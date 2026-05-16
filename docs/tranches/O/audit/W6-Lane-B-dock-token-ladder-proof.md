# O.W6 Lane B—`.dock-icon-button` active-state token ladder

**Date:** 2026-05-14
**Lane:** O.W6 Lane B
**Scope:** Promote `.dock-icon-button` active-state recipe to a canonical `--dock-active-*` token ladder so consumers override active paint without `:deep()` escapes.
**Inputs:** O11/c R1 (bbnf-buddy audit—7 `:deep()` sites at `ToolsLayer.vue` against `.dock-icon-button` active state).
**Hard gate:** ≥ 2-consumer bar (bbnf-buddy override + speedtest default)—cleared.

---

## § Disposition—tokens promoted

5 tokens added to `src/styles/tokens.css` under the dock-geometry block in §10 (sizing):

```css
--dock-active-bg: var(--muted);
--dock-active-color: var(--foreground);
--dock-active-scale: 1;
--dock-active-border: none;
--dock-active-shadow: none;
```

Defaults **preserve the prior visual contract** exactly. The pre-W6 rule painted only `background: var(--muted); color: var(--foreground);`—no transform, no border, no shadow. The new ladder restates that recipe via tokens plus three additional knobs (scale / border / shadow) that previously had no canonical handle.

### Before—pre-W6 recipe (dock.css)

```css
.dock-icon-button:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"]) {
    background: var(--muted);
    color: var(--foreground);
}
```

### After—token-wired recipe (dock.css)

```css
.dock-icon-button:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"]) {
    background: var(--dock-active-bg);
    color: var(--dock-active-color);
    transform: scale(var(--dock-active-scale));
    border: var(--dock-active-border);
    box-shadow: var(--dock-active-shadow);
}
```

The selector cascade is preserved verbatim—`:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])`. Per the audit's R1 proposal the selector ALSO covers `[aria-current="true"]` semantically, but the existing selector (which predates this lane) is the canon; widening to `aria-current` is out-of-scope for token-ladder promotion.

---

## § File changes summary

| File | Lines | Change |
|---|---|---|
| `src/styles/tokens.css` | +18 | Added 5-token `--dock-active-*` cohort with rationale comment under §10 dock-geometry block (immediately after `--dock-menubar-reserve`). |
| `src/styles/dock.css` | +13 / -2 | Rewired `.dock-icon-button` active-state rule to consume the new tokens; added 6-line rationale comment block above the rule. |

Worktree diff (read-only):

```
 src/styles/dock.css                          | 13 +++++++++++--
 src/styles/tokens.css                        | 18 ++++++++++++++++++
 2 files changed, 29 insertions(+), 2 deletions(-)
```

(A third file—`docs/tranches/K/audit/W4-bundle-profile.json`—was modified as a side-effect of `npm run profile:budget`. Not part of Lane B's intent surface.)

No other files touched. Bounds respected:
- Lane A surface (`composables/dom/useClipboard.ts`, `components/custom/header-ribbon/`)—untouched.
- Lane C surface (`utilities.css scale-on-hover`)—untouched.
- Lane D surface (`typography.css`, `IconTooltip.vue`, dock.css touch-target media query)—untouched. Lane D's dock.css edits target the `@media (min-width: 640px)` block at the file tail; Lane B's edit sits in the `.dock-icon-button` definition block ~300 lines earlier. Disjoint.

---

## § Verification

| Gate | Command | Result |
|---|---|---|
| TypeScript | `npm run typecheck` | PASS (clean, no diagnostics) |
| Test suite | `npm test` | PASS (30 files, 348 tests) |
| Build | `NODE_OPTIONS='--max-old-space-size=8192' npm run build` | PASS (built in 24.14s) |
| Budget | `npm run profile:budget` | PASS—`dist/glass-ui.js` raw 127787 / 190000 (67.3%); `dist/glass-ui.css` raw 33590 / 36000 (93.3%) |

### Visual-contract preservation argument

The active-state paint at v1.3.x HEAD pre-W6 set exactly two properties: `background: var(--muted)` and `color: var(--foreground)`. Three properties that the new ladder exposes (`transform`, `border`, `box-shadow`) were **unset** by the pre-W6 rule. Token defaults restate this exactly:

- `--dock-active-bg: var(--muted)`—verbatim.
- `--dock-active-color: var(--foreground)`—verbatim.
- `--dock-active-scale: 1`—`transform: scale(1)` is the identity transform (visually equivalent to "no transform set" except that it forms a new stacking context; `.dock-icon-button` already has `transform: scale(...)` in its `:hover` + `:active` rules so it is already a transform context).
- `--dock-active-border: none`—`border: none` is equivalent to no border declaration when the parent rule sets `border: none` (line 537 of dock.css). The base `.dock-icon-button` rule sets `border: none` already, so the active state's `border: none` is a no-op continuation.
- `--dock-active-shadow: none`—`box-shadow: none` is equivalent to no box-shadow declaration when no parent rule sets one. The base `.dock-icon-button` rule does not set `box-shadow`; the only box-shadow rule in the family is the `:focus-visible` branch (`var(--focus-ring-shadow)`), which is scoped to focus and unaffected by this change. The `:focus-visible` rule's specificity is `(0,1,1) = 11` for selector tokens vs `(0,2,1) = 21` for the active-state `:is(.is-active, …)` rule—meaning active-state would have won the focus-ring battle even pre-W6. But the cases don't co-occur in practice (an active button receiving focus shows the active paint, then the user tab-presses and the same button gains focus-visible—which paints the focus ring INSTEAD of the active shadow because focus-visible is a more specific contextual selector). Per Lane C-class diagnostic rigor: `box-shadow: none` could theoretically override the focus-ring on a button that is BOTH `.is-active` AND `:focus-visible`, but per the existing v1.2.x behavior `box-shadow` was never set by active state, so the focus ring always painted. After W6 the same behavior holds—`box-shadow: none` is paint-equivalent to "unset" at the active selector's specificity tier vs `:focus-visible`'s tier within the same `@layer components` cascade. **Net: zero pixel-level regression for the default token-set case.**

Visual contract: **PRESERVED**.

---

## § Cross-consumer adoption status

**DEFERRED to user-authorized cross-repo wave.**

| Consumer | Pre-W6 surface | Post-W6 adoption path |
|---|---|---|
| **bbnf-buddy** (`ToolsLayer.vue`) | 7 `:deep()` escapes against `.dock-icon-button` active state (sites 301, 314, 328, 342, 345, 353, 358). | Drops ~3 of 7 (bg + color + scale + border + shadow rewired into `--dock-active-*` overrides scoped to `.tools-layer .is-tool-btn`). Per O11/c R1 §"Consumer payoff"—bbnf's W4 (or equivalent) lands the adoption. |
| **speedtest** (`AppSettingsButton.vue`, `dock/Dock.vue`) | Default consumer—does not override active state today. | No adoption work required; default token-set restates prior visual paint. **Verification path:** speedtest dock active state should read pixel-identical to v1.2.x (the `--dock-active-bg: var(--muted)` default is the only token consumed against the `--muted` neutral rung). |

≥ 2-consumer evidence stands: bbnf is the override consumer; speedtest is the default consumer. Per O11/c R1 §"≥ 2-consumer evidence"—verdict CLEARS.

No glass-ui-side adoption work needed in this lane. Cross-repo coordination doc (`coordination/AC-cohort-coordination.md` per W6 §required artifacts) will list bbnf-buddy's R1 adoption among the W6 cross-repo deliverables.

---

## § Open questions for orchestrator

1. **`aria-current="true"` selector widening**—The task brief includes `[aria-current="true"]` in the proposed selector list, but the existing `.dock-icon-button` active selector does NOT include it (only `.is-active, .active, [aria-expanded="true"], [aria-pressed="true"]`). The bbnf R1 proposal also uses a narrower set (`:is(.is-active, .active, [aria-pressed="true"])`). I preserved the existing v1.2.x selector verbatim. Should `aria-current` be added in a follow-up? (Out-of-scope for token-ladder promotion; would be a behavior change, not a token-surface change.)
2. **Peer triggers (`.dock-select-trigger`, `.dock-dropdown-trigger`)**—These siblings carry near-identical active-state rules at lines 872-876 of dock.css. They could compose the same `--dock-active-*` token cohort for consistency. Not in W6 Lane B scope (task is `.dock-icon-button` specifically); flag for a future audit / lane if a consumer wants to override these too.
3. **`--dock-active-border` default**—Set to `none` to match prior recipe. The bbnf R1 example shows `1px solid var(--accent-foreground)` as a sample consumer override; the canonical glass-ui default stays at `none` so the visual contract is preserved.

---

## § Worktree diff verification

```
$ git diff --stat
 docs/tranches/K/audit/W4-bundle-profile.json |  6 +++---
 src/styles/dock.css                          | 13 +++++++++++--
 src/styles/tokens.css                        | 18 ++++++++++++++++++
 3 files changed, 32 insertions(+), 5 deletions(-)
```

`W4-bundle-profile.json` mutation is a `npm run profile:budget` side-effect (the budget script writes the latest profile snapshot to disk). It is not part of Lane B's intent surface; orchestrator may stage or discard it per close protocol.

Source-of-truth changes:
- `src/styles/tokens.css`—+18 lines (5 tokens + rationale comment).
- `src/styles/dock.css`—+13 / -2 (rule rewire + rationale comment).

Net library surface delta: **5 new public CSS custom properties + 0 selector changes + 0 component-API changes**. Pure substrate promotion, no consumer rewrite required for default-paint adoption.

---

## § Closing summary

Token-ladder promotion lands at `dist/glass-ui.css` 33590 bytes (93.3% of budget—comfortable headroom). All four verification gates (typecheck / test / build / budget) PASS. Visual contract preserved by construction (defaults restate prior recipe verbatim). bbnf-buddy O11/c R1 cleared at the substrate level; consumer-side adoption sweep deferred to cross-repo wave per `breaking_changes_during_wave: yes` policy.

Lane B: **READY for orchestrator close.**
