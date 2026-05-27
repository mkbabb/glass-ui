# Tranche AM — consumer-gap root-redress (packaging · token-AA · forms-a11y · Aurora render-mode · chunk-disclosure)

**Tranche letter**: AM.
**Predecessor**: AJ (AJ.W2/AJ.W3 at commit HEAD; package.json v2.0.0). AK/AL appear in prose as in-flight Aurora/instrument references with no cut folder; AM is the next free folder and consolidates the lane-B Aurora render-mode hardening (prose-tagged AK) with the lane-A consumer-gap closure into one tranche per the muster cross-repo plan §2.
**Origin**: cross-repo — the gaps were surfaced by the muster (dine-vote) E-tranche audit (`/Users/mkbabb/Programming/dine-vote/docs/tranches/E/audit/GLASS-UI-gap-matrix.md` + `GLASS-UI-aurora-lazy-init.md` + `GLASS-UI-cross-repo-plan.md`). muster consumes the published fixes through `"@mkbabb/glass-ui": "file:../../glass-ui"` under the contract-v2 cross-repo-dev-resolution seam.

## §1 — Binding question

A downstream consumer (muster) worked around 16 glass-ui surface gaps consumer-side across its A-E stack. The binding directive: **every gap is fixed at the glass-ui ROOT, not ticket-stubbed and not worked around downstream.** Aurora is **hardened** (an adaptive render-mode substrate so the warm wash composites on every device) and **never retired**.

AM closes the gaps that warrant a root fix and ARCHIVES the gaps that the substrate-without-consumer-binary invariant forbids shipping (a primitive needs ≥ 2 consumers; four gaps have exactly one). Three gaps are already closed at HEAD and need only ledger confirmation; one is correctly consumer-side. The result is a tighter library surface that a fresh consumer builds against cleanly.

## §2 — Goal criterion

A fresh Tailwind-v4 consumer builds against glass-ui without an unknown-utility error; every muted-text surface clears WCAG 2.1 AA; a labelled `NumberField` announces its inner input; `<Aurora>` mounts with a canonical default config and adapts its render substrate per device while always compositing the wash; consumers can size their imports from a published per-subpath gzipped table and a documented `manualChunks` recipe. The four 2-consumer-gated primitives carry an explicit archive disposition with a named realisation condition. muster's E.W2/E.W3/E.W8 consume the AM fixes through the `file:` seam with zero downstream workaround.

## §3 — Completion criterion

All AM hard gates (§7) verify: `typecheck` + `build` exit 0; `proof:all` + `proof:resolution` + `verify-export-types` green; `profile:budget --enforce` green and emitting the per-subpath gzipped table; the per-gap evidence in each wave's hard gate resolves; the disposition ledger (§5) accounts for all 16 gaps; AM.FINAL.md is authored with the gate table and the cross-repo handoff to muster E.W8.

## §4 — Inherited invariants

All standing glass-ui invariants bind unchanged. The load-bearing ones for AM:

- **Substrate-without-consumer is binary** (J invariant 10 / L invariant 8) — a primitive or subpath ships only at ≥ 2 realised consumers, else it ARCHIVES with a named realisation condition. This is the invariant that gates gaps 7/8/9/12.
- **Zero deferral** (P invariant 28) — no item exits the close as "deferred"; every gap dispositions to LANDS / ALREADY-CLOSED / ARCHIVES / CONSUMER-SIDE within this tranche.
- **Token-first** (J invariant) — every visual behaviour is a CSS custom property; the `--muted-foreground` darken edits the library's own identity token, not a consumer preset.
- **No backwards-compat aliases** (L invariant 4) — the `tw-animate-css` peer declaration and the Aurora prop additions are clean; no shim, no legacy branch.
- **Hardened agent git clause** (K W0) — implementation agents are read-only on git (never stage/commit/stash/checkout/reset/restore); the orchestrator owns the index.
- **vueuse-FREE root barrel** (L.W1) — no AM addition reintroduces a `@vueuse/core` import into a root-barrel-reachable symbol.
- **Contract-v2 cross-repo-dev-resolution** (invariant 30) — the `file:` seam resolves the built `dist/`; AM's obligation is to rebuild `dist/` at close so muster picks the fixes up; `build:watch` keeps it fresh during a consumer dev session.

AM introduces **zero new invariants** — it is gap-closure against the standing surface.

## §5 — Disposition ledger (all 16 gaps)

The gap numbering follows `GLASS-UI-gap-matrix.md`. Every gap dispositions:

