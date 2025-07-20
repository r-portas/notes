import type { Note } from "./types";

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
export async function listNotes(): Promise<Omit<Note, "content">[]> {}

/**
 * Retrieves a note by its slug.
 * @param slug - The unique identifier for the note.
 * @returns Promise resolving to the full note object.
 */
export async function getNote(slug: string): Promise<Note> {}

/**
 * Deletes a note by its slug.
 * @param slug - The unique identifier for the note to delete.
 * @returns Promise resolving when the note is deleted.
 */
export async function deleteNote(slug: string): Promise<void> {}

/**
 * Creates a new note.
 * @param note - The note data (excluding slug, created, and lastModified fields).
 * @returns Promise resolving to the created note with all fields populated.
 */
export async function createNote(
  note: Omit<Note, "slug" | "created" | "lastModified">
): Promise<Note> {}

/**
 * Updates an existing note.
 * @param note - The note data to update (excluding created and lastModified fields).
 * @returns Promise resolving to the updated note.
 */
export async function updateNote(
  note: Omit<Note, "created" | "lastModified">
): Promise<Note> {}
