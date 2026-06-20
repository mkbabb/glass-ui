#!/usr/bin/env node
// BC.W-EXPANDABLE-PART — the ExpandableContainer ::part()/named-slot chrome-hook
// seam (the Atlas AR-7 expand-fullscreen seam; no consumer fork) — proof:expandable-part.
//
// The AR-7 finding (DESHADCN-BRAINSTORM.md §2): a consumer must be able to re-skin
// OR fully REPLACE the fullscreen-overlay chrome (the corner expand/collapse glyph,
// the overlay frame) WITHOUT forking the SFC's body-teleport + body-overflow-lock +
// Escape-shortcut machinery. Vue ships light-DOM scoped-CSS SFCs (not Shadow-DOM
// custom elements), so the seam is the Vue-idiomatic EQUIVALENT of ::part()/slots:
//   (1) STABLE `data-part="…"` attributes (the ::part()-analogue a consumer styles
//       via a PLAIN descendant selector — NOT a `:deep()` reach), and
//   (2) NAMED slots (`#expand-trigger`/`#fullscreen-chrome`) for full chrome
//       replacement, each with a today-default fallback (the unfilled-slot no-op
//       floor is byte-identical), exposing ONLY the `expand`/`collapse` callbacks
//       (thin wrappers over the SAME `v-model:open` — no parallel state path).
//
// The headline fence: the BEHAVIOUR is the library's, the CHROME is the consumer's.
// The body-overflow ref-counted lock, the `<Teleport :disabled="!open">` gate, the
// `registerShortcut("Escape")` exit, the `glass-overlay` un-walled tier, the
// surface/buttonPosition props are BYTE-UNTOUCHED — so there is no copy a consumer
// would fork. AR-7 stays a SEAM, not a new component ("Card is the only new
// component" fence).
//
// Four falsifiable witnesses (each born-RED at HEAD pre-wave) + per-clause self-test:
//
//   EP1 — THE RE-SKIN HOOKS EXIST. The trigger (both inline-expand + fullscreen-
//         collapse) carries `data-part="trigger"` + `data-mode="expand"/"collapse"`;
//         the overlay carries `data-part="overlay"`; the content wrapper carries
//         `data-part="panel"`. Born-RED at HEAD (no `data-part` anywhere). Bite: a
//         removed `data-part="trigger"` REDs.
//   EP2 — THE REPLACEMENT SLOTS EXIST WITH A TODAY-DEFAULT FALLBACK. `#expand-trigger`
//         + `#fullscreen-chrome` named slots are declared, each wrapping the HEAD
//         button as its DEFAULT (the byte-identical no-op floor — an unfilled slot
//         renders the today button); the slot callbacks (expand/collapse) flip the
//         SAME `v-model:open` (no parallel `ref()` shadow of open). Bite: a slot whose
//         default is REMOVED REDs; a parallel `ref(false)` open-shadow REDs.
//   EP3 — THE BEHAVIOUR CONTRACT BYTE-UNTOUCHED (the anti-fork bar). The body-overflow
//         lock (acquire/release + the ref-count inc/dec), the `<Teleport :disabled=
//         "!open">` gate, the `registerShortcut("Escape")` exit, the surface/
//         buttonPosition props, the `glass-overlay` tier are PRESENT + UNCHANGED — a
//         content-hash freeze over the EXTRACTED acquire+release lock function bodies
//         (the canonical anti-fork logic, byte-stable). Bite: a planted edit to the
//         ref-count REDs; a removed `:disabled="!open"` REDs.
//   EP4 — AR-7 STAYED A SEAM, NOT A NEW COMPONENT (the fence). No new
//         `expandable-*`/`fullscreen-*` component dir / subpath / api export is minted
//         — the seam rides the EXISTING SFC + the EXISTING /expandable-container
//         subpath. Bite: a synthetic new `src/components/custom/expandable-fullscreen/`
//         dir REDs.

import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const P = {
    DIR: resolve(ROOT, "src/components/custom/expandable-container"),
    SFC: resolve(ROOT, "src/components/custom/expandable-container/ExpandableContainer.vue"),
    BARREL: resolve(ROOT, "src/components/custom/expandable-container/index.ts"),
    CUSTOM_DIR: resolve(ROOT, "src/components/custom"),
    SUBPATHS_DIR: resolve(ROOT, "src/subpaths"),
    API_INDEX: resolve(ROOT, "src/api/index.ts"),
    DEMO_STORY: resolve(ROOT, "demo/stories/containers/expandable-container.vue"),
    CLAUDE_MD: resolve(ROOT, "CLAUDE.md"),
    DELTA: resolve(ROOT, "docs/tranches/BC/audit/visual/W-EXPANDABLE-PART-DELTA.md"),
    ARTIFACT: gateArtifactPath("GLASS_UI_EXPANDABLE_PART_ARTIFACT", "BC-expandable-part"),
};

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

