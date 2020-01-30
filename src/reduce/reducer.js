import {combineReducers} from 'redux'
import {INCREMENT,DECREMENT} from './action-types'

export function count(state=1, action){
    switch (action.type) {
        case INCREMENT:
            return state + action.number
        case DECREMENT:
            return state - action.number
        default:
            return state
    }
}

const user = {}
export function users(state = user, action){
    return state
}

export default combineReducers({
    count,
    users
})