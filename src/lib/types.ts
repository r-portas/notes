/**
 * Represents a single note in the application.
 */
export interface Note {
  /**
   * Unique identifier for the note, typically used in URLs.
   */
  slug: string;

  /**
   * Title of the note.
   */
  title: string;

  /**
   * List of tags associated with the note.
   */
  tags: string[];

  /**
   * Date when the note was created.
   */
  created: Date;

  /**
   * Date when the note was last modified.
   */
  lastModified: Date;

  /**
   * Main content of the note, in markdown format.
   */
  content: string;
}
