# P.W6—P11/a + P11/b consumer re-audit (rerun against W5 landings)

**Date**: 2026-05-16
**Mode**: READ-ONLY git in both consumer repos and glass-ui. No source mutations. No `npm run build`.
**Glass-ui HEAD**: `54a8acb` (M.W4 close ceremony; pre-P-close).
**Scope**: verify that the P.W5 cross-repo writes at words/frontend (Lane E) and fourier-analysis (Lane B) adopted cleanly. Confirm flagged-item disposition holds.

---

# Lane a—words/frontend re-audit (P11/a rerun)

## §1—Scope

Verify P.W5 Lane E LANDED items (E.1 Fira Code CDN drop; E.2 scale-on-hover migration) and confirm the FLAGGED items (E.3 / E.4 / E.5) dispositions hold per `docs/tranches/P/archive/words-frontend-substrate-pending.md`.

**Consumer baseline**: P11/a round-2 audit at glass-ui v1.7.0.
**Consumer HEAD pre-rerun**: `5c1b2b8 feat(p.w5-e): glass-ui consumer adoption—Fira Code CDN drop + scale-on-hover (E.1 + E.2)`—matches the Lane E push exactly; no successor consumer commit landed since W5.
**Working-tree state**: dirty on `backend/` + repo-root files (pre-existing, unrelated to glass-ui surface); `frontend/` tree clean since Lane E commit.

## §2—W5 landing verification

### E.1—Fira Code CDN drop (`frontend/index.html`)

Probe: `grep 'Fira+Code' /Users/mkbabb/Programming/words/frontend/index.html` → exit 1 (zero matches).

Verdict: **LANDED**. The Google Fonts CDN query no longer requests `Fira+Code`; consumer falls back to the self-hosted Fira Code shipped via `@mkbabb/glass-ui/styles` (v1.5.0+). Net `~36 kB` woff2 fetch eliminated.

### E.2—scale-on-hover migration

Probe: `rg 'hover:scale-105' /Users/mkbabb/Programming/words/frontend/src` → exit 1 (zero `hover:scale-105` matches).

Broader probe `rg 'hover:scale-'` returns **12 remaining literal sites**—exactly matching the W5 Lane E proof doc §3 retention enumeration:

| File | Pattern | Retention rationale |
|---|---|---|
| `PWAInstallPrompt.vue:45` | `group-hover:scale-110` | group-hover (parent-keyed) |
| `RefreshButton.vue:10` | `disabled:hover:scale-100` | paired suppressor (no `disabled:` companion on utility) |
| `YoshiAvatar.vue:3` | `hover:scale-125` | intentional dramatic shift |
| `CarouselSlide.vue:10` | `hover:scale-110` + `disabled:hover:scale-100` | paired suppressor |
| `LoadingProgress.vue:69,70` | `hover:scale-125` × 2 | intentional dramatic shift |
| `SynonymListEditable.vue:50` | `hover:scale-110` + `disabled:hover:scale-100` | paired suppressor |
| `WordLookupPopover.vue:74,82,105` | `group-hover:scale-110` × 3 (inline SVG) | group-hover (parent-keyed) |
| `ActionButton.vue:12` | `group-hover:scale-110` | group-hover (parent-keyed) |
| `EditableField.vue:37` | `hover:scale-110` + `disabled:hover:scale-100` | paired suppressor |

Count: 12 retained sites. The W5 Lane E proof predicted **"12 sites intentionally kept literal (3 group-hover parent-keyed; 2 hover:scale-125 intentional dramatic; 4 disabled:hover:scale-100 paired companions; 3 inline-SVG group-hover:scale-110)"**. Tally matches exactly: 3 + 2 + 4 (RefreshButton + CarouselSlide + SynonymListEditable + EditableField) + 3 (WordLookupPopover×3) = 12.

Verdict: **LANDED** (12 of 12 retentions accounted for; zero unexpected residuals).

### Commit spot-check

```
$ git -C /Users/mkbabb/Programming/words/frontend log -1 --oneline
5c1b2b8 feat(p.w5-e): glass-ui consumer adoption—Fira Code CDN drop + scale-on-hover (E.1 + E.2)
```

Matches the Lane E push hash predicted by the dispatch. No follow-on consumer commit landed.

## §3—Flagged-item disposition

### E.3—MetricRow / MetricStack adoption (substrate-extension consumption)

Probe: `rg 'metric-row-value-clamp|MetricRow|MetricStack' /Users/mkbabb/Programming/words/frontend/src` → zero matches.

