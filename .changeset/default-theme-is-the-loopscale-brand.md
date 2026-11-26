---
"@getloopscale/ui": minor
---

The default theme is the LoopScale brand.

Every component now renders in the brand palette with no configuration: paper `#F4F3EF` and ink
`#16191A` in light, ink `#111415` and bone `#E7E6E0` in dark, and lime `#C4E34F` as the one brand
color. Text is Hanken Grotesk and code is JetBrains Mono, both self-hosted in the package. The
violet palette, the burnt sienna accent and the Geist fonts are gone.

What changes for an app that upgrades:

- `primary` is the brand color where it has to work as text: lime in dark, olive `#556B00` in light.
- `accent` is lime as a fill with ink text. It has no contrast as text on paper, so the `accent`
  badge is now a solid chip.
- `<Button>` is neutral by default. `variant="accent"` is the lime button, for the one highlighted
  action on a screen.
- The native scrollbar is neutral.
- `.bg-dotted-violet` and `.bg-dotted-violet-strong` are renamed `.bg-dotted-brand` and
  `.bg-dotted-brand-strong`.
- `styles.css` imports a new `base.css` with the element defaults. `:root` and `.dark` declare
  `color-scheme`, so native controls follow the theme.

Fixed along the way: `styles.css` and `styles-v3-legacy.css` wrapped the tokens in `hsl()`. The
tokens are complete colors, so the browser dropped those declarations and the body background,
text color, focus ring, selection and scrollbar colors never applied.
