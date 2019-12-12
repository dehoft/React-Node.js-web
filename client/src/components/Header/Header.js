import React from 'react';
import logo from './header.jpg'
import './header.css';
function Header()
{
    return(

      <img
      className="w-100 headerimg"
      src={logo}  
      alt="Header Logo"
      />
        
    );
}

export default Header;