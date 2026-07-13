#!/usr/bin/env node
// BI.W-GEOMETRY-GRAMMAR — the binding geometry-grammar gate (proof:geometry-grammar).
//
// The born-RED→GREEN device-free SOURCE-STRUCTURE arm for the FOUR geometry laws
// D-GLASS PASS-1 §4 binds. A device-free postcss rule-walk over src/styles/**.css;
// the BINDING truth is the whole-surface π (docs/tranches/BI/.../W-GEOMETRY-GESTALT
// capture) — this is the no-device CI half. A source-green/visually-broken gap is
// the AZ close-class; both halves must hold.
//
// The four laws (each a decidable postcss predicate, each with ≥1 flag + ≥1 pass
// self-test bite):
//
//   LAW 1 — CONCENTRIC RADIUS RELAY (`inner = max(floor, ctx − inset)`).
//     The concentric grammar is a NAMED contract: a container publishes
//     `--radius-ctx` (its resolved radius) + `--radius-inset`; a nested CARD-class
//     surface derives `border-radius: max(var(--radius-floor), calc(var(--radius-ctx)
//     − var(--radius-inset)))`. Two born-RED conditions:
//       (a) RELAY-UNMINTED — `--radius-ctx`/`--radius-inset`/`--radius-floor` not
//           declared in the radius token file. The contract does not exist.
//       (b) READER-REQUIRED (the BI convergence clause) — a minted `--radius-ctx`
//           with ZERO `var(--radius-ctx)` readers is a DEAD relay (worse than
//           unminted; the no-masking-fallback discipline). A mint without a
//           concentric consumer REDs.
//
//   LAW 2 — CAPSULE-VS-CARD. A stadium radius (`--radius-pill`/`--radius-tab`/
//     `--radius-control`/`--radius-badge`/`--radius-dock`/`9999px`) is legal ONLY on
//     a single-control-row interactive strip. A COLUMN-STACK (multi-row) surface
//     wearing a stadium balloons (the verified `.segmented-tabs--vertical` 92×132
//     → 46px caps). The device-free reconciliation of the geometric predicate
//     (shorter-axis > 1.25×control-floor — unmeasurable device-free) with the
//     class-based fix is ONE expression: a column-stack VARIANT (`*--vertical` /
//     `flex-direction:column`) of a stadium-radius BASE must re-bind the family
//     radius var to a BOUNDED rung (`--radius-strip`/`--radius-card`/`--radius-panel`
//     /a finite px) — a column stack IS the source-form of the geometric predicate.
//     The capsule-exemption is a BOUNDED allowlist of KNOWN single-row pill families
//     (anchored selectors, NOT an open noun-match — the pass-3 NEW critique's
//     noun-hole closed).
//
//   LAW 3 — BORDER/RIM GRAMMAR. A decorative rim paints as an INSET RING or a
//     MASKED BAND (`mask: …padding-box, …border-box; mask-composite: exclude`) —
//     NEVER `border-image` on a rounded surface (it squares the corners). Two
//     born-RED conditions:
//       (a) BORDER-IMAGE — any `border-image:` set to a gradient REDs (the metal
//           rim was the live violation), unless it sits in an `@supports not (…)`
//           degrade (the honest fall is allowed a border-image).
//       (b) BAND-ON-OVERLAY (BI.W-METAL-RIM-BAND ruling 10) — a `mask-composite`
//           band decorating a metal rim (`.metal-*-border`) must sit on a
//           `::before`/dedicated overlay, NEVER the HOST `background`. The pass-4b
//           direct-host application (the band applied straight on the
//           `.metal-*-border` host) was the regression the critic caught; a band
//           on the bare host REDs.
//
//   LAW 4 — OFFSET-STAMP SHADOW REQUIRES A CARD SILHOUETTE. The hard 0-blur
//     offset-stamp (`--shadow-cartoon-*`) on a `border-radius: inherit` cast poking
//     off a PILL host is the lopsided-crescent (UF-A9). The `.btn-punch` pill-CTA
//     register mounts the `.cartoon-cast` (Button emits it for the pill
//     `-audacious` CTAs); a soft radius-following drop re-point for the cast under
//     the pill/punch host must exist — else the hard stamp pokes the stadium.
//
// USAGE:  node scripts/proof-geometry-grammar.mjs [--root <dir>] [--selftest] [--json]
//   exit 0 = GREEN (no violations)   exit 1 = RED (≥1 violation)   exit 2 = harness error

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");

