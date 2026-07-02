#!/usr/bin/env node
// proof:glass — the F2 Glass family gate (BG plan §1 F2).
//
// The consolidated device-free SOURCE gate for the Glass family. It is seeded
// here with its FIRST arm — `deep-glass-decided` (BG.W-DEEP-GLASS-DECIDE) — and
// grows one clause per F2 wave (the family-gate consolidation, R3 taxonomy).
//
// ── ARM: deep-glass-decided (BG.W-DEEP-GLASS-DECIDE · GA-7) ──────────────────
// The `.glass-deep`/`--glass-blur-deep` tier rode the Apple `blur(20px)/saturate
// 1.8` ceiling "BOOKED" for FIVE tranches (BB->BC->BD->BE->BF->BG) on a
// `profile:budget` clearance nobody ran at 20px. W-DEEP-GLASS-DECIDE ENDS the
// chronic with a MEASUREMENT, not a 6th re-book: `src/styles/tokens/glass-deep.css`
// carries a TERMINAL verdict header (`landed-20px` OR `retired-at-16px-cost-<N>`),
// NEVER `booked`. The decision at BG: RETIRE at 16px — `profile:budget` is
// byte-measuring (a token bump is delta-0 bytes, per-frame-BLIND, so its clearance
// can NOT fence a super-linear-past-16px backdrop-filter over the deep tier's live
// animated backdrops), so 16px IS the substrate's ceiling (IDENTITY, not debt).
//
// This gate LOCKS that terminal decision (the proof:nda-decided terminal-lock
// shape): a flip back to `booked`, a missing verdict, a malformed verdict, a
// surviving "book" re-booking prose survivor, or a verdict that disagrees with
// the shipped `--glass-blur-deep-radius` value — any of these REDs.
//
//   D1 — the machine-parseable TERMINAL verdict marker is present exactly ONCE
//        and is one of {`landed-20px`, `retired-at-16px-cost-<N>`} with a
//        non-empty recorded number N; a `booked`/absent/malformed state REDs.
//   D2 — ZERO surviving `book`/`booked` re-booking prose in glass-deep.css (this
//        file IS the deep-glass decision, so any book-token is the forbidden
//        re-book state — the anti-6th-re-book fence).
//   D3 — verdict/value consistency: the shipped `--glass-blur-deep-radius` matches
//        the verdict (16px when retired-at-16px, 20px when landed-20px), so a
//        header verdict can never diverge from the tier that actually ships.
//
// The comment-strip + pure-detector house pattern (mirroring proof-glass-
// idiom-factor.mjs / proof-glass-cal.mjs). Born-RED at HEAD (no verdict marker +
// 7 surviving "BOOKED" tokens in glass-deep.css) -> GREEN at the decide. A
// `--self-test` arm runs every invocation and proves each clause has teeth: a
// synthetic `booked` verdict + BOOKED prose (D1/D2), a verdict/value mismatch
// (D3), and an ABSENT verdict marker (D1) are each flagged.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const GLASS_DEEP_FILE = "src/styles/tokens/glass-deep.css";

function readFile(rel) {
    const file = resolve(ROOT, rel);
    return existsSync(file) ? readFileSync(file, "utf8") : "";
}

// ── the deep-glass-decided terminal-lock predicate (pure) ────────────────────
// Returns { violations, facts } for a given glass-deep.css text — pure so the
// self-test can run it against synthetic mutated copies.
export function decideViolations(text) {
    const violations = [];
    const facts = {};

    if (!text) {
        violations.push(
            `deep-glass-decided: ${GLASS_DEEP_FILE} is ABSENT (the deep-glass tier + its terminal verdict must exist)`,
        );
        return { violations, facts };
    }

    // D1 — the machine-parseable TERMINAL verdict marker.
    const markers = [...text.matchAll(/DEEP-GLASS-DECIDED:\s*(\S+)/g)];
    facts.markerCount = markers.length;
    if (markers.length === 0) {
        violations.push(
            "D1: no `DEEP-GLASS-DECIDED:` verdict marker in glass-deep.css — the deep-glass chronic is UNDECIDED (a `booked`/absent state; the 5-tranche ride must TERMINATE with a `landed-20px` OR `retired-at-16px-cost-<N>` verdict)",
        );
    } else if (markers.length > 1) {
        violations.push(
            `D1: ${markers.length} \`DEEP-GLASS-DECIDED:\` markers — the terminal verdict is declared ONCE`,
        );
    }

    const verdict = markers.length ? markers[0][1] : "";
    facts.verdict = verdict;
    const isLanded = verdict === "landed-20px";
    const isRetired = /^retired-at-16px-cost-.+$/.test(verdict);
    facts.terminal = isLanded || isRetired;
    if (markers.length && !isLanded && !isRetired) {
        violations.push(
            `D1: verdict "${verdict}" is NON-terminal — a \`booked\`/malformed state REDs (must be \`landed-20px\` or \`retired-at-16px-cost-<N>\` with a non-empty recorded number, the proof:nda-decided terminal-lock shape)`,
        );
    }

    // D2 — ZERO surviving `book`/`booked` re-booking prose anywhere in the file.
    // This file IS the deep-glass decision, so any book-token is the forbidden
    // re-book state (the anti-6th-re-book fence).
    const bookHits = [...text.matchAll(/\bbook\w*/gi)].map((m) => m[0]);
    facts.bookTokens = [...new Set(bookHits.map((b) => b.toLowerCase()))];
    if (bookHits.length) {
        violations.push(
            `D2: ${bookHits.length} surviving book-token(s) (${facts.bookTokens.join(", ")}) in glass-deep.css — a DECIDED deep-glass tier carries ZERO "booked"/"book" re-booking prose (the terminal chronic must not re-book a 6th time)`,
        );
    }

    // D3 — verdict/value consistency: the shipped `--glass-blur-deep-radius` must
    // agree with the verdict, so a header claim can never diverge from the tier
    // that actually ships.
    const radiusMatch = /--glass-blur-deep-radius:\s*(\d+)px/.exec(text);
    facts.radiusPx = radiusMatch ? Number(radiusMatch[1]) : null;
    if (facts.terminal) {
        if (facts.radiusPx === null) {
            violations.push(
                "D3: `--glass-blur-deep-radius` declaration not found — the terminal verdict cannot be reconciled to the shipped value",
            );
        } else if (isRetired && facts.radiusPx !== 16) {
            violations.push(
                `D3: verdict is retired-at-16px but --glass-blur-deep-radius is ${facts.radiusPx}px — the verdict and the shipped value MUST agree (retire = the tier stays 16px)`,
            );
        } else if (isLanded && facts.radiusPx !== 20) {
            violations.push(
                `D3: verdict is landed-20px but --glass-blur-deep-radius is ${facts.radiusPx}px — the verdict and the shipped value MUST agree (land = the tier reaches 20px)`,
            );
        }
    }

    return { violations, facts };
}

