// BJ TERMINAL-ROSTER row #9 (W-GATE-TRUTH) — G-GATE-BUDGET's vitest seat.
//
// The seat that owns "exactly 60" finally has an executable. Before this file, §B.5's 60
// and C19's 48/5/11 were two numbers printed side by side that shared no identifier and
// had no committed detector between them — the code-side one was produced by a script that
// was lost with the governance stash (cursor ⊕¹³ᵃ), which is why #9/#65 were forbidden to
// quote it at all. `scripts/gate-register.mjs` re-derives both; this seat runs it in the
// suite and proves it can fail.
//
// The bites override the injected io IN MEMORY — no disk writes, no fixtures on disk.
// One severance per check the detector claims to make.
//
// CURE ROUND (verdict CURE-REQUIRED). The adjudicating probe proved four blindnesses that
// all scored ABSENT registrations as BOUND — `it.skip(`, `it.todo(`, `// it(`, `/* it( */`
// — and one that scored an UNENROLLED gate as enrolled (every pixel-floor run step deleted
// from `ci.yml`, the word surviving in the prose comment at `:57`). Under the ⊕²⁵ status
// vocabulary each of those is ABSENT, and ABSENT is never GREEN. The bites below are the
// severances that hold the cures: revert `CALL_FORM` to admit `skip|todo`, or drop the
// comment strip, or put the substring anchor back, and one of them REDs.

import { describe, expect, it } from "vitest";
import {
    PINNED_ROSTER_SHA256,
    ROSTER_MD_PATH,
    ROSTER_PATH,
    SEAT_BINDING_PATH,
    SEAT_BUDGET,
    verifyGateRegister,
} from "../../scripts/gate-register.mjs";
import { existsSync, readFileSync } from "node:fs";

const realIo = {
    read: (path: string) => readFileSync(path, "utf8"),
    exists: (path: string) => existsSync(path),
};

/** io with ONE file's content swapped, everything else real. */
const ioWith = (path: string, content: string) => ({
    read: (target: string) => (target === path ? content : realIo.read(target)),
    exists: realIo.exists,
});

interface RosterRow {
    id: string;
    sourcePath: string;
    currentRegistration: string;
}

const PINNED_DRIFT_ID = "reka.tags-input.value-binding";

/**
 * A rostered row registered as a plain `it("…")`, so a bite can demote exactly that call
 * form. Never the pinned-drift row.
 */
const plainVictim = (): { row: RosterRow; quoted: string; source: string } => {
    const roster = JSON.parse(realIo.read(ROSTER_PATH));
    for (const row of roster.activeVitest as RosterRow[]) {
        if (row.id === PINNED_DRIFT_ID) continue;
        const source = realIo.read(row.sourcePath);
        for (const quote of ['"', "'", "`"]) {
            const quoted = `${quote}${row.currentRegistration}${quote}`;
            if (source.includes(`it(${quoted}`)) return { row, quoted, source };
        }
    }
    throw new Error("no plainly-registered rostered row found to demote");
};

/**
 * A rostered FILE that wraps its cases in a `describe(` and carries at least two plainly
 * registered rows — the victim for the BLOCK-level bites (round-3 cure #1). The pinned-drift
 * row's file is excluded whole, so a block bite never entangles the one declared drift.
 */
const blockVictim = (): { rows: RosterRow[]; source: string; sourcePath: string } => {
    const roster = JSON.parse(realIo.read(ROSTER_PATH));
    const rows = roster.activeVitest as RosterRow[];
    const driftPath = rows.find((r) => r.id === PINNED_DRIFT_ID)?.sourcePath;
    const byPath = new Map<string, RosterRow[]>();
    for (const row of rows) {
        if (row.sourcePath === driftPath) continue;
        const source = realIo.read(row.sourcePath);
        if (!source.includes("describe(")) continue;
        const plain = ['"', "'", "`"].some((quote) =>
            source.includes(`it(${quote}${row.currentRegistration}${quote}`),
        );
        if (!plain) continue;
        byPath.set(row.sourcePath, [...(byPath.get(row.sourcePath) ?? []), row]);
    }
    for (const [sourcePath, group] of byPath) {
        if (group.length >= 2) {
            return { rows: group, source: realIo.read(sourcePath), sourcePath };
        }
    }
    throw new Error("no rostered file with a describe( block and two plain registrations");
};

const quoteOf = (source: string, title: string): string => {
    const quote = ['"', "'", "`"].find((q) => source.includes(`it(${q}${title}${q}`));
    if (!quote) throw new Error(`no plain registration to demote for: ${title}`);
    return quote;
};

