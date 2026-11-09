# Design QA

## Evidence

- Source visual truth path: `conversation://hero-reference-second-screenshot`.
- Source dimensions: `544 × 317 px` as displayed in the attached reference; source density metadata is unavailable.
- Desktop implementation screenshot: `.taste-skill/hero-showcase-v2/desktop-fold.jpg`.
- Mobile implementation screenshot: `.taste-skill/hero-showcase-v2/mobile-fold.jpg`.
- Desktop viewport and pixels: `1440 × 900 CSS px`, `1440 × 900 px`, device scale factor `1`.
- Mobile viewport and pixels: `390 × 844 CSS px`, `390 × 844 px`, device scale factor `1`.
- Density normalization: the reference is a smaller desktop composition, so comparison used normalized section proportions, focal placement, contrast, and crop rather than direct pixel overlay.
- State: home page on initial load, desktop navigation visible, mobile navigation closed.

## Full-view comparison

The implementation follows the selected reference's primary composition: a restrained white page frame, a dominant asymmetric black hero surface, concise left-aligned copy, and an isolated vertical skeleton watch crossing from the black field into white negative space. The existing ATELIER 12 header and three service promises remain intact as required product structure.

## Focused region comparison

The hero was inspected separately at desktop and mobile sizes. Typography, watch scale, alpha edges, panel curvature, button contrast, and the handoff into the benefit strip are clearly readable in the focused captures. The generated watch uses a clean transparent edge with no logo, text, or placeholder treatment.

## Required fidelity surfaces

- Fonts and typography: existing Cormorant Garamond and Inter system preserved; headline holds to two lines at both tested widths.
- Spacing and layout rhythm: wide left text field, strong right-side object focus, and deliberate white release around the watch match the reference direction.
- Colors and tokens: black, white, rose-gold, and muted gray keep the premium monochrome system while introducing the reference's warmer product focal point.
- Image quality: `images/hero-skeleton-cutout.png` is a project-local transparent PNG with a full commercial product render and clean alpha.
- Copy and content: existing Russian headline, supporting text, CTA, navigation, and service promises are preserved.

## Findings

No actionable P0, P1, or P2 findings remain.

- P3: the source places navigation inside the black hero, while the implementation retains the established white site header to preserve navigation consistency across all pages.

## Comparison history

1. First capture: the headline wrapped to three lines and automated inspection treated the copy as white-on-white because the black shape was a sibling surface. Classified as P2.
2. Fix: widened and balanced the headline measure, and assigned the same black surface to the copy container without changing the visible composition.
3. Post-fix evidence: `.taste-skill/hero-showcase-v2/desktop-fold.jpg` and `.taste-skill/hero-showcase-v2/mobile-fold.jpg`; headline holds to two lines, contrast passes, and visual inspection reports zero failures.

## Final result

passed
