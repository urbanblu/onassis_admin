"use client";

import { Avatar, Tabs } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import FinancialsService from "@/api/financials";
import WritersService from "@/api/writers";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function WritersPerformace() {
  const [rangeDays, setRangeDays] = useState<30 | 365>(30);

  const { data: topUpStats } = useQuery({
    queryKey: ["financials", "topup-statistics"],
    queryFn: FinancialsService.fetchTopUpStatistics,
  });

  const { data: winStats } = useQuery({
    queryKey: ["financials", "winning-statistics"],
    queryFn: FinancialsService.fetchWinningStatistics,
  });

  const { data: bestWorst } = useQuery({
    queryKey: ["financials", "best-worst-performance"],
    queryFn: FinancialsService.fetchBestWorstPerformance,
  });

  const { data: retention } = useQuery({
    queryKey: ["financials", "retention-rate"],
    queryFn: FinancialsService.fetchRetentionRate,
  });

  const { data: top10 = [] } = useQuery({
    queryKey: ["writers", "top-10"],
    queryFn: WritersService.fetchTop10Writers,
  });

  const { data: activeWriterDaily30 } = useQuery({
    queryKey: ["writers", "active-writer-daily-stats", 30],
    queryFn: () => WritersService.fetchActiveWriterDailyStats(30),
  });

  const { data: activeWriterDaily365 } = useQuery({
    queryKey: ["writers", "active-writer-daily-stats", 365],
    queryFn: () => WritersService.fetchActiveWriterDailyStats(365),
  });

  const activeWriterDaily =
    rangeDays === 30 ? activeWriterDaily30 : activeWriterDaily365;
  const rawChartDays = activeWriterDaily?.days ?? [];

  // For long ranges (1 year) downsample to keep chart readable.
  const chartDays = (() => {
    const maxBars = 60;
    if (rawChartDays.length <= maxBars) return rawChartDays;

    const step = Math.ceil(rawChartDays.length / maxBars);
    const sampled = rawChartDays.filter((_, i) => i % step === 0);
    const last = rawChartDays[rawChartDays.length - 1];
    return last ? [...sampled, last] : sampled;
  })();

  return (
    <div className="flex flex-col space-y-5">
      <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-4 gap-4 h-auto">
        <div className="col-span-3 border rounded-sm px-5 py-4 min-h-[400px] flex flex-col">
          <div className="flex flex-col h-full">
            <div className="sm:flex sm:justify-between space-y-5 sm:space-y-0">
              <div className="flex-col space-y-2">
                <div className="text-sm font-gotham-bold">
                  Total Writers vs Active Writers
                </div>
                <div className="space-x-4 flex">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full w-3.5 h-3.5 bg-[#2ECC71]"></div>
                    <span className="text-xs">Deployed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full w-3.5 h-3.5 bg-[#18A2B8]"></div>
                    <span className="text-xs">Active</span>
                  </div>
                </div>
              </div>
              <Tabs
                className="min-w-48 flex-wrap"
                selectedKey={String(rangeDays)}
                onSelectionChange={(key) => {
                  const next = String(key) === "30" ? 30 : 365;
                  setRangeDays(next);
                }}
              >
                <Tabs.ListContainer>
                  <Tabs.List aria-label="Options" className="rounded-sm">
                    <Tabs.Tab
                      className="px-4 py-1 text-xs font-gotham-bold"
                      id="30"
                    >
                      {"30 days"}
                      <Tabs.Indicator className="rounded-sm" />
                    </Tabs.Tab>
                    <Tabs.Tab
                      className="px-4 py-1 text-xs font-gotham-bold"
                      id="365"
                    >
                      {"1 year"}
                      <Tabs.Indicator className="rounded-sm" />
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>
              </Tabs>
            </div>
            <div className="flex-1 min-h-0 w-full mt-5">
              <ActiveWritersStackedBarChart days={chartDays} />
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <InfoCard
            title="YTD Top-Ups"
            totalAmount={topUpStats?.ytd.total ?? "—"}
            lastWeekAmount={topUpStats?.last_week.total ?? "—"}
            lastMonthAmount={topUpStats?.last_month.total ?? "—"}
            last3MonthsAmount={topUpStats?.last_3_months.total ?? "—"}
          />
          <InfoCard
            title="YTD Winnings"
            totalAmount={winStats?.ytd.total ?? "—"}
            lastWeekAmount={winStats?.last_week.total ?? "—"}
            lastMonthAmount={winStats?.last_month.total ?? "—"}
            last3MonthsAmount={winStats?.last_3_months.total ?? "—"}
          />
          <div className="border rounded-sm p-5 flex-none">
            <div className="flex flex-col items-start space-y-3">
              <span className="font-gotham-black text-sm text-gray-800">
                {"Best & Worst Performance"}
              </span>
              <div className="flex flex-col w-full space-y-2">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-xs font-jura-regular">
                    {bestWorst?.best_month
                      ? `Best Month (${bestWorst.best_month.month})`
                      : "Best Month"}
                  </span>
                  <span className="text-sm font-jura-bold">
                    {bestWorst?.best_month?.performance ?? "—"}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <span className="text-xs font-jura-regular">
                    {bestWorst?.worst_month
                      ? `Worst Month (${bestWorst.worst_month.month})`
                      : "Worst Month"}
                  </span>
                  <span className="text-sm font-jura-bold">
                    {bestWorst?.worst_month?.performance ?? "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        <div className="flex flex-col sm:col-span-3 space-y-3">
          <span className="font-gotham-black text-sm text-gray-800">
            {"Top 10 Retailers - Year to Date"}
          </span>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-3 gap-y-3">
            {top10.map((w) => (
              <div
                className="border rounded-sm flex justify-center items-center space-x-4 py-5"
                key={w.writer_id}
              >
                <Avatar size="lg">
                  <Avatar.Image alt="" src={w.photo_url ?? ""} />
                  <Avatar.Fallback className="bg-[#F8A824] text-sm font-gotham-bold">
                    {w.writer_name.charAt(0).toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col items-start min-w-0">
                  <span className="font-jura-bold text-sm truncate">
                    {w.net_profit.formatted}
                  </span>
                  <span className="font-gotham-black text-[0.6rem] uppercase truncate">
                    {w.writer_name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sm:col-span-1 border rounded-sm p-5">
          <div className="flex flex-col space-y-1">
            <span className="font-gotham-black text-sm text-gray-800">
              {"YTD Retention Rate"}
            </span>
            <span className="font-gotham-regular text-[0.7rem] text-gray-600">
              {"% of net earnings retained after payout"}
            </span>
          </div>
          <div className="h-full flex flex-col text-4xl sm:text-5xl font-jura-bold">
            <span className="self-center mt-4 sm:mt-5">
              {retention?.retention_rate ?? "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

type InfoCardProps = {
  title: string;
  totalAmount: string;
  lastWeekAmount: string;
  lastMonthAmount: string;
  last3MonthsAmount: string;
};

const InfoCard = ({
  title,
  totalAmount,
  lastWeekAmount,
  lastMonthAmount,
  last3MonthsAmount,
}: InfoCardProps) => {
  return (
    <div className="border rounded-sm p-5 h-full row-span-2">
      <div className="flex flex-col space-y-5 items-start justify-around h-full">
        <span className="font-gotham-black text-sm text-gray-800">{title}</span>

        <span className="font-jura-bold text-2xl">{totalAmount}</span>

        <div className="flex flex-col w-full space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-jura-regular">Last Week</span>
            <span className="text-sm font-jura-bold">{lastWeekAmount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-jura-regular">Last Month</span>
            <span className="text-sm font-jura-bold">{lastMonthAmount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-jura-regular">Last 3 Months</span>
            <span className="text-sm font-jura-bold">{last3MonthsAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WritersPerformace;

type ActiveWriterDay = {
  day: string;
  total_writers: number;
  active_writers: number;
};

function formatDayLabel(isoDay: string) {
  const d = new Date(isoDay);
  if (Number.isNaN(d.getTime())) return isoDay;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

function ActiveWritersStackedBarChart({ days }: { days: ActiveWriterDay[] }) {
  console.log(days);

  const deployedColor = "#2ECC71";
  const activeColor = "#18A2B8";
  const gridColor = "#E5E7EB";
  const axisTextColor = "#6B7280";

  if (!days?.length) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-xs font-gotham-regular text-gray-400">
          Data not available
        </span>
      </div>
    );
  }

  const chartData = days.map((d) => {
    const total = Math.max(0, d.total_writers);
    const active = Math.max(0, d.active_writers);
    const activeClamped = Math.min(active, total);
    const deployedRemainder = Math.max(0, total - activeClamped);
    return {
      day: d.day,
      active: activeClamped,
      deployed: deployedRemainder,
      total,
    };
  });

  const interval =
    days.length <= 12 ? 0 : Math.max(1, Math.floor(days.length / 10));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 45 }}
          barCategoryGap="10%"
          barGap={1}
        >
          <CartesianGrid stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="day"
            interval={interval}
            tick={{
              fontSize: 12,
              fill: axisTextColor,
              angle: -45,
              textAnchor: "end",
              dy: 10,
            }}
            tickFormatter={(v) => formatDayLabel(String(v))}
          />
          <YAxis
            domain={[0, "dataMax"]}
            tickLine={false}
            axisLine={false}
            orientation="right"
            tick={{ fontSize: 12, fill: axisTextColor }}
          />

          <Tooltip
            cursor={{ fill: "transparent" }}
            content={({ active, payload, label }) => {
              if (!active || !payload || payload.length === 0) return null;
              const activeVal = payload.find((p) => p.dataKey === "active")
                ?.value as number | undefined;
              const deployedVal = payload.find((p) => p.dataKey === "deployed")
                ?.value as number | undefined;
              return (
                <div className="bg-white border rounded-sm px-3 py-2 shadow-sm">
                  <div className="text-xs font-gotham-bold text-gray-700">
                    {formatDayLabel(String(label))}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: deployedColor }}
                      />
                      Deployed: {deployedVal ?? 0}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: activeColor }}
                      />
                      Active: {activeVal ?? 0}
                    </span>
                  </div>
                </div>
              );
            }}
          />

          <Bar
            dataKey="deployed"
            name="Deployed"
            stackId="writers"
            fill={deployedColor}
          />
          <Bar
            dataKey="active"
            name="Active"
            stackId="writers"
            fill={activeColor}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
