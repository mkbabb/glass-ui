# Orchestrator note: 10.1.5 must not take `latest`

On 2026-11-05 the owner ordered glass-ui 11.0.0 published now. It is building on release/11.0.0 and will probably reach npm before 10.1.5.

`.github/workflows/release.yml` runs a bare `npm publish`, which moves `latest` to whatever it publishes. Publishing 10.1.5 after 11.0.0 would then point `latest` back at 10.1.5.

The close seat makes the publish step choose its dist-tag:
- Read the registry's current `latest`.
- If the version being published is greater (semver), publish with `--tag latest`.
- Otherwise publish with `--tag v<major>` (`v10` here).

Keep it one small step in release.yml, with no fallback ladder. Witness the comparison locally for both cases: 10.1.5 against 11.0.0, and 10.1.5 against 10.1.4.