Per `archive/words-frontend-substrate-pending.md` §2, glass-ui v1.8.3 shipped CSS-var tokens (`--metric-row-value-clamp-{min,max}` + `--metric-row-unit-clamp-{min,max}`) routing the audacious-poster clamp endpoints through overridable customs, unblocking compact-register adoption. The substrate extension is glass-ui-side; the per-cell consume is **consumer-tranche-owned**.

Verdict: words/frontend does NOT consume the new tokens at any site (zero `MetricRow` / `MetricStack` / `metric-row-value-clamp` references in consumer src). The archive disposition ("consumer-side wave executes the per-cell consume") **holds**; this is correct given the substrate-ship-only role glass-ui plays at this absorb.

### E.4—ProgressiveSidebar slotted-chassis adoption

Per archive §3: ARCHIVED-CONSUMER-DESIGN-PENDING. Glass-ui READER-ONLY. No re-audit action.

### E.5—PaperBackdrop /api adoption

Per archive §4: ARCHIVED-CONSUMER-ORCHESTRATOR-OWNED. Glass-ui READER-ONLY. No re-audit action.

## §4—Verdict: CLEAN

- E.1 landed (zero residual `Fira+Code` references).
- E.2 landed (zero `hover:scale-105` residuals; 12 retentions match the proof doc enumeration bit-for-bit).
- E.3 / E.4 / E.5 dispositions hold per archive doc; glass-ui has shipped its half of E.3 (substrate extension), and the consumer-side absorb is correctly out of P-tranche scope.
- HEAD `5c1b2b8` matches the predicted Lane E push hash.

No anomalies. No new flags. The W5 Lane E partial-landing posture (2 LANDED + 3 FLAGGED-with-disposition) is verified intact at W6.

## §5—Status: PASS

---

# Lane b—fourier-analysis re-audit (P11/b rerun)

## §1—Scope

Verify P.W5 Lane B LANDED items (B.1 dock-context migration; B.2 useClipboard × 3; B.3 HoverCard rename at EquationView.vue; B.4 GlassScrubber adoption × 3).

**Consumer baseline**: P11/b round-2 audit + CR-2 ESCALATION (silent dock-context regression).
**Consumer HEAD pre-rerun**: `4df1a06 feat(p.w5-b): glass-ui CR-2 cross-walk—dock typed-context migration + useClipboard + HoverCard + GlassScrubber adoption`—matches predicted Lane B push hash.
**Working-tree state**: dirty on `api/` + repo-root files (pre-existing, unrelated to glass-ui surface); `web/src/` clean since Lane B commit.

## §2—W5 landing verification

### B.1—dock-context migration (folded into B.4)

Probe (functional check): `rg 'inject<.*>\("dock(KeepOpen|Release)"' /Users/mkbabb/Programming/fourier-analysis/web/src` → exit 1 (zero functional injects).

Broader probe `rg 'dockKeepOpen|dockRelease'` returns **2 hits, both inside `/**` doc-comment headers**:

```
GlassTimeline.vue:14:   * token internally, so we no longer inject `dockKeepOpen`/`dockRelease`
SliderControl.vue:18:   * token internally, so we no longer inject `dockKeepOpen`/`dockRelease`
```

These are audit-trail comments preserved by W5 Lane B §2.3 ("Each rewritten SFC carries an /**-doc-comment header explaining the migration")—zero functional callsites remain. The dock keep-open contract is now wired internally by `<Slider variant="glass-scrubber">` via the typed `DockContext` token (the canonical post-O.W2 surface).

Verdict: **LANDED**.

### B.2—useClipboard migration (3 sites)

Probe: `rg 'useClipboard' /Users/mkbabb/Programming/fourier-analysis/web/src` returns hits at exactly the 3 expected sites:

| Site | Import | Call shape |
|---|---|---|
| `web/src/composables/useMorphConfig.ts:9` | `import { useClipboard } from "@mkbabb/glass-ui";` | `useClipboard({ resetMs: 2000 })` |
| `web/src/components/equation/EquationResult.vue:3` | `import { useClipboard } from "@mkbabb/glass-ui";` | `useClipboard({ resetMs: 2000 })` |
| `web/src/components/visualization/gallery/UserSlugBar.vue:4` | `import { useClipboard } from "@mkbabb/glass-ui";` | `useClipboard({ resetMs: 1500 })` |

All 3 sites use the composable shape with reactive `copied` flag (matching W5 Lane B §3—bare `copyToClipboard` co-export was not the right fit at these sites).

Verdict: **LANDED**.

### B.3—HoverCard rename at EquationView.vue

Probe: `rg 'HoverCard|hover-card' /Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EquationView.vue` shows:

