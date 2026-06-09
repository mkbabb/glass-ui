// install-hooks.mjs — AX.W62: point git at the tracked .githooks/ dir (the
// dependency-free hook mechanism; no husky). Run from `prepare`, so a dev
// checkout wires the commit-msg ledger hook on install. A no-git tree (the
// package installed as a dependency) is a silent no-op — `prepare` does not run
// in a consumer's node_modules anyway, and the guard makes it safe regardless.

import { execSync } from "node:child_process";

try {
    execSync("git rev-parse --git-dir", { stdio: "ignore" });
} catch {
    process.exit(0); // not a git checkout — nothing to wire
}

try {
    execSync("git config core.hooksPath .githooks", { stdio: "ignore" });
    console.log("[install-hooks] core.hooksPath → .githooks (commit-msg ledger hook armed)");
} catch (err) {
    // fail-explicit: surface, but never block install on a hook-wiring hiccup.
    console.warn(`[install-hooks] could not set core.hooksPath: ${err?.message ?? err}`);
}
