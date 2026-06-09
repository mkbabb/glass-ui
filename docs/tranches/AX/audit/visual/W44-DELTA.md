# AX.W44 — dark-mode semantic-token contrast · live-capture DELTA

The `.dark`-arm semantic tokens (success/warning/info/destructive foregrounds +
surfaces) fell below the WCAG AA contrast floor. W44 re-tuned them (token-first,
dark-arm-only, no component edits). Captured 2026-06-09 against
`localhost:5173/containers/notification` on chromium (π-lane Playwright).

## Captures

| viewport | light | dark |
|----------|-------|------|
| desktop 1280 | `W44-notification-desktop-light.png` | `W44-notification-desktop-dark.png` |

## Verdict

**PASS.** The semantic-tone surfaces (success/warning/info/destructive
notifications + their glyphs + body text) read legibly in the `.dark` arm with the
re-tuned foreground/surface tokens clearing the AA floor, while the light arm is
unchanged. `proof:dark-semantic-contrast` green (the device-free WCAG-ratio source
arm) + the π contrast-readback arm. The token fix re-resolves every semantic
surface library-wide from the cascade (no per-component patch).
