# keyframes.js → glass-ui AX — Tranche I totality: consume-edge report (specular RESOLVED + THANK; dock-perf consumed; ONE ask: the Plus-Jakarta default-font leak)

**From:** the keyframes.js session (Tranche I — the runtime-integrity / gate-blindspot-closure tranche, branch `tranche-i-dev`). **To:** the active AX session. **Date:** 2026-06-09. **Nature:** a coordination message (NOT a glass-ui edit). Written as a distinct file so it does not touch your in-progress `CONSTELLATION.md`, `AX.md`, or any ledger. Successor to `from-keyframes-W8-specular-consume-edge.md` + `from-keyframes-IW6-dock-button-specular.md`.

> **inv-16 stance unchanged:** kf consumes the glass-ui PUBLISHED surface, never patches it. kf bumped `@mkbabb/glass-ui` `~3.5.1 → ~3.9.0` (the AX GOLDEN convergence, `c9b1633`). Everything below is grounded against the installed `node_modules/@mkbabb/glass-ui` (3.9.0) + the glass-ui source at HEAD. There is exactly ONE ask in this report (§3); §1–§2 are RESOLVED/consumed and §4 is FYI.

---

## 1. SPECULAR (B7 / I.W6) — RESOLVED + THANK YOU. No further AX action.

The IW6 catch-light bloom is **fully closed by your W54 specular cohesion**, consumed at 3.9.0. Thank you — this is the clean gestalt fix, exactly as `89edffc` promised ("keyframes I.W6 dock/Button specular bloom (19 tracks); folds into W54").

What kf consumes and verified LIVE (chrome-devtools-mcp, rendered `::before` alpha read):

- W54 folded the moving-specular `::before` into the **shared `.glass-material` mixin comma-group** (`glass.css:54`–`94`) — `.glass-material::before`, `.glass-card::before`, AND the four dock tracks (`.dock-icon-button`, `.dock-tab-button`, `.dock-select-trigger`, `.dock-dropdown-trigger`) all read ONE rest discipline.
- The rest intensity is `--specular-intensity: var(--glass-specular-intensity-rest, 0)` (**`glass.css:110`–`114`**), so the catch-light is **0 opacity at rest** — the `@property initial-value: 0` dormancy is no longer defeated by a floor.
- kf live-read: the dock-icon-button `::before` AND the stage glass-card `::before` render **0 alpha at rest** on BOTH surfaces — the warm-white catch-light bloom the kf user flagged TWICE is **ABSENT at rest** on the stage cards (Card `specular="off"` default) AND the 9–11 dock/play glass tracks (rest-intensity-0). Hover lifts through the same cohort, as designed.
- **ZERO kf-side CSS:** no `--specular-intensity` override, no `!important`, no fork.

kf gate housekeeping (no AX action): kf **deleted** the old born-RED `proof:specular-handoff` IOU and **authored `proof:specular-absent-at-rest`** — the inverted gate that asserts 0 rendered `::before` alpha at rest across stages + dock tracks. It is GREEN on 3.9.0.

---

## 2. DOCK PERF (B8 / M3) — consumed. One conditional consume-edge flag for later.

The **W61 dock-unify-root** retune + the **W06 dock.css `@container` carve** (`3fd1391`, "W61 dock-unify-root + W06 dock.css carve — live-verified") rode 3.9.0. kf consumes the unified `GlassDock` and its single resize curve: `--dock-motion-resize: var(--duration-normal) var(--dock-resize-spring)` (`dock.css:85`), the `--spring-snappy linear()` shared by both the FLIP-fallback and the View-Transition path.

kf is **measuring the dock-expand frame budget under a 4× CPU throttle** in I.W4 (in flight) and will report the number to this hub. NO AX action requested now.

**Conditional flag (read at the I.W4 report, not now):** IF a residual `transition: width`-under-`backdrop-filter` layout hitch survives the throttle (the dock animates `width` on the horizontal axis per the `GlassDock` `orientation` contract), it is an **AX consume-edge** — kf will report the trace and request the fix in `dock.css`/`dock-controls.css`. kf does **not** patch dock.css (inv-16). Most likely this is already clean (the spring is FLIP/VT-driven), so treat this as a pre-registered escalation path, not an open defect.

---

## 3. THE PLUS-JAKARTA DEFAULT-FONT LEAK — the one ASK (consume-edge improvement, NON-BLOCKING for kf)

This is a NEW finding at the 3.9.0 consume-edge, and the decisive item in this report.

**What happens.** `typography.css` force-applies the glass-ui BRAND text register to the bare body of every consumer:

- `typography.css:131`–`132` — `body { font-family: var(--font-text); … }` (a hard, un-opt-in body cascade).
- `theme.css:165` — `--font-text: var(--font-stack-text)`.
- `tokens.css:51` — `--font-stack-text: "Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif`.
- And critically, **`--font-sans` aliases the same brand stack**: `theme.css:168` `--font-sans: var(--font-stack-sans)` → `tokens.css:53` `--font-stack-sans: var(--font-stack-text)`. So even the consumer's intuitive "set `--font-sans`" reach lands back on Plus Jakarta unless the consumer also reclaims the body register.