| Gap | Disposition | Wave / rationale |
|---|---|---|
| 15 — `tw-animate-css` peer dep | **LANDS** (blocking) | AM.W0 — declare peerDependency + document in §Consumer wiring |
| 1 — `--muted-foreground` AA contrast | **LANDS** (major) | AM.W0 — darken light rung to clear ≥ 4.5:1; mirror dark companion |
| 4 — NumberField input-level aria-label | **LANDS** (major) | AM.W0 — forward `aria-label`/`aria-labelledby` to `<NumberFieldInput>` |
| 3 — GlassDock aria-allowed-attr contract | **LANDS** (minor; doc+contract) | AM.W0 — expose a dock trigger `role`/`aria` contract + document the presentational-root rule; Slider needs no change (reka-ui `SliderThumb` already a valid `role="slider"` host) |
| 11 — `<Aurora>` config default | **LANDS** (minor) | AM.W1 — `config` optional, defaults to `DEFAULT_AURORA_CONFIG` |
| renderMode — `<Aurora renderMode>` adaptive substrate | **LANDS** (NEW; consumer = muster E.W2) | AM.W1 — `"webgl" \| "css" \| "auto"` per `aurora-lazy-init §3.1` |
| 14 — per-subpath gzipped size disclosure | **LANDS** (minor) | AM.W2 — emit the per-subpath table in `profile-bundle.mjs` + publish |
| 16 — Vite 8 manualChunks consumer recipe | **LANDS** (docs) | AM.W2 — §Consumer wiring snippet |
| 13 — Tabs vs ToggleGroup decision matrix | **LANDS** (docs) | AM.W2 — CLAUDE.md decision paragraph |
| 6 — per-subpath chunk strategy | **ALREADY-CLOSED** (library half) + **LANDS** (docs half) | AM.W2 — the 76-entry split already shakes per-subpath; document subpath-import discipline |
| 2 — DarkModeToggle aria-label | **ALREADY-CLOSED** | AM.W3 — confirm `DarkModeToggle.vue:61` binds it; ledger only |
| 5 — Badge `variant="warning"` | **ALREADY-CLOSED** | AM.W3 — confirm `badge/index.ts:21-26`; ledger only |
| 7 — `useScrollDockShrink` graduation | **ARCHIVES** (1 consumer) | AM.W3 — realise when a 2nd consumer (value.js) ships a scroll-shrink pattern; muster keeps `useScrollShrink` dine-vote-private until then |
| 8 — page-shell tokens | **ARCHIVES** (1 consumer) | AM.W3 — realise at ≥ 2 consumers declaring identical page-shell rhythm |
| 9 — `--press-lift` token + `@utility press-lift` | **ARCHIVES** (1 consumer) | AM.W3 — realise at ≥ 2 consumers; muster keeps it consumer-side at E.W7 |
| 12 — `<ChipField>` compound primitive | **ARCHIVES** (1 consumer) | AM.W3 — realise at ≥ 2 consumers; muster's E.W3 `role="group"` sibling-redesign carries the pattern in-tree |
| 10 — pointer-tracked caustic (`--mouse-x`/`--mouse-y`) | **CONSUMER-SIDE** | AM.W3 — per-surface authoring channel with a JS pointer-move setter, not a token-first library primitive; record the decision |

