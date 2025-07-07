import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import memberSerice from '../../services/memberSerice'
import { setMembers, updateMember } from '../../redux/actions/memberAction'

function EditMember() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [member, setMember] = useState()
    const members = useSelector((state) => state.memberReducer.members)

    const update = async () => {
        try {
            const res = await memberSerice.updateMember(id, member)
            if (res.status == 200) {
                dispatch(updateMember(member))
                alert("Member updated successfully");
                navigate('/subscriptions')
            }

        }
        catch (error) {
            console.log(error);
            alert("Error updating member")

        }
    }
    const cancel = () => {
        navigate('/subscriptions')
    }
    const initMembers = async () => {
        const data = await memberSerice.getAllMembers()
        if (data)
            dispatch(setMembers(data))
    }
    useEffect(() => {
        if (!members || members.length < 1)
            initMembers()
        if (members)
            setMember(members.find(x => x._id == id))
    }, [members])

    return (
        <>
            {!member ? <div> Loading......</div> : (

                <div style={{
                    border: '2px solid pink',
                    borderRadius: '8px',
                    padding: '16px',
                    margin: '16px 0',
                    background: '#fff0f6',
                    boxShadow: '0 2px 8px rgba(255, 192, 203, 0.15)'
                }}>

                    <h2>Edit Member: {member.name}</h2>
                    Name: <input type='text' value={member.name} onChange={(e) => setMember({ ...member, name: e.target.value })} />
                    <br></br>
                    Email: <input type='text' value={member.email} onChange={(e) => setMember({ ...member, email: e.target.value })} />
                    <br></br>
                    City: <input type='text' value={member.city} onChange={(e) => setMember({ ...member, city: e.target.value })} />

                    <div style={{ marginTop: '12px' }}>
                        <button onClick={update} style={{ marginRight: '8px', padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff69b4', color: '#fff', cursor: 'pointer' }}>Update</button>
                        <button onClick={cancel} style={{ padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff1744', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditMember

