const repo = require('../repositories/subscriptionsRepo')
const subscriptions = require('./subscriptionsService')

const API_URL = 'http://localhost:3000/movies'
const API_URL_SUB = 'http://localhost:3000/subscriptions'


const getAllMovies = async () => {
    try {
        let movies = await repo.getAll(API_URL)
        const movieList = await Promise.all(
            movies.map(async (movie) => {
                const subscriptions = (await (getSubscByMovieId(movie._id))) ?? [];
                return { ...movie, subscriptions: subscriptions };
            }))
        return movieList
    }
    catch (error) {
        throw error
    }
}
const getSubscByMovieId = async (id) => {
    const subsc = await subscriptions.getAllSubscriptions()
    let array = []
    subsc.map((sub) => {
        sub.movies.map((movie) => {
            if (movie.movieId == id) {
                array.push({ member: sub.memberId, date: movie.date })
                return
            }
        })
    })
    return array
}
const getMovieById = async (id) => {
    try {
        const movie = await repo.getById(API_URL, id)
        const subscriptions = (await (getSubscByMovieId(movie._id))) ?? []
        return { ...movie, subscriptions: subscriptions }
    }
    catch (error) {
        throw error
    }
}
const createMovie = async (obj) => {
    try {
        const x = await repo.create(API_URL, obj)
        return x
    }
    catch (error) {
        throw error
    }
}
const updateMovie = (id, obj) => {
    try {
        return repo.update(API_URL, id, obj)
    }
    catch (error) {
        throw error
    }
}
const deleteMovie = async (id) => {
    try {
        const delMovie = await repo.deleted(API_URL, id)
        await deleteMovieSubscription(id)

        return// delMovie
    }
    catch (error) {
        throw error
    }
}

const deleteMovieSubscription = async (movieId) => {
    try {
        const res = await subscriptions.getAllSubscriptions()
        debugger
        // console.log(res);
        
        // const subscriptions = res.date
        res.map(async (sub) => {
            const movies = sub.movies.filter((movie) => movie.movieId != movieId)
            const newSub = { _id: sub._id, memberId: sub.memberId, movies: movies }
           const r = await subscriptions.updateSubscription(sub._id, newSub)
           
        })

        return

    }
    catch (error) {
        throw error
    }
}
module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie }