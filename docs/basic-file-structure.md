```
notes-app/
├── app/ # Next.js App Router directory
│ ├── layout.tsx # Global app layout
│ ├── page.tsx # Home page (Map of Content, sidebar, etc.)
│ ├── notes/ # Dynamic routes for notes
│ │ ├── [slug]/ # Individual note pages
│ │ │ └── page.tsx
│ │ └── new/ # New note page
│ │ └── page.tsx
│ ├── api/ # API routes
│ │ └── notes/ # CRUD endpoints for notes
│ │ └── [slug]/route.ts
├── components/ # Reusable UI components
│ ├── Sidebar.tsx
│ ├── NoteEditor.tsx
│ ├── NoteList.tsx
│ ├── MapOfContent.tsx
│ ├── MarkdownRenderer.tsx
│ └── TagList.tsx
├── lib/ # Utility functions
│ ├── notes.ts # Read/write notes from filesystem
│ ├── markdown.ts # Markdown parsing helpers
│ └── cache.ts # File caching logic
├── styles/
│ ├── globals.css # Tailwind entry point
├── public/ # Static assets
│ └── favicon.ico
├── types/ # TypeScript types/interfaces
│ ├── note.ts
├── .env.local # Local environment variables
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```
