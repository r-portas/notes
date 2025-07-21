import type { Note } from "./types";

export const MOCK_NOTES: Note[] = [
  {
    slug: "captains-log-2025-07-01",
    title: "Stardate 2025.07.01",
    tags: [],
    created: new Date("2025-07-01T08:00:00Z"),
    lastModified: new Date("2025-07-01T08:00:00Z"),
    content: `
This morning, I prepared a fresh cup of coffee in the mess hall. Upon returning from a brief conversation with Spock, I found my cup empty. I do not recall drinking it. Curious. Perhaps I am more tired than I thought.

 - Kirk
`,
  },
  {
    slug: "captains-log-2025-07-03",
    title: "Stardate 2025.07.03",
    tags: [],
    created: new Date("2025-07-03T07:45:00Z"),
    lastModified: new Date("2025-07-03T07:45:00Z"),
    content: `
Second occurrence. I made coffee, left for a moment to check the navigation console, and returned to find my cup once again empty. No one in sight. I have asked the crew if they noticed anything unusual. All deny knowledge. I will keep watch.

 - Kirk
`,
  },
  {
    slug: "captains-log-2025-07-05",
    title: "Stardate 2025.07.05",
    tags: [],
    created: new Date("2025-07-05T09:10:00Z"),
    lastModified: new Date("2025-07-05T09:10:00Z"),
    content: `
Pattern emerging. My coffee disappears only when I step away. I have begun to suspect foul play. Spock suggests logical explanations, but I am not convinced. I have started marking the coffee pot. Security cameras may be necessary.

 - Kirk
`,
  },
  {
    slug: "captains-log-2025-07-07",
    title: "Stardate 2025.07.07",
    tags: [],
    created: new Date("2025-07-07T06:30:00Z"),
    lastModified: new Date("2025-07-07T06:30:00Z"),
    content: `
I am certain now. Someone is drinking my coffee. The crew feigns ignorance. Even Bones laughs it off. I have begun to carry my mug with me at all times. Trust is a fragile thing aboard a starship.

 - Kirk
`,
  },
  {
    slug: "captains-log-2025-07-10",
    title: "Stardate 2025.07.10",
    tags: [],
    created: new Date("2025-07-10T05:55:00Z"),
    lastModified: new Date("2025-07-10T05:55:00Z"),
    content: `
Paranoia grows. I have set a trap: decaf in my usual mug, real coffee hidden elsewhere. If the decaf vanishes, I will know. I trust no one. Not even Spock. The truth will out. I will have my coffee.

 - Kirk
`,
  },
];
