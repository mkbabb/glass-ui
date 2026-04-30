import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));

const missing = [];

for (const [name, value] of Object.entries(pkg.exports ?? {})) {
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;
    if (typeof value.types !== "string") continue;

    const target = resolve(root, value.types);
    if (!existsSync(target)) {
        missing.push(`${name}: ${value.types}`);
    }
}

if (missing.length > 0) {
    console.error(`Missing package export type targets:\n${missing.join("\n")}`);
    process.exit(1);
}

console.log("All package export type targets exist.");
