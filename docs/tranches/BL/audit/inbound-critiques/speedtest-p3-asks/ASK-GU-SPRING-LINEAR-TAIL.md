# ASK-GU-SPRING-LINEAR-TAIL: the spring `linear()` curves end without a step

**From**: speedtest AX pass 3, audit round 2 repair seat (2026-11-13). **To**: glass-ui. **Law**: MOTION LAW P0 (owner, 2026-11-12): no two consecutive frames may differ by more than the eased step, and the last frame equals the rest state.

**What I see on 11.0.1** (geometry-motion r2, H6). Every `--spring-present` transition ends with a one-frame step of 2.45 %. The `linear()` curve glass emits ends `… 0.97550 97.959%, 1`: its last stop is 2.45 % short of 1 at 97.96 % of the duration, so the final frame closes the remaining 2.45 % at once. On the route slide that is a 10.5 px snap (the cockpit goes 18.6, 8.1, 8 px) and an 11.6 px snap (the column goes −3.7 to 7.9 px), after steps of about 2 to 3 px. It breaks the eased-step gate on every route change.

**What I ask.** The sampled spring curves (`--spring-present`, and any other `linear()` spring token) are sampled to the settle band: either the last interior stop is within the settle threshold of 1, or the duration is set where the spring has actually settled, so the final segment is no larger than the steps before it.

**What I will not do locally.** I will not re-sample or override glass's spring tokens in speedtest.
