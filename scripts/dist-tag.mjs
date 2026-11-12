// The npm dist-tag for a publish: `latest` only when the version is greater than the
// registry's current latest, `release-<major>` for an older line (npm refuses a tag that parses as a
// semver range, and `v10` does), `next` for a prerelease.
// Usage: node scripts/dist-tag.mjs <version> <registry-latest>
const [version, latest] = process.argv.slice(2);
const parse = (s) => {
    const m = /^(\d+)\.(\d+)\.(\d+)(-.+)?$/.exec(s ?? "");
    if (!m) throw new Error(`dist-tag: not a version: ${JSON.stringify(s)}`);
    return { n: [Number(m[1]), Number(m[2]), Number(m[3])], pre: Boolean(m[4]) };
};
const v = parse(version);
const l = parse(latest);
const order = v.n[0] - l.n[0] || v.n[1] - l.n[1] || v.n[2] - l.n[2];
console.log(v.pre ? "next" : order > 0 ? "latest" : `release-${v.n[0]}`);