describe("the gate register binds (G-GATE-BUDGET)", () => {
    it("every seat and every rostered row resolves to an executable", () => {
        const report = verifyGateRegister(realIo);
        expect(report.violations, report.violations.join("\n")).toEqual([]);
    });

    it("states both figures — the 60 doc seats and the measured code register", () => {
        const report = verifyGateRegister(realIo);

        // Figure A — §B.5, exactly 60, user-mandated ceiling.
        expect(report.seats.total).toBe(SEAT_BUDGET);

        // Figure B — recomputed from the C19 arrays, never read off `counts`.
        expect(report.counts.activeVitest).toBe(48);
        expect(report.counts.hardReservedVitest).toBe(4);
        expect(report.counts.conditionalReservedVitest).toBe(1);
        expect(report.counts.worstCaseCountedSeats).toBe(53);
        expect(report.counts.remainingSeats).toBe(7);
        expect(report.counts.externalEnforcement).toBe(11);

        // The provenance pin #9/#65 quote.
        expect(report.rosterSha256).toBe(PINNED_ROSTER_SHA256);

        // Figure A is read from its AUTHORITY, not from the register's own copy: §B.5's
        // heading, its family table and its sum line all re-derive the same 60.
        expect(report.authority.budget).toBe(SEAT_BUDGET);
        expect(
            Object.values(report.authority.families as Record<string, number>).reduce(
                (a, b) => a + b,
                0,
            ),
        ).toBe(SEAT_BUDGET);
        expect(report.authority.declaredSum).toBe(SEAT_BUDGET);

        // The bijection, stated honestly and never rounded up: 6 seats carried a verbatim
        // executable before this row, G-GATE-BUDGET is the 7th and it binds HERE. Two more
        // are named by their arms only and are deliberately NOT counted as bound.
        // [2026-08-04 · BK #65, RT-7 — ~~bound 7 / unbound 51~~ → 8 / 50. #65 bound the
        // PROPORTION seat ("the CWT-2:1533 tranche-wide register") to the executable #68
        // landed, `tests/styles/proportion-register.test.ts`; C-13 blocked #68's seal on
        // exactly that. Seat movement is #65's alone. NOTHING minted: `seats.total` is
        // still 60, `armOnly` still 2, and the sum below still closes on the budget — one
        // ABSENT seat became BOUND, which is the only figure that may move on a binding.]
        // [2026-08-08 · BK #65 W-GATE-COLLAPSE, the C-10 BINDING BATCH — ~~8 / 50~~ →
        // 13 / 45. FIVE more ABSENT seats became BOUND, each on a cursor route, each to an
        // executable that was already landed and already carrying the seat name in a live
        // `describe` title: `G-TABS-SEAM` → `tests/gates/tabs-seam.test.ts` (RT-32B) ·
        // `G-FEEDBACK-TINT-SEAM` → `tests/gates/feedback-tint-seam.test.ts` (RT-71B) ·
        // `G-SPRING-HONEST` + `G-SPRING-ONE-JOB` → `tests/styles/spring-authority.test.ts`
        // (RT-26A, which predicted this exact move) · `G-ENGAGE-RUNG` →
        // `tests/styles/engage-ladder.test.ts` (RT-27A). A BINDING IS NOT A MOVEMENT and
        // nothing was minted: `seats.total` is still 60, `armOnly` still 2, the sum still
        // closes. `G-SPRING-ONE-JOB`'s name is ALSO live in
        // `tests/styles/feedback-motion.test.ts:202`, which is a close-battery ARM naming
        // its seated host — it is deliberately NOT in `paths`, because binding a seat to
        // the arm that cites it is how a register inflates itself.]
        expect(report.seats.bound).toBe(13);
        expect(report.seats.armOnly).toBe(2);
        expect(report.seats.unbound).toBe(45);
        expect(report.seats.bound + report.seats.armOnly + report.seats.unbound).toBe(
            SEAT_BUDGET,
        );
    });

    it("holds the roster drift set as a pinned record, not an allowlist", () => {
        const report = verifyGateRegister(realIo);
        // [2026-08-08 · BK #65 W-GATE-COLLAPSE — ~~exactly one active row's title no longer
        // matches HEAD~~ → ZERO. The recorded drift was REPAIRED at the successor cut: C20's
        // `reka.tags-input.value-binding` adopts the HEAD title and `declaredTitleDrift` is
        // `[]`. The executable was never touched, per the adjudication's own `doNot` — the
        // ROSTER side was the side that drifted.]
        //
        // AN EMPTY SET IS THE ONE STATE THAT CAN GO VACUOUS, so this case does not stop at
        // asserting emptiness. Both directions are re-proved on the repaired bytes: the
        // sibling bite below severs an unrelated title and REDs, and the arm here puts the
        // STALE string back into C20 and REDs the other way. Repair is not suppression only
        // if breaking the repair still bites.
        expect(report.titleDrift).toEqual([]);
        expect(
            JSON.parse(realIo.read(SEAT_BINDING_PATH)).declaredTitleDrift,
        ).toEqual([]);

        const restaled = realIo
            .read(ROSTER_PATH)
            .replace(
                "TagsInput: item text renders from `value=` (the stale `tag=` idiom is gone)",
                "TagsInput: the active item resolves `data-[state=active]` (the `tag=` idiom is gone)",
            );
        expect(restaled).not.toBe(realIo.read(ROSTER_PATH));
        const reRed = verifyGateRegister(ioWith(ROSTER_PATH, restaled));
        expect(reRed.titleDrift.map((d) => d.id)).toEqual([
            "reka.tags-input.value-binding",
        ]);
        expect(reRed.violations.some((v) => v.includes("title drift set moved"))).toBe(
            true,
        );
    });

    // ── mutation bites ────────────────────────────────────────────────────────────────

    it("BITE — a mutated roster byte REDs the sha pin", () => {
        const mutated = realIo.read(ROSTER_PATH).replace("schemaVersion", "schemaVersioN");
        const report = verifyGateRegister(ioWith(ROSTER_PATH, mutated));
        expect(report.violations.some((v) => v.includes("sha256"))).toBe(true);
    });

    it("BITE — a stale `counts` object REDs the recomputation", () => {
        const roster = JSON.parse(realIo.read(ROSTER_PATH));
        roster.counts.activeVitest = 47;
        const report = verifyGateRegister(ioWith(ROSTER_PATH, JSON.stringify(roster)));
        // The sha necessarily moves too; the counts violation must be there on its own.
        expect(
            report.violations.some((v) =>
                v.includes("counts.activeVitest: roster states 47"),
            ),
        ).toBe(true);
    });

    it("BITE — severing a rostered `it(` title REDs as an undeclared drift", () => {
        const roster = JSON.parse(realIo.read(ROSTER_PATH));
        const victim = roster.activeVitest.find(
            (r: { id: string }) => r.id !== "reka.tags-input.value-binding",
        );
        const severed = realIo
            .read(victim.sourcePath)
            .replace(victim.currentRegistration, "a title nobody rostered");
        const report = verifyGateRegister({
            read: (target: string) =>
                target === victim.sourcePath ? severed : realIo.read(target),
            exists: realIo.exists,
        });
        expect(report.titleDrift.map((d) => d.id)).toContain(victim.id);
        expect(report.violations.some((v) => v.includes("title drift set moved"))).toBe(
            true,
        );
    });

    it("BITE — a rostered title that survives only in a COMMENT does not count as bound", () => {
        // The difference between "the words appear in the file" and "an executable case
        // asserts this". Demote a real registration to prose and the row must drift.
        const roster = JSON.parse(realIo.read(ROSTER_PATH));
        const victim = roster.activeVitest.find(
            (r: { id: string }) => r.id !== "reka.tags-input.value-binding",
        );
        const source = realIo.read(victim.sourcePath);
        for (const quote of ['"', "'", "`"]) {
            const needle = `${quote}${victim.currentRegistration}${quote}`;
            if (!source.includes(needle)) continue;
            // the title still reads verbatim in the file — but only as narration
            const demoted = source.replace(needle, `\n// see ${needle} — retired\n`);
            expect(demoted).toContain(needle);
            const report = verifyGateRegister({
                read: (target: string) =>
                    target === victim.sourcePath ? demoted : realIo.read(target),
                exists: realIo.exists,
            });
            expect(report.titleDrift.map((d) => d.id)).toContain(victim.id);
            return;
        }
        throw new Error("no quoted registration found to demote");
    });

    it("BITE — an `it.skip(`'d registration is ABSENT, not bound", () => {
        // Probe-proven pre-cure: `it.skip(` scored BOUND because `CALL_FORM` admitted the
        // modifier. A skipped case is never executed, so under PASS/FAIL/ABSENT it is
        // ABSENT — and a register that calls it live reports GREEN for nothing.
        const { row, quoted, source } = plainVictim();
        const skipped = source.replace(`it(${quoted}`, `it.skip(${quoted}`);
        expect(skipped).toContain(quoted); // the title text is untouched
        const report = verifyGateRegister({
            read: (target: string) =>
                target === row.sourcePath ? skipped : realIo.read(target),
            exists: realIo.exists,
        });
        expect(report.titleDrift.map((d: { id: string }) => d.id)).toContain(row.id);
        expect(
            report.violations.some((v: string) => v.includes("title drift set moved")),
        ).toBe(true);
    });

    it("BITE — a registration commented out with `// it(` is ABSENT, not bound", () => {
        // The second probe-proven blindness: the whole call survives as text, so a
        // substring matcher sees a live registration. Comments are stripped before any
        // match now, so the title is not in the live bytes at all.
        const { row, quoted, source } = plainVictim();
        const commented = source.replace(`it(${quoted}`, `// it(${quoted}`);
        expect(commented).toContain(quoted);
        const report = verifyGateRegister({
            read: (target: string) =>
                target === row.sourcePath ? commented : realIo.read(target),
            exists: realIo.exists,
        });
        expect(report.titleDrift.map((d: { id: string }) => d.id)).toContain(row.id);
    });

    it("BITE — a `describe.skip(` block leaves every rostered row beneath it ABSENT", () => {
        // ROUND-3 cure #1. `CALL_FORM` reads one call and cannot see the block above it, so
        // pre-cure (probe at HEAD `e2b7a0b5`) wrapping this victim's describe scored BOTH
        // rostered rows BOUND: `drift:[reka.tags-input.value-binding] violations:0`. The
        // runner executes neither, and ABSENT is never GREEN.
        const { rows, source, sourcePath } = blockVictim();
        const clean = verifyGateRegister(realIo).titleDrift.map((d) => d.id);
        for (const row of rows) expect(clean).not.toContain(row.id);

        for (const modifier of [".skip", ".todo", ".skipIf(true)"]) {
            const suppressed = source.replaceAll("describe(", `describe${modifier}(`);
            for (const row of rows) {
                // the title text is untouched — only the block above it moved
                expect(suppressed).toContain(row.currentRegistration);
            }
            const report = verifyGateRegister(ioWith(sourcePath, suppressed));
            const drifted = report.titleDrift.map((d: { id: string }) => d.id);
            for (const row of rows) expect(drifted, modifier).toContain(row.id);
            expect(
                report.violations.some((v: string) => v.includes("title drift set moved")),
                modifier,
            ).toBe(true);
        }
    });

    it("BITE — a live `it.only(` leaves its rostered siblings ABSENT, itself bound", () => {
        // The same species read the other way: `.only` still RUNS its own case, so it stays
        // bound — every sibling the runner now skips is ABSENT. Pre-cure both scored BOUND.
        const { rows, source, sourcePath } = blockVictim();
        const [only, ...siblings] = rows;
        const quote = quoteOf(source, only.currentRegistration);
        const title = `${quote}${only.currentRegistration}${quote}`;
        const onlyd = source.replace(`it(${title}`, `it.only(${title}`);
        expect(onlyd).not.toBe(source);
        const report = verifyGateRegister(ioWith(sourcePath, onlyd));
        const drifted = report.titleDrift.map((d: { id: string }) => d.id);
        expect(drifted).not.toContain(only.id);
        for (const sibling of siblings) expect(drifted).toContain(sibling.id);
    });

    it("BITE — gutting every pixel-floor run step from ci.yml REDs, comment or no comment", () => {
        // The challenger's exact probe: delete the four pixel-floor step lines and the
        // word still survives in the prose comment at ci.yml:57. Pre-cure this yielded
        // `badAnchors: [] violations: []` — C-13's own class ("an unwired gate cannot
        // fail") reproduced inside the detector that scopes C-13.
        const ci = realIo.read(".github/workflows/ci.yml");
        const gutted = ci
            .split("\n")
            .filter((line) => !/^\s*(- name:.*pixel floor|run:.*pixel-floor)/.test(line))
            .join("\n");
        expect(gutted).toContain("pixel-floor"); // survives in the comment
        expect(gutted).not.toMatch(/run:.*pixel-floor/);
        const report = verifyGateRegister(ioWith(".github/workflows/ci.yml", gutted));
        expect(
            report.badAnchors.some((a: string) =>
                a.includes(".github/workflows/ci.yml#pixel-floor"),
            ),
        ).toBe(true);
    });

    it("BITE — gutting release.sh's pixel-floor commands REDs the FOLDED anchor", () => {
        // ~~C19 anchors `scripts/release.sh` as a BARE PATH, so existsSync alone answered
        // it. #9's supplemental anchors (SEAT-BINDING.json, routed to #65) bind the
        // release edge to a real command line~~ [2026-08-08 · BK #65 — THE MECHANISM
        // MOVED AND THIS BITE FOLLOWED IT RATHER THAN BEING DELETED. #9 could not repair
        // a sha-pinned file, so it measured the missing fragments in SEAT-BINDING.json's
        // `supplementalAnchors` and routed them here. The successor cut FOLDS all six into
        // C20's own `enrollment` arrays, `supplementalAnchors` is `[]`, and check 3 —
        // not check 6 — is what carries them now. Left alone, this case would have gone
        // VACUOUS-GREEN over an empty array, which is precisely the class this file
        // exists to convict; the assertion is re-pointed at the live message instead.]
        // Never an allowlist either way: a fold can only add violations.
        const sh = realIo.read("scripts/release.sh");
        const gutted = sh
            .split("\n")
            .filter((line) => !/^\s*npm .*gate:pixel-floor/.test(line))
            .join("\n");
        expect(gutted).toContain("pixel floor"); // the prose comment survives
        const report = verifyGateRegister(ioWith("scripts/release.sh", gutted));
        expect(
            report.badAnchors.some((a: string) =>
                a.includes("scripts/release.sh#gate:pixel-floor"),
            ),
        ).toBe(true);
        expect(
            report.violations.some((v: string) =>
                v.includes("external external.browser.aurora-floor"),
            ),
        ).toBe(true);
        // and the array it moved OUT of is empty, so the old home cannot claim the bite
        expect(
            JSON.parse(realIo.read(SEAT_BINDING_PATH)).supplementalAnchors,
        ).toEqual([]);
    });

    it("BITE — dropping `tests/` from tsconfig.test.json REDs all EIGHT folded type rows", () => {
        // The widest of #9's six measurements and the one that proves the fold is real
        // rather than decorative: the eight `.test-d.ts` rows only typecheck because
        // `tsconfig.test.json`'s `include` carries `tests/`, and C19 anchored the FILE
        // rather than the include. Folded into C20 as `tsconfig.test.json#tests/`, the
        // fragment must resolve against live JSON with its comments stripped — so a
        // fragment may not hide in the JSONC prologue either.
        const tsconfig = realIo.read("tsconfig.test.json");
        const gutted = tsconfig.split('"tests/').join('"src/');
        expect(gutted).not.toBe(tsconfig);
        const report = verifyGateRegister(ioWith("tsconfig.test.json", gutted));
        const hits = report.violations.filter(
            (v: string) =>
                v.includes("tsconfig.test.json#tests/") &&
                v.includes("enrollment anchor unresolved"),
        );
        expect(hits).toHaveLength(8);
    });

    it("BITE — a `#`-commented command inside a `run: |` block scalar REDs the anchor", () => {
        // ROUND-3 cure #2. Cure #2 stripped comments from the INLINE `run:` form only, so
        // C-13's class simply relocated into the standard multi-line Actions idiom: pre-cure
        // (probe at HEAD `e2b7a0b5`) both pixel-floor commands moved into `run: |` with a
        // single `# npm -w tests-visual run gate:pixel-floor:ci` body line still resolved —
        // `badAnchors: [] violations: 0`.
        const ci = realIo.read(".github/workflows/ci.yml");
        const relocated = ci
            .split("\n")
            .map((line) => {
                const match = line.match(/^(\s*)(- )?run: (.*pixel-floor.*)$/);
                if (!match) return line;
                const indent = match[1] + (match[2] ? "  " : "");
                return `${match[1]}${match[2] ?? ""}run: |\n${indent}  # ${match[3]}`;
            })
            .join("\n");
        expect(relocated).toContain("pixel-floor"); // survives, commented, inside the scalar
        expect(relocated).toMatch(/run: \|\n\s+# npm .*pixel-floor/);
        expect(relocated).not.toMatch(/run: [^|\n]*pixel-floor/);
        const report = verifyGateRegister(ioWith(".github/workflows/ci.yml", relocated));
        expect(
            report.badAnchors.some((a: string) =>
                a.includes(".github/workflows/ci.yml#pixel-floor"),
            ),
        ).toBe(true);
    });

    it("BITE — an EMBEDDING seat rename (`XX-…-RETIRED`) REDs instead of binding", () => {
        // ROUND-3 cure #3. `indexOf` — and `\b`, since `-` is a non-word character — both
        // match a seat name inside a longer one. Pre-cure (probe at HEAD `e2b7a0b5`)
        // renaming every `G-RUNG-ONLY` to `XX-G-RUNG-ONLY-RETIRED` left `nameIsLive` TRUE
        // and the register green: a phantom binding to a seat nothing carries, under exactly
        // the add-one-retire-one motion §B.5 performs.
        const trap = realIo.read("tests/gates/trap-gates.test.ts");
        const renamed = trap.replaceAll("G-RUNG-ONLY", "XX-G-RUNG-ONLY-RETIRED");
        expect(renamed).toContain("G-RUNG-ONLY"); // the substring survives inside the new name
        expect(renamed).not.toMatch(/(?<![A-Za-z0-9_-])G-RUNG-ONLY(?![A-Za-z0-9_-])/);
        const report = verifyGateRegister(
            ioWith("tests/gates/trap-gates.test.ts", renamed),
        );
        expect(
            report.violations.some(
                (v: string) =>
                    v.includes("seat G-RUNG-ONLY") && v.includes("only in prose"),
            ),
        ).toBe(true);
    });

    it("BITE — a seat name surviving only in a COMMENT does not count as bound", () => {
        // The seat side of the same law: `:206` was a bare `includes`, so a seat named in
        // a header comment scored bound. Demote the arm host's describe title and both
        // arm-only seats must RED.
        const trap = realIo.read("tests/gates/trap-gates.test.ts");
        const demoted = trap.replace(
            /describe\("trap gates[^\n]*\n/,
            'describe("trap gates — the B4/B5 arms", () => {\n',
        );
        expect(demoted).toContain("G-RUNG-ONLY"); // still there — in comments only
        const report = verifyGateRegister(ioWith("tests/gates/trap-gates.test.ts", demoted));
        expect(
            report.violations.some(
                (v: string) =>
                    v.includes("seat G-RUNG-ONLY") && v.includes("only in prose"),
            ),
        ).toBe(true);
    });

    it("BITE — a §B.5 family movement REDs Figure A against its authority", () => {
        // Before the cure the detector never opened TERMINAL-ROSTER.md: `seats.length ===
        // 60` and the family tally compared SEAT-BINDING.json to itself. Move a seat at
        // the authority and the register must notice.
        const md = realIo.read(ROSTER_MD_PATH);
        const moved = md.replace("| MOTION | 4 |", "| MOTION | 5 |");
        expect(moved).not.toBe(md);
        const report = verifyGateRegister(ioWith(ROSTER_MD_PATH, moved));
        expect(
            report.violations.some(
                (v: string) => v.includes("family MOTION") && v.includes("§B.5 allocates 5"),
            ),
        ).toBe(true);
    });

    it("BITE — a seat claiming a binding its file does not carry REDs", () => {
        const seatFile = JSON.parse(realIo.read(SEAT_BINDING_PATH));
        const unbound = seatFile.seats.find(
            (s: { binding: string }) => s.binding === "none",
        );
        unbound.binding = "seat-detector";
        unbound.paths = ["scripts/gate-register.mjs"];
        const report = verifyGateRegister(
            ioWith(SEAT_BINDING_PATH, JSON.stringify(seatFile)),
        );
        expect(
            report.violations.some((v) => v.includes("only in prose")),
        ).toBe(true);
    });

    it("BITE — a seat register that is not exactly 60 rows REDs the budget", () => {
        const seatFile = JSON.parse(realIo.read(SEAT_BINDING_PATH));
        seatFile.seats.pop();
        const report = verifyGateRegister(
            ioWith(SEAT_BINDING_PATH, JSON.stringify(seatFile)),
        );
        expect(report.violations.some((v) => v.includes("budget is exactly 60"))).toBe(
            true,
        );
    });

    it("BITE — a missing external enrollment anchor REDs", () => {
        const roster = JSON.parse(realIo.read(ROSTER_PATH));
        roster.externalEnforcement[0].enrollment.push(
            "package.json#scripts.a-script-that-does-not-exist",
        );
        const report = verifyGateRegister(ioWith(ROSTER_PATH, JSON.stringify(roster)));
        expect(
            report.violations.some((v) => v.includes("enrollment anchor unresolved")),
        ).toBe(true);
    });
});
