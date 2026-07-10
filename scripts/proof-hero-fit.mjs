#!/usr/bin/env node
// proof:hero-fit — BG.W-HERO-FIT (D10): bound the hero headline to its viewport on
// ONE chassis-owned title path (the title-source assert).
//
// At HEAD `compositions/hero.vue` + `foundations/intro.vue` hand-authored a bare
// `<h1 class="text-display-{hero,mega} max-w-5xl">` via `:hero-title="false"`, bypassing
// the chassis fit-cap entirely — a SECOND, unprotected hero-title lane where every
// viewport-dominating headline lived (244.8px / 157% svh@1440, live-confirmed). This
// wave retires that lane: the chassis (`StoryHero` → `.story-hero-title[data-hero-scale]`)
// renders EVERY hero `<h1>` through ONE height-aware fit-cap, off the MANDATORY short
// `displayTitle` (the chassis renders `displayTitle ?? title`); the page customizes the
// title CONTENT (the inline ℱ ornament) via the `#title-ornament` slot, never by forking
// the `<h1>` + its sizing. auth-shell KEEPS its bespoke display-1 title (never
// viewport-dominating) — the carve fence.
//
// SIX falsifiable device-free SOURCE witnesses (each born-RED on the pre-fix tree → GREEN
// at close), + a per-clause self-test bite. The captured-paint truth (the rendered <h1>
// block ≤0.62×svh at 375/768/1440/1920, `font-size ≥ computed(display-4)` at ≥768, no
// hyphenation@375, a preview card above the fold) is the W-REFLECT3 π capture, never this
// gate alone:
//
//   HF1 — ONE CHASSIS TITLE PATH. intro.vue + compositions/hero.vue carry NEITHER
//         `:hero-title="false"` NOR a bare poster-rung `<h1 class="text-display-{4,5,mega,
//         hero,audacious}">` — they route the hero title through the chassis. Born-RED:
//         HEAD had both the opt-out + the bare <h1>.
//   HF2 — THE CHASSIS RENDERS displayTitle ?? title + THE #title-ornament SLOT. StoryHero
//         renders `displayTitle ?? title` and exposes a `#title-ornament` slot in the <h1>;
//         StoryPage threads `:display-title` + forwards the slot. Born-RED: HEAD had neither.
//   HF3 — MANDATORY SHORT displayTitle. The manifest foundations/intro + compositions/hero
//         rows carry a `displayTitle:` key (the short wordmark — the load-bearing
//         no-hyphenation@375 fix). Born-RED: HEAD had no displayTitle field.
//   HF4 — max-w-5xl DROPPED. Neither page carries `max-w-5xl` (the constraint that
//         MANUFACTURES the multi-line blowout — RC4). Born-RED: HEAD pinned it on the <h1>.
//   HF5 — HEIGHT-AWARE FIT-CAP. `.story-hero-title[data-hero-scale]` bounds the rung to a
//         min() carrying a `100svh` short-viewport-height term + the single-source
//         `--story-hero-cpl` / `--story-hero-est-lines` factors. Born-RED: HEAD's budget
//         was width-only (no svh term — RC3).
//   HF6 — auth-shell KEEP-FENCE. compositions/auth-shell.vue STILL carries its bespoke
//         `<h1 class="text-display …">` (display-1, the calm panel headline — never
//         viewport-dominating; the spec carve). A future over-cut that retires it reds.
//
// House style mirrors proof-hero-audacious.mjs / proof-compositions-hero.mjs: ESM .mjs,
// comment-strip first (the false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on any
// violation, + the per-clause self-test bites run from `run()`.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

/** Strip <!-- --> + /* *​/ + // comments so a Vue/TS/CSS witness never matches prose. */
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

// A bare poster-rung hero <h1> — the bypassable hand-authored lane (RC2). `text-display`
// (display-1, no suffix) is NOT a poster rung (auth-shell's calm panel title is allowed).
const POSTER_H1 = /<h1[^>]*\btext-display-(?:4|5|mega|hero|audacious)\b/;
// A bespoke display-1 panel headline (auth-shell's keep) — `text-display` NOT followed by
// a `-N` suffix or a word char.
const DISPLAY1_H1 = /<h1[^>]*\btext-display(?![-\w])/;

