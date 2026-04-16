import CustomTable from "@/components/custom-table";
import { Tabs } from "@heroui/react";
import { useState } from "react";

type Props = {
  type: string;
  tabs: string[];
};

function LmcDetailTable(payload: Props) {
  const [tab, setTab] = useState<string>(payload.tabs[0]);
  return (
    <div className="border rounded-sm p-5">
      <span className="font-gotham-black">{payload.type}</span>
      <div className="flex flex-col sm:flex-row items-center sm:justify-between mt-3">
        <Tabs
          className="max-w-full flex-wrap"
          variant="primary"
          selectedKey={tab}
          onSelectionChange={(key) => setTab(key.toString())}
        >
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options" className="rounded-sm">
              {payload.tabs.map((i) => {
                return (
                  <Tabs.Tab
                    className={`px-4 py-1 text-xs font-gotham-bold`}
                    id={i}
                    key={i}
                  >
                    {i}
                    <Tabs.Indicator className="rounded-sm" />
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
      </div>
      <CustomTable
        key={tab}
        className="py-3"
        addTableBorder={false}
        columns={[
          { key: "date", label: "Date", sortable: true },
          { key: "time", label: "Time", sortable: true },
          { key: "type", label: "Type", sortable: false },
          { key: "source", label: "Source", sortable: true },
          { key: "reference", label: "Reference", sortable: false },
          { key: "amount", label: "Amount", sortable: false },
          { key: "balance", label: "Balance", sortable: false },
        ]}
        data={Array(30)
          .fill(1)
          .map((i) => {
            return {
              date: "2024-06-01",
              time: "10:30 AM",
              type: "Commission",
              source: "John Doe",
              reference: "REF123456",
              amount: "GHS 200.00",
              balance: "GHS 1,500.00",
            };
          })}
        // pagination={pagination}
        // pageSize={currentPageSize}
        // onPageChange={handlePageChange}
        // onPageSizeChange={handlePageSizeChange}
        // onRowClick={handleRowClick}
        // onSort={handleSort}
        // loading={loading}
        isRefetching={false}
      />
    </div>
  );
}

export default LmcDetailTable;
