# PASS-D — FIRST-PRINCIPLES deep-challenge: iOS-27 GLASS + D6 de-shadcn

**Lane** BD viz / critique / Pass-D · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` · PLANNING — zero `src/` edits.
**Target** W-GLASS-IOS27 · W-GLASS-IOS27-CONTROLS · W-GLASS-EVERY-ELEMENT · the D6 shadcn-residue abrogation.
**Bar** NECESSITY · CORRECTNESS(traced to file:line) · SOTA · NOT-OVERFIT(D7) · WORKS(paints/measures).
**Traced at HEAD** `glass/rim.css` · `tokens/glass-fx.css` · `glass/surfaces.css` · `glass/squircle.css` · `segmented-tabs.css` · `dock/shell.css` · `tokens/dark-arm.css` · `tokens/glass.css` · `scripts/proof-no-shadcn-default.mjs` (RAN) · the 42 `ui/` dirs.

This Pass-D RE-OPENS the existing `critique/glass-ios27.md` at the substance bar — I traced the ACTUAL code, not its claims. It CONFIRMS the existing critique on the headline (the rim is not card-only; the 2-stop kills L/R; the squircle conflicts with AX.W56) and ADDS three findings the existing critique either got STALE or missed entirely: (i) the de-shadcn gate is **systemically blind to the text-token + raw-Tailwind residue** — 12+ live surfaces; (ii) `--glass-fill-tint` IS minted at HEAD (the existing critique §2(d) is STALE on this branch); (iii) the "ONE rim source / three consumers" elegance claim collides with the L/R-silhouette regression — the DRY win is bought by under-delivering the small-surface edge.

---

## (a) THE RIM RE-POINT — is `--glass-rim-top/-bottom` REALLY shared? → YES, 3 surfaces. CONFIRMED.

The fleet2 doc §1.3/§7 frames the directional pair as a CARD-PRIVATE primitive ("the BUTTONS do NOT read them... the primitive the CARD ladder already reads"). **FALSE.** Traced consumers of `--glass-rim-top`/`--glass-rim-bottom`:

| consumer | file:line | reads |
|---|---|---|
| Card/material ladder | `glass/rim.css:79-83` (`--glass-material-rim`) | top (`--glass-rim-ink` compose) + bottom |
| **SegmentedTabs** | `segmented-tabs.css:69`, `:114-115` | top + bottom (indicator + track edge — already iOS-27-wired here) |
| **Dock shell** | `dock/shell.css:157` | `box-shadow: var(--glass-rim-top), var(--glass-rim-bottom), var(--shadow-dock-override, …)` |

So the pair is a SHARED 3-surface primitive (card · tabs · dock). **The token mint lives at `:root` in `glass-fx.css:88-89`.** A literal execution of "lift rim-top to 0.34-0.36α" against that `:root` token bleeds the brightening into card, tabs, AND dock — three surfaces the user never asked to touch. **NECESSITY verdict:** the lift MUST be a button-LOCAL token (`--glass-btn-rim-top` re-declared inside `.btn-glass`, mirroring how `--glass-btn-rim`/`--glass-btn-under-shadow` are already button-scoped at `surfaces.css:200-202`), never the `:root` primitive. The fleet2 doc does not say "button-local" — that is the executable blast-radius gap.

## (b) THE 2-STOP CLAIM — does it kill L/R? → YES, and `.btn-glass` is NOT on the directional pair today. CONFIRMED + sharpened.

The button's CURRENT rim is `--glass-btn-rim: var(--glass-edge-light)` (`surfaces.css:200`) = `inset 0 0 0 0.75px hsl(0 0% 100% / 0.18)` (`glass-fx.css:88-equivalent` / the `--glass-edge-light` decl). That is a **full-perimeter omnidirectional 0.75px ring** — so the button ALREADY has an L/R edge, just a uniform dim one (the user's "L/R too dark" complaint is literally this 0.18α ring being the same on all sides). The proposed pair `inset 0 1px 0 (top)` + `inset 0 -1px 0 (bottom)` is **top/bottom edges ONLY — zero L/R, zero perimeter ring**. On a small pill the L/R curve is a large fraction of the perimeter; dropping it to nothing means the vertical edges lose their light-catching hairline entirely — an un-terminated soft blur over a busy field, the OPPOSITE of "reads as glass." The user said "L/R lighter," not "L/R gone." **CORRECTNESS verdict:** a 3-stop box-shadow (bright-top + faint-bottom + WHISPER-perimeter L/R) keeps the silhouette; the 2-stop substitution's "zero new mechanism, one line" elegance is bought by under-delivering the edge. The π must assert the L/R edge READS (a getComputedStyle box-shadow stop count + a visual gestalt), not merely that it is "lighter." Note also: the dark arm gives the button a FREE 0.40α top (`dark-arm.css:371`) — brighter than the proposed light-mode value; correct (BA.W-DARK-MATERIAL) but the doc is silent, so the "both modes" π must confirm the dark button reads, not just light.

## (c) FLATTER CORNERS — is `corner-shape: superellipse()` Chromium-ONLY? → YES. The Safari-first delta MUST be border-radius. CONFIRMED at source.

`squircle.css:33` states it verbatim: the `@supports (corner-shape: superellipse(2))` block is "an `@supports`-gated ENHANCEMENT (**Chrome 139+, no FF/Safari 2026**)". And `squircle.css:6-19` (AX.W56) **explicitly removed the squircle from buttons**: "Cards, glass buttons, and pills stay ROUND... Do NOT re-add a squircle rule to the card/button/pill surfaces — they are round by policy." So the iOS-27 "flatter button" delta has TWO problems the fleet2 doc conflates: (1) "flatter" = LESS round (a smaller `border-radius` off `--radius-pill` toward `--radius-card`), which is a RADIUS reduction, NOT a higher superellipse exponent — different axes; (2) since superellipse is Safari-absent in 2026 and arch/no-fallback-policy is Safari-FIRST, the believable-glass corner delta on the primary engine **CANNOT be a corner-shape** — it must be `border-radius`. **SOTA verdict:** the real delta is a tokenized `--btn-corner-radius` clean-break re-point against AX.W56 (the dock's `--dock-shape-from/-to` precedent, `dock/shape.css`), recorded as a clean break, NOT a "W-SQUIRCLE consume." Also: the fleet2 doc names "W-SQUIRCLE (Band 7)" but the union roster carries `W-CORNER-AA-WIDEN` — resolve the phantom wave name before execution.

## (d) THE SHADCN-RESIDUE CENSUS — the gate is SYSTEMICALLY BLIND to text-tokens + raw-Tailwind. NEW finding (the existing critique missed the gate-blindness).

I RAN `proof:no-shadcn-default` — it is **fully GREEN** (233 ui/ files, 0 forbidden, all 4 born-RED witnesses retired). But the gate's `FORBIDDEN` list (`proof-no-shadcn-default.mjs:72-143`) is only EIGHT tokens — all BACKGROUND/RING/RADIUS: `bg-background · border-input · ring-ring · ring-2 · ring-offset · rounded-md · shadow-sm-utility · bg-(muted|secondary|primary|accent)` (leading-only). It has **NO `text-*-foreground` entry and NO raw-Tailwind-color entry**. So the GREEN is over a NARROW axis and the live residue is broader:

- **`text-popover-foreground` — 12 surfaces, gate-BLIND** (`tooltip · hover-card · dropdown-menu{,Sub} · combobox · context-menu{,Sub} · select · command` content panels). This is shadcn's neutral popover-text token — exactly the D6 "100% of the material from first principles" mandate's target, and the gate cannot see it.
- **`text-accent-foreground` on the toggle ON-state** (`toggle/index.ts:40`, `data-[state=on]:bg-accent data-[state=on]:text-accent-foreground`) — the `bg-accent` half is a STATE arm the gate DEFERS by design (`:140` negative-lookbehind rejects the `:` variant), and the `text-accent-foreground` half is invisible. So the toggle ON-state is fully un-reskinned shadcn and GREEN.
- **The close-X chips** (`DialogContent.vue:187` `rounded-sm … data-[state=open]:bg-accent data-[state=open]:text-muted-foreground`; `SheetContent.vue:135` `rounded-sm … data-[state=open]:bg-secondary`) — `rounded-sm` is NOT `rounded-md` (gate-blind), and the bg-halves are STATE arms (deferred). The close-X is shadcn-shaped and GREEN.
- **`ToastClose.vue:24`** carries raw-Tailwind `group-[.destructive]:text-red-300` + `text-red-50` — raw palette colors off the house token system entirely; no rule in FORBIDDEN catches raw `text-red-N` (the existing critique never mentions this).
- **DataTable** (`DataTable.vue:159,177,247`) carries `rounded-lg border border-border … hover:bg-muted/40` (4 sites) — `rounded-lg` is gate-blind, `bg-muted/40` is a translucent escape the gate excludes (`:140` `(?![\w/-])`). This is a glass-cohesion-axis concern the de-shadcn gate punts and cohesion's `continue`-on-no-marker (`proof-glass-cohesion.mjs:137`) ALSO skips (no glass marker present). Doubly un-covered.

**NOT-OVERFIT(D7) verdict:** the gate is a real bar on its 8 tokens, but the D6 mandate ("NO shadcn-neutral token survives in the visual layer") is OVERSOLD by a gate that polices only bg/ring/radius. A W-DESHADCN-SWEEP must (1) ADD `text-popover-foreground`/`text-*-foreground`/`text-muted-foreground` (as a base-surface text token, deferring state arms like menuItemVariants' sanctioned escape) and raw-Tailwind `text-red-N`/`bg-emerald-N` to FORBIDDEN, (2) name `rounded-lg`/`rounded-sm` (the gate has `rounded-md` only — an incomplete radius set), (3) reskin the toggle ON-state + the two close-X chips + ToastClose. The existing critique §4 names `rounded-lg`/`rounded-sm` but MISSES the 12-surface text-token blindness and the raw-Tailwind — the bigger hole.

## (e) D6 — does any delta THIN the glass? + the inset-trap. → ONE soften flirts with thinning; the trap is correctly pre-empted.

D6 is KEEP+DEEPEN, never thin. Two risks:
- **The under-shadow soften** (fleet2 (b): `--glass-btn-under-shadow` quiet→wash drop) MOVES the depth toward LIGHTER, flirting with thinning the lifted-lozenge read — the exact D6 violation. The user asked for "lighter INNER drop-shadow," which is legitimate, but the wave must KEEP the rim+blur depth (deepen) while softening only the inner shadow — the π must prove the button still reads THICKER, not flatter. Pair it with the deep-glass `.btn-glass.glass-deep` arm (`surfaces.css:224`) so the hero CTA DEEPENS even as the inner shadow lightens — that is the honest "lighter shadow on DEEPER glass."
- **The light-dark()-inset trap on new tokens** — CORRECTLY pre-empted at the existing mint: `glass-fx.css:84-85` documents "Plain per-mode arms — NEVER an inset fragment inside light-dark()", and the dark arm re-declares in `dark-arm.css:371-372` (plain `.dark` arms, not `light-dark()`). Any NEW button-local rim token (`--glass-btn-rim-top`) MUST follow the same plain-per-mode-arm idiom — a `light-dark(inset …, inset …)` would compute the WHOLE box-shadow to `none` (MEMORY: lightdark_inset_shadow). This is a standing trap, not a current defect.
- **STALE in the existing critique:** §2(d) claims `--glass-fill-tint` does NOT exist at HEAD. On THIS branch it is MINTED — `tokens/glass.css:376` (`@property --glass-fill-tint`, BE.W-TINTED-CHIP) + the axis at `:280-283`. So the IconChip glass-arm's cross-wave ordering dep the existing critique flags is ALREADY satisfied; the dep is resolved, not open.

---

## BLAST-RADIUS / RESIDUE / D6-RISK LEDGER (executable)

1. **Button rim lift → button-LOCAL token only** (`--glass-btn-rim-top` in `.btn-glass`), NEVER the `:root` `--glass-rim-top` (3-surface bleed: card+tabs+dock).
2. **2-stop → 3-stop** (bright-top + faint-bottom + whisper-perimeter L/R); π asserts L/R READS.
3. **Flatter corner = `border-radius` clean-break** (Safari-first; superellipse is Chrome-139-only), recorded against AX.W56; resolve W-SQUIRCLE/W-CORNER-AA-WIDEN phantom.
4. **De-shadcn gate WIDEN:** + `text-popover-foreground` / `text-*-foreground` / raw `text-red-N` to FORBIDDEN; + `rounded-lg`/`rounded-sm`; reskin toggle ON-state + 2 close-X chips + ToastClose + DataTable.
5. **Under-shadow soften must DEEPEN net** (lighter inner shadow ON deeper blur), not thin; new tokens via plain per-mode arms (inset-trap).
