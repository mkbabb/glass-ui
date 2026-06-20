# BD.W-BUTTON-GLASS-IOS-NOTE — apply the BC.W-BUTTON-GLASS-IOS CLAUDE.md modify directive (the press/blur registers) + the metric-hover discoverability note

- **Band:** 7 (CLAUDE.md coherence) · **Source dim:** CMD · Doc-only.
- **One-line goal:** Update CLAUDE.md §"The lit glass button" to the iOS-27 registers the BC.W-BUTTON-GLASS-IOS wave shipped (the press spring `0.25/0.7 → 0.15/0.86`, the button glass blur `8px → floating-tier`, the hero-deep route) — the note tracks the SHIPPED Button — and add the BC.W-AX-METRIC-HOVER one-line tactile value-lift clause to the metric-badge note.

---

## 1. Band + goal

BC.W-BUTTON-GLASS-IOS is a shipped wave carrying a NON-conditional CLAUDE.md modify directive (`BC.W-BUTTON-GLASS-IOS.md:45`: *"CLAUDE.md §'The lit glass button' … update the blur register (8→floating) + the press register (0.25/0.7 → iOS 0.15/0.86) + the hero-deep route"*) — but the directive was specced, not applied. CLAUDE.md:473 still documents the pre-iOS press constants `useSpringPress (response 0.25, ζ 0.7)`, which no longer match the SHIPPED Button (now 0.15/0.86 via the `press` SPRING_PRESETS preset). A stale note means the documented spring constants contradict the shipped code. This wave applies the directive — and the load-bearing discipline is that **the note tracks the code** (verify the shipped Button first, then write).

## 2. Starting state — the exact on-disk reality (VERIFIED by reading)

**The SHIPPED Button press IS now 0.15/0.86 (verified):**
- `src/composables/motion/springPresets.ts:99-101` (read) — the `press` preset is MINTED at `response: 0.15` / `dampingFraction: 0.86` (the Apple `interactiveSpring`, BC.W-SPRING-EASE; the `SpringPresetName` union gained `"press"` at `:17`).
- `src/composables/motion/useSpringPress.ts:26,77-78` (read) — `response: options.response ?? PRESS.response` / `dampingFraction: options.dampingFraction ?? PRESS.dampingFraction` — the defaults read the `press` preset (0.15/0.86). The header comment `:18-19` records *"the Apple `interactiveSpring`, response 0.15 / ζ 0.86 — the ONE source … The old hand-defaults (0.25 / 0.7) were slower + less alive."*
- `src/components/ui/button/Button.vue:90` (read) — `const press = useSpringPress()` reads the defaults (0.15/0.86). **So the shipped runtime press IS 0.15/0.86.** (NOTE: the Button.vue COMMENT at :66 *"response 0.25, ζ 0.7"* is ITSELF stale — a separate code-comment drift, recorded here as an observation; the runtime is correct, the comment trails. Whether to fix the SFC comment is the orchestrator's call — it is NOT a CLAUDE.md change and the SFC is byte-fenced by other gates; this wave's scope is the CLAUDE.md note.)

**The SHIPPED button glass blur IS the floating register (verified per the wave doc):**
- `BC.W-BUTTON-GLASS-IOS.md:26,38` (read) — re-points `--glass-blur-btn` (`tokens/glass.css:118-127`) from the quiet 8px radius to `blur(calc(var(--glass-blur-floating-radius) * var(--glass-level))) saturate(1.18)` (the floating register, 10-13px + saturate 1.18). The wave's mechanism + acceptance (BG-IOS-1) ship it.

**The CLAUDE.md note (line 473, read verbatim):** §"The lit glass button — more glass AND more legible at once (BB.W-BUTTON-GLASS)" — *"The press composes `useSpringPress` (response 0.25, ζ 0.7 — Button.vue is its FIRST binary consumer) driving `useLiquidFlex`'s volume-preserving X/Y reciprocal squish (LOW cap 1.04) …"*. The note carries the STALE 0.25/0.7. It does NOT mention `--glass-blur-btn` (the blur register is documented elsewhere — the BB.W-DEEP-GLASS note at :465 covers `.glass-deep`/the hero-CTA-deep route, where "W-BUTTON-GLASS reaches it on the hero CTA" is already stated). So the press-constant edit is the primary CLAUDE.md change at :473; the blur + hero-deep are reconciled into the note's reach.

