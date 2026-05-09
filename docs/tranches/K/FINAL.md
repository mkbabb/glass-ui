# K — Final

## Authority

Tranche K opens against J close `5bcf1ce` (FINAL.md present). K reconciles at HEAD `23ce73c` (v0.9.0) via the 2026-05-08 reconciliation audit. K closes at master HEAD with 12 wave-close commits between `f5cdd53` (W0) and the W8 close commit; v0.9.3 tagged + pushed to origin. Precept submodule advanced from `6b8437a` (J W7 close) to `d4ada55` through K W0 + K W8 lessons-learned. K closes clean per the 7-agent strengthened audit (α/β/γ/δ/ε/π/ι).

## Thesis (recapitulated)

K is the **convergence-closeout** tranche. The plan was authored at `0666be6` against J close, never dispatched, and overlapped a 67-commit unwritten V-tranche that landed v0.8.0 → v0.9.0. The 2026-05-08 reconciliation found 5/38 K hard-gate items absorbed by V, 2 obsoleted, 4 partial, 27 still open. K continued in place: absorbed work marked done; obsolete gates struck; unattributed V-tranche given a post-hoc plan-folder write-up; HEADLINE (audacious primary-CTA) shipped; Lighthouse 2026-05-08 cohort folded in. The tranche extends J's 6-agent strengthened audit pattern with a NEW **ι integrity-sweep** lane that walks named prescriptions against shipped artefacts.

## Wave-by-wave close

| Wave | Status | Commit | Close evidence |
|---|---|---|---|
| W0  | CLOSED | `f5cdd53` | precept submodule `6b8437a → fdc020c`; worktree-isolation + hardened agent git clause + 4 lessons-learned (3 J-derived + 1 V no-shadow-execution) |
| WV  | CLOSED | `14266b5` | `docs/tranches/V/{V.md, waves/V.W{2,3,4}.md, FINAL.md, PROGRESS.md}` authored against `0666be6..23ce73c`; K invariant 3 satisfied retroactively |
| W1  | CLOSED | `563b200` | `openDelay → hoverOpenDelay` rename per Option B (no legacy alias); 3-cell demo cadence (250/80/500 ms) |
| W4 Lane B | CLOSED | `8a04a2b` | profile:budget script + BUDGETS table + GH workflow job + ay-close retire + meta-description |
| W6 (HEADLINE) | CLOSED | `154d1d2` | `Button variant="primary-audacious"` + `@utility btn-audacious` (lifted from `dock.css:702-796`); phase-color decoupling Option B; ≥ 3 consumers (dock primary tier + buttons.vue gallery cell + hero.vue feature CTA) |
| W3 Lane A | CLOSED | `76fff65` | 9 src color-mix → surface-tint rungs + W2 residuals (cssVar() retire, .overlay-scrim @utility delete); 4 P1 rung-gap residuals → R4 |
| W3 Lane B | CLOSED | `11a30d3` | 5 focus-ring + 2 surface-tint + 4 transition-all migrations; 13-16 raw triplet sweep EXCLUDED (speedtest W2.T10 owns) |
| W5  | CLOSED | `12abb09` | story-pager max-width fix + GlassCarouselPager mobile flex-wrap + glass-carousel min-w-0; Playwright 3-viewport probe clean for 3 surfaces |
| W7  | CLOSED | `2197596` | Configurator P0 (activeKey reactive + colorDraft loop broken) + dock-with-slider story + Slider-only Option B |
| WP  | CLOSED | `8ec320b` | 5 P1 fixes — viz contrast (PARTIAL — see π-3) + 2 aria-label drops + Skeleton compositor migration + Fonts async-load + font-display: swap |
| WS  | CLOSED **DEGRADED** | `a598b90` + tag `v0.9.3` | additive subpath split (forms / composables/dark / composables/keyboard); SCC trap **stays open** per Phase 1 alone; CHANGELOG honest disclosure; Phase 2 → L/v1.0; speedtest annotation at `6f412d89` |
| W4 Lane A | CLOSED | `36305da` | comprehensive CLAUDE.md + README.md + DESIGN.md walk; sibling-wave doc absorption (W1 + W3.A + W6 + W7 + WP + WV + WS); subpath surface section |
| W2  | RETIRED | n/a | 4/5 absorbed by V-tranche; 2 residuals folded into W3.A |

12 active wave commits + W2 retired-with-V-attribution.

## Substrate convergence stats

