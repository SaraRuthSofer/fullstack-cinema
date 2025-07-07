const axios = require('axios')

const getAll = async (url) => {
    const { data } = await axios.get(url)
    return data
}
const getById = async (url, id) => {
    const { data } = await axios.get(`${url}/${id}`)
    return data

}
const create = async(url, obj) => {

    const {data} =await axios.post(`${url}`, obj)
    return data

}
const update = async (url, id, obj) => {
    const { data } = await axios.put(`${url}/${id}`, obj)
    return data

}
const deleted = async (url, id) => {
    const { data } = await axios.delete(`${url}/${id}`)
    return data

}
module.exports = { getAll, getById, create, update, deleted }