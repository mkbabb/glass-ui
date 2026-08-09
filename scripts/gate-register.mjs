// BJ TERMINAL-ROSTER row #9 (W-GATE-TRUTH) — G-GATE-BUDGET's executable.
//
// THE INVARIANT: the two gate registers are BOTH true and BOTH measurable.
//   Figure A (doc)  — §B.5's exactly-60 seat budget, PARSED FROM §B.5 ITSELF.
//   Figure B (code) — GATE-SEMANTIC-ROSTER-C20.json's active/reserved/external counts
//                     (C19's, until BK #65 cut the successor on 2026-08-08).
// TR#65: "both figures ship with their detectors or neither ships." Until this file
// existed, figure B had no committed detector at all (the one that produced it was lost
// with the governance stash, cursor ⊕¹³ᵃ) and the two registers shared ZERO identifiers —
// they were only ever printed side by side, never reconciled. SEAT-BINDING.json is the
// missing bijection; this script is what makes both figures re-derivable by command.
//
// THE STATUS VOCABULARY THIS REGISTER SPEAKS (⊕²⁵, routed from #11 §2a, Z-6):
//   A gate's status is what its runner emits — PASS · FAIL · ABSENT — never what an
//   author asserts; an UNWIRED GATE IS ABSENT, NEVER GREEN.
// That is why `unbound` is printed as a first-class figure and never allowlisted: 51 of
// the 60 §B.5 seat names are ABSENT from code, and ABSENT is the honest word for them.
// It is also why the two matchers below are strict — a `.skip`'d, `.todo`'d or
// commented-out registration is ABSENT, and a register that scores it BOUND is lying in
// exactly the direction this vocabulary exists to forbid.
//
// WHAT THIS DOES NOT DO, deliberately. The recovered `verify-governed-invariants.mjs`
// went green only via 3 new files, 6 enrollment edits and a 48-registration migration
// across 28 files with frozen title strings and sha-pinned ordered-id digests — an
// apparatus, and its headline figure was STILL read off the JSON rather than derived.
// This re-derives the checks of it that carry weight and nothing else: the sha pin, the
// counts recomputation, the row->file->title binding, the external enrollment edges, and
// (new, cure #3) the §B.5 authority parse. No `governedInvariant` wrapper, no setup file,
// no package.json chain.
//
// ON CHECK 2 (counts recomputation), stated honestly rather than flattered. The sha pin
// freezes the roster byte-for-byte, so the counts check CANNOT fire without the sha
// violation firing first — it is DOMINATED by check 1 and it is defense-in-depth, not an
// independent weight. It was kept for the moment the pin was re-cut, when it is the only
// thing that re-derives `counts` from the arrays instead of trusting the stored object;
// that moment came at BK #65 and it paid for itself, C20's counts recomputing green over
// arrays whose rows had moved. Four checks were claimed to "carry their own weight";
// three do, and this is the fourth, kept with its dominance declared.
//
// ON THE TITLE DRIFT — REPAIRED, not suppressed. [2026-08-08 · BK #65] The one drifted
// row, `reka.tags-input.value-binding`, adopts the HEAD title in C20 and
// `declaredTitleDrift` is `[]`: the register reads `drift:0`. [2026-08-09 · BK #66 CLOSE
// · RT-18A — that row is GONE from C20 along with the deleted `tags-input` component, so
// the sentence above is now a statement about how `drift` reached 0, not about a row that
// exists. `drift:0` is unchanged and the mechanism below is untouched; the reverse-
// direction bite in `gate-register.test.ts` re-homed onto a surviving row rather than
// being deleted with its subject.] The pinned-set mechanism is
// UNCHANGED and both bites stay live — a NEW drift REDs, and a silent repair of a
// recorded one REDs too. ~~C19 is sha-pinned; the pin is quoted at TERMINAL-ROSTER.md:159
// and :215, so row #9 may not edit it — #65 owns §B.5 and owns the successor cut. The
// drift is therefore PINNED in SEAT-BINDING.json rather than allowlisted~~ — that was the
// pre-successor statement; C19 is still frozen and still quoted truly, the pin now names
// C20. Suppression in neither direction; an allowlist only suppresses one way.
//
// ON `unbound`. [2026-08-08 · BK #65 — the figures are re-measured at the binding cut;
// the prose stands, ~~51~~ **45** of 60 doc seats carry no executable of that name
// (13 bound + 2 arm-only + 45 = 60), and #65's five cursor-named binds are what moved it
// from 50.] That is a REPORTED FIGURE, not a failure: driving it to zero would mean
// minting gate names into code, which is precisely the gates-abrogation mandate's
// forbidden class. #65 RULED the strike-or-name question by MEASUREMENT rather than
// argument: `nameIsLive` over `git ls-files tests scripts` finds a live-name executable
// for 19 of the 50 that were unbound at HEAD, of which one (`AURORA`, a one-word seat
// name matching `scripts/profile-bundle.mjs`) is a demonstrated false positive. Five were
// bound here on a cursor route; the rest await a per-seat live-title read, and NONE is
// bound on the scan alone.
// What this script DOES fail on is a binding that was CLAIMED and is not there — a seat
// declared bound whose name is absent from the LIVE bytes of its named file.

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";

