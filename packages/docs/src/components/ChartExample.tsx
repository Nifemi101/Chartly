import React from 'react';
import {
  ChartContainer,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  LinearGradient,
} from 'chartlyx';

interface Row {
  month: Date;
  revenue: number;
}

const data: Row[] = [
  { month: new Date('2024-01-01'), revenue: 120 },
  { month: new Date('2024-02-01'), revenue: 180 },
  { month: new Date('2024-03-01'), revenue: 150 },
  { month: new Date('2024-04-01'), revenue: 220 },
  { month: new Date('2024-05-01'), revenue: 270 },
  { month: new Date('2024-06-01'), revenue: 200 },
];

const monthFmt = new Intl.DateTimeFormat('en', { month: 'short' });

export default function ChartExample(): React.JSX.Element {
  return (
    <div style={{ maxWidth: 720, height: 320 }}>
      <ChartContainer
        data={data}
        xKey="month"
        xScaleType="time"
        yKey="revenue"
        yScaleType="linear"
        margin={{ top: 20, right: 20, bottom: 34, left: 50 }}
      >
        <LinearGradient id="demoFill" from="#3b82f6" to="#3b82f6" fromOpacity={0.25} toOpacity={0} />
        <CartesianGrid stroke="#e5e7eb" strokeOpacity={0.6} />
        <XAxis tickFormatter={(v) => monthFmt.format(v as Date)} />
        <YAxis tickFormatter={(v) => `$${v}`} />
        <Area fill="url(#demoFill)" curve="monotone" />
        <Line stroke="#3b82f6" strokeWidth={2} curve="monotone" />
      </ChartContainer>
    </div>
  );
}
