# foundations/paper-glass — Pass-E SYNTHESIS (binding per-page verdict)

**Page:** `demo/stories/foundations/paper-glass.vue` (245L) · `/foundations/paper-glass` · manifest `foundations/paper-glass` (`hero:true`, `heroScale:"hero"`, `background:"paper"`, `canvasCount:0`).
**Inputs:** the three Pass-E reports (demo · design · component). **Role:** reconcile, dedupe, resolve conflicts, rank by impact, assign one tranche action each, call convergence.

---

## 0 · The one-sentence verdict
The page literally titled *Paper & Glass* is the foundation proof of the system's signature material, yet it imports ZERO glass-ui components, hand-rolls every plate as a `cn('glass-* paper-grain-overlay rounded-card border …')` `<div>`, demos the glass over a static 24%-gradient field that washes to near-monochrome gray, and renders the six-layer composite DEAD (no hover catch-light, no entrance, no press, no contextual switching, no dock). The COMPONENT (the CSS glass-tier system) is architecturally excellent and Safari-safe; the PAGE under-sells it on every axis the BD north star names.

---

## 1 · Where the three lenses AGREE (the unanimous core — high confidence)

All three reports independently land the same findings. Deduped:

| Theme | demo | design | component | Verdict |
|---|---|---|---|---|
| **The field is not vivid** — 24% CSS gradient + `--surface-tint-8` gray grid washes to near-monochrome; six-layer composite cannot read | FAIL §3 | core §5 | (defends in-budget §2) | **CONFIRMED defect** — the page's whole point collapses with nothing saturated behind the glass |
| **Zero components imported** — every surface a hand-rolled glass-`<div>`, the raw recipe the chassis was built to retire | FAIL §2 | §4 | F-implicit | **CONFIRMED** |
| **No animation affordance** — tiles static; no entrance stagger, hover catch-light, press, or liquid-reveal; layer-4 (inner catch-light) only fires on interaction the tiles never get | FAIL §1 | §2/§3 | F1/F2/§6 | **CONFIRMED** — the single biggest miss vs the iOS-27 bar |
| **Sub-sections NOT each own glassy card; main card too small** — flat stack of bare `<div>`s; tiles `h-48`, plates `min-h-56`; user wants bigger focal card | PARTIAL FAIL §4 | move 2 | — | **CONFIRMED** (direct user ask) |
| **BC liquid-glass band undemoed** — `glass-deep`/`.glass-lens`/`--glass-accent` = ZERO on foundations, its natural home | F6 §0 | move 4 | F6 | **CONFIRMED** (already a BD wave target) |
| **Import-path label absent/inconsistent** — manifest row omits `subpath`; chip should name `@mkbabb/glass-ui/styles` | (demo says PASS — sees route chip) | §7 | F4 | **CONFIRMED defect** — demo is WRONG here; 2-of-3 + manifest read agree the `subpath` chip is absent |
| **Superfluous prose + role-string duplication** | §6 | move 6 | F5 | **CONFIRMED** |
| **Blurb "four glass tiers" but page ships FIVE + "blend modes" claimed/none shown** | §6/§7 | §1 | — | **CONFIRMED factual bug** |
| **No contextual switching / dock APIs** — perfect surface for `<DockStack mode="facets">` tier-switcher | FAIL §1 | move 3 | — | **CONFIRMED** (direct user ask) |
| **Component is sound** — six-layer composite complete, four-state spring affordance, compositor-clean, Safari-safe | (n/a) | (n/a) | §3/§4/§5/§6 | **CONFIRMED — zero `src/` paint owed** |

**Resolved conflict — the import-path label.** demo §5 calls it PASS (it sees the *route* chip render). design §7 + component F4 read the manifest row and find `subpath` OMITTED. The component report's manifest read is authoritative: the chip is `v-if="subpath"` and the row has no `subpath` key, so NO `@mkbabb/glass-ui/<…>` chip renders — only the route breadcrumb. **The label IS a defect.** The canonical value is `@mkbabb/glass-ui/styles` (the glass ladder ships via the CSS bundle, no single component import).

---

## 2 · The ONE real conflict — GL-free vs live aurora (must resolve)

This is the load-bearing disagreement and it governs the whole rebuild.

- **demo §3 + design move 1** (unanimous, emphatic): the user ask is LITERAL — *"glass demos over COLORFUL aurora backgrounds."* Replace the dead 24% gradient with a live `<Aurora>` (vivid preset), offscreen-paused via `<DockStage>`/`useIntersectionPause`. This single move fixes the core failure wholesale.
- **component §2 + the existing `BD.W-TOKEN-TOUR-GLASS` Arm B fence** (equally emphatic): `foundations/paper-glass` is a STATIC-WASH route (`background:"paper"`). The `proof:storybook-meta` **M8 detector REDS any GL `<canvas>` on a static-wash route** (one-GL-per-route budget). Arm B's binding fence requires the glass-band demo stay GL-FREE over the paper-grain wash via `ShowcaseFrame tier="field"`.