const argv = process.argv.slice(2);
const SELFTEST = argv.includes("--selftest");
const JSON_OUT = argv.includes("--json");
const rootIdx = argv.indexOf("--root");
const ROOT = rootIdx >= 0 ? path.resolve(argv[rootIdx + 1]) : REPO;
const STYLES = path.join(ROOT, "src/styles");

// ── the capsule exemption (anchored selectors, NOT an open noun-match) ──
// Split in TWO so the pass-3 NEW critique's noun-hole is closed AND the dock's
// box-inviolate pill is honored:
//
//   DOCK_UNCONDITIONAL — the dock family (shell + controls). The dock's stadium is
//   its BOX-INVIOLATE identity (`--radius-dock: var(--radius-pill)`), sanctioned in
//   BOTH orientations (a vertical dock is a narrow icon column whose caps ARE the
//   control roundness — not a balloon). The dock's radius is owned by the W-DOCK
//   gates (proof:dock-*), so geometry-grammar EXEMPTS it entirely and owns only the
//   card/tab/metal/button geometry. Exempt even with `.vertical`.
//
//   SINGLE_ROW_PILL — chips/pills/badges: a single-control-row pill is stadium-legal
//   ONLY when NOT a column-stack variant (a `.toggle-chip--vertical`/`.foo-list`
//   MULTI-ROW stack is NOT exempt — the noun-hole closed).
const DOCK_UNCONDITIONAL = [
    ".glass-dock",
    ".dock-icon-button",
    ".dock-tab-button",
    ".dock-select-trigger",
    ".dock-dropdown-trigger",
    ".dock-layer-tab",
];
const SINGLE_ROW_PILL = [
    ".glass-chip",
    ".glass-capsule",
    ".glass-pill",
    ".btn-pill",
    ".badge",
    ".avatar",
    ".status-dot",
    ".pulse",
    ".color-swatch",
    ".slider-thumb",
    ".segmented-tab", // the individual single-row tab (not the --vertical TRACK)
    ".toggle-chip",
    ".selectable-chip",
];
const STADIUM_TOKENS = [
    "--radius-pill",
    "--radius-tab",
    "--radius-control",
    "--radius-badge",
    "--radius-dock",
];
const STADIUM_RE = /(--radius-pill|--radius-tab|--radius-control|--radius-badge|--radius-dock|\b9999px\b|\b99999px\b)/;
const BOUNDED_RE = /(--radius-strip|--radius-card|--radius-panel|--radius-lg|--radius-md|--radius-sm|--radius-xl|--radius-2xl|--radius-3xl|--radius-field|--radius-dialog|--radius-dock-card|\b\d+px\b|\b\d*\.?\d+rem\b)/;

// ── LAW 4 · the UF-A9 offset-stamp census ──
// A `--shadow-cartoon-*` read in a box-shadow (or a `--*-shadow` custom the surface
// resolves onto box-shadow) is the hard 0-blur offset stamp. It is LEGAL only where
// the host is a CARD-radius silhouette (the offset tucks under the corner) — on a
// CAPSULE/PILL it pokes the lopsided crescent off the stadium (UF-A8/A9).
const CARTOON_RE = /var\(\s*--shadow-cartoon/;
// The enumerated CARD-RADIUS / sanctioned consumers (a stamp here is legal):
//   • CARD-RADIUS silhouettes — the offset tucks under the corner radius:
//       .cartoon-surface        Card surface="cartoon" (@utility + :hover)
//       [data-slot=select-content] / [data-slot=combobox-list]  the dropdown PANEL (a card)
//       .configurator-preset-tile   the preset TILE (border-radius: var(--radius-card))
//       .liquid-enter               the .is-cel hero/headline enter-cast (a card surface)
//   • radius-AGNOSTIC — the cast/utility inherits its host's radius; the pill case is
//     handled by the soft-drop re-point guard, the card case is the legal stamp:
//       .cartoon-cast               the base inert cast (border-radius: inherit)
//       .shadow-cartoon-{sm,md,lg}  the raw utility classes (consumer-applied)
//   • sanctioned DELIBERATE small opt-in/hover casts on a pill register (gate-owned
//     ELSEWHERE — proof:metric-hover / proof:carousel-glass-atoms; a small
//     `--shadow-cartoon-sm` on hover / `data-cast`, NOT the default-ON loud-CTA
//     rest crescent this law targets):
//       .metric-badge               MetricBadge :hover value-lift (proof:metric-hover)
//       .glass-atom / .badge-atom   the glass-atom/badge register data-cast (opt-in)
const CARTOON_CARD_ALLOWLIST = [
    ".cartoon-surface",
    ".cartoon-cast",
    ".configurator-preset-tile",
    ".liquid-enter",
    ".shadow-cartoon-sm",
    ".shadow-cartoon-md",
    ".shadow-cartoon-lg",
    ".metric-badge",
    ".glass-atom",
    ".badge-atom",
];
const CARTOON_CARD_ALLOWLIST_SUBSTR = [
    '[data-slot="select-content"]',
    '[data-slot="combobox-list"]',
];

function listCss(dir) {
    const out = [];
    if (!fs.existsSync(dir)) return out;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) out.push(...listCss(p));
        else if (ent.name.endsWith(".css")) out.push(p);
    }
    return out;
}

