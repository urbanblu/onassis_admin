"use client";

import CustomInputComponent from "@/components/custom-input-component";
import CustomTable, { TableRow } from "@/components/custom-table";
import { Avatar, Button, CloseButton } from "@heroui/react";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";
import NewUserDrawer from "./new-user-drawer";
import ExistingRolesDrawer from "./existing-roles-drawer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminUsersService from "@/api/admin-users";
import EditUserDrawer from "./edit-user";

function TeamMembers() {
  const queryClient = useQueryClient();
  const [searchDraft, setSearchDraft] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 20;

  const { data: adminResp, isPending } = useQuery({
    queryKey: ["admin-users", "list"],
    queryFn: () =>
      AdminUsersService.fetchAdmins({
        page: 1,
        page_size: 100,
      }),
  });

  const admins = React.useMemo(
    () => adminResp?.results ?? [],
    [adminResp?.results],
  );

  const filteredAdmins = React.useMemo(() => {
    const query = searchDraft.trim().toLowerCase();
    if (!query) return admins;
    return admins.filter((user) => {
      const fullName = user.full_name?.toLowerCase() ?? "";
      const firstName = user.first_name?.toLowerCase() ?? "";
      const lastName = user.last_name?.toLowerCase() ?? "";
      const phone = user.phone?.toLowerCase() ?? "";
      const email = user.email?.toLowerCase() ?? "";
      return (
        fullName.includes(query) ||
        firstName.includes(query) ||
        lastName.includes(query) ||
        phone.includes(query) ||
        email.includes(query)
      );
    });
  }, [admins, searchDraft]);

  const paginatedAdmins = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAdmins.slice(start, start + pageSize);
  }, [filteredAdmins, currentPage, pageSize]);

  const pagination = {
    pageNumber: currentPage,
    pageSize,
    totalCount: filteredAdmins.length,
  };

  const onRefresh = () =>
    queryClient.invalidateQueries({ queryKey: ["admin-users", "list"] });

  const tableData: TableRow[] = paginatedAdmins.map((user) => {
    const initials =
      (user.first_name?.[0] ?? user.full_name?.[0] ?? "U").toUpperCase() +
      (user.last_name?.[0] ?? "").toUpperCase();

    const joined = user.date_joined
      ? new Date(user.date_joined).toLocaleDateString("en-GH", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "N/A";

    return {
      name: (
        <div className="flex items-center gap-x-3 min-w-0">
          <Avatar size="sm" className="shrink-0">
            <Avatar.Fallback className="bg-[#f6a21f] text-white text-xs font-gotham-bold">
              {initials}
            </Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-gotham-black truncate">
              {user.full_name || `${user.first_name} ${user.last_name}`}
            </span>
            <span className="text-[10px] text-gray-500 truncate">
              {user.email}
            </span>
          </div>
        </div>
      ),
      phone: (
        <span className="text-xs font-jura-bold">{user.phone ?? "—"}</span>
      ),
      role: (
        <span className="text-xs font-gotham-medium capitalize">
          {user.role?.replace(/_/g, " ") ?? "—"}
        </span>
      ),
      joined: (
        <span className="text-xs font-jura-regular text-gray-600">
          {joined}
        </span>
      ),
      status: (
        <span
          className={`text-[0.65rem] font-gotham-bold px-2 py-0.5 rounded-full border ${
            user.is_active
              ? "text-green-700 border-green-500"
              : "text-gray-500 border-gray-400"
          }`}
        >
          {user.is_active ? "Active" : "Inactive"}
        </span>
      ),
      actions: <EditUserDrawer user={user} onEdited={onRefresh} />,
    };
  });

  return (
    <div className="w-full h-full min-h-0 flex flex-col space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center shrink-0 gap-3">
        <span className="text-sm font-gotham-black">Current Members</span>
        {/* <ExistingRolesDrawer /> */}
      </div>

      {/* Search + actions */}
      <div className="flex flex-col md:flex-row md:items-center w-full gap-3 shrink-0">
        <div className="rounded-sm md:flex-1 w-full flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:space-x-4">
          <div className="w-full md:flex-1 px-2 md:px-0">
            <CustomInputComponent
              className="border-gray-300 bg-white py-0 rounded-sm w-full"
              placeholder="Search by name or phone number"
              onChange={(e) => {
                setSearchDraft(e.target.value);
                setCurrentPage(1);
              }}
              suffixIcon={
                <CloseButton className="mr-2">
                  <BiSearch className="h-3.5" />
                </CloseButton>
              }
            />
          </div>
          {/* <Button
            size="sm"
            variant="ghost"
            className="border bg-white rounded-sm text-xs py-4.5 w-full md:w-auto md:px-6 shrink-0"
            onClick={() => setSearchDraft((prev) => prev.trim())}
          >
            <IoFilter className="text-gray-600 h-4 w-4" />
            Filter
          </Button> */}
        </div>
        <div className="w-full md:w-auto md:shrink-0">
          <ExistingRolesDrawer />
        </div>
        <div className="w-full md:w-auto md:shrink-0">
          <NewUserDrawer onCreated={onRefresh} />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <CustomTable
          columns={[
            { key: "name", label: "Member", sortable: false },
            { key: "phone", label: "Phone", sortable: false },
            { key: "role", label: "Role", sortable: false },
            { key: "joined", label: "Joined", sortable: false },
            { key: "status", label: "Status", sortable: false },
            { key: "actions", label: "", sortable: false },
          ]}
          data={tableData}
          pagination={pagination}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          loading={isPending}
          isRefetching={false}
          emptyMessage="No members found."
        />
      </div>
    </div>
  );
}

export default TeamMembers;