// BK #65 W-GATE-COLLAPSE, 2026-08-08 — THE SUCCESSOR CUT, and the pin moves EXACTLY
// ONCE. C19 is not edited: it stays byte-frozen at `dc05df91…`, so every committed
// quotation of that digest remains TRUE as a statement about C19. C20 carries the
// repaired `currentRegistration`, the six supplemental anchors folded into their rows'
// `enrollment`, and three DELETED `authority` keys, with
// `authority.supersedesRosterSha256` naming the file it succeeds.
export const ROSTER_PATH =
    "docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C20.json";
export const SEAT_BINDING_PATH =
    "docs/tranches/BK/execution/2026-08-03-row9-register/SEAT-BINDING.json";
// Figure A's AUTHORITY. Before cure #3 this file was never opened: `seats.length === 60`
// and the family tally compared SEAT-BINDING.json to itself, so a §B.5 movement — the one
// risk the budget has — was invisible. It is parsed now.
export const ROSTER_MD_PATH =
    "docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md";

// The provenance pin. TERMINAL-ROSTER.md:159 (#9), :215 (#65), §B.5 quote C19's
// `dc05df91…`; those quotations still describe C19, which is unchanged on disk. This is
// C20's.
//
// [2026-08-09 · BK #66 CLOSE · RT-65-C′] RE-CUT IN PLACE. ~~`154210323fa22cc0…`~~ was C20
// as #65 wrote it; #66's export cut moves source files under three of its rows, so the
// roster had to follow and the pin with it. C20 is edited IN PLACE rather than superseded:
// it is a BK-authored artefact quoted only inside #65's own record, and the
// never-edit-in-place law was specific to C19 being quoted in committed records outside
// that fence. C19 stays byte-frozen at `dc05df91…` forever, so that law is permanently
// satisfied.
//
// ~~"this is the SECOND and last movement of this constant"~~ [2026-08-09 · BK #66 CURE-66-1
// — STRUCK, and the cause is named rather than dressed as a plan]: this constant moved a
// THIRD time, within the same row, because act 3 below was ASSERTED and not RUN. The two
// `activeSemanticClassIdDigests` written at the first cut (`28466877…` / `41a2b90e…`) were
// hand-typed and are not what the roster's own recipe emits. Re-derived here and re-pinned
// to `a562639a…` / `b1b725f4…`; the roster digest moves `00086bd4…` → `282d05cf…` with it.
// The recipe is the roster's own (`machineLaw.semanticClassDigestInput`) and was verified
// at this cure to reproduce HEAD's pinned pair byte-exactly from HEAD's own rows, so the
// derivation is checked in both directions. No further movement is promised: a promise is
// what failed here.
//
// The four acts behind the new digest, each with its own reason to exist:
//   1. RT-65-C  — `behavior.dropdown.keyboard-roving-typeahead`.sourcePath →
//                 `tests/components/menu/contract.test.ts`, and
//                 `external.types.dropdown-menu`.sourcePath →
//                 `tests/components/menu/public-contracts.test-d.ts`. The IDs are KEPT:
//                 a retitle is a drift this row would have to declare, and #65 held the
//                 same line for the same reason.
//   2. RT-18A   — `tags-input.ime-delimiter-guard` (whole file deleted) and
//                 `reka.tags-input.value-binding` (the case cannot compile without the
//                 component) LEAVE the roster. `active 48 → 46`.
//   3. counts + `machineLaw.activeSemanticClasses` + both
//      `activeSemanticClassIdDigests` DERIVED FROM THE ROWS. The counts were derived at
//      the first cut; the two digests were NOT — they were hand-typed, and CURE-66-1
//      replaced them with the recipe's actual output. Detector, re-runnable:
//      `sha256(JSON.stringify(activeVitest.filter(r => r.semanticClass === C).map(r => r.id)))`
//      over the file on disk must equal each pinned value.
//   4. RT-65-E  — `machineLaw.countedCeilingExpression` DELETED. It restated §C-1's
//                 illegal charge outside the `authority` block C-2 authorised deleting:
//                 duplicated derived data by the convergence law, and not load-bearing —
//                 `remainingSeats` is computed from `SEAT_BUDGET` below (:544-545,
//                 measured at CURE-66-1), never from the roster.
export const PINNED_ROSTER_SHA256 =
    "282d05cf8f931876f6001e42f864100fcc3ab6a19ec1f5e0d75b3ec8d9c72939";

