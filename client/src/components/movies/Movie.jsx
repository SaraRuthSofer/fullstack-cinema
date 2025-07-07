import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import movieService from '../../services/movieService'
import { useDispatch, useSelector } from 'react-redux'
import { removeMovie } from '../../redux/actions/movieAction'
import { setMembers } from '../../redux/actions/memberAction'
import memberSerice from '../../services/memberSerice'
import { useEffect } from 'react'
import '../../button-style.css'

function Movie({ movie }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const members = useSelector((state) => state.memberReducer.members)
    const user = useSelector(state => state.userReducer.user)

    const [disable, setDisable] = useState({
        edit: true,
        delete: true
    })

    const editMovie = () => {
        navigate(`edit/${movie._id}`)
    }
    const deleteMovie = async () => {
        try {
            const res = await movieService.deleteMovie(movie._id)
            if (res.status == 200) {
                dispatch(removeMovie(movie._id))
                await updateSubscriptions()
            }
        }
        catch (error) {
            console.log(error)
            alert("Error Deleting movie")
        }
    }
    const updateSubscriptions = async () => {
        const data = await memberSerice.getAllMembers()
        dispatch(setMembers(data))
    }
    const getMemberName = (id) => {
        const m = members.find(x => x._id == id)
        return m?.name ?? "No name"
    }

    const initMembers = async () => {
        const data = await memberSerice.getAllMembers()
        if (data)
            dispatch(setMembers(data))
    }

    useEffect(() => {
        if (!members || members.length < 1)
            initMembers()
    }, [members])

    useEffect(() => {
        let d = {
            edit: true,
            delete: true
        }
        if (user && user && user.permissions.includes("Update Movies"))
            d.edit = false
        if (user && user && user.permissions.includes("Delete Movies"))
            d.delete = false
        setDisable(d)
    }, [user])
  
    return (
        <div>
            <div style={{
                border: '2px solid pink',
                borderRadius: '8px',
                padding: '16px',
                margin: '16px 0',
                background: '#fff0f6',
                boxShadow: '0 2px 8px rgba(255, 192, 203, 0.15)'
            }}>
                <p><b>Name: </b>  {movie.name}</p>
                <p><b>Year: </b>  {movie.premiered ? new Date(movie.premiered).getFullYear() : ''}</p>
                <p><b>Genres: </b>  {movie.genres.join(', ')}</p>
                <img src={movie.image} alt={movie.name} style={{ maxWidth: '25%', borderRadius: '8px', margin: '8px 0' }} />
                <br></br>
                <b>subscriptions watched:</b>
                <ul>
                    {(movie.subscriptions || []).map(
                        (subscrip, index) =>
                            <li key={index}>
                                <a style={{ cursor: 'pointer' }} onClick={() => navigate(`/subscriptions/${subscrip.member}`)}>{getMemberName(subscrip.member)} </a>------- {new Date(subscrip.date).toLocaleDateString()}
                            </li>
                    )}
                </ul>
                <div style={{ marginTop: '12px' }}>
                    <button className="my-btn" disabled={disable.edit} onClick={editMovie}>Edit</button>
                    <button className="my-btn delete" disabled={disable.delete} onClick={deleteMovie}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Movie
