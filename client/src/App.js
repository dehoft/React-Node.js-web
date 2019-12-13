import React from 'react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import Navigation from './components/Navigation/navigation'
import Footer from "./components/Footer/footer";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './components/slideshow/slideshow';
import Profile from './components/Profile/profile';
import Products from './components/Products/products';
import NoMatch from './components/NoMatch/noMatch';
import Login from './components/LoginPage/login';
import Register from './components/Registration/registration';
import store from './store'


//import PropTypes from 'prop-types';
//import {connect} from 'react-redux';


// token check

if (localStorage.jwtToken) {
  
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends React.Component{
  state = {
    token: null,
    userId: null
  }



  render(){
    return (
      <Provider store= { store }>
        <React.Fragment>          
            <Navigation/>   
            <Router>
              <Switch>        
                <Route exact path="/" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/products" component={Products} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path='/login' component={Home}/>
                
                <Route component={NoMatch} />
              </Switch>        
            </Router>
            <Footer/>           
          </React.Fragment>
        </Provider>
      

    );
  }
}

export default App;
