import { useState } from 'react'
import userSerive from '../services/userService'
import authSerive from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../redux/actions/userAction'

function Login() {
   const navigate = useNavigate()
  const dispatch = useDispatch()

  const [user, setUser] = useState({})
  const [error, setError] = useState("")
 
  const login = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const res = await authSerive.login(user)
      if (res && res.status == 200) {
        dispatch(setCurrentUser(res.data))
        navigate('/')
      }
      else {
        setError("שם משתמש או סיסמה לא נכונים")
      }
    }
    catch (err) {
      const message = err.status === 404 ? "שם משתמש או סיסמה לא נכונים" : "לא הצלחנו להתחבר. נסה שוב."
      setError(message)
    }
  }

  return (
    <div>
      Login
      <form onSubmit={login}>
        <input type="text" placeholder="Username" autoComplete='username' onChange={e => setUser({ ...user, userName: e.target.value })} />
        <input type="password" placeholder="Password" autoComplete='current-password' onChange={e => setUser({ ...user, password: e.target.value })} />
        <button type='submit'>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>New User? <Link to='/register'>Create Account</Link></p>
    </div>
  )
}

export default Login
