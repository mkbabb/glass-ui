// U/B7c C3 — the palette witnesses' WebKit cells, on Playwright WebKit build 2287 (see
// webkit-2287.config.ts for why 2287). One browser per run, under the exclusive lock:
//   GLASS_UI_DEMO_PORT=7983 guarded --exclusive webkit -- \
//     npx playwright test -c tests-visual/b7c-webkit.config.ts --workers=1
import webkit2287 from "./webkit-2287.config";

export default {
    ...webkit2287,
    projects: webkit2287.projects!
        .filter((p) => p.name === "webkit")
        .map((p) => ({ ...p, testMatch: ["CommandDialog.b7c.spec.ts"] })),
};
