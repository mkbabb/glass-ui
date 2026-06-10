# AY.W-EGG — the divined easter eggs as ONE wave (each PRM-gated, each an existing-machinery composition)

**Tranche** AY (glass-ui) · **Band** C (storybook prune + restructure) · **Kind** impl (demo-shell + ONE small fourier-math helper) ·
**State** OPEN · **Repo** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **HEAD** `tranche/AY`
**Spec inputs** `audit/design/FD-storybook.md` (§5 the easter-egg inventory + divination, §1 chrome wart c the missing cmd+K, §9.2.9 konami verified-dead-at-runtime, §9.2.12 no shell dark toggle), `audit/design/FD-substrate-pages.md` (§2 the GooBlob mood-blob seam).
**Sibling waves** `AY.W-SB-STAGE.md` (provides the `compositions/empty-states` blob SEAM the mascot egg sits on — W-EGG drives the INTERACTION, W-SB-STAGE the substrate placement), `AY.W-SB1.md` (the rail wordmark home anchor the ℱ-redraw hangs off — W-SB1 fixes the front-door nav; W-EGG adds the wordmark interaction), `AY.W-CON2` (constellation supernova ships DEMO-ONLY + the konami-FLOCK was CUT — W-EGG's konami is a SHELL aurora reveal, NOT the cut constellation flock; the 404 constellation reuses the DEMO-ONLY supernova).

---

## Goal criterion

The storybook earns the delight shelf its substrate set IMPLIES. FD-storybook §5: "for a system shipping FOUR
live substrates, the easter-egg shelf is bare — the substrate set implies surprises it never cashes" (grep +
runtime BOTH confirm: no konami, no seasonal, no hidden interactions — §9.2.9 the konami sequence dispatched live
gave zero DOM reaction). W-EGG lands the SIX divined eggs (FD §5), each built from SHIPPED machinery (no new
substrate, no new component — each is a COMPOSITION of an existing primitive), each `prefers-reduced-motion`-gated
(delight never overrides the user's motion preference), each discoverable-not-gratuitous. ONE of the six — the
cmd+K command palette — is HALF an affordance gap (FD §1c: "the library ships a Command component and the shell
that navigates 100+ stories doesn't use it… the highest-value single addition to the shell"), so it is specced
FIRST-CLASS (a real navigation feature, not a gag). Success looks like: the ℱ wordmark redraws itself as a
Fourier epicycle curve (the logo literally named for it), konami reveals the full-bleed aurora the substrate can
really do, cmd+K fuzzy-navigates every story, the empty-states page carries a pointer-leaning blob mascot + the
missing 404 route, and a long-press on the dark toggle plays a slow eclipse — all PRM-fenced, all on existing
machinery, the system's point-of-view (the ℱ, the warm cream, the levity) cashed in surprises.

## Completion criterion

The hard gate (§6) verifies, each egg born-RED at HEAD (the runtime/grep evidence that it does NOT exist today):
(G-FREDRAW) the wordmark ℱ-redraw plays a Fourier epicycle reconstruction of the glyph on the long-press/dbl-click
seam, PRM-static; (G-KONAMI) the konami sequence reveals a full-bleed aurora for a bounded window then restores
(born-RED: FD §9.2.9 dispatched the sequence live → zero DOM reaction); (G-CMDK) cmd+K opens the shipped
CommandDialog and fuzzy-navigates the manifest routes (born-RED: FD §1c — no global cmd+K, the Command component
unused by the shell); (G-MASCOT) the empty-states GooBlob leans toward the cursor + the 404 route paints a
constellation (born-RED: 0 blob placements, no 404 route); (G-ECLIPSE) a long-press on the dark toggle plays the
slow eclipse register; (G-PRM) EVERY egg is PRM-gated (a source + a CDP-emulated `prefers-reduced-motion`
readback finds each egg static/suppressed under reduce); (G-DELTA) the own-surface captured DELTA
(`W-EGG-*.png`/short clips, light+dark) shows each egg firing, per `proof:live-verified-ledger`. Both goal AND
completion hold for a clean close.

---

## 1. The verified defect (file:line, from FD-storybook §5 + the machinery grep)

### 1.1 The bare egg shelf — runtime-confirmed (FD §5, §9.2.9)

FD-storybook §5: what EXISTS today (all discoverable, none gratuitous) — the `?` shortcut help, the `,`/FAB
PresetEditor, the typewriter hero with the anchored ℱ-glyph, the Lovelace/Turing/Hopper table fixtures, the kbd
hints in dock tooltips. What does NOT exist: **"grep across `demo/` + `src/` confirms: no konami, no seasonal, no
hidden interactions."** §9.2.9 hardened it to a RUNTIME fact: the full konami sequence dispatched live against the
shell → element count 298 → 298, no class change. The substrate set implies surprises it never cashes.

### 1.2 The six divined eggs (FD §5, each ONLY shipped machinery — with the file:line of the machinery)

| # | Egg | Shipped machinery (file:line) | The seam |
|---|---|---|---|
| E1 | **The ℱ redraws itself** | `FourierField.vue` (the epicycle reconstruction) + `fourier-field/math.ts` `positionsAt(components, t)` (`:41-62` reconstructs a curve from a `BasisComponent[]` spectrum) + the rail wordmark home anchor (`SidebarDock.vue:73-78` `#persistent` ℱ) | long-press / dbl-click the wordmark → a FourierField overlay reconstructs the ℱ glyph as an epicycle curve, then fades. "The logo is literally named for this; the component literally does this. The single most befitting easter egg in the codebase" (FD §5.1) |
| E2 | **Konami → full-bleed aurora** | the shipped `<Aurora>` at `intensity: 1` (`Aurora.vue` exposes `opacityCeiling` `:83`, `pause`/`resume` `:141-142`) + the `registerShortcut` registry (`AppShell.vue:43-72`) | the konami sequence → the shipped Aurora escaped from behind the card to full-bleed for ~10s (the "what the substrate can really do" reveal), then restores. Any page (FD §5.2) |
| E3 | **cmd+K command palette** (HALF affordance) | the shipped `CommandDialog` (`src/components/ui/command/CommandDialog.vue`, a `v-model:open` `DialogRootProps` wrapper) + `Command*` family + the manifest route set (`manifest.ts`) | dogfood the shipped Command component for fuzzy story navigation. "Half affordance gap, half delight; the highest-value single addition to the shell" (FD §5.3, §1c). The shell navigates 100+ stories with NO cmd+K |
| E4 | **GooBlob empty-state mascot + the 404** | the shipped `<GooBlob>` (`/goo-blob`, pointer-reactive — `useBlobPointer`, `GooBlob.vue:74`) + the `compositions/empty-states` route + the missing 404 catch-all (`manifest.ts:294` empty-states exists; NO 404 route — verified) | a small pointer-reactive blob on empty-states that leans toward the cursor; the missing 404 route paints "a constellation + 'lost in the lattice'" (FD §5.4) |
| E5 | **Long-press the dark-mode flip → slow eclipse** | the shipped `DarkModeToggle` (`controls/DarkModeToggle.vue` — the `toggle-sun` SVG already animates on a 750ms `--spring-bouncy` transition `:99-106`, `passive` prop) | long-press the toggle → a slow eclipse transition (the sun/moon SVG is already animated; give it one indulgent register). FD §5.5 |
| E6 | **(the shell dark toggle — the affordance E3's sibling)** | `DarkModeToggle` exists ONLY on its own story page (`display/dark-mode-toggle`); the rail `#persistent` region has room beside ℱ (`SidebarDock.vue:71-78`) | FD §9.2.12: "a design system whose dark register is a selling point HIDES the switch." Not a divined EGG per se but the affordance E5 hangs off — the toggle must be in the shell chrome for the long-press to be reachable. W-EGG places it (or routes to W-SB-STAGE/W-SB1 if a chrome wave owns it — see §2.6) |

### 1.3 Why ONE wave (the gestalt — shared machinery + the shared PRM fence)

The six eggs share (a) the SHIPPED-machinery constraint (each composes an existing primitive — no new substrate),
(b) the `prefers-reduced-motion` fence (every egg is delight that must suppress under reduce), (c) the demo-shell
edit surface (`AppShell.vue` registry + `SidebarDock.vue` wordmark + the empty-states/404 routes), and (d) the
same DELTA capture protocol. Authoring them as ONE wave shares the PRM fence + the capture harness + the
machinery-grep (each egg's born-RED witness is the same shape: "this interaction produces no reaction at HEAD").
The cmd+K is the one with affordance VALUE (not pure delight) — it is specced first-class (§2.3), but rides the
same wave because it shares the shell-registry edit surface.

---

## 2. Objective (the six eggs, each a composition; cmd+K first-class)

### 2.1 E1 — the ℱ wordmark redraws itself as a Fourier epicycle curve

The single most-befitting egg. Long-press (or dbl-click) the rail wordmark ℱ (`SidebarDock.vue:73-78`) → a
FourierField-style overlay reconstructs the ℱ GLYPH as an epicycle curve, then fades.

**The one non-trivial machinery piece (spec it honestly).** `FourierField` reconstructs a SEEDED PROCEDURAL
spectrum (`makeEllipticSpectrum`, `math.ts:89` — a dominant counter-rotating pair + random harmonics), NOT an
arbitrary glyph. To redraw the actual ℱ, the egg needs a glyph→points→DFT path:

1. Sample the ℱ glyph OUTLINE to a point set (the `fourier-f`-styled glyph path; an SVG `getPointAtLength` walk
   over the glyph's `<path>`, or a hand-authored small point set tracing the ℱ — ~64-128 samples).
2. A NEW `dftFromPoints(points: [number,number][]): BasisComponent[]` helper in `fourier-field/math.ts` — the
   forward DFT that the existing `positionsAt(components, t)` (`:41-62`) inverse-reconstructs. The `BasisComponent`
   / `comp()` shape (`:14-25`) is the target type; `positionsAt` is the existing consumer. This is a small,
   well-bounded math addition (a forward DFT is ~15 lines), and it is GENERAL (any glyph/path can drive the
   epicycle redraw — it is NOT an ℱ-overfit; the overfitting bar is met because it composes the existing
   `positionsAt` and is the inverse of an already-shipped transform).
3. The overlay draws the epicycle chain reconstructing the ℱ on a Canvas2D (the FourierField draw recipe), then
   fades. PRM-static: under reduce, the overlay paints the COMPLETED ℱ curve once (no animated reconstruction).

> **Overfitting note.** `dftFromPoints` is the forward half of the `positionsAt` inverse already shipped — a
> general points→spectrum transform, not an ℱ-special-case. It earns its keep as the natural sibling of the
> existing inverse + the egg consumer (and any future glyph-redraw consumer). If the executing agent finds the
> SVG-glyph sampling too brittle, the fallback is a hand-tuned point set tracing the ℱ — still general
> (`dftFromPoints` consumes any point set). Record which path in PROGRESS.

### 2.2 E2 — konami → full-bleed aurora (a bounded reveal)

The konami sequence (↑↑↓↓←→←→ B A) on ANY page → the shipped `<Aurora>` at `intensity: 1` (`opacityCeiling: 1`)
escapes full-bleed for a bounded window (~10s) over the page, then restores. Built from `AppShell.vue:43-72`'s
`registerShortcut` registry (extend it with a konami sequence detector — a keystroke-buffer match, not 9
single-key shortcuts) + a full-bleed `<Aurora>` overlay mounted at the shell root. PRM-gated: under reduce, the
konami reveal is a STATIC aurora frame (one painted frame, no drift) OR suppressed entirely (the §6 G-PRM
readback decides; the bounded reveal of a static painterly field is acceptable delight under reduce, an
auto-playing drift is not — prefer the static reveal). This is DISTINCT from the constellation konami-FLOCK that
W-CON2 CUT (a different, engine-internal egg with 0 consumers) — this is a SHELL-level aurora reveal, a new
composition of the shipped Aurora.

### 2.3 E3 — cmd+K command palette (FIRST-CLASS — half affordance, half delight)

This is specced first-class because it is the highest-value single addition to the shell (FD §1c, §5.3) and HALF
affordance gap (the shell navigates 100+ stories with no fuzzy nav; the library SHIPS a Command component the
shell doesn't use — a dogfooding miss).

- **Mount the shipped `CommandDialog`** (`src/components/ui/command/CommandDialog.vue`, a `v-model:open`
  `DialogRootProps` wrapper) at the shell root (`AppShell.vue`). `registerShortcut` a `cmd+K` / `ctrl+K` (the
  `metaKey`/`ctrlKey` combo — the registry at `:43-72` is the home) that toggles `open`.
- **Feed it the manifest routes.** `CommandList` + `CommandGroup` (per category) + `CommandItem` per
  `manifest.ts` route; `CommandInput` drives the fuzzy filter (the library's `search` fuzzy facility or the
  Command component's built-in filter). Selecting an item `router.push`es the route (the same nav the rail +
  the W-SB1-fixed intro index drive).
- **Affordance, not gag.** It is a real navigation feature — discoverable (a `⌘K` hint in the help dialog +
  optionally the rail), keyboard-first, dogfooding the Command primitive. NOT PRM-sensitive in its CORE
  function (navigation must work under reduce); the OPEN/CLOSE animation rides the shipped dialog grammar which
  already honors PRM. G-PRM for E3 asserts the OPEN works under reduce (no motion-gated functionality), not that
  it is suppressed.

### 2.4 E4 — GooBlob empty-state mascot + the constellation 404

- **The mascot.** `compositions/empty-states` (`manifest.ts:294`) gets a small pointer-reactive `<GooBlob>` that
  leans toward the cursor (the shipped `useBlobPointer`, `GooBlob.vue:74`, already does pointer-attraction). The
  SUBSTRATE PLACEMENT (the blob on the page, the `StoryBackgroundKind` `blob` seam) is W-SB-STAGE's §2.2; W-EGG
  drives the MASCOT register (the pointer-lean tuned for a playful mascot, the empty-state copy "nothing here
  yet"). W-EGG DEPENDS on the W-SB-STAGE blob seam (if it has not landed, E4's mascot arm is born-RED on that
  dependency). PRM-gated: under reduce the blob is static (no pointer-lean animation — the `useWebGLCanvas`
  substrate already PRM-freezes, `GooBlob` inherits it).
- **The 404.** Add the missing catch-all route (`manifest.ts` / the demo router) painting a constellation +
  "lost in the lattice" (FD §5.4). REUSE the DEMO-ONLY constellation supernova/warp the W-CON2 wave ships
  (`Constellation` `warpTo` `:540`, the demo-only supernova) — a 404 that warps the lattice on entry. PRM-gated:
  static lattice under reduce.

### 2.5 E5 — long-press the dark toggle → slow eclipse

The `DarkModeToggle` (`controls/DarkModeToggle.vue`) already animates the `toggle-sun` SVG on a 750ms
`--spring-bouncy` transition (`:99-106`). A LONG-PRESS (vs the normal `@click` toggle at `:79`) plays a SLOW
eclipse register — the sun/moon cross-fade stretched into an indulgent eclipse (a longer-duration mask sweep over
the existing SVG, NOT a new graphic). Built on the existing SVG + a long-press gesture handler (a pointerdown
timer). PRM-gated: under reduce the long-press flips dark mode INSTANTLY (no eclipse animation — the toggle's
`disabled`/transition-suppress seam). DEPENDS on E6 (the toggle being IN the shell chrome to be long-pressable —
§2.6).

### 2.6 E6 — the shell dark toggle (the affordance E5 hangs off)

FD §9.2.12: the `DarkModeToggle` lives ONLY on its own story page; flipping the whole book dark requires knowing
that page exists. Place the toggle in the rail `#persistent` region beside ℱ (`SidebarDock.vue:71-78` has room).
This is the AFFORDANCE that makes E5 (long-press eclipse) reachable. **Scope coordination:** if a chrome/staging
wave (W-SB-STAGE or W-SB1) is already placing shell chrome, the toggle placement folds there and W-EGG only adds
the long-press eclipse; otherwise W-EGG places it. Record the owner in PROGRESS. The binding outcome: the toggle
is in the shell chrome AND long-pressable.

---

## 3. Edit-sites (exact)

| File | Edit |
|---|---|
| `src/components/custom/fourier-field/math.ts` | NEW `dftFromPoints(points): BasisComponent[]` — the forward DFT sibling of `positionsAt` (`:41-62`); general points→spectrum (E1, §2.1) |
| `demo/layout/SidebarDock.vue` | E1 — long-press/dbl-click the wordmark ℱ (`:73-78`) → the FourierField ℱ-redraw overlay; E6 — place `DarkModeToggle` in the `#persistent` region beside ℱ (`:71-78`) if W-EGG owns it (§2.6) |
| `demo/layout/AppShell.vue` | E2 — extend the `registerShortcut` registry (`:43-72`) with a konami sequence detector → the full-bleed `<Aurora>` reveal; E3 — `registerShortcut` `cmd+K`/`ctrl+K` → mount the `CommandDialog` fuzzy-nav over the manifest routes; the full-bleed Aurora overlay + the CommandDialog mount at the shell root |
| the demo router (`demo/main.ts` / the route table) | E4 — the missing 404 catch-all route → a constellation + "lost in the lattice" |
| `demo/stories/compositions/empty-states.vue` | E4 — the pointer-leaning GooBlob mascot register (consumes the W-SB-STAGE blob seam) + the empty-state copy |
| `src/components/custom/controls/DarkModeToggle.vue` | E5 — a long-press gesture → the slow-eclipse register over the existing `toggle-sun` SVG (`:99-106`); PRM-instant under reduce. (Library edit — keep the egg DEMO-private if the long-press is shell-only; if the eclipse is a reusable register, gate it behind a `longPress`/`eclipse` opt-in prop so the default click stays unchanged — the overfitting bar: a prop with ≥2 consumers OR demo-private) |
| the ℱ-glyph point source (an asset or inline point set in `SidebarDock.vue`/a demo helper) | E1 — the ℱ outline samples feeding `dftFromPoints` (§2.1) |
| `scripts/proof-easter-eggs.mjs` | NEW — the egg gate (§6): source-witness each egg's seam EXISTS + the PRM-fence witness |
| `scripts/gates.mjs` | ADD the `proof:easter-eggs` row (local + ci; append-only) |
| `package.json` | ADD the `proof:easter-eggs` script entry |
| `.github/workflows/ci.yml` | ADD a `proof:easter-eggs` step |
| `docs/tranches/AY/audit/visual/W-EGG-DELTA.md` | NEW — the own-surface DELTA (each egg firing; §6 G-DELTA) |
| `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` | ADD `W-EGG` |
| `docs/tranches/AY/PROGRESS.md` | record the close + the egg inventory |

---

## 4. Scope fence (what W-EGG does NOT do)

- It does NOT add a new SUBSTRATE or COMPONENT — each egg composes a SHIPPED primitive (Aurora, FourierField,
  Command, GooBlob, Constellation, DarkModeToggle). The ONE new code unit is `dftFromPoints` (a forward-DFT math
  helper, the inverse of the shipped `positionsAt` — general, not an ℱ-overfit).
- It does NOT place the empty-states blob SUBSTRATE (W-SB-STAGE §2.2 owns the `StoryBackgroundKind` blob seam) —
  it drives the mascot INTERACTION on that seam. It DEPENDS on the seam (E4's mascot is born-RED until it lands).
- It does NOT re-fix the front-door nav (W-SB1) — the ℱ-redraw hangs off the wordmark W-SB1 leaves in place.
- It does NOT revive the constellation konami-FLOCK (W-CON2 CUT it, 0 consumers) — E2 is a SHELL-level aurora
  reveal, a new composition. The 404 (E4) REUSES the demo-only supernova W-CON2 ships (no new engine egg).
- It does NOT override `prefers-reduced-motion` — EVERY egg suppresses or goes static under reduce (G-PRM). The
  cmd+K is the exception: its NAVIGATION must work under reduce (only its open/close animation is motion-gated,
  via the shipped dialog grammar).
- The `DarkModeToggle` eclipse (E5) stays the DEFAULT-unchanged: a new `longPress`/`eclipse` opt-in (or
  demo-private gesture), so the bare `@click` toggle is byte-identical to HEAD (no regression to the shipped
  component's default behaviour).

---

## 5. Risk ledger

1. **The ℱ-glyph→DFT path brittleness (E1).** SVG `getPointAtLength` over a variable-font glyph is engine-y; the
   fallback is a hand-authored ℱ point set (still general — `dftFromPoints` consumes any points). LOCKED by the
   G-FREDRAW π readback (the overlay paints a recognizable ℱ epicycle curve, measured by a coverage/shape check,
   not by the sampling mechanism).
2. **PRM-fence completeness (every egg).** A motion egg that fires under reduce is a defect. LOCKED by G-PRM (a
   CDP `prefers-reduced-motion: reduce` readback per egg: ℱ-redraw paints the completed curve once / konami is a
   static aurora frame / blob mascot is static / eclipse flips instantly / cmd+K navigation still works). Every
   egg's reduce-path is asserted, not assumed.
3. **cmd+K not regressing the existing shortcuts (E3).** The `cmd+K` combo must not collide with the existing
   `[ ] { } , ?` registry (`AppShell.vue:43-72`) — those are bare keys, `cmd+K` is a modifier combo, no collision.
   LOCKED by the existing keyboard help dialog enumerating the new combo (the `?` dialog already lists shortcuts).
4. **Konami buffer false-positives (E2).** The keystroke-buffer match must not fire on normal typing (an input
   field focused). LOCKED by gating the detector off non-input focus (the registry's existing input-focus guard).
5. **E4/E6 dependency-order.** E4's mascot depends on the W-SB-STAGE blob seam; E5's eclipse depends on E6's
   shell-toggle placement (which may fold into a chrome wave). Born-RED on the dependency arms until they land
   (explicit). E6 placement owner recorded in PROGRESS.
6. **The `DarkModeToggle` library edit (E5).** Editing a SHIPPED component for a demo egg risks a default
   regression. MITIGATION: the eclipse is an OPT-IN (a `longPress`/`eclipse` prop or a demo-private gesture
   wrapper); the default `@click` is unchanged. LOCKED by a default-path canary (the bare toggle's click behaviour
   is byte-identical to HEAD).

---

## 6. HARD GATE (evidence-backed; each egg born-RED at HEAD)

**Gate name:** `proof:easter-eggs` (NEW; source-witness each seam EXISTS + the per-egg PRM-fence witness) +
`proof:live-verified-ledger` (AY-pathed; the captured DELTA of each egg firing). Born-RED at HEAD (each egg's
"this interaction produces no reaction" is the runtime/grep witness). GREEN only when ALL hold. The π readbacks
run on the live demo (`:5199`, Metal-backed channel — the SwiftShader headless renderer wedges on the aurora
page, FD §0; the konami-aurora reveal NEEDS the GPU-real channel).

**G-FREDRAW (E1 — born-RED: no wordmark redraw).** A π readback: long-press/dbl-click the rail wordmark → a
FourierField overlay paints a recognizable ℱ epicycle reconstruction (a coverage/shape check on the painted
curve), then fades; `dftFromPoints` exists in `math.ts` (source-witness, the inverse of `positionsAt`).
**Born-RED at HEAD:** the wordmark `@click` is a `navigate` emit only (`SidebarDock.vue:78`), no redraw; no
`dftFromPoints`. Bite: remove the redraw handler → the overlay never paints.

**G-KONAMI (E2 — born-RED: FD §9.2.9 runtime-dead).** A π readback dispatches the konami sequence live → the
full-bleed `<Aurora>` reveal paints (a non-blank aurora frame fills the viewport for the bounded window), then
restores (the page returns to its prior state). **Born-RED at HEAD:** FD §9.2.9 dispatched the sequence → element
count 298→298, zero reaction. Bite: remove the detector → no reveal.

**G-CMDK (E3 — born-RED: FD §1c, no global cmd+K).** A π readback: `cmd+K`/`ctrl+K` opens the shipped
`CommandDialog`; typing filters the manifest routes; selecting an item `router.push`es and the route CHANGES
(`currentRoute.path` updates). Source-witness: the shell mounts `CommandDialog` (dogfooding the shipped Command
component). **Born-RED at HEAD:** no `cmd+K` in the registry; `grep CommandDialog demo/layout/` → 0 (the shell
doesn't use it). Bite: unbind the shortcut → cmd+K does nothing.

**G-MASCOT (E4 — born-RED: 0 blob placements, no 404).** A π readback: the `empty-states` GooBlob leans toward a
moved cursor (the painted blob centroid shifts toward the pointer); the 404 catch-all route paints a
constellation. Source-witness: the 404 route exists in the router; the empty-states page mounts `<GooBlob>`.
**Born-RED at HEAD:** 0 blob placements in the book (FD §2); no 404 route (`manifest.ts` — verified). DEPENDS on
the W-SB-STAGE blob seam (born-RED on that arm until it lands).

**G-ECLIPSE (E5 — born-RED: no long-press register).** A π readback: a long-press on the shell dark toggle plays
the slow-eclipse cross-fade (a longer-duration mask sweep, distinguishable from the bare-click flip); the bare
`@click` flip is byte-identical to HEAD (the default-path canary). **Born-RED at HEAD:** `DarkModeToggle:79` is a
plain `@click="toggleDark()"` — no long-press, no eclipse. DEPENDS on E6 (the toggle in the shell chrome).

**G-PRM (every egg — the motion fence).** A source + CDP `prefers-reduced-motion: reduce` readback per egg:
ℱ-redraw paints the completed curve once (no animated reconstruction); konami is a static aurora frame (or
suppressed); the blob mascot is static (the `useWebGLCanvas` PRM-freeze); the eclipse flips instantly; cmd+K
NAVIGATION still works (only its dialog open/close is motion-gated, via the shipped grammar). **Born-RED at HEAD:**
N/A (the eggs don't exist) — this clause is the BUILT-IN bar each egg must clear. Bite: remove an egg's PRM guard
→ the egg animates under reduce → REDs.

**G-DELTA (the own-surface captured DELTA — the cardinal lesson).** `proof:live-verified-ledger --tranche=AY`
GREENs over the `W-EGG` row: `audit/visual/W-EGG-DELTA.md` references the own-surface `W-EGG-*.png` (or short
clips) of each egg FIRING — the ℱ-redraw mid-reconstruction, the full-bleed konami aurora, the open cmd+K
palette, the leaning blob + the 404 lattice, the eclipse mid-sweep — in light AND dark where a theme axis
applies. **Born-RED at HEAD:** no `W-EGG-*.png` exist.

**Why this gate, not grep-alone:** each egg is a RUNTIME interaction; FD §9.2.9 PROVES a grep ("no konami in
source") under-states it — the binding witness is the LIVE dispatch producing a reaction (the konami reveal, the
route change, the leaning blob). The π readbacks are born-RED against the runtime-dead HEAD (the dispatched
konami → 298→298, the wordmark → navigate-only, the absent cmd+K). G-PRM is the motion-fence each egg must
clear or it is a defect, not a delight.

---

## 7. Convergence + named successors

W-EGG converges when G-FREDRAW/G-KONAMI/G-CMDK/G-MASCOT/G-ECLIPSE/G-PRM/G-DELTA all verify. On miss:

- If the ℱ-glyph SVG sampling is too brittle (risk-1), E1 falls back to a hand-authored ℱ point set →
  `dftFromPoints` (still general). A second miss closes E1 at the procedural-seed approximation (a seed tuned to
  visually approximate the ℱ) with the residual recorded; the OTHER five eggs are independent and close on their
  own gates.
- E4's mascot depends on **AY.W-SB-STAGE** (the blob seam) + E5's eclipse on E6 (the shell-toggle placement). If
  a dependency slips, that egg's arm stays born-RED until it lands (the dependency is in the gate); the
  independent eggs close.
- If the cmd+K fuzzy-nav (E3) wants the library's `search` facility and that integration exceeds the wave scope,
  E3 ships with the Command component's BUILT-IN filter (still a real fuzzy nav) and routes the `search`-backed
  ranking to a follow (recorded). The affordance (cmd+K opens + navigates) is the binding bar; the ranking
  quality is the polish.

---

## 8. Cross-references

- Provenance: `audit/design/FD-storybook.md` (§5 the egg inventory + the six divinations, §1c the missing cmd+K,
  §9.2.9 konami runtime-dead, §9.2.12 the hidden dark toggle), `audit/design/FD-substrate-pages.md` (§2 the
  mood-blob seam).
- Sibling waves: **W-SB-STAGE** (the empty-states blob SEAM E4 sits on; the shell-toggle placement E6 may fold
  there), **W-SB1** (the wordmark home anchor E1 hangs off; the front-door nav cmd+K complements), **W-CON2** (the
  demo-only supernova the 404 reuses; the cut konami-flock E2 is NOT — E2 is a new shell aurora reveal).
- Machinery: `FourierField.vue` + `fourier-field/math.ts` `positionsAt` (the inverse `dftFromPoints` is sibling
  to), `Aurora.vue` (`opacityCeiling`/`pause`/`resume` — the konami reveal), `command/CommandDialog.vue` (the
  cmd+K host), `GooBlob.vue` (`useBlobPointer` — the mascot lean), `Constellation.vue` (`warpTo`/supernova — the
  404), `controls/DarkModeToggle.vue` (the `toggle-sun` SVG — the eclipse), `AppShell.vue:43-72` (the
  `registerShortcut` registry), `SidebarDock.vue:71-78` (the wordmark + `#persistent` region).
- Precepts: `TRANCHE-AND-WAVE-SPEC.md` §"Hard gate" (the π-readback kind, born-RED); MEMORY
  `feedback_overfitting_audit` (`dftFromPoints` is general, the inverse of a shipped transform — not an ℱ-overfit;
  the eggs compose shipped primitives); the cardinal-lesson DELTA (`proof:live-verified-ledger`); CLAUDE.md PRM
  doctrine (`useWebGLCanvas` PRM-freeze; the §6 easing PRM fence — every egg suppresses under reduce).
