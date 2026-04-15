"use client";

import CustomSelectComponent from "@/components/custom-select-component";
import GamesService from "@/api/games";
import ToastService from "@/utils/toast-service";
import { Button, CloseButton, CloseIcon, Drawer, Form, Label } from "@heroui/react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const NUMBERS_COUNT = 5;
const today = new Date().toISOString().split("T")[0];

function CreateDrawDrawer() {
  const [drawerIsOpen, setDrawerOpen] = React.useState(false);
  const [selectedEventId, setSelectedEventId] = React.useState<string>("");
  const [numbers, setNumbers] = React.useState<string[]>(
    Array(NUMBERS_COUNT).fill(""),
  );
  const queryClient = useQueryClient();

  const { data: eventsData, isPending: eventsPending } = useQuery({
    queryKey: ["games", "events-list", today],
    queryFn: () => GamesService.fetchDrawEvents({ page_size: 100, draw_date: today }),
    enabled: drawerIsOpen,
  });

  const eventOptions = React.useMemo(
    () =>
      (eventsData?.results ?? []).map((e) => {
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
      }),
    [eventsData],
  );

  const { mutateAsync: createResult, isPending: isSubmitting } = useMutation({
    mutationKey: ["games", "create-draw-result"],
    mutationFn: ({ eventId, nums }: { eventId: string; nums: number[] }) =>
      GamesService.createDrawResult(eventId, { numbers: nums }),
    onSuccess: async () => {
      ToastService.success({ text: "Draw result submitted successfully" });
      await queryClient.invalidateQueries({
        queryKey: ["games", "draws-and-winnings-table"],
      });
      handleClose();
    },
  });

  const handleClose = () => {
    setDrawerOpen(false);
    setSelectedEventId("");
    setNumbers(Array(NUMBERS_COUNT).fill(""));
  };

  const handleNumberChange = (index: number, value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 2);
    setNumbers((prev) => {
      const next = [...prev];
      next[index] = digits;
      return next;
    });
  };

  return (
    <Drawer>
      <Button
        className="rounded-sm bg-[#f6a21f] text-xs font-gotham-bold"
        size="md"
        onClick={() => setDrawerOpen(true)}
      >
        Create Draw
      </Button>
      <Drawer.Backdrop
        variant="blur"
        className="backdrop-blur-xs"
        isOpen={drawerIsOpen}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <Drawer.Content placement="right">
          <Drawer.Dialog className="rounded-none">
            <Drawer.Header>
              <CloseButton
                className="self-end bg-transparent"
                onClick={handleClose}
              >
                <CloseIcon className="w-5 h-5 text-shadow-black" />
              </CloseButton>
            </Drawer.Header>
            <Drawer.Body className="text-black">
              <Form
                onSubmit={async (e) => {
                  e.preventDefault();

                  if (!selectedEventId) {
                    ToastService.error({ text: "Please select an event" });
                    return;
                  }

                  const parsed = numbers.map((n) => parseInt(n, 10));
                  if (parsed.some((n) => isNaN(n) || n < 1)) {
                    ToastService.error({
                      text: "Please enter all 5 winning numbers",
                    });
                    return;
                  }

                  try {
                    await createResult({ eventId: selectedEventId, nums: parsed });
                  } catch (error) {
                    ToastService.error({
                      text:
                        error instanceof Error
                          ? error.message
                          : "Failed to submit draw result",
                    });
                  }
                }}
              >
                <div className="flex flex-col space-y-4">
                  <span className="text-lg font-gotham-black">CREATE DRAW</span>

                  <CustomSelectComponent
                    label="Event"
                    placeholder=""
                    showDropDownIcon
                    list={eventOptions}
                    isDisabled={eventsPending || eventOptions.length === 0}
                    onSelectionChange={(item) => setSelectedEventId(item.key)}
                  />

                  <div className="flex flex-col space-y-2">
                    <Label className="text-xs">Winning Numbers</Label>
                    <div className="flex gap-2">
                      {numbers.map((val, i) => (
                        <input
                          key={i}
                          value={val}
                          onChange={(e) => handleNumberChange(i, e.target.value)}
                          placeholder="—"
                          className="w-12 h-12 text-center text-sm font-jura-bold border border-gray-300 rounded-sm focus:outline-none focus:border-black"
                        />
                      ))}
                    </div>
                  </div>

                  <Button
                    className="rounded-sm bg-[#f6a21f] w-full text-xs font-gotham-black mt-2"
                    type="submit"
                    isDisabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Result"}
                  </Button>
                </div>
              </Form>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

export default CreateDrawDrawer;
