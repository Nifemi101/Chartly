import React from "react";
import {
  CartesianGrid,
  ChartContainer,
  StackedArea,
  Tooltip,
  XAxis,
  YAxis,
  stackSum,
} from "chartlyx";

const seriesColors = ["#38bdf8", "#5eead4", "#a78bfa"];

interface Row {
  month: string;
  desktop: number;
  mobile: number;
  tablet: number;
}

type StackKey = "desktop" | "mobile" | "tablet";

const data: Row[] = [
  { month: "Jan", desktop: 1400, mobile: 900, tablet: 320 },
  { month: "Feb", desktop: 1550, mobile: 1080, tablet: 380 },
  { month: "Mar", desktop: 1650, mobile: 1240, tablet: 410 },
  { month: "Apr", desktop: 1720, mobile: 1420, tablet: 450 },
  { month: "May", desktop: 1810, mobile: 1610, tablet: 490 },
  { month: "Jun", desktop: 1900, mobile: 1780, tablet: 520 },
  { month: "Jul", desktop: 2050, mobile: 1950, tablet: 560 },
];

const keys: StackKey[] = ["desktop", "mobile", "tablet"];

export default function StackedAreaChartExample(): React.JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: 16,
          justifyContent: "flex-end",
          padding: "0 8px 12px",
        }}
      >
        {keys.map((k, i) => (
          <div
            key={k}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "#cbd5e1",
              textTransform: "capitalize",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: seriesColors[i],
              }}
            />
            {k}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ChartContainer
          data={data}
          xKey="month"
          xScaleType="band"
          yKey="desktop"
          yScaleType="linear"
          yDomain={[0, stackSum(data, keys)]}
          margin={{ top: 20, right: 24, bottom: 34, left: 60 }}
        >
          <CartesianGrid stroke="#334155" strokeOpacity={0.75} dashArray="4 6" />
          <XAxis stroke="#64748b" textFill="#cbd5e1" />
          <YAxis
            stroke="#64748b"
            textFill="#cbd5e1"
            tickFormatter={(v) => `${(Number(v) / 1000).toFixed(1)}k`}
          />
          <StackedArea<Row>
            keys={keys}
            colors={seriesColors}
            curve="monotone"
            fillOpacity={0.35}
            stroke="#0a0a0a"
            strokeWidth={1}
          />
          <Tooltip<Row> indicatorStroke="#f8fafc" dotFill="#f8fafc">
            {({ x, y, datum }) => {
              const total = keys.reduce((s, k) => s + datum[k], 0);
              return (
                <g transform={`translate(${x + 12}, ${y - 92})`}>
                  <rect
                    width={170}
                    height={90}
                    rx={8}
                    fill="#0f172a"
                    stroke="#334155"
                  />
                  <text x={12} y={20} fontSize={11} fill="#94a3b8">
                    {datum.month} · total {total.toLocaleString()}
                  </text>
                  {keys.map((k, i) => (
                    <g key={k} transform={`translate(12, ${28 + i * 16})`}>
                      <rect
                        width={8}
                        height={8}
                        y={2}
                        rx={2}
                        fill={seriesColors[i]}
                      />
                      <text
                        x={14}
                        y={10}
                        fontSize={11}
                        fill="#e2e8f0"
                        style={{ textTransform: "capitalize" }}
                      >
                        {k}: {datum[k].toLocaleString()}
                      </text>
                    </g>
                  ))}
                </g>
              );
            }}
          </Tooltip>
        </ChartContainer>
      </div>
    </div>
  );
}
