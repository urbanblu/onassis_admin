"use client";

import { Separator } from "@heroui/react";
import CustomDatePicker from "@/components/custom-date-picker";
import Badge from "../../../../public/images/badge.webp";
import Image from "next/image";
import CustomSelectComponent from "@/components/custom-select-component";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { DateValue } from "@internationalized/date";
import SalesService from "@/api/sales";
import GamesService from "@/api/games";
import { formatGhs } from "@/utils/currency";
import type { IWinnerRow } from "@/interfaces/sales.interface";

function ThirdSalesSegment() {
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedGameKey, setSelectedGameKey] = useState("all");

  const { data: todayWins } = useQuery({
    queryKey: ["sales", "today-wins"],
    queryFn: SalesService.fetchTodayWins,
  });

  const { data: todayClaims } = useQuery({
    queryKey: ["sales", "today-claims"],
    queryFn: SalesService.fetchTodayClaims,
  });

  const { data: winningEvents } = useQuery({
    queryKey: ["sales", "winning-events", selectedDate ?? "today"],
    queryFn: () => SalesService.fetchWinningEvents(selectedDate),
  });

  const { data: winnersList } = useQuery({
    queryKey: ["sales", "winners-list", selectedDate ?? "today"],
    queryFn: () => SalesService.fetchWinnersList(selectedDate),
  });

  const { data: gameTypes = [] } = useQuery({
    queryKey: ["games", "types", "sales-third"],
    queryFn: () => GamesService.fetchGameTypes({ is_active: true }),
  });

  const gameOptions = useMemo(() => {
    return [
      { key: "all", label: "All" },
      ...gameTypes.map((g) => ({ key: g.code, label: g.name })),
    ];
  }, [gameTypes]);

  const selectedGameName =
    gameOptions.find((g) => g.key === selectedGameKey)?.label ?? "All";

  const visibleEvents = useMemo(() => {
    const events = winningEvents?.events ?? [];
    if (selectedGameKey === "all") return events;
    return events.filter((event) =>
      event.event_name.toLowerCase().includes(selectedGameName.toLowerCase()),
    );
  }, [winningEvents?.events, selectedGameKey, selectedGameName]);

  const visibleWinners = useMemo(() => {
    const winners = winnersList?.winners ?? [];
    if (selectedGameKey === "all") return winners;
    return winners.filter((winner) =>
      winner.event_name.toLowerCase().includes(selectedGameName.toLowerCase()),
    );
  }, [winnersList?.winners, selectedGameKey, selectedGameName]);

  return (
    <div className="flex flex-col space-y-3 md:min-h-0 md:overflow-hidden">
      <MiniCard
        title="Wins"
        amount={formatGhs(todayWins?.total_win_amount ?? 0)}
        subtitle={
          <div className="flex space-x-1 text-gray-500">
            <span className="font-gotham-regular text-[0.65rem]">{"from"}</span>
            <span className="font-gotham-black text-[0.65rem]">
              {`${(todayWins?.unique_players ?? 0).toLocaleString("en-GH")} players`}
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
                onDatePicked={(date: DateValue) =>
                  setSelectedDate(date.toString())
                }
              />
              <CustomSelectComponent
                label="Game"
                labelClassName="text-[0.6rem] text-gray-500 font-gotham-black"
                initialItemKey="all"
                showDropDownIcon
                className="translate-y-[3.7px]"
                list={gameOptions}
                onSelectionChange={(item) => setSelectedGameKey(item.key)}
              />
            </div>
          </div>

          <Separator className="mt-4 shrink-0" />

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="px-5 py-4 space-y-4">
              {visibleEvents.length === 0 ? (
                <div className="py-4 flex items-center justify-center text-xs">
                  Event not available
                </div>
              ) : (
                visibleEvents.map((event) => (
                  <MiniEventInfo
                    key={event.event_id}
                    title={event.event_name}
                    values={event.winning_numbers}
                    event={String(event.event_no)}
                  />
                ))
              )}

              <Separator className="my-2" />

              {visibleWinners.length === 0 ? (
                <div className="py-4 flex items-center justify-center text-xs">
                  Winnings not available
                </div>
              ) : (
                visibleWinners.map((winner, index) => (
                  <PermItem
                    key={`${winner.player_phone}-${index}`}
                    winner={winner}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <MiniCard
        title="Today's Claims"
        amount={formatGhs(todayClaims?.total_claims ?? 0)}
        subtitle={
          <div className="flex space-x-1 text-gray-500">
            <span className="font-gotham-regular text-[0.65rem]">
              {"Claims"}
            </span>
            <span className="font-gotham-black text-[0.65rem]">
              {"withdrawn"}
            </span>
            <span className="font-gotham-regular text-[0.65rem]">
              {"today is"}
            </span>
            <span className="font-gotham-black text-[0.65rem]">
              {formatGhs(todayClaims?.claims_withdrawn ?? 0)}
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

const PermItem = ({ winner }: { winner: IWinnerRow }) => {
  const firstLine = winner.numbers_staked?.[0] ?? [];
  return (
    <div>
      <Separator className="my-3" />
      <div className="flex justify-between px-5 mt-5">
        <div className="flex flex-col">
          <div className="flex space-x-2 items-center">
            {firstLine.map((num, index) => (
              <div
                key={`${num}-${index}`}
                className="border p-1 font-jura-bold text-xs min-w-[24px] text-center rounded-sm"
              >
                {num}
              </div>
            ))}
            <Image src={Badge} alt="badge.png" className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[0.6rem] font-gotham-regular">
              {`Event #${winner.event_no} | ${winner.event_name}`}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-jura-bold text-sm mb-1">
            {formatGhs(winner.win_amount)}
          </span>
          <span className="text-[0.6rem] font-gotham-regular">
            {winner.player_phone}
          </span>
          <span className="text-[0.6rem] font-gotham-regular">
            {winner.writer_name}
          </span>
        </div>
      </div>
    </div>
  );
};
