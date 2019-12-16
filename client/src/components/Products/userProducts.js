import React from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import Button from 'react-bootstrap/Button'

import './userProducts.css'
import {
    Grid
} from '@material-ui/core/'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';





class products extends React.Component{  
 constructor(){
        super();
        
        this.state = {
            users: ["Stalas", "Kede", "Spinta", "Tavo tevas", "Taburete", "Lova", "Lentyna", "Vonios spintele", "Stalcius", "Didele spinta"],
            products: [],
            userId: '',
            modal: false,
            deleteableId: ''       
        }
    }


    componentDidMount(){   
          
        const decoded = localStorage.jwtToken ? jwt_decode(localStorage.jwtToken) : '';
        this.setState({userId:decoded.userId});

        const request = `/users/${decoded.userId}/userProducts`

        axios.get(request)
        .then((res) => {
            console.log(res.data);
            this.setState({products: res.data})
                          
        })      
        .catch((err) => {
            console.log(err);
        });     
    }


   handleDelete(id){

       const request = `/users/${this.state.userId}/userProducts/${this.state.deleteableId}`
       axios.delete(request)
        .then((res) => {
            console.log(res); 
            window.location.reload();          
                          
        })      
        .catch((err) => {
            console.log(err);
        });
             
   }

   toggle = (id) => {
  this.setState({
    modal: !this.state.modal,
    deleteableId: id
  });
}
    
  render() {   

      return (

    <React.Fragment>        
        <div className='productsbg'>
        <a href='/addProduct' className="btn btn-primary addButton">Add product</a>
            
            <Grid
                container                
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                className='grid'
            >
                {this.state.products.map(product => (
                    <div className="spacing">
                    <Grid item xs={12} sm={6} md={3} className='cards'  key={this.state.products.indexOf(product)}>
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Height: {product.height}m   </p>
                        <p className="card-text">Lenght: {product.lenght}m   </p>
                        <a href={`/productMessages/${product._id}`} className="btn btn-primary messagesButton">Notes</a>
                        <a href={`/editProduct/${product._id}`} className="btn btn-primary editButton">Edit product</a>
                        <Button onClick={() => this.toggle(product._id)} className="btn btn-primary deleteButton">Delete product</Button>
                    </div>
                    </div>
                        </Grid>
                            
                            <MDBModal isOpen={this.state.modal} toggle={this.toggle} >                            
                            <MDBModalBody >
                            Are you sure you want to delete this product?
                            </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn className="btn btn-primary modalSaveButton" onClick={() => this.handleDelete(product._id)} >Delete product</MDBBtn>
                            <MDBBtn className="btn btn-primary modalCancelButton" onClick={this.toggle}>Cancel</MDBBtn>
                           
                            </MDBModalFooter>
                        </MDBModal>
                        

                        
                   
                    </div>
                    
                ))}

            </Grid>  
        </div>


 
        
    </React.Fragment>

    

    

/*             <div className='productsbg'>
                
            <Grid
                container                
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                className='grid'
            >
                {this.state.users.map(user => (
                    <Grid item xs={12} sm={6} md={3} className='cards'  key={this.state.users.indexOf(user)}>
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                        <h5 className="card-title">{user}</h5>
                        <p className="card-text">Height:    </p>
                        <p className="card-text">Lenght:   </p>
                        <a href="messages" className="btn btn-primary">Messages</a>
                        <a  className="btn btn-primary deleteButton">Delete product</a>
                        </div>
                    </div>
                    </Grid>
                ))}

            </Grid>
        


      </div> */
      
      
      )
     
          
      
  
  }
}



export default products;