# P-A7 plants: each takes the source back to the counterexample it cures. `python3 plants.py <name> apply|revert <wt>`.
# apply keeps a byte copy in <wt>/.a7plant/ and revert restores it (the tree hash is checked by the caller).
import sys, os, shutil
name, op, wt = sys.argv[1], sys.argv[2], sys.argv[3]
P = {
  # CK-27/CK-25: the preset chip's ink rules removed (the pass-6 elegant reduction: no hover, no press)
  "chipmute": ("src/components/configurator/styles.css", [
      ("        .configurator-preset-chip:hover {\n            --preset-chip-ink: var(--fill-hover);\n        }", "        .configurator-preset-chip:hover {\n        }"),
      ("    .configurator-preset-chip[data-press] {\n        --preset-chip-ink: calc(var(--fill-hover) + var(--fill-selected));", "    .configurator-preset-chip[data-press] {\n")]),
  # CK-12/CK-25: the pass-6 crest figures (1.02 wide, 1.05 bit; the command on the wide figure)
  "crest": ("src/styles/utilities/engage.css", [
      ("    :where(.engage-pressed, .engage-chosen.control-bit) {\n        --rung-crest: var(--scale-engage);", "    :where(.engage-chosen.control-bit) {\n        --rung-crest: 1.05;"),
      ("        --rung-crest: var(--scale-commit-pop);\n", "        --rung-crest: 1.02;\n")]),
  # CK-25: the switch thumb's press back on the press rung alone (pass 6)
  "thumb": ("src/components/switch/styles.css", [
      ("var(--foreground) calc((var(--fill-hover) + var(--fill-selected)) * 100%),", "var(--foreground) calc(var(--fill-selected) * 100%),")]),
  # P-1: the one reduce mechanism removed (the library's instant fallback's transition clock), with engage.css stating none
  "prmY": ("src/styles/utilities/a11y-overrides.css", [
      ("            animation-iteration-count: 1 !important;\n            transition-duration: 0s !important;\n", "            animation-iteration-count: 1 !important;\n")]),
  # CK-22: the Aurora root leg writes beside the consumer (the one-writer handoff removed)
  "writer": ("src/components/aurora/Aurora.vue", [
      ("    if (consumerDrives) return;\n    const r =", "    const r ="),
      ("    if (!consumerDrives) api.clearCursor();", "    api.clearCursor();")]),
}
f, subs = P[name]; src = os.path.join(wt, f); bak = os.path.join(wt, ".a7plant", name, f)
if op == "apply":
    os.makedirs(os.path.dirname(bak), exist_ok=True); shutil.copy2(src, bak)
    s = open(src).read()
    for a, b in subs:
        assert s.count(a) == 1, f"{name}: anchor not unique/absent: {a[:60]!r}"
        s = s.replace(a, b)
    open(src, "w").write(s); print(f"applied {name} on {f}")
else:
    shutil.copy2(bak, src); shutil.rmtree(os.path.join(wt, ".a7plant", name)); print(f"reverted {name} on {f}")
