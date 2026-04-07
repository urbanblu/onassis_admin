"use client";

import Image from "next/image";
import LottoBuilding from "@/public/images/lotto-building.webp";
import { Avatar, Button } from "@heroui/react";
import { AiOutlineExport } from "react-icons/ai";
import FilterRetailers from "./_components/filter-retailers";
import CustomTable, { TableRow } from "@/components/custom-table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NewRetailerDrawer from "./_components/new-retailer-drawer";
import SetCreditPromiseDrawer from "./_components/set-credit-promise-drawer";

function RetailersView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);
  const [isDrawOpen, setDrawnIsOpen] = useState(false);
  const router = useRouter();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setCurrentPageSize(size);
  };

  const handleRowClick = (row: TableRow, index: number) => {
    router.push(`/retailers/${index}`);
  };

  const handleSort = (column: string, direction: "asc" | "desc") => {
    console.log("Sort by:", column, direction);
  };

  return (
    <div className="flex flex-col p-5 px-7 pb-10 space-y-5 h-auto sm:h-[calc(100vh-6rem)] sm:overflow-hidden">
      <div className="flex justify-between space-y-2 sm:space-y-0 flex-col sm:flex-row items-start">
        <div className="flex flex-col space-y-2">
          <span className="text-sm sm:text-lg font-gotham-black uppercase">
            Retailers & Writers
          </span>
          <div className="flex items-center">
            <Image src={LottoBuilding} alt="person-total" className="w-4 h-4" />
            <span className="text-xs font-gotham-bold text-gray-500 ml-1">
              {"Total: "}
            </span>
            <span className="font-gotham-bold text-xs ml-2">24</span>
          </div>
          <FilterRetailers />
        </div>
        <div className="space-x-2 items-center flex">
          <Button
            className="rounded-sm bg-transparent border text-black"
            size="md"
          >
            <AiOutlineExport className="w-3.5 h-3.5" />
            <span className="text-xs font-gotham-bold">Export Data</span>
          </Button>
          <NewRetailerDrawer />
          <SetCreditPromiseDrawer />
        </div>
      </div>

      <div className="h-[500px] sm:h-full sm:flex-1 sm:min-h-0 mt-2">
        <div className="h-full overflow-hidden">
          <CustomTable
            columns={[
              { key: "id", label: "ID #", sortable: true },
              { key: "name", label: "Name", sortable: true },
              { key: "contact", label: "Contact", sortable: false },
              { key: "signUpDate", label: "Sign-up Date", sortable: true },
              { key: "dop", label: "DoP", sortable: false },
              { key: "dot", label: "DoT", sortable: false },
              { key: "ytdSales", label: "YTD Sales", sortable: false },
              { key: "ytdTopUps", label: "YTD Top-ups", sortable: false },
              {
                key: "lastTransDate",
                label: "Last Trans Date",
                sortable: false,
              },
              { key: "status", label: "Status", sortable: false },
            ]}
            data={
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                return {
                  id: <span className="text-xs font-jura-medium">000009</span>,
                  name: (
                    <div className="text-xs flex items-center gap-x-2">
                      <Avatar size="sm" className="w-6 h-6">
                        <Avatar.Image alt="" src="" />
                        <Avatar.Fallback className="bg-[#F8A824] text-sm font-gotham-bold text-white">
                          T
                        </Avatar.Fallback>
                      </Avatar>
                      Retailer {item}
                    </div>
                  ),
                  contact: (
                    <span className="text-sm font-jura-bold">
                      +233 (0)10 000 000
                    </span>
                  ),
                  signUpDate: "Fri, 19 September 2025",
                  dop: <span className="text-sm font-jura-bold">198</span>,
                  dot: <span className="text-sm font-jura-bold">0</span>,
                  ytdSales: (
                    <span className="text-sm font-jura-bold">GHS 0.00</span>
                  ),
                  ytdTopUps: (
                    <span className="text-sm font-jura-bold">GHS 0.00</span>
                  ),
                  lastTransDate: "Mon, 6th Apr 2026",
                  status: (
                    <div className="rounded-full border-[1.5px] border-[#E74C3D] text-center text-xs py-[2px]">
                      <span className="text-[.6rem] text-[#E74C3D]">
                        No Use
                      </span>
                    </div>
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
    </div>
  );
}

export default RetailersView;
