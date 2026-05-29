# AO.W0 ALPHA — prompt + precept recap across the glass-ui tranche arc

Audit lane ALPHA of AO (glass-ui's successor to AN). Read-only on git + source; tranche-development only. Greenfield voice, em dashes unspaced.

Brief: recapitulate every glass-ui-relevant request, cross-repo ask, and precept across the glass-ui tranche arc — focus AM → AN plus the cross-repo asks muster raised through F.W10 / G / the H audit — and verify each was addressed. Flag anything unaddressed, partially-addressed, or chronically deferred. glass-ui is a LIBRARY; "requests" include consumer-surfaced gaps.

---

## §0 — Headline (read this first)

**Zero unaddressed glass-ui requests survive into AO.** Every glass-ui-relevant ask across the AM → AN arc — 16 AM consumer gaps + 8 AN root-redress gaps + the folded SP-1 + the 2 cross-tranche packaging repairs — carries a named disposition: DELIVERED, DOCUMENTED, or ARCHIVED-on-2-consumer-gate. No silent open (AN sub-invariant + P inv 28 zero-deferral hold).

**The two AN ARCHIVED-on-2-consumer items (interruptible reorder recipe, dock panel-host) do NOT gain a 2nd consumer in H** — H's multi-voter keystone clones muster's own OriginsLayer pattern over already-shipped glass-ui primitives and re-confirms settle-on-pointerup. They stay correctly archived; AO folds nothing here.

**H surfaces NO new glass-ui primitive gap.** Per EPSILON §1.1-1.7 + §4.1 every H.W4 multi-voter surface builds on a primitive glass-ui ALREADY ships (StatusDot, Popover, ConfirmDialog, MetricBadge, the dock badge trio, Drawer detents). H is explicitly muster-only (OMEGA §H). The one contingency — a new H-surfaced gap — routes root-venue + a caret bump (the SP-1 → AN → `^2.1.0` loop), not a planned AO wave. **AO has no H-forced primitive obligation.**

So AO opens with a clean ledger. There are no numbered survivors to fold. The detail follows.

---

## §1 — Request / cross-repo-ask ledger (the whole arc)

WHAT / WHERE-addressed / STATUS over the AM → AN window plus the muster F.W10 / G / H asks. STATUS vocabulary: DELIVERED (source + proof) · PARTIAL · UNADDRESSED · SUPERSEDED · DOCUMENTED (CLAUDE.md / audit record, no source gap) · ARCHIVED (2-consumer gate, named realisation).

### §1.1 — AM consumer-gap root-redress (muster E-tranche origin; v2.0.0)

| # | Request (WHAT) | WHERE addressed | STATUS |
|---|---|---|---|
| AM-1 | tw-animate-css peer declaration | `package.json` peer + optionalPeer (`5befe07`) | DELIVERED |
| AM-2 | `--muted-foreground` AA contrast | light 5.23:1 / dark 7.39:1 (`5befe07`; `AM/audit/W0-token-contrast.md`) | DELIVERED |
| AM-3 | NumberField input-level aria forward | `v-bind="$attrs"` → reka input (`222a90c`; `AM/audit/W0-forms-a11y.md`) | DELIVERED (the AM.W0.2 chain AN.W4 later re-confirmed) |
| AM-4 | Aurora renderMode + config default | `renderMode.ts` + withDefaults factory (`6666d25`) | DELIVERED |
| AM-5 | per-subpath chunk-size disclosure + root-barrel shake | per-subpath table; aurora absent from glass-ui.js reach (`26204a4`) | DELIVERED |
| AM-6 | consumer-wiring docs | CLAUDE.md §Consumer wiring + §Component architecture (`b5f3c6f`) | DELIVERED |
| AM-7..AM-15 | 3 already-closed-at-HEAD + 4 ARCHIVED-on-2-consumer (gaps 7/8/9/12 — ChipField + graduated tokens) + 1 consumer-side | `AM/audit/W3-disposition-ledger.md` | DELIVERED / ARCHIVED (named realisation) / consumer-side |
| AM-pkg | 2 release-gate repairs (verify-export-types asset tolerance; proof:package stale probe) | `e903c73` | DELIVERED |

AM close-state: `complete_with_misses` — the only miss was gate-9 aggregate `proof:all` RED at `proof:consumers:static`, isolated to pre-existing sibling consumer-repo debt (speedtest/keyframes.js import-discipline), named to a successor constellation tranche. NOT a glass-ui surface gap.

### §1.2 — AN F-tranche root-redress (muster F.W10 + F.W8.6-axe origin; v2.1.0)

| Gap | Request (WHAT) | WHERE addressed | STATUS |
|---|---|---|---|
| AN-1 | `/styles` completeness (single import = cascade + SFC scoped CSS; retire 2nd `@import`) | `vite.config.ts publishStyleAssets`; `AN/audit/W1-styles-completeness.md` | DELIVERED |
| AN-2 | Tailwind template-utility emission (`h-full`/`w-full`/…) | CLAUDE.md §Consumer wiring `@source` contract (Option B); `AN/audit/W2-tailwind-utilities.md` | DOCUMENTED (zero-payload; Option A's +22 KB gz rejected) |
| AN-3 | detented + non-modal + live-behind Drawer | `mode?: "modal"\|"live-behind"` + `DrawerContent showOverlay` + `src/styles/drawer.css`; `AN/audit/W3-drawer-detents.md` | DELIVERED |
| AN-A | StatusDot role contract (axe `aria-prohibited-attr`) | `role="img"` when `aria-label` bound (Shape A2); `AN/audit/W4-role-contracts.md` | DELIVERED |
| AN-B | SortableHandle role contract | `role="button"` + `tabindex="0"` on span grip; `AN/audit/W4-role-contracts.md` | DELIVERED |
| AN-C | NumberField label binding (axe `label`) | AM.W0.2 chain reaches inner input on all 3 channels; F.W8.6 residue = consumer-side wrapper-label gap; CLAUDE.md §Component architecture | DOCUMENTED (verdict C2 — confirm-landed; no glass-ui code change) |
| AN-SP1 | Toast.duration typecheck gap (folded from muster G / speedtest) | `duration?: number` on `Toast` interface; forward chain already carried it to reka `ToastRoot` | DELIVERED |
| AN-4 | interruptible MetricStack reorder recipe | `AN/audit/W5-reorder-recipe.md` | ARCHIVED-on-2-consumer-gate (realisation: ≥ 2 mid-drag-reorder consumers) |
| AN-5 | dock panel-host variant | `AN/audit/W6-dock-panelhost-chassis-phase.md` | ARCHIVED-on-2-consumer-gate (realisation: ≥ 2 tall-vertical-pane stacked-control consumers) |
| AN-6 | InstrumentChassis `"scoring"` phase | `"ping"` documented canonical generic-active; CLAUDE.md §Component architecture | DOCUMENTED ("ping" canon; no overfit union member) |

AN tally: 5 DELIVERED · 3 DOCUMENTED · 2 ARCHIVED. Version 2.0.0 → 2.1.0 (additive minor). Cross-repo consumption handoff: muster G.W4 auto-close on the 2.1.0 npm publish.

### §1.3 — Cross-repo asks raised by muster (F.W10 / G / H audit)

| Ask (WHAT) | WHERE addressed | STATUS |
|---|---|---|
| F.W10 items 1-5 + F.W8.6-axe A-C (the 8 AN gaps) | AN tranche (§1.2) | DELIVERED / DOCUMENTED / ARCHIVED per §1.2 |
| muster G.W4 consumption: bump `^2.1.0`, retire 2 styles.css bridges + `MusterDetentSheet` stopgap, 3 axe classes ZERO | muster `abe53f3` (consumer-side); glass-ui 2.1.0 published. OMEGA §B confirms it fired locally | DELIVERED (muster-side auto-close; glass-ui obligation met by the 2.1.0 publish) |
| SP-1 close reaches speedtest | speedtest `e2b6bc70` bumps `^2.1.0` (OMEGA §G) | DELIVERED (consumer-side caret bump) |
| H multi-voter keystone primitive needs (VoterRoster-class composition, Popover, ConfirmDialog, MetricBadge, dock badge, Drawer detents) | all ship in published 2.1.0 (EPSILON §4.1 — every row "New substrate needed? No" except Shape-B server fields, which are muster-internal, NOT glass-ui) | DELIVERED (no glass-ui gap — H builds on shipped primitives) |
| H Shape-B server extension (`Voter.user_slug?`, join endpoint, recompute, server-backed runs) | muster `shared/contract.ts` + server (H.W5) — muster-internal schema/server, NOT a glass-ui surface | n/a to glass-ui (muster-bespoke; EPSILON §4.1 confirms no library primitive involved) |
| vaul-vue re-snap of an already-open sheet | AN.FINAL §Notes + `AN/audit/W3-drawer-detents.md` §A.limitation; OMEGA §F | SUPERSEDED → TERMINAL-DOCUMENTED (upstream vaul-vue defect, not a glass-ui bug; no band-aid per inv 29/44; reopens only at ≥ 2-consumer gate for live re-snap) |

---

## §2 — Precept canon — HELD / BREACHED over the AN window

The standing glass-ui invariants + the user-memory precepts, each with a verdict over the AM → AN window.

### §2.1 — Standing invariants (CLAUDE.md + prior FINALs)

| Precept | Source | Verdict over AN window |
|---|---|---|
| Substrate-without-consumer is binary (≥ 2 consumers or ARCHIVE) | J inv 10 / L inv 8 | **HELD** — the 2 ARCHIVED items + the 4 AM-archived gaps all carry named realisation conditions; no speculative substrate landed (W7-overfitting CLEAN). |
| Zero deferral at tranche close | P inv 28 | **HELD** — every AN gap dispositions to DELIVERED / DOCUMENTED / ARCHIVED; no "deferred-with-destination". AN's own sub-invariant ("every gap a named disposition") is the tranche-level restatement. |
| No backwards-compat aliases / no legacy code | L inv 4 / inv 47 | **HELD** — every AN change is additive (new props/defaults, role emissions, an interface field) or documentation; no shim, no legacy branch. The Drawer `mode` prop is opt-in, no breaking `shouldScaleBackground` flip. |
| Hardened agent git clause (read-only; orchestrator owns the index) | K W0 | **HELD** — `git log` shows every AM/AN commit authored by "Mike Babb" (the orchestrator); no agent-attributed stage/commit/stash/checkout/reset. |
| vueuse-FREE root barrel | L.W1 | **HELD** — no AN addition reintroduced a `@vueuse/core` import into a root-barrel-reachable symbol (Drawer mode, role emissions, Toast.duration are all vueuse-free). |
| Contract-v2 cross-repo-dev-resolution | inv 30 | **HELD** (with delivery shift) — AN.md §5 assumed the `file:` rebuild seam; W0-intake recorded muster's G migration to npm registry, so consumption became "publish 2.1.0 → consumer bumps `^2.1.0`". The fix set is identical; only delivery changed. Documented, not silent. |
| Overfitting audit (≥ 2 sites OR exported OR demo-private) | memory: overfitting-audit | **HELD** — `AN/audit/W7-overfitting.md` CLEAN; every src artefact exported or `/styles`-consumed; every demo artefact demo-private; 2 ARCHIVED + 3 doc-only wrote no source. |

### §2.2 — User-memory precepts

| Precept | Verdict over AN window |
|---|---|
| No backwards compat (clean breaks, no aliases/shims) | **HELD** — no migration shim authored; additive-only. |
| Presets in consumers (lib ships own default tokens) | **HELD** — `--muted-foreground` darken (AM) is a library identity token, not a consumer preset; muster's local override is named for reconcile/retire, not absorbed into the lib. |
| Writing style (no grandiloquence, levity, em dashes unspaced) | **HELD** — AN audit docs + FINAL read in greenfield voice; no banned-word drift flagged. |
| Architectural approach (gestalt over patches, no workarounds) | **HELD** — vaul-vue re-snap left as a documented upstream boundary rather than a glass-ui band-aid; the Drawer `mode` is a real additive variant, not a stopgap. |
| Tailwind-first (CSS references re-expressed via @theme/@utility) | **HELD** — AN-2 chose the `@source` Tailwind-v4-idiomatic contract over pasting a raw utilities layer; `drawer.css` rung 17 is a cascade-resident style, not inline raw CSS. |
| Analyze in full | **HELD** — W0-intake read the full F.W10 + F.W8.6 corpus before dispatch. |
| Tranche format (bbnf-lang `docs/tranches/{LETTER}/`, hard gates, FINAL) | **HELD** — AN ships AN.md + PROGRESS.md + FINAL.md + waves/ + audit/. |
| Greenfield, no meta (no "ported from" / version history / migration language) | **HELD with one named carve** — AN intentionally carries cross-repo consumption-handoff language (muster F.W10 / G.W4) because AN's ORIGIN is a cross-repo ask; this is consumption-seam documentation, not in-library migration prose. The library's OWN surface has no version-history or "ported-from" narration. No breach. |

**No breach recorded across the AN window.** Agent git-discipline held; no backwards-compat alias slipped; greenfield voice held (the cross-repo handoff prose is seam-documentation, an allowed carve, not a meta-narrative breach).

---

## §3 — Chronic-deferral chain for glass-ui

The 2 AN ARCHIVED-on-2-consumer items are the only chronic-deferral candidates. The question AO must answer: does H create a 2nd consumer for either?

### §3.1 — Interruptible MetricStack reorder recipe (AN gap 4)

- **Realisation condition**: LANDS at ≥ 2 consumers declaring a mid-drag-reorder pattern (re-aim the spring target while the pointer is still down, not settle-on-pointerup).
- **Consumer 1 (would-be)**: muster F redesign — explicitly settle-on-pointerup (F.md decision 2).
- **Does H change this?** **NO.** H's multi-voter work adds a `<VoterRoster>` that clones OriginsLayer (EPSILON §1.1) — an add/edit/delete roster, not a mid-drag interruptible reorder. EPSILON's gold-plating ledger (§1.7) does not list interruptible reorder. The keystone re-confirms the settle-on-pointerup contract. **No 2nd consumer. Stays ARCHIVED.**

### §3.2 — Dock panel-host variant (AN gap 5)

- **Realisation condition**: LANDS at ≥ 2 consumers declaring a tall-vertical-pane stacked-control pattern (e.g. a Figma-style stacked-panel rail inside the dock).
- **Consumer 1 (would-be)**: muster F redesign — cut "the dock IS the app" (synthesis §2.2).
- **Does H change this?** **NO.** H's only dock touch is a voter-count `<MetricBadge>` in the CommandDock `#collapsed` pill (EPSILON §1.5 — "~5 lines + 1 prop"), the existing slim control-strip dock. No tall-vertical-pane host. OMEGA §G lists this item as TERMINAL-DOCUMENTED for H's purposes. **No 2nd consumer. Stays ARCHIVED.**

**Chronic-deferral verdict**: both items remain correctly archived. The chain does not advance in H; neither realisation condition is met. This is not chronic-deferral-as-rot — it is the binary substrate gate working as designed (J inv 10 / L inv 8). AO inherits them as standing archived entries, not as residuals to fold.

---

## §4 — Forward-asks: what will muster's H tranche ask of glass-ui?

Anticipating the primitive-gap so AO can pre-empt it. Verdict: **H asks glass-ui for nothing new.**

The H multi-voter keystone, component by component (EPSILON §1 + §4.1):

| H.W4/W5 component | glass-ui primitive it composes | New glass-ui substrate? |
|---|---|---|
| `<VoterRoster>` + `useVoterRoster` | StatusDot, ConfiguratorLayer/Row pattern (clones muster's OriginsLayer), MetricBadge | **No** |
| Origin-inspector Popover (per-voter origin-prefs) | glass-ui `Popover` (shipped; `@mkbabb/glass-ui/popover` or root barrel) | **No — explicitly "no AN gating" per EPSILON §1.2** |
| Joinable-share-mode Shape A | muster `useShareLink` (stateless codec) | **No (muster-internal)** |
| Joinable-share-mode Shape B | muster `Voter.user_slug?` + `POST /api/runs/:slug/voters` + recompute | **No — muster schema/server, NOT a glass-ui surface** |
| Verdict per-voter contribution breakdown | WhyThisWonSheet MetricStack + RankedVerdict StatusDot row + client recompute | **No** |
| Dock voter-count badge | CommandDock `#collapsed` MetricBadge trio (3rd badge + prop) | **No** |
| Delete-confirm | `@mkbabb/glass-ui/confirm-dialog` (already mounted in muster App.vue) | **No** |

Every H surface composes a shipped glass-ui primitive or is muster-bespoke (the Shape-B server/schema, the share codec, the de-godding `useMusterApp`). H.md inv 41 (glass-ui-FIRST) + § Cross-repo posture + OMEGA §H all assert muster-only with no planned glass-ui wave. EPSILON's VoterRoster is a clone of muster's OWN OriginsLayer over `config.voters` — it surfaces no library primitive gap.

**One named contingency, not a planned ask**: if H's implementation half (W2-W6, run on user authorization) surfaces a genuinely-new gap, it routes root-venue + a caret bump (the SP-1 → AN → `^2.1.0` loop), reaching muster on the next publish. That would open as its own glass-ui follow-on, not as an AO obligation. Candidate 5 (real-time presence / collaborative tuning, named-forward to muster H+) "may produce its own glass-ui asks (presence cursors, collaborative chrome)" per EPSILON §3 — but that is H+, not H, and is a future contingency.

**H-forward-asks verdict**: H surfaces NO glass-ui primitive gap. It is all muster-bespoke or shipped-primitive composition. AO has no primitive to ship on H's behalf.

---

## §5 — "0 unaddressed" assertion

**0 unaddressed glass-ui requests survive into AO.**

- 16 AM consumer gaps — all dispositioned (DELIVERED / already-closed / ARCHIVED-named / consumer-side). The single AM miss (aggregate `proof:all` at `proof:consumers:static`) is pre-existing sibling-consumer-repo debt, named to a constellation tranche, NOT a glass-ui surface gap.
- 8 AN root-redress gaps + SP-1 — all dispositioned (5 DELIVERED · 3 DOCUMENTED · 2 ARCHIVED-named). No silent open.
- All muster cross-repo asks (F.W10 / G.W4 / H) — satisfied by the 2.1.0 publish + consumer caret bumps; H needs no new glass-ui work.
- Precept canon — HELD across the board; no breach.
- The 2 chronic-archived items — neither gains a 2nd consumer in H; both correctly stay archived (not residuals).

**Survivor list: NONE.** There are no numbered survivors for AO to fold. AO opens against a clean glass-ui ledger.

The one standing alert worth carrying (awareness, not a survivor): P.W6 ε flagged thin CSS gzip headroom (~9.8% at that HEAD); a future substrate-promotion wave would trigger a budget rebaseline. AN added no CSS payload (W1/W2 `profile:budget` 0), so the alert is unchanged — flagged for AO measurement-time awareness, not as an unaddressed request.

---

## §6 — Authority

- AN plan / close: `docs/tranches/AN/{AN.md, FINAL.md, PROGRESS.md}` + `audit/W{0..7}-*.md`.
- AM close: `docs/tranches/AM/FINAL.md` + `audit/W{0..3}-*.md`.
- Prior FINALs: `docs/tranches/{J,L,P}/FINAL.md` (J inv 10, L inv 8 / inv 4, P inv 28 / inv 47).
- Cross-repo consumer asks: muster `docs/tranches/H/{H.md, audit/EPSILON-keystone.md, audit/OMEGA-cross-repo.md}`.
- User-memory precepts: `/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/memory/`.