// word-bounded class-token match so `.dock-layer-tab` matches but `.dock-layer-list`
// does NOT (the noun-hole close).
function hasClass(selector, cls) {
    const re = new RegExp(cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\w-])");
    return re.test(selector);
}
// Return true if this rule/selector is capsule-exempt.
function isCapsuleExempt(selector) {
    // the dock family is UNCONDITIONALLY exempt (box-inviolate pill, both orientations,
    // radius owned by the W-DOCK gates).
    if (DOCK_UNCONDITIONAL.some((sel) => hasClass(selector, sel))) return true;
    // a NON-dock column-stack variant is NEVER exempt (multi-row → the balloon).
    if (/(--vertical|--column|\.vertical\b|-stack\b|-list\b|-section\b)/.test(selector)) return false;
    // a single-row pill family keeps its stadium.
    return SINGLE_ROW_PILL.some((sel) => hasClass(selector, sel));
}

function isColumnStack(rule) {
    const sel = rule.selector || "";
    if (/(--vertical|--column|\.vertical\b)/.test(sel)) return true;
    let stack = false;
    rule.walkDecls((d) => {
        if (d.prop === "flex-direction" && /column/.test(d.value)) stack = true;
        if (d.prop === "flex-flow" && /column/.test(d.value)) stack = true;
        if (d.prop === "grid-auto-flow" && /\brow\b/.test(d.value)) stack = true;
    });
    return stack;
}

