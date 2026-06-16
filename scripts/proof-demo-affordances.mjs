#!/usr/bin/env node
// BA.W-DEMO-AFFORDANCES — the demo affordances unified onto the glass grammar
// gate (proof:demo-affordances).
//
// The born-RED→GREEN device-free SOURCE arm for the demo's controls. The R8
// audit re-opened four affordance defects the AZ.W-MOTION2 close marked
// `complete` but eroded live:
//   · R8-17 — the `▶ Play family` control stacked `.btn-pill` + `.glass-btn` on
//     ONE element; the fixed-square icon primitive wins + contain:paint clips
//     the wrapped text into a ~40px blob.
//   · R8-13a — a lone <Button> as the SOLE child of a `flex flex-col` column
//     stretches to the full parent width (the implicit align-items:stretch).
//   · FD-FS X-2 — hand-rolled `bg-card/60` opaque-ish plates that are NOT a
//     glass tier read dead on the dark register.
//   · R8-16 — the curve-family picker's inverted selected hierarchy + dead
//     backdrop-filter (the chip-rack rebuild + the π readback own that arm).
//
// THE FOUR SOURCE WITNESSES (the comment-strip + pure-detector house pattern,
// mirroring proof-icon-chip.mjs / proof-glass-cohesion.mjs):
//   W1 — no element in demo/** or any src/styles/** recipe composes both
//        `.glass-btn` and `.btn-pill` (class co-occurrence, any order), AND no
//        text-bearing `.glass-btn` (an icon button carrying a text child
//        collapses the same way).
//   W2 — every demo play/replay control composes <StoryPlayButton> or the
//        reference <DockIconButton><Play/>, and no U+25B6 `▶` survives as a play
//        affordance in the enrolled stories.
//   W3 — no lone <Button>/<button> is the SOLE direct child of a `flex flex-col`
//        column-flex wrapper across the enrolled stories (the implicit-stretch
//        default; a `w-full`-grep would miss it — the detector reads the wrapper
//        context).
//   W4 — zero `bg-card/60` in the enrolled set (skeleton/notification/springs
//        range cells); math-paper + the springs paper-grain STAGE are declared
//        exceptions.
//
// The BINDING painted truth is the π readback (tests-visual/demo-affordances.spec.ts
// + the W-DEMO-AFFORDANCES-DELTA capture — the curve-picker selected chip's
// resolved background references --glass-bg-floating/--dock-control-active-bg
// AND selected-plate luminance > unselected, in BOTH modes; the play control
// renders content-width > the fixed icon square; the lone trigger computes
// content-width < the parent column; the re-pointed containers composite as
// glass over their backdrop) + the proof:ba-gestalt verdict (BA inv-4). This
// gate is the no-device CI half; a source-green/visually-broken gap is the exact
// AZ P-1 close-class the BA gestalt bar exists to kill.
//
// House style mirrors proof-icon-chip.mjs: ESM .mjs, comment-strip first
// (false-witness discipline), a pure exported detector, a byte-stable JSON
// artefact via gate-output, a human summary, process.exit(1) on any violation.

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const REL = (p) => resolve(ROOT, p);

// ── The enrolled surfaces ────────────────────────────────────────────────────
// The play/replay sites + the trigger sites + the container sites. The
// curve-picker chip rack + the play register land here too.
const PATHS = {
    STORY_PLAY_BUTTON: REL("demo/stories/StoryPlayButton.vue"),
    CURVE_GALLERY: REL("demo/stories/motion/curve-gallery.vue"),
    BEZIER_EDITOR: REL("demo/stories/motion/curve-gallery/BezierEditor.vue"),
    SPRINGS: REL("demo/stories/motion/springs.vue"),
    TOASTER: REL("demo/stories/feedback/toaster.vue"),
    SKELETON: REL("demo/stories/feedback/skeleton.vue"),
    NOTIFICATION: REL("demo/stories/feedback/notification.vue"),
    USE_GLOBAL_DARK: REL("demo/stories/composables/use-global-dark.vue"),
    USE_DARK_SYNC: REL("demo/stories/composables/use-dark-mode-sync.vue"),
    // The negative-predicate anchor surface (the .glass-btn / .btn-pill recipe).
    SURFACES_CSS: REL("src/styles/glass/surfaces.css"),
};

