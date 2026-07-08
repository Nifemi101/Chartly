import React, { useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ChartContainer,
  Line,
  LinearGradient,
  PolarChartContainer,
  PolarTooltip,
  Pie,
  Radar,
  RadarAxes,
  RadarGrid,
  StackedBar,
  Tooltip,
  useChartContext,
  XAxis,
  YAxis,
  stackSum,
  DEFAULT_STACK_COLORS,
} from "chartly";

type ChartKey = "line" | "bar" | "donut" | "stacked" | "radar";

const TABS: { key: ChartKey; label: string }[] = [
  { key: "line", label: "Line" },
  { key: "bar", label: "Bar" },
  { key: "donut", label: "Donut" },
  { key: "stacked", label: "Stacked" },
  { key: "radar", label: "Radar" },
];

// ---- Data for each demo ----

interface RevenueRow {
  label: string;
  value: number;
}
const lineData: RevenueRow[] = [
  { label: "Jan", value: 320 },
  { label: "Feb", value: 460 },
  { label: "Mar", value: 380 },
  { label: "Apr", value: 620 },
  { label: "May", value: 540 },
  { label: "Jun", value: 880 },
  { label: "Jul", value: 760 },
  { label: "Aug", value: 940 },
];

interface ProductRow {
  product: string;
  units: number;
}
const barData: ProductRow[] = [
  { product: "Widgets", units: 42 },
  { product: "Gadgets", units: 65 },
  { product: "Gizmos", units: 28 },
  { product: "Doohickeys", units: 51 },
  { product: "Phones", units: 54 },
];

interface ShareRow {
  category: string;
  revenue: number;
}
const donutData: ShareRow[] = [
  { category: "Laptops", revenue: 4180 },
  { category: "Phones", revenue: 3080 },
  { category: "Tablets", revenue: 1650 },
  { category: "Watches", revenue: 880 },
  { category: "Accessories", revenue: 1210 },
];
const donutColors = ["#5eead4", "#38bdf8", "#a78bfa", "#f472b6", "#fb923c"];
const donutTotal = donutData.reduce((sum, d) => sum + d.revenue, 0);

interface QuarterRow {
  month: string;
  laptops: number;
  phones: number;
  tablets: number;
}
type StackKey = "laptops" | "phones" | "tablets";
const stackedData: QuarterRow[] = [
  { month: "Jan", laptops: 120, phones: 80, tablets: 45 },
  { month: "Feb", laptops: 140, phones: 90, tablets: 55 },
  { month: "Mar", laptops: 110, phones: 100, tablets: 60 },
  { month: "Apr", laptops: 160, phones: 110, tablets: 65 },
  { month: "May", laptops: 180, phones: 130, tablets: 75 },
];
const stackKeys: StackKey[] = ["laptops", "phones", "tablets"];

interface PlayerRow {
  name: string;
  speed: number;
  power: number;
  defense: number;
  magic: number;
  agility: number;
}
const radarData: PlayerRow[] = [
  { name: "Alice", speed: 80, power: 70, defense: 60, magic: 85, agility: 75 },
  { name: "Bob", speed: 65, power: 90, defense: 75, magic: 40, agility: 60 },
];
const radarAxes: (keyof PlayerRow)[] = [
  "speed",
  "power",
  "defense",
  "magic",
  "agility",
];

// ---- Shared tooltip placement helper (clamps card inside chart bounds) ----

function useTooltipPlacement(
  x: number,
  y: number,
  cardWidth: number,
  cardHeight: number,
) {
  const { width, height, margin } = useChartContext();
  const gap = 12;

  const overflowsRight = x + gap + cardWidth > width - margin.right;
  const overflowsTop = y - cardHeight - gap < margin.top;

  let px = overflowsRight ? x - gap - cardWidth : x + gap;
  let py = overflowsTop ? y + gap : y - cardHeight - gap;

  px = Math.max(margin.left, Math.min(px, width - margin.right - cardWidth));
  py = Math.max(margin.top, Math.min(py, height - margin.bottom - cardHeight));

  return { px, py };
}

