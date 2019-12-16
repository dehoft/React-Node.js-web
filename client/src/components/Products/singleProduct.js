import React from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'

import Col from 'react-bootstrap/Col'
import './productMessages.css'

import Form from 'react-bootstrap/Form'





class products extends React.Component{  
 constructor(props){
        super(props);

        this.noteEl = React.createRef();
        
        this.state = {
            notes: [],
            userId: '',
            value: '',
            rows: 3,
		    minRows: 5,
			maxRows: 10
        }
    }

    componentDidMount() {      

        const decoded = localStorage.jwtToken ? jwt_decode(localStorage.jwtToken) : '';
        this.setState({userId:decoded.userId});

        const request = `/users/${this.props.match.params.userId}/userProducts/${this.props.match.params.id}/productNotes`;
        console.log(request);
        axios.get(request)
            .then((res) => {
                //console.log(res.data);
                this.setState({notes: res.data})
                            
            })      
            .catch((err) => {
                console.log(err);
            });     
    }

    handleDelete(id){

        const request = `/users/${this.props.match.params.userId}/userProducts/${this.props.match.params.id}/productNotes/${id}`
        axios.delete(request)
            .then((res) => {             
               window.location.reload();                       
            })      
            .catch((err) => {
                console.log(err);
            });
             
   }

       handleCreate(){

        const request = `/users/${this.props.match.params.userId}/userProducts/${this.props.match.params.id}/productNotes`
        const note = this.noteEl.current.value;
        const requestBody = {
            "note": note
        };
        axios.post(request, requestBody)
            .then((res) => {            
                window.location.reload();    
                            
            })      
            .catch((err) => {
                console.log(err);
            });
             
   }
   
   handleChange = (event) => {
		const textareaLineHeight = 24;
		const { minRows, maxRows } = this.state;
		
		const previousRows = event.target.rows;
  	event.target.rows = minRows; // reset number of rows in textarea 
		
		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    
    if (currentRows === previousRows) {
    	event.target.rows = currentRows;
    }
		
		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}
    
  	this.setState({
    	value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
	};
    

    
  render() {
     
      return (  
        <div className='productsbg'>

        <Form >
            <Form.Row className='input'>
                <Col xs={3}>
                    <Form.Control className='inputForm' placeholder="First name" ref={this.noteEl}/>
                </Col>
                <Col xs={4}>  
                   <Button className='addButton' onClick={() => this.handleCreate()}>Create note</Button>                   
                </Col>
            </Form.Row>
        </Form>    

        <Form className='list'>
            
                {this.state.notes.map(note => (
                    <Form.Row>                        
                        <Col xs={5}>        
                        <textarea
				            value={note.note} className='note' onChange={this.handleChange} disabled
			            />                  
                            {/* <Form.Control className='note' value={note.note} disabled ></Form.Control> */}
                        </Col>
                        <Col xs={4}>
                            <Button className='deleteNote' onClick={() => this.handleDelete(note._id)}>Delete message</Button>
                        </Col>
                        
                    </Form.Row>
                ))}     
                
        </Form>        
            
        </div>
              
      )  
  }
}

products.propTypes = {
    id: PropTypes.string.isRequired
};


export default products;