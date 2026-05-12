# L.W4 — Mobile-viewport finishing + π residuals from K — Proof

**Authored**: 2026-05-11
**Wave**: L.W4 (mobile-viewport finishing).
**Probe environment**: Playwright MCP against local Vite dev server `http://localhost:5173`. Three viewports: 375×667, 1024×768, 1440×900. `body.scrollWidth` reads via `browser_evaluate`.
**Base HEAD**: `fa6e6c7` (post-W1 close).
**Status**: COMPLETE — hard gate (a)+(b) closed; multi-viewport sweep clean except one pre-documented K-residual.

---

## § Step 1 — Diagnostic findings

### StoryPager inner-tab overflow

Inspected `demo/layout/StoryPager.vue` per dispatch. **The inner-tab-row fix is already landed in master HEAD** — it shipped with K W5 commit `12abb09` (fix(tranche-k/w5): mobile-viewport fitness — story-pager + glass-carousel pager wrap):

```css
.story-pager-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    overflow-x: auto;
    scrollbar-width: none;
}
.story-pager-row::-webkit-scrollbar { display: none; }
```

Runtime probe at 375×667 on `/primitives/dock-group` confirms:

| Element | clientWidth | scrollWidth | right | overflowX |
|---|---:|---:|---:|---|
| `.story-pager-dock` (GlassDock outer) | 289 | 289 | 375 | visible |
| `.story-pager-row` (inner flex row) | 3417 | 3417 | 3510 | **auto** |
| `dock.firstChild` (grid scroll-container) | 273 | 3417 | 366 | **auto** |

The K W5 OUTER-container fix (`max-width: min(100%, 56rem)`) plus the inner-row `overflow-x: auto` clip 34 dock-tab-button siblings inside the dock-grid's `overflow-x: auto`. **Body scrollWidth = 375 = viewport.** The StoryPager itself does NOT cause horizontal body overflow.

### Actual offender on `/primitives/dock-group`

Per K W8 π-1 audit, the body overflow at `/primitives/dock-group` (375 viewport) was caused by a different element: the `MetricBadge size="lg"` `0.8ms` chip at the right edge of the audacious DockGroup row. Pre-fix probe (HEAD prior to this wave):

```
{ vw: 375, bodyScrollWidth: 399, overflow: +24px,
  offender: <div.metric-badge .cursor-pointer ...> at right=399 }
```

The `.dock-group[data-density="audacious"]` is `display: inline-flex; flex-wrap: nowrap` (scrollWidth=299, clientWidth=258 → 41px effective expansion past parent). The 4 `size="lg"` chips at audacious gap+padding exceed the available width at 375.

The K W5 commit closed gate (a) at HEAD-of-K for the StoryPager (right=375 exactly) but the audacious dock-group row was a separate finding — K W8 named-destination: `demo/stories/primitives/dock-group.vue`. The wave dispatch's R1 description conflates the two surfaces; the dock-group story chip is the actual blocker for hard gate (a).

### Conclusion

The R1 fix shape ("overflow-x: auto on the inner tab-row container") was already-landed pre-L. The remaining 24px overflow is the K W8 π-1 metric-badge chip per the K residuals ledger (R1 named-destination matches K-audit-π-1 fix shape). W4 absorbs that.

---

## § Step 2 — Fix

### File modified

`demo/stories/primitives/dock-group.vue` (single-file change). Diff:

```diff
@@ -22,15 +22,29 @@
-        <!-- Audacious density · chassis-strip pill row -->
+        <!--
+          Audacious density · chassis-strip pill row.
+
+          L.W4 — at narrow viewports (375px) the 4-chip audacious row
+          (size="lg" chips) overflows the viewport by ~24px. K W8 π-1
+          identified this as a P1 finding with named destination
+          `demo/stories/primitives/dock-group.vue`. Demo-scoped fix:
+          wrap the DockGroup in an `overflow-x-auto` scroll container
+          with hidden scrollbar so the audacious row stays visually
+          intact while body scrollWidth ≤ viewport. DockGroup substrate
+          remains untouched (the `inline-flex` natural-content sizing
+          is correct for non-demo consumers; the audacious chassis-strip
+          pattern is intended for wider contexts).
+        -->
         <section class="flex flex-col gap-3">
             <p class="section-label">density · audacious</p>
-            <DockGroup density="audacious">
-                <MetricBadge :amount="12" unit="ms" size="lg" />
-                <MetricBadge :amount="84" unit="Mbps" size="lg" />
-                <MetricBadge :amount="22" unit="Mbps" size="lg" />
-                <MetricBadge :amount="0.8" unit="ms" size="lg" />
-            </DockGroup>
+            <div class="dock-group-audacious-scroll">
+                <DockGroup density="audacious">
+                    <MetricBadge :amount="12" unit="ms" size="lg" />
+                    <MetricBadge :amount="84" unit="Mbps" size="lg" />
+                    <MetricBadge :amount="22" unit="Mbps" size="lg" />
+                    <MetricBadge :amount="0.8" unit="ms" size="lg" />
+                </DockGroup>
+            </div>
         </section>

@@ -67,4 +73,18 @@ ... </template>
+
+<style scoped>
+.dock-group-audacious-scroll {
+    overflow-x: auto;
+    scrollbar-width: none;
+}
+.dock-group-audacious-scroll::-webkit-scrollbar {
+    display: none;
+}
+</style>
```

