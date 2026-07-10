import React from "react";
import {
  Bar,
  CartesianGrid,
  ChartContainer,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "chartlyx";

interface Row {
  month: string;
  revenue: number;
  runningAvg: number;
}

const data: Row[] = [
  { month: "Jan", revenue: 320, runningAvg: 320 },
  { month: "Feb", revenue: 460, runningAvg: 390 },
  { month: "Mar", revenue: 380, runningAvg: 386 },
  { month: "Apr", revenue: 620, runningAvg: 445 },
  { month: "May", revenue: 540, runningAvg: 464 },
  { month: "Jun", revenue: 880, runningAvg: 533 },
  { month: "Jul", revenue: 760, runningAvg: 566 },
  { month: "Aug", revenue: 940, runningAvg: 613 },
];

export default function BarLineComposedChart(): React.JSX.Element {
  return (
    <ChartContainer
      data={data}
      xKey="month"
      xScaleType="band"
      yKey="revenue"
      yScaleType="linear"
      margin={{ top: 20, right: 24, bottom: 34, left: 52 }}
    >
      <CartesianGrid stroke="#334155" strokeOpacity={0.75} dashArray="4 6" />
      <XAxis stroke="#64748b" textFill="#cbd5e1" />
      <YAxis stroke="#64748b" textFill="#cbd5e1" />
      <Bar fill="#38bdf8" fillOpacity={0.5} radius={4} />
      <Line
        y={(d) => d.runningAvg}
        stroke="#5eead4"
        strokeWidth={2}
        curve="monotone"
      />
      <Tooltip<Row> indicatorStroke="#f8fafc" dotFill="#f8fafc">
        {({ x, y, datum }) => (
          <g transform={`translate(${x + 12}, ${y - 62})`}>
            <rect
              width={150}
              height={58}
              rx={8}
              fill="#0f172a"
              stroke="#334155"
            />
            <text x={12} y={20} fontSize={11} fill="#94a3b8">
              {datum.month}
            </text>
            <text x={12} y={36} fontSize={12} fill="#38bdf8" fontWeight={600}>
              Revenue: ${datum.revenue}
            </text>
            <text x={12} y={50} fontSize={12} fill="#5eead4" fontWeight={600}>
              Running avg: ${datum.runningAvg}
            </text>
          </g>
        )}
      </Tooltip>
    </ChartContainer>
  );
}
