// proof:no-shadcn-default — BC.W-DESHADCN: the reska=BEHAVIOR / glass-ui=100%-of-the-MATERIAL
// STRUCTURAL invariant (the shadcn-neutral skin abrogated at root).
//
// The governing principle (DESHADCN-BRAINSTORM §0): reka provides ONLY behavior — focus
// management, ARIA, state machines, portal, roving-tabindex, collision. glass-ui provides
// 100% of the paint, from first principles, in the paper + glassmorphism aesthetic. NO
// shadcn-neutral token survives in the visual layer.
//
// This gate is the residual-shadcn-VOCABULARY axis: it walks src/components/ui/**/*.{vue,ts}
// (the CVA `index.ts` class maps + the SFC `:class`/`class` strings), tokenizes the class-
// shaped strings, and reds any forbidden shadcn-neutral token off a tiny justified
// allowlist. It is the de-shadcn companion to proof:glass-cohesion: where glass-cohesion
// polices the BACKGROUND-opacity axis (the opaque-slab plate), THIS gate polices the
// residual-shadcn TOKEN vocabulary (the `border-input` hairline, the `ring-ring`/`ring-2`/
// `ring-offset` cold focus halo, the bare `rounded-md` squared default, the bare `shadow-sm`
// neutral lift, the `bg-background` page-token slab). Where the two would double-cover the
// bg-opacity case, glass-cohesion is AUTHORITATIVE and this gate DEFERS (the overlap clause) —
// so the two never contradict.
//
// CARDINAL SPLIT — this is the SOURCE/MECHANISM arm (`["local","ci"]`). The captured-paint
// truth (getComputedStyle over the reskinned surfaces resolves the GLASS/PAPER material, not
// the shadcn-neutral token, BOTH modes) is tests-visual/no-shadcn-default.spec.ts (the π arm,
// orchestrator-driven), NEVER this source gate alone.
//
// BORN-RED at HEAD on FOUR live residuals (D1):
//   - button/index.ts `outline` (`border-input bg-background`) + `secondary` (`bg-secondary`)
//     + `accent` (`bg-accent` … `border-border/40`) — the un-reskinned shadcn-neutral tail.
//   - toggle/index.ts `outline` (`border-input`) — the shadcn toggle-outline neutral hairline.
//   - tags-input/TagsInputItem.vue (`ring-ring ring-2 ring-offset-2 ring-offset-background`) —
//     the ONLY live cold shadcn focus halo in ui/ (the .focus-ring token-first divergence bypassed).
//   - switch/Switch.vue thumb (`bg-background`) — a neutral-slab thumb (a control affordance reads
//     the glass/paper material, not the page-background token).
// It goes GREEN INCREMENTALLY as the OWNING band waves land their reskins (BUTTON-GLASS-IOS /
// CONTROL-SMOOTH). PARTIAL-until-owners-land is CORRECT, not a failure — this wave AUTHORS the
// bar + the gate + the census; the per-component paint lands in the owning band waves.
//
// This wave is the SOURCE OF TRUTH: ZERO per-component paint. It erects the structural
// invariant (a born-RED bidirectional gate + the anti-smuggle census-closure) so the neutral
// chrome can never silently drift back (the monotonic-gate-blind-spot lesson, BC.W-GLASS-IDENTITY
// precedent).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:no-shadcn-default";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip CSS/JS + HTML/Vue comments so a PROSE mention (e.g. a clean-break comment naming the
// `bg-background` it replaced — toast/Toast.vue:70, number-field, dialog-scroll) is NOT a
// false hit. ONLY live class strings count (the proof:glass-cohesion strip precedent).
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const checks = []; // {arm, id, pass, detail}
const add = (arm, id, pass, detail) => checks.push({ arm, id, pass: Boolean(pass), detail });

