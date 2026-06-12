import * as React from "react";

/**
 * Square icon-only button — toolbars, card actions, nav controls.
 */
export interface IconButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Accessible label (aria-label). */
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function IconButton(props: IconButtonProps): JSX.Element;