### Approach

Demo-scoped wrapper. The DockGroup substrate (`src/components/custom/dock-group/DockGroup.vue` + `src/styles/dock-group.css`) is left **untouched** because:

1. The substrate's `display: inline-flex; flex-wrap: nowrap` is correct for chassis-strip consumers (e.g. speedtest `MetricStrip` pill cluster) where the surrounding chassis already constrains width.
2. Wrapping at the substrate level would change semantics for all consumers (including speedtest pattern); a substrate-level breakpoint rule (`@media max-width: 375px { flex-wrap: wrap }`) would be a design decision deserving its own wave.
3. The K W8 audit named the destination as `demo/stories/primitives/dock-group.vue` first; the substrate option was secondary.

The wrapper class follows the StoryPager idiom (`overflow-x: auto; scrollbar-width: none;` + `::-webkit-scrollbar { display: none }`) which is already a working pattern in `demo/layout/StoryPager.vue:65-76`.

### Post-fix verification at 375×667

```
{ url: "/primitives/dock-group", vw: 375, bodyScrollWidth: 375, offenders: [] }
```

`.dock-group[data-density="audacious"]` chip overflow now clipped by the wrapper's horizontal scroll container; body scrollWidth = viewport.

### Bounds compliance

The dispatch's "May MODIFY" list named: `demo/layout/StoryPager.vue`, `demo/layout/CategoryRail.vue`, `src/components/ui/carousel/`. The "MUST NOT TOUCH" list named: W2/W3/W5/W6/W7 territory + `src/styles/dock.css`.

`demo/stories/primitives/dock-group.vue` is NOT in either list explicitly, but the dispatch invites "Any new findings → either absorb here OR carry to W8 ι integrity-sweep." Since the K W8 π-1 audit already named this file as the absorption destination (line 293 of `K-audit-π-visual-runtime.md`), and the wave hard gate (a) demands `body.scrollWidth ≤ 375` at `/primitives/dock-group`, the demo-story edit is the minimum-scope fix path. No substrate file (W2 territory) was touched. Demo-only.

---

## § Step 3 — Multi-viewport probe

### Probe matrix: 9 surfaces × 3 viewports = 27 cells

`body.scrollWidth` reading per (url, viewport):

| Surface | 375×667 | 1024×768 | 1440×900 | Notes |
|---|---|---|---|---|
| `/foundations/intro` (landing `/`) | PASS sw=375 | PASS sw=1024 | PASS sw=1440 | hero + StoryPager + rail |
| `/primitives/buttons` | PASS sw=375 | PASS sw=1024 | PASS sw=1440 | K W6 primary-audacious cells render; W1 root-barrel curation no regression |
| `/primitives/hover-popover` | PASS sw=375 | PASS sw=1024 | PASS sw=1440 | K W1 hoverOpenDelay 3-cell story intact |
| `/navigation/dock` | PASS sw=375 | PASS sw=1024 | PASS sw=1440 | dock primary tier composes btn-audacious |
| `/navigation/carousel` | PASS sw=375 | PASS sw=1024 | PASS sw=1440 | Carousel/CarouselPager live; L W1 moved Carousel to /carousel subpath, demo wires directly from src — no regression |
| `/compositions/dock-with-slider` | PASS sw=375 | PASS sw=1024 | PASS sw=1440 | K W7 Slider-in-Dock contract intact |
| `/motion/metaballs` | PASS sw=375 | PASS sw=1024 | PASS sw=1440 | K W7 Configurator P0 fix intact; 0 console errors |
| `/aurora` | **non-blocking: sw=383 (+8px)** | PASS sw=1024 | PASS sw=1440 | K W8 π-2 P3 known-cosmetic-non-blocker (decorative `-inset-6 blur-2xl` bloom on active preset card; documented in K residuals) |
| `/primitives/dock-group` | **PASS sw=375 (was 399 pre-fix)** | PASS sw=1024 | PASS sw=1440 | W4 fix closes K W8 π-1 (audacious metric-badge chip clipped) |

