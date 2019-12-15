import React from 'react'
import axios from 'axios'
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";


class profile extends React.Component{  
 constructor(){
        super();
        
        this.state = {
            users: [],
            usersProductsCount: [],
            fakeUsers: ["Adminas", "Tavo mama", "Tava tevas", "Arvydelis",
            "Eivydukas", "Tomas"]         
        }
    }

  componentDidMount() {   

        axios.get('/users')
        .then((res) => {
            //console.log(res.data.users);
            this.setState({users:res.data.users})
                          
        })      
        .catch((err) => {
            console.log(err);
        });     
    }
    
  render() {    

    

      return (
      <React.Fragment>

{/*         <MDBContainer>
          <MDBListGroup style={{ width: "22rem" }}>           
            
            {this.state.users.map(user => (
           <MDBListGroupItem href="user" hover key={user._id}>  
                {user.username}
            </MDBListGroupItem>
          ))}         
          </MDBListGroup>
        </MDBContainer>
 */}


                <MDBContainer>
          <MDBListGroup style={{ width: "22rem" }}>           
            
            {this.state.fakeUsers.map(user => (
           <MDBListGroupItem href="user" hover key={user}>  
                {user}
            </MDBListGroupItem>
          ))}         
          </MDBListGroup>
        </MDBContainer>


      </React.Fragment>
      
      
      )
          
      
  
  }
}



export default profile;
