import React from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import PropTypes from 'prop-types';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

import './products.css'
import {
    Grid
} from '@material-ui/core/'



class products extends React.Component{  
 constructor(props){
        super(props);
        
        this.state = {
           notes: [],
           userId: ''
        }
    }

    componentDidMount() {      

        const decoded = localStorage.jwtToken ? jwt_decode(localStorage.jwtToken) : '';
        this.setState({userId:decoded.userId});

        const request = `/users/${decoded.userId}/userProducts/${this.props.match.params.id}/productNotes`;
        console.log(request);
        axios.get(request)
        .then((res) => {
            console.log(res.data);
            this.setState({notes: res.data})
                          
        })      
        .catch((err) => {
            console.log(err);
        });     
    }
    

    
  render() {

      return (  

        <MDBContainer>
          <MDBListGroup style={{ width: "22rem" }}>           
            
            {this.state.notes.map(note => (
                <MDBListGroupItem href="user" hover key={note._id}>  
                {note.note}
                </MDBListGroupItem>
            ))}         
          </MDBListGroup>
        </MDBContainer>
              
      )  
  }
}

products.propTypes = {
    id: PropTypes.string.isRequired
};


export default products;