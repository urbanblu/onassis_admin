"use client";

import GlobalNavbar from "@/components/global-navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/stores/auth.store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.replace("/login");
    }
  }, [auth, router]);

  return <GlobalNavbar>{children}</GlobalNavbar>;
}
