import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../redux/actions/userAction';

function Nav() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [permissions, setPermissions] = useState(
    {
      admin: false,
      viewMovies: false,
      viewSubscriptions: false
    }
  )
  const user = useSelector(state => state.userReducer.user)

  const logoutBtn = () => {
    dispatch(logout())
    navigate('/login')
  }

  useEffect(() => {
    if (!user)
      navigate('/login')
    else {
      let p = {
        admin: false,
        viewMovies: false,
        viewSubscriptions: false
      }
      if (user.userName == "Admin")
        p.admin = true
      if (user.permissions.includes("View Movies"))
        p.viewMovies = true
      if (user.permissions.includes("View Subscriptions"))
        p.viewSubscriptions = true

      setPermissions(p)
    }
  }, [user])


  return (
    <div>
      {user && <p className="rose-link rose-link-active">{user.firstName}</p>}
      <nav className="rose-nav">
              
        <NavLink className={({ isActive }) => isActive ? "rose-link rose-link-active" : "rose-link"} to='/login'>Login</NavLink>
        <NavLink className={({ isActive }) => isActive ? "rose-link rose-link-active" : "rose-link"} to='/movies'
          style={!permissions.viewMovies ? { pointerEvents: 'none', opacity: 0.8 } : {}}>
          Movies</NavLink>

        < NavLink className={({ isActive }) => isActive ? "rose-link rose-link-active" : "rose-link"} to='/subscriptions'
          style={!permissions.viewSubscriptions ? { pointerEvents: 'none', opacity: 0.8 } : {}}>
          Subscriptions</NavLink>

        {permissions.admin && <NavLink className={({ isActive }) => isActive ? "rose-link rose-link-active" : "rose-link"} to='/users'>Users Management</NavLink>}
        <button className={"rose-link"} onClick={logoutBtn}>Logout</button>
      </nav>
    </div >
  )
}

export default Nav