// W2 — the play/replay-bearing stories whose every play control must be the ONE
// register. The U+25B6 `▶` glyph must not survive as a play affordance here.
const PLAY_STORIES = ["CURVE_GALLERY", "BEZIER_EDITOR", "SPRINGS"];

// W3 — the lone-trigger stories: each had a single <Button> as the sole child of
// a `flex flex-col` column (the stretch). After the wave each lone trigger sits
// in a content-width row.
const TRIGGER_STORIES = ["TOASTER", "USE_GLOBAL_DARK", "USE_DARK_SYNC"];

// W4 — the enrolled `bg-card/60` container set. math-paper.vue:13 (the paper
// article plate) + springs.vue:181 (the paper-grain STAGE, bg-background/40, not
// bg-card/60 — W-STAGE's scope) are NOT enrolled.
const CONTAINER_STORIES = ["SKELETON", "NOTIFICATION", "SPRINGS"];

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

const stripAll = (t) => stripHtmlComments(stripBlockComments(t ?? ""));

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

// Extract every `class="…"` / `:class="…"` / `class='…'` attribute VALUE in the
// stripped source. Returns the concatenated token soup per attribute occurrence.
function classAttributes(stripped) {
    const out = [];
    const re = /(?::?class)\s*=\s*(["'])([\s\S]*?)\1/g;
    let m;
    while ((m = re.exec(stripped)) !== null) out.push(m[2]);
    return out;
}

// Does a class-attribute token soup carry BOTH `.glass-btn` and `.btn-pill`
// (any order, any interspersing)? We match the bare class tokens with word
// boundaries so a longer class containing the substring does not false-hit.
function coOccursGlassBtnBtnPill(attrValue) {
    const hasGlassBtn = /(^|[\s"'`])glass-btn(?=$|[\s"'`])/.test(attrValue);
    const hasBtnPill = /(^|[\s"'`])btn-pill(?=$|[\s"'`])/.test(attrValue);
    return hasGlassBtn && hasBtnPill;
}

// The CSS selector form of the same stack: a selector listing both classes on
// ONE compound (`.glass-btn.btn-pill` or `.btn-pill.glass-btn`, any order/space-
// free chain).
function cssSelectorStack(strippedCss) {
    return (
        /\.glass-btn(?:[:.\[][^\s,{>+~]*)*\.btn-pill/.test(strippedCss) ||
        /\.btn-pill(?:[:.\[][^\s,{>+~]*)*\.glass-btn/.test(strippedCss)
    );
}

// W1 text-bearing-`.glass-btn` bite: a `.glass-btn` element carrying a direct
// text child collapses the same way (contain:paint clips it). We scan the
// stripped SFC template for an element whose class attribute carries `glass-btn`
// and whose tag body contains a non-whitespace, non-tag text run before the
// matching close. Heuristic but conservative: we look for a `class` attr with
// glass-btn on a `<button` / `<a` / `<div` open tag, then check the immediate
// inner text up to the next `<`.
function textBearingGlassBtn(stripped) {
    const violations = [];
    // Find each opening tag carrying a glass-btn class.
    const tagRe = /<([a-zA-Z][\w-]*)\b([^>]*?)>/g;
    let m;
    while ((m = tagRe.exec(stripped)) !== null) {
        const attrs = m[2] || "";
        const clsM = attrs.match(/(?::?class)\s*=\s*(["'])([\s\S]*?)\1/);
        if (!clsM) continue;
        const cls = clsM[2];
        if (!/(^|[\s"'`])glass-btn(?=$|[\s"'`])/.test(cls)) continue;
        // Self-closing tag carries no text child.
        if (m[0].endsWith("/>")) continue;
        // Read the inner run up to the next `<`.
        const afterOpen = tagRe.lastIndex;
        const nextLt = stripped.indexOf("<", afterOpen);
        const inner = stripped
            .slice(afterOpen, nextLt === -1 ? stripped.length : nextLt)
            .trim();
        // A non-empty, non-mustache-only text run is a text child. A `{{ … }}`
        // interpolation or a leading icon `<svg>`/`<Icon/>` is the ALLOWED form;
        // a bare literal text run (e.g. `▶ Play family`) is the violation.
        if (inner.length > 0) {
            violations.push(inner.slice(0, 40));
        }
    }
    return violations;
}

/**
 * The W-DEMO-AFFORDANCES detector. Pure over the read sources. Each witness
 * pushes a falsifiable violation string.
 */
export function detectDemoAffordances(sources) {
    const violations = [];

    // Strip comments for every source (the false-witness discipline — a
    // comment naming the forbidden token must not red the gate).
    const stripped = {};
    for (const [k, raw] of Object.entries(sources)) {
        stripped[k] = stripAll(raw ?? "");
    }

    // ── W1 — no .glass-btn + .btn-pill re-stack (the IG-A4 caller hazard) ─────
    const w1ClassHits = [];
    const w1TextHits = [];
    // Scan EVERY enrolled demo source + the surfaces.css recipe.
    for (const [name, body] of Object.entries(stripped)) {
        if (name === "SURFACES_CSS") {
            // The CSS recipe: a selector listing both classes is the stack.
            if (cssSelectorStack(body)) w1ClassHits.push(`${name} (CSS selector)`);
            continue;
        }
        for (const attr of classAttributes(body)) {
            if (coOccursGlassBtnBtnPill(attr)) {
                w1ClassHits.push(`${name}: class="${attr.trim().slice(0, 50)}"`);
            }
        }
        for (const t of textBearingGlassBtn(body)) {
            w1TextHits.push(`${name}: text-bearing .glass-btn ("${t}")`);
        }
    }
    if (w1ClassHits.length > 0) {
        violations.push(
            `W1: ${w1ClassHits.length} element(s) stack .glass-btn + .btn-pill (the mutually-exclusive size registers — fixed square wins, contain:paint clips the label): ${w1ClassHits.join("; ")}`,
        );
    }
    if (w1TextHits.length > 0) {
        violations.push(
            `W1: ${w1TextHits.length} text-bearing .glass-btn element(s) (an icon button carrying a text child collapses the same way): ${w1TextHits.join("; ")}`,
        );
    }

    // ── W2 — one play register, no ▶ text glyph ───────────────────────────────
    const ARROW = "▶"; // ▶
    const w2ArrowHits = [];
    for (const name of PLAY_STORIES) {
        const body = stripped[name] ?? "";
        if (body.includes(ARROW)) {
            // Count the occurrences for the message.
            const n = body.split(ARROW).length - 1;
            w2ArrowHits.push(`${name} (${n}× ▶)`);
        }
    }
    if (w2ArrowHits.length > 0) {
        violations.push(
            `W2: the U+25B6 ▶ glyph survives as a play affordance in [${w2ArrowHits.join(", ")}] — every play/replay control must compose <StoryPlayButton> (or <DockIconButton><Play/>), the Lucide glyph, never the ▶ text.`,
        );
    }
    // The positive: each play story composes the ONE register (or imports it).
    // curve-gallery + springs adopt <StoryPlayButton>; BezierEditor too. The
    // positive arm catches a play site that DROPS ▶ but hand-rolls a non-register
    // button — we require the register import/use in each play story.
    const w2RegisterMiss = [];
    for (const name of PLAY_STORIES) {
        const body = stripped[name] ?? "";
        const composesRegister = /<StoryPlayButton\b/.test(body);
        // The dock-transport reference form (a play story may also use it directly).
        const composesDockTransport =
            /<DockIconButton\b/.test(body) && /<Play\b/.test(body);
        if (!(composesRegister || composesDockTransport)) {
            w2RegisterMiss.push(name);
        }
    }
    if (w2RegisterMiss.length > 0) {
        violations.push(
            `W2: play/replay stories [${w2RegisterMiss.join(", ")}] do not compose the <StoryPlayButton> register (nor the reference <DockIconButton><Play/>) — the positive home for every play control.`,
        );
    }

    // ── W3 — no full-width lone trigger ───────────────────────────────────────
    // A lone <Button>/<button> as the SOLE direct child of a column-flex wrapper
    // (`flex flex-col` / `flex-col`) stretches to the full parent width via the
    // implicit align-items:stretch. We detect a column-flex wrapper whose ONLY
    // interactive child is the trigger by structural scan: find a wrapper div
    // carrying flex-col whose direct children are exactly one <Button>/<button>
    // (other non-interactive flow is fine, but a SOLE trigger under flex-col
    // stretches). The remedy wraps the trigger in a content-width `flex
    // items-center` ROW.
    const w3Hits = [];
    for (const name of TRIGGER_STORIES) {
        const body = stripped[name] ?? "";
        for (const hit of loneColumnFlexTrigger(body)) {
            w3Hits.push(`${name}: ${hit}`);
        }
    }
    if (w3Hits.length > 0) {
        violations.push(
            `W3: ${w3Hits.length} lone trigger(s) sit directly under a column-flex wrapper (the implicit align-items:stretch stretches them to full parent width): ${w3Hits.join("; ")} — wrap each in a content-width \`flex items-center gap-X\` row.`,
        );
    }

    // ── W4 — no hand-rolled bg-card/60 plate in the enrolled set ──────────────
    const w4Hits = [];
    for (const name of CONTAINER_STORIES) {
        const body = stripped[name] ?? "";
        // Count the bg-card/60 occurrences (any class attr; the springs paper
        // STAGE is bg-background/40, not bg-card/60, so it is not matched).
        const matches = body.match(/bg-card\/60/g);
        if (matches && matches.length > 0) {
            w4Hits.push(`${name} (${matches.length}× bg-card/60)`);
        }
    }
    if (w4Hits.length > 0) {
        violations.push(
            `W4: ${w4Hits.length} enrolled story(ies) carry a hand-rolled bg-card/60 opaque-ish plate (reads dead on dark): [${w4Hits.join(", ")}] — re-point onto a glass-routed container (<ShowcaseFrame>/<Card tier>).`,
        );
    }

    const facts = {
        w1: {
            classHits: w1ClassHits,
            textHits: w1TextHits,
            anchorPresent: /BA\.W-DEMO-AFFORDANCES/.test(
                sources.SURFACES_CSS ?? "",
            ),
        },
        w2: {
            arrowHits: w2ArrowHits,
            registerMiss: w2RegisterMiss,
            registerExists: existsSync(PATHS.STORY_PLAY_BUTTON),
        },
        w3: { hits: w3Hits },
        w4: { hits: w4Hits },
    };

    return { facts, violations };
}

// W3 helper — find a column-flex wrapper whose SOLE interactive (button) child
// is the trigger. The defect form is:
//   <div class="flex flex-col …"> … <Button …/> … </div>   (one Button, no row)
// The remedy form keeps the Button inside a `flex items-center` ROW, so the
// Button's DIRECT parent is the row, not the column. We scan for an opening div
// carrying a flex-col class whose matched body contains exactly one
// <Button/<button as a DIRECT child (not nested in a `flex items-center`/
// `flex-row`/`items-start` row).
function loneColumnFlexTrigger(stripped) {
    const hits = [];
    const openRe = /<div\b([^>]*)>/g;
    let m;
    while ((m = openRe.exec(stripped)) !== null) {
        const attrs = m[1] || "";
        const clsM = attrs.match(/(?::?class)\s*=\s*(["'])([\s\S]*?)\1/);
        if (!clsM) continue;
        const cls = clsM[2];
        const isColumnFlex =
            /(^|[\s"'`])flex(?=$|[\s"'`])/.test(cls) &&
            /(^|[\s"'`])flex-col(?=$|[\s"'`])/.test(cls);
        if (!isColumnFlex) continue;
        // Walk to the matching </div> (balanced).
        const bodyStart = openRe.lastIndex;
        const body = matchedDivBody(stripped, bodyStart);
        if (body === null) continue;
        // A DIRECT child trigger is a <Button/<button NOT nested inside an inner
        // element carrying a row register (flex items-center / flex-row /
        // items-start). We approximate "direct child" by checking the trigger is
        // at depth 1 within this body (no intervening open tag on the path).
        const directTriggers = directChildTriggers(body);
        // Count direct children that are interactive triggers.
        if (directTriggers.length >= 1) {
            // The defect is a SOLE trigger directly under the column. If the
            // body wraps the trigger in a row (flex items-center), the trigger
            // is NOT a direct child of the column (it is a child of the row),
            // so directChildTriggers returns 0 — no hit. A direct trigger here
            // IS the stretch.
            hits.push(
                `<${directTriggers[0].tag}> direct child of flex-col (${directTriggers.length} trigger(s))`,
            );
        }
    }
    return hits;
}

// Return the inner body of the div whose content starts at `start`, balancing
// nested <div>…</div>. Returns null if unbalanced.
function matchedDivBody(stripped, start) {
    let depth = 1;
    let i = start;
    const tagRe = /<(\/?)div\b[^>]*?>/g;
    tagRe.lastIndex = start;
    let m;
    while ((m = tagRe.exec(stripped)) !== null) {
        if (m[1] === "/") {
            depth--;
            if (depth === 0) return stripped.slice(start, m.index);
        } else if (!m[0].endsWith("/>")) {
            depth++;
        }
        i = tagRe.lastIndex;
    }
    return null;
}

// Find <Button/<button opening tags at DEPTH 1 within `body` (i.e. not nested
// inside an inner element). We track tag depth (any open element) and only
// record a trigger when depth === 0 relative to the body root.
function directChildTriggers(body) {
    const out = [];
    let depth = 0;
    const tagRe = /<(\/?)([a-zA-Z][\w-]*)\b([^>]*?)(\/?)>/g;
    let m;
    while ((m = tagRe.exec(body)) !== null) {
        const isClose = m[1] === "/";
        const tag = m[2];
        const selfClose = m[4] === "/";
        const isTrigger = tag === "Button" || tag === "button";
        if (isClose) {
            depth = Math.max(0, depth - 1);
            continue;
        }
        if (depth === 0 && isTrigger) {
            out.push({ tag });
        }
        if (!selfClose) depth++;
    }
    return out;
}

function run() {
    const sources = {};
    for (const [name, p] of Object.entries(PATHS)) {
        sources[name] = safeRead(p);
    }

    const { facts, violations } = detectDemoAffordances(sources);

    const status = violations.length === 0 ? "pass" : "fail";

    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DEMO_AFFORDANCES_ARTIFACT",
        "BA-demo-affordances",
    );

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:demo-affordances",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:demo-affordances — the demo affordances on the glass grammar (BA.W-DEMO-AFFORDANCES)",
    );
    console.log(
        `  W1 no .glass-btn+.btn-pill stack : ${yn(
            facts.w1.classHits.length === 0 && facts.w1.textHits.length === 0,
        )}  (class:${facts.w1.classHits.length} text:${facts.w1.textHits.length}; anchor:${yn(facts.w1.anchorPresent)})`,
    );
    console.log(
        `  W2 one play register, no ▶       : ${yn(
            facts.w2.arrowHits.length === 0 && facts.w2.registerMiss.length === 0,
        )}  (▶:${facts.w2.arrowHits.length} miss:${facts.w2.registerMiss.length}; register:${yn(facts.w2.registerExists)})`,
    );
    console.log(
        `  W3 no full-width lone trigger    : ${yn(facts.w3.hits.length === 0)}  (hits:${facts.w3.hits.length})`,
    );
    console.log(
        `  W4 no bg-card/60 in enrolled set : ${yn(facts.w4.hits.length === 0)}  (hits:${facts.w4.hits.length})`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
