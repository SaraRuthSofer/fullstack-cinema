import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import userService from '../../services/userService'
import { setCurrentUser, setUsers, updateUser } from '../../redux/actions/userAction'

function EditUser() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { id } = useParams()
  const users = useSelector((state) => state.userReducer.users)
  const connectedUser = useSelector((state) => state.userReducer.user)
  const permissions = useSelector((state) => state.userReducer.permissions)

  const [user, setUser] = useState()

  const cancel = () => {
    navigate('/users')
  }
  const update = async () => {
    const res = await userService.updateUser(user.id, user)
    if (res.status === 200 || res.status === 204) {
      dispatch(updateUser(user))

      if (connectedUser._id == user._id)
        dispatch(setCurrentUser(user))

      alert("User updated successfully");
      navigate('/users')
    }
    else {
      alert("Failed to update user");
    }
  }
  const handlePerm = (e) => {
    const perm = e.target.value;
    let newPermissions;
    if (e.target.checked) {
      newPermissions = [...user.permissions, perm];
      const subscriptionEditPerms = [
        "Create Subscriptions",
        "Delete Subscriptions",
        "Update Subscriptions"
      ];
      const moviesEditPerms = [
        "Create Movies",
        "Delete Movies",
        "Update Movies"
      ];
      if (subscriptionEditPerms.includes(perm) && !newPermissions.includes("View Subscriptions")) {
        newPermissions = [...newPermissions, "View Subscriptions"];
      }
      if (moviesEditPerms.includes(perm) && !newPermissions.includes("View Movies")) {
        newPermissions = [...newPermissions, "View Movies"];
      }
    }
    else {
      newPermissions = user.permissions.filter(p => p !== perm);
    }
    setUser({ ...user, permissions: newPermissions });
  }

  const initUsers = async () => {
    const data = await userService.getUsers()
    dispatch(setUsers(data))
  }

  useEffect(
    () => {
      if (!users || users.length === 0) {
        initUsers();
        return;
      }
      setUser(users.find(x => x.id == id));
    }, [users, id])

  if (!user) {
    return <div>Loading...</div>;
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
      <h2>Edit User: {user.firstName} {user.lastName}</h2>
      <p><b>First name: </b>  <input type='text' onChange={(e) => setUser({ ...user, firstName: e.target.value })} value={user.firstName} /></p>
      <p><b>Last name: </b>  <input type='text' onChange={(e) => setUser({ ...user, lastName: e.target.value })} value={user.lastName} /></p>
      <p><b>User Name: </b>  <input type='text' onChange={(e) => setUser({ ...user, userName: e.target.value })} value={user.userName} /></p>
      <p><b>Session time out: (Minutes) </b> <input type='number' onChange={(e) => setUser({ ...user, sessionTimeOut: e.target.value })} value={user.sessionTimeOut} /></p>
      <p><b>Created date: </b>{user.createdAt}</p>
      <b>Permissions:</b>
      <div>
        {permissions.map(
          (perm, index) =>
            <label key={index}
              style={{ margin: '4px 3px', display: 'inline-block', borderRadius: '4px', padding: '2px 8px', gap: '2px' }}>
              <input
                type='checkbox'
                value={perm}
                checked={user.permissions.includes(perm)}
                onChange={handlePerm}
              />
              {perm}
            </label>
        )}
      </div>
      <div style={{ marginTop: '12px' }}>
        <button onClick={update} style={{ marginRight: '8px', padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff69b4', color: '#fff', cursor: 'pointer' }}>Update</button>
        <button onClick={cancel} style={{ padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff1744', color: '#fff', cursor: 'pointer' }}>Cancel</button>
      </div>
    </div>
  )
}

export default EditUser
