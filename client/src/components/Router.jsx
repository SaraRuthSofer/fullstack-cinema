import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './Home'
import Login from './Login'
import Register from './Register'
import Movies from './movies/Movies'
import Users from './users/Users'
import AddUser from './users/AddUser'
import AllUsers from './users/AllUsers'
import EditUser from './users/EditUser'
import AddMovie from './movies/AddMovie'
import AllMovies from './movies/AllMovies'
import EditMovie from './movies/EditMovie'
import EditMember from './members/EditMember'
import AddMember from './members/AddMember'
import AllMembers from './members/AllMembers'
import Members from './members/Members'
import ProtectedRoute from './ProtectedRoute'

function Router() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/movies/' element={
          <ProtectedRoute permission="View Movies">
            <Movies />
          </ProtectedRoute>
        }>
          <Route path='' element={<AllMovies />} />
          <Route path=':movie' element={<AllMovies />} />
          <Route path='add' element={
            <ProtectedRoute permission="Create Movies">
              <AddMovie />
            </ProtectedRoute>
          } />
          <Route path='edit/:id' element={
            <ProtectedRoute permission="Update Movies">
              <EditMovie />
            </ProtectedRoute>
          } />
        </Route>
        <Route path='/subscriptions' element={
          <ProtectedRoute permission="View Subscriptions">
            <Members />
          </ProtectedRoute>
        } >
          <Route path='' element={<AllMembers />} />
          <Route path=':id' element={<AllMembers />} />
          <Route path='add' element={
            <ProtectedRoute permission="Create Subscriptions">
              <AddMember />
            </ProtectedRoute>
          } />
          <Route path='edit/:id' element={
            <ProtectedRoute permission="Update Subscriptions">
              <EditMember />
            </ProtectedRoute>
          } />
        </Route>
        <Route path='/users/' element={<Users />}>
          <Route path='' element={<AllUsers />} />
          <Route path='add' element={<AddUser />} />
          <Route path='edit/:id' element={<EditUser />} />
        </Route>
      </Routes>
    </div>
  )
}

export default Router
