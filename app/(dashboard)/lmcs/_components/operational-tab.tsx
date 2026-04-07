import { Separator } from "@heroui/react";
import React from "react";

function OperationalTab() {
  return (
    <div className="flex flex-col space-y-1.5">
      <InfoItem label="Active:" value="43" />
      <InfoItem label="Passive:" value="43" />
      <InfoItem label="Inactive:" value="43" />
      <InfoItem label="Recover:" value="43" />
      <InfoItem label="No Use:" value="43" />
      <Separator className="bg-black" />
      <span className="text-sm font-gotham-bold">Writers</span>
      <Separator className="bg-black" />
      <InfoItem label="POS Issued:" value="43" labelClassName="text-black" />
      <InfoItem label="POS Trading:" value="43" />
      <InfoItem label="POS Recovery:" value="43" labelClassName="text-red" />
    </div>
  );
}

export default OperationalTab;

const InfoItem = ({
  label,
  value,
  labelClassName,
}: {
  label: string;
  value: string;
  labelClassName?: string;
}) => {
  return (
    <div className="flex justify-between">
      <span
        className={`text-xs text-gray-500 font-gotham-bold ${labelClassName}`}
      >
        {label}
      </span>
      <span className="text-xs">{value}</span>
    </div>
  );
};
