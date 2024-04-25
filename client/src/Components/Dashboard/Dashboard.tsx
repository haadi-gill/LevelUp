import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as PostsApi from "../../network/posts_api";
import NavigationCard from '../Home/NavigationCard'
import { getPosts, Post } from '@/models/posts'
import { updateLiked } from '@/models/posts'
import "./Dashboard.css";


function Dashboard() {

  
  const {id} = useParams<string>()
  const userId = id || 'default'

  const [posts, setPosts] = useState<Post[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] =
    useState<Post | null>(null);

    const handleCompletion = async (e: React.ChangeEvent<HTMLInputElement>, note: Post) => {
      const isChecked = e.target.checked; 
      const postId = note._id;
      const params: updateLiked = {
        userID: userId,
        postID: postId,
        data: isChecked
      };// Get the new checked state
      try {
          const response = await PostsApi.updateCompletion(params);
          console.log(response);
          fetchNotes();
      }  catch (error) {
      if (error instanceof Error) {
          alert(error.message);
          console.error(error.message);
      } else {
          console.error("An unexpected error occurred.");
      }
    }}

    const fetchNotes = async () => {
      try {
        const response = await PostsApi.getMyPosts(userId); 
        console.log(response)
        setPosts(response.posts);

      } catch (e) {
        console.log(e);
      }
    };

  useEffect(() => {
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
     
      const createPostInfo = {title:title, task:content, user_id:userId};

      
      const response = await PostsApi.createPost(createPostInfo);
      console.log(response);


      const postReponse = await PostsApi.getMyPosts(userId);
      setPosts(postReponse.posts);

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

    const postID = selectedNote._id;

    try {
      const updatedContent = {postID:postID, title:title, task:content}
     
      const updateResponse = await PostsApi.updatePost(updatedContent);

            
      const postReponse = await PostsApi.getMyPosts(userId);
      setPosts(postReponse.posts);
      
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
      console.log("Note ID below:")
      console.log(noteId);
      console.log("Note ID above:")
      const deleteResponse = await PostsApi.deletePost({postID:noteId});
      console.log(deleteResponse)

      const postResponse = await PostsApi.getMyPosts(userId);

      setPosts(postResponse.posts);

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="Home flex mt-4 max-w-9xl mx-auto gap-8">
      <div className="w-1/3">
        <NavigationCard userId={userId} />
      </div>
      <div className="w-2/3">
        <form className="Form" onSubmit={selectedNote ? handleUpdateNote : handleAddNote}>
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter title..." required />
          <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Enter note..." required />
          {selectedNote ? (
            <div className="EditButtons">
              <button type="submit">Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div className="FormButtons">
              <button type="submit">Add task</button>
              <button>Add image</button>
            </div>
          )}
        </form>
        <div className="NotesList mt-7">
          {posts.map((note) => (
            <div key={note._id} className="Note" onClick={() => handleNoteClick(note)}>
              <div className="NoteHeader">
                <button onClick={(event) => deleteNote(event, note._id)}>X</button>
              </div>
              <input 
                  type="checkbox" 
                  className="" 
                  onChange={(e) => handleCompletion(e, note)} 
                  checked={note.complete} 
              />

              <h3>{note.title}</h3>
              <p>{note.task}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;