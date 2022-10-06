import axios from 'axios';

// set the user auth api we created in the beackend server.js
const API_URL = '/api/users'

// register user
const register = async (userData) => {

    // so with axios we do the post req as thus, and await a res
    // first argument is the api to send to, 2nd is te data we're sending
    const response = await axios.post(`${API_URL}/register`, userData)

    if (response.data) {
        // response.data is were the data will be if it's true, then

        // save the user and data we get back including the JWT
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// we set authService to an obj containing the funcs we want exported
const authService = { register }

// here we export authService as default so we can bring it into other file via either destructing the object and grabbing what we need or using dot notation like we did in authSlice
export default authService