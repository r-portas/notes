import { getNote } from "@/lib/notes";

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getNote(slug);

  return (
    <article className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
    </article>
  );
}
