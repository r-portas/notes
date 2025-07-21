import NoteEditor from "@/components/note-editor";

export default async function NewNotePage() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Note</h1>
      <NoteEditor />
    </div>
  );
}