**Resolution — the manifest flip dissolves the conflict; it is NOT a violation.** The M8 fence forbids staging a *second, undeclared* GL context on a route whose manifest declares a static wash. It does NOT forbid a route from DECLARING `background:"aurora"`. The correct move is to **flip the manifest row `background:"paper"` → `background:"aurora"`** (a vivid preset) so the page's ONE declared background IS the live field — staged once by the StoryPage chassis, offscreen-paused by construction, one GL context per route, budget MET. The paper-grain becomes an in-card `paper-grain-overlay` MOTIF on the opaque-atom specimens (where paper-vs-glass juxtaposition is the teaching), not the page field. M8 stays GREEN because the GL is the route's declared-and-only background, exactly the `substrates/*`/`navigation/*`/DockStage precedent. The component report's "must NOT stage a second Aurora" is correct AND the design report's "put a real aurora behind the glass" is correct — they are reconciled by making the aurora the route's declared single background rather than an injected second context.

This means **Arm B of `BD.W-TOKEN-TOUR-GLASS` must be MODIFIED**: its one-GL-free fence + M8-stays-green clause (M12-4) is rewritten for THIS page from "GL-free over the static wash" to "the route declares `background:"aurora"` as its single GL context; M8's *second-context* detector stays green; the glass-band reads over the LIVE field." The paper-vs-glass duality is preserved as an in-card opaque-specimen motif. This is the highest-impact change on the page and it requires touching an existing wave's binding fence — not a silent fold.

---

## 3 · RANKED changes (by impact on the BD north star)

