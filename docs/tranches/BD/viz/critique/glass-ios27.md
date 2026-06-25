# CRITIQUE — W-GLASS-IOS27 + CONTROLS (D6) — RUTHLESS / ADVERSARIAL

**Lane** BD viz / critique · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` · PLANNING — zero `src/` edits.
**Target docs** `fleet2/glass-ios27-buttons-icons-controls.md` · `union/waves/BD.W-CONTROL-GLASS.md` · `union/waves/BD.W-GLASS-EVERY-ELEMENT.md`
**Substrate verified at HEAD** `glass-fx.css` · `glass/rim.css` · `glass/surfaces.css` · `glass/squircle.css` · `glass/control-surfaces.css` · `dock/shell.css` · `dock/shape.css` · `segmented-tabs.css` · `tokens/dark-arm.css` · `scripts/proof-no-shadcn-default.mjs` · the ui/ component set.

---

## VERDICT SUMMARY

The headline "1-line `--glass-btn-rim` re-point" is **elegant but MIS-FACTED on blast radius** — the directional pair is NOT card-only, and the re-point as written carries a real legibility regression. The 5 token-deltas are mostly genuinely token-first, with TWO exceptions that DO need a seam decision. The shadcn-residue ledger is **INCOMPLETE / STALE**. The inset-shadow trap is CORRECTLY pre-empted at the token mint but the wave must not re-introduce it. D6 is honored in spirit but one delta (the under-shadow soften) flirts with thinning the depth.

---

## 1. THE HEADLINE RE-POINT — BLAST RADIUS (the plan's central factual error)

### 1.1 The plan's claim is FALSE — `--glass-rim-top`/`--glass-rim-bottom` is NOT card-only

The fleet2 doc §1.3 and §7 state verbatim: *"The CARD ladder reads them (rim.css)... The BUTTONS do NOT"* and *"the primitive the CARD ladder already reads."* This frames the directional pair as a card-private primitive the button is being introduced to.

**That is wrong.** The directional pair has FOUR live consumers at HEAD (verified grep, src-only, comments stripped):

| consumer | site | reads |
|---|---|---|
| Card ladder | `glass/rim.css:80-83` (`--glass-material-rim`) | top + bottom |
| **SegmentedTabs** | `segmented-tabs.css:69, 114-115` | top + bottom (the indicator + the track edge — iOS-27 top-light/bottom-shadow already wired here) |
| **Dock shell** | `dock/shell.css:157` | `box-shadow: var(--glass-rim-top), var(--glass-rim-bottom), var(--shadow-dock)` |
| Card ladder (dark accent) | `glass/rim.css:104` | top (dark accent compose) |

So `--glass-rim-top`/`--glass-rim-bottom` is **already a shared 3-surface directional-edge primitive** (card · tabs · dock). The button is the FOURTH consumer, not the second. This MATTERS:

- **The §1.3 proposal to "lift rim-top to 0.34-0.36α on the button-scope"** is fine IF it is genuinely button-scoped (`--glass-btn-rim` re-declares a button-LOCAL token). But the fleet2 doc is sloppy about scoping — it says *"the rim-top can lift to 0.34-0.36α on the button-scope"* without naming WHERE. If an executing agent lifts the GLOBAL `--glass-rim-top` (the `:root` value in glass-fx.css:88) it bleeds into the card, the tabs indicator, AND the dock — three surfaces the user never asked to brighten. **The wave MUST mint a button-local `--glass-btn-rim-top` override, NOT touch the shared `:root` primitive.** The fleet2 doc does not say this explicitly; that is a planning gap that will produce a 3-surface regression if executed literally.

### 1.2 The re-point itself carries a LEGIBILITY REGRESSION the plan glosses

The current `.btn-glass` rim is `--glass-edge-light` = `inset 0 0 0 0.75px hsl(0 0% 100% / 0.18)` — a **full-perimeter 0.75px ring**. The proposed pair is `inset 0 1px 0 (top)` + `inset 0 -1px 0 (bottom)` — **top and bottom EDGES ONLY, no L/R, no perimeter ring**.

The fleet2 doc SELLS this as a win ("L/R edges drop to the faint border ink only — lighter"). But a button is a SMALL surface, and removing the L/R ring means **the vertical edges of the button lose their light-catching hairline entirely** — over a busy/dark field the button's left and right sides will read as an un-terminated soft blur, no silhouette. On a card (large, low-curvature long runs) the top/bottom-only rim reads fine because the eye reads the horizontal runs as the plate edge; on a pill/short button the L/R curve is a large fraction of the perimeter and NEEDS an edge. **The card precedent does not transfer to the button geometry.** The user's complaint was "L/R too DARK," not "L/R should vanish" — dropping them to zero over-corrects. The honest fix is a directional pair PLUS a faint L/R ring (a 3-stop box-shadow: bright-top, faint-bottom, whisper-perimeter), not a 2-stop top/bottom-only. The plan's "ZERO new mechanism, one-line substitution" elegance claim is bought by under-delivering the silhouette. **This must be decided on real pixels (paint-first), and the π must assert the L/R edge still READS, not just that it is "lighter."**

### 1.3 Dark-arm coupling — the re-point inherits the dark values FOR FREE, which is correct but unstated

The dark arm re-declares `--glass-rim-top: 0.40α` (dark-arm.css:371). A button re-pointing onto the pair inherits 0.40 in dark — BRIGHTER than the proposed light-mode 0.30-0.36. That is actually correct (dark glass glows where light passes, BA.W-DARK-MATERIAL). But the fleet2 doc never mentions the dark arm gives the button a free 0.40 top — so the π's "both modes" assert must confirm the dark button reads, not just light. Minor, but the doc's silence on it means an agent could be surprised.

---

## 2. THE 5 TOKEN-DELTAS — token-first-no-new-seam, or each needs a seam?

| delta | genuinely token-first? | verdict |
|---|---|---|
| **(a) `--glass-btn-rim` → directional pair** | YES (substitution) but see §1.1/§1.2 — needs a button-LOCAL override + the L/R silhouette decision | **token-first WITH a scoping/silhouette caveat** |
| **(b) `--glass-btn-under-shadow` soften (quiet→wash drop) + compose `--glass-specular` inset-white top** | the soften is token-first (re-point the existing `--glass-under-shadow-*` tier). BUT composing `--glass-specular` into the REST box-shadow is **a new box-shadow stop in the `.btn-glass` rule**, not a token re-point — `.btn-glass` box-shadow today is `var(--glass-btn-rim), var(--glass-btn-under-shadow)` (2 stops); adding `var(--glass-specular)` is a THIRD stop edit to the rule. That is still cheap and on the existing seam, but it is a RULE EDIT, not a pure token substitution. The doc's "ONE override" framing is slightly oversold. | **mostly token-first; the specular-compose is a rule edit (acceptable, but not "zero mechanism")** |
| **(c) `--glass-superellipse-n` / flatter squircle** | **NO — and it CONFLICTS with shipped policy.** See §3 below. This is the most dangerous delta. | **NEEDS a policy reversal, not a token** |
| **(d) bleed-through (icon shine / `--glass-fill-tint`)** | token-first IF `--glass-fill-tint` already exists as W-TINTED-CHIP's axis. It does NOT exist at HEAD (grep: zero `glass-fill-tint`; the only "bleed-through" hit is a glass.css COMMENT). So the IconChip glass arm depends on a token W-TINTED-CHIP must mint FIRST — a hard cross-wave ordering dependency the fleet2 doc asserts ("the chip is TINTED-CHIP's genuine ≥2nd consumer") but does not gate. | **token-first ONLY after W-TINTED-CHIP mints the axis — ordering dep, currently un-minted** |
| **(e) `--glass-under-shadow-control` (the new `.glass-control-track` register)** | This is a NEW register + likely a NEW token. The fleet2 doc §4.2 admits *"a `.glass-control-track` register does NOT exist at HEAD."* So this is a genuine MINT (new class + the control-track tokens mirroring `--control-surface-*`), not a substitution. Cheap (it mirrors the existing `.input-pill`/`.control-surface` form-rest register in control-surfaces.css), but it IS new surface. | **genuine new register — honest about it; acceptable but not "no new seam"** |

**Net:** 3 of 5 are genuinely token-first substitutions; (c) needs a POLICY reversal; (d) needs an upstream mint; (e) is a candid new register. The doc's blanket claim *"Every delta is a substitution... no new compositing axis"* (§5.3) is **only partially true** — it holds for the COMPOSITING axis (no new blur/tint layer) but NOT for "no new token / no new rule edit."

---

## 3. THE SQUIRCLE DELTA (1.2) — CONFLICTS WITH SHIPPED AX.W56 POLICY (the buried landmine)

The fleet2 doc §1.2 wants "flatter tops/sides = lower squircle exponent... nearer `--radius-card` than `--radius-pill`," deferred to W-SQUIRCLE.

**At HEAD, `glass/squircle.css` (AX.W56) explicitly REMOVED the squircle from buttons:** *"Cards, glass buttons, and pills stay ROUND... the superellipse is imperceptible at a 16px card radius or a stadium pill, so the squircle on those surfaces was visual cost without read... Do NOT re-add a squircle rule to the card/button/pill surfaces — they are round by policy."*

So the iOS-27 "flatter squircle button" ask is in **DIRECT TENSION with a shipped, documented, gate-fenced policy** that says the squircle is imperceptible on a pill and was deliberately removed. Three problems the fleet2 doc does not confront:

1. **"Flatter tops/sides" is NOT "more squircle" — it may be LESS radius.** The user's ask reads as "less rounded" (a tighter corner, more rectangular run) — that is a SMALLER `border-radius` (off `--radius-pill` toward `--radius-card`), which is the OPPOSITE of adding a superellipse. The fleet2 doc conflates "flatter" with "squircle exponent" — they are different axes. A flatter button is a less-round RECTANGLE, and AX.W56 already says the superellipse is invisible there. **The squircle is a red herring; the real delta is a radius reduction on the rectangular glass-button variants** — which is a clean-break radius re-point (no-legacy OK), NOT a W-SQUIRCLE corner-profile consume.
2. **This is a no-legacy / clean-break collision.** Changing the button radius off `--radius-pill` reverses the stadium-pill identity for those variants. That is a real visual identity change the user asked for, fine — but it must be recorded as a CLEAN BREAK against AX.W56, not folded silently into "W-SQUIRCLE owns it." The dock already has the generalized `--dock-shape-from/-to` corner-profile lerp (dock/shape.css) as the precedent pattern; the button should get a tokenized `--btn-corner-radius` the same way, NOT inherit a squircle exponent.
3. **W-CORNER-AA-WIDEN (the BD union wave) is about corner-AA, not radius.** The fleet2 doc points the flatter-corner at "W-SQUIRCLE (Band 7)" but the only corner wave in the union is `BD.W-CORNER-AA-WIDEN`. Either W-SQUIRCLE is a phantom (struck like W-DOCK-WIRE / useLiquidMorph per the 1c fold) or the doc is naming a wave that does not exist in the roster. **Resolve the wave name.**

---

## 4. THE SHADCN-RESIDUE LEDGER — INCOMPLETE / STALE

The critique prompt's named ledger (`bg-popover / bg-accent / rounded-lg / rounded-sm`) is **already mostly retired or mis-targeted**, and the live residue is BROADER. Verified census:

- **`bg-popover`** — **ALREADY GONE.** The only hit is a COMMENT in `Command.vue:38` (*"flat bg-popover"* — describing the retired state). Listing it as a live residue is STALE.
- **`bg-accent`** — LIVE but DELIBERATE in `_shared/menuItemVariants.ts:76-79` (the `accent` ESCAPE arm of the menu-glass register — the explicit flat-accent opt-out, BA.W-MENU-GLASS). Also live in `toggle/index.ts:40` (`data-[state=on]:bg-accent`) and `DialogContent.vue:187` (`data-[state=open]:bg-accent` on the close-X). The menu one is SANCTIONED (an opt-out, not residue); the toggle + dialog-X ones are GENUINE residue the ledger should name but does not.
- **`rounded-lg`** — LIVE in `alert/index.ts:11` and `data-table/DataTable.vue:159,177,247` (4 sites). Genuine residue (should be `rounded-card`/`rounded-panel`). The ledger names it; the doc does not enumerate WHERE.
- **`rounded-sm`** — LIVE in `Separator.vue:70`, `DialogContent.vue:187`, `SheetContent.vue:135` (the close-X chips). Genuine but tiny.

**The residue the ledger MISSES entirely (the real frontier):**
- `bg-secondary` — `ToastAction.vue:26`, `TagsInputItem.vue:20`, `avatar/index.ts:8`, `badge/index.ts:19`, `SheetContent.vue:135 (data-[state=open])`, `progress` rail. (avatar/badge are allowlisted; the others are residue.)
- `bg-muted` — `Skeleton.vue` (allowlisted), `TableRow.vue:14`, `SelectSeparator.vue` (comment), `DataTable.vue:177`, `toggle hover:bg-muted`.
- `bg-background` — the close-X / number-field / toast tail (partly retired, partly live; the gate tracks it).
- `hover:bg-secondary` on Toast/Dialog/Sheet close-X — a recurring cold-neutral hover the ledger never names.

**Verdict:** the named ledger is a STALE 4-token list; the actual de-shadcn frontier is the **close-X chip family (Dialog/Sheet `hover:bg-secondary`/`bg-accent`/`rounded-sm`)** + the **DataTable `rounded-lg`/`hover:bg-muted` slabs** + the **Toast/TagsInput `bg-secondary`** — none of which the fleet2 doc enumerates. W-DESHADCN-SWEEP must census the FULL `proof:no-shadcn-default` red surface, not a 4-item list. (The gate already exists at 404 lines with a real allowlist — the wave should DRIVE off the gate's reds, not a hand-list.)

---

## 5. ABROGATING bg-popover — LEGIBILITY (bleed-through vs readability)

Largely moot since `bg-popover` is already retired (Command rode `bg-popover` → glass; verified comment). But the GENERAL legibility risk the prompt names IS real for the menu/popover/dropdown family: **a glass popover over a busy aurora field bleeds the field through the menu rows.** The existing answer is sound (the W55 `--glass-tint-*` bright-bucket darken + the `.glass-menu-row` element-level oklab tint — BA.W-MENU-GLASS), so abrogating the opaque `bg-popover` does NOT break legibility BECAUSE the darken-over-light seam carries the contrast. **The risk surfaces only if a NEW glass surface (the `.glass-control-track`, the glass IconChip) abrogates its opaque fill WITHOUT wiring the W55 tint seam.** The fleet2 doc §4.2 says the control-track "mirrors `.input-pill`/`.control-surface`" which DOES read the tint seam — good. But the IconChip glass arm (§3.2) reads `--glass-fill-tint` (un-minted) — if that axis does not compose the bright-bucket darken, a glass chip's glyph over a bright field drops contrast. **The π must assert the glyph clears 4.5:1 over a bright field, not just that the chip "has a rim."**

---

## 6. IS D6 HONORED? (glass KEPT + deepened, only shadcn STYLING abrogated)

Mostly YES, with ONE delta that flirts with thinning glass:

- **(rim re-point)** — KEEPS glass, deepens the directional read. Honored — EXCEPT the L/R-vanish (§1.2) thins the silhouette, which is thinning glass IDENTITY (a glass plate has edges on all four sides). **Borderline D6 violation** if executed as top/bottom-only.
- **(under-shadow soften, §1.1/2.b)** — softening `--glass-btn-under-shadow` quiet→wash REDUCES the depth drop. The doc argues the bright inset-top specular COMPENSATES (depth via highlight, not drop). That is the correct iOS-27 model (inner light, not inner dark). But it is a TRADE — less grounding shadow for more top highlight. If the compensating specular is not composed in the SAME wave, the button reads FLATTER (thinner glass) for a window. **D6 holds only if (rim) + (under-shadow soften) + (specular compose) land TOGETHER, never partially.** The wave must be atomic.
- **(control-track / icon-chip glass)** — these ADD glass where there was none. Pure D6 win.
- **(squircle/radius)** — neutral to glass identity (corner geometry, not material).

**Net:** D6 is honored IFF the rim keeps a faint L/R edge and the button refinements land atomically. A partial land = thinner glass = D6 violation.

---

## 7. THE INSET-SHADOW LIGHT-DARK() TRAP (the MEMORY note)

**Correctly pre-empted at the token mint.** glass-fx.css:84-85 carries the explicit warning and the rim arms are PLAIN PER-MODE (the `:root` default in glass-fx.css:88-89 + the full re-declaration in dark-arm.css:371-372) — NOT a `light-dark()` fragment. Verified: zero `light-dark()` wrapping the rim tokens.

**The trap re-opens IF the wave does any of:**
1. Wraps the new `--glass-btn-rim-top` button-local lift in a `light-dark()` (e.g. `--glass-btn-rim-top: light-dark(inset 0 1px 0 …light, inset 0 1px 0 …dark)`) — the inset fragment computes the WHOLE box-shadow to `none`. The button-scope lift MUST be plain per-mode (a `:root .btn-glass` default + a `.dark .btn-glass` override), mirroring the glass-fx idiom.
2. Mints the `.glass-control-track` rim/specular via `light-dark()` — same trap.
3. Composes the IconChip glass rim via `light-dark()`.

**Binding fence for the wave:** every NEW rim/specular/inset token introduced (button-local lift, control-track, icon-chip) is PLAIN PER-MODE (`:root` + `.dark` arm), NEVER a `light-dark()` inset fragment. The π's "both modes" assert is the catch — but the SOURCE gate (`proof:no-shadcn-default` or a new `proof:btn-edge`) should also census for `light-dark(` adjacent to `inset` on the new tokens (a cheap source bite preventing the 4th recurrence of the documented trap).

---

## 8. ADDITIONAL ADVERSARIAL FINDINGS

- **The `destructive` colored-glass tail (§2.1) is hand-waved.** It says "destructive = glass with `--tone: var(--destructive)`" but `bg-destructive text-destructive-foreground` is the SHIPPED button + the `--destructive-foreground` ink is calibrated for the OPAQUE slab. A colored-glass destructive button must re-derive its label contrast over the TRANSLUCENT tinted plate (the W-FEEDBACK-TONE `color-mix 18%` is a TINT, not an opaque fill) — the label ink may drop below 4.5:1. This is a real legibility decision the doc defers to "W-DESHADCN-SWEEP fold" without flagging the contrast re-derivation. Not free.
- **The checkbox/radio 16px glass "decide on pixels" (§4.2) is the honest move — KEEP it honest.** Both are `h-4 w-4` (16px). The AX.W54 allowlist rationale (16px glass reads muddy over a flat substrate) is sound. The fleet2 doc correctly says "verify at π, honest hold if muddy." The adversarial risk: an executing agent FORCES glass to satisfy "glass for every element" and ships a muddy 16px box. **The wave's acceptance must allow the opaque hold as a PASS, not a miss** — the gate must not punish the honest hold.
- **The `:root` rim primitive is shared across LIGHT and the L/R-vanish hits the dock too.** Wait — re-confirm: the rim re-point is button-LOCAL (`--glass-btn-rim`), so the dock (which reads `--glass-rim-top` directly in shell.css:157) is NOT touched by the button re-point. GOOD — but ONLY if §1.1 is honored (button-local token, not `:root` lift). If an agent lifts `:root --glass-rim-top` to 0.36, the dock's top edge brightens unasked. The dependency is the scoping discipline; the doc must state it.
- **`proof:ba-gestalt` is the right acceptance bar** (the doc names it for "does it read as glass") — correct, paint-first, ≥2-consumer met by construction (button + chip + control all re-point the directional pair). No objection.

---

## 9. THE BINDING ASKS FOR THE WAVE (what the planner must fix)

1. **Re-fact the headline:** the directional pair is a 3-surface shared primitive (card · tabs · dock), not card-only. The button is the 4th consumer. The lift MUST be button-LOCAL (`--glass-btn-rim-top`), never a `:root` edit.
2. **The L/R silhouette:** the rim re-point must KEEP a faint L/R edge (3-stop: bright-top, faint-bottom, whisper-perimeter), not drop to top/bottom-only — verify the L/R reads on real pixels (D6: a glass plate has 4 edges).
3. **The squircle is a red herring:** "flatter" = a RADIUS reduction (clean break off `--radius-pill`), NOT a superellipse exponent (AX.W56 already removed the squircle from buttons as imperceptible). Resolve the W-SQUIRCLE vs W-CORNER-AA-WIDEN wave name.
4. **The residue ledger is STALE:** drive W-DESHADCN-SWEEP off the FULL `proof:no-shadcn-default` red surface (close-X chip family + DataTable slabs + Toast/TagsInput `bg-secondary`), not the dead 4-token list. `bg-popover` is already gone.
5. **The IconChip glass arm depends on un-minted `--glass-fill-tint` (W-TINTED-CHIP)** — gate the ordering; assert glyph 4.5:1 over a bright field.
6. **Atomicity:** rim + under-shadow soften + specular compose land TOGETHER or the button reads thinner (D6 violation).
7. **The inset trap:** every new rim/specular token is PLAIN PER-MODE, never `light-dark()` inset — add a cheap source bite.
8. **Honest opaque hold for 16px checkbox/radio is a PASS, not a miss.**
