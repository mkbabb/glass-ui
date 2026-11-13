import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/* The Actions check out everything but docs/ plus the docs files a gate reads. ci.yml names
   that list three times (two `paths` filters, one `sparse-checkout`) and release.yml once
   more; a gate's new docs read must land in all four, or CI either goes red on an absent
   file or skips a push that changes one. */
const read = (file: string) =>
    readFileSync(join(process.cwd(), ".github/workflows", file), "utf8").split("\n");

const pathsLists = (lines: string[]) => {
    const lists: string[][] = [];
    lines.forEach((line, i) => {
        if (!/^\s+paths:\s*$/.test(line)) return;
        const list: string[] = [];
        for (let j = i + 1; /^\s+- /.test(lines[j] ?? ""); j++) {
            const entry = lines[j]!.replace(/^\s+- "?([^"]*)"?\s*$/, "$1");
            if (entry.startsWith("docs/")) list.push(entry);
        }
        lists.push(list.sort());
    });
    return lists;
};

const sparseList = (lines: string[]) => {
    const at = lines.findIndex((line) => /^\s+sparse-checkout:\s*\|\s*$/.test(line));
    if (at < 0) return null;
    const list: string[] = [];
    for (let j = at + 1; /^\s+!?\/\S/.test(lines[j] ?? ""); j++) {
        const entry = lines[j]!.trim().slice(1);
        if (entry.startsWith("docs/")) list.push(entry);
    }
    return list.sort();
};

describe("the sparse checkout and the CI trigger name the same docs files", () => {
    const ci = read("ci.yml");
    const sparse = sparseList(ci);

    it("ci.yml checks out a docs list", () => {
        expect(sparse?.length).toBeGreaterThan(0);
    });

    it("both `paths` filters trigger on exactly that list", () => {
        const lists = pathsLists(ci);
        expect(lists.length).toBe(2);
        for (const list of lists) expect(list).toEqual(sparse);
    });

    it("release.yml checks out the same list", () => {
        expect(sparseList(read("release.yml"))).toEqual(sparse);
    });

    it("every listed docs file is on disk", () => {
        expect(sparse!.filter((file) => !existsSync(join(process.cwd(), file)))).toEqual([]);
    });
});
