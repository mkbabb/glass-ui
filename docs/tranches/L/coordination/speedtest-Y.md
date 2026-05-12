# L × Speedtest-Y — Coordination artefact

**Authored**: 2026-05-11 (L.W0 Lane IV — orchestrator).
**L baseline**: glass-ui K close `35cae2c` + v0.9.3 published; precept submodule `d4ada55`.
**Y baseline**: speedtest X close `5dcc2505` + tag `x-close`; A1..A7 audit substrate committed.
**Precept basis**: `docs/precepts/instructions/tranche/SPEC.md` §"Document Set" — `coordination/<peer-letter>.md` clause landed at L.W0 Lane II (2026-05-11).

This artefact establishes the cross-repo writer-vs-reader boundary, wave-timeline touchpoints, and migration cycle between glass-ui's L tranche (v1.0 cohort) and speedtest's Y tranche (modularization HEADLINE + perf quick-fixes), which run in parallel through 2026-05.

---

## §1 — Wave-timeline touchpoints

| L wave | L deliverable | Y impact | Cross-repo cycle |
|---|---|---|---|
| W0 (this wave) | `v0.9.4` patch (subpath dts publication gap fix) | Y.A3 can adopt `@mkbabb/glass-ui/composables/{dark,keyboard}` via vue-tsc resolution immediately | speedtest re-pins glass-ui from `file:../glass-ui` to v0.9.4 OR continues file-link; either works |
| W1 HEADLINE | `v1.0` release (Phase 2 root-barrel removal — vueuse-bearing symbols moved to subpaths only; `src/api/` discovery layer; subpath flatten `/dark` `/keyboard` `/carousel`) | Y is the canonical second-consumer that proves SCC trap closure: speedtest re-link → `npm run build` → `grep modulepreload dist/index.html` returns empty; entry chunk gz net drop ≥ 15 KB | speedtest re-link commit lands inside L W1 close window; Y.A3 publishes a re-probe transcript in its audit artefact for symmetric verification |
| W2 | composables/ restructure into coherent sub-trees | If Y.A3 surfaces import-path observations on the v0.9.4 surface, L W2 absorbs them as wave content (not as Y direct commits) | none — Y is reader-only on L W2 |
| W3 | composable + primitive wire-or-retire | Some retired symbols may have been adopted in speedtest; verify via Y.A3 read-grep before retire | Y.A3 supplies the consumer-side inventory; L W3 absorbs as wire-vs-retire input |
| W5 | MIGRATION.md (binding deliverable) | The v0.9.x → v1.0 migration path is consumer-facing — speedtest is the canonical worked example | MIGRATION.md cites speedtest re-link diff as proof |
| W7 | aurora chrome Option-A unification (potential API reshape) | speedtest does not consume aurora directly; impact minimal | none |
| W8 | L close → tag verification | speedtest Y closes asynchronously; no L W8 dependency | none |

## §2 — Writer-vs-reader boundary

**Glass-ui L is the writer** for:
- All `src/` + `demo/` + `package.json` + `vite.*` + library API changes.
- All glass-ui-side commits under glass-ui's master branch.
- The v0.9.4 + v1.0 tags + pushes.

**Speedtest Y is the writer** for:
- All `frontend/` + `backend/` + speedtest config + Y audit artefacts.
- All speedtest-side commits under speedtest's master branch.
- The speedtest re-link commits (npm pin bumps to glass-ui v0.9.4 + v1.0).

**Speedtest Y.A3 is reader-only + recommender-only** for glass-ui source. Lane Y.A3 produces:
- An L-survey audit artefact at `docs/audits/2026-05-11-pre-Y/A3-glass-ui-K-postclose-L-survey.md` (already published at Y open).
- Recommendations folded into Y's wave plans where they relate to speedtest's own modularization — NOT folded into direct glass-ui edits.
- Any glass-ui-affecting recommendations route to L via a documented L wave (W0..W8) and absorb under L's own wave-spec process.

