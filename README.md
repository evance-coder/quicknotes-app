# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You type a note, pick a category (Personal, Work or Study), and it appears as a colour-coded card. Notes are saved in your browser, so they are still there after you refresh the page, and you can search or delete them at any time.

## Features

- Add notes with a category (Personal, Work or Study)
- Colour-coded note cards, each showing the text, category label, date and time
- Delete any single note
- Search notes as you type (not case-sensitive), with a message when nothing matches
- Validation: empty notes and notes over 200 characters show an error message
- Live note count ("You have no notes yet.", "You have 1 note.", "You have N notes.")
- Notes saved to `localStorage`, so they survive a page refresh
- "Clear all" button with a confirmation prompt
- Responsive layout that stacks the form on screens 600px wide or narrower

## How to run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/evance-coder/quicknotes-app.git
   cd quicknotes-app
   ```
2. Open the folder in VS Code and start it with the **Live Server** extension
   (right-click `index.html` → **Open with Live Server**).
   You can also just double-click `index.html` to open it in a browser, since the app needs no build step.

## What I learned

- **Building the page from data:** a `render()` function that rebuilds the whole list from the `notes` array keeps the screen and the data in sync, so add, delete and search all just change the array and call `render()`.
- **Safe DOM updates:** using `createElement` and `textContent` instead of `innerHTML` means whatever a user types is shown as plain text and can never run as code.
- **Persistence with localStorage:** `JSON.stringify` turns the array into text for saving and `JSON.parse` turns it back when the page loads. Wrapping the parse in `try/catch` stops corrupted saved data from breaking the app.
- **Responsive CSS:** Flexbox lays the form out in a row, and a single `@media (max-width: 600px)` rule switches it to a column on phones.
- **Git workflow:** committing after each task gives a clear history that shows how the project grew step by step.
