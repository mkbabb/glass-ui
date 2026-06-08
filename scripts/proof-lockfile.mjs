// proof-lockfile.mjs — the lockfile re-drift guard (AS.W2, inv-θ).
//
// The #177 root cause was `package-lock.json` recording the `@mkbabb/*` deps as
// `file:`/`link:` entries pointing at the dev siblings (`../keyframes.js`), so a
// clean CI runner's `npm ci` failed (the sibling is absent). AR.W2 refilled the
// lockfile from the registry; this gate makes the registry-resolution DURABLE —
// a stray `npm install ../keyframes.js` / `npm link` that re-adopts a dev
// sibling into the lockfile fails closed here, rather than silently re-breaking
// CI at the next push.
//
// Policy (registry-default, G.W5 §8): every `@mkbabb/*` package the lockfile
// resolves MUST come from the registry (a `resolved` URL), never a `file:`/
// `link:` path. This is a pure function of package-lock.json — no sibling
// checkout needed, so it runs identically on a dev machine and a clean runner.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";

const lockPath = resolve(ROOT, "package-lock.json");
const lock = JSON.parse(readFileSync(lockPath, "utf8"));
const packages = lock.packages ?? {};

const violations = [];

for (const [key, entry] of Object.entries(packages)) {
    // A `../sibling` top-level package def (npm's adopted-link form) for an
    // @mkbabb package is the drift signature.
    if (/^\.\.\//.test(key) && (entry.name ?? "").startsWith("@mkbabb/")) {
        violations.push(`${entry.name}: local link def '${key}' (must resolve from the registry)`);
        continue;
    }
    if (!key.includes("node_modules/@mkbabb/")) continue;
    // An IN-REPO workspace link (e.g. the `tests-visual` π-lane workspace declared in
    // package.json `workspaces`) records as `link: true` with `resolved` pointing at
    // the committed workspace dir (no `../`). `npm ci` resolves it natively from the
    // repo — it is NOT dev-sibling drift, so it is exempt. Only a `../sibling` link
    // (a `npm link ../keyframes.js`) is the registry-resolution drift this gate guards.
    const linkTarget = typeof entry.resolved === "string" ? entry.resolved : "";
    const isInRepoWorkspace =
        entry.link === true && linkTarget !== "" && !linkTarget.startsWith("..") && packages[linkTarget] !== undefined;
    if (isInRepoWorkspace) continue;
    // A node_modules @mkbabb entry must carry a registry `resolved` URL, never a
    // `link: true` / `file:` resolution.
    if (entry.link === true) {
        violations.push(`${key}: 'link: true' (symlinked to a dev sibling — must be registry-resolved)`);
    } else if (typeof entry.resolved === "string" && entry.resolved.startsWith("file:")) {
        violations.push(`${key}: file: resolution '${entry.resolved}' (must be a registry URL)`);
    } else if (!entry.resolved && entry.version) {
        // A versioned entry with no `resolved` is a workspace/link adoption.
        violations.push(`${key}: no 'resolved' URL (workspace/link adoption — must be registry-resolved)`);
    }
}

if (violations.length) {
    console.error("[proof:lockfile] FAIL — package-lock.json has drifted off the registry:");
    for (const v of violations) console.error(`  ${v}`);
    console.error(
        "\n  Fix: refill from the registry — strip the @mkbabb link entries and\n" +
        "  `npm install --package-lock-only --ignore-scripts` (dev symlinks stay for local builds;\n" +
        "  the lockfile resolves the registry so `npm ci` greens on a clean runner).",
    );
    process.exit(1);
}

console.log("[proof:lockfile] PASS — every @mkbabb/* dep resolves from the registry (no dev-sibling drift).");
