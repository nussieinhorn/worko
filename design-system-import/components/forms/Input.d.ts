import * as React from "react";

/**
 * Clean, minimal text input. Indigo focus ring; optional label, hint, error, and leading icon.
 *
 * @startingPoint section="Forms" subtitle="Labeled text input with focus ring" viewport="700x140"
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  label?: string;
  hint?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  disabled?: boolean;
  id?: string;
}

export function Input(props: InputProps): JSX.Element;
