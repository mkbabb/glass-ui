# Pinned legacy SCI page audit

**Observed:** 2026-07-28  
**Source:** `/Users/mkbabb/Programming/sci-report` at `da1e3763f5`  
**Compatibility line:** Atlas 4 / Glass 6 / Keyframes 5.3.5 / value 3.1  
**Browser:** Codex internal Browser  
**Viewports:** 1440 × 900 and 390 × 844  
**Machine evidence:** `LEGACY-SCI-PAGE-AUDIT.json`  
**Evidence SHA-256:**
`f2817b4d98e26cf33219b68d98e0e11893a35fd7825df56a370f073e83102562`

## Complete route universe

The legacy router expands to thirteen routes and all thirteen were navigated
at both viewports: **26 route/viewport cells**.

```text
/
/c/funds
/c/connectivity
/c/outcomes
/usf
/sci
/ecf
/speedtest
/demand
/usf-integrity
/vft-germination
/bead
/definitely-not-found
```

The expansion covers the gallery, three `SECTION_ORDER` category pages, eight
dashboard metadata slugs, and the catch-all.

## Result

| Measure | Result |
| --- | --- |
| Navigated cells | 26/26 |
| Horizontal overflow | 0 |
| Vite error overlays | 0 |
| Unnamed interactive controls | 0 |
| Images missing `alt` | 0 |
| Pages with a `<main>` | 26/26 |
| Missing `<h1>` | `/bead` and the 404, at both viewports |
| Failed SCI figures | 3 desktop / 4 mobile |

The visual system remains deliberate and recognizably authored: category
landings, dashboard essays, and VFT retain coherent editorial hierarchy at
mobile width. The route set is not blank or generically broken.

## Binding defects

### `/sci` is not functionally green

The route renders a proper title, but three desktop and four mobile figure
slots say:

> This figure could not be drawn.

Each exposes “Try again.” The mobile failure card for “Average utilization
against contracted ceiling” is also severely compressed. This is a data/
registry/render-owner failure, not merely a typography defect. Do not mask it
with placeholder values or suppress the failure surface.

### The public-card import boundary is wrong

Navigation triggered repeatable Vite warnings for:

- `/public/data/erate-demand.card.json`;
- `/public/data/sci.card.json`;
- `/public/data/speedtest.card.json`.

Assets under `public/` cannot be JavaScript module imports. If these are runtime
modules, move them under `src/`; if they are public assets, consume their public
URLs. The audit does not assert that this warning alone causes every failed SCI
figure, so the receiving owner must prove the data/registry chain rather than
apply a filename-only workaround.

### Heading ownership

- `/bead` begins directly with chapter I and has no `<h1>`, reproducing the
  active-line hierarchy defect.
- The 404 has visible “404 / Nothing here” content but no `<h1>`. Make the
  not-found title a semantic heading; do not add hidden audit text.

## Hotfix and cleanup

No product source or dependency file was changed. A fresh legacy Vite process
on port 9015 was sufficient to audit the routes; it was stopped after the
Browser pass and the port is clear. The final Browser action closed every audit
tab and restored the viewport.
