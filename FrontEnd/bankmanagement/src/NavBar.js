// NavBar.js
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
 return (
  
   <>
   
   <div className="back"></div>
   <nav>
 <a href="/">Home</a>
 <a href="#">About</a>
 <a href="/login">Login</a>
 <a href="/register">Register</a>
 <a href="#">Contact Us</a>
</nav>

</>

 );
};

export default NavBar;