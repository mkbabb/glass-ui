// proof:customizability-census — BC.W-CUSTOMIZABILITY-CENSUS: the binding
// "fully customizable with reasonable GOLDEN defaults that afford design
// hierarchy" bar + the per-component EXACTLY-ONE-LIST census + the structural
// anti-smuggle floor.
//
// The governing bar (component-customizability.md §0): EVERY published glass-ui
// component is fully customizable through the SAME three-layer surface — PROPS
// for the semantic per-instance choices (variant / size / tier / tone), `--token`
// `:root` overrides for the visual MAGNITUDES (padding / blur / glyph / alpha /
// hue / duration), SLOTS for content — AND the bare component already reads as a
// proportioned √φ-typography / warm-cream-glass / spring-clocked design that
// AFFORDS hierarchy out of the box. The library ALREADY set this bar inside
// itself (Card's 7 tier rungs + the golden sqrt-φ padding ladder, Button's 13
// variants + 6 size rungs reading `--control-h-*`, GlassDock's 12 axes); this
// gate makes the bar BINDING + MACHINE-LOCKED so the measured gap (21/42 ui/ dirs
// with ZERO customization axis; ~31 hardcoded `text-sm` off the √φ ladder; the
// internally-inconsistent overlay band) cannot be smuggled past a close, and a
// NEW component cannot land un-audited.
//
// The DON'T-over-prop fence (BINDING): a TOKEN beats a prop where a `:root`
// override suffices — magnitudes → tokens, semantic choices → props. The gate
// does NOT demand a prop for a magnitude a `:root` token already covers (a wave
// adding a `padding` prop where `--overlay-pad-inline` suffices is the anti-
// pattern). No contrivance (a size axis ONLY where control-size hierarchy is
// real — the input register yes, Separator/Label/Skeleton no). DRY — thread the
// EXISTING register (the `--control-*` cohort, the `Surface` axis, the φ overlay-
// pad ladder, the √φ type ladder — every one ≥2 consumers), ZERO new register.
//
// CARDINAL SPLIT — this is the SOURCE/MECHANISM arm (`["local","ci"]`, device-
// free). The captured-paint truth (a bare component resolves the golden default
// magnitude; a size/tier/surface override visibly retunes; a `:root` token
// override cascades — getComputedStyle, both modes) is
// tests-visual/customizability.spec.ts (the π arm, orchestrator-driven), NEVER
// this source gate alone.
//
// BORN-RED at HEAD on the four C-residuals (C1/C2/C3 RED; C4 RED) — it goes GREEN
// INCREMENTALLY as the OWNING band waves thread the existing registers:
//   C1 — input register hardcoded type/height off the --control-* cohort
//        (input/Input.vue, switch/Switch.vue, textarea/Textarea.vue,
//        number-field/NumberFieldInput.vue) → BC.W-CONTROL-CUSTOM.
//   C2 — overlay golden non-uniformity (dropdown-menu/select/tooltip/context-menu/
//        command/hover-card lack the `surface` axis and/or the φ overlay-pad)
//        → BC.W-OVERLAY-UNIFORM.
//   C3 — fork-forced px literal + !important-fighting-CVA in a compound custom/
//        component (search/SearchBar.vue, search/FuzzySearch.vue)
//        → BC.W-SEARCH-CUSTOM.
//   C4 — audacious-type STARVED by a pinned single display rung
//        (demo/stories/StoryHero.vue) → BC.W-HERO-AUDACIOUS.
// PARTIAL-until-threads-land is CORRECT, not a failure — this wave AUTHORS the
// bar + the gate + the census; the per-component threads land in the owning band
// waves, each re-earning its own proof:ba-gestalt verdict.
//
// This wave is the SOURCE OF TRUTH: ZERO per-component paint. It erects the
// structural invariant (a born-RED gate + the anti-smuggle census-closure) so a
// customization gap can never silently land (the monotonic-gate-blind-spot
// lesson, the BC.W-GLASS-IDENTITY born-RED-bidirectional precedent, the
// proof:no-shadcn-default D4 census-closure transposed onto the customization-
// SURFACE axis).
//
// The gate scopes the customization-SURFACE axis, NOT the paint axis.
// proof:no-shadcn-default owns "is the default paint ours?" (the shadcn-neutral
// token vocabulary); proof:glass-cohesion owns the bg-opacity axis. THIS gate
// owns "can a consumer express hierarchy via the right knobs?" — the three are
// disjoint by clause and never contradict.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:customizability-census";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip CSS/JS + HTML/Vue comments so a PROSE mention (a clean-break comment
// naming the `text-sm` it replaced, the docstring naming `--control-text`) is NOT
// a false hit. ONLY live class strings / live code count (the
// proof:no-shadcn-default strip precedent).
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const checks = []; // {arm, id, pass, detail}
const add = (arm, id, pass, detail) => checks.push({ arm, id, pass: Boolean(pass), detail });

// ════════════════════════════════════════════════════════════════════════════
// SHARED DETECTORS — the forbidden / required forms (pure, comment-stripped)
// ════════════════════════════════════════════════════════════════════════════

