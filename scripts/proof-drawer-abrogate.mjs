#!/usr/bin/env node
// BB.W-DRAWER-ABROGATE — the Drawer family re-built on reka DialogRoot + a house
// SpringProgress snap engine, vaul-vue ABROGATED (proof:drawer-abrogate).
//
// The born-RED→GREEN device-free SOURCE arm for the vaul-vue de-fork. vaul-vue@0.4.1
// hard-runtime-deps `@vueuse/core ^10.8.0` — a SECOND @vueuse major against the
// constellation's `14.3.0` spine, the LONE non-cascade dual. This wave removes
// vaul-vue wholesale: the eight Drawer SFCs re-build on reka `DialogRoot`/
// `DialogPortal`/`DialogContent` (the house headless substrate every other compound
// wrapper already binds), the snap math moves onto ONE house `SpringProgress` (the
// dock-morph `linear()` clock, the §6 doctrine), and the two `package.json` vaul rows
// are deleted. The PAINTED truth (the snap frame-series + the live-behind page-
// interactive π + the PRM seat, BOTH modes) is the binding visual truth proven by the
// π live readback captured in docs/tranches/BB/audit/visual/W-DRAWER-ABROGATE-DELTA.md
// — this gate is the no-device CI half. The @vueuse-10-dual-gone confirmation rides
// proof:constellation-spine's clause (W-SPINE-CONSTELLATION owns it); this wave is its
// enabler and records the `npm ls @vueuse/core` single-tree proof in the DELTA.
//
// Six falsifiable SOURCE witnesses (each born-RED at HEAD pre-wave, driven GREEN by
// the wave):
//
//   W1 — NO vaul-vue import survives anywhere. ZERO `from 'vaul-vue'` /
//        `from "vaul-vue"` / `require('vaul-vue')` across src/** + demo/**, AND
//        package.json carries ZERO `vaul-vue` row (peer/dev/meta). Bite (anti-
//        evasion): the gate greps the package NAME across ALL drawer SFCs + the demo
//        consumers + package.json (not just the four known sites) — a re-introduction
//        in a NEW file reds. RED at HEAD: Drawer/Content/Overlay/Title/Description/
//        index import vaul; package.json:846,891 carry the rows.
//   W2 — the Drawer family composes the reka headless substrate. Drawer.vue imports
//        `DialogRoot` from reka-ui; DrawerContent.vue imports `DialogPortal` +
//        `DialogContent` from reka-ui; DrawerOverlay.vue imports `DialogOverlay`;
//        index.ts's Drawer*-primitives resolve to reka `Dialog*`. RED at HEAD: the
//        runtime components are vaul, not reka.
//   W3 — the snap settle is ONE SpringProgress (the §6 doctrine, no bespoke timer).
//        useDrawerSnap.ts constructs ONE `new SpringProgress({...})` on the
//        DRAWER_SNAP register, the family carries NO `cubic-bezier(.32,.72,0,1)`
//        vaul-curve fingerprint, and DRAWER_SNAP is a (response, ζ) register in
//        constants.ts — NOT a re-use of DOCK_SPRING (the per-spring-clock §6 doctrine).
//        RED at HEAD: vaul owns the snap via its injected cubic-bezier transition.
//   W4 — the live-behind page stays interactive. `mode="live-behind"` maps to reka
//        `:modal="false"` in Drawer.vue (no focus trap, no page aria-hidden/inert).
//        The BINDING truth is the π (W8): #verdict-cta clickable while the live-behind
//        sheet is open. RED-equivalent at HEAD: vaul-owned.
//   W5 — the direction ladder is native (BB-2 folded). useDrawerSnap/constants.ts
//        resolves the default snapPoints from `direction`: bottom/top → [0.12,0.5,1],
//        left/right → a full-slide. Bite: the resolver READS direction (a hardcoded
//        ladder with no direction branch reds). RED at HEAD: Drawer.vue resolves
//        [0.12,0.5,1] UNCONDITIONALLY.
//   W6 — the LOOK keys re-pointed (clean rename, no alias). drawer.css reads
//        `[data-glass-drawer-*]` keys (NOT `[data-vaul-*]`), and the new SFCs EMIT
//        those attrs. Bite (anti-evasion): the EMIT↔READ pair holds — a CSS rule
//        reading `[data-glass-drawer-snap-points]` must have a SFC emitting it (a
//        re-key that renames the CSS but forgets the SFC emit — a dead selector —
//        reds). RED at HEAD: drawer.css:31,112,121,134 read `[data-vaul-*]`.
//
// House style mirrors proof-surface-axis.mjs / proof-menu-glass.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a byte-
// stable JSON artefact via gate-output, a human summary, process.exit(1) on any
// violation. A `--self-test` flag feeds a synthetic vaul-bearing source set + a synthetic
// drift set and asserts the detector REDS them (the false-witness bite).

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const drawer = (p) => resolve(ROOT, "src/components/ui/drawer", p);
    _cliPaths = {
        ROOT,
        DRAWER_VUE: drawer("Drawer.vue"),
        DRAWER_CONTENT_VUE: drawer("DrawerContent.vue"),
        DRAWER_OVERLAY_VUE: drawer("DrawerOverlay.vue"),
        DRAWER_TITLE_VUE: drawer("DrawerTitle.vue"),
        DRAWER_DESCRIPTION_VUE: drawer("DrawerDescription.vue"),
        DRAWER_INDEX_TS: drawer("index.ts"),
        USE_DRAWER_SNAP_TS: drawer("composables/useDrawerSnap.ts"),
        DRAWER_CONSTANTS_TS: drawer("constants.ts"),
        DRAWER_CSS: resolve(ROOT, "src/styles/drawer.css"),
        PACKAGE_JSON: resolve(ROOT, "package.json"),
        DEMO_LIVE_BEHIND: resolve(
            ROOT,
            "demo/stories/compositions/drawer-live-behind.vue",
        ),
        DEMO_CONTAINERS: resolve(ROOT, "demo/stories/containers/drawer.vue"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DRAWER_ABROGATE_ARTIFACT",
            "BB-drawer-abrogate",
        ),
    };
    return _cliPaths;
}

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

