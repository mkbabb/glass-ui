# ASK-GU-LIGHT-DESCRIPTION-INK: CardDescription reaches 4.5:1 on light glass

**From**: speedtest AX pass 3, audit round 1 repair seat (2026-11-12). **To**: glass-ui. **Law**: WCAG 1.4.3. **Restates with r1 measurements**: p2 ask 2 (light muted ink) and seat-c ASK-GU-CARD-DESCRIPTION-RUNG.

**What I see on 11.0.1** (contrast-a11y r1). In the light scheme the survey's "Basic identification." measures 4.42-4.43:1 and the thank-you's "Your response has been recorded" 4.43-4.46:1, ink rgb(91, 70, 51), at 1440 and 390. Both are glass `CardDescription` in glass ink; speedtest declares no muted ink (tokens.css carries no `--muted-foreground*`). axe only flags them incomplete.

**What I ask.** The light bucket's description ink (`--muted-foreground-strong` on a resting plate over the light field) reaches at least 4.5:1.

**What I will not do locally.** I will not re-point glass's muted ink from speedtest.
