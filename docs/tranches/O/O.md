# O—Backend hygiene + architectural transposition (post-v1.1.4 maturation)

**Tranche letter**: O.
**Successor to**: N (closed `37288e0`; v1.1.4 published; precept submodule `b8af314`).
**Cohort identity**: backend code hygiene + architectural transposition—legacy excise / fail-explicit / DI canonicalization / god-module split / pipeline orchestration / /api discovery gaps / constellation-level substrate promotions / AB shadow-execution closure.
**Mode**: planning-only at this open (per user O-open directive "This is NOT an implementation phase. Tranche development only.").
**Open**: 2026-05-14.

## §1—Thesis

The N tranche shipped 5 strategic wires + N invariants 21-23. The substrate health audit at O open confirms: glass-ui is exceptionally clean by historic-codebase standards (0 TODO/HACK/FIXME/XXX/`@deprecated`/`@ts-ignore` in `src/`; 0 retired-subpath leakage; 100 % canonical v1.0+ subpath consumption across 6 consumers). The work O absorbs is NOT remediation of accumulated debt—it's **architectural maturation**: surgical fail-explicit migrations of 5 silent-swallow sites, canonical DI shape adoption across the dock subsystem, god-module cohesion splits, /api discovery gap closure, pipeline orchestration consolidation, and constellation-level substrate promotions surfaced by the 6-consumer audit (`useClipboard` + `HeaderRibbon` clear the ≥ 2-consumer bar via cross-walk).

The headline (W0) is **AB-tranche post-hoc plan folder**—closes the shadow-execution recurrence (AB shipped v1.0.5 → v1.1.0 without a `docs/tranches/AB/` plan folder; analog of V → K.WV pattern per Rζ). Hardens the precept that K invariant 3 binds; bookmarks the AB bundle-budget rebaseline accounting that N.W0 inherited.

Per KISS + N invariant 23 (wire-before-retire): every change at O is either an excise (legacy / under-wired-with-no-target) OR a wire (under-wired-with-target) OR an architectural transposition (clean refactor for cohesion). No new primitives invented without ≥ 2 cross-walked consumers.

## §2—Binding invariants (inherited + extended)