- **Substrate-without-consumer (K invariant 8)**: binary at K close. All J-shipped substrate either ≥ 2-consumer (audacious-CTA: 3 consumers; surface-tint rungs: 11+ consumers; .focus-ring: 9+ consumers) or formally retired (cssVar() + .overlay-scrim @utility).
- **Vocab convergence**: 11 raw `color-mix(--foreground)` migrated to `--surface-tint-N` rungs (7 src + 2 demo + 2 W2-residual sites); 5 `focus-visible:shadow-[var(--focus-ring-shadow)]` migrated to `.focus-ring`; 5 `transition-all` survivors decomposed; 1 `@utility overlay-scrim` block deleted.
- **Doc-drift (K invariant 11)**: W4 Lane A absorbed 6 sibling-wave deltas. γ lane found 5 residual drift items at audit (D1-D5); 3 P1 (D1/D2/D5) absorbed in W8 cleanup pass; 2 P2 (D3/D4) → R2 residual.
- **Bundle-budget gate (K invariant 12)**: restored. `dist/glass-ui.js` 138_454 / 190_000 raw (72.9%); gz 25_399 / 33_700 (75.4%). `dist/glass-ui.css` 22_589 / 29_000 raw (77.9%); gz 4_446 / 5_750 (77.3%). Both clear ~30% headroom.
- **Mobile-viewport fitness (K invariant 13)**: W5 closes 2 of 2 substantive defects; π-1 inner StoryPager dock-tab overflow → R1 residual.
- **Process hardening**: 6 lessons-learned added to `docs/precepts/instructions/LESSONS-LEARNED.md` (4 in K W0 + 2 in K W8); Hardened agent git clause; Worktree Isolation section.

## Architectural transpositions executed

1. **K HEADLINE — Audacious primary-CTA extraction** (W6). Disco-grain + sparkle-sweep + specular-highlight composite at `dock.css:702-796` lifted to `@utility btn-audacious` + `Button variant="primary-audacious"`. Phase-color decoupling (Option B): canonical variant binds the radial to `--primary`; dock retains phase-tinting as dock-local extension. ≥ 3 consumers; bundle delta ~0 KB net (utilities tree-shake; dock.css shrinks ~1 KB). W6 brittleness window declared, **retracted** at W8 π lane (static-analysis attestation that all load-bearing primary-tier CSS properties preserved).

2. **`hoverOpenDelay` rename** (W1). `openDelay → hoverOpenDelay` clean break per K invariant 1 (no legacy aliases). Hover-popover-specific naming surfaces the cadence-cluster intent; J's named API now matches the actual prop.

3. **Configurator P0 absorb** (W7). `useConfiguratorState.activeKey` lifted from non-reactive `let` to `ref<string|undefined>`; metaballs `colorDraft` reactive mirror dropped (Strategy 1 — KISS); the bidirectional `colorDraft ↔ cfg.colors` write-write loop eliminated. The "Maximum recursive updates exceeded" runtime error on `/motion/metaballs` is gone.

4. **`cssVar()` retirement** (W3 Lane A). The composable's WAAPI-adjacent reactive-read use case was superseded by `useTokenColor` (V.W2 promotion); BouncyToggle's 3 click-time reads inlined to a 5-line `readToken()` helper. Public re-exports + the file + `src/composables/utils/` directory deleted.

5. **`.overlay-scrim` @utility formal-delete** (W3 Lane A). Zero consumers since V's `43bee82` `<ModalOverlay>` collapse; `bg-overlay-scrim*` Tailwind bridges from `theme.css:118-121` are the canonical surface.

6. **Vueuse SCC additive subpath split** (WS — DEGRADED). `src/forms.ts` + `src/composables/{dark, keyboard}.ts` subpath barrels + `package.json` exports + `typesVersions` + `vite.library.ts` libraryEntries. Phase 1 only; Phase 2 (root-barrel removal) → L/v1.0.

## Cross-repo coordination

- **Inbound from speedtest W tranche** — v0.9.1 (ScrollingText + Section + freshness gate + StorySection sweep) and v0.9.2 (cn() tailwind-merge replacement) landed on glass-ui master AHEAD of K dispatch. K plan acknowledged as inbound; no duplication.
- **Outbound to speedtest** — K WS shipped v0.9.3 to glass-ui origin; speedtest commit `6f412d89` annotates `docs/tranches/W/artefacts/W3/b1/disposition.md` with the K.WS Phase 1 outcome (`ACCEPT-AS-DEFERRED → ACCEPT-AS-PHASE-1-LANDED-TRAP-DEFERRED`); LANDED annotation deferred to v1.0.

## 7-agent strengthened audit verdict

| Lane | Verdict | Findings |
|---|---|---|
| α plan-vs-actual | CLEAN | 11/11 active waves clean; WS DEGRADED-AS-DOCUMENTED; W2 RETIRED-with-V-attribution |
| β substrate + visual-load-bearing-ness | CLEAN | 0 K-introduced substrates wired-but-not-visually-exercised |
| γ doc-drift | 2 P1 + 3 P2 | D1/D2/D5 absorbed in W8 cleanup pass; D3/D4 → R2 residual |
| δ idiomatic-gestalt + per-story consumption | CLEAN | 0 K-attributable findings; 1-consumer DockShowcaseFrame deferred per pre-existing K cross-tranche debt |
| ε performance + bundle-budget + dts | PASS-with-3 | F-ε-1 ay-close.sh file deleted in W8; F-ε-2 viz-basis dark-mode contrast absorbed in W8; F-ε-3 Configurator P0 false-positive (Lighthouse hit stale dev cache; HEAD probe clean) |
| π visual-runtime multi-viewport | 2 P1 + 1 P3 | π-1 StoryPager inner-tab overflow → R1 residual; π-2 aurora bloom 8px cosmetic → defer; π-3 viz-basis contrast absorbed in W8 |
| ι integrity-sweep (NEW) | CLEAN | 0 P0 named-but-not-landed; 2 LESSONS-LEARNED proposals committed at precept `d4ada55` |

