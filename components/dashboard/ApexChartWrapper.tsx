"use client";

import { useEffect, useRef } from "react";
import type { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexOptions } from "apexcharts";

type ApexChartInstance = {
  render: () => Promise<unknown>;
  destroy: () => void;
};

interface ApexChartWrapperProps {
  options: ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  type: "line" | "area" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "radar" | "polarArea";
  height?: number | string;
  width?: number | string;
}

export default function ApexChartWrapper({
  options,
  series,
  type,
  height = "auto",
  width = "100%",
}: ApexChartWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ApexChartInstance | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let active = true;
    let chartInstance: ApexChartInstance | null = null;

    // Load ApexCharts dynamically on the client
    import("apexcharts").then((ApexChartsModule) => {
      const ApexCharts = ApexChartsModule.default || ApexChartsModule;
      if (!active || !containerRef.current) return;

      // Ensure any old chart instance in this container is cleaned up
      if (chartRef.current) {
        try {
          chartRef.current.destroy();
        } catch (error) {
          console.warn("Error destroying previous chart instance:", error);
        }
        chartRef.current = null;
      }

      const mergedOptions = {
        ...options,
        chart: {
          ...options.chart,
          type,
          height,
          width,
        },
        series,
      };

      const nextChart = new ApexCharts(containerRef.current, mergedOptions);
      chartInstance = nextChart;

      nextChart.render().then(() => {
        if (active) {
          chartRef.current = nextChart;
        } else {
          // If deactivated during rendering, destroy immediately
          try {
            nextChart.destroy();
          } catch {
            // ignore
          }
        }
      });
    });

    return () => {
      active = false;
      if (chartInstance) {
        try {
          chartInstance.destroy();
        } catch {
          // ignore
        }
      }
      chartRef.current = null;
    };
  }, [options, series, type, height, width]);

  return <div ref={containerRef} className="w-full h-full" style={{ minHeight: height }} />;
}
