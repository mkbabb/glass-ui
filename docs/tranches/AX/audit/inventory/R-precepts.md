# R-precepts — recapitulate precepts + audit session compliance

Read-only inventory. Lane R. HEAD `77c08c5` (the pass-3 ledger commit; `c72d2ac` is the
inventory-scaffold base named in the dispatch — the band advanced W45 + pass-3 on top).
3.8.0 published + convergence-1 (W44-W52) + convergence-2 (W53-W59) developed.

This lane RECAPITULATES every binding precept (CLAUDE.md design axes + the memory
feedback) and AUDITS the session's compliance: did a quick-fix / workaround / legacy slip
in? Are the AW.W26 keeps (in-srgb / cn / focus-ring) held? Is greenfield-no-meta honoured
(the story-language strip)? Did the clean-break renames (tabs / prune) sweep all consumers?

---

## §1 — The precept corpus (recapitulated, binding)

### A. CLAUDE.md design axes + house keeps

| # | Precept | Source |
|---|---------|--------|
| P-1 | **Token-first** — every visual behaviour is a CSS custom property; no consumer edits library source for styling | J inv / Design Axes 1 |
| P-2 | **Component-over-class** — interactive elements bundle the four-state contract; static patterns are CSS classes | J inv / Design Axes 2 |
| P-3 | **Visual-load-bearing-ness** — substrate-without-consumer is binary; primitives ship only with ≥2 consumers OR exported OR demo-private, else formally retired with rationale | J inv 10 / L inv 8 / memory overfitting-audit |
| P-4 | **vueuse-FREE root barrel** — the root barrel re-exports no symbol whose impl imports `@vueuse/core` | L.W1 |
| P-5 | **in-srgb surface-tint keep** — the `--surface-tint-*` ladder mixes `in srgb` (brand-calibrated), NOT `in oklab`; shaders that want perceptual interp run OKLCh in-shader (the separate correct path) | AW.W26 |
| P-6 | **cn() hand-rolled keep** — `clsx` + hand-rolled dedup; NOT a gap to "upgrade" back to `tailwind-merge` | AW.W26 / v0.9.2 |
| P-7 | **.focus-ring utility keep** — one `--focus-ring-shadow` token over the shadcn inline `focus-visible:ring-*` chain; token-first DIVERGENCE not drift | AW.W26 |
| P-8 | **cartoon-shadow override contract** — own identity tokens, override on the cascade, token-adaptive under `.dark` by construction; never a dead local orphan | CLAUDE.md / proof:shadow-contract |
| P-9 | **easing doctrine §6** — surface props → `--ease-standard`; transform hover/press → `--spring-smooth`; enter → bouncy/snappy; exit → ease-out (NO overshoot) | AX.W52 §6 |
| P-10 | **color tokens are complete `hsl()`** — consumed as `var(--token)`, NEVER `hsl(var(--token))` | CLAUDE.md |
| P-11 | **no-god-modules** — >500-line files split into cohesive sub-modules | §0 / proof:no-god-module |
| P-12 | **tests outside src** — no test files under `src/` | AV.W14 / proof:no-test-in-src |
| P-13 | **subpath publication is binary** — every published subpath probed before tag | L.W0 |

### B. Memory feedback (the user's standing precepts)

| # | Precept | Note |
|---|---------|------|
| M-1 | **no-backwards-compat** — clean breaks; NO legacy aliases or migration shims | the tabs/prune renames must sweep ALL consumers |
| M-2 | **presets-in-consumers** — named themed presets live in consumers; the lib's OWN default tokens evolve as identity changes | the G1 glass-default IS a legit identity evolution, not a violation |
| M-3 | **writing-style** — terse, no grandiloquence, no editorializing, no over-punctuation; em dashes unspaced; levity | applies to wave docs + READMEs |
| M-4 | **tailwind-first** — standalone-CSS references re-expressed via @theme + @utility, never pasted raw | the squircle / glass-level token mints |
| M-5 | **analyze-in-full** — read the whole corpus before planning | the convergence passes |
| M-6 | **tranche-format** — bbnf-lang format (`docs/tranches/{LETTER}/`, hard gates, FINAL.md) | AX adheres |
| M-7 | **greenfield-no-meta** — no "ported from", no version history, no migration language in any artifact (incl. src/ comments + story copy) | the W58 / W27a/b sweeps enforce this |
| M-8 | **glass-ui-binding-verification** — stale reka-ui prop/emit bindings silently no-op; sweep on version bumps; only e2e catches | proof:reka-binding-idiom |

