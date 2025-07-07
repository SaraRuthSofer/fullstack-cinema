
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

function Movies() {
  const user = useSelector(state => state.userReducer.user)

  return (
    <div>
      <h2>Movies </h2>
      <div className="rose-nav">
        <NavLink end className={({ isActive }) => isActive ? "rose-link rose-link-active" : "rose-link"} to=''>All Movies</NavLink>
        <NavLink className={({ isActive }) => isActive ? "rose-link rose-link-active" : "rose-link"} to='add'
          style={user && user.permissions && !user.permissions.includes("Create Movies") ? { pointerEvents: 'none', opacity: 0.8 } : {}}>
          Add Movie
        </NavLink>
      </div>

      <div style={{ marginTop: '2em' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default Movies
