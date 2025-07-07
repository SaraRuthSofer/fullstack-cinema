import axios from 'axios'


const API_URL = 'http://localhost:3001/movies'

const getAllMovies = async () => {
    const { data } = await axios.get(API_URL)
    return data

}
const createMovie = async (movie) => {
    const response = await axios.post(API_URL, movie)
    return response
}

const updateMovie = async (id, movie) => {
    const response = await axios.put(`${API_URL}/${id}`, movie)
    return response
}
const deleteMovie = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response
}

export default { getAllMovies, createMovie, updateMovie, deleteMovie }