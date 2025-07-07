import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMovies } from '../../redux/actions/movieAction'
import movieService from '../../services/movieService'
import Movie from './Movie'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

function AllMovies() {
    const dispatch = useDispatch()

    const moviesList = useSelector((state) => state.movieReducer.movies)
    const { movie } = useParams()

    const [search, setSearch] = useState("")
    const [movies, setMoviesState] = useState()

    const find = () => {
        let ss = movie ?? search
        const filterMovies = moviesList.filter(x => x.name.includes(ss))
        setMoviesState(filterMovies)
    }

    const initMovies = async () => {
        const data = await movieService.getAllMovies()
        dispatch(setMovies(data))
    }
    useEffect(() => {
        if (!moviesList || moviesList.length == 0)
            initMovies()
        setMoviesState(moviesList)
        if (movie) {
            setSearch(movie)
            find()
        }            // setMoviesState(moviesList.filter(x => x._id == id))
    }, [moviesList])


    return (
        <>
            {!movies ? <div> Loading.....</div> : (
                <div>
                    <p>
                        Find Movie:
                        <input
                            type='text'
                            placeholder='search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                    </p>
                    <button onClick={find}>Find</button>
                    {movies.map((movie, index) => <Movie key={index} movie={movie} />)}
                </div>
            )}
        </>
    )
}

export default AllMovies