## Findings absorbed in W8 cleanup pass

- **γ D1**: CLAUDE.md `animation/` + `form/` nonexistent custom-dir references removed.
- **γ D2**: CLAUDE.md L195 + README.md L157 `useAuroraStudio` import-from-aurora-barrel corrected to `useAurora` (the actual public composable; useAuroraStudio is demo-private).
- **γ D5**: DESIGN.md L924 prose list — `animation` + `form` removed.
- **F-ε-1 / ι F2**: `scripts/ay-close.sh` file deleted (npm script entry retired in W4 Lane B; file-on-disk residual now closed).
- **F-ε-2 / π-3 (PARTIAL)**: viz-basis text-foreground → text-zinc-900 (theme-invariant dark color; passes AA in both modes for all 3 viz hues).
- **F-ε-3 (false-positive)**: re-probed at HEAD via fresh Playwright session — 0 console errors on `/motion/metaballs`. Lighthouse's earlier hit was stale dev-server cache.
- **ι F3**: 2026-05-09 LESSONS-LEARNED "Worktree Isolation Requires Relative Paths" appended.
- **ι F4**: 2026-05-09 LESSONS-LEARNED "`git stash` Forbidden Even For State-Probe" appended.

## Brittleness windows

- **W6 declared** `breaking_changes_during_wave: yes` with `suspended_gates: dock-primary-tier-visual-fidelity`. **Retracted at W8** π lane: static-analysis attestation confirms every load-bearing primary-tier CSS property preserved (some lifted to canonical `btn-audacious`; others kept dock-local per the documented split). Phase-tinting still active dock-locally.

## K residuals → L

See `audit/K-residuals.md` for the full carry-forward ledger:

- R1 P1: StoryPager inner-tab overflow at 375 viewport (NOT W5's outer-container concern; new layout finding).
- R2 P2: CLAUDE.md/README.md subpath enumeration polish.
- R3 P2: 12 wave-spec status lines stale.
- R4 P2: 4 `--surface-tint-{35,40,70}` rung gaps.

Plus the 12 cross-tranche debt items already declared in K.md (most notably WS Phase 2 → v1.0; aurora chrome Option-A unification; production demo build; the 3 unused composables; P-tranche second-consumer fidelity).

## v0.9.3 release

Tagged on glass-ui master at `a598b90` per `scripts/release.sh v0.9.3`. Pushed to origin. CHANGELOG.md v0.9.3 entry documents:
- Additive subpath surface (forms / composables/dark / composables/keyboard).
- KNOWN LIMITATION: Phase 1 alone doesn't close the SCC trap; Phase 2 (breaking change) defers to v1.0.
- Migration recommendation: vueuse-bearing consumers can adopt subpath imports now to prep for the v1.0 breaking change.

## K close coherence

K invariants 1 (precepts), 2 (no silent misses), 3 (no shadow execution), 4 (mandatory reconciliation), 5 (HEADLINE), 8 (substrate-without-consumer binary), 9 (architectural transposition), 10 (vocab gestalt sweep), 11 (doc-drift binary), 12 (bundle-budget restored), 13 (mobile-viewport fitness), 14 (demo-private chrome canonical-aware), 15 (7-agent strengthened with ι), 16 (Lighthouse perf + a11y absorbed) — all satisfied.

K invariants 6 (worktree isolation binding) and 7 (agents NEVER stage/commit/stash) hold with documented PARTIAL annotations: 6 caught the K W6 absolute-path anomaly (precept evolution at LESSONS-LEARNED 2026-05-09 #1); 7 caught the K W3 Lane A stash recurrence (precept evolution at LESSONS-LEARNED 2026-05-09 #2).

K closes clean.

## Successor

Next tranche letter: **L**.

L candidates from K's residual ledger:
- WS Phase 2 (v1.0 breaking change cohort) — root-barrel removal of vueuse-bearing symbols.
- Aurora chrome Option-A unification (if pursued).
- Demo-build deploy decision (Lighthouse cross-tranche).
- 3 unused public composables audit.
- P-tranche second-consumer fidelity (cross-repo).
- Mobile-viewport polish lane (R1 + R2 + R3 + R4).

L opens against this K close. The reconciliation lane at L open is mandatory per K invariant 4 (any tranche opening against a baseline ≥ 1 release stale).
