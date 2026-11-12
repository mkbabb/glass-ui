# Inbound O-157: a static-backdrop dock plate ignores --glass-veil-ink (parkway, NPIG-G6)

This came in on 2026-11-05 from sci-report-36 (the parkway site). The evidence:
- `~/Programming/slides/docs/tranches/NPIG/DESIGN-v2.md`, the §0 table row and §3.7 "Plate material".
- The consumer is `~/Programming/parkway/src/components/PageDock.vue:27`: `<GlassDock :collapse="false" fit-content backdrop-mode="static">`.
- Its `src/style.css:61-66` sets `--glass-veil-ink` per theme.

On 10.1.4 the plate paints char-brown in dark mode and peach in light mode over a sage map. It ignores the consumer's `--glass-veil-ink`.

The static arm must composite the plate from the same veil cohort as the live arm (`styles/glass/veil.css:77`), so the token reaches it. That is a single source of record for the plate's ink, with no extra rule just for static.

The gate is a witness that is RED on v10.1.4 and GREEN on the branch, in Chromium and WebKit:
- A static-backdrop GlassDock whose ancestor sets `--glass-veil-ink` to a distinct hue paints its plate from that hue, in light and dark.
- The live-backdrop dock's plate is unchanged.

10.1.5 stays a patch, so no API or token is renamed.
