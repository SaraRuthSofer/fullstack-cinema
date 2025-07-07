

const initialState = {
    movies: [
        // {
        //     name:"aaa", 
        //     year:2020,
        //     image:'./public/pic1.jpg',
        //     subscriptions:[{name:"Moshe", year: 2025}, {name:"Dina", year: 2024}]
        // },
        // {
        //     name:"bbb", 
        //     year:2020,
        //     image:'./public/pic2.jpg',
        //     subscriptions:[{name:"Moshe", year: 2025}, {name:"Dina", year: 2024}]
        // },
        // {
        //     name:"ccc", 
        //     year:2020,
        //     image:'./public/pic3.jpg',
        //     subscriptions:[{name:"Moshe", year: 2025}, {name:"Dina", year: 2024}]
        // }
    ]
}

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return { ...state, movies: action.payload }
        case 'ADD_MOVIE':
            return { ...state, movies: [...state.movies, action.payload] }
        case 'UPDATE_MOVIE':
            return { ...state, movies: state.movies.map(x => x._id == action.payload._id ? action.payload : x) }
        case 'REMOVE_MOVIE':
            return { ...state, movies: state.movies.filter(x => x._id !== action.payload) }


        default:
            return state
    }
}
export default movieReducer


