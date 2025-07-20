# Notes

A lightweight notes app that captures notes to a local folder, notes are stored in Markdown

## Why

- Experiment with building CRUD Next.js applications, namely:
  - How to cache stuff (e.g. don't hit the filesystem everything, keep a cache of the files, should invalidate every so often)
- Experiment with building a text editing interface
- Experiment with search
- Experiment with the information architecture of a notes-like application, including:
  - Tags, etc.
- Experiment with using AI for building an application, for each phase (planning, development, etc.)

## How

- Tech stack
  - Next.js w/ App Router as the framework
  - shadcn/ui for UI components
  - Basic textarea, though could replace with Tiptop in the future

## MVP Features

- View and edit notes
- Notes are saved as Markdown files on the filesystem
- Sidebar listing notes, sorted by last edited time
- Map of Content (MoC)

## Data Models

### Note

- Title
- Date Created
- Date Updated
- Tags (list)
- Content

## Getting Started

```bash
# Install dependencies
bun install

# Run the development server
bun run dev
```
