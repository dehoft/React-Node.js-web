import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
import './products.css'




class products extends React.Component{  
 constructor(props){
        super(props);
        
        this.state = {
           notes: []
        }
    }

    componentDidMount() {      

        const request = `/users/${this.props.match.params.userId}/userProducts/${this.props.match.params.id}/productNotes`;
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
      //const id = this.props.match.params.id      

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