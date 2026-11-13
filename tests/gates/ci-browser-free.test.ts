import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/* GitHub Actions run no browser. The browser gates (the pixel floor, `test:browser`,
   the live-site check) run on real hardware in `scripts/release.sh` and by hand after a
   deploy. A step that installs or drives one in a workflow turns this red. */
const dir = join(process.cwd(), ".github/workflows");
const workflows = readdirSync(dir).filter((f) => /\.ya?ml$/.test(f));

const steps = (file: string) =>
    readFileSync(join(dir, file), "utf8")
        .split("\n")
        .filter((line) => !/^\s*#/.test(line));

describe("the Actions are browser-free", () => {
    it("finds the workflows", () => {
        expect(workflows.length).toBeGreaterThan(0);
    });

    it.each(workflows)("%s installs and drives no browser", (file) => {
        const hits = steps(file).filter((line) =>
            /playwright|puppeteer|chromium|webkit|check-live|test:browser|pixel-floor/i.test(line),
        );
        expect(hits).toEqual([]);
    });
});
