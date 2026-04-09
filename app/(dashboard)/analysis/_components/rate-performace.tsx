"use client";

import { Separator, Tabs } from "@heroui/react";
import { BiMoney } from "react-icons/bi";
import Image from "next/image";
import CollectionIcon from "@/public/images/collection-icon.webp";
import PayoutIcon from "@/public/images/payout-icon.webp";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useQuery } from "@tanstack/react-query";
import FinancialsService from "@/api/financials";
import { formatGhs } from "@/utils/currency";

function RetentionRatePerformance() {
  const { data: salesCard } = useQuery({
    queryKey: ["financials", "sales-card"],
    queryFn: FinancialsService.fetchSalesCard,
  });
  const { data: netTopupsCard } = useQuery({
    queryKey: ["financials", "net-topups-card"],
    queryFn: FinancialsService.fetchNetTopupsCard,
  });
  const { data: writersAtWorkCard } = useQuery({
    queryKey: ["financials", "writers-at-work-card"],
    queryFn: FinancialsService.fetchWritersAtWorkCard,
  });
  const { data: winsCard } = useQuery({
    queryKey: ["financials", "wins-card"],
    queryFn: FinancialsService.fetchWinsCard,
  });
  const { data: liquidationCard } = useQuery({
    queryKey: ["financials", "liquidation-card"],
    queryFn: FinancialsService.fetchLiquidationCard,
  });
  const { data: settlementsCard } = useQuery({
    queryKey: ["financials", "settlements-card"],
    queryFn: FinancialsService.fetchSettlementsCard,
  });

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            <PrimaryCard
              label="Sales"
              value={salesCard?.total_sales ?? "N/A"}
              subLabel="Net Sales"
              subValue={
                salesCard != null
                  ? formatGhs(salesCard.total_sales_amount)
                  : "N/A"
              }
            />
            <PrimaryCard
              label="Net Top-Ups"
              value={netTopupsCard?.net_topups ?? "N/A"}
              subLabel="Gross Top-Ups"
              subValue={netTopupsCard?.gross_topups ?? "N/A"}
            />
            <PrimaryCard
              label="Writers@Work"
              value={
                writersAtWorkCard != null
                  ? `${writersAtWorkCard.active_writers.toLocaleString("en-GH")}`
                  : "N/A"
              }
              subLabel="Total Writers"
              subValue={
                writersAtWorkCard != null
                  ? `${writersAtWorkCard.total_writers.toLocaleString("en-GH")}`
                  : "N/A"
              }
            />
            <PrimaryCard
              label="Wins"
              value={winsCard?.total_wins ?? "N/A"}
              subLabel="No. of Winning Stakes"
              subValue={
                winsCard != null
                  ? `${winsCard.winning_stakes.toLocaleString("en-GH")}`
                  : "N/A"
              }
            />
            <PrimaryCard
              label="Liquidation"
              value={liquidationCard?.total_liquidation ?? "N/A"}
              subLabel="Unclaimed Coupons"
              subValue={liquidationCard?.unclaimed_coupons ?? "N/A"}
            />
            <PrimaryCard
              label="Settlements"
              value={settlementsCard?.total_settlements ?? "N/A"}
              subLabel="Claim Wallet Bal."
              subValue={settlementsCard?.claim_wallet_balance ?? "N/A"}
            />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <SecondaryCard image={CollectionIcon} label="Collection account" />
            <SecondaryCard image={PayoutIcon} label="Payout account" />
          </div>
        </div>
      </div>
      <div className="border rounded-sm px-5 py-4 min-h-[400px] flex flex-col">
        <div className="flex flex-col flex-1 h-full">
          <div className="sm:flex sm:justify-between space-y-5 sm:space-y-0 shrink-0 mb-4">
            <div className="flex-col space-y-1">
              <div className="text-sm font-gotham-bold uppercase tracking-tight">
                Retention Rate Trend
              </div>
              <div className="space-x-2 flex items-center">
                <span className="text-xs font-gotham-black text-gray-500">
                  YTD RR:{" "}
                </span>
                <span className="text-xs font-jura-bold">{"—"}</span>
              </div>
            </div>

            <div className="shrink-0">
              <Tabs className="min-w-48 flex-wrap">
                <Tabs.ListContainer>
                  <Tabs.List
                    aria-label="Options"
                    className="rounded-sm bg-gray-100"
                  >
                    <Tabs.Tab
                      id="overview"
                      className="px-4 py-1 text-xs font-gotham-bold"
                    >
                      {"30 days"}
                      <Tabs.Indicator className="rounded-sm" />
                    </Tabs.Tab>
                    <Tabs.Tab
                      id="analytics"
                      className="px-4 py-1 text-xs font-gotham-bold"
                    >
                      {"1 year"}
                      <Tabs.Indicator className="rounded-sm" />
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>
              </Tabs>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center rounded-sm">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs text-gray-500">
                Trend chart not wired (graph integration deferred)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetentionRatePerformance;

const PrimaryCard = ({
  label,
  value,
  subLabel,
  subValue,
}: {
  label: string;
  value: string;
  subLabel: string;
  subValue: string;
}) => {
  return (
    <div className="flex flex-col border rounded-sm">
      <div className="flex justify-between items-center p-4">
        <span className="text-sm font-gotham-black">{label}</span>
        <BiMoney />
      </div>
      <Separator />
      <div className="flex flex-col items-start p-4">
        <span className="font-jura-bold text-2xl">{value}</span>
        <div className="flex space-x-1 text-gray-500">
          <span className="font-gotham-black text-xs">{subLabel}</span>
          <span className="font-jura-bold text-xs">{subValue}</span>
        </div>
      </div>
    </div>
  );
};

const SecondaryCard = ({
  image,
  label,
  umb,
  value,
}: {
  image: StaticImport;
  label: string;
  umb?: string;
  value?: string;
}) => {
  return (
    <div className="flex flex-col border rounded-sm px-5 py-3">
      <div className="flex justify-start">
        <Image src={image} alt={label} className="h-7 w-7" />
      </div>
      <div className="flex flex-col items-start">
        <span className="font-jura-bold text-2xl mt-2.5">{value ?? "N/A"}</span>
        <span className="font-gotham-regular text-[0.65rem] mt-2">{label}</span>
        <div className="flex space-x-1 text-gray-500">
          <span className="font-gotham-black text-[0.65rem] text-black">
            {"UMB:"}
          </span>
          <span className="font-gotham-regular text-[0.65rem]">
            {umb ?? "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};
