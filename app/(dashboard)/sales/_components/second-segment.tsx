"use client";

import CustomInputComponent from "@/components/custom-input-component";
import CustomTable, { TableRow } from "@/components/custom-table";
import { Avatar, CloseButton, Separator } from "@heroui/react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

function SecondSalesSegment() {
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
      <div className="border rounded-sm">
        <div className="p-3 flex flex-col">
          <div>
            <span className="font-jura-bold">{"551 of"}</span>
            <span className="font-jura-light">{" 1547 retailers trading"}</span>
          </div>
          <div className="my-2 w-full">
            <CustomInputComponent
              className="border-gray-300 py-0 rounded-sm"
              placeholder="Enter retailer's phone number"
              suffixIcon={
                <CloseButton className="mr-2">
                  <BiSearch className="h-3.5" />
                </CloseButton>
              }
            />
          </div>
        </div>
        <Separator />
        <div className="flex justify-between px-5">
          <div className="flex flex-col items-start py-5">
            <span className="font-gotham-black text-[0.65rem]">
              {"Today's Top-Up"}
            </span>
            <span className="font-jura-bold text-xl">GHS 141,027.97</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-start py-5">
            <span className="font-gotham-black text-[0.65rem]">
              {"Today's Top-Up"}
            </span>
            <span className="font-jura-bold text-xl">GHS 141,027.97</span>
          </div>
        </div>
      </div>

      <div className="h-[400px] md:h-auto md:flex-1 md:min-h-0 md:overflow-hidden">
        <div className="h-full">
          <CustomTable
            columns={[
              { key: "retailer", label: "Retailer", sortable: true },
              { key: "topUp", label: "Top-Up", sortable: true },
              { key: "sales", label: "Sales", sortable: false },
            ]}
            data={
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                return {
                  retailer: (
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <Avatar size="lg" className="w-8 h-8">
                        <Avatar.Image alt="" src="" />
                        <Avatar.Fallback className="bg-[#F8A824] text-sm font-gotham-bold">
                          G
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col items-start space-y-1">
                        <span className="text-[12px]">{"Gloria Aballa"}</span>
                        <span className="text-[10px] font-gotham-medium text-gray-500">
                          {"+233 (0)54 969 8956"}
                        </span>
                      </div>
                    </div>
                  ),
                  topUp: (
                    <span className="font-jura-bold text-sm">{"4:13 PM"}</span>
                  ),
                  sales: (
                    <span className="font-jura-bold text-sm">
                      {"GHS 30.00"}
                    </span>
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

export default SecondSalesSegment;
