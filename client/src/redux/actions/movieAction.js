
export const setMovies = (movies)=>({
     type: 'SET_MOVIES', 
     payload: movies
})
export const addMovie = (movie)=>({
     type: 'ADD_MOVIE', 
     payload: movie
})
export const updateMovie = (movie)=>({
     type: 'UPDATE_MOVIE', 
     payload: movie
})
export const removeMovie = (id) => ({
    type: 'REMOVE_MOVIE',
    payload: id
});



