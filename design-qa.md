# Design QA — Hero background

- Source visual truth: user-provided watch hero screenshots in the conversation; primary desktop reference approximately 1536 × 787 px.
- Implementation screenshots: `.taste-skill/hero-background-desktop.jpg`, `.taste-skill/hero-background-tablet.jpg`, and `.taste-skill/hero-background-mobile.jpg`.
- Desktop capture: 1536 × 900 CSS px, device scale factor 1.
- Tablet capture: 900 × 900 CSS px, device scale factor 1.
- Mobile capture: 390 × 844 CSS px, device scale factor 1.
- State: home page at the top, hero fully visible on desktop and tablet; mobile viewport captures the top of the taller responsive hero.
- Density normalization: source and desktop implementation were compared at the same 1536 px viewport width. The implementation includes the existing site header and benefit strip outside the reference crop.

## Full-view comparison evidence

The desktop implementation now follows the source composition: an organic black field carries the copy on the left, a second black field enters from the right, and a white concave channel frames the product watch between them. The watch remains above the background and the lower black benefit strip reads as a continuous base.

The tablet capture preserves the same composition without crowding the copy. The mobile layout intentionally retains its earlier single-black-field treatment because compressing both background lobes into 390 px would place the white channel beneath the text and reduce contrast.

Focused region comparison was not required: the requested change is a single large background silhouette, clearly readable in the full hero capture; the existing product cutout, text, button, and benefit strip were not changed.

## Required fidelity surfaces

- Fonts and typography: existing ATELIER 12 serif display and sans-serif support type are unchanged; hierarchy and wrapping remain consistent with the approved site.
- Spacing and layout rhythm: the white product channel is wide enough for the watch, the right black field begins after the dial, and no responsive viewport has horizontal overflow.
- Colors and visual tokens: the generated background uses the established black-and-white palette; no new accent colors were introduced.
- Image quality and asset fidelity: a dedicated 1832 × 858 px raster background is used instead of a CSS approximation. The existing transparent watch cutout remains sharp and visually separated from the background.
- Copy and content: all existing hero copy, navigation, CTA, and benefit text are unchanged.

## Interaction and responsive checks

- Desktop, tablet, and mobile routes load successfully.
- The hero CTA and existing navigation remain unchanged.
- Horizontal overflow: none at 1536 px, 900 px, or 390 px.
- Browser console errors: none across all three captures.

## Findings

No actionable P0, P1, or P2 mismatch remains for the requested background change.

## Comparison history

- Initial generated asset: white center channel was too narrow and would have placed the watch over both black fields.
- Fix: widened the channel to roughly one fifth of the hero and moved the right black field farther right.
- Post-fix evidence: desktop and tablet captures show the complete watch framed by white space with black fields visible on both sides.

## Follow-up polish

No blocking polish items.

final result: passed
