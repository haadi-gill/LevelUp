import './Home.css';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './NotesList'

function Home() {
  const [notes, setNotes] = useState([]);

  function addNewNote(text) {
    const date= new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  function deleteNote(id) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  function getCheckMark() {

  }

  return (
    <div className="Home">
      <h1> Welcome to LevelUp </h1>
      <NotesList notes={ notes } handleAddNewNote={ addNewNote } handleDeleteNote = { deleteNote } handleCheckMark = { getCheckMark }/>
    </div>
  );
}

export default Home;
