import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteNote } from "@/lib/notes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface NoteActionProps {
  slug: string;
}

export default function NoteActions({ slug }: NoteActionProps) {
  async function handleDelete() {
    "use server";
    await deleteNote(slug);
    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <Button variant="outline" asChild>
        <Link href={`/notes/${slug}`}>Back</Link>
      </Button>
      <Button variant="destructive" onClick={handleDelete}>
        Delete Note
      </Button>
    </div>
  );
}
