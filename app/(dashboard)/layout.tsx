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
  const { auth, _hasHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!_hasHydrated) return;
    if (!auth) {
      router.replace("/login");
    }
  }, [auth, _hasHydrated, router]);

  return (
    <div className="flex h-screen bg-white">
      <GlobalNavbar />
      <main className="flex-1 ml-16 md:ml-[220px] overflow-auto">
        {children}
      </main>
    </div>
  );
}
