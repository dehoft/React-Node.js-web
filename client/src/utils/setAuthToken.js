import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] ='Bearer ' + token;
        //console.log('loggedin')
    } else {
        delete axios.defaults.headers.common['Authorization'];
        //console.log('loggedout')
    }
};

export default setAuthToken;