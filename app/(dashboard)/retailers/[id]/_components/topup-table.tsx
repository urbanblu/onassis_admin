"use client";

import CustomTable, { TableRow } from "@/components/custom-table";
import React, { useState } from "react";

function TopUpTable() {
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
        data={
          [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18,
            20,
          ].map((item) => {
            return {
              date: "Thu, 02 Apr 2026",
              time: "20:15:12",
              source: (
                <span className="font-gotham-bold text-xs">
                  Fortune Thursday
                </span>
              ),
              network: <span className="font-jura-bold text-xs">MTN</span>,
              bankBatchRef: (
                <span className="font-jura-bold text-xs">BBREF12345</span>
              ),
              lotusRef: (
                <span className="font-jura-bold text-xs">LOTUS56789</span>
              ),
              amount: (
                <span className="text-sm font-jura-bold">GHS 1,000.00</span>
              ),
              balance: (
                <span className="text-sm font-jura-bold text-gray-700">
                  GHS 12,000.00
                </span>
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
  );
}

export default TopUpTable;
