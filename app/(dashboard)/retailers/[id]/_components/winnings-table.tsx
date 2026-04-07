"use client";

import CustomTable from "@/components/custom-table";
import React, { useState } from "react";

function WinningsTable() {
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
          { key: "ticket", label: "Ticket #", sortable: true },
          { key: "coupon", label: "Coupon #", sortable: true },
          { key: "event", label: "Event #", sortable: false },
          { key: "game", label: "Game", sortable: true },
          { key: "play", label: "Play", sortable: false },
          { key: "datetime", label: "Datetime", sortable: false },
          { key: "stakeAmount", label: "Stake Amount", sortable: false },
          { key: "amountWon", label: "Amount Won", sortable: false },
        ]}
        data={
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
            return {
              ticket: "TCK123456",
              coupon: "CPN654321",
              event: "465",
              game: "Ultimate Sunday",
              play: "Multiple",
              datetime: "2024-06-01 15:44:21",
              stakeAmount: "GHS 150.00",
              amountWon: "GHS 900.00",
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

export default WinningsTable;
