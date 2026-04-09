"use client";

import { Separator } from "@heroui/react";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import AdminUsersService from "@/api/admin-users";
import type { IActivityLog } from "@/interfaces/admin-users.interface";

function RightSegment() {
  const { data: logsResp } = useQuery({
    queryKey: ["admin-users", "activity-logs"],
    queryFn: () =>
      AdminUsersService.fetchActivityLogs({ page: 1, page_size: 50 }),
  });
  const logs = logsResp?.results ?? [];

  return (
    <div className="flex flex-col space-y-5 h-full min-h-0 w-full max-w-full">
      <div className="border border-sm p-4 space-y-3 shrink-0 w-full">
        <div className="flex items-center space-x-5">
          <IoWarningOutline />
          <span className="text-sm font-gotham-black">Security and Risk</span>
        </div>
        <div className="grid grid-cols-2 text-xs font-gotham-bold">
          <span className="text-gray-400">Alerts Today</span>
          <span className="text-[#F88927]">34</span>
        </div>

        <div className="grid grid-cols-2 text-xs font-gotham-bold">
          <span className="text-gray-400">Critical Alerts</span>
          <span className="text-[#F88927]">3</span>
        </div>

        <div className="grid grid-cols-2 text-xs font-gotham-bold">
          <span className="text-gray-400">Fraud Risk</span>
          <span className="text-[#F88927]">Medium</span>
        </div>

        <div className="grid grid-cols-2 text-xs font-gotham-bold">
          <span className="text-black">1 of 3</span>
          <div className="flex items-center space-x-1">
            <div className="bg-black p-1">
              <IoIosArrowBack className="text-white" />
            </div>
            <div className="bg-black p-1">
              <IoIosArrowForward className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 border rounded-sm flex flex-col flex-none min-h-0 h-120 md:h-96 lg:h-112 w-full max-w-full">
        <div className="py-3 px-4 border-b shrink-0">
          <span className="text-sm font-gotham-black">Active Logs</span>
        </div>
        <div className="px-4 py-3 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
          <div>
            {logs.length === 0 ? (
              <span className="text-xs text-gray-500">
                No activity logs yet.
              </span>
            ) : (
              logs.map((log) => <ActivityLog key={log.id} log={log} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSegment;

const ActivityLog = ({ log }: { log: IActivityLog }) => {
  const when = new Date(log.created_at);
  const timeText = Number.isNaN(when.getTime())
    ? "N/A"
    : when.toLocaleTimeString("en-GH", { hour: "2-digit", minute: "2-digit" });

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="h-3.5 w-3.5 rounded-full bg-transparent border-gray-300 border-2" />
        <div className="text-xs">
          {log.action.replace("_", " ")}
          <span className="text-[10px] text-gray-500">{` (by ${log.actor_name ?? log.actor_email})`}</span>
        </div>
        <div className="border rounded-sm border-gray-300 px-1.5 py-1 text-xs font-jura-medium">
          {timeText}
        </div>
      </div>
      <Separator
        orientation="vertical"
        className="h-5 ml-1.5 w-[1.5px] bg-gray-300"
      />
    </div>
  );
};
