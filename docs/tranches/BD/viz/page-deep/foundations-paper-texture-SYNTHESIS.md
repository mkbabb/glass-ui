# foundations/paper-texture — Pass-E SYNTHESIS (binding per-page verdict)

**Page:** `demo/stories/foundations/paper-texture.vue` · `/foundations/paper-texture` · manifest `foundations/paper-texture` (`background:"paper"` static, `subpath:"@mkbabb/glass-ui/paper-backdrop"`).
**Import label:** `@mkbabb/glass-ui/paper-backdrop` (CORRECT — the one axis all three reports pass).
**Component:** `<PaperBackdrop>` (`src/components/custom/paper-backdrop/PaperBackdrop.vue`, 44L) + `src/styles/paper.css` + the `--paper-*-texture` tokens.
**Inputs:** the three Pass-E reports (demo · design · component). **Role:** reconcile, dedupe, resolve conflicts, rank by impact, assign one tranche action each, call convergence.

---

## 0 · The one-sentence verdict

The page that owns the PAPER half of the GLASS+PAPER duality demonstrates paper at its WORST — a flat spec-sheet of five identical warm-cream-on-warm-cream panels where the grain is sub-perceptual (0.025 opacity), THREE of the five sections render essentially DEAD (a phantom-token retint that no-ops, two indistinguishable clean/aged panels, and a viewport-escaping opacity slider), the component is mounted OUTSIDE its contract (8× `position:fixed` underpaints stacking on the viewport), and it never once composes paper-grain UNDER glass OVER a colorful field — so the duality the system's identity rests on is asserted and never built. Unlike its sibling `paper-glass` (whose component was sound), THIS page carries TWO genuine `src/` bugs.

---

## 1 · Where the three lenses AGREE (the unanimous core — high confidence)

All three reports independently land the same findings. Deduped:

| Theme | demo | design | component | Verdict |
|---|---|---|---|---|
| **`--paper-underpaint-color` is a DEAD token** — SFC docstring + the whole retint section advertise it; `paper.css` reads it NOWHERE; warm/cool/bone paint byte-identical | B2 §7 | move 1-implicit | F5(a) HIGHEST | **CONFIRMED SRC BUG** (verified live: zero `src/` readers; all three `bg: rgba(0,0,0,0)`) |
| **`position:fixed` register-conflation** — `paper-underpaint` is app-root fullscreen-fixed; 8 instances mounted in bounded cards escape to viewport, work by accident | B1 §7 | (implicit) | F5(b) | **CONFIRMED SRC BUG** (verified: `paper.css:13 position:fixed`; live `paperBackdropCount:8` all fixed) |
| **Grain is sub-perceptual** — `--glass-grain-opacity:0.025` makes the headline clean-vs-aged comparison indistinguishable | B3 §1 | §5 | (implicit) | **CONFIRMED** — the demo of a difference shows no difference |
| **No glass, no live field** — paper shown ALONE, never under glass over a colorful aurora; the duality never resolves | §3 | §5 move 1 | F5(d)/§6 | **CONFIRMED** (direct user ask) |
| **Sub-sections NOT each own glassy card; main card too small** — one wrapping card w/ hairline-delimited sections; bare prose sections; 80% width, ~288px dead gutter | §4 | move 2/§6 | F5(d) | **CONFIRMED** (direct user ask) |
| **No animation affordance** — one inert opacity input, nothing hovers/presses/blooms/shimmers; far below iOS-27 bar | §1 | §2/§3 | F1 §1 | **CONFIRMED** (the iOS-27 miss) |
| **Thin/flat — no SERIES of components** — only chassis + PaperBackdrop + a raw `<input>`; no Card/Tabs/Button/Dock/viz | §2 | §2/§4 | §6 | **CONFIRMED** (direct user ask) |
| **Raw unstyled `<input type=range>`** — should be `<Slider>` | B4 §7 | §4 move 3 | (implicit) | **CONFIRMED** — the single most un-premium element |
| **Spec-chip `<ul>` + thrice-repeated cascade prose** — API reference stuffed into a visual demo | §6 | §4 | F5(c)/PRUNE | **CONFIRMED** (superfluous-language ask) |
| **`frequency` advisory + dual texture source + baked-opacity** — the `aged` swap bypasses `paper-underpaint`'s own bg-image; two clean-turbulence copies; opacity is two uncoordinated alpha axes | (notes) | (notes) | F5(c) | **CONFIRMED SRC architectural item** |
| **Import-path label CORRECT** — chip renders `@mkbabb/glass-ui/paper-backdrop` | §5 PASS | §7 KEEP | KEEP | **CONFIRMED** — the reference convention |

