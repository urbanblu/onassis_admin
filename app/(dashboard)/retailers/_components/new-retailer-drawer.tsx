import CustomInputComponent from "@/components/custom-input-component";
import CustomSelectComponent from "@/components/custom-select-component";
import { useFileUpload } from "@/hooks/use-file-upload";
import ToastService from "@/utils/toast-service";
import { Button, CloseButton, CloseIcon, Drawer, Form } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { IoAddCircleSharp, IoCameraOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

type Props = {
  onFilterTap?: (payload: { name: string; phoneNumber: string }) => void;
};

function NewRetailerDrawer(payload: Props) {
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
                  <span className="text-lg font-gotham-black">
                    Add New Retailer
                  </span>
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
                      showPreficIcon={false}
                      type="email"
                    />
                    <CustomInputComponent
                      label="Ghana Card Number"
                      className="p-0 border rounded-sm border-gray-300"
                      name="ghanaCardNumber"
                    />
                    <div className="grid grid-cols-3 gap-x-2">
                      <div className="col-span-2">
                        <CustomInputComponent
                          label="Phone Number"
                          className="p-0 border rounded-sm border-gray-300"
                          name="phoneNumber"
                          type="tel"
                        />
                      </div>
                      <div className="col-span-1">
                        <CustomSelectComponent
                          label="Momo"
                          labelClassName="text-transparent"
                          placeholder=""
                          initialItemKey="mtn"
                          showDropDownIcon
                          list={[
                            {
                              key: "mtn",
                              label: "MTN",
                            },
                            {
                              key: "airteltigo",
                              label: "AirtelTigo",
                            },
                            {
                              key: "telecel",
                              label: "Telecel",
                            },
                          ]}
                          onSelectionChange={(val) => {}}
                        />
                      </div>
                    </div>
                    <span className="text-xs">Selfie</span>
                    <SelfieInputComponent />
                    <Button
                      className="w-full border rounded-sm h-30 bg-transparent p-0 mt-0.5"
                      onPress={onSelfieUploadClick}
                    >
                      {selfieFiles.length > 0 ? (
                        <Image
                          src={URL.createObjectURL(selfieFiles[0])}
                          alt="selfie"
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

export default NewRetailerDrawer;
