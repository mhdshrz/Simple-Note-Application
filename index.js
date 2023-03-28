// saving the button element
const buttonEl = document.querySelector(".btn");
// saving the container, which was a figure element with class 'app'
const appEl = document.getElementById("app");
// saving the objects containing an id and a content in this array of objects
// we get all the existing objects in the local storage in an array
const notes = JSON.parse(localStorage.getItem("my-note-app") || "[]");

// creating a note (textarea element) in the DOM for each object of
// the 'notes' array
notes.forEach((note) => {
	// creating a textarea element with the properties
	// of the objects in the array
	const noteEl = createNoteEl(note.id, note.content);
	// inserting the element before the button element
	appEl.insertBefore(noteEl, buttonEl);
});

// adding an event listener for the button element
// with click to add a note
buttonEl.addEventListener("click", addNote);

// adding a note to the page
function addNote() {
	// creating an object to store in the local storage
	const noteObj = {
		id: Math.floor(Math.random() * 100000),
		content: "",
	};
	// creating a textarea element with the properties
	// of the newborn object
	const noteEl = createNoteEl(noteObj.id, noteObj.content);
	// inserting that element in the DOM,
	// before the button element
	appEl.insertBefore(noteEl, buttonEl);

	// pushing the object into the 'notes' array
	notes.push(noteObj);

	// saving the array 'notes' in the local storage
	saveNotes(notes);
}

function createNoteEl(id, content) {
	const noteEl = document.createElement("textarea");
	noteEl.classList.add("note");
	noteEl.placeholder = "Empty - Write here ...";
	noteEl.value = content;

	noteEl.addEventListener("dblclick", () => {
		const remove = confirm("Are you sure you want to delete this note?!");
		// I don't understand this line
		if (remove) deleteNote(id, noteEl);
	});

	noteEl.addEventListener("input", () => {
		// and this line, how are the
		// arguments passed to these functions??!!!
		updateNote(id, noteEl.value);
	});

	return noteEl;
}

function deleteNote(id, noteEl) {
	notes.splice(
		notes.findIndex((arrayElement) => arrayElement.id === id),
		1
	);
	saveNotes(notes);
	appEl.removeChild(noteEl);
}

function updateNote(id, content) {
	const target = notes.find((element) => element.id === id);
	target.content = content;
	saveNotes(notes);
}

function saveNotes(notes) {
	localStorage.setItem("my-note-app", JSON.stringify(notes));
}