No conflicts between the three lenses on the substance — they differ only in emphasis (component leads with the dead token; design leads with the duality; demo leads with the dead-render triad). This is a HIGH-confidence converged diagnosis.

---

## 2 · The ONE conflict to resolve — GL-free vs live aurora (the same conflict the sibling resolved)

Identical to the `paper-glass` SYNTHESIS §2, and resolved the SAME way:

- **demo move 2 + design move 1** (emphatic): the user ask is LITERAL — *"glass demos over COLORFUL aurora backgrounds."* Stage the hero composite over a live `<Aurora>`.
- **`BD.W-TOKEN-TOUR-GLASS` Arm B fence + M8**: `foundations/paper-texture` is a STATIC-WASH route (`background:"paper"`); `proof:storybook-meta` M8 REDS any GL `<canvas>` on a static-wash route (one-GL-per-route budget).

**Resolution — the manifest flip dissolves it (NOT a violation).** M8 forbids a *second, undeclared* GL context on a route declaring a static wash; it does NOT forbid a route DECLARING `background:"aurora"`. Flip the manifest row `background:"paper"`→`"aurora"` (a vivid preset) so the page's ONE declared background IS the live field — staged once by the StoryPage chassis, offscreen-paused by construction, one GL context per route, budget MET. M8 stays GREEN (the GL is the route's declared-and-only background, the `substrates/*`/DockStage precedent).

**The page-specific twist (NOT in paper-glass):** here the aurora is not merely a legibility upgrade — it is the TEACHING. The whole lesson of this page is the SIX-LAYER composite where paper-grain is layer 6 ON a glass plate. So the hero stack is, bottom-to-top: live `<Aurora>` (route background) → `.glass-floating` plate (layers 1-5) → `<PaperBackdrop>` grain (layer 6) → content. The aurora is load-bearing for the demonstration, not just contrast. The opaque clean/aged/retint SPECIMENS keep `paper-grain-overlay` as their in-card motif (paper-on-paper, where the grain difference is the point and a colorful field would compete).

This means **Arm B of `BD.W-TOKEN-TOUR-GLASS` is extended to a SECOND page** (`paper-texture` beside `paper-glass`) with the same manifest-flip + M8-second-context fence rewrite.

---

## 3 · RANKED changes (by impact on the BD north star)

