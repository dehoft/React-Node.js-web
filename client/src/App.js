import React from 'react';

//import Slideshow from './components/slideshow/slideshow';
import Navigation from './components/navigation/navigation'
//import Header from './components/Header/Header'
import Footer from "./components/footer/footer";
//import LoginModal from './components/LoginModal/loginModal'
//import Button from 'react-bootstrap/Button'
//import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as  Router, Route, Switch} from 'react-router-dom';

import Home from './components/slideshow/slideshow';
import Profile from './components/Profile/profile';
import Products from './components/Products/products';
import NoMatch from './components/NoMatch/noMatch';
import Login from './components/LoginPage/login';
import Register from './components/Registration/registration';
import AuthContext from './context/auth-context';


class App extends React.Component{
  state = {
    token: null,
    userId: null
  }
  
  
  login = (token, userId) =>{
    this.setState({token: token, userId:userId});
  };

  logout = () => {
    this.setState({token: null, userId: null})
  };

  render(){
    return (
      
        <React.Fragment>
          <AuthContext.Provider 
          value={{
            token: this.state.token, 
            userId: this.state.userId, 
            login: this.login, 
            logout: this.logout
            }}
          > 
            <Navigation/>   
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
          </AuthContext.Provider> 
        </React.Fragment>
      

    );
  }
}

export default App;