function CartesianTooltipCard({
  x,
  y,
  title,
  value,
  accent,
}: {
  x: number;
  y: number;
  title: string;
  value: string;
  accent: string;
}): React.JSX.Element {
  const cardWidth = 130;
  const cardHeight = 48;
  const { px, py } = useTooltipPlacement(x, y, cardWidth, cardHeight);

  return (
    <g transform={`translate(${px}, ${py})`}>
      <rect
        width={cardWidth}
        height={cardHeight}
        rx={8}
        fill="#0f172a"
        stroke="#334155"
      />
      <text x={14} y={20} fontSize={11} fill="#94a3b8">
        {title}
      </text>
      <text x={14} y={38} fontSize={13} fill={accent} fontWeight={600}>
        {value}
      </text>
    </g>
  );
}

function StackedTooltipCard({
  x,
  y,
  datum,
}: {
  x: number;
  y: number;
  datum: QuarterRow;
}): React.JSX.Element {
  const cardWidth = 150;
  const cardHeight = 30 + stackKeys.length * 16 + 10;
  const { px, py } = useTooltipPlacement(x, y, cardWidth, cardHeight);
  const total = stackKeys.reduce((sum, k) => sum + datum[k], 0);

  return (
    <g transform={`translate(${px}, ${py})`}>
      <rect
        width={cardWidth}
        height={cardHeight}
        rx={8}
        fill="#0f172a"
        stroke="#334155"
      />
      <text x={14} y={20} fontSize={11} fill="#94a3b8">
        {datum.month} · total {total}
      </text>
      {stackKeys.map((key, i) => (
        <text
          key={key}
          x={14}
          y={38 + i * 16}
          fontSize={11}
          fill={DEFAULT_STACK_COLORS[i % DEFAULT_STACK_COLORS.length]}
          fontWeight={600}
        >
          {key}: {datum[key]}
        </text>
      ))}
    </g>
  );
}

