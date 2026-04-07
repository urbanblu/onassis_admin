import GlobalNavbar from "@/components/global-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GlobalNavbar>{children}</GlobalNavbar>;
}
