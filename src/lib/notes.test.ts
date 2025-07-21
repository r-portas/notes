import { readFile } from "fs/promises";
import { describe, test, expect, mock } from "bun:test";
import { getNote } from "@/lib/notes";

mock.module("fs/promises", () => ({
  readFile: mock(
    () =>
      "---\ntitle: Test Note\ncreated: '2025-01-01T00:00:00.000Z'\nlastModified: '2025-01-01T00:00:00.000Z'\ntags: ['test']\n---\nThis is a test note content."
  ),
}));

describe("notes", () => {
  test("getNote can retrieve a note by slug", async () => {
    const note = await getNote("test-note");
    expect(note).toEqual({
      slug: "test-note",
      title: "Test Note",
      created: new Date("2025-01-01"),
      lastModified: new Date("2025-01-01"),
      tags: ["test"],
      content: "This is a test note content.",
    });

    expect(readFile).toHaveBeenCalledWith(
      expect.stringContaining("test-note.md"),
      "utf8"
    );
  });
});
