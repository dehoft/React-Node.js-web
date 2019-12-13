import React from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./registration.css"
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions'




class registration extends React.Component { 

 

    constructor(props) 
    {
        super(props);
        this.usernameEl = React.createRef();
        this.passwordEl = React.createRef();
        this.adressEl = React.createRef();
        this.cityEl = React.createRef();
        this.phoneNumberEl = React.createRef();

        this.state = {
            errors: {}
        };
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

        this.props.registerUser(requestBody, this.props.history);

    };

    componentDidUpdate(nextProps) {
        if(nextProps.errors)
        {
            this.setState({errors: nextProps.errors});
        }
    }




render() {

    //const { errors } = this.state;     TO DO add error for input fields
    

    return (
        <div className="loginbg">
        <div className="loginform center">
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
            <div className="formbtnpad">
            <div className="row">
            <div className="column">  <Button variant="info formbt" type="submit">Submit</Button></div>
            <div className="column middle"></div>
            <div className="column"> <Button variant="info formbt" href="login">Back</Button></div>
            </div>
            </div>
            </Form>
        </div>
    </div>

      )
  
    }
}

registration.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});



export default connect(mapStateToProps, { registerUser })(withRouter(registration));