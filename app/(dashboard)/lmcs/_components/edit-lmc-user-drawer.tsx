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
import { IoAddCircleSharp, IoCameraOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

function EditLmcUserDrawer() {
  const [drawerIsOpen, setDrawerOpen] = React.useState(false);

  const {
    files: selfieFiles,
    onClick: onSelfieUploadClick,
    InputComponent: SelfieInputComponent,
    removeFile: removeSelfie,
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

  const {
    files: ghanaCardFront,
    onClick: onFrontGhanaCardUploadClick,
    InputComponent: FrontGhanaCardInput,
    removeFile: removeFrontGhanaCard,
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

  const {
    files: ghanaCardBack,
    onClick: onBackGhanaCardUploadClick,
    InputComponent: BackGhanaCardInput,
    removeFile: removeBackGhanaCard,
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

  return (
    <Drawer>
      <span
        className="text-blue-500 font-gotham-regular cursor-pointer"
        onClick={() => setDrawerOpen(true)}
      >
        EDIT
      </span>
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
                }}
              >
                <div className="flex flex-col space-y-3">
                  <span className="text-lg font-gotham-black">Edit LMC</span>
                  <div className="space-y-4">
                    <SelfieInputComponent />
                    <div className="w-full flex justify-center">
                      <div
                        className={`relative rounded-full w-35 h-35 ${selfieFiles.length === 0 ? "border" : ""} justify-center flex flex-col`}
                        onClick={onSelfieUploadClick}
                      >
                        <div
                          className={`flex flex-col items-center ${selfieFiles.length === 0 ? "p-3" : ""} space-y-2`}
                        >
                          {selfieFiles.length === 0 ? (
                            <>
                              <IoCameraOutline size={25} />
                              <span className="text-center">
                                Click to add photo
                              </span>
                            </>
                          ) : (
                            <Image
                              src={URL.createObjectURL(selfieFiles[0])}
                              alt="Profile"
                              className="w-35 h-35 object-cover rounded-full"
                              width={0}
                              height={0}
                            />
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
                      isRequired
                    />
                    <CustomInputComponent
                      label="Last Name"
                      className="p-0 border rounded-sm border-gray-300"
                      name="lastName"
                      isRequired
                    />
                    <CustomInputComponent
                      label="Phone Number"
                      className="p-0 border rounded-sm border-gray-300"
                      name="phoneNumber"
                      type="tel"
                    />
                    {/* <CustomSelectComponent
                      label="Lmc User"
                      placeholder=""
                      showDropDownIcon
                      list={lmcOptions}
                      isDisabled={lmcPending || lmcOptions.length === 0}
                      onSelectionChange={(val) => setSelectedLmcId(val.key)}
                    /> */}

                    <CustomInputComponent
                      label="Location"
                      className="p-0 border rounded-sm border-gray-300"
                      name="location"
                      isRequired
                    />
                    <span className="text-xs">Front Picture of Ghana Card</span>
                    <FrontGhanaCardInput />
                    <Button
                      className="w-full border rounded-sm h-30 bg-transparent p-0 mt-0.5"
                      onPress={onFrontGhanaCardUploadClick}
                    >
                      {ghanaCardFront.length > 0 ? (
                        <Image
                          src={URL.createObjectURL(ghanaCardFront[0])}
                          alt="ghana-card-front"
                          className="w-full h-full"
                          width={0}
                          height={0}
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <IoAddCircleSharp className="text-black h-7 w-7" />
                        </div>
                      )}
                    </Button>
                    <span className="text-xs">Back Picture of Ghana Card</span>
                    <BackGhanaCardInput />
                    <Button
                      className="w-full border rounded-sm h-30 bg-transparent mt-0.5"
                      onPress={onBackGhanaCardUploadClick}
                    >
                      {ghanaCardBack.length > 0 ? (
                        <Image
                          src={URL.createObjectURL(ghanaCardBack[0])}
                          alt="ghana-card-back"
                          className="w-full h-full"
                          width={0}
                          height={0}
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <IoAddCircleSharp className="text-black h-7 w-7" />
                        </div>
                      )}
                    </Button>
                  </div>
                  <Button
                    className="rounded-sm bg-black w-full text-xs font-gotham-black mt-2"
                    type="submit"
                    // isDisabled={writerPending}
                  >
                    {/* {writerPending ? "Saving..." : "Save"} */}
                    Save
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

export default EditLmcUserDrawer;
