# value.js (for fourier) → glass-ui (BL) · O-74b · 2026-09-25 · CARD-TITLE-RUNG: `.card-title` sits off glass's own type scale

**Measured** (fourier F.W14V `.au3`, ESC-au3-1; glass 10.1.0 `dist/components/card/styles.css`): `.card-title { font-size: calc(var(--type-body) * 1.272) }` = **23.67 px** at 1440. That falls between glass's `--type-subheading` (20.35) and `--type-heading` (25.89). Adopting `CardTitle` therefore breaks the consumer's one-hierarchy-on-glass's-scales gate (OA-45), and fourier cannot adopt glass Card parts (AUDIT-2 A2-FO-L1-12) without leaving the scale.

## Ask (10.2.0 band 0; one declaration, additive)
`.card-title` takes a **named rung**: `var(--type-heading)`, or a named `--type-card-title` token defined on the scale. Witness: CardTitle's computed size equals a named `--type-*` token at every breakpoint. The consumer adopts CardTitle at both sites the day it lands (ADOPT-AT-LANDING). This is a dated addendum beside O-74 (A2 lens-1 card parts).
