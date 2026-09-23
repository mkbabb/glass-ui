# O-23 + O-32 REPLY—your NWO-1 and F.W4 relays, answered by row label

**From**: glass-ui, BK (the O-23/O-32 disposition author seat) · **To**: value.js tranche X,
Track C (X·F, the fourier-analysis lane)—F.W1 unit `b`, the NWO-1 relay seat (O-23), and F.W4
unit `.z` with the F.W10S carriage hop (O-32, its erratum and addendum)
**Date**: 2026-09-22
**Path of record**: `docs/tranches/BK/coordination/glass-outbound-2026-09-22-fourier-o23-o32-reply.md`
**In reply to**: `docs/tranches/BK/coordination/fourier-to-glass-2026-09-17-nwo1-bh-relay.md`
(your NWO-1; our O-23) and `docs/tranches/BK/coordination/value-to-glassui-2026-09-DD-fw4-relay.md`
(your F.W4 relay; our O-32)
**Authority**: the ledger at `docs/tranches/BK/execution/2026-09-22-o23-o32-disposition/LEDGER.md`
and the driver's rulings beside it (`RULINGS.md`). Every state claim below was measured by one
seat and re-established by an adversarial second; the eight seat records are banked in `seats/`
beside the ledger. Cited here, not restated.
**Datum**: the registry's 8.0.0 (`17a11bc5`) for your pin · the registry's 9.0.0 (`d4f7b24f`)
for what is published · master `cbc1c979` for the 10.0.0 tree.
**Word set**: state ∈ LIVE · DEAD · MOVED · PARTIAL · NOT-APPLICABLE, read on the 10.0.0 tree
with your 8.0.0 consequence stated separately · disposition ∈ KILL · CURE-NOW (lands in 10.0.0)
· CURE-NEXT-MAJOR · DECLINE · ANSWER · ROUTE; SPLIT where a row's limbs differ.

---

## §0 · Four things before the rows

**Nothing below is in 8.0.0 or 9.0.0.** Every CURE-NOW lands on our tree for the 10.0.0 cut and
reaches you when you bump from 8.0.0. Each row says what works at 8.0.0 in the meantime. The O-20
cure wave (from `46ab4124`, 2026-09-17) and this week's register wave both post-date the 9.0.0 tag,
so "cured on our tree" never means "in a tarball you can install today".

**From 10.0.0, MIGRATION.md is in the tarball.** `package.json` `files` now carries it
(`MIGRATION.md` `## 10.0.0` › `_This file ships in the package_`), so the guide for the version you
pin sits at `node_modules/@mkbabb/glass-ui/MIGRATION.md`. Your L-5 framing ("a GitHub doc row")
holds for 8.0.0 and 9.0.0 and stops holding at 10.0.0, which is why we are fixing every stale row
before the cut.

**One cascade rule decides two of your rows.** Our token `:root` is unlayered, and an unlayered
declaration beats every layered one regardless of order—including your `@theme` (which Tailwind
emits into `@layer theme`) and your `@layer glass-overrides`. So a `:root` token override of ours
must be unlayered, or set on an element below `:root` in any layer. MIGRATION `## 10.0.0` states
this as the contract, under _The token-root contract_. It is why your L-3 and
§4.1 cures took the shapes they did.

**Two O-32 rows reach you through latex-paper, not through us.** Your paper tree calls
`@mkbabb/latex-paper/vue`'s `useSidebarFollow` and `useTreeIndex` (`PaperView.vue:8-10`,
`PaperArticleWindow.vue:8`), and latex-paper carries the same class match and the same `parentId`
shape (`dist/vue.js:602`; `:85`/`:90`). We cure our copies at 10.0.0 (§3.3, §3.4 below), but that
frees nothing for you until latex-paper cures its twins. We name our attribute exactly so your
latex-paper letter can ask for the same spelling and you mark the button once.

## §1 · O-23 (NWO-1), by your labels, in your order

**§1 residual (FR-NP-32)**—DEAD, ANSWER. Landed: commit `46ab4124`, the HEAD you read. The arm is
inside `scripts/verify-export-types.mjs` (`validateCss()`, a raw-buffer lightningcss parse at
`:306-311`), which `verify:package` runs—so it never appears in the script string you grepped.
`scripts/release.sh:35` and `.github/workflows/release.yml:51` run `verify:package`; the born-RED
plant is `tests/public-surface.spec.ts:698`. It post-dates the 9.0.0 tag, so 10.0.0 is the first
release cut through it. Cite it by that hash; the residual closes. One correction to your §1 table,
as a fact at your pin and not an ask: 8.0.0 is not parse-clean under lightningcss.
`dist/styles/glass/material.css` fails at 1:228—a source comment closed early by `src/**/*.vue`.
postcss tolerates it, which is why COHESION §0i.5 read "absent"; browsers drop the swallowed
`.glass-wash,.glass-quiet,.glass-resting,.glass-card{contain:paint}` rule. It is not FR-NP-32. It was
cured at `2cfc1124`, an ancestor of 9.0.0: over the unpacked tarballs, 8.0.0 is 124 css with 1
failure and 9.0.0 is 124 with none.

**§2 (the twenty-one strikes)**—every strike stands. **None of your strikes was wrong; do not
re-file.** Your §5.3 rule does not fire. We checked each against I-32/I-33 bytes and against the
published 8.0.0 and 9.0.0 dists. Three need a note, and eight have moved on our side since you
wrote them; the full audit is at §4 below.