// The declared budget, now itself CHECKED against §B.5's heading, family table and sum
// line rather than standing as the only independent record of the ceiling.
export const SEAT_BUDGET = 60;

const sha256 = (text) => createHash("sha256").update(text).digest("hex");

// ── the live-bytes scanner ────────────────────────────────────────────────────────────
//
// Everything below matches against LIVE BYTES ONLY. `scanSource` blanks line and block
// comments (preserving offsets and newlines, so lookbacks and line numbers survive) and
// marks which characters sit inside a string literal. Regex literals are skipped by the
// standard preceding-token heuristic so a `/["']/` body cannot flip the scanner into a
// phantom string state.
//
// This exists because the probe that adjudicated this row proved the previous matcher
// counted `// it("title")`, `/* it("title") */`, `it.skip(` and `it.todo(` as BOUND. All
// four are ABSENT under the ⊕²⁵ vocabulary.

const REGEX_PRECEDERS = new Set([
    "(", ",", "=", ":", "[", "!", "&", "|", "?", "{", "}", ";", "+", "-", "*", "%", "~",
    "^", "<", ">", "\n",
]);

const scanSource = (source) => {
    const code = source.split("");
    const inString = new Uint8Array(source.length);
    const n = source.length;
    let i = 0;
    let lastCode = "\n";
    while (i < n) {
        const ch = source[i];
        const next = source[i + 1];

        if (ch === "/" && next === "/") {
            while (i < n && source[i] !== "\n") {
                code[i] = " ";
                i += 1;
            }
            continue;
        }
        if (ch === "/" && next === "*") {
            code[i] = " ";
            code[i + 1] = " ";
            i += 2;
            while (i < n && !(source[i] === "*" && source[i + 1] === "/")) {
                if (source[i] !== "\n") code[i] = " ";
                i += 1;
            }
            if (i < n) {
                code[i] = " ";
                code[i + 1] = " ";
                i += 2;
            }
            continue;
        }
        if (ch === '"' || ch === "'" || ch === "`") {
            i += 1;
            while (i < n && source[i] !== ch) {
                if (source[i] === "\\") {
                    inString[i] = 1;
                    if (i + 1 < n) inString[i + 1] = 1;
                    i += 2;
                    continue;
                }
                inString[i] = 1;
                i += 1;
            }
            i += 1;
            lastCode = ch;
            continue;
        }
        if (ch === "/" && REGEX_PRECEDERS.has(lastCode)) {
            // a regex literal: skip its body, character classes and escapes included
            i += 1;
            let inClass = false;
            while (i < n) {
                const c = source[i];
                if (c === "\\") {
                    i += 2;
                    continue;
                }
                if (c === "[") inClass = true;
                else if (c === "]") inClass = false;
                else if (c === "/" && !inClass) break;
                else if (c === "\n") break;
                i += 1;
            }
            i += 1;
            lastCode = "/";
            continue;
        }
        if (!/\s/.test(ch)) lastCode = ch;
        else if (ch === "\n") lastCode = "\n";
        i += 1;
    }
    return { code: code.join(""), inString };
};

const scanCache = new Map();
const scan = (source) => {
    let hit = scanCache.get(source);
    if (!hit) {
        hit = scanSource(source);
        scanCache.set(source, hit);
    }
    return hit;
};

