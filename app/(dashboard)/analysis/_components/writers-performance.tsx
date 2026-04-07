import { Avatar, Tabs } from "@heroui/react";

function WritersPerformace() {
  return (
    <div className="flex flex-col space-y-5">
      {/* SECTION 1: PERFORMANCE CHART & INFO CARDS */}
      <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-4 gap-4 h-auto">
        <div className="col-span-3 border rounded-sm px-5 py-4 min-h-[400px] flex flex-col">
          <div className="flex flex-col h-full">
            <div className="sm:flex sm:justify-between space-y-5 sm:space-y-0">
              <div className="flex-col space-y-2">
                <div className="text-sm font-gotham-bold">
                  Total Writers vs Active Writers
                </div>
                <div className="space-x-4 flex">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full w-3.5 h-3.5 bg-[#2ECC71]"></div>
                    <span className="text-xs">Deployed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full w-3.5 h-3.5 bg-[#18A2B8]"></div>
                    <span className="text-xs">Active</span>
                  </div>
                </div>
              </div>
              <Tabs className="min-w-48 flex-wrap">
                <Tabs.ListContainer>
                  <Tabs.List aria-label="Options" className="rounded-sm">
                    <Tabs.Tab
                      className="px-4 py-1 text-xs font-gotham-bold"
                      id="overview"
                    >
                      {"30 days"}
                      <Tabs.Indicator className="rounded-sm" />
                    </Tabs.Tab>
                    <Tabs.Tab
                      className="px-4 py-1 text-xs font-gotham-bold"
                      id="analytics"
                    >
                      {"1 year"}
                      <Tabs.Indicator className="rounded-sm" />
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>
              </Tabs>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span className="text-xs font-gotham-regular text-gray-400">
                Data not available
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="col-span-1 flex flex-col gap-4">
          <InfoCard
            title="YTD Top-Ups"
            totalAmount="GHS 19,753,968.06"
            lastWeekAmount="GHS 2,077,816.59"
            lastMonthAmount="GHS 7,329,046.04"
            last3MonthsAmount="GHS 19,749,605.00"
          />
          <InfoCard
            title="YTD Winnings"
            totalAmount="GHS 19,753,968.06"
            lastWeekAmount="GHS 2,077,816.59"
            lastMonthAmount="GHS 7,329,046.04"
            last3MonthsAmount="GHS 19,749,605.00"
          />
          <div className="border rounded-sm p-5 flex-none">
            <div className="flex flex-col items-start space-y-3">
              <span className="font-gotham-black text-sm text-gray-800">
                {"Best & Worst Performance"}
              </span>
              <div className="flex flex-col w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-jura-regular">
                    {"Best Month (Mar '26)"}
                  </span>
                  <span className="text-sm font-jura-bold">
                    {"+ GHS 1,102,262.64"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs font-jura-regular">
                    {"Worst Month (Jan '26)"}
                  </span>
                  <span className="text-sm font-jura-bold">
                    {"-GHS 673,816.38"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: RETAILERS GRID */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="flex flex-col sm:col-span-3 space-y-3">
          <span className="font-gotham-black text-sm text-gray-800">
            {"Top 10 Retailers - Year to Date"}
          </span>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-3 gap-y-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
              return (
                <div
                  className="border rounded-sm flex justify-center items-center space-x-4 py-5"
                  key={index}
                >
                  <Avatar size="lg" />
                  <div className="flex flex-col items-start">
                    <span className="font-jura-bold text-sm">
                      GHS 318,485.91
                    </span>
                    <span className="font-gotham-black text-[0.6rem]">
                      KWEKU APPIAH
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="sm:col-span-1 border rounded-sm p-5">
          <div className="flex flex-col space-y-1">
            <span className="font-gotham-black text-sm text-gray-800">
              {"YTD Retention Rate"}
            </span>
            <span className="font-gotham-regular text-[0.7rem] text-gray-600">
              {"% of net earnings retained after payout"}
            </span>
          </div>
          <div className="h-full flex flex-col text-4xl sm:text-5xl font-jura-bold">
            <span className="self-center mt-4 sm:mt-5">7.06%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

type InfoCardProps = {
  title: string;
  totalAmount: string;
  lastWeekAmount: string;
  lastMonthAmount: string;
  last3MonthsAmount: string;
};

const InfoCard = ({
  title,
  totalAmount,
  lastWeekAmount,
  lastMonthAmount,
  last3MonthsAmount,
}: InfoCardProps) => {
  return (
    <div className="border rounded-sm p-5 h-full row-span-2">
      <div className="flex flex-col space-y-5 items-start justify-around h-full">
        <span className="font-gotham-black text-sm text-gray-800">{title}</span>

        <span className="font-jura-bold text-2xl">{totalAmount}</span>

        <div className="flex flex-col w-full space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-jura-regular">Last Week</span>
            <span className="text-sm font-jura-bold">{lastWeekAmount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-jura-regular">Last Month</span>
            <span className="text-sm font-jura-bold">{lastMonthAmount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-jura-regular">Last 3 Months</span>
            <span className="text-sm font-jura-bold">{last3MonthsAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WritersPerformace;
