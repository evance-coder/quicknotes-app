// ===== Select elements =====
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");
const clearAllBtn = document.querySelector("#clear-all");

const MAX_LENGTH = 200;
const STORAGE_KEY = "quicknotes-notes";

// ===== Data (loaded from localStorage) =====
function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

let notes = loadNotes();

// ===== Helpers =====
function showError(message) {
  errorMessage.textContent = message;
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// A note matches when its text contains every search word (any case).
function matchesSearch(note, searchText) {
  const words = searchText.toLowerCase().split(/\s+/).filter(Boolean);
  const text = note.text.toLowerCase();
  return words.every((word) => text.includes(word));
}

// ===== Render =====
function render() {
  notesList.textContent = "";

  const searchText = searchInput.value.trim();
  const visibleNotes = notes.filter((note) => matchesSearch(note, searchText));

  if (notes.length > 0 && visibleNotes.length === 0) {
    const message = document.createElement("li");
    message.className = "empty-message";
    message.textContent = "No notes match your search.";
    notesList.append(message);
  }

  visibleNotes.forEach((note) => {
    const card = document.createElement("li");
    card.className = `note-card category-${note.category}`;

    const body = document.createElement("div");

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const label = document.createElement("span");
    label.className = "category-label";
    label.textContent = note.category;

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    meta.append(label, date);
    body.append(text, meta);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    card.append(body, deleteBtn);
    notesList.append(card);
  });

  updateCount();
}

// ===== Add a note =====
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    showError("Please type a note first.");
    return;
  }

  if (text.length > MAX_LENGTH) {
    showError("Notes must be 200 characters or fewer.");
    return;
  }

  notes.push({
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  });

  saveNotes();
  showError("");
  render();

  noteInput.value = "";
  noteInput.focus();
});

// ===== Clear all (bonus) =====
clearAllBtn.addEventListener("click", () => {
  if (notes.length === 0) return;

  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

// ===== Search =====
searchInput.addEventListener("input", render);

render();
