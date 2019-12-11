import React, {Component} from 'react';
import './users.css';

class Users extends Component{

    constructor(){
        super();
        this.state = {
            items: [],
            lenght: 0,         
        }
    }

    componentDidMount() {        
        fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(res => this.setState({items:res.users}));
    }

  render() {
    return (
    <div>
        <h2>Users </h2>
        <ul>
            {/* {this.state.items.map(user => 
                <li key={user._id}> { user.username } { user.adress } {user.city }</li>                
            )} */} 

            
        </ul>
        
    </div>
  ); 
  }
}

export default Users;