// The canonical anti-fork lock logic, byte-stable — the EP3 content-hash freeze
// target. The seam adds template hooks + the thin expand/collapse callbacks; it
// NEVER edits the ref-counted body-overflow lock. A drift in either function body
// (an inc→dec swap, a dropped guard) flips the hash.
const LOCK_FREEZE_HASH = "ca0a5b42a96a12fff7096b35def5a51b00dedff82363fb70e4797bcf251c7dfd";

/**
 * Extract the two lock function bodies (acquire/release) as ONE normalized string —
 * the byte-stable anti-fork freeze surface. Whitespace-collapsed so a re-indent is
 * not a false drift, but the LOGIC (the ref-count inc/dec, the document.body.style
 * writes, the guards) is captured exactly. Returns "" if either is absent.
 */
export function extractLockLogic(sfcRaw) {
    const sfc = sfcRaw ?? "";
    const grab = (name) => {
        const m = sfc.match(new RegExp(`function\\s+${name}\\s*\\([^)]*\\)\\s*\\{`));
        if (!m) return null;
        const start = m.index + m[0].length - 1; // at the opening brace
        let depth = 0;
        for (let i = start; i < sfc.length; i++) {
            if (sfc[i] === "{") depth++;
            else if (sfc[i] === "}") {
                depth--;
                if (depth === 0) return sfc.slice(start, i + 1);
            }
        }
        return null;
    };
    const acquire = grab("acquireBodyOverflowLock");
    const release = grab("releaseBodyOverflowLock");
    if (!acquire || !release) return "";
    // Collapse runs of whitespace to ONE space (re-indent tolerant, logic exact).
    return `${acquire}\n${release}`.replace(/\s+/g, " ").trim();
}

function hashLockLogic(sfcRaw) {
    const logic = extractLockLogic(sfcRaw);
    if (!logic) return "";
    return createHash("sha256").update(logic).digest("hex");
}

/**
 * The EP1 re-skin-hooks detector. Pure + exported so the self-test bite feeds it
 * synthetic source.
 */
export function detectDataParts(sfcRaw) {
    const sfc = sfcRaw ?? "";
    return {
        triggerPart: /data-part="trigger"/.test(sfc),
        modeExpand: /data-mode="expand"/.test(sfc),
        modeCollapse: /data-mode="collapse"/.test(sfc),
        overlayPart: /data-part="overlay"/.test(sfc),
        panelPart: /data-part="panel"/.test(sfc),
    };
}

/**
 * The EP2 replacement-slots detector. Pure. The named slots are declared with a
 * today-default fallback (an inner <button> the unfilled slot renders); the callbacks
 * flip the SAME v-model:open with NO parallel state ref.
 */
