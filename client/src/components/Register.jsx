import React, { useState } from 'react'
import authService from '../services/authService'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCurrentUser } from '../redux/actions/userAction'


function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [error, setError] = useState("")

  const register = async (e) => {
    e.preventDefault()
    try {
      const res = await authService.register(user)
      if (res.status == 200) {
        navigate('/login')
      }
    }
    catch (err) {
      const message = err.status === 404 ? "שם משתמש לא קיים במערכת" : "לא הצלחנו להתחבר. נסה שוב."
      setError(message)
    }
  }

  return (
    <>
    <h2>Create an account:</h2>
    <form onSubmit={register}>
      User Name:<input type='text' autoComplete='username' onChange={(e) => setUser({ ...user, userName: e.target.value })} />
      Password: <input type='password' autoComplete='current-password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
      <button>Create</button>
    </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}
</>
  )
}

export default Register
