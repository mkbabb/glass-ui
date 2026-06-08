#!/usr/bin/env node
// AX.W03 — proof:dock-hold-contract.
//
// The keepDockOpen contract — a `<Slider>` dragged inside a `<GlassDock>` holds
// the dock open for the gesture and lights `data-held` on both roots — must be
// gated by a DETERMINISTIC, browser-FREE mount test that BITES in CI, replacing
// the fail-open `detectSliderHold` SKIP (which exited 0 with no harness present,
// so the broken contract shipped GREEN across 3.4.0→3.6.0).
//
// The seam that actually breaks IS a component-mount fact: reka's `<SliderRoot>`
// is a forwarding component, so a Vue `@pointerdown` template binding is dropped
// across the Slot/forwardRef boundary and `keepOpen()` never fires. That is
// gateable in jsdom/happy-dom WITHOUT a real browser — a `@vue/test-utils` MOUNT
// of `<GlassDock><Slider/></GlassDock>` dispatching a real `pointerdown` on the
// resolved slider host. The π-lane (Playwright + frontend-design) owns the LIVE
// visual-truth half (the halo + substrate paint through a real drag); this gate
// owns the deterministic CI bite.
//
// Born RED on HEAD: the template `@pointerdown`/`@touchstart` never fire through
// reka's forwarding; `keepOpen` stays 0; `data-held` never paints. The fix
// (`useDockHold` — native host listeners on the resolved element) turns it GREEN.

import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SPEC = "tests/components/ui/slider/dock-hold-contract.test.ts";

function run() {
    const violations = [];
    let mountStatus = "pass";
    let output = "";
    try {
        output = execSync(`npx vitest run ${SPEC} --reporter=dot`, {
            cwd: ROOT,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
        });
    } catch (e) {
        mountStatus = "fail";
        output = `${e.stdout ?? ""}${e.stderr ?? ""}`;
        violations.push(
            "dock-hold-contract: the keepDockOpen mount gate FAILED — a real pointerdown/touchstart on the resolved slider host did NOT acquire keepOpen() / light data-held (the reka forwarding-drop is back, or the native useDockHold listener orphaned).",
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_HOLD_CONTRACT_ARTIFACT",
        "AX-dock-hold-contract",
    );
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-hold-contract",
        spec: SPEC,
        mountStatus,
        violations,
    });

    console.log(
        "proof:dock-hold-contract — the host-native keepDockOpen hold (AX.W03)",
    );
    console.log(`  mount gate (jsdom)     : ${mountStatus === "pass" ? "GREEN ✓" : "RED ✗"}`);
    console.log(`  spec                   : ${SPEC}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
        console.log("\nMOUNT OUTPUT:\n" + output.split("\n").slice(-24).join("\n"));
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
