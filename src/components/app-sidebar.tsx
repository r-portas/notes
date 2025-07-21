import Link from "next/link";
import {
  Sidebar,
  SidebarGroupContent,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuBadge,
} from "./ui/sidebar";
import { PlusIcon, SearchIcon, ClockIcon, StickyNoteIcon } from "lucide-react";
import { listNotes } from "../lib/notes";

export async function AppSidebar() {
  const notes = await listNotes();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/notes/new">
                    <PlusIcon className="w-4 h-4" />
                    <span>New Note</span>
                    <SidebarMenuBadge className="text-muted-foreground">
                      ⌘N
                    </SidebarMenuBadge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/search">
                    <SearchIcon className="w-4 h-4" />
                    <span>Search</span>
                    <SidebarMenuBadge className="text-muted-foreground">
                      ⌘P
                    </SidebarMenuBadge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <ClockIcon className="w-4 h-4" />
                    <span>Recent Notes</span>
                    <SidebarMenuBadge className="text-muted-foreground">
                      ⌘R
                    </SidebarMenuBadge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {notes.map((note) => (
                <SidebarMenuItem key={note.slug}>
                  <SidebarMenuButton asChild>
                    <Link href={`/notes/${note.slug}`}>
                      <span>{note.title}</span>
                      {/* {note.tags.length > 0 && (
                        <SidebarMenuBadge>
                          {note.tags.join(", ")}
                        </SidebarMenuBadge>
                      )} */}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
