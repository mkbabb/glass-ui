# BG-WS7 — Quality · Coverage · Close (SPEC pass 1)

> The close ORACLE must read **live paint**, the release TAG must **require** it, and **no deferred item may silently drop**. Build the no-silent-drop machine FIRST, then the live-paint gates, then the a11y/perf/Safari floors + the new-capability census, then the honest re-cut.

Branch `tranche/BG` @ `71e1c641`, src == 4.2.0 (`998136bb`). Every claim below was re-verified against this HEAD; three research-fleet facts were corrected by live grep (recorded in §0).

---

## GESTALT GOAL

glass-ui shipped **source-green / visually-broken three times running** (BB green-lie · BC never-built-cure · BD "77 stale re-points"). The disease is structural, not incidental: **the verification axis is decoupled from the release axis.** The keystone paint gate reads author-committed PNGs from a *frozen prior-tranche roster*; the only live-pixel layer is `local`-tagged and physically absent from the tag battery; the probe is a warm-cream-vs-grey luminance test with no hue/clip/cast/routing predicate; and the no-silent-drop ledger that three tranches *promised* was never built, so 69 BE/BF waves + a 32-row census + a 31-row register + 100-odd in-src books ride UN-DECIDED while release-tagged gates green over **deleted or 0-consumer** mechanisms.

WS7 builds the **close machine that cannot lie**:

1. **The tag is severed from the served run only by an attestation that binds to the live render at HEAD.** A re-stamp-only / frozen-capture-only / skip-under-CI close **REDs**. The gestalt verdict comes from a reproduction the building agent did **not** author.
2. **The probe reads the defects.** Hue-band, chroma-ceiling, edge-cast, top-bar-strip, corner-clip, and a routing predicate — each born-RED on the shipped 4.2.0 tree, each with a self-test bite.
3. **Every deferred item is DECIDED** in one machine-floored ledger (BUILD→a real BG wave / RETIRE-with-rationale / HELD-with-trigger / SUPERSEDED). A phantom destination, a `book`/re-stamp-only disposition, or a dropped row **REDs**.
4. **No release gate locks a 0-consumer mechanism.** The dead engines are wired-or-retired (the BB.W-NDA-DECIDE discipline), their gates downgraded or deleted in the SAME diff.
5. **Safari is a tag precondition.** All glass + goo-metaballing + liquid morph PAINT on WebKit — verified, no silent fallback.

The bar is iOS-27 fidelity, warm-cream identity, √φ proportion, liquid-weight motion — but WS7 does not paint those; **WS7 is the gate that those workstreams must pass.** Its gates are born-RED on 4.2.0 and turn GREEN only after WS1–WS6 land. The CUT is last.

---

## §0 — HEAD GROUND-TRUTH (corrections to the research fleet)

| Claim under audit | Verified state @ 71e1c641 |
|---|---|
| `scripts/release.sh` "does not exist" | **EXISTS** — runs `--run full` then `git tag`. It is the live-arm's home (NOT a net-new file). |
| `proof-ba-gestalt.mjs` BC pointers | **CONFIRMED** L70-73 `REFLECT_DIR/ROSTER/WAVES_DIR/TRANCHE_DIR = docs/tranches/BC/…`. |
| `useDockContextSilhouette.ts` (551L, 0 consumers) | **ABSENT** — already deleted. `proof:dock-context` (L269, release) now guards a *missing* mechanism. |
| `useDockFission.ts` (604L) | **ABSENT**. `proof:dock-fission` (L209, release) likewise guards a missing mechanism. |
| `useLiquidMorph.ts` + `liquid-morph.css` spike | **PRESENT** 462L + 850L — the live spike, 0 consumers. |
| `useHaptic.ts` published-yet-dead | **PRESENT** 138L; exported on root barrel + `/api`, 0 call-sites. |
| `useCelebrationBurst.ts` / `useBloomUp.ts` | **PRESENT** 261L / 507L. |
| `proof:celebration-burst` release-tagged | **FALSE** — it is `["local","ci"]`. The 5 release-tagged dead gates are dock-fission · bloom-up · liquid-morph · metaball-bridge2 · dock-context. |
| BG ledger / BG reflect roster | **ABSENT** — `docs/tranches/BG/FOLD-LEDGER.*`, `docs/tranches/BG/audit/reflect/` do not exist. |
| `proof:de-shadcn` | script ON DISK, **UNREGISTERED** in gates.mjs + package.json (runs in no battery). |
| `--run pi` in the tag path | **ABSENT** — `runPi()` (gates.mjs:2286) is a runner MODE, never in `gatesFor("full")` (L2197); release.sh + release.yml run `--run full` only. |

