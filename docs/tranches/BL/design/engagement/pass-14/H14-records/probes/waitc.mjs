// H14: holds a WebKit acquisition's first stage until this seat's Chromium acquisition (C8) has ended (the flag file gone), at most 40 min,
// so the seat never runs two heavy runs at once when the webkit lock is granted during a Chromium run
import fs from "node:fs";
const F = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/H14-records/C8.running"; const t0 = Date.now();
while (fs.existsSync(F) && Date.now() - t0 < 40 * 60e3) await new Promise((r) => setTimeout(r, 5000));
console.log(`waited ${Math.round((Date.now() - t0) / 1000)} s for C8 (flag ${fs.existsSync(F) ? "still present at the bound" : "gone"})`);