export function detectSlots(sfcRaw) {
    const sfc = sfcRaw ?? "";
    // The two named slots declared.
    const expandSlot = /<slot[^>]*name="expand-trigger"/.test(sfc);
    const fullscreenSlot = /<slot[^>]*name="fullscreen-chrome"/.test(sfc);
    // Each slot wraps a today-default button (the no-op floor). We assert the slot
    // tag is NOT self-closing AND a <button …data-part="trigger"…> fallback lives
    // inside the named-slot block (the byte-identical default render).
    const expandHasDefault = slotHasButtonDefault(sfc, "expand-trigger");
    const fullscreenHasDefault = slotHasButtonDefault(sfc, "fullscreen-chrome");
    // The callbacks flip the SAME v-model:open. open is the defineModel — NOT a
    // parallel ref shadow. A `ref(...)` / `ref<boolean>(...)` named `open` REDs.
    const callbacksDefined =
        /function\s+expand\s*\(\s*\)\s*\{[^}]*open\.value\s*=\s*true/.test(sfc) &&
        /function\s+collapse\s*\(\s*\)\s*\{[^}]*open\.value\s*=\s*false/.test(sfc);
    const usesDefineModel = /defineModel<boolean>\("open"/.test(sfc);
    // A parallel state shadow: a local `ref` assigned to a const named `open`.
    const parallelOpenShadow = /const\s+open\s*=\s*ref[<(]/.test(sfc);
    return {
        expandSlot,
        fullscreenSlot,
        expandHasDefault,
        fullscreenHasDefault,
        callbacksDefined,
        usesDefineModel,
        parallelOpenShadow,
    };
}

/**
 * A named `<slot name="X" …>…</slot>` block (NOT self-closing) carrying a `<button`
 * default inside it — the byte-identical today-render fallback. Pure helper.
 */
function slotHasButtonDefault(sfc, name) {
    const open = sfc.match(new RegExp(`<slot[^>]*name="${name}"[^>]*?(/?)>`));
    if (!open) return false;
    // Self-closing slot → no default render (a removed default — REDs EP2).
    if (open[1] === "/") return false;
    const start = open.index + open[0].length;
    const end = sfc.indexOf("</slot>", start);
    if (end === -1) return false;
    const body = sfc.slice(start, end);
    return /<button/.test(body);
}

/**
 * The EP3 behaviour-contract detector. Pure. Asserts each anti-fork marker is
 * PRESENT (the lock acquire/release + ref-count, the teleport :disabled gate, the
 * Escape shortcut, the glass-overlay tier, the surface/buttonPosition props) and the
 * lock LOGIC matches the freeze hash.
 */
export function detectBehaviour(sfcRaw) {
    const sfc = sfcRaw ?? "";
    return {
        acquireLock: /function\s+acquireBodyOverflowLock\b/.test(sfc),
        releaseLock: /function\s+releaseBodyOverflowLock\b/.test(sfc),
        refCountInc: /bodyOverflowLockDepth\s*\+=\s*1/.test(sfc),
        refCountDec: /bodyOverflowLockDepth\s*-=\s*1/.test(sfc),
        teleportDisabledGate: /<Teleport\s+to="body"\s+:disabled="!open"/.test(sfc),
        escapeShortcut: /registerShortcut\(\s*"Escape"/.test(sfc),
        glassOverlayTier: /glass-overlay/.test(sfc),
        surfaceProp: /surface\?:\s*Surface/.test(sfc),
        buttonPositionProp: /buttonPosition\?:\s*"left"\s*\|\s*"right"/.test(sfc),
        lockHash: hashLockLogic(sfc),
    };
}

export function detectExpandablePart(sources) {
    const violations = [];
    const sfc = sources.sfc ?? "";

    // ── EP1 — the re-skin hooks exist ─────────────────────────────────────────
    const dp = detectDataParts(sfc);
    if (!dp.triggerPart) violations.push('EP1: the trigger button must carry data-part="trigger"');
    if (!dp.modeExpand) violations.push('EP1: the inline expand trigger must carry data-mode="expand"');
    if (!dp.modeCollapse) violations.push('EP1: the fullscreen collapse trigger must carry data-mode="collapse"');
    if (!dp.overlayPart) violations.push('EP1: the fullscreen overlay frame must carry data-part="overlay"');
    if (!dp.panelPart) violations.push('EP1: the fullscreen content wrapper must carry data-part="panel"');

    // ── EP2 — the replacement slots + today-default fallback + no parallel state ─
    const sl = detectSlots(sfc);
    if (!sl.expandSlot) violations.push('EP2: the #expand-trigger named slot must be declared');
    if (!sl.fullscreenSlot) violations.push('EP2: the #fullscreen-chrome named slot must be declared');
    if (!sl.expandHasDefault) violations.push('EP2: the #expand-trigger slot must wrap a today-default <button> (the byte-identical no-op floor)');
    if (!sl.fullscreenHasDefault) violations.push('EP2: the #fullscreen-chrome slot must wrap a today-default <button> (the byte-identical no-op floor)');
    if (!sl.usesDefineModel) violations.push('EP2: `open` must be the defineModel<boolean>("open") (the two-way v-model:open)');
    if (!sl.callbacksDefined) violations.push('EP2: expand()/collapse() must flip the SAME open model (open.value = true/false)');
    if (sl.parallelOpenShadow) violations.push('EP2: a parallel `const open = ref(...)` shadow of the open state is forbidden — the callbacks flip the SAME v-model:open (one-registry)');

    // ── EP3 — the behaviour contract byte-untouched (the anti-fork bar) ────────
    const bh = detectBehaviour(sfc);
    if (!bh.acquireLock) violations.push('EP3: acquireBodyOverflowLock is absent (the body-overflow lock machinery the seam must NOT fork)');
    if (!bh.releaseLock) violations.push('EP3: releaseBodyOverflowLock is absent');
    if (!bh.refCountInc || !bh.refCountDec) violations.push('EP3: the ref-counted lock depth inc/dec is absent or altered');
    if (!bh.teleportDisabledGate) violations.push('EP3: the <Teleport to="body" :disabled="!open"> gate is absent or altered');
    if (!bh.escapeShortcut) violations.push('EP3: the registerShortcut("Escape") exit is absent');
    if (!bh.glassOverlayTier) violations.push('EP3: the glass-overlay un-walled tier is absent');
    if (!bh.surfaceProp) violations.push('EP3: the surface?: Surface prop is absent');
    if (!bh.buttonPositionProp) violations.push('EP3: the buttonPosition?: "left" | "right" prop is absent');
    if (bh.lockHash && bh.lockHash !== LOCK_FREEZE_HASH) {
        violations.push(
            `EP3: the body-overflow lock logic DRIFTED — the acquire/release function bodies do not match the anti-fork freeze hash (got ${bh.lockHash.slice(0, 16)}…, expected ${LOCK_FREEZE_HASH.slice(0, 16)}…). The seam adds hooks, it never edits the lock.`,
        );
    }

    // ── EP4 — AR-7 stayed a SEAM, not a new component (the fence) ──────────────
    const newComponentDirs = sources.newComponentDirs ?? [];
    if (newComponentDirs.length > 0) {
        violations.push(
            `EP4: AR-7 must stay a SEAM — a new expandable-*/fullscreen-* component dir was minted (${newComponentDirs.join(", ")}). "Card is the only new component" fence.`,
        );
    }
    const newSubpath = sources.newExpandableSubpath ?? false;
    if (newSubpath) {
        violations.push('EP4: AR-7 must stay a SEAM — a new expandable-fullscreen subpath was minted (the seam rides the EXISTING /expandable-container subpath)');
    }

    const facts = {
        ep1: { ...dp },
        ep2: { ...sl },
        ep3: { ...bh, freezeMatches: !bh.lockHash || bh.lockHash === LOCK_FREEZE_HASH, lockHashPrefix: bh.lockHash.slice(0, 16) },
        ep4: { newComponentDirs, newSubpath },
    };
    return { facts, violations };
}

/**
 * The seam-fence inputs from disk: any new `expandable-`/`fullscreen-` component dir
 * (other than the existing expandable-container/) + a new expandable-fullscreen
 * subpath. The EP4 anti-new-component fence.
 */
function readSeamFence() {
    let newComponentDirs = [];
    try {
        newComponentDirs = readdirSync(P.CUSTOM_DIR, { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => d.name)
            .filter(
                (n) =>
                    n !== "expandable-container" &&
                    (/^expandable-/.test(n) || /^fullscreen-/.test(n) || /-fullscreen$/.test(n)),
            );
    } catch {
        // ignore
    }
    let newExpandableSubpath = false;
    try {
        newExpandableSubpath = readdirSync(P.SUBPATHS_DIR)
            .filter((f) => f !== "expandable-container.ts")
            .some((f) => /^expandable-/.test(f) || /^fullscreen-/.test(f) || /-fullscreen\.ts$/.test(f));
    } catch {
        // ignore
    }
    return { newComponentDirs, newExpandableSubpath };
}

// ── the self-test bite: each clause's detector MUST flag its planted defect ─────
function selfTestBite() {
    const out = [];

    // EP1 bite — a removed data-part="trigger" must be FLAGGED.
    const ep1Clean = detectDataParts(
        '<button data-part="trigger" data-mode="expand"></button>',
    );
    const ep1Broken = detectDataParts('<button></button>');
    if (!ep1Clean.triggerPart) out.push("[self-test EP1] the data-part detector failed a genuine data-part=\"trigger\"");
    if (ep1Broken.triggerPart) out.push("[self-test EP1] a removed data-part=\"trigger\" was NOT flagged");

    // EP2 bite — a self-closing slot (default REMOVED) + a parallel ref shadow must
    // both be FLAGGED; a genuine slot-with-button-default + defineModel must PASS.
    const ep2Clean = detectSlots(`
        <slot name="expand-trigger"><button data-part="trigger"></button></slot>
        <slot name="fullscreen-chrome"><button data-part="trigger"></button></slot>
        const open = defineModel<boolean>("open", { default: false });
        function expand() { open.value = true; }
        function collapse() { open.value = false; }
    `);
    const ep2Broken = detectSlots(`
        <slot name="expand-trigger" />
        <slot name="fullscreen-chrome" />
        const open = ref(false);
    `);
    if (!(ep2Clean.expandHasDefault && ep2Clean.fullscreenHasDefault && ep2Clean.callbacksDefined && !ep2Clean.parallelOpenShadow)) {
        out.push("[self-test EP2] the slot detector failed a genuine slot-with-default + flip-the-same-model composition");
    }
    if (ep2Broken.expandHasDefault) out.push("[self-test EP2] a self-closing #expand-trigger (default REMOVED) was NOT flagged");
    if (!ep2Broken.parallelOpenShadow) out.push("[self-test EP2] a parallel `const open = ref(false)` shadow was NOT flagged");

    // EP3 bite — a mutated ref-count (inc→dec) flips the freeze hash; a removed
    // :disabled="!open" is flagged.
    const ep3GenuineLock = `
        function acquireBodyOverflowLock() {
            if (typeof document === "undefined") return false;
            if (bodyOverflowLockDepth === 0) { document.body.style.overflow = "hidden"; }
            bodyOverflowLockDepth += 1; return true;
        }
        function releaseBodyOverflowLock() {
            if (bodyOverflowLockDepth === 0) return;
            bodyOverflowLockDepth -= 1;
        }`;
    const ep3MutatedLock = ep3GenuineLock.replace("bodyOverflowLockDepth += 1", "bodyOverflowLockDepth -= 1");
    const hGenuine = hashLockLogic(ep3GenuineLock);
    const hMutated = hashLockLogic(ep3MutatedLock);
    if (!hGenuine || !hMutated) out.push("[self-test EP3] the lock-logic extractor failed to extract both function bodies");
    if (hGenuine && hMutated && hGenuine === hMutated) {
        out.push("[self-test EP3] a mutated ref-count (inc→dec) did NOT flip the freeze hash");
    }
    const ep3NoGate = detectBehaviour('<Teleport to="body"> ... </Teleport>');
    if (ep3NoGate.teleportDisabledGate) out.push("[self-test EP3] a removed :disabled=\"!open\" Teleport gate was NOT flagged");

    // EP4 bite — a synthetic new expandable-fullscreen dir must be FLAGGED.
    const ep4 = detectExpandablePart({
        sfc: "",
        newComponentDirs: ["expandable-fullscreen"],
    });
    if (!ep4.violations.some((v) => v.startsWith("EP4"))) {
        out.push("[self-test EP4] a synthetic new expandable-fullscreen component dir was NOT flagged");
    }

    return { biteOk: out.length === 0, violations: out };
}

function run() {
    const sfc = safeRead(P.SFC);
    const { newComponentDirs, newExpandableSubpath } = readSeamFence();

    const { facts, violations } = detectExpandablePart({
        sfc,
        newComponentDirs,
        newExpandableSubpath,
    });

    const bite = selfTestBite();
    facts.selfTest = { biteOk: bite.biteOk };
    for (const v of bite.violations) violations.push(v);

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:expandable-part",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log("proof:expandable-part — the ExpandableContainer data-part/named-slot chrome-hook seam (BC.W-EXPANDABLE-PART; AR-7)");
    console.log(
        `  EP1 re-skin hooks (data-part/-mode)   : ${yn(
            facts.ep1.triggerPart && facts.ep1.modeExpand && facts.ep1.modeCollapse &&
                facts.ep1.overlayPart && facts.ep1.panelPart,
        )}`,
    );
    console.log(
        `  EP2 replacement slots + no-op default : ${yn(
            facts.ep2.expandSlot && facts.ep2.fullscreenSlot && facts.ep2.expandHasDefault &&
                facts.ep2.fullscreenHasDefault && facts.ep2.usesDefineModel &&
                facts.ep2.callbacksDefined && !facts.ep2.parallelOpenShadow,
        )}`,
    );
    console.log(
        `  EP3 behaviour byte-untouched (no fork): ${yn(
            facts.ep3.acquireLock && facts.ep3.releaseLock && facts.ep3.refCountInc &&
                facts.ep3.refCountDec && facts.ep3.teleportDisabledGate && facts.ep3.escapeShortcut &&
                facts.ep3.glassOverlayTier && facts.ep3.surfaceProp && facts.ep3.buttonPositionProp &&
                facts.ep3.freezeMatches,
        )}  (lock-freeze:${yn(facts.ep3.freezeMatches)})`,
    );
    console.log(
        `  EP4 AR-7 stayed a seam (no new comp)  : ${yn(
            facts.ep4.newComponentDirs.length === 0 && !facts.ep4.newSubpath,
        )}`,
    );
    console.log(`  self-test bite (per-clause)           : ${yn(bite.biteOk)}`);

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
