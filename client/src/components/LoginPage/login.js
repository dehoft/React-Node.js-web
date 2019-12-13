import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
//import axios from 'axios';


import AuthContext from '../../context/auth-context'
//import setAuthToken from '../../utils/setAuthToken'
import './login.css';




class login extends React.Component{

    static contextType = AuthContext;

    constructor(props) 
    {
        super(props);
        this.usernameEl = React.createRef();
        this.passwordEl = React.createRef();

        this.state = {
            errors: {}
        }
       
       
    }



    submitHandler = (event) => {
        event.preventDefault();
        const username = this.usernameEl.current.value;
        const password = this.passwordEl.current.value;

        if (username.trim().lenght === 0 || password.trim().lenght === 0) {
            return;
        }

        const requestBody = {

            "username": username,
            "password": password
        };
       
        this.props.loginUser(requestBody);
        //this.props.logoutUser();
        
    };

      componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

        componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }


render() {
    return (
        <div className="loginbg">
            <div className="loginform center">
            <Form onSubmit={this.submitHandler}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label className="labelcenter">Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" ref={this.usernameEl}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={this.passwordEl}/>
            </Form.Group>
            <div className="formbtnpad">
            <div className="row">
            <div className="column"> <Button variant="info formbt formbtnspacing" type="submit" >Login</Button></div>
            <div className="column middle"></div>
            <div className="column"><Button variant="info formbt" href="register">Sign Up</Button></div>
            </div>
            </div>
            </Form>
            </div>
        
           
    </div>
      )
  
    }
}

login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(login);