1-20. All 20 V-tranche invariants from M inherited.
21. Bidirectional style-audit + overfitting-audit canonical at tranche open (N.W0 Lane B; codified at precept `tranche/RESEARCH.md` angles 7+8).
22. Audit-verdict spot-verification gate (N.W0 Lane B; codified at precept `tranche/SPEC.md`).
23. Wire-before-retire posture (N.W0 Lane B; codified at precept `instructions/README.md`).
24. **NEW @ O—Fail-explicit on library-internal contract violations**—silent `console.warn` / `console.error` + early-return paths in glass-ui-owned subsystems (shader pipelines, factory inits, "should-not-reach" defensive branches) are integrity-sweep blockers. Library-internal failure modes throw; browser-API degradation paths (pointer-capture, reduced-motion, WebGL context-lost) remain befitting. Codify in `instructions/STYLE.md` ("Anti-patterns" sub-section) at O.W0.
25. **NEW @ O—Typed-key + helper-pair DI canonical shape**—every provide/inject pair in `src/` follows the canonical shape: typed `InjectionKey<T>` exported from a module-local `keys.ts` / `context.ts` + paired helpers `useFooContext()` (strict—throws on missing) AND optional `useOptionalFooContext()` (befitting silent default). Apply to dock subsystem first; codify in `instructions/STYLE.md` at O.W2.
26. **NEW @ O—Test-file relocation outside src/**—per directive O4. Co-located `*.test.ts` files live at `tests/` (or `src/components/<pkg>/__tests__/` if Vite serves them differently—verify the test infrastructure first). Hygiene-only; no behavior change.
27. **NEW @ O—Tooling-side stash enforcement**—per Rζ precept-hardening candidate + 5th-recurrence of the stash anti-pattern at N.W1. Codify a `precept-check.mjs` pre-commit hook OR a wave-close stash-list audit script that fails-closed when an agent-attributed stash entry exists. Codify in `instructions/STYLE.md` + precept LL ledger at O.W0 Lane B.

## §3—Wave schedule (8 waves; provisional pre-synthesis)

| Wave | Opens after | Lanes | Hard gate (TL;DR) | Brittleness |
|---|---|---|---|---|
| **W0 HEADLINE** | open | 3 parallel (A AB post-hoc plan folder + B precept-hardening invariants 24-27 + C cosmetic legacy excise per Rα E1-E4) | AB plan folder authored at `docs/tranches/AB/` with retrospective wave specs; precept submodule advances; cosmetic legacy excised (`probeWebGLSupport` alias retired; `back-compat` prose comments normalized; `freshness.ts` docstring rewritten); v1.2.0 minor tag | low |
| **W1** | W0 close | 5 lanes (A Aurora init fail-explicit + B WebGL shader compile/link throw + C Configurator clone decision + D typewriter unreachable throw + E test-file relocation 18 files / 1684 LOC) | All 5 Rα FAIL-EXPLICITLY findings landed OR named-DEFER with rationale; test files relocated; consumer audit cross-walk on F1 Aurora-throw impact (cross-repo MULTI-WRITER if needed) | medium (F1 consumer-visible) |
| **W2 HEADLINE** | W1 close | 3 lanes (A dock subsystem typed-key + helper-pair canonicalization + B DockLayer DRIFT cleanup + C ToggleGroup DRIFT cleanup) | Dock subsystem migrated to canonical DI shape per invariant 25; 5 in-library consumer-site migrations land; speedtest BINARY-TRANSPARENT (verified at audit); `dockExpanded` retired (zero consumers); `glassDockId` dedup'd with `glassDockContext.id` | yes (multi-file dock refactor; speedtest A5 wire must remain intact) |
| **W3** | W2 close | 3 lanes (A GlassTimeline.vue 1049 → 4 SFCs + geometry.ts + B usePresetEditor.ts 657 → 6 demo-private files + C profile-aurora.mjs 884 → harness extracted) | 3 split-candidate files split into cohesive sub-modules per Rβ; consumer imports unchanged; bundle profile diff documented | medium (chunk redistribution) |
| **W4** | W3 close | 3 lanes (A /api discovery gaps closed [sidebar / search / props/MenuItemVariants triad] + B leaky abstractions fixed [useDockState types exported / useAurora return interface / useDarkModeSync naming] + C service-boundary inconsistencies [useToast singleton review / avatarVariant rename]) | /api gains 3 type cohorts; 3 leaky abstractions surface-fixed; useToast disposition decided (KEEP-with-rationale per shadcn-vue parity OR REFACTOR-to-DI); avatarVariant rename ships with MIGRATION.md note | medium (avatarVariant rename is semver-visible) |
| **W5** | W4 close | 5 lanes (A pipeline orchestration: `proof:all` cohort runner + B verify-export-types unconditional in release.sh + C freshness algorithm DRY [extract shared `scripts/freshness-walk.mjs`] + D release.sh dedup with prepublishOnly + E CI gates expansion [typecheck + test + verify-export-types]) | All 5 Rε orchestration finds landed; release pipeline single-source-of-truth; CI gate green | low |
| **W6** | W5 close | 4 lanes (A useClipboard promotion + B HeaderRibbon promotion + C dock-icon-button active-state token ladder + D scale-on-hover utility + speedtest AC.W6 cohort dependencies coordination) | 4 constellation-level substrate promotions land (each clears ≥ 2-consumer bar at audit); cross-repo coordination with speedtest AC.W6 timed via CONSTELLATION.md | yes (cross-repo coordination + multi-promotion) |
| **W7 close ceremony** | W6 close | 1 orch + 7 audit lanes (α/β/γ/δ/ε/π/ι) + 6-agent consumer re-audit (O11/a-f) | Strengthened audit returns CLEAN/MINOR; FINAL.md authored; cross-constellation reflog clean; final tag aggregating all v1.2.x patches | no |

**Critical path**: W0 → W1 → W2 → W3 → W4 → W5 → W6 → W7. 7 sequential edges (large tranche; KISS gate on each wave-close—split into O-II if scope dilates).

**Peak parallelism**: W1 (5 lanes; bounds-disjoint) + W2 (3 lanes with one cross-cutting DI refactor) + W7 (13 read-only audit lanes within V7 dual ceiling).

**Versioning cadence**: each wave-close ships a minor (W0 → v1.2.0) or patch (W1 → v1.2.1, ...)—final aggregate at W7 close.

## §4—Cross-repo coordination

Per `docs/tranches/O/coordination/CONSTELLATION.md`:

- glass-ui: primary; O tranche.
- speedtest: AC tranche in flight independently. A5 wire on origin. **AC.W6 needs glass-ui v1.2.0** (Fira Code self-host, `.text-hero` hoist, WCAG companion tokens, dark-mode `--meter-track-stroke` fix, IconTooltip 44px hit-area, dock touch-target media-query per O11/f). **OVERLAPS O scope**. Coordination: O.W6 cohort absorbs the v1.2.0 dependencies surfaced by AC.W6 audit; speedtest then consumes the rebump (post-W6 close).
- words / fourier-analysis / bbnf-buddy / keyframes.js / value.js: M.W1-migrated to v1.0+; O.W6 promotions (`useClipboard`, `HeaderRibbon`) require post-promotion adoption—cross-repo coordination per MULTI-WRITER per-repo lanes at user authorization.
- precepts submodule: `b8af314` at N close; O.W0 advance with invariants 24-27 + 2026-05-14 LESSONS-LEARNED entry (tooling-side stash enforcement).

## §5—Critical path

W0 → W1 → W2 → W3 → W4 → W5 → W6 → W7. 7 sequential edges; peak parallelism at W1 + W7.

The W2 dock-DI refactor is the LOAD-BEARING transposition—N consumed dock-tree heavily (5 wires) and any consumer reaching into the 6 dock inject keys could regress. Per O11/f speedtest is BINARY-TRANSPARENT (zero reach-in); per Rδ the 5 in-library consumer-site migrations are Slider / HoverPopover / PopoverContent / SelectContent / DropdownMenuContent. Brittleness window: yes (multi-file refactor; cross-substrate proof story `dock-with-slider.vue` must continue rendering).

## §6—Risk register

1. **F1 Aurora-throw consumer-visible** (Rα): speedtest IS a deep Aurora consumer (App.vue mount; `useSpeedtestAuroraConfig()` light/dark fork; `useAuroraPolicy`). Switching from `console.warn → throw` will surface as uncaught. Mitigation: introduce `onInitError` callback prop OR emit `init-error` event before throwing; coordinate with speedtest at W1 close.
2. **F4 Configurator clone JSON-fallback** (Rα): block-on-user. Preset round-tripping may depend on the JSON-fallback path; throwing breaks consumers.
3. **W2 dock-DI refactor multi-file**: 6 keys → typed context + helpers + 5 in-library consumer migrations. Slider keep-dock-open contract MUST continue rendering at `demo/stories/compositions/dock-with-slider.vue`.
4. **W3 GlassTimeline split** (Rβ): HoverCardPortal CSS must remain in a rendering SFC; non-scoped `<style>` discipline.
5. **W4 avatarVariant rename** (Rγ): semver-visible; consumers using `import { avatarVariant }` from a per-package subpath break. MIGRATION.md required.
6. **W5 release.sh restructure** (Rε): release pipeline changes break CI or local release flow. Run a dry-run before tag.
7. **W6 cross-repo coordination**: 4 substrate promotions + AC.W6 dependencies—multiple cross-repo writes; MULTI-WRITER per-repo lanes binding.
8. **AB shadow-execution closure** (W0): retrospective plan folder; risk of misrepresenting AB-era decisions. Source AB-era commits + CHANGELOG entries for the retrospective.

## §7—Provisional v1.x release plan

- **W0 close** → **v1.2.0** minor (AB post-hoc plan folder + precept invariants 24-27 + cosmetic legacy excise; multi-substrate signal warrants minor).
- **W1 close** → **v1.2.1** patch (fail-explicit migrations + test relocation).
- **W2 close** → **v1.2.2** patch (dock DI canonical shape).
- **W3 close** → **v1.2.3** patch (god-module splits; consumer imports unchanged).
- **W4 close** → **v1.2.4** patch (/api gaps + leaky abstractions + service boundaries—semver-visible avatarVariant rename may warrant **v1.3.0** minor; decided at wave-spec authoring).
- **W5 close** → **v1.2.5** or **v1.3.1** patch (pipeline orchestration; internal-only).
- **W6 close** → **v1.3.0** or **v1.4.0** minor (4 substrate promotions; semver-visible additive).
- **W7 close** → final aggregate tag.

## §8—Carry-forward to P tranche

(Populates at W7 close. Provisional candidates:)

- O-N-1 Playwright runtime probe (deferred from N if MCP tooling remains disconnected).
- O11/c R2 `<DropdownMenuItem :current>` token (1 bbnf consumer; defer pending second).
- O11/a G1 BorderShimmer primitive (1 consumer; defer).
- O11/d 84 % keyframes.js UI-scaffolding overfitting (CONSUMER-OWNED; not glass-ui-blocked).
- `usePopupMutex` value.js fork (1 consumer; defer).
- L-vue-passive-listeners + L-cache-ttl (PERMANENT-DEFER chronic out-of-scope items).

## §9—Authority

Plan substrate at O open:

- This file (`O.md`)—plan + thesis + invariants + wave schedule.
- `findings.md`—verbatim user O-open directive + extracted scope + carry-forward ledger.
- `dispatch/AGENT.md`—extends N dispatch template with O-specific clauses (audit-verdict gate; wire-before-retire; harness-CWD-drift mitigation; cross-repo push asymmetry note).
- `PROGRESS.md`—initial + synthesis closure entry.
- `waves/W{0-7}.md`—8 wave specs (authored at O open or at each wave's predecessor close).
- `coordination/CONSTELLATION.md`—O-open multi-peer manifest.
- `research/R{α-ζ}*.md`—6 backend research deliverables (round 1).
- `audit/O11-Lane-{a-f}-*.md`—6 consumer audit deliverables (round 2).

Per O-open user directive ("This is NOT an implementation phase. Tranche development only."), implementation dispatch awaits future explicit user authorization analogous to K/L/M/N pattern.

## §10—Revision history

- 2026-05-14 initial open commit (this): substrate + planning artefacts landed; 12 research deliverables (6 backend + 6 consumer); plan synthesizes 8-wave architecture maturation programme. Pre-dispatch state.

## §11—Synthesis summary (12 deliverables → 8 waves)

### Round-1 backend audit (6 lanes)

- **Rα (legacy)**: 18 findings—0 TODO/HACK/FIXME/@deprecated in src/ (exceptionally clean). 4 EXCISE (doc/alias) + 5 FAIL-EXPLICITLY (silent-warn → throw) + 8-9 KEEP (befitting browser-API degradation) + 1 WIRE-or-PRUNE-docstring + 18 co-located test files to relocate.
- **Rβ (god modules)**: 9 files > 500 LOC—3 SPLIT-CANDIDATES (GlassTimeline 1049, profile-aurora 884, usePresetEditor 657) + 4 COHERENT-LARGE genre artefacts (aurora.frag.ts, tokens.css, dock.css, utilities.css; preserve).
- **Rγ (encapsulation)**: 3 leaky abstractions + 3 service-boundary inconsistencies + 3 /api discovery gaps (sidebar / search / GlassPanelProps+ToastType+MenuItemVariants triad).
- **Rδ (DI patterns)**: dock subsystem INCONSISTENT (highest priority—6 keys → 1 typed context + helper pair; 5 in-library consumer-site migrations); configurator + sortable + glyphface CLEAN; canonical-shape proposal codified at invariant 25.
- **Rε (pipeline)**: 6 duplication sites + 5 special-case branches + 6-layer orchestration proposal; freshness DRY drift (walkNewestMtime duplicated in `scripts/freshness-gate.mjs` + `src/freshness.ts`); release.sh duplicates prepublishOnly.
- **Rζ (recap + chronic)**: 26 user-prompt verbatim recap (all addressed); 18-row open-debt ledger; 4-entry stash-anti-pattern codification with 5th uncodified recurrence at N.W1—tooling-side enforcement candidate (invariant 27); AB shadow-execution recurrence (no plan folder)—W0 HEADLINE absorb.

### Round-2 consumer audit (6 lanes)

- **O11/a words/frontend**: MINOR-with-affordance; 5 idiomatic + 4 gap candidates. K9 `.section-label` KEEP (10 consumer sites). G2 ProgressiveSidebar slotted-chassis split is high-impact (469 consumer LOC absorbable).
- **O11/b fourier-analysis**: GlassScrubber union candidate concretized—`Slider variant="timeline-glass"` proposal (3 sites; ≥ 2-consumer bar cleared at this consumer alone).
- **O11/c bbnf-buddy**: R1 dock-icon-button active-state token ladder clears ≥ 2-consumer bar (bbnf + speedtest); R2 menuitem `:current` DEFER (1 site); 0/5 N-baseline legacy gaps clear bar; useLeaveTimer INLINE bbnf-side.
- **O11/d keyframes.js**: NO-IMPACT from Rα F1-F5; idle-bob ad-hoc not canonical; 84 % overfitting unchanged + 1-day +3 hover:scale-105 regression; L2 shadcn-init hygiene precept; L3 scale-on-hover utility clears ≥ 2-consumer bar with O-N-7 press-scale ladder.
- **O11/e value.js**: 2 PROMOTE—useClipboard (20 sites + fourier-analysis = ≥ 2 cross-walk) + HeaderRibbon (value.js + keyframes.js cross-walk REVERSES N "0-consumer orphan"); 1 API-LIFT (useLayerTransition layerProps() helper); 1 DEFER (usePopupMutex single).
- **O11/f speedtest**: 5 dock-family consumers (DockSelectTrigger now 0—downgrade); dock-DI cleanup BINARY-TRANSPARENT to consumer (zero reach-in to inject keys); AB.W3 substrate canonical consumer RE-CONFIRMED; AC.W6 needs v1.2.0 (cohort overlaps O.W6).

### Net synthesis

Three "headline" axes for O:

1. **W0—AB shadow-execution closure + precept hardening + cosmetic legacy excise**—closes the recurrence pattern.
2. **W2—dock subsystem DI canonicalization**—load-bearing architectural transposition.
3. **W6—constellation-level substrate promotions + speedtest AC.W6 dependency cohort**—multi-repo wire-out.

Supporting waves (W1 fail-explicit + W3 god-module split + W4 /api gaps + W5 pipeline orchestration) sequence between them. W7 close ceremony aggregates.

Pure additive at the public surface (no retirements except cosmetic comment cleanup); the four W1 FAIL-EXPLICITLY migrations are the only consumer-visible behavior changes—coordinated cross-repo per MULTI-WRITER policy.
