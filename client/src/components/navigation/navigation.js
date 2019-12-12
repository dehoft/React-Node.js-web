import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './navigation.css';
//import {BrowserRouter as Link} from 'react-router-dom'



function navigation() {
 
  return (

    <Navbar collapseOnSelect expand="lg" >
    <Nav.Item><Navbar.Brand href="/" className='colorHome'>Home</Navbar.Brand></Nav.Item>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
          <Nav.Link href="products" >Products</Nav.Link>
          <Nav.Link  href="profile">Profile</Nav.Link>
          <Nav.Link  href="login">Log In</Nav.Link>
          </Nav>
      </Navbar.Collapse>
    </Navbar>


  );
}

export default navigation;