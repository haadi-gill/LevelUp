import './Note.css';
import deleteIcon from '../Assets/delete.png';
import shareIcon from '../Assets/share.png';

function Note({ id, text, date, handleDeleteNote }) {
  return (
    <div className="Note">
      <header>
        <input type="checkbox" />
        <img src={ shareIcon } alt="Share Icon" id="share-icon"/>
      </header>
      <span> { text } </span>
      <footer>
        <small style={{opacity: 0.4}}> { date } </small>
        <img src={ deleteIcon } onClick={ () => handleDeleteNote(id) } alt="Delete Icon" id="delete-icon"/>
      </footer>
    </div>
  );
}
  
export default Note;