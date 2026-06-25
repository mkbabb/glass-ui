# Pass-E COMPONENT deep audit — motion/typewriter

**Page:** `motion/typewriter` · **Import path (standardized):** `@mkbabb/glass-ui/typewriter`
**Component(s) under audit (the REAL src):**
- `src/components/custom/typewriter/TypewriterText.vue` (the SFC — 257L)
- `src/components/custom/typewriter/composables/useTypewriter.ts` (the engine — 413L)
- `src/components/custom/typewriter/utils/{timing,keyboard,pausePatterns,typoStateMachine}.ts`
- `src/components/custom/typewriter/types.ts`
- keyframe `typewriter-blink` in `src/styles/animations.css:186`

This audits the COMPONENT, not the demo. The demo composition gaps (each sub-section in its own glassy card, bigger main card, dock APIs, aurora backgrounds) are a SEPARATE page-redesign concern — the typewriter component is a leaf text primitive that paints a `<span>` reel; the colorful-aurora / per-section-card / dock-transport asks land on the DEMO page wrapper, not here.

---

## 0. What it is

A character-by-character typewriter reel: a `<span class="tw-root">` of per-char `<span>`s + a tail-char wrapper + a blinking cursor span. Two modes — single-text (`text`) and word-rotation (`words[]` cycle: type → pause → backspace → next). The engine is a cancellable async loop (`useTypewriter`) driving a reactive `displayText` string, with a stochastic typo finite-state-machine (`typoStateMachine.ts`), keyboard-distance key-delays (`keyboard.ts`), and punctuation pause-patterns (`pausePatterns.ts`). Genuinely sophisticated humanized-typing math — the engine is the asset, the paint is a plain text reel.

---

## 1. ANIMATION affordance — MIXED (engine rich; chrome thin, off-canon)

**What's RIGHT:**
- The TYPING motion is high-affordance by design — stochastic per-key delays (`calculateKeyDelay` keyboard-distance × `stochasticDelay` variance), n-gram bursts, a typo FSM with notice/correct/resume, accelerating backspace (`backspaceDelay`). This is well past a flat `setInterval` reel.
- `respectReducedMotion` is honored at the ENGINE level (`startTyping` snaps to final text under PRM — `useTypewriter.ts:256`), and the blink keyframe is gated to idle (`cursorBlink && !isTyping` — `TypewriterText.vue:19`). Correct: the cursor only blinks when not actively typing.
- Cancellation is clean (a `CancellationToken` per run; `stopTyping` cancels in-flight) and timers are tracked + cleared on unmount (`activeTimers` Set, `clearTypewriterTimers`) — no orphaned `setTimeout` leak.

**What's WRONG / DEAD / off-canon:**
- **(A1) NO entrance/exit per motion-canon (P2/P3).** The reel just appears — no mount fade-rise, no spring-clocked entrance. The `tw-root` span has zero `@starting-style`/`useSpringMount`/`vReveal`. motion-canon P2 (enter-bouncy) / P3 (fade-coupled-to-transform) are entirely absent. The component is the platform's MOST motion-forward-named primitive ("Typewriter") yet has the LEAST entrance affordance.
- **(A2) The blink is a HARD step-end opacity flip, NOT the §6 register.** `typewriter-blink` is `0%,50%{opacity:1} 51%,100%{opacity:0}` on `1.06s step-end` — a CRT-hard binary blink. Fine as a deliberate retro cue, but it does NOT read the `--duration-*`/`--ease-*` token cascade and is un-tunable (a consumer cannot retune the blink rhythm without editing library CSS — the token-first divergence the rest of the lib enforces). No `--cursor-blink-duration` token.
- **(A3) The interactive-char hover is a bare `background-color` transition, NOT the four-state contract.** `tw-char--interactive:hover` is one `transition: background-color` leg (`TypewriterText.vue:234`). No active/press state, no focus-ring (the chars are CLICKABLE — `@click="handleCharClick"` — but carry NO `role`/`tabindex`/keyboard path; an interactive char is mouse-only, keyboard-dead, and trips the four-state + a11y bar). This is a real affordance + a11y gap, not cosmetic.
- **(A4) The cursor is `font-weight:100` text, not a designed caret.** No glass/specular/morph affordance on the one persistent moving element. A liquid-glass typewriter could carry a subtle specular caret or a `--motion-accent`-tinted bar; it's a literal `|` glyph.

---

## 2. PROCEDURAL VIZ — N/A

