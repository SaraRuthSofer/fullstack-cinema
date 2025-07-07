import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

function Users() {
      const navigate = useNavigate()

  const user = useSelector(state => state.userReducer.user)

  useEffect(() => {
    if (!user || !user && user.userName == "Admin")
      navigate(-1)
  }, [user])
    
  return (
    <div>
      <h2>Users</h2>
      <div className="rose-nav">
        <NavLink end className={({ isActive }) => isActive ? "rose-link rose-link-active" : "rose-link"}  to=''>All Users</NavLink>
        <NavLink className={({ isActive }) => isActive ? "rose-link rose-link-active" : "rose-link"} to='add'>Add User</NavLink>
      </div>
      <div style={{marginTop: '2em'}}>
        <Outlet />
      </div>
    </div>
  )
}

export default Users
