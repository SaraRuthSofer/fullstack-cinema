
export const setUsers = (users) => ({
    type: 'SET_USERS',
    payload: users
})
export const addUser = (user) => ({ 
    type: 'ADD_USER',
    payload: user
});
export const updateUser = (user) => ({
    type: 'UPDATE_USER',
    payload: user
});
export const removeUser = (id) => ({
    type: 'REMOVE_USER',
    payload: id
});
export const setCurrentUser = (user) => ({
    type: 'SET_CURRENT_USER',
    payload: user
})
export const logout = () => ({
    type: 'LOGOUT',
    payload: ''
})
