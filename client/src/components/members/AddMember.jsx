import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addMember } from '../../redux/actions/memberAction'
import memberSerice from '../../services/memberSerice'

function AddMember() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [member, setMember] = useState()

    const save = async () => {
        try {
            const res = await memberSerice.createMember(member)
            if (res.status == 200) {
                dispatch(addMember(res.data))
                alert("Member saved successfully")
                navigate('/subscriptions')
            }
        }
        catch (error) {
            console.log(error);
            alert("Error saveing member")

        }
    }
    const cancel = () => {
        navigate('/subscriptions')
    }
    return (
        <div>
            <h2> Add Member</h2>
            <div style={{
                border: '2px solid pink',
                borderRadius: '8px',
                padding: '16px',
                margin: '16px 0',
                background: '#fff0f6',
                boxShadow: '0 2px 8px rgba(255, 192, 203, 0.15)'
            }}>

                Name: <input type='text' onChange={(e) => setMember({ ...member, name: e.target.value })} />
                <br></br>
                Email: <input type='text' onChange={(e) => setMember({ ...member, email: e.target.value })} />
                <br></br>
                City: <input type='text' onChange={(e) => setMember({ ...member, city: e.target.value })} />

                <div style={{ marginTop: '12px' }}>
                    <button onClick={save} style={{ marginRight: '8px', padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff69b4', color: '#fff', cursor: 'pointer' }}>Save</button>
                    <button onClick={cancel} style={{ padding: '6px 16px', borderRadius: '4px', border: 'none', background: '#ff1744', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddMember

