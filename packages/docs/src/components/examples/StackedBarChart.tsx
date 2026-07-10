import React from "react";
import {
  CartesianGrid,
  ChartContainer,
  DEFAULT_STACK_COLORS,
  StackedBar,
  Tooltip,
  XAxis,
  YAxis,
  stackSum,
} from "chartlyx";

interface Row {
  month: string;
  laptops: number;
  phones: number;
  tablets: number;
}

type StackKey = "laptops" | "phones" | "tablets";

const data: Row[] = [
  { month: "Jan", laptops: 120, phones: 80, tablets: 45 },
  { month: "Feb", laptops: 140, phones: 90, tablets: 55 },
  { month: "Mar", laptops: 110, phones: 100, tablets: 60 },
  { month: "Apr", laptops: 160, phones: 110, tablets: 65 },
  { month: "May", laptops: 180, phones: 130, tablets: 75 },
  { month: "Jun", laptops: 200, phones: 150, tablets: 85 },
];

const keys: StackKey[] = ["laptops", "phones", "tablets"];

export default function StackedBarChartExample(): React.JSX.Element {
  return (
    <ChartContainer
      data={data}
      xKey="month"
      xScaleType="band"
      yKey="laptops"
      yScaleType="linear"
      yDomain={[0, stackSum(data, keys)]}
      margin={{ top: 20, right: 24, bottom: 34, left: 52 }}
    >
      <CartesianGrid stroke="#334155" strokeOpacity={0.75} dashArray="4 6" />
      <XAxis stroke="#64748b" textFill="#cbd5e1" />
      <YAxis stroke="#64748b" textFill="#cbd5e1" />
      <StackedBar<Row>
        keys={keys}
        colors={DEFAULT_STACK_COLORS}
        radius={4}
      />
      <Tooltip<Row> indicatorStroke="#f8fafc" dotFill="#f8fafc">
        {({ x, y, datum }) => {
          const total = keys.reduce((s, k) => s + datum[k], 0);
          return (
            <g transform={`translate(${x + 12}, ${y - 92})`}>
              <rect
                width={160}
                height={90}
                rx={8}
                fill="#0f172a"
                stroke="#334155"
              />
              <text x={12} y={20} fontSize={11} fill="#94a3b8">
                {datum.month} · total {total}
              </text>
              {keys.map((k, i) => (
                <text
                  key={k}
                  x={12}
                  y={38 + i * 16}
                  fontSize={11}
                  fill={DEFAULT_STACK_COLORS[i]}
                  fontWeight={600}
                >
                  {k}: {datum[k]}
                </text>
              ))}
            </g>
          );
        }}
      </Tooltip>
    </ChartContainer>
  );
}
