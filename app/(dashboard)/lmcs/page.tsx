"use client";

import Image from "next/image";
import PersonBuilding from "@/public/images/person-total.webp";
import CustomInputComponent from "@/components/custom-input-component";
import { RiSearchLine } from "react-icons/ri";
import { Avatar, Button, Tabs } from "@heroui/react";
import { AiOutlineExport } from "react-icons/ai";
import OperationalTab from "./_components/operational-tab";
import FinancialTab from "./_components/financial-tab";
import NewLmcDrawer from "./_components/new-lmc-drawer";

function Lmcs() {
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
            <span className="font-gotham-bold text-xs ml-2">24</span>
          </div>
          <CustomInputComponent
            className="p-0 w-[200px] rounded-sm border border-gray-300"
            prefixIcon={<RiSearchLine />}
            placeholder="Search"
          />
        </div>
        <div className="space-x-2 items-center flex">
          <Button
            className="rounded-sm bg-transparent border text-black"
            size="md"
          >
            <AiOutlineExport className="w-3.5 h-3.5" />
            <span className="text-xs font-gotham-bold">Export Data</span>
          </Button>
          <NewLmcDrawer />
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-3 gap-y-3">
        {Array(20)
          .fill(1)
          .map((item, index) => {
            return (
              <div
                key={index}
                className="border rounded-sm flex flex-col items-center py-3"
              >
                <Avatar size="lg" className="w-20 h-20">
                  <Avatar.Image alt="" src="" />
                  <Avatar.Fallback className="bg-[#F8A824] text-2xl font-gotham-bold">
                    OL
                  </Avatar.Fallback>
                </Avatar>
                <span className="font-gotham-bold">Onassis Inc</span>
                <span className="font-jura-medium text-xs mb-2">
                  +233 (0)20 340 2595
                </span>
                <Tabs className="min-w-48 flex-wrap">
                  <Tabs.ListContainer>
                    <Tabs.List aria-label="Options" className="rounded-sm">
                      <Tabs.Tab
                        className="text-xs font-gotham-bold"
                        id="operational"
                      >
                        {"Operational"}
                        <Tabs.Indicator className="rounded-sm" />
                      </Tabs.Tab>
                      <Tabs.Tab
                        className="text-xs font-gotham-bold"
                        id="financial"
                      >
                        {"Financial"}
                        <Tabs.Indicator className="rounded-sm" />
                      </Tabs.Tab>
                    </Tabs.List>
                  </Tabs.ListContainer>

                  <Tabs.Panel className="" id="operational">
                    <OperationalTab />
                  </Tabs.Panel>
                  <Tabs.Panel className="" id="financial">
                    <FinancialTab />
                  </Tabs.Panel>
                </Tabs>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Lmcs;
