import React from 'react'
import axios from 'axios'
import './products.css'
import {
    Grid
} from '@material-ui/core/'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';
import Button from 'react-bootstrap/Button'





class products extends React.Component{  
 constructor(){
        super();
        
        this.state = {
            users: ["Stalas", "Kede", "Spinta", "Tavo tevas", "Taburete", "Lova", "Lentyna", "Vonios spintele", "Stalcius", "Didele spinta"],
            products: [],
            lenght: 0,   
            modal: false,
            deleteableId: ''       
        }
    }


    componentDidMount() {   

        axios.get('/products')
        .then((res) => {
            console.log(res.data);
            this.setState({products: res.data})
                          
        })      
        .catch((err) => {
            console.log(err);
        });     
    }

   handleDelete(id){

       const request = `/products/${this.state.deleteableId}`
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
                
            <Grid
                container                
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                className='grid phone-only'
            >
                {this.state.products.map(product => (
                    <div className="spacing">
                    <Grid item xs={12} sm={6} md={3} className='cards'  key={this.state.products.indexOf(product)}>
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Height: {product.height}m   </p>
                        <p className="card-text">Lenght: {product.lenght}m   </p>
                        <Button href={`product/${product._id},${product.fk_User}`} className="btn btn-primary messagesButton">Messages</Button>
                        <Button onClick={() => this.toggle(product._id)} className="btn btn-primary deleteButtonAdmin">Delete product</Button>
                        
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
      )  
  }
}



export default products;