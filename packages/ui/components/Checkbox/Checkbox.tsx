import React, { useRef } from "react";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import type { AriaCheckboxProps } from "@react-types/checkbox";
import clsx from "clsx";

const Checkbox: React.FC<AriaCheckboxProps> = (props) => {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isSelected = state.isSelected && !props.isIndeterminate;

  return (
    <label
      className={clsx("flex items-center gap-x-3", {
        "opacity-60": inputProps.disabled,
      })}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>

      {/* Wrapper */}
      <div
        aria-hidden={true}
        className={clsx(
          "relative flex h-5 w-5 items-center justify-center border-2 border-primary-500",
          {
            "border-background-800 dark:border-white": isFocusVisible,
          },
          inputProps.disabled ? "cursor-not-allowed" : "cursor-pointer",
        )}
      >
        {/* Indicator */}
        {isSelected && <div className="h-2 w-2 bg-primary-500" />}
      </div>

      {/* Right Side Content */}
      {props.children}
    </label>
  );
};

export default Checkbox;
