"use client";

import CustomTable, { TableRow } from "@/components/custom-table";
import { useState } from "react";
import DrawNumbersIcon from "@/public/images/draw-numbers-icon.webp";
import Image from "next/image";
import React from "react";
import DrawDrawer from "./_components/draw-drawer";

function DrawView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);
  const [isDrawOpen, setDrawnIsOpen] = React.useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setCurrentPageSize(size);
  };

  const handleRowClick = (row: TableRow, index: number) => {};

  const handleSort = (column: string, direction: "asc" | "desc") => {
    console.log("Sort by:", column, direction);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPreDrawClick = (value: any) => {
    setDrawnIsOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPostDraw1Click = (value: any) => {
    setDrawnIsOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPostDraw2Click = (value: any) => {
    setDrawnIsOpen(true);
  };

  return (
    <div className="flex flex-col px-7 pb-5 space-y-3 h-auto sm:h-[calc(100vh-6rem)] sm:overflow-hidden">
      <span className="text-sm sm:text-lg transition-all font-gotham-black uppercase shrink-0">
        DRAWS & WINNINGS
      </span>

      <div className="grid md:grid-cols-3 gap-3 shrink-0">
        <Card />
        <Card />
        <Card />
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
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                return {
                  event: "265",
                  drawDate: "Thu, 02 Apr 2026",
                  eventName: (
                    <span className="font-gotham-bold text-xs">
                      Fortune Thursday
                    </span>
                  ),
                  drawTime: (
                    <span className="text-sm font-jura-bold">20:15:12</span>
                  ),
                  preDraw: (
                    <span
                      className="text-sm font-jura-bold text-[#505FFF] underline decoration-dashed"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreDrawClick(item);
                      }}
                    >
                      GHS 231,088.71
                    </span>
                  ),
                  drawNumbers: (
                    <div className="flex space-x-2 items-center">
                      <span className="rounded bg-transparent border-[1.5px] p-1">
                        12
                      </span>
                      <span className="rounded bg-transparent border-[1.5px] p-1">
                        27
                      </span>
                      <span className="rounded bg-transparent border-[1.5px] p-1">
                        41
                      </span>
                      <span className="rounded bg-transparent border-[1.5px] p-1">
                        45
                      </span>
                      <span className="rounded bg-transparent border-[1.5px] p-1">
                        66
                      </span>
                      <Image
                        src={DrawNumbersIcon}
                        alt="DrawNumbersIcon"
                        className="h-5 w-5"
                      />
                    </div>
                  ),
                  postDraw1: (
                    <span
                      className="text-sm font-jura-bold text-[#505FFF] underline decoration-dashed"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPostDraw1Click(item);
                      }}
                    >
                      GHS 1,819.33
                    </span>
                  ),
                  postDraw2: (
                    <span
                      className="text-sm font-jura-bold text-[#505FFF] underline decoration-dashed"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPostDraw2Click(item);
                      }}
                    >
                      GHS 6.45
                    </span>
                  ),
                  payoutRatio: (
                    <span className="text-sm font-jura-bold">59.44%</span>
                  ),
                };
              }) ?? []
            }
            pageSize={currentPageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onRowClick={handleRowClick}
            onSort={handleSort}
            loading={false}
            isRefetching={false}
          />
        </div>
      </div>

      <DrawDrawer
        isOpen={isDrawOpen}
        onCloseTap={() => setDrawnIsOpen(false)}
      />
    </div>
  );
}

export default DrawView;

const Card = () => {
  return (
    <div className="border rounded-sm p-5">
      <div className="flex flex-col items-start space-y-1">
        <span className="font-gotham-black text-[0.65rem] text-gray-500">
          {"YTD Sales"}
        </span>

        <span className="font-jura-bold text-2xl">GHS 34,049,630.48</span>

        <div className="flex space-x-1 text-black">
          <span className="font-gotham-regular text-[0.65rem]">{"from"}</span>

          <span className="font-gotham-black text-[0.65rem]">
            {" 50,262 players, 726,591 coupons "}
          </span>

          <span className="font-gotham-regular text-[0.65rem]">{"with"}</span>

          <span className="font-gotham-black text-[0.65rem]">
            {" 20,143,593 stakes"}
          </span>
        </div>
      </div>
    </div>
  );
};