**The corrected dead-gate disposition:** `proof:dock-context` and `proof:dock-fission` are release-tagged gates over **deleted** code — the spike-delete's gate-retire half never ran. This is a *worse* class than the live-spike case and is the cleanest spike-delete the ledger will record.

---

## MECHANISM

### A. The spine — how live paint blocks the tag when CI is GPU-less

The settled architecture (BB.W-CLOSE-BATTERY) is correct and is NOT re-litigated: the close runs `gates.mjs --run full` siblings-absent in a fresh `/tmp` worktree before the irreversible tag, and `release.yml` re-runs `--run full` on GPU-less `ubuntu-latest` before `npm publish --provenance`. The single gap: **`--run full` is SOURCE+PAPERWORK; it contains zero live-pixel arm**, and `--run pi` cannot run on `ubuntu-latest` (no GPU).

The fix is a **two-phase close bound by a content-hash attestation** — NOT GPU-in-CI:

```
┌─ PHASE 1 · the CLOSE MACHINE (a real Mac w/ GPU — where the BD close ran) ─┐
│  scripts/release.sh  (existing ceremony, EXTENDED):                         │
│   1. fresh /tmp worktree (siblings + precepts-submodule absent)             │
│   2. gates.mjs --run full              (the deduped union — unchanged)       │
│   3. gates.mjs --run ship   ← NEW live arm:                                  │
│        a. serve the built demo on :5199 (vite preview)                      │
│        b. --run pi   (the enrolled tests-visual specs, served-app sentinel) │
│        c. the live-paint gates (routing / field / previews / uniform-blur)  │
│        d. proof:ba-gestalt FRESH IN-PROCESS: serve → screenshot the roster  │
│           routes AT HEAD → pixel-read in ONE process (NO committed PNGs)     │
│        e. write SHIP-ATTESTATION.json bound to the paint-source hash         │
│   4. the user gate · git tag · push                                          │
└─────────────────────────────────────────────────────────────────────────────┘
┌─ PHASE 2 · release.yml CI (device-free provenance publish) ────────────────┐
│   gates.mjs --run full                                                       │
│   proof:ship-attestation  ← NEW release-tagged, device-free:                 │
│     • SHIP-ATTESTATION.json EXISTS                                           │
│     • recompute the DERIVED paint-source hash at HEAD === attestation hash   │
│       (any paint-source byte drift after the served run → RED)               │
│     • status === "pass"  AND  ran === true  (skip/absent/fail → RED)         │
│     • capture mtimes POST-DATE the served-demo start ts (re-shoot loophole)  │
│     • runnerIdentity ≠ the building wave's authorship (author ≠ reviewer)    │
│   npm publish --provenance                                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Why content-hash, not commit-SHA:** an attestation committed in the to-be-tagged commit cannot record its own commit SHA. So it binds to the **transitive paint-source hash** — the SAME derivation the roster freshness uses (ONE leaf, DRY). `proof:ship-attestation` recomputes that hash at HEAD; a drift means a paint source changed after the served run → re-run required → RED. This is the existing `surfaceHash` mechanism *elevated to a release precondition* and *inverted*: today every live gate `liveArmCiGraceSkip() = Boolean(process.env.CI)` → exit 0 (skip-is-pass); the attestation gate makes **skip-at-release REDs** (absence-is-fail). That inversion is the load-bearing change.

**The re-shoot loophole dies by construction:** `proof:ba-gestalt`'s read pixels are produced by the in-process serve+shoot at HEAD, never a committed PNG. A gestalt PASS that only re-stamps an existing capture with no paint-source diff has stale mtimes and a stale hash → RED. The BD "re-capture + re-stamp" shortcut becomes mechanically impossible.

### B. The probe vocabulary — reading the defects, one decoder leaf

`reflect-capture-verify.mjs::pngRegionStats` today returns `{meanL, meanChroma, meanAlpha}` over one fractional box — a warm-cream-vs-grey test. It cannot express a single BG defect (a maroon cast at chroma 0.09 passes the floor identically to warm cream; a teal slab passes; routing-didn't-navigate is invisible; α=1 on every opaque screenshot makes "translucent" structurally untestable). Extend the ONE decoder (reuse `oklabFromRgb` L104 — no new color-math source) with five structural predicates + the routing predicate:

| Predicate | Math | Catches | Target / band |
|---|---|---|---|
| `meanHue=lo..hi` | OKLab `atan2(b,a)` degrees | metallic / red / violet cast | warm-amber **40–95°** (foreground 56–68°, aurora warmFieldHue [25,95]); dark top-bar `--primary` H318° REDs |
| `chromaCeiling<=v` | `hypot(a,b)` upper bound | over-saturated cast (the missing bound) | page-FIELD region ≈ **0.08–0.10**; metallic radials 0.115–0.155 REDs |
| `edgeCast` | thin band OUTSIDE a plate's bbox vs body | `--cartoon-ink` red drop-shadow `rgb(49,0,0)` (R≫G≈B≈0 gamut-clip) | edge band reads FIELD, not the R≫G≈B≈0 signature |
| `topBarStrip` | y=0..3px content-width strip | the `.demo-scroll-progress` invalid-`scroll()` full-width hairline | terminal `scaleX(0)` — a full-width line REDs |
| `cornerClip` | sample at the rounded corner | the dock pill / card un-clipped corner wedge | corner reads FIELD, not an opaque rect / saturated wedge |
| `glassyByBleed` | variance/structure over a known-busy backdrop | "warm-TRANSLUCENT" un-testable via α (always 1) | re-express glass as **backdrop-bleed-through** — busy backdrop structure bleeds through, NOT an alpha test |

Each predicate ships a born-RED **self-test bite** (a synthetic red-cast / metallic / top-bar / hard-rect PNG MUST RED). `parseExpect`/`evalBand` (proof-ba-gestalt.mjs:205-240) widen to parse them.

### C. The roster — BG-dated + surface-paths DERIVED (end self-certification)

Re-point `proof-ba-gestalt.mjs:70-73` BC→BG and mint `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` enumerating every shipped 4.2.0 surface (dock cast · V↔H morph · page field/aurora · category landing previews · scroll-shrink card · configurator drawer · hero · routing). The decisive change: **surface-paths are DERIVED from each route's transitive paint-source set** (walk the router → SFC `<script>/<template>/<style>` imports → the `@import` CSS graph → the shader leaves), **not author-declared**. A route file *outside* a surface's declared surface-paths **REDs**. This closes the self-cert hole that made `paper.css` (the metallic field), `AppShell.vue`/`router.ts` (routing freeze), and `SectionLanding.vue` (dead previews) invisible to G7 auto-revoke — and it kills the absurd current scope where `aurora` hashes `src/subpaths/aurora.ts` (a 1-line `export *` barrel) and `dock` hashes the `dock.css` `@import`-root (byte-stable when `dock/morph.css` changes). The committed-PNG roster path is **RETIRED** (clean break — the live in-process capture is the only path).

### D. The no-silent-drop machine — Band-0 wave-1, built FIRST

Clone `proof-bc-fold-ledger.mjs`'s 7-clause pattern into `proof-bg-deferred-ledger.mjs` over `docs/tranches/BG/FOLD-LEDGER.{json,md}`. ONE ledger enrolls the entire deferred corpus, each row carrying a **DECIDED disposition** ∈ `{BUILD, RETIRE, MET, HELD, SUPERSEDED}`:

- every **BF DEFERRED-CENSUS** D1–D32 row,
- every **AX DISPOSITION-REGISTER** row (31 items; 27 `book`, 26 `reStampedAt:"BC"`),
- every **in-src book** (the `CONSUME(`/`BOOKED:`/`successor` markers across `src/`),
- every **BE.W-\*** + **BF.W-\*** wave-id (69 specs) with a **per-wave parity clause**: a LANDED row names NO build wave (it is the shipped surface a paint wave re-verifies — re-running its stale born-RED spec is forbidden, it would re-mint a shipped engine); a NEVER-BUILT row names a real BG wave or RETIRE.

Gate clauses (`["local","ci","release"]`): F1 doc⟷JSON completeness+count · F1b band/source DERIVED from the on-disk header not transcribed · F2 decided-destination soundness (a `resolvedBy` naming no real `docs/tranches/BG/waves/<id>.md` REDs — the phantom-dest floor) · F3 no-undecided / no-`book` / no-re-stamp-only · F4 HELD needs rationale+trigger · F5 requirement-traceability (exactly one row per source item) · F6 **the meta-clause: no `release`-tagged gate may lock a <2-live-consumer src mechanism** · F7 self-test bites. This is the literal cure for D11 (the disposition machine deferred a 4th time) and it must NOT itself defer.

### E. The dead-mechanism reckoning — atomic delete+gate-retire, decide-don't-rebook

Per J-inv-10 (substrate ships with ≥2 consumers or is RETIRED-with-rationale) and BB.W-NDA-DECIDE (decide build/retire/meet, never re-book). **Each mechanism delete and its gate-retire are ONE atomic diff** (a delete that reds its own gate is forbidden; a gate-retire that orphans nothing is forbidden):

- **Pure-dead, no other workstream needs it → DELETE clean:** `useLiquidMorph.ts` (462L) + `liquid-morph.css` (850L demo-content mis-placed in `src/styles/`); the dead-token pins (`--corner-k-soft/-sharp`, `--corner-shape-card/-pill`, the 3 `--spring-timeline-*` CSS twins, all 0 `var()` reads) + the `proof:squircle-language`/`proof:no-dead-token` clauses pinning them; the `selectableChipVariants.ts` alias shim (a self-admitted back-compat rename the no-legacy law forbids).
- **Gate-over-ABSENT mechanism → DELETE the gate:** `proof:dock-context`, `proof:dock-fission` (their engines are already gone — §0).
- **Landed-but-unwired → DECIDE wire-or-retire (NEVER blind-delete — risk #5):** `useHaptic` (published-yet-dead → RETIRE, drop the root-barrel + `/api` exports); `useCelebrationBurst` (0 call-sites → wire to ≥2 OR fold into CompletionSeal); `useBloomUp` / `metaball-bridge` (WS2/WS6 compose the fission/bloom/goo LOOP SHAPE, box-inviolate → the ledger records the wiring wave; the gate moves off `release` until the consumer lands). The 4-engine ElementMorph+`springTimingFunction` DRY collapse (`useBloomUp`/`useLiquidReveal`/`useDockCtaReceive`/`useLiquidMorph` re-fork the rAF loop while the published kf `flipShared` is imported-and-never-called) is recorded as a **DECIDED ledger disposition** pointing at a coordinated FLIP-ONE wave — WS7 names the gestalt, it does not unilaterally rewrite engines other workstreams are actively building on.
- **The meta-gate (F6 above):** a SOURCE-PRESENCE assert over a symbol with <2 live `(`-call-sites (not keyword greps — the phantom-evidence class) on a `release` gate REDs.
- **`proof:de-shadcn`** (authored-but-unregistered): a ledger row → register-or-delete, destination WS4/WS10 (de-shadcn is their concern; WS7 only floors the disposition).

### F. The AX register re-stamp

Flip the 26 `reStampedAt:"BC"` rows to `"BG"` **in place** (no delete — L-inv-8), re-evaluate every `min-consumers n:2` trigger against the present constellation, graduate any that crossed ≥2, verify the 2 pending flips (`css-relative-color`→BB.W-DARK-INK-WARM landed; `styles-critical-split`→BC.W-CSS-CRITICAL). A re-stamp-WITHOUT-decide REDs (the BB.W-NDA-DECIDE terminal-lock). The genuine republish/Baseline-gated DEFERs (kf snap/Oscillator, value.js `/color`, deep-glass-20px, lens-chroma, concentric-radius) carry by-name with a trigger — foreign-tree fence, no speculative build.

### G. Safari parity — a tag precondition, the lens decision

`proof:safari-webgl` (release-tagged) is a config-string SOURCE scan; the binding WebKit paint is `local`-only and skips under CI. Widen the EXISTING `webkit` Playwright project (`playwright.config.ts:117`, currently 2 BC-era specs) to the full glass/goo/dock/drawer/menu surface, and run the WebKit paint subset **inside the Phase-1 ship arm** (the close machine has a real WebKit). Source predicates from the capability matrix:

- every `filter:url()`/`backdrop-filter:url()` is regular `filter:url()` OR `@supports`-gated with a non-goo floor (WebKit bug 245510 — `backdrop-filter:url()` unsupported);
- every 0-alpha gradient stop is explicit `oklch(L C H / 0)` (WebKit premultiply-toward-black);
- the route transition is engine-agnostic CSS, NOT `startViewTransition` (no-ops on Safari);
- the squircle has a `clip-path` floor under `@supports not (corner-shape:…)`;
- `light-dark()` carries no inset-shadow fragment;
- goo-metaballing rides WebGPU (Safari 26) or the WebGL2 fallback; no context-lost flash on background→foreground+resize.

**The lens collision (must be DECIDED before the gate is written):** `.glass-lens` uses `backdrop-filter: url(#glass-refract)`, `@supports`-gated, degrading to plain blur on WebKit. The directive is "no fallbacks on Safari." Prototype 5 captures a real WebKit render of `glass-material` + `goo-blob` + a `.glass-lens` surface and DECIDES: if the lens reads merely un-refracted (blur base intact) → accept `@supports`-degrade as **enhancement-not-fallback** and document the constraint; if it reads BROKEN → the backdrop-filter:url() lens needs a clean-break redesign. (Goo metaball is provably WebKit-safe — `GooFilter` uses regular `filter:url()`.)

### H. The constraint manifest + lighthouse re-pin

Mint `docs/tranches/BG/CONSTRAINTS.md` enumerating the six binding cross-engine constraints (PRM fade-keeps/transform-drops · ONE-live-GL-per-route + offscreen-park + no forever-CSS-compositor-layer · the Safari fence set · CLS≈0 / no-layout-animation · focus-trap-via-FocusScope+inert+Esc-on-focusable / roving-tabindex / 44px coarse floor / presentational-dock-root · warm-chroma-floor / no-gray / no-red-ink) + the iOS-26 numeric ceilings (blur ≤40px mobile/≤60px desktop, ≤4 compositing layers/route, one-primary-glass-sheet-per-view, specular ≤6px, 4.5:1 after the adaptive darken). Machine-lock via `proof:constraint-manifest` reading the LIVE resolved tokens — a token drift past a ceiling REDs. Re-pin `scripts/lighthouse/floor.baseline.json` via `--rebaseline` **ONLY after the WS1–WS6 fixes land** (the current 2026-06-20 BC floor predates the metallic-forever-drift field + per-card cast + route double-paint; re-pin at the achieved number, never a lowered bar) and promote `proof:lighthouse` into the ship arm so perf gates the tag.

### I. The new-capability census — build-or-defer, decided not forgotten

`docs/tranches/BG/audit/DS-COMPLETENESS-census.md` carries a build-or-defer verdict per candidate against the ≥2-consumer bar:

- **BG.W-DATE-CALENDAR** — reka-ui ships the full headless Calendar/DatePicker/DateField/RangeCalendar set (dep `@internationalized/date`); the glass-skin wrap is the existing shadcn-pattern, fork-free. Verdict **BUILD-IF-CONSUMER else DEFER-with-trigger** (the iOS roll-wheel reuses `useDragMorph` spring-snap detent).
- **BG.W-CHART-FAMILY** — reka ships no charts; a line/bar/area family is heavy net-new SVG against the no-runtime-dep identity; data-viz is already covered by the procedural suite + MetricStack/InstrumentChassis + the `--chart-*` phase-bus; zero constellation consumer at HEAD. Verdict **DEFER-with-trigger** (record the verdict; do not speculatively build).
- **BG.W-DS-COMPLETE** — the meta-census: Kbd/Breadcrumb/Stepper/TreeView/AspectRatio earn keep-candidacy; Resizable/ScrollArea/FileUpload/Rating/Menubar/OTP/Pagination(retired) CENSUSED build-or-defer, each with recorded rationale (J-inv-10 no-speculative-substrate). NOT a build mandate — the artifact is the verdict.

---

## FILES TOUCHED

**New:**
- `scripts/proof-bg-deferred-ledger.mjs`, `docs/tranches/BG/FOLD-LEDGER.{json,md}`
- `scripts/proof-ship-attestation.mjs`, the `--run ship` dispatch in `scripts/gates.mjs`
- `scripts/proof-route-navigates.mjs`, `tests-visual/route-navigates.spec.ts`
- `scripts/proof-field-aurora.mjs`, `scripts/proof-previews-render.mjs`, `scripts/proof-uniform-blur.mjs` (+ their `tests-visual/*.spec.ts` live π)
- `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` + the per-surface `.md` headers
- `scripts/proof-constraint-manifest.mjs`, `docs/tranches/BG/CONSTRAINTS.md`
- `scripts/proof-safari-parity.mjs`, the widened webkit specs
- `docs/tranches/BG/audit/DS-COMPLETENESS-census.md`
- `docs/tranches/BG/waves/BG.W-*.md` (one per wave)

**Modified:**
- `scripts/reflect-capture-verify.mjs` (the predicate vocabulary — ONE decoder leaf)
- `scripts/proof-ba-gestalt.mjs` (BC→BG re-point, DERIVED surface-paths, live in-process capture, the new predicates, retire the committed-PNG path)
- `scripts/release.sh` (the `--run ship` step before the tag), `.github/workflows/release.yml` (the `proof:ship-attestation` step before publish)
- `scripts/gates.mjs` (register the new gates; dead-gate downgrade/delete; `--run ship`)
- `package.json` (the new `proof:*` scripts; register `proof:de-shadcn` IF the WS4/WS10 disposition is register)
- `scripts/lighthouse/floor.baseline.json` (`--rebaseline` post-fix), `proof:lighthouse` tag promotion
- `docs/tranches/AX/audit/DISPOSITION-REGISTER.json` (re-stamp in place)
- `tests-visual/playwright.config.ts` (webkit testMatch widen)

**Deleted (clean break, registry-probed):**
- `src/composables/motion/useLiquidMorph.ts`, `src/styles/glass/liquid-morph.css`
- `src/components/custom/selectable-chip/selectableChipVariants.ts` (alias shim)
- the dead tokens in `radius.css`/`scheme-spring.css` + their pinning gate clauses
- `proof:dock-context`, `proof:dock-fission` gate registrations (engines already gone)
- `CLAUDE.md` — drop the `useHaptic` exports if RETIRED; reconcile the per-mechanism notes; the no-god-module ratchet claim made true again

---

## THE BG.W-* WAVE BREAKDOWN

**Band 0 — the no-silent-drop machine (zero-pixel, FIRST):**
- **BG.W-DEFERRED-LEDGER** — `BG/FOLD-LEDGER.{json,md}` + `proof:bg-deferred-ledger` (F1–F7), seeded from the BF census + AX register + in-src books. The 4th-drop guard. *(Prototype 4.)*
- **BG.W-BE-BF-LEDGER** — the 69-wave parity rider (LANDED-names-no-build / NEVER-BUILT-names-a-wave-or-RETIRE; re-running a LANDED spec forbidden).
- **BG.W-DISPOSITION-RESTAMP** — the 26 AX rows BC→BG in place, every n:2 trigger re-evaluated, the 2 pending flips verified; re-stamp-without-decide REDs.

**Band 1 — the dead-mechanism reckoning (atomic delete+gate-retire pairs, BEFORE the oracle re-points so it never certifies code about to be deleted):**
- **BG.W-SPIKE-DELETE** — delete `useLiquidMorph.ts` + `liquid-morph.css` + the alias shim + the dead tokens + their pin-clauses; un-grandfather the no-god-module ratchet; the engine delete and its gate-retire in ONE diff.
- **BG.W-JUBILANCE-DECIDE** — RETIRE `useHaptic` (drop exports); DECIDE `useCelebrationBurst` (wire-≥2 or fold into CompletionSeal); record the FLIP-ONE DRY collapse as a coordinated disposition; NEVER blind-delete a WS2/WS6-needed engine.
- **BG.W-DEAD-GATE-SWEEP** — downgrade the 5 release-tagged dead gates off `release` until a real ≥2-consumer binding π exists; delete the 2 gate-over-absent registrations; harden the phantom-consumer-evidence class (real call-sites, not greps); the F6 meta-clause; register-or-delete `proof:de-shadcn`; fix the 3 stale scripts (viz-dotflow over-broad grep, concentric rename, handmark CLAUDE.md-in-flux dependency).

**Band 2 — the live-paint oracle (born-RED on 4.2.0):**
- **BG.W-PAINT-IS-THE-GATE** *(umbrella)* — the predicate vocabulary in `reflect-capture-verify.mjs` (hue/chromaCeiling/edge/top-bar/corner-clip/bleed) + self-test bites. *(Prototype 2.)*
- **BG.W-GESTALT-ROSTER-RE-POINT** *(≡ W-GESTALT-REPOINT — one wave)* — BC→BG re-point, BG-dated roster, DERIVED surface-paths, born-RED, retire the committed-PNG path. *(Prototype 2 + 6.)*
- **BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION** — `--run ship` + `SHIP-ATTESTATION.json` + `proof:ship-attestation` + the skip-REDs inversion; reconcile `release.sh`/`release.yml`. *(Prototype 1 — the spine.)*
- **BG.W-GATE-ROUTING-LIVE** — `proof:route-navigates` (CI-headless DOM, `release`-tagged, no GPU): ≥6 cross-category hops, old-gone + single-child `<main>` + new-heading. *(Prototype 3.)*
- **BG.W-GATE-FIELD-AURORA** — field reads warm-amber ≤ chroma-ceiling (no metallic/conic/red); SOURCE arm retires `paper.css` conic/feTurbulence onto one shared offscreen-paused shell aurora.
- **BG.W-GATE-PREVIEWS-RENDER** — every category landing card paints content-bearing live variance (no frozen still).
- **BG.W-GATE-UNIFORM-BLUR** — region-pHash/variance across dock==card==button backdrop-filter (a half-blurred plate the mean misses REDs).

**Band 3 — a11y / perf / Safari floors:**
- **BG.W-SAFARI-PARITY-GATE** — widen the webkit project; run the WebKit paint subset in the ship arm; the lens decision. *(Prototype 5.)*
- **BG.W-CONSTRAINT-MANIFEST** — `CONSTRAINTS.md` + `proof:constraint-manifest` over live tokens; the iOS-26 ceilings; lighthouse re-pin + tag promotion.

**Band 4 — new-capability census:**
- **BG.W-DATE-CALENDAR** — verdict BUILD-IF-CONSUMER else DEFER-with-trigger.
- **BG.W-CHART-FAMILY** — verdict DEFER-with-trigger (recorded).
- **BG.W-DS-COMPLETE** — the census artifact with per-family verdict.

**Band 5 — the honest re-cut (LAST):**
- **BG.W-CUT** *(supersedes BE/BF.W-CUT — the 4.2.0 cut they gated shipped broken)* — the tag fires only after the ship arm passes against the served demo over the BG roster with the widened predicates, run siblings-AND-precepts-submodule-absent, with the FOLD-LEDGER witness + the user gate.

---

## THE ACCEPTANCE / REAL-PAINT-π BAR

**Born-RED on the shipped 4.2.0 tree (MUST fail the current broken UX):**
- `proof:ba-gestalt` FAILS over the live-captured dock (red cast > chroma ceiling, edge-cast detected), field (metallic hue/chroma > ceiling), shell (top-bar strip present), routing (article count ≠ 1).
- `proof:route-navigates` FAILS (old `<article>` coexists, `<main>` childCount stuck at 3).
- `proof:bg-deferred-ledger` FAILS (the corpus is UN-DECIDED until each row lands).
- `proof:ship-attestation` FAILS (no served run / no fresh attestation).
- `proof:safari-parity` paints the WebKit surface and reports the lens verdict.

**GREEN only when** routing navigates · field paints warm aurora ≤ ceiling · previews render live · cast/strip/clip are gone · hero paints · every deferred item is DECIDED · every release gate locks a ≥2-consumer mechanism · Safari paints glass+goo+liquid · the constraint manifest holds · lighthouse re-pinned at the achieved number.

**The binding π is the IN-PROCESS served capture at HEAD**, produced by the reproduction the building agent did not author, recorded in `SHIP-ATTESTATION.json` and hash-bound to the paint sources. The committed-PNG path is retired.

---

## FOLDED DEFERRED ITEMS (the ledger seed)

| Source corpus | Count | Disposition home |
|---|---|---|
| BF DEFERRED-CENSUS D1–D32 | 32 | each → a BG wave (D2/D30 spike→SPIKE-DELETE; D6 ba-gestalt→ROSTER-RE-POINT; D7 Safari→SAFARI-PARITY; D9 phantom-evidence→DEAD-GATE-SWEEP; D11 ledger→DEFERRED-LEDGER; D12/D13→JUBILANCE-DECIDE; D32 release-tags→DEAD-GATE-SWEEP) |
| AX DISPOSITION-REGISTER | 31 (27 book, 26 BC-stamped) | BG.W-DISPOSITION-RESTAMP (re-stamp+decide; 2 pending flips verified) |
| in-src books (`CONSUME(`/`BOOKED:`) | ~48–103 | the ledger (DEFER-with-trigger, by-name, foreign-tree fence) |
| BE.W-\* + BF.W-\* wave-ids | 69 | BG.W-BE-BF-LEDGER (LANDED/NEVER-BUILT parity) |
| no-god-module GRANDFATHERED | 19 files | SPIKE-DELETE un-grandfathers the dead 2; the live >500 (GlassDock.vue 711, createCanvasLifecycle.ts 695, …) → ledger rows, colocation-split by owning workstream |
| `proof:de-shadcn` orphan | 1 | ledger → register-or-delete (WS4/WS10) |

---

## OPEN RISKS

1. **The GPU-less-CI feasibility (Prototype 1 — the spine).** If neither the content-hash attestation binding nor a self-hosted GPU runner is feasible, "live close before the tag" collapses back into the committed-PNG re-shoot it exists to kill. The attestation MUST bind the read pixels to the current render (serve→shoot→read in one process) and the gate MUST invert skip-is-pass to absence-is-fail. **Falsifier: build-prove the inversion end-to-end.**
2. **Can the predicates DISTINGUISH broken from correct?** (Prototype 2.) If the red cast doesn't actually exceed the chroma ceiling in a real screenshot, or the OKLab hue math is off, the gate is theater. Reference numbers (`--cartoon-ink` rgb(49,0,0); metallic C 0.115–0.155; foreground H 56–68°) must be confirmed in a live pixel-read.
3. **Is the routing defect real?** (Prototype 3.) If `<main>` settles to childCount 1, the defect is misdiagnosed and the gate false-passes. Born-RED must reproduce on the actual AppShell.
4. **Heterogeneous corpus unification** (Prototype 4). BF census rows, AX register rows, in-src books, and wave-ids have different shapes; the single-ledger transpose must hold without fragmenting.
5. **Safari "no fallbacks" is achievable, or scoped** (Prototype 5). Headless-Linux WebKit hits the software-raster guard (GL falls back); the glass PLATES (backdrop-filter) + goo (filter:url) are CSS and DO paint there. If the `.glass-lens` reads broken (not merely un-refracted), the directive's "no fallbacks" bar fails for the lens and it needs a clean-break redesign or an explicit scoped defer — a macOS-GPU runner is the heavier alternative.
6. **The FLIP-ONE DRY collapse vs risk #5.** Folding the 4 morph engines onto kf `flipShared` is the right gestalt but touches engines WS2/WS6 are actively building on. WS7 records it as a DECIDED disposition, NOT a unilateral rewrite — the actual fold is a coordinated wave.
7. **Sequencing.** The dead-mechanism reckoning (Band 1) lands BEFORE the oracle re-point (Band 2) so the new live oracle never certifies code about to be deleted. The Band-2 gates are born-RED and only close after WS1–WS6 paint; BG.W-CUT is last and gates on all of it.
