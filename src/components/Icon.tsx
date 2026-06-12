import type React from "react";
import {
  ArrowUp,
  BarChart3,
  Bell,
  Calendar,
  CalendarClock,
  Check,
  CheckCheck,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Clock,
  Columns3,
  Flag,
  FolderKanban,
  GanttChart,
  GripVertical,
  Group,
  LayoutDashboard,
  List,
  ListTodo,
  Loader,
  MoreHorizontal,
  MousePointerClick,
  Music,
  PanelRight,
  Pause,
  Pencil,
  Play,
  Plus,
  Search,
  SearchX,
  Settings,
  SkipForward,
  Sparkles,
  SquarePen,
  Target,
  Trash2,
  User,
  Users,
  Wand2,
  X,
  type LucideIcon,
} from "lucide-react";

const registry = {
  ArrowUp,
  BarChart3,
  Bell,
  Calendar,
  CalendarClock,
  Check,
  CheckCheck,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Clock,
  Columns3,
  Flag,
  FolderKanban,
  GanttChart,
  GripVertical,
  Group,
  LayoutDashboard,
  List,
  ListTodo,
  Loader,
  MoreHorizontal,
  MousePointerClick,
  Music,
  PanelRight,
  Pause,
  Pencil,
  Play,
  Plus,
  Search,
  SearchX,
  Settings,
  SkipForward,
  Sparkles,
  SquarePen,
  Target,
  Trash2,
  User,
  Users,
  Wand2,
  X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof registry;

export interface IconProps {
  name: IconName;
  size?: number;
  stroke?: number;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Lucide icon by name. ~2px round stroke, inherits currentColor — the WORKO standard.
 */
export function Icon({ name, size = 20, stroke = 2, color = "currentColor", style = {} }: IconProps) {
  const Glyph = registry[name];
  return <Glyph size={size} strokeWidth={stroke} color={color} style={{ flexShrink: 0, display: "block", ...style }} />;
}