No GPU/WebGL/WebGPU surface. Not an aurora/blob/fourier viz; the PROCEDURAL-SUITE bar does not apply. The "procedural" character of this component is the STOCHASTIC TYPING math (CPU, deterministic-per-seed-less `Math.random`), which is correct for its register. No GPU-only/Safari-GPU concern.

---

## 3. PERFORMANCE — a real reactivity-thrash class

- **(P1) Per-keystroke full-array re-split + re-render (the live concern).** `displayText` is a reactive STRING; every keystroke does `displayText.value += ch`, and `displayTextChars = computed(() => displayText.value.split(""))` + `leadingChars = slice(0,-1)` re-derive the WHOLE char array each keystroke, re-rendering N per-char `<span>`s on every tick. For a long phrase this is O(N) DOM diff per keystroke = O(N²) over the type. The per-char `<span>` explosion exists ONLY to serve the `interactive` click-to-backspace feature (each char needs its own `@click`). For the common `:interactive="false"` case (the demo page sets it false), the per-char spans are pure waste — a single text node would paint identically. **TRANSPOSE:** when `!interactive`, render `displayText` as ONE text node (no `v-for`, no `.split()` computed); reserve the per-char reel for the interactive register only.
- **(P2) Compositor-only?** The blink (`opacity`) is compositor-safe. The hover (`background-color`) is a paint, not layout — acceptable. No layout-animation; `proof:no-layout-animation` is not at risk. The cost is the Vue re-render churn (P1), not CSS layout-thrash.
- **(P3) NO offscreen-pause.** The async loop runs on `setTimeout` and keeps typing even when scrolled offscreen or the tab is hidden — there is no `useIntersectionPause`/`document.hidden`/`content-visibility` park (the substrate viz family all carry this; the typewriter does not). A long-loop word-rotation typewriter offscreen burns timers + re-renders forever. Not a GPU rAF (so less severe than a live canvas), but it IS unbounded background work the suite-wide offscreen-pause discipline would park. **AUGMENT:** gate `startTyping`/`wordRotationLoop` on an IntersectionObserver visibility flag, or pause on `document.hidden`.

---

## 4. SAFARI compatibility — OK

- No backdrop-filter, no WebGL, no `@property`, no `contrast-color()`, no `color-mix` in a Safari-fragile site. The one `color-mix(in srgb, var(--foreground) 8%, transparent)` (hover bg) is broadly supported. `matchMedia("(prefers-reduced-motion)")` is SSR-guarded (`timing.ts:prefersReducedMotion`). `step-end` + `Intl`-free. Nothing Safari-specific to flag. Clean.

---

## 5. IDIOMATIC / no-legacy — gaps

- **(I1) The gray-literal finding is ALREADY reconciled** — the hover bg was a `rgba(128,128,128,0.15)` neutral, fixed to the warm `--foreground` 8% mix at `BC.W-VISUAL-RECONCILE` (the inline comment records it). Off the `proof:no-shadcn-default` ui/ scope (custom/). No action — this is DONE.
- **(I2) The clickable-char-without-role a11y defect (see A3)** — `@click` on a non-interactive `<span>` with no `role`/`tabindex`/`@keydown` is the non-idiomatic pattern. Either make it a real button-shaped affordance (role + keyboard) or drop the click feature behind a documented opt-in. Mouse-only interactivity is a workaround, not a contract.
- **(I3) THE STANDING DISPOSITION: typewriter is a `proof:component-orphan` ORPHAN at BD HEAD** (`BD.W-WEAK-KEEP-REGRADE`, VERIFIED this read). 0 non-self consumers, NO `docs/consumer-evidence/typewriter.md`, ships `/typewriter` subpath only (off root barrel), only ref is the own-route demo + `manifest.ts`. BD.W-WEAK-KEEP-REGRADE owes a graduate-or-retire decision at the BD close. Any AUGMENT this audit proposes is contingent on a GRADUATE verdict — if BD retires the package (clean break + registry-consumer probe per inv-11), these animation findings are moot (the package + subpath + demo route delete). The honest exit is graduate-via-evidence-doc IFF a named ≥2-consumer trigger is defensible (a slides/speedtest hero-text), ELSE retire.
- **(I4) No dual-path / dead-code in the engine.** The async-loop architecture is clean, single-source, well-factored (FSM, timing, keyboard, pause utils are disjoint leaves). The engine is genuinely good code — the deficiencies are all at the SFC paint/chrome layer + the orphan disposition, not the engine.

---

## 6. Glass six-layer composite — ABSENT (correctly)

