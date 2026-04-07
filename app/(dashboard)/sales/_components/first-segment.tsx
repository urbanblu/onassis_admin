"use client";

import CustomTable, { TableRow } from "@/components/custom-table";
import { useState } from "react";

import { Checkbox, Label, Separator } from "@heroui/react";
import Image from "next/image";
import QrCode from "../../../../public/images/qrcode.webp";
import CustomCheckboxItem from "@/components/custom-checkbox";

function FirstSalesSegment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);

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

  return (
    <div className="flex flex-col space-y-3 md:min-h-0 md:overflow-hidden">
      <div className="flex flex-col">
        <div className="border rounded-sm">
          <div className="flex flex-col py-4">
            <div className="flex space-x-5 items-center px-5">
              <Image src={QrCode} alt="qrcode" className="w-[80px]" />
              <div className="flex flex-col text-xs">
                <div className="font-gotham-bold text-gray-500">
                  {"Today's total sales"}
                </div>
                <div className="font-jura-bold text-lg">{"GHS 283,355.66"}</div>
                <div className="font-gotham-bold text-gray-500">
                  <span className="font-gotham-regular">{"from "}</span>
                  <span>{"271 players "}</span>
                  <span className="font-gotham-regular">{"and "}</span>
                  <span>{"6,294 coupons"}</span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-around">
              <CustomCheckboxItem selected={false} label="5/90 Original" />
              <CustomCheckboxItem selected label="5/90 Noonrush" />
              <CustomCheckboxItem selected label="Morning VAG" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[400px] md:h-auto md:flex-1 md:min-h-0 md:overflow-hidden">
        <div className="h-full">
          <CustomTable
            columns={[
              { key: "coupon", label: "Coupon #", sortable: true },
              { key: "play", label: "Play", sortable: true },
              { key: "stakes", label: "Stakes", sortable: false },
              { key: "amount", label: "Amount", sortable: true },
              { key: "time", label: "Time", sortable: false },
            ]}
            data={
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                return {
                  coupon: (
                    <div className="flex flex-col items-start space-y-1">
                      <span>{"108008322026040116090725615"}</span>
                      <span className="text-[10px] font-gotham-black text-gray-400">
                        {"ODOGu one"}
                      </span>
                    </div>
                  ),
                  play: "Perm 2",
                  stakes: "11",
                  amount: (
                    <span className="font-jura-bold text-sm">
                      {"GHS 30.00"}
                    </span>
                  ),
                  time: (
                    <span className="font-jura-bold text-sm">{"4:13 PM"}</span>
                  ),
                };
              }) ?? []
            }
            // pagination={data?.pagination}
            pageSize={currentPageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onRowClick={handleRowClick}
            onSort={handleSort}
            loading={false}
            // emptyMessage={errorMessage}
            isRefetching={false}
          />
        </div>
      </div>
    </div>
  );
}

export default FirstSalesSegment;
