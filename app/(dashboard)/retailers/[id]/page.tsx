"use client";

import { Avatar, Separator, Tabs } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import DoubleMoneyIcon from "@/public/images/double-money.webp";
import WalletIcon from "@/public/images/wallet.webp";
import TrophyIcon from "@/public/images/trophy.webp";
import TopUpTable from "./_components/topup-table";
import SalesTable from "./_components/sales-table";
import WinningsTable from "./_components/winnings-table";
import CashoutTable from "./_components/cashout-table";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import WritersService from "@/api/writers";
import { formatGhs } from "@/utils/currency";
import EditRetailerUserDrawer from "../_components/edit-retailer-user-drawer";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function RetailerDetailView() {
  const params = useParams();
  const writerId = typeof params?.id === "string" ? params.id : "";

  const { data: profile, isPending } = useQuery({
    queryKey: ["writers", "profile", writerId],
    queryFn: () => WritersService.fetchWriterProfile(writerId),
    enabled: !!writerId,
  });

  if (!writerId) {
    return <div className="p-6 text-sm text-gray-600">Invalid writer id.</div>;
  }

  if (isPending || !profile) {
    return <div className="p-6 text-sm text-gray-600">Loading writer…</div>;
  }

  const initial = profile.name.charAt(0).toUpperCase();
  const ytdSalesNum = parseFloat(String(profile.ytd_sales));
  const thisMonthSalesNum = parseFloat(String(profile.this_month_sales));
  const avgTop = parseFloat(String(profile.avg_topup));

  return (
    <div className="w-full lg:flex-1 lg:min-h-0 lg:overflow-hidden flex flex-col">
      <div className="p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 w-full lg:h-full lg:min-h-0 items-stretch">
        <div className="lg:col-span-1 border rounded-sm flex flex-col lg:min-h-0">
          <div className="space-y-3 py-3 lg:flex-1 lg:min-h-0 lg:overflow-y-auto">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 px-3">
                <Avatar size="md" className="w-12 h-12">
                  <Avatar.Image alt={profile.lmc_name} src="" />
                  <Avatar.Fallback className="bg-[#F8A824] text-lg text-white font-gotham-bold">
                    {initial}
                  </Avatar.Fallback>
                </Avatar>
                <div className="space-0 gap-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-gotham-black">
                      {profile.name}
                    </span>
                    <EditRetailerUserDrawer writerId={writerId} />
                  </div>
                  <div className="space-x-1 text-[10px] text-gray-500 font-gotham-medium">
                    <span>{`under`}</span>
                    <span className="font-gotham-black">
                      {profile.lmc_name}
                    </span>
                    <span>{`Mgmt`}</span>
                  </div>
                </div>
              </div>

              <LeftInfoItem title="ID:" value={profile.writer_id_display} />
              <LeftInfoItem title="Gender:" value={profile.gender} />
              <LeftInfoItem title="D.O.B:" value={profile.date_of_birth} />
              <LeftInfoItem title="Mobile:" value={profile.mobile} />
              <LeftInfoItem title="Email:" value={profile.email} />
            </div>

            <Separator />
            <LeftInfoItem title="Status:" value={profile.status} />
            <Separator />

            <LeftInfoItem title="Serial #:" value={profile.serial_number} />
            <LeftInfoItem title="Terminal #:" value={profile.terminal_number} />
            <LeftInfoItem title="State:" value={profile.device_state} />

            <Separator />

            <LeftInfoItem
              title="DoP #:"
              value={String(profile.days_on_platform)}
            />
            <LeftInfoItem
              title="DoT #:"
              value={String(profile.days_of_tickets)}
            />
            <LeftInfoItem
              title="LT Avg. Sale:"
              value={formatGhs(parseFloat(profile.lt_avg_sale) || 0)}
            />

            <Separator />
            <LeftInfoItem
              title="Signed Up:"
              value={formatDate(profile.sign_up_date)}
            />
            <Separator />
            <MiniCard
              label="Sales Wallet"
              amount={`GHS ${profile.sales_wallet_balance}`}
              account={profile.sales_wallet_id}
            />
            <MiniCard
              label="Claim Wallet"
              amount={`GHS ${profile.claims_wallet_balance}`}
              account={profile.claims_wallet_id}
            />
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-5 lg:flex-1 lg:min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TopCard
              icon={
                <Image
                  src={DoubleMoneyIcon}
                  alt="DoubleMoneyIcon"
                  className="w-5 h-5"
                />
              }
              title="YTD Sales"
              value={formatGhs(Number.isFinite(ytdSalesNum) ? ytdSalesNum : 0)}
              subtitle={
                <div className="flex space-x-1 text-gray-500">
                  <span className="font-gotham-black text-xs">
                    {"This month"}
                  </span>
                  <span className="font-jura-bold text-xs">
                    {formatGhs(
                      Number.isFinite(thisMonthSalesNum)
                        ? thisMonthSalesNum
                        : 0,
                    )}
                  </span>
                </div>
              }
            />
            <TopCard
              icon={
                <Image
                  src={WalletIcon}
                  alt="DoubleMoneyIcon"
                  className="w-5 h-5"
                />
              }
              title="YTD Top-Ups"
              value={formatGhs(parseFloat(String(profile.ytd_topups)) || 0)}
              subtitle={
                <div className="flex space-x-1 text-gray-500">
                  <span className="font-gotham-black text-xs">
                    {"This month"}
                  </span>
                  <span className="font-jura-bold text-xs">
                    {formatGhs(
                      parseFloat(String(profile.this_month_topups)) || 0,
                    )}
                  </span>
                </div>
              }
            />
            <TopCard
              icon={
                <Image
                  src={TrophyIcon}
                  alt="DoubleMoneyIcon"
                  className="w-5 h-5"
                />
              }
              title="YTD Winnings"
              value={formatGhs(parseFloat(String(profile.ytd_winnings)) || 0)}
              subtitle={
                <div className="flex space-x-1 text-gray-500">
                  <span className="font-gotham-black text-xs">
                    {"This month"}
                  </span>
                  <span className="font-jura-bold text-xs">
                    {formatGhs(
                      parseFloat(String(profile.this_month_winnings)) || 0,
                    )}
                  </span>
                </div>
              }
            />
            <TopCard
              title="Ranking"
              value={profile.ranking_tier}
              subtitle={
                <div className="flex space-x-1 text-gray-500">
                  <span className="font-gotham-black text-xs">
                    {"Avg. Top-Up"}
                  </span>
                  <span className="font-jura-bold text-xs">
                    {formatGhs(Number.isFinite(avgTop) ? avgTop : 0)}
                  </span>
                </div>
              }
            />
          </div>

          <div className="flex flex-col lg:flex-1 lg:min-h-0 min-w-0">
            <Tabs
              className="w-full flex flex-col lg:flex-1 lg:min-h-0 min-w-0"
              variant="secondary"
            >
              <Tabs.ListContainer className="max-w-md">
                <Tabs.List aria-label="Options">
                  <Tabs.Tab id="topups" className="text-sm font-gotham-black">
                    Top-ups
                    <Tabs.Indicator className="bg-black" />
                  </Tabs.Tab>
                  <Tabs.Tab id="sales" className="text-sm font-gotham-black">
                    Sales
                    <Tabs.Indicator className="bg-black" />
                  </Tabs.Tab>
                  <Tabs.Tab id="winnings" className="text-sm font-gotham-black">
                    Winnings
                    <Tabs.Indicator className="bg-black" />
                  </Tabs.Tab>
                  <Tabs.Tab id="cashout" className="text-sm font-gotham-black">
                    Cashout
                    <Tabs.Indicator className="bg-black" />
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>

              <Tabs.Panel id="topups" className="lg:flex-1 lg:min-h-0 min-w-0">
                <TopUpTable writerId={writerId} />
              </Tabs.Panel>
              <Tabs.Panel id="sales" className="lg:flex-1 lg:min-h-0 min-w-0">
                <SalesTable writerId={writerId} />
              </Tabs.Panel>
              <Tabs.Panel
                id="winnings"
                className="lg:flex-1 lg:min-h-0 min-w-0"
              >
                <WinningsTable writerId={writerId} />
              </Tabs.Panel>
              <Tabs.Panel id="cashout" className="lg:flex-1 lg:min-h-0 min-w-0">
                <CashoutTable writerId={writerId} />
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetailerDetailView;

const LeftInfoItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="grid grid-cols-3 px-3">
      <span className="col-span-1 text-xs font-gotham-bold text-gray-500">
        {title}
      </span>
      <span className="col-span-2 text-xs text-gray-500">{value}</span>
    </div>
  );
};

const MiniCard = ({
  label,
  amount,
  account,
}: {
  label: string;
  amount: string;
  account: string;
}) => {
  return (
    <div className="border rounded-sm p-5 mx-3">
      <div className="flex flex-col items-center">
        <span className="font-gotham-black text-[0.7rem] text-gray-500">
          {label}
        </span>
        <span className="font-jura-bold text-2xl">{amount}</span>
        <div className="flex space-x-1 text-gray-500">
          <span className="font-gotham-regular text-xs text-[#0000FF] underline decoration-dashed">
            {account}
          </span>
        </div>
      </div>
    </div>
  );
};

const TopCard = ({
  icon,
  title,
  value,
  subtitle,
}: {
  icon?: React.ReactNode;
  title: string;
  value: string;
  subtitle: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col border rounded-sm">
      <div className="flex justify-between items-center p-3">
        <span className="text-sm font-gotham-black">{title}</span>
        {icon}
      </div>
      <Separator />
      <div className="flex flex-col items-start p-3">
        <span className="font-jura-bold text-sm">{value}</span>
        {subtitle}
      </div>
    </div>
  );
};
