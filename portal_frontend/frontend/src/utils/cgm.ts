// src/lib/cgm.ts
import { api } from "./Api";

export type GlucosePoint = { time: string; value: number };

function toBratislavaHHMM(iso: string) {
  const d = new Date(iso); // l’API renvoie UTC
  return d.toLocaleTimeString("fr-SK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Bratislava",
  });
}

export async function fetchCGM(period: string = "w"): Promise<GlucosePoint[]> {
  const res = await api(`/CGMData?period=${encodeURIComponent(period)}`);
  const rows: any[] = res?.data ?? [];
  return rows
    .filter(r => typeof r?.value === "number" && r?.time)
    .map(r => ({ time: toBratislavaHHMM(r.time), value: r.value }));
}

export function computeStats(points: GlucosePoint[]) {
  if (!points.length) return { avg: 0, min: 0, max: 0, tir: 0 };
  const values = points.map(p => p.value);
  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const inRange = values.filter(v => v >= 70 && v <= 180).length;
  const tir = Math.round((inRange / values.length) * 100);
  return { avg, min, max, tir };
}
