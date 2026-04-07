"use client";

import CustomTable, { TableRow } from "@/components/custom-table";
import { CloseButton, cn, Drawer, Table } from "@heroui/react";
import React from "react";
import { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

function DrawDrawer({
  isOpen,
  onCloseTap,
}: {
  isOpen: boolean;
  onCloseTap: () => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openedRows, setOpenedRows] = useState<number[]>([]);
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

  const handleRowExpansion = (index: number) => {
    setOpenedRows((state) => {
      if (state.includes(index)) {
        return state.filter((i) => i !== index);
      } else {
        return [...state, index];
      }
    });
  };

  return (
    <div>
      <Drawer isOpen={isOpen}>
        <Drawer.Backdrop isDismissable={true}>
          <Drawer.Content
            placement="right"
            className="w-[70vw]! max-w-[70vw] min-w-[300px] bg-white h-screen"
          >
            <Drawer.Dialog className="rounded-none w-full">
              <Drawer.Header>
                <div className="flex justify-between items-center">
                  <Drawer.Heading className="text-sm font-gotham-bold">
                    Pre Draw Tickets
                  </Drawer.Heading>
                  <CloseButton
                    className="bg-transparent text-black"
                    onClick={onCloseTap}
                  />
                </div>
              </Drawer.Header>
              <Drawer.Body>
                <div className="flex flex-col space-y-5 sm:h-[calc(100vh-6rem)] sm:overflow-hidden">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-gotham-regular">
                      Export to:
                    </span>
                    <FaRegFilePdf />
                  </div>

                  <div className="border rounded-sm p-4 max-lg:overflow-x-auto max-lg:overflow-y-hidden">
                    <div className="flex flex-nowrap items-start gap-4 md:gap-6 w-max lg:w-full lg:min-w-0 lg:justify-between">
                      <div className="flex flex-col max-lg:shrink-0">
                        <div className="whitespace-nowrap">
                          <span className="text-sm font-jura-bold">256</span>
                          <span className="text-[.6rem] font-gotham-regular">
                            /Fortune Thursday
                          </span>
                        </div>
                        <span className="text-[.6rem] font-gotham-black text-gray-500 whitespace-nowrap">
                          Event
                        </span>
                      </div>
                      <div className="max-lg:shrink-0">
                        <div className="flex flex-nowrap gap-2 items-center">
                          <span className="rounded bg-transparent border-[1.5px] p-1 text-xs font-gotham-medium shrink-0">
                            12
                          </span>
                          <span className="rounded bg-transparent border-[1.5px] p-1 text-xs font-gotham-medium shrink-0">
                            27
                          </span>
                          <span className="rounded bg-transparent border-[1.5px] p-1 text-xs font-gotham-medium shrink-0">
                            41
                          </span>
                          <span className="rounded bg-transparent border-[1.5px] p-1 text-xs font-gotham-medium shrink-0">
                            45
                          </span>
                          <span className="rounded bg-transparent border-[1.5px] p-1 text-xs font-gotham-medium shrink-0">
                            66
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col max-lg:shrink-0">
                        <div className="whitespace-nowrap">
                          <span className="text-sm font-jura-bold">
                            GHS 231,088.71
                          </span>
                        </div>
                        <span className="text-[.6rem] font-gotham-black text-gray-500 whitespace-nowrap">
                          Total Wins
                        </span>
                      </div>
                      <div className="flex flex-col max-lg:shrink-0">
                        <div className="whitespace-nowrap">
                          <span className="text-sm font-jura-bold">59.44%</span>
                        </div>
                        <span className="text-[.6rem] font-gotham-black text-gray-500 whitespace-nowrap">
                          Payout Ratio
                        </span>
                      </div>
                      <div className="flex flex-col max-lg:shrink-0">
                        <div className="whitespace-nowrap">
                          <span className="text-sm font-jura-bold">
                            Thu, 02 Apr 2026
                          </span>
                          <span className="text-[.6rem] font-jura-semibold">
                            /20:15:12
                          </span>
                        </div>
                        <span className="text-[.6rem] font-gotham-black text-gray-500 whitespace-nowrap">
                          Date & Time
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="h-[500px] sm:h-full sm:flex-1 sm:min-h-0 mt-2">
                    <div className="h-full overflow-hidden">
                      <CustomTable
                        columns={[
                          { key: "coupon", label: "Coupon #", sortable: false },
                          {
                            key: "stake",
                            label: "Stake",
                            sortable: false,
                          },
                          {
                            key: "stakeValue",
                            label: "Stake Value",
                            sortable: false,
                          },
                          {
                            key: "Datetime",
                            label: "datetime",
                            sortable: true,
                          },
                          {
                            key: "stakedBy",
                            label: "Staked By",
                            sortable: false,
                          },
                          {
                            key: "phoneNumber",
                            label: "Phone Number",
                            sortable: false,
                          },
                        ]}
                        data={[
                          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        ].map((item) => {
                          return {
                            coupon: "108006342026040219574926570",
                            stake: "5",
                            stakeValue: "	GHS 21.00",
                            Datetime: "Thu, 02 Apr 2026",
                            stakedBy: "Seth akorli siameh",
                            phoneNumber: "+233 (0)24 448 2536",
                          };
                        })}
                        onRender={(row, index, columns) => {
                          return (
                            <React.Fragment key={index}>
                              <Table.Row
                                id={`row-${index}`}
                                className="hover:bg-gray-50 cursor-pointer"
                              >
                                {columns.map((col) => (
                                  <Table.Cell key={col.key}>
                                    <div
                                      className={cn(
                                        "flex justify-between items-center",
                                        [
                                          "stakeValue",
                                          "stake",
                                          "stackedBy",
                                          "phoneNumber",
                                        ].includes(col.key)
                                          ? "font-jura-bold text-sm"
                                          : "",
                                      )}
                                    >
                                      <div className="flex items-center justify-between gap-2 w-full min-w-0">
                                        <span className="truncate flex-1 min-w-0">
                                          {row[col.key]}
                                        </span>
                                        {col.key === "phoneNumber" && (
                                          <IoChevronDown
                                            size={15}
                                            className="shrink-0 cursor-pointer text-gray-500 hover:text-black transition-colors"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleRowExpansion(index);
                                            }}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </Table.Cell>
                                ))}
                              </Table.Row>
                              {openedRows.includes(index) && (
                                <Table.Row className="bg-gray-50/50">
                                  <Table.Cell
                                    colSpan={columns.length}
                                    className="p-0"
                                  >
                                    <div className="grid grid-cols-6 w-full py-3 px-4 border-b pl-10">
                                      {[
                                        "Ticket #",
                                        "Play",
                                        "Stake",
                                        "Stake Time",
                                        "Stake Amount",
                                        "Winning",
                                      ].map((header, hIndex) => (
                                        <span
                                          key={hIndex}
                                          className="text-[10px] font-gotham-bold text-gray-500 uppercase"
                                        >
                                          {header}
                                        </span>
                                      ))}
                                    </div>
                                    <div className="grid grid-cols-6 w-full py-3 px-6 hover:bg-white transition-colors border-b border-gray-50 pl-10">
                                      <span className="text-xs font-gotham-regular">
                                        2026000036874
                                      </span>
                                      <span className="text-xs font-gotham-regular">
                                        Perm 3
                                      </span>
                                      <div>
                                        <div className="flex space-x-2 items-center">
                                          <span className="rounded bg-transparent border-[1.5px] p-1 text-xs font-gotham-medium">
                                            12
                                          </span>
                                          <span className="rounded bg-transparent border-[1.5px] p-1 text-xs font-gotham-medium">
                                            27
                                          </span>
                                        </div>
                                      </div>
                                      <span className="text-sm font-jura-bold">
                                        12:45:01 PM
                                      </span>
                                      <span className="text-sm font-jura-bold">
                                        GHS 5.00
                                      </span>
                                      <span className="text-sm font-jura-bold">
                                        GHS 0.00
                                      </span>
                                    </div>
                                  </Table.Cell>
                                </Table.Row>
                              )}
                            </React.Fragment>
                          );
                        }}
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
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
}

export default DrawDrawer;
