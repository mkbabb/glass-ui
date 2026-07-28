#!/usr/bin/env node
// PROTOTYPE — scratchpad only. The shipped form lands at scripts/regen-design-canon.mjs.
// Emits every CONSTANT block in DESIGN.md from the artefact that owns the value.
// Modelled byte-for-byte on scripts/regen-spring-tokens.mjs: locate a marker block,
// rewrite in place, idempotent, fail-explicit on a missing source.
//
//   node regen-design-canon.mjs            → rewrite DESIGN.md's blocks in place
//   node regen-design-canon.mjs --check    → exit 1 on drift (the gate's instrument)
//   node regen-design-canon.mjs --emit ID  → print one block (prototyping)

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = process.env.GLASS_UI_ROOT ?? "/Users/mkbabb/Programming/glass-ui";
const read = (rel) => readFileSync(resolve(ROOT, rel), "utf8");

// ── the CSS custom-property reader ───────────────────────────────────────────
// Scoped: a token is read from a NAMED file, so a per-mode arm is a distinct
// source, never a merge. Throws when the token is absent — the canon never
// prints a stale or blank cell.
function tokens(rel) {
    const src = read(rel);
    const map = new Map();
    for (const m of src.matchAll(/^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/gim)) {
        map.set(m[1], m[2].replace(/\s+/g, " ").trim());
    }
    return {
        get(name) {
            if (!map.has(name)) {
                throw new Error(`canon: ${name} absent from ${rel} — emit its OWED row or fix the source`);
            }
            return map.get(name);
        },
        has: (name) => map.has(name),
        raw: map,
    };
}

// An OWED cell: the value does not exist yet and a rostered wave owns it.
const OWED = (wave) => `— *owed: ${wave}*`;

// ── the spring table ─────────────────────────────────────────────────────────
// SOURCE OF RECORD: src/composables/motion/spring/springPresets.ts (the (response, ζ)
// pair + the one-job comment) THROUGH src/composables/motion/spring/springProjection.ts
// (the settle + the EMITTED-CURVE peak) — the identical call regen-spring-tokens.mjs
// makes, so the canon and the shipped `--spring-*-settle` token cannot disagree.
//
// PROTOTYPE FINDING, load-bearing: the closed form `t_s = -ln(0.02)/(ζ·ωₙ)` that
// docs/canon/motion-system.md states does NOT reproduce the shipped token
// (smooth: formula 0.451s, shipped 0.35s). A canon that RE-DERIVES a constant drifts
// from the generator that ships it. THE RULE: the canon reads the LAST artefact in the
// emission chain, never a re-derivation. Only the peak-height identity M(ζ) has no
// emitted home — and even it is superseded here by the sampled peak of the curve that
// actually ships, which is what Law 0 is about.
async function springRows() {
    const { SPRING_PRESETS } = await import(
        resolve(ROOT, "src/composables/motion/spring/springPresets.ts")
    );
    const { springProjection } = await import(
        resolve(ROOT, "src/composables/motion/spring/springProjection.ts")
    );
    return SPRING_PRESETS.map((row) => {
        const p = springProjection(row);
        return {
            name: row.name,
            response: row.response,
            zeta: row.dampingFraction,
            // settleBand is MOTION-CANON §0b's owed field on SpringPresetRow. Until it
            // lands the emitter reads the shipped 2% horizon and marks the column OWED.
            band: row.settleBand ?? 0.02,
            settle: p.settleSeconds,
            peak: p.peak - 1,
            comment: row.comment,
        };
    });
}

async function emitSpringTable() {
    const rows = await springRows();
    const bandOwed = rows.every((r) => r.band === 0.02);
    const bandCol = bandOwed ? "band *(owed: W-SPRING-RETUNE §0b)*" : "band";
    const head =
        `| row | response | ζ | ${bandCol} | settle | peak IN THE SHIPPED CURVE | rebound visible (Law 0) | the one job |\n` +
        "|---|---|---|---|---|---|---|---|";
    const body = rows
        .map((r) => {
            const visible = r.peak > r.band ? "**yes**" : "no";
            const pk = r.peak <= 1e-9 ? "0.00% — lands dead" : `${(r.peak * 100).toFixed(2)}%`;
            return `| \`${r.name}\` | ${r.response.toFixed(2)} | ${r.zeta.toFixed(2)} | ${(r.band * 100).toFixed(1)}% | ${r.settle}s | ${pk} | ${visible} | ${r.comment} |`;
        })
        .join("\n");
    return `${head}\n${body}`;
}

// ── the glass ladder ─────────────────────────────────────────────────────────
// SOURCE OF RECORD: src/styles/tokens/glass.css (light) + tokens/dark-arm.css
// (dark α) + tokens/dark-arm-glass.css (dark saturate + the brightness arm).
const RUNGS = ["wash", "quiet", "resting", "floating", "overlay"];

