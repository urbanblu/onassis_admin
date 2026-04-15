"use client";

import CustomTable, { TableRow } from "@/components/custom-table";
import { CloseButton, cn, Drawer, Table } from "@heroui/react";
import React from "react";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import GamesService from "@/api/games";
import { formatGhs, parseStakeAmount } from "@/utils/currency";

const MOCK_STAKE_TIME = "12:45:01 PM";
const MOCK_WINNING = "GHS 0.00";

type DrawerMode = "pre" | "post1" | "post2" | null;

function DrawDrawer({
  isOpen,
  onCloseTap,
  eventId,
  drawerMode,
}: {
  isOpen: boolean;
  onCloseTap: () => void;
  eventId: string | null;
  drawerMode: DrawerMode;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openedRows, setOpenedRows] = useState<number[]>([]);
  const [currentPageSize, setCurrentPageSize] = useState(20);

  const fetchPreTickets = drawerMode === "pre" && !!eventId && isOpen;

  const { data: ticketPayload, isPending } = useQuery({
    queryKey: [
      "games",
      "draw-event-tickets",
      eventId,
      currentPage,
      currentPageSize,
    ],
    queryFn: () =>
      GamesService.fetchDrawEventTickets(eventId!, {
        page: currentPage,
        page_size: currentPageSize,
      }),
    enabled: fetchPreTickets,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setCurrentPageSize(size);
    setCurrentPage(1);
  };

  const handleRowClick = (_row: TableRow, _index: number) => {};

  const handleSort = (column: string, direction: "asc" | "desc") => {
    void column;
    void direction;
  };

  const handleRowExpansion = (index: number) => {
    setOpenedRows((state) => {
      if (state.includes(index)) {
        return state.filter((i) => i !== index);
      }
      return [...state, index];
    });
  };

  const event = ticketPayload?.event;
  const tickets = ticketPayload?.tickets;
  const results = tickets?.results ?? [];

  const pagination = tickets
    ? {
        pageNumber: currentPage,
        pageSize: currentPageSize,
        totalCount: tickets.count,
      }
    : { pageNumber: 1, pageSize: currentPageSize, totalCount: 0 };

  const ticketMeta = results.map((t) => ({
    stakes: t.stakes,
    ticketNo: t.ticket_no,
  }));

  const tableRows: TableRow[] = results.map((t) => ({
    ticket: t.ticket_no,
    stake: String(t.stake_count),
    stakeValue: t.stake_value,
    Datetime: t.datetime,
    stakedBy: t.staked_by,
    phoneNumber: t.phone_number,
  }));

  const showPostPlaceholder =
    isOpen && (drawerMode === "post1" || drawerMode === "post2");

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
                    {drawerMode === "post1"
                      ? "Post Draw I"
                      : drawerMode === "post2"
                        ? "Post Draw II"
                        : "Pre Draw Tickets"}
                  </Drawer.Heading>
                  <CloseButton
                    className="bg-transparent text-black"
                    onClick={onCloseTap}
                  />
                </div>
              </Drawer.Header>
              <Drawer.Body>
                {showPostPlaceholder ? (
                  <div className="p-6 text-sm text-gray-600">
                    Post-draw ticket detail is not available from the API yet.
                    Use the live endpoint when it is published.
                  </div>
                ) : (
                  <div className="flex flex-col space-y-5 sm:h-[calc(100vh-6rem)] sm:overflow-hidden">
                    <div className="border rounded-sm p-4 max-lg:overflow-x-auto max-lg:overflow-y-hidden">
                      <div className="flex flex-nowrap items-start gap-4 md:gap-6 w-max lg:w-full lg:min-w-0 lg:justify-between">
                        <div className="flex flex-col max-lg:shrink-0">
                          <div className="whitespace-nowrap">
                            <span className="text-sm font-jura-bold">
                              {event?.event_no ?? "—"}
                            </span>
                            <span className="text-[.6rem] font-gotham-regular">
                              /{event?.event_name ?? ""}
                            </span>
                          </div>
                          <span className="text-[.6rem] font-gotham-black text-gray-500 whitespace-nowrap">
                            Event
                          </span>
                        </div>
                        <div className="max-lg:shrink-0">
                          <div className="flex flex-nowrap gap-2 items-center">
                            {(event?.draw_numbers ?? []).map((n, i) => (
                              <span
                                key={i}
                                className="bg-[#237c9c] rounded-full text-white w-[25px] h-[25px] text-xs text-center p-1"
                              >
                                {n}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col max-lg:shrink-0">
                          <div className="whitespace-nowrap">
                            <span className="text-sm font-jura-bold">
                              {event?.total_wins ?? "—"}
                            </span>
                          </div>
                          <span className="text-[.6rem] font-gotham-black text-gray-500 whitespace-nowrap">
                            Total Wins
                          </span>
                        </div>
                        <div className="flex flex-col max-lg:shrink-0">
                          <div className="whitespace-nowrap">
                            <span className="text-sm font-jura-bold">
                              {event?.payout_ratio ?? "—"}
                            </span>
                          </div>
                          <span className="text-[.6rem] font-gotham-black text-gray-500 whitespace-nowrap">
                            Payout Ratio
                          </span>
                        </div>
                        <div className="flex flex-col max-lg:shrink-0">
                          <div className="whitespace-nowrap">
                            <span className="text-sm font-jura-bold">
                              {event?.draw_date ?? "—"}
                            </span>
                            <span className="text-[.6rem] font-jura-semibold">
                              /{event?.draw_time ?? ""}
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
                            {
                              key: "ticket",
                              label: "Ticket #",
                              sortable: false,
                            },
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
                          data={tableRows}
                          pagination={pagination}
                          onRender={(row, index, columns) => {
                            const meta = ticketMeta[index];
                            const stakes = meta?.stakes;
                            const ticketNo = meta?.ticketNo;
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
                                {openedRows.includes(index) && stakes && (
                                  <>
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
                                      </Table.Cell>
                                    </Table.Row>
                                    {stakes.map((st) => {
                                      const nums = st.numbers
                                        .split(",")
                                        .map((x) => x.trim());
                                      return (
                                        <Table.Row
                                          key={st.stake_id}
                                          className="bg-gray-50/50"
                                        >
                                          <Table.Cell
                                            colSpan={columns.length}
                                            className="p-0"
                                          >
                                            <div className="grid grid-cols-6 w-full min-w-0 py-3 px-6 hover:bg-white transition-colors border-b border-gray-50 pl-10">
                                              <span className="text-xs font-gotham-regular min-w-0 block truncate pr-2">
                                                {ticketNo ?? "—"}
                                              </span>
                                              <span className="text-xs font-gotham-regular min-w-0 block truncate pr-2">
                                                {st.play}
                                              </span>
                                              <div>
                                                <div className="flex space-x-2 items-center flex-wrap">
                                                  {nums.map((num, ni) => (
                                                    <span
                                                      key={ni}
                                                      className="rounded bg-transparent border-[1.5px] p-1 text-xs font-gotham-medium"
                                                    >
                                                      {num}
                                                    </span>
                                                  ))}
                                                </div>
                                              </div>
                                              <span className="text-sm font-jura-bold">
                                                {MOCK_STAKE_TIME}
                                              </span>
                                              <span className="text-sm font-jura-bold">
                                                {formatGhs(
                                                  parseStakeAmount(
                                                    st.stake_amount,
                                                  ),
                                                )}
                                              </span>
                                              <span className="text-sm font-jura-bold">
                                                {MOCK_WINNING}
                                              </span>
                                            </div>
                                          </Table.Cell>
                                        </Table.Row>
                                      );
                                    })}
                                  </>
                                )}
                              </React.Fragment>
                            );
                          }}
                          pageSize={currentPageSize}
                          onPageChange={handlePageChange}
                          onPageSizeChange={handlePageSizeChange}
                          onRowClick={handleRowClick}
                          onSort={handleSort}
                          loading={fetchPreTickets && isPending}
                          isRefetching={false}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
}

export default DrawDrawer;
