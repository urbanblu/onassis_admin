import Helpers from "@/utils/helpers";
import {
  CloseButton,
  cn,
  Description,
  FieldError,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import type { ValidationError } from "@react-types/shared";
import React, { useCallback, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { LuMail } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";

type Props = {
  id?: string;
  name?: string;
  label?: string;
  type?:
    | "password"
    | "text"
    | "search"
    | "url"
    | "tel"
    | "email"
    | (string & {})
    | undefined;
  placeholder?: string;
  description?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  defaultValue?: string;
  className?: string;
  validate?:
    | ((value: string) => ValidationError | true | null | undefined)
    | undefined;
  isRequired?: boolean;
  minLength?: number;
  isEmail?: boolean;
  showPreficIcon?: boolean;
  showSuffixIcon?: boolean;
  showLabel?: boolean;
  showPlaceholder?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

function CustomInputComponent({
  label,
  minLength,
  placeholder,
  name,
  id,
  validate,
  prefixIcon,
  suffixIcon,
  className,
  description,
  type,
  isRequired,
  showLabel = true,
  showPlaceholder = true,
  showSuffixIcon = true,
  showPreficIcon = true,
  defaultValue,
  onChange,
}: Props) {
  const [showing, showPassword] = useState<boolean>(false);
  const [hasSubmittedParentForm, setHasSubmittedParentForm] = useState(false);
  const [formAssociation, setFormAssociation] = useState<
    "unknown" | "inside" | "outside"
  >("unknown");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formListenersCleanupRef = useRef<(() => void) | null>(null);

  const setInputElement = useCallback((el: HTMLInputElement | null) => {
    formListenersCleanupRef.current?.();
    formListenersCleanupRef.current = null;
    inputRef.current = el;

    if (!el) {
      setFormAssociation("unknown");
      return;
    }

    setFormAssociation(el.form ? "inside" : "outside");

    const form = el.form;
    if (!form) return;

    const handleSubmit = () => setHasSubmittedParentForm(true);
    const handleInvalid = () => setHasSubmittedParentForm(true);
    const handleReset = () => setHasSubmittedParentForm(false);

    // Native validation cancels submit, so "submit" never fires — listen for "invalid" too
    // so error UI (FieldError, borders) can show after a blocked submit.
    form.addEventListener("submit", handleSubmit);
    form.addEventListener("invalid", handleInvalid, true);
    form.addEventListener("reset", handleReset);
    formListenersCleanupRef.current = () => {
      form.removeEventListener("submit", handleSubmit);
      form.removeEventListener("invalid", handleInvalid, true);
      form.removeEventListener("reset", handleReset);
    };
  }, []);

  const startContent = (() => {
    if (!showPreficIcon) return undefined;

    if (type == "email") {
      return <LuMail className="text-black" />;
    }

    if (type == "password") {
      return <RiLockPasswordLine className="text-black" />;
    }

    return prefixIcon;
  })();

  const endContent = (() => {
    if (!showSuffixIcon) return undefined;

    if (type == "password") {
      return (
        <CloseButton
          className={"mr-1 bg-transparent text-black"}
          onPress={() => showPassword(!showing)}
        >
          <InputGroup.Suffix>
            {showing ? (
              <IoMdEyeOff className="w-[12px] text-black" />
            ) : (
              <FaEye className="w-[12px] text-black" />
            )}
          </InputGroup.Suffix>
        </CloseButton>
      );
    }

    return suffixIcon;
  })();

  const labelText = (() => {
    if (!showLabel) return;

    if (type == "email") return "Email";
    if (type == "password") {
      if (showLabel && label) return label;
      return "Password";
    }

    return label;
  })();

  const placeholderText = (() => {
    if (!showPlaceholder) return;
    if (type == "email") return "Enter your email";
    if (type == "password") return "Enter password";

    return placeholder;
  })();

  return (
    <TextField
      isRequired={isRequired}
      name={name}
      defaultValue={defaultValue}
      validationBehavior="native"
      type={
        type == "password"
          ? (() => {
              if (showing) return "text";
              return "password";
            })()
          : type
      }
      validate={
        validate
          ? validate
          : (value) => Helpers.getTextFieldValidation({ value, type })
      }
    >
      {({ isInvalid }) => {
        const showInvalidState =
          formAssociation === "outside"
            ? isInvalid
            : hasSubmittedParentForm && isInvalid;

        return (
          <>
            {labelText && (
              <Label
                className={cn("text-xs", showInvalidState ? "text-danger" : "")}
                htmlFor={id}
              >
                {labelText}
              </Label>
            )}
            <InputGroup
              className={cn(
                "bg-transparent border border-solid rounded-none transition-colors duration-200",
                "focus-within:ring-0 focus-within:outline-none shadow-none py-1.5",
                showInvalidState
                  ? "border-danger! focus-within:border-danger!"
                  : "border-black focus-within:border-black",
                className,
              )}
            >
              {startContent && (
                <InputGroup.Prefix>{startContent}</InputGroup.Prefix>
              )}
              <InputGroup.Input
                id={id}
                ref={setInputElement}
                minLength={minLength}
                placeholder={placeholderText}
                onChange={onChange}
                className="placeholder:text-xs focus:outline-none focus:ring-0 shadow-none text-xs"
              />
              {!!endContent && endContent}
            </InputGroup>
            {description && <Description>{description}</Description>}
            {(formAssociation === "outside" || hasSubmittedParentForm) && (
              <FieldError />
            )}
          </>
        );
      }}
    </TextField>
  );
}

export default CustomInputComponent;
