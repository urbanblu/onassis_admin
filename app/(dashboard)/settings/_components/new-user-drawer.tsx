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
import { RiAddLine } from "react-icons/ri";

type Props = {
  onCreated?: () => void;
};

function NewUserDrawer(payload: Props) {
  const [drawerIsOpen, setDrawerOpen] = React.useState(false);
  const [passwordValue, setPasswordValue] = React.useState("");
  const queryClient = useQueryClient();

  const { mutateAsync: createAdmin, isPending } = useMutation({
    mutationKey: ["admin-users", "create"],
    mutationFn: AdminUsersService.createAdmin,
    onSuccess: async () => {
      ToastService.success({ text: "New team member created" });
      await queryClient.invalidateQueries({
        queryKey: ["admin-users", "list"],
      });
      payload.onCreated?.();
      setDrawerOpen(false);
    },
  });

  return (
    <Drawer>
      <Button
        className="rounded-sm w-full bg-[#237c9c] text-xs font-gotham-bold"
        size="md"
        onClick={() => setDrawerOpen(true)}
      >
        <RiAddLine />
        Invite Someone
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
                  const data = Object.fromEntries(
                    new FormData(e.currentTarget),
                  );
                  const password = String(data.password ?? "");
                  const confirmPassword = String(data.confirmPassword ?? "");
                  if (password.length < 8) {
                    ToastService.error({
                      text: "password: Ensure this field has at least 8 characters.",
                    });
                    return;
                  }
                  if (password !== confirmPassword) {
                    ToastService.error({ text: "Passwords do not match" });
                    return;
                  }

                  try {
                    await createAdmin({
                      first_name: String(data.firstName ?? ""),
                      last_name: String(data.surname ?? ""),
                      email: String(data.email ?? ""),
                      phone: String(data.phoneNumber ?? ""),
                      password,
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
                  <span className="text-lg font-gotham-black">New user</span>
                  <div className="space-y-4">
                    <CustomInputComponent
                      label="First Name"
                      className="p-0 border rounded-sm border-gray-300"
                      name="firstName"
                    />
                    <CustomInputComponent
                      label="Surname"
                      className="p-0 border rounded-sm border-gray-300"
                      name="surname"
                    />
                    <CustomInputComponent
                      label="Email"
                      className="p-0 border rounded-sm border-gray-300"
                      name="email"
                      showPlaceholder={false}
                      type="email"
                    />
                    <CustomInputComponent
                      label="Phone Number"
                      className="p-0 border rounded-sm border-gray-300"
                      name="phoneNumber"
                      type="tel"
                    />
                    <CustomInputComponent
                      type="password"
                      name="password"
                      label="Password"
                      minLength={8}
                      onChange={(e) => setPasswordValue(e.target.value)}
                      showPlaceholder={false}
                      showSuffixIcon={false}
                      showPreficIcon={false}
                      className="p-0 border rounded-sm border-gray-300"
                    />
                    <CustomInputComponent
                      type="password"
                      name="confirmPassword"
                      label="Confirm Password"
                      showLabel={true}
                      showPlaceholder={false}
                      validate={(val) => {
                        if (!val) return "This field is required";
                        if (val !== passwordValue)
                          return "Passwords do not match";
                        return null;
                      }}
                      showSuffixIcon={false}
                      showPreficIcon={false}
                      className="p-0 border rounded-sm border-gray-300"
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
                    className="rounded-sm bg-[#f6a21f] w-full text-xs font-gotham-black mt-2"
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

export default NewUserDrawer;
