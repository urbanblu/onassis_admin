"use client";

import CustomInputComponent from "@/components/custom-input-component";
import { Button, Form } from "@heroui/react";
import { cn } from "@heroui/styles";
import Link from "next/link";
import React from "react";

function OnassisCashLoginView() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#FFF5EE]">
      <div className="w-full px-10 sm:px-0 sm:max-w-sm">
        <div className="flex items-center justify-start gap-x-1">
          <span className="text-[#3D006D] font-gotham-medium">ONASSIS</span>
          <span className="text-[#3D006D] font-gotham-light">CASH</span>
        </div>
        <div
          className={cn(
            "border-2 border-[#B2D8D8] transition-all px-8 sm:px-8 w-full",
            "flex flex-col items-stretch justify-center gap-3 h-full py-32 bg-white",
          )}
        >
          <div className="flex flex-col mx-0 w-full">
            <span className="text-2xl text-black mb-2 font-gotham-regular">
              Log In
            </span>
            <div className="space-y-3">
              <Form className="space-y-4">
                <CustomInputComponent
                  type="email"
                  showLabel={false}
                  showPreficIcon={false}
                />
                <CustomInputComponent
                  type="password"
                  showLabel={false}
                  showPreficIcon={false}
                />
                <Button className="bg-black rounded-none text-xs font-gotham-bold px-7 py-5.5">
                  Log In
                </Button>
              </Form>
              <div className="w-full flex flex-col items-end space-y-2 text-black">
                <Link href={"/login"} className="text-xs underline">
                  Log into Onassis Admin
                </Link>
                <Link
                  href={"/login/onassis-host"}
                  className="text-xs underline"
                >
                  Log in as a Host
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnassisCashLoginView;