// ── the analysis over a set of parsed roots ──
function analyze(files) {
    const corpus = files.map((f) => ({
        file: f,
        src: fs.readFileSync(f, "utf8"),
    }));
    const violations = [];
    const facts = {
        relayMinted: { ctx: false, inset: false, floor: false, strip: false },
        ctxReaders: 0,
        borderImages: [],
        hostBands: [],
        verticalStadiumVariants: [],
        btnPunchPresent: false,
        btnPunchSoftDrop: false,
        // UF-A9 census — every --shadow-cartoon-* consumer × its radius class × verdict.
        cartoonConsumers: [],
        cartoonStadiumStamps: [],
    };

    // fast text scans (relay mint + ctx readers + strip)
    for (const { src } of corpus) {
        if (/--radius-ctx\s*:/.test(src)) facts.relayMinted.ctx = true;
        if (/--radius-inset\s*:/.test(src)) facts.relayMinted.inset = true;
        if (/--radius-floor\s*:/.test(src)) facts.relayMinted.floor = true;
        if (/--radius-strip\s*:/.test(src)) facts.relayMinted.strip = true;
        // a READER is a var(--radius-ctx) NOT on the declaration line itself.
        const readerMatches = src.match(/var\(\s*--radius-ctx\b/g) || [];
        facts.ctxReaders += readerMatches.length;
    }

    // postcss rule-walk per file
    for (const { file, src } of corpus) {
        let root;
        try {
            root = postcss.parse(src, { from: file });
        } catch (e) {
            violations.push({ law: 0, file, key: "parse-error", msg: String(e.message) });
            continue;
        }
        root.walkRules((rule) => {
            const sel = rule.selector || "";
            // does this rule sit inside an @supports (not ...) degrade? (Law-3 fall)
            let inNotSupports = false;
            let p = rule.parent;
            while (p) {
                if (p.type === "atrule" && p.name === "supports" && /\bnot\b/.test(p.params || "")) inNotSupports = true;
                p = p.parent;
            }

            rule.walkDecls((decl) => {
                const { prop, value } = decl;

                // LAW 3 — border-image gradient
                if (prop === "border-image" && /gradient/.test(value) && !inNotSupports) {
                    facts.borderImages.push({ file, sel, value: value.slice(0, 40) });
                }

                // LAW 2 (direct) — a column-stack rule that directly binds a stadium radius
                if (
                    (prop === "border-radius" || prop === "--bouncy-slider-radius" || /radius/.test(prop)) &&
                    STADIUM_RE.test(value) &&
                    isColumnStack(rule) &&
                    !isCapsuleExempt(sel)
                ) {
                    facts.verticalStadiumVariants.push({ file, sel, prop, value, kind: "direct" });
                }
            });

            // LAW 2 (inherit) — a *--vertical / column-stack VARIANT of a stadium base
            // that does NOT re-bind the family radius var to a bounded rung.
            if (/(--vertical|--column|\.vertical\b)/.test(sel) && !isCapsuleExempt(sel)) {
                // find the family radius var this variant's base sets to a stadium.
                // heuristic: the base class = the selector minus the --vertical/.vertical
                // modifier. If the base sets `--<fam>-radius: <stadium>` and the variant
                // does NOT re-bind it to a bounded rung, the variant inherits the stadium.
                let rebindsBounded = false;
                let bindsStadium = false;
                rule.walkDecls((d) => {
                    if (/radius/.test(d.prop)) {
                        if (STADIUM_RE.test(d.value)) bindsStadium = true;
                        if (BOUNDED_RE.test(d.value) && !STADIUM_RE.test(d.value)) rebindsBounded = true;
                    }
                });
                // the base radius var name the family threads (segmented-tabs: --bouncy-slider-radius)
                const baseSel = sel.replace(/(--vertical|--column|\.vertical)\b/g, "").trim();
                let baseStadium = false;
                let familyRadiusVar = null;
                root.walkRules((r2) => {
                    if (baseSel && r2.selector && r2.selector.trim() === baseSel) {
                        r2.walkDecls((d2) => {
                            if (/^--[\w-]*radius$/.test(d2.prop) && STADIUM_RE.test(d2.value)) {
                                baseStadium = true;
                                familyRadiusVar = d2.prop;
                            }
                        });
                    }
                });
                if ((baseStadium || bindsStadium) && !rebindsBounded) {
                    facts.verticalStadiumVariants.push({
                        file,
                        sel,
                        prop: familyRadiusVar || "inherited",
                        value: "stadium (unbounded on column-stack)",
                        kind: "inherit",
                    });
                }
            }

            // LAW 3 (band-on-overlay, ruling 10) — a mask-composite band decorating
            // a metal rim (.metal-*-border) must live on a ::before/dedicated overlay,
            // NEVER the bare HOST. Detect a band recipe (mask-composite, or a mask
            // reading border-box) on a .metal-*-border selector that is NOT a
            // ::before/::after pseudo-element and NOT a descendant overlay.
            if (/\.metal-(?:gold|silver|bronze)-border/.test(sel) && !inNotSupports) {
                let hasBand = false;
                rule.walkDecls((d) => {
                    if (/^(?:-webkit-)?mask-composite$/.test(d.prop)) hasBand = true;
                    if (/^(?:-webkit-)?mask$/.test(d.prop) && /border-box/.test(d.value)) hasBand = true;
                });
                if (hasBand) {
                    const onOverlay =
                        /::(?:before|after)/.test(sel) ||
                        /\.metal-(?:gold|silver|bronze)-border\s*(?:[>+~]|\s)\s*\S/.test(sel);
                    if (!onOverlay) {
                        facts.hostBands.push({ file, sel });
                    }
                }
            }

            // LAW 4 — btn-punch pill-cast register + its soft-drop re-point
            if (/\bbtn-punch\b/.test(sel)) facts.btnPunchPresent = true;
            if (/\bbtn-punch\b/.test(sel) && /cartoon-cast/.test(sel)) {
                rule.walkDecls((d) => {
                    if (
                        d.prop === "box-shadow" &&
                        /(--shadow-md|--shadow-lg|--shadow-drop|radius-following)/.test(d.value) &&
                        !/--shadow-cartoon/.test(d.value)
                    ) {
                        facts.btnPunchSoftDrop = true;
                    }
                });
            }

            // LAW 4 (UF-A9 CENSUS) — enumerate every --shadow-cartoon-* box-shadow
            // consumer, classify its host silhouette, and flag a hard stamp DIRECTLY on
            // a canonical single-row pill (SINGLE_ROW_PILL) OR a rule that binds a stadium
            // radius token alongside the stamp — off the enumerated card-radius allowlist.
            {
                let readsCartoon = false;
                let bindsStadiumRadius = false;
                rule.walkDecls((d) => {
                    if (d.prop === "box-shadow" && CARTOON_RE.test(d.value)) readsCartoon = true;
                    if (/radius/.test(d.prop) && STADIUM_RE.test(d.value)) bindsStadiumRadius = true;
                });
                if (readsCartoon) {
                    const onAllowlist =
                        CARTOON_CARD_ALLOWLIST.some((a) => hasClass(sel, a)) ||
                        CARTOON_CARD_ALLOWLIST_SUBSTR.some((a) => sel.includes(a));
                    // a hard stamp is on a STADIUM host when the selector matches a
                    // canonical single-row pill class, or the rule binds a stadium radius.
                    const canonicalPill = SINGLE_ROW_PILL.some((p) => hasClass(sel, p));
                    const stadiumHost = canonicalPill || bindsStadiumRadius;
                    const radiusClass = stadiumHost
                        ? "stadium"
                        : onAllowlist
                          ? "card-radius (allowlisted)"
                          : "card-radius / radius-agnostic";
                    const flagged = stadiumHost && !onAllowlist;
                    facts.cartoonConsumers.push({
                        file,
                        sel: sel.replace(/\s+/g, " ").trim(),
                        radiusClass,
                        verdict: flagged
                            ? "RED — hard stamp on a stadium host"
                            : onAllowlist
                              ? "OK — enumerated card-radius / sanctioned consumer"
                              : "OK — card-radius / radius-agnostic",
                    });
                    if (flagged) facts.cartoonStadiumStamps.push({ file, sel });
                }
            }
        });

        // LAW 4 (UF-A9 census) — @utility-hosted cartoon consumers. postcss walkRules
        // skips decls sitting DIRECTLY in an @utility atrule (`@utility cartoon-surface
        // { box-shadow: var(--shadow-cartoon-md) }`), so enroll them here too.
        root.walkAtRules("utility", (at) => {
            let readsCartoon = false;
            for (const n of at.nodes || []) {
                if (n.type === "decl" && n.prop === "box-shadow" && CARTOON_RE.test(n.value)) {
                    readsCartoon = true;
                }
            }
            if (readsCartoon) {
                const sel = "." + (at.params || "").trim();
                const onAllowlist =
                    CARTOON_CARD_ALLOWLIST.some((a) => hasClass(sel, a)) ||
                    CARTOON_CARD_ALLOWLIST_SUBSTR.some((a) => sel.includes(a));
                const stadiumHost = SINGLE_ROW_PILL.some((p) => hasClass(sel, p));
                const flagged = stadiumHost && !onAllowlist;
                facts.cartoonConsumers.push({
                    file,
                    sel: `@utility ${(at.params || "").trim()}`,
                    radiusClass: stadiumHost
                        ? "stadium"
                        : onAllowlist
                          ? "card-radius (allowlisted)"
                          : "card-radius / radius-agnostic",
                    verdict: flagged
                        ? "RED — hard stamp on a stadium host"
                        : onAllowlist
                          ? "OK — enumerated card-radius / sanctioned consumer"
                          : "OK — card-radius / radius-agnostic",
                });
                if (flagged) facts.cartoonStadiumStamps.push({ file, sel });
            }
        });
    }

    // ── adjudicate the four laws ──

    // LAW 1
    const relayAllMinted = facts.relayMinted.ctx && facts.relayMinted.inset && facts.relayMinted.floor;
    if (!relayAllMinted) {
        violations.push({
            law: 1,
            key: "law1-relay-unminted",
            msg: `concentric relay unminted (ctx=${facts.relayMinted.ctx} inset=${facts.relayMinted.inset} floor=${facts.relayMinted.floor}) — the --radius-ctx/-inset/-floor contract does not exist`,
        });
    } else if (facts.ctxReaders === 0) {
        violations.push({
            law: 1,
            key: "law1-relay-unread",
            msg: `--radius-ctx is minted but has ZERO var(--radius-ctx) readers — a dead relay (reader-required clause)`,
        });
    }

    // LAW 2
    for (const v of facts.verticalStadiumVariants) {
        violations.push({
            law: 2,
            key: "law2-stadium-on-column-stack",
            file: v.file,
            msg: `stadium radius on a column-stack surface \`${v.sel}\` (${v.prop}: ${String(v.value).slice(0, 40)}) — a multi-row strip must read a BOUNDED rung (--radius-strip)`,
        });
    }

    // LAW 3
    for (const b of facts.borderImages) {
        violations.push({
            law: 3,
            key: "law3-border-image-on-rim",
            file: b.file,
            msg: `border-image gradient on \`${b.sel}\` — a decorative rim must paint as a masked band (mask-composite: exclude), never border-image (it squares the corners)`,
        });
    }
    for (const h of facts.hostBands) {
        violations.push({
            law: 3,
            key: "law3-band-on-host",
            file: h.file,
            msg: `mask-composite band applied to the metal-rim HOST \`${h.sel}\` (ruling 10) — the band must live on a ::before/dedicated overlay, never the host (the pass-4b direct-host regression)`,
        });
    }

    // LAW 4
    if (facts.btnPunchPresent && !facts.btnPunchSoftDrop) {
        violations.push({
            law: 4,
            key: "law4-hard-stamp-on-pill",
            msg: `.btn-punch mounts the .cartoon-cast on pill CTAs but has NO soft radius-following drop re-point — the hard --shadow-cartoon offset stamp pokes off the stadium (the lopsided crescent, UF-A9)`,
        });
    }
    // LAW 4 (UF-A9 census) — a --shadow-cartoon-* offset stamp on a stadium-token host
    // off the enumerated card-radius allowlist. (The btn-punch pill-cast crescent is the
    // born-RED covered above; this census clause is the enumerated allowlist as a
    // positive contract + the direct-stadium regression guard — a future stamp slapped
    // on a canonical pill / stadium-radius rule REDs.)
    for (const s of facts.cartoonStadiumStamps) {
        violations.push({
            law: 4,
            key: "law4-census-stadium-stamp",
            file: s.file,
            msg: `--shadow-cartoon-* offset stamp on the stadium-token host \`${s.sel}\` off the card-radius allowlist (UF-A9) — a pill/capsule takes a SOFT radius-following drop (--shadow-md/-lg), never the hard offset stamp (it pokes the lopsided crescent off the stadium)`,
        });
    }

    return { violations, facts };
}

// ── SELFTEST — planted bites, ≥1 flag + ≥1 pass per law ──
function selftest() {
    const tmp = fs.mkdtempSync(path.join(process.env.TMPDIR || "/tmp", "geomgate-"));
    const styles = path.join(tmp, "src/styles");
    fs.mkdirSync(styles, { recursive: true });
    const bites = [];
    const record = (name, ok, detail) => bites.push({ name, ok, detail });

    const write = (rel, css) => {
        const p = path.join(styles, rel);
        fs.mkdirSync(path.dirname(p), { recursive: true });
        fs.writeFileSync(p, css);
    };
    const runOn = () => analyze(listCss(styles)).violations;
    const clear = () => {
        for (const f of listCss(styles)) fs.rmSync(f);
    };

    // ── LAW 1 ──
    // (flag) unminted relay
    clear();
    write("radius.css", ":root { --radius-card: 1rem; }");
    let v = runOn();
    record("law1-flag-unminted", v.some((x) => x.key === "law1-relay-unminted"), "unminted relay must RED");
    // (flag) minted-but-unread (reader-required)
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; }");
    v = runOn();
    record("law1-flag-unread", v.some((x) => x.key === "law1-relay-unread"), "minted-no-reader must RED (reader-required)");
    // (pass) minted + read
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; }");
    write("card.css", ".sect { border-radius: max(var(--radius-floor), calc(var(--radius-ctx) - var(--radius-inset))); }");
    v = runOn();
    record("law1-pass-minted-read", !v.some((x) => x.law === 1), "minted + read must PASS");

    // ── LAW 2 ──
    // (flag) stadium on --vertical column-stack variant of a stadium base
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; --radius-pill: 9999px; --radius-tab: var(--radius-pill); }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }"); // keep law1 green
    write("tabs.css", ".tabs { --tabs-radius: var(--radius-tab); } .tabs--vertical { flex-direction: column; }");
    v = runOn();
    record("law2-flag-vertical-stadium", v.some((x) => x.key === "law2-stadium-on-column-stack"), "column-stack inheriting stadium must RED");
    // (flag) direct stadium on a column rule
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; --radius-pill: 9999px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("strip.css", ".foo-list { flex-direction: column; border-radius: 9999px; }");
    v = runOn();
    record("law2-flag-direct-stadium", v.some((x) => x.key === "law2-stadium-on-column-stack"), "direct stadium on column-stack must RED");
    // (pass) vertical variant re-binds a bounded rung
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; --radius-pill: 9999px; --radius-tab: var(--radius-pill); --radius-strip: 12px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("tabs.css", ".tabs { --tabs-radius: var(--radius-tab); } .tabs--vertical { flex-direction: column; --tabs-radius: var(--radius-strip); }");
    v = runOn();
    record("law2-pass-bounded", !v.some((x) => x.law === 2), "vertical variant re-binding a bounded rung must PASS");
    // (pass) capsule-exempt single-row pill keeps stadium
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; --radius-pill: 9999px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("dock.css", ".glass-dock { flex-direction: column; border-radius: 9999px; }");
    v = runOn();
    record("law2-pass-capsule-exempt", !v.some((x) => x.law === 2), ".glass-dock pill-in-pill exemption must PASS");
    // (flag) capsule-noun-hole closed: a NON-allowlisted -list stack with a capsule noun is NOT exempt
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; --radius-pill: 9999px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("hole.css", ".dock-layer-list { flex-direction: column; border-radius: 9999px; }");
    v = runOn();
    record("law2-flag-nounhole", v.some((x) => x.key === "law2-stadium-on-column-stack"), "a capsule-noun -list multi-row stack is NOT exempt (noun-hole closed)");

    // ── LAW 3 ──
    // (flag) border-image gradient
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("metal.css", ".metal-gold-border { border-image: linear-gradient(90deg, gold, white) 1; }");
    v = runOn();
    record("law3-flag-border-image", v.some((x) => x.key === "law3-border-image-on-rim"), "border-image gradient must RED");
    // (flag) BAND-ON-OVERLAY (ruling 10) — a mask-composite band applied to the
    // bare .metal-*-border HOST is the pass-4b direct-host regression → RED.
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("metal.css", "@supports (mask-composite: exclude) { .metal-gold-border { background: linear-gradient(90deg, gold, white); mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box; mask-composite: exclude; } }");
    v = runOn();
    record("law3-flag-band-on-host", v.some((x) => x.key === "law3-band-on-host"), "a mask-composite band on the .metal-*-border HOST must RED (ruling-10 band-on-overlay)");
    // (pass) masked band on a ::before OVERLAY, no border-image, not the host
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("metal.css", "@supports (mask-composite: exclude) { .metal-gold-border::before { content: ''; background: linear-gradient(90deg, gold, white); mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box; mask-composite: exclude; } }");
    v = runOn();
    record("law3-pass-masked-band", !v.some((x) => x.law === 3), "masked band on a ::before overlay must PASS");
    // (pass) border-image inside @supports(not ...) degrade is allowed
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("fall.css", "@supports not (mask-composite: exclude) { .metal-gold-border { border-image: linear-gradient(gold, white) 1; } }");
    v = runOn();
    record("law3-pass-degrade-allowed", !v.some((x) => x.law === 3), "border-image inside @supports(not) degrade is allowed");

    // ── LAW 4 ──
    // (flag) btn-punch with no soft-drop
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("btn.css", ".btn-punch { position: relative; } .cartoon-cast { box-shadow: var(--shadow-cartoon-md); border-radius: inherit; }");
    v = runOn();
    record("law4-flag-no-softdrop", v.some((x) => x.key === "law4-hard-stamp-on-pill"), "btn-punch with no soft-drop must RED");
    // (pass) btn-punch cast re-points to a soft drop
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("btn.css", ".btn-punch { position: relative; } .btn-punch .cartoon-cast { box-shadow: var(--shadow-lg); }");
    v = runOn();
    record("law4-pass-softdrop", !v.some((x) => x.law === 4), "btn-punch cast with a soft-drop re-point must PASS");
    // (pass) no btn-punch register at all → law4 silent
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    v = runOn();
    record("law4-pass-absent", !v.some((x) => x.law === 4), "no btn-punch register → law4 silent");

    // ── LAW 4 (UF-A9 census) ──
    // (flag) a hard --shadow-cartoon stamp DIRECTLY on a canonical single-row pill
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("pill.css", ".glass-pill { box-shadow: var(--shadow-cartoon-lg); }");
    v = runOn();
    record("law4-census-flag-pill-stamp", v.some((x) => x.key === "law4-census-stadium-stamp"), "a --shadow-cartoon stamp on a canonical pill (.glass-pill) must RED");
    // (flag) a stamp on a rule that binds a stadium radius alongside it
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; --radius-pill: 9999px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("host.css", ".loud-cta { border-radius: var(--radius-pill); box-shadow: var(--shadow-cartoon-md); }");
    v = runOn();
    record("law4-census-flag-stadium-radius", v.some((x) => x.key === "law4-census-stadium-stamp"), "a stamp on a rule binding a stadium radius must RED");
    // (pass) the stamp on a card-radius consumer (allowlist) does NOT false-red
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("cartoon.css", ".cartoon-surface { box-shadow: var(--shadow-cartoon-md); } .cartoon-surface:hover .cartoon-cast { box-shadow: var(--shadow-cartoon-lg); }");
    v = runOn();
    record("law4-census-pass-card-consumer", !v.some((x) => x.key === "law4-census-stadium-stamp"), "a card-radius consumer (.cartoon-surface) keeps the stamp (no false-red)");
    // (pass) the base radius-agnostic cast is not a stadium stamp (allowlisted)
    clear();
    write("radius.css", ":root { --radius-ctx: 1rem; --radius-inset: 6px; --radius-floor: 4px; }");
    write("card.css", ".x { border-radius: var(--radius-ctx); }");
    write("cast.css", ".cartoon-cast { border-radius: inherit; box-shadow: var(--shadow-cartoon-md); } .btn-punch .cartoon-cast { box-shadow: var(--shadow-lg); }");
    v = runOn();
    record("law4-census-pass-base-cast", !v.some((x) => x.key === "law4-census-stadium-stamp"), "the base radius-agnostic .cartoon-cast (pill covered by soft-drop) does not false-red");

    fs.rmSync(tmp, { recursive: true, force: true });
    const passed = bites.filter((b) => b.ok).length;
    const failed = bites.filter((b) => !b.ok);
    console.log(`\n[proof:geometry-grammar --selftest] ${passed}/${bites.length} bites pass`);
    for (const b of bites) console.log(`  ${b.ok ? "✓" : "✗"} ${b.name} — ${b.detail}`);
    if (failed.length) {
        console.log(`\n✗ SELFTEST FAILED (${failed.length} bites did not behave):`);
        for (const b of failed) console.log(`    ✗ ${b.name}`);
        process.exit(1);
    }
    console.log("\n✓ selftest GREEN — every law has ≥1 flag + ≥1 pass bite; the detector is not hollow.");
    process.exit(0);
}

