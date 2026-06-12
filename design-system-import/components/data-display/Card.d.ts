import * as React from "react";

/**
 * Surface card — white, soft shadow, 16px radius. Set `interactive` to lift on hover.
 *
 * @startingPoint section="Core" subtitle="Soft elevated surface card" viewport="700x200"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** CSS padding value. @default var(--space-6) */
  padding?: string;
  /** Lift + deepen shadow on hover. @default false */
  interactive?: boolean;
}

export function Card(props: CardProps): JSX.Element;
