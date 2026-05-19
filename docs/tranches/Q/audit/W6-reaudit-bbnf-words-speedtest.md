# Q.W6 — Consumer re-audit: bbnf-buddy / words/frontend / speedtest

**Date**: 2026-05-18
**Lane**: W6 consumer re-audit (lines 22-31 of `docs/tranches/Q/waves/W6.md`)
**Mode**: READ-ONLY (git read-only; build/typecheck smoke checks only)
**Auditor**: agent-dispatched re-audit lane

## Charter

Re-audit three of the six Q-touched consumers — bbnf-buddy, words/frontend, speedtest —
and verify, for each: (a) `npm run build` + typecheck GREEN against current glass-ui;
(b) the declared Q remediation commits are present and their effect is observable in the
tree; (c) no residual beyond the explicitly-sanctioned pre-existing exceptions.

glass-ui HEAD `d244dd5` was rebuilt at audit open (`npm run build`) because the on-disk
`dist/` carried JS chunks but **zero `.d.ts` files** — a stale/incomplete build that
makes every consumer typecheck fail spuriously with TS7016. Post-rebuild, glass-ui
`dist/` carries the full declaration graph. All consumer checks below run against the
rebuilt glass-ui.

## Consumer 1 — bbnf-buddy — VERDICT: PASS

Repo: `/Users/mkbabb/Programming/bbnf-buddy` @ HEAD `eb842af` (working tree clean).

**Q remediation presence — all three commits landed, in order:**

| Commit | Wave | Scope |
|---|---|---|
| `a0db827` | W1 Lane E | cross-repo dev-resolution contract consumer half |
| `00ed370` | W2 Lane C | 6 stale `<Card variant="pane">` sites → canonical recipe |
| `eb842af` | W4 Lanes G/H/I | preset.css canonical-ladder rewrite + cartoon surface + `:deep` retreat |

**Mechanical checks:**

- `grep -rn '<Card[^>]*variant=' src` → **ZERO** (exit 1, no matches). PASS.
- `grep -rn 'glass-\(subtle\|medium\|default\|elevated\)' src/styles/preset.css` →
  **ZERO** (exit 1, no matches). No retired-token overrides. PASS.
- AnimationWorkspace cartoon site — `src/editor/components/animation/AnimationWorkspace.vue:158`
  uses `:surface="props.inline ? 'glass' : 'cartoon'"` on `<Card>`. Confirmed: the cartoon
  site rides Card's orthogonal `surface` prop (the W3 Lane H API), not a retired `variant`.
  PASS.

**Build state:**

- `npm run typecheck` → exactly **one** error: `src/composables/wasm/morph.ts(177,9)`
  TS2322 — WASM `SegmentId` not assignable to `number` (`WirePair`/`WireSegment` shape).
  This is the documented pre-existing, out-of-Q-scope residual. Confirmed it is the
  **ONLY** residual — no glass-ui-attributable error remains. PASS (modulo sanctioned residual).
- `npm run build` → **GREEN**. `vite build` succeeded; only the standard
  >500 kB chunk-size advisory (JsonPanel/index), unrelated to Q.

## Consumer 2 — words/frontend — VERDICT: PASS

Repo: `/Users/mkbabb/Programming/words` @ HEAD `0cd458f`. `frontend/` subtree clean
(dirty files are all `backend/` Python — outside Q scope).

**Q remediation presence — both commits landed, in order:**

| Commit | Wave | Scope |
|---|---|---|
| `e05e5bf` | W1 Lane F | cross-repo dev-resolution contract consumer half |
| `0cd458f` | W4 Lane F | 4 phantom `.glass-medium` → `.glass-quiet` |

**Mechanical checks:**

- `grep -rn 'glass-\(subtle\|medium\)' frontend/src` → **ZERO** (exit 1, no matches).
  No phantom retired-class references. PASS.

**Build state:**

- `cd frontend && npm run build` → **GREEN**. The `build` script is
  `vue-tsc --noEmit && vite build`; typecheck and bundle both passed clean. PASS.

## Consumer 3 — speedtest — VERDICT: FAIL (BLOCKER — Q scope gap)

Repo: `/Users/mkbabb/Programming/speedtest` @ HEAD `b33f58b0`. Working tree carries
only AD/AG-tranche docs artefacts (`docs/tranches/V/.../bundle-audit.html`,
`docs/tranches/AC/artefacts/W9/validation/`) — unrelated to Q.

**Q remediation presence — commit landed and is surgical:**

