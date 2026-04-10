import CustomCheckboxItem from "@/components/custom-checkbox";
import CustomInputComponent from "@/components/custom-input-component";
import {
  Accordion,
  Button,
  CloseButton,
  CloseIcon,
  Drawer,
  Form,
  Separator,
} from "@heroui/react";
import React, { useState } from "react";

const roleTypes = [
  {
    title: "Reports",
    values: [
      "30 Days Sales Tracker",
      "Bank Transfer - Batch Details",
      "Bank Transfers",
      "Christmas Bonus Report",
      "Commission Payments",
      "Ticket Query",
      "Daily Sales",
      "Daily Sales & Winnings",
      "Finance - Payout",
      "Revenue Per Play",
    ],
  },
  {
    title: "Ticket Status",
    values: ["Active Writers", "Terminal history"],
  },
  {
    title: "Winning Stakes Report",
    values: [
      "All Stakes Report",
      "Topup - Claims as Credit",
      "Topup - LMC Transfers",
      "Topup - Mobile Money",
    ],
  },
  {
    title: "LMCs",
    values: ["view", "deposit", "update", "create", "transfer"],
  },
  {
    title: "Retailers",
    values: ["view", "create", "update"],
  },
  {
    title: "Players",
    values: ["view"],
  },
  {
    title: "Notifications",
    values: ["view"],
  },
  {
    title: "Settings",
    values: ["view"],
  },
  {
    title: "Sales",
    values: ["view"],
  },
  {
    title: "Analysis",
    values: ["view"],
  },
  {
    title: "Draws",
    values: ["view"],
  },
];

function ExistingRolesDrawer() {
  const [drawerIsOpen, setDrawerOpen] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const resetDrawerState = () => {
    setDrawerOpen(false);
    setIsEditing(false);
    setIsAdding(false);
    setSelectedTypes([]);
  };

  return (
    <Drawer>
      <Button
        className="rounded-sm bg-transparent border text-black w-full md:w-auto"
        size="md"
        onClick={() => setDrawerOpen(true)}
      >
        <span className="text-xs font-gotham-bold">Roles and Permissions</span>
      </Button>
      <Drawer.Backdrop
        variant="blur"
        className={"backdrop-blur-xs"}
        isOpen={drawerIsOpen}
        onOpenChange={(open) => {
          if (!open) {
            resetDrawerState();
          } else {
            setDrawerOpen(true);
          }
        }}
      >
        <Drawer.Content placement="right">
          <Drawer.Dialog className="rounded-none h-full max-h-screen flex flex-col">
            <Drawer.Header>
              <CloseButton
                className="self-end bg-transparent"
                onClick={resetDrawerState}
              >
                <CloseIcon className="w-[20px] h-[20px] text-shadow-black" />
              </CloseButton>
            </Drawer.Header>
            {!isAdding && !isEditing && (
              <Drawer.Body className="text-black flex-1 overflow-y-auto">
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data = Object.fromEntries(
                      new FormData(e.currentTarget),
                    );
                  }}
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-gotham-black">
                        Existing Roles
                      </span>
                      <div className="w-[100px]">
                        <Button
                          className="rounded-sm bg-[#0A6FFD] text-xs font-gotham-bold"
                          size="md"
                          onClick={() => setIsAdding(true)}
                        >
                          New Role
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-sm p-0">
                      <Accordion>
                        <Accordion.Item>
                          <Accordion.Heading>
                            <Accordion.Trigger>
                              <div>
                                <span className="text-sm font-gotham-black">
                                  Admin
                                </span>
                                <span
                                  className="text-[10px] font-gotham-bold text-[#0A6FFD] cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditing(true);
                                  }}
                                >
                                  /Edit
                                </span>
                              </div>
                              <Accordion.Indicator />
                            </Accordion.Trigger>
                          </Accordion.Heading>
                          <Accordion.Panel>
                            <Accordion.Body>
                              <div>
                                <span className="text-[11px] text-black font-gotham-black">
                                  Description:
                                </span>
                                <span className="text-[11px] font-gotham-regular text-gray-600 cursor-pointer">
                                  {" Default Admin Role"}
                                </span>
                              </div>
                              <div className="border rounded-sm mt-2">
                                {roleTypes.map((item, index) => {
                                  return (
                                    <div key={index} className="w-full">
                                      <Accordion
                                        allowsMultipleExpanded
                                        className=""
                                      >
                                        <RoleType
                                          title={item.title}
                                          values={item.values}
                                        />
                                      </Accordion>
                                      {roleTypes.length - 1 !== index && (
                                        <Separator />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </Accordion.Body>
                          </Accordion.Panel>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </div>
                </Form>
              </Drawer.Body>
            )}
            {(isAdding || isEditing) && (
              <div className="flex-1 min-h-0 overflow-y-auto">
                <span className="text-lg font-gotham-black">
                  {isAdding ? "New Role" : "Edit Role"}
                </span>
                <br />
                <br />
                <CustomInputComponent
                  label="Name"
                  className="p-0 border rounded-sm border-gray-300 mb-4"
                  name="name"
                />
                <CustomInputComponent
                  label="Description"
                  className="p-0 border rounded-sm border-gray-300"
                  name="description"
                />
                <div className="space-y-8">
                  {roleTypes.map((item, index) => {
                    return (
                      <RoleGroup
                        key={index}
                        title={item.title}
                        values={item.values}
                        selected={selectedTypes}
                        setSelectedType={(val) => {
                          if (selectedTypes.includes(val)) {
                            setSelectedTypes((state) => {
                              const data = state.filter((item) => item != val);
                              return data;
                            });
                          } else {
                            setSelectedTypes((state) => {
                              return [...state, val];
                            });
                          }
                        }}
                      />
                    );
                  })}
                </div>

                <Button
                  className="rounded-sm bg-black w-full text-xs font-gotham-black mt-6"
                  type="submit"
                >
                  Save
                </Button>

                <Button
                  className="rounded-sm bg-transparent border border-black text-black w-full text-xs font-gotham-black mt-2"
                  type="submit"
                  onClick={() => {
                    if (isEditing) {
                      setIsEditing(false);
                    } else if (isAdding) {
                      setIsAdding(false);
                    }
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

export default ExistingRolesDrawer;

const RoleType = ({ title, values }: { title: string; values: string[] }) => {
  return (
    <Accordion.Item>
      <Accordion.Heading>
        <Accordion.Trigger className="text-[11px] text-black font-gotham-black">
          {title}
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body className="grid grid-cols-2 text-[11px] gap-4">
          {values.map((item, index) => {
            return <span key={index}>{item}</span>;
          })}
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const RoleGroup = ({
  title,
  values,
  selected,
  setSelectedType,
}: {
  selected: string[];
  title: string;
  values: string[];
  setSelectedType: (g: string, v: boolean) => void;
}) => {
  return (
    <div className="mt-3">
      <span className="text-[11px] text-black font-gotham-black">{title}</span>
      <div className="grid grid-cols-2 gap-5 mt-1">
        {values.map((g, index) => (
          <CustomCheckboxItem
            key={index}
            // split it and take only `g` when communicating with backend
            selected={selected.includes(`${title}>${g}`)}
            label={g}
            labelClassName="text-[11px] font-gotham-regular"
            setIsSelected={(v: boolean) => setSelectedType(`${title}>${g}`, v)}
          />
        ))}
      </div>
    </div>
  );
};
