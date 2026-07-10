import React from "react";
import {
  PolarChartContainer,
  PolarTooltip,
  Radar,
  RadarAxes,
  RadarGrid,
} from "chartlyx";

interface Player {
  name: string;
  speed: number;
  power: number;
  defense: number;
  magic: number;
  agility: number;
}

const data: Player[] = [
  { name: "Alice", speed: 80, power: 70, defense: 60, magic: 85, agility: 75 },
  { name: "Bob", speed: 65, power: 90, defense: 75, magic: 40, agility: 60 },
];

const axes: (keyof Player)[] = [
  "speed",
  "power",
  "defense",
  "magic",
  "agility",
];

export default function MultiSeriesRadar(): React.JSX.Element {
  return (
    <PolarChartContainer data={data} padding={28}>
      <RadarGrid
        axesCount={axes.length}
        rings={4}
        stroke="#334155"
        strokeWidth={1}
      />
      <RadarAxes
        axes={axes as readonly string[]}
        stroke="#475569"
        labelFill="#cbd5e1"
        labelFontSize={11}
      />
      <Radar<Player>
        axes={axes as readonly (keyof Player & string)[]}
        rowIndex={0}
        maxValue={100}
        fill="#5eead4"
        fillOpacity={0.25}
        stroke="#5eead4"
        strokeWidth={2}
        showPoints
        pointRadius={3}
      />
      <Radar<Player>
        axes={axes as readonly (keyof Player & string)[]}
        rowIndex={1}
        maxValue={100}
        fill="#38bdf8"
        fillOpacity={0.25}
        stroke="#38bdf8"
        strokeWidth={2}
        showPoints
        pointRadius={3}
      />
      <PolarTooltip<Player>>
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
              {axes.map((axis) => (
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
                    {axis as string}
                  </span>
                  <span>{datum[axis]}</span>
                </div>
              ))}
            </div>
          </foreignObject>
        )}
      </PolarTooltip>
    </PolarChartContainer>
  );
}
