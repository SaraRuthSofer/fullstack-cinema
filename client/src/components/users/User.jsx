import React from 'react'
import userService from '../../services/userService'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../redux/actions/userAction'
import { useNavigate } from 'react-router-dom'
function User({ user }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteUser = async () => {
        await userService.deleteUser(user.id)
        dispatch(removeUser(user.id))
    }
    const editUser = () => {
        navigate(`edit/${user.id}`)
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
            <p><b>Name: </b>  {user.firstName} {user.lastName}</p>
            <p><b>User Name: </b>  {user.userName}</p>
            <p><b>Session time out: </b> {user.sessionTimeOut}</p>
            <p><b>Created date: </b>{user.createdAt}</p>
            <b>Permissions:</b>
            <div>
                {user.permissions.map(
                    (perm, index) => <p key={index} style={{ margin: '2px 0', display: 'inline-block', background: '#ffe4ec', borderRadius: '4px', padding: '2px 8px' }}>{perm}</p>
                )}
            </div>
            <div style={{ marginTop: '12px' }}>
                <button onClick={editUser} style={{ marginRight: '8px', padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff69b4', color: '#fff', cursor: 'pointer' }}>Edit</button>
                <button onClick={deleteUser} style={{ padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff1744', color: '#fff', cursor: 'pointer' }}>Delete</button>
            </div>
        </div>
    )
}

export default User
