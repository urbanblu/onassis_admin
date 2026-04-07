"use client";

import CustomTable, { TableRow } from "@/components/custom-table";
import { useState } from "react";

import {
  Checkbox,
  CloseButton,
  Label,
  Popover,
  Separator,
} from "@heroui/react";
import Image from "next/image";
import QrCode from "../../../../public/images/qrcode.webp";
import CustomCheckboxItem from "@/components/custom-checkbox";
import { IoMdMore } from "react-icons/io";

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
                    <div className="flex space-x-2 items-center">
                      <span className="font-jura-bold text-sm">
                        {"4:13 PM"}
                      </span>
                      <Popover>
                        <CloseButton className="bg-transparent">
                          <IoMdMore size={30} />
                        </CloseButton>
                        <Popover.Content
                          className="rounded-sm shadow-sm border w-md"
                          placement="bottom right"
                        >
                          <Popover.Dialog className="w-full p-0">
                            <div className="space-y-5 max-h-72 overflow-y-auto custom-scrollbar py-5">
                              {[1, 2, 3, 4, 5].map((item, index) => {
                                const islast = index == 4;
                                return (
                                  <div key={index}>
                                    <div className="flex flex-row justify-between items-center w-full px-5">
                                      <div className="flex flex-col items-start space-y-1">
                                        <span className="text-[12px]">
                                          {"2026000012769"}
                                        </span>
                                        <span className="text-[10px] font-gotham-medium text-gray-500">
                                          {"Aboagye"}
                                        </span>
                                      </div>
                                      <span className="text-[12px]">
                                        Direct 2
                                      </span>
                                      <div className="flex flex-col items-center space-y-1">
                                        <div className="flex flex-wrap gap-2 justify-start">
                                          {[2, 20].map((item, index) => (
                                            <div
                                              key={index}
                                              className="bg-transparent border text-black font-jura-bold text-xs h-[24px] flex justify-center items-center w-[24px] text-center rounded-sm"
                                            >
                                              {item}
                                            </div>
                                          ))}
                                        </div>
                                        <span className="text-[10px] text-gray-600">
                                          Morning VAG
                                        </span>
                                      </div>
                                      <span className="text-sm font-jura-bold">
                                        GHS 50.00
                                      </span>
                                      <span className="text-sm font-jura-bold">
                                        10:11 PM
                                      </span>
                                    </div>

                                    {!islast && (
                                      <Separator className="w-full mt-5" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </Popover.Dialog>
                        </Popover.Content>
                      </Popover>
                    </div>
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
