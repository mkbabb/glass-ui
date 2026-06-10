// AY.W-AUR-STUDIO (D7 / HC-aurora §2a) — the served-app sentinel.
//
// The foreign-server silent-skip clobber: the aurora π specs keyed their
// skip/fail discrimination SOLELY on `canvas.aurora-canvas` presence. When a
// DIFFERENT project's vite server holds the demo port (`reuseExistingServer`),
// the spec attaches to it, the aurora canvas never appears, and it takes the
// device-absence SKIP — OVERWRITING the committed `status:pass` with
// `status:skipped` on a real-GPU machine. The hole cannot distinguish "no GPU"
// from "wrong app on the port".
//
// The sentinel closes it: BEFORE the canvas wait, assert the served page IS the
// glass-ui demo aurora surface. The discriminator is a marker UNIQUE to the
// aurora demo route — the `[data-aurora-atoms-surface]` scroll region the atoms
// dock mounts (`AuroraConfigDock.vue`), corroborated by the demo `<title>`. A
// foreign app on the port has NEITHER, so the sentinel FAILS-CLOSED (throws),
// distinct from the device-absence skip the caller keeps ONLY when the demo IS
// served but the heavy shader never paints under SwiftShader.

import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/** The demo document title (demo/index.html) — the corroborating signal. */
export const DEMO_TITLE = "glass-ui Feature Demo";

/**
 * Assert the served page IS the glass-ui demo aurora surface. Throws a distinct,
 * fail-CLOSED error (NOT a skip) when a foreign app holds the port — the
 * `[data-aurora-atoms-surface]` marker + the demo title are both unique to this
 * route, so their joint absence means the wrong app is served. Returns once the
 * marker is present; the caller then keeps the device-absence skip ONLY for the
 * "demo IS served but the canvas never paints" (true GPU-less) case.
 */
export async function assertServedDemoAurora(page: Page): Promise<void> {
    const surface = page.locator("[data-aurora-atoms-surface]");
    try {
        await surface.first().waitFor({ state: "attached", timeout: 15_000 });
    } catch {
        const title = await page.title().catch(() => "<unreadable>");
        throw new Error(
            `served-app sentinel FAILED (fail-closed, NOT a device skip): the page at ${page.url()} ` +
                `is NOT the glass-ui demo aurora surface — the unique [data-aurora-atoms-surface] ` +
                `marker is absent (served title: "${title}", expected "${DEMO_TITLE}"). A FOREIGN app ` +
                `is holding the demo port. Point GLASS_UI_DEMO_URL/PORT at the real glass-ui demo ` +
                `server before re-running. (The device-absence SKIP is reserved for the demo BEING ` +
                `served but the canvas not painting on a GPU-less runner — this is a different failure.)`,
        );
    }
    // Corroborate with the demo title (a second independent signal the page is ours).
    const title = await page.title().catch(() => "");
    expect(
        title,
        `served-app sentinel: the [data-aurora-atoms-surface] marker is present but the document ` +
            `title is "${title}" (expected "${DEMO_TITLE}") — an unexpected served page`,
    ).toBe(DEMO_TITLE);
}
