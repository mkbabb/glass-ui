// 11.0.1 close: the collapsed-dock geometry probe, on the suite's own projects and server.
//   npx playwright test -c docs/release-11.0.1/close/probe/probe.config.ts --workers=1
import base from "../../../../tests-visual/playwright.config";

export default { ...base, testDir: ".", testMatch: ["collapsed-dock.probe.ts"], projects: base.projects!.filter((p) => p.name !== "webkit") };