export function detect() {
    const decide = decideViolations(readFile(GLASS_DEEP_FILE));
    // the self-test bites run EVERY run (the "proven every run" discipline) — a
    // bite that loses its teeth REDs the gate, so the anti-gameability arm can
    // never silently rot.
    const biteFails = selfTest();
    return {
        violations: [...decide.violations, ...biteFails],
        facts: { deepGlassDecided: decide.facts, selfTestOk: biteFails.length === 0 },
    };
}

// ── the self-test bite (--self-test) — the anti-gameability arm ──────────────
function selfTest() {
    const fails = [];
    const green = readFile(GLASS_DEEP_FILE);
    if (!green) {
        // no source to mutate — the bite substrate constructs its own below.
    }

    // bite 1 — a synthetic `booked` verdict + a "BOOKED to a successor" prose
    // survivor must both be flagged (D1 NON-terminal + D2 re-book fence teeth).
    const bookedMutant =
        (green || "--glass-blur-deep-radius: 16px;").replace(
            /DEEP-GLASS-DECIDED:\s*\S+/,
            "DEEP-GLASS-DECIDED: booked",
        ) + "\n/* the full 20px push is BOOKED to a successor */\n";
    if (decideViolations(bookedMutant).violations.length === 0) {
        fails.push(
            "self-test D1/D2: a synthetic `booked` verdict + BOOKED prose survivor was NOT flagged (the terminal-lock / re-book fence has no teeth)",
        );
    }

    // bite 2 — a verdict/value MISMATCH must be flagged: the real retired-16px
    // verdict with the shipped radius bumped to 20px (a header that lies about
    // the tier that ships).
    const mismatchBase = green || "DEEP-GLASS-DECIDED: retired-at-16px-cost-0B\n--glass-blur-deep-radius: 16px;";
    const mismatch = mismatchBase.replace(/(--glass-blur-deep-radius:\s*)\d+px/, "$120px");
    if (decideViolations(mismatch).violations.length === 0) {
        fails.push(
            "self-test D3: a synthetic verdict/value mismatch (retired-16px verdict + 20px radius) was NOT flagged (the consistency detector has no teeth)",
        );
    }

    // bite 3 — an ABSENT verdict marker must be flagged (D1 decided-required teeth).
    const noMarkerBase = green || "DEEP-GLASS-DECIDED: retired-at-16px-cost-0B\n--glass-blur-deep-radius: 16px;";
    const noMarker = noMarkerBase.replace(/DEEP-GLASS-DECIDED:\s*\S+/, "(deep glass verdict removed)");
    if (decideViolations(noMarker).violations.length === 0) {
        fails.push(
            "self-test D1: an ABSENT verdict marker was NOT flagged (the decided-required detector has no teeth)",
        );
    }

    return fails;
}

function run() {
    const selfTestMode = process.argv.includes("--self-test");
    const ARTIFACT = gateArtifactPath("GLASS_UI_GLASS_ARTIFACT", "BG-glass");

    if (selfTestMode) {
        const fails = selfTest();
        const ok = fails.length === 0;
        console.log("proof:glass --self-test — the bite arm (anti-gameability)");
        if (ok) {
            console.log("  all clause bites have teeth ✓");
        } else {
            for (const f of fails) console.log(`  ✗ ${f}`);
        }
        process.exit(ok ? 0 : 1);
    }

    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass",
        facts,
        violations,
    });

    const d = facts.deepGlassDecided;
    console.log("proof:glass — the F2 Glass family gate — arm: deep-glass-decided (BG.W-DEEP-GLASS-DECIDE)");
    console.log(
        `  D1 verdict        : "${d.verdict ?? ""}" (markers=${d.markerCount ?? 0}, terminal=${d.terminal ? "✓" : "✗"})`,
    );
    console.log(
        `  D2 no re-book     : ${d.bookTokens && d.bookTokens.length ? `✗ ${d.bookTokens.join(", ")}` : "✓ (zero book-tokens)"}`,
    );
    console.log(
        `  D3 verdict==value : --glass-blur-deep-radius = ${d.radiusPx ?? "?"}px  ${
            d.terminal
                ? (d.verdict === "landed-20px" ? d.radiusPx === 20 : d.radiusPx === 16)
                    ? "✓"
                    : "✗ MISMATCH"
                : "n/a"
        }`,
    );
    console.log(`  self-test bites   : ${facts.selfTestOk ? "all teeth ✓" : "✗ BROKE"}`);

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
