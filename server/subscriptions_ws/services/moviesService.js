const repo = require('../repositories/moviesRepo.js')

const getAllMovies = async (filter) => {
    try {
        return await repo.getAllMovies(filter)
    } catch (error) {
        throw error
    }
}
const getMovieById = async (id) => {
    try {
        return await repo.getMovieById(id)
    } catch (error) {
        throw error
    }
}
const createMovie = async (obj) => {
    try {
        return await repo.createMovie(obj)
    } catch (error) {
        throw error
    }
}
const updateMovie = async (id, obj) => {
    try {
        return await repo.updateMovie(id, obj)
    } catch (error) {
        throw error
    }
}
const deleteMovie = async (id) => {
    try {
        return await repo.deleteMovie(id)
    } catch (error) {
        throw error
    }
}

module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