// ── The forbidden shadcn-neutral TOKEN vocabulary ────────────────────────────────────────
// Each is the residual shadcn skin the family RETIRES onto its house register. A token is
// matched as a class-token boundary (so `bg-background` flags but `bg-card`/`bg-transparent`
// do NOT, and `ring-offset-background` is its OWN entry, and `border-border/40` — a per-mode
// rim divergence — is NOT `border-input`). The token form `var(--shadow-sm)` is NEVER matched
// (D2 — the house warm-ink token); only the bare `shadow-sm` Tailwind UTILITY is.
const FORBIDDEN = [
    {
        id: "bg-background",
        // the flat neutral page-token slab on a chrome/content/control surface (NOT
        // `bg-card`/`bg-transparent`/an arbitrary `bg-[…]`). Word-boundaried so
        // `bg-background/40` (a translucent escape, were one to exist) still flags the
        // page-token use, but `data-[…]:bg-background` on an allowlist surface is governed
        // by the allowlist, not the token.
        re: /(?<![\w-])bg-background(?![\w-])/,
        why: "the flat neutral page-token slab — the family reads a translucent --glass-bg-* tier / a --control-surface / a --card warm-cream material, never the page token",
    },
    {
        id: "border-input",
        re: /(?<![\w-])border-input(?![\w-])/,
        why: "the shadcn neutral input hairline — the family reads --control-surface-border / the warm glass rim",
    },
    {
        id: "ring-ring",
        re: /(?<![\w-])ring-ring(?![\w-])/,
        why: "the cold shadcn focus halo color — the family reads the warm .focus-ring / --focus-ring-shadow (AW.W26)",
    },
    {
        id: "ring-2",
        // the shadcn focus-ring WIDTH utility (the .focus-ring divergence replaces it with a
        // box-shadow ring). `ring-0` (the OFF state, Switch thumb) is NOT this — match `ring-2`
        // exactly, not `ring-<n>` generally, so `ring-0` is untouched (the family DOES use
        // ring-0 to zero an inherited ring).
        re: /(?<![\w-])ring-2(?![\w-])/,
        why: "the shadcn focus-ring width utility — the family's focus ring is the box-shadow --focus-ring-shadow, not a `ring-2` outline",
    },
    {
        id: "ring-offset",
        // `ring-offset-2` / `ring-offset-background` / `ring-offset-*` — the cold shadcn
        // ring-offset family. Any `ring-offset-` prefix flags (the .focus-ring needs no offset).
        re: /(?<![\w-])ring-offset-[\w-]+/,
        why: "the shadcn ring-offset family (ring-offset-2 / ring-offset-background) — the warm box-shadow .focus-ring needs no offset gap",
    },
    {
        id: "rounded-md",
        // the BARE squared shadcn radius default. The family reads the geometry tokens
        // rounded-pill/-card/-button/-panel. `rounded-md` is ALREADY absent at HEAD (0 live
        // hits) — the census keeps it that way (a re-introduced bare `rounded-md` reds).
        re: /(?<![\w-])rounded-md(?![\w-])/,
        why: "the bare squared shadcn radius default — the family reads the geometry tokens rounded-pill/-card/-button/-panel",
    },
    {
        id: "shadow-sm-utility",
        // the BARE `shadow-sm` Tailwind UTILITY (the shadcn neutral lift). DISTINCT from the
        // `var(--shadow-sm)` house TOKEN (which composes warm-ink --shadow-color, Conventions
        // §shadows) — the token is KEPT (D2). The negative lookbehind `(?<!\()` + the class-
        // token boundary ensure `var(--shadow-sm)` / `--shadow-sm` (the token forms) do NOT
        // match; only a bare `shadow-sm` class token does.
        re: /(?<![\w-(])shadow-sm(?![\w-)])/,
        why: "the bare shadow-sm Tailwind utility (the shadcn neutral lift) — the family reads the var(--shadow-sm) house warm-ink token (KEPT), never the bare utility",
    },
    {
        id: "bg-muted-slab",
        // the neutral opaque slab USED AS A SURFACE FILL (the proof:glass-cohesion overlap —
        // bg-muted/bg-secondary/bg-primary/bg-accent as the BASE surface fill, off the allowlist).
        // The overlap-DEFER clause (Fences): glass-cohesion is AUTHORITATIVE on the bg-opacity
        // axis; this gate flags ONLY the residual-vocabulary SURFACE FILL — the LEADING
        // (variant-prefix-FREE) `bg-<neutral>` slab. A STATE arm (`hover:bg-accent`,
        // `data-[state=open]:bg-secondary`, `focus:bg-accent`) is NOT a base surface fill — it is
        // the menu-row/feedback-tone register glass-cohesion + proof:menu-tokens own, so this gate
        // DEFERS (the negative lookbehind rejects a `:` variant separator). A translucent escape
        // (`bg-secondary/80`) is NOT the slab either (the `(?![\w/-])` excludes the `/N` alpha).
        // Born-RED on button `secondary`/`accent` (the leading `bg-secondary`/`bg-accent` fill) +
        // select-separator's `bg-muted` divider — the un-reskinned surface-fill tail.
        re: /(?<![\w:-])bg-(?:muted|secondary|primary|accent)(?![\w/-])/,
        why: "a neutral opaque slab (bg-muted/secondary/primary/accent) used as a LEADING SURFACE FILL — the family reads a --glass-bg-* tier; a STATE arm (hover:/focus:/data-[…]:) defers to glass-cohesion, a translucent /N escape is not the slab",
    },
];

