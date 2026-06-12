import * as React from "react";

interface TabItem { id: string; label: string; icon?: React.ReactNode; }

/** Underline tab bar — switch project views (Board / List / Timeline / Calendar). */
export interface TabsProps {
  items: TabItem[];
  value?: string;
  onChange?: (id: string) => void;
}
export function Tabs(props: TabsProps): JSX.Element;
