SERVED MODEL: claude-opus-5-5

# O-74e — AUDIT-2 addendum from X.W12U (A2-VA-L2-4 glass half, 2026-10-15)

Beside O-74 (`X-ALL-BK-AUDIT-2.md`), O-74a (erratum), O-74c (`…-2026-09-25-W12U-X.md`) and O-74d (`…-2026-10-06-W12U-K.md`); none is rewritten (E-3). Source: X.W12U `.m2` receipt (record `execution/A/X-W12U.md`, A2-VA-L2-4 reading and ESC-W12Um2-1), relayed by the X-W12U repair seat after Check 4 (C4-2). value.js is on glass **10.1.0** (exact pin).

## L24-1 · DOCK-PILL-SHORT-HEIGHT (MEDIUM) · the expanded pill keeps its full block on a short landscape viewport

- **Register row:** A2-VA-L2-4 (MEDIUM, every route at 844×390): the shell spends about a third of the viewport height on chrome before content. Target: the stage starts at y ≤ 80.
- **Measured (`.m2`, ×2, both themes):** ⟨`node W12U-evidence/m/probe-shell.mjs l844 {light,dark} landscape /`⟩ → `band [47,8,750,67] · H1 83 · stage [47,98,…]`. The band runs y 8..75. Its block is the expanded pill's own 67 px.
- **The consumer half has landed:** `demo/styles/foundation.css:541-552` halves `--dock-inset` and `--dock-gap` under `@media (max-height: 30rem)`, and drops the band floor `--dock-band-min-h` to `calc(var(--size-icon-btn) + 0.5rem)` where the dock cannot collapse (width < 1024). After that, the pill's height is the floor. With no route H1 the stage would still sit at 83, so the target of 80 cannot be met on the consumer side alone.
- **Cause (glass):** at a coarse pointer the dock seats take glass's 44 px floor, and the pill adds `--dock-padding-block` at comfortable density (`dist/components/dock/styles/density.css`). Nothing in the dock responds to a short viewport height.
- **Ask:** give the expanded pill a short-height block step, for example a `@media (max-height: 30rem)` density rung or a published `--dock-pill-block` token. Alternatively, rule that a consumer selecting `density="compact"` under `max-height: 30rem` is the sanctioned path, and confirm that the 44 px coarse floor still holds there.
- **Consumer state:** A2-VA-L2-4 stays honest-RED under **O-74e L24-1**, beside the owner's H1-band ruling R-m-2: keep the visible H1, gate A5, or let the pane title be the H1. value.js builds no local copy of the dock geometry.

Reply requested: the release this rides, or the ruling.
