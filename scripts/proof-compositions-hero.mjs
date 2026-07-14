#!/usr/bin/env node
// proof:compositions-hero — the front-door hero discipline + the RETIRED /compositions/hero
// clone.
//
// ORIGIN (BC.W-COMPOSITIONS-HERO): /compositions/hero was a near-verbatim clone of the
// front-door (/foundations/intro) — the same sequential-typing headline + a §01/§02/§03
// three-claim grid (the user: "EXACT same content as the homepage") — and the front door
// stacked THREE display moments plus a "View the source" button + platitude prose. That
// wave collapsed the intro to ONE audacious wordmark-hero, pruned the platitudes + the
// View-source, and re-authored /compositions/hero as a distinct composition showcase.
//
// BI.W-HERO-DEMOTE (UF-K2): the standalone /compositions/hero page is now RETIRED ENTIRELY
// — it duplicated the /compositions D1 section landing (the chassis renders the real-scene
// bento), so it folds into that landing. The "distinct from the homepage" concern is
// discharged by REMOVAL. This gate therefore now polices the surviving front door + the
// retirement (FOUR device-free SOURCE witnesses + per-clause self-test bites + the π
// readback — the orchestrator's live one-<h1> count + the audacious-tier pixel-read):
//
//   CH1 — INTRO HAS EXACTLY ONE <h1>. A device-free parse of intro.vue asserts zero
//         hand-authored <h1> (the wordmark + tagline route through the ONE chassis title),
//         no `:hero-title="false"` opt-out, and no stray `text-display-N` mass.
//   CH2 — THE STANDALONE /compositions/hero CLONE IS RETIRED. hero.vue is DEFINITION-ABSENT
//         (BI.W-HERO-DEMOTE) — the homepage-duplicate is removed, not re-authored. A
//         resurrected hero.vue REDs (proof:demo's HD arm owns the manifest-census half).
//   CH3 — NO "View the source", NO PLATITUDE on the front door. A grep over intro.vue
//         asserts zero "View the source"/"View source" button + the named platitude lines.
//   CH4 — THE FRONT DOOR REACHES THE AUDACIOUS TIER THROUGH THE CHASSIS. intro.vue routes
//         its hero <h1> through the chassis (no opt-out, no bare `text-display-*` <h1>) so
//         it inherits the audacious heroScale rung (BG.W-HERO-FIT).
//
// House style mirrors proof-hero-audacious.mjs: ESM .mjs, comment-strip first (the
// false-witness discipline), a pure exported detector, a byte-stable JSON artefact via
// gate-output, a human summary, process.exit(1) on any violation, + the per-clause
// self-test bites run from `run()`.

import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

