import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import movieService from '../../services/movieService'
import { useDispatch } from 'react-redux'
import { addMovie } from '../../redux/actions/movieAction'

function AddMovie() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [movie, setMovie] = useState()
    const [genresInput, setGenresInput] = useState("")

    const setGenres = (strings) => {
        const array = strings.split(',').map(s => s.trim()).filter(s => s.length > 0)
        return array
    }

    const save = async () => {
        try {
            const res = await movieService.createMovie(movie)
            if (res.status == 200) {
                dispatch(addMovie(res.data))
                alert("Movie saved successfully");
                navigate('/movies')
            }
        }
        catch (error) {
            console.log(error);
            alert("Error saveing new Movie")

        }
    }
    const cancel = () => {
        navigate('/movies')
    }

    return (
        <div style={{
            border: '2px solid pink',
            borderRadius: '8px',
            padding: '16px',
            margin: '16px 0',
            background: '#fff0f6',
            boxShadow: '0 2px 8px rgba(255, 192, 203, 0.15)'
        }}>

            <h2>Add Movie:</h2>
            Name: <input type='text' onChange={(e) => setMovie({ ...movie, name: e.target.value })} />
            <br></br>
            Genres: <input type='text' value={genresInput}
                onChange={(e) => {
                    setGenresInput(e.target.value)
                    setMovie({ ...movie, genres: setGenres(e.target.value) })
                }} />
            <br></br>

            Image Url:<input type='text' onChange={(e) => setMovie({ ...movie, image: e.target.value })} />
            <br></br>


            Premired :<input type='date' onChange={(e) => setMovie({ ...movie, premiered: e.target.value })} />
            <div style={{ marginTop: '12px' }}>
                <button onClick={save} style={{ marginRight: '8px', padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff69b4', color: '#fff', cursor: 'pointer' }}>Save</button>
                <button onClick={cancel} style={{ padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff1744', color: '#fff', cursor: 'pointer' }}>Cancel</button>
            </div>
        </div>
    )
}

export default AddMovie
