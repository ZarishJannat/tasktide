# TaskTide

A calm, focused to-do app built with React. Add tasks with due dates and priority,
filter and search through them, and everything is saved to your browser automatically.

## Features

- Add, edit, and delete tasks with a confirmation step before deleting
- Mark tasks complete, with a quick "Undo" from the toast notification
- Due dates with overdue highlighting, and low/medium/high priority levels
- Search and filter (All / Active / Completed)
- Progress bar with completion percentage, and a message when everything's done
- Light and dark mode, saved between visits
- Data is saved to localStorage, so your list survives a page refresh
- Responsive down to small phone screens, keyboard accessible throughout

## Tech stack

React 19 (functional components + hooks), Vite, plain CSS with custom properties.
No UI libraries -- every component here is hand-built.

## Project structure

```
src/
  components/   one folder per component (JSX + its own CSS file)
  pages/        Home page, which wires everything together
  hooks/        useTodos, useTheme, useToast, useLocalStorage
  utils/        small helpers (date formatting, id generation, quotes)
  styles/       CSS variables and global resets
```

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL that Vite prints (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Pushing this to your own GitHub

See the step-by-step git commands in the chat message this project came with.
