// critic round 11 (10.1.5): the 2287 WebKit config with the critic-11 specs, the D-1 cell and the release specs matched.
import wk from "./webkit-2287.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) =>
        p.name === "webkit"
            ? { ...p, testMatch: ["release-10-1-5-critic-11.spec.ts", "release-10-1-5-critic-11-r10.spec.ts", "release-10-1-5-critic-11-r10b.spec.ts", "release-10-1-5-critic-11-r10c.spec.ts", "release-10-1-5.spec.ts", "release-10-1-4.spec.ts", "release-10-1-3.spec.ts"] }
            : p,
    ),
};