// A roster row binds only to a LIVE registration: the title must be the first argument of
// an `it(` / `test(` call with a modifier that STILL RUNS THE CASE — `.each(...)`,
// `.fails`, `.only`, `.concurrent`, `.sequential`. `.skip` and `.todo` are struck: they
// do not run, so under PASS/FAIL/ABSENT they are ABSENT, and a register that counts them
// bound reports GREEN for a case the runner never executes. Matched as a whole quoted
// string so a substring of a longer title can never satisfy a row; all three quote forms
// are admitted with the delimiter matching at both ends.
export const CALL_FORM =
    /(^|[^.\w$])(it|test)(\.(each|fails|only|concurrent|sequential)(\([\s\S]*?\))?)*\(\s*$/;

// ── BLOCK-LEVEL suppression (round-3 cure #1) ─────────────────────────────────────────
//
// `CALL_FORM` reads the ONE call its title sits in and cannot see the block above it. So a
// `describe.skip(` / `.todo(` / `.skipIf(` wrapping a whole file left every rostered row
// inside it scored BOUND with zero violations — measured pre-cure at HEAD `e2b7a0b5`:
// `tests/styles/token-graph.test.ts`'s outer describe demoted to `describe.skip(` returned
// `drift:[reka.tags-input.value-binding] violations:0`, i.e. the register saw nothing (a
// PRE-CURE probe figure, dated to its own moment — [2026-08-09 · BK #66 CLOSE · RT-18A]
// that row no longer exists; the probe's finding does). The
// runner executes NONE of those cases, so under PASS/FAIL/ABSENT all of them are ABSENT:
// the same scoring lie the strict call form forbids, one nesting level up.
//
// `.only` is the identical species read the other way: one live `.only` anywhere makes
// every case WITHOUT it runtime-ABSENT, while the register scored the siblings bound.
//
// Both are resolved BY EXTENT, never by a file-wide flag, so a skipped block cannot
// condemn a sibling block that still runs. `.skipIf(cond)` is suppressed unconditionally
// because `cond` is not statically knowable: the register may not score BOUND a case it
// cannot prove the runner reaches. Failing toward ABSENT is the only direction ⊕²⁵ allows.
const BLOCK_SUPPRESSOR = /(?:^|[^.\w$])(?:describe|suite)\.(?:skip|todo|skipIf|runIf)\b/g;
const ONLY_HOST = /(?:^|[^.\w$])(?:describe|suite)\.only\b/g;
const ANY_ONLY = /(?:^|[^.\w$])(?:describe|suite|it|test)\.only\b/g;

/**
 * The extent of a call — and of a CURRIED pair, `describe.skipIf(cond)(title, fn)` — from
 * the first `(` after the modifier to the `)` closing the last chained group. Parens inside
 * string literals do not count. Unbalanced source fails CLOSED (extent runs to EOF), so a
 * truncated file suppresses rather than silently binds.
 */
const callExtent = (code, inString, from) => {
    let i = from;
    let end = -1;
    for (;;) {
        while (i < code.length && /\s/.test(code[i])) i += 1;
        if (code[i] !== "(") return end < 0 ? from : end;
        let depth = 0;
        let closed = -1;
        for (let j = i; j < code.length; j += 1) {
            if (inString[j]) continue;
            if (code[j] === "(") depth += 1;
            else if (code[j] === ")") {
                depth -= 1;
                if (depth === 0) {
                    closed = j;
                    break;
                }
            }
        }
        if (closed < 0) return code.length;
        end = closed;
        i = closed + 1;
    }
};

const rangesOf = (code, inString, pattern) => {
    const ranges = [];
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(code))) {
        const nameEnd = match.index + match[0].length;
        // the same words inside a test TITLE are prose, not a call
        if (inString[nameEnd - 1]) continue;
        ranges.push([match.index, callExtent(code, inString, nameEnd)]);
    }
    return ranges;
};

const inAnyRange = (ranges, index) =>
    ranges.some(([start, end]) => index >= start && index <= end);

const hasLiveMatch = (code, inString, pattern) => {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(code))) {
        if (!inString[match.index + match[0].length - 1]) return true;
    }
    return false;
};

