import React, { useMemo } from "react";
import { Box, Typography, Chip, Paper } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";

export type GlucosePoint = { time: string; value: number };

const COLORS = {
  text: "#e7e7ea",
  subtext: "rgba(255,255,255,0.65)",
  grid: "rgba(255,255,255,0.12)",
  axis: "rgba(255,255,255,0.56)",
  line: "#7dd3fc",   // blue line for full trace
  danger: "#ff6b6b", // red overlay for out of range
};

const TargetBand: React.FC = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Chip size="small" label="Target" sx={{ color: "#9be29b", fontWeight: 700 }} />
    <Typography variant="body2">70–180 mg/dL</Typography>
  </Box>
);

const GlucoseChart: React.FC<{ data: GlucosePoint[]; title?: string }> = ({
  data,
  title = "Glucose — Last 24h",
}) => {
  const times = useMemo(() => data.map((d) => d.time), [data]);
  const outOfRange = useMemo(
    () => data.map((d) => (d.value < 70 || d.value > 180 ? d.value : null)),
    [data]
  );

  return (
    <Paper
      sx={{
        p: 2.5,
        borderRadius: 2.5,
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
        <TargetBand />
      </Box>

      <LineChart
        xAxis={[
          {
            data: times,
            scaleType: "point",
            label: "Time",
            labelStyle: { fill: COLORS.axis },
            tickLabelStyle: { fill: COLORS.axis },
          },
        ]}
        yAxis={[
          {
            label: "mg/dL",
            min: 0,
            max: 260,
            valueFormatter: (v: number) => `${v} mg/dL`,
            labelStyle: { fill: COLORS.axis },
            tickLabelStyle: { fill: COLORS.axis },
          },
        ]}
        series={[
          // Full trace (keeps the line continuous/visible)
          {
            data: data.map((d) => d.value),
            label: "Glucose",
            showMark: false,
            color: COLORS.line,
            curve: "monotoneX",
            valueFormatter: (v) => `${v} mg/dL`,
          },
          // Red overlay for out-of-range points/segments
          {
            data: outOfRange,
            label: "Out of Range",
            showMark: true,
            color: COLORS.danger,
            curve: "monotoneX",
            valueFormatter: (v) => (v == null ? "" : `${v} mg/dL`),
          },
        ]}
        slotProps={{
          legend: { hidden: true } as any,
          tooltip: {
            trigger: "axis",
            sx: { "& .MuiTooltip-tooltip": { border: "1px solid" } },
          } as any,
        }}
        height={340}
        grid={{ horizontal: true, vertical: false }}
        sx={{
          "--Charts-grid-line": COLORS.grid,
          "--Charts-axis-line": COLORS.axis,
          backgroundColor: "transparent",
          borderRadius: 12,
        }}
      >
        <ChartsReferenceLine
          y={70}
          label="70"
          lineStyle={{ stroke: COLORS.danger, strokeDasharray: "4 4" }}
          labelStyle={{ fill: COLORS.danger }}
        />
        <ChartsReferenceLine
          y={180}
          label="180"
          lineStyle={{ stroke: COLORS.danger, strokeDasharray: "4 4" }}
          labelStyle={{ fill: COLORS.danger }}
        />
      </LineChart>

      {/* Legend (English) */}
      <Box sx={{ mt: 1.25, display: "flex", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
        <Box sx={{ height: 10, width: 24, bgcolor: COLORS.line, borderRadius: 1 }} />
        <Typography variant="caption">In Range</Typography>
        <Box sx={{ height: 10, width: 24, bgcolor: COLORS.danger, borderRadius: 1 }} />
        <Typography variant="caption">Out of Range</Typography>
      </Box>
    </Paper>
  );
};

export default GlucoseChart;
