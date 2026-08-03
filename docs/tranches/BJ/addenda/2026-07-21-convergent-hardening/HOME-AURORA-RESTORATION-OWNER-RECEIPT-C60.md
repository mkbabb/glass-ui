# Home Aurora restoration owner receipt — C60

Date: 2026-07-22 EDT  
Phase: **Browser/design formation only**  
Verdict: **CURRENT OPTICAL-BENCH HERO REJECTED · RESTORE THE EXISTING AURORA LANGUAGE**

## Owner evidence

The owner-provided desktop screenshot, SHA-256
`d9f02bbf3f7a339fc87b90c1b5cb7657ce2eb74a20100d5698928995fbd59dd0`,
shows the Home hero as a long chromatic ellipse plus a detached mustard square
over a flat brown/paper field. The owner explicitly asks what happened to the
Home background Aurora and rejects this composition.

Two fresh independent coarse-mobile Browser runs reproduce it:

| assay | artifact | SHA-256 |
| --- | --- | --- |
| A | `evidence/browser-assay-a/home-atmosphere-coarse-mobile-a4.jpg` | `3286d1edf92350131585a638539358903e283bac5a3ea6938c182dfb8f982607` |
| B late stable | `evidence/browser-assay-b/home-atmosphere-coarse-mobile-b4-late.jpg` | `cc22b75592b89e8ce16197be90f610f738d4cba3e619f40a6c36a21d4abc8219` |

Assay B's +900 ms frame, SHA-256
`e5b99a482fe5241104a52d0491778f36060e8e8d9915bed69f487a614cbed45f`,
still clips much of the hero/card text; the late frame recovers after another
two seconds. That frame is a reveal/intermediate witness, not the stable Home
identity.

## Exact source mechanism

Clean committed source at Glass HEAD
`0371836dfeeb3b7982250d612f93b5347a1d29d4`:

| file | SHA-256 |
| --- | --- |
| `demo/chassis/landing/CatalogLanding.vue` | `ef0681a4ba94dbfe68cfee8c200b9eb0075bceab2f2d973218f7fcffafe2b1ea` |
| `demo/chassis/landing/SectionPreviewCard.vue` | `8f5444486dad7e7ac51396637b2c39f37edc286fe825858e323764b29633212c` |
| `demo/chassis/hero/StoryHero.vue` | `711459f15c6c09c2ed0109cf9e0e4a45edfe4963b884a63334b72e2949def0df` |
| `demo/chassis/hero/aurora-hero.ts` | `8e84f84100be7d0c5552f13a307f8d8d39ceea6cfcd6a3fa8784f98e557f3e48` |

`CatalogLanding.vue` explicitly sets `StoryHero background="paper"`, imports
`WatercolorDot`, and hand-authors `.optical-bench-meniscus` as a large gradient
ellipse. It imports no Aurora. Every category card receives an `identity` tile,
which repeats the category title inside a large quiet preview before repeating
the title and blurb below. The observed page is therefore faithful to source;
the missing Aurora is not a transient WebGL failure.

## Binding design disposition

- Restore the Home's living background through the existing Aurora component,
  existing hero configuration, and public lifecycle/PRM seams. Do not author a
  second renderer or a Home-only shader.
- Remove/fold the optical meniscus + detached dot composition rather than
  preserving it as another signature layer above Aurora.
- Thin or replace title-only identity tiles with meaningful, non-interactive
  category previews. A large empty preview plus duplicate title does not satisfy
  the visual-language assay's subject thesis/job requirement.
- Preserve the warm scientific paper, restrained chroma, readable cards, and
  lightest-sufficient Glass tier. Aurora is the living underlay, not permission
  for glass-on-glass noise.
- Mobile and desktop proof must show full-width efficient cards, no horizontal
  clipping, stable text through reveal, one purposeful chroma event, PRM
  terminal parity, and no extra WebGL contexts per card.

This binds to existing Aurora, StoryHero, SectionPreviewCard keep/thin, and
Home composition owners. It creates no new component, engine, or tranche row.

No product, source, test, gate, package, lock, repin, or acceptance change is
authorized by this owner receipt.
