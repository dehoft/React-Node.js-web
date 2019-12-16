import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



import './navigation.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions'




class navigation extends React.Component {

  onLogoutClick(e)
  {
    e.preventDefault();
    
    this.props.logoutUser(); 
    
    
  } 



  render (){
      const {isAuthenticated, user} = this.props.auth;
      //console.log(isAuthenticated);
      const role = user.role ? user.role[0] : null;  
      

    
    
      return (
        
        <Navbar collapseOnSelect expand="lg">
        <Nav.Item><Navbar.Brand href="/" className='colorHome'>Home</Navbar.Brand></Nav.Item>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              {isAuthenticated &&  role === 'ADMIN' && <Nav.Link href="/products" >Products</Nav.Link>}             
              {isAuthenticated &&  role === 'ADMIN' && <Nav.Link  href="/users">Users</Nav.Link>}
              {!isAuthenticated && <Nav.Link  href="/login">Log In</Nav.Link>}             
              {isAuthenticated && <Nav.Link href="/userProducts" >User Products</Nav.Link>}            
              {isAuthenticated && <Nav.Link  href="/profile">Profile</Nav.Link>}
              {isAuthenticated && <Nav.Link onClick={this.props.logoutUser}>Log Out</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
      )
    
    
    
  }
}

navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(navigation);