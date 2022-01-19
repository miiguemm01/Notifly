const userNotes = localStorage.getItem('userNotes') ? JSON.parse(localStorage.getItem('userNotes')) : [];
let loadedNote = {};

const noteArea = document.getElementById('note-area');
const newNoteButton = document.getElementById('new-note');
const saveNoteButton = document.getElementById('save-note');
const deleteNoteButton = document.getElementById('delete-note');
const loadNoteButton = document.getElementById('load-note');
const modalLoadNotes = document.getElementById('modal-load-notes');
const modalContent = document.getElementById('modal-content');
const closeModalButton = document.getElementById('close-modal');

newNoteButton.addEventListener('click', () => {
    noteArea.value = '';
    loadedNote = {};
});

closeModalButton.addEventListener('click', () => {
    modalLoadNotes.classList.add('inactive');
});

deleteNoteButton.addEventListener('click', () => {
    if(loadedNote.id) {
        const noteIndex = userNotes.findIndex(note => note.id == loadedNote.id);
        userNotes.splice(noteIndex, 1);
        localStorage.setItem('userNotes', JSON.stringify(userNotes));
        noteArea.value = '';
        loadedNote = {};
    }
});



saveNoteButton.addEventListener('click', () => {
    const noteText = noteArea.value;
    let note = {};
    let save = true;
    if(loadedNote.hasOwnProperty('id')) {
        note = {
            id: loadedNote.id,
            text: noteText
        }
    }else{
        note = {
            id: userNotes[userNotes.length - 1] ? userNotes[userNotes.length - 1].id + 1 : 1,
            text: noteText
        }
    }
    loadedNote = note;
    for(let i = 0; i < userNotes.length; i++){
        if(loadedNote.id === note.id){
            if(userNotes[i].id === note.id){
                userNotes[i] = note;
                save = false;
            }
        }
    }
    if(save){
        userNotes.push(note);
    }
    localStorage.setItem('userNotes', JSON.stringify(userNotes));
});

loadNoteButton.addEventListener('click', () => {
    modalLoadNotes.classList.remove('inactive');
    loadNotes();
});

const loadNotes = () => {
    modalContent.innerHTML = '';
    for(let i = 0; i < userNotes.length; i++) {
        const note = userNotes[i];
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('data-note-id', note.id);
        noteElement.innerHTML = '<div><div class="note-image">📝</div><div class="note-id" id="note-id">' + note.id + '</div></div>';
        modalContent.appendChild(noteElement);
    }
    const noteElements = document.querySelectorAll('.note');
    for(let i = 0; i < noteElements.length; i++) {
        noteElements[i].addEventListener('click', () => {
            noteElements[i].classList.add('selected');
            const thisElement = i;
            for(let j = 0; j < noteElements.length; j++) {
                if(j !== thisElement) {
                    noteElements[j].classList.remove('selected');
                }
            }
        });
        noteElements[i].addEventListener('dblclick', () => {
            const noteId = noteElements[i].getAttribute('data-note-id');
            const note = userNotes.find(note => note.id == noteId);
            noteArea.value = note.text;
            loadedNote = note;
        });
    }
};

loadNotes();
modalLoadNotes.classList.add('inactive');

