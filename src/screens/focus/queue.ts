/* Builds the focus queue from open tasks, honoring the user's focus settings:
   prioritized projects come first, then custom priority order, then due date.
   Skipped tasks fall to the back of the queue for the rest of the session. */
import type { Priority } from "../../data/data";
import type { FocusSettings } from "../../store/workspace";
import type { Task } from "../project/model";

export function buildQueue(tasks: Task[], settings: FocusSettings, skipped: string[]): Task[] {
  const open = tasks.filter((t) => t.status !== "Done");
  const prioritized = new Set(settings.prioritizedProjectIds);
  const priIndex = (p: Priority) => {
    const i = settings.priorityOrder.indexOf(p);
    return i === -1 ? 99 : i;
  };
  const sorted = open.slice().sort((a, b) => {
    if (prioritized.size) {
      const pa = prioritized.has(a.projectId) ? 0 : 1;
      const pb = prioritized.has(b.projectId) ? 0 : 1;
      if (pa !== pb) return pa - pb;
    }
    const dp = priIndex(a.priority) - priIndex(b.priority);
    if (dp !== 0) return dp;
    return a.due.getTime() - b.due.getTime();
  });
  return [
    ...sorted.filter((t) => !skipped.includes(t.id)),
    ...sorted.filter((t) => skipped.includes(t.id)),
  ];
}
