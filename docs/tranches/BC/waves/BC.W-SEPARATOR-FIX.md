# BC.W-SEPARATOR-FIX — the Separator label-centering rebuilt + the /display/separator page re-authored
- **Band:** 5 · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** AFTER BC.W-GLASS-IDENTITY + BC.W-BLACK-BAR (the rebuilt `<Card>` material the page hosts on). BESIDE BC.W-PADDING-CANON (the re-authored page's cards ride the φ ladder) + BC.W-GHOST-DASHED (rounded-everywhere verifies the page's corners) + BC.W-CODE-BLOCKS (the page's token names → `<Code>`). This is a SELF-CONTAINED fix (a component label-layout repair + a single demo-page re-author) with no downstream dependents.
- **Owns / closes:**
  - USER-DEFECTS §C: *"`/display/separator` is TOTALLY broken."*
  - USER-DEFECTS §C: *"Text not centered (a specimen page)."* (the Separator label-centering is the root; the separator page is the specimen.)
  - ORCHESTRATION §1 Band 5 box: `BC.W-SEPARATOR-FIX — /display/separator rebuilt; text centering`.
  - route-census §4: `/display/separator` ("TOTALLY broken" + text centering; raw `rounded-card border border-border bg-card p-6` divs instead of `<Card>`).

## Goal (the gestalt)
A developer opening `/display/separator` sees a clean, correct specimen page: a horizontal rule that is a crisp warm hairline; a LABELLED rule ("or") where the label sits PERFECTLY centered on the line — the text reads at its normal size, vertically and horizontally centered, with the rule visibly split around it (the classic "─── or ───" divider), NOT a squished 1px-tall sliver with the label clipped or off-center. The vertical separators in the flex row read as crisp vertical hairlines. The page itself is built from real `<Card>`s on the rebuilt glass material (not raw `bg-card` divs), correctly padded + rounded. When the user reads "TOTALLY broken" + "text not centered," they instead see a textbook separator gallery where every label is dead-centered on its rule.

## Starting state (measured, file:line)
**The Separator label-centering is broken at the COMPONENT** (`src/components/ui/separator/Separator.vue`, full file read):
- The label is an ABSOLUTE span over a 1px line: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center` + the orientation arm `h-[1px] py-1 px-2` (horizontal).
- **THE BUG:** the label span is forced to `h-[1px]` (the line's own height). The text content (`text-xs`, ~12px tall) OVERFLOWS that 1px box; `items-center` + `py-1` cannot vertically center text inside a 1px-tall flex box — the text sits squished/mis-aligned on the hairline. This is the "text not centered."
- **THE SECOND BUG:** the label uses `bg-background` to "mask" the rule behind it (the classic absolute-over-line trick needs the label's background to occlude the line so it reads as split). But on a GLASS/transparent host (the rebuilt material) `bg-background` does NOT reliably occlude — the line shows THROUGH the label, so it reads as "text floating on an unbroken rule" not "─── or ───." On the rebuilt translucent material this is worse (the line bleeds through).
- The `vertical` arm (`w-[1px] px-1 py-2`) has the same 1px-pinned overflow class for a vertical label.
- Net: the labeled separator is "TOTALLY broken" — the absolute-1px-pinned-span architecture cannot center a normal-size label, and `bg-background` cannot occlude on glass.

**The /display/separator PAGE bypasses the chassis** (`demo/stories/display/separator.vue`, 74 lines, full file read):
- Four `StorySection`s each wrap their demo in a RAW `<div class="rounded-card border border-border bg-card p-6">` (`separator.vue:11,24,33,48-50`) — NOT a `<Card>`. So the page hosts on raw divs with a hardcoded `bg-card` opaque plate (the grey-slab risk) + an ad-hoc `p-6` (off the φ ladder) + a manual `rounded-card` (instead of the Card's own corner).
- The labeled demo (`separator.vue:26`): `<Separator class="my-6" label="or" />` — the broken-label witness.
- The section-label copy pattern (`separator.vue:47-72`) uses 3 raw `bg-card` divs with `<Separator>` between sub-blocks.

## Target spec (grounded)
TWO fixes — the COMPONENT label-layout (the root) + the PAGE re-author (the witness):

**1. The Separator label-centering — rebuild the labeled arm as a real split-rule flexbox** (the architectural transposition, not a patch). A labeled separator is NOT a line with an absolute label floated over it — it is a FLEX row of `[rule] [label] [rule]` (horizontal) / a flex column (vertical), the label naturally centered by the flexbox, the two rule segments growing to fill (`flex-1`). The reka `Separator` primitive is `role="separator"` / `aria-orientation`; the label arm wraps it correctly:
- **Horizontal labelled:** `<div class="flex items-center gap-3">` → `<span class="h-px flex-1 bg-(--separator-ink)">` + `<span class="text-mono-caption text-muted-foreground shrink-0">{label}</span>` + `<span class="h-px flex-1 bg-(--separator-ink)">`. The label is centered by the flex layout, at its NORMAL size (no 1px pin, no overflow), the rule visibly split around it. NO `bg-background` occlusion trick — the rule is genuinely two segments, so it works on ANY host (glass or opaque).
- **Vertical labelled:** the same as a flex COLUMN (`flex-col`), the label centered between two vertical rule segments.
- **Un-labelled:** the simple `<Separator>` stays the reka primitive's single hairline (a crisp warm hairline — `bg-(--separator-ink)` reading the warm-ink rim register, NOT a grey `bg-border`; coordinates with the BA.W-NO-GRAY warm identity).
- The `--separator-ink` is the warm hairline token (read off the existing `--border-soft`/warm-rim family — NOT a new token if one exists; the rule must read warm, the BA.W-NO-GRAY floor).
- a11y preserved: reka `Separator role="separator"` + `aria-orientation`; the label is the accessible name (`aria-label` or the visible label text). The `decorative` case (no semantic separation) stays role-free.

**2. The /display/separator page re-author** — the raw `bg-card` divs become real `<Card>`s (the rebuilt glass material, the φ padding via the family slots, the Card's own rounded corner). The page demos: a plain horizontal rule, a labelled rule (the fixed-centering witness), a vertical-in-flex-row, and the section-label copy pattern — each in a `<Card>`, each correct. Routes through the standardized chassis (BC.W-PAGE-CHASSIS owns the hero/scroll-shrink; this owns the body re-author + the Card hosting).

The fix is GESTALT: the labeled separator's broken absolute-1px architecture is REPLACED by the correct split-rule flexbox (the textbook divider layout), not patched with a taller label box. KISS — a flex row of three spans is simpler AND correct.

## Mechanism / files
- **REBUILD** `src/components/ui/separator/Separator.vue`'s labeled arm: the `props.label` branch renders the split-rule flex layout (horizontal: flex row `[rule flex-1][label][rule flex-1]`; vertical: flex col), the label centered by flexbox, the rule as two `bg-(--separator-ink)` segments. The un-labelled arm stays the reka single-hairline primitive. Retire the absolute-1px-pinned span + the `bg-background` occlusion trick (clean break).
- **DECIDE `--separator-ink`** — reuse the existing warm-rim/border-soft token if one resolves the warm hairline; else the rule reads `color-mix(in srgb, var(--foreground) N%, transparent)` (the BA.W-NO-GRAY warm hairline, NOT `bg-border` grey). Recorded.
- **RE-AUTHOR** `demo/stories/display/separator.vue` — the 4 raw `bg-card` divs → `<Card>` (rebuilt material, φ padding via slots, rounded by construction); the labelled demo is the fixed-centering witness; token/component names → `<Code>` (BC.W-CODE-BLOCKS coordinated); routes through the chassis (BC.W-PAGE-CHASSIS coordinated for the hero).
- **MINT `proof:separator`** (device-free) — the label-architecture + the warm-rule + the page-uses-Card asserts. The label-centering PAINT is the π's binding truth (an absolute-1px-pinned label is the source-green/visually-broken class the BC paint-first model catches).
- **NO reka substrate change** — the `<Separator>` primitive's `role`/`orientation`/`decorative` props are reka's; this wraps them correctly. The `DockSeparator` (`custom/dock/DockSeparator.vue`) is a DISTINCT dock-divider component — byte-untouched (the fence; the rail-seam anchor lives there, Band 2's surface).

## Acceptance (gestalt + measured + gate)
1. **Captured-paint gestalt (dev-tools MCP, both modes):** a screenshot of `/display/separator` shows the labelled rule with the label "or" PERFECTLY centered on the line, at normal text size, the rule visibly split around it (─── or ───), NOT squished or clipped; the plain + vertical separators are crisp warm hairlines; every demo sits in a correctly-padded rounded `<Card>` on the glass material. A human confirms "the separator page is correct now, the text is centered." On a GLASS host the split-rule reads correctly (no line bleeding through the label — the occlusion-trick failure mode is gone).
2. **Machine gate `proof:separator`** (device-free, born-RED on the pre-fix tree → GREEN at close):
   - S1 — the labeled `Separator` arm renders a FLEX split-rule (`flex` + two `flex-1` rule segments + the label shrink-0), NOT an absolute-positioned label (`absolute`/`-translate-x-1/2` on the label span is GONE — the broken architecture retired; an `absolute` label REDs).
   - S2 — the rule reads a WARM hairline (`--separator-ink` / `color-mix(... --foreground ...)`, NOT a bare `bg-border` grey — `proof:no-gray` adjacency).
   - S3 — NO `bg-background` occlusion-mask survives on the label (the trick that fails on glass is gone).
   - S4 — `demo/stories/separator.vue` hosts each demo in a `<Card>` (zero raw `rounded-card border border-border bg-card` div; grep exit 1), φ-padded (no ad-hoc `p-6`), routed through the chassis.
   - S5 — the `DockSeparator` is byte-untouched (the dock divider fence).
   - + a self-test bite: a synthetic re-added `absolute ... -translate-x-1/2` label REDs S1; a synthetic raw `bg-card` div in the page REDs S4.
3. **π readback `tests-visual/separator.spec.ts`** (both modes, chromium + WebKit): the labelled separator's label is vertically + horizontally centered on the rule (the label's bounding-box center == the rule's center-line, within tolerance — the binding "text centered" truth); the rule reads as two visible segments split around the label (a luminance scan finds rule-pixels on BOTH sides of the label, none THROUGH it); the rule color resolves warm (chroma>0). The page's cards paint translucent-glass (α<0.92 over the backdrop — the rebuilt material, not a grey slab). Live-verify = a captured delta via the dev-tools MCP, never a commit claim.

## Fences / invariants (must NOT regress)
- **Clean break, NO alias** (MEMORY no-backwards-compat): the absolute-1px-pinned label + the `bg-background` occlusion trick are RETIRED, not patched; the labeled arm is rebuilt as the correct split-rule flexbox.
- **Architectural transposition, not a patch** (MEMORY architectural-approach): the fix REPLACES the broken absolute layout with the textbook split-rule flex layout — NOT a taller label box bandage. KISS.
- **Warm-not-grey** (BA.W-NO-GRAY, `proof:no-gray` stays GREEN): the rule is a warm hairline, never a grey `bg-border`.
- **a11y preserved**: the reka `Separator role="separator"` + `aria-orientation` semantics + the `decorative` role-free case are kept; the label is the accessible name.
- **`DockSeparator` byte-untouched** — the dock divider (with the rail-seam anchor, Band 2's surface) is a DISTINCT component, not touched by this wave (the fence).
- **The page hosts on the rebuilt MATERIAL** — `<Card>`s on the BC.W-GLASS-IDENTITY material, never raw `bg-card` opaque divs (the D1 grey-slab regression cannot re-enter through the separator page).
- **Coordinate, don't collide** — BC.W-PAGE-CHASSIS owns the page's hero/scroll-shrink; BC.W-CODE-BLOCKS owns its token-name code voice; BC.W-PADDING-CANON owns its card padding; this owns the Separator component + the page's Card hosting + the label-centering. Disjoint.

## Folds (deferrals discharged)
- route-census §4 (`/display/separator` "TOTALLY broken" + text-centering; raw `bg-card` divs) — **BUILT here:** the component label-centering rebuilt + the page re-authored onto `<Card>`. DECIDED.
- USER-DEFECTS §C "text not centered (a specimen page)" — **DECIDED-fixed:** the separator label-centering was the root; the split-rule flexbox centers it correctly, paint-verified by the π's center-coincidence assert.
- No prior-tranche `deferral/*.md` book names the separator label (this is a fresh BC live-walk defect); the closest adjacency is the BA.W-NO-GRAY warm-hairline identity — **CONSUMED here** (the rule reads `--separator-ink` warm, not grey). The `DockSeparator` rail-seam lineage (`az.md` dock-rail entries) is a DISTINCT component, fenced out (Band 2's scope).
