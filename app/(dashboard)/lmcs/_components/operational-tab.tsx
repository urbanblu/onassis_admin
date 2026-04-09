import { Separator } from "@heroui/react";
import React from "react";
import type { ILmcOperational } from "@/interfaces/lmc.interface";

function OperationalTab({ operational }: { operational: ILmcOperational }) {
  return (
    <div className="flex flex-col space-y-1.5">
      <InfoItem label="Active:" value={String(operational.active)} />
      <InfoItem label="Passive:" value={String(operational.passive)} />
      <InfoItem label="Inactive:" value={String(operational.inactive)} />
      <InfoItem label="Recover:" value={String(operational.recover)} />
      <InfoItem label="No Use:" value={String(operational.no_use)} />
      <Separator className="bg-black" />
      <span className="text-sm font-gotham-bold">
        Writers ({operational.writers_total})
      </span>
      <Separator className="bg-black" />
      <InfoItem label="POS Issued:" value={String(operational.pos_issued)} labelClassName="text-black" />
      <InfoItem label="POS Trading:" value={String(operational.pos_trading)} />
      <InfoItem
        label="POS Recovery:"
        value={String(operational.pos_recovery)}
        labelClassName="text-red"
      />
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
