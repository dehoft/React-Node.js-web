import React from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



 
class profile extends React.Component{  

 constructor(){
        super();

        this.nameEl = React.createRef();
        this.heightEl = React.createRef();
        this.lenghtEl = React.createRef();
        this.phoneNumberEl = React.createRef();

        this.state = {
            id: null,
            name: null,
            lenght: null,
            height: null             
        }
    }

    

    componentDidMount(){

        const decoded = localStorage.jwtToken ? jwt_decode(localStorage.jwtToken) : null;
        const userId = decoded.userId;
        

        const string = `/users/${userId}/userProducts/${this.props.match.params.id}`;
        console.log(string);

        axios.get(string)
        .then((res) => {           
                this.setState({
                id: res.data._id,
                name: res.data.name,
                height: res.data.height,
                lenght: res.data.lenght                
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
        

        const string = `/users/${userId}/userProducts/${this.props.match.params.id}`;

        const patchData = [
            {
                "propName": "name",
                "value": this.nameEl.current.value ? this.nameEl.current.value : this.state.name
            },
            {
                "propName": "height",
                "value": this.heightEl.current.value ? this.heightEl.current.value : this.state.height
            },
            {
                "propName": "lenght",
                "value": this.lenghtEl.current.value ? this.lenghtEl.current.value : this.state.lenght
            }                  
            
        ];      
          
        axios.patch(string, patchData)
        .then((res) => { 
            console.log(res.data);   
            this.props.history.push('/userProducts')             
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
                <Form.Group controlId="formBasicName">
                    <Form.Label>Current name</Form.Label>
                    <Form.Control type="name" placeholder={this.state.name}  ref={this.nameEl} />
                </Form.Group>
 
                <Form.Group controlId="formBasicHeight">
                    <Form.Label>Current height</Form.Label>
                    <Form.Control type="height"  placeholder={this.state.height} ref={this.heightEl}/>
                </Form.Group>

                <Form.Group controlId="formBasicLenght">
                    <Form.Label>Current lenght</Form.Label>
                    <Form.Control type="lenght"  placeholder={this.state.lenght} ref={this.lenghtEl}/>
                </Form.Group>
                
            <div className="formbtnpad">
            <div className="row">
            <div className="column">  <Button variant="info formbt" type="submit">Change product info</Button></div>
            <div className="column middle"></div>
            <div className="column"> <Button variant="info formbt" href="/userProducts">Back</Button></div>
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
