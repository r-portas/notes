import type { Note } from "./types";

/**
 * Directory where note files are stored.
 */
const NOTES_DIR = "./notes";

/**
 * Temporary in-memory storage for notes,
 * for building the PoC.
 * Swap out with persisting to disk.
 */
const TMP_NOTES: { [slug: string]: Note } = {
  "captains-log-001": {
    slug: "captains-log-001",
    title: "Captain's Log, Stardate 1513.1",
    tags: ["log", "enterprise", "kirk"],
    content: `# Captain's Log\n\n**Stardate 1513.1**\n\nWe have set course for planet M-113 to conduct routine medical examinations. Dr. McCoy is particularly anxious, as this is the site of his former love, Nancy Crater.\n\n## Crew Status\n\n- Captain: James T. Kirk\n- First Officer: Spock\n- Chief Medical Officer: Leonard McCoy\n- Chief Engineer: Montgomery Scott\n\nThe crew is in good spirits, though there is an undercurrent of tension as we approach the unknown.\n\n---\n\n> "Risk... risk is our business. That's what this starship is all about."\n\nOur mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before.\n`,
    created: new Date("2266-09-08T09:00:00Z"),
    lastModified: new Date("2266-09-08T09:00:00Z"),
  },
  "klingon-proverb": {
    slug: "klingon-proverb",
    title: "Captain's Log, Stardate 3192.1",
    tags: ["klingon", "wisdom", "kirk"],
    content: `# Captain's Log\n\n**Stardate 3192.1**\n\nWe have encountered a Klingon battlecruiser near the Neutral Zone. Tensions are high, and diplomacy is as sharp as a bat'leth.\n\n## Klingon Wisdom\n\n- "Today is a good day to die!"\n- "Only a fool fights in a burning house."\n- "Great deeds, great risks."\n\n---\n\n> "In every revolution, there's one man with a vision."\n\nI must remember that understanding our adversaries is as important as defeating them.\n`,
    created: new Date("2267-03-23T12:00:00Z"),
    lastModified: new Date("2267-03-23T12:00:00Z"),
  },
  "vulcan-logic": {
    slug: "vulcan-logic",
    title: "Captain's Log, Stardate 2821.5",
    tags: ["vulcan", "logic", "kirk"],
    content: `# Captain's Log\n\n**Stardate 2821.5**\n\nMr. Spock has once again demonstrated the value of Vulcan logic. His calm reasoning prevented a potentially disastrous first contact.\n\n## Vulcan Principles\n\n- Logic above all\n- Control emotions\n- Seek knowledge\n\n> "The needs of the many outweigh the needs of the few, or the one."\n\n---\n\nI find myself relying more and more on Spock's advice. Perhaps there is merit in logic after all.\n`,
    created: new Date("2267-01-19T15:00:00Z"),
    lastModified: new Date("2267-01-19T15:00:00Z"),
  },
  "borg-message": {
    slug: "borg-message",
    title: "Captain's Log, Stardate 4523.3",
    tags: ["borg", "collective", "kirk"],
    content: `# Captain's Log\n\n**Stardate 4523.3**\n\nA strange transmission has been received: "We are the Borg. Resistance is futile." Though the message is cryptic, it speaks of a collective consciousness unlike any we've encountered.\n\n## Analysis\n\n- Assimilation of technology\n- Elimination of resistance\n- Pursuit of perfection\n\n---\n\n> "The unknown is why we're out here."\n\nI have ordered the crew to remain vigilant. The safety of the Enterprise depends on it.\n`,
    created: new Date("2268-12-20T18:00:00Z"),
    lastModified: new Date("2268-12-20T18:00:00Z"),
  },
  "data-poem": {
    slug: "data-poem",
    title: "Captain's Log, Stardate 2712.4",
    tags: ["data", "poem", "cat", "kirk"],
    content: `# Captain's Log\n\n**Stardate 2712.4**\n\nLieutenant Uhura has composed a poem for the ship's unofficial mascot, a stray cat we've named Spot. The crew's morale is lifted by such small comforts.\n\n## Ode to Spot\n\n*By Lieutenant Uhura*\n\n- Soft fur\n- Gentle purr\n- Independent spirit\n\n> "Even in the vastness of space, companionship is precious."\n\n---\n\nI am reminded that humanity is defined not just by our technology, but by our capacity for affection.\n`,
    created: new Date("2266-11-03T10:00:00Z"),
    lastModified: new Date("2266-11-03T10:00:00Z"),
  },
};

/**
 * Lists all notes without their content.
 * @returns Promise resolving to an array of notes (excluding content).
 *
 * @remarks
 * In the future this might need pagination when the number of notes grows.
 */
export async function listNotes(): Promise<Omit<Note, "content">[]> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.values(TMP_NOTES).map(({ content: _, ...rest }) => rest);
}

/**
 * Retrieves a note by its slug.
 * @param slug - The unique identifier for the note.
 * @returns Promise resolving to the full note object.
 */
export async function getNote(slug: string): Promise<Note> {
  const note = TMP_NOTES[slug];
  if (!note) {
    throw new Error(`Note with slug '${slug}' not found.`);
  }
  return note;
}

/**
 * Deletes a note by its slug.
 * @param slug - The unique identifier for the note to delete.
 * @returns Promise resolving when the note is deleted.
 */
export async function deleteNote(slug: string): Promise<void> {
  if (!(slug in TMP_NOTES)) {
    throw new Error(`Note with slug '${slug}' not found.`);
  }
  delete TMP_NOTES[slug];
}

/**
 * Creates a new note.
 * @param note - The note data (excluding slug, created, and lastModified fields).
 * @returns Promise resolving to the created note with all fields populated.
 */
export async function createNote(
  note: Omit<Note, "slug" | "created" | "lastModified">
): Promise<Note> {
  // Generate a slug: kebab-case title + timestamp
  const baseSlug = note.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  let slug = baseSlug;
  let i = 1;
  while (TMP_NOTES[slug]) {
    slug = `${baseSlug}-${Date.now()}-${i++}`;
  }
  const now = new Date();
  const newNote: Note = {
    ...note,
    slug,
    created: now,
    lastModified: now,
  };
  TMP_NOTES[slug] = newNote;
  return newNote;
}

/**
 * Updates an existing note.
 * @param note - The note data to update (excluding created and lastModified fields).
 * @returns Promise resolving to the updated note.
 */
export async function updateNote(
  note: Omit<Note, "created" | "lastModified">
): Promise<Note> {
  const existing = TMP_NOTES[note.slug];
  if (!existing) {
    throw new Error(`Note with slug '${note.slug}' not found.`);
  }
  const updated: Note = {
    ...existing,
    ...note,
    lastModified: new Date(),
  };
  TMP_NOTES[note.slug] = updated;
  return updated;
}
