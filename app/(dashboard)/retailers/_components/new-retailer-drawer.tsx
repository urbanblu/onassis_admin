import CustomDatePicker from "@/components/custom-date-picker";
import CustomInputComponent from "@/components/custom-input-component";
import CustomSelectComponent from "@/components/custom-select-component";
import LmcService from "@/api/lmc";
import WritersService from "@/api/writers";
import { useFileUpload } from "@/hooks/use-file-upload";
import ToastService from "@/utils/toast-service";
import { Button, CloseButton, CloseIcon, Drawer, Form } from "@heroui/react";
import { DateValue, getLocalTimeZone, today } from "@internationalized/date";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

type Props = {
  onFilterTap?: (payload: { name: string; phoneNumber: string }) => void;
};

function NewRetailerDrawer(payload: Props) {
  const [drawerIsOpen, setDrawerOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedLmcId, setSelectedLmcId] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState("");
  const queryClient = useQueryClient();

  const {
    files,
    onClick: onPhotoUploadClick,
    InputComponent,
    removeFile,
  } = useFileUpload({
    accept: "image/*",
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
    onMaxFileSizeDetected: () => {
      ToastService.info({
        text: "Maximum file size exceeded",
      });
    },
  });

  const { data: lmcs = [], isPending: lmcPending } = useQuery({
    queryKey: ["lmc", "owners"],
    queryFn: LmcService.fetchLmcOwners,
    enabled: drawerIsOpen,
  });

  const lmcOptions = lmcs.map((lmc) => ({
    key: lmc.id,
    label: `${lmc.owner_full_name} (${lmc.code})`,
  }));

  const { mutateAsync: registerWriter, isPending: writerPending } = useMutation({
    mutationKey: ["writers", "register"],
    mutationFn: WritersService.registerWriter,
    onSuccess: async () => {
      ToastService.success({ text: "Retailer created successfully" });
      await queryClient.invalidateQueries({ queryKey: ["writers", "all"] });
      setDrawerOpen(false);
    },
  });

  return (
    <Drawer>
      <Button
        className="rounded-sm bg-[#0A6FFD] text-xs font-gotham-bold"
        size="md"
        onClick={() => setDrawerOpen(true)}
      >
        New Retailer
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
                  if (!selectedLmcId) {
                    ToastService.error({ text: "Please select an LMC user" });
                    return;
                  }
                  if (!selectedDate) {
                    ToastService.error({ text: "Please pick date of birth" });
                    return;
                  }
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
                    await registerWriter({
                      email: String(data.email ?? ""),
                      first_name: String(data.firstName ?? ""),
                      last_name: String(data.lastName ?? ""),
                      phone: String(data.phoneNumber ?? ""),
                      password,
                      lmc_id: selectedLmcId,
                      date_of_birth: selectedDate,
                      location_address: String(data.location ?? ""),
                      photo: files[0],
                    });
                    payload.onFilterTap?.({
                      name: String(data.firstName ?? ""),
                      phoneNumber: String(data.phoneNumber ?? ""),
                    });
                  } catch (error) {
                    ToastService.error({
                      text:
                        error instanceof Error
                          ? error.message
                          : "Failed to register retailer",
                    });
                  }
                }}
              >
                <div className="flex flex-col space-y-3">
                  <span className="text-lg font-gotham-black">
                    Add New Retailer
                  </span>
                  <div className="space-y-4">
                    <InputComponent />
                    <div className="w-full flex justify-center">
                      <div
                        className={`relative rounded-full w-35 h-35 ${files.length === 0 ? "border" : ""} justify-center flex flex-col`}
                        onClick={onPhotoUploadClick}
                      >
                        <div
                          className={`flex flex-col items-center ${files.length === 0 ? "p-3" : ""} space-y-2`}
                        >
                          {files.length === 0 ? (
                            <>
                              <IoCameraOutline size={25} />
                              <span className="text-center">
                                Click to add photo
                              </span>
                            </>
                          ) : (
                            <Image
                              src={URL.createObjectURL(files[0])}
                              alt="Profile"
                              className="w-35 h-35 object-cover rounded-full"
                              width={0}
                              height={0}
                            />
                          )}
                        </div>
                        {files.length > 0 && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(0);
                            }}
                            className="absolute top-1 right-3 z-10 cursor-pointer bg-white rounded-full p-1 shadow-sm"
                          >
                            <RiDeleteBin6Line className="text-red-500" />
                          </span>
                        )}
                      </div>
                    </div>
                    <CustomInputComponent
                      label="First Name"
                      className="p-0 border rounded-sm border-gray-300"
                      name="firstName"
                      isRequired
                    />
                    <CustomInputComponent
                      label="Last Name"
                      className="p-0 border rounded-sm border-gray-300"
                      name="lastName"
                      isRequired
                    />
                    <CustomInputComponent
                      label="Email"
                      className="p-0 border rounded-sm border-gray-300"
                      name="email"
                      showPlaceholder={false}
                      showPreficIcon={false}
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
                      className="p-0 border rounded-sm border-gray-300"
                    />
                    <CustomInputComponent
                      type="password"
                      name="confirmPassword"
                      label="Confirm Password"
                      validate={(val) => {
                        if (!val) return "This field is required";
                        if (val !== passwordValue) return "Passwords do not match";
                        return null;
                      }}
                      className="p-0 border rounded-sm border-gray-300"
                    />
                    <CustomSelectComponent
                      label="Lmc User"
                      placeholder=""
                      showDropDownIcon
                      list={lmcOptions}
                      isDisabled={lmcPending || lmcOptions.length === 0}
                      onSelectionChange={(val) => setSelectedLmcId(val.key)}
                    />
                    <CustomDatePicker
                      label="Date of Birth"
                      className="border rounded-sm border-gray-300 w-full"
                      maxValue={today(getLocalTimeZone()).subtract({ days: 1 })}
                      onDatePicked={(date: DateValue) =>
                        setSelectedDate(date.toString())
                      }
                    />
                    <CustomInputComponent
                      label="Location"
                      className="p-0 border rounded-sm border-gray-300"
                      name="location"
                      isRequired
                    />
                  </div>
                  <Button
                    className="rounded-sm bg-black w-full text-xs font-gotham-black mt-2"
                    type="submit"
                    isDisabled={writerPending}
                  >
                    {writerPending ? "Saving..." : "Save"}
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

export default NewRetailerDrawer;
