"use client";
import { Avatar, Button, CloseButton, Separator, Tabs } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import MoneyIcon from "@/public/images/double-money.webp";
import Image from "next/image";
import { PieChart, Pie } from "recharts";
import LmcDetailTable from "../_components/lmc-detail-table";
import { IoSend } from "react-icons/io5";
import ToastService from "@/utils/toast-service";
import { LuMapPin } from "react-icons/lu";
import { ImBin } from "react-icons/im";

function LmcDetailView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("transactions");

  return (
    <div className="px-5">
      <div className="flex items-center space-x-3 mb-3">
        <CloseButton className="bg-transparent" onClick={() => router.back()}>
          <IoMdArrowRoundBack className="w-[25px] h-[25px] text-black" />
        </CloseButton>
        <Avatar size="sm" className="w-12 h-12">
          <Avatar.Image alt="" src={""} />
          <Avatar.Fallback className="bg-blue-500 text-xl font-gotham-bold text-white">
            {"BA"}
          </Avatar.Fallback>
        </Avatar>
        <div className="text-xs">
          <span className="font-gotham-black text-2xl">Bismark Asiedu</span>
          <span className="text-gray-500">/</span>
          <span className="text-blue-500 font-gotham-regular cursor-pointer">
            EDIT
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-5 items-start h-full gap-5">
        <div className="space-y-5 col-span-4">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 space-x-3 gap-4">
            {[1, 2, 3, 4].map((i, index) => {
              return (
                <TopCard
                  key={index}
                  icon={<Image src={MoneyIcon} alt="money image" />}
                  value={"GHS 2,897,302.66"}
                  label="YTD Sales"
                  subtitle={"Contribution Ratio"}
                  chartValue={7}
                />
              );
            })}
          </div>
          <div>
            <Tabs
              className="w-full min-w-0"
              variant="secondary"
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(String(key))}
            >
              <Tabs.ListContainer className="shrink-0 w-full max-w-full overflow-x-auto overflow-y-hidden md:overflow-visible">
                <Tabs.List
                  aria-label="Options"
                  className="inline-flex! w-max! whitespace-nowrap"
                >
                  <Tabs.Tab
                    id="transactions"
                    className="text-xs font-gotham-black whitespace-nowrap w-auto! flex-none!"
                  >
                    Transactions
                    <Tabs.Indicator className="bg-black" />
                  </Tabs.Tab>
                  <Tabs.Tab
                    id="writers"
                    className="text-xs font-gotham-black whitespace-nowrap w-auto! flex-none!"
                  >
                    Writers
                    <Tabs.Indicator className="bg-black" />
                  </Tabs.Tab>
                  <Tabs.Tab
                    id="agents"
                    className="text-xs font-gotham-black whitespace-nowrap w-auto! flex-none!"
                  >
                    Agents
                    <Tabs.Indicator className="bg-black" />
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>
            </Tabs>

            {activeTab === "transactions" && (
              <LmcDetailTable
                type="Transactions"
                tabs={["View All", "Commissions", "Top-ups", "Transfers"]}
              />
            )}
            {activeTab === "writers" && (
              <LmcDetailTable
                type="Writers"
                tabs={["View All", "Active", "Passive", "Inactive", "Recover", "No Use"]}
              />
            )}
            {activeTab === "agents" && (
              <LmcDetailTable
                type="Agents"
                tabs={["View All", "Active", "Inactive"]}
              />
            )}
          </div>
        </div>

        <div className="col-span-1 space-y-5">
          <TodayCard />
          <PrimaryAddressCard />
          <NationalFootprintCard />
          <PosCard />
        </div>
      </div>
    </div>
  );
}

export default LmcDetailView;

const PosCard = () => {
  return (
    <div className="flex flex-col border rounded-sm p-4 space-y-2">
      <div className="flex flex-row justify-between">
        <span className="text-xs font-gotham-black">POS Issued</span>
        <span className="text-xs font-jura-bold">0</span>
      </div>
      <Separator />
      <div className="flex flex-row justify-between">
        <span className="text-xs font-gotham-black">POS Issued</span>
        <span className="text-xs font-jura-bold">0</span>
      </div>
    </div>
  );
};