- `b33f58b0` (W1 Lane G) — `git show --stat`: **`vite.config.ts` only**, 34 insertions
  / 2 deletions, single file. Confirmed surgical — does not touch any AD/AG-tranche
  surface. PASS on the surgical-scope requirement.
- Resolver-config sweep present in `vite.config.ts`: the dev/serve branch declares
  `resolve.conditions: ["development", "module", "browser", "default"]` (line 505),
  correctly scoped dev-only (the production branch omits `development` so siblings
  resolve through built `dist/` via `import`/`default`). The dead `manualChunks`
  `/@mkbabb/keyframes.js/` + `/@mkbabb/value.js/` match arms were removed (documented
  inline, lines 455-457). PASS on resolver-sweep presence.

**Build state — RED:**

- `npm run check:client` (`vue-tsc --noEmit`) → **FAIL**. 5 SFCs raise TS2305
  `Module '"@mkbabb/glass-ui"' has no exported member 'ScrollPane'`:
  `StatsCards.vue`, `DashboardMapControls.vue`, `ResultsFilters.vue`,
  `ResultsTable.vue`, `IPLookupManager.vue`. (The keyframes.js TS2307 errors in the
  same run are a stale-state artefact — keyframes.js `dist/keyframes.{js,d.ts}` are
  present on disk and resolvable; a clean build past those, see below.)
- `npm run build` (`vite build --mode production`, clean) → **FAIL**:
  `"ScrollPane" is not exported by "../glass-ui/dist/glass-ui.js"`, imported by
  `DashboardMapControls.vue`. Hard rollup BLOCKER.

**Root cause — uncovered Q scope gap:**

speedtest consumes the `<ScrollPane>` **component** — imported from `@mkbabb/glass-ui`
and rendered in 5 dashboard SFCs (`<ScrollPane class="...">` wrappers around
StatsCards / map controls / results filters / results table / IP-lookup). The import
was introduced at speedtest `5d914df9` ("S.W4: consume glass-ui v0.8.0 — Card tier API
+ ScrollPane + tier-rename sweep").

Q.W3 Lane H **retired `<ScrollPane>`** from glass-ui (DEMOTE-to-variant; clean break,
no alias). glass-ui `src/` and the built barrel `dist/glass-ui.d.ts` both carry zero
`ScrollPane` symbol post-W3. speedtest's 5 import sites are therefore dangling against
current glass-ui — build-RED.

The Q consumer-audit lanes that examined speedtest (Qν round-3, Qυ round-4) scoped
their scan to `<Card variant=>` sites + pane-equivalents and concluded "0 pane sites;
speedtest needs no migration; got the `5d914df9` S.W4 tier-API sweep." They did **not**
scan for the `<ScrollPane>` *component* — the very component the same `5d914df9` commit
adopted and that W3 Lane H then retired. W3 Lane H folded glass-ui's own demo
ScrollPane story into the Card story but never swept the speedtest consumer. value.js
and bbnf-buddy `pane` sites were migrated; speedtest's `ScrollPane`-component sites
were missed.

This is a genuine Q residual — a fleet-RED consumer BLOCKER, not a sanctioned exception.
The fix is a 5-site `<ScrollPane>` → `<Card surface=... :grain="false">` (or
`tier="wash"`) migration in speedtest, of the same shape as the bbnf-buddy W2 Lane C
sweep, plus drop the import. It belongs in a Q residual lane or W6 follow-up; it was
never planned.

## Overall verdict

| Consumer | Build | Typecheck | Q remediation | Verdict |
|---|---|---|---|---|
| bbnf-buddy | GREEN | GREEN (1 sanctioned WASM residual) | all 3 commits present + observable | **PASS** |
| words/frontend | GREEN | GREEN (build includes typecheck) | both commits present + observable | **PASS** |
| speedtest | **RED** | **RED** | W1 commit present + surgical; W3 ScrollPane sweep MISSING | **FAIL — BLOCKER** |

**Aggregate: 2 PASS / 1 FAIL.** The W6 hard gate clause (b) — "6 consumer re-audit
lanes verify the fleet builds; ZERO consumer-side BLOCKER" — is **NOT met** for
speedtest. One consumer-side BLOCKER stands: speedtest's 5 `<ScrollPane>`-component
import sites are dangling against the W3 Lane H component retirement. Q.PROGRESS line
247 ("speedtest … Build + typecheck GREEN") was true at W1-close commit time but is
**stale** — W3's `<ScrollPane>` retirement (later in the same tranche) broke speedtest
without a paired consumer sweep. Recommend a Q residual lane to migrate the 5 sites
before FINAL.md declares ZERO Q-residuals.
