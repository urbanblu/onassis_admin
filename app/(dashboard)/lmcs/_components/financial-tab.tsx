import React from "react";
import type { ILmcFinancial } from "@/interfaces/lmc.interface";

function FinancialTab({ financial }: { financial: ILmcFinancial }) {
  return (
    <div className="flex flex-col items-center space-y-5">
      <div className="flex flex-col items-center">
        <span className="text-[0.6rem] font-gotham-bold text-gray-500">
          Balance
        </span>
        <span className="text-sm font-jura-bold">
          GHS {financial.wallet_balance}
        </span>
      </div>

      <div className="flex flex-col w-full mt-2 space-y-1">
        <InfoItem label="Top-Ups" value={financial.monthly_topups} />
        <InfoItem label="Sales" value={financial.monthly_sales} />
        <InfoItem label="Commissions" value={financial.monthly_commissions} />
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
