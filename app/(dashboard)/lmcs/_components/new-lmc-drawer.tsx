import CustomInputComponent from "@/components/custom-input-component";
import CustomSelectComponent from "@/components/custom-select-component";
import { useFileUpload } from "@/hooks/use-file-upload";
import ToastService from "@/utils/toast-service";
import {
  Avatar,
  Button,
  CloseButton,
  CloseIcon,
  Drawer,
  Form,
} from "@heroui/react";
import Image from "next/image";
import React from "react";
import { IoAddCircleSharp, IoCameraOutline } from "react-icons/io5";
import { RiDeleteBin6Line, RiUploadCloud2Line } from "react-icons/ri";

type Props = {
  onFilterTap?: (payload: { name: string; phoneNumber: string }) => void;
};

function NewLmcDrawer(payload: Props) {
  const [drawerIsOpen, setDrawerOpen] = React.useState(false);

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
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = Object.fromEntries(
                    new FormData(e.currentTarget),
                  );

                  const finalData = {
                    name: data.name as string,
                    phoneNumber: data.phoneNumber as string,
                  };

                  payload.onFilterTap?.(finalData);
                }}
              >
                <div className="flex flex-col space-y-3">
                  <span className="text-lg font-gotham-black">NEW LMC</span>
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
                      label="Full Name"
                      className="p-0 border rounded-sm border-gray-300"
                      name="fullName"
                    />
                    <CustomInputComponent
                      label="Phone Number"
                      className="p-0 border rounded-sm border-gray-300"
                      name="phoneNumber"
                      type="tel"
                    />
                    <CustomSelectComponent
                      label="Region"
                      placeholder=""
                      showDropDownIcon
                      list={[
                        { key: "1", label: "Election Setup & Configuration" },
                        { key: "2", label: "Live Election Operations" },
                        { key: "3", label: "Results Management" },
                        { key: "4", label: "User & Role Management" },
                        { key: "5", label: "System & Security" },
                      ]}
                      onSelectionChange={(val) => {}}
                    />
                    <CustomInputComponent
                      label="Location"
                      className="p-0 border rounded-sm border-gray-300"
                      name="location"
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
                      className="p-0 border rounded-sm border-gray-300"
                    />
                    <CustomInputComponent
                      type="password"
                      name="confirmPassword"
                      className="p-0 border rounded-sm border-gray-300"
                    />
                    <span className="text-xs">Ghana Card - Front</span>
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
                    <span className="text-xs">Ghana Card - Back</span>
                    <BackGhanaCardInput />
                    <Button
                      className="w-full border rounded-sm h-30 bg-transparent mt-0.5"
                      onPress={onBackGhanaCardUploadClick}
                    >
                      {ghanaCardBack.length > 0 ? (
                        <Image
                          src={URL.createObjectURL(ghanaCardBack[0])}
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
                  </div>
                  <Button
                    className="rounded-sm bg-black w-full text-xs font-gotham-black mt-2"
                    type="submit"
                  >
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

export default NewLmcDrawer;