1. **Fix the dead `--paper-underpaint-color` token (SRC).** Paint `background-color: var(--paper-underpaint-color, transparent)` in `paper.css` `@utility paper-underpaint` (+ the `.dark` arm) so the retint cascade the SFC docstring + the demo promise is REAL — the warm/cool/bone register stops being a phantom-token no-op. The token must paint or die; it paints (the cascade is canonical per design-idioms). *Highest because it is a live SRC lie shipping at HEAD.*
2. **Fix the `position:fixed` register-conflation (SRC).** The SFC defaults to the CONTAINED `paper-grain-overlay` `::after` register (`position:absolute; inset:0; border-radius:inherit`) — the already-correct in-card form — with an explicit `fixed`/`fullscreen` opt-in prop for the app-root underpaint case. A grain mounted in a card BOUNDS to the card by construction, not by `inset:0` accident.
3. **Build the duality: paper-grain UNDER glass OVER a live aurora, ONCE, as the BIG hero.** The route declares `background:"aurora"` (#manifest flip §2); the hero is a dominant `.glass-floating` plate over the field carrying `<PaperBackdrop>` grain as its finishing layer — the six-layer composite finally READS, the grain gives the glass its tooth. The single move that turns "paper alone" into "paper and glass are one system." (User's "main card area BIGGER.")
4. **Each sub-section in its OWN glassy card.** Replace the one-card-with-hairlines + bare-prose structure with real `<Card surface="glass">`/`<ShowcaseFrame tier="field">` cards over the aurora: the clean/aged comparison, the (now-live) retint, the opacity tuner, the hero composite — four escalating glassy cards, the flat five-section list GONE. Widen the column toward the viewport.
5. **Make the grain VISIBLE for the comparison (demo-local).** Exaggerate `--glass-grain-opacity` ABOVE the production default on the comparison specimens (presets-in-consumers — a demo may exaggerate to teach), stage clean/aged side-by-side over a mid-tone field, and increase scale so the 4-octave-vs-5-octave turbulence difference actually reads.
6. **Bring every specimen ALIVE to the iOS-27 bar.** `vSpecular` pointer-tracked catch-light on hover (the grain shimmers under a moving light — layer 6 made dynamic) + `useLiquidReveal` bloom-in entrance + `useSpringPress` squish on press + `.scroll-cascade` per-card stagger; the opacity change SETTLES with spring physics, not an instant CSS flip.
7. **Wire the dock contextual-switching — the paper EXPLORER.** Replace the raw `<input>` with `<Slider>` (gets `keepDockOpen` + thumb-halo free) AND add a `<DockStack mode="facets">` whose facets switch the TEXTURE register live — `clean` ⇄ `aged` ⇄ a custom `--paper-*-texture` — each facet carrying its register accent via `--glass-accent`, morphing the hero card's grain in real time. A static comparison becomes an interactive paper explorer (user's "leverage the dock APIs").
8. **Fix `frequency` to a real register (SRC, with #1/#2).** `frequency` becomes a real `--paper-texture` indirection the SFC sets (ONE texture source, opacity decoupled from baked alpha), retiring the inline `var(--paper-aged-texture)` paste that bypasses `paper-underpaint`'s own `background-image` and the dual clean-turbulence copy.
9. **Show the dark paper register.** A `<SegmentedTabs>` light/dark toggle on the hero composite demonstrates the warm-cream-vs-luminous-dark grain (W-DARK-MATERIAL) — paper is a material in BOTH modes.
10. **Tighten copy + prune the spec-sheet.** DELETE the spec-chip `<ul>` (API → README/`/api`), cut the JSDoc-dup SFC header, de-dupe the thrice-repeated cascade prose, one declarative blurb per card. Restore W-CARD-PAD sqrt-φ rhythm on the hero card; step panel heights on a φ cadence not 56→44→40; drop the hero to a tight `<StoryHeader>` cluster (reclaim the fold).

---

## 4 · Tranche actions (per change)

- **NEW Band-16 src wave `BD.W-PAPER-BACKDROP-CONTAIN`** *(changes #1, #2, #8)* — the TWO genuine SRC bugs + the `frequency` architectural transposition. Band-4 is explicitly "zero src paint," so NO existing wave covers them. **Real gate (`proof:paper-backdrop`, born-RED at HEAD):** (a) `paper.css paper-underpaint` reads `background-color: var(--paper-underpaint-color, transparent)` (+ dark arm) — the token PAINTS, born-RED (zero readers today); (b) the SFC defaults the CONTAINED `absolute`/`paper-grain-overlay` register with the explicit `fixed` opt-in prop — born-RED (`position:fixed` default today); (c) `frequency` resolves a single `--paper-texture` indirection, no dual clean-turbulence source, opacity decoupled from baked alpha; + a self-test bite (a synthetic `paper-underpaint` dropping the `background-color` read reds (a); a synthetic SFC defaulting `fixed` reds (b)). **Paint:** a `proof:ba-gestalt` verdict — the warm/cool/bone retint now paints THREE distinct hues (not byte-identical), the in-card grain bounds to its host, both modes. *This is the load-bearing distinction from the sibling: paper-glass owed ZERO src; paper-texture owes a real src micro-wave.*

- **MODIFY `BD.W-TOKEN-TOUR-GLASS`** *(changes #3, #4 structure, #5)* — extend Arm B + clause **M12-4** to a SECOND page (`foundations/paper-texture` beside `paper-glass`): flip the manifest `background:"paper"`→`"aurora"` (vivid preset) so the six-layer hero composite reads over the route's declared LIVE field; M8's fence becomes "no *second* GL context" (the route's declared aurora is its one-and-only). Add the per-sub-section glassy-card fold (`<ShowcaseFrame tier="field">` / `<Card surface="glass">`) + the BIG hero composite card + the demo-local grain-opacity exaggeration for the comparison panels. Re-baseline M12-4's π arm to capture the grain-on-glass-over-aurora six-layer stack. *(Coordinate with the paper-glass MODIFY — both pages flip a manifest row + ride the same Arm B; the two page rewrites are siblings under one wave extension.)*

- **NEW Band-16 wave `BD.W-PAPER-GLASS-ALIVE` (SHARED with the sibling — AUGMENT its scope)** *(changes #6, #7, #9)* — the animation + dock-explorer + dark-register layer is the SAME net-new behavior wave the paper-glass SYNTHESIS already proposes. Do NOT mint a third wave; **AUGMENT `BD.W-PAPER-GLASS-ALIVE` to cover paper-texture too** (its focal cards thread `vSpecular`/`useLiquidReveal`/`useSpringPress`; its `<DockStack mode="facets">` switches the TEXTURE register here vs the TIER register on paper-glass — same dock API, different facet payload; the `<SegmentedTabs>` light/dark toggle). **Gate extension:** M13's clauses (specular/reveal wired · DockStack facets present · compositor-only · PRM-carved + self-test bite) enroll `foundations/paper-texture` in the M13 page set; the `<Slider>`-replaces-`<input>` is an M13 affordance clause (no raw `<input type=range>` on the enrolled page). Paint: a `page-band` gestalt verdict — the hover catch-light tracks, the entrance blooms, the facet-switch morphs the texture, both modes.

- **MODIFY `BD.W-PAGE-OFFTOKEN-SWEEP`** *(change #10)* — fold the copy-tighten + spec-sheet PRUNE into its Band-4 first-half page-cleanup scope: DELETE the spec-chip `<ul>`, cut the JSDoc-dup header, de-dupe the cascade prose, one blurb per card. Widen `OFFTOKEN_ENROLLED` to include `foundations/paper-texture` (its current set is `{foundations/motion, display/buttons, display/badge}`).

- **KEEP (no action) — the import-path label.** The chip already renders `@mkbabb/glass-ui/paper-backdrop` (manifest `subpath` present, all three lenses pass). This is the reference convention; no manifest add owed (unlike paper-glass, whose `subpath` was absent).

- **FOLD into `BD.W-TOKEN-TOUR-GLASS` (build note, no new clause)** — the W-CARD-PAD sqrt-φ hero-card rhythm + the φ-cadence panel heights ride the shipped W-CARD-PAD primitives; no gate beyond the page-band gestalt verdict.

- **PRUNE** — the spec-chip `<ul>` and the JSDoc-dup header are CUT (handled under OFFTOKEN-SWEEP); the phantom retint section is NOT pruned — it is REVIVED by `BD.W-PAPER-BACKDROP-CONTAIN` #1 (the token paints, the section becomes a live demo). The token paints, it does not die.

---

## 5 · Convergence call

**NOT close — needs several more loops, and the FURTHEST-from-converged of the two paper pages.** Where `paper-glass`'s component was sound (zero src owed), `paper-texture` carries TWO genuine SRC bugs (the dead `--paper-underpaint-color`, the `position:fixed` conflation) ON TOP of the same six-axis demo gap (field-vividness, component-composition, animation, own-card structure, dock-APIs, the six-layer composite). Seven of the seven user asks are effectively unmet (only the import label passes). Estimate **3-4 more loops**: (1) land `BD.W-PAPER-BACKDROP-CONTAIN` (the two src fixes — the retint becomes live, the grain bounds), capture; (2) land the TOKEN-TOUR-GLASS manifest-flip + glassy-card + six-layer hero rewrite, capture; (3) land `BD.W-PAPER-GLASS-ALIVE` animation+dock+dark, capture; (4) copy/prune sweep + gestalt re-earn both modes. The §2 GL-free-vs-aurora conflict is resolved on paper (manifest flip, the sibling precedent); the load-bearing risk to verify FIRST is the src `BD.W-PAPER-BACKDROP-CONTAIN` born-RED gate, because the retint section cannot be demoed alive until the token paints.