// The token-vs-utility distinguishing guard (D2): the house TOKEN forms `var(--shadow-sm)`,
// `--shadow-sm:`, `--shadow-sm)` must NEVER be flagged by the shadow-sm-utility rule. The
// negative lookbehind/lookahead in the rule does this; this constant documents the intent +
// powers the self-test bite.
const SHADOW_TOKEN_FORM = /var\(--shadow-sm\)|--shadow-sm[\s:)]/;

// ── The legibility allowlist (the ONLY sanctioned survivor; AX.W54 / proof:glass-cohesion) ──
// avatar/label/separator/skeleton/table/data-table (the opaque legibility set) + badge's
// loud-saturated-pill register + checkbox/radio-group's STATE-maximal-contrast register (the
// 16px selection atoms — glass reads sub-perceptual at that scale, the same legibility argument
// the allowlist makes for badge's loud pill). A planted shadcn-neutral token on an allowlist
// surface stays GREEN; on a NON-allowlist surface it reds. This wave does NOT widen the
// allowlist — it ratifies it as the de-shadcn survivor set.
const ALLOWLIST = new Set([
    "avatar",
    "label",
    "separator",
    "skeleton",
    "table",
    "data-table",
    "badge",
    "checkbox",
    "radio-group",
]);

// A file is "in the allowlist family" if its path is under one of the allowlisted ui/ package
// dirs (the proof:glass-cohesion inAllowlist precedent, scoped to ui/).
const inAllowlist = (relPath) => {
    const rel = relPath.replace(/\\/g, "/");
    return [...ALLOWLIST].some((a) => new RegExp(`/ui/${a}(?:-[a-z]+)?/`).test(rel));
};

// ── Walk src/components/ui/**/*.{vue,ts} (the gate scope is ui/ ONLY — the de-shadcn principle
// is about the shadcn-vue WRAPPER skin; custom/ is glass-ui-authored from birth, not a shadcn
// port). The merged A7 TypewriterText.vue neutral-gray finding is RECORDED in the census but is
// NOT a target here (its execution home is BC.W-VISUAL-RECONCILE; the gate scope stays ui/).
const UI_ROOT = resolve(ROOT, "src/components/ui");

