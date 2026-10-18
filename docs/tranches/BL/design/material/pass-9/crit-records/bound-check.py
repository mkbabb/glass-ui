# The floating rung's alpha per theme on floor v8, from tokens/glass.css:256-283 (the bound) with the inputs
# color-radius.css:83 / dark-arm.css:95 (--card-l), on-glass-fg.css:35 / dark-arm.css:310 (--on-glass-muted-l),
# glass.css:42 (--glass-ink-target 4.8), glass.css:43 / dark-arm.css:273 (--glass-bound-ground 0 / 1).
def bound(card_l, ink_l, ground, target=4.8):
    iy, py = ink_l ** 3, card_l ** 3
    need = (1 - ground) * (target * (iy + 0.05) - 0.05) + ground * ((iy + 0.05) / target - 0.05)
    E = lambda y: 1.055 * y ** (1 / 2.4) - 0.055
    return max(0, min(1, (E(need) - ground) / (E(py) - ground)))
L, D = bound(0.9799, 0.4811, 0), bound(0.2949, 0.7904, 1)
print(f"--glass-veil-floating = --glass-bound: light {L:.4f}, dark {D:.4f} (T {1-L:.3f} / {1-D:.3f}; Reg P8-4 Q-3: 0.110 / 0.125)")
print(f"alpha at --glass-level 0.3 (a11y-fallback): light {1-(1-L)*0.3:.4f}, dark {1-(1-D)*0.3:.4f}")
