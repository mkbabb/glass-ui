import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

// The public shadow-token set is the README's "Shadow tokens" table, the one record.
// Every name it lists must be a token the stylesheets declare or read as a seam, and
// the five families a consumer softens shadows through must be in it.
const root = resolve(__dirname, "../..");
const readme = readFileSync(join(root, "README.md"), "utf8");

const section = readme.split("**Shadow tokens.**")[1]?.split("\n\n")[1] ?? "";
const documented = [...section.matchAll(/`(--[a-z0-9-]+)`/g)].map((m) => m[1]);

const css = (() => {
    const out: string[] = [];
    const walk = (dir: string) => {
        for (const name of readdirSync(dir)) {
            const path = join(dir, name);
            if (statSync(path).isDirectory()) walk(path);
            else if (/\.(css|vue)$/.test(name)) out.push(readFileSync(path, "utf8"));
        }
    };
    walk(join(root, "src"));
    return out.join("\n");
})();

describe("the public shadow tokens", () => {
    it("are listed in the README", () => {
        for (const family of [
            "--shadow-dock-override",
            "--glass-shadow-resting",
            "--glass-shadow-floating",
            "--glass-under-shadow-default",
            "--shadow-cartoon-md",
        ]) {
            expect(documented).toContain(family);
        }
    });

    it("each exists in the stylesheets", () => {
        expect(documented.length).toBeGreaterThan(0);
        for (const token of documented) {
            const declared = new RegExp(`${token}\\s*:`).test(css);
            const read = css.includes(`var(${token}`);
            expect(declared || read, token).toBe(true);
        }
    });
});
