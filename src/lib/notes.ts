import type { Note } from "./types";
import { compareAsc } from "date-fns";
import { existsSync } from "fs";
import { readFile, writeFile, readdir, mkdir, unlink } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { MOCK_NOTES } from "./mock-data";

/**
 * Directory where note files are stored.
 */
const NOTES_DIR = path.join(process.cwd(), "notes");

async function ensureNotesDirExists() {
  if (existsSync(NOTES_DIR)) {
    return;
  }
  console.log("Creating notes directory and populating with mock data");
  await mkdir(NOTES_DIR, { recursive: true });

  // Create some mock data
  for (const note of MOCK_NOTES) {
    await createNote(note);
  }
}

/**
 * Lists all notes without their content.
 * @returns Promise resolving to an array of notes (excluding content).
 *
 * @remarks
 * In the future this might need pagination when the number of notes grows.
 */
export async function listNotes(): Promise<Note[]> {
  await ensureNotesDirExists();
  console.log("Listing notes from filesystem");
  const files = await readdir(NOTES_DIR);
  const notes: Note[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const note = await getNote(file.replace(/\.md$/, ""));
    notes.push(note);
  }
  return notes.sort((a, b) => compareAsc(a.lastModified, b.lastModified));
}

/**
 * Retrieves a note by its slug.
 * @param slug - The unique identifier for the note.
 * @returns Promise resolving to the full note object.
 */
export async function getNote(slug: string): Promise<Note> {
  const filePath = path.join(NOTES_DIR, `${slug}.md`);
  let raw: string;
  try {
    raw = await readFile(filePath, "utf8");
  } catch {
    throw new Error(`Note with slug '${slug}' not found.`);
  }
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    created: new Date(data.created),
    lastModified: new Date(data.lastModified),
    tags: Array.isArray(data.tags) ? data.tags : [],
    content,
  };
}

/**
 * Deletes a note by its slug.
 * @param slug - The unique identifier for the note to delete.
 * @returns Promise resolving when the note is deleted.
 */
export async function deleteNote(slug: string): Promise<void> {
  const filePath = path.join(NOTES_DIR, `${slug}.md`);
  try {
    await unlink(filePath);
  } catch {
    throw new Error(`Note with slug '${slug}' not found.`);
  }
}

/**
 * Creates a new note.
 * @param note - The note data (excluding slug, created, and lastModified fields).
 * @returns Promise resolving to the created note with all fields populated.
 */
export async function createNote(
  note: Omit<Note, "slug" | "created" | "lastModified">
): Promise<Note> {
  const slug = note.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const now = new Date();
  return await writeNote({
    ...note,
    slug,
    created: now,
    lastModified: now,
  });
}

/**
 * Updates an existing note.
 * @param note - The note data to update (excluding created and lastModified fields).
 * @returns Promise resolving to the updated note.
 */
export async function updateNote(
  note: Omit<Note, "created" | "lastModified">
): Promise<Note> {
  const oldNote = await getNote(note.slug);
  return await writeNote({
    ...oldNote,
    ...note,
    lastModified: new Date(),
  });
}

/**
 * Helper method to write a note to disk
 */
async function writeNote(note: Note): Promise<Note> {
  const filePath = path.join(NOTES_DIR, `${note.slug}.md`);
  const data = {
    title: note.title,
    created: note.created.toISOString(),
    lastModified: note.lastModified.toISOString(),
    tags: note.tags,
  };
  const fileContent = matter.stringify(note.content || "", data);
  await writeFile(filePath, fileContent, "utf8");
  return note;
}
