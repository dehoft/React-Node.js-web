import React from 'react';
import Image from 'react-bootstrap/Image'
import logo from './header.jpg'

function Header()
{
    return(

        <Image src={logo} fluid
         />
        
    );
}

export default Header;