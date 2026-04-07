import { Separator } from "@heroui/react";
import CustomDatePicker from "@/components/custom-date-picker";
import Badge from "../../../../public/images/badge.webp";
import Image from "next/image";
import CustomSelectComponent from "@/components/custom-select-component";

function ThirdSalesSegment() {
  return (
    <div className="flex flex-col space-y-3 md:min-h-0 md:overflow-hidden">
      {/* Top Wins Card */}
      <MiniCard
        title="Wins"
        amount="GHS 290,282.40"
        subtitle={
          <div className="flex space-x-1 text-gray-500">
            <span className="font-gotham-regular text-[0.65rem]">{"from"}</span>
            <span className="font-gotham-black text-[0.65rem]">
              {"247 players"}
            </span>
          </div>
        }
      />
      <div className="h-[400px] md:h-auto md:flex-1 md:min-h-0 md:overflow-hidden">
        <div className="border rounded-sm flex flex-col h-full">
          <div className="px-5 pt-4 shrink-0">
            <span className="font-gotham-black text-xs text-gray-500 uppercase">
              Winnings
            </span>
            <div className="grid grid-cols-2 space-x-4 items-center">
              <CustomDatePicker
                label="Draw Date"
                className="border rounded-sm border-gray-300"
              />
              <CustomSelectComponent
                label="Game"
                labelClassName="text-[0.6rem] text-gray-500 font-gotham-black"
                initialItemKey="all"
                showDropDownIcon
                className="translate-y-[3.7px]"
                list={[
                  { key: "all", label: "All" },
                  { key: "morningVag", label: "Morning VAG" },
                  { key: "noonrush", label: "5/90 Noonrush" },
                  { key: "luckyTuesday", label: "5/90 Lucky Tuesday" },
                ]}
                onSelectionChange={(val) => {}}
              />
            </div>
          </div>

          <Separator className="mt-4 shrink-0" />

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="px-5 py-4 space-y-4">
              <MiniEventInfo
                title="Morning VAG"
                values={[43, 5, 90, 56, 70]}
                event="828"
              />
              <MiniEventInfo
                title="5/90 Noonrush"
                values={[43, 5, 90, 56, 70]}
                event="135"
              />
              <MiniEventInfo
                title="5/90 Lucky Tuesday"
                values={[43, 5, 90, 56, 70]}
                event="928"
              />
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <PermItem key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Card */}
      <MiniCard
        title="Today's Claims"
        amount="GHS 255,806.40"
        subtitle={
          <div className="flex space-x-1 text-gray-500">
            <span className="font-gotham-regular text-[0.65rem]">
              {"Claims"}
            </span>
            <span className="font-gotham-black text-[0.65rem]">
              {"withrawn"}
            </span>
            <span className="font-gotham-regular text-[0.65rem]">
              {"today is"}
            </span>
            <span className="font-gotham-black text-[0.65rem]">
              {"GHS 156,942.60"}
            </span>
          </div>
        }
      />
    </div>
  );
}

export default ThirdSalesSegment;

const MiniCard = ({
  title,
  amount,
  subtitle,
}: {
  title: string;
  amount: string;
  subtitle: React.ReactNode;
}) => {
  return (
    <div className="border rounded-sm p-5">
      <div className="flex flex-col items-start">
        <span className="font-gotham-black text-[0.65rem] text-gray-500">
          {title}
        </span>
        <span className="font-jura-bold text-2xl">{amount}</span>
        {subtitle}
      </div>
    </div>
  );
};

const MiniEventInfo = ({
  title,
  event,
  values,
}: {
  title: string;
  event: string;
  values: number[];
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 items-start">
      <div className="flex flex-col">
        <span className="text-xs font-gotham-black">{title}</span>
        <div className="space-x-1 text-[0.65rem]">
          <span className="font-gotham-light text-gray-700">Event #</span>
          <span className="font-jura-bold">{event}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-start">
        {values.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 p-2 text-white font-jura-bold text-xs min-w-[24px] text-center rounded-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const PermItem = () => {
  return (
    <div>
      <Separator className="my-3" />
      <div className="flex justify-between px-5 mt-5">
        <div className="flex flex-col">
          <div className="flex space-x-2 items-center">
            <div className="border p-1 font-jura-bold text-xs min-w-[24px] text-center rounded-sm">
              {"69"}
            </div>
            <div className="border p-1 font-jura-bold text-xs min-w-[24px] text-center rounded-sm">
              {"38"}
            </div>
            <Image src={Badge} alt="badge.png" className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[0.6rem] font-gotham-regular">
              Perm 2 | Morning VAG
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-jura-bold text-sm mb-1">GHS 480.00</span>
          <span className="text-[0.6rem] font-gotham-regular">
            +233 (0)20 146 2738
          </span>
          <span className="text-[0.6rem] font-gotham-regular">
            Alex Baah Yeboah
          </span>
        </div>
      </div>
    </div>
  );
};
