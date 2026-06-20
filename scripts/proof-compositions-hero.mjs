#!/usr/bin/env node
// proof:compositions-hero — BC.W-COMPOSITIONS-HERO: /compositions/hero made DISTINCT
// from the homepage; /foundations/intro three-heroes → ONE; the platitudes + the
// "View the source" button pruned.
//
// At HEAD /compositions/hero was a near-verbatim clone of the front-door
// (/foundations/intro): the same sequential-typing intro headline + a §01/§02/§03
// three-claim grid (the user: "EXACT same content as the homepage"). And the front door
// stacked THREE display moments (the ℱ+cm-serif wordmark, a text-display-4 tagline, the
// suppressed chassis hero — the user: "THREE heros"). Plus the "View the source" BS + the
// platitude prose ("every component honest about its four states"). This wave (riding
// BC.W-HERO-AUDACIOUS's audacious-size discipline): the intro collapses to ONE audacious
// `text-display-mega` wordmark-hero; /compositions/hero is re-authored as a DISTINCT
// composition showcase at `text-display-hero`; the platitudes + "View source" are gone.
//
// FOUR falsifiable device-free SOURCE witnesses (each born-RED on HEAD's three-heroes /
// duplicate / View-source → GREEN at close), + a per-clause self-test bite + the binding
// π readback (tests-visual/compositions-hero.spec.ts — the orchestrator's live capture:
// the one-<h1> count + the content-diff + the audacious tier pixel-read on :5199):
//
//   CH1 — INTRO HAS EXACTLY ONE <h1>. A device-free parse of intro.vue asserts exactly
//         one <h1> element (the wordmark + tagline are the ONE hero + its subtitle, not
//         three display masses). Born-RED: HEAD had the wordmark cluster + a
//         text-display-4 <h1>.
//   CH2 — COMPOSITIONS/HERO ≠ HOMEPAGE. The structural content-hash of the
//         compositions/hero.vue body markup ≠ the intro.vue body markup (the typewriter +
//         3-claim clone is gone; the composition-showcase content is present), AND
//         compositions/hero.vue carries NEITHER the homepage typewriter pattern
//         (<TypewriterText>) NOR the §01/§02/§03 claims grid. Born-RED: HEAD's two bodies
//         were near-identical.
//   CH3 — NO "View the source", NO PLATITUDE. A grep over hero.vue/intro.vue asserts ZERO
//         "View the source"/"View source" button + the named platitude lines are gone.
//         Born-RED on hero.vue:175 / intro.vue platitude prose.
//   CH4 — BOTH HEROES REACH THE AUDACIOUS TIER. intro.vue <h1> reads `text-display-mega`;
//         compositions/hero.vue <h1> reads `text-display-hero` (or `-mega`). Born-RED:
//         HEAD capped both at `text-display-4`.
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
    const m = stripped.match(/<template>([\s\S]*?)<\/template>/i);
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
    const comp = stripComments(compositionsHeroVue);

    // ── CH1 — intro has exactly ONE <h1> ────────────────────────────────────────
    facts.ch1 = {};
    facts.ch1.introH1Count = countH1(introVue);
    facts.ch1.exactlyOne = facts.ch1.introH1Count === 1;
    // The wordmark folds into the ONE display <h1> as an inline ornament, NOT a second
    // display moment — no `text-display-N` on a node OUTSIDE the single <h1> (the cluster
    // `text-display-2/-3/-4` tagline retired). The eyebrow stays the admin-label register.
    facts.ch1.noStrayDisplayMass =
        !/text-display-[0-9]/.test(intro.replace(/<h1\b[\s\S]*?<\/h1>/gi, ""));

    if (!facts.ch1.exactlyOne)
        violations.push(
            `CH1: /foundations/intro must have EXACTLY ONE <h1> (found ${facts.ch1.introH1Count}) — the three display moments (wordmark cluster + display-4 tagline + suppressed chassis hero) collapse to ONE audacious hero`,
        );
    if (!facts.ch1.noStrayDisplayMass)
        violations.push(
            "CH1: a `text-display-N` type mass survives OUTSIDE the single intro <h1> — the wordmark/tagline must fold INTO the one hero (the eyebrow + body stay non-display)",
        );

    // ── CH2 — compositions/hero ≠ homepage ──────────────────────────────────────
    facts.ch2 = {};
    const introBodyHash = contentHash(templateBody(introVue));
    const compBodyHash = contentHash(templateBody(compositionsHeroVue));
    facts.ch2.introBodyHash = introBodyHash.slice(0, 16);
    facts.ch2.compBodyHash = compBodyHash.slice(0, 16);
    facts.ch2.distinct = introBodyHash !== compBodyHash;
    // The homepage-clone PATTERNS are GONE from compositions/hero: no <TypewriterText>
    // headline chain + no §01/§02/§03 claims grid.
    facts.ch2.noTypewriter = !/<TypewriterText\b/.test(comp);
    facts.ch2.noClaimsGrid =
        !/§\s*0[123]/.test(comp) && !/\bclaims\b/.test(comp) && !/claim\.eyebrow/.test(comp);
    // The composition-showcase content IS present — it links the real scenes (the
    // composition specimens the band actually carries: settings/auth-shell/math-paper/…).
    facts.ch2.hasShowcaseContent =
        /<SectionPreviewCard\b/.test(comp) &&
        /compositions\//.test(comp);

    if (!facts.ch2.distinct)
        violations.push(
            "CH2: content-hash(compositions/hero body) === content-hash(intro body) — /compositions/hero must carry materially different markup (the homepage clone is retired)",
        );
    if (!facts.ch2.noTypewriter)
        violations.push(
            "CH2: compositions/hero.vue still renders the homepage <TypewriterText> headline chain — the typewriter clone is RETIRED (clean break, no alias)",
        );
    if (!facts.ch2.noClaimsGrid)
        violations.push(
            "CH2: compositions/hero.vue still renders the §01/§02/§03 three-claim grid (the homepage clone) — RETIRED",
        );
    if (!facts.ch2.hasShowcaseContent)
        violations.push(
            "CH2: compositions/hero.vue must carry the DISTINCT composition-showcase content — a <SectionPreviewCard> grid of the real composition scenes",
        );

    // ── CH3 — no "View the source", no platitude ────────────────────────────────
    facts.ch3 = {};
    facts.ch3.noViewSource =
        !/View\s+(the\s+)?source/i.test(intro) && !/View\s+(the\s+)?source/i.test(comp);
    facts.ch3.platitudesPruned = PLATITUDE_RES.every(
        (re) => !re.test(intro) && !re.test(comp),
    );

    if (!facts.ch3.noViewSource)
        violations.push(
            "CH3: a \"View the source\"/\"View source\" button survives — the View-source BS is REMOVED (USER-DEFECTS §C)",
        );
    if (!facts.ch3.platitudesPruned)
        violations.push(
            "CH3: a named platitude line survives (\"every component honest about its four states\" / \"Every token reachable\" / \"every card carries a cartoon shadow\") — prune the platitudes (keep the identity)",
        );

    // ── CH4 — both heroes reach the audacious tier ──────────────────────────────
    facts.ch4 = {};
    facts.ch4.introMega = /<h1[^>]*\btext-display-mega\b/.test(intro);
    facts.ch4.compAudacious = /<h1[^>]*\btext-display-(hero|mega)\b/.test(comp);
    // Neither hero is left at the starved under-audacious tier.
    facts.ch4.introNotStarved = !/<h1[^>]*\btext-display-[1-4]\b/.test(intro);
    facts.ch4.compNotStarved = !/<h1[^>]*\btext-display-[1-4]\b/.test(comp);

    if (!facts.ch4.introMega)
        violations.push(
            "CH4: the intro <h1> must read `text-display-mega` (the D0 audacious root — HEAD capped at text-display-4)",
        );
    if (!facts.ch4.compAudacious)
        violations.push(
            "CH4: the compositions/hero <h1> must read `text-display-hero` (or `-mega`) — the audacious tier (HEAD capped at the text-display-4 typewriter)",
        );
    if (!(facts.ch4.introNotStarved && facts.ch4.compNotStarved))
        violations.push(
            "CH4: a hero <h1> still reads a starved `text-display-1..4` tier — both heroes reach the audacious mega/hero rung",
        );

    return { facts, violations };
}

