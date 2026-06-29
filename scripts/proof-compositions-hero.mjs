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
    const comp = stripComments(compositionsHeroVue);

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

    // ── CH4 — both heroes reach the audacious tier THROUGH the chassis ──────────
    // (BG.W-HERO-FIT) — the audacious rung is now the chassis `data-hero-scale` rung
    // (intro D0→mega, compositions/hero explicit `mega`), rendered through the
    // `.story-hero-title[data-hero-scale]` height-aware fit-cap. The bypassable
    // hand-authored bare `<h1 class="text-display-*">` lane is RETIRED, so the tier is
    // reached by routing through the chassis, never a forked utility class.
    facts.ch4 = {};
    facts.ch4.introRoutesChassis = !/hero-title="false"/.test(intro);
    facts.ch4.compRoutesChassis = !/hero-title="false"/.test(comp);
    // Neither page hand-authors a bare `text-display-*` hero <h1> (the chassis owns it).
    facts.ch4.noBareDisplayHero =
        !/<h1[^>]*\btext-display-/.test(intro) && !/<h1[^>]*\btext-display-/.test(comp);

    if (!(facts.ch4.introRoutesChassis && facts.ch4.compRoutesChassis))
        violations.push(
            'CH4: a hero opts out of the chassis via `:hero-title="false"` — both heroes route through the chassis title path so they inherit the audacious heroScale rung (BG.W-HERO-FIT)',
        );
    if (!facts.ch4.noBareDisplayHero)
        violations.push(
            "CH4: a bare `text-display-*` hero <h1> survives in a page — the audacious tier is the chassis data-hero-scale rung (the bypassable hand-authored lane is RETIRED)",
        );

    return { facts, violations };
}

// ── The per-clause self-test bites: a synthetic GOOD corpus, each mutated to a
//    planted violation, asserted to RED its clause through the PURE detector. ──────
function selfTest() {
    // BG.W-HERO-FIT — the GOOD corpus is the chassis-routed shape: NO `:hero-title="false"`,
    // NO hand-authored bare <h1> (the chassis renders the ONE display title off the manifest
    // displayTitle), the page provides ONLY the inline ℱ ornament (#title-ornament) + the
    // bento grid. The two bodies differ (categories vs scenes) so the content-hash is distinct.
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
    const goodComp = `
        <template>
        <StoryPage>
          <template #title-ornament><span class="fourier-f italic">ℱ&nbsp;</span></template>
          <section class="mt-16">
            <p class="text-admin-label mb-4 text-muted-foreground">The scenes</p>
            <SectionPreviewCard v-for="scene in scenes" :to="\`/compositions/\${scene.id}\`" :icon="scene.icon" :section="hue" />
          </section>
        </StoryPage>
        </template>
    `;

    const base = { introVue: goodIntro, compositionsHeroVue: goodComp };
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
            compositionsHeroVue: goodComp + '\n<TypewriterText :text="seg1" />',
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
    // Bite CH4b — a bare text-display hero <h1> in compositions/hero reds CH4.
    bites.push({
        name: "CH4: compositions/hero bare text-display <h1>",
        red: detectCompositionsHero({
            ...base,
            compositionsHeroVue: goodComp.replace(
                "</section>",
                '<h1 class="text-display-hero">Real scenes</h1></section>',
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
        note: "SOURCE arm only — the captured-paint truth (the live one-<h1> count, the body-text content-diff, the audacious-tier font-size pixel-read on :5199, both modes × desktop+mobile) is tests-visual/compositions-hero.spec.ts (the π arm, orchestrator-driven), never this gate alone. Rides BC.W-HERO-AUDACIOUS's audacious-size discipline.",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:compositions-hero — /compositions/hero distinct; /foundations/intro three-heroes → one (BC.W-COMPOSITIONS-HERO)",
    );
    console.log(
        `  CH1 intro routes title via chassis : ${yn(
            facts.ch1.noHandAuthoredHero &&
                facts.ch1.routesChassis &&
                facts.ch1.noStrayDisplayMass,
        )}  (${facts.ch1.introH1Count} hand-authored <h1>)`,
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
        `  CH4 both heroes route via chassis  : ${yn(
            facts.ch4.introRoutesChassis &&
                facts.ch4.compRoutesChassis &&
                facts.ch4.noBareDisplayHero,
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
