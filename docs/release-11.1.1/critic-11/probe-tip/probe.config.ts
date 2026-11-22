// Critic 10 (critics 9 and 8): the release config's four projects, pointed at this probe. Copied with the
// probe into a tree's tests-visual/critic10-probe/ so it serves and reads that tree.
import release from "../release-11-1-1.config";

const dir = new URL(".", import.meta.url).pathname;

export default {
    ...release,
    testDir: dir,
    projects: release.projects!.map((p) => ({ ...p, testDir: dir, testMatch: ["*.probe.ts"] })),
};
