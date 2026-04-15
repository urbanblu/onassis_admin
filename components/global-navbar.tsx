"use client";

import { Avatar, Button, cn, Popover, Separator } from "@heroui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  RiBarChartLine,
  RiBuildingLine,
  RiFileChartLine,
  RiGiftLine,
  RiShoppingCart2Line,
  RiStoreLine,
} from "react-icons/ri";
import { LuChevronRight } from "react-icons/lu";
import LogoImage from "../public/images/logo.png";
import useAuth from "@/stores/auth.store";

const navItems = [
  { label: "Sales",     href: "/sales",     icon: RiShoppingCart2Line },
  { label: "Analysis",  href: "/analysis",  icon: RiBarChartLine },
  { label: "Draws",     href: "/draws",     icon: RiGiftLine },
  { label: "Reports",   href: "/reports",   icon: RiFileChartLine },
  { label: "LMCs",      href: "/lmcs",      icon: RiBuildingLine },
  { label: "Retailers", href: "/retailers", icon: RiStoreLine },
];

function GlobalNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { removeAuth, auth } = useAuth();
  const [profileOpen, setProfileOpen] = React.useState(false);

  const handleLogout = () => {
    removeAuth();
    router.replace("/login");
  };

  const first_name = auth?.user?.first_name ?? "";
  const last_name = auth?.user?.last_name ?? "";
  const full_name = auth?.user?.full_name ?? `${first_name} ${last_name}`.trim();
  const email = auth?.user?.email ?? "";
  const role = auth?.user?.role ?? "";

  return (
    <div className="fixed left-0 top-0 h-screen flex flex-col bg-white border-r z-50 w-16 md:w-[220px] transition-all">
      {/* Logo */}
      <div className="flex items-center justify-center md:justify-start px-3 md:px-5 py-5 mb-1">
        <Image
          src={LogoImage}
          alt="logo"
          className="w-8 md:w-[110px] object-contain"
        />
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 px-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 w-full rounded-sm transition-colors cursor-pointer",
                isActive
                  ? "bg-[#f6a21f] text-white"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="hidden md:block text-xs font-gotham-bold">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* User section */}
      <Popover isOpen={profileOpen} onOpenChange={setProfileOpen}>
        <Popover.Trigger>
          <div
            className="flex items-center gap-2.5 px-3 py-4 border-t cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <Avatar size="sm" className="shrink-0">
              {auth?.user?.photo ? (
                <Avatar.Image alt="avatar" src={auth.user.photo} />
              ) : (
                <Avatar.Fallback className="bg-[#f6a21f] text-white text-xs font-gotham-bold">
                  {`${first_name.charAt(0)}${last_name.charAt(0)}`}
                </Avatar.Fallback>
              )}
            </Avatar>
            <div className="hidden md:flex flex-col flex-1 min-w-0">
              <span className="text-xs font-gotham-bold truncate text-gray-800">
                {full_name}
              </span>
              <span className="text-[0.65rem] font-gotham-regular text-gray-500 truncate">
                {email}
              </span>
            </div>
            <LuChevronRight className="hidden md:block w-3.5 h-3.5 text-gray-400 shrink-0" />
          </div>
        </Popover.Trigger>
        <Popover.Content className="rounded-sm shadow border w-[220px] p-0 ml-2">
          <Popover.Dialog className="w-full p-0">
            {/* Identity header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <Avatar size="sm" className="shrink-0">
                {auth?.user?.photo ? (
                  <Avatar.Image alt="avatar" src={auth.user.photo} />
                ) : (
                  <Avatar.Fallback className="bg-[#f6a21f] text-white text-xs font-gotham-bold">
                    {`${first_name.charAt(0)}${last_name.charAt(0)}`}
                  </Avatar.Fallback>
                )}
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-gotham-bold text-gray-800 truncate">
                  {full_name}
                </span>
                <span className="text-[0.65rem] font-gotham-regular text-gray-500 truncate capitalize">
                  {role.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            {/* Settings */}
            <Button
              className="w-full rounded-none text-xs font-gotham-black text-start bg-transparent hover:bg-gray-100 transition-colors p-0 text-gray-800 justify-start px-4 py-2.5 h-auto"
              onClick={() => {
                setProfileOpen(false);
                router.push("/settings");
              }}
            >
              Settings
            </Button>

            <Separator className="h-px" />

            {/* Logout */}
            <Button
              className="w-full rounded-none text-xs font-gotham-black text-start bg-transparent hover:bg-gray-100 transition-colors p-0 text-[#ce2856] justify-start px-4 py-2.5 h-auto"
              onClick={() => {
                setProfileOpen(false);
                handleLogout();
              }}
            >
              Log out
            </Button>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}

export default GlobalNavbar;
