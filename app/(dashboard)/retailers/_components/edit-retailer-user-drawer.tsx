"use client";

import CustomInputComponent from "@/components/custom-input-component";
import WritersService from "@/api/writers";
import { useFileUpload } from "@/hooks/use-file-upload";
import ToastService from "@/utils/toast-service";
import {
  Button,
  CloseButton,
  CloseIcon,
  Drawer,
  Form,
  Spinner,
} from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { IoCameraOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

function EditRetailerUserDrawer({ writerId }: { writerId: string }) {
  const [drawerIsOpen, setDrawerOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const {
    files: selfieFiles,
    onClick: onSelfieUploadClick,
    InputComponent: SelfieInputComponent,
    removeFile: removeSelfie,
    clearFiles,
  } = useFileUpload({
    accept: "image/*",
    multiple: false,
    maxSize: 10 * 1024 * 1024,
    onMaxFileSizeDetected: () => {
      ToastService.info({ text: "Maximum file size exceeded" });
    },
  });

  const { data: writerDetail } = useQuery({
    queryKey: ["writers", writerId, "detail"],
    queryFn: () => WritersService.fetchWriterDetail(writerId),
    enabled: drawerIsOpen && !!writerId,
  });

  const { mutateAsync: editWriter, isPending } = useMutation({
    mutationKey: ["writers", writerId, "edit"],
    mutationFn: (payload: Parameters<typeof WritersService.editWriter>[1]) =>
      WritersService.editWriter(writerId, payload),
    onSuccess: async () => {
      ToastService.success({ text: "Retailer updated successfully" });
      await queryClient.invalidateQueries({
        queryKey: ["writers", "profile", writerId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["writers", writerId, "detail"],
      });
      clearFiles();
      setDrawerOpen(false);
    },
    onError: () => {
      ToastService.error({ text: "Failed to update retailer" });
    },
  });

  const handleSubmit: React.ComponentProps<typeof Form>["onSubmit"] = async (
    e,
  ) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    await editWriter({
      first_name: String(data.firstName ?? ""),
      last_name: String(data.lastName ?? ""),
      email: String(data.email ?? ""),
      phone: String(data.phoneNumber ?? ""),
      photo: selfieFiles[0] ?? null,
    });
  };

  return (
    <Drawer>
      <FaRegEdit
        className="w-3.5 h-3.5 text-blue-500 cursor-pointer"
        onClick={() => setDrawerOpen(true)}
      />
      <Drawer.Backdrop
        variant="blur"
        className="backdrop-blur-xs"
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
              <Form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-gotham-black">
                      Edit Retailer
                    </span>
                  </div>
                  <div
                    key={writerDetail ? writerDetail.email : "loading"}
                    className="space-y-4 mt-4"
                  >
                    <SelfieInputComponent />
                    <div className="w-full flex justify-center">
                      <div
                        className={`relative rounded-full w-35 h-35 ${selfieFiles.length === 0 && !writerDetail?.photo_url ? "border" : ""} justify-center flex flex-col`}
                        onClick={onSelfieUploadClick}
                      >
                        <div
                          className={`flex flex-col items-center ${selfieFiles.length === 0 && !writerDetail?.photo_url ? "p-3" : ""} space-y-2`}
                        >
                          {selfieFiles.length === 0 ? (
                            writerDetail?.photo_url ? (
                              <Image
                                src={writerDetail.photo_url}
                                alt="Profile"
                                className="w-35 h-35 object-cover rounded-full"
                                width={140}
                                height={140}
                              />
                            ) : (
                              <>
                                <IoCameraOutline size={25} />
                                <span className="text-center text-xs">
                                  Click to add photo
                                </span>
                              </>
                            )
                          ) : (
                            <div className="relative w-35 h-35 rounded-full overflow-hidden">
                              <Image
                                src={URL.createObjectURL(selfieFiles[0])}
                                alt="Profile"
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                        {selfieFiles.length > 0 && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSelfie(0);
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
                      defaultValue={writerDetail?.first_name}
                      isRequired
                    />
                    <CustomInputComponent
                      label="Last Name"
                      className="p-0 border rounded-sm border-gray-300"
                      name="lastName"
                      defaultValue={writerDetail?.last_name}
                      isRequired
                    />
                    <CustomInputComponent
                      label="Email"
                      className="p-0 border rounded-sm border-gray-300"
                      name="email"
                      type="email"
                      showPreficIcon={false}
                      showPlaceholder={false}
                      isRequired={false}
                      defaultValue={writerDetail?.email}
                    />
                    <CustomInputComponent
                      label="Phone Number"
                      className="p-0 border rounded-sm border-gray-300"
                      name="phoneNumber"
                      type="tel"
                      defaultValue={writerDetail?.phone}
                    />
                  </div>
                  <Button
                    className="rounded-sm bg-black w-full text-xs font-gotham-black mt-2"
                    type="submit"
                    isDisabled={isPending}
                  >
                    {isPending ? <Spinner color="current" size="sm" /> : "Save"}
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

export default EditRetailerUserDrawer;
