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
            //console.log(res.data.users);
            this.setState({products:res.data.users})
                          
        })      
        .catch((err) => {
            console.log(err);
        });     
    }

   
    
  render() {    


      return (
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
                    <Card bg="success" text="white"  style={{ width: '18rem' }}>
                        <Card.Body >
                            <Card.Title>{user}</Card.Title>
                            <Card.Text>
                              Aprasymas
                            </Card.Text>
                            <Button variant="primary">Produkto perziura</Button>
                        </Card.Body>
                    </Card>
                     </Grid>
                ))}

            </Grid>
        


      </div>
      
      
      )
     
          
      
  
  }
}



export default products;