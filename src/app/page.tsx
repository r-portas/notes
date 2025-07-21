import ReactMarkdown from "react-markdown";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { listNotes } from "@/lib/notes";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { StickyNote } from "lucide-react";

export default async function Home() {
  const notes = await listNotes();

  return (
    <div className="m-8">
      <Timeline defaultValue={0}>
        {notes.map((note, idx) => (
          <TimelineItem
            key={note.slug}
            step={idx + 1}
            className="group-data-[orientation=vertical]/timeline:ms-10"
          >
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
              <TimelineDate className="mt-2 mb-0">
                {format(new Date(note.created), "PPpp")}
              </TimelineDate>
              <TimelineTitle className="mt-0.5">{note.title}</TimelineTitle>
              <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
                <StickyNote size={14} />
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{note.content}</ReactMarkdown>
              </div>
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {note.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