function emitGlassLadder() {
    const light = tokens("src/styles/tokens/glass.css");
    const darkA = tokens("src/styles/tokens/dark-arm.css");
    const darkG = tokens("src/styles/tokens/dark-arm-glass.css");
    const brightness = (rel, rung) => {
        const m = read(rel).match(new RegExp(`--glass-blur-${rung}:[^;]*brightness\\(([\\d.]+)\\)`));
        return m ? m[1] : "—";
    };
    const head =
        "| rung | class | α light | α dark | blur radius | saturate light | saturate dark | brightness light | brightness dark |\n" +
        "|---|---|---|---|---|---|---|---|---|";
    const body = RUNGS.map((r) => {
        const a = light.get(`--glass-opacity-${r}`);
        const ad = darkA.get(`--glass-opacity-${r}`);
        const rad = light.get(`--glass-blur-${r}-radius`);
        const s = light.get(`--glass-saturate-${r}`);
        const sd = darkG.get(`--glass-saturate-${r}`);
        const bl = brightness("src/styles/tokens/glass.css", r);
        const bd = brightness("src/styles/tokens/dark-arm-glass.css", r);
        return `| ${r} | \`.glass-${r}\` | ${a} | ${ad} | ${rad} | ${s} | ${sd} | ${bl} | ${bd} |`;
    }).join("\n");
    return `${head}\n${body}`;
}

// ── the non-rung registers ───────────────────────────────────────────────────
function emitGlassRegisters() {
    const light = tokens("src/styles/tokens/glass.css");
    const darkA = tokens("src/styles/tokens/dark-arm.css");
    const deep = tokens("src/styles/tokens/glass-deep.css");
    const rows = [
        ["dock", "--glass-opacity-dock", "a scoped α substitution on the resting material"],
        ["dialog", "--glass-opacity-dialog", "a scoped α substitution on the overlay rung"],
        ["sheet", "--glass-opacity-sheet", "a scoped α substitution on the overlay rung"],
        ["chassis", "--glass-opacity-chassis", "a scoped α substitution — component-owned"],
    ];
    const head = "| register | token | α light | α dark | what it is |\n|---|---|---|---|---|";
    const body = rows
        .map(([n, t, what]) => {
            const l = light.has(t) ? light.get(t) : OWED("W-TOKEN-CANON");
            const d = darkA.has(t) ? darkA.get(t) : "*(mode-invariant)*";
            return `| ${n} | \`${t}\` | ${l} | ${d} | ${what} |`;
        })
        .join("\n");
    const cont =
        `\n\n**The one continuum, not a rung** — \`--glass-depth\` interpolates the calm floating floor ` +
        `(\`--glass-blur-floating-radius\` ${light.get("--glass-blur-floating-radius")} / saturate ${light.get("--glass-saturate-floating")}) ` +
        `up to the deep endpoint (\`--glass-blur-deep-radius\` ${deep.get("--glass-blur-deep-radius").split("/*")[0].trim()} / ` +
        `\`--glass-saturate-deep\` ${deep.get("--glass-saturate-deep").split("/*")[0].trim()}). Opt-in; never the bare default.`;
    return `${head}\n${body}${cont}`;
}

// ── the radius roles ─────────────────────────────────────────────────────────
function emitRadius() {
    const t = tokens("src/styles/theme/radius.css");
    const roles = [
        ["cell", "0", "inherits the parent's clip — legal only where the element has no silhouette"],
        ["floor", "--radius-xs", "`max(4, r_ctx − inset)` — the relay's minimum"],
        ["tick", "--radius-md", "`0.30 × h` at h=18 — the many-of-N mark"],
        ["control", "--radius", "`≈0.25 × h` at h=40 — a box you type in, press, or read"],
        ["card", "--radius-2xl", "the presented plate — `r − pad = 4` exactly"],
        ["room", "--radius-3xl", "`1.5 × card` — a box you enter"],
        ["pill", "--radius-pill", "a stadium — ONE spelling, no `50%`, no sentinel arithmetic"],
    ];
    const head = "| role | token | value on disk | law |\n|---|---|---|---|";
    return (
        `${head}\n` +
        roles
            .map(([role, tok, law]) => {
                const v = tok === "0" ? "`0`" : t.has(tok) ? `\`${t.get(tok)}\`` : OWED("W-RADIUS-ROLE");
                const name = tok === "0" ? "—" : `\`${tok}\``;
                return `| **${role}** | ${name} | ${v} | ${law} |`;
            })
            .join("\n")
    );
}

// ── the z stack ──────────────────────────────────────────────────────────────
function emitZ() {
    const src = read("src/styles/tokens/scheme-motion.css");
    const rows = [...src.matchAll(/^\s*(--z-[a-z0-9-]+)\s*:\s*(-?\d+);/gim)];
    if (!rows.length) throw new Error("canon: no --z-* tokens found");
    return (
        "| token | value |\n|---|---|\n" +
        rows.map((m) => `| \`${m[1]}\` | ${m[2]} |`).join("\n")
    );
}

