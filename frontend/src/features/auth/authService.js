import axios from 'axios';

// set the user auth api we created in the beackend server.js
const API_URL = '/api/users'

// register user
const register = async (userData) => {

    const response = await axios.post(`${API_URL}/register`, userData)

    if (response.data) {
        // save the user and data we get back including the JWT
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// login user
const login = async (userData) => {
    const res = await axios.post(`${API_URL}/login`, userData)

    if (res.data) {
        // store data in localStorage
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

// Logout User
const logout = () => localStorage.removeItem('user')

// set authService to an obj containing the funcs and export
const authService = { register, logout, login }

export default authService