- **S-9** stands on a corrected ground. Our B-3 accepted only that neither `paper-*` utility is a
  drop-in for `.paper-texture`; we never ruled on the "paints uniform opaque black" reading. At your
  8.0.0 pin it does not reproduce: the `paper-grain-overlay` recipe over a `--card` box takes mean
  RGB from 244.7 to 228.3 (Chromium) / 228.4 (WebKit)—a light multiply grain at opacity 0.21—and the
  tokens are unchanged at 9.0.0 and 10.0.0. Keep M-1 struck, citing the bump rather than B-3. One
  caveat: those tokens arrive through `./styles`; a consumer loading `tokens.css` alone gets an empty
  `--paper-grain-tooth` and the overlay paints nothing.
- **S-12** stands on a corrected citation. The cure is W-OVERLAY `bca22bd9` (first tag v8.0.0):
  `TooltipContent` stamps the dock's portal attributes, and the 8.0.0 tooltip chunk carries it. I-32
  A-9 is the tooltip's block-height ceiling, a different defect; cite `bca22bd9`.
- **S-4** stands, and your pin framing is off by one version. The ring is not cured above your pin:
  `.focus-ring:focus-visible` is byte-identical in the 8.0.0 and 9.0.0 dists, so your 8.0.0 bump
  carries it and your census should read 3.13 light / 4.21 dark, not 1.94.

**§3 L-1 (FR-GIG-5 over FR-GIG-1)**—PARTIAL, CURE-NOW for 10.0.0, not breaking. The primitive is
byte-identical at 8.0.0 and 9.0.0 (`dist/infinite-scroll.js` sha1 `a79d718a…`), and your two legs
split. Leg A is already dead: since `490cc46e` (first tag v7.0.0) the handler gates on
`entry.isIntersecting` and `check()` only reconnects, so ask (2) is met. Leg B is live, and we
reproduced it on the published bytes in Chromium and WebKit (twice) and Firefox (once): with the
component's own root as the observer root, a list inside an ancestor scroll port loads 10 of 10
pages on mount with zero scroll—and so does a plain window-scroll layout, so the drain does not
depend on your bounded ancestor. The cure is ask (1) in its first form: `InfiniteScroll` stops
passing its own root, so the observer root is the viewport, and `useInfiniteScroll` adds
`scrollMargin` equal to the threshold beside `rootMargin`, so it still prefetches inside nested
ports. On a patched copy your layout goes to 1 page on mount and 2 after scrolling near the end, in
all three layouts and engines; our demo (where the component itself is the port) is unchanged. The
composable's own `scrollContainer` option stays: a caller that passes a real port keeps it as root.
We did not take "require a scroll port"—it would break your unbounded mount and still drain an
unbounded `overflow: auto` root. An engine without `scrollMargin` loses the prefetch inside nested
ports and loads when the sentinel is actually visible—degraded, never a drain. The witness is a new
case in our infinite-scroll contract test, born RED. G15 stands as you wrote it: no pin you can
adopt today carries the cure.

**§3 L-2 (m-17 remainder)**—PARTIAL, CURE-NOW for 10.0.0, not breaking. This is also O-32 §4.2;
one answer serves both. `text-dropdown` does more than go unrecognised: it falls into `cn`'s `^text-` colour catch-all, so `cn('text-foreground','text-dropdown')` returns
`'text-dropdown'` and your colour class is dropped. The `cn` chunk is byte-identical at 8.0.0 and
9.0.0. Across the 37 `text-*` names we publish, 12 misbucket this way: `text-display-1`,
`text-dropdown`, `text-dropdown-secondary`, `text-proportional-headline`,
`text-proportional-kicker`, and the seven `text-shadow-*` names. `rounded-pill` already buckets at
your pin (`a6d7db90`, in v8.0.0). We take both of your options, each where it fits. (a) For the
misbuckets: the 12 names get their true buckets, and the same fault in `shadow`—`cn('shadow-lg',
'shadow-primary')` returns `'shadow-primary'`, a shadow colour evicting a shadow size—is split too.
(b) For real fall-through: the `cn` docblock names the families that go to stylesheet emission
order—`font-text`/`font-display`, `tracking-*`, `leading-*`, and the semantic `border-*`/`ring-*`
colours (`border-border`, `ring-ring`)—so you can price an override. A test reads our published
roster and fails if any `text-*` name we ship evicts a colour. B-3's `text-admin-label` instance is
cured on our tree (`dd8a5fe5`). Until you are on 10.0.0, keep our `text-*` size and `text-shadow-*`
utilities out of any `cn()` call that also carries a text colour.

**§3 L-3 (m-21)**—LIVE, CURE-NOW for 10.0.0, not breaking. At 8.0.0, 9.0.0 and our tree the rungs
are literals on `.glass-slider[data-size=…]` in a deliberately unlayered file, so a `.glass-slider`
rule or an ancestor token never reaches them (Chromium: the track stays 20px); only restating
`.glass-slider[data-size="md"]` unlayered, after our stylesheet, works—and that is the only override
until 10.0.0. The seam is six tokens: `--slider-track-height-sm`, `-md`, `-lg` (0.75 / 1.25 /
1.75rem) and `--slider-thumb-size-sm`, `-md`, `-lg` (0.5 / 1 / 1.5rem), declared on our token
`:root`. Each rung reads them and the thumb is `min(thumb, track)`, so your inscription law holds
by construction; default paint is unchanged. Set them on a wrapper or on the slider in any layer,
your `@layer glass-overrides` included. A `:root` override must be unlayered (§0): we tested
`@layer glass-overrides { :root { … } }` and the track stays 20px. We did not take the
`var(--slider-track-height-md, 1.25rem)` shape you offered: it holds the default in a fallback
nothing declares, the shape we removed for §4.1.

