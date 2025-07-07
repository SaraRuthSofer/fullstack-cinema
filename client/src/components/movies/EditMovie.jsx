import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import movieService from '../../services/movieService'
import { setMovies, updateMovie } from '../../redux/actions/movieAction'

function EditMovie() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const movies = useSelector((state) => state.movieReducer.movies)

    const { id } = useParams()
    const [movie, setMovie] = useState()
    const [genresInput, setGenresInput] = useState("")

    const update = async () => {
        try {
            const res = await movieService.updateMovie(movie._id, movie)
            if (res.status == 200) {
                dispatch(updateMovie(res.data))
                alert("movie updated sussec")
            }
            navigate('/movies')
        }
        catch (error) {
            console.log(error);
            alert("Error will updateing movie")
        }
    }

    const cancel = () => {
        navigate('/movies')
    }
    const setGenres = (strings) => {
        const array = strings.split(',').map(s => s.trim()).filter(s => s.length > 0)
        return array
    }
    const initMovies = async () => {
        const data = await movieService.getAllMovies()
        dispatch(setMovies(data))
    }

    useEffect(() => {
        if (movies && movies.length > 0) {
            const foundMovie = movies.find(x => x._id == id)
            setMovie(foundMovie)
            setGenresInput(foundMovie ? foundMovie.genres.join(", ") : "")
        }
        else {
            initMovies()
        }
    }, [movies])

    return (
        <>
            {!movie ? <div> Loading......</div> : (

                <div style={{
                    border: '2px solid pink',
                    borderRadius: '8px',
                    padding: '16px',
                    margin: '16px 0',
                    background: '#fff0f6',
                    boxShadow: '0 2px 8px rgba(255, 192, 203, 0.15)'
                }}>

                    <h2>Edit Movie: {movie.name}</h2>
                    Name: <input type='text' value={movie.name} onChange={(e) => setMovie({ ...movie, name: e.target.value })} />
                    <br></br>
                    Genres: <input type='text' value={genresInput}
                        onChange={(e) => {
                            setGenresInput(e.target.value)
                            setMovie({ ...movie, genres: setGenres(e.target.value) })
                        }} />
                    <br></br>

                    Image Url:<input type='text' value={movie.image} onChange={(e) => setMovie({ ...movie, image: e.target.value })} />
                    <br></br>


                    Premired :<input type='text' value={movie.premiered} onChange={(e) => setMovie({ ...movie, premiered: e.target.value })} />
                    <div style={{ marginTop: '12px' }}>
                        <button onClick={update} style={{ marginRight: '8px', padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff69b4', color: '#fff', cursor: 'pointer' }}>Update</button>
                        <button onClick={cancel} style={{ padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff1744', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditMovie
