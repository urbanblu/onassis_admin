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

function RetailerDetailView() {
  return (
    <div className="w-full lg:flex-1 lg:min-h-0 lg:overflow-hidden flex flex-col">
      <div className="p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 w-full lg:h-full lg:min-h-0 items-stretch">
        <div className="lg:col-span-1 border rounded-sm flex flex-col lg:min-h-0">
          <div className="space-y-3 py-3 lg:flex-1 lg:min-h-0 lg:overflow-y-auto">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 px-3">
                <Avatar size="md" className="w-12 h-12">
                  <Avatar.Image alt="" src="" />
                  <Avatar.Fallback className="bg-[#F8A824] text-lg text-white font-gotham-bold">
                    OL
                  </Avatar.Fallback>
                </Avatar>
                <span className="text-sm font-gotham-black">Test Writer</span>
                <FaRegEdit className="w-3.5 h-3.5 text-blue-500" />
              </div>

              <LeftInfoItem title="ID:" value="000009" />
              <LeftInfoItem title="Gender:" value="N/A" />
              <LeftInfoItem title="D.O.B:" value="N/A" />
              <LeftInfoItem title="Mobile:" value="+233 (0)10 000 000" />
              <LeftInfoItem title="Email:" value="N/A" />
            </div>

            <Separator />
            <LeftInfoItem title="Status:" value="No Use" />
            <Separator />

            <LeftInfoItem title="Serial #:" value="N/A" />
            <LeftInfoItem title="Terminal #:" value="N/A" />
            <LeftInfoItem title="State:" value="N/A" />

            <Separator />

            <LeftInfoItem title="DoP #:" value="198" />
            <LeftInfoItem title="DoT #:" value="N/A" />
            <LeftInfoItem title="LT Avg. Sale:" value="GHS 0.00" />

            <Separator />
            <LeftInfoItem title="Signed Up:" value="Fri, 19 Sep 2025" />
            <Separator />
            <MiniCard
              label="Sales Wallet"
              amount="GHS 0.00"
              account="ACC0000101"
            />
            <MiniCard
              label="Claim Wallet"
              amount="GHS 0.00"
              account="ACC0000102"
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
              value="GHS 0.00"
              subtitle={
                <div className="flex space-x-1 text-gray-500">
                  <span className="font-gotham-black text-xs">
                    {"Net Sales"}
                  </span>
                  <span className="font-jura-bold text-xs">
                    {"GHS 21,480,019.43"}
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
              value="GHS 0.00"
              subtitle={
                <div className="flex space-x-1 text-gray-500">
                  <span className="font-gotham-black text-xs">
                    {"Net Sales"}
                  </span>
                  <span className="font-jura-bold text-xs">
                    {"GHS 21,480,019.43"}
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
              value="GHS 0.00"
              subtitle={
                <div className="flex space-x-1 text-gray-500">
                  <span className="font-gotham-black text-xs">
                    {"Net Sales"}
                  </span>
                  <span className="font-jura-bold text-xs">
                    {"GHS 21,480,019.43"}
                  </span>
                </div>
              }
            />
            <TopCard
              title="Ranking"
              value="Tier III"
              subtitle={
                <div className="flex space-x-1 text-gray-500">
                  <span className="font-gotham-black text-xs">
                    {"Avg. Top-Up"}
                  </span>
                  <span className="font-jura-bold text-xs">{"GHS 0.00"}</span>
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
                <TopUpTable />
              </Tabs.Panel>
              <Tabs.Panel id="sales" className="lg:flex-1 lg:min-h-0 min-w-0">
                <SalesTable />
              </Tabs.Panel>
              <Tabs.Panel
                id="winnings"
                className="lg:flex-1 lg:min-h-0 min-w-0"
              >
                <WinningsTable />
              </Tabs.Panel>
              <Tabs.Panel id="cashout" className="lg:flex-1 lg:min-h-0 min-w-0">
                <CashoutTable />
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