**The metric-badge hover lift SHIPPED (verified):**
- `src/styles/utilities/components.css:66-68` (read) — `.metric-badge:hover` carries `box-shadow: var(--metric-badge-hover-shadow, var(--shadow-cartoon-sm), var(--glass-highlight))` + `translate: 0 var(--metric-badge-hover-translate, -2px)` + `scale: var(--metric-badge-hover-scale, 1.04)`. The BC.W-AX-METRIC-HOVER lift (MH1-MH3) landed.
- **CLAUDE.md:141** (read) — `│   │   ├── metric-badge/   # MetricBadge primitive` — a bare structure one-liner, NO hover-lift note (the `--metric-badge-hover-translate` register is invisible in the doc).

## 3. The build — precisely what changes

**Two precise doc edits (the note tracks the SHIPPED code):**

### Edit 1 — :473 the press register (0.25/0.7 → 0.15/0.86 + the source)

Update the press-constant clause in §"The lit glass button":

> *"The press composes `useSpringPress` (response **0.15, ζ 0.86** — the Apple `interactiveSpring` `press` SPRING_PRESETS preset, BC.W-SPRING-EASE the ONE source; Button.vue is its FIRST binary consumer, direct-composition per `proof:button-glass` B2) driving `useLiquidFlex`'s volume-preserving X/Y reciprocal squish (LOW cap 1.04) …"*

The rest of the clause (the squish, the `--glass-btn-press-t` drive, the gleam, the depth stack) is unchanged. The note now matches the shipped runtime (0.15/0.86) + names the `press` preset as the source (not a button-local literal — the SPRING_PRESETS single-source discipline). The "0.25/0.7" is REPLACED (clean break, no alias — MEMORY no-backwards-compat; the old constants are not kept as a dual-read).

### Edit 2 — the blur-register + hero-deep reconcile (reach into the §"The lit glass button" / §"deep-glass tier" note)

Add a short clause to the §"The lit glass button" note (OR reconcile the existing BB.W-DEEP-GLASS :465 "W-BUTTON-GLASS reaches it on the hero CTA" line) recording the BC.W-BUTTON-GLASS-IOS lift:

> *"BC.W-BUTTON-GLASS-IOS lifted the button glass from the quiet 8px register to the FLOATING tier (`--glass-blur-btn` = `blur(calc(var(--glass-blur-floating-radius) * var(--glass-level))) saturate(1.18)` — `tokens/glass.css`, reading the EXISTING floating radius primitive, ONE source, the W-GLASS-CAL calm content ladder byte-untouched) so the button reads as MORE glass than a content tile, and routed the `default`/`primary-audacious` hero CTA onto `.glass-deep` (the deep refractive register). The press moved to the iOS `interactiveSpring` (0.15/0.86 above), and the `outline`/`secondary`/`accent` variants reskinned off the shadcn-neutral register onto glass (the BC.W-DESHADCN census verdict — `proof:no-shadcn-default` D1 button-outline RED→GREEN)."*

The clause is faithful to `BC.W-BUTTON-GLASS-IOS.md` (the floating-blur lift, the hero-deep route, the de-shadcn variant reskin) — it reconciles the note to the shipped 4.1.0 Button.

### Edit 3 — :141 the metric-badge hover-lift discoverability clause

Add the one-line tactile value-lift note to the `metric-badge/` structure line (or a sentence beside it):

> *"MetricBadge primitive; a hovered badge gives a tactile VALUE-LIFT — `--metric-badge-hover-translate` (-2px rise) + the scale lift (1.04) + the cartoon-sticker shadow (`--shadow-cartoon-sm`), token-first so a consumer zeroes the lift from `:root` (BC.W-AX-METRIC-HOVER, the speedtest-AX BC-W7 intake; compositor-only, `proof:no-layout-animation` holds). Machine-locked by `proof:metric-hover`."*

This makes the shipped `--metric-badge-hover-translate` register discoverable (it was invisible in the doc). The clause is a "modify-IF discoverability" one-liner (the BC.W-AX-METRIC-HOVER directive form) — it tracks the shipped `components.css:66-68`.

## 4. The gate — the existing shipped locks (no new gate)

This wave mints NO gate — the notes name EXISTING shipped gates: **`proof:button-glass`** (pkg:776, the button-glass surface lock; the press direct-composition B2 + the de-shadcn D1 flip) and **`proof:metric-hover`** (pkg:987, the metric-badge value-lift lock — VERIFIED present). Both resolve to real `package.json` scripts + `scripts/proof-*.mjs` files. The notes track the code (the gates already enforce the registers; the canon makes them discoverable, the Q-chron-3 codification-with-a-gate discipline).

