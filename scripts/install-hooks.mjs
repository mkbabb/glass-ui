import { accessSync, constants } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

function git(args, options = {}) {
    return execFileSync("git", args, {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        ...options,
    }).trim();
}

try {
    if (git(["rev-parse", "--is-inside-work-tree"]) !== "true") process.exit(0);
} catch {
    process.exit(0);
}

const root = git(["rev-parse", "--show-toplevel"]);
const hook = resolve(root, ".githooks/commit-msg");
accessSync(hook, constants.R_OK | constants.X_OK);

git(["config", "core.hooksPath", ".githooks"], { cwd: root });
const installedPath = git(["config", "--get", "core.hooksPath"], { cwd: root });
if (installedPath !== ".githooks") {
    throw new Error(
        `core.hooksPath did not persist the tracked hook directory (read ${JSON.stringify(installedPath)})`,
    );
}

console.log("[install-hooks] tracked commit verifier installed from .githooks");
