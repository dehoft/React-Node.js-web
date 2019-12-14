import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';



export const registerUser = (userData, history) => dispatch => {
        axios
        .post('/users/signup', userData,)
        .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            history.push('/login')        
        })        
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};


export const loginUser = (userData) => dispatch => {    
    axios.post('/users/login', userData)
        .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }

            
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
                          
        })      
        .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })      
        );
};

export const setCurrentUser = (decoded) => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}


export const logoutUser = () => dispatch => {
    
    localStorage.removeItem('jwtToken');

    setAuthToken(false);
    
    dispatch(setCurrentUser({})); 

    
};