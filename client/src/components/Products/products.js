import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import axios from 'axios'

import './products.css'
import {
    Grid
} from '@material-ui/core/'





class products extends React.Component{  
 constructor(){
        super();
        
        this.state = {
            users: ["Stalas", "Kede", "Spinta", "Tavo tevas", "Taburete", "Lova", "Lentyna", "Vonios spintele", "Stalcius", "Didele spinta"],
            products: [],
            lenght: 0,         
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
       const request = `/products/${id}`
       axios.delete(request)
        .then((res) => {
            console.log(res); 
            window.location.reload();          
                          
        })      
        .catch((err) => {
            console.log(err);
        });     
   }
    
  render() {    


      return (
/*       <div className='productsbg'>
                
            <Grid
                container                
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                className='grid'
            >
                {this.state.products.map(product => (
                    <Grid item xs={12} sm={6} md={3} className='cards'  key={this.state.products.indexOf(product)}>
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Height: {product.height}m   </p>
                        <p className="card-text">Lenght: {product.lenght}m   </p>
                        <a href="#" className="btn btn-primary">Messages</a>
                        <a onClick={() => this.handleDelete(product._id)} className="btn btn-primary deleteButton">Delete product</a>
                        </div>
                    </div>
                    </Grid>
                ))}

            </Grid>
        


      </div> */

            <div className='productsbg'>
                
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
        


      </div>
      
      
      )
     
          
      
  
  }
}



export default products;