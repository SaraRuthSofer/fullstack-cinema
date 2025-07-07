
import axios from 'axios';

const API_URL = 'http://localhost:3001/users';


const getUsers = async () => {
    const { data } = await axios.get(API_URL)
    return data
}
const createUser = async (obj) => {
    const {data} = await axios.post(`${API_URL}`, obj)
    return data
}
const updateUser = async (id, obj) => {
    const res = await axios.put(`${API_URL}/${id}`, obj)
    return res
}
const deleteUser = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`)
    console.log(res);

}

export default { getUsers,createUser, updateUser, deleteUser }