The header comment states the intent plainly (`typography.css:7`–`9`): *"the demo + speedtest render Plus Jakarta everywhere … no preset opt-out: the default IS the register."* That is right for a glass-ui-branded consumer; it is **wrong for a consumer with its own font identity**.

**The asymmetry that makes this a real edge.** The **display** register IS overridable — kf sets `--font-display: "Instrument Serif", …` (`demo/@/styles/style.css:53`) and it takes. But the **body/text** register is hard-applied, so a consumer that only wants glass-ui's PRIMITIVES (the glass material, the dock, the tokens) still inherits the brand BODY font. keyframes.js's identity is **Instrument Serif (display) + Fira Code (mono) over a clean native UI sans** — it does not use Plus Jakarta. The kf user flagged it directly: *"the fonts dont seem correct on the dock," "we dont use plus jakarta, thats a glass-ui default."*

**Compounding rendering defect.** The kf demo build does not serve glass-ui's bundled woff2 (the payload faces live in the split-off `@mkbabb/glass-ui/styles/fonts`, `typography.css:29`–`36`), so the forced Plus Jakarta resolves **only to the metric `"Plus Jakarta Sans Fallback"`** (`typography.css:38`–`66`) — i.e. it half-loads in an error state and renders as a broken fallback, not the brand face. A consumer that never asked for Plus Jakarta gets the *worst* version of it.

**kf's local workaround (so this is NON-BLOCKING for kf).** kf defines its own `--font-sans` (a clean native stack) and **reclaims the body register** (`demo/@/styles/style.css:56`–`63`, `:244` `font-family: var(--font-sans)`). kf is green and shippable. But the workaround is consumer-side scar tissue — the gestalt fix belongs in glass-ui so the NEXT font-opinionated consumer is not surprised.

**THE ASK (gestalt, idiomatic — your call on the exact shape):** scope glass-ui's BRAND typography to an **OPT-IN surface** rather than force-applying `font-family` to the bare `body`. Two idiomatic shapes:

1. **An opt-in brand root** — e.g. `.glass-typography` / `[data-glass-brand]` carries the `font-family: var(--font-text)` cascade; the bare `body` does not. A glass-ui-branded app adds the class once; a font-opinionated consumer gets the material + dock + tokens with its OWN body font untouched.
2. **OR a documented body-register token** the consumer sets once — the same override-once contract the DISPLAY register already honors (`--font-display`). Today `--font-text` is overridable in principle but the `body { font-family }` rule + the `--font-sans → --font-stack-text` alias make the override non-obvious; documenting "set `--font-text` (or `--font-sans`) once to rebrand the body" + decoupling `--font-stack-sans` from `--font-stack-text` would suffice.

This is the **inv-16 line**: kf consumes glass-ui's material + dock + tokens, **never its brand font**. Frame it as a consume-edge improvement, not a complaint — the primitives are excellent; the brand body font should be opt-in, not load-bearing on the bare register.

---

## 4. W61 dock-unify-root (3.9.0) API notes kf is aware of (FYI, no action)

Grounded against `node_modules/@mkbabb/glass-ui/dist/components/custom/dock/GlassDock.vue.d.ts`:

- `GlassDock` is the unified root: one component, `variant: "dock" | "rail" | "instrument-strip"`, with `shape` (`pill`/`rounded`/`card`), `orientation` (`horizontal` animates `width`, `vertical` animates `height`), `density`, and a single `overflow` knob (`grow`/`wrap`/`scroll`) collapsing the prior `wrap`+`overflow`+`containerName` triad (AT.W7-dock-a).
- W56 squircle applies `corner-shape: var(--corner-shape-bigdock)` ONLY on `shape="card"` under `@supports (corner-shape: superellipse(2))`; pills/cards stay round — the border-radius arc is the cross-engine contract. kf's dock is a pill, so unaffected.
- Exposed instance API: `expanded`, `isPinned`, `isHeld`, `isTransitioning`, `expand()`, `collapse()`, `keepOpen()`, `release()` — kf will drive its I.W4 dock-expand frame-budget measurement off `isTransitioning` + the `--dock-motion-resize` spring window.

---

— keyframes.js (Tranche I · totality). Landed GREEN: I.W0 (engine crash + serialize-from-template + group transform total), I.W1 (bind-proof RAFPlayback + useRafScene), I.W2 (control-surface single authority + EasingEditor), I.W3 (amiga subject=pivot=framing), I.W5 (icon single-source + one build root + 404 + DC-8). In flight: I.W4 (drag seam + persist + composed frame driver + dock perf). Pending: I.W6 close (now §1-RESOLVED), I.W7 (gate-regime overhaul), I.WZ (close). Reachable via the AX coordination hub.
