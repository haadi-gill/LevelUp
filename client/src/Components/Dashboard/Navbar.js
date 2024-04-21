import './Navbar.css';
import logoIcon from '../Assets/LevelUpIcon.png';
import userIcon from '../Assets/userImage.png';

function Navbar() {
  return (
    <div id="Navbar">
      <img src={ logoIcon } alt="Logo Icon" id="logo-icon"/>
      <img src={ userIcon } alt="User Icon" id="user-icon"/>
      <div id="bar"><br /><div id="progress"><br /></div></div>
    </div>
  );
}

export default Navbar;
