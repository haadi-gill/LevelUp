import './Navbar.css';
import logoIcon from './Assets/LevelUpIcon.png';

function Navbar() {
  return (
    <div id="Navbar">
      <img src={ logoIcon } alt="Logo Icon" id="logo-icon"/>
      <a href="" id="feed"> Hello </a>
      <button id="logout-button"> Logout </button>
      <div id="bar"><br /><div id="progress"><br /></div></div>
    </div>
  );
}

export default Navbar;
