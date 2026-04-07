"use client";

import {
  Avatar,
  Button,
  CloseButton,
  CloseIcon,
  cn,
  Drawer,
  Separator,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LotusIconImage from "../public/images/lotus-icon.webp";
import { usePathname, useRouter } from "next/navigation";
import ContactlessPayIcon from "../public/images/contactless-pay.webp";
import NotificationIcon from "../public/images/notification-icon.webp";
import GearIcon from "../public/images/gear-icon.webp";
import LogoutIcon from "../public/images/logout-icon.webp";
import HamburgerIcon from "../public/images/hamburger.webp";

function GlobalNavbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const [drawerIsOpen, setDrawerOpen] = React.useState(false);
  const router = useRouter();

  const handleLinkOnTap = (payload: { label: string; href: string }) => {
    if (payload.href == "/players") return;
    if (payload.label == "Logout") {
      return;
    }

    router.replace(payload.href);
    setDrawerOpen(false);
  };

  const navItems = [
    { label: "Sales", href: "/sales" },
    { label: "Analysis", href: "/analysis" },
    { label: "Draws", href: "/draws" },
    { label: "Reports", href: "/reports" },
    { label: "LMCs", href: "/lmcs" },
    { label: "Retailers", href: "/retailers" },
    { label: "Players", href: "/players" },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <div className="fixed top-0 right-0 left-0 z-50 bg-white">
        <div className="flex justify-between pr-7 pl-5 items-center py-5 sm:py-4">
          <Image
            src={LotusIconImage}
            alt="logo"
            className="w-[100px] sm:w-[200px]"
          />
          <div className="space-x-4 hidden md:flex">
            {navItems.map((i) => (
              <Link
                key={i.label}
                href={i.href == "/players" ? "" : i.href}
                className={cn(
                  "text-sm font-gotham-regular",
                  pathname.includes(i.href) ? "font-gotham-medium" : "",
                )}
              >
                {i.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Image
              src={ContactlessPayIcon}
              alt="contactless-pay"
              className="h-5 w-5 cursor-pointer"
            />
            <Image
              src={NotificationIcon}
              alt="notification-icon"
              className="h-5 w-5 cursor-pointer"
            />
            <Image
              src={GearIcon}
              alt="gear-icon"
              className="h-5 w-5 cursor-pointer"
            />
            <div className="rounded-full p-0.5 border-2 border-blue-600">
              <Avatar size="sm" className="cursor-pointer" />
            </div>
            <Image
              src={LogoutIcon}
              alt="logout-icon"
              className="h-5 w-5 cursor-pointer"
            />
          </div>
          <Drawer>
            <Button
              size="sm"
              variant="ghost"
              className="p-0 bg-transparent md:hidden"
              onClick={() => setDrawerOpen(true)}
            >
              <Image
                src={HamburgerIcon}
                alt="HamburgerIcon"
                className="h-5 w-5 cursor-pointer flex md:hidden"
              />
            </Button>
            <Drawer.Backdrop
              variant="blur"
              className={"backdrop-blur-xs"}
              isOpen={drawerIsOpen}
              onOpenChange={setDrawerOpen}
            >
              <Drawer.Content placement="right">
                <Drawer.Dialog className="rounded-none">
                  <Drawer.Header>
                    <CloseButton
                      className="self-end bg-transparent"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <CloseIcon className="w-[20px] h-[20px] text-shadow-black" />
                    </CloseButton>
                  </Drawer.Header>
                  <Drawer.Body>
                    <nav className="flex flex-col gap-1">
                      {navItems.map((item) => (
                        <Button
                          key={item.label}
                          className={cn(
                            "w-full rounded-none text-start bg-transparent text-black p-0 text-xs font-gotham-medium justify-start",
                            lastSegment == item.label.toLowerCase()
                              ? "font-gotham-black"
                              : "",
                          )}
                          onClick={() => handleLinkOnTap(item)}
                        >
                          {item.label}
                        </Button>
                      ))}
                    </nav>
                  </Drawer.Body>
                  <Drawer.Footer>
                    <nav className="flex flex-col items-start w-full gap-1">
                      {[
                        { label: "Settings", href: "" },
                        { label: "Logout", href: "" },
                      ].map((item) => (
                        <Button
                          key={item.label}
                          className={cn(
                            "w-full rounded-none text-start bg-transparent text-black p-0 text-xs font-gotham-medium justify-start",
                            lastSegment == item.label.toLowerCase()
                              ? "font-gotham-black"
                              : "",
                          )}
                          onClick={() => handleLinkOnTap(item)}
                        >
                          {item.label}
                        </Button>
                      ))}
                    </nav>
                  </Drawer.Footer>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
        </div>
        <Separator className="h-[1.5px]" />
      </div>
      <section className="pt-24 flex-1 min-h-0 flex flex-col overflow-y-auto">
        {children}
      </section>
    </div>
  );
}

export default GlobalNavbar;
