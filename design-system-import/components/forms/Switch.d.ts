import * as React from "react";

/** Toggle switch — on state is primary indigo. */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  id?: string;
}

export function Switch(props: SwitchProps): JSX.Element;
