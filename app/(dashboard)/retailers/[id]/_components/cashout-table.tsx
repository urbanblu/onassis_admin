"use client";

import CustomTable from "@/components/custom-table";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import WritersService from "@/api/writers";
import { formatGhs } from "@/utils/currency";

function CashoutTable({ writerId }: { writerId: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);

  const { data, isPending, isFetching } = useQuery({
    queryKey: ["writers", writerId, "cashouts", currentPage, currentPageSize],
    queryFn: () =>
      WritersService.fetchWriterCashouts(writerId, {
        page: currentPage,
        page_size: currentPageSize,
      }),
    enabled: !!writerId,
  });

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePageSizeChange = (size: number) => {
    setCurrentPageSize(size);
    setCurrentPage(1);
  };
  const handleRowClick = () => {};
  const handleSort = (column: string, direction: "asc" | "desc") => {
    void column;
    void direction;
  };

  const rows = data?.results ?? [];
  const pagination = data
    ? {
        pageNumber: currentPage,
        pageSize: currentPageSize,
        totalCount: data.count,
      }
    : { pageNumber: 1, pageSize: currentPageSize, totalCount: 0 };

  return (
    <div className="flex flex-col min-w-0 lg:h-full lg:min-h-0">
      <CustomTable
        columns={[
          { key: "date", label: "Date", sortable: true },
          { key: "time", label: "Time", sortable: true },
          { key: "source", label: "Source", sortable: false },
          { key: "network", label: "Network", sortable: true },
          { key: "bankBatchRef", label: "Bank Batch Ref", sortable: false },
          { key: "lotusRef", label: "Lotus Ref", sortable: false },
          { key: "amount", label: "Amount", sortable: false },
          { key: "balance", label: "Balance", sortable: false },
        ]}
        data={rows.map((r) => ({
          date: r.date,
          time: r.time,
          source: (
            <span className="font-gotham-bold text-xs">{r.source}</span>
          ),
          network: <span className="font-jura-bold text-xs">{r.network}</span>,
          bankBatchRef: (
            <span className="font-jura-bold text-xs">
              {r.bank_batch_ref ?? "—"}
            </span>
          ),
          lotusRef: (
            <span className="font-jura-bold text-xs">
              {r.transaction_ref ?? "—"}
            </span>
          ),
          amount: (
            <span className="text-sm font-jura-bold">
              {formatGhs(parseFloat(String(r.amount)) || 0)}
            </span>
          ),
          balance: (
            <span className="text-sm font-jura-bold text-gray-700">
              {r.balance}
            </span>
          ),
        }))}
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
  );
}

export default CashoutTable;
