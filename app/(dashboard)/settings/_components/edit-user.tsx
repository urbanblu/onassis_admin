import CustomInputComponent from "@/components/custom-input-component";
import CustomSelectComponent from "@/components/custom-select-component";
import {
  Button,
  CloseButton,
  CloseIcon,
  Drawer,
  Form,
  Spinner,
} from "@heroui/react";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AdminUsersService from "@/api/admin-users";
import ToastService from "@/utils/toast-service";
import { FaRegEdit } from "react-icons/fa";
import type { IAdminUser } from "@/interfaces/admin-users.interface";
import ApiError from "@/utils/api_error";

type Props = {
  user: IAdminUser;
  onEdited?: () => void;
};

function EditUserDrawer(payload: Props) {
  const [drawerIsOpen, setDrawerOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: editAdmin, isPending } = useMutation({
    mutationKey: ["admin-users", "edit", payload.user.id],
    mutationFn: (data: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
    }) => AdminUsersService.editAdmin(payload.user.id, data),
    onSuccess: async () => {
      ToastService.success({ text: "Team member updated" });
      await queryClient.invalidateQueries({
        queryKey: ["admin-users", "list"],
      });
      payload.onEdited?.();
      setDrawerOpen(false);
    },
    onError: (error: ApiError) => {
      ToastService.error({
        text: error?.message ?? "Failed to update team member",
      });
    },
  });

  return (
    <Drawer>
      <FaRegEdit
        className="w-3 h-3 text-blue-500 cursor-pointer"
        onClick={() => setDrawerOpen(true)}
      />
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
                  const data = Object.fromEntries(
                    new FormData(e.currentTarget),
                  );

                  try {
                    await editAdmin({
                      first_name: String(data.firstName ?? ""),
                      last_name: String(data.surname ?? ""),
                      email: String(data.email ?? ""),
                      phone: String(data.phoneNumber ?? ""),
                    });
                  } catch (error) {
                    ToastService.error({
                      text:
                        error instanceof Error
                          ? error.message
                          : "Failed to create member",
                    });
                  }
                }}
              >
                <div className="flex flex-col space-y-3">
                  <span className="text-lg font-gotham-black">Edit user</span>
                  <div className="space-y-4">
                    <CustomInputComponent
                      label="First Name"
                      className="p-0 border rounded-sm border-gray-300"
                      name="firstName"
                      defaultValue={payload.user.first_name}
                    />
                    <CustomInputComponent
                      label="Surname"
                      className="p-0 border rounded-sm border-gray-300"
                      name="surname"
                      defaultValue={payload.user.last_name}
                    />
                    <CustomInputComponent
                      label="Email"
                      className="p-0 border rounded-sm border-gray-300"
                      name="email"
                      showPlaceholder={false}
                      type="email"
                      defaultValue={payload.user.email}
                    />
                    <CustomInputComponent
                      label="Phone Number"
                      className="p-0 border rounded-sm border-gray-300"
                      name="phoneNumber"
                      type="tel"
                      defaultValue={payload.user.phone}
                    />
                    <CustomSelectComponent
                      label="Role"
                      placeholder=""
                      showDropDownIcon
                      list={[{ key: "admin", label: "Admin" }]}
                      onSelectionChange={() => {}}
                    />
                  </div>
                  <Button
                    className="rounded-sm bg-black w-full text-xs font-gotham-black mt-2"
                    type="submit"
                    isDisabled={isPending}
                    isPending={isPending}
                  >
                    {({ isPending }) => (
                      <>
                        {isPending ? (
                          <Spinner color="current" size="sm" />
                        ) : (
                          "Save"
                        )}
                      </>
                    )}
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

export default EditUserDrawer;
