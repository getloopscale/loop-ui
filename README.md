# @getloopscale/ui

The LoopScale design system: the brand tokens and the generic React components and primitives
that form the non-AI foundation of the LoopScale UI stack. Apache-2.0, ESM-only.

This is the layer with **no agent in it**: the shell, the tables, the forms, the feedback states,
the dashboard pieces. [`@theokit/ui`](https://github.com/usetheokit/theokit-ui) builds on top of it
with the agent surfaces (chat threads, tool calls, approval cards) and shares the same tokens, so
the two compose without a visual seam.

**Rule of thumb:** if the component would exist in an app with no agent in it, it belongs here.

## Install

```bash
pnpm add @getloopscale/ui
```

Or copy a single component, shadcn-style, from the published registry:

```bash
npx shadcn@latest add https://getloopscale.github.io/ui/r/data-table.json
```

## Catalog

<!-- BEGIN:catalog -->

**87 components** — 45 primitives + 42 composites.

### Primitives (45)

`ActionBar` · `Alert` · `Avatar` · `Badge` · `Breadcrumb` · `Button` · `Card` · `Checkbox` · `Combobox` · `CopyButton` · `DangerZone` · `DescriptionList` · `Dialog` · `DropdownMenu` · `EmptyState` · `FileDropzone` · `FormField` · `Input` · `JsonViewer` · `Label` · `LoginSplit` · `MetricsPanel` · `Pagination` · `PinInput` · `PlanBadge` · `Progress` · `RadioGroup` · `ScrollArea` · `Select` · `Sheet` · `Sidebar` · `Skeleton` · `Slider` · `SocialAuthRow` · `StatTile` · `StatusDot` · `Switch` · `Table` · `Tabs` · `Textarea` · `Timestamp` · `Toast` · `Tooltip` · `Topnav` · `UpdateBanner`

### Composites (42)

`AccountMenu` · `AnnotationInput` · `AnnotationSummaryGroup` · `AttributesTable` · `ChatMessageCard` · `CodeBlock` · `CommandPalette` · `CommentThread` · `ConfirmDialog` · `DataTable` · `DatasetItemDiff` · `DeploymentRow` · `DiffView` · `DomainConfig` · `EnvVarEditor` · `EvaluatorForm` · `Histogram` · `IoCards` · `MessageBranchSelector` · `MetricCard` · `PageShell` · `PercentileChart` · `PreviewEnvCard` · `PriceBreakdown` · `ProjectCard` · `PromptTemplateEditor` · `PromptVersionDiff` · `RollbackUi` · `SessionSummary` · `SessionTimeline` · `SeverityBadge` · `SpanGraph` · `SpanTree` · `SpanWaterfall` · `StatusIndicator` · `Stepper` · `TagInput` · `TaskHeader` · `TokenCostBreakdown` · `TraceCompare` · `TraceTranscript` · `TrendChart`

<!-- END:catalog -->

Generated from `src/components/` by `pnpm sync:readme` — do not edit the block above by hand.

## Theming

The default theme is the LoopScale brand. There is nothing to configure: import the stylesheet and
the components render in it.

```css
@import "@getloopscale/ui/styles.css";
```

| | Light | Dark |
| --- | --- | --- |
| Background | paper `#F4F3EF` | ink `#111415` |
| Raised surface | `#FBFAF7` | `#181C1D` |
| Border | `#DCDAD3` | `#2A3032` |
| Text | ink `#16191A` | bone `#E7E6E0` |
| Secondary text | `#5A615F` | `#9BA29F` |
| Brand color as text, link and focus (`primary`) | `#556B00` | lime `#C4E34F` |
| Brand color as a fill (`accent`, ink text on top) | lime `#C4E34F` | lime `#C4E34F` |

Light is the default. Put `class="dark"` on `<html>`, or on any ancestor, for the dark theme.

Three rules come with the palette:

- The default button is neutral. Lime is for the logo, links, focus and one highlighted action per
  screen, which is `<Button variant="accent">`.
- Lime has no contrast on paper, so `accent` is a fill only. Text in the brand color uses `primary`.
- Lime sits between the warning yellow and the success green. A status always carries a text label
  next to its color.

Text is Hanken Grotesk and code is JetBrains Mono. Both ship self-hosted in the package under the
SIL Open Font License; `@getloopscale/ui/fonts-cdn.css` loads them from Google Fonts instead.

`tests/brand-tokens.test.ts` pins these values and checks that every text pair reaches 4.5:1.

`@theokit/ui` uses the same token names, so the theme applies to both packages.

## Development

```bash
pnpm install
pnpm dev              # Ladle catalog
pnpm test
pnpm typecheck
pnpm lint
pnpm build
pnpm sync:readme      # regenerate the catalog block above
pnpm registry:build   # rebuild registry/r/*.json for the shadcn path
```

> Seeded from `loopscale-ui` @ `2b46eca` (2026-07-03, AI-exclusive pivot milestone M-B).