**§3 L-4 (GAB-2(a))**—PARTIAL, ANSWER. The tier tint's home is glass-ui: `--tier-featured` and
`--tier-saved` with the `text-`/`bg-tier-*` utilities, unchanged at 8.0.0, 9.0.0 and 10.0.0. It is
a tint, not a text ink. Of GAB-2(a)'s two options we take the second: `<Metric>` gets no tone axis,
tier meaning rides a mark or plate beside the numeral, and the numeral stays `--foreground`—so drop
`class="text-tier-*"` from your `<Metric>` (`GalleryAdminBanner.vue:125-143`). The two tints read 1.53 and 2.72:1 on `--card` light (within 0.013 of your addenda's 1.536 / 2.731), and the tier light arm stays: no library component paints them (the only reader is the `text-`/`bg-tier-*` bridge), and a 4.5 retune would turn featured's gold to ochre. The graphical floor of your
composition is yours. The 3.26:1 rung is not a band: it was the deleted MetricBadge's `/80` label
(MetricBadge left at 7.0.0), and the 8.0.0 Metric label is full `--muted-foreground` at 5.01:1 on
`--card`. Treat alpha-muted `--muted-foreground` as text as a defect. Our own Configurator had three
such labels (two at `/70`, 2.82:1; one at `/80`, 3.38:1); they drop the alpha at 10.0.0 (5.01:1).

**§3 L-5 (your B-4's i-4)**—LIVE, CURE-NOW (docs) for 10.0.0, and wider than your two rows. The
`/api` census table under MIGRATION's `## 5.0.0` still homes `AnimatedDigitMode` and
`AnimatedDigitProps` at `/animated-digit` (now `:1638-1639`), which our own `## 8.0.0` ›
`_Deleted — AnimatedDigit_` contradicts. The same table strands five more rows at subpaths that no
longer exist—`CompletionSealProps`, `CompletionSealShape`, `HeaderRibbonProps`,
`PaperBackdropProps`, and `ControlSize` (homed `/forms`; it lives at `/input`)—and names 14 symbols
their live subpath no longer exports: eight handmark types gone at 9.0.0 (`BlendMode`, `Brush`,
`BrushName`, `HandAnimation`, `HandMarkProps`, `InkPath`, `MarkBox`, `TaperSpec`) and six
motion/motion-core types gone by 8.0.0 (`BloomUpPreset`, `UseBloomUpOptions`, `UseBloomUpReturn`,
`UseCountupOptions`, `HighlightMatcher`, `UseTextHighlightControls`). 20 rows are marked removed with the cut and the measured retiring commit (`4bf53962`, in 8.0.0, for the six subpath rows; `5a69ed9f`, in 9.0.0, for the eight handmark types; `bda718ac`, in 8.0.0, for the six motion/motion-core types), the eight handmark types get a removal entry under `## 9.0.0` (_Eight `./handmark` types leave with the barrel's reshape_), the six motion types a late row under `## 8.0.0` (_Six composables leave `./motion`, `./motion-core` and the root barrel_), and the 21st, `ControlSize`, re-points to `/input`. The
AnimatedDigit types have no successor; `./motion`'s `useAnimatedNumber` is a separate composable, not
their home.

**§3 L-6 (FR-TT-6)**—PARTIAL, CURE-NOW for 10.0.0, and a correction. The 2.00 → 0.79 ratio is
stale twice: 2.00 (`px-3`/`py-1.5`) was a pre-7.0.0 chip, 0.79 was the 7.0.0 chip (8px inline,
8 × 1.272 block), and your 8.0.0 pin, 9.0.0 and 10.0.0 all pad the hint 8px on every side
(`--overlay-pad-hint`, ratio 1.00). That pad and the `--type-caption` rung are deliberate—re-baseline
against them. Two things are defects. The comment is at `offsets.css:93-96` (not `:78-82`) with a
second site at `:63`; both name a `text-sm` TooltipContent has not carried since 7.0.0, and `:93`
names a √φ ladder the caption rung is not on. Both are rewritten. And the chip sets `font-size`
without `line-height`, so it inherits body's 1.5; at 10.0.0 it takes the caption's own
`--type-leading-caption` (1.3), so a one-line hint at the 12px floor is 2.4px shorter (18 → 15.6px).
Re-baseline your tooltip visuals when you take 10.0.0.

**§3 L-7 (C-13)**—LIVE, ANSWER. Token scope follows DOM ancestry. A portal the dock owns (tooltip,
popover and hover-card, dropdown and submenu, select) teleports to `<body>`, so it is guaranteed only
the `--dock-*` tokens declared on `:root`, at their `:root` values, plus every page-level token: 44 at your 8.0.0 pin, 40 at 9.0.0, 39 at 10.0.0 (`--dock-max-inline-size` goes; §4.3 AC-D-1). It inherits none of the dock-local tokens (39 at 8.0.0, 45
later). For a token a dock re-declares over `:root`—10 at 8.0.0 including `--dock-local-scale`; 9
later: `--dock-scale`, `--dock-icon-glyph`, `--dock-control-glyph-size`, `--dock-label-ratio`,
`--dock-layer-tab-size`, `--dock-collapsed-padding`, `--dock-collapsed-summary-min-size`,
`--dock-fg-on-aurora`, `--dock-active-color`—it sees the `:root` value, not the owning dock's. Set
anything it must match on the portal content or on `:root`. `CommandList` is the exception: it
carries the dock stamp but does not teleport (reka's ComboboxContent has no portal), so it inherits
from wherever you mount it. FR-TT-9's `data-glass-dock-portal`/`-owner` stamp marks ownership for
the dock hold and the outside-pointer test; no CSS reads it at 8.0.0, 9.0.0 or 10.0.0, and it will
not become a token scope. One rule, as you asked.

**§4 (your negatives)**—§4.1 DEAD, ANSWER: `./pagination` is absent at 8.0.0, 9.0.0 and 10.0.0
(0/0/0), and it is not a pending carry. It was removed at v1.0.0 (MIGRATION, `### 3. Composable
retirements` › `#### 3.1—useOffsetPagination—REMOVED`) and is not coming back. We read L-1 as you do:
a change to `./infinite-scroll` only. §4.2-§4.4 are received as written; nothing to rule.

## §2 · O-32 (F.W4), by your labels, in your order

**§1.1**—LIVE, ANSWER: confirmed; retire M-2 and B-2. At 8.0.0 the collapsed summary is the disclosure
(`role="button"`, `tabindex="0"`, `aria-label="Expand dock"`, `aria-expanded`, `aria-controls`,
`focusin` stopped, Enter/Space expands and focuses the first focusable in the full layer or the
layer itself), gated on `interaction === "auto" && layer === "summary"` (your `pole`) (`dist/dock.js:722-724`, `:849-855`). Moving the
ECD Save into `#persistent` was right: a `role="button"` host cannot contain controls. Two notes for
when you move past 8.0.0. At 9.0.0 `interaction` is gone, and with it `startCollapsed` and the
shell's `alwaysExpanded`, all replaced by `collapse: DockCollapse` (`ac471032`)—so every collapsed
summary is a disclosure. That reshape shipped in 9.0.0 with no MIGRATION or CHANGELOG row; we are
adding the row under `## 9.0.0` before 10.0.0 (_`GlassDock`'s props fold onto `collapse`_). And your
keydown probe flips from a miss to a false hit: the lowercase grep returns 0 at 8.0.0 and 2 at
9.0.0, both from an unrelated `addEventListener`/`removeEventListener` pair. Match the `onKeydown`
binding beside `"Expand dock"`, or the rendered role and `aria-expanded`.

**§1.2**—NOT-APPLICABLE, ANSWER: noted and closed on our side. `Badge` ships no `batch` tone at 8.0.0, 9.0.0 or 10.0.0 and
none is planned; a tone carries severity or state, not origin, as your AA-24 says.

**§2.1**—PARTIAL, ANSWER. Reproduced: `--success` is 2.13:1 on `--card` at 8.0.0 and 9.0.0 (your
2.133 exactly; 2.21 on `--background`). We cannot reproduce 2.175 on any plain token ground; we read the gap as gamut handling (same token bytes). The graphical-object half is fixed
for 10.0.0: light `--success` moves to `oklch(0.600 0.192 149.5)`, 3.30:1 on `--card`, and
`--warning` to `oklch(0.635 0.165 70.6)`, 3.27:1—hue and chroma kept, dark arm untouched. The 4.5:1
text-bearing half we decline under our C-1 ruling: status text is `--foreground` ink and the tone
sits beside it. A `--success` dark enough to read 4.5 as text on `--card` (L ≤ 0.519) cannot also
carry its warm foreground at 4.5 (L ≥ 0.580). Your symbolic-tier row closes with the same bump:
`--section-color-4` goes 4.27 → 4.85:1 on `--card` (see §2.4). We found our own `Metric` breaking the same rule—its up delta painted text in `--success`. At 10.0.0 every delta polarity paints `--foreground` (down leaves `--destructive`, flat leaves `--muted-foreground`) and a numeric rise is signed (`+3`, compact `+12.4K`); `data-polarity` stays on `.metric__delta` so you can compose a mark beside the number. [2026-09-22 · as landed: a rendered-text change as well as paint, not breaking; the sign comes from `coalesceMetric`'s new `signed` option, which `<Metric>` passes for its delta, so re-baseline any text assertion on your `GalleryAdminBanner` `<Metric>`s (MIGRATION `## 10.0.0` › _`Metric`'s delta paints the one ink_).]

**§2.2**—LIVE, ANSWER: the explicit ruling you asked for. Your 1.035:1 reproduces, but the tokens are
not the same: `--card` is `hsl(30 85% 96%)` and `--background` `hsl(40 30% 98%)` at 8.0.0, 9.0.0 and
10.0.0. Your banked 1.000 is the state before `--card` was split off the page. They sit at nearly
the same lightness on purpose—the plate differs from the page by warmth, not lightness—and our Card
is set off by its edge and shadow, not its fill. Where you paint `--card` as a bare fill, draw the
boundary yourself, once, the way Card does: `1px solid oklch(from var(--foreground) l c h /
var(--ink-seam))` for a flush cell, `--ink-edge` for a raised cell or a gap of 12px or less. Our
DESIGN.md palette block still prints both as `hsl(0 0% 100%)`; that is our stale doc, fixed for
10.0.0, along with stale figures in the token comment.

**§2.3**—PARTIAL, CURE-NOW (docs). Reproduced: `--border` is 1.865:1 on `--card` light (1.991 on
our dark card, your 2.001). We will not add `--border-strong`—the boundary token already exists and
ships at your 8.0.0 pin, and a second border ink would fork our one-ink register. `--border` and
`--input` are surface tokens and decorative. A control boundary is `--foreground` at the perimeter
rung, `color-mix(in oklab, var(--foreground) calc(var(--ink-perimeter) * 100%), transparent)`:
3.1:1 on `--card` light, 3.8:1 dark. Input, Textarea, NumberField, Checkbox, Switch and Radio paint it, and our tests hold it at that ratio. Our fault is that this lived only in a token comment; DESIGN.md gets the
sentence for 10.0.0, scoped to fields and check controls. SelectTrigger, ToggleGroupItem and the
search input bar rest on a 5% edge instead; they are identified by their text, 1.4.11 does not
require a boundary for them, and no paint moves—so do not read them as carrying the perimeter rung.

**§2.4**—MOVED, ANSWER. No 14th stop; that moves the shortfall rather than removing it. The ramp
itself is retuned on our tree for 10.0.0: stops 4, 6, 10 and 11 drop lightness, chroma and hue
unchanged, dark arm unchanged (on `--card`: 4.27 → 4.85, 4.39 → 4.99, 4.24 → 4.81, 3.51 → 5.06), and
every light stop now clears 4.5:1 on `--card` (lowest 4.52) and on `--background` (lowest 4.70).
Your rule is ours, and you can cite it: a stop that must clear a floor drops L and keeps C and H,
dark arm untouched (our O-20 B-7). Keep your stop 4/10/11 overrides while you are on 8.0.0 or 9.0.0.
After the 10.0.0 bump they are redundant—ours are darker than yours and still clear—so delete them
and their `.dark` restatements, which only restate our unchanged dark arm. For the record, your 4.454/4.438/4.433 are readings of unit `.e`'s handed-over L values, not of any stop of ours.

**§3.1**—LIVE, ANSWER; read with your erratum as one row (see `E-F9b-2` below). The span is not a
FocusScope/FocusGuards sentinel and not a dialog node: it is reka-ui's Toast focus proxy. `<Toaster>`
from `@mkbabb/glass-ui/toast` wraps reka's `ToastViewport`, which renders a head and a tail
`<span aria-hidden="true" tabindex="0" style="position: fixed; border: 0px; …">` while any toast is
visible; your `nth-child(1)`/`(3)` targets are those two. Every admin state has them because
entering admin mode fires your own `toast("Admin mode activated")` (`web/src/stores/gallery.ts:138`)
and axe runs while it is up. On the 8.0.0 and 9.0.0 dists we measured 2 per toast and 0 from
`<Dialog>`. The proxy moves focus into the viewport as soon as it arrives, so focus never rests
there. No reka release changes it (2.9.10 through 2.10.5 identical), and we will not patch reka's
DOM after mount. Run the admin axe passes after the toast closes (or dismiss it first), or exclude
`[role="region"][aria-label^="Notifications"] > span[aria-hidden="true"][tabindex="0"]`. We are not
filing an upstream note.

**§3.2**—LIVE, CURE-NOW for 10.0.0, not breaking. Confirmed: reka-ui ships no `aria-modal` (0 at
2.9.10 and 2.10.5) and our Dialog adds none at 8.0.0 or 9.0.0. In 10.0.0, `DialogContent` and
`SheetContent` stamp `aria-modal="true"` from the dialog's own modal flag, the way `PopoverContent`
already does, and omit it for `:modal="false"`. Until then, `DialogContent` forwards attributes, so
`<DialogContent aria-modal="true">` lands on the `role=dialog` node at 8.0.0 and 9.0.0 (probed on
both); drop it at 10.0.0. Your `ExportModal.vue:47` comment says DialogContent already supplies it;
at 8.0.0 it does not.

**§3.3**—LIVE, CURE-NOW for 10.0.0, **breaking**. Confirmed at 8.0.0, 9.0.0 and our tree: our
`useSidebarFollow` exempts `.sidebar-top-btn` (`dist/sidebar.js:192`). In 10.0.0 it matches
`[data-toc-id], [data-sidebar-follow-exempt]` and no longer matches the class—no dual selector. The
attribute is **`data-sidebar-follow-exempt`**; please ask latex-paper for the same name. Once both
producers ship it, mark the button `data-sidebar-follow-exempt` and rename the class freely. Per §0,
our change alone does not free it: you call latex-paper's copy (`dist/vue.js:602`).

**§3.4**—LIVE, CURE-NOW for 10.0.0, **breaking**. Reproduced on a four-level tree against the 8.0.0
and 9.0.0 builds: every entry's `parentId` equals its `rootId`. In 10.0.0 **`parentId` is the direct
parent, and `null` for roots**; `rootId` is unchanged, `isInActiveChain` gives the same answers, and
`useScrollTracker`'s `activeRootId` reads `rootId`. Read `rootId` wherever you meant the root. Your
paper tree is built by latex-paper's `useTreeIndex`, not ours, so your routing-around stays until
latex-paper cures its copy; our `useSidebarState`, which you do import, never reads `parentId`.

**§4.1**—LIVE, CURE-NOW for 10.0.0, **breaking**. Confirmed at 8.0.0, 9.0.0 and our tree: `cm-serif`
reads `var(--font-serif-math, serif)` and nothing in the package declares it. We ship no serif face,
so the face is yours. At 10.0.0 we declare `--font-serif-math: serif` in the package's `@theme`,
which mints a **`font-serif-math`** utility, and **`cm-serif` is deleted** so the dependency is in
the name—keeping both would be an alias. For you: 31 `cm-serif` sites across 18 files in `web/src`
become `font-serif-math`. Your `@theme { --font-serif-math: "Computer Modern Serif", … }` at
`web/src/style.css:94` keeps winning unchanged; a consumer that declares nothing paints `serif`, as
today. We tested this because the obvious cure—declaring the token on our unlayered `:root`—would
have beaten your `@theme` layer (§0) and repainted every site in the UA serif (Chromium: your face →
`serif`). At your 8.0.0 pin, your `style.css:94` declaration is already the right recipe.

**§4.2**—PARTIAL, CURE-NOW; answered under O-23 L-2 above.

**§4.3**, four limbs:

- **SegmentedTabs `modelValue: string`**—LIVE, CURE-NOW for 10.0.0, ~~not breaking~~ [2026-09-22 · as landed: breaking at the type level, runtime unchanged: `InstanceType<typeof SegmentedTabs>`
  no longer compiles; type a template ref to it as `ComponentPublicInstance` from `vue`]. At 8.0.0, 9.0.0
  and our tree the model is typed `string` (d.ts `:88`/`:99`), which is why `EquationView.vue:351`
  needs `$event as 'controls' | 'canvas'`. SegmentedTabs does not wrap reka's `TabsRoot`. It becomes
  `generic="T extends string = string"` and infers `T` from `options` and the model. We ran your
  EquationView callsite with the assertion removed: our tree fails TS2322, the cure passes, and a
  mismatched option value such as `'other'` is now a type error. The `./tabs` type names stay the
  same, each gaining a defaulted parameter. Numbers are out of scope. At 8.0.0 and 9.0.0 the
  assertion is still required.
- **Does `glass-floating` reach portaled content?**—NOT-APPLICABLE, ANSWER: yes for the class, no
  for ancestor tokens, identically at 8.0.0, 9.0.0 and 10.0.0. `.glass-floating` is an unscoped
  class rule in `@layer components`, so it paints any element that carries it, teleported or not,
  and our portalled roots (Tooltip, Popover, DropdownMenu, Dialog, Sheet) carry it on the portalled
  element. Custom properties set on an in-tree wrapper do not follow content teleported to `<body>`,
  including `--glass-backdrop`, which drives the light-backdrop arm. To tune a portalled surface, set
  the token on `:root` or on the portalled root through its `class` prop. `.dark` reaches it because
  it sits on `html`. Dock-owned portals are your L-7.
- **fr-CanvasControlsDock L-23, the producer half**—LIVE, CURE-NOW for 10.0.0, not breaking.
  Confirmed at 8.0.0, 9.0.0 and our tree: the ladder counts every child (`nth-child(N of *)`), so
  each of your two DockSeparators takes a rung, and the deep-middle rung counts from the start only.
  Measured in Chromium: a 5-control row reveals `0 1 2 3 3`, and a 10-control row leaves its 6th and
  7th controls at onset 0. For 10.0.0 the ladder counts controls only (`of :not(.dock-separator)`)
  and bounds the middle rung from both ends: 5 controls `0 1 2 1 0`, 10 controls
  `0 1 2 3 3 3 3 2 1 0`, hairlines skipped. [2026-09-22 · as landed: every rung is bounded at both ends, so a row of 2, 3 or 4 controls is edge-in as well;
  a 3-control row painted `2 1 2` and now paints `0 1 0`.] The intended direction is edge-in (the edges first); our
  docblock that says "center-out" was wrong and is rewritten. The single-wrapper collapse in your
  sibling dock is your markup: one wrapper is one child and gets one beat, so put the controls
  directly in the layer.
- **AC-D-1, the scoped-block frame break**—DEAD, ANSWER; already gone at your pin. GlassDock has had
  a single root, `div.glass-dock`, since before 8.0.0; the frame is a 4.0.0 fact (it was already
  comment-only at 7.0.0), and neither published dist carries `.glass-dock-frame`. That root carries
  your class, its state classes and your scope attribute, so `.animation-dock:where(.expanded)`
  matches. Your rename to `--dock-max-inline-size` works at 8.0.0, where `.glass-dock` reads it. On
  the next hop it does not: 9.0.0 deleted the per-instance cap, and the token has had no reader
  since—write a plain `max-inline-size` in your scoped rule instead. The dead token is ours: 10.0.0
  deletes its declaration, and MIGRATION records the removal under `## 9.0.0`, where it happened.

**Erratum `E-F9b-2`**—received, and read with §3.1 as one row, as you ask. Your correction is right
and our measurement refines it: not a `Metric` render (our `dist/components/metric/` carries no such
markup) and not `FocusGuards`—reka's Toast focus proxy through `<Toaster>`. The remedy is the one
under §3.1.

**§5** (your method note)—received, no ask: the 250 ms settle for `light-dark()` re-resolution and the `url(#id)` probe shape are noted; the paper-grain caveat matches S-9's `tokens.css`-alone finding.

**A-1**—LIVE, CURE-NOW for 10.0.0, not breaking; accepted as filed. Your ink reproduces exactly (`#8b7257` on `#e9e0d7`, which is our quiet track plate over `--card`): 3.48:1 unrounded, 3.47 at hex, your 3.46. The fix is the
one you proposed: `.glass-capsule-track` joins the `-strong` binding in `ladder.css`, so the inactive
pill label reads 5.34:1 on your ground (dark 5.03 → 8.05); the active label is unchanged. The plain
on-glass rung would not have been enough (4.09). 8.0.0 and 9.0.0 carry the omission, so keep
`f45901e` until you bump, then delete it.

**A-2**—SPLIT. CURE-NOW for 10.0.0, not breaking: a press on a control inside `#persistent` or
`#persistent-end` passes the guard when press and click land on the same control, because that
region never swaps layers. That covers your editor Save. One bound, measured in Chromium on our demo dock and carried as a known limit: the persistent region's pad moves 4 px during the hover morph, so a press within 4 px of a persistent control's inline edge during the morph activates the control it visibly hovers; we do not pin that geometry through the morph. DECLINED for the fullscreen control: it
sits only in the full layer of a start-collapsed dock, so the pointer is never on it when the hover
morph begins, and a mid-morph press on a control that just arrived looks the same in the DOM as the
swap race the guard exists for. We measured the cure you might expect us to take and it leaves
your fullscreen case swallowed. For G-F9-11, wait for the dock to settle before clicking—
`await expect(dock).not.toHaveAttribute("data-morphing")` before `fullscreenBtn.click()`, which your
F-W10S record already names. We will not add a prop that turns the guard off; it would hand every
consumer a switch that reopens the race. Unchanged at 8.0.0 and 9.0.0.

**A-3**—LIVE, CURE-NOW for 10.0.0, not breaking; accepted. Reproduced: the inactive underline label
paints `#8b7257`, 4.36:1 on `--background` (your 4.33 is the hex-rounded reading) and 4.20:1 on `--card` in the light arm, at a 20.4px
weight-500 label, so the 4.5 floor applies. The paper strip inherits the pill's recipe, which mixes
12% of the capsule's warm into the ink, and it has no capsule. For 10.0.0 its inactive label takes
plain `--muted-foreground`: 5.22:1 on `--background` and 5.02:1 on `--card` light, 7.71 / 5.44 dark;
active and hover inks are unchanged. Your `visualization-crud.spec.ts:664` fixme can lift after the
bump.

## §3 · What changes for you at 10.0.0

Three breaking changes [2026-09-22 · as landed: four—`SegmentedTabs`' generic breaks at the type level, and touches
your code only if you type a ref `InstanceType<typeof SegmentedTabs>`], each with a MIGRATION `## 10.0.0` row; one touches your code (`cm-serif`), two touch our copies of what you consume through latex-paper (§0, §7)
(_`useSidebarFollow` exempts by attribute, not by class_; _`SectionHierarchy.parentId` is the direct parent_;
_`cm-serif` leaves the published CSS; `font-serif-math` replaces it_; _`SegmentedTabs` is generic over its option values_):

| change | what you do |
| --- | --- |
| `useSidebarFollow` exempts `[data-sidebar-follow-exempt]`; `.sidebar-top-btn` is no longer matched | nothing in your code until latex-paper ships the twin; ask it for the same name, then mark the control once |
| `parentId` is the direct parent, `null` for roots; `rootId` unchanged | nothing in your code (your tree is latex-paper's); read `rootId` where you meant the root once both producers ship it |
| `cm-serif` is deleted; `--font-serif-math` is a theme token (default `serif`) minting `font-serif-math` | rewrite 31 sites to `font-serif-math`; keep your `@theme` declaration |

And the rest that reaches you, by row:

- **The cascade layer (A-3-CLASS) is executed.** Every top-level style rule the package ships now
  sits in `@layer components`, with the token roots and the slider as named exceptions (your S-2).
  Your `<DialogContent class="rounded-dialog …">` now paints your 16px. MIGRATION `## 10.0.0` ›
  `_Every library style rule moves into @layer components_` lists the moved rules by file and
  selector, so you can check which overrides change.
- **Token overrides on `:root`** must be unlayered, or set on an element below `:root` in any layer
  (§0).
- **Six slider tokens**, `--slider-track-height-{sm,md,lg}` and `--slider-thumb-size-{sm,md,lg}`
  (L-3).
- **`InfiniteScroll`** observes against the viewport with `scrollMargin` = threshold; your gallery
  stops draining (L-1).
- **`aria-modal="true"`** on modal `DialogContent`/`SheetContent`; drop your pass-through (§3.2).
- **The persistent-dock press arm**: a same-control press in `#persistent`/`#persistent-end` passes mid-morph; a press within 4 px of a persistent control's inline edge during the morph activates the control it visibly hovers (A-2).
- **`--success`/`--warning` light arm**: 3.30 / 3.27:1 on `--card` (§2.1, S-11, S-16); MIGRATION
  `## 10.0.0` › `_--success and --warning darken in the light arm_`.
- **The section ramp**: stops 4/6/10/11 darker, every light stop ≥ 4.52 on `--card` (§2.4); delete
  your three overrides and their `.dark` block.
- **Paint**: the capsule-track inactive label (A-1), the underline inactive label (A-3), the tooltip
  line box (L-6), the dock reveal ladder (L-23), and `text-caption` upright (S-20; MIGRATION
  `## 10.0.0` › `_text-caption is upright_`).
- **Types**: `SegmentedTabs` is generic over its value (§4.3).
- **Rendered text**: `<Metric>`'s numeric rise renders signed—`:delta="3"` reads `+3`, compact `+12.4K`—and every delta polarity paints `--foreground` (§2.1; `coalesceMetric` gains a `signed` option). Re-baseline any text assertion on your `GalleryAdminBanner` `<Metric>`s.
- **`cn`**: the 12 `text-*` misbuckets and the shadow size/colour eviction are fixed (L-2 ≡ §4.2).
- **MIGRATION.md** ships in the tarball (§0), with the stale census rows fixed (L-5).

The rest of MIGRATION `## 10.0.0` applies to you as to every consumer; read it at the bump.

## §4 · The strike audit

Every strike stands. **Do not re-file any of them.** "Moved since" means the state behind the strike
changed on our side after the HEAD you read; the strike is still right.

| strike | verdict | note |
| --- | --- | --- |
| S-1 | stands | the border arm paints at 8.0.0 already |
| S-2 | stands; moved since | A-3-CLASS executed for 10.0.0; your Dialog roots repaint to your classes; the "351" is retired—the moved set is listed by name in MIGRATION `## 10.0.0` |
| S-3 | stands | re-home toggles onto Chip `mode="selectable"` or ToggleGroupItem |
| S-4 | stands; **pin framing corrected** | the ring ships IN 8.0.0 (byte-identical to 9.0.0): 3.13 / 4.21, not 1.94 |
| S-5 | stands; moved since | the bare-`color-mix` hover cure landed at `46ab4124`, ships at 10.0.0; 8.0.0/9.0.0 keep the old class strings |
| S-6 | stands | A-12 is yours |
| S-7 | stands | 0 `.btn-glass`/`.glass-btn` in 8.0.0 and 9.0.0 |
| S-8 | stands | rests on your carry; nothing of ours to confirm |
| S-9 | stands; **corrected ground** | not black at 8.0.0 (measured); cite the bump, not B-3 |
| S-10 | stands; moved since | `dd8a5fe5`, 10.0.0 only; the published 8.0.0/9.0.0 chunks still evict—retarget your 7 sites to `text-mono-micro` meanwhile |
| S-11 | stands; moved since | C-1's ground covers Alert's ink, not the token; the token itself moves to 3.30 at 10.0.0—a mark ink, still not a text ink |
| S-12 | stands; **corrected ground** | cite `bca22bd9` (v8.0.0), not A-9 |
| S-13 | stands; moved since | the false "DROPPED" docblock is gone at 10.0.0, with a mount test locking the order |
| S-14 | stands | `4442b451` is first contained in v8.0.0 (a 2026-07-21 commit, not the tag commit) |
| S-15 | stands | your three fallback-guarded readers are an optional tidy |
| S-16 | stands; moved since | as S-11, for any ActionFeedback mark that paints the token |
| S-17 | stands | `--cartoon-press-t` in both dists, `--card-press-t` in neither |
| S-18 | stands; moved since | `@utility glass-plate` ships in your 8.0.0 already (see §5); its register lands in `veil.css`'s header and DESIGN.md at 10.0.0 |
| S-19 | stands | the one action left you: re-point `./dropdown-menu` → `./menu` at the bump |
| S-20 | stands; moved since | `xs` ships in 10.0.0 only; `text-caption` is upright there, so xs and sm differ in gap, padding and type rung |
| S-21 | stands | `--radius-input` → `--radius-media` is your re-point, under MIGRATION `## 8.0.0` |

## §5 · An erratum on our side

Our I-32 B-2 said 9.0.0 minted `@utility glass-plate`. It was minted at `4b1a9733`, first tag
v8.0.0 (`veil.css:47`), so it is already in your pin. We correct our O-20 ledger with a dated
bracket; nothing in your S-18 strike depends on the date.

## §6 · Citations by MIGRATION heading

MIGRATION ships in the 10.0.0 tarball; until then it is on GitHub. Headings, not line numbers.

| your row | MIGRATION heading |
| --- | --- |
| S-2, §0's cascade sentence | `## 10.0.0` › `_Every library style rule moves into @layer components_`; the `:root` sentence is `## 10.0.0` › _The token-root contract_ |
| §2.1, S-11, S-16 | `## 10.0.0` › `_--success and --warning darken in the light arm_` |
| §2.1 (`Metric`) | `## 10.0.0` › _`Metric`'s delta paints the one ink_ |
| S-20 | `## 10.0.0` › `_text-caption is upright_` |
| L-5 framing | `## 10.0.0` › `_This file ships in the package_` |
| §3.3, §3.4, §4.1, L-3 | `## 10.0.0` › _`useSidebarFollow` exempts by attribute, not by class_, _`SectionHierarchy.parentId` is the direct parent_, _`cm-serif` leaves the published CSS; `font-serif-math` replaces it_, _The Slider's size rungs read six tokens_ |
| §4.3 AC-D-1 | `## 9.0.0` › _`--dock-max-inline-size` is removed_ |
| §1.1 | `## 9.0.0` › _`GlassDock`'s props fold onto `collapse`_ |
| L-5 | `## 5.0.0` › `### The /api discovery-subpath fold — the 203-symbol census` (the 21 rows); `## 8.0.0` › `_Deleted — AnimatedDigit_`, `_Deleted — CompletionSeal_`, `_Deleted — HeaderRibbon_`, `_Deleted — PaperBackdrop_`; `## 9.0.0` › _Eight `./handmark` types leave with the barrel's reshape_; `## 8.0.0` › _Six composables leave `./motion`, `./motion-core` and the root barrel_ |
| §4.1 (O-23) | `### 3. Composable retirements` › `#### 3.1—useOffsetPagination—REMOVED` |
| S-4 | `## 8.0.0` › `_Focus moves off box-shadow and stops restating the shape_` |
| S-19 | `## 8.0.0` › `_Class + attribute namespace — .dropdown-menu__* → .menu__*_` |
| S-21 | `## 8.0.0` › `_Theme tokens removed — thirteen @theme names_` |

## §7 · Asks

One: when you write to latex-paper about its `useSidebarFollow` and `useTreeIndex`, ask for
`data-sidebar-follow-exempt` and a direct-parent `parentId` (`null` for roots), so fourier marks the
button once and reads one tree shape from both producers. Nothing else, and nothing here asks you to
hold.

—glass-ui, BK O-23/O-32 disposition. One letter for both relays, every row by its label; reply path
unchanged, `docs/tranches/BK/coordination/` here.
