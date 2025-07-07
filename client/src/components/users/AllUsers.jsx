import { useDispatch, useSelector } from 'react-redux'
import User from './User'
import { useEffect } from 'react'
import userService from '../../services/userService'
import { setUsers } from '../../redux/actions/userAction'

function AllUsers() {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.userReducer.users)

    const initUsers = async () => {
        const data = await userService.getUsers()
        dispatch(setUsers(data))
    }
    useEffect(
        () => {
            if (!users || users.length == 0)
                initUsers()
        }, [])

    return (
        <div>
            <h2>All users</h2>
            {
                users.map((user) =>
                    <User key={user.id} user={user} />
                )
            }
        </div>
    )
}

export default AllUsers
