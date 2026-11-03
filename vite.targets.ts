// Vite 8's frozen Chromium 111 CSS floor lowers semantic `:dir()` selectors to
// language lists. Glass needs the native selector so nested direction islands
// remain truthful; Chromium/Edge 120 is the last cross-engine floor to reach it.
export const glassCssTarget = [
    "chrome120",
    "edge120",
    "firefox114",
    "safari16.4",
    "ios16.4",
];

// U/B8 N-1 (atlas REPORT-B7E §6) — never lower `light-dark()`. Below the floor (firefox114,
// safari16.4) lightningcss rewrites `light-dark(a, b)` into
// `var(--lightningcss-light, a) var(--lightningcss-dark, b)` and defines those two variables only
// on the `color-scheme` rule of the SAME sheet. Glass declares `color-scheme` in its raw token
// sheets, which are never lowered, so the variables never exist: a lowered value is two colours
// in a row, invalid at computed-value time. HandMark's highlight band (`--hm-band`, the one
// `light-dark()` in an SFC sheet) painted `fill: rgb(0, 0, 0)` on atlas /demand in Chromium and
// WebKit. The polyfill also keys off `prefers-color-scheme`, not the `.dark` class glass toggles,
// so it can never be right here. Glass ships `light-dark()` native everywhere, as its tokens do.
import { Features } from "lightningcss";
export const glassLightningcss = { exclude: Features.LightDark };
