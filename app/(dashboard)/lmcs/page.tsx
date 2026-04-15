"use client";

import Image from "next/image";
import PersonBuilding from "@/public/images/person-total.webp";
import CustomInputComponent from "@/components/custom-input-component";
import { RiSearchLine } from "react-icons/ri";
import { Avatar, Button, Spinner, Tabs } from "@heroui/react";
import { AiOutlineExport } from "react-icons/ai";
import OperationalTab from "./_components/operational-tab";
import FinancialTab from "./_components/financial-tab";
import NewLmcDrawer from "./_components/new-lmc-drawer";
import { useQuery } from "@tanstack/react-query";
import LmcService from "@/api/lmc";
import { useMemo, useState } from "react";
import ToastService from "@/utils/toast-service";

function Lmcs() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: cards = [], isPending } = useQuery({
    queryKey: ["lmc", "detail-cards"],
    queryFn: LmcService.fetchDetailCards,
  });

  const filteredCards = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return cards;

    return cards.filter((card) =>
      [card.name, card.phone, card.code, card.address]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(query)),
    );
  }, [cards, searchTerm]);

  return (
    <div className="flex flex-col p-5 px-7 pb-10 space-y-5">
      <div className="flex justify-between items-start space-y-2 sm:space-y-0 flex-col sm:flex-row">
        <div className="flex flex-col space-y-2">
          <span className="text-sm sm:text-lg font-gotham-black uppercase">
            Lotto Marketing Companies (LMC)
          </span>
          <div className="flex items-center">
            <Image
              src={PersonBuilding}
              alt="person-total"
              className="w-4 h-4"
            />
            <span className="text-xs font-gotham-bold text-gray-500 ml-1">
              {"Total: "}
            </span>
            <span className="font-gotham-bold text-xs ml-2">
              {isPending ? "…" : cards.length}
            </span>
          </div>
          <CustomInputComponent
            className="p-0 w-[200px] rounded-sm border border-gray-300"
            prefixIcon={<RiSearchLine />}
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="space-x-2 items-center flex">
          <Button
            className="rounded-sm bg-transparent border text-black"
            size="md"
            onClick={() => {
              ToastService.info({ text: "Feature not yet available" });
            }}
          >
            <AiOutlineExport className="w-3.5 h-3.5" />
            <span className="text-xs font-gotham-bold">Export Data</span>
          </Button>
          <NewLmcDrawer />
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
        {isPending && (
          <div className="flex flex-row justify-center mt-10 col-span-full">
            <Spinner size="sm" />
          </div>
        )}
        {!isPending &&
          filteredCards.map((card) => {
            const initial = card.name.charAt(0).toUpperCase();
            return (
              <div
                key={card.id}
                className="border rounded-sm flex flex-col overflow-hidden"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b bg-[#fff8ee]">
                  <Avatar size="md" className="w-10 h-10 shrink-0">
                    <Avatar.Image alt="" src={card.photo_url ?? ""} />
                    <Avatar.Fallback className="bg-[#f6a21f] text-white font-gotham-bold text-sm">
                      {initial}
                    </Avatar.Fallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="font-gotham-bold text-sm truncate text-gray-800">
                      {card.name}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[0.65rem] font-gotham-regular text-gray-500">
                        {card.phone}
                      </span>
                      <span className="text-[0.65rem] font-jura-regular text-[#f6a21f] font-semibold">
                        {card.code}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex-1 px-4 py-3">
                  <Tabs className="w-full">
                    <Tabs.ListContainer>
                      <Tabs.List aria-label="Options" className="rounded-sm">
                        <Tabs.Tab
                          className="text-xs font-gotham-bold px-3 text-black data-[selected=true]:text-white"
                          id="operational"
                        >
                          {"Operational"}
                          <Tabs.Indicator className="rounded-sm bg-[#f6a21f]" />
                        </Tabs.Tab>
                        <Tabs.Tab
                          className="text-xs font-gotham-bold px-3 text-black data-[selected=true]:text-white"
                          id="financial"
                        >
                          {"Financial"}
                          <Tabs.Indicator className="rounded-sm bg-[#f6a21f]" />
                        </Tabs.Tab>
                      </Tabs.List>
                    </Tabs.ListContainer>

                    <Tabs.Panel className="pt-2" id="operational">
                      <OperationalTab operational={card.operational} />
                    </Tabs.Panel>
                    <Tabs.Panel className="pt-2" id="financial">
                      <FinancialTab financial={card.financial} />
                    </Tabs.Panel>
                  </Tabs>
                </div>
              </div>
            );
          })}
        {!isPending && filteredCards.length === 0 && (
          <span className="text-xs text-gray-500 col-span-full">
            No LMCs match your search.
          </span>
        )}
      </div>
    </div>
  );
}

export default Lmcs;
