# Changelog

All notable changes to **Chartlyx** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Everything below is in the current source tree but has not yet been published
to npm. Version stays at `0.0.0` in `package.json` until the first release.

### Added

#### Cartesian charts
- `ChartContainer` — measures its parent via `ResizeObserver`, builds x/y
  scales, resolves accessor functions, and provides everything to descendants
  through React context.
- `Line`, `Area`, `Bar`, `Scatter` — single-series shapes with a shared
  render-prop `label` pattern, per-shape `y` / `yKey` overrides, and
  configurable `curve` (`linear` / `monotone` / `step`) where applicable.
- `StackedBar`, `StackedArea` — multi-series stacked variants backed by
  `d3-shape.stack()`, with top-only corner radius on `StackedBar`.
- Composed charts via per-shape `y` accessor override — multiple shapes as
  siblings inside one `ChartContainer` each plotting a different column.

#### Axes & grid
- `XAxis`, `YAxis` — configurable tick count, tick formatter, axis title
  (rotated `-90°` on YAxis), and separate `stroke` / `textFill` / `labelFill`
  colors for dark-theme flexibility.
- `CartesianGrid` — horizontal and/or vertical guide lines with dashed
  default styling.

#### Polar charts
- `PolarChartContainer` — separate polar coordinate system (`cx`, `cy`,
  `radius`, `innerRadius`) with its own React context and `activeIndex`
  hover state.
- `Pie` — pie and donut variants (via `innerRadius`) with a `centroid`-aware
  label render prop.
- `Radar`, `RadarGrid`, `RadarAxes` — multi-series radar / spider charts
  with per-series `rowIndex`, `showPoints`, and configurable `maxValue`.
- `PolarTooltip` — hover tooltip driven by container `activeIndex` state.

#### Interaction
- `Tooltip` — nearest-point hover using `d3-array`'s `bisector`
  (`O(log n)` on linear / time scales; `O(n)` pixel-distance fallback on
  band scales).

#### Styling helpers
- `LinearGradient` — convenience wrapper for SVG `<defs>` gradients.
- `Legend` — standalone SVG legend with color chips, row / column layout.

#### Utility exports
- `stackSum(data, keys)` — max accumulated total for stacked-chart y-domains.
- `pickColor(colors, i)` — cycles through a palette safely.
- `DEFAULT_STACK_COLORS` — 6-color default palette.
- `DEFAULT_MARGIN`, `VERSION` — sensible defaults and version string.

#### Types
- Full TypeScript generics on every component, hook, and render prop.
- `KeysOfType<T, V>` utility type constrains `yKey`, `valueKey`, stack `keys`,
  and radar `axes` props to fields of the correct value type at compile time.
- All prop, context, render-prop, and utility types are re-exported.

#### Package
- Ships in both ESM and CommonJS with full `.d.ts` declarations.
- React 18 / 19 as a peer dependency (not bundled).
- `d3-array`, `d3-scale`, `d3-shape` as runtime dependencies.

### Notes
- Package renamed from `chartly` to `chartlyx` because the shorter name was
  already taken on npm. The repo folder is still `packages/chartly`.
- 63+ passing tests across scales, shapes, axes, interaction, and polar
  primitives.

---

_This file will get a `[0.1.0]` entry (or similar) on the first published
release, and every version after that gets its own dated section._
