import {combineReducers} from 'redux'

import ListReducer from './listReducer';
import PlayingReducer from './playingReducer';
import CreateReducer from './createReducer';
import LoginReducer from './loginReducer';

export const mainReducer = combineReducers({
	list: ListReducer,
	playing: PlayingReducer,
	create: CreateReducer,
	login: LoginReducer
})
