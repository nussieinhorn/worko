import * as React from "react";

/** Circular avatar — image, or auto-colored initials fallback. */
export interface AvatarProps {
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg";
}
export function Avatar(props: AvatarProps): JSX.Element;

/** Overlapping stack of avatars with a +N overflow chip. */
export interface AvatarGroupProps {
  users?: { name?: string; src?: string }[];
  max?: number;
  size?: "xs" | "sm" | "md" | "lg";
}
export function AvatarGroup(props: AvatarGroupProps): JSX.Element;
