import './Note.css';
import './NewNote.css';
import { useState } from 'react';

function NewNote({ handleAddNewNote }) {
  const [noteText, setNoteText] = useState("");

  function handleChange(event) {
    setNoteText(event.target.value);
  }

  function handleSave() {
    handleAddNewNote(noteText);
    setNoteText("");
  }

  return(
    <div className="Note">
      <textarea onChange={ handleChange } value={ noteText } placeholder="Click to type a note..."></textarea>
      <footer>
        <br />
        <button onClick={ handleSave }> Save </button>
      </footer>
    </div>
  );
}

export default NewNote;