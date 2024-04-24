import { useEffect, useState } from "react";
import * as PostsApi from "../../network/posts_api";
import "./Dashboard.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] =
    useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/notes"
        );

        const notes: Note[] =
          await response.json();

        setNotes(notes);
      } catch (e) {
        console.log(e);
      }
    };

    fetchNotes();
  }, []);

  function handleNoteClick (note: Note) {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  async function handleAddNote (event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (e) {
      console.log(e);
    }
  };

  async function handleUpdateNote (event: React.FormEvent) {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      const updatedNote = await response.json();

      const updatedNotesList = notes.map((note) =>
        note.id === selectedNote.id
          ? updatedNote
          : note
      );

      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (e) {
      console.log(e);
    }
  };

  function handleCancel() {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  async function deleteNote (event: React.MouseEvent, noteId: number) {
    event.stopPropagation();

    try {
      await fetch(
        `http://localhost:5000/api/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );
      const updatedNotes = notes.filter(
        (note) => note.id !== noteId
      );

      setNotes(updatedNotes);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="Home">
      <form className="Form" onSubmit={ (event) => selectedNote ? handleUpdateNote(event) : handleAddNote(event) }>
        <input value={title} onChange={(event) => setTitle(event.target.value) } placeholder="Enter title..." required></input>
        <textarea value={content} onChange={(event) => setContent(event.target.value) } placeholder="Enter note..." required></textarea>
        {selectedNote ? (
          <div className="EditButtons">
          <button type="submit"> Save </button>
          <button onClick={ handleCancel }> Cancel </button>
        </div>
      ) : (
        <div className="FormButtons">
          <button type="submit"> Add task </button>
          <button> Add image </button>
        </div>
        )}
      </form>

      <div className="NotesList">
        {notes.map((note) => (
          <div key={ note.id } className="Note" onClick={ () => handleNoteClick(note) }>
            <div className="NoteHeader">
              <button onClick={(event) => deleteNote(event, note.id) }> X </button>
            </div>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;