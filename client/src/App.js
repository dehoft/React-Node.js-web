import React from 'react';
//import Slideshow from './components/slideshow/slideshow';
import Navigation from './components/Navigation/navigation'
//import Header from './components/Header/Header'
import Footer from "./components/Footer/footer";
//import LoginModal from './components/LoginModal/loginModal'
//import Button from 'react-bootstrap/Button'
//import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/slideshow/slideshow'
import Profile from './components/Profile/profile'
import Products from './components/Products/products'
import NoMatch from './components/NoMatch/noMatch'
import Login from './components/LoginPage/login'
import Register from './components/Registration/registration'



function App() {
  //const [modalShow, setModalShow] = React.useState(false);

  return (
     <React.Fragment>

 
      <Navigation/>

   {/*   <div>
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
      
         </div>   */}

   
      <Router>
        <Switch>        
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/products" component={Products} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <Route component={NoMatch} />
        </Switch>        
      </Router>

      <Footer/>

    </React.Fragment>

  );
}

export default App;
