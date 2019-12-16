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
import Users from './components/Users/users'
import Profile from './components/Profile/profile';
import Products from './components/Products/products';
import AddProduct from './components/Products/addProduct';
import EditProduct from './components/Products/editProduct';
import UserProducts from './components/Products/userProducts';
import SingleProduct from './components/Products/singleProduct';
import ProductMessages from './components/Products/productMessages'
import NoMatch from './components/NoMatch/noMatch';
import Login from './components/LoginPage/login';
import Register from './components/Registration/registration';
import store from './store'
import { logoutUser } from './actions/authActions'


// token check

if (localStorage.jwtToken){
  
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime) {
      //Logout user
      store.dispatch(logoutUser());     
      // Redirect to login
      window.location.href = '/login'
  }

}

class App extends React.Component{
  state = {
    token: null,
    userId: null
  }

  

  render(){

  if (localStorage.jwtToken) {    
    //const decoded = jwt_decode(localStorage.jwtToken);  
    //const role = decoded.role ? decoded.role[0] : ''      
  }
   
    
    return (
      <Provider store= { store }>
        <React.Fragment>          
            <Navigation/>   
            <Router>
              <Switch>        
                <Route exact path="/" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/users" component={Users} />
                <Route path="/products" component={Products} />
                <Route path="/userProducts" component={UserProducts} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path='/login' component={Home}/>
                <Route path="/product/:id,:userId" exact component={SingleProduct} />
                <Route path="/productMessages/:id" exact component={ProductMessages} />
                <Route path="/addProduct" component={AddProduct} />
                <Route path="/editProduct/:id" component={EditProduct} />
                

                
                
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
