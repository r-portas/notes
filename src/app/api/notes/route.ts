import { listNotes } from "@/lib/notes";

export async function GET() {
  const notes = await listNotes();
  return Response.json(notes);
}
