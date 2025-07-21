import type { Note } from "./types";
import { MOCK_NOTES } from "./mock-data";

/**
 * Directory where note files are stored.
 */
const NOTES_DIR = "./notes";

/**
 * Lists all notes without their content.
 * @returns Promise resolving to an array of notes (excluding content).
 *
 * @remarks
 * In the future this might need pagination when the number of notes grows.
 */
export async function listNotes(): Promise<Omit<Note, "content">[]> {
  return MOCK_NOTES.map(({ content, ...rest }) => rest);
}

/**
 * Retrieves a note by its slug.
 * @param slug - The unique identifier for the note.
 * @returns Promise resolving to the full note object.
 */
export async function getNote(slug: string): Promise<Note> {
  const note = MOCK_NOTES.find((n) => n.slug === slug);
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
  const idx = MOCK_NOTES.findIndex((n) => n.slug === slug);
  if (idx === -1) {
    throw new Error(`Note with slug '${slug}' not found.`);
  }
  MOCK_NOTES.splice(idx, 1);
}

/**
 * Creates a new note.
 * @param note - The note data (excluding slug, created, and lastModified fields).
 * @returns Promise resolving to the created note with all fields populated.
 */
export async function createNote(
  note: Omit<Note, "slug" | "created" | "lastModified">
): Promise<Note> {
  const baseSlug = note.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  let slug = baseSlug;
  let i = 1;
  while (MOCK_NOTES.some((n) => n.slug === slug)) {
    slug = `${baseSlug}-${Date.now()}-${i++}`;
  }
  const now = new Date();
  const newNote: Note = {
    ...note,
    slug,
    created: now,
    lastModified: now,
  };
  MOCK_NOTES.push(newNote);
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
  const idx = MOCK_NOTES.findIndex((n) => n.slug === note.slug);
  if (idx === -1) {
    throw new Error(`Note with slug '${note.slug}' not found.`);
  }
  const updated: Note = {
    ...MOCK_NOTES[idx],
    ...note,
    lastModified: new Date(),
  };
  MOCK_NOTES[idx] = updated;
  return updated;
}
