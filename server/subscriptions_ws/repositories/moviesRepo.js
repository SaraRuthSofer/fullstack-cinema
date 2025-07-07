const Movie = require('../models/movieModel.js')


const getAllMovies = (filter) => {
    return Movie.find(filter)
}
const getMovieById = (id) => {
    return Movie.findById(id)
}
const createMovie = (movie) => {
    const newMovie = new Movie(movie)
    return newMovie.save()
}
const updateMovie = (id, movie) => {
    return Movie.findByIdAndUpdate(id, movie, { new: true })
}
const deleteMovie = (id) => {
    return Movie.findByIdAndDelete(id)
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
}

