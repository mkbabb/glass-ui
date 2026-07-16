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
