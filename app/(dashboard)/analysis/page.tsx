"use client";

import { Tabs } from "@heroui/react";
import WritersPerformace from "./_components/writers-performance";
import RetentionRatePerformance from "./_components/rate-performace";

export default function AnalysisPageView() {
  return (
    <div className="flex flex-col p-5 px-7 pb-10">
      <Tabs>
        <Tabs.ListContainer className="sm:max-w-md">
          <Tabs.List aria-label="Analysis sections" className="rounded-sm">
            <Tabs.Tab
              className="px-4 py-1 text-xs font-gotham-bold text-black data-[selected=true]:text-white"
              id="writers"
            >
              Writers Performance
              <Tabs.Indicator className="rounded-sm bg-[#f6a21f]" />
            </Tabs.Tab>
            <Tabs.Tab
              className="px-4 py-1 text-xs font-gotham-bold text-black data-[selected=true]:text-white"
              id="retention"
            >
              Sales, Wins & Retention Rate
              <Tabs.Indicator className="rounded-sm bg-[#f6a21f]" />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel id="writers" className="pt-5">
          <WritersPerformace />
        </Tabs.Panel>
        <Tabs.Panel id="retention" className="pt-5">
          <RetentionRatePerformance />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
