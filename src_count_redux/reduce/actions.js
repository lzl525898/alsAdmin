import {INCREMENT,DECREMENT} from './action-types'

export const increment = (number) => ({type:INCREMENT, number:number})
export const decrement = (number) => ({type:DECREMENT, number:number})