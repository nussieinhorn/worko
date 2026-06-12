/* Mock data for the WORKO app UI kit. Not production data. */

const WORKO_DATA = {
  user: { name: "Maya Chen", role: "Product Lead" },

  today: { date: "Tuesday, June 9", progress: 72, done: 12, remaining: 5, streak: 5 },

  focusTask: {
    title: "Draft the Q3 launch announcement",
    project: "Q3 Product Launch",
    estimate: "45 min",
    priority: "High",
  },

  coach: {
    message: "You're on a roll — three deep-work tasks done. This one's the last big lift before lunch.",
    nextStep: "Open last quarter's announcement as a reference, then outline three sections.",
  },

  upNext: [
    { title: "Review Q3 roadmap with Sam", estimate: "20 min", priority: "Medium" },
    { title: "Reply to design feedback", estimate: "10 min", priority: "Low" },
    { title: "Approve final hero illustration", estimate: "5 min", priority: "Medium" },
  ],

  projects: [
    { name: "Q3 Product Launch", desc: "Coordinate the launch announcement, assets, and rollout.", progress: 72, open: 5, members: ["Maya Chen", "Sam Ito", "Lee Roy", "Ana Diaz"], activity: "2h ago", color: "#4F46E5" },
    { name: "Mobile App Redesign", desc: "Refresh the focus experience for iOS and Android.", progress: 38, open: 14, members: ["Sam Ito", "Priya N", "Tom B"], activity: "Yesterday", color: "#06B6D4" },
    { name: "Onboarding Revamp", desc: "Shorten time-to-first-focus for new users.", progress: 91, open: 2, members: ["Ana Diaz", "Maya Chen"], activity: "3h ago", color: "#10B981" },
    { name: "Q4 Planning", desc: "Set objectives and key results for next quarter.", progress: 15, open: 9, members: ["Maya Chen", "Lee Roy", "Sam Ito", "Priya N", "Tom B"], activity: "4d ago", color: "#F59E0B" },
    { name: "Brand Refresh", desc: "Evolve the visual identity and marketing site.", progress: 54, open: 7, members: ["Lee Roy", "Ana Diaz"], activity: "1d ago", color: "#6366F1" },
    { name: "Help Center", desc: "Rewrite docs around the focus-first workflow.", progress: 27, open: 11, members: ["Priya N", "Tom B"], activity: "6h ago", color: "#0891B2" },
  ],

  board: {
    Backlog: [
      { title: "Collect launch-day metrics plan", priority: "Low", assignee: "Tom B" },
      { title: "Draft FAQ for support team", priority: "Medium", assignee: "Priya N" },
    ],
    "To do": [
      { title: "Write press release", priority: "High", assignee: "Maya Chen" },
      { title: "Schedule social posts", priority: "Medium", assignee: "Ana Diaz" },
    ],
    "In progress": [
      { title: "Draft the Q3 launch announcement", priority: "High", assignee: "Maya Chen", ai: true },
      { title: "Build launch landing page", priority: "High", assignee: "Sam Ito" },
    ],
    Review: [
      { title: "Final hero illustration", priority: "Medium", assignee: "Lee Roy" },
    ],
    Done: [
      { title: "Lock launch date", priority: "Medium", assignee: "Maya Chen" },
      { title: "Brief the exec team", priority: "Low", assignee: "Sam Ito" },
    ],
  },

  taskDetail: {
    title: "Draft the Q3 launch announcement",
    status: "In progress",
    priority: "High",
    assignee: "Maya Chen",
    estimate: "45 min",
    description: "Write the public announcement for the Q3 launch. Lead with the focus-first story, then features, then availability.",
    subtasks: [
      { label: "Outline three sections", done: true },
      { label: "Write the opening hook", done: true },
      { label: "Draft feature highlights", done: false },
      { label: "Add availability + pricing", done: false },
    ],
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

window.WORKO_DATA = WORKO_DATA;