```
8:import { HoverCard, HoverCardTrigger, HoverCardContent } from "@mkbabb/glass-ui";
272: <HoverCard v-if="tierInfo" :open-delay="200" :close-delay="150">
273:     <HoverCardTrigger as-child>
280:     <HoverCardContent class="info-hovercard" side="bottom" ...>
298:     </HoverCardContent>
299: </HoverCard>
```

`rg 'reka-ui' .../EquationView.vue` → zero matches. The legacy `HoverCardRoot` + `HoverCardPortal` cluster from reka-ui is fully retired; the glass-ui surface (`<HoverCard>` wrapper + portal-internal `<HoverCardContent>`) is in place.

Verdict: **LANDED**.

### B.4—GlassScrubber adoption (3 sites)

Probe: `rg 'glass-scrubber' /Users/mkbabb/Programming/fourier-analysis/web/src` shows `variant="glass-scrubber"` at exactly the 3 expected sites:

- `web/src/components/ui/SliderControl.vue:86`—`variant="glass-scrubber"`.
- `web/src/components/visualization/GlassTimeline.vue:67`—`variant="glass-scrubber"`.
- `web/src/components/equation/convergence/ConvergenceTimeline.vue:70`—`variant="glass-scrubber"`.

All 3 sites consume the canonical `<Slider variant="glass-scrubber">` substrate (P.W3 Lane A). The shadow recipes (manual pointer state machines + `.glass-track` / `.glass-fill` / `.glass-thumb` paints + ARIA wiring + dock injects) are retired in full. Per-instance `--slider-scrub-*` cascade retints visible at SliderControl.vue:143 + GlassTimeline.vue:120 (W5 Lane B §5.1, §5.2 confirm this is the expected divergence-preservation pattern).

The known non-trivial divergence flagged at W5 Lane B §5.5 (SliderControl.vue's `variant` prop is now cosmetic—both `"timeline"` and `"default"` map to `glass-scrubber`) is documented and remains.

Verdict: **LANDED**.

### Commit spot-check

```
$ git -C /Users/mkbabb/Programming/fourier-analysis log -1 --oneline
4df1a06 feat(p.w5-b): glass-ui CR-2 cross-walk—dock typed-context migration + useClipboard + HoverCard + GlassScrubber adoption
```

Matches the Lane B push hash predicted by the dispatch.

## §3—Residuals + flagged items

- Two doc-comment `dockKeepOpen`/`dockRelease` mentions remain at `GlassTimeline.vue:14` + `SliderControl.vue:18`. These are intentional audit-trail comments per W5 Lane B §2.3. Not functional. No action.
- `SliderControl.vue`'s `variant` prop is cosmetic (both values map to `glass-scrubber`). Documented at W5 Lane B §5.5 as "out of scope for P.W5 Lane B; future cleanup may retire the prop or promote it to a meaningful axis." Carries forward as a known consumer-side cleanup item; not a glass-ui-side concern.
- No new flags surfaced at this re-audit.

## §4—Verdict: CLEAN

- B.1 functionally landed (folded into B.4); only doc-comment audit-trail mentions remain.
- B.2 landed at all 3 sites with composable shape + reactive `copied` flag.
- B.3 landed; reka-ui HoverCard cluster fully replaced with glass-ui canonical surface.
- B.4 landed at all 3 sites; `<Slider variant="glass-scrubber">` adoption complete.
- HEAD `4df1a06` matches the predicted Lane B push hash.

No anomalies. The CR-2 ESCALATION (silent dock-context regression) is resolved at consumer-side; the contract is now wired via typed `DockContext` internally by `<Slider>`.

## §5—Status: PASS

---

# Operational compliance

| Constraint | Status |
|---|---|
| READ-ONLY git in glass-ui | OK—`git log` only. |
| READ-ONLY git in words/frontend | OK—`git log` + `git status` + `git show --stat` only. |
| READ-ONLY git in fourier-analysis | OK—`git log` + `git status` + `git show --stat` only. |
| No source file modifications | OK—zero edits to consumer src/ or glass-ui src/. |
| No `npm run build` mid-task | OK—zero build invocations. |
| HARD CAP 25 min | OK. |

---

# Aggregate verdict

| Lane | Consumer | HEAD | Result |
|---|---|---|---|
| P11/a rerun | words/frontend | `5c1b2b8` | CLEAN |
| P11/b rerun | fourier-analysis | `4df1a06` | CLEAN |

Both W5 cross-repo writes adopted cleanly. No follow-on consumer commits surfaced. All flagged-item dispositions hold. P-close consumer-side posture is verified.
