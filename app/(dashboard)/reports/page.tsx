"use client";

import CustomCheckboxItem from "@/components/custom-checkbox";
import CustomInputComponent from "@/components/custom-input-component";
import {
  Button,
  Header,
  Label,
  ListBox,
  Select,
  Separator,
} from "@heroui/react";
import React from "react";
import { IoMail, IoMailOutline } from "react-icons/io5";
import { RiDownloadLine } from "react-icons/ri";

const REPORT_DATA = [
  {
    key: "Operations",
    values: ["30 Days Sales Tracker", "All Stakes Report"],
  },
  {
    key: "Finance",
    values: [
      "Bank Transfer - Batch Details",
      "Bank Transfers",
      "Christmas Bonus Report",
      "Commission Payments",
      "Ticket Query",
      "Daily Sales",
      "Daily Sales & Winnings",
      "Finance - Payout",
      "Finance : Top-Up",
      "Finance: Daily Top-Up",
      "LMC - Total Writer Topups (Momo/Claims/Transfers)",
      "LMC Transfers",
      "Revenue Per Play",
      "Transaction History",
      "Transaction Status",
    ],
  },
  {
    key: "General",
    values: [
      "Ticket Status",
      "Active Writers",
      "Terminal history",
      "Winning Stakes Report",
    ],
  },
];

function ReportsView() {
  return (
    <div
      className="
grid grid-cols-1 sm:grid-cols-2 gap-6 px-7 pb-5 w-full
sm:h-[calc(100vh-120px)] sm:max-h-[calc(100vh-50px)] sm:overflow-hidden 
h-auto overflow-y-auto
"
    >
      <div className="flex flex-col space-y-4 w-full h-full min-h-0">
        <span className="text-sm sm:text-lg font-gotham-black uppercase shrink-0">
          REPORTS
        </span>
        <div className="shrink-0">
          <ReportsSelection />
        </div>
        <div className="rounded-sm border-[1.5px] p-5 flex-1 flex flex-col min-h-0 bg-white">
          <span className="text-xs font-gotham-bold shrink-0 mb-4">
            30 Days Sales Tracker
          </span>
          <div className="flex-1 max-h-52 sm:max-h-full min-h-0 overflow-y-auto pr-2 custom-scrollbar sm:overscroll-contain">
            <div className="mb-5 shrink-0">
              <CustomInputComponent
                className="max-w-[200px] p-0 border border-gray-400 rounded-sm"
                label="Writer Name"
                placeholder="Input Writer Name"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
              {Array(30)
                .fill(1)
                .map((label, index) => (
                  <CustomCheckboxItem
                    key={index}
                    selected={false}
                    label={"Retailer ID"}
                    labelClassName="font-gotham-regular"
                  />
                ))}
            </div>
          </div>

          <Button className="mt-5 w-full rounded-sm bg-black text-white font-gotham-black text-xs py-6 shrink-0">
            GENERATE REPORT
          </Button>
        </div>
      </div>

      <div className="w-full h-[80vh] sm:h-full rounded-sm bg-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-gray-200 shrink-0 flex justify-between">
          <span className="text-xs font-gotham-bold text-black">Preview</span>
          <div className="space-x-2">
            <Button
              size="sm"
              className="text-[0.6rem] bg-transparent border text-black"
            >
              <RiDownloadLine className="w-3 h-3" />
              Download
            </Button>
            <Button
              size="sm"
              className="text-[0.6rem] bg-transparent border text-black"
            >
              <IoMailOutline className="w-3 h-3" />
              Email
            </Button>
          </div>
        </div>
        <Separator className="text-black bg-black/30" />
        <div className="bg-white m-5 p-5 h-full text-sm font-gotham-black">
          Generate a report to preview data
        </div>
      </div>
    </div>
  );
}

export default ReportsView;

const ReportsSelection = () => {
  return (
    <Select className="" placeholder="Select a country">
      <Label className="text-xs font-gotham-bold text-gray-500">
        Select a Report
      </Label>
      <Select.Trigger className="border border-gray-200 shadow-none rounded-sm bg-white hover:border-gray-400 transition-colors w-full">
        <Select.Value className="text-xs" />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="rounded-sm">
        <ListBox>
          {REPORT_DATA.map((section, sIndex) => (
            <ListBox.Section key={section.key}>
              <Header className="px-4 py-2 text-[10px] font-gotham-medium text-gray-400 uppercase tracking-wider">
                {section.key}
              </Header>

              {section.values.map((report) => (
                <ListBox.Item
                  key={report}
                  id={report.toLowerCase().replace(/\s+/g, "-")}
                  textValue={report}
                  className="flex items-center px-4 py-2 text-xs rounded-sm cursor-pointer hover:bg-gray-200/50 outline-none transition-colors"
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="flex-1 truncate group-selected:font-gotham-medium">
                      {report}
                    </span>
                  </div>
                </ListBox.Item>
              ))}
              {sIndex < REPORT_DATA.length - 1 && (
                <div className="h-px bg-gray-500/30 my-1 mx-2" />
              )}
            </ListBox.Section>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
