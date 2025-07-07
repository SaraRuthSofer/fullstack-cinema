import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../../redux/actions/userAction'
import userService from '../../services/userService'

function AddUser() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [user, setUser] = useState({ permissions: [] })
  const permissions = useSelector((state) => state.userReducer.permissions)

  const cancel = () => {
    navigate('/users')
  }
  const save = async () => {
    try {
      const data = await userService.createUser(user)
      dispatch(addUser(data))
      alert("User saved successfully");
      navigate('/users')

    }
    catch (error) {
      alert("Failed to save user" + error);
    }
  }
  const handlePerm = async (e) => {
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


  return (
    <div>
      <h2>Add User</h2>
      <p><b>First name: </b>  <input type='text' onChange={(e) => setUser({ ...user, firstName: e.target.value })} /></p>
      <p><b>Last name: </b>  <input type='text' onChange={(e) => setUser({ ...user, lastName: e.target.value })} /></p>
      <p><b>User Name: </b>  <input type='text' onChange={(e) => setUser({ ...user, userName: e.target.value })} /></p>
      <p><b>Session time out: (Minutes) </b> <input type='number' onChange={(e) => setUser({ ...user, sessionTimeOut: e.target.value })} /></p>
      <b>Permissions:</b>
      <div>
        {permissions.map(
          (perm, index) =>
            <label key={index} style={{ margin: '2px 0', display: 'inline-block', background: '#ffe4ec', borderRadius: '4px', padding: '2px 8px' }}>
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
        <button onClick={save} style={{ marginRight: '8px', padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff69b4', color: '#fff', cursor: 'pointer' }}>save</button>
        <button onClick={cancel} style={{ padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff1744', color: '#fff', cursor: 'pointer' }}>Cancel</button>
      </div>
    </div>
  )
}

export default AddUser
