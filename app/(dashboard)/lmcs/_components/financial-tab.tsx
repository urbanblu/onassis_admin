import React from "react";

function FinancialTab() {
  return (
    <div className="flex flex-col items-center space-y-5">
      <div className="flex flex-col items-center">
        <span className="text-[0.6rem] font-gotham-bold text-gray-500">
          Balance
        </span>
        <span className="text-sm font-jura-bold">GHS 2,375.38</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-[0.6rem] font-gotham-bold text-gray-500">
          This Month
        </span>
        <span className="text-sm font-gotham-black">April 2026</span>
      </div>
      <div className="flex flex-col w-full mt-2 space-y-1">
        <InfoItem label="Top-Ups" value="43" />
        <InfoItem label="Sales" value="43" />
        <InfoItem label="Commisions" value="43" />
      </div>
    </div>
  );
}

export default FinancialTab;

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
