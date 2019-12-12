import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

import AuthContext from '../../context/auth-context'
import './login.css';




class login extends React.Component{

    static contextType = AuthContext;

    constructor(props) 
    {
        super(props);
        this.usernameEl = React.createRef();
        this.passwordEl = React.createRef();
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


        axios.post('http://localhost:3000/users/login', 
        requestBody,
        )
        .then((response) => {
            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Failed!');
            }
            return response;                
        })
        .then(resData => {
            if (resData.data.token) {
                this.context.login(resData.data.token, resData.data.userId);
                
            }
        })
        .catch(err => {
            console.log(err);
        });
    };


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
            <div class="row">
            <div class="column"> <Button variant="info formbt formbtnspacing" type="submit">Login</Button></div>
            <div class="column middle"></div>
            <div class="column"><Button variant="info formbt" href="register">Sign Up</Button></div>
            </div>
            </div>
            </Form>
            </div>
        
           
    </div>
      )
  
    }
}

export default login;