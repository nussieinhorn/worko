/* Static workspace copy + the single user. Live data (projects, tasks,
   members, subtasks) comes from Supabase via the workspace store. */

export type Priority = "High" | "Medium" | "Low";
export type Status = "Backlog" | "To do" | "In progress" | "Review" | "Done";

export const WORKO_DATA = {
  user: { name: "Maya Chen", role: "Product Lead" },

  streak: 5,

  coach: {
    message: "You're on a roll — three deep-work tasks done. This one's the last big lift before lunch.",
    nextStep: "Open last quarter's announcement as a reference, then outline three sections.",
  },

  assistant: {
    aiSteps: [
      "Break this into a 5-step checklist",
      "Estimate effort for each subtask",
      "Draft an opening paragraph",
    ],
    activity: [
      { who: "Maya Chen", what: "moved this to In progress", when: "2h ago" },
      { who: "WORKO AI", what: "suggested breaking this into subtasks", when: "2h ago" },
      { who: "Sam Ito", what: "left a comment", when: "Yesterday" },
    ],
  },
};
