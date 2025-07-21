import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getNote } from "@/lib/notes";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNote(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full md:w-auto"
          >
            <Link href={`/notes/${note.slug}/edit`}>Edit</Link>
          </Button>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
          {note.title}
        </h1>
        <div className="text-sm text-muted-foreground flex flex-wrap gap-2 items-center">
          <span>
            Created{" "}
            {formatDistanceToNow(new Date(note.created), { addSuffix: true })}
          </span>
          <span className="mx-1">&bull;</span>
          <span>
            Last modified{" "}
            {formatDistanceToNow(new Date(note.lastModified), {
              addSuffix: true,
            })}
          </span>
        </div>
        <Separator className="my-4" />
      </section>
      <article className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </article>
    </div>
  );
}