LANDS: 10 (incl. renderMode). ALREADY-CLOSED: 3 (gap 6's library half counts within the docs LANDS). ARCHIVES: 4. CONSUMER-SIDE: 1.

## §6 — Wave table

| Wave | Title | Agents | Closes-on (evidence) | Status |
|---|---|---|---|---|
| AM.W0 | Packaging + token-AA + forms-a11y root fixes | 2 (disjoint: packaging/token vs forms/dock a11y) | `tw-animate-css` in `peerDependencies` + `optionalPeerDependencies` hint; `--muted-foreground` light rung darkened to clear ≥ 4.5:1 with a contrast-proof gate (dark companion mirrored); `<NumberFieldInput>` forwards `aria-label`/`aria-labelledby` from a `NumberField` prop (`inheritAttrs:false` + explicit forward); GlassDock exposes a documented trigger-aria contract; `typecheck` + `build` clean | planned |
| AM.W1 | Aurora ergonomics + adaptive render-mode | 1 | `<Aurora>` `config` optional, defaulting to `DEFAULT_AURORA_CONFIG` via `withDefaults`/computed merge; `renderMode: "webgl" \| "css" \| "auto"` prop, default `"auto"`, with the device-tier gate (`hardwareConcurrency ≤ 4` / `prefers-reduced-motion` / `saveData` → `"css"`); the warm wash composites under every branch (Aurora never retired); the shipped `initStrategy:"deferred"` lazy path stays intact; `typecheck` + `build` clean | planned |
| AM.W2 | Chunk-strategy confirmation + size disclosure + consumer-wiring docs | 1 | `profile-bundle.mjs` emits a per-subpath gzipped-size table (already gzips every `dist/` file); `profile:budget --enforce` green; Aurora's standalone chunk stays out of `dist/glass-ui.js` reach (root-barrel shake proof); CLAUDE.md §Consumer wiring gains the Vite 8 `manualChunks` recipe + the subpath-import discipline note + the Tabs-vs-ToggleGroup decision matrix | planned |
| AM.W3 | Close — disposition ledger + overfitting audit + proof gates + FINAL | 1 | the §5 ledger confirmed against HEAD (gaps 2/5 already-closed; gaps 7/8/9/12 archived with realisation conditions; gap 10 consumer-side recorded); overfitting audit clean (every AM artefact ≥ 2 sites or exported or demo-private); `proof:all` + `proof:resolution` + `verify-export-types` green; `dist/` rebuilt; AM.FINAL.md authored with the cross-repo handoff to muster E.W8 | planned |

DAG — AM.W0 runs first (its two agent units are disjoint and parallel). AM.W1 + AM.W2 run after AM.W0 (sequential single-agent waves; W1 then W2). AM.W3 closes. No brittleness window; every edit is additive or a transparent fix.

Cross-repo gate — muster E.W2 opens after AM.W1 publishes (`renderMode` prop reachable in `dist/`); muster E.W3 reads AM.W0's a11y + token fixes; muster E.W8 verifies the whole AM `dist/` consumption after AM.W3 close.

## §7 — Hard gates (tranche-level)

1. **Build + typecheck clean.** `npm run typecheck` + `npm run build` exit 0 against the AM surface.
2. **Packaging — tw-animate-css peer.** `tw-animate-css` appears in `package.json` `peerDependencies` (or `optionalPeerDependencies` + documented requirement); a fresh-consumer Tailwind-v4 build no longer errors on `data-[state=closed]:fade-out-0`. Evidence — `proof:consumers:build` green + the package.json diff.
3. **Token — muted-foreground AA.** The light `--muted-foreground` rung computes ≥ 4.5:1 against `--neutral-0`; the dark companion clears against its plate. Evidence — a contrast computation captured in `audit/W0-token-contrast.md`.
4. **Forms-a11y — NumberField input label.** A `NumberField` given a label prop renders the inner `<input>` with `aria-label`/`aria-labelledby`. Evidence — DOM/axe snippet in `audit/W0-forms-a11y.md`.
5. **Aurora render-mode + config default.** `<Aurora>` accepts `renderMode` (`webgl`/`css`/`auto`); omitting `config` yields the canonical look (defaults to `DEFAULT_AURORA_CONFIG`); `renderMode:"css"` never arms WebGL yet still paints the palette; `renderMode:"auto"` gates on device tier. Evidence — runtime probe in `audit/W1-aurora-rendermode.md`.
6. **Chunk disclosure.** `profile:budget --enforce` green; the per-subpath gzipped table is emitted and published; `dist/glass-ui.js` does not transitively reach Aurora's standalone chunk. Evidence — `audit/W2-bundle-disclosure.md`.
7. **Docs.** CLAUDE.md §Consumer wiring carries the `manualChunks` recipe, the subpath-import discipline, and the Tabs-vs-ToggleGroup matrix. Evidence — CLAUDE.md diff.
8. **Disposition ledger complete.** All 16 gaps account in §5; the 4 archived gaps carry named realisation conditions; the 3 already-closed gaps are confirmed against HEAD source. Evidence — `audit/W3-disposition-ledger.md`.
9. **Proof gates.** `proof:all` + `proof:resolution` + `verify-export-types` green. Evidence — command output in PROGRESS.
10. **Cross-repo seam.** `dist/` rebuilt at close; AM.FINAL.md names muster E.W8 as the consumption-verification handoff. Evidence — `git show --stat` of the dist-rebuild + FINAL.md §Handoff.

## §8 — Authority

- Plan: this file (`docs/tranches/AM/AM.md`).
- Execution log: `docs/tranches/AM/PROGRESS.md`.
- Close report: `docs/tranches/AM/FINAL.md` (AM.W3).
- Wave specs: `docs/tranches/AM/waves/W{0,1,2,3}.md`.
- Audit artefacts: `docs/tranches/AM/audit/W{0,1,2,3}-*.md`.
- Cross-repo origin: muster `docs/tranches/E/audit/GLASS-UI-{gap-matrix,aurora-lazy-init,cross-repo-plan}.md`.
- Consumption handoff: muster `docs/tranches/E/waves/W8.md` (E.W8 seam verification).

## §9 — Style discipline

Greenfield voice. Em dashes unspaced. No epanorthosis. Every wave item carries WHAT + WHY. Goal + completion criteria paired at tranche / wave / sub-wave levels per TRANCHE-AND-WAVE-SPEC.md.
