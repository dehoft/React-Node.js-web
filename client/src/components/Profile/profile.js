import React from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



 
class profile extends React.Component{  

 constructor(){
     
        super();

        this.usernameEl = React.createRef();
        this.cityEl = React.createRef();
        this.adressEl = React.createRef();
        this.phoneNumberEl = React.createRef();

        this.state = {
            id: null,
            username: null,
            city: null,
            adress: null,
            phoneNumber: null,
            role: null                
        }
    }

    

    componentDidMount(){

        const decoded = localStorage.jwtToken ? jwt_decode(localStorage.jwtToken) : null;
        const userId = decoded.userId;
        

        const string = `/users/${userId}`;
        

        axios.get(string)
        .then((res) => {           
            this.setState({
                id: res.data._id,
                username: res.data.username,
                city: res.data.city,
                adress: res.data.adress,
                phoneNumber: res.data.phoneNumber,
                role: res.data.role[0]
            });
                        
        })      
        .catch((err) => {
            console.log(err);
        }); 
    }


    submittHandler= (event) => {
        event.preventDefault();

        const decoded = localStorage.jwtToken ? jwt_decode(localStorage.jwtToken) : null;
        const userId = decoded.userId;
        

        const string = `/users/${userId}`;

        const patchData = [
            {
                "propName": "username",
                "value": this.usernameEl.current.value ? this.usernameEl.current.value : this.state.username
            },
            {
                "propName": "city",
                "value": this.cityEl.current.value ? this.cityEl.current.value : this.state.city
            },
            {
                "propName": "adress",
                "value": this.adressEl.current.value ? this.adressEl.current.value : this.state.adress
            },
            {
                "propName": "phoneNumber",
                "value": this.phoneNumberEl.current.value ? this.phoneNumberEl.current.value : this.state.phoneNumber.toString()
            }           
            
        ];      
          
        axios.patch(string, patchData)
        .then((res) => { 
            
            window.location.reload(); 
                         
        })      
        .catch((err) => {
            console.log(err);
        });  



    }
    
  render() {
      
      return (
      <React.Fragment>      

       <div className="loginbg">
        <div className="loginform center">
            <Form onSubmit={this.submittHandler}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Current username</Form.Label>
                    <Form.Control type="username" placeholder={this.state.username}  ref={this.usernameEl} />
                </Form.Group>
 
                <Form.Group controlId="formBasicCity">
                    <Form.Label>Current city</Form.Label>
                    <Form.Control type="city"  placeholder={this.state.city} ref={this.cityEl}/>
                </Form.Group>

                <Form.Group controlId="formBasicAdress">
                    <Form.Label>Current adress</Form.Label>
                    <Form.Control type="adress"  placeholder={this.state.adress} ref={this.adressEl}/>
                </Form.Group>

                <Form.Group controlId="formBasicPhoneNumber">
                    <Form.Label>Current phone number</Form.Label>
                    <Form.Control type="phoneNumber"  placeholder={this.state.phoneNumber} ref={this.phoneNumberEl}/>
                </Form.Group>
            <div className="formbtnpad">
            <div className="row">
            <div className="column">  <Button variant="info formbt" type="submit">Change user info</Button></div>
            <div className="column middle"></div>
            <div className="column"> <Button variant="info formbt" href="/">Back</Button></div>
            </div>
            </div>
            </Form>
        </div>
    </div>

    </React.Fragment>
      
      
      )
          
      
  
  }
}



export default profile;
