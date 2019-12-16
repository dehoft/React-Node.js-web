import React from 'react'
import axios from 'axios'
import "./users.css"
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
        
        <table className="listcenter">
  <tr>
    <th className="listcenter">Authorized Users</th>
  </tr>
  {this.state.fakeUsers.map(user => (
           <tr  href="user" hover key={user}>  
               <p className="content"> {user}</p>
            </tr>
          ))}         
  </table>
        

     
      
      
      )
          
      
  
  }
}



export default profile;