export const titleIsRegistered = (source, title) => {
    const { code, inString } = scan(source);
    const suppressed = rangesOf(code, inString, BLOCK_SUPPRESSOR);
    const onlyHosts = rangesOf(code, inString, ONLY_HOST);
    const onlyLive = hasLiveMatch(code, inString, ANY_ONLY);
    for (const quote of ['"', "'", "`"]) {
        const needle = `${quote}${title}${quote}`;
        let index = code.indexOf(needle);
        while (index >= 0) {
            // 260 chars is comfortably past the longest `it.each([...])(` table head in
            // the suite; the anchored `$` means only the text abutting the title counts.
            const form = CALL_FORM.exec(code.slice(Math.max(0, index - 260), index));
            if (
                form &&
                !inAnyRange(suppressed, index) &&
                (!onlyLive || form[0].includes(".only") || inAnyRange(onlyHosts, index))
            ) {
                return true;
            }
            index = code.indexOf(needle, index + 1);
        }
    }
    return false;
};

// The SEAT-side matcher (cure #3). Before this, `:206` was a bare `includes` — a seat
// named only in a header comment counted as bound, which is what `G-GATE-BUDGET` was in
// `scripts/gate-register.mjs` until this cure made the script emit its own name.
//
// A seat name is LIVE when it appears inside a string literal the runner can emit — a
// `describe(`/`it(` title or a thrown/reported message — or as an exported identifier.
// Measured, not assumed: the two script-side seats (G-PACK-INSTALL, G-NO-ORPHAN-EXPORT)
// carry their names in thrown `Error` strings, which are live code and not prose, so the
// admitted forms are stated as "live string literal or exported identifier" rather than
// the narrower "title only" — a narrower rule would have moved a figure by fiat rather
// than by measurement.
//
// BOUNDARY (round-3 cure #3). The hit must be the WHOLE name. `indexOf` and `\b` are both
// blind to an embedding rename — `-` is a non-word character, so `\bG-RUNG-ONLY\b` matches
// inside `XX-G-RUNG-ONLY-RETIRED`. Measured pre-cure at HEAD `e2b7a0b5`: renaming every
// `G-RUNG-ONLY` in `trap-gates.test.ts` to `XX-G-RUNG-ONLY-RETIRED` left `nameIsLive` true
// and the register green — a phantom binding to a seat nothing carries, under exactly the
// add-one-retire-one motion §B.5 performs. Name characters are `[A-Za-z0-9_-]`: seat names
// are dash-joined, so word boundaries are the wrong alphabet for them.
const NAME_CHAR = /[A-Za-z0-9_-]/;

const isWholeName = (code, name, index) => {
    const before = index > 0 ? code[index - 1] : "";
    const after = index + name.length < code.length ? code[index + name.length] : "";
    return !NAME_CHAR.test(before) && !NAME_CHAR.test(after);
};

export const nameIsLive = (source, name) => {
    const { code, inString } = scan(source);
    let index = code.indexOf(name);
    while (index >= 0) {
        if (inString[index] && isWholeName(code, name, index)) return true;
        index = code.indexOf(name, index + 1);
    }
    const identifier = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const bounded = `(?<![A-Za-z0-9_-])${identifier}(?![A-Za-z0-9_-])`;
    return (
        new RegExp(`export\\s+(?:const|let|var|function|class)\\s+${bounded}`).test(code) ||
        new RegExp(`export\\s*\\{[^}]*${bounded}`).test(code)
    );
};

// ── structural enrollment anchors (cure #2) ───────────────────────────────────────────
//
// The probe that adjudicated this row deleted ALL FOUR pixel-floor step lines from
// `ci.yml` and the anchor still resolved, because the word survived in the prose comment
// at `:57`. A substring resolver cannot detect unenrollment — C-13's own class ("an
// unwired gate cannot fail") reproduced inside the detector that scopes C-13. An anchor
// now resolves only against text a RUNNER would execute.

// A `#` opens a shell comment, so only what precedes it is a command a runner executes.
// One rule for BOTH `run:` forms (round-3 cure #2). Pre-cure only the inline form stripped,
// and it stripped only a ` #` — measured at HEAD `e2b7a0b5`: relocating ci.yml's two
// pixel-floor commands into `run: |` with a single `# npm -w tests-visual run
// gate:pixel-floor:ci` body line left the anchor resolving, `badAnchors:[] violations:0`.
// C-13's own class ("an unwired gate cannot fail") had simply moved into the standard
// multi-line Actions idiom. The rule matches `liveCommandText`'s shell branch verbatim.
const stripShellComment = (line) => line.replace(/(^|\s)#.*$/, "$1").trim();

export const yamlRunValues = (text) => {
    const values = [];
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i += 1) {
        const match = lines[i].match(/^(\s*)(?:-\s*)?run:\s*(.*)$/);
        if (!match) continue;
        const indent = match[1].length;
        const inline = match[2].trim();
        if (/^[|>][-+\d]*$/.test(inline)) {
            for (let j = i + 1; j < lines.length; j += 1) {
                const body = lines[j];
                if (!body.trim()) continue;
                const bodyIndent = body.length - body.trimStart().length;
                if (bodyIndent <= indent) break;
                const live = stripShellComment(body);
                if (live) values.push(live);
                i = j;
            }
            continue;
        }
        const live = stripShellComment(inline);
        if (live) values.push(live);
    }
    return values;
};

