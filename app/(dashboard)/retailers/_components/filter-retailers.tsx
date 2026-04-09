import CustomInputComponent from "@/components/custom-input-component";
import { Button, CloseButton, CloseIcon, Drawer, Form } from "@heroui/react";
import React from "react";
import { IoFilter } from "react-icons/io5";

type Props = {
  onFilterTap?: (payload: { search: string }) => void;
};

function FilterRetailers(payload: Props) {
  const [drawerIsOpen, setDrawerOpen] = React.useState(false);

  return (
    <Drawer>
      <Button
        size="sm"
        variant="ghost"
        className="border bg-transparent rounded-sm text-xs"
        onClick={() => setDrawerOpen(true)}
      >
        <IoFilter className="text-gray-600 h-4 w-4" />
        Filter
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
                    search: (
                      (data.name as string | undefined)?.trim() ||
                      (data.phoneNumber as string | undefined)?.trim() ||
                      ""
                    ),
                  };

                  payload.onFilterTap?.(finalData);
                  setDrawerOpen(false);
                }}
              >
                <div className="flex flex-col space-y-3">
                  <span className="text-lg font-gotham-black">
                    Filter Retailers
                  </span>
                  <div className="space-y-4">
                    <CustomInputComponent
                      label="Name"
                      className="p-0 border rounded-sm border-gray-300"
                      name="name"
                    />
                    <CustomInputComponent
                      label="Phone Number"
                      className="p-0 border rounded-sm border-gray-300"
                      name="phoneNumber"
                      type="tel"
                    />
                  </div>
                  <Button
                    className="rounded-sm bg-black w-full text-xs font-gotham-black mt-2"
                    type="submit"
                  >
                    Filter
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

export default FilterRetailers;