/** Strip <!-- --> + /* *​/ + // comments so a Vue/TS witness never matches prose. */
function stripComments(src) {
    return src
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

/** Extract the <template> body markup (the rendered surface) — comment-stripped + the
 *  <script>/<style> blocks dropped, whitespace-collapsed — so the structural content-hash
 *  is keyed on the painted markup, not the script prose. */
function templateBody(src) {
    const stripped = stripComments(src);
    // Match the OUTER <template> GREEDILY to the LAST </template> so a nested
    // <template #title-ornament> (BG.W-HERO-FIT) does not truncate the body at the
    // first </template> — the structural content-hash must key on the WHOLE rendered
    // surface, not just the ornament prefix.
    const m = stripped.match(/<template>([\s\S]*)<\/template>/i);
    const body = m ? m[1] : stripped;
    return body.replace(/\s+/g, " ").trim();
}

function contentHash(s) {
    return createHash("sha256").update(s).digest("hex");
}

/** Count <h1 …> opening tags in the comment-stripped template body. */
function countH1(src) {
    const body = templateBody(src);
    return (body.match(/<h1\b/gi) || []).length;
}

// The named HEAD platitude lines — the over-claim prose pruned at this wave (USER-DEFECTS
// §C). NOT the substantive identity line (warm-cream / golden-ratio), which is KEPT.
const PLATITUDE_RES = [
    /every component honest about its four states/i,
    /Every token\s+reachable as a utility/i,
    /every card carries a cartoon shadow by default/i,
];

/**
 * Pure detector — given the source strings, return { facts, violations }.
 */
export function detectCompositionsHero(sources) {
    const { introVue, compositionsHeroVue } = sources;
    const facts = {};
    const violations = [];

    const intro = stripComments(introVue);

    // ── CH1 — intro routes its title through the ONE chassis path (BG.W-HERO-FIT) ─
    // The hand-authored bare <h1> + the `:hero-title="false"` opt-out are RETIRED: the
    // chassis renders the ONE display <h1> off the manifest `displayTitle`, fit-capped.
    facts.ch1 = {};
    facts.ch1.introH1Count = countH1(introVue);
    facts.ch1.noHandAuthoredHero = facts.ch1.introH1Count === 0;
    // The page does NOT opt out of the chassis title (the retired fork lane).
    facts.ch1.routesChassis = !/hero-title="false"/.test(intro);
    // No `text-display-N` type mass survives in the page — the wordmark/tagline collapse
    // onto the chassis displayTitle; the eyebrow stays the admin-label register.
    facts.ch1.noStrayDisplayMass = !/text-display-[0-9]/.test(intro);

    if (!facts.ch1.noHandAuthoredHero)
        violations.push(
            `CH1: /foundations/intro must route its title through the ONE chassis path (found ${facts.ch1.introH1Count} hand-authored <h1>; BG.W-HERO-FIT — the chassis renders the ONE display <h1> off the manifest displayTitle)`,
        );
    if (!facts.ch1.routesChassis)
        violations.push(
            'CH1: /foundations/intro must NOT carry `:hero-title="false"` — it routes through the chassis title path (BG.W-HERO-FIT clean break)',
        );
    if (!facts.ch1.noStrayDisplayMass)
        violations.push(
            "CH1: a `text-display-N` type mass survives in /foundations/intro — the wordmark/tagline fold onto the chassis displayTitle (the eyebrow + body stay non-display)",
        );

    // ── CH2 — the standalone /compositions/hero clone is RETIRED (BI.W-HERO-DEMOTE) ─
    // UF-K2 resolved the homepage-duplicate this gate once policed for distinctness by
    // DEMOTION: /compositions/hero folds into the /compositions D1 section landing (the
    // chassis renders the real-scene bento). The clean-break outcome is the ABSENCE of the
    // standalone SFC — a resurrected hero.vue (a re-cloned homepage) REDs. proof:demo's HD
    // arm owns the manifest-census half; this witnesses the SFC-residue half.
    facts.ch2 = {};
    facts.ch2.pageRetired = compositionsHeroVue.trim().length === 0;

    if (!facts.ch2.pageRetired)
        violations.push(
            "CH2: the standalone /compositions/hero page must stay RETIRED (hero.vue DEFINITION-ABSENT) — it is the /compositions section landing now (BI.W-HERO-DEMOTE, UF-K2); a resurrected clone reds",
        );

    // ── CH3 — no "View the source", no platitude on the front door ──────────────
    facts.ch3 = {};
    facts.ch3.noViewSource = !/View\s+(the\s+)?source/i.test(intro);
    facts.ch3.platitudesPruned = PLATITUDE_RES.every((re) => !re.test(intro));

    if (!facts.ch3.noViewSource)
        violations.push(
            "CH3: a \"View the source\"/\"View source\" button survives on the front door — the View-source BS is REMOVED (USER-DEFECTS §C)",
        );
    if (!facts.ch3.platitudesPruned)
        violations.push(
            "CH3: a named platitude line survives on the front door (\"every component honest about its four states\" / \"Every token reachable\" / \"every card carries a cartoon shadow\") — prune the platitudes (keep the identity)",
        );

    // ── CH4 — the front door reaches the audacious tier THROUGH the chassis ─────
    // (BG.W-HERO-FIT) — the audacious rung is the chassis `data-hero-scale` rung (intro
    // D0→mega), rendered through the `.story-hero-title[data-hero-scale]` height-aware
    // fit-cap. The bypassable hand-authored bare `<h1 class="text-display-*">` lane is
    // RETIRED, so the tier is reached by routing through the chassis, never a forked class.
    facts.ch4 = {};
    facts.ch4.introRoutesChassis = !/hero-title="false"/.test(intro);
    facts.ch4.noBareDisplayHero = !/<h1[^>]*\btext-display-/.test(intro);

    if (!facts.ch4.introRoutesChassis)
        violations.push(
            'CH4: the front door opts out of the chassis via `:hero-title="false"` — it routes through the chassis title path so it inherits the audacious heroScale rung (BG.W-HERO-FIT)',
        );
    if (!facts.ch4.noBareDisplayHero)
        violations.push(
            "CH4: a bare `text-display-*` hero <h1> survives on the front door — the audacious tier is the chassis data-hero-scale rung (the bypassable hand-authored lane is RETIRED)",
        );

    return { facts, violations };
}

// ── The per-clause self-test bites: a synthetic GOOD corpus, each mutated to a
//    planted violation, asserted to RED its clause through the PURE detector. ──────
function selfTest() {
    // BG.W-HERO-FIT — the GOOD front door is the chassis-routed shape: NO `:hero-title="false"`,
    // NO hand-authored bare <h1> (the chassis renders the ONE display title off the manifest
    // displayTitle), no stray `text-display-N` mass, no View-source, no platitude — it provides
    // ONLY the inline ℱ ornament (#title-ornament) + the bento grid. The standalone compositions
    // hero is RETIRED (BI.W-HERO-DEMOTE), so the GOOD compositionsHeroVue is the EMPTY string
    // (the SFC is DEFINITION-ABSENT).
    const goodIntro = `
        <template>
        <StoryPage>
          <template #title-ornament><span class="fourier-f italic">ℱ&nbsp;</span></template>
          <section class="mt-16">
            <p class="text-admin-label mb-4 text-muted-foreground">Categories</p>
            <SectionPreviewCard v-for="cat in categories" :to="\`/\${cat.slug}\`" :icon="cat.icon" :section="cat.section" />
          </section>
        </StoryPage>
        </template>
    `;

    const base = { introVue: goodIntro, compositionsHeroVue: "" };
    const baseRun = detectCompositionsHero(base);
    const bites = [];

    // Bite CH1 — a hand-authored <h1> in the intro (the retired fork) reds CH1.
    bites.push({
        name: "CH1: hand-authored <h1> in intro",
        red: detectCompositionsHero({
            ...base,
            introVue: goodIntro.replace(
                "</section>",
                '<h1 class="story-hero-title">A forked hero</h1></section>',
            ),
        }).violations.some((v) => v.startsWith("CH1")),
    });
    // Bite CH1b — a re-added `:hero-title="false"` opt-out reds CH1.
    bites.push({
        name: "CH1: re-added :hero-title=false opt-out",
        red: detectCompositionsHero({
            ...base,
            introVue: goodIntro.replace(
                "<StoryPage>",
                '<StoryPage :hero-title="false">',
            ),
        }).violations.some((v) => v.startsWith("CH1")),
    });
    // Bite CH1c — a stray text-display type mass in the page reds CH1.
    bites.push({
        name: "CH1: stray display mass in the page",
        red: detectCompositionsHero({
            ...base,
            introVue: goodIntro + '\n<span class="text-display-2">glass-ui</span>',
        }).violations.some((v) => v.startsWith("CH1")),
    });
    // Bite CH2 — a RESURRECTED compositions/hero.vue (the clone creeps back) reds CH2.
    bites.push({
        name: "CH2: resurrected compositions/hero.vue",
        red: detectCompositionsHero({
            ...base,
            compositionsHeroVue: goodIntro,
        }).violations.some((v) => v.startsWith("CH2")),
    });
    // Bite CH3 — a re-added "View the source" button on the front door reds CH3.
    bites.push({
        name: "CH3: re-added View the source button",
        red: detectCompositionsHero({
            ...base,
            introVue:
                goodIntro + '\n<Button variant="ghost">View the source</Button>',
        }).violations.some((v) => v.startsWith("CH3")),
    });
    // Bite CH3b — a re-added platitude line reds CH3.
    bites.push({
        name: "CH3: re-added platitude",
        red: detectCompositionsHero({
            ...base,
            introVue:
                goodIntro + "\nevery component honest about its four states.",
        }).violations.some((v) => v.startsWith("CH3")),
    });
    // Bite CH4 — an intro :hero-title="false" opt-out (off the chassis tier) reds CH4.
    bites.push({
        name: "CH4: intro opts out of the chassis tier",
        red: detectCompositionsHero({
            ...base,
            introVue: goodIntro.replace(
                "<StoryPage>",
                '<StoryPage :hero-title="false">',
            ),
        }).violations.some((v) => v.startsWith("CH4")),
    });
    // Bite CH4b — a bare text-display hero <h1> on the front door reds CH4.
    bites.push({
        name: "CH4: front-door bare text-display <h1>",
        red: detectCompositionsHero({
            ...base,
            introVue: goodIntro.replace(
                "</section>",
                '<h1 class="text-display-hero">glass-ui</h1></section>',
            ),
        }).violations.some((v) => v.startsWith("CH4")),
    });

    return { baseGreen: baseRun.violations.length === 0, baseRun, bites };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_COMPOSITIONS_HERO_ARTIFACT",
        "BC-compositions-hero",
    );
    const sources = {
        introVue: safeRead(resolve(ROOT, "demo/stories/foundations/intro.vue")),
        compositionsHeroVue: safeRead(
            resolve(ROOT, "demo/stories/compositions/hero.vue"),
        ),
    };

    const { facts, violations } = detectCompositionsHero(sources);

    // The per-clause self-test bites — each planted violation MUST red its clause.
    const { baseGreen, baseRun, bites } = selfTest();
    const biteFailures = [];
    if (!baseGreen) {
        biteFailures.push("the synthetic GOOD corpus did not pass the detector");
        if (process.env.COMPOSITIONS_HERO_DEBUG)
            console.error("BASE CORPUS VIOLATIONS:", baseRun.violations);
    }
    for (const b of bites) if (!b.red) biteFailures.push(b.name);
    facts.selfTest = {
        baseGreen,
        bites: bites.map((b) => ({ name: b.name, red: b.red })),
        allRed: biteFailures.length === 0,
    };
    if (biteFailures.length > 0)
        violations.push(
            `SELF-TEST: bite(s) did not RED their clause: ${biteFailures.join("; ")}`,
        );

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:compositions-hero",
        note: "SOURCE arm only. Origin BC.W-COMPOSITIONS-HERO (/compositions/hero made distinct from the homepage). BI.W-HERO-DEMOTE (UF-K2) RETIRED the standalone /compositions/hero page entirely — it duplicated the /compositions D1 section landing — so the 'distinct from homepage' concern is discharged by REMOVAL: CH2 now witnesses the SFC is DEFINITION-ABSENT (proof:demo's HD arm owns the manifest-census half), and CH1/CH3/CH4 police the surviving front door (foundations/intro). The captured-paint truth (the live one-<h1> count + the audacious-tier font-size pixel-read, both modes × desktop+mobile) is the π arm (orchestrator-driven), never this gate alone.",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:compositions-hero — the front-door hero discipline + the RETIRED /compositions/hero clone (BI.W-HERO-DEMOTE)",
    );
    console.log(
        `  CH1 intro routes title via chassis : ${yn(
            facts.ch1.noHandAuthoredHero &&
                facts.ch1.routesChassis &&
                facts.ch1.noStrayDisplayMass,
        )}  (${facts.ch1.introH1Count} hand-authored <h1>)`,
    );
    console.log(
        `  CH2 /compositions/hero retired     : ${yn(facts.ch2.pageRetired)}`,
    );
    console.log(
        `  CH3 no View-source, no platitude   : ${yn(
            facts.ch3.noViewSource && facts.ch3.platitudesPruned,
        )}`,
    );
    console.log(
        `  CH4 front door routes via chassis  : ${yn(
            facts.ch4.introRoutesChassis && facts.ch4.noBareDisplayHero,
        )}`,
    );
    console.log(
        `  self-test bites all RED            : ${yn(facts.selfTest.allRed)}  (${
            facts.selfTest.bites.length
        } bites)`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
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
