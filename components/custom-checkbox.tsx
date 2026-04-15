import { Checkbox, cn, Label } from "@heroui/react";

const CustomCheckboxItem = ({
  selected,
  label,
  labelClassName,
  isDisabled = false,
  setIsSelected,
}: {
  selected: boolean;
  label?: string;
  labelClassName?: string;
  isDisabled?: boolean;
  setIsSelected?: (isSelected: boolean) => void;
}) => {
  return (
    <Checkbox
      id={label}
      isSelected={selected}
      isDisabled={isDisabled}
      onChange={setIsSelected}
      className="group"
    >
      {({ isSelected }) => (
        <>
          <Checkbox.Control
            className={cn(
              "size-4! rounded-xs! border-[1.3px]! shadow-none! transition-none!",
              "before:content-none! after:content-none!",
              isSelected ? "border-[#f6a21f]!" : "border-gray-400!",
            )}
          >
            <Checkbox.Indicator>
              {isSelected && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f6a21f"
                  strokeWidth="4"
                  className="size-3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </Checkbox.Indicator>
          </Checkbox.Control>
          {label && (
            <Checkbox.Content>
              <Label
                className={cn(
                  "text-xs font-gotham-black cursor-pointer select-none",
                  labelClassName,
                )}
              >
                {label}
              </Label>
            </Checkbox.Content>
          )}
        </>
      )}
    </Checkbox>
  );
};

export default CustomCheckboxItem;