The typewriter paints TEXT, not a glass surface — it carries NONE of the six-layer composite (no backdrop blur, tint, rim, catch-light, shadow, grain), and that is CORRECT: it is inline text meant to sit ON a glass/paper card, not to BE one. The glassmorphism belongs to the DEMO page's card wrapper (the user's per-section-glassy-card ask), not the leaf. No finding — a text reel is not a plate.

---

## FOLD/MODIFY/AUGMENT/PRUNE map (onto the BD tranche)

| # | Finding | Disposition | Wave |
|---|---------|-------------|------|
| I3 | Orphan at BD HEAD — 0 non-self consumers, no evidence doc | **PRUNE-or-graduate (the gating decision)** | `BD.W-WEAK-KEEP-REGRADE` (graduate-via-evidence-doc OR retire-with-rationale + `proof:lineage-probe` registry probe) — DECIDES at BD close; ALL findings below are CONTINGENT on graduate |
| A1 | No mount entrance per motion-canon P2/P3 | **AUGMENT** (contingent) | NEW wave under the motion-canon banner OR fold into the page redesign — add a `vReveal`/spring-mount entrance on `tw-root`; cite motion-canon P2/P3. NOT in BD scope today — book it. |
| A2 | Hard step-end blink, un-tunable, off the token cascade | **MODIFY** (contingent) | mint `--cursor-blink-duration`/token + keep the step-end as the deliberate default; token-first divergence parity. Book to the graduate path. |
| A3/I2 | Clickable char keyboard-dead, no four-state, no role | **MODIFY** (contingent) | the four-state + a11y contract on the interactive register (role/tabindex/@keydown + focus-ring) — the platform's interactive-atom bar. Book to graduate path. |
| P1 | Per-char `<span>` + per-keystroke `.split()` O(N²) churn | **MODIFY** (contingent) | single text-node fast-path when `!interactive`; reserve the reel for the interactive register only. |
| P3 | No offscreen-pause on the async loop (burns timers offscreen/hidden) | **AUGMENT** (contingent) | IntersectionObserver/`document.hidden` park on `startTyping`/`wordRotationLoop` — the suite-wide offscreen-pause discipline. |
| I1 | Gray-literal hover bg | **DONE** | `BC.W-VISUAL-RECONCILE` — no action (already warm `--foreground` 8%). |
| — | Import-path label | **standardize to `@mkbabb/glass-ui/typewriter`** | the demo SFC's deep relative import is the in-repo exerciser convention (the `/deck` sibling precedent); the chrome chip should render the subpath label. |

**The honest framing:** the typewriter ENGINE is excellent + idiomatic; the SFC CHROME (entrance, blink-token, interactive-char a11y, offscreen-pause, the `!interactive` fast-path) is the gap — but ALL of it is downstream of the `BD.W-WEAK-KEEP-REGRADE` graduate-or-retire decision. Spending augmentation effort on an orphan that BD may retire is premature; the FIRST disposition is I3 (decide), and the animation/perf findings are the IFF-graduate work-list to fold into a successor wave.

---

## 5-line verdict

1. **Engine excellent, chrome thin, orphan-blocked** — `useTypewriter` is sophisticated humanized-typing math (typo-FSM + keyboard-distance delays + n-gram bursts), but the SFC paint has the LEAST entrance/four-state affordance of any motion-named primitive AND is a `proof:component-orphan` at BD HEAD (0 non-self consumers, no evidence doc).
2. **Animation gaps:** no motion-canon P2/P3 mount entrance (A1); a hard un-tunable step-end blink off the token cascade (A2); clickable chars that are keyboard-dead with no four-state/role (A3/I2).
3. **Performance:** per-char `<span>` + per-keystroke `.split()` is O(N²) render churn that ONLY serves the interactive register (P1 — needs a `!interactive` single-text-node fast-path), and the async loop has NO offscreen-pause (P3 — burns timers/re-renders offscreen+hidden).
4. **Safari clean, glass-six-layer correctly absent** (a text reel sits ON a card, it is not a plate); the BC gray-literal hover is already reconciled (I1, done).
5. **Disposition:** the GATING action is `BD.W-WEAK-KEEP-REGRADE` — graduate-via-evidence-doc IFF a named ≥2-consumer trigger is defensible, ELSE retire-with-rationale (clean break + inv-11 registry probe); every MODIFY/AUGMENT above is CONTINGENT on a graduate verdict and books to a successor wave, never spent on a package BD may prune.
