// ===== Select elements =====
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// ===== Data =====
let notes = [];

// ===== Render =====
function render() {
  notesList.textContent = "";

  notes.forEach((note) => {
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

    card.append(body, deleteBtn);
    notesList.append(card);
  });
}

// ===== Add a note =====
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const note = {
    id: Date.now(),
    text: noteInput.value.trim(),
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  render();

  noteInput.value = "";
  noteInput.focus();
});

render();
