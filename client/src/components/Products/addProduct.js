import React from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "../Registration/registration.css"
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions'
import jwt_decode from 'jwt-decode'
import axios from 'axios'




class registration extends React.Component { 

 

    constructor(props) 
    {
        super(props);
        this.nameEl = React.createRef();
        this.heightEl = React.createRef();
        this.lenghtEl = React.createRef();
        

        this.state = {
            errors: {},
            userId: ''
        };
    }


    submitHandler = (event) => {
        event.preventDefault();
        const name = this.nameEl.current.value;
        const height = this.heightEl.current.value;
        const lenght = this.lenghtEl.current.value; 

        const decoded = localStorage.jwtToken ? jwt_decode(localStorage.jwtToken) : '';

        const requestBody = {

            "name": name,
            "height": height,
            "lenght": lenght,
            "fk_User": decoded.userId            
        };

        console.log(this.state.userId);

        const request = `/users/${decoded.userId}/userProducts`

        axios.post(request,requestBody)
        .then((res) => {
            console.log(res.data);            
                          
        })      
        .catch((err) => {
            console.log(err);
        });

    };

    componentDidUpdate(nextProps) {

        if(nextProps.errors)
        {
            this.setState({errors: nextProps.errors});
        }

        
       

    }




    render() {

        //const { errors } = this.state;     TO DO add errors for input fields    

        return (
            <div className="loginbg">
            <div className="loginform center">
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control type="name" placeholder="Enter product name" ref={this.nameEl}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicHeight">
                        <Form.Label>Height</Form.Label>
                        <Form.Control type="height" placeholder="Enter height" ref={this.heightEl}/>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicLenght">
                        <Form.Label>Lenght</Form.Label>
                        <Form.Control type="lenght" placeholder="Enter lenght" ref={this.lenghtEl}/>
                    </Form.Group>
                    
                <div className="formbtnpad">
                <div className="row">
                <div className="column">  <Button variant="info formbt" type="submit">Submit</Button></div>
                <div className="column middle"></div>
                <div className="column"> <Button variant="info formbt" href="/userProducts">Back</Button></div>
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