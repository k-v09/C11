document.addEventListener('DOMContentLoaded', () => {
  let noteForm, noteTitle, noteText, saveNoteBtn, newNoteBtn, clearBtn, noteList;

  if (window.location.pathname === '/notes') {
    noteForm = document.querySelector('.note-form');
    noteTitle = document.querySelector('.note-title');
    noteText = document.querySelector('.note-textarea');
    saveNoteBtn = document.querySelector('.save-note');
    newNoteBtn = document.querySelector('.new-note');
    clearBtn = document.querySelector('.clear-btn');
    noteList = document.querySelectorAll('.list-container .list-group');

    // Debugging: Log the elements to see if they are being selected correctly
    console.log({
      noteForm, noteTitle, noteText, saveNoteBtn, newNoteBtn, clearBtn, noteList
    });

    if (!saveNoteBtn) {
      console.error('saveNoteBtn is not found');
    }
    if (!newNoteBtn) {
      console.error('newNoteBtn is not found');
    }
    if (!clearBtn) {
      console.error('clearBtn is not found');
    }
    if (!noteForm) {
      console.error('noteForm is not found');
    }
  }

  // Show an element
  const show = (elem) => {
    elem.style.display = 'inline';
  };

  // Hide an element
  const hide = (elem) => {
    elem.style.display = 'none';
  };

  // activeNote is used to keep track of the note in the textarea
  let activeNote = {};

  const getNotes = () =>
    fetch('/api/notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

  const saveNote = (note) =>
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });

  const deleteNote = (id) =>
    fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

  const renderActiveNote = () => {
    if (saveNoteBtn) hide(saveNoteBtn);
    if (clearBtn) hide(clearBtn);

    if (activeNote.id) {
      if (newNoteBtn) show(newNoteBtn);
      if (noteTitle) noteTitle.setAttribute('readonly', true);
      if (noteText) noteText.setAttribute('readonly', true);
      if (noteTitle) noteTitle.value = activeNote.title;
      if (noteText) noteText.value = activeNote.text;
    } else {
      if (newNoteBtn) hide(newNoteBtn);
      if (noteTitle) noteTitle.removeAttribute('readonly');
      if (noteText) noteText.removeAttribute('readonly');
      if (noteTitle) noteTitle.value = '';
      if (noteText) noteText.value = '';
    }
  };

  const handleNoteSave = () => {
    const newNote = {
      title: noteTitle.value,
      text: noteText.value
    };
    saveNote(newNote).then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
  };

  // Delete the clicked note
  const handleNoteDelete = (e) => {
    e.stopPropagation();

    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

    if (activeNote.id === noteId) {
      activeNote = {};
    }

    deleteNote(noteId).then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
  };

  // Sets the activeNote and displays it
  const handleNoteView = (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    renderActiveNote();
  };

  // Sets the activeNote to an empty object and allows the user to enter a new note
  const handleNewNoteView = () => {
    activeNote = {};
    if (clearBtn) show(clearBtn);
    renderActiveNote();
  };

  // Renders the appropriate buttons based on the state of the form
  const handleRenderBtns = () => {
    if (clearBtn) show(clearBtn);
    if (!noteTitle.value.trim() && !noteText.value.trim()) {
      if (clearBtn) hide(clearBtn);
    } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
      if (saveNoteBtn) hide(saveNoteBtn);
    } else {
      if (saveNoteBtn) show(saveNoteBtn);
    }
  };

  // Render the list of note titles
  const renderNoteList = async (notes) => {
    let jsonNotes = await notes.json();
    if (window.location.pathname === '/notes') {
      noteList.forEach((el) => (el.innerHTML = ''));
    }

    let noteListItems = [];

    const createLi = (text, delBtn = true) => {
      const liEl = document.createElement('li');
      liEl.classList.add('list-group-item');

      const spanEl = document.createElement('span');
      spanEl.classList.add('list-item-title');
      spanEl.innerText = text;
      spanEl.addEventListener('click', handleNoteView);

      liEl.append(spanEl);

      if (delBtn) {
        const delBtnEl = document.createElement('i');
        delBtnEl.classList.add(
          'fas',
          'fa-trash-alt',
          'float-right',
          'text-danger',
          'delete-note'
        );
        delBtnEl.addEventListener('click', handleNoteDelete);

        liEl.append(delBtnEl);
      }

      return liEl;
    };

    if (jsonNotes.length === 0) {
      noteListItems.push(createLi('No saved Notes', false));
    }

    jsonNotes.forEach((note) => {
      const li = createLi(note.title);
      li.dataset.note = JSON.stringify(note);

      noteListItems.push(li);
    });

    if (window.location.pathname === '/notes') {
      noteListItems.forEach((note) => noteList[0].append(note));
    }
  };

  const getAndRenderNotes = () => getNotes().then(renderNoteList);

  // Conditional check and event listeners
  if (window.location.pathname === '/notes') {
    if (saveNoteBtn) {
      saveNoteBtn.addEventListener('click', handleNoteSave);
    } else {
      console.error('saveNoteBtn is not found');
    }

    if (newNoteBtn) {
      newNoteBtn.addEventListener('click', handleNewNoteView);
    } else {
      console.error('newNoteBtn is not found');
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', renderActiveNote);
    } else {
      console.error('clearBtn is not found');
    }

    if (noteForm) {
      noteForm.addEventListener('input', handleRenderBtns);
    } else {
      console.error('noteForm is not found');
    }
  }

  getAndRenderNotes();
});