// A BARE control-type Tailwind literal (`text-sm`/`text-xs`) on the control root
// — the √φ-ladder / --control-text register the input family should read. A
// `file:`/`placeholder:`/`[&_…]:`-MODIFIER-scoped literal is a distinct sub-
// element register (Input's `file:text-sm` styles the file-upload pseudo-element,
// NOT the input's own type register) — the negative lookbehind rejects a `:`
// variant separator + a `&`/`]` arbitrary-modifier close, so a modifier-scoped
// literal does NOT flag. The C1 clause (Fences): the gate flags the BARE
// unscoped literal on the control register, never a scoped sub-element one.
const BARE_CONTROL_TYPE = /(?<![\w:&\]/-])text-(?:sm|xs)(?![\w/-])/;

// A modifier-scoped type literal (the EXEMPT form — the self-test proves the
// distinguishing bite: a bare `text-sm` reds, a `file:text-sm` does not).
const MODIFIER_SCOPED_TYPE = /(?:file|placeholder|[\w-]*\]):text-(?:sm|xs)(?![\w/-])/;

// A BARE height/width box literal (`h-6`/`w-11`/`h-5`) on the control register —
// the --control-h-* cohort the family should read via `h-(--control-h-*)`. The
// negative lookbehind rejects a `:` variant separator (a STATE arm like
// `data-[…]:h-6` is the state register, not the base box) + an arbitrary-value
// `h-[…]` (which is a token-or-calc escape, not a bare rung literal). A
// token-backed `h-(--control-h-md)` does NOT match (the `(` after `h-` is not a
// digit).
const BARE_BOX_LITERAL = /(?<![\w:&\]/-])[hw]-(?:[2-9]|1[0-2])(?![\w/[(.-])/;

// The --control-* cohort a control surface SHOULD read (any one of these present
// in a control file marks it as register-aware — the C1 "reads the cohort" proof).
const READS_CONTROL_COHORT = /--control-(?:h-(?:xs|sm|md|lg)|text(?:-sm)?)|control-h-|control-text/;

// The shared {glass·veil·opaque} surface axis — an overlay that imports
// `surfaceClass`/`Surface` from `_shared/useSurfaceAxis` AND threads a `surface`
// prop. The C2 "overlay golden uniformity" proof.
const THREADS_SURFACE_AXIS = /from\s+['"][^'"]*_shared\/useSurfaceAxis['"]/;
const HAS_SURFACE_PROP = /\bsurface\??\s*:\s*Surface\b/;

// The φ overlay-pad ladder — `--overlay-pad-inline` + the `*1.272` block twin.
// The C2 "φ-pad ladder" proof (the golden √φ overlay padding magnitude).
const THREADS_OVERLAY_PAD = /--overlay-pad-inline/;

// A fork-forced glyph/button px literal in a COMPOUND custom/ component — the
// `w-3.5 h-3.5` / `h-3.5 w-3.5` glyph literal, the `!h-6 !w-6` button-dimension
// force, the `text-[0.6rem]` arbitrary type. The C3 "no fork-forced px literal"
// proof — these magnitudes should be token-backed (`--search-icon-size`,
// `--search-button-size`, `--search-result-text`).
const FORK_GLYPH_LITERAL = /(?<![\w:/-])[hw]-3\.5(?![\w/-])/;
const FORK_BTN_FORCE = /!\s*[hw]-\d/;
const FORK_ARBITRARY_TYPE = /text-\[0\.6\d*rem\]/;

// An `!important`-fighting-CVA escape (a `!`-prefixed Tailwind class fighting the
// component's own variant map — a missing variant rung smell). The C3
// "!important = a missing variant rung" proof. We count `!`-prefixed UTILITY
// classes (the `!border-none`/`!bg-transparent`/`!p-0`/`!rounded-none` cluster on
// FuzzySearch:111) — three-or-more in one class string is the CVA-fighting tell.
const BANG_UTILITY = /!(?:border|bg|p|m|rounded|max-w|top|translate|h|w)-[\w[\]./-]+/g;

// A pinned single display rung on a type-display surface — `text-display-N` with
// NO tunable axis (no `:style` / `--hero-scale` / prop binding driving the rung),
// stranding the mega/hero/audacious tiers. The C4 "audacious-type-not-starved"
// proof.
const PINNED_DISPLAY_RUNG = /class="[^"]*\btext-display-\d\b[^"]*"/;
const HAS_TUNABLE_HERO_AXIS = /--hero-scale|--display-scale|heroScale|:style|:class=/;

// ── CP1 — the speedtest-AX `data-protagonist` MetricRow emphasis fold ──────────
// The fold's OWN mechanism (distinct from C1's control-SIZE axis): MetricRow
// ACCEPTS `protagonist?: boolean` (or threads a `:data-protagonist` attr) AND the
// `.metric-row[data-protagonist]` rule LIFTS the focal value to the emphasis
// register reading the EXISTING `--metric-row-*` cohort (the heavier weight rung,
// `var(--token, fallback)` so a `:root`/per-row override cascades). The PROPORTION
// fence (the load-bearing half): the emphasis is GATED on the `[data-protagonist]`
// attribute — it is the ONE focal event per surface, NOT a universal lift of every
// row. A pure detector so the accept-without-emphasis + universal-lift self-test
// bites can mutate fixtures.
function detectProtagonist(metricRowBody) {
    const body = metricRowBody; // already comment-stripped by `strip`
    // (a) ACCEPTS the axis — a `protagonist` prop OR a threaded `:data-protagonist`.
    const acceptsProp =
        /\bprotagonist\??\s*:\s*boolean\b/.test(body) ||
        /:data-protagonist=/.test(body);
    // The emphasis register every protagonist rule must lift the focal value to
    // (the `--metric-row-*-emphasis` cohort rung, token-first).
    const EMPHASIS_TOKEN = /--metric-row-[\w-]*-emphasis/;
    // Enumerate every CSS rule whose BODY references the emphasis token. Each must
    // be GATED on `[data-protagonist]` in its selector (the proportion fence) — an
    // emphasis rule whose selector lacks the attr is a UNIVERSAL lift (every row a
    // protagonist, N competing emphasis).
    const RULE = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    let emphasisRuleCount = 0; // rules lifting the emphasis register
    let gatedEmphasisCount = 0; // …of which gated on [data-protagonist]
    let universalEmphasisLift = false;
    while ((m = RULE.exec(body)) !== null) {
        const selector = m[1];
        const declBody = m[2];
        if (!EMPHASIS_TOKEN.test(declBody)) continue;
        emphasisRuleCount += 1;
        if (/\[data-protagonist/.test(selector)) gatedEmphasisCount += 1;
        else universalEmphasisLift = true;
    }
    // (a) HONORS it — a GATED `.metric-row[data-protagonist] .metric-row__value`
    // emphasis rule lifting the register exists (not a no-op accept).
    const emphasisRuleGated =
        /\.metric-row\[data-protagonist[^\]]*\][^{]*\.metric-row__value[^{]*\{/.test(
            body,
        );
    const emphasisLiftsRegister = gatedEmphasisCount > 0;
    return {
        acceptsProp,
        emphasisRuleGated,
        emphasisLiftsRegister,
        universalEmphasisLift,
        emphasisRuleCount,
        gatedEmphasisCount,
        // The clause holds when the axis is accepted AND honored (a gated emphasis
        // rule lifts a register) AND the proportion is not breached (no ungated
        // emphasis lift).
        ok:
            acceptsProp &&
            emphasisRuleGated &&
            emphasisLiftsRegister &&
            !universalEmphasisLift,
    };
}

// ════════════════════════════════════════════════════════════════════════════
// The ui/ + enrolled-custom/ component walk
// ════════════════════════════════════════════════════════════════════════════
const UI_ROOT = resolve(ROOT, "src/components/ui");
const CUSTOM_ROOT = resolve(ROOT, "src/components/custom");

function walk(dir, out) {
    if (!existsSync(dir)) return;
    for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) {
            if (name === "__tests__" || name === "node_modules") continue;
            walk(p, out);
        } else if (/\.(vue|ts)$/.test(name) && !/\.(test|spec)\.ts$/.test(name)) {
            out.push(p);
        }
    }
}

// The enrolled custom/ compound surfaces this gate audits (the customization gap
// home — the compound-component fork-forced-literal class). The de-shadcn gate
// scopes ui/ only; THIS gate adds the explicitly enrolled custom compounds
// (search) where the C3 gap lives + StoryHero (the C4 display surface). A future
// custom compound bearing a customization gap must be enrolled + censused (the
// closure catches an un-enrolled gap-bearing compound).
const ENROLLED_CUSTOM = new Set(["search"]);

const uiFiles = [];
walk(UI_ROOT, uiFiles);

const customFiles = [];
for (const dir of ENROLLED_CUSTOM) walk(join(CUSTOM_ROOT, dir), customFiles);

const STORY_HERO = "demo/stories/StoryHero.vue";

// CP1 — the speedtest-AX `data-protagonist` MetricRow emphasis fold. MetricRow
// lives in custom/metric-stack (NOT an ENROLLED_CUSTOM compound — it bears no C3
// fork literal); the CP1 clause reads it directly as the fold's OWN mechanism.
const METRIC_ROW = "src/components/custom/metric-stack/MetricRow.vue";

// ════════════════════════════════════════════════════════════════════════════
// C1 — no hardcoded control type/height off the --control-* cohort
// ════════════════════════════════════════════════════════════════════════════
// The input register (the form wells: Input/Switch/Textarea/NumberField) reads
// `--control-text`/`--control-text-sm` for its type + `--control-h-*` for its box
// height — it does NOT carry a bare `text-sm`/`text-xs` on the control root or a
// bare `h-N`/`w-N` box literal for its PRIMARY register. The `file:`-modifier-
// scoped literal is DISTINGUISHED (a sub-element register, not the control's own).
const C1_REGISTER = [
    "src/components/ui/input/Input.vue",
    "src/components/ui/switch/Switch.vue",
    "src/components/ui/textarea/Textarea.vue",
    "src/components/ui/number-field/NumberFieldInput.vue",
];
const c1Violations = [];
for (const rel of C1_REGISTER) {
    const body = strip(read(rel));
    // strip the modifier-scoped type literals so they do NOT count as bare
    const bareTypeBody = body.replace(/(?:file|placeholder|[\w-]*\]):text-(?:sm|xs)/g, "");
    const hasBareType = BARE_CONTROL_TYPE.test(bareTypeBody);
    const hasBareBox = BARE_BOX_LITERAL.test(body);
    if (hasBareType || hasBareBox) {
        const forms = [];
        if (hasBareType) forms.push("bare text-sm/text-xs");
        if (hasBareBox) forms.push("bare h-N/w-N box literal");
        c1Violations.push({ file: rel, forms: forms.join(" + ") });
    }
}
add(
    "C1-control-type-height",
    "no-hardcoded-control-register",
    c1Violations.length === 0,
    c1Violations.length === 0
        ? `all ${C1_REGISTER.length} input-register control surfaces read the --control-* cohort (--control-text + --control-h-*) — ZERO bare text-sm/text-xs or h-N/w-N box literal on the primary register`
        : `${c1Violations.length} control surface(s) hardcode off the --control-* cohort: ${c1Violations
              .map((v) => `${v.file} [${v.forms}]`)
              .join(" | ")} — born-RED until BC.W-CONTROL-CUSTOM threads the size axis + the --control-text register`,
);

// ════════════════════════════════════════════════════════════════════════════
// CP1 — the speedtest-AX `data-protagonist` MetricRow emphasis fold
// ════════════════════════════════════════════════════════════════════════════
// The fold-gate-completeness clause: C1 asserts the control-SIZE axis; the
// `data-protagonist` fold lands a SEPARATE additive emphasis MECHANISM on
// MetricRow, so it owes its OWN born-RED clause. MetricRow ACCEPTS
// `protagonist?: boolean` AND the `.metric-row[data-protagonist]` rule LIFTS the
// focal value to the emphasis register reading the `--metric-row-*` cohort — and
// the proportion holds (the emphasis is the ONE focal event per surface, gated on
// the attr, NOT a universal lift). Born-RED at HEAD (no `protagonist` prop).
const cp1 = detectProtagonist(strip(read(METRIC_ROW)));
const cp1Detail = [];
if (!cp1.acceptsProp) cp1Detail.push("no protagonist?: boolean prop / :data-protagonist thread");
if (!cp1.emphasisRuleGated) cp1Detail.push("no .metric-row[data-protagonist] .metric-row__value emphasis rule");
if (!cp1.emphasisLiftsRegister) cp1Detail.push("the emphasis rule does not lift a --metric-row-*-emphasis register (accept-without-emphasis no-op)");
if (cp1.universalEmphasisLift) cp1Detail.push("the emphasis lifts EVERY row (ungated) — the one-focal-event proportion is breached");
add(
    "CP1-protagonist-emphasis",
    "metric-row-accepts-and-honors-protagonist",
    cp1.ok,
    cp1.ok
        ? `MetricRow ACCEPTS protagonist?: boolean + threads :data-protagonist AND the .metric-row[data-protagonist] .metric-row__value rule lifts the focal value to the --metric-row-value-weight-emphasis register (token-first, --metric-row-* cohort) — gated on the attr (the ONE focal event per surface, the W-SUFFUSE proportion holds)`
        : `the data-protagonist emphasis fold is incomplete: ${cp1Detail.join(" | ")} — born-RED until BC.W-CONTROL-CUSTOM threads the additive MetricRow emphasis mechanism`,
);

// ════════════════════════════════════════════════════════════════════════════
// C2 — overlay golden uniformity
// ════════════════════════════════════════════════════════════════════════════
// Every floating overlay threads the SHARED `surface?: Surface` axis (imports
// `surfaceClass`/`Surface` from `_shared/useSurfaceAxis` + a `surface` prop). The
// CENTER-FLOATED content band (Dialog/Popover/Toast + the six picker overlays)
// ALSO threads the φ `--overlay-pad-inline/-block` ladder; the EDGE-ANCHORED
// panels (Sheet/Drawer) are uniform on the surface axis alone — their slide-in
// panel content shape is not the centered-overlay φ-pad register (no contrivance:
// the φ overlay-pad is the floating-CONTENT golden magnitude, not a forced prop
// on an edge panel). The de-shadcn-equivalent C2 gap: the six pickers
// (dropdown-menu/select/tooltip/context-menu/command/hover-card) lack the surface
// axis and/or the φ overlay-pad.
const C2_OVERLAYS = [
    { dir: "dialog", file: "src/components/ui/dialog/DialogContent.vue", pad: true },
    { dir: "popover", file: "src/components/ui/popover/PopoverContent.vue", pad: true },
    { dir: "toast", file: "src/components/ui/toast/Toast.vue", pad: true },
    { dir: "sheet", file: "src/components/ui/sheet/SheetContent.vue", pad: false },
    { dir: "drawer", file: "src/components/ui/drawer/DrawerContent.vue", pad: false },
    { dir: "dropdown-menu", file: "src/components/ui/dropdown-menu/DropdownMenuContent.vue", pad: true },
    { dir: "select", file: "src/components/ui/select/SelectContent.vue", pad: true },
    { dir: "tooltip", file: "src/components/ui/tooltip/TooltipContent.vue", pad: true },
    { dir: "context-menu", file: "src/components/ui/context-menu/ContextMenuContent.vue", pad: true },
    { dir: "command", file: "src/components/ui/command/CommandList.vue", pad: true },
    { dir: "hover-card", file: "src/components/ui/hover-card/HoverCardContent.vue", pad: true },
];
const c2Violations = [];
for (const ov of C2_OVERLAYS) {
    const body = strip(read(ov.file));
    const hasSurface = THREADS_SURFACE_AXIS.test(body) && HAS_SURFACE_PROP.test(body);
    const hasPad = !ov.pad || THREADS_OVERLAY_PAD.test(body);
    if (!hasSurface || !hasPad) {
        const missing = [];
        if (!hasSurface) missing.push("surface axis");
        if (!hasPad) missing.push("φ overlay-pad");
        c2Violations.push({ dir: ov.dir, file: ov.file, missing: missing.join(" + ") });
    }
}
add(
    "C2-overlay-uniformity",
    "every-overlay-threads-surface-and-pad",
    c2Violations.length === 0,
    c2Violations.length === 0
        ? `all ${C2_OVERLAYS.length} floating overlays thread the SHARED surface?: Surface axis AND the φ --overlay-pad-inline/-block ladder — the overlay golden defaults are uniform`
        : `${c2Violations.length} overlay(s) non-uniform: ${c2Violations
              .map((v) => `${v.dir} [missing ${v.missing}]`)
              .join(" | ")} — born-RED until BC.W-OVERLAY-UNIFORM threads surface + --overlay-pad-*`,
);

// ════════════════════════════════════════════════════════════════════════════
// C3 — no fork-forced px literal in a compound component
// ════════════════════════════════════════════════════════════════════════════
// A compound custom/ component (SearchBar/FuzzySearch) carries no hardcoded
// glyph/button px literal (`w-3.5 h-3.5`, `!h-6 !w-6`, `text-[0.6rem]`) AND no
// `!important`-fighting-CVA escape — the magnitudes are token-backed
// (--search-icon-size, --search-result-text, --search-button-size) and the
// variant gap that forced the `!important` is a real CVA rung.
const C3_COMPOUNDS = [
    "src/components/custom/search/SearchBar.vue",
    "src/components/custom/search/FuzzySearch.vue",
];
const c3Violations = [];
for (const rel of C3_COMPOUNDS) {
    const body = strip(read(rel));
    const hasGlyph = FORK_GLYPH_LITERAL.test(body);
    const hasBtnForce = FORK_BTN_FORCE.test(body);
    const hasArbType = FORK_ARBITRARY_TYPE.test(body);
    const bangCount = (body.match(BANG_UTILITY) || []).length;
    const hasBangCluster = bangCount >= 3; // ≥3 !-prefixed utilities = a CVA-fighting escape
    if (hasGlyph || hasBtnForce || hasArbType || hasBangCluster) {
        const forms = [];
        if (hasGlyph) forms.push("w-3.5/h-3.5 glyph literal");
        if (hasBtnForce) forms.push("!h-N/!w-N button force");
        if (hasArbType) forms.push("text-[0.6rem] arbitrary type");
        if (hasBangCluster) forms.push(`${bangCount} !important-fighting-CVA utilities`);
        c3Violations.push({ file: rel, forms: forms.join(" + ") });
    }
}
add(
    "C3-compound-no-fork-literal",
    "no-fork-forced-px-literal-or-bang-cva",
    c3Violations.length === 0,
    c3Violations.length === 0
        ? `all ${C3_COMPOUNDS.length} compound custom/ components are token-backed (--search-icon-size / --search-result-text / --search-button-size) with ZERO fork-forced px literal or !important-fighting-CVA escape`
        : `${c3Violations.length} compound(s) carry a fork-forced literal: ${c3Violations
              .map((v) => `${v.file} [${v.forms}]`)
              .join(" | ")} — born-RED until BC.W-SEARCH-CUSTOM token-backs the sizes + adds the variant rung`,
);

// ════════════════════════════════════════════════════════════════════════════
// C4 — audacious-type-not-starved
// ════════════════════════════════════════════════════════════════════════════
// A type-display surface exposes its type RUNG as a tunable axis (a prop OR a
// `:root` token) with a golden per-variant default — it does NOT hardcode a
// single display rung that strands the mega/hero/audacious tiers. Born-RED on
// StoryHero's hero <h1> pinned `text-display-3`.
const c4Body = strip(read(STORY_HERO));
// the hero <h1> carries `text-display-N` AND no tunable hero-rung axis drives it
const pinnedRungs = (c4Body.match(/\btext-display-\d\b/g) || []).length;
const hasTunableHero = /--hero-scale|--display-scale|\bheroScale\b/.test(c4Body);
const c4Starved = pinnedRungs > 0 && !hasTunableHero;
add(
    "C4-audacious-not-starved",
    "display-rung-is-a-tunable-axis",
    !c4Starved,
    !c4Starved
        ? hasTunableHero
            ? `StoryHero exposes its hero rung as a tunable axis (--hero-scale / heroScale) with a golden default — the mega/hero/audacious tiers are reachable, not starved`
            : `StoryHero carries no pinned text-display rung — no starved display tier`
        : `StoryHero pins ${pinnedRungs} text-display-N rung(s) with NO tunable hero axis (--hero-scale / heroScale) — the mega/hero/audacious tiers are STARVED; born-RED until BC.W-HERO-AUDACIOUS threads the tunable hero rung`,
);

// ════════════════════════════════════════════════════════════════════════════
// The census closure — the EXACTLY-ONE-LIST anti-smuggle floor
// ════════════════════════════════════════════════════════════════════════════
// Every published ui/ dir + every enrolled custom/ compound appears on EXACTLY
// ONE W-CUSTOMIZABILITY-census.md list {gold | gap | token-only-correct}. A new
// un-listed ui/ dir bearing a customization gap reds — so a future agent cannot
// smuggle a new un-audited component into the surface (the proof:dock-normalize
// W5-closure / proof:no-shadcn-default D4 precedent transposed).
const CENSUS = "docs/tranches/BC/audit/W-CUSTOMIZABILITY-census.md";
const censusBody = read(CENSUS);
add(
    "census-closure",
    "census-exists",
    censusBody.length > 0,
    censusBody.length > 0
        ? `${CENSUS} exists (the per-component customization census — the EXACTLY-ONE-LIST {gold | gap | token-only-correct} anti-smuggle floor)`
        : `${CENSUS} is MISSING (the census is the anti-smuggle closure — without it the gate cannot prove every component is audited)`,
);

// The set of ui/ component package dirs (_shared = shared CVA internals, not a
// component surface — exempt by the same reasoning proof:no-shadcn-default
// exempts it) + the enrolled custom/ compounds. Each MUST appear in the census.
const uiDirs = existsSync(UI_ROOT)
    ? readdirSync(UI_ROOT).filter((n) => {
          const p = join(UI_ROOT, n);
          return statSync(p).isDirectory() && n !== "_shared" && n !== "node_modules";
      })
    : [];
const censusDirs = [...uiDirs, ...[...ENROLLED_CUSTOM].map((d) => `custom/${d}`)];
// A dir is "listed" if its NAME (or `custom/<name>` for an enrolled compound)
// appears as a census row token — word-boundaried in the census body.
const listingCount = (name) => {
    const re = new RegExp(
        `(?<![\\w/-])${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w/-])`,
        "g",
    );
    return (censusBody.match(re) || []).length;
};
const unlisted = censusDirs.filter((d) => listingCount(d) === 0);
add(
    "census-closure",
    "every-component-listed",
    unlisted.length === 0,
    unlisted.length === 0
        ? `all ${censusDirs.length} published components (${uiDirs.length} ui/ + ${ENROLLED_CUSTOM.size} enrolled custom/) appear in the census (the EXACTLY-ONE-LIST closure — no un-audited customization surface can be smuggled in)`
        : `${unlisted.length} component(s) MISSING from the census: ${unlisted.join(", ")} — the anti-smuggle floor is breached`,
);
// Self-test bite: a synthetic un-listed dir name (a "new bare component") is
// ABSENT from the census, so the closure would flag it (the smuggle attempt reds).
const SYNTHETIC_DIR = "zzz-smuggled-customizability-surface";
const syntheticListed = listingCount(SYNTHETIC_DIR) > 0;
add(
    "census-closure",
    "smuggle-self-test-bite",
    !syntheticListed,
    !syntheticListed
        ? `a synthetic un-listed component name \`${SYNTHETIC_DIR}\` is ABSENT from the census — the closure would flag a NEW bare component bearing a customization gap (the anti-smuggle bite has teeth)`
        : "the smuggle self-test is broken (the synthetic dir name unexpectedly appears in the census)",
);

// ════════════════════════════════════════════════════════════════════════════
// SELF-TEST BITES — each C-assert detector flags a synthetic gap + EXEMPTS the
// good corpus (the detectors are real bars, not vacuous greens)
// ════════════════════════════════════════════════════════════════════════════

// C1 bite: a synthetic bare `text-sm` on a control reds; a `file:text-sm`
// modifier-scoped literal does NOT (the distinguishing C1 clause).
const C1_BARE_FIXTURE = 'class="input-pill text-sm"';
const C1_SCOPED_FIXTURE = 'class="input-pill file:text-sm file:font-medium"';
const c1BareBites = BARE_CONTROL_TYPE.test(C1_BARE_FIXTURE);
const c1ScopedExempt = !BARE_CONTROL_TYPE.test(
    C1_SCOPED_FIXTURE.replace(/(?:file|placeholder|[\w-]*\]):text-(?:sm|xs)/g, ""),
);
const c1BoxBites = BARE_BOX_LITERAL.test('class="h-6 w-11"');
const c1TokenExempt = !BARE_BOX_LITERAL.test('class="h-(--control-h-md)"');
add(
    "self-test",
    "c1-bare-vs-scoped-distinguishes",
    c1BareBites && c1ScopedExempt && c1BoxBites && c1TokenExempt,
    c1BareBites && c1ScopedExempt && c1BoxBites && c1TokenExempt
        ? "C1 FLAGS a synthetic bare `text-sm`/`h-6 w-11` on a control AND EXEMPTS a `file:text-sm` modifier-scoped literal + a `h-(--control-h-md)` token-backed box — the distinguishing bite has teeth"
        : `C1 self-test broken — bare-bites=${c1BareBites}, scoped-exempt=${c1ScopedExempt}, box-bites=${c1BoxBites}, token-exempt=${c1TokenExempt}`,
);

// CP1 bite: (i) the real MetricRow corpus passes; (ii) an accept-WITHOUT-emphasis
// synthetic (a `protagonist` prop accepted but no register-lifting rule) REDS —
// the no-op accept; (iii) a universal-lift synthetic (the emphasis raised on the
// UNGATED `.metric-row__value` — every row a protagonist) REDS the proportion.
const CP1_GOOD = detectProtagonist(strip(read(METRIC_ROW)));
const CP1_NOOP_FIXTURE =
    'protagonist?: boolean; :data-protagonist="protagonist" /* no emphasis rule */';
const cp1NoopReds = !detectProtagonist(CP1_NOOP_FIXTURE).ok;
const CP1_UNIVERSAL_FIXTURE =
    'protagonist?: boolean; :data-protagonist="protagonist" ' +
    ".metric-row[data-protagonist=\"true\"] .metric-row__value { font-weight: var(--metric-row-value-weight-emphasis, 650); } " +
    ".metric-row__value { font-weight: var(--metric-row-value-weight-emphasis, 650); }";
const cp1UniversalReds = !detectProtagonist(CP1_UNIVERSAL_FIXTURE).ok;
add(
    "self-test",
    "cp1-protagonist-emphasis-distinguishes",
    CP1_GOOD.ok && cp1NoopReds && cp1UniversalReds,
    CP1_GOOD.ok && cp1NoopReds && cp1UniversalReds
        ? "CP1 PASSES the real MetricRow corpus AND REDS a synthetic accept-without-emphasis no-op (protagonist prop, no register lift) AND REDS a synthetic universal-lift (the emphasis on every ungated row) — the accept-without-emphasis + one-focal-event proportion bites have teeth"
        : `CP1 self-test broken — good-ok=${CP1_GOOD.ok}, noop-reds=${cp1NoopReds}, universal-reds=${cp1UniversalReds}`,
);

// C2 bite: a synthetic overlay missing the surface axis reds; a fully-threaded
// overlay corpus (Dialog) stays clean.
const C2_GOOD_FIXTURE = read("src/components/ui/dialog/DialogContent.vue");
const c2GoodClean =
    THREADS_SURFACE_AXIS.test(strip(C2_GOOD_FIXTURE)) &&
    HAS_SURFACE_PROP.test(strip(C2_GOOD_FIXTURE)) &&
    THREADS_OVERLAY_PAD.test(strip(C2_GOOD_FIXTURE));
const C2_BAD_FIXTURE = `<template><Foo :class="cn('z-popover min-w-32 glass-floating')" /></template>`;
const c2BadFlags =
    !(THREADS_SURFACE_AXIS.test(C2_BAD_FIXTURE) && HAS_SURFACE_PROP.test(C2_BAD_FIXTURE)) ||
    !THREADS_OVERLAY_PAD.test(C2_BAD_FIXTURE);
add(
    "self-test",
    "c2-overlay-axis-distinguishes",
    c2GoodClean && c2BadFlags,
    c2GoodClean && c2BadFlags
        ? "C2 EXEMPTS the fully-threaded Dialog overlay (surface axis + φ overlay-pad) AND FLAGS a synthetic overlay missing the surface/φ-pad — the overlay-uniformity bite has teeth"
        : `C2 self-test broken — good-clean=${c2GoodClean}, bad-flags=${c2BadFlags}`,
);

// C3 bite: a fork-forced `!h-6 w-6`/`text-[0.6rem]` literal + an `!important`-
// fighting-CVA cluster each flag; a token-backed `size-(--search-icon-size)` does
// not.
const C3_FORK_FIXTURE = '<Button class="!h-6 !w-6"><Icon class="h-3.5 w-3.5" /></Button>';
const C3_BANG_FIXTURE = 'class="!border-none !bg-transparent !p-0 !rounded-none"';
const C3_GOOD_FIXTURE = '<Icon class="size-(--search-icon-size)" />';
const c3ForkFlags =
    FORK_GLYPH_LITERAL.test(C3_FORK_FIXTURE) && FORK_BTN_FORCE.test(C3_FORK_FIXTURE);
const c3BangFlags = (C3_BANG_FIXTURE.match(BANG_UTILITY) || []).length >= 3;
const c3GoodExempt =
    !FORK_GLYPH_LITERAL.test(C3_GOOD_FIXTURE) &&
    !FORK_BTN_FORCE.test(C3_GOOD_FIXTURE) &&
    (C3_GOOD_FIXTURE.match(BANG_UTILITY) || []).length === 0;
add(
    "self-test",
    "c3-fork-literal-and-bang-cva-distinguishes",
    c3ForkFlags && c3BangFlags && c3GoodExempt,
    c3ForkFlags && c3BangFlags && c3GoodExempt
        ? "C3 FLAGS a synthetic `!h-6 w-6`/`h-3.5` fork literal AND a 4-utility `!important`-fighting-CVA cluster AND EXEMPTS a token-backed `size-(--search-icon-size)` — the fork-literal bite has teeth"
        : `C3 self-test broken — fork-flags=${c3ForkFlags}, bang-flags=${c3BangFlags}, good-exempt=${c3GoodExempt}`,
);

// C4 bite: a synthetic starved `text-display-3`-pinned hero reds; a tunable
// `--hero-scale`-driven rung does not.
const C4_STARVED_FIXTURE = `<h1 class="story-hero-title text-display-3">{{ title }}</h1>`;
const C4_TUNABLE_FIXTURE = `<h1 class="story-hero-title" :style="{ '--hero-scale': heroScale }">{{ title }}</h1>`;
const c4StarvedFlags =
    /\btext-display-\d\b/.test(C4_STARVED_FIXTURE) &&
    !/--hero-scale|--display-scale|\bheroScale\b/.test(C4_STARVED_FIXTURE);
const c4TunableExempt = /--hero-scale|--display-scale|\bheroScale\b/.test(C4_TUNABLE_FIXTURE);
add(
    "self-test",
    "c4-starved-vs-tunable-distinguishes",
    c4StarvedFlags && c4TunableExempt,
    c4StarvedFlags && c4TunableExempt
        ? "C4 FLAGS a synthetic `text-display-3`-pinned hero (no tunable axis) AND EXEMPTS a `--hero-scale`-driven tunable rung — the starved-display bite has teeth"
        : `C4 self-test broken — starved-flags=${c4StarvedFlags}, tunable-exempt=${c4TunableExempt}`,
);

// The walks reach the inventory (a zero-file walk would vacuously pass).
add(
    "inventory",
    "walk-non-empty",
    uiFiles.length >= 40 && customFiles.length >= 2,
    `${uiFiles.length} ui/ files + ${customFiles.length} enrolled custom/ files + StoryHero walked (need ui/≥40, custom/≥2 — the sweep reaches the surface)`,
);

// ════════════════════════════════════════════════════════════════════════════
// The disease-root bite — the gate is BORN-RED on the HEAD tree
// ════════════════════════════════════════════════════════════════════════════
// The four C-residuals (C1 input-register hardcodes + C2 overlay non-uniformity +
// C3 compound fork literals + C4 starved hero) PROVE this is a real bar, not a
// vacuous green. Informational — surfaces the PARTIAL-until-threads-land state so
// the orchestrator reads it honestly. Goes GREEN as the owning band waves thread.
const cAsserts = [
    { id: "C1", red: c1Violations.length > 0, owner: "BC.W-CONTROL-CUSTOM" },
    { id: "CP1", red: !cp1.ok, owner: "BC.W-CONTROL-CUSTOM" },
    { id: "C2", red: c2Violations.length > 0, owner: "BC.W-OVERLAY-UNIFORM" },
    { id: "C3", red: c3Violations.length > 0, owner: "BC.W-SEARCH-CUSTOM" },
    { id: "C4", red: c4Starved, owner: "BC.W-HERO-AUDACIOUS" },
];
const redAsserts = cAsserts.filter((c) => c.red);
add(
    "disease-root",
    "born-red-witnesses-documented",
    true, // informational — always passes; the DETAIL carries the born-RED census
    redAsserts.length > 0
        ? `BORN-RED (PARTIAL-until-threads-land, CORRECT): ${redAsserts.length}/${cAsserts.length} C-asserts still RED — ${redAsserts
              .map((c) => `${c.id}→${c.owner}`)
              .join(", ")}. Each goes GREEN as its owning band wave threads the existing register. The gate is a REAL bar (not a vacuous green).`
        : "ALL C-asserts are GREEN — the owning band-wave threads have landed; proof:customizability-census is fully GREEN on the golden-default axis.",
);

// ════════════════════════════════════════════════════════════════════════════
// Report
// ════════════════════════════════════════════════════════════════════════════
const failed = checks.filter((c) => !c.pass);
const arms = [...new Set(checks.map((c) => c.arm))];

console.log("proof:customizability-census — the GOLDEN-default + fully-customizable bar (BC.W-CUSTOMIZABILITY-CENSUS)");
for (const arm of arms) {
    const armChecks = checks.filter((c) => c.arm === arm);
    console.log(`  [${arm}] ${armChecks.filter((c) => c.pass).length}/${armChecks.length} pass`);
    for (const c of armChecks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);
}

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_CUSTOMIZABILITY_CENSUS_OUT", "BC-customizability-census");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:customizability-census",
    command: COMMAND,
    note: "SOURCE arm only — the captured-paint truth (a bare component resolves the golden default magnitude; a size/tier/surface override visibly retunes; a :root token override cascades, both modes via getComputedStyle) is tests-visual/customizability.spec.ts (the π arm, orchestrator-driven), never this gate alone. BORN-RED on the four C-residuals → GREEN as the OWNING band waves (CONTROL-CUSTOM/OVERLAY-UNIFORM/SEARCH-CUSTOM/HERO-AUDACIOUS) thread the existing registers; PARTIAL-until-threads-land is CORRECT.",
    uiFilesWalked: uiFiles.length,
    customFilesWalked: customFiles.length,
    c1Violations,
    cp1: { ok: cp1.ok, ...cp1 },
    c2Violations,
    c3Violations,
    c4Starved,
    checks: checks.map((c) => ({ arm: c.arm, id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:customizability-census] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.arm}/${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    `\n[proof:customizability-census] the golden-default + fully-customizable bar holds — every control reads the --control-* cohort, every overlay threads the surface + φ-pad register, every compound is token-backed, every display surface exposes a tunable rung; the census closes EXACTLY-ONE-LIST over every published component; the π arm proves the golden default + the retune cascade paints.`,
);
