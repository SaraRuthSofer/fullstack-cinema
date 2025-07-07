import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import memberSerice from '../../services/memberSerice'
import { setMembers } from '../../redux/actions/memberAction'
import Member from './Member'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

function AllMembers() {

    const dispatch = useDispatch()

    const { id } = useParams()
    const membersList = useSelector((state) => state.memberReducer.members)
    const [members, setMembersState] = useState(membersList)

    const initMembers = async () => {
        const data = await memberSerice.getAllMembers()
        if (data)
            dispatch(setMembers(data))
    }

    useEffect(() => {
        if (!membersList || membersList.length < 1)
            initMembers()
        setMembersState(membersList)
        if (id)
            setMembersState(membersList.filter(x => x._id == id))
    }, [membersList])

    return (
        <div>
            {!members ? <p>Loading.......</p> : (

                members.map((member, index) =>
                    <Member key={index} member={member} />
                )
            )}
        </div>
    )
}

export default AllMembers

