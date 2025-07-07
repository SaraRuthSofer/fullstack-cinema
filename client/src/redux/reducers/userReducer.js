const initialState = {
    users: [


    ],
    user: null,
    permissions: [
        "View Subscriptions",
        "Create Subscriptions",
        "Update Subscriptions",
        "Delete Subscriptions",
        
        "View Movies",
        "Create Movies",
        "Update Movies",
        "Delete Movies"
    ]
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.payload }
        case 'ADD_USER':
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(u => u.id === action.payload.id ? action.payload : u)
            }
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(u => u.id !== action.payload)
            }
        case 'SET_CURRENT_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }

        default:
            return state;
    }
}

export default userReducer