The OPTIONAL reinforcement: if a `proof:claude-structure-sync` prose-presence arm ships (BD.W-DOC-COUNT-SYNC's extension), the press-constant value could be asserted to MATCH the shipped `springPresets.ts press` row (0.15/0.86) — closing the doc-vs-code drift class for the spring constant specifically. OPTIONAL; the primary lock is the shipped `proof:button-glass`.

## 5. Paint verification — the device-free assertion (no paint)

DOC-only — **zero pixels** (BB inv-4: the underlying paint already shipped + was paint-verified in BC.W-BUTTON-GLASS-IOS + BC.W-AX-METRIC-HOVER; this wave only updates the note). The verification:

- **The code-matches-doc assertion (the load-bearing check):** after the build, the CLAUDE.md press constant (0.15/0.86) MATCHES `springPresets.ts:99-101` (the `press` preset 0.15/0.86) and `useSpringPress.ts:26,77-78` (the defaults read it). A reviewer cross-reads the note and the shipped code — they agree (the stale 0.25/0.7 is gone).
- **The metric-badge assertion:** the CLAUDE.md hover-lift clause (`--metric-badge-hover-translate -2px`, scale 1.04, `--shadow-cartoon-sm`) MATCHES `components.css:66-68`.
- **The gate-name-resolves assertion:** `proof:button-glass` (pkg:776) + `proof:metric-hover` (pkg:987) resolve to real scripts. NO invented gate.

The BC anti-disease law is satisfied: a note-update wave's "paint" is the doc-tracks-code coherence, checkable device-free — the actual button/metric paint already landed + carries its own `proof:ba-gestalt` glass/CTA + chassis verdicts from BC.

## 6. Fences + risks

- **THE NOTE TRACKS THE CODE (the cardinal fence).** The press constant in the note MUST match the SHIPPED `springPresets.ts press` preset (0.15/0.86, VERIFIED). The note does not assert a number the code doesn't carry. (If a future re-tune moves the preset, the note re-syncs — the doc trails the SPRING_PRESETS source, never the other way; the CANDIDATE-WAVES.md "VERIFY the shipped Button.vue press constants match 0.15/0.86 before writing".)
- **The Button.vue:66 stale COMMENT is OBSERVED, not this wave's edit.** The SFC code-comment (`"response 0.25, ζ 0.7"`) is itself stale — but the runtime is 0.15/0.86 (it reads the preset defaults). Fixing the SFC comment is a SEPARATE concern (a `proof:button-glass`-fenced SFC, marker/structure-asserted — NOT a content-hash byte-fence; no content-hash gate exists over Button.vue, the phantom the SegmentedTabs reconcile names). This wave's scope is the CLAUDE.md note; the SFC-comment observation is RECORDED for the orchestrator, not silently edited.
- **CLEAN break on the press constant (no alias).** The "0.25/0.7" is REPLACED by "0.15/0.86" — not kept as a dual-read (MEMORY no-backwards-compat). The note records the iOS register as the identity.
- **ONE press source.** The note names the `press` SPRING_PRESETS preset as the source (BC.W-SPRING-EASE) — NOT a button-local literal (the `proof:button-glass` B2 direct-composition + the SPRING_PRESETS single-source discipline; a button-local magic-number spring would red BC.W-BUTTON-GLASS-IOS BG-IOS-3).
- **The W-GLASS-CAL fence.** The blur clause states the button-blur lift reads the EXISTING `--glass-blur-floating-radius` primitive (ONE source) and leaves the calm content ladder BYTE-UNTOUCHED (`proof:glass-cal` B1-B3 stays GREEN by construction). Do NOT imply the content tiers changed.
- **FAITHFUL + no embellishment.** Every fact (the floating-blur lift, the hero-deep route, the de-shadcn variant reskin, the metric-badge three-leg lift) traces to `BC.W-BUTTON-GLASS-IOS.md` / `BC.W-AX-METRIC-HOVER.md` + the shipped code (MEMORY no-editorializing).
- **No-silent-drop (CMD Class H).** This discharges FOLD-LEDGER Class H row 5 ("BC.W-BUTTON-GLASS-IOS modify directive un-applied + metric-hover note").
