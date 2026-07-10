import React from "react";
import {
  Bar,
  CartesianGrid,
  ChartContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "chartlyx";

interface Row {
  product: string;
  units: number;
}

const data: Row[] = [
  { product: "Widgets", units: 42 },
  { product: "Gadgets", units: 65 },
  { product: "Gizmos", units: 28 },
  { product: "Doohickeys", units: 51 },
  { product: "Phones", units: 54 },
  { product: "Tablets", units: 38 },
];

export default function SimpleBarChart(): React.JSX.Element {
  return (
    <ChartContainer
      data={data}
      xKey="product"
      xScaleType="band"
      yKey="units"
      yScaleType="linear"
      margin={{ top: 20, right: 24, bottom: 34, left: 52 }}
    >
      <CartesianGrid stroke="#334155" strokeOpacity={0.75} dashArray="4 6" />
      <XAxis stroke="#64748b" textFill="#cbd5e1" />
      <YAxis stroke="#64748b" textFill="#cbd5e1" />
      <Bar fill="#38bdf8" fillOpacity={0.85} radius={4} />
      <Tooltip<Row> indicatorStroke="#38bdf8" dotFill="#38bdf8">
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
              {datum.product}
            </text>
            <text x={12} y={36} fontSize={13} fill="#38bdf8" fontWeight={600}>
              {datum.units} units
            </text>
          </g>
        )}
      </Tooltip>
    </ChartContainer>
  );
}
