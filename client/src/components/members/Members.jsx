import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

function Members() {

  const user = useSelector(state => state.userReducer.user)

  return (
    <div>
      <h2>Subscriptions</h2>
      <div className="rose-nav">
        <NavLink end className={({ isActive }) => isActive ? "rose-link rose-link-active" : "rose-link"} to=''>All Members</NavLink>
        <NavLink className={({ isActive }) => isActive ? "rose-link rose-link-active" : "rose-link"} to='add'
          style={user && user.permissions && !user.permissions.includes("Create Subscriptions") ? { pointerEvents: 'none', opacity: 0.8 } : {}}>
          Add Member</NavLink>
      </div>

      <div style={{ marginTop: '2em' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default Members
