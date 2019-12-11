import React from 'react';
import Navigation from './components/navigation/navigation'
import Header from './components/Header/Header'
import LoginModal from './components/LoginModal/LoginModal'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    
    <div>
      <Header></Header>
      <Navigation></Navigation>
      

         <ButtonToolbar>
           <Button variant="primary" onClick={() => setModalShow(true)}>
             Launch vertically centered modal
           </Button>
     
           <LoginModal
             show={modalShow}
             onHide={() => setModalShow(false)}
           />
         </ButtonToolbar>
         </div> 

  );
}

export default App;
