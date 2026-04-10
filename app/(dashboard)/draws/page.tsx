"use client";

import CustomTable, { TableRow } from "@/components/custom-table";
import { useState } from "react";
import DrawNumbersIcon from "@/public/images/draw-numbers-icon.webp";
import Image from "next/image";
import React from "react";
import DrawDrawer from "./_components/draw-drawer";
import CreateDrawDrawer from "./_components/create-draw-drawer";
import { useQuery } from "@tanstack/react-query";
import FinancialsService from "@/api/financials";
import GamesService from "@/api/games";

function DrawView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);
  const [isDrawOpen, setDrawnIsOpen] = React.useState(false);
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(
    null,
  );
  const [drawerMode, setDrawerMode] = React.useState<
    "pre" | "post1" | "post2" | null
  >(null);

  const { data: dash, isPending: dashPending } = useQuery({
    queryKey: ["financials", "draws-and-winnings-dashboard"],
    queryFn: FinancialsService.fetchDrawsAndWinningsDashboard,
  });

  const { data: tableData, isPending: tablePending } = useQuery({
    queryKey: [
      "games",
      "draws-and-winnings-table",
      currentPage,
      currentPageSize,
    ],
    queryFn: () =>
      GamesService.fetchDrawsAndWinningsTable({
        page: currentPage,
        page_size: currentPageSize,
      }),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setCurrentPageSize(size);
    setCurrentPage(1);
  };

  const handleRowClick = (_row: TableRow, _index: number) => {};

  const handleSort = (column: string, direction: "asc" | "desc") => {
    void column;
    void direction;
  };

  const onPreDrawClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setDrawerMode("pre");
    setDrawnIsOpen(true);
  };

  const onPostDraw1Click = (eventId: string) => {
    setSelectedEventId(eventId);
    setDrawerMode("post1");
    setDrawnIsOpen(true);
  };

  const onPostDraw2Click = (eventId: string) => {
    setSelectedEventId(eventId);
    setDrawerMode("post2");
    setDrawnIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawnIsOpen(false);
    setSelectedEventId(null);
    setDrawerMode(null);
  };

  const rows = tableData?.results ?? [];
  const pagination = tableData
    ? {
        pageNumber: currentPage,
        pageSize: currentPageSize,
        totalCount: tableData.count,
      }
    : {
        pageNumber: 1,
        pageSize: currentPageSize,
        totalCount: 0,
      };

  const loading = dashPending || tablePending;

  const ytdSales = dash?.ytd_sales;
  const ytdWin = dash?.ytd_winnings;
  const ytdGgr = dash?.ytd_ggr;
  const ytdPlayers = ytdSales?.unique_players;
  const ytdTickets = ytdSales?.total_tickets;
  const ytdStakes = ytdSales?.total_stakes;

  return (
    <div className="flex flex-col px-7 pb-5 space-y-3 h-auto sm:h-[calc(100vh-6rem)] sm:overflow-hidden">
      <div className="flex items-center justify-between shrink-0">
        <span className="text-sm sm:text-lg transition-all font-gotham-black uppercase">
          DRAWS & WINNINGS
        </span>
        <CreateDrawDrawer />
      </div>

      <div className="grid md:grid-cols-3 gap-3 shrink-0">
        <Card
          title="YTD Sales"
          amount={ytdSales?.total_sales ?? "—"}
          subtitle={
            <div className="flex flex-wrap gap-x-1 text-black">
              <span className="font-gotham-regular text-[0.65rem]">
                {"from"}
              </span>
              <span className="font-gotham-black text-[0.65rem]">
                {ytdPlayers != null && ytdTickets != null
                  ? ` ${ytdPlayers.toLocaleString("en-GH")} players, ${ytdTickets.toLocaleString("en-GH")} tickets `
                  : " — "}
              </span>
              <span className="font-gotham-regular text-[0.65rem]">
                {"with"}
              </span>
              <span className="font-gotham-black text-[0.65rem]">
                {ytdStakes != null
                  ? ` ${ytdStakes.toLocaleString("en-GH")} stakes`
                  : " —"}
              </span>
            </div>
          }
        />
        <Card
          title="YTD Winings"
          amount={ytdWin?.total_winnings ?? "—"}
          subtitle={
            <div className="flex flex-wrap gap-x-1 text-black">
              <span className="font-gotham-black text-[0.65rem]">
                {"claimed: "}
              </span>
              <span className="font-gotham-regular text-[0.65rem]">
                {ytdWin?.claimed ?? "—"}
              </span>
              <span className="font-gotham-black text-[0.65rem]">
                {" unclaimed: "}
              </span>
              <span className="font-gotham-regular text-[0.65rem]">
                {ytdWin?.unclaimed ?? "—"}
              </span>
            </div>
          }
        />
        <Card
          title="YTD Gross Gaming Revenue"
          amount={ytdGgr?.gross_gaming_revenue ?? "—"}
          subtitle={
            <div className="flex flex-wrap gap-x-1 text-black">
              <span className="font-gotham-regular text-[0.65rem]">
                {"with Retention Rate "}
              </span>
              <span className="font-gotham-black text-[0.65rem]">
                {ytdGgr?.retention_rate ?? "—"}
              </span>
              <span className="font-gotham-regular text-[0.65rem]">
                {" value "}
              </span>
              <span className="font-gotham-black text-[0.65rem]">
                {ytdGgr?.retention_value ?? "—"}
              </span>
            </div>
          }
        />
      </div>

      <div className="h-[500px] sm:h-full sm:flex-1 sm:min-h-0 mt-2">
        <div className="h-full overflow-hidden">
          <CustomTable
            columns={[
              { key: "event", label: "Event #", sortable: true },
              { key: "drawDate", label: "Draw Date", sortable: true },
              { key: "eventName", label: "Event Name", sortable: false },
              { key: "drawTime", label: "Draw Time", sortable: true },
              { key: "preDraw", label: "Pre-Draw", sortable: false },
              { key: "drawNumbers", label: "Draw Numbers", sortable: false },
              { key: "postDraw1", label: "Post Draw I", sortable: false },
              { key: "postDraw2", label: "Post Draw II", sortable: false },
              { key: "payoutRatio", label: "Payout Ratio", sortable: false },
            ]}
            data={
              rows.map((r) => ({
                event: String(r.event_no),
                drawDate: r.draw_date,
                eventName: (
                  <span className="font-gotham-bold text-xs">
                    {r.event_name}
                  </span>
                ),
                drawTime: (
                  <span className="text-sm font-jura-bold">{r.draw_time}</span>
                ),
                preDraw: (
                  <span
                    className="text-sm font-jura-bold text-[#505FFF] underline decoration-dashed cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreDrawClick(r.event_id);
                    }}
                  >
                    {r.pre_draw}
                  </span>
                ),
                drawNumbers: (
                  <div className="flex space-x-2 items-center flex-wrap">
                    {r.draw_numbers.map((n, i) => (
                      <span
                        key={i}
                        className="rounded bg-transparent border-[1.5px] p-1"
                      >
                        {n}
                      </span>
                    ))}
                    <Image
                      src={DrawNumbersIcon}
                      alt="DrawNumbersIcon"
                      className="h-5 w-5"
                    />
                  </div>
                ),
                postDraw1: (
                  <span
                    className="text-sm font-jura-bold text-[#505FFF] underline decoration-dashed cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPostDraw1Click(r.event_id);
                    }}
                  >
                    {r.post_draw_1}
                  </span>
                ),
                postDraw2: (
                  <span
                    className="text-sm font-jura-bold text-[#505FFF] underline decoration-dashed cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPostDraw2Click(r.event_id);
                    }}
                  >
                    {r.post_draw_2}
                  </span>
                ),
                payoutRatio: (
                  <span className="text-sm font-jura-bold">
                    {r.payout_ratio}
                  </span>
                ),
              })) ?? []
            }
            pagination={pagination}
            pageSize={currentPageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onRowClick={handleRowClick}
            onSort={handleSort}
            loading={loading}
            isRefetching={false}
          />
        </div>
      </div>

      <DrawDrawer
        isOpen={isDrawOpen}
        onCloseTap={closeDrawer}
        eventId={selectedEventId}
        drawerMode={drawerMode}
      />
    </div>
  );
}

export default DrawView;

const Card = ({
  title,
  amount,
  subtitle,
}: {
  title: string;
  amount: string;
  subtitle: React.ReactNode;
}) => {
  return (
    <div className="border rounded-sm p-5">
      <div className="flex flex-col items-start space-y-1">
        <span className="font-gotham-black text-[0.65rem] text-gray-500">
          {title}
        </span>

        <span className="font-jura-bold text-2xl">{amount}</span>

        {subtitle}
      </div>
    </div>
  );
};