### C. The cardinal lesson (the AX governing precept)

**A wave is complete ONLY when audited GREEN on the LIVE product.** "Complete" never
collapses to headless-green. Every visual wave closes on a live Playwright + frontend-design
audit (the π lane), never a headless proof alone.

### D. The §0 mandate

GESTALT redesigns over incremental patches; NO quick solutions / workarounds / legacy code /
fallbacks / special cases; clean breaks; architectural transpositions for elegance /
simplicity / PERFORMANCE are DESIRABLE. DRY. KISS. Excise-or-fail-explicit.

---

## §2 — Compliance audit (the session's changes vs the corpus)

I ran the live gates at HEAD and grepped the source. The verdict: **the house KEEPS hold,
but greenfield-no-meta has REGRESSED on two surfaces and a NEW god-module landed.**

### KEEPS — HELD (verified GREEN)

| Keep | State | Evidence |
|------|-------|----------|
| P-5 in-srgb | **HELD** | `tokens.css` surface-tint family all `color-mix(in srgb…)`. The ONE `in oklab` at `tokens.css:956` is the `--glass-spine-vignette` `--phase-color` radial (an aurora-adjacent perceptual site) — the documented carve-out, NOT a surface-tint drift |
| P-6 cn() | **HELD** | `src/utils/cn.ts` still `clsx` + hand-rolled `dedupClasses`; `tailwind-merge` absent from `package.json` deps |
| P-7 focus-ring | **HELD** | `.focus-ring` in `utilities.css:143/173` keyed off `--focus-ring-shadow`; no swap to the inline ring chain |
| P-8 cartoon-shadow | **HELD** | `proof:shadow-contract` GREEN (CHAIN-INTACT + OVERRIDE-RESOLVES + DARK-ARM-ALLOWED) |
| P-9 easing §6 | **HELD** | W52 unified the button hover-visual channel onto `--spring-smooth`; W53 squish capped 1.08 ≤ 1.10 |
| W56 squircle policy | **HELD** | `proof:squircle-language` GREEN — round-by-policy on cards/buttons/pills, superellipse re-homed onto big-dock only; round fallback + `@supports` gate intact; π readback `superellipse(2)` on Chrome-139 |
| W53 clean-break | **MOSTLY HELD** | `proof:tabs-unified` GREEN, **0 code survivors**; the 5 tab tests retargeted (`7c4d6c9`); no `Bouncy*`/`UnderlineTabs`/`ResponsiveTabs` component or alias export survives — only descriptive comments naming what SegmentedTabs subsumes (acceptable per clean-break) |
| M-8 reka-binding | **HELD** | `proof:reka-binding-idiom` GREEN (binding render canary) |
| P-3 overfitting | **HELD (good call)** | W19 KEPT `useTokenColor` against P1's bare "remove" — it has a constellation consumer (≥2 bar). The convergence-2 plan correctly re-routed P1 to "swap the demo icon for a darkmode toggle" rather than delete the composable |

### VIOLATIONS / DRIFT — FLAGGED

**V-1 (greenfield-no-meta REGRESSION, demo) — `proof:story-language` is RED at HEAD.**
The W45 dock band (`56db9e0`/`88a2ec5`, landed AFTER the W58 strip `5ff9098`) re-injected a
tranche code into a STORY SFC: `demo/stories/navigation/dock.vue:86` —
`<!-- AX.W45 — Home is a PERSISTENT control: authored ONCE in …`. The gate catches it
(1 hit, status FAIL) but W45 closed without re-running it. This is a literal M-7 / W58
clean-break failure: a wave that POST-DATES the strip re-introduced the exact meta-language
the strip exists to forbid. **Owner: a one-line scrub + a W45-close gate-re-run; the gate is
already born-RED-capable.**

