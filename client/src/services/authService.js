
import axios from 'axios';

const API_URL = 'http://localhost:3001/auth';


const login = async (user) => {
    const response = await axios.post(`${API_URL}/login`, user)
    return response
}

const register = async (user) => {
    const response = await axios.post(`${API_URL}/register`, user)
    return response
}




export default { login, register }