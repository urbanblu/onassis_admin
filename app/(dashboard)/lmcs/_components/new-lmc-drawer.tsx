import CustomInputComponent from "@/components/custom-input-component";
import CustomSelectComponent from "@/components/custom-select-component";
import { Button, CloseButton, CloseIcon, Drawer, Form } from "@heroui/react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LmcService from "@/api/lmc";
import ToastService from "@/utils/toast-service";

function NewLmcDrawer() {
  const [drawerIsOpen, setDrawerOpen] = React.useState(false);
  const [selectedOwnerId, setSelectedOwnerId] = React.useState<string>("");
  const queryClient = useQueryClient();

  const { data: owners = [], isPending: ownersPending } = useQuery({
    queryKey: ["lmc", "available-owners"],
    queryFn: LmcService.fetchAvailableLmcOwners,
    enabled: drawerIsOpen,
  });

  const ownerOptions = React.useMemo(
    () =>
      owners.map((owner) => ({
        key: owner.id,
        label: `${owner.full_name} (${owner.phone})`,
      })),
    [owners],
  );

  const { mutateAsync: registerLmc, isPending: isRegistering } = useMutation({
    mutationKey: ["lmc", "register"],
    mutationFn: LmcService.registerLmc,
    onSuccess: async () => {
      ToastService.success({ text: "LMC registered successfully" });
      await queryClient.invalidateQueries({ queryKey: ["lmc", "detail-cards"] });
      setDrawerOpen(false);
      setSelectedOwnerId("");
    },
  });

  return (
    <Drawer>
      <Button
        className="rounded-sm bg-black text-xs font-gotham-bold"
        size="md"
        onClick={() => setDrawerOpen(true)}
      >
        New LMC
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
            <Drawer.Body className="text-black">
              <Form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!selectedOwnerId) {
                    ToastService.error({ text: "Please select an owner" });
                    return;
                  }

                  const data = Object.fromEntries(
                    new FormData(e.currentTarget),
                  );

                  try {
                    await registerLmc({
                      owner: selectedOwnerId,
                      address: String(data.address ?? ""),
                      is_active: true,
                    });
                  } catch (error) {
                    ToastService.error({
                      text:
                        error instanceof Error ? error.message : "Failed to register LMC",
                    });
                  }
                }}
              >
                <div className="flex flex-col space-y-3">
                  <span className="text-lg font-gotham-black">NEW LMC</span>
                  <div className="space-y-4">
                    <CustomSelectComponent
                      label="Select User"
                      placeholder=""
                      showDropDownIcon
                      list={ownerOptions}
                      isDisabled={ownersPending || ownerOptions.length === 0}
                      onSelectionChange={(item) => setSelectedOwnerId(item.key)}
                    />
                    <CustomInputComponent
                      label="Address"
                      className="p-0 border rounded-sm border-gray-300"
                      name="address"
                      isRequired={true}
                    />
                  </div>
                  <Button
                    className="rounded-sm bg-black w-full text-xs font-gotham-black mt-2"
                    type="submit"
                    isDisabled={isRegistering}
                  >
                    {isRegistering ? "Saving..." : "Save"}
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

export default NewLmcDrawer;
