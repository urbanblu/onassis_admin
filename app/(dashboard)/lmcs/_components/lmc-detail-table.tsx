"use client";

import CustomTable, { TableRow } from "@/components/custom-table";
import { Tabs } from "@heroui/react";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LmcService from "@/api/lmc";

type Props = {
  type: "Transactions" | "Writers" | "Agents";
  tabs: string[];
  lmcId: string;
};

const TRANSACTION_TAB_MAP: Record<string, string | undefined> = {
  "View All": undefined,
  Commissions: "commission",
  "Top-ups": "topup",
  Transfers: "transfer",
};

const WRITER_STATUS_MAP: Record<string, string | undefined> = {
  "View All": undefined,
  Active: "active",
  Passive: "passive",
  Inactive: "inactive",
  Recover: "recover",
  "No Use": "no_use",
};

function LmcDetailTable({ type, tabs, lmcId }: Props) {
  const [tab, setTab] = useState<string>(tabs[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);

  const transactionType = TRANSACTION_TAB_MAP[tab];
  const writerStatus = WRITER_STATUS_MAP[tab];

  const {
    data: transactionsData,
    isPending: transactionsPending,
    isFetching: transactionsFetching,
  } = useQuery({
    queryKey: ["lmc", lmcId, "transactions", tab, currentPage, currentPageSize],
    queryFn: () =>
      LmcService.fetchTransactions(lmcId, {
        type: transactionType,
        page: currentPage,
        page_size: currentPageSize,
      }),
    enabled: type === "Transactions" && !!lmcId,
  });

  const {
    data: writersData,
    isPending: writersPending,
    isFetching: writersFetching,
  } = useQuery({
    queryKey: [
      "lmc",
      lmcId,
      "writers-overview",
      tab,
      currentPage,
      currentPageSize,
    ],
    queryFn: () =>
      LmcService.fetchWritersOverview(lmcId, {
        status: writerStatus,
        page: currentPage,
        page_size: currentPageSize,
      }),
    enabled: type === "Writers" && !!lmcId,
  });

  const handleTabChange = (key: string) => {
    setTab(key);
    setCurrentPage(1);
  };

  const transactionColumns = [
    { key: "date", label: "Date", sortable: false },
    { key: "time", label: "Time", sortable: false },
    { key: "type", label: "Type", sortable: false },
    { key: "source", label: "Source", sortable: false },
    { key: "reference", label: "Reference", sortable: false },
    { key: "amount", label: "Amount", sortable: false },
    { key: "balance", label: "Balance", sortable: false },
  ];

  const writerColumns = [
    { key: "name", label: "Name", sortable: false },
    { key: "contact", label: "Contact", sortable: false },
    { key: "sign_up_date", label: "Sign-up Date", sortable: false },
    { key: "dop", label: "DoP", sortable: false },
    { key: "dot", label: "DoT", sortable: false },
    { key: "ytd_sales", label: "YTD Sales", sortable: false },
    { key: "ytd_topups", label: "YTD Top-ups", sortable: false },
    { key: "status", label: "Status", sortable: false },
  ];

  const transactionRows: TableRow[] = useMemo(
    () =>
      (transactionsData?.results ?? []).map((row) => ({
        date: <span className="text-xs">{row.date}</span>,
        time: <span className="text-xs">{row.time}</span>,
        type: (
          <span className="text-xs capitalize font-gotham-medium">
            {row.type}
          </span>
        ),
        source: (
          <div className="flex flex-col min-w-0">
            {row.source_name && (
              <span className="text-xs truncate">{row.source_name}</span>
            )}
            {row.source_phone && (
              <span className="text-[10px] text-gray-500">
                {row.source_phone}
              </span>
            )}
          </div>
        ),
        reference: (
          <span className="text-xs text-gray-500">{row.reference ?? "—"}</span>
        ),
        amount: (
          <span className="text-xs font-jura-bold">GHS {row.amount}</span>
        ),
        balance: (
          <span className="text-xs font-jura-bold">GHS {row.balance}</span>
        ),
      })),
    [transactionsData],
  );

  const writerRows: TableRow[] = useMemo(
    () =>
      (writersData?.results ?? []).map((row) => ({
        name: <span className="text-xs font-gotham-medium">{row.name}</span>,
        contact: <span className="text-xs text-gray-500">{row.contact}</span>,
        sign_up_date: (
          <span className="text-xs">
            {new Date(row.sign_up_date).toLocaleDateString()}
          </span>
        ),
        dop: <span className="text-xs">{row.dop}</span>,
        dot: <span className="text-xs">{row.dot}</span>,
        ytd_sales: (
          <span className="text-xs font-jura-bold">GHS {row.ytd_sales}</span>
        ),
        ytd_topups: (
          <span className="text-xs font-jura-bold">GHS {row.ytd_topups}</span>
        ),
        status: (
          <span className="text-xs capitalize font-gotham-medium">
            {row.status.replace("_", " ")}
          </span>
        ),
      })),
    [writersData],
  );

  const isTransactions = type === "Transactions";
  const isWriters = type === "Writers";

  const columns = isTransactions
    ? transactionColumns
    : isWriters
      ? writerColumns
      : transactionColumns;

  const tableData = isTransactions
    ? transactionRows
    : isWriters
      ? writerRows
      : [];

  const totalCount = isTransactions
    ? (transactionsData?.count ?? 0)
    : isWriters
      ? (writersData?.count ?? 0)
      : 0;

  const loading = isTransactions
    ? transactionsPending
    : isWriters
      ? writersPending
      : false;
  const isRefetching = isTransactions
    ? transactionsFetching
    : isWriters
      ? writersFetching
      : false;

  const pagination = {
    pageNumber: currentPage,
    pageSize: currentPageSize,
    totalCount,
  };

  return (
    <div className="border rounded-sm p-5">
      <span className="font-gotham-black">{type}</span>
      <div className="flex flex-col sm:flex-row items-center sm:justify-between mt-3">
        <Tabs
          className="max-w-full flex-wrap"
          variant="primary"
          selectedKey={tab}
          onSelectionChange={(key) => handleTabChange(key.toString())}
        >
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options" className="rounded-sm">
              {tabs.map((i) => (
                <Tabs.Tab
                  className="px-4 py-1 text-xs font-gotham-bold whitespace-nowrap"
                  id={i}
                  key={i}
                >
                  {i}
                  <Tabs.Indicator className="rounded-sm" />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
      </div>
      {type != "Agents" && (
        <CustomTable
          key={tab}
          className="py-3"
          addTableBorder={false}
          columns={columns}
          data={tableData}
          pagination={pagination}
          pageSize={currentPageSize}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => {
            setCurrentPageSize(size);
            setCurrentPage(1);
          }}
          onRowClick={() => {}}
          onSort={() => {}}
          loading={loading}
          isRefetching={isRefetching}
        />
      )}
      {type == "Agents" && (
        <div className="w-full justify-center flex text-xs pb-96 mt-2">
          Content coming soon
        </div>
      )}
    </div>
  );
}

export default LmcDetailTable;