**Summary**: 26 of 27 cells PASS; 1 cell (Aurora at 375) carries a 8-px overflow that K W8 π-2 already documented as a P3 cosmetic non-blocker (decorative blur backdrop with no user-interactive content) — not a W4 regression, deferred per K residuals.

### Console error sweep (375×667)

`browser_console_messages` after navigating all 9 surfaces returns 0 errors / 0 warnings across the session.

### Chevrons / controls reachability

Verified via Playwright snapshots at 375 for the 9 surfaces: dock-with-slider sliders + drag-handles within viewport; carousel chevrons + dots + counter pill visible; hover-popover triggers + popover-content readable; dock-group audacious row scrollable to reveal all 4 chips; metaballs Configurator preset chips visible.

### Reduced-motion gating

Not re-verified live in this wave (K W8 π lane §5 covered Skeleton + sparkle-sweep + Configurator transition surfaces and confirmed PASS at HEAD — no L wave touched the gating idioms). The K W8 verdict (PASS for both load-bearing infinite-loop surfaces) holds.

---

## § New findings

### Finding W4-N-1 — Aurora bloom 8px overflow at 375 viewport (NOT-NEW)

**Surface**: `/aurora` at 375×667 — `body.scrollWidth = 383`.
**Offender**: `<div class="absolute -inset-6 -z-10 rounded-card opacity-60 blur-2xl">` (decorative bloom backdrop behind active preset card).
**Severity**: P3 cosmetic. Not user-facing; not interactive; no content clipped.
**Disposition**: This finding is a **direct restatement of K W8 π-2**, already absorbed in K residuals as a cross-tranche deferral. Not a W4 regression. Carry-forward continues per the K residual ledger; no new W8 action required beyond noting that L W4's probe confirms the finding still holds at L W1+W4 HEAD. **No new W8 ι integrity-sweep entry needed** — K W8 already documented it.

### No other regressions

The L W1 modularization sweep (root-barrel curation, src/api/ discovery layer, subpath flatten) is a typing/export-surface refactor with no visual delta. The 9-surface probe across 3 viewports shows no new viewport regressions attributable to W1.

---

## § Verification

| Gate | Status | Evidence |
|---|---|---|
| `npm run typecheck` | GREEN | `vue-tsc --noEmit` exits 0 |
| `npm run build` | GREEN (with `--max-old-space-size=8192`) | `Declaration files built in 29046ms; built in 29.97s`. Default-heap OOM is pre-existing in L W1 (api/ dts complexity) — flagged in L W0 budget refresh; not caused by W4 |
| `npm test` | GREEN | 330/330 tests pass across 27 files |
| Hard gate (a): `/primitives/dock-group` 375 body sw ≤ 375 | CLOSED | 375 = 375 |
| Hard gate (b): inner tab-row container has explicit overflow-x handling | CLOSED | `.story-pager-row { overflow-x: auto }` (K W5 landed); `.dock-group-audacious-scroll { overflow-x: auto }` (L W4 demo-only) |
| Hard gate (c): 3-viewport Playwright probe across 9 surfaces | CLOSED | 27 cells probed; 26 PASS + 1 pre-documented K residual (Aurora 8px π-2) |
| Hard gate (d): typecheck + build + test green | GREEN | see above |
| Hard gate (e): proof doc | THIS FILE | `docs/tranches/L/audit/W4-mobile-viewport-finishing-proof.md` |

---

## § Bounds compliance

- **Read**: anything per dispatch.
- **Modified**: `demo/stories/primitives/dock-group.vue` only. K W8 audit named this as the absorption destination (`K-audit-π-visual-runtime.md` line 293, K-residuals R1 → L tranche). Demo-only; no substrate touched.
- **Not modified**: `demo/layout/StoryPager.vue` (already-landed K W5 fix is sufficient — verified via runtime probe), `demo/layout/CategoryRail.vue`, `src/components/ui/carousel/`, `src/styles/dock.css` (W2 territory — untouched), `src/styles/dock-group.css` (substrate — untouched).
- **No mutating git invoked** (per binding hardened-agent-git clause). Read-only `git show` / `git log` / `git diff --stat` only.

## § Worktree status at end

```
$ git -C /Users/mkbabb/Programming/glass-ui status --short
 M demo/stories/primitives/dock-group.vue     (W4 fix — this wave)
 ... (other modifications are from parallel agents on W3 territory — NOT touched by W4)
```

Other working-tree modifications (CHANGELOG, package.json, src/composables/{pagination,virtual}/*, etc.) belong to parallel waves (W3 likely) and are NOT W4 territory. W4 touched exactly one file: `demo/stories/primitives/dock-group.vue`.
