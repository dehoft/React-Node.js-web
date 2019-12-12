import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';





class registration extends React.Component{

    constructor(props) 
    {
        super(props);
        this.usernameEl = React.createRef();
        this.passwordEl = React.createRef();
        this.adressEl = React.createRef();
        this.cityEl = React.createRef();
        this.phoneNumberEl = React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault();
        const username = this.usernameEl.current.value;
        const password = this.passwordEl.current.value;
        const adress = this.adressEl.current.value;
        const city = this.cityEl.current.value;
        const phoneNumber = this.phoneNumberEl.current.value;
        
        

        if (username.trim().lenght === 0 || password.trim().lenght === 0) {
            return;
        }

        const requestBody = {

            "username": username,
            "password": password,
            "city": city,
            "adress": adress,
            "phoneNumber": phoneNumber
        };

        axios.post('http://localhost:3000/users/signup', 
        requestBody,
        )
        .then((res) => {
            console.log(res);            
        });
    };


render() {
    return (

            <Form onSubmit={this.submitHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" ref={this.usernameEl}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" ref={this.passwordEl}/>
                </Form.Group>
                
                <Form.Group controlId="formBasicCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="city" placeholder="Enter city" ref={this.cityEl}/>
                </Form.Group>

                <Form.Group controlId="formBasicAdress">
                    <Form.Label>Adress</Form.Label>
                    <Form.Control type="adress" placeholder="Enter adress" ref={this.adressEl}/>
                </Form.Group>

                <Form.Group controlId="formBasicPhoneNumber">
                    <Form.Label>PhoneNumber</Form.Label>
                    <Form.Control type="phoneNumber" placeholder="Enter phone number" ref={this.phoneNumberEl}/>
                </Form.Group>



                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button href="login">Back</Button>

            </Form>

      )
  
    }
}

export default registration;