const NationalFootprintCard = () => {
  return (
    <div className="flex flex-col border rounded-sm p-4 pb-30">
      <span className="text-xs font-gotham-black text-gray-400">
        National Footprint
      </span>
      <span className="self-center text-[11px] mt-4">Not available</span>
    </div>
  );
};

const PrimaryAddressCard = () => {
  return (
    <div className="flex flex-col items-start border rounded-sm p-6 h-full space-y-2">
      <span className="text-xs font-gotham-black text-gray-500">
        Primary Address
      </span>
      <span className="font-jura-bold text-sm">Greater Accra</span>
      <span className="font-jura-bold text-sm">N/A</span>
      <div className="flex flex-row items-center space-x-2">
        <LuMapPin />
        <span className="font-jura-bold text-sm text-[#0a6ffd]">N/A</span>
      </div>
      <span className="text-xs font-gotham-black text-gray-500">
        Phone Numbers
      </span>
      <div className="flex items-center w-full space-x-2">
        <div className="border rounded-sm border-gray-300 p-2 text-xs font-gotham-black w-full">
          +233 (0)20 340 2595
        </div>
        <CloseButton
          className="bg-transparent border rounded-sm p-4"
          onClick={() =>
            ToastService.info({ text: "Feature not yet available" })
          }
        >
          <ImBin />
        </CloseButton>
      </div>
      <span
        className="text-[#0a6ffd] text-xs cursor-pointer"
        onClick={() => ToastService.info({ text: "Feature not yet available" })}
      >
        + Add New
      </span>
    </div>
  );
};

const TodayCard = () => {
  return (
    <div className="border rounded-sm flex flex-col items-center p-6 h-full space-y-4">
      <span className="text-xl font-jura-bold">GHS 77,636.62</span>
      <div className="flex flex-row items-center space-x-2">
        <div className="rounded-full bg-[#0A6FFD] p-1.5 font-gotham-black text-[10px] text-white">
          Today
        </div>
        <span className="text-sm font-jura-bold text-gray-500">GHS 0.00</span>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <Button
          className="bg-transparent border-2 border-black"
          size="sm"
          onClick={() =>
            ToastService.info({ text: "Feature not yet available" })
          }
        >
          <IoSend className="text-black text-xs" />
          <span className="text-[10px] text-black font-gotham-black">
            Transfer
          </span>
        </Button>
        <Button
          className="bg-transparent border-2 border-black"
          size="sm"
          onClick={() =>
            ToastService.info({ text: "Feature not yet available" })
          }
        >
          <span className="text-[10px] text-black font-gotham-black">
            Deposit
          </span>
        </Button>
      </div>
    </div>
  );
};

const TopCard = ({
  icon,
  label,
  value,
  subtitle,
  chartValue,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  subtitle: string;
  chartValue: number;
}) => {
  return (
    <div className="flex flex-col border rounded-sm p-3 space-y-3 w-full h-full">
      <div className="flex space-x-2">
        <div className="border p-2 rounded-md">{icon}</div>
        <div className="flex flex-col items-start">
          <span className="font-jura-bold text-sm">{value}</span>
          <span className="font-gotham-black text-gray-500 text-xs">
            {label}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-gotham-black text-gray-500 text-xs">
          {subtitle}
        </span>
        <DonutChart value={chartValue} />
      </div>
    </div>
  );
};

const DonutChart = ({
  value,
  size = 50,
  color = "#3b82f6",
}: {
  value: number;
  size?: number;
  color?: string;
}) => {
  const progress = Math.min(Math.max(value, 0), 100);
  const data = [
    { value: progress, fill: color },
    { value: 100 - progress, fill: "#e5e7eb" },
  ];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <PieChart
        width={size}
        height={size}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <Pie
          data={data}
          cx={size / 2}
          cy={size / 2}
          innerRadius={size * 0.32}
          outerRadius={size * 0.48}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          strokeWidth={0}
        />
      </PieChart>
      <span
        className="absolute font-gotham-black text-[10px] text-gray-700"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        {progress}%
      </span>
    </div>
  );
};
