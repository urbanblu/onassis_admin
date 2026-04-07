"use client";

import CustomTable from "@/components/custom-table";
import React, { useState } from "react";

function SalesTable() {
  const [currentPageSize, setCurrentPageSize] = useState(20);

  const handlePageChange = (page: number) => {
    void page;
  };

  const handlePageSizeChange = (size: number) => {
    setCurrentPageSize(size);
  };

  const handleRowClick = () => {};

  const handleSort = (column: string, direction: "asc" | "desc") => {
    console.log("Sort by:", column, direction);
  };

  return (
    <div className="flex flex-col min-w-0 lg:h-full lg:min-h-0">
      <CustomTable
        columns={[
          { key: "couponId", label: "Coupon ID", sortable: true },
          { key: "date", label: "Date", sortable: false },
          { key: "time", label: "Time", sortable: true },
          { key: "event", label: "Event #", sortable: true },
          { key: "game", label: "Game", sortable: false },
          { key: "play", label: "Play", sortable: false },
          { key: "amountPaid", label: "Amount Paid", sortable: false },
          { key: "stakes", label: "Stakes", sortable: false },
        ]}
        data={
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
            return {
              couponId: "CPN123456",
              date: "2024-06-01",
              time: "12:34:56",
              event: "265",
              game: "Fortune Thursday",
              play: "Single",
              amountPaid: "GHS 200.00",
              stakes: "x3",
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

export default SalesTable;