**Glass-ui L orchestrator is reader-only + auditor-only** on speedtest's source EXCEPT:
- The pre-existing K.WS speedtest annotation artefact at `speedtest/docs/tranches/W/artefacts/W3/b1/disposition.md` was orchestrator-authored at K close.  L does not modify it.
- Future cross-repo annotations follow the policy codified in this commit's precept update: `docs/precepts/instructions/ORCHESTRATION.md` §"Cross-repo commit policy" (2026-05-11 Lane II clause).

## §3 — Push-or-handoff disposition (per LESSONS-LEARNED 2026-05-11 #3)

Each cross-repo write follows this protocol:

| Action | Authorizer | Committer | Pusher | Notes |
|---|---|---|---|---|
| Glass-ui v0.9.4 tag | user | L orchestrator (via `scripts/release.sh`) | L orchestrator | unblocks Y.A3 typing resolution |
| Glass-ui v1.0 tag | user | L orchestrator (via `scripts/release.sh`) | L orchestrator | breaks v0.9.x; MIGRATION.md ships in same window |
| Speedtest re-pin to v0.9.4 | user OR Y orchestrator | Y orchestrator | Y orchestrator | speedtest-side decision; reading-only from L |
| Speedtest re-pin to v1.0 | user OR Y orchestrator | Y orchestrator | Y orchestrator | speedtest-side decision; coincides with L W1 close |
| Speedtest re-probe of SCC trap status | Y orchestrator | Y orchestrator (audit artefact) | Y orchestrator | the canonical verification for L W1 hard gate (f) — gz drop ≥ 15 KB |
| Cross-repo annotation (e.g., K.WS-style disposition note inside peer repo) | user explicit | the visiting orchestrator | held until user-authorize | per LESSONS-LEARNED 2026-05-11 #3 — commit-vs-push is asymmetric and orchestrator documents the chosen disposition |

**Agent-authored cross-repo PUSH is forbidden** under all conditions per `ORCHESTRATION.md` §"Cross-repo commit policy" (2026-05-11).

## §4 — Conflict resolution

