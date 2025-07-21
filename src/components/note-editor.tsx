import { revalidatePath } from "next/cache";
import { getNote, updateNote, createNote } from "@/lib/notes";
import type { Note } from "@/lib/types";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export interface NoteEditorProps {
  slug?: string;
}

export default async function NoteEditor({ slug }: NoteEditorProps) {
  let note: Note | undefined;
  if (slug) {
    note = await getNote(slug);
  }

  async function saveNote(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = (formData.get("tags") as string)
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    if (title === "") {
      throw new Error("Title is required");
    }

    if (!slug) {
      // Create new note
      await createNote({ title, content, tags });
    } else {
      // Update existing note
      await updateNote({ slug, title, content, tags });
    }

    revalidatePath("/");
  }

  return (
    <form action={saveNote} className="space-y-4">
      <Input
        name="title"
        defaultValue={note?.title}
        placeholder="Note Title"
        required
        className="w-full"
      />
      <Textarea
        name="content"
        defaultValue={note?.content}
        placeholder="Write your note here..."
        required
        className="w-full h-64"
      />
      <Input
        name="tags"
        defaultValue={note?.tags.join(", ")}
        placeholder="Tags (comma separated)"
        className="w-full"
      />
      <Button type="submit" className="w-full">
        Save Note
      </Button>
    </form>
  );
}
