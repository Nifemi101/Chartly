import React from 'react';
import {
  Area,
  CartesianGrid,
  ChartContainer,
  Line,
  LinearGradient,
  Tooltip,
  XAxis,
  YAxis,
} from 'chartly';

interface Row {
  label: string;
  value: number;
}

const data: Row[] = [
  { label: 'Jan', value: 320 },
  { label: 'Feb', value: 460 },
  { label: 'Mar', value: 380 },
  { label: 'Apr', value: 620 },
  { label: 'May', value: 540 },
  { label: 'Jun', value: 880 },
  { label: 'Jul', value: 760 },
  { label: 'Aug', value: 940 },
];

export default function HomeChart(): React.JSX.Element {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <ChartContainer
        data={data}
        xKey="label"
        xScaleType="band"
        yKey="value"
        yScaleType="linear"
        margin={{ top: 20, right: 24, bottom: 34, left: 52 }}
      >
        <LinearGradient
          id="homeChartFill"
          from="#5eead4"
          to="#38bdf8"
          fromOpacity={0.25}
          toOpacity={0.02}
        />
        <CartesianGrid stroke="#334155" strokeOpacity={0.75} dashArray="4 6" />
        <XAxis stroke="#64748b" textFill="#cbd5e1" />
        <YAxis stroke="#64748b" textFill="#cbd5e1" />
        <Area fill="url(#homeChartFill)" curve="monotone" />
        <Line stroke="#5eead4" strokeWidth={2} curve="monotone" />
        <Tooltip<Row> indicatorStroke="#5eead4" dotFill="#5eead4">
          {({ x, y, datum }) => (
            <g transform={`translate(${x + 12}, ${y - 46})`}>
              <rect
                width={110}
                height={44}
                rx={6}
                fill="#0f172a"
                stroke="#334155"
              />
              <text x={12} y={18} fontSize={11} fill="#94a3b8">
                {datum.label}
              </text>
              <text x={12} y={34} fontSize={13} fill="#5eead4" fontWeight={600}>
                {datum.value}
              </text>
            </g>
          )}
        </Tooltip>
      </ChartContainer>
    </div>
  );
}