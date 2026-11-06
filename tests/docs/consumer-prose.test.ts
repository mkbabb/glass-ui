// Consumers read MIGRATION.md and README.md inside the installed package, and the
// CHANGELOG's newest entry on the registry page. None of that prose may carry the
// project's own record vocabulary: change ids, work-item ids, dated record brackets or
// paths into the internal records. And the design docs that describe the live tunables
// may not present a deleted token or a removed behaviour as current.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

// Each pattern names one family of internal id. A hit prints the file, line and text.
const INTERNAL_ID: ReadonlyArray<[string, RegExp]> = [
    ["change id (O-NNN)", /\bO-\d{1,3}\b/],
    ["work-item id (XX.W…, W-NAME)", /\b[A-Z]{1,2}\.W(?:\d|-)|\bW-[A-Z]{2,}/],
    ["line or band id (U/Bn, B7, B8)", /\bU\/B\d|\bB[78]\b/],
    ["release-line code", /\b(?:A[IPWXYZ]|B[A-L])\b(?=[\s.,;:)\]—-]|$)/],
    ["dated record bracket", /\[20\d\d-\d\d-\d\d\b|CORRECTION 20\d\d/],
    ["record path", /docs\/tranches\//],
    ["record vocabulary", /\b[Tt]ranche\b|cure wave|L invariant|\bRIDER\b|Φ\d|\bKS-\d|\bproof:[a-z]/],
];

function hits(path: string, text: string): string[] {
    const out: string[] = [];
    text.split("\n").forEach((line, index) => {
        for (const [family, pattern] of INTERNAL_ID) {
            if (pattern.test(line)) out.push(`${path}:${index + 1} [${family}] ${line.trim().slice(0, 140)}`);
        }
    });
    return out;
}

function changelogEntry(version: string): string {
    const source = read("CHANGELOG.md");
    const start = source.indexOf(`## ${version}`);
    expect(start, `CHANGELOG.md has a ## ${version} entry`).toBeGreaterThanOrEqual(0);
    const next = source.indexOf("\n## ", start + 4);
    return source.slice(start, next < 0 ? undefined : next);
}

describe("shipped prose carries no internal ids", () => {
    it.each(["MIGRATION.md", "README.md"])("%s", (path) => {
        expect(hits(path, read(path))).toEqual([]);
    });

    it("the CHANGELOG 11.0.0 entry", () => {
        expect(hits("CHANGELOG.md#11.0.0", changelogEntry("11.0.0"))).toEqual([]);
    });

    it("the scan finds what it is meant to find", () => {
        const planted = [
            "- **O-101: a morph reserves.**",
            "no back-compat shims (L invariant 4)",
            "## 2.0.0 (AI.W1 R3)",
            "the BI cut removes",
            "[2026-09-22 · LIVE: tag]",
            "see `docs/tranches/BK/x.md`",
            "the U/B7 shape set",
        ];
        for (const line of planted) expect(hits("planted", line), line).not.toEqual([]);
        // Ordinary prose that shares letters with an id stays clean.
        for (const line of ["hidden from AT.", "every AA contrast ratio", "the dock seat"]) {
            expect(hits("plain", line), line).toEqual([]);
        }
    });
});

describe("the live design docs describe 11.0.0's tunables", () => {
    // 11.0.0 deletes these tokens and the squish on travel. A struck (`~~…~~`) mention is
    // history and may stay; any other mention presents the deleted thing as current.
    const DELETED = /--tab-indicator-max-stretch|--scale-hover-dock|squish-on-travel/;
    const FILES = [
        "docs/design/tunable-anim.md",
        "docs/design/affordance-map.md",
        "tests-visual/shell-identity.spec.ts",
    ];

    it.each(FILES)("%s", (path) => {
        const live = read(path)
            .split("\n")
            .map((line, index) => [index + 1, line.replace(/~~[^~]*~~/g, "")] as const)
            .filter(([, line]) => DELETED.test(line))
            .map(([n, line]) => `${path}:${n} ${line.trim()}`);
        expect(live).toEqual([]);
    });
});
