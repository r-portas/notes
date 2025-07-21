import EditNoteActions from "./note-actions";
import NoteEditor from "@/components/note-editor";

interface EditNotePageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditNotePage({ params }: EditNotePageProps) {
  const { slug } = await params;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      {/* Back and Delete buttons */}
      <EditNoteActions slug={slug} />
      <NoteEditor slug={slug} />
    </div>
  );
}
