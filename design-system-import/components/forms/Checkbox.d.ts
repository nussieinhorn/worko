import * as React from "react";

/** Checkbox — square by default, or `round` for task-list items (adds strike-through when checked). */
export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  /** Round task-style checkbox. @default false */
  round?: boolean;
  id?: string;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
