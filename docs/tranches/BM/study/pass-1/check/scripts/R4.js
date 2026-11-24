
(() => {
  const ua = navigator.userAgent;
  const safari = (ua.match(/Version\/([\d.]+)/) || [])[1];
  const ios = ua.match(/OS (\d+)_(\d+)(?:_(\d+))?/);
  document.getElementById("env").textContent =
    (safari ? "Safari " + safari : "Browser: " + (ua.match(/(Chrome|Firefox)\/[\d.]+/) || ["unknown"])[0]) +
    (ios ? " · iOS " + ios[1] + "." + ios[2] + (ios[3] ? "." + ios[3] : "") : "");
  const shapeOK = window.CSS && CSS.supports && CSS.supports("clip-path", "shape(from 0px 0px, line to 10px 10px, close)");
  document.getElementById("clipkind").textContent = shapeOK ? "a drawn shape (shape())" : "a path (path()), since this browser has no shape()";

  const lerp = (a, b, t) => a + (b - a) * t;
  const R = 28, H = 56;
  // geometry at progress t: 0 joined (one 220-wide bar), 1 split (bar 152 wide, seat 24 px away)
  const geo = (t) => ({ barEnd: lerp(164, 152, t), seat: lerp(164, 176, t), rr: R * t });
  const corners = (el, l, w, tl, tr, br, bl) => {
    el.style.left = l + "px"; el.style.width = w + "px";
    el.style.borderRadius = `${tl}px ${tr}px ${br}px ${bl}px`;
  };

  // B: one clip, written as commands then serialised as shape() or path()
  const rrect = (x0, x1, rl, rr) => [
    ["M", x0 + rl, 0], ["L", x1 - rr, 0], ["A", rr, x1, rr], ["L", x1, H - rr], ["A", rr, x1 - rr, H],
    ["L", x0 + rl, H], ["A", rl, x0, H - rl], ["L", x0, rl], ["A", rl, x0 + rl, 0], ["Z"]];
  const neck = (xa, xb, t) => {
    const s = Math.max(0, 1 - t / 0.9), w = R * Math.pow(1 - t, 1.2), m = (xa + xb) / 2, e = (m - xa) * 0.35, d = 16;
    const y = (v) => R + (v - R) * s; // the whole neck thins toward the midline as it parts
    return [["M", xa, y(0)], ["C", xa + d, y(0), m - e, y(R - w), m, y(R - w)], ["C", m + e, y(R - w), xb - d, y(0), xb, y(0)],
      ["L", xb, y(H)], ["C", xb - d, y(H), m + e, y(R + w), m, y(R + w)], ["C", m - e, y(R + w), xa + d, y(H), xa, y(H)], ["Z"]];
  };
  const toPath = (cmds) => "path('" + cmds.map((c) => {
    if (c[0] === "A") return c[1] > 0.01 ? `A ${c[1]} ${c[1]} 0 0 1 ${c[2]} ${c[3]}` : `L ${c[2]} ${c[3]}`;
    return c.join(" ");
  }).join(" ") + "')";
  const toShape = (cmds) => {
    const out = []; let first = true;
    for (const c of cmds) {
      if (c[0] === "M") { out.push(first ? `from ${c[1]}px ${c[2]}px` : `move to ${c[1]}px ${c[2]}px`); first = false; }
      else if (c[0] === "L") out.push(`line to ${c[1]}px ${c[2]}px`);
      else if (c[0] === "A") out.push(c[1] > 0.01 ? `arc to ${c[2]}px ${c[3]}px of ${c[1]}px cw` : `line to ${c[2]}px ${c[3]}px`);
      else if (c[0] === "C") out.push(`curve to ${c[5]}px ${c[6]}px with ${c[1]}px ${c[2]}px / ${c[3]}px ${c[4]}px`);
      else out.push("close");
    }
    return "shape(" + out.join(", ") + ")";
  };

  const draw = {
    a(t) { const g = geo(t);
      corners(document.getElementById("a1"), 0, g.barEnd, R, g.rr, g.rr, R);
      corners(document.getElementById("a2"), g.seat, 56, g.rr, R, R, g.rr); },
    b(t) { const g = geo(t);
      const cmds = [...rrect(0, g.barEnd, R, g.rr), ...rrect(g.seat, g.seat + 56, g.rr, R), ...neck(g.barEnd - R, g.seat + R, t)];
      document.getElementById("b1").style.clipPath = shapeOK ? toShape(cmds) : toPath(cmds); },
    c(t) { const g = geo(t);
      corners(document.getElementById("c1"), 0, lerp(220, 152, t), R, R, R, R);
      const seat = document.getElementById("c2");
      corners(seat, g.seat, 56, R, R, R, R);
      seat.style.opacity = String(Math.min(1, t / 0.35)); },
  };
  const state = {};
  for (const k of ["a", "b", "c"]) { state[k] = { t: 0, raf: 0 }; draw[k](0); }

  // glass-ui's dock spring (response 0.3 s, damping 0.88), from rest, with a Slow ×4 option
  let slow = false;
  const springPos = (tau, resp, z) => {
    const w0 = 2 * Math.PI / resp, wd = w0 * Math.sqrt(1 - z * z), e = Math.exp(-z * w0 * tau);
    return 1 - e * (Math.cos(wd * tau) + (z * w0 / wd) * Math.sin(wd * tau));
  };
  const run = (k, target) => {
    const s = state[k]; cancelAnimationFrame(s.raf);
    const from = s.t, resp = 0.3 * (slow ? 4 : 1), t0 = performance.now();
    const step = (now) => {
      const tau = (now - t0) / 1000, p = springPos(tau, resp, 0.88);
      s.t = from + (target - from) * p;
      draw[k](Math.max(0, Math.min(1, s.t)));
      if (tau < resp * 1.4) s.raf = requestAnimationFrame(step);
      else { s.t = target; draw[k](target); }
    };
    s.raf = requestAnimationFrame(step);
  };
  document.querySelectorAll("button[data-for]").forEach((b) => b.addEventListener("click", () => {
    const k = b.dataset.for, split = b.textContent === "Split";
    b.textContent = split ? "Join" : "Split";
    run(k, split ? 1 : 0);
  }));
  document.getElementById("slow").addEventListener("click", (e) => {
    slow = e.currentTarget.getAttribute("aria-pressed") !== "true";
    e.currentTarget.setAttribute("aria-pressed", String(slow));
  });
})();
