const initialState={

    members:[]
}

const memberReducer=((state = initialState, action)=>{
  switch (action.type) {
        case 'SET_MEMBERS':
            return { ...state, members: action.payload }
        case 'ADD_MEMBER':
            return { ...state, members: [...state.members, action.payload] }
        case 'UPDATE_MEMBER':
            return { ...state, members: state.members.map(x => x._id == action.payload._id ? action.payload : x) }
        case 'REMOVE_MEMBER':
            return { ...state, members: state.members.filter(x => x._id !== action.payload) }


        default:
            return state
    }
})

export default memberReducer