/** Does the manifest `s(cat, id, …)` row carry a `displayTitle:` key (the mandate)? */
function rowHasDisplayTitle(manifest, cat, id) {
    const re = new RegExp(`s\\(\\s*"${cat}",\\s*"${id}"`);
    const m = re.exec(manifest);
    if (!m) return { found: false, hasDT: false };
    // Window from the call to the NEXT `s("` sibling row (or 1200 chars), so the
    // displayTitle search never bleeds into the following row's options.
    const tail = manifest.slice(m.index + m[0].length, m.index + 1200);
    const nextRow = tail.search(/\bs\(\s*"/);
    const win = nextRow >= 0 ? tail.slice(0, nextRow) : tail;
    return { found: true, hasDT: /\bdisplayTitle:\s*["'`]/.test(win) };
}

/** Extract the `.story-hero-title[data-hero-scale] { … }` block body. */
function fitCapBlock(css) {
    const m = css.match(/\.story-hero-title\[data-hero-scale\]\s*\{([\s\S]*?)\}/);
    return m ? m[1] : "";
}

/**
 * Pure detector — given the source strings, return { facts, violations }.
 */
export function detectHeroFit(sources) {
    const {
        introVue,
        heroVue,
        storyHeroVue,
        storyPageVue,
        storyHeroCss,
        manifestTs,
        authShellVue,
    } = sources;
    const facts = {};
    const violations = [];

    const intro = stripComments(introVue);
    const hero = stripComments(heroVue);
    const storyHero = stripComments(storyHeroVue);
    const storyPage = stripComments(storyPageVue);
    const css = stripComments(storyHeroCss);
    const manifest = stripComments(manifestTs);
    const auth = stripComments(authShellVue);

    // ── HF1 — ONE chassis title path ────────────────────────────────────────────
    facts.hf1 = {};
    facts.hf1.introRoutesChassis =
        !/hero-title="false"/.test(intro) && !POSTER_H1.test(intro);
    facts.hf1.heroRoutesChassis =
        !/hero-title="false"/.test(hero) && !POSTER_H1.test(hero);

    if (!facts.hf1.introRoutesChassis)
        violations.push(
            "HF1: /foundations/intro must route its title through the ONE chassis path — no `:hero-title=\"false\"` opt-out, no bare `<h1 class=\"text-display-{4,5,mega,hero,audacious}\">`",
        );
    if (!facts.hf1.heroRoutesChassis)
        violations.push(
            "HF1: /compositions/hero must route its title through the ONE chassis path — no `:hero-title=\"false\"` opt-out, no bare poster-rung `<h1 class=\"text-display-*\">`",
        );

    // ── HF2 — the chassis renders displayTitle ?? title + the #title-ornament slot ─
    facts.hf2 = {};
    facts.hf2.chassisRendersDisplayTitle =
        /displayTitle\s*\?\?\s*(?:props\.)?title/.test(storyHero) &&
        /\{\{\s*heroDisplayTitle\s*\}\}/.test(storyHero);
    facts.hf2.chassisHasOrnamentSlot = /<slot\s+name="title-ornament"/.test(storyHero);
    facts.hf2.pageThreadsDisplayTitle =
        /:display-title=/.test(storyPage) &&
        /#title-ornament/.test(storyPage);

    if (!facts.hf2.chassisRendersDisplayTitle)
        violations.push(
            "HF2: StoryHero must render the chassis <h1> off `displayTitle ?? title` (the `heroDisplayTitle` computed) — the MANDATORY short wordmark when set, else the semantic title",
        );
    if (!facts.hf2.chassisHasOrnamentSlot)
        violations.push(
            "HF2: StoryHero must expose a `#title-ornament` slot in the chassis <h1> (the page customizes the title CONTENT via slot, never by forking the <h1>)",
        );
    if (!facts.hf2.pageThreadsDisplayTitle)
        violations.push(
            "HF2: StoryPage must thread `:display-title` AND forward the `#title-ornament` slot into StoryHero",
        );

    // ── HF3 — MANDATORY short displayTitle in the manifest ──────────────────────
    facts.hf3 = {};
    const introRow = rowHasDisplayTitle(manifest, "foundations", "intro");
    const heroRow = rowHasDisplayTitle(manifest, "compositions", "hero");
    facts.hf3.introRowFound = introRow.found;
    facts.hf3.heroRowFound = heroRow.found;
    facts.hf3.introHasDisplayTitle = introRow.hasDT;
    facts.hf3.heroHasDisplayTitle = heroRow.hasDT;

    if (!(introRow.found && introRow.hasDT))
        violations.push(
            "HF3: the manifest `foundations/intro` row must carry a `displayTitle:` (the MANDATORY short wordmark — the load-bearing no-hyphenation@375 fix, P4-C)",
        );
    if (!(heroRow.found && heroRow.hasDT))
        violations.push(
            "HF3: the manifest `compositions/hero` row must carry a `displayTitle:` (the MANDATORY short hero phrase)",
        );

    // ── HF4 — max-w-5xl dropped ─────────────────────────────────────────────────
    facts.hf4 = {};
    facts.hf4.introNoMaxW5xl = !/max-w-5xl/.test(intro);
    facts.hf4.heroNoMaxW5xl = !/max-w-5xl/.test(hero);

    if (!(facts.hf4.introNoMaxW5xl && facts.hf4.heroNoMaxW5xl))
        violations.push(
            "HF4: a hero page still carries `max-w-5xl` — drop it (the fixed-px measure MANUFACTURES the multi-line blowout — RC4; the chassis `max-inline-size: 18ch` is the measure)",
        );

    // ── HF5 — height-aware fit-cap + single-source factors ──────────────────────
    facts.hf5 = {};
    const block = fitCapBlock(css);
    facts.hf5.fitCapPresent = block.length > 0;
    facts.hf5.hasSvhTerm = /100svh/.test(block);
    facts.hf5.cplDeclared = /--story-hero-cpl:\s*\d/.test(css);
    facts.hf5.estLinesDeclared = /--story-hero-est-lines:\s*\d/.test(css);
    facts.hf5.factorsRead =
        /--story-hero-cpl/.test(block) && /--story-hero-est-lines/.test(block);

    if (!facts.hf5.fitCapPresent)
        violations.push(
            "HF5: the `.story-hero-title[data-hero-scale]` fit-cap block is missing from story-hero.css",
        );
    if (!facts.hf5.hasSvhTerm)
        violations.push(
            "HF5: the hero fit-cap must carry a `100svh` short-viewport-HEIGHT term (the width-only budget is the structural gap — RC3; `svh` NOT `dvh`)",
        );
    if (!(facts.hf5.cplDeclared && facts.hf5.estLinesDeclared && facts.hf5.factorsRead))
        violations.push(
            "HF5: the fit-cap must read the single-source `--story-hero-cpl` + `--story-hero-est-lines` factors (declared once in :root — R3)",
        );

    // ── HF6 — auth-shell keep-fence (the bespoke display-1 panel title) ─────────
    facts.hf6 = {};
    facts.hf6.authKeepsTitle = DISPLAY1_H1.test(auth);

    if (!facts.hf6.authKeepsTitle)
        violations.push(
            "HF6: compositions/auth-shell.vue must KEEP its bespoke `<h1 class=\"text-display …\">` (display-1, the calm panel headline — never viewport-dominating; the spec carve fence)",
        );

    return { facts, violations };
}

// ── The per-clause self-test bites: a synthetic GOOD corpus, each mutated to a
//    planted violation, asserted to RED its clause through the PURE detector. ──────
function selfTest() {
    const goodIntro = `
        <template>
        <StoryPage>
          <template #title-ornament><span class="fourier-f italic">ℱ&nbsp;</span></template>
          <section class="mt-16"><SectionPreviewCard v-for="cat in categories" :to="x" /></section>
        </StoryPage>
        </template>
    `;
    const goodHero = `
        <template>
        <StoryPage>
          <template #title-ornament><span class="fourier-f italic">ℱ&nbsp;</span></template>
          <section class="mt-16"><SectionPreviewCard v-for="s in scenes" :to="\`/compositions/\${s.id}\`" /></section>
        </StoryPage>
        </template>
    `;
    const goodStoryHero = `
        const heroDisplayTitle = computed(() => props.displayTitle ?? props.title);
        <h1 :data-hero-scale="heroScale" :class="cn('story-hero-title', heroClass)">
          <slot name="title-ornament" />{{ heroDisplayTitle }}
        </h1>
    `;
    const goodStoryPage = `
        <StoryHero :display-title="displayTitle" :title="title">
          <template #title-ornament><slot name="title-ornament" /></template>
        </StoryHero>
    `;
    const goodCss = `
        :root { --story-hero-cpl: 7; --story-hero-est-lines: 2; }
        .story-hero-title[data-hero-scale] {
            font-size: min(
                var(--story-hero-title-rung, var(--type-display-4)),
                calc((100vw - 2 * var(--story-hero-pad)) / var(--story-hero-cpl, 7)),
                calc(0.62 * 100svh / var(--story-hero-est-lines, 2))
            );
        }
    `;
    const goodManifest = `
        s("foundations", "intro", "Intro", "blurb", { hero: true, displayTitle: "glass-ui" }),
        s("foundations", "colors", "Colors", "x"),
        s("compositions", "hero", "Hero", "blurb", { hero: true, heroScale: "mega", displayTitle: "Real scenes" }),
        s("compositions", "math-paper", "Math Paper", undefined, {}),
    `;
    const goodAuth = `<h1 class="text-display tracking-tight">Sign in</h1>`;

    const base = {
        introVue: goodIntro,
        heroVue: goodHero,
        storyHeroVue: goodStoryHero,
        storyPageVue: goodStoryPage,
        storyHeroCss: goodCss,
        manifestTs: goodManifest,
        authShellVue: goodAuth,
    };
    const baseRun = detectHeroFit(base);
    const bites = [];

    // HF1 — a re-added :hero-title="false" opt-out reds HF1.
    bites.push({
        name: "HF1: re-added :hero-title=false",
        red: detectHeroFit({
            ...base,
            introVue: goodIntro.replace("<StoryPage>", '<StoryPage :hero-title="false">'),
        }).violations.some((v) => v.startsWith("HF1")),
    });
    // HF1b — a re-added bare poster-rung <h1> reds HF1.
    bites.push({
        name: "HF1: re-added bare poster <h1>",
        red: detectHeroFit({
            ...base,
            heroVue: goodHero.replace(
                "</section>",
                '<h1 class="text-display-hero">Real scenes</h1></section>',
            ),
        }).violations.some((v) => v.startsWith("HF1")),
    });
    // HF2 — StoryHero without the displayTitle render reds HF2.
    bites.push({
        name: "HF2: chassis drops displayTitle render",
        red: detectHeroFit({
            ...base,
            storyHeroVue: goodStoryHero
                .replace("props.displayTitle ?? props.title", "props.title")
                .replace("{{ heroDisplayTitle }}", "{{ title }}"),
        }).violations.some((v) => v.startsWith("HF2")),
    });
    // HF2b — StoryHero without the #title-ornament slot reds HF2.
    bites.push({
        name: "HF2: chassis drops ornament slot",
        red: detectHeroFit({
            ...base,
            storyHeroVue: goodStoryHero.replace('<slot name="title-ornament" />', ""),
        }).violations.some((v) => v.startsWith("HF2")),
    });
    // HF3 — a manifest row without displayTitle reds HF3.
    bites.push({
        name: "HF3: manifest row drops displayTitle",
        red: detectHeroFit({
            ...base,
            manifestTs: goodManifest.replace(', displayTitle: "glass-ui"', ""),
        }).violations.some((v) => v.startsWith("HF3")),
    });
    // HF4 — a re-added max-w-5xl reds HF4.
    bites.push({
        name: "HF4: re-added max-w-5xl",
        red: detectHeroFit({
            ...base,
            introVue: goodIntro.replace("mt-16", "mt-16 max-w-5xl"),
        }).violations.some((v) => v.startsWith("HF4")),
    });
    // HF5 — the fit-cap without the svh term reds HF5.
    bites.push({
        name: "HF5: fit-cap drops the svh term",
        red: detectHeroFit({
            ...base,
            storyHeroCss: goodCss.replace(
                "calc(0.62 * 100svh / var(--story-hero-est-lines, 2))",
                "9999px",
            ),
        }).violations.some((v) => v.startsWith("HF5")),
    });
    // HF6 — auth-shell losing its bespoke title reds HF6.
    bites.push({
        name: "HF6: auth-shell loses its display-1 title",
        red: detectHeroFit({
            ...base,
            authShellVue: "<div>no title</div>",
        }).violations.some((v) => v.startsWith("HF6")),
    });

    return { baseGreen: baseRun.violations.length === 0, baseRun, bites };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_HERO_FIT_ARTIFACT", "BG-hero-fit");
    const sources = {
        introVue: safeRead(resolve(ROOT, "demo/stories/foundations/intro.vue")),
        heroVue: safeRead(resolve(ROOT, "demo/stories/compositions/hero.vue")),
        storyHeroVue: safeRead(resolve(ROOT, "demo/chassis/hero/StoryHero.vue")),
        storyPageVue: safeRead(resolve(ROOT, "demo/chassis/page/StoryPage.vue")),
        storyHeroCss: safeRead(resolve(ROOT, "demo/chassis/hero/story-hero.css")),
        manifestTs: safeRead(resolve(ROOT, "demo/stories/manifest.ts")),
        authShellVue: safeRead(resolve(ROOT, "demo/stories/compositions/auth-shell.vue")),
    };

    const { facts, violations } = detectHeroFit(sources);

    const { baseGreen, baseRun, bites } = selfTest();
    const biteFailures = [];
    if (!baseGreen) {
        biteFailures.push("the synthetic GOOD corpus did not pass the detector");
        if (process.env.HERO_FIT_DEBUG)
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
        command: "npm run proof:hero-fit",
        note: "SOURCE arm only (the title-source assert) — the captured-paint truth (the rendered <h1> block ≤0.62×svh at 375/768/1440/1920, font-size ≥ computed(display-4) at ≥768, no hyphenation@375, ≥1 preview card above the fold) is the W-REFLECT3 π capture, never this gate alone (BG.W-HERO-FIT, class P).",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:hero-fit — ONE chassis-owned hero title path, bounded to the viewport (BG.W-HERO-FIT)",
    );
    console.log(
        `  HF1 ONE chassis title path         : ${yn(
            facts.hf1.introRoutesChassis && facts.hf1.heroRoutesChassis,
        )}`,
    );
    console.log(
        `  HF2 chassis renders displayTitle + ornament slot : ${yn(
            facts.hf2.chassisRendersDisplayTitle &&
                facts.hf2.chassisHasOrnamentSlot &&
                facts.hf2.pageThreadsDisplayTitle,
        )}`,
    );
    console.log(
        `  HF3 MANDATORY short displayTitle   : ${yn(
            facts.hf3.introHasDisplayTitle && facts.hf3.heroHasDisplayTitle,
        )}`,
    );
    console.log(
        `  HF4 max-w-5xl dropped              : ${yn(
            facts.hf4.introNoMaxW5xl && facts.hf4.heroNoMaxW5xl,
        )}`,
    );
    console.log(
        `  HF5 height-aware svh fit-cap       : ${yn(
            facts.hf5.hasSvhTerm &&
                facts.hf5.cplDeclared &&
                facts.hf5.estLinesDeclared &&
                facts.hf5.factorsRead,
        )}`,
    );
    console.log(`  HF6 auth-shell keep-fence          : ${yn(facts.hf6.authKeepsTitle)}`);
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
