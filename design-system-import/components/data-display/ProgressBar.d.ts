import * as React from "react";

/** Slim rounded progress bar for project completion and day progress. */
export interface ProgressBarProps {
  /** 0–100 */
  value?: number;
  tone?: "primary" | "accent" | "success";
  height?: number;
  showLabel?: boolean;
}
export function ProgressBar(props: ProgressBarProps): JSX.Element;
