"use client";

import CustomTable from "@/components/custom-table";
import {
  AlertDialog,
  Button,
  CloseButton,
  Drawer,
  ListBox,
  ListBoxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@heroui/react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RiCheckLine, RiCloseCircleLine } from "react-icons/ri";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import GamesService from "@/api/games";
import { IPendingApproval } from "@/interfaces/games.interface";
import ToastService from "@/utils/toast-service";
import React from "react";
import CustomSelectComponent from "@/components/custom-select-component";
import ApiError from "@/utils/api_error";

type PendingAction = {
  type: "confirm" | "reject";
  item: IPendingApproval;
};

const today = new Date().toISOString().split("T")[0];

function ManageDrawDrawer({
  isOpen,
  onCloseTap,
}: {
  isOpen: boolean;
  onCloseTap: () => void;
}) {
  const [, setCurrentPage] = useState(1);
  const [selectedEventId, setSelectedEventId] = React.useState<string>("");
  const [actionOpened, setActionIsOpen] = useState<string | null>(null);
  const [currentPageSize, setCurrentPageSize] = useState(20);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );

  const queryClient = useQueryClient();

  const { data: eventsData, isPending: eventsPending } = useQuery({
    queryKey: ["games", "events-list", today],
    queryFn: () =>
      GamesService.fetchDrawEvents({ page_size: 100, draw_date: today }),
    enabled: isOpen,
  });

  const eventOptions = React.useMemo(() => {
    const mapped = (eventsData?.results ?? []).map((e) => {
      const name =
        e.event_name ?? e.name ?? e.game_type_name ?? e.game_type?.name ?? "—";
      const date = e.draw_date
        ? new Date(e.draw_date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "—";
      return {
        key: e.event_id ?? e.id,
        label: `#${e.event_no} — ${name} (${date})`,
      };
    });
    return [{ key: "allEvents", label: "All Events" }, ...mapped];
  }, [eventsData]);

  const { data, isFetching } = useQuery({
    queryKey: ["pending-approvals"],
    queryFn: GamesService.fetchPendingApprovals,
    enabled: isOpen,
  });

  const { mutate: executeAction, isPending: isActing } = useMutation({
    mutationFn: async (action: PendingAction) => {
      if (action.type === "confirm") {
        await GamesService.confirmDrawResult(action.item.confirm_url);
      } else {
        await GamesService.rejectDrawResult(action.item.reject_url);
      }
    },
    onSuccess: (_, action) => {
      ToastService.success({
        text:
          action.type === "confirm"
            ? "Draw result confirmed successfully."
            : "Draw result rejected.",
      });
      setPendingAction(null);
      queryClient.invalidateQueries({ queryKey: ["pending-approvals"] });
    },
    onError: (error: ApiError) => {
      ToastService.error({
        text: error?.message ?? "Action failed. Please try again.",
      });
    },
  });

  const allPending = data?.pending ?? [];
  const filteredPending =
    !selectedEventId || selectedEventId === "allEvents"
      ? allPending
      : allPending.filter((item) => item.draw_event_id === selectedEventId);

  const tableData = filteredPending.map((item) => ({
    drawId: `${item.draw_event_id}`,
    eventName: item.event_name ?? item.game_type,
    gameType: item.game_type,
    drawDate: item.draw_date,
    numbers: item.numbers.join(", "),
    submittedBy: item.submitted_by,
    action: (() => {
      const rowId = item.approval_id;
      return (
        <Popover
          isOpen={actionOpened === rowId}
          onOpenChange={(open) => setActionIsOpen(open ? rowId : null)}
        >
          <PopoverTrigger>
            <CloseButton>
              <IoIosArrowDown />
            </CloseButton>
          </PopoverTrigger>
          <PopoverContent className="rounded-sm">
            <ListBox
              aria-label="Actions"
              className="min-w-[150px]"
              onAction={(key) => {
                setActionIsOpen(null);
                setPendingAction({
                  type: key as "confirm" | "reject",
                  item,
                });
              }}
            >
              <ListBoxItem
                id="confirm"
                className="text-xs rounded-sm flex justify-between"
              >
                <span>Confirm</span>
                <RiCheckLine size={15} />
              </ListBoxItem>
              <ListBoxItem
                id="reject"
                className="text-danger rounded-sm flex justify-between"
              >
                <span>Reject</span>
                <RiCloseCircleLine size={15} />
              </ListBoxItem>
            </ListBox>
          </PopoverContent>
        </Popover>
      );
    })(),
  }));

  return (
    <div>
      <Drawer isOpen={isOpen}>
        <Drawer.Backdrop isDismissable={true}>
          <Drawer.Content
            placement="right"
            className="w-[70vw]! max-w-[70vw] min-w-[300px] bg-white h-screen"
          >
            <Drawer.Dialog className="rounded-none w-full">
              <Drawer.Header>
                <div className="flex justify-between items-center">
                  <Drawer.Heading className="text-sm font-gotham-bold">
                    {"Manage Pending Draws"}
                  </Drawer.Heading>
                  <CloseButton
                    className="bg-transparent text-black"
                    onClick={onCloseTap}
                  />
                </div>
              </Drawer.Header>
              <Drawer.Body>
                <CustomSelectComponent
                  label="Filter by Event"
                  placeholder=""
                  className="max-w-[300px]"
                  showDropDownIcon
                  initialItemKey="allEvents"
                  list={eventOptions}
                  isDisabled={eventsPending || eventOptions.length === 0}
                  onSelectionChange={(item) => setSelectedEventId(item.key)}
                />
                <div className="flex flex-col space-y-5 sm:h-[calc(100vh-9rem)] sm:overflow-hidden">
                  <div className="sm:h-full sm:flex-1 sm:min-h-0 mt-2">
                    <div className="h-full overflow-hidden">
                      <CustomTable
                        columns={[
                          { key: "drawId", label: "Draw Id", sortable: false },
                          {
                            key: "eventName",
                            label: "Event Name",
                            sortable: false,
                          },
                          {
                            key: "gameType",
                            label: "Game Type",
                            sortable: false,
                          },
                          {
                            key: "drawDate",
                            label: "Draw Date",
                            sortable: false,
                          },
                          {
                            key: "numbers",
                            label: "Numbers",
                            sortable: false,
                          },
                          {
                            key: "submittedBy",
                            label: "Submitted By",
                            sortable: true,
                          },
                          { key: "action", label: "Action", sortable: false },
                        ]}
                        enablePagination={false}
                        data={tableData}
                        pageSize={currentPageSize}
                        onPageChange={(page) => setCurrentPage(page)}
                        onPageSizeChange={(size) => {
                          setCurrentPageSize(size);
                          setCurrentPage(1);
                        }}
                        onRowClick={() => {}}
                        onSort={() => {}}
                        loading={isFetching}
                        isRefetching={isFetching}
                      />
                    </div>
                  </div>
                </div>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>

      <AlertDialog
        isOpen={pendingAction !== null}
        onOpenChange={(open) => {
          if (!open) setPendingAction(null);
        }}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="rounded-sm">
              <AlertDialog.Header>
                <AlertDialog.Icon
                  status={
                    pendingAction?.type === "confirm" ? "success" : "danger"
                  }
                />
                <AlertDialog.Heading className="font-gotham-black text-sm">
                  {pendingAction?.type === "confirm"
                    ? "Confirm Draw Result"
                    : "Reject Draw Result"}
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-xs text-gray-600">
                  {pendingAction?.type === "confirm"
                    ? `Are you sure you want to confirm the draw result for the event? The numbers `
                    : `Are you sure you want to reject the draw result for the event?`}
                  {pendingAction?.type === "confirm" && (
                    <span className="font-gotham-black text-gray-800">
                      {pendingAction?.item.numbers.join(", ")}
                    </span>
                  )}
                  {pendingAction?.type === "confirm" && " will be finalised."}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Submitted by:{" "}
                  <span className="font-gotham-black">
                    {pendingAction?.item.submitted_by}
                  </span>
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  size="sm"
                  className="bg-transparent border text-black rounded-sm px-6 py-1 text-xs font-gotham-black"
                  onPress={() => setPendingAction(null)}
                  isDisabled={isActing}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className={`text-white rounded-sm text-xs font-gotham-black ${
                    pendingAction?.type === "confirm"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                  onPress={() => pendingAction && executeAction(pendingAction)}
                  isPending={isActing}
                  isDisabled={isActing}
                >
                  {({ isPending }) => (
                    <>
                      {isPending ? (
                        <Spinner color="current" size="sm" />
                      ) : pendingAction?.type === "confirm" ? (
                        "Yes, Confirm"
                      ) : (
                        "Yes, Reject"
                      )}
                    </>
                  )}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
}

export default ManageDrawDrawer;
