import { combineReducers, legacy_createStore as createStore} from 'redux'
import userReducer from './reducers/userReducer'
import movieReducer from './reducers/movieReducer'
import memberReducer from './reducers/memberReducer'


const reducers = combineReducers(
    {
     userReducer : userReducer,
     movieReducer:movieReducer , 
     memberReducer:memberReducer 
    }
)


const store = createStore(reducers)

export default store

