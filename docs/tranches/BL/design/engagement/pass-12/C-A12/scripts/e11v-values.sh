# C-A12: the travel's value family past H12's enumeration (sourced by run.sh). Easings: case, linear() with a stop, steps with a
# jump term, a step keyword, a cubic-bezier with x out of range and steps(0) (both refused by the engine), a comment, a var() fallback,
# inherit (computes to nothing on <html>), linear. Settles: case, exponent, sign, calc() sums and products, max() and clamp(), an
# infinite calc, a comment, a two-value list, -0s, 1 ms, a bare 210.
export C12_EASINGS='["EASE-IN-OUT","linear(0, 0.4 30%, 1)","steps(2, jump-none)","step-end","cubic-bezier(1.5, 0, 0, 1)","steps(0)","ease /* c */","var(--u, ease-out)","inherit","linear"]'
export C12_SETTLES='["210MS","2.1e2ms","+0.21s","calc(0.1s + 110ms)","calc(105ms * 2)","max(210ms, 0.1s)","clamp(100ms, 210ms, 1s)","calc(infinity * 1s)","/* c */ 210ms","0.21s 0.1s","-0s","1e-3s","210"]'