**V-2 (greenfield-no-meta GAP, demo .ts) — the W58 gate scopes `.vue` ONLY.**
`proof-story-language.mjs` globs `*.vue` under `demo/stories/**`. It does NOT scan `.ts`
story files. There are **18 tranche-code refs in `demo/stories/**.ts`** the gate is blind to:
`manifest.ts` (the story registry — `AW.W11`, `AW.W16`, `AW.W18`, `O.W6`, `P.W3`, …),
`aurora-hero.ts:1` (`AX.W57`), `aurora/config/options.ts:18/25` (`AX.W13`). `manifest.ts` is
load-bearing — its `subtitle` strings render IN the demo nav. So a visitor reading the
storybook DOES see `(AW.W16)` / `(O.W6 Lane B)` in the rail copy. **The gate's `.vue`-only
scope is itself a precept gap** — M-7 binds the artifact a visitor reads, and the manifest
subtitles are exactly that. Owner: extend the W58 glob to `.ts` + scrub manifest subtitles
(route to W58-follow or W18/W40 which already touch the manifest).

**V-3 (greenfield-no-meta, src/ publish surface) — `proof:no-legacy-commentary` is RED.**
`src/api/index.ts` (5 hits) + `src/index.ts` (2 hits) carry tranche-letter refs INJECTED this
session: `AW.W16` (DeckProgress / W24), `AW.W17` + `AX.W17` (constellation / W17),
`AX.W37` ×2 (canvas2d / W37). Each wave added a public-surface comment with its own wave code
— the greenfield-no-meta failure class in the PUBLISH surface. This is the carry-forward the
W04+W12+W23+W24 band note already recorded ("owed to W27b"). **W27b (legacy commentary
full-tree sweep) is `planned`, not done — so this is a KNOWN, ROUTED deferral, not a silent
drift.** Flag: the longer W27b waits, the more wave-codes accrete (5 of the 7 hits are
AX-session-fresh). Recommend pulling W27a/W27b EARLIER in the close band.

**V-4 (no-god-module REGRESSION) — a NEW >500-line file landed.**
`proof:no-god-module` RED on 4 files; **`SegmentedTabs.vue` (683 lines) is NET-NEW this
session** (W53 collapsed four components into one — DRY in count, but the single file blew the
500 ceiling). `GlassDock.vue` GREW 505→**534** (the W45 region-model). The other two
(`useMetaballRenderer` 690, `constellationField` 510) are pre-existing carry-forwards. All 4
route to **W26 (TS god-module state encapsulation)**, which is `planned`. The W53 merge is a
correct clean-break, but it traded four small files for one over-ceiling file — W26 must split
SegmentedTabs (the `useTabIndicator` composable + the responsive-collapse arm are the natural
sub-module seams), not just the pre-existing three.

**V-5 (one-path GAP, carry-forward) — `proof:design-idiom-localization` RED.**
Two `text-[var(--…)]` arbitrary-value wraps survive: `ComboboxInput.vue:33`,
`TabsTrigger.vue:23`. Pre-existing, owed to **W27a** (legacy gate-hardening). Not a new drift;
a routed-but-open one-path debt.

