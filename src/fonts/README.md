# `src/fonts/` — self-hostable woff2 assets

Per O.W6 Lane D / speedtest AC.W6 cohort (T_GU-FONT-A): glass-ui ships
Fira Code (and forthcoming display/text companions) as woff2 assets so
consumers can self-host via a single `@font-face` block rather than
re-fetching from Google Fonts on every page-load.

## Canonical filenames (Fira Code)

The orchestrator (or release-script) fetches the OFL-licensed woff2 files
into this directory at the following deterministic paths:

```
src/fonts/FiraCode-Regular.woff2
src/fonts/FiraCode-Medium.woff2
src/fonts/FiraCode-SemiBold.woff2
```

Source canonical: <https://github.com/tonsky/FiraCode> (OFL-1.1). The
woff2 builds live in `distr/woff2/` of that repository's releases — pull
the `Regular`/`Medium`/`SemiBold` weights only (the three glass-ui ships
as the `--font-mono` stack rungs).

## Why this directory ships, not the fetch step

This worktree has no network access. Sub-task 1 documents the canonical
path expectation + threads `src/fonts/**` into `package.json#files` so
the woff2 files (once dropped in) ship in the published tarball without
any further plumbing.

## Orchestrator integration step

At W6 close (before tagging v1.3.0), the orchestrator runs:

```bash
# from glass-ui repo root
mkdir -p src/fonts
curl -fL -o src/fonts/FiraCode-Regular.woff2 \
    https://github.com/tonsky/FiraCode/raw/master/distr/woff2/FiraCode-Regular.woff2
curl -fL -o src/fonts/FiraCode-Medium.woff2 \
    https://github.com/tonsky/FiraCode/raw/master/distr/woff2/FiraCode-Medium.woff2
curl -fL -o src/fonts/FiraCode-SemiBold.woff2 \
    https://github.com/tonsky/FiraCode/raw/master/distr/woff2/FiraCode-SemiBold.woff2
# verify
ls -la src/fonts/*.woff2
```

OFL-1.1 attribution: include `LICENSE-FiraCode.txt` next to the woff2
files (copy of upstream `LICENSE` from the FiraCode repo) at the same
fetch step.

## Consumer self-host recipe

Once shipped, downstream consumers wire up the font via package-relative
URL — no Google Fonts fetch needed:

```css
@font-face {
    font-family: "Fira Code";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url("@mkbabb/glass-ui/fonts/FiraCode-Regular.woff2") format("woff2");
}

@font-face {
    font-family: "Fira Code";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url("@mkbabb/glass-ui/fonts/FiraCode-Medium.woff2") format("woff2");
}

@font-face {
    font-family: "Fira Code";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url("@mkbabb/glass-ui/fonts/FiraCode-SemiBold.woff2") format("woff2");
}
```

The exact URL resolution mechanism (bundler-managed asset graph, public
copy, or direct path) is consumer-side; glass-ui guarantees only the
deterministic file location inside the published tarball.

## Status

- Path expectation: LANDED (this README + the directory + the
  `package.json#files` include).
- woff2 binary files: FLAGGED for orchestrator (no-network in agent
  worktree). Orchestrator fetches at integration before v1.3.0 tag.
- Capsize metric overrides (`size-adjust` / `ascent-override` /
  `descent-override`): out of scope for Lane D — slated for AC.W6b's
  follow-on glass-ui-side ship (T_GU-FONT-B per AC.r3 synthesis).