// ── The per-clause self-test bites: a synthetic GOOD corpus, each mutated to a
//    planted violation, asserted to RED its clause through the PURE detector. ──────
function selfTest() {
    const goodIntro = `
        <template>
        <StoryPage :hero-title="false">
          <section class="px-2 py-12">
            <p class="text-admin-label mb-8 text-muted-foreground">
              <span class="fourier-f italic">ℱ</span> glass-ui · storybook
            </p>
            <h1 class="text-display-mega mb-8 text-foreground">
              Glass, paper, and the golden ratio.
            </h1>
            <p class="text-prose max-w-2xl text-foreground/80">
              A design system built around warm cream and cartoon offset shadows.
            </p>
          </section>
          <section class="mt-16">
            <SectionPreviewCard v-for="cat in categories" :to="x" :icon="cat.icon" :section="cat.section" />
          </section>
        </StoryPage>
        </template>
    `;
    const goodComp = `
        <template>
        <StoryPage :hero-title="false">
          <section class="px-2 py-12">
            <p class="text-admin-label mb-8 text-muted-foreground">
              <span class="fourier-f italic">ℱ</span> compositions · real scenes
            </p>
            <h1 class="text-display-hero mb-8 text-foreground">
              Real scenes, assembled from the parts.
            </h1>
            <p class="text-prose max-w-2xl text-foreground/80">
              Dashboards, auth shells, the math-paper idiom.
            </p>
          </section>
          <section class="mt-16">
            <SectionPreviewCard v-for="scene in scenes" :to="\`/compositions/\${scene.id}\`" :icon="scene.icon" :section="hue" />
          </section>
        </StoryPage>
        </template>
    `;

    const base = { introVue: goodIntro, compositionsHeroVue: goodComp };
    const baseRun = detectCompositionsHero(base);
    const bites = [];

    // Bite CH1 — a second <h1> in the intro reds CH1.
    bites.push({
        name: "CH1: two <h1> in intro",
        red: detectCompositionsHero({
            ...base,
            introVue: goodIntro.replace(
                "</section>",
                '<h1 class="text-display-4">A second hero</h1></section>',
            ),
        }).violations.some((v) => v.startsWith("CH1")),
    });
    // Bite CH1b — a stray text-display tagline OUTSIDE the <h1> reds CH1.
    bites.push({
        name: "CH1: stray display mass outside the <h1>",
        red: detectCompositionsHero({
            ...base,
            introVue: goodIntro.replace(
                '<span class="fourier-f italic">ℱ</span> glass-ui · storybook',
                '<span class="text-display-2">glass-ui</span>',
            ),
        }).violations.some((v) => v.startsWith("CH1")),
    });
    // Bite CH2 — compositions/hero a verbatim clone of intro reds CH2.
    bites.push({
        name: "CH2: compositions/hero === intro clone",
        red: detectCompositionsHero({
            ...base,
            compositionsHeroVue: goodIntro,
        }).violations.some((v) => v.startsWith("CH2")),
    });
    // Bite CH2b — a re-added <TypewriterText> headline reds CH2.
    bites.push({
        name: "CH2: re-added typewriter headline",
        red: detectCompositionsHero({
            ...base,
            compositionsHeroVue: goodComp.replace(
                "Real scenes, assembled from the parts.",
                '<TypewriterText :text="seg1" />',
            ),
        }).violations.some((v) => v.startsWith("CH2")),
    });
    // Bite CH2c — a re-added §01/§02/§03 claims grid reds CH2.
    bites.push({
        name: "CH2: re-added claims grid",
        red: detectCompositionsHero({
            ...base,
            compositionsHeroVue:
                goodComp + '\n<span class="section-label">§ 01</span>',
        }).violations.some((v) => v.startsWith("CH2")),
    });
    // Bite CH3 — a re-added "View the source" button reds CH3.
    bites.push({
        name: "CH3: re-added View the source button",
        red: detectCompositionsHero({
            ...base,
            compositionsHeroVue:
                goodComp + '\n<Button variant="ghost">View the source</Button>',
        }).violations.some((v) => v.startsWith("CH3")),
    });
    // Bite CH3b — a re-added platitude line reds CH3.
    bites.push({
        name: "CH3: re-added platitude",
        red: detectCompositionsHero({
            ...base,
            introVue: goodIntro.replace(
                "A design system built around warm cream and cartoon offset shadows.",
                "every component honest about its four states.",
            ),
        }).violations.some((v) => v.startsWith("CH3")),
    });
    // Bite CH4 — the intro <h1> at a starved tier reds CH4.
    bites.push({
        name: "CH4: intro <h1> starved (display-4)",
        red: detectCompositionsHero({
            ...base,
            introVue: goodIntro.replace("text-display-mega", "text-display-4"),
        }).violations.some((v) => v.startsWith("CH4")),
    });
    // Bite CH4b — the compositions/hero <h1> at a starved tier reds CH4.
    bites.push({
        name: "CH4: compositions/hero <h1> starved (display-4)",
        red: detectCompositionsHero({
            ...base,
            compositionsHeroVue: goodComp.replace("text-display-hero", "text-display-4"),
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
        note: "SOURCE arm only — the captured-paint truth (the live one-<h1> count, the body-text content-diff, the audacious-tier font-size pixel-read on :5199, both modes × desktop+mobile) is tests-visual/compositions-hero.spec.ts (the π arm, orchestrator-driven), never this gate alone. Rides BC.W-HERO-AUDACIOUS's audacious-size discipline.",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:compositions-hero — /compositions/hero distinct; /foundations/intro three-heroes → one (BC.W-COMPOSITIONS-HERO)",
    );
    console.log(
        `  CH1 intro has exactly ONE <h1>     : ${yn(
            facts.ch1.exactlyOne && facts.ch1.noStrayDisplayMass,
        )}  (${facts.ch1.introH1Count} <h1>)`,
    );
    console.log(
        `  CH2 compositions/hero ≠ homepage   : ${yn(
            facts.ch2.distinct &&
                facts.ch2.noTypewriter &&
                facts.ch2.noClaimsGrid &&
                facts.ch2.hasShowcaseContent,
        )}  (intro ${facts.ch2.introBodyHash} / comp ${facts.ch2.compBodyHash})`,
    );
    console.log(
        `  CH3 no View-source, no platitude   : ${yn(
            facts.ch3.noViewSource && facts.ch3.platitudesPruned,
        )}`,
    );
    console.log(
        `  CH4 both heroes reach audacious    : ${yn(
            facts.ch4.introMega &&
                facts.ch4.compAudacious &&
                facts.ch4.introNotStarved &&
                facts.ch4.compNotStarved,
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