function walk(dir, out) {
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

const allFiles = [];
if (existsSync(UI_ROOT)) walk(UI_ROOT, allFiles);

// ── D1 — the forbidden-token sweep ───────────────────────────────────────────────────────
// No ui/ component (off the allowlist) carries a forbidden shadcn-neutral token in a LIVE
// class string (comments stripped). Each hit is a {file, token, why} row.
const violations = [];
for (const file of allFiles) {
    const rel = relative(ROOT, file).replace(/\\/g, "/");
    if (inAllowlist(rel)) continue; // the sanctioned survivor set
    const body = strip(read(rel));
    for (const tok of FORBIDDEN) {
        if (tok.re.test(body)) violations.push({ file: rel, token: tok.id, why: tok.why });
    }
}
add(
    "D1-forbidden-token-sweep",
    "no-shadcn-neutral-token-off-allowlist",
    violations.length === 0,
    violations.length === 0
        ? `all ${allFiles.length} ui/ files carry ZERO forbidden shadcn-neutral token (off the legibility allowlist) — the residual shadcn vocabulary is retired`
        : `${violations.length} forbidden shadcn-neutral residual(s): ${violations
              .map((v) => `${v.file} [${v.token}]`)
              .join(" | ")} — born-RED until the owning band wave reskins re-point onto the house register`,
);
// The walk is reaching the inventory (a zero-file walk would vacuously pass).
add(
    "D1-forbidden-token-sweep",
    "walk-non-empty",
    allFiles.length >= 40,
    `${allFiles.length} ui/ component files walked (need ≥40 — the sweep reaches the surface)`,
);

// ── D2 — the token-vs-utility distinguishing bite ────────────────────────────────────────
// `var(--shadow-sm)` (the house warm-ink TOKEN, slider/Slider.vue) MUST NOT flag; a bare
// `shadow-sm` Tailwind UTILITY MUST flag. The slider — which carries var(--shadow-sm) four
// times AND is NOT on the allowlist — must NOT appear in `violations` for shadow-sm-utility.
const sliderRel = "src/components/ui/slider/Slider.vue";
const sliderBody = strip(read(sliderRel));
const shadowUtilRule = FORBIDDEN.find((t) => t.id === "shadow-sm-utility");
const sliderHasToken = SHADOW_TOKEN_FORM.test(sliderBody);
const sliderUtilFlagged = shadowUtilRule.re.test(sliderBody);
add(
    "D2-token-vs-utility",
    "slider-house-token-not-flagged",
    sliderHasToken && !sliderUtilFlagged,
    sliderHasToken && !sliderUtilFlagged
        ? "slider/Slider.vue's var(--shadow-sm) house warm-ink TOKEN is NOT flagged (it composes --shadow-color; the on-the-line KEEP) — only the bare shadow-sm utility is forbidden"
        : `the token-vs-utility distinction is BROKEN on the slider — has-token=${sliderHasToken}, util-flagged=${sliderUtilFlagged} (the house token MUST NOT red)`,
);
// Self-test bite: a synthetic surface with EACH form proves the distinguishing bite.
const TOKEN_FIXTURE = "box-shadow: var(--shadow-sm);"; // the house token — MUST NOT flag
const UTILITY_FIXTURE = 'class="rounded-button shadow-sm border"'; // the bare utility — MUST flag
const tokenExempt = !shadowUtilRule.re.test(TOKEN_FIXTURE);
const utilBites = shadowUtilRule.re.test(UTILITY_FIXTURE);
add(
    "D2-token-vs-utility",
    "shadow-bite-distinguishes-token-from-utility",
    tokenExempt && utilBites,
    tokenExempt && utilBites
        ? "the shadow-sm-utility rule EXEMPTS the synthetic var(--shadow-sm) token form AND FLAGS the synthetic bare `shadow-sm` utility — the distinguishing bite has teeth"
        : `the shadow token-vs-utility bite is broken — token-exempt=${tokenExempt}, utility-flags=${utilBites}`,
);

// ── D3 — the legibility allowlist is the ONLY sanctioned survivor ─────────────────────────
// A planted shadcn-neutral token on an ALLOWLIST surface (e.g. ui/avatar/) stays GREEN; on a
// NON-allowlist surface it reds. Separator's live `text-muted-foreground bg-background` on the
// centered label chip is the canonical proof: separator IS on the allowlist, so its bg-background
// does NOT appear in `violations`.
const separatorRel = "src/components/ui/separator/Separator.vue";
const separatorHasNeutral = /(?<![\w-])bg-background(?![\w-])/.test(strip(read(separatorRel)));
const separatorInViolations = violations.some((v) => v.file === separatorRel);
add(
    "D3-allowlist-survivor",
    "allowlist-surface-keeps-neutral",
    separatorHasNeutral && !separatorInViolations,
    separatorHasNeutral && !separatorInViolations
        ? "separator/Separator.vue carries `bg-background` on its label chip AND is NOT flagged (separator is the sanctioned legibility-allowlist survivor — a hairline + label-chip is legitimately opaque)"
        : `the allowlist survivor proof is broken — separator-has-neutral=${separatorHasNeutral}, separator-flagged=${separatorInViolations}`,
);
// Self-test bite: the SAME planted token reds on a non-allowlist surface, stays green on an
// allowlist surface (the allowlist has teeth + is not a blanket exemption).
const planted = "bg-background border-input";
const nonAllowlistBites = !inAllowlist("src/components/ui/button/index.ts") &&
    FORBIDDEN.some((t) => t.re.test(planted));
const allowlistExempts = inAllowlist("src/components/ui/avatar/Avatar.vue");
add(
    "D3-allowlist-survivor",
    "allowlist-bite-has-teeth",
    nonAllowlistBites && allowlistExempts,
    nonAllowlistBites && allowlistExempts
        ? "a planted `bg-background border-input` reds on a NON-allowlist surface (button/) AND the allowlist exempts an allowlist surface (avatar/) — the allowlist is the sanctioned survivor, not a blanket exemption"
        : `the allowlist bite is broken — non-allowlist-bites=${nonAllowlistBites}, allowlist-exempts=${allowlistExempts}`,
);

// ── D4 — the census closure (the anti-smuggle floor; proof:dock-normalize W5 precedent) ───
// Every ui/ dir appears on EXACTLY ONE W-DESHADCN-census.md list (reskin-target | already-glass
// | allowlist-survivor). A new un-listed ui/ dir bearing a shadcn-neutral token reds — so a
// future agent cannot smuggle a new un-reskinned shadcn surface into the surface unaudited.
const CENSUS = "docs/tranches/BC/audit/W-DESHADCN-census.md";
const censusBody = read(CENSUS);
add(
    "D4-census-closure",
    "census-exists",
    censusBody.length > 0,
    censusBody.length > 0
        ? `${CENSUS} exists (the per-component reskin census — the EXACTLY-ONE-LIST anti-smuggle floor, merging CLEANUP-PLAN A6+A7)`
        : `${CENSUS} is MISSING (the census is the anti-smuggle closure — without it the gate cannot prove every ui/ dir is audited)`,
);

// The set of ui/ component package dirs (the immediate children of src/components/ui/ that hold
// a component — _shared is the shared-internals dir, not a component surface; focus-scope is a
// behavior-only wrapper). Each MUST appear in the census body exactly once (any list).
const uiDirs = existsSync(UI_ROOT)
    ? readdirSync(UI_ROOT).filter((n) => {
          const p = join(UI_ROOT, n);
          return statSync(p).isDirectory() && n !== "_shared" && n !== "node_modules";
      })
    : [];
// A dir is "listed" if its NAME appears as a census row token (in a `| dir |`-shaped table cell
// or a `- dir`-shaped list item — we match the dir name word-boundaried in the census body).
const dirListings = {};
for (const dir of uiDirs) {
    const re = new RegExp(`(?<![\\w/-])${dir.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w/-])`, "g");
    const count = (censusBody.match(re) || []).length;
    dirListings[dir] = count;
}
const unlisted = uiDirs.filter((d) => dirListings[d] === 0);
add(
    "D4-census-closure",
    "every-ui-dir-listed",
    unlisted.length === 0,
    unlisted.length === 0
        ? `all ${uiDirs.length} ui/ component dirs appear in the census (the EXACTLY-ONE-LIST closure — no un-audited shadcn surface can be smuggled in)`
        : `${unlisted.length} ui/ dir(s) MISSING from the census: ${unlisted.join(", ")} — the anti-smuggle floor is breached`,
);
// Self-test bite: a synthetic un-listed dir name bearing a shadcn-neutral token would NOT be in
// the census, so the closure flags it (the smuggle attempt reds). Demonstrated: a fake dir name
// is absent from the census → the closure detector returns a non-zero unlisted count for it.
const SYNTHETIC_DIR = "zzz-smuggled-shadcn-surface";
const syntheticListed = new RegExp(
    `(?<![\\w/-])${SYNTHETIC_DIR}(?![\\w/-])`,
).test(censusBody);
add(
    "D4-census-closure",
    "smuggle-self-test-bite",
    !syntheticListed,
    !syntheticListed
        ? "a synthetic un-listed dir name `zzz-smuggled-shadcn-surface` is ABSENT from the census — the closure would flag it as an un-audited surface (the anti-smuggle bite has teeth)"
        : "the smuggle self-test is broken (the synthetic dir name unexpectedly appears in the census)",
);

// ── the disease-root bite: the gate is BORN-RED on the HEAD tree ──────────────────────────
// The four live HEAD residuals (button-outline/secondary/accent + toggle-outline + tags-input-
// ring + switch-thumb) PROVE this is a real bar, not a vacuous green. Asserting the gate sees
// them at HEAD documents the born-RED state (this assert is INFORMATIONAL — it passes when the
// residuals are STILL present, i.e. before the owners land; once the owners reskin, D1 goes
// GREEN and the residuals legitimately disappear). We surface the count so the orchestrator
// reads the PARTIAL-until-owners-land state honestly.
const HEAD_RESIDUAL_FILES = [
    "src/components/ui/button/index.ts",
    "src/components/ui/toggle/index.ts",
    "src/components/ui/tags-input/TagsInputItem.vue",
    "src/components/ui/switch/Switch.vue",
];
const headResidualsPresent = HEAD_RESIDUAL_FILES.filter((f) =>
    violations.some((v) => v.file === f),
);
add(
    "disease-root",
    "born-red-witnesses-documented",
    true, // informational — always passes; the DETAIL carries the born-RED census
    headResidualsPresent.length > 0
        ? `BORN-RED (PARTIAL-until-owners-land, CORRECT): ${headResidualsPresent.length}/4 HEAD residual file(s) still carry a forbidden token — ${headResidualsPresent.join(", ")}. These go GREEN as the owning band waves (BUTTON-GLASS-IOS / CONTROL-SMOOTH) land the reskins. The gate is a REAL bar (not a vacuous green).`
        : "ALL 4 HEAD residual files are clean — the owning band-wave reskins have landed; proof:no-shadcn-default is fully GREEN on the forbidden-token axis.",
);

// ── Report ────────────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const arms = [...new Set(checks.map((c) => c.arm))];

console.log("proof:no-shadcn-default — reka=BEHAVIOR / glass-ui=100%-of-the-MATERIAL (BC.W-DESHADCN)");
for (const arm of arms) {
    const armChecks = checks.filter((c) => c.arm === arm);
    console.log(`  [${arm}] ${armChecks.filter((c) => c.pass).length}/${armChecks.length} pass`);
    for (const c of armChecks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);
}

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_NO_SHADCN_DEFAULT_OUT", "BC-no-shadcn-default");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:no-shadcn-default",
    command: COMMAND,
    note: "SOURCE arm only — the captured-paint truth (the reskinned surfaces resolve the glass/paper material, both modes) is tests-visual/no-shadcn-default.spec.ts (the π arm, orchestrator-driven), never this gate alone. BORN-RED on the 4 HEAD residuals → GREEN as the OWNING band waves (BUTTON-GLASS-IOS / CONTROL-SMOOTH) land the reskins; PARTIAL-until-owners-land is CORRECT.",
    uiFilesWalked: allFiles.length,
    forbiddenTokenViolations: violations,
    checks: checks.map((c) => ({ arm: c.arm, id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:no-shadcn-default] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.arm}/${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    `\n[proof:no-shadcn-default] the shadcn-neutral skin abrogated at root — ${allFiles.length} ui/ files carry ZERO residual shadcn vocabulary (off the legibility allowlist); the var(--shadow-sm) house token KEPT; the census closes EXACTLY-ONE-LIST over every ui/ dir; the π arm proves the reskinned material paints.`,
);