If L and Y findings collide (e.g., Y.A3 recommends an L-wave shape that conflicts with L's already-planned wave shape), the resolution path is:

1. The disagreement surfaces as a row in `docs/tranches/L/audit/W0-reconciliation.md` (L W0 Lane I) OR in the equivalent Y audit log.
2. L orchestrator and Y orchestrator (currently the same human via this conversation) reconcile.
3. The decision lands in L's wave-spec (canonical), and Y absorbs as a downstream constraint.
4. If reconciliation is non-trivial, an `M.coordination/` artefact captures the deferral.

## §5 — Telemetry shared across the L × Y window

Both tranches measure these shared indicators:

| Indicator | L canonical source | Y canonical source | Equality expected? |
|---|---|---|---|
| modulepreload directives in speedtest `dist/index.html` | n/a | Y.A2 re-probe + Y.W3 close | yes — both projects observe 0 at v1.0 |
| Speedtest entry-chunk gz | n/a | Y.W1 + Y.W3 close | yes |
| Glass-ui dist sizes | L bundle-budget gate | Y.A3 audit read | yes — Y reads, L writes |
| `dist/composables/{dark,keyboard}.d.ts` self-contained? | L W0 close (this wave) | Y.A3 re-grep at v0.9.4 | YES — this wave fixes |
| SCC trap (vueuse hoisted into entry) | L W1 close | Y.W1 + Y.W3 close | yes — both observe closure at v1.0 |

## §6 — Speedtest Y inbound recommendations to L

Per `coordination/` artefact convention, list of recommendations Y has surfaced (read-only-recommender) that L absorbs by wave attribution:

(empty at L W0 open — populate at each subsequent L wave as Y publishes recommendations)

## §6.5 — L.W1 verification ledger (cross-repo SCC trap closure)

At glass-ui L.W1 close (2026-05-11, glass-ui `d1de94b` + tag `v1.0.0`):

| Indicator | Pre-Phase-1 (X close) | Phase-1 + manualChunk (X.W3.c re-probe, K.WS) | Phase-2 v1.0 (L.W1 close) | Delta |
|---|---|---|---|---|
| `dist/index.html` modulepreload directives | n/a | 1 | **0** | **canonical SCC closure** |
| Entry chunk gz (speedtest) | 204 KB | 139.7 KB (with manualChunk + +1.92 KB regression vs P0) | **171.5 KB** | -32.5 KB vs X close |
| Glass-ui `dist/glass-ui.js` gz | 33.6 KB (K close) | — | **22.4 KB** | -11.2 KB |
| Glass-ui `dist/glass-ui.js` raw | 189 KB (K close) | — | **124.8 KB** | -65 KB |
| Glass-ui bundle-budget gate | PASS at K | — | **PASS** at 66.6% headroom | — |
| Subpath dts publication for `/dark` `/keyboard` `/api` `/carousel` | broken (K.WS regression) | broken | **self-contained** | gap closed |

Speedtest re-link commit: `98f88325` (`feat(deps): adopt glass-ui v1.0`). 15 speedtest src/ files migrated to v1.0 subpath surface:
- `Input` + `Textarea` → `@mkbabb/glass-ui/forms` (10 sites)
- `useGlobalDark` → `@mkbabb/glass-ui/dark` (2 sites)
- `registerShortcut` → `@mkbabb/glass-ui/keyboard` (2 sites, including 1 test mock)
- (other retired symbols not consumed at speedtest HEAD — `Combobox*`, `Carousel*`, `useCarousel`, `useRegisteredShortcuts`, `formatCombo`, `isMac`, `useKeyboardShortcuts`)

Y.A3 typing-publication unblocking confirmed: speedtest build PASS in 9.83s; consumer-side resolution of subpath-published types via vue-tsc clean (verified upstream at glass-ui's release.sh subpath probe + synthetic-consumer tsc probe).

The L.W1 HEADLINE thesis (4 architectural transpositions bundled — root-barrel Phase 2 + `src/api/` + subpath flatten + dts publication coherent) is canonically proven by this cross-repo verification ledger.

## §7 — End-of-L disposition

At L W8 close:
- This artefact records the final cycle disposition.
- The v1.0 tag + push lands.
- Speedtest re-link commit hash is recorded here.
- Any Y residuals routing to glass-ui M-tranche are enumerated.

## §8 — Deferred-push reconciliation (precept submodule)

**Observed at L W0 close** (2026-05-11): the precept submodule (`docs/precepts/`) has diverged between local + origin/main:

- Local (this repo) — 6 commits since merge-base `458c2d1`: `cc57c91` (G lessons) → `67c1412` (J close audit pattern) → `6b8437a` (J.W0 strengthened audit) → `fdc020c` (K.W0 hardened git clause) → `d4ada55` (K.W8 lessons) → `b51047d` (L.W0 — this wave).
- Origin/main — 15 commits since merge-base: REAUDIT-stream precepts (`5761ff5` 9 REAUDIT 2026-04-30 entries; `11a1b4c` 10→6 parallel-agent ceiling; `46557e6` triumvirate orchestration auto-triggers; `79e8ddf` HARD CAP + worktree pin + read-size + no-polling slots; etc. through `26297c9` 2026-05-11).

The branches share `458c2d1` as merge-base; neither has been integrated into the other. K close shipped d4ada55 locally + parent pin without pushing the submodule.

**Disposition**: deferred push. Reasons:
1. Force-push on a repo shared with the speedtest project is destructive on shared infra. Forbidden under the binding non-destructive policy.
2. Rebase OR merge requires reading both streams' content carefully — REAUDIT-stream precepts may codify rules the tranche-stream contradicts (or vice versa).
3. L's wave-spec progress does not block on push — local submodule + parent pin advance is sufficient for L's own flight.

**Resolution path** (open):
- Schedule a discrete precept-reconciliation action at L W8 close OR earlier as time permits.
- Steps: read both streams' diffs; identify philosophical conflicts; integrate via merge OR rebase; verify no clause is lost; push.
- Until resolved: glass-ui parent submodule pin is local-only valid; fresh clones cannot resolve to b51047d.

**Cross-repo impact on speedtest Y**: speedtest's own submodule pin may also point to a local-only SHA. Y orchestrator should verify + coordinate the precept-reconciliation as a joint action.
