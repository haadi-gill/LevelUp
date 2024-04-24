import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as PostsApi from "../../network/posts_api";
import { getPosts, Post } from '@/models/posts'
import "./Dashboard.css";


function Dashboard() {

  
  const {id} = useParams<string>()
  const userId = id || 'default'

  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] =
    useState<Post | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await PostsApi.getAllPosts(); 
        console.log(response)
        setPosts(response.posts);

      } catch (e) {
        console.log(e);
      }
    };

    fetchNotes();
  }, []);

  function handleNoteClick (note: Post) {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.task);
  };

  async function handleAddNote (event: React.FormEvent) {
    event.preventDefault();
    try {
     
      const postInfo = {title:title, task:content};

      setPosts([newNote, ...posts]);
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

    const postID = selectedNote.id;

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/update/content`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postID,
            title,
            content,
          }),
        }
      );

      
      const updatedNote = await response.json();

      const updatedNotesList = posts.map((note) =>
        note.id === selectedNote.id
          ? updatedNote
          : note
      );

      setPosts(updatedNotesList);
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

  async function deleteNote (event: React.MouseEvent, noteId: string) {
    event.stopPropagation();

    try {
      await fetch(
        `http://localhost:5000/api/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );
      const updatedNotes = posts.filter(
        (note) => note.id !== noteId
      );

      setPosts(updatedNotes);
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
        {posts.map((note) => (
          <div key={ note.id } className="Note" onClick={ () => handleNoteClick(note) }>
            <div className="NoteHeader">
              <button onClick={(event) => deleteNote(event, note.id) }> X </button>
            </div>
            <h3>{note.title}</h3>
            <p>{note.task}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;