// ── main ──
if (SELFTEST) {
    selftest();
} else {
    const files = listCss(STYLES);
    if (!files.length) {
        console.error(`[proof:geometry-grammar] no CSS found under ${STYLES}`);
        process.exit(2);
    }
    const { violations, facts } = analyze(files);
    if (JSON_OUT) {
        console.log(JSON.stringify({ root: ROOT, violations, facts }, null, 2));
    }
    const byLaw = [1, 2, 3, 4].map((l) => violations.filter((v) => v.law === l).length);
    console.log(`\n[proof:geometry-grammar] root=${path.relative(REPO, ROOT) || "."}  files=${files.length}`);
    console.log(`  Law 1 (concentric relay):   ${byLaw[0]} violation(s)`);
    console.log(`  Law 2 (capsule-vs-card):    ${byLaw[1]} violation(s)`);
    console.log(`  Law 3 (border/rim grammar): ${byLaw[2]} violation(s)`);
    console.log(`  Law 4 (offset-stamp/pill):  ${byLaw[3]} violation(s)`);
    if (facts.cartoonConsumers.length) {
        console.log(`\n  UF-A9 census — ${facts.cartoonConsumers.length} --shadow-cartoon-* consumer(s):`);
        for (const c of facts.cartoonConsumers) {
            console.log(`    · [${c.radiusClass}] ${c.sel}  → ${c.verdict}`);
        }
    }
    if (!violations.length) {
        console.log(`\n✓ GREEN — all four geometry laws hold.`);
        process.exit(0);
    }
    console.log(`\n✗ RED — ${violations.length} geometry-law violation(s):`);
    for (const v of violations) {
        const where = v.file ? ` [${path.relative(ROOT, v.file)}]` : "";
        console.log(`  ✗ Law ${v.law} ${v.key}${where}\n      ${v.msg}`);
    }
    process.exit(1);
}