// ── the engagement budgets ───────────────────────────────────────────────────
// SOURCE OF RECORD: src/styles/tokens/scale-paper.css (the geometry rungs) +
// src/composables/motion/engage/engageEnvelopes.ts (the acknowledge window + the
// envelope clocks). Every number the BREATH ladder quotes is one of these.
function emitEngageBudgets() {
    const s = tokens("src/styles/tokens/scale-paper.css");
    const env = read("src/composables/motion/engage/engageEnvelopes.ts");
    const ack = env.match(/ACKNOWLEDGE_WINDOW_MS\s*=\s*(\d+)/);
    if (!ack) throw new Error("canon: ACKNOWLEDGE_WINDOW_MS absent from engageEnvelopes.ts");
    const rows = [
        ["hover · atom", "--scale-hover"],
        ["hover · button", "--scale-hover-btn"],
        ["hover · dock member", "--scale-hover-dock"],
        ["press · canonical", "--scale-press"],
        ["press · button/slider", "--scale-press-sm"],
        ["press · dock", "--scale-press-dock"],
    ];
    const head = "| budget | token | value on disk |\n|---|---|---|";
    const body = rows
        .map(([n, t]) => `| ${n} | \`${t}\` | ${s.has(t) ? s.get(t) : OWED("W-ENGAGE-LADDER+AFFORD")} |`)
        .join("\n");
    const extra =
        `\n| acknowledge window | \`ACKNOWLEDGE_WINDOW_MS\` | ${ack[1]} ms |` +
        `\n| rest floor amplitude | \`--engage-rest-floor\` | ${OWED("W-ENGAGE-LADDER+AFFORD")} |` +
        `\n| ambient tempo floor | \`--ambient-period-min\` | ${OWED("W-ENGAGE-LADDER+AFFORD")} |` +
        `\n| ambient dwell | \`--ambient-dwell\` | ${OWED("W-ENGAGE-LADDER+AFFORD")} |`;
    return `${head}\n${body}${extra}`;
}

// ── the block registry ───────────────────────────────────────────────────────
export const BLOCKS = {
    "engage-budgets": {
        source: "src/styles/tokens/scale-paper.css · src/composables/motion/engage/engageEnvelopes.ts",
        emit: emitEngageBudgets,
    },
    "spring-table": {
        source: "src/composables/motion/spring/springPresets.ts",
        emit: emitSpringTable,
    },
    "glass-ladder": {
        source: "src/styles/tokens/glass.css · tokens/dark-arm.css · tokens/dark-arm-glass.css",
        emit: emitGlassLadder,
    },
    "glass-registers": {
        source: "src/styles/tokens/glass.css · tokens/dark-arm.css · tokens/glass-deep.css",
        emit: emitGlassRegisters,
    },
    "radius-roles": { source: "src/styles/theme/radius.css", emit: emitRadius },
    "z-stack": { source: "src/styles/tokens/scheme-motion.css", emit: emitZ },
};

async function render(id) {
    const b = BLOCKS[id];
    if (!b) throw new Error(`canon: unknown block "${id}"`);
    return `<!-- CANON:BEGIN ${id} · source of record: ${b.source} · generated, do not hand-edit -->\n${await b.emit()}\n<!-- CANON:END ${id} -->`;
}

// ── the doc rewrite + drift check (the gate's instrument) ────────────────────
const DOC = resolve(dirname(fileURLToPath(import.meta.url)), "DESIGN.md");

async function rewritten(text) {
    let out = text;
    for (const id of Object.keys(BLOCKS)) {
        const span = new RegExp(
            `<!-- CANON:BEGIN ${id} [^>]*-->[\\s\\S]*?<!-- CANON:END ${id} -->`
        );
        if (!span.test(out)) throw new Error(`canon: DESIGN.md missing block "${id}"`);
        out = out.replace(span, await render(id));
    }
    return out;
}

const argv = process.argv.slice(2);
if (argv[0] === "--emit") {
    console.log(await render(argv[1]));
} else if (argv[0] === "--check") {
    const doc = readFileSync(DOC, "utf8");
    const fresh = await rewritten(doc);
    if (fresh !== doc) {
        for (const id of Object.keys(BLOCKS)) {
            const span = new RegExp(
                `<!-- CANON:BEGIN ${id} [^>]*-->[\\s\\S]*?<!-- CANON:END ${id} -->`
            );
            const cur = doc.match(span)?.[0];
            const next = fresh.match(span)?.[0];
            if (cur !== next) console.error(`  ${id}: DRIFT (doc ≠ disk emission)`);
        }
        console.error("G-CANON-CONSTANT-BOUND: RED");
        process.exit(1);
    }
    console.log("G-CANON-CONSTANT-BOUND: GREEN (every block byte-equals its emission)");
} else if (argv[0] === "--write" || argv.length === 0) {
    const doc = readFileSync(DOC, "utf8");
    writeFileSync(DOC, await rewritten(doc));
    console.log("canon: blocks re-emitted in place");
} else {
    for (const id of Object.keys(BLOCKS)) {
        console.log(await render(id));
        console.log();
    }
}