**V-6 (token-ladder retire GAP) — the W06-condemned `--dock-active-*` cohort still ships.**
W06 planned to DELETE the dock-active-tokens token-ladder; the `dock-active-tokens` story
(`manifest.ts:86` + `foundations/dock-active-tokens.vue`) + the `--dock-active-{bg,color,
scale,border,shadow}` cohort survive (W06 is `planned`). Not a violation YET (the wave that
retires it hasn't run) — but it's a standing legacy-token surface the dock-band redesign
(W45 region-model + DK2 hover-state) should have folded. Flag for W06/W45 reconciliation.

---

## §3 — The clean-break / sweep verdicts

- **W53 tabs-unify — CLEAN.** 0 code survivors, tests retargeted, no alias export. The only
  residue is descriptive comments + one demo-copy line (`tabs.vue:260` "subsumes
  ResponsiveTabs") — borderline meta but not an alias. PASS on M-1.
- **W19 prune — CLEAN + correct overfitting call.** glass-carousel story + the `GlassCarousel`
  scroll-overflow composite gone; `GlassCarouselPager` (the distinct primitive pager, ≥2
  consumers) correctly survives. `useTokenColor` correctly KEPT (constellation consumer).
  `disco-glyph`/`glyph-face` excised. PASS on M-1 + P-3.
- **W56 squircle — CLEAN.** Round-by-policy keep held; no radius-token re-tint leaked onto
  cards/buttons/pills. PASS on M-2 (identity evolution, recorded).
- **M-2 glass-first-class (G1/W54) — VALID identity evolution, NOT a violation.** The pass-3
  "glass is the ROOT default" pivot reverses the J/L "glass is opt-in" posture; the
  A-tranche-wave-audit §3 correctly classifies this as a deliberate identity evolution the
  presets-in-consumers precept PERMITS (the lib's own default tokens evolve). Record it in the
  W54 charter + FINAL inheritance-ledger; do NOT treat the J/L posture as silently broken.

---

## §4 — Gestalt path forward (planning, not code)

1. **Close V-1 NOW (trivial, RED gate).** Scrub the `AX.W45` comment in
   `demo/stories/navigation/dock.vue:86` to a precept-clean WHY ("Home is a persistent control
   — authored once…"). Re-run `proof:story-language` GREEN. This is the literal cardinal-lesson
   discipline: a gate went RED post-close and the wave didn't re-run it.

2. **Extend the W58 gate to `.ts` + scrub `manifest.ts` (V-2).** The manifest subtitles RENDER
   in the demo nav — they ARE visitor-facing copy. Widen `proof-story-language.mjs`'s glob to
   include `demo/stories/**/*.ts`, then one-time scrub the ~18 tranche-code refs from the
   subtitle strings + `aurora-hero.ts`/`options.ts`. Route to a W58-follow or fold into W18/W40
   (both already re-author the manifest). This is greenfield-no-meta's true boundary — the
   `.vue`-only scope was an under-reach.

3. **Pull W27a/W27b EARLIER (V-3 + V-5).** The src/ tranche-commentary debt
   (`proof:no-legacy-commentary` RED) + the arbitrary-wrap debt (`proof:design-idiom-localization`
   RED) are both routed-but-open, and the commentary debt ACCRETES with every wave (5 of 7 hits
   are AX-fresh). The encapsulation band (J) should run its legacy-sweep waves before more
   waves inject more wave-codes — a born-RED full-tree scrub closes the class once.

4. **W26 must split SegmentedTabs (V-4).** The W53 merge is a correct clean-break but landed a
   683-line god-module. W26's scope must EXTEND to SegmentedTabs (683) + GlassDock (534, grew
   in W45), not just the pre-existing useMetaballRenderer/constellationField. The `useTabIndicator`
   composable + the responsive-collapse arm are the natural carve seams.

5. **Reconcile the `--dock-active-*` ladder (V-6) in W06/W45.** The dock redesign (region-model
   + DK2 four-state hover) is the natural place to retire the W06-condemned token-ladder + its
   story; do it in the same pass so the dock has ONE active-state model, not the legacy cohort
   plus the new region-model.

6. **Record the M-2 glass-default evolution in FINAL's inheritance-ledger.** So the J/L
   "glass opt-in" posture reads as SUPERSEDED-by-W54 (the P-inv-28 ADDRESSED/RETIRES form), never
   as a silently-broken prior invariant.

### Bottom line

The house KEEPS (in-srgb / cn / focus-ring / cartoon-shadow / easing / squircle-policy) all
HOLD — no "upgrade-back" drift slipped in. The clean-break renames (tabs / prune) swept all
consumers correctly with the right overfitting calls. The DRIFT is concentrated in
**greenfield-no-meta**: one live-RED story-SFC regression (V-1, W45 re-injected a wave code),
a gate-scope under-reach that leaves the visitor-facing manifest unscanned (V-2), and the
known-routed src/ + idiom carry-forwards (V-3/V-5) that the encapsulation band should pull
earlier before they accrete further. One new god-module (V-4) is a clean-break side-effect
W26 must absorb. None of these are workaround/legacy SHIMS — they are scope-gaps and
deferred-sweep timing, not quick-fixes. The compliance posture is SOUND with bounded,
named, routable remediation.
