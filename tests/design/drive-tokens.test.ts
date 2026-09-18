import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────────────────
// O-20 A-5 — the Kind-5 drive table names only tokens the library ships.
//
// `docs/design/tunable-anim.md`'s Kind-5 table is the register of drive scalars a
// consumer re-tunes. A row naming a token that exists nowhere in `src/` is a
// contract the library cannot honour: the consumer writes the name, nothing reads
// it, and the choreography is silently inert. That is exactly what `--card-press-t`
// was — a ghost of the Card `:pressable` wiring deleted at `490cc46e`.
//
// SCOPE, and why it is not the ledger's wording. The disposition ledger proposed
// "every Kind-5 drive token carries an `@property` registration under
// `src/styles/tokens/property-regs*.css`". Measured, that assertion is RED on ELEVEN
// of the table's twelve rows, not on `--card-press-t` alone: only `--glass-btn-press-t`
// is registered there, `--dock-morph-t` is registered in `components/dock/styles/index.css`,
// and the remaining ten are choreography knobs the table's own preamble distinguishes
// from the registered 0..1 scalars (`--scroll-cascade-rise` is a length; registering it
// would be a fiction). So the assertion is scoped to what was measured and to what the
// defect actually is: EXISTENCE. The registration gap is recorded in the lane record,
// not asserted here.
//
// "Exists" means a REGISTRATION, a DECLARATION or a `var()` READ in `src/`. A mention in
// prose does not count — `--progress-crescendo` survived a naive substring search on the
// strength of a comment at `utilities/base.css:23` that says the registration was retired.
// ─────────────────────────────────────────────────────────────────────────────

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");

/** The `| drive | token | … |` rows between `## Kind 5` and the next `## ` heading. */
const kindFiveRows = (doc: string): { drive: string; token: string }[] => {
    const lines = doc.split("\n");
    const start = lines.findIndex((l) => l.startsWith("## Kind 5"));
    expect(start, "tunable-anim.md has a `## Kind 5` section").toBeGreaterThan(-1);
    const rest = lines.slice(start + 1);
    const endRel = rest.findIndex((l) => l.startsWith("## "));
    const body = endRel === -1 ? rest : rest.slice(0, endRel);

    const rows: { drive: string; token: string }[] = [];
    for (const line of body) {
        if (!line.startsWith("|")) continue;
        const cells = line
            .replace(/^\||\|$/g, "")
            .split("|")
            .map((c) => c.trim());
        if (cells.length < 2) continue;
        const token = cells[1].match(/`(--[A-Za-z0-9_-]+)`/)?.[1];
        if (token) rows.push({ drive: cells[0], token });
    }
    return rows;
};

const SOURCE_EXT = /\.(css|ts|vue|js)$/;

const sourceText = (root: string): string =>
    readdirSync(join(process.cwd(), root), { recursive: true, withFileTypes: true })
        .filter((e) => e.isFile() && SOURCE_EXT.test(e.name))
        .map((e) => readFileSync(join(e.parentPath, e.name), "utf8"))
        .join("\n");

describe("tunable-anim.md Kind-5 drive table", () => {
    const rows = kindFiveRows(read("docs/design/tunable-anim.md"));
    const src = sourceText("src");

    /** Registered, declared, or read — never merely mentioned. */
    const live = (token: string): boolean =>
        new RegExp(`@property\\s+${token}(?![\\w-])`).test(src) ||
        new RegExp(`(?<![\\w-])${token}\\s*:`).test(src) ||
        new RegExp(`var\\(\\s*${token}(?![\\w-])`).test(src);

    it("has a drive row for every scalar the register documents", () => {
        expect(rows.length).toBeGreaterThan(0);
    });

    it("names only tokens that exist in src/ — a doc-only token is an inert contract", () => {
        const ghosts = rows.filter(({ token }) => !live(token));
        expect(
            ghosts.map((g) => `${g.drive} → ${g.token}`),
            "Kind-5 rows naming a token with no registration, declaration or read in src/",
        ).toEqual([]);
    });

    it("names --cartoon-press-t, the one press scalar the cast register reads", () => {
        const tokens = rows.map((r) => r.token);
        expect(tokens).toContain("--cartoon-press-t");
        expect(tokens).not.toContain("--card-press-t");
    });
});
