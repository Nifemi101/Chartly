import React from "react";
import { PolarChartContainer, Pie, PolarTooltip } from "chartlyx";

interface Row {
  category: string;
  revenue: number;
}

const data: Row[] = [
  { category: "Laptops", revenue: 4180 },
  { category: "Phones", revenue: 3080 },
  { category: "Tablets", revenue: 1650 },
  { category: "Watches", revenue: 880 },
  { category: "Accessories", revenue: 1210 },
];

const colors = ["#5eead4", "#38bdf8", "#a78bfa", "#f472b6", "#fb923c"];
const total = data.reduce((sum, d) => sum + d.revenue, 0);

export default function DonutChart(): React.JSX.Element {
  return (
    <PolarChartContainer
      data={data}
      valueKey="revenue"
      innerRadius={70}
      padding={20}
    >
      <Pie<Row>
        colors={colors}
        stroke="#0a0a0a"
        strokeWidth={2}
        label={({ centroid, datum }) => {
          const percent = Math.round((datum.revenue / total) * 100);
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
      <PolarTooltip<Row>>
        {({ datum, cx, cy }) => {
          const percent = Math.round((datum.revenue / total) * 100);
          return (
            <foreignObject
              x={cx - 70}
              y={cy - 30}
              width={140}
              height={60}
              style={{ pointerEvents: "none" }}
            >
              <div
                style={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: 8,
                  padding: "8px 12px",
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
  );
}
