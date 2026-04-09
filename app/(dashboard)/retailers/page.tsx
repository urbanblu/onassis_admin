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
import { useQuery } from "@tanstack/react-query";
import WritersService from "@/api/writers";
import { formatGhs } from "@/utils/currency";
import ToastService from "@/utils/toast-service";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function statusClass(status: string) {
  const s = status.toLowerCase();
  if (s === "active") return "border-green-600 text-green-700";
  if (s === "no_use" || s === "no use")
    return "border-[#E74C3D] text-[#E74C3D]";
  return "border-gray-400 text-gray-600";
}

function RetailersView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const { data, isPending, isFetching } = useQuery({
    queryKey: ["writers", "all", currentPage, currentPageSize, search],
    queryFn: () =>
      WritersService.fetchAllWriters({
        page: currentPage,
        page_size: currentPageSize,
        search: search || undefined,
      }),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setCurrentPageSize(size);
    setCurrentPage(1);
  };

  const handleSort = (column: string, direction: "asc" | "desc") => {
    void column;
    void direction;
  };

  const rows = data?.results ?? [];

  const handleRowClick = (_row: TableRow, index: number) => {
    const w = rows[index];
    if (w) router.push(`/retailers/${w.id}`);
  };
  const pagination = data
    ? {
        pageNumber: currentPage,
        pageSize: currentPageSize,
        totalCount: data.count,
      }
    : { pageNumber: 1, pageSize: currentPageSize, totalCount: 0 };

  const tableData: TableRow[] = rows.map((w) => {
    const initial = w.name.charAt(0).toUpperCase();
    const ytdSales = parseFloat(w.ytd_sales);
    const ytdTop = parseFloat(w.ytd_topups);
    return {
      id: (
        <span className="text-xs font-jura-medium">{w.writer_id_display}</span>
      ),
      name: (
        <div className="text-xs flex items-center gap-x-2">
          <Avatar size="sm" className="w-6 h-6">
            <Avatar.Image alt="" src="" />
            <Avatar.Fallback className="bg-[#F8A824] text-sm font-gotham-bold text-white">
              {initial}
            </Avatar.Fallback>
          </Avatar>
          {w.name}
        </div>
      ),
      contact: <span className="text-sm font-jura-bold">{w.contact}</span>,
      signUpDate: formatDate(w.sign_up_date),
      dop: <span className="text-sm font-jura-bold">{w.days_on_platform}</span>,
      dot: <span className="text-sm font-jura-bold">{w.days_of_tickets}</span>,
      ytdSales: (
        <span className="text-sm font-jura-bold">
          {formatGhs(Number.isFinite(ytdSales) ? ytdSales : 0)}
        </span>
      ),
      ytdTopUps: (
        <span className="text-sm font-jura-bold">
          {formatGhs(Number.isFinite(ytdTop) ? ytdTop : 0)}
        </span>
      ),
      lastTransDate: formatDate(w.last_transaction_date),
      status: (
        <div
          className={`rounded-full border-[1.5px] text-center text-xs py-[2px] px-2 ${statusClass(w.status)}`}
        >
          <span className="text-[.6rem] capitalize">
            {w.status.replace(/_/g, " ")}
          </span>
        </div>
      ),
    };
  });

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
            <span className="font-gotham-bold text-xs ml-2">
              {data?.count ?? (isPending ? "…" : 0)}
            </span>
          </div>
          <FilterRetailers
            onFilterTap={({ search: nextSearch }) => {
              setSearch(nextSearch);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="space-x-2 items-center flex">
          <Button
            className="rounded-sm bg-transparent border text-black"
            size="md"
            onClick={() => {
              ToastService.info({ text: "Feature not yet available" });
            }}
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
            data={tableData}
            pagination={pagination}
            pageSize={currentPageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onRowClick={handleRowClick}
            onSort={handleSort}
            loading={isPending}
            isRefetching={isFetching}
          />
        </div>
      </div>
    </div>
  );
}

export default RetailersView;
