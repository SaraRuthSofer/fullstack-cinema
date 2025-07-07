import React from 'react'
import memberSerice from '../../services/memberSerice'
import { useDispatch, useSelector } from 'react-redux'
import { removeMember, updateMember } from '../../redux/actions/memberAction'
import { useEffect } from 'react'
import { setMovies } from '../../redux/actions/movieAction'
import movieService from '../../services/movieService'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../../button-style.css'

function Member({ member }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const members = useSelector((state) => state.memberReducer.members)
    const movies = useSelector((state) => state.movieReducer.movies)
    const user = useSelector((state) => state.userReducer.user)

    const [subscribeBtn, setSubscribeBtn] = useState(false)
    const [moviesToSubsc, setmoviesToSubsc] = useState()
    const [selectMovie, setSelectMovie] = useState("")
    const [disable, setDisable] = useState({
        edit: true,
        delete: true
    })
    const editMember = () => {
        navigate(`edit/${member._id}`)
    }
    const deleteMember = async () => {
        try {

            const res = await memberSerice.deleteMember(member._id)
            if (res.status == 200) {
                dispatch(removeMember(member._id))
                await updateSubscriptions()
            } else
                alert("Error deleting member")
        }
        catch (error) {
            console.log(error);
        }

    }
    const updateSubscriptions = async () => {
        const data = await movieService.getAllMovies()
        dispatch(setMovies(data))
    }
    const subscribe = async () => {
        try {
            const obj = { movieId: selectMovie, date: new Date() }
            const res = await memberSerice.subscribe(member._id, obj)
            if (res.status) {
                member.movies.push(obj)
                dispatch(updateMember(member))
                setSubscribeBtn(false)
            }
        }
        catch (error) {
            console.error(error);
            alert("Error to subscribe")
        }
    }
    const getMovieName = (id) => {
        let name = "No Name"
        if (movies) {
            let m = movies.find(x => x._id == id)
            if (m)
                name = m.name
        }
        return name
    }
    const initMovies = async () => {
        const data = await movieService.getAllMovies()
        dispatch(setMovies(data))
    }
    useEffect(
        () => {
            if (!movies || movies.length == 0)
                initMovies()
            const filterMovies = movies.filter(movie =>
                !member.movies.find(x => x.movieId == movie._id)
            )
            setmoviesToSubsc(filterMovies)
            if (moviesToSubsc && moviesToSubsc.length > 0)
                setSelectMovie(moviesToSubsc[0]._id)
        }, [movies])

    useEffect(() => {
        if (!members || members.length < 1)
            initMembers()
    }, [members])

    useEffect(() => {
        let d = {
            edit: true,
            delete: true
        }
        if (user && user && user.permissions.includes("Update Subscriptions"))
            d.edit = false
        if (user && user && user.permissions.includes("Delete Subscriptions"))
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
                <h3>{member.name}</h3>
                <p><b>Email: </b>  {member.email}</p>
                <p><b>City: </b>  {member.city}</p>
                <br></br>
                <div style={{ marginTop: '12px' }}>
                    <button className="my-btn" disabled={disable.edit} onClick={editMember} >Edit</button>
                    <button className="my-btn delete" disabled={disable.delete} onClick={deleteMember} >Delete</button>
                </div>
                <b>Movies watched:</b>
                <br></br>
                <button onClick={() => setSubscribeBtn(!subscribeBtn)}>Subscribe to a new movie</button>
                {subscribeBtn &&
                    <div style={{ border: '2px solid green', padding: '16px', margin: '16px 0' }}>
                        <h4 style={{ margin: '-7px 0 0 0' }}>Add a new movie</h4>
                        <div>
                            <select id="movieSelect" onChange={e => setSelectMovie(e.target.value)}>
                                {moviesToSubsc && moviesToSubsc.map((movie) => (
                                    <option key={movie._id} value={movie._id}>{movie.name}</option>
                                ))}
                            </select>
                            {' ---- '}
                            <input type="date" value={new Date().toISOString().split('T')[0]} readOnly="treu" />
                        </div>
                        <button onClick={subscribe}>Subscribe</button>
                    </div>
                }
                <ul>
                    {(member.movies || []).map(
                        (movie, index) =>
                            <li key={index}
                                style={{ cursor: 'pointer' }}>
                                <a onClick={() => navigate(`/movies/${getMovieName(movie.movieId)}`)}>{getMovieName(movie.movieId)}</a> ------- {new Date(movie.date).toLocaleDateString()}</li>
                    )}
                </ul>

            </div>
        </div>
    )
}

export default Member