export default function HomeChartSwitcher(): React.JSX.Element {
  const [active, setActive] = useState<ChartKey>("line");

  return (
    <div className="w-full">
      <div
        className="mb-5 flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Chart type"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => setActive(tab.key)}
            className={
              active === tab.key
                ? "rounded-full border border-brand-strong bg-brand-strong px-4 py-2 text-sm font-bold text-bg"
                : "rounded-full border border-border bg-transparent px-4 py-2 text-sm font-bold text-muted transition-colors hover:border-brand hover:text-text"
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="h-[340px] w-full">
        {active === "line" && (
          <ChartContainer
            data={lineData}
            xKey="label"
            xScaleType="band"
            yKey="value"
            yScaleType="linear"
            margin={{ top: 20, right: 24, bottom: 34, left: 52 }}
          >
            <LinearGradient
              id="switcherLineFill"
              from="#5eead4"
              to="#38bdf8"
              fromOpacity={0.25}
              toOpacity={0.02}
            />
            <CartesianGrid
              stroke="#334155"
              strokeOpacity={0.75}
              dashArray="4 6"
            />
            <XAxis stroke="#64748b" textFill="#cbd5e1" />
            <YAxis stroke="#64748b" textFill="#cbd5e1" />
            <Area fill="url(#switcherLineFill)" curve="monotone" />
            <Line stroke="#5eead4" strokeWidth={2} curve="monotone" />
            <Tooltip<RevenueRow> indicatorStroke="#5eead4" dotFill="#5eead4">
              {({ x, y, datum }) => (
                <CartesianTooltipCard
                  x={x}
                  y={y}
                  title={datum.label}
                  value={String(datum.value)}
                  accent="#5eead4"
                />
              )}
            </Tooltip>
          </ChartContainer>
        )}

        {active === "bar" && (
          <ChartContainer
            data={barData}
            xKey="product"
            xScaleType="band"
            yKey="units"
            yScaleType="linear"
            margin={{ top: 20, right: 24, bottom: 34, left: 52 }}
          >
            <CartesianGrid
              stroke="#334155"
              strokeOpacity={0.75}
              dashArray="4 6"
            />
            <XAxis stroke="#64748b" textFill="#cbd5e1" />
            <YAxis stroke="#64748b" textFill="#cbd5e1" />
            <Bar fill="#38bdf8" fillOpacity={0.85} radius={4} />
            <Tooltip<ProductRow> indicatorStroke="#38bdf8" dotFill="#38bdf8">
              {({ x, y, datum }) => (
                <CartesianTooltipCard
                  x={x}
                  y={y}
                  title={datum.product}
                  value={`${datum.units} units`}
                  accent="#38bdf8"
                />
              )}
            </Tooltip>
          </ChartContainer>
        )}

        {active === "donut" && (
          <PolarChartContainer
            data={donutData}
            valueKey="revenue"
            innerRadius={70}
            padding={20}
          >
            <Pie<ShareRow>
              colors={donutColors}
              label={({ centroid, datum }) => {
                const percent = Math.round((datum.revenue / donutTotal) * 100);
                if (percent < 8) return null;
                return (
                  <text
                    x={centroid[0]}
                    y={centroid[1]}
                    textAnchor="middle"
                    dy="0.32em"
                    fontSize={12}
                    fontWeight={700}
                    fill="#0f172a"
                  >
                    {percent}%
                  </text>
                );
              }}
            />
            <PolarTooltip<ShareRow>>
              {({ datum, cx, cy }) => {
                const percent = Math.round((datum.revenue / donutTotal) * 100);
                return (
                  <foreignObject
                    x={cx - 65}
                    y={cy - 28}
                    width={130}
                    height={56}
                    style={{ pointerEvents: "none" }}
                  >
                    <div
                      style={{
                        background: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: 8,
                        padding: "6px 10px",
                        textAlign: "center",
                        color: "#f8fafc",
                        fontFamily: "inherit",
                      }}
                    >
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>
                        {datum.category}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700 }}>
                        ${datum.revenue.toLocaleString()} · {percent}%
                      </div>
                    </div>
                  </foreignObject>
                );
              }}
            </PolarTooltip>
          </PolarChartContainer>
        )}

        {active === "stacked" && (
          <ChartContainer
            data={stackedData}
            xKey="month"
            xScaleType="band"
            yKey="laptops"
            yScaleType="linear"
            yDomain={[0, stackSum(stackedData, stackKeys)]}
            margin={{ top: 20, right: 24, bottom: 34, left: 52 }}
          >
            <CartesianGrid
              stroke="#334155"
              strokeOpacity={0.75}
              dashArray="4 6"
            />
            <XAxis stroke="#64748b" textFill="#cbd5e1" />
            <YAxis stroke="#64748b" textFill="#cbd5e1" />
            <StackedBar
              keys={stackKeys}
              colors={DEFAULT_STACK_COLORS}
              radius={4}
            />
            <Tooltip<QuarterRow> indicatorStroke="#f8fafc" dotFill="#f8fafc">
              {({ x, y, datum }) => (
                <StackedTooltipCard x={x} y={y} datum={datum} />
              )}
            </Tooltip>
          </ChartContainer>
        )}

        {active === "radar" && (
          <PolarChartContainer data={radarData} padding={24}>
            <RadarGrid axesCount={radarAxes.length} rings={4} />
            <RadarAxes axes={radarAxes} />
            <Radar
              axes={radarAxes}
              rowIndex={0}
              fill="#5eead4"
              fillOpacity={0.25}
              stroke="#5eead4"
            />
            <Radar
              axes={radarAxes}
              rowIndex={1}
              fill="#38bdf8"
              fillOpacity={0.25}
              stroke="#38bdf8"
            />
            <PolarTooltip<PlayerRow>>
              {({ datum, cx, cy }) => (
                <foreignObject
                  x={cx - 70}
                  y={cy - 66}
                  width={140}
                  height={132}
                  style={{ pointerEvents: "none" }}
                >
                  <div
                    style={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: 8,
                      padding: "8px 10px",
                      color: "#f8fafc",
                      fontFamily: "inherit",
                      fontSize: 11,
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>
                      {datum.name}
                    </div>
                    {radarAxes.map((axis) => (
                      <div
                        key={axis as string}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            color: "#94a3b8",
                            textTransform: "capitalize",
                          }}
                        >
                          {axis}
                        </span>
                        <span>{datum[axis]}</span>
                      </div>
                    ))}
                  </div>
                </foreignObject>
              )}
            </PolarTooltip>
          </PolarChartContainer>
        )}
      </div>
    </div>
  );
}
