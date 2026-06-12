import * as React from "react";

/**
 * WORKO primary button — solid indigo by default, with secondary, ghost, and accent variants.
 *
 * @startingPoint section="Core" subtitle="Primary, secondary, ghost & accent buttons" viewport="700x160"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "accent";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

export function Button(props: ButtonProps): JSX.Element;
