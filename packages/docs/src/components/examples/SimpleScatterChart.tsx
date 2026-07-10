import React from "react";
import {
  CartesianGrid,
  ChartContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "chartlyx";

interface Row {
  age: number;
  income: number;
}

const data: Row[] = [
  { age: 22, income: 32 },
  { age: 26, income: 41 },
  { age: 28, income: 38 },
  { age: 31, income: 55 },
  { age: 34, income: 62 },
  { age: 37, income: 58 },
  { age: 39, income: 74 },
  { age: 42, income: 82 },
  { age: 45, income: 78 },
  { age: 48, income: 95 },
  { age: 52, income: 88 },
  { age: 55, income: 105 },
  { age: 58, income: 98 },
  { age: 62, income: 115 },
];

export default function SimpleScatterChart(): React.JSX.Element {
  return (
    <ChartContainer
      data={data}
      xKey="age"
      xScaleType="linear"
      yKey="income"
      yScaleType="linear"
      margin={{ top: 20, right: 24, bottom: 34, left: 52 }}
    >
      <CartesianGrid stroke="#334155" strokeOpacity={0.75} dashArray="4 6" />
      <XAxis stroke="#64748b" textFill="#cbd5e1" label="Age" />
      <YAxis
        stroke="#64748b"
        textFill="#cbd5e1"
        tickFormatter={(v) => `$${v}k`}
      />
      <Scatter fill="#5eead4" fillOpacity={0.75} radius={6} />
      <Tooltip<Row> indicatorStroke="#5eead4" dotFill="#5eead4">
        {({ x, y, datum }) => (
          <g transform={`translate(${x + 12}, ${y - 48})`}>
            <rect
              width={130}
              height={44}
              rx={8}
              fill="#0f172a"
              stroke="#334155"
            />
            <text x={12} y={20} fontSize={11} fill="#94a3b8">
              Age {datum.age}
            </text>
            <text x={12} y={36} fontSize={13} fill="#5eead4" fontWeight={600}>
              ${datum.income}k / yr
            </text>
          </g>
        )}
      </Tooltip>
    </ChartContainer>
  );
}
