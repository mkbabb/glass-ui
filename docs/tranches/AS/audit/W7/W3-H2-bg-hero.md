# AS.W7 Wave 3 — Harden + Challenge · Cluster H2 (backgrounds + hero · D1, D13)

**Agent:** harden-H2
**Files in scope:** `demo/stories/foundations/paper-glass.vue`, `demo/stories/compositions/hero.vue`, plus the foundations-sibling sweep mandated by the task (`demo/stories/foundations/intro.vue`).
**Method:** adversarial — token-level resolution probe (the defect class is engine-measurable, not just eyeballed) + live re-capture at 1440 / 1280 / 375 in BOTH light and dark, plus the reduced-motion path on the hero. Dev server `http://localhost:5173` (path-based router, not hash). No git-write.

---

## 1. Verdicts on the Wave-2 fixes

### D1 — paper-glass dark wash re-tokenized (`paper-glass.vue:139`) — HOLDS
Wave 2 swapped the four-tier-tile backdrop wash off the no-dark-variant `--rainbow-pastel-{yellow,blue,red}` family onto the `light-dark()`-aware `--section-color-{5,2,0}` at 38/34/28%.

Re-captured **dark, 1440**: the wash reads as an intentional amber→indigo→rose jewel-tone glow behind the five glass-tier tiles; the tiles read as crisp framed surfaces over the near-black `--background` (`rgb(17,15,14)`). Not muddy, not washed-out.
Re-captured **light, 1440**: soft warm bloom, reads as design.

Token probe (dark, `color-scheme:dark`) confirms the mechanism:
- `--section-color-0` → `rgb(234,123,171)` (saturated rose, tuned dark variant)
- `--section-color-2` → `rgb(136,161,231)` (indigo)
- `--section-color-5` → `rgb(232,185,109)` (amber)

vs the OLD tokens, which have NO dark arm and paint the same light pastels over near-black:
- `--rainbow-pastel-red` → `rgb(227,171,171)` (pale grey-pink, ~78% L)
- `--rainbow-pastel-blue` → `rgb(166,185,221)`
- `--rainbow-pastel-yellow` → `rgb(230,219,168)`

That ~78%-L pastel-over-near-black is *exactly* the muddy smear the user reported. Fix is real and mechanism-correct.

### D13 — hero frame + claim card framed surfaces (`hero.vue:69, 173`) — HOLDS
Wave 2 gave the hero-frame `border border-border bg-card shadow-cartoon` (was `border-border/40`, frameless, `backgroundColor: var(--background)` — dissolved into the page bg in dark) and lowered the section-color radial mixes to 36/32/30%. The claim `<Card>` lost its ad-hoc `border-2 border-foreground/10` in favour of the default Card chrome.

Re-captured matrix (all green):
- **dark 1440** — hero is a framed `bg-card` panel, visible border + cartoon shadow, section-color rose/indigo/amber glows *contained inside* the rounded crown; claim card below is a distinct framed panel with the 3-column §01/§02/§03 grid. Both clearly separated from the page bg.
- **dark 1280** — proportions hold, frame reads.
- **dark 375** — frame holds; headline wraps cleanly; `primary-audacious` + ghost buttons render; the prose is legible on the framed surface. (Claim card stacks single-column below `md` per `md:grid-cols-3` — confirmed in source.)
- **light 1440** — warm-cream `bg-card` frame, subtle section-color glow, red italic-`f` signature glyph, cartoon shadow. Reads as a deliberate hero.
- **reduced-motion (dark 1440)** — `matchMedia('(prefers-reduced-motion: reduce)')` = true; the `v-else` static `<h2>` renders the full "A design system *f*or mathematicians, writers & makers." immediately (no typewriter), with the frame + wash intact. The wash carries the static case as the source comment promises. No regression.

---

## 2. Hardening applied (the headline finding)

**REGRESSION FOUND + FIXED: `intro.vue` was the missed sibling page.** Wave 2's D1 fix landed on `paper-glass.vue` but **`demo/stories/foundations/intro.vue:25` still carried the identical broken wash** — `--rainbow-pastel-{red,blue,yellow}` at 45/40/35% behind the brand wordmark + "Glass, paper, and the golden ratio." display title. This is the same defect the user complained about, on the *first page of the storybook*. The task's grep mandate (`grep --rainbow-pastel demo/stories/foundations/`) surfaced it; the other foundations pages are clean (`colors.vue` uses `--section-color-*` as palette swatches, not as a wash — intended; no other foundations page carries a radial-gradient wash).

**Fix (`intro.vue:25`):** re-tokenized onto `--section-color-{0,2,5}` (rose→indigo→amber, preserving the original warm→cool→warm spread) at **34/30/26%** — mirrors the paper-glass treatment, mixes nudged slightly lower than paper-glass's 38/34/28 because intro's hero ellipses are larger (`80%/70%`) so equal mixes would over-saturate. The `hue-rotate(var(--hue-shift))` filter and `paper-grain-overlay` are preserved.

Re-captured intro after the fix:
- **dark 1440** — the hero is now a framed rose/wine→indigo glow with a warm amber base, cleanly over the near-black bg; "Glass, paper, and the golden ratio." is crisp and legible. The muddy washed-out pastel smear is gone — matches the intentional quality of the fixed paper-glass.
- **light 1440** — soft rose→indigo→amber bloom; reads as gradient-rich, intentional design (a touch more saturated/jewel-toned than the old flat pastel, but still soft).

`file:line` of the hardening edit: `demo/stories/foundations/intro.vue:25`.

---

## 3. Regressions / punch-list

None outstanding **after** the intro.vue fix. The one regression found (intro.vue still muddy in dark) was the missed-sibling the task asked me to hunt for, and it is now fixed in-scope. All `--rainbow-pastel` *wash* usages across `demo/stories/foundations/` + `demo/stories/compositions/` are re-tokenized (grep returns NONE).

Non-blocking observation (NOT a defect, no fix applied — out of cluster scope): the demo chassis has an aggressive scroll-spy / route-restore that re-navigates on window-scroll and on bare hash changes (the router is path-based: `/compositions/hero`, not `#/...`). It complicated capture but is not a visual defect and is file-disjoint from H2. Flagged for whoever owns `demo/layout/` if it surfaces elsewhere.

---

## 4. Gates

- `npm run typecheck` — **clean** (`vue-tsc --noEmit`, no output). The intro.vue edit is a demo-only Tailwind class-string change (no TS, no library logic) so no vitest run is warranted; confirmed no test snapshots these demo SFCs.
- No `npm run build` (per instructions).
- No git-write performed. Working tree shows only `demo/stories/foundations/intro.vue` modified in H2 scope; all temp capture PNGs removed (no strays).
