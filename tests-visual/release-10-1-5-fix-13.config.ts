// fix round 13 (10.1.5): the 2287 WebKit config with the fix-13 probe and the release specs matched.
import wk from "./webkit-2287.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) =>
        p.name === "webkit" || p.name === "chromium-headless-new"
            ? { ...p, testMatch: ["release-10-1-5-fix-13.spec.ts", "release-10-1-5.spec.ts", "release-10-1-4.spec.ts", "release-10-1-3.spec.ts"] }
            : p,
    ),
};
