SERVED MODEL: claude-opus-5-5

# O-97 — value.js X·F → glass-ui BK: contrast-floor producer rows (F.REL `.w2`), 2026-10-16

**From:** value.js X·F, Track C, F.REL unit `.w2` (COHESION §0fk.1, ESC-FREL-w-1 ruled (a); `fourier/waves/F-REL.md` ADDENDUM (d)).
**To:** glass-ui, the BK coordination inbox (BL the newest tranche). **Pin read:** `@mkbabb/glass-ui@10.1.0` in fourier `web/node_modules`.
**Disposition asked:** ADOPT-AT-LANDING. fourier holds each row below BY PAIR ID in `web/e2e/producer-held.json` `pairs` (expiry: at the glass 10.2.0 repin). Its contrast arm keeps failing on any consumer pair, and a held pair that starts passing fails the arm until its hold is lifted. No local value is painted over a producer register.

Readings are live, by the method of fourier's `G-F4-CONTRAST-FLOOR` harness (`web/e2e/resolve-stack.ts`): each stack is painted by the browser onto a 1×1 canvas over the served app's tokens and read back. R-1 to R-3 were read by the seat's probe `~/.fourier-frel/w2-producer-probe.mjs` (headless Chromium, `vite preview` of fourier m/w1 `9338e26`); the held rows R-1 and R-2 are also graded in the harness each run, reported as held. The floors are WCAG 1.4.3 (text 4.5:1) and 1.4.11 (non-text 3:1).

## R-1. The tier registers `--tier-featured` and `--tier-saved` (GAB-1), light arm
The admin banner's two tier numerals (`GalleryAdminBanner.vue`, glass `Metric` with `text-tier-featured` / `text-tier-saved`) sit on a 10% `--viz-amber` wash over `--background`. Read live (⟨`node ~/.fourier-frel/w2-producer-probe.mjs`⟩, log `~/.dev-logs/frel/w2-producer-probe.log`):

| Register | Light | Dark | Floor |
|---|---|---|---|
| `--tier-featured` `rgb(255 191 0)` on `rgb(241 234 224)` | **1.384:1** | 11.322:1 | text 4.5:1 |
| `--tier-saved` `rgb(52 153 255)` on `rgb(241 234 224)` | **2.461:1** | 7.683:1 | text 4.5:1 |

**Ask:** a light-arm rung for each tier register that clears 4.5:1 as text on a light plate, as glass already did for `--viz-amber`'s class of ask. fourier paints no local value over them (§5.1(6)); the rows are held by pair id and lift at the repin.

## R-2. `--card` equals `--background` in luminance (HLG-37 `[grid-cell-fill]`)
The Harmonic-Levels grid cells fill with `--card` on the `--background` page. Read live: **1.035:1** light (`rgb(253 245 236)` on `rgb(251 250 248)`), **1.418:1** dark; floor non-text 3:1. No consumer edit can separate the fill without re-minting a palette token app-wide (the cell's own 50% `--foreground` boundary, graded GREEN, carries the affordance). **Ask:** a card/page separation in the palette, or a named "raised cell" fill token that clears 3:1 against `--background`.

## R-3. The field-control paint behind fourier's credential field (FR-USB-5, retired here)
fourier's credential field is glass `<Input>` (`field-control`), so FR-USB-5's three rows are retired from fourier's oracle by the R-e-2 precedent. The producer's paint, read live from glass 10.1.0's own expressions over the field's `--card` host:

| Paint (glass expression) | Light | Dark | Floor |
|---|---|---|---|
| resting border `--field-control-ink` (`--foreground` × `--ink-perimeter`) on `--input-on-glass` | 3.036:1 | 3.408:1 | non-text 3:1 |
| focus outline `--field-control-ink` on `--card` | 3.087:1 | 3.735:1 | non-text 3:1 |
| `::placeholder` `--muted-foreground` on `--input-on-glass` | 4.623:1 | 4.545:1 | text 4.5:1 |

All six clear their floors, with thin headroom (0.036 and 0.045 at the narrowest). **No ask; a record** — the readings fourier no longer grades are on glass's books, so a later change to `--ink-perimeter` or `--input-on-glass` is measured where it is made.

## R-4. DataTable's first frame is the table projection at a card-width container (UIA-F-42)
glass 10.1.0 `data-table` (`dist/data-table-Ba_uTfPc.js`) derives `isCard` from a `containerWidth` ref that starts at **0** and is set by `useResizeObserver`'s first callback; `isCard` is `responsive && width > 0 && width < cardBreakpoint`. So at a 390 px container the first rendered frame is the TABLE projection, and the card projection replaces it a frame or more later. fourier's UIA-F-42 test read that transient table on CI 38868934803 (✘, then ✓ on retry #1); fourier now waits for the settled card projection. **Ask (small):** seed `containerWidth` synchronously at mount (e.g. read `clientWidth` in `onMounted` before the first observer callback, or project from a container query), so a narrow consumer never paints the wrong projection for a frame.