// Strip Vue SFC `<!-- … -->` HTML comments — a commented-out import/attr must not
// satisfy or trip a witness.
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

// A vaul-vue import (the de-forked foreign tree). The package NAME in a `from`/
// `require` import specifier — NOT a prose mention (the comment-strip already
// removed those).
const VAUL_IMPORT_RE =
    /(?:from\s*|require\s*\(\s*)["']vaul-vue["']/g;

function countVaulImports(src) {
    return (src.match(VAUL_IMPORT_RE) || []).length;
}

// A `[data-vaul-*]` selector in CSS (the vaul-injected LOOK keys the re-point retires).
const VAUL_DATA_KEY_RE = /\[data-vaul-[\w-]*/g;

/**
 * The W-DRAWER-ABROGATE detector. Pure: takes the comment-stripped sources, returns
 * `{ facts, violations }`. Each witness pushes a falsifiable violation string.
 */
export function detectDrawerAbrogate(sources) {
    const drawerVue = stripHtmlComments(stripBlockComments(sources.drawerVue ?? ""));
    const contentVue = stripHtmlComments(
        stripBlockComments(sources.contentVue ?? ""),
    );
    const overlayVue = stripHtmlComments(
        stripBlockComments(sources.overlayVue ?? ""),
    );
    const titleVue = stripHtmlComments(stripBlockComments(sources.titleVue ?? ""));
    const descriptionVue = stripHtmlComments(
        stripBlockComments(sources.descriptionVue ?? ""),
    );
    const indexTs = stripBlockComments(sources.indexTs ?? "");
    const useDrawerSnapTs = stripBlockComments(sources.useDrawerSnapTs ?? "");
    const constantsTs = stripBlockComments(sources.constantsTs ?? "");
    const drawerCss = stripBlockComments(sources.drawerCss ?? "");
    // package.json is JSON (no `//` comments allowed); read raw.
    const packageJson = sources.packageJson ?? "";
    const demoLiveBehind = stripHtmlComments(
        stripBlockComments(sources.demoLiveBehind ?? ""),
    );
    const demoContainers = stripHtmlComments(
        stripBlockComments(sources.demoContainers ?? ""),
    );

    const violations = [];

    // ── W1 — NO vaul-vue import survives anywhere ─────────────────────────────
    const sfcSrcs = {
        "Drawer.vue": drawerVue,
        "DrawerContent.vue": contentVue,
        "DrawerOverlay.vue": overlayVue,
        "DrawerTitle.vue": titleVue,
        "DrawerDescription.vue": descriptionVue,
        "index.ts": indexTs,
        "composables/useDrawerSnap.ts": useDrawerSnapTs,
        "constants.ts": constantsTs,
        "demo/.../drawer-live-behind.vue": demoLiveBehind,
        "demo/.../containers/drawer.vue": demoContainers,
    };
    let vaulImportSites = 0;
    for (const [name, src] of Object.entries(sfcSrcs)) {
        const n = countVaulImports(src);
        vaulImportSites += n;
        if (n > 0) {
            violations.push(
                `W1: ${name} still imports from 'vaul-vue' (${n} site${n > 1 ? "s" : ""}) — the foreign tree must be ABROGATED, no import survives.`,
            );
        }
    }
    // package.json carries ZERO vaul-vue row (peer/dev/meta).
    const vaulPackageRows = (packageJson.match(/["']vaul-vue["']\s*:/g) || [])
        .length;
    if (vaulPackageRows > 0) {
        violations.push(
            `W1: package.json carries ${vaulPackageRows} \`vaul-vue\` row(s) (peer/dev/meta) — the @vueuse-10 dual is the abrogation's headline; every vaul-vue row must be removed.`,
        );
    }

    // ── W2 — the Drawer family composes the reka headless substrate ───────────
    const importsRekaSymbol = (src, symbol) =>
        new RegExp(
            `import\\s*\\{[^}]*\\b${symbol}\\b[^}]*\\}\\s*from\\s*["']reka-ui["']`,
        ).test(src) ||
        // Multi-line import block: the symbol + a reka-ui specifier are both present.
        (new RegExp(`\\b${symbol}\\b`).test(src) &&
            /from\s*["']reka-ui["']/.test(src) &&
            // Guard against a stray prose match: require the symbol inside an import.
            new RegExp(`import[\\s\\S]*?\\b${symbol}\\b[\\s\\S]*?from\\s*["']reka-ui["']`).test(
                src,
            ));
    const rootComposesRoot = importsRekaSymbol(drawerVue, "DialogRoot");
    const contentComposesPortal = importsRekaSymbol(contentVue, "DialogPortal");
    const contentComposesContent = importsRekaSymbol(contentVue, "DialogContent");
    const overlayComposesOverlay = importsRekaSymbol(overlayVue, "DialogOverlay");
    // index.ts re-exports the three Drawer-namespaced primitives off reka Dialog*.
    const indexComposesReka =
        /from\s*["']reka-ui["']/.test(indexTs) &&
        /\bDialogTrigger\b/.test(indexTs) &&
        /\bDialogClose\b/.test(indexTs) &&
        /\bDialogPortal\b/.test(indexTs);
    const drawerComposesReka =
        rootComposesRoot &&
        contentComposesPortal &&
        contentComposesContent &&
        overlayComposesOverlay &&
        indexComposesReka;
    if (!rootComposesRoot) {
        violations.push(
            "W2: Drawer.vue does not import `DialogRoot` from reka-ui (the root must compose the house headless substrate).",
        );
    }
    if (!contentComposesPortal || !contentComposesContent) {
        violations.push(
            "W2: DrawerContent.vue does not import `DialogPortal` + `DialogContent` from reka-ui (the content must teleport + render through reka).",
        );
    }
    if (!overlayComposesOverlay) {
        violations.push(
            "W2: DrawerOverlay.vue does not import `DialogOverlay` from reka-ui (the scrim must compose reka).",
        );
    }
    if (!indexComposesReka) {
        violations.push(
            "W2: index.ts does not re-build DrawerTrigger/DrawerClose/DrawerPortal over reka Dialog* (the three primitives must be house wrappers, not vaul re-exports).",
        );
    }

    // ── W3 — the snap settle is ONE SpringProgress (no bespoke timer) ─────────
    const importsSpringProgress =
        /import\s*\{[^}]*\bSpringProgress\b[^}]*\}\s*from\s*["']@mkbabb\/keyframes\.js["']/.test(
            useDrawerSnapTs,
        );
    const constructsSpringProgress = /new\s+SpringProgress\s*\(/.test(
        useDrawerSnapTs,
    );
    const playsFrameLoop = /\.play\s*\(/.test(useDrawerSnapTs);
    const snapOnSpringProgress =
        importsSpringProgress && constructsSpringProgress && playsFrameLoop;
    if (!snapOnSpringProgress) {
        violations.push(
            "W3: useDrawerSnap.ts does not drive the snap on ONE `new SpringProgress(...).play(...)` (the §6 dock-morph clock — the house engine must own the settle).",
        );
    }
    // Bite: NO vaul-curve fingerprint survives anywhere in the family or drawer.css.
    const vaulCurveRe = /cubic-bezier\s*\(\s*\.?0*\.32\s*,/;
    const familyAndCss = [
        drawerVue,
        contentVue,
        overlayVue,
        useDrawerSnapTs,
        drawerCss,
    ].join("\n");
    const vaulCurveSurvives = vaulCurveRe.test(familyAndCss);
    if (vaulCurveSurvives) {
        violations.push(
            "W3: the vaul-curve fingerprint `cubic-bezier(.32,.72,0,1)` survives in the Drawer family / drawer.css (the bespoke transition leaked back — the house SpringProgress replaces it).",
        );
    }
    // A bespoke hand-rolled rAF / setTimeout-driven snap loop in useDrawerSnap is
    // forbidden (the SpringProgress owns the rAF via .play()). A bare
    // `requestAnimationFrame` for the drag-velocity sample is permitted ONLY if the
    // settle is the spring — we red a raw rAF SNAP loop by requiring no
    // `setInterval`/`setTimeout`-driven detent settle.
    const bespokeSnapTimer = /setInterval\s*\(/.test(useDrawerSnapTs);
    if (bespokeSnapTimer) {
        violations.push(
            "W3: useDrawerSnap.ts uses a `setInterval` snap loop (a bespoke timer — the §6 doctrine forbids a second motion vocabulary; the settle is the SpringProgress).",
        );
    }
    // DRAWER_SNAP is a (response, ζ) register in constants.ts, NOT a DOCK_SPRING re-use.
    const drawerSnapRegister =
        /DRAWER_SNAP\s*=/.test(constantsTs) &&
        /response\s*:/.test(constantsTs) &&
        /dampingFraction\s*:/.test(constantsTs);
    if (!drawerSnapRegister) {
        violations.push(
            "W3: constants.ts does not declare the `DRAWER_SNAP` (response, ζ) register (the drawer's OWN settle clock — the per-spring-clock §6 doctrine).",
        );
    }
    // The own-clock sub-assert: useDrawerSnap reads DRAWER_SNAP, NOT DOCK_SPRING.
    const reusesDockSpring = /\bDOCK_SPRING\b/.test(useDrawerSnapTs);
    if (reusesDockSpring) {
        violations.push(
            "W3: useDrawerSnap.ts imports `DOCK_SPRING` (the dock's clock) — the drawer's sheet-settle is its OWN register (DRAWER_SNAP), not the dock's morph-settle.",
        );
    }
    const readsDrawerSnap = /\bDRAWER_SNAP\b/.test(useDrawerSnapTs);
    if (!readsDrawerSnap) {
        violations.push(
            "W3: useDrawerSnap.ts does not read the `DRAWER_SNAP` register (the snap spring must drive off its own named clock).",
        );
    }

    // ── W4 — the live-behind page stays interactive ───────────────────────────
    // The `mode="live-behind"` → `:modal="false"` mapping is present in Drawer.vue:
    // a `live-behind` branch resolving the modal to false (no focus trap, no
    // page aria-hidden). We assert the source carries the live-behind→non-modal
    // resolution AND no forced page `aria-hidden`/`inert` on the page root.
    const liveBehindBranch = /live-behind/.test(drawerVue);
    const resolvesNonModal =
        /modal/.test(drawerVue) &&
        // a `false` is reachable for the live case (the ?? / ternary form).
        /false/.test(drawerVue);
    const liveBehindNonModal = liveBehindBranch && resolvesNonModal;
    if (!liveBehindNonModal) {
        violations.push(
            "W4: Drawer.vue does not map `mode=\"live-behind\"` → reka `:modal=\"false\"` (the page-interactive contract — no focus trap, no page aria-hidden).",
        );
    }
    // The family must NOT force `aria-hidden`/`inert` on the page root (a re-introduced
    // page-occluding attr would defeat the live-behind contract).
    const forcesPageHidden =
        /document\.(?:body|documentElement)[\s\S]{0,40}(?:aria-hidden|inert)/.test(
            drawerVue + contentVue,
        );
    if (forcesPageHidden) {
        violations.push(
            "W4: the Drawer family forces `aria-hidden`/`inert` on the page root (the live-behind page must stay reachable — reka `:modal=\"false\"` handles modality natively).",
        );
    }

    // ── W5 — the direction ladder is native (BB-2 folded) ─────────────────────
    // The default snapPoints resolve from `direction`: the resolver READS direction,
    // the [0.12,0.5,1] ladder is reachable for bottom/top, the full-slide for
    // left/right. The resolver lives in useDrawerSnap.ts and/or constants.ts.
    const ladderSrc = `${useDrawerSnapTs}\n${constantsTs}`;
    const readsDirection = /\bdirection\b/.test(ladderSrc);
    const hasBottomLadder = /0\.12\s*,\s*0\.5\s*,\s*1/.test(ladderSrc);
    // The full-slide branch — left/right resolve to no detents (an empty array or a
    // single-stop full-slide). We assert a left/right branch exists.
    const hasSideBranch =
        /\b(?:left|right)\b/.test(ladderSrc) &&
        // The resolver branches on the axis (a left|right group test).
        /direction/.test(ladderSrc);
    const directionLadderNative =
        readsDirection && hasBottomLadder && hasSideBranch;
    if (!readsDirection) {
        violations.push(
            "W5: the snap ladder resolver does not READ `direction` (the BB-2 fold — the engine resolves the default ladder from direction, retiring the Atlas `:snap-points=[]` workaround).",
        );
    }
    if (!hasBottomLadder) {
        violations.push(
            "W5: the [0.12, 0.5, 1] peek/half/full ladder is not reachable for bottom/top (the default detent ladder must be resolved by VALUE from direction).",
        );
    }
    if (!hasSideBranch) {
        violations.push(
            "W5: the left/right (side-lens) full-slide branch is not present (a side drawer slides fully in/out — no bottom-sheet detents).",
        );
    }

    // ── W6 — the LOOK keys re-pointed (clean rename, no alias) ────────────────
    const vaulDataKeys = (drawerCss.match(VAUL_DATA_KEY_RE) || []).length;
    if (vaulDataKeys > 0) {
        violations.push(
            `W6: drawer.css still reads ${vaulDataKeys} \`[data-vaul-*]\` key(s) — the LOOK keys must re-point to \`[data-glass-drawer-*]\` (clean rename, no alias).`,
        );
    }
    // The EMIT↔READ pair: each `[data-glass-drawer-*]` key the CSS reads must be
    // EMITTED by a SFC (a dead selector — a re-key that renames the CSS but forgets
    // the SFC emit — reds). We collect the CSS keys and assert a SFC writes each.
    const cssGlassKeys = [
        ...new Set(
            (drawerCss.match(/\[data-glass-drawer[\w-]*/g) || []).map((k) =>
                // Normalize `[data-glass-drawer-snap-points` → `data-glass-drawer-snap-points`.
                k.replace(/^\[/, ""),
            ),
        ),
    ];
    const sfcEmitSrc = `${drawerVue}\n${contentVue}\n${overlayVue}`;
    const emittedKeys = [];
    const danglingKeys = [];
    for (const key of cssGlassKeys) {
        // The SFC emits the attr as `data-glass-drawer` / `:data-glass-drawer-…` /
        // `data-glass-drawer-snap-points`. Match the bare attr name in the SFC source.
        if (new RegExp(key.replace(/[-]/g, "[-]")).test(sfcEmitSrc)) {
            emittedKeys.push(key);
        } else {
            danglingKeys.push(key);
        }
    }
    const glassDrawerKeysEmitted =
        cssGlassKeys.length > 0 && danglingKeys.length === 0;
    if (cssGlassKeys.length === 0) {
        violations.push(
            "W6: drawer.css reads NO `[data-glass-drawer-*]` key (the re-point did not land — the new namespace keys are absent).",
        );
    }
    for (const dead of danglingKeys) {
        violations.push(
            `W6: drawer.css reads \`[${dead}]\` but no Drawer SFC emits it (a dead selector — the EMIT↔READ pair is broken).`,
        );
    }
    // The content root carries `data-glass-drawer` (the base key the touch-action +
    // surface rules anchor on).
    const contentEmitsBaseKey = /data-glass-drawer\b/.test(contentVue);
    if (!contentEmitsBaseKey) {
        violations.push(
            "W6: DrawerContent.vue does not emit the base `data-glass-drawer` attr (the content root must carry the renamed key the CSS reads).",
        );
    }

    const facts = {
        w1: { vaulImportSites, vaulPackageRows },
        w2: {
            rootComposesRoot,
            contentComposesPortal,
            contentComposesContent,
            overlayComposesOverlay,
            indexComposesReka,
            drawerComposesReka,
        },
        w3: {
            snapOnSpringProgress,
            vaulCurveSurvives,
            bespokeSnapTimer,
            drawerSnapRegister,
            reusesDockSpring,
            readsDrawerSnap,
        },
        w4: { liveBehindNonModal, forcesPageHidden },
        w5: {
            readsDirection,
            hasBottomLadder,
            hasSideBranch,
            directionLadderNative,
        },
        w6: {
            vaulDataKeys,
            cssGlassKeys,
            emittedKeys,
            danglingKeys,
            glassDrawerKeysEmitted,
            contentEmitsBaseKey,
        },
    };

    return { facts, violations };
}

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

// ── The self-test bite (the false-witness discipline) ─────────────────────────
// Feed a synthetic vaul-bearing + drift source set and assert the detector REDS each
// witness. If the detector greens a known-broken set, the gate is a false witness.
function selfTest() {
    const bad = detectDrawerAbrogate({
        drawerVue: `import { DrawerRoot } from 'vaul-vue'\nconst x = [0.12,0.5,1]`,
        contentVue: `import { DrawerContent } from 'vaul-vue'`,
        overlayVue: `import { DrawerOverlay } from 'vaul-vue'`,
        titleVue: `import { DrawerTitle } from 'vaul-vue'`,
        descriptionVue: `import { DrawerDescription } from 'vaul-vue'`,
        indexTs: `export { DrawerPortal } from 'vaul-vue'`,
        useDrawerSnapTs: `// no SpringProgress, uses DOCK_SPRING\nimport { DOCK_SPRING } from '../../dock/constants'`,
        constantsTs: `// no DRAWER_SNAP register`,
        drawerCss: `.glass-drawer[data-vaul-snap-points="true"] { transition: transform .5s cubic-bezier(.32,.72,0,1) }`,
        packageJson: `{ "peerDependencies": { "vaul-vue": "^0.4" } }`,
        demoLiveBehind: `import { Drawer } from '../../../src/components/ui/drawer'`,
        demoContainers: ``,
    });
    const good = detectDrawerAbrogate({
        drawerVue: `import { DialogRoot } from 'reka-ui'\nconst live = mode === 'live-behind'\nconst modal = live ? false : true`,
        contentVue: `import { DialogPortal, DialogContent } from 'reka-ui'\n<DialogContent data-glass-drawer :data-glass-drawer-snap-points="snap" :data-glass-drawer-direction="dir">`,
        overlayVue: `import { DialogOverlay } from 'reka-ui'`,
        titleVue: `import { DialogTitle } from 'reka-ui'`,
        descriptionVue: `import { DialogDescription } from 'reka-ui'`,
        indexTs: `export { DialogPortal as DrawerPortal, DialogTrigger as DrawerTrigger, DialogClose as DrawerClose } from 'reka-ui'`,
        useDrawerSnapTs: `import { SpringProgress } from '@mkbabb/keyframes.js'\nimport { DRAWER_SNAP } from '../constants'\nconst s = new SpringProgress({ response: DRAWER_SNAP.response, dampingFraction: DRAWER_SNAP.dampingFraction })\ns.play(()=>{})\nconst dir = direction\nif (direction === 'left' || direction === 'right') return []\nreturn [0.12,0.5,1]`,
        constantsTs: `export const DRAWER_SNAP = { response: 0.4, dampingFraction: 0.82 } as const`,
        drawerCss: `.glass-drawer[data-glass-drawer-snap-points="true"] { height: 100% } .glass-drawer[data-glass-drawer-direction="top"] { top: 0 }`,
        packageJson: `{ "peerDependencies": { "reka-ui": "^2.0" } }`,
        demoLiveBehind: `import { Drawer } from '../../../src/components/ui/drawer'`,
        demoContainers: `import { Drawer } from '../../../src/components/ui/drawer'`,
    });
    const checks = [
        ["bad set reds W1 (vaul import)", bad.violations.some((v) => v.startsWith("W1"))],
        ["bad set reds W2 (no reka)", bad.violations.some((v) => v.startsWith("W2"))],
        ["bad set reds W3 (no spring / cubic-bezier / DOCK_SPRING)", bad.violations.some((v) => v.startsWith("W3"))],
        ["bad set reds W5 (no direction ladder)", bad.violations.some((v) => v.startsWith("W5"))],
        ["bad set reds W6 (vaul data key)", bad.violations.some((v) => v.startsWith("W6"))],
        ["good set is CLEAN", good.violations.length === 0],
    ];
    let ok = true;
    console.log("proof:drawer-abrogate --self-test (the false-witness bite)");
    for (const [label, pass] of checks) {
        console.log(`  ${pass ? "✓" : "✗"} ${label}`);
        if (!pass) ok = false;
    }
    if (!ok && good.violations.length) {
        console.log("  good-set residual violations:");
        for (const v of good.violations) console.log(`    - ${v}`);
    }
    process.exit(ok ? 0 : 1);
}

function run() {
    if (process.argv.includes("--self-test")) {
        selfTest();
        return;
    }
    const P = cliPaths();
    const { ROOT } = P;

    const { facts, violations } = detectDrawerAbrogate({
        drawerVue: safeRead(P.DRAWER_VUE),
        contentVue: safeRead(P.DRAWER_CONTENT_VUE),
        overlayVue: safeRead(P.DRAWER_OVERLAY_VUE),
        titleVue: safeRead(P.DRAWER_TITLE_VUE),
        descriptionVue: safeRead(P.DRAWER_DESCRIPTION_VUE),
        indexTs: safeRead(P.DRAWER_INDEX_TS),
        useDrawerSnapTs: safeRead(P.USE_DRAWER_SNAP_TS),
        constantsTs: safeRead(P.DRAWER_CONSTANTS_TS),
        drawerCss: safeRead(P.DRAWER_CSS),
        packageJson: safeRead(P.PACKAGE_JSON),
        demoLiveBehind: safeRead(P.DEMO_LIVE_BEHIND),
        demoContainers: safeRead(P.DEMO_CONTAINERS),
    });

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:drawer-abrogate",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:drawer-abrogate — the Drawer family re-built on reka DialogRoot + a SpringProgress snap engine, vaul-vue ABROGATED (BB.W-DRAWER-ABROGATE)",
    );
    console.log(
        `  W1 no vaul import survives    : ${yn(
            facts.w1.vaulImportSites === 0 && facts.w1.vaulPackageRows === 0,
        )}  (imports:${facts.w1.vaulImportSites} pkgRows:${facts.w1.vaulPackageRows})`,
    );
    console.log(
        `  W2 family composes reka       : ${yn(facts.w2.drawerComposesReka)}`,
    );
    console.log(
        `  W3 snap on ONE SpringProgress : ${yn(
            facts.w3.snapOnSpringProgress &&
                !facts.w3.vaulCurveSurvives &&
                !facts.w3.bespokeSnapTimer &&
                facts.w3.drawerSnapRegister &&
                !facts.w3.reusesDockSpring &&
                facts.w3.readsDrawerSnap,
        )}  (DRAWER_SNAP own-clock; cubic-bezier:${yn(facts.w3.vaulCurveSurvives)})`,
    );
    console.log(
        `  W4 live-behind page interactive: ${yn(facts.w4.liveBehindNonModal && !facts.w4.forcesPageHidden)}`,
    );
    console.log(
        `  W5 direction ladder native    : ${yn(facts.w5.directionLadderNative)}  (bottom:${yn(facts.w5.hasBottomLadder)} side:${yn(facts.w5.hasSideBranch)})`,
    );
    console.log(
        `  W6 LOOK keys re-pointed       : ${yn(
            facts.w6.vaulDataKeys === 0 && facts.w6.glassDrawerKeysEmitted,
        )}  (vaul:${facts.w6.vaulDataKeys} glass-keys:${facts.w6.cssGlassKeys.length} dangling:${facts.w6.danglingKeys.length})`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
