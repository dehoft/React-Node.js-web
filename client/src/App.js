import React from 'react';
import Slideshow from './components/slideshow/slideshow';
import Navigation from './components/navigation/navigation'
import Header from './components/Header/Header'
import Footer from "./components/footer/footer";
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
      <Slideshow></Slideshow>
      <ButtonToolbar>
           <Button variant="primary" onClick={() => setModalShow(true)}>
             Login Bitch
           </Button>
     
           <LoginModal
             show={modalShow}
             onHide={() => setModalShow(false)}
           />
         </ButtonToolbar>
      <Footer></Footer>
      
         </div> 


  );
}

export default App;
