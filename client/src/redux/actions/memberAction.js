
export const setMembers = (members)=>({
     type: 'SET_MEMBERS', 
     payload: members
})
export const addMember = (member)=>({
     type: 'ADD_MEMBER', 
     payload: member
})
export const updateMember = (member)=>({
     type: 'UPDATE_MEMBER', 
     payload: member
})
export const removeMember = (id) => ({
    type: 'REMOVE_MEMBER',
    payload: id
});

