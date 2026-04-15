"use client";

import { Tabs } from "@heroui/react";
import FirstSalesSegment from "./_components/first-segment";
import SecondSalesSegment from "./_components/second-segment";
import ThirdSalesSegment from "./_components/third-segment";

function SalesPageView() {
  return (
    <div className="w-full h-full md:overflow-hidden py-5 px-5 md:px-8 flex flex-col">
      <Tabs className="flex flex-col flex-1 min-h-0">
        <Tabs.ListContainer className="sm:max-w-2xs">
          <Tabs.List aria-label="Sales sections" className="rounded-sm">
            <Tabs.Tab
              className="px-4 py-1 text-black data-[selected=true]:text-white text-xs font-gotham-bold"
              id="tickets"
            >
              Tickets
              <Tabs.Indicator className="rounded-sm bg-[#f6a21f]" />
            </Tabs.Tab>
            <Tabs.Tab
              className="px-4 py-1 text-black data-[selected=true]:text-white text-xs font-gotham-bold"
              id="retailers"
            >
              Retailers
              <Tabs.Indicator className="rounded-sm bg-[#f6a21f]" />
            </Tabs.Tab>
            <Tabs.Tab
              className="px-4 py-1 text-black data-[selected=true]:text-white text-xs font-gotham-bold"
              id="winnings"
            >
              Winnings
              <Tabs.Indicator className="rounded-sm bg-[#f6a21f]" />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel id="tickets" className="flex-1 min-h-0 pt-4">
          <FirstSalesSegment />
        </Tabs.Panel>
        <Tabs.Panel id="retailers" className="flex-1 min-h-0 pt-4">
          <SecondSalesSegment />
        </Tabs.Panel>
        <Tabs.Panel id="winnings" className="flex-1 min-h-0 pt-4">
          <ThirdSalesSegment />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default SalesPageView;
