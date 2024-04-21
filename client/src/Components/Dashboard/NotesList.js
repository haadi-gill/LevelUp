import './NotesList.css';
import Note from './Note';
import NewNote from './NewNote';

function NotesList({ notes, handleAddNewNote, handleDeleteNote, handleCheckMark}) {
  return (
    <div className="NotesList">
      {notes.map((note) => <Note id={note.id} text={note.text} date={note.date} handleDeleteNote={ handleDeleteNote } handleCheckMark={ handleCheckMark }/>)}
      <NewNote handleAddNewNote = { handleAddNewNote } />
    </div>
  );
}
  
export default NotesList;