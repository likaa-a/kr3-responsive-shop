# Design QA — Hero background

- Source visual truth: user-provided watch hero screenshots in the conversation; primary desktop reference approximately 1536 × 787 px.
- Current implementation screenshot: `.taste-skill/hero-exact-aligned.jpg` (1440 × 900 CSS px, device scale factor 1). The previous generated-background captures below are historical and have been superseded.
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
- Image quality and asset fidelity: the rejected raster background has been replaced with two precise SVG background curves embedded in CSS. Their narrow white channel is centered on the watch at 71.5% of the hero width. The existing transparent watch image is fully visible at a smaller scale; its floating animation and shadow are disabled on desktop to preserve alignment.
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
- User correction: the generated background was rejected. Replaced the contours, reduced the product and text, and matched the white filled CTA to the supplied reference. Initial browser inspection identified a local SVG MIME issue, resolved by embedding the SVG in CSS; a second inspection corrected horizontal alignment of the curves. Final evidence: `.taste-skill/hero-exact-aligned.jpg` shows both black areas meeting the top and bottom of the strap, with white space opening above and below the watch. Browser console errors: none.

## Follow-up polish

No blocking polish items.

final result: passed
