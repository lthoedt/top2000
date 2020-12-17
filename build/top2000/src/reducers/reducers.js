import {combineReducers} from 'redux'

import ListReducer from './listReducer';

export const mainReducer = combineReducers({
	list: ListReducer
})
