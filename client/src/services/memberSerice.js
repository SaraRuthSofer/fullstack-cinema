import axios from 'axios'




const API_URL = 'http://localhost:3001/members'

const getAllMembers = async () => {
    const { data } = await axios.get(API_URL)
    return data

}
const createMember = async (member) => {
    const response = await axios.post(API_URL, member)
    return response
}

const updateMember = async (id, member) => {
    const response = await axios.put(`${API_URL}/${id}`, member)
    return response
}
const deleteMember = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response
}
const subscribe = async (id, obj) => {
    debugger
    const response = await axios.post(`${API_URL}/subscribe/${id}`, obj)
    return response
}

export default { getAllMembers, createMember, updateMember, deleteMember, subscribe }