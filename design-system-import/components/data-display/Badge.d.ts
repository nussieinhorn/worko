import * as React from "react";

/** Small status pill — priorities, statuses, counts. `dot` adds a leading status dot. */
export interface BadgeProps {
  children: React.ReactNode;
  tone?: "neutral" | "primary" | "accent" | "success" | "warning" | "error";
  dot?: boolean;
}

export function Badge(props: BadgeProps): JSX.Element;