1. **Live vivid aurora as the route's single declared background** (manifest flip + Arm B fence rewrite). Unlocks the entire six-layer composite read (refraction · rim · catch-light · grain all become perceptible). Fixes the core failure. *Resolves the §2 conflict.*
2. **Each sub-section its OWN glassy card + a BIG focal hero specimen card.** Replace the flat bare-`<div>` stack with real `<Card surface="glass" tier="…">` / `<ShowcaseFrame tier="field">` cards; grow the focal tier-demo to one dominant `glass-floating` hero card over the aurora (the user's "main card area BIGGER"). Kill the duplicate 4-up/3-up redundancy → one escalating sequence (small swatches → big hero demonstration).
3. **Bring every card ALIVE to the iOS-27 bar.** `vSpecular` pointer-tracked catch-light on hover (layer 4, currently dead) + `useLiquidReveal` bloom-in entrance + `useSpringPress` reciprocal squish on press + `.scroll-cascade` per-tile stagger. The page becomes the marquee for the library's own motion primitives it currently ignores.
4. **Wire the dock contextual-switching.** Add `<DockStack mode="facets">` whose facets switch the displayed tier (wash→quiet→resting→floating→overlay), each facet carrying its tier accent via `--glass-accent`, morphing the focal hero card's tier live — a static ladder becomes an interactive material explorer (direct user ask: "leverage the dock APIs").
5. **Demo the BC liquid-glass band on its natural home.** `<Card tier="deep">` + `--glass-depth` slider · `.glass-lens` squircle refraction (`@supports`-gated) · `--glass-accent` per-instance chromatic rim. (Already `BD.W-TOKEN-TOUR-GLASS` Arm B's exact target — now reading over the LIVE field, far more legible.)
6. **Re-design the "Live token values" table → a living tier ladder.** A single vertical stack of five real glass plates at their true opacity/blur over the aurora, the number as a quiet mono caption (show, don't tabulate). Kills the `blur(calc(1px*1))` implementation-leak spec-sheet — the frontend-design AI tell. Add a light/dark `<SegmentedTabs>` so the dark transmissive register is demonstrated too.
7. **Standardize the import-path chip** → add `subpath:"@mkbabb/glass-ui/styles"` to the manifest row.
8. **Tighten copy + fix factual bugs** — one declarative blurb; fix "four"→"five" tiers; either demo `mix-blend-mode` or drop the "blend modes" claim; de-dupe the two parallel tier-role string tables; cut the verbose comment blocks + the meaningless accent-dot confetti (or make per-tier identity load-bearing).
9. **Drop the redundant `paper-grain-overlay` on `.glass-*` tiles** (component F3 — the `::after` pseudo collision: the glass rung already paints its own grain; the utility silently clobbers one layer). Keep `paper-grain-overlay` only on the non-glass opaque specimen.
10. **Restore golden rhythm** — W-CARD-PAD sqrt-φ block-over-inline padding on the hero card; a real section gap between hero and body (currently a hard cut).

---

## 4 · Tranche actions (per change)

- **MODIFY `BD.W-TOKEN-TOUR-GLASS`** — the single most consequential edit. Rewrite Arm B + clause **M12-4** for `foundations/paper-glass`: flip the manifest `background:"paper"`→`"aurora"` (vivid preset) so the BC glass-band (#5) reads over the route's declared LIVE field instead of the static wash. M8's fence becomes "no *second* GL context" (the route's declared aurora is its one-and-only); the paper-vs-glass duality survives as an in-card opaque-specimen motif. Re-baseline M12-4's π arm (c) to capture the band over the live field. *(Changes #1, #5; resolves §2.)*

- **AUGMENT `BD.W-TOKEN-TOUR-GLASS` Arm B** — extend the same wave's page-rewrite to fold the existing tier grid into per-sub-section `<Card surface="glass">`/`<ShowcaseFrame tier="field">` cards riding `.scroll-cascade`, grow the focal tier specimen to a BIG hero card, and re-design the token table into a living five-plate ladder. Add clauses **M12-5** (each sub-section is its own glass card, the bare-`<div>` stack GONE) + **M12-6** (the token readout is a real-plate ladder, no `calc()`-string spec-sheet leak). *(Changes #2, #6, #9.)* Component F3's grain-collision PRUNE folds here as a build note.

- **NEW Band-16 wave `BD.W-PAPER-GLASS-ALIVE`** — the animation + dock layer is too large and too distinct (component-composition + behavior, not token-tour wrappers) to bolt onto TOKEN-TOUR-GLASS without diluting its wrapper-fold focus. Net-new wave: the focal cards thread `vSpecular` (hover catch-light) + `useLiquidReveal` (bloom entrance) + `useSpringPress` (press squish), and a `<DockStack mode="facets">` tier-switcher morphs the hero card's tier live via per-facet `--glass-accent`. **Real gate:** extend `proof:storybook-meta` with **M13** — (1) the focal tier cards compose `vSpecular`/`useLiquidReveal` (the four-state contract is wired, not dead); (2) a `<DockStack mode="facets">` is present and its facets bind the tier switch; (3) compositor-only (no layout property animates — `proof:no-layout-animation` stays green); (4) PRM-carved; + a self-test bite (a synthetic static tile with no specular arm reds M13-1). Paint: a `proof:ba-gestalt` `page-band` verdict on a fresh capture — the hover catch-light tracks, the entrance blooms, the facet-switch morphs the tier, both modes. *(Changes #3, #4 — the iOS-27 affordance bar, the dock contextual-switching.)*

- **MODIFY `BD.W-PAGE-HEADER-FOLD`** — add `subpath:"@mkbabb/glass-ui/styles"` to the `foundations/paper-glass` manifest row so the StoryHeader chip renders, standardizing with peer pages. The 36-file header-fold wave already owns the page-identity-header surface; this manifest-row key is a one-line extension of its scope. *(Change #7.)* (Note: paper-glass is NOT in the 36-file `borderLeft`+IconChip enrolled set — it has no in-body identity-header paste — so this is purely the manifest `subpath` add, no fold.)

- **MODIFY `BD.W-PAGE-OFFTOKEN-SWEEP`** — fold the copy-tighten + factual-bug fixes (#8) into its Band-4 first-half page-cleanup scope: tighten the verbose comment blocks + role-string dedup, fix "four"→"five", drop-or-demo "blend modes", cut the accent-dot confetti. (OFFTOKEN-SWEEP's current enrolled set is `{foundations/motion, display/buttons, display/badge}`; widen `OFFTOKEN_ENROLLED` / its copy-clause to include `foundations/paper-glass`.) *(Change #8.)*

- **FOLD into `BD.W-TOKEN-TOUR-GLASS` (build note, no new clause)** — the golden-rhythm W-CARD-PAD sqrt-φ padding (#10) is a property of the hero card built in the Arm B rewrite; it rides the existing card primitives (W-CARD-PAD is already shipped), no gate needed beyond the page-band gestalt verdict.

- **PRUNE** — the meaningless accent-dot confetti (`h-3 w-3 rounded-full` with no legend) is cut unless made per-tier load-bearing (handled under #8 / OFFTOKEN-SWEEP). The redundant second tier-role string table is deleted (one source of truth) — folds into the TOKEN-TOUR-GLASS rewrite.

---

## 5 · Convergence call

**NOT close — needs several more loops.** This is the single highest-leverage page in the foundations band and currently the FURTHEST from the BD north star: it fails on field-vividness, component-composition, animation-affordance, structure (own-card + big-card), dock-APIs, and the BC-band demo simultaneously — six of the seven user asks unmet. The COMPONENT under it is converged (sound, idiomatic, Safari-safe — zero `src/` paint), so all the work is demo-page-side, but it is a substantial architectural rebuild (manifest flip + fence rewrite + a net-new behavior wave + full SFC re-author), not a polish pass. Estimate **3-4 more loops**: (1) land the manifest-flip + Arm B card/field rewrite, capture; (2) land `BD.W-PAPER-GLASS-ALIVE` animation+dock, capture; (3) copy/label/bug sweep + gestalt re-earn; (4) convergence-confirm capture both modes. The conflict in §2 is resolved on paper here but its fence rewrite (M12-4) is the load-bearing risk to verify first.