export const liveCommandText = (path, text) => {
    if (/\.(m|c)?[jt]sx?$/.test(path)) return scan(text).code;
    if (/\.ya?ml$/.test(path)) return yamlRunValues(text).join("\n");
    // tsconfig/jsonc carry `//` comments; a fragment may not hide in one
    if (/\.json$/.test(path)) return scan(text).code;
    // shell and everything else: `#` opens a comment, so only what precedes it can enroll
    return text
        .split("\n")
        .map((line) => line.replace(/(^|\s)#.*$/, "$1"))
        .join("\n");
};

const resolveAnchor = (anchor, io) => {
    if (anchor.includes("#scripts.")) {
        const [file, key] = anchor.split("#scripts.");
        if (!io.exists(file)) return false;
        const pkg = JSON.parse(io.read(file));
        return Object.prototype.hasOwnProperty.call(pkg.scripts ?? {}, key);
    }
    if (anchor.includes("#")) {
        const [file, fragment] = anchor.split("#");
        if (!io.exists(file)) return false;
        return liveCommandText(file, io.read(file)).includes(fragment);
    }
    return io.exists(anchor);
};

// ── Figure A's authority — §B.5, parsed (cure #3) ─────────────────────────────────────

export function parseSeatAuthority(markdown) {
    const start = markdown.indexOf("## B.5");
    if (start < 0) {
        throw new Error(
            "TERMINAL-ROSTER.md carries no §B.5 section — the seat authority is gone",
        );
    }
    const rest = markdown.slice(start);
    const end = rest.indexOf("\n## ", 1);
    const section = end < 0 ? rest : rest.slice(0, end);

    const budgetMatch = section.match(/exactly\s+\*{0,2}(\d+)\s+seats/i);
    const families = {};
    for (const line of section.split("\n")) {
        const row = line.match(/^\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|/);
        if (!row) continue;
        const family = row[1];
        // a struck family (`~~HAIRLINE~~`) is a retirement record, not a live allocation
        if (family.includes("~~")) continue;
        families[family] = Number(row[2]);
    }
    const sumMatch = section.match(/\*\*Sum:\s*([\d+\s]+?)=\s*(\d+)/);
    return {
        budget: budgetMatch ? Number(budgetMatch[1]) : null,
        families,
        addends: sumMatch
            ? sumMatch[1]
                  .split("+")
                  .map((part) => Number(part.trim()))
                  .filter((value) => Number.isFinite(value))
            : [],
        declaredSum: sumMatch ? Number(sumMatch[2]) : null,
    };
}

const defaultIo = {
    read: (path) => readFileSync(path, "utf8"),
    exists: (path) => existsSync(path),
};

/**
 * Re-derives both register figures. Pure over the injected io, so the self-test bites can
 * sever a byte in memory without writing to disk.
 */
export function verifyGateRegister(io = defaultIo) {
    const violations = [];
    const rosterText = io.read(ROSTER_PATH);
    const rosterSha256 = sha256(rosterText);

    // 1 · the sha pin — the figure #9/#65 quote is now backed by a committed detector.
    if (rosterSha256 !== PINNED_ROSTER_SHA256) {
        violations.push(
            `roster sha256 ${rosterSha256} != pinned ${PINNED_ROSTER_SHA256} — the C20 pin cut at BK #65 no longer describes the file on disk`,
        );
    }

    const roster = JSON.parse(rosterText);
    const active = roster.activeVitest ?? [];
    const reserved = roster.reservedVitest ?? [];
    const external = roster.externalEnforcement ?? [];

    // 2 · counts recomputed from the arrays, never read off the stored object.
    //     DOMINATED by check 1 today (the sha pin freezes the same bytes); kept as
    //     defense-in-depth for #65's successor cut, with the dominance declared.
    const hardReserved = reserved.filter((r) => r.reservation === "hard").length;
    const conditionalReserved = reserved.filter(
        (r) => r.reservation === "conditional",
    ).length;
    const recomputed = {
        activeVitest: active.length,
        hardReservedVitest: hardReserved,
        conditionalReservedVitest: conditionalReserved,
        worstCaseCountedSeats: active.length + hardReserved + conditionalReserved,
        remainingSeats:
            SEAT_BUDGET - (active.length + hardReserved + conditionalReserved),
        externalEnforcement: external.length,
    };
    for (const [key, value] of Object.entries(recomputed)) {
        if (roster.counts?.[key] !== value) {
            violations.push(
                `counts.${key}: roster states ${roster.counts?.[key]}, recomputation over the arrays gives ${value}`,
            );
        }
    }

    // 3 · every rostered row resolves to an executable: file present, title LIVE.
    const measuredDrift = [];
    for (const row of active) {
        if (!io.exists(row.sourcePath)) {
            violations.push(`active ${row.id}: sourcePath missing — ${row.sourcePath}`);
            continue;
        }
        if (!titleIsRegistered(io.read(row.sourcePath), row.currentRegistration)) {
            measuredDrift.push({
                id: row.id,
                sourcePath: row.sourcePath,
                rosterTitle: row.currentRegistration,
            });
        }
    }

    const badAnchors = [];
    for (const row of external) {
        if (!io.exists(row.sourcePath)) {
            violations.push(`external ${row.id}: sourcePath missing — ${row.sourcePath}`);
            continue;
        }
        for (const anchor of row.enrollment ?? []) {
            if (!resolveAnchor(anchor, io)) {
                badAnchors.push(`${row.id} -> ${anchor}`);
                violations.push(
                    `external ${row.id}: enrollment anchor unresolved — ${anchor}`,
                );
            }
        }
    }

    // 4 · Figure A read from its AUTHORITY (§B.5), then the 60 doc seats bound.
    const authority = parseSeatAuthority(io.read(ROSTER_MD_PATH));
    const authoritySum = Object.values(authority.families).reduce((a, b) => a + b, 0);
    const addendSum = authority.addends.reduce((a, b) => a + b, 0);
    if (authority.budget !== SEAT_BUDGET) {
        violations.push(
            `G-GATE-BUDGET: §B.5 declares a budget of ${authority.budget}, this detector carries ${SEAT_BUDGET} — the ceiling moved at the authority and the register did not follow`,
        );
    }
    if (authoritySum !== authority.budget) {
        violations.push(
            `G-GATE-BUDGET: §B.5's family table sums to ${authoritySum}, its heading declares ${authority.budget}`,
        );
    }
    if (addendSum !== authority.declaredSum || authority.declaredSum !== authority.budget) {
        violations.push(
            `G-GATE-BUDGET: §B.5's sum line reads ${authority.addends.join("+")} = ${authority.declaredSum}; the addends give ${addendSum} and the heading declares ${authority.budget}`,
        );
    }

    const seatFile = JSON.parse(io.read(SEAT_BINDING_PATH));
    const seats = seatFile.seats ?? [];
    if (seats.length !== authority.budget) {
        violations.push(
            `G-GATE-BUDGET: seat register holds ${seats.length} rows, budget is exactly ${authority.budget} (§B.5, user-mandated ceiling)`,
        );
    }
    const familyTally = {};
    for (const seat of seats) {
        familyTally[seat.family] = (familyTally[seat.family] ?? 0) + 1;
    }
    const familyNames = new Set([
        ...Object.keys(authority.families),
        ...Object.keys(seatFile.familyCounts ?? {}),
    ]);
    for (const family of familyNames) {
        const declared = seatFile.familyCounts?.[family];
        const authorityCount = authority.families[family];
        if (declared !== authorityCount) {
            violations.push(
                `G-GATE-BUDGET: family ${family}: §B.5 allocates ${authorityCount}, SEAT-BINDING declares ${declared}`,
            );
        }
        if ((familyTally[family] ?? 0) !== authorityCount) {
            violations.push(
                `G-GATE-BUDGET: family ${family}: §B.5 allocates ${authorityCount}, rows carry ${familyTally[family] ?? 0}`,
            );
        }
    }

    let bound = 0;
    let armOnly = 0;
    for (const seat of seats) {
        if (seat.binding === "none") {
            if (seat.paths?.length) {
                violations.push(
                    `seat ${seat.seat}: declared unbound but names paths — a seat is bound or it is not`,
                );
            }
            continue;
        }
        if (!seat.paths?.length) {
            violations.push(`seat ${seat.seat}: declared ${seat.binding} with no path`);
            continue;
        }
        // Every CLAIMED binding is verified against the LIVE bytes of the file. This is
        // the bite: demote the name to a comment and the register REDs.
        for (const path of seat.paths) {
            if (!io.exists(path)) {
                violations.push(`seat ${seat.seat}: bound to a missing file — ${path}`);
            } else if (!nameIsLive(io.read(path), seat.seat)) {
                violations.push(
                    `seat ${seat.seat}: claimed bound to ${path}, but that file carries the name only in prose (comment or dead text), never in a live title, message or export`,
                );
            }
        }
        if (seat.binding === "seat-detector") bound += 1;
        else armOnly += 1;
    }

    // 5 · the drift set is PINNED — a second drift REDs, and a silent repair REDs too.
    const declaredDrift = seatFile.declaredTitleDrift ?? [];
    const measuredIds = measuredDrift.map((d) => d.id).sort();
    const declaredIds = declaredDrift.map((d) => d.id).sort();
    if (measuredIds.join("|") !== declaredIds.join("|")) {
        violations.push(
            `title drift set moved: measured [${measuredIds.join(", ")}], declared [${declaredIds.join(", ")}] — update SEAT-BINDING.json and route the change to #65`,
        );
    }

    // 6 · #9's SUPPLEMENTAL anchors — DISCHARGED BY SUBTRACTION. [2026-08-08 · BK #65]
    //     C19's browser and type rows anchored `scripts/release.sh`, `ci.yml`,
    //     `release.yml` and `tsconfig.test.json` as BARE PATHS, so gutting their run lines
    //     resolved on file existence alone; #9 could not repair them in a sha-pinned file
    //     and measured them here instead. The successor cut FOLDS all six into C20's own
    //     `enrollment` arrays as fragment-bearing anchors, so check 3 now carries them and
    //     `supplementalAnchors` is empty. The loop STAYS — it is the seam the next
    //     #9-shaped measurement enrolls through, and an empty array costs one iteration.
    for (const row of seatFile.supplementalAnchors ?? []) {
        if (!resolveAnchor(row.anchor, io)) {
            badAnchors.push(`${row.id} -> ${row.anchor} (supplemental, #9-measured)`);
            violations.push(
                `supplemental ${row.id}: enrollment anchor unresolved — ${row.anchor}`,
            );
        }
    }

    return {
        rosterSha256,
        counts: recomputed,
        authority,
        activeRows: active.length,
        reservedRows: reserved.length,
        externalRows: external.length,
        titleDrift: measuredDrift,
        badAnchors,
        seats: {
            total: seats.length,
            bound,
            armOnly,
            unbound: seats.length - bound - armOnly,
        },
        violations,
    };
}

export const formatRegisterLine = (r) =>
    `seats:${r.seats.total} active:${r.counts.activeVitest} reserved:${r.reservedRows} ` +
    `worstCase:${r.counts.worstCaseCountedSeats} remaining:${r.counts.remainingSeats} ` +
    `external:${r.counts.externalEnforcement} bound:${r.seats.bound} armOnly:${r.seats.armOnly} ` +
    `unbound:${r.seats.unbound} drift:${r.titleDrift.length} ` +
    `rosterSha256:${r.rosterSha256.slice(0, 8)} violations:${r.violations.length}`;

const invokedDirectly =
    process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop());

if (invokedDirectly) {
    const report = verifyGateRegister();
    console.log(formatRegisterLine(report));
    console.log(
        "  STATUS VOCABULARY (⊕²⁵): PASS · FAIL · ABSENT. `unbound` is the ABSENT count —" +
            " seat names with no live executable. An unwired gate is ABSENT, never GREEN.",
    );
    for (const drift of report.titleDrift) {
        console.log(`  DRIFT (routed to #65) ${drift.id} — ${drift.sourcePath}`);
        console.log(`    roster title: ${drift.rosterTitle}`);
    }
    for (const violation of report.violations) {
        console.error(`  VIOLATION ${violation}`);
    }
    process.exit(report.violations.length ? 1 : 0);
}
